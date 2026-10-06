import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { RemindersService } from "@/server/services/reminders.service";
import { snoozeReminderSchema } from "@/server/schemas/reminders.schema";

type ReminderParams = { id: string };

// PUT /api/reminders/[id]/snooze
export const PUT = createApiHandler<ReminderParams>({ requireAuth: true }, async (req, { user, params }) => {
  const body = await req.json().catch(() => ({}));
  const { minutes } = snoozeReminderSchema.parse(body);

  const reminder = await RemindersService.snoozeReminder(params!.id, user!.id, minutes);
  return apiSuccess({ reminder });
});
