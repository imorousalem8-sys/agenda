import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess, apiCreated } from "@/server/core/api-response";
import { ContactsService } from "@/server/services/contacts.service";
import { contactSchema } from "@/server/schemas/contacts.schema";

// GET /api/contacts
export const GET = createApiHandler({ requireAuth: true }, async (_req, { user }) => {
  const contacts = await ContactsService.listContacts(user!.id);
  return apiSuccess({ contacts });
});

// POST /api/contacts
export const POST = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const body = await req.json();
  const data = contactSchema.parse(body);

  const contact = await ContactsService.createContact(user!.id, data);
  return apiCreated({ contact });
});
