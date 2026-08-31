export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Tool call security levels:
 * 1 = auto-execute (read-only, create simple items)
 * 2 = optional confirmation (modify, delete)
 * 3 = mandatory confirmation (send email, invoice, bulk delete)
 */
export type ToolCallLevel = 1 | 2 | 3;

/**
 * Visual step shown to the user while the agent works
 */
export interface AgentStep {
  id: string;
  label: string; // e.g. "Analyse de ton agenda..."
  status: "pending" | "running" | "done" | "error";
  detail?: string; // e.g. "3 rendez-vous trouvés"
  icon?: string; // emoji or icon name
}

export interface AIUserContext {
  userId: string;
  userName?: string | null;
  currentTime: string; // ISO format
  currentDateFormatted: string; // e.g. "jeudi 27 août 2026, 12:30"
  timezone: string;
  activeTarget?: {
    type: "EVENT" | "TASK" | "REMINDER";
    id: string;
    title: string;
    scheduledAt?: string;
  } | null;
  eventsSummary: {
    id: string;
    title: string;
    startAt: string;
    startFormatted: string;
    location?: string | null;
    category: string;
    mode: string;
    contactName?: string | null;
  }[];
  tasksSummary: {
    id: string;
    title: string;
    dueAt?: string | null;
    dueFormatted?: string | null;
    priority: string;
    isDone: boolean;
    mode: string;
  }[];
  remindersSummary: {
    id: string;
    title: string;
    fireAt: string;
    fireFormatted: string;
    status: string;
    method: string;
  }[];
  contactsSummary: {
    id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
  }[];
  memorySummary: {
    key: string;
    value: string;
  }[];
  quotaRemaining: number;
  quotaLimit: number;
}

export interface AIToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface AIActionExecutionResult {
  id?: string;
  type: "TASK" | "EVENT" | "REMINDER" | "CONTACT" | "INFO" | "DELETE_CONFIRM" | "MEMORY" | "SCHEDULE";
  title: string;
  notes?: string;
  dateTime?: string;
  contactName?: string;
  priority?: string;
  mode?: string;
  category?: string;
  status?: string;
  level?: ToolCallLevel;
  requiresConfirmation?: boolean;
  confirmationPayload?: {
    action: "DELETE_EVENT" | "DELETE_TASK" | "SEND_EMAIL";
    targetId: string;
    targetTitle: string;
  };
  scheduleItems?: {
    time: string;
    title: string;
    type: "event" | "task" | "reminder" | "free";
  }[];
}

export interface AIEngineResponse {
  reply: string;
  spokenReply?: string;
  action?: AIActionExecutionResult | null;
  steps?: AgentStep[];
  activeTarget?: {
    type: "EVENT" | "TASK" | "REMINDER";
    id: string;
    title: string;
    scheduledAt?: string;
  } | null;
  saved?: boolean;
  executed?: boolean;
  quota?: {
    used: number;
    limit: number;
    remaining: number;
  };
}
