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

  const systemPrompt = `Tu es l'Assistant IA & Copilote d'Action d'AlarmAgenda.
Tu es DIRECTEMENT intégré à l'application. Tu as accès aux données réelles de l'utilisateur et tu peux exécuter des actions concrètes via tes outils.

CONTEXTE ACTUEL :
- Date et Heure actuelle : ${context.currentDateFormatted} (ISO: ${context.currentTime})
- Fuseau horaire de l'utilisateur : ${context.timezone}
- Utilisateur : ${context.userName || "Utilisateur"}
- Quota restant : ${context.quotaRemaining}/${context.quotaLimit}
${
  context.activeTarget
    ? `- DERNIER OBJET MANIPULÉ : ${context.activeTarget.type} id=${context.activeTarget.id} titre="${context.activeTarget.title}" heure="${context.activeTarget.scheduledAt || ""}"`
    : ""
}

AGENDA (Prochains 7 jours) :
${
  context.eventsSummary.length > 0
    ? context.eventsSummary
        .map((e) => `• [${e.id}] ${e.startFormatted} : "${e.title}" ${e.location ? `(📍 ${e.location})` : ""} ${e.contactName ? `(👤 ${e.contactName})` : ""}`)
        .join("\n")
    : "Aucun rendez-vous sur les 7 prochains jours."
}

TÂCHES ACTIVES :
${
  context.tasksSummary.length > 0
    ? context.tasksSummary
        .map((t) => `• [${t.id}] "${t.title}" ${t.dueFormatted ? `(Échéance: ${t.dueFormatted})` : ""} ${t.priority === "URGENT" ? "⚠️ Urgent" : ""}`)
        .join("\n")
    : "Aucune tâche en attente."
}

RAPPELS ACTIFS :
${
  context.remindersSummary.length > 0
    ? context.remindersSummary.map((r) => `• "${r.title}" prévu pour ${r.fireFormatted} (${r.method})`).join("\n")
    : "Aucun rappel en attente."
}

MÉMOIRE UTILISATEUR :
${
  context.memorySummary.length > 0
    ? context.memorySummary.map((m) => `• ${m.key} = ${m.value}`).join("\n")
    : "Aucune préférence mémorisée."
}

RÈGLES D'ACTION MULTI-OUTILS & PRÉCISION :
1. ANALYSE ET DÉCOMPOSITION :
   - Si la demande de l'utilisateur contient plusieurs actions (ex: *"Demain chantier 8h, il me manque 2 coudes, rappelle-moi d'aller chez le fournisseur avant et d'appeler Martin à 17h"*), EXÉCUTE TOUS LES OUTILS PERTINENTS (créer l'événement, créer la tâche, créer les rappels).
2. VALIDATION STRICTE DU TEMPS :
   - Ne jamais inventer d'heure si l'utilisateur est vague (ex: *"Demain matin"* sans précision). Si aucune préférence de réveil/matin n'est connue, demande une clarification polie.
3. RESPECT DU FUSEAU HORAIRE :
   - Toutes les dates doivent être calculées précisément par rapport au fuseau ${context.timezone} et à l'heure actuelle (${context.currentDateFormatted}).
4. STYLE DE RÉPONSE :
   - Synthétise clairement toutes les actions accomplies de manière élégante et rassurante.`;

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
