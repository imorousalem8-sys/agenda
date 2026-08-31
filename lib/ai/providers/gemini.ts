import { AIProvider, ProviderResponse, ToolCallRequest } from "./base";
import { AIChatMessage, AIUserContext } from "../types";
import { APP_CONFIG } from "@/lib/config";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(
    systemPrompt: string,
    history: AIChatMessage[],
    userMessage: string,
    _context: AIUserContext,
    tools: Array<{
      name: string;
      description: string;
      parameters: Record<string, unknown>;
    }>
  ): Promise<ProviderResponse> {
    const candidateModels = [
      APP_CONFIG.AI.PRIMARY_MODEL,
      ...APP_CONFIG.AI.FALLBACK_MODELS,
    ].filter(Boolean);

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...history.slice(-8).map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const toolsDeclaration = [
      {
        function_declarations: tools.map((t) => ({
          name: t.name,
          description: t.description,
          parameters: t.parameters,
        })),
      },
    ];

    const payload = {
      contents,
      tools: toolsDeclaration,
      generationConfig: {
        temperature: APP_CONFIG.AI.TEMPERATURE,
        maxOutputTokens: APP_CONFIG.AI.MAX_OUTPUT_TOKENS,
      },
    };

    let lastError = "";
    let successfulModel = "";

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          const candidate = data.candidates?.[0];
          const parts = candidate?.content?.parts || [];

          // Extract all tool calls in the response (multi-step support)
          const toolCalls: ToolCallRequest[] = [];
          for (const p of parts) {
            if (p.functionCall) {
              toolCalls.push({
                name: p.functionCall.name,
                args: p.functionCall.args || {},
              });
            }
          }

          const textPart = parts.find((p: { text?: string }) => p.text);
          const text = textPart?.text || "";

          successfulModel = model;
          return {
            text,
            toolCalls,
            modelUsed: successfulModel,
          };
        } else {
          lastError = await res.text();
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
      }
    }

    throw new Error(`Gemini Provider failed on all candidate models (${candidateModels.join(", ")}): ${lastError}`);
  }
}
