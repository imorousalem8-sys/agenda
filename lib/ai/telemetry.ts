export interface AITelemetryRecord {
  intent: string;
  messagePreview: string;
  dbQueriesCount: number;
  toolsUsed: string[];
  intentTimeMs: number;
  dbTimeMs: number;
  llmTimeMs: number;
  executionTimeMs: number;
  totalTimeMs: number;
  success: boolean;
  error?: string;
  isFastRoute: boolean;
}

export class AITelemetryTracker {
  private startTime: number;
  private intentStartTime: number = 0;
  private intentTimeMs: number = 0;
  private dbStartTime: number = 0;
  private dbTimeMs: number = 0;
  private llmStartTime: number = 0;
  private llmTimeMs: number = 0;
  private executionStartTime: number = 0;
  private executionTimeMs: number = 0;
  
  private dbQueriesCount: number = 0;
  private toolsUsed: string[] = [];
  private intent: string = "unknown";
  private isFastRoute: boolean = false;
  private message: string = "";

  constructor(userMessage: string) {
    this.startTime = performance.now();
    this.message = userMessage.slice(0, 80);
  }

  public startIntentTimer() {
    this.intentStartTime = performance.now();
  }

  public endIntentTimer(intent: string, isFast: boolean = false) {
    this.intentTimeMs = Math.round(performance.now() - (this.intentStartTime || this.startTime));
    this.intent = intent;
    this.isFastRoute = isFast;
  }

  public startDbTimer() {
    this.dbStartTime = performance.now();
  }

  public endDbTimer(queriesCount: number = 1) {
    if (this.dbStartTime > 0) {
      this.dbTimeMs += Math.round(performance.now() - this.dbStartTime);
      this.dbStartTime = 0;
    }
    this.dbQueriesCount += queriesCount;
  }

  public startLlmTimer() {
    this.llmStartTime = performance.now();
  }

  public endLlmTimer() {
    if (this.llmStartTime > 0) {
      this.llmTimeMs += Math.round(performance.now() - this.llmStartTime);
      this.llmStartTime = 0;
    }
  }

  public startExecutionTimer() {
    this.executionStartTime = performance.now();
  }

  public recordTool(toolName: string) {
    if (!this.toolsUsed.includes(toolName)) {
      this.toolsUsed.push(toolName);
    }
  }

  public endExecutionTimer() {
    if (this.executionStartTime > 0) {
      this.executionTimeMs += Math.round(performance.now() - this.executionStartTime);
      this.executionStartTime = 0;
    }
  }

  public finish(success: boolean = true, error?: string): AITelemetryRecord {
    const totalTimeMs = Math.round(performance.now() - this.startTime);
    const record: AITelemetryRecord = {
      intent: this.intent,
      messagePreview: this.message,
      dbQueriesCount: this.dbQueriesCount,
      toolsUsed: this.toolsUsed,
      intentTimeMs: this.intentTimeMs,
      dbTimeMs: this.dbTimeMs,
      llmTimeMs: this.llmTimeMs,
      executionTimeMs: this.executionTimeMs,
      totalTimeMs,
      success,
      error,
      isFastRoute: this.isFastRoute,
    };

    // Output formatted technical log as specified in requirement #16
    console.log(
      `[AI Telemetry] Message: "${record.messagePreview}" | Intent: ${record.intent} | FastRoute: ${record.isFastRoute} | DB Queries: ${record.dbQueriesCount} (${record.dbTimeMs}ms) | LLM: ${record.llmTimeMs}ms | Exec: ${record.executionTimeMs}ms | Total: ${record.totalTimeMs}ms | Tools: [${record.toolsUsed.join(", ") || "none"}] | Success: ${record.success}`
    );

    return record;
  }
}
