import { AIProvider, ProviderResponse, AIToolDefinition, NormalizedToolCall } from "./base";
import { AIChatMessage, AIUserContext } from "../types";

export class OpenAIProvider implements AIProvider {
  readonly id = "openai" as const;
  readonly name = "OpenAI (GPT)";
  private apiKey: string;
  private primaryModel: string;

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || "";
    this.primaryModel = model || process.env.OPENAI_MODEL || "gpt-4o-mini";
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
      throw new Error("OpenAI Provider is not configured (missing OPENAI_API_KEY).");
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-8).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ];

    const openAITools = tools.map((t) => ({
      type: "function" as const,
      function: {
        name: t.name,
        description: t.description,
        parameters: t.parameters,
      },
    }));

    const payload: Record<string, unknown> = {
      model: this.primaryModel,
      messages,
      temperature: 0.2,
      max_tokens: 1024,
    };

    if (openAITools.length > 0) {
      payload.tools = openAITools;
      payload.tool_choice = "auto";
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API failed (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const message = choice?.message;

    const toolCalls: NormalizedToolCall[] = [];
    if (message?.tool_calls && Array.isArray(message.tool_calls)) {
      for (const tc of message.tool_calls) {
        let parsedArgs: Record<string, unknown> = {};
        try {
          parsedArgs = JSON.parse(tc.function.arguments || "{}");
        } catch {
          parsedArgs = {};
        }

        toolCalls.push({
          id: tc.id || `openai-tc-${Date.now()}`,
          name: tc.function.name,
          args: parsedArgs,
        });
      }
    }

    return {
      text: message?.content || "",
      toolCalls,
      providerName: this.name,
      modelUsed: data.model || this.primaryModel,
      usage: {
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        totalTokens: data.usage?.total_tokens,
      },
    };
  }
}
