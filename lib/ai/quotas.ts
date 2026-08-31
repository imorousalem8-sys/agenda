import { prisma } from "@/lib/prisma";
import { APP_CONFIG } from "@/lib/config";

export interface QuotaStatus {
  used: number;
  limit: number;
  remaining: number;
  plan: string;
  resetAt: string | null;
  isExceeded: boolean;
}

/**
 * Check if the user has remaining AI quota and increment on valid user request.
 * Internal tool executions within the same request do NOT double charge.
 */
export async function checkAndIncrementQuota(userId: string): Promise<QuotaStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, aiQuotaUsed: true, aiQuotaResetAt: true },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const now = new Date();
  const plan = user.plan || "FREE";
  const limit = plan === "PRO" ? APP_CONFIG.QUOTAS.PRO_MONTHLY_LIMIT : APP_CONFIG.QUOTAS.FREE_MONTHLY_LIMIT;

  // Monthly reset check
  let quotaUsed = user.aiQuotaUsed ?? 0;
  let resetAt = user.aiQuotaResetAt;

  if (!resetAt || now > new Date(resetAt)) {
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    await prisma.user.update({
      where: { id: userId },
      data: { aiQuotaUsed: 0, aiQuotaResetAt: nextMonth },
    });
    quotaUsed = 0;
    resetAt = nextMonth;
  }

  const remaining = Math.max(0, limit - quotaUsed);
  const isExceeded = remaining <= 0;

  if (!isExceeded) {
    await prisma.user.update({
      where: { id: userId },
      data: { aiQuotaUsed: { increment: 1 } },
    });
    quotaUsed += 1;
  }

  return {
    used: quotaUsed,
    limit,
    remaining: isExceeded ? 0 : Math.max(0, limit - quotaUsed),
    plan,
    resetAt: resetAt ? new Date(resetAt).toISOString() : null,
    isExceeded,
  };
}

/**
 * Get current quota status without incrementing.
 */
export async function getQuotaStatus(userId: string): Promise<QuotaStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, aiQuotaUsed: true, aiQuotaResetAt: true },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const now = new Date();
  const plan = user.plan || "FREE";
  const limit = plan === "PRO" ? APP_CONFIG.QUOTAS.PRO_MONTHLY_LIMIT : APP_CONFIG.QUOTAS.FREE_MONTHLY_LIMIT;

  let quotaUsed = user.aiQuotaUsed ?? 0;
  const resetAt = user.aiQuotaResetAt;

  if (!resetAt || now > new Date(resetAt)) {
    quotaUsed = 0;
  }

  const remaining = Math.max(0, limit - quotaUsed);

  return {
    used: quotaUsed,
    limit,
    remaining,
    plan,
    resetAt: resetAt ? new Date(resetAt).toISOString() : null,
    isExceeded: remaining <= 0,
  };
}
