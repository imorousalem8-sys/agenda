import { ContactsRepository } from "../repositories/contacts.repository";
import { ContactInput, UpdateContactInput } from "../schemas/contacts.schema";
import { NotFoundError } from "../core/errors";

export class ContactsService {
  static async listContacts(userId: string) {
    return ContactsRepository.findByUserId(userId);
  }

  static async getContactById(id: string, userId: string) {
    const contact = await ContactsRepository.findById(id, userId);
    if (!contact) {
      throw new NotFoundError("Contact introuvable.");
    }
    return contact;
  }

  static async createContact(userId: string, data: ContactInput) {
    return ContactsRepository.create({
      userId,
      firstName: data.firstName,
      lastName: data.lastName || null,
      phone: data.phone || null,
      email: data.email || null,
      company: data.company || null,
      address: data.address || null,
      notes: data.notes || null,
    });
  }

  static async updateContact(id: string, userId: string, data: UpdateContactInput) {
    const existing = await ContactsRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError("Contact introuvable.");
    }

    const updated = await ContactsRepository.update(id, userId, {
      ...(data.firstName !== undefined ? { firstName: data.firstName } : {}),
      ...(data.lastName !== undefined ? { lastName: data.lastName } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.email !== undefined ? { email: data.email || null } : {}),
      ...(data.company !== undefined ? { company: data.company } : {}),
      ...(data.address !== undefined ? { address: data.address } : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
    });

    if (!updated) {
      throw new NotFoundError("Contact introuvable.");
    }

    return updated;
  }

  static async deleteContact(id: string, userId: string) {
    const deleted = await ContactsRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundError("Contact introuvable.");
    }
    return true;
  }
}
