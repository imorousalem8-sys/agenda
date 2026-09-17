import { NextRequest } from "next/server";
import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess, apiCreated } from "@/server/core/api-response";
import { EventsService } from "@/server/services/events.service";
import { eventSchema } from "@/server/schemas/events.schema";

// GET /api/events — liste les événements de l'utilisateur connecté
export const GET = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const events = await EventsService.listEvents(user!.id, { from, to });
  return apiSuccess({ events });
});

// POST /api/events — crée un nouvel événement et planifie ses rappels
export const POST = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const body = await req.json();
  const data = eventSchema.parse(body);

  const event = await EventsService.createEvent(user!.id, data);
  return apiCreated({ event });
});
