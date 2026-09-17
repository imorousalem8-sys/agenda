import { auth } from "@/lib/auth";
import { UnauthorizedError } from "./errors";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string | null;
  plan: string;
  subscriptionStatus: string;
}

/**
 * Récupère l'utilisateur connecté ou lève une UnauthorizedError.
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const session = await auth();

  if (!session?.user?.id || !session?.user?.email) {
    throw new UnauthorizedError("Session expirée ou utilisateur non connecté.");
  }

  const user = session.user as unknown as {
    id: string;
    email: string;
    name?: string | null;
    plan?: string;
    subscriptionStatus?: string;
  };

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    plan: user.plan || "PRO",
    subscriptionStatus: user.subscriptionStatus || "ACTIVE",
  };
}

/**
 * Récupère l'utilisateur s'il est connecté, sans lever d'erreur.
 */
export async function getOptionalAuth(): Promise<AuthenticatedUser | null> {
  try {
    return await requireAuth();
  } catch {
    return null;
  }
}
