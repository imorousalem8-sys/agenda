import { z } from "zod";

export const reminderSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  body: z.string().optional().nullable(),
  fireAt: z.string().min(1, "Date/heure requise"),
  method: z.enum(["NOTIFICATION", "ALARM", "EMAIL", "VOICE"]).optional().default("VOICE"),
  eventId: z.string().optional().nullable(),
  taskId: z.string().optional().nullable(),
});

export const snoozeReminderSchema = z.object({
  minutes: z.number().int().positive().default(10),
});

export type ReminderInput = z.infer<typeof reminderSchema>;
export type SnoozeReminderInput = z.infer<typeof snoozeReminderSchema>;
