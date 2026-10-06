import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { isDbKnownDown, markDbUnreachable } from "@/lib/dbUser";

const inMemoryTasks = new Map<string, any[]>();

export class TasksRepository {
  static async findByUserId(userId: string, options?: { isDone?: boolean }) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.task.findMany({
          where: {
            userId,
            ...(options?.isDone !== undefined ? { isDone: options.isDone } : {}),
          },
          include: { reminders: true },
          orderBy: [{ isDone: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    const list = inMemoryTasks.get(userId) || [];
    if (options?.isDone !== undefined) {
      return list.filter((t) => t.isDone === options.isDone);
    }
    return list;
  }

  static async findById(id: string, userId: string) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.task.findFirst({
          where: { id, userId },
          include: { reminders: true },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    return (inMemoryTasks.get(userId) || []).find((t) => t.id === id) || null;
  }

  static async create(data: Prisma.TaskUncheckedCreateInput) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.task.create({
          data,
          include: { reminders: true },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    const fallbackTask = {
      id: `tsk_${Date.now()}`,
      ...data,
      isDone: data.isDone ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
      reminders: [],
    };
    const list = inMemoryTasks.get(data.userId) || [];
    list.push(fallbackTask);
    inMemoryTasks.set(data.userId, list);
    return fallbackTask;
  }

  static async update(id: string, userId: string, data: Prisma.TaskUpdateInput) {
    if (!isDbKnownDown()) {
      try {
        const existing = await prisma.task.findFirst({
          where: { id, userId },
          select: { id: true },
        });
        if (existing) {
          return await prisma.task.update({
            where: { id },
            data,
            include: { reminders: true },
          });
        }
      } catch (err) {
        markDbUnreachable();
      }
    }

    const list = inMemoryTasks.get(userId) || [];
    const index = list.findIndex((t) => t.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...data, updatedAt: new Date() };
      return list[index];
    }
    return null;
  }

  static async delete(id: string, userId: string) {
    if (!isDbKnownDown()) {
      try {
        const existing = await prisma.task.findFirst({
          where: { id, userId },
          select: { id: true },
        });
        if (existing) {
          await prisma.task.delete({ where: { id } });
          return true;
        }
      } catch (err) {
        markDbUnreachable();
      }
    }

    const list = inMemoryTasks.get(userId) || [];
    inMemoryTasks.set(userId, list.filter((t) => t.id !== id));
    return true;
  }
}
