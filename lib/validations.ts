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
  title: z.string().min(1, "Titre requis").max(100),
  description: z.string().optional(),
  notes: z.string().optional(),
  startAt: z.string().min(1, "Date de début requise"),
  endAt: z.string().optional(),
  location: z.string().optional(),
  category: z.enum([
    "HEALTH", "FAMILY", "WORK", "ADMIN", "EDUCATION", "SHOPPING", "TRAVEL", "OTHER"
  ]).default("OTHER"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  mode: z.enum(["PERSONAL", "PROFESSIONAL"]).default("PERSONAL"),
  contactId: z.string().optional(),
  hasVeilleReminder: z.boolean().default(false),
  reminderMinutesBefore: z.number().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Titre requis").max(100),
  notes: z.string().optional(),
  dueAt: z.string().optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  mode: z.enum(["PERSONAL", "PROFESSIONAL"]).default("PERSONAL"),
  items: z
    .array(z.object({ label: z.string(), qty: z.string().optional(), done: z.boolean().default(false) }))
    .optional(),
});

export const reminderSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  body: z.string().optional(),
  fireAt: z.string().min(1, "Date/heure requise"),
  method: z.enum(["NOTIFICATION", "ALARM", "EMAIL", "VOICE"]).default("NOTIFICATION"),
  eventId: z.string().optional(),
  taskId: z.string().optional(),
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
