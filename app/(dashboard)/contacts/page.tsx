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
    <div style={{ padding: "32px", maxWidth: "960px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="page-title">Contacts</h1>
          <p className="page-subtitle">
            {contacts.length} contact{contacts.length > 1 ? "s" : ""} enregistré{contacts.length > 1 ? "s" : ""} • Cliquez pour modifier ou appeler
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary" id="contacts-new">
          <Plus size={16} />
          Ajouter un contact
        </button>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: "120px" }} />)}
        </div>
      ) : contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Users size={28} /></div>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontWeight: "500" }}>Aucun contact</p>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Ajoutez des contacts pour les lier à vos rendez-vous et vos rappels</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setEditingContact(contact)}
              className="card contact-hover-card"
              style={{
                textAlign: "left",
                cursor: "pointer",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s",
                position: "relative",
              }}
              id={`contact-${contact.id}`}
            >
              <div>
                {/* Avatar & Name */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {contact.firstName[0]}{contact.lastName?.[0] ?? ""}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                        {contact.firstName} {contact.lastName ?? ""}
                      </p>
                      {contact.company && (
                        <p style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Building size={11} /> {contact.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      onClick={(e) => handleTestContactCall(contact, e)}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: "6px", color: "var(--accent-primary)" }}
                      title="Tester le rappel vocal IA pour ce contact"
                    >
                      <PhoneCall size={14} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingContact(contact); }}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: "6px", color: "var(--text-muted)" }}
                      title="Modifier le contact"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={(e) => deleteContact(contact.id, e)}
                      disabled={deletingId === contact.id}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: "6px", color: "var(--text-muted)" }}
                      title="Supprimer le contact"
                    >
                      {deletingId === contact.id ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={13} />}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {contact.phone && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Phone size={12} color="var(--text-muted)" />
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{contact.phone}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Mail size={12} color="var(--text-muted)" />
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{contact.email}</span>
                    </div>
                  )}
                  {contact.address && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <MapPin size={12} color="var(--text-muted)" />
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{contact.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {contact.notes && (
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px", borderTop: "1px solid var(--border-subtle)", paddingTop: "8px" }}>
                  {contact.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New contact modal */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal animate-scale-in" style={{ maxWidth: "520px" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>Nouveau contact</h2>
              <button onClick={() => setShowForm(false)} className="btn btn-ghost" style={{ padding: "6px" }}><X size={18} /></button>
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
                {saving && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
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

      <style>{`
        .contact-hover-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-2px);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { div[style*="padding: 32px"] { padding: 16px !important; } }
      `}</style>
    </div>
  );
}
