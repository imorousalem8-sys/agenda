import { prisma } from "@/lib/prisma";
import { AIActionExecutionResult, AIUserContext } from "./types";
import { logAgentAction } from "./logger";
import { parseISO, addMinutes, formatISO, startOfDay, endOfDay, addDays } from "date-fns";

export const AI_TOOL_DEFINITIONS = [
  {
    name: "create_event",
    description: "Crée un nouveau rendez-vous ou événement dans l'agenda de l'utilisateur avec rappel automatique.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Intitulé clair du rendez-vous" },
        startAt: { type: "string", description: "Date et heure de début au format ISO 8601" },
        location: { type: "string", description: "Lieu du rendez-vous (optionnel)" },
        description: { type: "string", description: "Notes ou détails complémentaires" },
        contactName: { type: "string", description: "Nom de la personne concernée si mentionnée" },
        priority: { type: "string", enum: ["LOW", "NORMAL", "HIGH", "URGENT"], description: "Niveau de priorité" },
        category: { type: "string", enum: ["HEALTH", "FAMILY", "WORK", "ADMIN", "EDUCATION", "SHOPPING", "TRAVEL", "OTHER"] },
        reminderMinutesBefore: { type: "number", description: "Minutes avant le rendez-vous pour le rappel (ex: 15, 30, 60)" },
      },
      required: ["title", "startAt"],
    },
  },
  {
    name: "update_event",
    description: "Modifie ou décale un rendez-vous existant.",
    parameters: {
      type: "object",
      properties: {
        eventId: { type: "string", description: "ID du rendez-vous à modifier" },
        eventTitleQuery: { type: "string", description: "Titre ou mot-clé pour retrouver l'événement" },
        newTitle: { type: "string", description: "Nouveau titre" },
        newStartAt: { type: "string", description: "Nouvel horaire ISO 8601" },
        newLocation: { type: "string", description: "Nouveau lieu" },
        newDescription: { type: "string", description: "Nouvelle description" },
      },
      required: [],
    },
  },
  {
    name: "delete_event",
    description: "Supprime un rendez-vous (nécessite confirmation).",
    parameters: {
      type: "object",
      properties: {
        eventId: { type: "string", description: "ID de l'événement" },
        eventTitleQuery: { type: "string", description: "Titre de l'événement" },
        confirmed: { type: "boolean", description: "True si confirmé par l'utilisateur" },
      },
      required: [],
    },
  },
  {
    name: "create_task",
    description: "Crée une nouvelle tâche avec priorité et échéance.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Titre de la tâche" },
        dueAt: { type: "string", description: "Date limite ISO 8601" },
        notes: { type: "string", description: "Détails ou liste de matériel" },
        contactName: { type: "string", description: "Personne associée" },
        priority: { type: "string", enum: ["LOW", "NORMAL", "HIGH", "URGENT"] },
        reminderAt: { type: "string", description: "Date/heure du rappel ISO 8601" },
      },
      required: ["title"],
    },
  },
  {
    name: "complete_task",
    description: "Marque une tâche comme terminée.",
    parameters: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "ID de la tâche" },
        taskTitleQuery: { type: "string", description: "Titre ou mot-clé de la tâche" },
      },
      required: [],
    },
  },
  {
    name: "delete_task",
    description: "Supprime une tâche (nécessite confirmation).",
    parameters: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "ID de la tâche" },
        taskTitleQuery: { type: "string", description: "Titre de la tâche" },
        confirmed: { type: "boolean", description: "True si confirmé" },
      },
      required: [],
    },
  },
  {
    name: "create_reminder",
    description: "Programme un rappel avec message vocal.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Objet du rappel" },
        fireAt: { type: "string", description: "Date/heure de déclenchement ISO 8601" },
        customSpokenMessage: { type: "string", description: "Texte vocal à énoncer" },
        method: { type: "string", enum: ["VOICE", "ALARM", "NOTIFICATION"] },
      },
      required: ["title", "fireAt"],
    },
  },
  {
    name: "create_contact",
    description: "Ajoute un nouveau contact dans le répertoire.",
    parameters: {
      type: "object",
      properties: {
        firstName: { type: "string", description: "Prénom" },
        lastName: { type: "string", description: "Nom de famille" },
        phone: { type: "string", description: "Numéro de téléphone" },
        email: { type: "string", description: "Adresse email" },
        company: { type: "string", description: "Société ou fonction" },
        notes: { type: "string", description: "Notes utiles" },
      },
      required: ["firstName"],
    },
  },
  {
    name: "search_events",
    description: "Recherche des événements par titre, date ou mot-clé dans l'agenda.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Mot-clé ou titre à rechercher" },
        dateFrom: { type: "string", description: "Date de début de recherche ISO 8601" },
        dateTo: { type: "string", description: "Date de fin de recherche ISO 8601" },
      },
      required: [],
    },
  },
  {
    name: "list_today_events",
    description: "Liste tous les événements, tâches et rappels d'aujourd'hui.",
    parameters: { type: "object", properties: {}, required: [] },
  },
  {
    name: "list_week_events",
    description: "Liste tous les événements de la semaine en cours.",
    parameters: { type: "object", properties: {}, required: [] },
  },
  {
    name: "organize_day",
    description: "Analyse l'agenda, les tâches et rappels d'une journée et propose un planning optimisé.",
    parameters: {
      type: "object",
      properties: {
        targetDate: { type: "string", description: "Date ISO 8601 de la journée à organiser (par défaut demain)" },
      },
      required: [],
    },
  },
  {
    name: "save_user_preference",
    description: "Mémorise une préférence de l'utilisateur pour les futures interactions.",
    parameters: {
      type: "object",
      properties: {
        key: { type: "string", description: "Clé de la préférence (ex: preferred_reminder_minutes, wake_time)" },
        value: { type: "string", description: "Valeur à mémoriser" },
      },
      required: ["key", "value"],
    },
  },
  {
    name: "retrieve_user_preferences",
    description: "Récupère toutes les préférences mémorisées de l'utilisateur.",
    parameters: { type: "object", properties: {}, required: [] },
  },
];

