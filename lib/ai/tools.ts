import { prisma } from "@/lib/prisma";
import { AIActionExecutionResult, AIUserContext } from "./types";
import { parseISO, addMinutes, formatISO } from "date-fns";

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
        reminderMinutesBefore: { type: "number", description: "Nombre de minutes avant le rendez-vous pour déclencher le rappel (ex: 15, 30, 60, 120)" },
      },
      required: ["title", "startAt"],
    },
  },
  {
    name: "update_event",
    description: "Modifie, décale l'horaire ou met à jour les informations d'un rendez-vous existant.",
    parameters: {
      type: "object",
      properties: {
        eventId: { type: "string", description: "ID du rendez-vous à modifier (si connu) ou vide pour utiliser le dernier en contexte" },
        eventTitleQuery: { type: "string", description: "Titre ou mot-clé pour retrouver l'événement s'il n'est pas identifié par son ID" },
        newTitle: { type: "string", description: "Nouveau titre si modification demandée" },
        newStartAt: { type: "string", description: "Nouvel horaire au format ISO 8601" },
        newLocation: { type: "string", description: "Nouveau lieu" },
        newDescription: { type: "string", description: "Nouvelle note ou description" },
      },
      required: [],
    },
  },
  {
    name: "delete_event",
    description: "Supprime ou annule un rendez-vous (nécessite une confirmation utilisateur si demandé).",
    parameters: {
      type: "object",
      properties: {
        eventId: { type: "string", description: "ID de l'événement à supprimer" },
        eventTitleQuery: { type: "string", description: "Titre de l'événement à supprimer si ID non fourni" },
        confirmed: { type: "boolean", description: "True si l'utilisateur a explicitement validé la suppression" },
      },
      required: [],
    },
  },
  {
    name: "create_task",
    description: "Crée une nouvelle tâche à accomplir dans la liste des tâches avec priorité et échéance.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Titre de la tâche (ex: Acheter joints et raccords, Payer facture)" },
        dueAt: { type: "string", description: "Date et heure limite d'échéance au format ISO 8601" },
        notes: { type: "string", description: "Détails, liste de matériel ou instructions complémentaires" },
        contactName: { type: "string", description: "Nom de la personne associée à la tâche si applicable" },
        priority: { type: "string", enum: ["LOW", "NORMAL", "HIGH", "URGENT"] },
        reminderAt: { type: "string", description: "Date/heure précise à laquelle l'utilisateur souhaite être rappelé" },
      },
      required: ["title"],
    },
  },
  {
    name: "create_reminder",
    description: "Programme un rappel persistant autonome avec message vocal spécifique.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Objet du rappel" },
        fireAt: { type: "string", description: "Date et heure exacte de déclenchement au format ISO 8601" },
        customSpokenMessage: { type: "string", description: "Texte exact que la voix IA doit énoncer lors de l'alarme" },
        method: { type: "string", enum: ["VOICE", "ALARM", "NOTIFICATION"], description: "Méthode d'alerte (VOICE par défaut)" },
      },
      required: ["title", "fireAt"],
    },
  },
  {
    name: "create_contact",
    description: "Ajoute un nouveau contact (artisan, client, médecin, collègue, ami) dans le répertoire.",
    parameters: {
      type: "object",
      properties: {
        firstName: { type: "string", description: "Prénom ou nom principal" },
        lastName: { type: "string", description: "Nom de famille (optionnel)" },
        phone: { type: "string", description: "Numéro de téléphone" },
        email: { type: "string", description: "Adresse email" },
        company: { type: "string", description: "Société ou fonction (ex: Plomberie, Menuisier)" },
        notes: { type: "string", description: "Notes utiles sur le contact" },
      },
      required: ["firstName"],
    },
  },
];

