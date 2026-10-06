import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { EventsService } from "@/server/services/events.service";
import { eventSchema } from "@/server/schemas/events.schema";

type EventParams = { id: string };

// GET /api/events/[id]
export const GET = createApiHandler<EventParams>({ requireAuth: true }, async (_req, { user, params }) => {
  const event = await EventsService.getEventById(params!.id, user!.id);
  return apiSuccess({ event });
});

// PUT /api/events/[id]
export const PUT = createApiHandler<EventParams>({ requireAuth: true }, async (req, { user, params }) => {
  const body = await req.json();
  const data = eventSchema.parse(body);

  const event = await EventsService.updateEvent(params!.id, user!.id, data);
  return apiSuccess({ event });
});

// DELETE /api/events/[id]
export const DELETE = createApiHandler<EventParams>({ requireAuth: true }, async (_req, { user, params }) => {
  await EventsService.deleteEvent(params!.id, user!.id);
  return apiSuccess({ success: true, message: "Événement supprimé avec succès." });
});
