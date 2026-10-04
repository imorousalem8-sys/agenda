import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { isDbKnownDown, markDbUnreachable } from "@/lib/dbUser";

const inMemoryReminders = new Map<string, any[]>();

export class RemindersRepository {
  static async findByUserId(
    userId: string,
    options?: { status?: string; upcoming?: boolean }
  ) {
    if (!isDbKnownDown()) {
      try {
        const where: Prisma.ReminderWhereInput = { userId };

        if (options?.status && options.status !== "ALL") {
          where.status = options.status;
        }

        if (options?.upcoming) {
          where.fireAt = { gte: new Date() };
        }

        return await prisma.reminder.findMany({
          where,
          include: {
            event: { select: { id: true, title: true, location: true, startAt: true } },
            task: { select: { id: true, title: true, dueAt: true } },
          },
          orderBy: { fireAt: "asc" },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    const list = inMemoryReminders.get(userId) || [];
    if (options?.status && options.status !== "ALL") {
      return list.filter((r) => r.status === options.status);
    }
    return list;
  }

  static async findById(id: string, userId: string) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.reminder.findFirst({
          where: { id, userId },
          include: {
            event: true,
            task: true,
          },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    return (inMemoryReminders.get(userId) || []).find((r) => r.id === id) || null;
  }

  static async create(data: Prisma.ReminderUncheckedCreateInput) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.reminder.create({
          data,
          include: {
            event: true,
            task: true,
          },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    const fallback = {
      id: `rem_${Date.now()}`,
      ...data,
      fireAt: data.fireAt instanceof Date ? data.fireAt : new Date(data.fireAt),
      status: data.status || "PENDING",
      method: data.method || "VOICE",
      createdAt: new Date(),
      updatedAt: new Date(),
      event: null,
      task: null,
    };
    const list = inMemoryReminders.get(data.userId) || [];
    list.push(fallback);
    inMemoryReminders.set(data.userId, list);
    return fallback;
  }

  static async createMany(data: Prisma.ReminderCreateManyInput[]) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.reminder.createMany({
          data,
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    data.forEach((item) => {
      const fallback = {
        id: `rem_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        ...item,
        fireAt: item.fireAt instanceof Date ? item.fireAt : new Date(item.fireAt),
        status: item.status || "PENDING",
        method: item.method || "VOICE",
        createdAt: new Date(),
        updatedAt: new Date(),
        event: null,
        task: null,
      };
      const list = inMemoryReminders.get(item.userId) || [];
      list.push(fallback);
      inMemoryReminders.set(item.userId, list);
    });

    return { count: data.length };
  }

  static async update(id: string, userId: string, data: Prisma.ReminderUpdateInput) {
    if (!isDbKnownDown()) {
      try {
        const existing = await prisma.reminder.findFirst({
          where: { id, userId },
          select: { id: true },
        });
        if (existing) {
          return await prisma.reminder.update({
            where: { id },
            data,
            include: { event: true, task: true },
          });
        }
      } catch (err) {
        markDbUnreachable();
      }
    }

    const list = inMemoryReminders.get(userId) || [];
    const index = list.findIndex((r) => r.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...data, updatedAt: new Date() };
      return list[index];
    }
    return null;
  }

  static async delete(id: string, userId: string) {
    if (!isDbKnownDown()) {
      try {
        const existing = await prisma.reminder.findFirst({
          where: { id, userId },
          select: { id: true },
        });
        if (existing) {
          await prisma.reminder.delete({
            where: { id },
          });
          return true;
        }
      } catch (err) {
        markDbUnreachable();
      }
    }

    const list = inMemoryReminders.get(userId) || [];
    inMemoryReminders.set(userId, list.filter((r) => r.id !== id));
    return true;
  }

  static async deleteByEventId(eventId: string) {
    return prisma.reminder.deleteMany({
      where: { eventId },
    });
  }

  static async findDueReminders(now: Date) {
    return prisma.reminder.findMany({
      where: {
        status: "PENDING",
        fireAt: { lte: now },
      },
      include: {
        user: { select: { id: true, email: true, name: true } },
        event: true,
        task: true,
      },
    });
  }
}
