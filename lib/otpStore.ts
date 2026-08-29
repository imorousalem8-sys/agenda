import { prisma } from "@/lib/prisma";
import crypto from "crypto";

interface OtpEntry {
  code: string;
  name?: string;
  passwordHash?: string;
  expiresAt: number;
}

// In-memory fast-cache for sub-millisecond local responses
const otpMap = new Map<string, OtpEntry>();

// Secret salt for deterministic stateless verification fallback
const OTP_SECRET = process.env.AUTH_SECRET || "alarm-agenda-otp-salt-2026";

export function generateStatelessOtp(email: string, stepMinutes = 10): string {
  const normalizedEmail = email.toLowerCase().trim();
  const timeStep = Math.floor(Date.now() / (stepMinutes * 60 * 1000));
  const hmac = crypto.createHmac("sha256", OTP_SECRET);
  hmac.update(`${normalizedEmail}:${timeStep}`);
  const hash = hmac.digest("hex");
  const num = parseInt(hash.slice(0, 8), 16) % 1000000;
  return num.toString().padStart(6, "0");
}

export async function storeOtp(
  email: string,
  code: string,
  name?: string,
  passwordHash?: string
) {
  const normalizedEmail = email.toLowerCase().trim();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity

  // 1. Store in fast memory cache
  otpMap.set(normalizedEmail, {
    code,
    name,
    passwordHash,
    expiresAt,
  });

  // 2. Persist in database for global cross-serverless synchronization
  try {
    const expires = new Date(expiresAt);
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: normalizedEmail,
          token: code,
        },
      },
      update: {
        expires,
      },
      create: {
        identifier: normalizedEmail,
        token: code,
        expires,
      },
    });
  } catch (dbErr) {
    // If DB table is busy or offline, memory + stateless OTP will handle it
    console.warn("[OTP] DB storage fallback notice:", dbErr);
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
      return { valid: false, error: "Le code OTP a expiré (validité 10 min). Veuillez en demander un nouveau." };
    }
    if (memEntry.code === cleanCode) {
      otpMap.delete(normalizedEmail);
      return { valid: true, name: memEntry.name, passwordHash: memEntry.passwordHash };
    }
  }

  // 2. Check in database for multi-instance distributed serverless (Vercel)
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
      // Clean up used token
      await prisma.verificationToken.deleteMany({
        where: { identifier: normalizedEmail },
      }).catch(() => {});

      return { valid: true };
    }
  } catch (dbErr) {
    console.warn("[OTP] DB verification fallback notice:", dbErr);
  }

  // 3. Check stateless deterministic OTP (current and previous time step)
  const currentStateless = generateStatelessOtp(normalizedEmail, 10);
  const previousTimeStep = Math.floor(Date.now() / (10 * 60 * 1000)) - 1;
  const hmacPrev = crypto.createHmac("sha256", OTP_SECRET);
  hmacPrev.update(`${normalizedEmail}:${previousTimeStep}`);
  const prevNum = (parseInt(hmacPrev.digest("hex").slice(0, 8), 16) % 1000000).toString().padStart(6, "0");

  if (cleanCode === currentStateless || cleanCode === prevNum) {
    return { valid: true };
  }

  return {
    valid: false,
    error: "Code de confirmation incorrect ou expiré. Veuillez vérifier votre boîte mail.",
  };
}
