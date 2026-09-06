import { AIUserContext, AIEngineResponse, AIChatMessage, AIActionExecutionResult, AgentStep } from "./types";
import { buildSelectiveAIContext } from "./context";
import { executeAITool, AI_TOOL_DEFINITIONS } from "./tools";
import { checkAndIncrementQuota, getQuotaStatus } from "./quotas";
import { getAvailableAIProviders } from "./providers/factory";
import { AIProvider, ProviderResponse } from "./providers/base";
import { APP_CONFIG } from "@/lib/config";
import { resolveDbUserId } from "@/lib/dbUser";
import { routeUserIntent } from "./intentRouter";
import { processMultiTaskQueue } from "./taskQueue";
import { AITelemetryTracker } from "./telemetry";

export async function processUserAIMessage(
  userId: string,
  userMessage: string,
  conversationHistory: AIChatMessage[] = [],
  activeTarget?: AIUserContext["activeTarget"]
): Promise<AIEngineResponse> {
  const telemetry = new AITelemetryTracker(userMessage);
  telemetry.startIntentTimer();

  // 1. Fast Intent Routing Layer (< 2ms, 0 DB query, 0 LLM) - Exigence 1 & 27
  const route = routeUserIntent(userMessage);
  telemetry.endIntentTimer(route.intent, route.isFastRoute);

  // FAST PATH: Instant reply (< 5ms, 0 DB queries, 0 LLM inference, 0 quota waste)
  if (route.isFastRoute && route.fastResponse) {
    telemetry.finish(true);
    return route.fastResponse;
  }

  // 0. Ensure user exists in database with valid foreign key target for transactional operations
  const validUserId = await resolveDbUserId(userId);

  // 2. Multi-Task Queue Processing (Requirements #4, #5)
  if (route.intent === "MULTI_TASK" && route.subTasks && route.subTasks.length > 0) {
    telemetry.startDbTimer();
    const { context, dbQueriesCount } = await buildSelectiveAIContext(validUserId, route.intent);
    telemetry.endDbTimer(dbQueriesCount);
    if (activeTarget) context.activeTarget = activeTarget;

    telemetry.startExecutionTimer();
    route.subTasks.forEach((st) => telemetry.recordTool(st.type));
    const multiTaskResult = await processMultiTaskQueue(validUserId, route.subTasks, context);
    telemetry.endExecutionTimer();

    telemetry.finish(true);
    return multiTaskResult;
  }

  // 3. Check & increment user quota for AI execution
  const quotaStatus = await checkAndIncrementQuota(validUserId);
  if (quotaStatus.isExceeded) {
    telemetry.finish(false, "Quota exceeded");
    return {
      reply: `Vous avez atteint votre limite de **${quotaStatus.limit} requêtes IA** ce mois-ci. Passez au plan **Pro** pour continuer sans interruption avec 1000 requêtes/mois.`,
      spokenReply: `Vous avez atteint votre limite de requêtes IA ce mois-ci.`,
      action: null,
      executed: false,
      quota: { used: quotaStatus.used, limit: quotaStatus.limit, remaining: 0 },
    };
  }

  // 4. Selective Context Extraction (Only fetch what is needed!)
  telemetry.startDbTimer();
  const { context, dbQueriesCount } = await buildSelectiveAIContext(validUserId, route.intent);
  telemetry.endDbTimer(dbQueriesCount);

  if (activeTarget) {
    context.activeTarget = activeTarget;
  }

  // 5. Multi-Model Provider Fallback Chain (Gemini -> OpenAI -> Claude -> Local)
  const providers = getAvailableAIProviders();
  let lastError = "";

  for (const provider of providers) {
    try {
      telemetry.startLlmTimer();
      const response = await executeMultiStepAgent(
        provider,
        userMessage,
        conversationHistory,
        context,
        quotaStatus,
        telemetry
      );
      telemetry.endLlmTimer();
      telemetry.finish(true);
      return response;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(`AI Provider [${provider.name}] failed, cascading to next in chain... Error:`, lastError);
    }
  }

  telemetry.finish(false, lastError);
  // Safe universal fallback
  return {
    reply: "Je suis à votre disposition. Que souhaitez-vous planifier ou organiser dans votre agenda ?",
    spokenReply: "Je suis à votre écoute. Que souhaitez-vous organiser ?",
    action: null,
    executed: false,
    quota: { used: quotaStatus.used, limit: quotaStatus.limit, remaining: quotaStatus.remaining },
  };
}

