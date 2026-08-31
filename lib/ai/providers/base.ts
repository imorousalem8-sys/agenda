import { AIChatMessage, AIUserContext } from "../types";

export interface ToolCallRequest {
  id?: string;
  name: string;
  args: Record<string, unknown>;
}

export interface ProviderResponse {
  text: string;
  toolCalls: ToolCallRequest[];
  modelUsed: string;
}

export interface AIProvider {
  name: string;
  generateResponse(
    systemPrompt: string,
    history: AIChatMessage[],
    userMessage: string,
    context: AIUserContext,
    tools: Array<{
      name: string;
      description: string;
      parameters: Record<string, unknown>;
    }>
  ): Promise<ProviderResponse>;
}
