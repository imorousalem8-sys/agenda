import { AIUserContext, AIEngineResponse, AIActionExecutionResult } from "./types";
import { executeAITool } from "./tools";
import { addDays, setHours, setMinutes, parseISO } from "date-fns";

export type TaskStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface OrchestratedTask {
  id: string;
  type: "EVENT" | "REMINDER" | "TASK" | "CANCEL" | "RESCHEDULE";
  description: string;
  status: TaskStatus;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  scheduledAt?: string;
  createdAt: string;
  completedAt?: string;
  userId: string;
  error?: string;
  result?: AIActionExecutionResult;
}

export async function processMultiTaskQueue(
  userId: string,
  rawTasks: Array<{
    type: "CREATE_EVENT" | "CREATE_REMINDER" | "CREATE_TASK" | "CANCEL" | "RESCHEDULE";
    rawText: string;
  }>,
  context: AIUserContext
): Promise<AIEngineResponse> {
  const queue: OrchestratedTask[] = rawTasks.map((t, idx) => ({
    id: `task_${Date.now()}_${idx + 1}`,
    type: t.type === "CREATE_EVENT"
      ? "EVENT"
      : t.type === "CREATE_REMINDER"
      ? "REMINDER"
      : t.type === "CREATE_TASK"
      ? "TASK"
      : t.type === "CANCEL"
      ? "CANCEL"
      : "RESCHEDULE",
    description: t.rawText,
    status: "PENDING",
    priority: "NORMAL",
    createdAt: new Date().toISOString(),
    userId,
  }));

  const executedResults: AIActionExecutionResult[] = [];
  const confirmations: string[] = [];
  const errors: string[] = [];

  for (const task of queue) {
    task.status = "PROCESSING";
    try {
      const execResult = await executeSubTask(task, context);
      task.status = "COMPLETED";
      task.completedAt = new Date().toISOString();
      task.result = execResult;
      executedResults.push(execResult);

      if (execResult.type === "EVENT") {
        confirmations.push(`📅 Rendez-vous : **${execResult.title}** planifié.`);
      } else if (execResult.type === "REMINDER") {
        confirmations.push(`🔔 Rappel : **${execResult.title}** programmé.`);
      } else if (execResult.type === "TASK") {
        confirmations.push(`✅ Tâche : **${execResult.title}** ajoutée.`);
      } else {
        confirmations.push(`✔️ ${execResult.title}`);
      }
    } catch (err: unknown) {
      task.status = "FAILED";
      const errorMsg = err instanceof Error ? err.message : String(err);
      task.error = errorMsg;
      errors.push(`❌ Échec pour « ${task.description} » : ${errorMsg}`);
    }
  }

  const isAllSuccess = errors.length === 0;
  const replySummary = isAllSuccess
    ? `Tout est parfaitement organisé ! J'ai exécuté vos ${queue.length} demandes :\n\n${confirmations.map((c) => `• ${c}`).join("\n")}`
    : `J'ai traité vos demandes avec les résultats suivants :\n\n${confirmations.map((c) => `• ${c}`).join("\n")}\n${errors.join("\n")}`;

  const spokenSummary = isAllSuccess
    ? `C'est fait, vos ${queue.length} demandes ont été enregistrées avec succès.`
    : `Vos demandes ont été traitées.`;

  return {
    reply: replySummary,
    spokenReply: spokenSummary,
    action: executedResults[0] || null,
    executed: executedResults.length > 0,
  };
}

/**
 * Exécute une sous-tâche avec extraction intelligente des dates, heures et contacts
 */
