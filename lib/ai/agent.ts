import { AIUserContext, AIEngineResponse, AIChatMessage, AIActionExecutionResult, AgentStep } from "./types";
import { buildUserAIContext } from "./context";
import { executeAITool, AI_TOOL_DEFINITIONS } from "./tools";
import { checkAndIncrementQuota } from "./quotas";
import { getAvailableAIProviders } from "./providers/factory";
import { AIProvider, ProviderResponse } from "./providers/base";
import { APP_CONFIG } from "@/lib/config";

export async function processUserAIMessage(
  userId: string,
  userMessage: string,
  conversationHistory: AIChatMessage[] = [],
  activeTarget?: AIUserContext["activeTarget"]
): Promise<AIEngineResponse> {
  // 1. Check & increment user quota (1 user prompt = 1 request debit)
  const quotaStatus = await checkAndIncrementQuota(userId);
  if (quotaStatus.isExceeded) {
    return {
      reply: `Vous avez atteint votre limite de **${quotaStatus.limit} requêtes IA** ce mois-ci. Passez au plan **Pro** pour continuer sans interruption avec 1000 requêtes/mois.`,
      spokenReply: `Vous avez atteint votre limite de requêtes IA ce mois-ci.`,
      action: null,
      executed: false,
      quota: { used: quotaStatus.used, limit: quotaStatus.limit, remaining: 0 },
    };
  }

  // 2. Build Rich User Context
  const context = await buildUserAIContext(userId);
  if (activeTarget) {
    context.activeTarget = activeTarget;
  }

  // 3. Multi-Model Provider Fallback Chain (Gemini -> OpenAI -> Claude -> Local)
  const providers = getAvailableAIProviders();
  let lastError = "";

  for (const provider of providers) {
    try {
      const response = await executeMultiStepAgent(provider, userMessage, conversationHistory, context, quotaStatus);
      return response;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(`AI Provider [${provider.name}] failed, cascading to next in chain... Error:`, lastError);
    }
  }

  // If even the fallback chain failed entirely (should never happen with LocalEngineProvider)
  return {
    reply: "Désolé, une erreur technique temporaire est survenue. Veuillez réessayer dans quelques instants.",
    spokenReply: "Une erreur technique temporaire est survenue.",
    action: null,
    executed: false,
    quota: { used: quotaStatus.used, limit: quotaStatus.limit, remaining: quotaStatus.remaining },
  };
}

/**
 * Multi-Step Agent Runner across any AIProvider
 */
