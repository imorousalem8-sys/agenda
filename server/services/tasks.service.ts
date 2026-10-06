import { parseISO } from "date-fns";
import { prisma } from "@/lib/prisma";
import { TasksRepository } from "../repositories/tasks.repository";
import { RemindersRepository } from "../repositories/reminders.repository";
import { TaskInput, UpdateTaskInput } from "../schemas/tasks.schema";
import { NotFoundError } from "../core/errors";

export class TasksService {
  static async listTasks(userId: string, doneFilter?: string | null) {
    let isDone: boolean | undefined;
    if (doneFilter !== null && doneFilter !== undefined) {
      isDone = doneFilter === "true";
    }

    return TasksRepository.findByUserId(userId, { isDone });
  }

  static async getTaskById(id: string, userId: string) {
    const task = await TasksRepository.findById(id, userId);
    if (!task) {
      throw new NotFoundError("Tâche introuvable.");
    }
    return task;
  }

  static async createTask(userId: string, data: TaskInput) {
    let dueAtDate: Date | null = null;
    if (data.dueAt && typeof data.dueAt === "string" && data.dueAt.trim().length > 3) {
      try {
        const parsed = parseISO(data.dueAt.trim());
        if (!isNaN(parsed.getTime())) {
          dueAtDate = parsed;
        } else {
          const nativeDate = new Date(data.dueAt.trim());
          if (!isNaN(nativeDate.getTime())) {
            dueAtDate = nativeDate;
          }
        }
      } catch {
        dueAtDate = null;
      }
    }

    const task = await TasksRepository.create({
      userId,
      title: data.title,
      notes: data.notes || null,
      dueAt: dueAtDate,
      priority: data.priority || "NORMAL",
      mode: data.mode || "PERSONAL",
      items: data.items ? JSON.stringify(data.items) : null,
    });

    // Si une date d'échéance est fixée, créer automatiquement un rappel alarme/vocal
    if (dueAtDate) {
      await RemindersRepository.create({
        userId,
        taskId: task.id,
        title: task.title,
        body: data.notes ? `Note: ${data.notes}` : "Échéance de votre tâche",
        fireAt: dueAtDate,
        method: "VOICE",
        status: "PENDING",
      });
    }

    return TasksRepository.findById(task.id, userId);
  }

  static async updateTask(id: string, userId: string, data: UpdateTaskInput) {
    const existing = await TasksRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("Tâche introuvable.");
    }

    // Toggle done
    if (data.isDone !== undefined && data.title === undefined && data.notes === undefined && data.dueAt === undefined) {
      const updated = await TasksRepository.update(id, userId, {
        isDone: data.isDone,
      });

      if (data.isDone) {
        // Dismiss any pending reminders for this task
        await prisma.reminder.updateMany({
          where: { taskId: id, status: "PENDING" },
          data: { status: "DISMISSED" },
        });
      }

      return updated;
    }

    let dueAtDate: Date | null | undefined = undefined;
    if (data.dueAt !== undefined) {
      if (data.dueAt && typeof data.dueAt === "string" && data.dueAt.trim().length > 3) {
        try {
          const parsed = parseISO(data.dueAt.trim());
          dueAtDate = !isNaN(parsed.getTime()) ? parsed : new Date(data.dueAt.trim());
        } catch {
          dueAtDate = null;
        }
      } else {
        dueAtDate = null;
      }
    }

    const updated = await TasksRepository.update(id, userId, {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
      ...(dueAtDate !== undefined ? { dueAt: dueAtDate } : {}),
      ...(data.priority !== undefined ? { priority: data.priority } : {}),
      ...(data.mode !== undefined ? { mode: data.mode } : {}),
      ...(data.isDone !== undefined ? { isDone: data.isDone } : {}),
      ...(data.items !== undefined ? { items: data.items ? JSON.stringify(data.items) : null } : {}),
    });

    if (!updated) {
      throw new NotFoundError("Tâche introuvable.");
    }

    // Sync reminder
    if (dueAtDate) {
      const existingReminder = await prisma.reminder.findFirst({
        where: { taskId: id },
      });
      if (existingReminder) {
        await prisma.reminder.update({
          where: { id: existingReminder.id },
          data: {
            title: updated.title,
            body: updated.notes ? `Note: ${updated.notes}` : "Échéance de votre tâche",
            fireAt: dueAtDate,
            status: "PENDING",
            method: "VOICE",
          },
        });
      } else {
        await prisma.reminder.create({
          data: {
            userId,
            taskId: updated.id,
            title: updated.title,
            body: updated.notes ? `Note: ${updated.notes}` : "Échéance de votre tâche",
            fireAt: dueAtDate,
            method: "VOICE",
            status: "PENDING",
          },
        });
      }
    } else if (data.dueAt === null) {
      // Supprimer les rappels si la date a été retirée
      await prisma.reminder.deleteMany({
        where: { taskId: id },
      });
    }

    return updated;
  }

  static async deleteTask(id: string, userId: string) {
    const deleted = await TasksRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundError("Tâche introuvable.");
    }
    return true;
  }
}
