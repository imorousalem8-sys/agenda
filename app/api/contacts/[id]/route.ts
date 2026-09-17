import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { ContactsService } from "@/server/services/contacts.service";
import { contactSchema } from "@/server/schemas/contacts.schema";

type ContactParams = { id: string };

// GET /api/contacts/[id]
export const GET = createApiHandler<ContactParams>({ requireAuth: true }, async (_req, { user, params }) => {
  const contact = await ContactsService.getContactById(params!.id, user!.id);
  return apiSuccess({ contact });
});

// PUT /api/contacts/[id]
export const PUT = createApiHandler<ContactParams>({ requireAuth: true }, async (req, { user, params }) => {
  const body = await req.json();
  const data = contactSchema.parse(body);

  const contact = await ContactsService.updateContact(params!.id, user!.id, data);
  return apiSuccess({ contact });
});

// DELETE /api/contacts/[id]
export const DELETE = createApiHandler<ContactParams>({ requireAuth: true }, async (_req, { user, params }) => {
  await ContactsService.deleteContact(params!.id, user!.id);
  return apiSuccess({ success: true, message: "Contact supprimé avec succès." });
});
