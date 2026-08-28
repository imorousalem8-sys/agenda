"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, Plus, Clock, Trash2, CheckCircle, RotateCcw, Filter, PhoneCall, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import QuickReminderModal from "@/components/forms/QuickReminderModal";

interface Reminder {
  id: string;
  title: string;
  body: string | null;
  fireAt: string;
  status: string;
  method: string;
  isVeille: boolean;
  event?: { title: string; startAt: string } | null;
  task?: { title: string } | null;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  FIRED: "Déclenché",
  DISMISSED: "Terminé",
  SNOOZED: "Reporté",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#f59e0b",
  FIRED: "#ef4444",
  DISMISSED: "#5a6a8a",
  SNOOZED: "#6366f1",
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "FIRED" | "DISMISSED">("ALL");
  const [dismissing, setDismissing] = useState<string | null>(null);
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reminders?status=${filter}`);
      const data = await res.json();
      setReminders(data.reminders ?? []);
    } catch {
      // ok
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const dismiss = async (id: string) => {
    setDismissing(id);
    await fetch(`/api/reminders/${id}/dismiss`, { method: "PUT" });
    load();
    setDismissing(null);
  };

  const snooze = async (id: string) => {
    setDismissing(id);
    await fetch(`/api/reminders/${id}/snooze`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minutes: 10 }),
    });
    load();
    setDismissing(null);
  };

  const deleteReminder = async (id: string) => {
    if (!confirm("Supprimer ce rappel ?")) return;
    setDeletingId(id);
    await fetch(`/api/reminders/${id}`, { method: "DELETE" });
    setDeletingId(null);
    load();
  };

  const handleTestCall = (rem?: Reminder) => {
    window.dispatchEvent(
      new CustomEvent("test-ai-call", {
        detail: {
          id: rem ? `test-${rem.id}` : "test-reminder-call",
          title: rem ? rem.title : "Rappel test immédiat de l'assistant IA",
          body: rem?.body || "Ceci est une simulation complète d'un appel vocal de rappel par l'intelligence artificielle.",
          fireAt: new Date().toISOString(),
          method: "VOICE",
        },
      })
    );
  };

  const methodIcon = (method: string) => {
    if (method === "VOICE") return "📞";
    if (method === "ALARM") return "🔔";
    if (method === "EMAIL") return "📧";
    return "📲";
  };

  return (
    <div style={{ padding: "32px", maxWidth: "960px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="page-title">Rappels & Alarmes</h1>
          <p className="page-subtitle">Gérez et programmez tous vos rappels intelligents et appels vocaux IA</p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleTestCall()}
            className="btn btn-secondary"
            id="reminders-test-call"
            style={{ gap: "6px" }}
          >
            <PhoneCall size={15} color="var(--accent-primary)" />
            Tester l&apos;appel vocal IA
          </button>
          <button
            onClick={() => setShowQuickModal(true)}
            className="btn btn-primary"
            id="reminders-new"
          >
            <Plus size={16} />
            Nouveau rappel direct
          </button>
        </div>
      </div>

      {/* Platform info banner */}
      <div
        style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <PhoneCall size={18} color="var(--accent-primary)" style={{ marginTop: "2px", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>
            Comment fonctionne le rappel vocal IA
          </p>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
            📞 <strong>Appel vocal IA interactif :</strong> Dès l&apos;échéance, votre téléphone/navigateur sonne comme un vrai smartphone. En décrochant, l&apos;IA vous énonce vocalement en français le titre et les consignes du rappel, et attend votre confirmation.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        <Filter size={14} color="var(--text-muted)" style={{ alignSelf: "center" }} />
        {(["ALL", "PENDING", "FIRED", "DISMISSED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-secondary"}`}
            id={`filter-${s.toLowerCase()}`}
          >
            {s === "ALL" ? "Tous" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: "80px" }} />)}
        </div>
      ) : reminders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Bell size={28} />
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontWeight: "500" }}>
            Aucun rappel{filter !== "ALL" ? ` avec le statut "${STATUS_LABELS[filter]}"` : ""}
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "12px" }}>
            Créez un rappel direct ou une tâche pour recevoir un appel vocal IA
          </p>
          <button onClick={() => setShowQuickModal(true)} className="btn btn-primary">
            <Plus size={15} />
            Programmer un rappel
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="card reminder-hover-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 18px",
                borderLeft: `4px solid ${STATUS_COLORS[reminder.status] ?? "#5a6a8a"}`,
                transition: "all 0.2s",
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: "24px", flexShrink: 0 }}>
                {methodIcon(reminder.method)}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                    {reminder.title}
                  </p>
                  {reminder.isVeille && (
                    <span className="badge" style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent-primary)", border: "1px solid rgba(99,102,241,0.3)", fontSize: "10px" }}>
                      Veille
                    </span>
                  )}
                  <span
                    className="badge"
                    style={{
                      background: `${STATUS_COLORS[reminder.status]}22`,
                      color: STATUS_COLORS[reminder.status],
                      border: `1px solid ${STATUS_COLORS[reminder.status]}44`,
                      fontSize: "10px",
                    }}
                  >
                    {STATUS_LABELS[reminder.status]}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={12} color="var(--text-muted)" />
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
                    {formatDate(reminder.fireAt)}
                  </span>
                </div>

                {reminder.body && (
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px" }}>
                    {reminder.body}
                  </p>
                )}

                {reminder.task && (
                  <p style={{ fontSize: "11px", color: "var(--accent-primary)", marginTop: "2px" }}>
                    Lié à la tâche : {reminder.task.title}
                  </p>
                )}
                {reminder.event && (
                  <p style={{ fontSize: "11px", color: "var(--accent-primary)", marginTop: "2px" }}>
                    Lié au rendez-vous : {reminder.event.title}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button
                  onClick={() => handleTestCall(reminder)}
                  className="btn btn-ghost btn-sm"
                  title="Tester l'appel IA pour ce rappel"
                  style={{ color: "var(--accent-primary)" }}
                  id={`test-call-${reminder.id}`}
                >
                  <PhoneCall size={14} />
                </button>

                {reminder.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => snooze(reminder.id)}
                      disabled={dismissing === reminder.id}
                      className="btn btn-secondary btn-sm"
                      title="Reporter 10 min"
                      id={`snooze-${reminder.id}`}
                    >
                      <RotateCcw size={13} />
                    </button>
                    <button
                      onClick={() => dismiss(reminder.id)}
                      disabled={dismissing === reminder.id}
                      className="btn btn-ghost btn-sm"
                      title="Marquer comme terminé"
                      id={`dismiss-${reminder.id}`}
                    >
                      <CheckCircle size={13} />
                    </button>
                  </>
                )}

                <button
                  onClick={() => deleteReminder(reminder.id)}
                  disabled={deletingId === reminder.id}
                  className="btn btn-ghost btn-sm"
                  title="Supprimer ce rappel"
                  style={{ color: "var(--text-muted)" }}
                  id={`delete-reminder-${reminder.id}`}
                >
                  {deletingId === reminder.id ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Reminder Modal */}
      {showQuickModal && (
        <QuickReminderModal
          onClose={() => setShowQuickModal(false)}
          onSaved={() => { setShowQuickModal(false); load(); }}
        />
      )}

      <style>{`
        .reminder-hover-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="padding: 32px"] { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}
