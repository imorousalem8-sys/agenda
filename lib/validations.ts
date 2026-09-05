import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const eventSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  startAt: z.string().min(1, "Date de début requise"),
  endAt: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  category: z.enum([
    "HEALTH", "FAMILY", "WORK", "ADMIN", "EDUCATION", "SHOPPING", "TRAVEL", "OTHER"
  ]).optional().default("OTHER"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional().default("NORMAL"),
  mode: z.enum(["PERSONAL", "PROFESSIONAL"]).optional().default("PERSONAL"),
  contactId: z.string().optional().nullable(),
  hasVeilleReminder: z.boolean().optional().default(false),
  reminderMinutesBefore: z.number().optional().nullable(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  notes: z.string().optional().nullable(),
  dueAt: z.string().optional().nullable(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional().default("NORMAL"),
  mode: z.enum(["PERSONAL", "PROFESSIONAL"]).optional().default("PERSONAL"),
  items: z
    .array(z.object({ label: z.string(), qty: z.string().optional().nullable(), done: z.boolean().default(false) }))
    .optional()
    .nullable(),
});

export const reminderSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  body: z.string().optional().nullable(),
  fireAt: z.string().min(1, "Date/heure requise"),
  method: z.enum(["NOTIFICATION", "ALARM", "EMAIL", "VOICE"]).optional().default("VOICE"),
  eventId: z.string().optional().nullable(),
  taskId: z.string().optional().nullable(),
});

export const contactSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis").max(100),
  lastName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("Email invalide").optional().nullable().or(z.literal("")),
  company: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type ReminderInput = z.infer<typeof reminderSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
