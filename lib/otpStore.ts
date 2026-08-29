import { prisma } from "@/lib/prisma";

interface OtpEntry {
  code: string;
  name?: string;
  passwordHash?: string;
  expiresAt: number;
}

// In-memory fast-cache
const otpMap = new Map<string, OtpEntry>();

export function generateFreshOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOtp(
  email: string,
  code: string,
  name?: string,
  passwordHash?: string
) {
  const normalizedEmail = email.toLowerCase().trim();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  // 1. In-memory fast cache
  otpMap.set(normalizedEmail, {
    code,
    name,
    passwordHash,
    expiresAt,
  });

  // 2. Database persistence for cross-serverless synchronization
  try {
    const expires = new Date(expiresAt);
    // Delete existing tokens for this email first
    await prisma.verificationToken.deleteMany({
      where: { identifier: normalizedEmail },
    }).catch(() => {});

    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: code,
        expires,
      },
    });
  } catch (dbErr) {
    console.warn("[OTP] DB storage notice:", dbErr);
  }
}

export async function verifyStoredOtp(
  email: string,
  code: string
): Promise<{ valid: boolean; name?: string; passwordHash?: string; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();

  // 1. Check in-memory fast-cache first
  const memEntry = otpMap.get(normalizedEmail);
  if (memEntry) {
    if (Date.now() > memEntry.expiresAt) {
      otpMap.delete(normalizedEmail);
      return { valid: false, error: "Le code a expiré (validité 10 min). Veuillez cliquer sur Renvoyer le code." };
    }
    if (memEntry.code === cleanCode) {
      otpMap.delete(normalizedEmail);
      // Clean DB token as well
      await prisma.verificationToken.deleteMany({
        where: { identifier: normalizedEmail },
      }).catch(() => {});
      return { valid: true, name: memEntry.name, passwordHash: memEntry.passwordHash };
    }
  }

  // 2. Check in database
  try {
    const dbToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: normalizedEmail,
        token: cleanCode,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (dbToken) {
      await prisma.verificationToken.deleteMany({
        where: { identifier: normalizedEmail },
      }).catch(() => {});
      return { valid: true };
    }
  } catch (dbErr) {
    console.warn("[OTP] DB verification notice:", dbErr);
  }

  return {
    valid: false,
    error: "Code de confirmation incorrect ou expiré. Veuillez vérifier le code reçu par email.",
  };
}
