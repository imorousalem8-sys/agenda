"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckSquare, Plus, Trash2, Clock, AlertCircle, Briefcase, User, X, Loader2, Edit2, PhoneCall, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskInput } from "@/lib/validations";
import { formatDate, getPriorityLabel } from "@/lib/utils";
import TaskEditModal from "@/components/forms/TaskEditModal";

interface Task {
  id: string;
  title: string;
  notes: string | null;
  dueAt: string | null;
  priority: string;
  mode: string;
  isDone: boolean;
  items: string | null;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [pendingRes, doneRes] = await Promise.all([
        fetch("/api/tasks?done=false"),
        showDone ? fetch("/api/tasks?done=true") : Promise.resolve(null),
      ]);
      const pending = await pendingRes.json();
      const done = doneRes ? await doneRes.json() : { tasks: [] };
      setTasks([...(pending.tasks ?? []), ...(done.tasks ?? [])]);
    } catch { /* ok */ }
    setLoading(false);
  }, [showDone]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const handleTaskUpdated = () => { load(); };
    window.addEventListener("task-updated", handleTaskUpdated);
    return () => window.removeEventListener("task-updated", handleTaskUpdated);
  }, [load]);

  const toggleTask = async (id: string, isDone: boolean, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !isDone }),
    });
    load();
  };

  const deleteTask = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Supprimer cette tâche ?")) return;
    setDeleting(id);
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    load();
    setDeleting(null);
  };

  const handleTestAICall = (task?: Task, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("test-ai-call", {
        detail: {
          id: task ? `test-${task.id}` : "test-global-task",
          title: task ? task.title : "Vérification des tâches en attente",
          body: task?.notes || "Ceci est un test de votre rappel vocal IA interactif.",
          fireAt: new Date().toISOString(),
          method: "VOICE",
          taskId: task?.id,
        },
      })
    );
  };

  const pendingTasks = tasks.filter((t) => !t.isDone);
  const doneTasks = tasks.filter((t) => t.isDone);

  const priorityColors: Record<string, string> = {
    URGENT: "#ef4444",
    HIGH: "#f59e0b",
    NORMAL: "#6366f1",
    LOW: "#5a6a8a",
  };

  return (
    <div style={{ padding: "32px 36px", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      {/* Header Pro */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "16px", paddingBottom: "20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", letterSpacing: "-0.02em" }}>
            Gestionnaire de Tâches & Priorités
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            {pendingTasks.length} tâche{pendingTasks.length > 1 ? "s" : ""} active{pendingTasks.length > 1 ? "s" : ""} • Cliquez sur une ligne pour inspecter ou modifier
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleTestAICall()}
            className="btn btn-secondary"
            id="tasks-test-call"
            style={{ gap: "6px", fontSize: "12px", padding: "8px 14px" }}
          >
            <PhoneCall size={14} color="#38bdf8" />
            <span>Tester l&apos;appel vocal IA</span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            id="tasks-new"
            style={{ gap: "6px", fontSize: "12px", padding: "8px 16px" }}
          >
            <Plus size={15} />
            <span>Nouvelle tâche</span>
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
        <Phone size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
            Rappels vocaux automatiques :{" "}
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Chaque tâche programmée avec une échéance déclenche un appel vocal de l&apos;IA pour vous assister.
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label className="toggle">
            <input
              type="checkbox"
              checked={showDone}
              onChange={(e) => setShowDone(e.target.checked)}
              id="show-done-tasks"
            />
            <span className="toggle-slider" />
          </label>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "500" }}>
            Afficher l&apos;historique des tâches terminées
          </span>
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Total : <strong style={{ color: "#f8fafc" }}>{tasks.length}</strong> éléments
        </div>
      </div>

      {/* Structured Table */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: "48px", borderRadius: "8px" }} />)}
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "40px" }}>
          <div className="empty-state-icon" style={{ background: "rgba(255, 255, 255, 0.04)" }}><CheckSquare size={24} /></div>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
            Aucune tâche enregistrée
          </p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm" id="tasks-add-first" style={{ marginTop: "12px" }}>
            <Plus size={14} />
            <span>Créer ma première tâche</span>
          </button>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="data-th" style={{ width: "40px", textAlign: "center" }}>✓</th>
                <th className="data-th">Titre & Détails</th>
                <th className="data-th" style={{ width: "130px" }}>Type</th>
                <th className="data-th" style={{ width: "110px" }}>Priorité</th>
                <th className="data-th" style={{ width: "180px" }}>Échéance</th>
                <th className="data-th" style={{ width: "120px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Pending Tasks */}
              {pendingTasks.map((task) => (
                <TaskTableRow
                  key={task.id}
                  task={task}
                  onClick={() => setEditingTask(task)}
                  onToggle={(e) => toggleTask(task.id, task.isDone, e)}
                  onDelete={(e) => deleteTask(task.id, e)}
                  onTestCall={(e) => handleTestAICall(task, e)}
                  deleting={deleting === task.id}
                  priorityColors={priorityColors}
                />
              ))}

              {/* Done Tasks */}
              {showDone && doneTasks.map((task) => (
                <TaskTableRow
                  key={task.id}
                  task={task}
                  onClick={() => setEditingTask(task)}
                  onToggle={(e) => toggleTask(task.id, task.isDone, e)}
                  onDelete={(e) => deleteTask(task.id, e)}
                  onTestCall={(e) => handleTestAICall(task, e)}
                  deleting={deleting === task.id}
                  priorityColors={priorityColors}
                  done
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New task modal */}
      {showForm && (
        <TaskFormModal
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}

      {/* Edit task modal */}
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSaved={() => { setEditingTask(null); load(); }}
          onDeleted={() => { setEditingTask(null); load(); }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          div[style*="padding: 32px"] { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}

function TaskTableRow({
  task,
  onClick,
  onToggle,
  onDelete,
  onTestCall,
  deleting,
  priorityColors,
  done = false,
}: {
  task: Task;
  onClick: () => void;
  onToggle: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onTestCall: (e: React.MouseEvent) => void;
  deleting: boolean;
  priorityColors: Record<string, string>;
  done?: boolean;
}) {
  const items = task.items ? JSON.parse(task.items) : null;

  return (
    <tr
      onClick={onClick}
      className="data-tr"
      style={{
        opacity: done ? 0.5 : 1,
        cursor: "pointer",
        transition: "background 0.15s ease",
      }}
      id={`task-row-${task.id}`}
    >
      {/* 1. Checkbox */}
      <td className="data-td" style={{ textAlign: "center", width: "40px" }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onToggle}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "4px",
            border: `1.5px solid ${done ? "#10b981" : "var(--border-strong)"}`,
            background: done ? "#10b981" : "transparent",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          id={`task-cb-${task.id}`}
          title={done ? "Marquer non terminé" : "Marquer terminé"}
        >
          {done && <span style={{ color: "white", fontSize: "10px", fontWeight: "700" }}>✓</span>}
        </button>
      </td>

      {/* 2. Titre & Détails */}
      <td className="data-td">
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: done ? "var(--text-muted)" : "#f8fafc",
                textDecoration: done ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
          </div>

          {task.notes && (
            <div style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.4", maxWidth: "450px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {task.notes}
            </div>
          )}

          {items && items.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "3px" }}>
              {items.map((item: { label: string; qty?: string; done: boolean }, idx: number) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "10px",
                    padding: "1px 6px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "4px",
                    color: "var(--text-muted)",
                    textDecoration: item.done ? "line-through" : "none",
                  }}
                >
                  {item.qty ? `${item.qty}× ` : ""}{item.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </td>

      {/* 3. Mode / Type */}
      <td className="data-td">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            fontWeight: "500",
            padding: "2px 8px",
            borderRadius: "4px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          {task.mode === "PROFESSIONAL" ? (
            <>
              <Briefcase size={11} color="var(--text-muted)" />
              <span>Pro</span>
            </>
          ) : (
            <>
              <User size={11} color="var(--text-muted)" />
              <span>Perso</span>
            </>
          )}
        </span>
      </td>

      {/* 4. Priorité */}
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
              task.priority === "URGENT"
                ? "rgba(244, 63, 94, 0.12)"
                : task.priority === "HIGH"
                ? "rgba(245, 158, 11, 0.12)"
                : "rgba(255, 255, 255, 0.03)",
            border:
              task.priority === "URGENT"
                ? "1px solid rgba(244, 63, 94, 0.3)"
                : task.priority === "HIGH"
                ? "1px solid rgba(245, 158, 11, 0.3)"
                : "1px solid var(--border-subtle)",
            color:
              task.priority === "URGENT"
                ? "#fb7185"
                : task.priority === "HIGH"
                ? "#fbbf24"
                : "var(--text-secondary)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: priorityColors[task.priority] ?? "#94a3b8",
            }}
          />
          <span>{getPriorityLabel(task.priority)}</span>
        </span>
      </td>

      {/* 5. Échéance */}
      <td className="data-td">
        {task.dueAt ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#38bdf8", fontWeight: "500" }}>
            <Clock size={12} />
            <span>{formatDate(task.dueAt)}</span>
          </div>
        ) : (
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>—</span>
        )}
      </td>

      {/* 6. Actions */}
      <td className="data-td" style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
          <button
            onClick={onTestCall}
            className="btn btn-ghost btn-sm"
            style={{ padding: "4px 6px", color: "#38bdf8" }}
            title="Tester l'appel vocal IA pour cette tâche"
            id={`call-task-${task.id}`}
          >
            <PhoneCall size={13} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="btn btn-ghost btn-sm"
            style={{ padding: "4px 6px", color: "var(--text-muted)" }}
            title="Modifier"
            id={`edit-task-${task.id}`}
          >
            <Edit2 size={13} />
          </button>

          <button
            onClick={onDelete}
            disabled={deleting}
            className="btn btn-ghost btn-sm"
            style={{ padding: "4px 6px", color: "var(--text-muted)" }}
            title="Supprimer"
            id={`delete-task-${task.id}`}
          >
            {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
          </button>
        </div>
      </td>
    </tr>
  );
}

function TaskFormModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<{ label: string; qty: string; done: boolean }[]>([]);
  const [newItem, setNewItem] = useState("");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: { mode: "PERSONAL", priority: "NORMAL" },
  });

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, { label: newItem.trim(), qty: "", done: false }]);
    setNewItem("");
  };

  const onSubmit = async (data: TaskInput) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items: items.length > 0 ? items : undefined }),
      });
      const resData = await res.json().catch(() => ({}));
      if (res.ok) {
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
        onSaved();
      } else {
        setError(resData.error || "Erreur lors de la création de la tâche.");
      }
    } catch {
      setError("Erreur de communication réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale-in" style={{ maxWidth: "560px" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>Nouvelle tâche</h2>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="task-form-close">
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
            {/* Mode */}
            <div>
              <label className="form-label">Type</label>
              <div className="mode-toggle">
                {(["PERSONAL", "PROFESSIONAL"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setValue("mode", m)}
                    className={`mode-toggle-btn ${watch("mode") === m ? "active" : ""}`}
                    id={`task-mode-${m.toLowerCase()}`}
                  >
                    {m === "PERSONAL" ? <><User size={11} style={{ display: "inline", marginRight: "4px" }} />Personnel</> : <><Briefcase size={11} style={{ display: "inline", marginRight: "4px" }} />Professionnel</>}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Titre *</label>
              <input
                {...register("title")}
                type="text"
                placeholder="Ex: Acheter les fournitures, Réviser les cours..."
                className="form-input"
                id="task-title"
              />
              {errors.title && <span className="form-error">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Notes & Instructions IA</label>
              <textarea
                {...register("notes")}
                className="form-input"
                rows={2}
                placeholder="Détails énoncés par l'IA lors du rappel vocal..."
                id="task-notes"
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Échéance (Heure de rappel)</label>
                <input
                  {...register("dueAt")}
                  type="datetime-local"
                  className="form-input"
                  id="task-due"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Priorité</label>
                <select {...register("priority")} className="form-input" id="task-priority">
                  <option value="LOW" style={{ background: "var(--bg-elevated)" }}>Faible</option>
                  <option value="NORMAL" style={{ background: "var(--bg-elevated)" }}>Normale</option>
                  <option value="HIGH" style={{ background: "var(--bg-elevated)" }}>Haute</option>
                  <option value="URGENT" style={{ background: "var(--bg-elevated)" }}>Urgent</option>
                </select>
              </div>
            </div>

            {/* Shopping list */}
            <div>
              <label className="form-label">Sous-éléments / Checklist</label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem())}
                  placeholder="Ajouter un sous-élément..."
                  className="form-input"
                  id="task-item-input"
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
                        gap: "5px",
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
                        onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
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

          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" id="task-cancel">Annuler</button>
            <button type="submit" disabled={loading} className="btn btn-primary" id="task-save">
              {loading && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
              {loading ? "Enregistrement..." : "Créer la tâche"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
