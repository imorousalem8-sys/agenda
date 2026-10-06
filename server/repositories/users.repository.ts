import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getMemoryUser } from "@/lib/userStore";

export class UsersRepository {
  static async findById(id: string) {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch {
      return null;
    }
  }

  static async findByEmail(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    try {
      return await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (err) {
      console.warn("[UsersRepository] Prisma offline notice, checking local user store");
      const mem = getMemoryUser(normalizedEmail);
      if (mem) {
        return {
          id: mem.id,
          email: mem.email,
          name: mem.name,
          password: mem.passwordHash,
          plan: mem.plan,
          subscriptionStatus: mem.subscriptionStatus,
          createdAt: new Date(mem.createdAt),
          updatedAt: new Date(mem.createdAt),
        } as any;
      }
      return null;
    }
  }

  static async create(data: Prisma.UserCreateInput) {
    try {
      return await prisma.user.create({
        data: {
          ...data,
          email: data.email.toLowerCase().trim(),
        },
      });
    } catch {
      return null as any;
    }
  }

  static async update(id: string, data: Prisma.UserUpdateInput) {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch {
      return null as any;
    }
  }

  static async updateByEmail(email: string, data: Prisma.UserUpdateInput) {
    try {
      return await prisma.user.update({
        where: { email: email.toLowerCase().trim() },
        data,
      });
    } catch {
      return null as any;
    }
  }

  // Gestion des jetons de vérification (OTP et Reset)
  static async saveVerificationToken(identifier: string, token: string, expires: Date) {
    try {
      await prisma.verificationToken
        .deleteMany({
          where: { identifier },
        })
        .catch(() => {});

      return await prisma.verificationToken.create({
        data: {
          identifier,
          token,
          expires,
        },
      });
    } catch {
      return null;
    }
  }

  static async findVerificationToken(identifier: string, token: string) {
    try {
      return await prisma.verificationToken.findFirst({
        where: {
          identifier,
          token,
          expires: { gt: new Date() },
        },
      });
    } catch {
      return null;
    }
  }

  static async deleteVerificationTokens(identifier: string) {
    try {
      return await prisma.verificationToken
        .deleteMany({
          where: { identifier },
        })
        .catch(() => {});
    } catch {
      return null;
    }
  }
}