export async function executeAITool(
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

      let contactId: string | undefined = undefined;
      if (contactName) {
        let contact = await prisma.contact.findFirst({
          where: { userId, firstName: { contains: contactName } },
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
          mode: context.mode,
          category,
          contactId,
        },
      });

      // Compute reminder time
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
        mode: context.mode,
        category,
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

      if (!eventId) {
        throw new Error("Impossible de trouver le rendez-vous à modifier.");
      }

      const updateData: Record<string, unknown> = {};
      if (args.newTitle) updateData.title = String(args.newTitle);
      if (args.newStartAt) updateData.startAt = parseISO(String(args.newStartAt));
      if (args.newLocation) updateData.location = String(args.newLocation);
      if (args.newDescription) updateData.description = String(args.newDescription);

      const updated = await prisma.event.update({
        where: { id: eventId, userId },
        data: updateData,
      });

      // Update associated reminder if time changed
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
        notes: `Rendez-vous décalé avec succès.`,
        dateTime: formatISO(updated.startAt),
      };
    }

    case "delete_event": {
      let eventId = args.eventId ? String(args.eventId) : undefined;
      const titleQuery = args.eventTitleQuery ? String(args.eventTitleQuery).toLowerCase() : undefined;

      if (!eventId && context.activeTarget?.type === "EVENT") {
        eventId = context.activeTarget.id;
      }

      if (!eventId && titleQuery) {
        const found = context.eventsSummary.find((e) => e.title.toLowerCase().includes(titleQuery));
        if (found) eventId = found.id;
      }

      if (!eventId) {
        throw new Error("Rendez-vous introuvable pour la suppression.");
      }

      const existing = await prisma.event.findUnique({ where: { id: eventId, userId } });
      if (!existing) throw new Error("Rendez-vous introuvable.");

      // Check confirmation
      if (!args.confirmed) {
        return {
          id: existing.id,
          type: "DELETE_CONFIRM",
          title: existing.title,
          requiresConfirmation: true,
          confirmationPayload: {
            action: "DELETE_EVENT",
            targetId: existing.id,
            targetTitle: existing.title,
          },
        };
      }

      await prisma.event.delete({ where: { id: eventId, userId } });

      return {
        id: eventId,
        type: "INFO",
        title: `Rendez-vous "${existing.title}" supprimé avec succès.`,
      };
    }

    case "create_task": {
      const title = String(args.title || "Tâche");
      const dueAtStr = args.dueAt ? String(args.dueAt) : undefined;
      const dueAt = dueAtStr ? parseISO(dueAtStr) : undefined;
      const notes = args.notes ? String(args.notes) : undefined;
      const contactName = args.contactName ? String(args.contactName) : undefined;
      const priority = (args.priority as "LOW" | "NORMAL" | "HIGH" | "URGENT") || "NORMAL";

      let finalNotes = notes || "";
      if (contactName) {
        finalNotes = `Personne concernée : ${contactName}. ${finalNotes}`.trim();
      }

      const task = await prisma.task.create({
        data: {
          userId,
          title,
          notes: finalNotes || `Tâche planifiée par l'assistant IA.`,
          dueAt,
          priority,
          mode: context.mode,
          isDone: false,
        },
      });

      // Create reminder if requested or if due date is specified
      const reminderAtStr = args.reminderAt ? String(args.reminderAt) : dueAtStr;
      if (reminderAtStr) {
        const fireAt = parseISO(reminderAtStr);
        const timeStr = fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        await prisma.reminder.create({
          data: {
            userId,
            taskId: task.id,
            title: `Tâche : ${title}`,
            body: `Vous avez la tâche « ${title} » programmée à ${timeStr}.${finalNotes ? ` Notes : ${finalNotes}` : ""}`,
            fireAt,
            method: "VOICE",
            status: "PENDING",
          },
        });
      }

      return {
        id: task.id,
        type: "TASK",
        title: task.title,
        notes: task.notes || undefined,
        dateTime: task.dueAt ? formatISO(task.dueAt) : undefined,
        contactName,
        priority,
        mode: context.mode,
      };
    }

    case "create_reminder": {
      const title = String(args.title || "Rappel");
      const fireAt = parseISO(String(args.fireAt));
      const customMessage = args.customSpokenMessage ? String(args.customSpokenMessage) : undefined;
      const method = (args.method as "VOICE" | "ALARM" | "NOTIFICATION") || "VOICE";

      const timeStr = fireAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      const bodyText = customMessage || `Rappel programmé pour ${timeStr} concernant : ${title}.`;

      const reminder = await prisma.reminder.create({
        data: {
          userId,
          title,
          body: bodyText,
          fireAt,
          method,
          status: "PENDING",
        },
      });

      return {
        id: reminder.id,
        type: "REMINDER",
        title: reminder.title,
        notes: reminder.body || undefined,
        dateTime: formatISO(reminder.fireAt),
      };
    }

    case "create_contact": {
      const firstName = String(args.firstName || "Contact");
      const lastName = args.lastName ? String(args.lastName) : undefined;
      const phone = args.phone ? String(args.phone) : undefined;
      const email = args.email ? String(args.email) : undefined;
      const company = args.company ? String(args.company) : undefined;
      const notes = args.notes ? String(args.notes) : undefined;

      const contact = await prisma.contact.create({
        data: {
          userId,
          firstName,
          lastName,
          phone,
          email,
          company,
          notes,
        },
      });

      return {
        id: contact.id,
        type: "CONTACT",
        title: `${contact.firstName} ${contact.lastName || ""}`.trim(),
        notes: `Nouveau contact ajouté. Téléphone : ${phone || "N/A"}`,
      };
    }

    default:
      throw new Error(`Outil inconnu : ${toolName}`);
  }
}
