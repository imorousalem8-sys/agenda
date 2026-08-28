"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { X, Trash2, Phone, Mail, Building, MapPin, Loader2, PhoneCall } from "lucide-react";

export interface ContactToEdit {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  address: string | null;
  notes: string | null;
}

interface ContactEditModalProps {
  contact: ContactToEdit;
  onClose: () => void;
  onSaved: () => void;
  onDeleted?: () => void;
}

export default function ContactEditModal({ contact, onClose, onSaved, onDeleted }: ContactEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: contact.firstName,
      lastName: contact.lastName || "",
      phone: contact.phone || "",
      email: contact.email || "",
      company: contact.company || "",
      address: contact.address || "",
      notes: contact.notes || "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        onSaved();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Supprimer le contact ${contact.firstName} ${contact.lastName || ""} ?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, { method: "DELETE" });
      if (res.ok) {
        if (onDeleted) onDeleted();
        else onSaved();
      }
    } catch (e) {
      console.error(e);
    }
    setDeleting(false);
  };

  const handleCallContactTest = () => {
    window.dispatchEvent(
      new CustomEvent("test-ai-call", {
        detail: {
          id: `test-contact-${contact.id}`,
          title: `Rappel : Contacter ${contact.firstName} ${contact.lastName || ""}`,
          body: `Téléphone : ${contact.phone || "Non renseigné"}. ${contact.company ? `Entreprise : ${contact.company}.` : ""} ${contact.notes || ""}`,
          fireAt: new Date().toISOString(),
          method: "VOICE",
        },
      })
    );
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale-in" style={{ maxWidth: "520px" }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
              Modifier le contact
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
              {contact.firstName} {contact.lastName || ""}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="contact-edit-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px", maxHeight: "70vh", overflowY: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Prénom *</label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="form-input"
                  id="contact-edit-firstname"
                />
                {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input
                  {...register("lastName")}
                  type="text"
                  className="form-input"
                  id="contact-edit-lastname"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">
                  <Phone size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Téléphone
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="form-input"
                  id="contact-edit-phone"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Mail size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="form-input"
                  id="contact-edit-email"
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Building size={12} style={{ display: "inline", marginRight: "4px" }} />
                Entreprise / Société
              </label>
              <input
                {...register("company")}
                type="text"
                className="form-input"
                id="contact-edit-company"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin size={12} style={{ display: "inline", marginRight: "4px" }} />
                Adresse
              </label>
              <input
                {...register("address")}
                type="text"
                className="form-input"
                id="contact-edit-address"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                {...register("notes")}
                rows={2}
                className="form-input"
                id="contact-edit-notes"
                placeholder="Remarques importantes sur ce contact..."
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Quick action: simulate AI reminder call for this contact */}
            <div
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-primary)" }}>
                  📞 Test de rappel de contact
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  Lancer une simulation d&apos;appel IA pour ce contact
                </p>
              </div>
              <button
                type="button"
                onClick={handleCallContactTest}
                className="btn btn-secondary btn-sm"
                id="contact-test-call"
              >
                <PhoneCall size={13} color="var(--accent-primary)" />
                Tester l&apos;appel
              </button>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="btn btn-ghost"
              style={{ color: "#ef4444", padding: "8px 12px" }}
              id="contact-edit-delete"
            >
              {deleting ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={14} />}
              Supprimer
            </button>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Annuler
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary" id="contact-edit-save">
                {loading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
