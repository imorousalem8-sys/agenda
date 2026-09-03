/**
 * Global Application Configuration
 * All quotas and AI parameters are configurable via environment variables with safe defaults.
 */
export const APP_CONFIG = {
  // Quotas for AI Requests (User-facing prompts)
  QUOTAS: {
    FREE_MONTHLY_LIMIT: parseInt(process.env.FREE_AI_MONTHLY_LIMIT || "20", 10),
    PRO_MONTHLY_LIMIT: parseInt(process.env.PRO_AI_MONTHLY_LIMIT || "500", 10),
  },

  // Multi-Step Agent Guardrails & Abuse Prevention
  AGENT: {
    MAX_STEPS_PER_REQUEST: parseInt(process.env.MAX_AGENT_STEPS_PER_REQUEST || "6", 10),
    RATE_LIMIT_PER_MINUTE: parseInt(process.env.AI_RATE_LIMIT_PER_MINUTE || "30", 10),
    MAX_INPUT_CHARS: 2500, // Empêche l'envoi de textes gigantesques
    MAX_HISTORY_MESSAGES: 10, // Tronquage de l'historique pour limiter les tokens
  },

  // AI Models & Fallback Chain
  AI: {
    PRIMARY_MODEL: process.env.AI_PRIMARY_MODEL || "gemini-2.5-flash",
    FALLBACK_MODELS: (process.env.AI_FALLBACK_MODELS || "gemini-2.0-flash,gemini-1.5-flash,gemini-flash-latest").split(",").map((s) => s.trim()),
    TEMPERATURE: 0.2,
    MAX_OUTPUT_TOKENS: 1000,
  },
};
