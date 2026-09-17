import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class UsersRepository {
  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  static async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase().trim(),
      },
    });
  }

  static async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async updateByEmail(email: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data,
    });
  }

  // Gestion des jetons de vérification (OTP et Reset)
  static async saveVerificationToken(identifier: string, token: string, expires: Date) {
    // Supprimer tout jeton existant pour cet identifiant
    await prisma.verificationToken
      .deleteMany({
        where: { identifier },
      })
      .catch(() => {});

    return prisma.verificationToken.create({
      data: {
        identifier,
        token,
        expires,
      },
    });
  }

  static async findVerificationToken(identifier: string, token: string) {
    return prisma.verificationToken.findFirst({
      where: {
        identifier,
        token,
        expires: { gt: new Date() },
      },
    });
  }

  static async deleteVerificationTokens(identifier: string) {
    return prisma.verificationToken
      .deleteMany({
        where: { identifier },
      })
      .catch(() => {});
  }
}
