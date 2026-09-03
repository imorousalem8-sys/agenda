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
    <div style={{ padding: "32px", maxWidth: "860px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="page-title">Tâches & Rappels</h1>
          <p className="page-subtitle">
            {pendingTasks.length} tâche{pendingTasks.length > 1 ? "s" : ""} en attente • Cliquez sur une tâche pour la modifier
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleTestAICall()}
            className="btn btn-secondary"
            id="tasks-test-call"
            style={{ gap: "6px" }}
          >
            <PhoneCall size={15} color="var(--accent-primary)" />
            Tester l&apos;appel vocal IA
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            id="tasks-new"
          >
            <Plus size={16} />
            Nouvelle tâche
          </button>
        </div>
      </div>

      {/* Info banner on voice reminder */}
      <div
        style={{
          background: "rgba(99, 102, 241, 0.08)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          borderRadius: "14px",
          padding: "12px 16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Phone size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
            Rappels vocaux automatiques
          </p>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Toute tâche avec une échéance déclenche automatiquement un appel vocal de l&apos;IA pour vous rappeler son exécution.
          </p>
        </div>
      </div>

      {/* Show done toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <label className="toggle">
          <input
            type="checkbox"
            checked={showDone}
            onChange={(e) => setShowDone(e.target.checked)}
            id="show-done-tasks"
          />
          <span className="toggle-slider" />
        </label>
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Afficher les tâches terminées
        </span>
      </div>

      {/* Task list */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: "70px" }} />)}
        </div>
      ) : pendingTasks.length === 0 && !showDone ? (
        <div className="empty-state">
          <div className="empty-state-icon"><CheckSquare size={28} /></div>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", fontWeight: "500" }}>
            Aucune tâche en attente
          </p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary" id="tasks-add-first">
            <Plus size={15} />
            Ajouter une tâche
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Pending */}
          {pendingTasks.map((task) => (
            <TaskRow
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

          {/* Done */}
          {showDone && doneTasks.length > 0 && (
            <>
              <div className="divider" style={{ margin: "8px 0" }} />
              <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", padding: "0 4px" }}>
                Terminées ({doneTasks.length})
              </p>
              {doneTasks.map((task) => (
                <TaskRow
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
            </>
          )}
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

function TaskRow({
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
    <div
      onClick={onClick}
      className="card task-hover-card"
      style={{
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        opacity: done ? 0.6 : 1,
        transition: "all 0.2s",
        cursor: "pointer",
        position: "relative",
      }}
      id={`task-row-${task.id}`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "6px",
          border: `2px solid ${done ? "#10b981" : "var(--border-default)"}`,
          background: done ? "#10b981" : "transparent",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          marginTop: "2px",
        }}
        id={`task-cb-${task.id}`}
        title={done ? "Marquer non terminé" : "Marquer terminé"}
      >
        {done && <span style={{ color: "white", fontSize: "11px", fontWeight: "700" }}>✓</span>}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--text-primary)",
              textDecoration: done ? "line-through" : "none",
            }}
          >
            {task.title}
          </p>
          {task.mode === "PROFESSIONAL" && (
            <Briefcase size={12} color="var(--text-muted)" />
          )}
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: priorityColors[task.priority] ?? "#6366f1",
              flexShrink: 0,
            }}
            title={getPriorityLabel(task.priority)}
          />
        </div>

        {task.notes && (
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "6px", lineHeight: "1.4" }}>
            {task.notes}
          </p>
        )}

        {task.dueAt && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
            <Clock size={12} color="var(--accent-primary)" />
            <span style={{ fontSize: "12px", color: "var(--accent-primary)", fontWeight: "500" }}>
              {formatDate(task.dueAt)}
            </span>
          </div>
        )}

        {/* Shopping list items */}
        {items && items.length > 0 && (
          <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {items.map((item: { label: string; qty?: string; done: boolean }, idx: number) => (
              <span
                key={idx}
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  background: "var(--bg-elevated)",
                  borderRadius: "20px",
                  color: "var(--text-secondary)",
                  textDecoration: item.done ? "line-through" : "none",
                }}
              >
                {item.qty ? `${item.qty}× ` : ""}{item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
        <button
          onClick={onTestCall}
          className="btn btn-ghost btn-sm"
          style={{ padding: "6px", color: "var(--accent-primary)" }}
          title="Tester l'appel vocal IA pour cette tâche"
          id={`call-task-${task.id}`}
        >
          <PhoneCall size={14} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="btn btn-ghost btn-sm"
          style={{ padding: "6px", color: "var(--text-muted)" }}
          title="Modifier"
          id={`edit-task-${task.id}`}
        >
          <Edit2 size={13} />
        </button>

        <button
          onClick={onDelete}
          disabled={deleting}
          className="btn btn-ghost btn-sm"
          style={{ padding: "6px", color: "var(--text-muted)" }}
          title="Supprimer"
          id={`delete-task-${task.id}`}
        >
          {deleting ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={13} />}
        </button>
      </div>

      <style>{`
        .task-hover-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
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
