export type AIMode = "PERSONAL" | "PROFESSIONAL";

export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIUserContext {
  userId: string;
  userName?: string | null;
  mode: AIMode;
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
}

export interface AIToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface AIActionExecutionResult {
  id?: string;
  type: "TASK" | "EVENT" | "REMINDER" | "CONTACT" | "INFO" | "DELETE_CONFIRM";
  title: string;
  notes?: string;
  dateTime?: string;
  contactName?: string;
  priority?: string;
  mode?: string;
  category?: string;
  status?: string;
  requiresConfirmation?: boolean;
  confirmationPayload?: {
    action: "DELETE_EVENT" | "DELETE_TASK";
    targetId: string;
    targetTitle: string;
  };
}

export interface AIEngineResponse {
  reply: string;
  spokenReply?: string;
  action?: AIActionExecutionResult | null;
  activeTarget?: {
    type: "EVENT" | "TASK" | "REMINDER";
    id: string;
    title: string;
    scheduledAt?: string;
  } | null;
  saved?: boolean;
  executed?: boolean;
}
