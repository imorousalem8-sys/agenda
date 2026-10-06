import { AIProvider } from "./base";
import { GeminiProvider } from "./gemini";
import { OpenAIProvider } from "./openai";
import { ClaudeProvider } from "./claude";
import { LocalEngineProvider } from "./local";

/**
 * AI Provider Registry & Dynamic Fallback Chain
 * Allows switching provider via AI_PROVIDER env var ("gemini" | "openai" | "claude" | "auto")
 */
export function getAvailableAIProviders(): AIProvider[] {
  const preferredProvider = (process.env.AI_PROVIDER || "auto").toLowerCase();
  
  const gemini = new GeminiProvider();
  const openai = new OpenAIProvider();
  const claude = new ClaudeProvider();
  const local = new LocalEngineProvider();

  // Explicit user preference prioritized first
  const providers: AIProvider[] = [];

  if (preferredProvider === "openai" && openai.isConfigured()) providers.push(openai);
  else if (preferredProvider === "claude" && claude.isConfigured()) providers.push(claude);
  else if (preferredProvider === "gemini" && gemini.isConfigured()) providers.push(gemini);

  // Add all other configured providers to the fallback chain
  if (gemini.isConfigured() && !providers.includes(gemini)) providers.push(gemini);
  if (openai.isConfigured() && !providers.includes(openai)) providers.push(openai);
  if (claude.isConfigured() && !providers.includes(claude)) providers.push(claude);

  // Local deterministic engine is always the ultimate safety net
  providers.push(local);

  return providers;
}

/**
 * Resolves the primary active provider
 */
export function getAIProvider(): AIProvider {
  const chain = getAvailableAIProviders();
  return chain[0];
}
