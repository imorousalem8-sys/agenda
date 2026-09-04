"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Phone, Mail, Building, MapPin, X, Loader2, Edit2, Trash2, PhoneCall } from "lucide-react";
import ContactEditModal, { type ContactToEdit } from "@/components/forms/ContactEditModal";

interface Contact {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  address: string | null;
  notes: string | null;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "", email: "", company: "", address: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setContacts(data.contacts ?? []);
    } catch { /* ok */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveContact = async () => {
    if (!formData.firstName.trim()) return;
    setSaving(true);
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSaving(false);
    setShowForm(false);
    setFormData({ firstName: "", lastName: "", phone: "", email: "", company: "", address: "", notes: "" });
    load();
  };

  const deleteContact = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Supprimer ce contact ?")) return;
    setDeletingId(id);
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    setDeletingId(null);
    load();
  };

  const handleTestContactCall = (c: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("test-ai-call", {
        detail: {
          id: `test-contact-${c.id}`,
          title: `Rappel : Contacter ${c.firstName} ${c.lastName || ""}`,
          body: `Numéro : ${c.phone || "Non renseigné"}. ${c.company ? `Société : ${c.company}.` : ""} ${c.notes || ""}`,
          fireAt: new Date().toISOString(),
          method: "VOICE",
        },
      })
    );
  };

  return (
    <div style={{ padding: "32px 36px", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      {/* Header Pro */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "16px", paddingBottom: "20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", letterSpacing: "-0.02em" }}>
            Contacts & Répertoire
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            {contacts.length} contact{contacts.length > 1 ? "s" : ""} enregistré{contacts.length > 1 ? "s" : ""} • Synchronisé avec vos rendez-vous et vos rappels vocaux
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary" id="contacts-new" style={{ gap: "6px", fontSize: "12px", padding: "8px 16px" }}>
          <Plus size={15} />
          <span>Ajouter un contact</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: "48px", borderRadius: "8px" }} />)}
        </div>
      ) : contacts.length === 0 ? (
        <div className="empty-state" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "40px" }}>
          <div className="empty-state-icon" style={{ background: "rgba(255, 255, 255, 0.04)" }}><Users size={24} /></div>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>Aucun contact enregistré</p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>Ajoutez vos premiers contacts pour enrichir vos rappels et votre agenda.</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm" style={{ marginTop: "12px" }}>
            <Plus size={14} />
            <span>Créer un contact</span>
          </button>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="data-th" style={{ width: "40px", textAlign: "center" }}>Avatar</th>
                <th className="data-th">Nom & Entreprise</th>
                <th className="data-th" style={{ width: "180px" }}>Téléphone</th>
                <th className="data-th" style={{ width: "220px" }}>Email</th>
                <th className="data-th">Adresse & Notes</th>
                <th className="data-th" style={{ width: "130px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => setEditingContact(contact)}
                  className="data-tr"
                  style={{ cursor: "pointer" }}
                  id={`contact-${contact.id}`}
                >
                  {/* Avatar */}
                  <td className="data-td" style={{ textAlign: "center", width: "40px" }}>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        background: "linear-gradient(135deg, #1e293b, #334155)",
                        border: "1px solid var(--border-subtle)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#ffffff",
                      }}
                    >
                      {contact.firstName[0]}{contact.lastName?.[0] ?? ""}
                    </div>
                  </td>

                  {/* Name & Company */}
                  <td className="data-td">
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc" }}>
                        {contact.firstName} {contact.lastName ?? ""}
                      </span>
                      {contact.company && (
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Building size={11} /> {contact.company}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="data-td">
                    {contact.phone ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)" }}>
                        <Phone size={12} color="var(--text-muted)" />
                        <span>{contact.phone}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>—</span>
                    )}
                  </td>

                  {/* Email */}
                  <td className="data-td">
                    {contact.email ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        <Mail size={12} color="var(--text-muted)" />
                        <span>{contact.email}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>—</span>
                    )}
                  </td>

                  {/* Address & Notes */}
                  <td className="data-td">
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {contact.address || contact.notes || "—"}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="data-td" style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <button
                        onClick={(e) => handleTestContactCall(contact, e)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: "4px 6px", color: "#38bdf8" }}
                        title="Tester le rappel vocal IA pour ce contact"
                      >
                        <PhoneCall size={13} />
                      </button>
                      <button
                        onClick={() => setEditingContact(contact)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: "4px 6px", color: "var(--text-muted)" }}
                        title="Modifier le contact"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={(e) => deleteContact(contact.id, e)}
                        disabled={deletingId === contact.id}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: "4px 6px", color: "var(--text-muted)" }}
                        title="Supprimer le contact"
                      >
                        {deletingId === contact.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New contact modal */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal animate-scale-in" style={{ maxWidth: "520px" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#f8fafc" }}>Nouveau contact</h2>
              <button onClick={() => setShowForm(false)} className="btn btn-ghost" style={{ padding: "4px" }}><X size={18} /></button>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Prénom *</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} className="form-input" id="contact-firstname" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} className="form-input" id="contact-lastname" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Téléphone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="form-input" id="contact-phone" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="form-input" id="contact-email" />
              </div>
              <div className="form-group">
                <label className="form-label">Entreprise</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))} className="form-input" id="contact-company" />
              </div>
              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))} className="form-input" id="contact-address" />
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea value={formData.notes} onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))} className="form-input" rows={2} id="contact-notes" style={{ resize: "vertical" }} />
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowForm(false)} className="btn btn-secondary">Annuler</button>
              <button onClick={saveContact} disabled={saving || !formData.firstName.trim()} className="btn btn-primary" id="contact-save">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Enregistrement..." : "Ajouter le contact"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit contact modal */}
      {editingContact && (
        <ContactEditModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onSaved={() => { setEditingContact(null); load(); }}
          onDeleted={() => { setEditingContact(null); load(); }}
        />
      )}
    </div>
  );
}
