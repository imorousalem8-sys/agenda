import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { isDbKnownDown, markDbUnreachable } from "@/lib/dbUser";

const inMemoryEvents = new Map<string, any[]>();

export class EventsRepository {
  static async findByUserId(userId: string, filters?: { from?: Date; to?: Date }) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.event.findMany({
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
      } catch (err) {
        markDbUnreachable();
      }
    }

    return inMemoryEvents.get(userId) || [];
  }

  static async findById(id: string, userId: string) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.event.findFirst({
          where: { id, userId },
          include: {
            reminders: true,
            contact: true,
          },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    return (inMemoryEvents.get(userId) || []).find((e) => e.id === id) || null;
  }

  static async countByUserId(userId: string) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.event.count({
          where: { userId },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    return (inMemoryEvents.get(userId) || []).length;
  }

  static async create(data: Prisma.EventUncheckedCreateInput) {
    if (!isDbKnownDown()) {
      try {
        return await prisma.event.create({
          data,
          include: {
            reminders: true,
            contact: true,
          },
        });
      } catch (err) {
        markDbUnreachable();
      }
    }

    const fallbackEvent = {
      id: `evt_${Date.now()}`,
      ...data,
      startAt: data.startAt instanceof Date ? data.startAt : new Date(data.startAt),
      createdAt: new Date(),
      updatedAt: new Date(),
      reminders: [],
      contact: null,
    };
    const list = inMemoryEvents.get(data.userId) || [];
    list.push(fallbackEvent);
    inMemoryEvents.set(data.userId, list);
    return fallbackEvent;
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
