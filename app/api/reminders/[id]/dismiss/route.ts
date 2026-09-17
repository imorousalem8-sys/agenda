import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { RemindersService } from "@/server/services/reminders.service";

type ReminderParams = { id: string };

// PUT /api/reminders/[id]/dismiss
export const PUT = createApiHandler<ReminderParams>({ requireAuth: true }, async (_req, { user, params }) => {
  const reminder = await RemindersService.dismissReminder(params!.id, user!.id);
  return apiSuccess({ reminder });
});
