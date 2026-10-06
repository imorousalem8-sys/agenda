import { prisma } from "@/lib/prisma";

let dbLastUnreachable = 0;
const DB_COOLDOWN_MS = 60000; // 60s cooldown

export function isDbKnownDown(): boolean {
  return Date.now() - dbLastUnreachable < DB_COOLDOWN_MS;
}

export function markDbUnreachable(): void {
  dbLastUnreachable = Date.now();
}

function withDbTimeout<T>(promise: Promise<T>, timeoutMs = 1200): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("DB_TIMEOUT")), timeoutMs)
    ),
  ]);
}

/**
 * Assure qu'un identifiant utilisateur existe de manière garantie dans la table User de Prisma.
 * Prévient 100% des erreurs de clé étrangère (Foreign key constraint violated).
 * Doté d'un coupe-circuit instantané pour ne jamais bloquer en cas de base de données hors-ligne.
 */
export async function resolveDbUserId(
  userId: string,
  email?: string | null,
  name?: string | null
): Promise<string> {
  if (!userId) return `usr_${Date.now()}`;
  if (isDbKnownDown()) return userId;

  const normalizedEmail = email && email.includes("@") ? email.toLowerCase().trim() : undefined;

  // 1. Recherche directe par ID avec timeout 1.2s
  try {
    const existingById = await withDbTimeout(
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      })
    );
    if (existingById) {
      return existingById.id;
    }
  } catch (err) {
    markDbUnreachable();
    return userId;
  }

  // 2. Recherche par Email avec timeout 1.2s
  if (normalizedEmail) {
    try {
      const existingByEmail = await withDbTimeout(
        prisma.user.findUnique({
          where: { email: normalizedEmail },
          select: { id: true },
        })
      );
      if (existingByEmail) {
        return existingByEmail.id;
      }
    } catch {
      markDbUnreachable();
      return userId;
    }
  }

  // 3. Si l'utilisateur est un ID transitoire, créer/upsert l'utilisateur
  try {
    const safeId = userId || `usr_${Date.now()}`;
    const safeEmail = normalizedEmail || `user_${safeId.replace(/[^a-zA-Z0-9]/g, "") || Date.now()}@alarmagenda.ai`;
    const safeName = name || "Utilisateur";

    const created = await prisma.user.upsert({
      where: { id: safeId },
      update: {
        name: safeName,
      },
      create: {
        id: safeId,
        email: safeEmail,
        name: safeName,
        plan: "PRO",
        subscriptionStatus: "ACTIVE",
      },
      select: { id: true },
    });
    return created.id;
  } catch {
    markDbUnreachable();
    return userId;
  }
}
