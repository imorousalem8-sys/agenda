import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class TasksRepository {
  static async findByUserId(userId: string, options?: { isDone?: boolean }) {
    return prisma.task.findMany({
      where: {
        userId,
        ...(options?.isDone !== undefined ? { isDone: options.isDone } : {}),
      },
      include: { reminders: true },
      orderBy: [{ isDone: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
    });
  }

  static async findById(id: string, userId: string) {
    return prisma.task.findFirst({
      where: { id, userId },
      include: { reminders: true },
    });
  }

  static async create(data: Prisma.TaskUncheckedCreateInput) {
    return prisma.task.create({
      data,
      include: { reminders: true },
    });
  }

  static async update(id: string, userId: string, data: Prisma.TaskUpdateInput) {
    const existing = await prisma.task.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return null;

    return prisma.task.update({
      where: { id },
      data,
      include: { reminders: true },
    });
  }

  static async delete(id: string, userId: string) {
    const existing = await prisma.task.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return false;

    await prisma.task.delete({
      where: { id },
    });
    return true;
  }
}
