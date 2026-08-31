import { prisma } from "@/lib/prisma";

/**
 * Log an agent action to the database.
 * Params are sanitized — never log API keys, passwords, or tokens.
 */
export async function logAgentAction(
  userId: string,
  tool: string,
  params: Record<string, unknown>,
  success: boolean,
  durationMs?: number,
  errorMsg?: string,
  aiRequestId?: string
): Promise<void> {
  try {
    // Sanitize params: remove any potential secrets
    const sanitized = { ...params };
    const sensitiveKeys = ["password", "token", "secret", "apiKey", "api_key", "key", "auth"];
    for (const k of Object.keys(sanitized)) {
      if (sensitiveKeys.some((s) => k.toLowerCase().includes(s))) {
        sanitized[k] = "[REDACTED]";
      }
    }

    // Truncate params to prevent oversized logs
    const paramsStr = JSON.stringify(sanitized).slice(0, 2000);

    await prisma.agentLog.create({
      data: {
        userId,
        tool,
        params: paramsStr,
        success,
        errorMsg: errorMsg?.slice(0, 500),
        durationMs,
        aiRequestId,
      },
    });
  } catch (err) {
    // Never let logging errors break the main flow
    console.error("AgentLog write error (non-blocking):", err);
  }
}
