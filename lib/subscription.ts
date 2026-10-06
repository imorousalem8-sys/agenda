import { prisma } from "@/lib/prisma";

export type SubscriptionPlan = "FREE" | "PRO";
export type SubscriptionStatus = "INACTIVE" | "ACTIVE" | "TRIAL" | "EXPIRED";

export type FeatureKey =
  | "PERSISTENT_ALARM"
  | "PROFESSIONAL_MODE"
  | "UNLIMITED_VOICE"
  | "UNLIMITED_EVENTS"
  | "EXPORT_DATA";

export interface UserSubscriptionDetails {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  isPro: boolean;
  trialDaysLeft?: number;
  expiresAt?: string | null;
  features: {
    canUsePersistentAlarm: boolean;
    canUseProfessionalMode: boolean;
    canUseUnlimitedVoice: boolean;
    maxActiveEvents: number;
    hasPrioritySupport: boolean;
  };
}

export function isProUser(user: {
  plan?: string | null;
  subscriptionStatus?: string | null;
  subscriptionEndsAt?: Date | null;
  trialEndsAt?: Date | null;
}): boolean {
  if (!user) return false;

  const now = new Date();

  // If user has active PRO plan
  if (user.plan === "PRO" && user.subscriptionStatus === "ACTIVE") {
    if (!user.subscriptionEndsAt || new Date(user.subscriptionEndsAt) > now) {
      return true;
    }
  }

  // If user is currently in trial
  if (user.subscriptionStatus === "TRIAL" && user.trialEndsAt) {
    if (new Date(user.trialEndsAt) > now) {
      return true;
    }
  }

  return false;
}

export async function getUserSubscriptionDetails(userId: string): Promise<UserSubscriptionDetails> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
        subscriptionStatus: true,
        trialEndsAt: true,
        subscriptionEndsAt: true,
      },
    });

    if (!user) {
      return {
        plan: "FREE",
        status: "INACTIVE",
        isPro: false,
        features: {
          canUsePersistentAlarm: false,
          canUseProfessionalMode: false,
          canUseUnlimitedVoice: false,
          maxActiveEvents: 5,
          hasPrioritySupport: false,
        },
      };
    }

    const isPro = isProUser(user);
    const now = new Date();
    let trialDaysLeft: number | undefined;

    if (user.trialEndsAt && new Date(user.trialEndsAt) > now) {
      trialDaysLeft = Math.ceil((new Date(user.trialEndsAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

    return {
      plan: isPro ? "PRO" : "FREE",
      status: (user.subscriptionStatus as SubscriptionStatus) || "INACTIVE",
      isPro,
      trialDaysLeft,
      expiresAt: user.subscriptionEndsAt ? user.subscriptionEndsAt.toISOString() : null,
      features: {
        canUsePersistentAlarm: isPro,
        canUseProfessionalMode: isPro,
        canUseUnlimitedVoice: isPro,
        maxActiveEvents: isPro ? 9999 : 5,
        hasPrioritySupport: isPro,
      },
    };
  } catch (error) {
    console.error("getUserSubscriptionDetails fallback:", error);
    return {
      plan: "FREE",
      status: "INACTIVE",
      isPro: false,
      features: {
        canUsePersistentAlarm: false,
        canUseProfessionalMode: false,
        canUseUnlimitedVoice: false,
        maxActiveEvents: 5,
        hasPrioritySupport: false,
      },
    };
  }
}

export async function checkFeatureAccess(userId: string, feature: FeatureKey): Promise<{ allowed: boolean; reason?: string }> {
  const details = await getUserSubscriptionDetails(userId);

  switch (feature) {
    case "PERSISTENT_ALARM":
      return details.features.canUsePersistentAlarm
        ? { allowed: true }
        : { allowed: false, reason: "L'alarme vocale persistante et le réveil en boucle nécessitent un abonnement Pro." };

    case "PROFESSIONAL_MODE":
      return details.features.canUseProfessionalMode
        ? { allowed: true }
        : { allowed: false, reason: "L'espace Professionnel étanche est réservé aux membres de l'offre Pro." };

    case "UNLIMITED_VOICE":
      return details.features.canUseUnlimitedVoice
        ? { allowed: true }
        : { allowed: false, reason: "La dictée vocale illimitée nécessite un compte Pro." };

    default:
      return { allowed: true };
  }
}
