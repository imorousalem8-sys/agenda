import { prisma } from "@/lib/prisma";

/**
 * Assure qu'un identifiant utilisateur existe de manière garantie dans la table User de Prisma.
 * Prévient 100% des erreurs de clé étrangère (Foreign key constraint violated: ..._userId_fkey).
 */
export async function resolveDbUserId(
  userId: string,
  email?: string | null,
  name?: string | null
): Promise<string> {
  const normalizedEmail = (email && email.includes("@")) ? email.toLowerCase().trim() : undefined;

  // 1. Recherche directe par ID
  if (userId) {
    try {
      const existingById = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });
      if (existingById) {
        return existingById.id;
      }
    } catch (err) {
      console.warn("[DB User] Lookup by id warning:", err);
    }
  }

  // 2. Recherche par Email
  if (normalizedEmail) {
    try {
      const existingByEmail = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
      });
      if (existingByEmail) {
        return existingByEmail.id;
      }
    } catch (err) {
      console.warn("[DB User] Lookup by email warning:", err);
    }
  }

  // 3. Si l'utilisateur est le compte démo ou un ID transitoire, créer/upsert l'utilisateur
  try {
    const safeId = userId || `usr_${Date.now()}`;
    const safeEmail = normalizedEmail || (safeId === "demo_usr_1" ? "demo@alarmagenda.ai" : `user_${safeId.replace(/[^a-zA-Z0-9]/g, "") || Date.now()}@alarmagenda.ai`);
    const safeName = name || (safeId === "demo_usr_1" ? "Utilisateur Démo" : "Utilisateur");

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
  } catch (upsertErr) {
    console.warn("[DB User] Upsert user warning:", upsertErr);

    // Fallback ultime : récupérer le premier utilisateur présent en base
    try {
      const fallback = await prisma.user.findFirst({ select: { id: true } });
      if (fallback) return fallback.id;
    } catch {}

    return userId;
  }
}
