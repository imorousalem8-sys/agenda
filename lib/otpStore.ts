import { prisma } from "@/lib/prisma";

export type OtpPurpose = "REGISTER" | "RESET_PASSWORD";

interface OtpEntry {
  code: string;
  name?: string;
  passwordHash?: string;
  purpose: OtpPurpose;
  expiresAt: number;
}

// In-memory global store across requests in this Node process
const globalOtpMap = new Map<string, OtpEntry>();

export function generateFreshOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOtp(
  email: string,
  code: string,
  name?: string,
  passwordHash?: string,
  purpose: OtpPurpose = "REGISTER"
) {
  const normalizedEmail = email.toLowerCase().trim();
  const key = `${purpose}:${normalizedEmail}`;
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes de validité

  // 1. In-memory fast cache
  globalOtpMap.set(key, {
    code,
    name,
    passwordHash,
    purpose,
    expiresAt,
  });

  // Stocke également avec la clé email simple pour compatibilité
  globalOtpMap.set(normalizedEmail, {
    code,
    name,
    passwordHash,
    purpose,
    expiresAt,
  });

  // 2. Database persistence
  try {
    const expires = new Date(expiresAt);
    await prisma.verificationToken.deleteMany({
      where: { identifier: `${purpose}:${normalizedEmail}` },
    }).catch(() => {});

    await prisma.verificationToken.create({
      data: {
        identifier: `${purpose}:${normalizedEmail}`,
        token: code,
        expires,
      },
    });
  } catch (dbErr) {
    // Silently continue with in-memory store if DB is unreachable
    console.warn("[OTP] DB storage notice:", dbErr);
  }
}

export async function verifyStoredOtp(
  email: string,
  code: string,
  purpose: OtpPurpose = "REGISTER"
): Promise<{ valid: boolean; name?: string; passwordHash?: string; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();
  const key = `${purpose}:${normalizedEmail}`;

  // 1. Check in-memory fast-cache first
  const memEntry = globalOtpMap.get(key) || globalOtpMap.get(normalizedEmail);
  if (memEntry) {
    if (Date.now() > memEntry.expiresAt) {
      globalOtpMap.delete(key);
      globalOtpMap.delete(normalizedEmail);
      return { valid: false, error: "Le code a expiré (validité 15 min). Veuillez demander un nouveau code." };
    }
    if (memEntry.code === cleanCode) {
      globalOtpMap.delete(key);
      globalOtpMap.delete(normalizedEmail);
      
      // Clean DB token as well
      try {
        await prisma.verificationToken.deleteMany({
          where: {
            OR: [
              { identifier: key },
              { identifier: normalizedEmail },
            ],
          },
        }).catch(() => {});
      } catch {}

      return { valid: true, name: memEntry.name, passwordHash: memEntry.passwordHash };
    }
  }

  // 2. Check in database
  try {
    const dbToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: { in: [key, normalizedEmail] },
        token: cleanCode,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (dbToken) {
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: { in: [key, normalizedEmail] },
        },
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
