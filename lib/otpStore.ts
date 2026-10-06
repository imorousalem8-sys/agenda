import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

export type OtpPurpose = "REGISTER" | "RESET_PASSWORD";

export interface OtpEntry {
  code: string;
  name?: string;
  passwordHash?: string;
  purpose: OtpPurpose;
  expiresAt: number;
}

const globalForOtp = globalThis as unknown as {
  __alarm_otpMap?: Map<string, OtpEntry>;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const OTPS_FILE = path.join(DATA_DIR, "local-otps.json");

function loadOtpsFromDisk(): Map<string, OtpEntry> {
  const map = new Map<string, OtpEntry>();
  try {
    if (fs.existsSync(OTPS_FILE)) {
      const raw = fs.readFileSync(OTPS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        for (const item of list) {
          if (item?.key && item?.entry) {
            map.set(item.key, item.entry);
          }
        }
      }
    }
  } catch (e) {
    // Continue silently
  }
  return map;
}

function persistOtpsToDisk(map: Map<string, OtpEntry>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const list = Array.from(map.entries()).map(([key, entry]) => ({ key, entry }));
    fs.writeFileSync(OTPS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    // Continue silently
  }
}

const globalOtpMap: Map<string, OtpEntry> =
  globalForOtp.__alarm_otpMap || loadOtpsFromDisk();

globalForOtp.__alarm_otpMap = globalOtpMap;

/**
 * Génère un code OTP garanti à exactement 6 chiffres (100000 - 999999)
 */
export function generateFreshOtp(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return num.toString().padStart(6, "0").slice(0, 6);
}

export async function storeOtp(
  email: string,
  code: string,
  name?: string,
  passwordHash?: string,
  purpose: OtpPurpose = "REGISTER"
) {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();
  const key = `${purpose}:${normalizedEmail}`;
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes de validité

  const entry: OtpEntry = {
    code: cleanCode,
    name,
    passwordHash,
    purpose,
    expiresAt,
  };

  // 1. In-memory fast cache (sur globalThis pour traverser les reloads de routes)
  globalOtpMap.set(key, entry);
  globalOtpMap.set(normalizedEmail, entry);
  persistOtpsToDisk(globalOtpMap);

  // 2. Database persistence si Prisma accessible
  try {
    const expires = new Date(expiresAt);
    await prisma.verificationToken
      .deleteMany({
        where: { identifier: `${purpose}:${normalizedEmail}` },
      })
      .catch(() => {});

    await prisma.verificationToken.create({
      data: {
        identifier: `${purpose}:${normalizedEmail}`,
        token: cleanCode,
        expires,
      },
    });
  } catch (dbErr) {
    // Silently continue with in-memory / disk store if DB is unreachable
    console.warn("[OTP] DB storage notice (offline fallback active):", (dbErr as any)?.message || dbErr);
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

  // 1. Check in-memory fast-cache
  let memEntry = globalOtpMap.get(key) || globalOtpMap.get(normalizedEmail);
  if (!memEntry) {
    // Fallback disk reload
    const fromDisk = loadOtpsFromDisk();
    memEntry = fromDisk.get(key) || fromDisk.get(normalizedEmail);
    if (memEntry) {
      globalOtpMap.set(key, memEntry);
      globalOtpMap.set(normalizedEmail, memEntry);
    }
  }

  if (memEntry) {
    if (Date.now() > memEntry.expiresAt) {
      globalOtpMap.delete(key);
      globalOtpMap.delete(normalizedEmail);
      persistOtpsToDisk(globalOtpMap);
      return { valid: false, error: "Le code a expiré (validité 15 min). Veuillez demander un nouveau code." };
    }
    if (memEntry.code === cleanCode) {
      globalOtpMap.delete(key);
      globalOtpMap.delete(normalizedEmail);
      persistOtpsToDisk(globalOtpMap);

      // Clean DB token as well
      try {
        await prisma.verificationToken
          .deleteMany({
            where: {
              OR: [{ identifier: key }, { identifier: normalizedEmail }],
            },
          })
          .catch(() => {});
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
      await prisma.verificationToken
        .deleteMany({
          where: {
            identifier: { in: [key, normalizedEmail] },
          },
        })
        .catch(() => {});
      return { valid: true };
    }
  } catch (dbErr) {
    console.warn("[OTP] DB verification notice (offline fallback):", (dbErr as any)?.message || dbErr);
  }

  return {
    valid: false,
    error: "Code de confirmation incorrect ou expiré. Veuillez vérifier le code reçu.",
  };
}
