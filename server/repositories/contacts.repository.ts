import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ContactsRepository {
  static async findByUserId(userId: string) {
    return prisma.contact.findMany({
      where: { userId },
      orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
      include: {
        _count: {
          select: { events: true },
        },
      },
    });
  }

  static async findById(id: string, userId: string) {
    return prisma.contact.findFirst({
      where: { id, userId },
      include: {
        events: {
          orderBy: { startAt: "desc" },
          take: 10,
        },
      },
    });
  }

  static async create(data: Prisma.ContactUncheckedCreateInput) {
    return prisma.contact.create({
      data,
    });
  }

  static async update(id: string, userId: string, data: Prisma.ContactUpdateInput) {
    const existing = await prisma.contact.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return null;

    return prisma.contact.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string, userId: string) {
    const existing = await prisma.contact.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) return false;

    await prisma.contact.delete({
      where: { id },
    });
    return true;
  }
}
