import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { RemindersService } from "@/server/services/reminders.service";
import { reminderSchema } from "@/server/schemas/reminders.schema";

type ReminderParams = { id: string };

// GET /api/reminders/[id]
export const GET = createApiHandler<ReminderParams>({ requireAuth: true }, async (_req, { user, params }) => {
  const reminder = await RemindersService.getReminderById(params!.id, user!.id);
  return apiSuccess({ reminder });
});

// PUT /api/reminders/[id]
export const PUT = createApiHandler<ReminderParams>({ requireAuth: true }, async (req, { user, params }) => {
  const body = await req.json();
  const data = reminderSchema.parse(body);

  const reminder = await RemindersService.updateReminder(params!.id, user!.id, data);
  return apiSuccess({ reminder });
});

// DELETE /api/reminders/[id]
export const DELETE = createApiHandler<ReminderParams>({ requireAuth: true }, async (_req, { user, params }) => {
  await RemindersService.deleteReminder(params!.id, user!.id);
  return apiSuccess({ success: true, message: "Rappel supprimé avec succès." });
});
