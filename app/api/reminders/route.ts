import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess, apiCreated } from "@/server/core/api-response";
import { RemindersService } from "@/server/services/reminders.service";
import { reminderSchema } from "@/server/schemas/reminders.schema";

// GET /api/reminders
export const GET = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "PENDING";
  const upcoming = searchParams.get("upcoming") === "true";

  const reminders = await RemindersService.listReminders(user!.id, {
    status,
    upcoming,
  });

  return apiSuccess({ reminders });
});

// POST /api/reminders
export const POST = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const body = await req.json();
  const data = reminderSchema.parse(body);

  const reminder = await RemindersService.createReminder(user!.id, data);
  return apiCreated({ reminder });
});
