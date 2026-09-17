import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  startAt: z.string().min(1, "Date de début requise"),
  endAt: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  category: z
    .enum(["HEALTH", "FAMILY", "WORK", "ADMIN", "EDUCATION", "SHOPPING", "TRAVEL", "OTHER"])
    .optional()
    .default("OTHER"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional().default("NORMAL"),
  mode: z.enum(["PERSONAL", "PROFESSIONAL"]).optional().default("PERSONAL"),
  contactId: z.string().optional().nullable(),
  hasVeilleReminder: z.boolean().optional().default(false),
  reminderMinutesBefore: z.number().optional().nullable(),
});

export const eventFilterSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
export type EventFilterInput = z.infer<typeof eventFilterSchema>;
