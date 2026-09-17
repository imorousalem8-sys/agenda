import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class EventsRepository {
  static async findByUserId(userId: string, filters?: { from?: Date; to?: Date }) {
    return prisma.event.findMany({
      where: {
        userId,
        ...(filters?.from && filters?.to
          ? {
              startAt: {
                gte: filters.from,
                lte: filters.to,
              },
            }
          : {}),
      },
      include: {
        reminders: true,
        contact: true,
      },
      orderBy: { startAt: "asc" },
    });
  }

  static async findById(id: string, userId: string) {
    return prisma.event.findFirst({
      where: { id, userId },
      include: {
        reminders: true,
        contact: true,
      },
    });
  }

  static async countByUserId(userId: string) {
    return prisma.event.count({
      where: { userId },
    });
  }

  static async create(data: Prisma.EventUncheckedCreateInput) {
    return prisma.event.create({
      data,
      include: {
        reminders: true,
        contact: true,
      },
    });
  }

  static async update(id: string, userId: string, data: Prisma.EventUncheckedUpdateInput) {
    // Vérifier d'abord que l'événement appartient bien à l'utilisateur
    const existing = await prisma.event.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return null;

    return prisma.event.update({
      where: { id },
      data,
      include: {
        reminders: true,
        contact: true,
      },
    });
  }

  static async delete(id: string, userId: string) {
    const existing = await prisma.event.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return false;

    await prisma.event.delete({
      where: { id },
    });
    return true;
  }
}
