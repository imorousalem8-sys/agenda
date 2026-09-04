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
    <div style={{ padding: "32px 36px", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      {/* Header Pro */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "16px", paddingBottom: "20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", letterSpacing: "-0.02em" }}>
            Rappels & Alarmes Vocales
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Programmation et supervision de vos alertes directes et appels vocaux IA
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleTestCall()}
            className="btn btn-secondary"
            id="reminders-test-call"
            style={{ gap: "6px", fontSize: "12px", padding: "8px 14px" }}
          >
            <PhoneCall size={14} color="#38bdf8" />
            <span>Tester l&apos;appel vocal IA</span>
          </button>
          <button
            onClick={() => setShowQuickModal(true)}
            className="btn btn-primary"
            id="reminders-new"
            style={{ gap: "6px", fontSize: "12px", padding: "8px 16px" }}
          >
            <Plus size={15} />
            <span>Nouveau rappel</span>
          </button>
        </div>
      </div>

      {/* Info banner - Sobre & Epuré */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "10px",
          padding: "12px 16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <PhoneCall size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
            Appel vocal IA interactif :{" "}
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            À l&apos;heure programmée, l&apos;IA émet une alarme ou un appel vocal interactif pour vous communiquer les détails du rappel.
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <Filter size={13} color="var(--text-muted)" />
          {(["ALL", "PENDING", "FIRED", "DISMISSED"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "11px", padding: "4px 10px" }}
              id={`filter-${s.toLowerCase()}`}
            >
              {s === "ALL" ? "Tous les statuts" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Total : <strong style={{ color: "#f8fafc" }}>{reminders.length}</strong> rappels
        </div>
      </div>

      {/* Structured Table */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: "48px", borderRadius: "8px" }} />)}
        </div>
      ) : reminders.length === 0 ? (
        <div className="empty-state" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "40px" }}>
          <div className="empty-state-icon" style={{ background: "rgba(255, 255, 255, 0.04)" }}>
            <Bell size={24} />
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
            Aucun rappel{filter !== "ALL" ? ` avec le statut "${STATUS_LABELS[filter]}"` : ""}
          </p>
          <button onClick={() => setShowQuickModal(true)} className="btn btn-primary btn-sm" style={{ marginTop: "12px" }}>
            <Plus size={14} />
            <span>Créer un premier rappel</span>
          </button>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="data-th" style={{ width: "40px", textAlign: "center" }}>Type</th>
                <th className="data-th">Titre & Consignes</th>
                <th className="data-th" style={{ width: "120px" }}>Statut</th>
                <th className="data-th" style={{ width: "180px" }}>Déclenchement</th>
                <th className="data-th" style={{ width: "150px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder.id} className="data-tr">
                  {/* Icon */}
                  <td className="data-td" style={{ textAlign: "center", fontSize: "16px" }}>
                    {methodIcon(reminder.method)}
                  </td>

                  {/* Title & Body */}
                  <td className="data-td">
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc" }}>
                          {reminder.title}
                        </span>
                        {reminder.isVeille && (
                          <span style={{ fontSize: "10px", fontWeight: "600", padding: "1px 6px", borderRadius: "4px", background: "rgba(56, 189, 248, 0.12)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                            Veille
                          </span>
                        )}
                      </div>

                      {reminder.body && (
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                          {reminder.body}
                        </div>
                      )}

                      {(reminder.task || reminder.event) && (
                        <div style={{ fontSize: "11px", color: "#38bdf8", marginTop: "2px" }}>
                          {reminder.task ? `Lié à : ${reminder.task.title}` : `RDV : ${reminder.event?.title}`}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="data-td">
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background:
                          reminder.status === "PENDING"
                            ? "rgba(245, 158, 11, 0.12)"
                            : reminder.status === "FIRED"
                            ? "rgba(244, 63, 94, 0.12)"
                            : "rgba(255, 255, 255, 0.03)",
                        border:
                          reminder.status === "PENDING"
                            ? "1px solid rgba(245, 158, 11, 0.3)"
                            : reminder.status === "FIRED"
                            ? "1px solid rgba(244, 63, 94, 0.3)"
                            : "1px solid var(--border-subtle)",
                        color:
                          reminder.status === "PENDING"
                            ? "#fbbf24"
                            : reminder.status === "FIRED"
                            ? "#fb7185"
                            : "var(--text-muted)",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: STATUS_COLORS[reminder.status] ?? "#94a3b8",
                        }}
                      />
                      <span>{STATUS_LABELS[reminder.status] || reminder.status}</span>
                    </span>
                  </td>

                  {/* Fire Date */}
                  <td className="data-td">
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#38bdf8", fontWeight: "500" }}>
                      <Clock size={12} />
                      <span>{formatDate(reminder.fireAt)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="data-td" style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <button
                        onClick={() => handleTestCall(reminder)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: "4px 6px", color: "#38bdf8" }}
                        title="Tester l'appel IA pour ce rappel"
                        id={`test-call-${reminder.id}`}
                      >
                        <PhoneCall size={13} />
                      </button>

                      {reminder.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => snooze(reminder.id)}
                            disabled={dismissing === reminder.id}
                            className="btn btn-ghost btn-sm"
                            style={{ padding: "4px 6px", color: "var(--text-muted)" }}
                            title="Reporter 10 min"
                            id={`snooze-${reminder.id}`}
                          >
                            <RotateCcw size={13} />
                          </button>
                          <button
                            onClick={() => dismiss(reminder.id)}
                            disabled={dismissing === reminder.id}
                            className="btn btn-ghost btn-sm"
                            style={{ padding: "4px 6px", color: "#10b981" }}
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
                        style={{ padding: "4px 6px", color: "var(--text-muted)" }}
                        title="Supprimer ce rappel"
                        id={`delete-reminder-${reminder.id}`}
                      >
                        {deletingId === reminder.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