async function executeSubTask(
  task: OrchestratedTask,
  context: AIUserContext
): Promise<AIActionExecutionResult> {
  const text = task.description;
  const lower = text.toLowerCase();

  // Extraction intelligente de la date cible
  const now = new Date(context.currentTime || new Date());
  let targetDate = new Date(now);

  if (lower.includes("demain")) {
    targetDate = addDays(now, 1);
  } else if (lower.includes("après-demain") || lower.includes("apres-demain")) {
    targetDate = addDays(now, 2);
  } else if (lower.includes("lundi")) {
    targetDate = getNextDayOfWeek(now, 1);
  } else if (lower.includes("mardi")) {
    targetDate = getNextDayOfWeek(now, 2);
  } else if (lower.includes("mercredi")) {
    targetDate = getNextDayOfWeek(now, 3);
  } else if (lower.includes("jeudi")) {
    targetDate = getNextDayOfWeek(now, 4);
  } else if (lower.includes("vendredi")) {
    targetDate = getNextDayOfWeek(now, 5);
  } else if (lower.includes("samedi")) {
    targetDate = getNextDayOfWeek(now, 6);
  } else if (lower.includes("dimanche")) {
    targetDate = getNextDayOfWeek(now, 0);
  }

  // Extraction intelligente de l'heure (ex: "14h", "18h30", "15h")
  const hourMatch = text.match(/(\d{1,2})(?:h|:)(\d{2})?/i);
  if (hourMatch) {
    const hours = parseInt(hourMatch[1], 10);
    const minutes = hourMatch[2] ? parseInt(hourMatch[2], 10) : 0;
    targetDate = setHours(targetDate, hours);
    targetDate = setMinutes(targetDate, minutes);
    targetDate.setSeconds(0, 0);
  } else {
    // Heure par défaut selon le moment de la journée
    if (lower.includes("matin")) {
      targetDate = setHours(targetDate, 9);
    } else if (lower.includes("soir")) {
      targetDate = setHours(targetDate, 18);
    } else {
      targetDate = setHours(targetDate, 10);
    }
    targetDate = setMinutes(targetDate, 0);
    targetDate.setSeconds(0, 0);
  }

  // Extraction de la personne si mentionnée ("avec Paul", "avec Dominique")
  const contactMatch = text.match(/(?:avec|pour|chez|appeler|contacter)\s+([A-ZÀ-Ÿ][a-zà-ÿ]+)/);
  const contactName = contactMatch ? contactMatch[1] : undefined;

  if (task.type === "EVENT") {
    // Nettoyer le titre
    let title = text.replace(/(?:prends|crée|ajoute|planifie|fixe)\s+(?:un\s+)?(?:rendez-vous|rdv)\s*/i, "").trim();
    if (!title || title.length < 3) {
      title = contactName ? `Rendez-vous avec ${contactName}` : "Rendez-vous";
    }

    return await executeAITool(
      "create_event",
      {
        title,
        startAt: targetDate.toISOString(),
        contactName,
      },
      context
    );
  }

  if (task.type === "REMINDER") {
    let title = text
      .replace(/(?:rappelle-moi|rappel|alarme)\s*(?:à|a)?\s*\d{1,2}(?:h|:)\d{0,2}\s*(?:d'|de|pour)?\s*/i, "")
      .replace(/(?:vendredi|lundi|mardi|mercredi|jeudi|samedi|dimanche|demain)\s*/i, "")
      .trim();

    if (!title || title.length < 2) {
      title = text;
    }

    return await executeAITool(
      "create_reminder",
      {
        title,
        fireAt: targetDate.toISOString(),
        method: "VOICE",
      },
      context
    );
  }

  if (task.type === "TASK") {
    let title = text
      .replace(/(?:ajoute|crée|fais)\s*(?:la\s+tâche\s+)?/i, "")
      .trim();

    return await executeAITool(
      "create_task",
      {
        title,
        dueAt: targetDate.toISOString(),
      },
      context
    );
  }

  if (task.type === "CANCEL") {
    if (lower.includes("rappel") || lower.includes("alarme")) {
      return await executeAITool("delete_reminder", { query: text }, context);
    }
    return await executeAITool("delete_event", { eventTitleQuery: text, confirmed: true }, context);
  }

  if (task.type === "RESCHEDULE") {
    if (lower.includes("rappel") || lower.includes("alarme")) {
      return await executeAITool("update_reminder", { query: text, newFireAt: targetDate.toISOString() }, context);
    }
    return await executeAITool("update_event", { eventTitleQuery: text, newStartAt: targetDate.toISOString() }, context);
  }

  throw new Error(`Type de tâche non supporté : ${task.type}`);
}

function getNextDayOfWeek(fromDate: Date, dayOfWeek: number): Date {
  const resultDate = new Date(fromDate);
  const currentDay = fromDate.getDay();
  let distance = dayOfWeek - currentDay;
  if (distance <= 0) {
    distance += 7;
  }
  resultDate.setDate(fromDate.getDate() + distance);
  return resultDate;
}
