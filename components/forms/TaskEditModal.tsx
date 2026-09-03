"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskInput } from "@/lib/validations";
import { X, Plus, Trash2, Clock, AlertCircle, Briefcase, User, Loader2, PhoneCall } from "lucide-react";

export interface TaskToEdit {
  id: string;
  title: string;
  notes: string | null;
  dueAt: string | null;
  priority: string;
  mode: string;
  items: string | null;
  isDone?: boolean;
}

interface TaskEditModalProps {
  task: TaskToEdit;
  onClose: () => void;
  onSaved: () => void;
  onDeleted?: () => void;
}

export default function TaskEditModal({ task, onClose, onSaved, onDeleted }: TaskEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [items, setItems] = useState<{ label: string; qty?: string; done: boolean }[]>(() => {
    if (!task.items) return [];
    try {
      return JSON.parse(task.items);
    } catch {
      return [];
    }
  });
  const [newItem, setNewItem] = useState("");

  const defaultDue = task.dueAt
    ? new Date(task.dueAt).toISOString().slice(0, 16)
    : "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      notes: task.notes || "",
      dueAt: defaultDue,
      priority: (task.priority as TaskInput["priority"]) || "NORMAL",
      mode: (task.mode as TaskInput["mode"]) || "PERSONAL",
    },
  });

  const [error, setError] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, { label: newItem.trim(), qty: "", done: false }]);
    setNewItem("");
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TaskInput) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.length > 0 ? items : undefined,
        }),
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok) {
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
        onSaved();
      } else {
        setError(resData.error || "Erreur lors de la mise à jour");
      }
    } catch {
      setError("Erreur de communication réseau");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Voulez-vous vraiment supprimer cette tâche ?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      if (res.ok) {
        if (onDeleted) onDeleted();
        else onSaved();
      }
    } catch (e) {
      console.error(e);
    }
    setDeleting(false);
  };

  const handleTestCallNow = () => {
    window.dispatchEvent(
      new CustomEvent("test-ai-call", {
        detail: {
          id: `test-${task.id}`,
          title: watch("title") || task.title,
          body: watch("notes") || task.notes || "Test du rappel vocal IA",
          fireAt: new Date().toISOString(),
          method: "VOICE",
          taskId: task.id,
        },
      })
    );
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale-in" style={{ maxWidth: "560px" }}>
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
              Modifier la tâche
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
              Mettez à jour les détails, l&apos;heure et les rappels
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="task-edit-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", maxHeight: "70vh", overflowY: "auto" }}>
            {error && (
              <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#fca5a5", fontSize: "13px", fontWeight: 600 }}>
                {error}
              </div>
            )}
            {/* Mode toggle */}
            <div>
              <label className="form-label">Type</label>
              <div className="mode-toggle">
                {(["PERSONAL", "PROFESSIONAL"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setValue("mode", m)}
                    className={`mode-toggle-btn ${watch("mode") === m ? "active" : ""}`}
                    id={`task-edit-mode-${m.toLowerCase()}`}
                  >
                    {m === "PERSONAL" ? (
                      <>
                        <User size={12} style={{ display: "inline", marginRight: "4px" }} />
                        Personnel
                      </>
                    ) : (
                      <>
                        <Briefcase size={12} style={{ display: "inline", marginRight: "4px" }} />
                        Professionnel
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Titre *</label>
              <input
                {...register("title")}
                type="text"
                className="form-input"
                id="task-edit-title"
                placeholder="Titre de la tâche..."
              />
              {errors.title && <span className="form-error">{errors.title.message}</span>}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Notes & Instructions pour l&apos;IA</label>
              <textarea
                {...register("notes")}
                className="form-input"
                rows={3}
                placeholder="Détails que l'IA énoncera lors de l'appel..."
                id="task-edit-notes"
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Due date & Priority */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">
                  <Clock size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Échéance (Heure de rappel)
                </label>
                <input
                  {...register("dueAt")}
                  type="datetime-local"
                  className="form-input"
                  id="task-edit-due"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Priorité</label>
                <select {...register("priority")} className="form-input" id="task-edit-priority">
                  <option value="LOW" style={{ background: "var(--bg-elevated)" }}>Faible</option>
                  <option value="NORMAL" style={{ background: "var(--bg-elevated)" }}>Normale</option>
                  <option value="HIGH" style={{ background: "var(--bg-elevated)" }}>Haute</option>
                  <option value="URGENT" style={{ background: "var(--bg-elevated)" }}>Urgent</option>
                </select>
              </div>
            </div>

            {/* Test Call Box */}
            <div
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "12px",
                padding: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
                  🔔 Rappel Vocal IA
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  L&apos;IA vous appellera à la date d&apos;échéance choisie.
                </p>
              </div>
              <button
                type="button"
                onClick={handleTestCallNow}
                className="btn btn-secondary btn-sm"
                style={{ flexShrink: 0, gap: "6px" }}
                id="task-test-call-btn"
              >
                <PhoneCall size={14} color="var(--accent-primary)" />
                Tester l&apos;appel maintenant
              </button>
            </div>

            {/* Shopping list / Checklist */}
            <div>
              <label className="form-label">Liste / Checklist d&apos;éléments</label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem())}
                  placeholder="Ajouter un sous-élément..."
                  className="form-input"
                  id="task-edit-new-item"
                />
                <button type="button" onClick={addItem} className="btn btn-secondary btn-sm">
                  <Plus size={14} />
                </button>
              </div>

              {items.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        background: "var(--bg-elevated)",
                        borderRadius: "20px",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.label}
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 0 }}
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              id="task-edit-delete"
            >
              {deleting ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={14} />}
              Supprimer
            </button>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Annuler
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary" id="task-edit-save">
                {loading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
                {loading ? "Enregistrement..." : "Mettre à jour"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
