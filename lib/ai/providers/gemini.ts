import { AIProvider, ProviderResponse, AIToolDefinition, NormalizedToolCall } from "./base";
import { AIChatMessage, AIUserContext } from "../types";
import { APP_CONFIG } from "@/lib/config";

export class GeminiProvider implements AIProvider {
  readonly id = "gemini" as const;
  readonly name = "Google Gemini";
  private apiKey: string;
  private primaryModel: string;
  private fallbackModels: string[];

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
    this.primaryModel = model || process.env.GEMINI_MODEL || APP_CONFIG.AI.PRIMARY_MODEL || "gemini-3.6-flash";
    this.fallbackModels = (process.env.GEMINI_FALLBACK_MODELS || APP_CONFIG.AI.FALLBACK_MODELS.join(","))
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  async generateResponse(
    systemPrompt: string,
    history: AIChatMessage[],
    userMessage: string,
    _context: AIUserContext,
    tools: AIToolDefinition[]
  ): Promise<ProviderResponse> {
    if (!this.isConfigured()) {
      throw new Error("Gemini Provider is not configured (missing GEMINI_API_KEY).");
    }

    const candidateModels = [this.primaryModel, ...this.fallbackModels].filter(Boolean);

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...history.slice(-APP_CONFIG.AGENT.MAX_HISTORY_MESSAGES).map((msg) => ({
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

          const toolCalls: NormalizedToolCall[] = [];
          for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (p.functionCall) {
              toolCalls.push({
                id: `gemini-call-${Date.now()}-${i}`,
                name: p.functionCall.name,
                args: (p.functionCall.args as Record<string, unknown>) || {},
              });
            }
          }

          const textPart = parts.find((p: { text?: string }) => p.text);
          const text = textPart?.text || "";

          return {
            text,
            toolCalls,
            providerName: this.name,
            modelUsed: model,
            usage: {
              promptTokens: data.usageMetadata?.promptTokenCount,
              completionTokens: data.usageMetadata?.candidatesTokenCount,
              totalTokens: data.usageMetadata?.totalTokenCount,
            },
          };
        } else {
          lastError = await res.text();
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
      }
    }

    throw new Error(`Gemini Provider failed across candidate models: ${lastError}`);
  }
}
