import { prisma } from "@/lib/prisma";
import { AIUserContext } from "./types";
import { getQuotaStatus } from "./quotas";
import { addDays, subHours, startOfDay, endOfDay } from "date-fns";
import { resolveDbUserId } from "@/lib/dbUser";
import { DetectedIntentType } from "./intentRouter";

// Cache utilisateur en mémoire (5 minutes) pour éviter des requêtes répétées
const userProfileCache = new Map<string, { name?: string; timezone: string; cachedAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function buildSelectiveAIContext(
  rawUserId: string,
  intent?: DetectedIntentType,
  targetDate?: Date
): Promise<{ context: AIUserContext; dbQueriesCount: number }> {
  const userId = await resolveDbUserId(rawUserId);
  const now = new Date();
  let dbQueriesCount = 0;

  const currentDateFormatted = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 1. Récupération profil / timezone (avec cache mémoire ultra-rapide)
  let userName: string | undefined = undefined;
  let timezone = "Europe/Paris";

  const cached = userProfileCache.get(userId);
  if (cached && now.getTime() - cached.cachedAt < CACHE_TTL_MS) {
    userName = cached.name;
    timezone = cached.timezone;
  } else {
    try {
      dbQueriesCount++;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, timezone: true },
      });
      if (user) {
        userName = user.name || undefined;
        timezone = user.timezone || "Europe/Paris";
        userProfileCache.set(userId, { name: userName, timezone, cachedAt: now.getTime() });
      }
    } catch (err) {
      console.warn("User profile fetch notice:", err);
    }
  }

  let events: Array<any> = [];
  let tasks: Array<any> = [];
  let reminders: Array<any> = [];
  let contacts: Array<any> = [];
  let memories: Array<{ key: string; value: string }> = [];

  // 2. Requêtes sélectives conditionnées par l'intention détectée
  try {
    if (intent === "CALENDAR_VIEW" || intent === "RESCHEDULE_ACTION") {
      dbQueriesCount++;
      const rangeStart = targetDate ? startOfDay(targetDate) : subHours(now, 2);
      const rangeEnd = targetDate ? endOfDay(targetDate) : addDays(now, 7);

      events = await prisma.event.findMany({
        where: { userId, startAt: { gte: rangeStart, lte: rangeEnd } },
        include: { contact: true },
        orderBy: { startAt: "asc" },
        take: 10,
      });
    } else if (intent === "REMINDER_VIEW" || intent === "CANCEL_ACTION") {
      dbQueriesCount++;
      reminders = await prisma.reminder.findMany({
        where: { userId, status: "PENDING" },
        orderBy: { fireAt: "asc" },
        take: 8,
      });
    } else if (intent === "TASK_VIEW" || intent === "COMPLETE_ACTION") {
      dbQueriesCount++;
      tasks = await prisma.task.findMany({
        where: { userId, isDone: false },
        orderBy: [{ priority: "desc" }, { dueAt: "asc" }],
        take: 10,
      });
    } else if (intent === "COMPLEX_OR_LLM") {
      // Contexte complet mais limité si demande libre ou complexe
      dbQueriesCount += 3;
      const [eventsRes, tasksRes, remindersRes] = await Promise.all([
        prisma.event.findMany({
          where: { userId, startAt: { gte: subHours(now, 4), lte: addDays(now, 5) } },
          include: { contact: true },
          orderBy: { startAt: "asc" },
          take: 8,
        }),
        prisma.task.findMany({
          where: { userId, isDone: false },
          orderBy: [{ priority: "desc" }, { dueAt: "asc" }],
          take: 8,
        }),
        prisma.reminder.findMany({
          where: { userId, status: "PENDING", fireAt: { gte: now } },
          orderBy: { fireAt: "asc" },
          take: 6,
        }),
      ]);
      events = eventsRes;
      tasks = tasksRes;
      reminders = remindersRes;
    }
    // Pour CREATE_EVENT / CREATE_REMINDER / CREATE_TASK : 0 requête supplémentaire requise avant l'insertion !
  } catch (err) {
    console.warn("Selective AI context fetch notice:", err);
  }

  const quotaStatus = await getQuotaStatus(userId);

  const context: AIUserContext = {
    userId,
    userName,
    currentTime: now.toISOString(),
    currentDateFormatted,
    timezone,
    eventsSummary: events.map((e) => ({
      id: e.id,
      title: e.title,
      startAt: e.startAt instanceof Date ? e.startAt.toISOString() : String(e.startAt),
      startFormatted: e.startAt instanceof Date
        ? e.startAt.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      location: e.location,
      category: e.category,
      mode: e.mode,
      contactName: e.contact ? `${e.contact.firstName} ${e.contact.lastName || ""}`.trim() : undefined,
    })),
    tasksSummary: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      dueAt: t.dueAt ? (t.dueAt instanceof Date ? t.dueAt.toISOString() : String(t.dueAt)) : undefined,
      dueFormatted: t.dueAt && t.dueAt instanceof Date
        ? t.dueAt.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : undefined,
      priority: t.priority,
      isDone: Boolean(t.isDone),
      mode: t.mode,
    })),
    remindersSummary: reminders.map((r) => ({
      id: r.id,
      title: r.title,
      fireAt: r.fireAt instanceof Date ? r.fireAt.toISOString() : String(r.fireAt),
      fireFormatted: r.fireAt instanceof Date
        ? r.fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        : "",
      method: r.method,
      status: r.status,
    })),
    contactsSummary: contacts.map((c) => ({
      id: c.id,
      name: `${c.firstName} ${c.lastName || ""}`.trim(),
      phone: c.phone,
      email: c.email,
    })),
    memorySummary: memories,
    quotaLimit: quotaStatus.limit,
    quotaRemaining: quotaStatus.remaining,
  };

  return { context, dbQueriesCount };
}

// Fonction rétro-compatible
export async function buildUserAIContext(rawUserId: string): Promise<AIUserContext> {
  const { context } = await buildSelectiveAIContext(rawUserId, "COMPLEX_OR_LLM");
  return context;
}
