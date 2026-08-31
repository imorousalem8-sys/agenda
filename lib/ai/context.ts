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

  const [user, events, tasks, reminders, contacts, memories, quotaStatus] = await Promise.all([
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
    }).catch(() => []), // Graceful fallback if table doesn't exist yet
    getQuotaStatus(userId),
  ]);

  const timezone = user?.timezone || "Europe/Paris";

  const currentDateFormatted = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    userId,
    userName: user?.name,
    currentTime: now.toISOString(),
    currentDateFormatted,
    timezone,
    eventsSummary: events.map((e) => ({
      id: e.id,
      title: e.title,
      startAt: e.startAt.toISOString(),
      startFormatted: e.startAt.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: e.location,
      category: e.category,
      mode: e.mode,
      contactName: e.contact ? `${e.contact.firstName} ${e.contact.lastName || ""}`.trim() : null,
    })),
    tasksSummary: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      dueAt: t.dueAt ? t.dueAt.toISOString() : null,
      dueFormatted: t.dueAt
        ? t.dueAt.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
      priority: t.priority,
      isDone: t.isDone,
      mode: t.mode,
    })),
    remindersSummary: reminders.map((r) => ({
      id: r.id,
      title: r.title,
      fireAt: r.fireAt.toISOString(),
      fireFormatted: r.fireAt.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
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
