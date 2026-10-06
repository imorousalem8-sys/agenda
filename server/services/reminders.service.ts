import { parseISO, addMinutes } from "date-fns";
import { prisma } from "@/lib/prisma";
import { RemindersRepository } from "../repositories/reminders.repository";
import { ReminderInput } from "../schemas/reminders.schema";
import { NotFoundError, BadRequestError } from "../core/errors";

export class RemindersService {
  static async listReminders(
    userId: string,
    options?: { status?: string; upcoming?: boolean }
  ) {
    return RemindersRepository.findByUserId(userId, options);
  }

  static async getReminderById(id: string, userId: string) {
    const reminder = await RemindersRepository.findById(id, userId);
    if (!reminder) {
      throw new NotFoundError("Rappel introuvable.");
    }
    return reminder;
  }

  static async createReminder(userId: string, data: ReminderInput) {
    let fireAtDate: Date;
    try {
      const parsed = parseISO(data.fireAt);
      fireAtDate = !isNaN(parsed.getTime()) ? parsed : new Date(data.fireAt);
    } catch {
      throw new BadRequestError("Date de déclenchement invalide.");
    }

    return RemindersRepository.create({
      userId,
      title: data.title,
      body: data.body || null,
      fireAt: fireAtDate,
      method: data.method || "VOICE",
      eventId: data.eventId || null,
      taskId: data.taskId || null,
      status: "PENDING",
    });
  }

  static async updateReminder(id: string, userId: string, data: ReminderInput) {
    const existing = await RemindersRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("Rappel introuvable.");
    }

    let fireAtDate: Date;
    try {
      const parsed = parseISO(data.fireAt);
      fireAtDate = !isNaN(parsed.getTime()) ? parsed : new Date(data.fireAt);
    } catch {
      throw new BadRequestError("Date de déclenchement invalide.");
    }

    const updated = await RemindersRepository.update(id, userId, {
      title: data.title,
      body: data.body || null,
      fireAt: fireAtDate,
      method: data.method || "VOICE",
      status: "PENDING",
    });

    if (!updated) {
      throw new NotFoundError("Rappel introuvable.");
    }

    return updated;
  }

  static async dismissReminder(id: string, userId: string) {
    const existing = await RemindersRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("Rappel introuvable.");
    }

    const updated = await RemindersRepository.update(id, userId, {
      status: "DISMISSED",
    });

    return updated;
  }

  static async snoozeReminder(id: string, userId: string, minutes = 10) {
    const existing = await RemindersRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("Rappel introuvable.");
    }

    const snoozedTo = addMinutes(new Date(), minutes);

    const updated = await RemindersRepository.update(id, userId, {
      status: "SNOOZED",
      snoozedTo,
      fireAt: snoozedTo,
    });

    return updated;
  }

  static async deleteReminder(id: string, userId: string) {
    const deleted = await RemindersRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundError("Rappel introuvable.");
    }
    return true;
  }

  static async checkUserDueReminders(userId: string) {
    const now = new Date();

    const dueReminders = await prisma.reminder.findMany({
      where: {
        userId,
        status: "PENDING",
        fireAt: { lte: now },
      },
      take: 20,
      include: {
        event: {
          select: { id: true, title: true, startAt: true, location: true },
        },
        task: {
          select: { id: true, title: true, dueAt: true },
        },
      },
    });

    if (dueReminders.length > 0) {
      await prisma.reminder.updateMany({
        where: {
          id: { in: dueReminders.map((r) => r.id) },
        },
        data: { status: "FIRED" },
      });
    }

    return dueReminders;
  }
}
