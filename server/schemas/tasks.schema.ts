import { z } from "zod";

export const taskItemSchema = z.object({
  label: z.string().min(1, "Libellé requis"),
  qty: z.string().optional().nullable(),
  done: z.boolean().default(false),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  notes: z.string().optional().nullable(),
  dueAt: z.string().optional().nullable(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional().default("NORMAL"),
  mode: z.enum(["PERSONAL", "PROFESSIONAL"]).optional().default("PERSONAL"),
  items: z.array(taskItemSchema).optional().nullable(),
});

export const updateTaskSchema = taskSchema.partial().extend({
  isDone: z.boolean().optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskItemInput = z.infer<typeof taskItemSchema>;
