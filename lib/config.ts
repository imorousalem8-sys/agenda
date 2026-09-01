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
    MAX_STEPS_PER_REQUEST: parseInt(process.env.MAX_AGENT_STEPS_PER_REQUEST || "4", 10),
    RATE_LIMIT_PER_MINUTE: parseInt(process.env.AI_RATE_LIMIT_PER_MINUTE || "5", 10),
    MAX_INPUT_CHARS: 1500, // Empêche l'envoi de textes gigantesques
    MAX_HISTORY_MESSAGES: 6, // Tronquage de l'historique pour limiter les tokens
  },

  // AI Models & Fallback Chain
  AI: {
    PRIMARY_MODEL: process.env.AI_PRIMARY_MODEL || "gemini-3.7-flash",
    FALLBACK_MODELS: (process.env.AI_FALLBACK_MODELS || "gemini-3.6-flash,gemini-flash-latest,gemini-3.5-flash").split(",").map((s) => s.trim()),
    TEMPERATURE: 0.2,
    MAX_OUTPUT_TOKENS: 800,
  },
};