async function executeMultiStepAgent(
  provider: AIProvider,
  userMessage: string,
  history: AIChatMessage[],
  context: AIUserContext,
  quotaStatus: { used: number; limit: number; remaining: number }
): Promise<AIEngineResponse> {
  const steps: AgentStep[] = [];
  const actionResults: AIActionExecutionResult[] = [];

  const systemPrompt = `Tu es l'Agence IA Personnelle & Copilote d'Action d'AlarmAgenda.
Tu es DIRECTEMENT intégré à l'application. Tu es à la fois un assistant conversationnel intelligent et un agent d'action rigoureux.

RÈGLE CARDINALE ABSOLUE : UNE CONVERSATION N'EST PAS UNE ACTION.
Tu dois TOUJOURS classifier l'intention réelle du message utilisateur :

1. CATÉGORIE CONVERSATION / ÉTAT D'ÂME / QUESTION GÉNÉRALE / REMERCIEMENTS :
   - Exemples : "Coucou", "Bonjour, comment vas-tu ?", "Je suis fatigué aujourd'hui", "Je suis en train de travailler", "Merci", "Au revoir", "Qui es-tu ?", "Que peux-tu faire ?".
   - RÈGLE STRICTE : INTERDICTION FORMELLE D'APPELER UN TOOL (0 tool call). Réponds avec naturel, empathie et intelligence sous forme de texte pur.

2. CATÉGORIE DEMANDE AMBIGUË OU INCOMPRISE :
   - Exemples : "Fais le truc de demain", "Fais quelque chose avec mon agenda", "Occupe-toi de mes trucs".
   - RÈGLE STRICTE : INTERDICTION D'INVENTER UNE ACTION FICTIVE. Demande poliment une clarification (0 tool call).

3. CATÉGORIE CONSULTATION / QUESTION SUR LE PLANNING :
   - Exemples : "Qu'est-ce que j'ai demain ?", "Fais le point sur ma semaine", "Ai-je des rendez-vous aujourd'hui ?".
   - Utilise les outils de lecture appropriés (search_events, list_today_events, list_week_events) ou réponds à partir du contexte fourni.

4. CATÉGORIE ACTION EXPLICITE D'AJOUT / MODIFICATION / ORGANISATION :
   - Exemples : "Rappelle-moi demain à 8h d'acheter des manchons" -> Appelle create_reminder
   - Exemples : "Ajoute un rendez-vous mardi à 14h chez le dentiste" -> Appelle create_event
   - Exemples : "Crée une tâche urgente Acheter du café" -> Appelle create_task
   - Exemples : "Organise ma journée de demain" -> Appelle organize_day
   - Exécute le tool avec des paramètres validés.

5. CATÉGORIE SUPPRESSION / ACTION SENSIBLE :
   - Exemples : "Supprime mon rendez-vous de vendredi".
   - Recherche l'événement correspondant et demande obligatoirement confirmation si 'confirmed' n'est pas explicitement vrai.

CONTEXTE EN TEMPS RÉEL :
- Date et Heure actuelle : ${context.currentDateFormatted} (ISO: ${context.currentTime})
- Fuseau horaire : ${context.timezone}
- Utilisateur : ${context.userName || "Utilisateur"}
- Quota restant : ${context.quotaRemaining}/${context.quotaLimit}
${
  context.activeTarget
    ? `- DERNIER ÉLÉMENT ACTIF : ${context.activeTarget.type} id=${context.activeTarget.id} titre="${context.activeTarget.title}" heure="${context.activeTarget.scheduledAt || ""}"`
    : ""
}

AGENDA EN COURS (Prochains 7 jours) :
${
  context.eventsSummary.length > 0
    ? context.eventsSummary
        .map((e) => `• [${e.id}] ${e.startFormatted} : "${e.title}" ${e.location ? `(📍 ${e.location})` : ""} ${e.contactName ? `(👤 ${e.contactName})` : ""}`)
        .join("\n")
    : "Aucun rendez-vous sur les 7 prochains jours."
}

TÂCHES EN COURS :
${
  context.tasksSummary.length > 0
    ? context.tasksSummary
        .map((t) => `• [${t.id}] "${t.title}" ${t.dueFormatted ? `(Échéance: ${t.dueFormatted})` : ""} ${t.priority === "URGENT" ? "⚠️ Urgent" : ""}`)
        .join("\n")
    : "Aucune tâche en attente."
}

RAPPELS / ALARMES :
${
  context.remindersSummary.length > 0
    ? context.remindersSummary.map((r) => `• "${r.title}" prévu pour ${r.fireFormatted} (${r.method})`).join("\n")
    : "Aucun rappel programmé."
}

MÉMOIRE PERSONNELLE (Information uniquement, ne constitue pas une demande d'action immédiate) :
${
  context.memorySummary.length > 0
    ? context.memorySummary.map((m) => `• ${m.key} = ${m.value}`).join("\n")
    : "Aucune préférence mémorisée."
}`;

  // Generate response & tool calls from the active provider
  const response: ProviderResponse = await provider.generateResponse(
    systemPrompt,
    history,
    userMessage,
    context,
    AI_TOOL_DEFINITIONS
  );

  let finalReply = response.text;
  const maxSteps = APP_CONFIG.AGENT.MAX_STEPS_PER_REQUEST;
  let executedCount = 0;

  if (response.directAction) {
    actionResults.push(response.directAction);
    steps.push({
      id: "step-1",
      label: response.directAction.title || "Action effectuée",
      status: "done",
      detail: response.directAction.notes,
    });
  }

  // Execute returned tool calls sequentially (Multi-step agent loop)
  for (const toolCall of response.toolCalls) {
    if (executedCount >= maxSteps) break;

    const stepId = `step-${executedCount + 1}`;
    steps.push({
      id: stepId,
      label: `Exécution : ${toolCall.name.replace(/_/g, " ")}`,
      status: "running",
    });

    try {
      const result = await executeAITool(toolCall.name, toolCall.args, context);
      actionResults.push(result);
      
      const stepIndex = steps.findIndex((s) => s.id === stepId);
      if (stepIndex !== -1) {
        steps[stepIndex] = {
          id: stepId,
          label: result.title || toolCall.name,
          status: "done",
          detail: result.notes,
        };
      }
    } catch (err: unknown) {
      const stepIndex = steps.findIndex((s) => s.id === stepId);
      if (stepIndex !== -1) {
        steps[stepIndex] = {
          id: stepId,
          label: `Erreur sur ${toolCall.name}`,
          status: "error",
          detail: err instanceof Error ? err.message : String(err),
        };
      }
    }

    executedCount++;
  }

  // If no text was returned, build consolidated synthesis from executed actions
  if (!finalReply && actionResults.length > 0) {
    if (actionResults.length === 1) {
      const first = actionResults[0];
      if (first.type === "EVENT") finalReply = `✅ Votre rendez-vous « **${first.title}** » a été planifié avec rappel automatique.`;
      else if (first.type === "TASK") finalReply = `✅ La tâche « **${first.title}** » a été enregistrée.`;
      else if (first.type === "REMINDER") finalReply = `🔔 Rappel « **${first.title}** » programmé.`;
      else if (first.type === "SCHEDULE") finalReply = first.notes || "Planning de la journée organisé.";
      else finalReply = first.title;
    } else {
      finalReply = `J'ai exécuté **${actionResults.length} actions** pour vous :\n\n` +
        actionResults.map((a) => `• **${a.type}** : ${a.title}`).join("\n");
    }
  }

  const primaryAction = actionResults.length > 0 ? actionResults[0] : null;
  const newActiveTarget = primaryAction && (primaryAction.type === "EVENT" || primaryAction.type === "TASK" || primaryAction.type === "REMINDER")
    ? {
        type: primaryAction.type as "EVENT" | "TASK" | "REMINDER",
        id: primaryAction.id || "",
        title: primaryAction.title,
        scheduledAt: primaryAction.dateTime,
      }
    : context.activeTarget;

  return {
    reply: finalReply || "Je suis à votre écoute.",
    spokenReply: (finalReply || "").replace(/\*\*/g, "").replace(/[•✅🔔📍👤]/g, ""),
    action: primaryAction,
    steps,
    activeTarget: newActiveTarget,
    saved: actionResults.length > 0,
    executed: true,
    quota: {
      used: quotaStatus.used,
      limit: quotaStatus.limit,
      remaining: quotaStatus.remaining,
    },
  };
}
