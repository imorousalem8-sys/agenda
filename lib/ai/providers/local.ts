import { AIProvider, ProviderResponse, AIToolDefinition } from "./base";
import { AIChatMessage, AIUserContext } from "../types";
import { executeLocalContextualAgent } from "../localEngine";

export class LocalEngineProvider implements AIProvider {
  readonly id = "local" as const;
  readonly name = "Moteur Local Déterministe";

  isConfigured(): boolean {
    return true; // Always available, 0 cost, no external API keys
  }

  async generateResponse(
    _systemPrompt: string,
    history: AIChatMessage[],
    userMessage: string,
    context: AIUserContext,
    _tools: AIToolDefinition[]
  ): Promise<ProviderResponse> {
    const res = await executeLocalContextualAgent(userMessage, history, context);

    return {
      text: res.reply,
      toolCalls: [], // Local engine executes tools internally
      providerName: this.name,
      modelUsed: "alarmagenda-deterministic-rules-v1",
      directAction: res.action,
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    };
  }
}
