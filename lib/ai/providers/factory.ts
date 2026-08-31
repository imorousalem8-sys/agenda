import { AIProvider } from "./base";
import { GeminiProvider } from "./gemini";

/**
 * AI Provider Factory
 * Dynamically resolves the best available provider based on environment keys.
 */
export function getAIProvider(): AIProvider | null {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (geminiKey) {
    return new GeminiProvider(geminiKey);
  }
  return null;
}
