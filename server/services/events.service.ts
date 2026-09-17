import { parseISO, subDays } from "date-fns";
import { EventsRepository } from "../repositories/events.repository";
import { RemindersRepository } from "../repositories/reminders.repository";
import { EventInput } from "../schemas/events.schema";
import { getUserSubscriptionDetails } from "@/lib/subscription";
import { ForbiddenError, NotFoundError, BadRequestError } from "../core/errors";

export class EventsService {
  static async listEvents(userId: string, filters?: { from?: string | null; to?: string | null }) {
    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    if (filters?.from) {
      const parsed = parseISO(filters.from);
      if (!isNaN(parsed.getTime())) fromDate = parsed;
    }

    if (filters?.to) {
      const parsed = parseISO(filters.to);
      if (!isNaN(parsed.getTime())) toDate = parsed;
    }

    return EventsRepository.findByUserId(userId, {
      from: fromDate,
      to: toDate,
    });
  }

  static async getEventById(id: string, userId: string) {
    const event = await EventsRepository.findById(id, userId);
    if (!event) {
      throw new NotFoundError("Événement introuvable.");
    }
    return event;
  }

  static async createEvent(userId: string, data: EventInput) {
    // 1. Vérification des quotas du forfait de l'utilisateur
    const subDetails = await getUserSubscriptionDetails(userId);
    if (!subDetails.isPro) {
      const currentCount = await EventsRepository.countByUserId(userId);
      if (currentCount >= subDetails.features.maxActiveEvents) {
        throw new ForbiddenError(
          `⚡ Limite du plan Gratuit atteinte (${subDetails.features.maxActiveEvents} rendez-vous max). Passez à l'offre Pro pour des événements et alarmes en illimité !`,
          { limitReached: true }
        );
      }
    }

    // 2. Normalisation des dates
    let startAt: Date;
    try {
      const parsed = parseISO(data.startAt);
      startAt = !isNaN(parsed.getTime()) ? parsed : new Date(data.startAt);
    } catch {
      startAt = new Date(data.startAt);
    }
    if (isNaN(startAt.getTime())) {
      throw new BadRequestError("Date de début invalide.");
    }

    let endAt: Date | undefined = undefined;
    if (data.endAt && typeof data.endAt === "string" && data.endAt.trim()) {
      try {
        const parsedEnd = parseISO(data.endAt.trim());
        endAt = !isNaN(parsedEnd.getTime()) ? parsedEnd : new Date(data.endAt.trim());
      } catch {
        endAt = undefined;
      }
    }

    // 3. Création de l'événement
    const event = await EventsRepository.create({
      userId,
      title: data.title,
      description: data.description || null,
      notes: data.notes || null,
      startAt,
      endAt,
      location: data.location || null,
      category: data.category || "OTHER",
      priority: data.priority || "NORMAL",
      mode: data.mode || "PERSONAL",
      contactId: data.contactId || null,
    });

    // 4. Génération automatique des rappels programmés
    const remindersToCreate: {
      userId: string;
      eventId: string;
      title: string;
      body: string;
      fireAt: Date;
      method: string;
      isVeille: boolean;
    }[] = [];

    // Rappel veille J-1
    if (data.hasVeilleReminder) {
      const veilleDate = subDays(startAt, 1);
      if (veilleDate > new Date()) {
        remindersToCreate.push({
          userId,
          eventId: event.id,
          title: `Rappel veille : ${event.title}`,
          body: `Votre rendez-vous « ${event.title} » est prévu demain.${event.location ? ` Lieu : ${event.location}.` : ""}`,
          fireAt: veilleDate,
          method: "NOTIFICATION",
          isVeille: true,
        });
      }
    }

    // Rappel X minutes avant l'événement
    const minutesBefore = data.reminderMinutesBefore ?? 15;
    if (minutesBefore > 0) {
      const reminderDate = new Date(startAt.getTime() - minutesBefore * 60 * 1000);
      if (reminderDate > new Date()) {
        const timeStr = startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        remindersToCreate.push({
          userId,
          eventId: event.id,
          title: `Rappel : ${event.title}`,
          body: `Votre rendez-vous « ${event.title} » commence à ${timeStr}.${event.location ? ` Lieu : ${event.location}.` : ""}`,
          fireAt: reminderDate,
          method: "VOICE", // Appel vocal IA par défaut pour garantie anti-oubli
          isVeille: false,
        });
      }
    }

    if (remindersToCreate.length > 0) {
      await RemindersRepository.createMany(remindersToCreate);
    }

    // Récupérer l'événement complet avec ses rappels
    return EventsRepository.findById(event.id, userId);
  }

  static async updateEvent(id: string, userId: string, data: EventInput) {
    const existing = await EventsRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("Événement introuvable.");
    }

    const startAt = parseISO(data.startAt);
    const parsedEnd = data.endAt && data.endAt.trim() ? parseISO(data.endAt.trim()) : null;
    const endAt = parsedEnd && !isNaN(parsedEnd.getTime()) ? parsedEnd : null;

    // Supprimer les anciens rappels liés et recalculer
    await RemindersRepository.deleteByEventId(id);

    const updated = await EventsRepository.update(id, userId, {
      title: data.title,
      description: data.description,
      notes: data.notes,
      startAt,
      endAt,
      location: data.location,
      category: data.category,
      priority: data.priority,
      mode: data.mode,
      contactId: data.contactId || null,
    });

    // Recréer les rappels
    const remindersToCreate: {
      userId: string;
      eventId: string;
      title: string;
      body: string;
      fireAt: Date;
      method: string;
      isVeille: boolean;
    }[] = [];

    if (data.hasVeilleReminder) {
      const veilleDate = subDays(startAt, 1);
      if (veilleDate > new Date()) {
        remindersToCreate.push({
          userId,
          eventId: id,
          title: `Rappel veille : ${data.title}`,
          body: `Votre rendez-vous « ${data.title} » est prévu demain.${data.location ? ` Lieu : ${data.location}.` : ""}`,
          fireAt: veilleDate,
          method: "NOTIFICATION",
          isVeille: true,
        });
      }
    }

    const minutesBefore = data.reminderMinutesBefore ?? 15;
    if (minutesBefore > 0) {
      const reminderDate = new Date(startAt.getTime() - minutesBefore * 60 * 1000);
      if (reminderDate > new Date()) {
        const timeStr = startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        remindersToCreate.push({
          userId,
          eventId: id,
          title: `Rappel : ${data.title}`,
          body: `Votre rendez-vous « ${data.title} » commence à ${timeStr}.${data.location ? ` Lieu : ${data.location}.` : ""}`,
          fireAt: reminderDate,
          method: "VOICE",
          isVeille: false,
        });
      }
    }

    if (remindersToCreate.length > 0) {
      await RemindersRepository.createMany(remindersToCreate);
    }

    return EventsRepository.findById(id, userId);
  }

  static async deleteEvent(id: string, userId: string) {
    const deleted = await EventsRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundError("Événement introuvable.");
    }
    return true;
  }
}
