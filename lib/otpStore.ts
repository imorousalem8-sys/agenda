interface OtpEntry {
  code: string;
  name?: string;
  passwordHash?: string;
  expiresAt: number;
}

// Global in-memory OTP store (survives requests during runtime)
const otpMap = new Map<string, OtpEntry>();

export function storeOtp(email: string, code: string, name?: string, passwordHash?: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity
  otpMap.set(normalizedEmail, {
    code,
    name,
    passwordHash,
    expiresAt,
  });
}

export function verifyStoredOtp(email: string, code: string): { valid: boolean; name?: string; passwordHash?: string; error?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const entry = otpMap.get(normalizedEmail);

  if (!entry) {
    return { valid: false, error: "Aucun code OTP en attente pour cet email. Veuillez demander un nouveau code." };
  }

  if (Date.now() > entry.expiresAt) {
    otpMap.delete(normalizedEmail);
    return { valid: false, error: "Le code OTP a expiré (validité 10 min). Veuillez en demander un nouveau." };
  }

  if (entry.code !== code.trim()) {
    return { valid: false, error: "Code OTP incorrect. Veuillez vérifier les 6 chiffres reçus par email." };
  }

  // Remove used OTP
  otpMap.delete(normalizedEmail);
  return { valid: true, name: entry.name, passwordHash: entry.passwordHash };
}
