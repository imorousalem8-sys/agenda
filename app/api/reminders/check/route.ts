import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { RemindersService } from "@/server/services/reminders.service";

// GET /api/reminders/check
export const GET = createApiHandler({ requireAuth: false }, async (_req, { user }) => {
  if (!user?.id) {
    return apiSuccess({ reminders: [] });
  }

  const reminders = await RemindersService.checkUserDueReminders(user.id);

  return apiSuccess(
    { reminders },
    200,
    {
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
    }
  );
});