/**
 * Multi-Step Agent Runner across any AIProvider with telemetry & backend verification
 */
async function executeMultiStepAgent(
  provider: AIProvider,
  userMessage: string,
  history: AIChatMessage[],
  context: AIUserContext,
  quotaStatus: { used: number; limit: number; remaining: number },
  telemetry: AITelemetryTracker
): Promise<AIEngineResponse> {
  const steps: AgentStep[] = [];
  const actionResults: AIActionExecutionResult[] = [];

  const systemPrompt = `Tu es l'Agence IA Personnelle & Copilote d'Action Exécutif d'AlarmAgenda.
Tu es DIRECTEMENT connecté à la base de données de l'application via tes outils intégrés. Tu disposes des pleins pouvoirs pour créer des rendez-vous, alarmes, tâches et consulter l'agenda.

CONSIGNE D'EXÉCUTION & POSITIONNEMENT :
1. RÔLE STRICT : Tu es l'Assistant & Copilote d'Agenda Exécutif de l'application AlarmAgenda (gestion du temps, calendrier, tâches, alarmes vocales, contacts).
   - INTERDICTION FORMELLE DE FOURNIR DU CODE, DU HTML, DU CSS OU DU JAVASCRIPT. Tu n'es PAS un assistant pour développeur informatique. Si l'utilisateur te demande ce que tu peux faire ou comment améliorer son quotidien, parle-lui uniquement de planification d'agenda, d'organisation de ses journées et de rappels vocaux.

2. LOGIQUE DE PRISE DE RENDEZ-VOUS :
   - Si l'utilisateur mentionne un contact ou un événement SANS AUCUNE DATE NI HEURE (ex: "Prends rendez-vous avec Dominique", "Prends mon rdv avec le médecin") :
     Demande-lui simplement et poliment pour quel jour et à quelle heure il souhaite ce rendez-vous (ex: "Avec plaisir. Pour quel jour et à quelle heure souhaitez-vous planifier ce rendez-vous avec Dominique ?"). Ne crée pas de rendez-vous fantôme sans son indication d'horaire !
   - Dès qu'une date ou heure est indiquée (ex: "Demain à 14h", "Prends rendez-vous à 16h avec Dominique", "Jeudi à 10h") :
     APPELLE IMMÉDIATEMENT L'OUTIL CORRESPONDANT (create_event, create_reminder, create_task) et confirme en une seule phrase claire.

3. CLASSIFICATION RAPIDE :
   - Rendez-vous avec date/heure -> create_event
   - Alarme ou rappel vocal -> create_reminder
   - Tâche à faire -> create_task
   - Consultation d'agenda -> search_events / list_today_events / list_week_events
   - Discussion / Salutations -> Réponse courtoise, chaleureuse et concise (0 tool call).

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

AGENDA EN COURS :
${
  context.eventsSummary.length > 0
    ? context.eventsSummary
        .map((e) => `• [${e.id}] ${e.startFormatted} : "${e.title}" ${e.location ? `(📍 ${e.location})` : ""} ${e.contactName ? `(👤 ${e.contactName})` : ""}`)
        .join("\n")
    : "Aucun rendez-vous enregistré sur cette période."
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
    ? context.remindersSummary.map((r) => `• [${r.id}] "${r.title}" prévu pour ${r.fireFormatted} (${r.method})`).join("\n")
    : "Aucun rappel programmé."
}

MÉMOIRE PERSONNELLE :
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

    telemetry.recordTool(toolCall.name);
    telemetry.startExecutionTimer();

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
    } finally {
      telemetry.endExecutionTimer();
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
