import { AIChatMessage, AIUserContext } from "../types";

/**
 * Universal Normalized Tool Definition
 * Independent of any specific LLM provider format.
 */
export interface AIToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, {
      type: string;
      description?: string;
      enum?: string[];
      items?: Record<string, unknown>;
    }>;
    required?: string[];
  };
}

/**
 * Normalized Tool Call from any LLM provider
 */
export interface NormalizedToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

/**
 * Normalized Provider Output
 */
export interface ProviderResponse {
  text: string;
  toolCalls: NormalizedToolCall[];
  providerName: string;
  modelUsed: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

/**
 * Unified AI Provider Contract
 * All providers (Gemini, OpenAI, Claude, Local) must implement this interface.
 */
export interface AIProvider {
  readonly id: "gemini" | "openai" | "claude" | "local";
  readonly name: string;
  
  /**
   * Check if this provider has valid credentials/configuration
   */
  isConfigured(): boolean;

  /**
   * Primary inference and tool calling method
   */
  generateResponse(
    systemPrompt: string,
    history: AIChatMessage[],
    userMessage: string,
    context: AIUserContext,
    tools: AIToolDefinition[]
  ): Promise<ProviderResponse>;
}
