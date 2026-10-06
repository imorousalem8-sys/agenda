import { AIProvider, ProviderResponse, AIToolDefinition, NormalizedToolCall } from "./base";
import { AIChatMessage, AIUserContext } from "../types";

export class ClaudeProvider implements AIProvider {
  readonly id = "claude" as const;
  readonly name = "Anthropic Claude";
  private apiKey: string;
  private candidateModels: string[];

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "";
    const primary = model || process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022";
    const fallbacks = (process.env.CLAUDE_FALLBACK_MODELS || "claude-3-5-haiku-20241022,claude-3-haiku-20240307")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    this.candidateModels = [primary, ...fallbacks];
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
      throw new Error("Claude Provider is not configured (missing ANTHROPIC_API_KEY).");
    }

    const messages = [
      ...history.slice(-8).map((msg) => ({
        role: msg.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: msg.content,
      })),
      { role: "user" as const, content: userMessage },
    ];

    const claudeTools = tools.map((t) => ({
      name: t.name,
      description: t.description,
      input_schema: t.parameters,
    }));

    let lastError = "";

    for (const model of this.candidateModels) {
      try {
        const payload: Record<string, unknown> = {
          model,
          max_tokens: 1024,
          system: systemPrompt,
          messages,
          temperature: 0.2,
        };

        if (claudeTools.length > 0) {
          payload.tools = claudeTools;
        }

        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(7000),
        });

        if (res.ok) {
          const data = await res.json();
          const contentBlocks = data.content || [];

          const toolCalls: NormalizedToolCall[] = [];
          let textContent = "";

          for (const block of contentBlocks) {
            if (block.type === "text") {
              textContent += block.text;
            } else if (block.type === "tool_use") {
              toolCalls.push({
                id: block.id || `claude-tu-${Date.now()}`,
                name: block.name,
                args: (block.input as Record<string, unknown>) || {},
              });
            }
          }

          return {
            text: textContent,
            toolCalls,
            providerName: this.name,
            modelUsed: data.model || model,
            usage: {
              promptTokens: data.usage?.input_tokens,
              completionTokens: data.usage?.output_tokens,
              totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
            },
          };
        } else {
          lastError = await res.text();
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
      }
    }

    throw new Error(`Claude API failed across candidate models: ${lastError}`);
  }
}
