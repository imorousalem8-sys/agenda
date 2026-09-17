import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class RemindersRepository {
  static async findByUserId(
    userId: string,
    options?: { status?: string; upcoming?: boolean }
  ) {
    const where: Prisma.ReminderWhereInput = { userId };

    if (options?.status && options.status !== "ALL") {
      where.status = options.status;
    }

    if (options?.upcoming) {
      where.fireAt = { gte: new Date() };
    }

    return prisma.reminder.findMany({
      where,
      include: {
        event: { select: { id: true, title: true, location: true, startAt: true } },
        task: { select: { id: true, title: true, dueAt: true } },
      },
      orderBy: { fireAt: "asc" },
    });
  }

  static async findById(id: string, userId: string) {
    return prisma.reminder.findFirst({
      where: { id, userId },
      include: {
        event: true,
        task: true,
      },
    });
  }

  static async create(data: Prisma.ReminderUncheckedCreateInput) {
    return prisma.reminder.create({
      data,
      include: {
        event: true,
        task: true,
      },
    });
  }

  static async createMany(data: Prisma.ReminderCreateManyInput[]) {
    return prisma.reminder.createMany({
      data,
    });
  }

  static async update(id: string, userId: string, data: Prisma.ReminderUpdateInput) {
    const existing = await prisma.reminder.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return null;

    return prisma.reminder.update({
      where: { id },
      data,
      include: {
        event: true,
        task: true,
      },
    });
  }

  static async delete(id: string, userId: string) {
    const existing = await prisma.reminder.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return false;

    await prisma.reminder.delete({
      where: { id },
    });
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
