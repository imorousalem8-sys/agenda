import { prisma } from "@/lib/prisma";
import { AIUserContext } from "./types";
import { getQuotaStatus } from "./quotas";
import { addDays, subHours } from "date-fns";

export async function buildUserAIContext(
  userId: string
): Promise<AIUserContext> {
  const now = new Date();
  const nextWeek = addDays(now, 7);
  const pastHours = subHours(now, 12);

  const currentDateFormatted = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Default safe empty structures in case database is offline or during cold starts
  let userName: string | undefined = undefined;
  let timezone = "Europe/Paris";
  let events: Array<{
    id: string;
    title: string;
    startAt: Date;
    location?: string | null;
    category: string;
    mode: string;
    contact?: { firstName: string; lastName?: string | null } | null;
  }> = [];
  let tasks: Array<{
    id: string;
    title: string;
    dueAt?: Date | null;
    priority: string;
    isDone: boolean;
    mode: string;
  }> = [];
  let reminders: Array<{
    id: string;
    title: string;
    fireAt: Date;
    status: string;
    method: string;
  }> = [];
  let contacts: Array<{
    id: string;
    firstName: string;
    lastName?: string | null;
    phone?: string | null;
    email?: string | null;
  }> = [];
  let memories: Array<{ key: string; value: string }> = [];

  try {
    const [userRes, eventsRes, tasksRes, remindersRes, contactsRes, memoriesRes] = await Promise.allSettled([
      prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, timezone: true },
      }),
      prisma.event.findMany({
        where: {
          userId,
          startAt: { gte: pastHours, lte: nextWeek },
        },
        include: { contact: true },
        orderBy: { startAt: "asc" },
        take: 15,
      }),
      prisma.task.findMany({
        where: {
          userId,
          isDone: false,
        },
        orderBy: [{ priority: "desc" }, { dueAt: "asc" }],
        take: 15,
      }),
      prisma.reminder.findMany({
        where: {
          userId,
          status: "PENDING",
          fireAt: { gte: now },
        },
        orderBy: { fireAt: "asc" },
        take: 8,
      }),
      prisma.contact.findMany({
        where: { userId },
        orderBy: { firstName: "asc" },
        take: 25,
      }),
      prisma.userMemory.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        take: 20,
      }),
    ]);

    if (userRes.status === "fulfilled" && userRes.value) {
      userName = userRes.value.name || undefined;
      timezone = userRes.value.timezone || "Europe/Paris";
    }
    if (eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value)) {
      events = eventsRes.value as typeof events;
    }
    if (tasksRes.status === "fulfilled" && Array.isArray(tasksRes.value)) {
      tasks = tasksRes.value as typeof tasks;
    }
    if (remindersRes.status === "fulfilled" && Array.isArray(remindersRes.value)) {
      reminders = remindersRes.value as typeof reminders;
    }
    if (contactsRes.status === "fulfilled" && Array.isArray(contactsRes.value)) {
      contacts = contactsRes.value as typeof contacts;
    }
    if (memoriesRes.status === "fulfilled" && Array.isArray(memoriesRes.value)) {
      memories = memoriesRes.value;
    }
  } catch (err) {
    console.warn("buildUserAIContext query fallback:", err);
  }

  const quotaStatus = await getQuotaStatus(userId);

  return {
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
      contactName: e.contact ? `${e.contact.firstName} ${e.contact.lastName || ""}`.trim() : null,
    })),
    tasksSummary: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      dueAt: t.dueAt ? (t.dueAt instanceof Date ? t.dueAt.toISOString() : String(t.dueAt)) : null,
      dueFormatted: t.dueAt
        ? (t.dueAt instanceof Date
            ? t.dueAt.toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            : null)
        : null,
      priority: t.priority,
      isDone: t.isDone,
      mode: t.mode,
    })),
    remindersSummary: reminders.map((r) => ({
      id: r.id,
      title: r.title,
      fireAt: r.fireAt instanceof Date ? r.fireAt.toISOString() : String(r.fireAt),
      fireFormatted: r.fireAt instanceof Date
        ? r.fireAt.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      status: r.status,
      method: r.method,
    })),
    contactsSummary: contacts.map((c) => ({
      id: c.id,
      name: `${c.firstName} ${c.lastName || ""}`.trim(),
      phone: c.phone,
      email: c.email,
    })),
    memorySummary: memories.map((m) => ({
      key: m.key,
      value: m.value,
    })),
    quotaRemaining: quotaStatus.remaining,
    quotaLimit: quotaStatus.limit,
  };
}