export async function executeAITool(
  toolName: string,
  args: Record<string, unknown>,
  context: AIUserContext
): Promise<AIActionExecutionResult> {
  const userId = context.userId;
  const startTime = Date.now();

  try {
    const result = await executeToolInternal(toolName, args, context);
    const duration = Date.now() - startTime;
    logAgentAction(userId, toolName, args, true, duration);
    return result;
  } catch (err: unknown) {
    const duration = Date.now() - startTime;
    const errorMsg = err instanceof Error ? err.message : String(err);
    logAgentAction(userId, toolName, args, false, duration, errorMsg);
    throw err;
  }
}

async function executeToolInternal(
  toolName: string,
  args: Record<string, unknown>,
  context: AIUserContext
): Promise<AIActionExecutionResult> {
  const userId = context.userId;

  switch (toolName) {
    case "create_event": {
      const title = String(args.title || "Rendez-vous");
      const startAtStr = String(args.startAt);
      const startAt = parseISO(startAtStr);
      const location = args.location ? String(args.location) : undefined;
      const description = args.description ? String(args.description) : undefined;
      const contactName = args.contactName ? String(args.contactName) : undefined;
      const priority = (args.priority as "LOW" | "NORMAL" | "HIGH" | "URGENT") || "NORMAL";
      const category = String(args.category || "OTHER");
      const reminderMinutes = typeof args.reminderMinutesBefore === "number" ? args.reminderMinutesBefore : 15;

      // Auto-detect mode from context clues
      const mode = detectMode(title, description, category);

      let contactId: string | undefined = undefined;
      if (contactName) {
        let contact = await prisma.contact.findFirst({
          where: { userId, firstName: { contains: contactName, mode: "insensitive" } },
        });
        if (!contact) {
          contact = await prisma.contact.create({
            data: { userId, firstName: contactName, notes: "Créé automatiquement par l'IA." },
          });
        }
        contactId = contact.id;
      }

      const event = await prisma.event.create({
        data: {
          userId,
          title,
          startAt,
          location,
          description,
          priority,
          mode,
          category,
          contactId,
        },
      });

      const reminderTime = addMinutes(startAt, -reminderMinutes);
      const fireAt = reminderTime > new Date() ? reminderTime : startAt;
      const timeStr = startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

      await prisma.reminder.create({
        data: {
          userId,
          eventId: event.id,
          title: `Rendez-vous : ${title}`,
          body: `Votre rendez-vous ${contactName ? `avec ${contactName}` : ""} est prévu à ${timeStr}.${location ? ` Lieu : ${location}.` : ""}`,
          fireAt,
          method: "VOICE",
          status: "PENDING",
        },
      });

      return {
        id: event.id,
        type: "EVENT",
        title: event.title,
        notes: description || `Rendez-vous planifié pour ${timeStr}`,
        dateTime: formatISO(startAt),
        contactName,
        priority,
        mode,
        category,
        level: 1,
      };
    }

    case "update_event": {
      let eventId = args.eventId ? String(args.eventId) : undefined;
      const titleQuery = args.eventTitleQuery ? String(args.eventTitleQuery).toLowerCase() : undefined;

      if (!eventId && context.activeTarget?.type === "EVENT") {
        eventId = context.activeTarget.id;
      }
      if (!eventId && titleQuery) {
        const found = context.eventsSummary.find((e) => e.title.toLowerCase().includes(titleQuery));
        if (found) eventId = found.id;
      }
      if (!eventId && context.eventsSummary.length > 0) {
        eventId = context.eventsSummary[0].id;
      }
      if (!eventId) throw new Error("Impossible de trouver le rendez-vous à modifier.");

      const updateData: Record<string, unknown> = {};
      if (args.newTitle) updateData.title = String(args.newTitle);
      if (args.newStartAt) updateData.startAt = parseISO(String(args.newStartAt));
      if (args.newLocation) updateData.location = String(args.newLocation);
      if (args.newDescription) updateData.description = String(args.newDescription);

      const updated = await prisma.event.update({
        where: { id: eventId, userId },
        data: updateData,
      });

      if (args.newStartAt) {
        const newStart = parseISO(String(args.newStartAt));
        const newReminderTime = addMinutes(newStart, -15);
        const timeStr = newStart.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        await prisma.reminder.updateMany({
          where: { eventId: updated.id, userId },
          data: {
            fireAt: newReminderTime > new Date() ? newReminderTime : newStart,
            body: `Rappel mis à jour : votre rendez-vous est prévu à ${timeStr}.`,
            status: "PENDING",
          },
        });
      }

      return {
        id: updated.id,
        type: "EVENT",
        title: updated.title,
        notes: "Rendez-vous mis à jour avec succès.",
        dateTime: formatISO(updated.startAt),
        level: 2,
      };
    }

    case "delete_event": {
      let eventId = args.eventId ? String(args.eventId) : undefined;
      const titleQuery = args.eventTitleQuery ? String(args.eventTitleQuery).toLowerCase() : undefined;

      if (!eventId && context.activeTarget?.type === "EVENT") eventId = context.activeTarget.id;
      if (!eventId && titleQuery) {
        const found = context.eventsSummary.find((e) => e.title.toLowerCase().includes(titleQuery));
        if (found) eventId = found.id;
      }
      if (!eventId) throw new Error("Rendez-vous introuvable pour la suppression.");

      const existing = await prisma.event.findUnique({ where: { id: eventId, userId } });
      if (!existing) throw new Error("Rendez-vous introuvable.");

      if (!args.confirmed) {
        return {
          id: existing.id,
          type: "DELETE_CONFIRM",
          title: existing.title,
          requiresConfirmation: true,
          level: 2,
          confirmationPayload: { action: "DELETE_EVENT", targetId: existing.id, targetTitle: existing.title },
        };
      }

      await prisma.event.delete({ where: { id: eventId, userId } });
      return { id: eventId, type: "INFO", title: `Rendez-vous "${existing.title}" supprimé.`, level: 2 };
    }

    case "create_task": {
      const title = String(args.title || "Tâche");
      const dueAtStr = args.dueAt ? String(args.dueAt) : undefined;
      const dueAt = dueAtStr ? parseISO(dueAtStr) : undefined;
      const notes = args.notes ? String(args.notes) : undefined;
      const contactName = args.contactName ? String(args.contactName) : undefined;
      const priority = (args.priority as "LOW" | "NORMAL" | "HIGH" | "URGENT") || "NORMAL";
      const mode = detectMode(title, notes);

      let finalNotes = notes || "";
      if (contactName) finalNotes = `Personne concernée : ${contactName}. ${finalNotes}`.trim();

      const task = await prisma.task.create({
        data: { userId, title, notes: finalNotes || "Tâche créée par l'assistant.", dueAt, priority, mode, isDone: false },
      });

      const reminderAtStr = args.reminderAt ? String(args.reminderAt) : dueAtStr;
      if (reminderAtStr) {
        const fireAt = parseISO(reminderAtStr);
        const timeStr = fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        await prisma.reminder.create({
          data: {
            userId, taskId: task.id, title: `Tâche : ${title}`,
            body: `Tâche « ${title} » programmée à ${timeStr}.`, fireAt, method: "VOICE", status: "PENDING",
          },
        });
      }

      return { id: task.id, type: "TASK", title: task.title, notes: task.notes || undefined, dateTime: task.dueAt ? formatISO(task.dueAt) : undefined, contactName, priority, mode, level: 1 };
    }

    case "complete_task": {
      let taskId = args.taskId ? String(args.taskId) : undefined;
      const titleQuery = args.taskTitleQuery ? String(args.taskTitleQuery).toLowerCase() : undefined;

      if (!taskId && titleQuery) {
        const found = context.tasksSummary.find((t) => t.title.toLowerCase().includes(titleQuery));
        if (found) taskId = found.id;
      }
      if (!taskId && context.tasksSummary.length > 0) taskId = context.tasksSummary[0].id;
      if (!taskId) throw new Error("Tâche introuvable.");

      const updated = await prisma.task.update({ where: { id: taskId, userId }, data: { isDone: true } });
      return { id: updated.id, type: "INFO", title: `Tâche "${updated.title}" marquée comme terminée. ✅`, level: 1 };
    }

    case "delete_task": {
      let taskId = args.taskId ? String(args.taskId) : undefined;
      const titleQuery = args.taskTitleQuery ? String(args.taskTitleQuery).toLowerCase() : undefined;

      if (!taskId && titleQuery) {
        const found = context.tasksSummary.find((t) => t.title.toLowerCase().includes(titleQuery));
        if (found) taskId = found.id;
      }
      if (!taskId) throw new Error("Tâche introuvable.");

      const existing = await prisma.task.findUnique({ where: { id: taskId, userId } });
      if (!existing) throw new Error("Tâche introuvable.");

      if (!args.confirmed) {
        return {
          id: existing.id, type: "DELETE_CONFIRM", title: existing.title, requiresConfirmation: true, level: 2,
          confirmationPayload: { action: "DELETE_TASK", targetId: existing.id, targetTitle: existing.title },
        };
      }

      await prisma.task.delete({ where: { id: taskId, userId } });
      return { id: taskId, type: "INFO", title: `Tâche "${existing.title}" supprimée.`, level: 2 };
    }

    case "create_reminder": {
      const title = String(args.title || "Rappel");
      const fireAt = parseISO(String(args.fireAt));
      const customMessage = args.customSpokenMessage ? String(args.customSpokenMessage) : undefined;
      const method = (args.method as "VOICE" | "ALARM" | "NOTIFICATION") || "VOICE";
      const timeStr = fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      const bodyText = customMessage || `Rappel programmé pour ${timeStr} : ${title}.`;

      const reminder = await prisma.reminder.create({
        data: { userId, title, body: bodyText, fireAt, method, status: "PENDING" },
      });

      return { id: reminder.id, type: "REMINDER", title: reminder.title, notes: reminder.body || undefined, dateTime: formatISO(reminder.fireAt), level: 1 };
    }

    case "create_contact": {
      const firstName = String(args.firstName || "Contact");
      const contact = await prisma.contact.create({
        data: {
          userId, firstName,
          lastName: args.lastName ? String(args.lastName) : undefined,
          phone: args.phone ? String(args.phone) : undefined,
          email: args.email ? String(args.email) : undefined,
          company: args.company ? String(args.company) : undefined,
          notes: args.notes ? String(args.notes) : undefined,
        },
      });
      return { id: contact.id, type: "CONTACT", title: `${contact.firstName} ${contact.lastName || ""}`.trim(), level: 1 };
    }

    case "search_events": {
      const query = args.query ? String(args.query).toLowerCase() : "";
      const dateFrom = args.dateFrom ? parseISO(String(args.dateFrom)) : undefined;
      const dateTo = args.dateTo ? parseISO(String(args.dateTo)) : undefined;

      const where: Record<string, unknown> = { userId };
      if (query) where.title = { contains: query, mode: "insensitive" };
      if (dateFrom || dateTo) {
        const startAtFilter: Record<string, unknown> = {};
        if (dateFrom) startAtFilter.gte = dateFrom;
        if (dateTo) startAtFilter.lte = dateTo;
        where.startAt = startAtFilter;
      }

      const results = await prisma.event.findMany({
        where: where as Parameters<typeof prisma.event.findMany>[0]["where"],
        orderBy: { startAt: "asc" },
        take: 10,
      });

      const summary = results.map((e) => `• ${e.startAt.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} : ${e.title}`).join("\n");

      return {
        type: "INFO",
        title: results.length > 0 ? `${results.length} résultat(s) trouvé(s)` : "Aucun résultat trouvé",
        notes: summary || "Aucun événement ne correspond à cette recherche.",
        level: 1,
      };
    }

    case "list_today_events": {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      const [events, tasks, reminders] = await Promise.all([
        prisma.event.findMany({ where: { userId, startAt: { gte: todayStart, lte: todayEnd } }, orderBy: { startAt: "asc" } }),
        prisma.task.findMany({ where: { userId, isDone: false, dueAt: { gte: todayStart, lte: todayEnd } }, orderBy: { dueAt: "asc" } }),
        prisma.reminder.findMany({ where: { userId, status: "PENDING", fireAt: { gte: todayStart, lte: todayEnd } }, orderBy: { fireAt: "asc" } }),
      ]);

      let summary = "";
      if (events.length > 0) {
        summary += `📅 ${events.length} rendez-vous :\n`;
        events.forEach((e) => { summary += `• ${e.startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} — ${e.title}\n`; });
      }
      if (tasks.length > 0) {
        summary += `\n✅ ${tasks.length} tâche(s) :\n`;
        tasks.forEach((t) => { summary += `• ${t.title}${t.priority === "URGENT" ? " ⚠️" : ""}\n`; });
      }
      if (reminders.length > 0) {
        summary += `\n🔔 ${reminders.length} rappel(s) :\n`;
        reminders.forEach((r) => { summary += `• ${r.fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} — ${r.title}\n`; });
      }
      if (!summary) summary = "Rien de prévu aujourd'hui. Ta journée est libre !";

      return { type: "INFO", title: "Programme du jour", notes: summary, level: 1 };
    }

    case "list_week_events": {
      const weekStart = startOfDay(new Date());
      const weekEnd = endOfDay(addDays(new Date(), 7));

      const events = await prisma.event.findMany({
        where: { userId, startAt: { gte: weekStart, lte: weekEnd } },
        orderBy: { startAt: "asc" },
      });

      let summary = "";
      if (events.length > 0) {
        events.forEach((e) => {
          summary += `• ${e.startAt.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} ${e.startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} — ${e.title}\n`;
        });
      } else {
        summary = "Aucun rendez-vous cette semaine.";
      }

      return { type: "INFO", title: `${events.length} événement(s) cette semaine`, notes: summary, level: 1 };
    }

    case "organize_day": {
      const targetDateStr = args.targetDate ? String(args.targetDate) : undefined;
      const targetDay = targetDateStr ? parseISO(targetDateStr) : addDays(new Date(), 1);
      const dayStart = startOfDay(targetDay);
      const dayEnd = endOfDay(targetDay);

      const [events, tasks, reminders] = await Promise.all([
        prisma.event.findMany({ where: { userId, startAt: { gte: dayStart, lte: dayEnd } }, orderBy: { startAt: "asc" }, include: { contact: true } }),
        prisma.task.findMany({ where: { userId, isDone: false, OR: [{ dueAt: { gte: dayStart, lte: dayEnd } }, { dueAt: null }] }, orderBy: [{ priority: "desc" }, { dueAt: "asc" }], take: 10 }),
        prisma.reminder.findMany({ where: { userId, status: "PENDING", fireAt: { gte: dayStart, lte: dayEnd } }, orderBy: { fireAt: "asc" } }),
      ]);

      const scheduleItems: { time: string; title: string; type: "event" | "task" | "reminder" | "free" }[] = [];

      // Add events
      events.forEach((e) => {
        scheduleItems.push({ time: e.startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), title: e.title + (e.location ? ` (📍 ${e.location})` : ""), type: "event" });
      });

      // Add reminders
      reminders.forEach((r) => {
        scheduleItems.push({ time: r.fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), title: r.title, type: "reminder" });
      });

      // Add tasks (no specific time)
      tasks.forEach((t) => {
        const time = t.dueAt ? t.dueAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "—";
        scheduleItems.push({ time, title: t.title + (t.priority === "URGENT" ? " ⚠️" : ""), type: "task" });
      });

      // Sort by time
      scheduleItems.sort((a, b) => (a.time === "—" ? 1 : b.time === "—" ? -1 : a.time.localeCompare(b.time)));

      const dayFormatted = targetDay.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      let summary = `Planning proposé pour ${dayFormatted} :\n\n`;
      scheduleItems.forEach((item) => {
        const emoji = item.type === "event" ? "📅" : item.type === "task" ? "✅" : "🔔";
        summary += `${item.time} ${emoji} ${item.title}\n`;
      });

      if (scheduleItems.length === 0) {
        summary += "Aucune activité prévue. Ta journée est libre !";
      }

      return { type: "SCHEDULE", title: `Organisation de ${dayFormatted}`, notes: summary, scheduleItems, level: 1 };
    }

    case "save_user_preference": {
      const key = String(args.key);
      const value = String(args.value);

      await prisma.userMemory.upsert({
        where: { userId_key: { userId, key } },
        update: { value, source: "AI" },
        create: { userId, key, value, source: "AI" },
      });

      return { type: "MEMORY", title: `Préférence mémorisée : ${key}`, notes: `Valeur : ${value}`, level: 1 };
    }

    case "retrieve_user_preferences": {
      const memories = await prisma.userMemory.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });

      const summary = memories.length > 0
        ? memories.map((m) => `• ${m.key} : ${m.value}`).join("\n")
        : "Aucune préférence mémorisée.";

      return { type: "INFO", title: `${memories.length} préférence(s) mémorisée(s)`, notes: summary, level: 1 };
    }

    default:
      throw new Error(`Outil inconnu : ${toolName}`);
  }
}

/**
 * Auto-detect personal vs professional context from content
 */
function detectMode(title?: string, description?: string | null, category?: string): string {
  const text = `${title || ""} ${description || ""}`.toLowerCase();
  const proKeywords = ["chantier", "client", "devis", "facture", "fournisseur", "livraison", "réunion", "bureau",
    "collègue", "patron", "entreprise", "professionnel", "travail", "commande", "matériel", "raccord",
    "manchon", "tube", "plomberie", "électricité", "menuiserie", "peinture", "maçonnerie"];
  const proCategories = ["WORK", "ADMIN"];

  if (proCategories.includes(category || "")) return "PROFESSIONAL";
  if (proKeywords.some((kw) => text.includes(kw))) return "PROFESSIONAL";
  return "PERSONAL";
}
