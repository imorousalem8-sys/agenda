"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  CheckSquare,
  Clock,
  Plus,
  ArrowRight,
  Briefcase,
  User,
  TrendingUp,
  Sparkles,
  Bot,
  Send,
  Loader2,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { formatDate, formatTime, formatDateShort, getCategoryColor, getCategoryLabel } from "@/lib/utils";
import { isToday, isTomorrow, parseISO } from "date-fns";
import EventFormModal from "@/components/forms/EventFormModal";
import DashboardClockHero from "@/components/dashboard/DashboardClockHero";

interface Event {
  id: string;
  title: string;
  startAt: string;
  category: string;
  mode: string;
  location?: string | null;
  reminders: { id: string; fireAt: string; status: string }[];
}

interface Reminder {
  id: string;
  title: string;
  fireAt: string;
  status: string;
  method: string;
}

interface Task {
  id: string;
  title: string;
  priority: string;
  isDone: boolean;
  dueAt?: string | null;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [greeting, setGreeting] = useState("Bonjour");

  // Quick AI Direct Input state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) setGreeting("Bonjour");
    else if (h >= 12 && h < 18) setGreeting("Bon après-midi");
    else setGreeting("Bonsoir");

    loadDashboard();

    const handleRefresh = () => {
      loadDashboard();
    };
    window.addEventListener("task-updated", handleRefresh);
    window.addEventListener("reminder-updated", handleRefresh);
    window.addEventListener("event-updated", handleRefresh);

    return () => {
      window.removeEventListener("task-updated", handleRefresh);
      window.removeEventListener("reminder-updated", handleRefresh);
      window.removeEventListener("event-updated", handleRefresh);
    };
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const [evRes, remRes, taskRes] = await Promise.all([
        fetch(`/api/events?from=${now.toISOString()}&to=${nextWeek.toISOString()}`),
        fetch("/api/reminders?status=PENDING&upcoming=true"),
        fetch("/api/tasks?done=false"),
      ]);

      const [evData, remData, taskData] = await Promise.all([
        evRes.json(),
        remRes.json(),
        taskRes.json(),
      ]);

      setEvents(evData.events ?? []);
      setReminders(remData.reminders ?? []);
      setTasks(taskData.tasks ?? []);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const handleQuickAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || aiLoading) return;

    setAiLoading(true);
    setAiFeedback(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiPrompt }),
      });
      const data = await res.json();
      setAiFeedback(data.reply || "Action exécutée avec succès !");
      setAiPrompt("");
      loadDashboard();
    } catch {
      setAiFeedback("Une erreur est survenue.");
    }
    setAiLoading(false);
  };

  const todayEvents = events.filter((e) => isToday(parseISO(e.startAt)));
  const tomorrowEvents = events.filter((e) => isTomorrow(parseISO(e.startAt)));
  const nextEvents = events.filter(
    (e) => !isToday(parseISO(e.startAt)) && !isTomorrow(parseISO(e.startAt))
  );

  const now = new Date();
  const nextReminder = reminders.find((r) => new Date(r.fireAt) > now);

  return (
    <div className="dashboard-container">
      {/* 3D Cyber Clock Hero with Volume & Depth */}
      <DashboardClockHero
        greeting={greeting}
        onOpenAI={() => window.dispatchEvent(new Event("open-ai-assistant"))}
        onNewEvent={() => setShowEventForm(true)}
        nextReminderTitle={nextReminder?.title}
        nextReminderTime={nextReminder ? formatTime(nextReminder.fireAt) : undefined}
      />

      {/* AI Quick Command Bar */}
      <div className="glass-card animate-slide-up dashboard-ai-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
          <Bot size={18} color="#38bdf8" />
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Copilote Vocal Express
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            • Dictez ou écrivez n&apos;importe quelle consigne en français
          </span>
        </div>

        <form onSubmit={handleQuickAISubmit} className="dashboard-ai-form">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ex: Mets-moi un rappel demain à 14h avec Marc pour signer les devis..."
            className="form-input"
            style={{ fontSize: "13px", padding: "10px 14px", flex: 1, minWidth: 0 }}
          />
          <button
            type="submit"
            disabled={aiLoading || !aiPrompt.trim()}
            className="btn btn-primary dashboard-ai-submit"
          >
            {aiLoading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={15} />}
            <span>Exécuter</span>
          </button>
        </form>

        {aiFeedback && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            <CheckCircle2 size={15} color="#34d399" />
            <span>{aiFeedback}</span>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats-grid">
        {[
          { icon: Calendar, label: "Aujourd'hui", value: todayEvents.length, color: "#6366f1", sublabel: "rendez-vous" },
          { icon: Bell, label: "Rappels actifs", value: reminders.length, color: "#a855f7", sublabel: "à venir" },
          { icon: CheckSquare, label: "Tâches en cours", value: tasks.length, color: "#10b981", sublabel: "à réaliser" },
          { icon: TrendingUp, label: "Cette semaine", value: events.length, color: "#38bdf8", sublabel: "activités" },
        ].map(({ icon: Icon, label, value, color, sublabel }) => (
          <div
            key={label}
            className="glass-card-interactive dashboard-stat-card"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: `${color}20`,
                border: `1px solid ${color}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={20} color={color} />
            </div>
            <div>
              <p style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
                {sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-main-grid">
        {/* Left Column: Agenda */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Today */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={17} color="#6366f1" />
                Aujourd&apos;hui
              </h2>
              <Link href="/calendar" className="btn btn-ghost btn-sm" style={{ fontSize: "12px", gap: "4px", color: "var(--text-secondary)" }}>
                <span>Voir l&apos;agenda</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[1, 2].map((i) => (
                  <div key={i} className="glass-card" style={{ height: "72px", opacity: 0.5 }} />
                ))}
              </div>
            ) : todayEvents.length === 0 ? (
              <div className="glass-card" style={{ textAlign: "center", padding: "36px 20px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Aucun rendez-vous aujourd&apos;hui</p>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "12px" }}
                  id="dashboard-add-first-event"
                >
                  <Plus size={14} />
                  <span>Ajouter un rendez-vous</span>
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {todayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>

          {/* Tomorrow */}
          {tomorrowEvents.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={17} color="#a855f7" />
                Demain
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {tomorrowEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Upcoming */}
          {nextEvents.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={17} color="var(--text-muted)" />
                À venir
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {nextEvents.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Reminders & Tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Next Reminder Highlight */}
          {nextReminder && (
            <div
              className="glass-card"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.12))",
                border: "1px solid rgba(99,102,241,0.4)",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <Volume2 size={16} color="#818cf8" />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Prochain rappel vocal
                </span>
              </div>
              <p style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>
                {nextReminder.title}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                {formatDate(nextReminder.fireAt)}
              </p>
            </div>
          )}

          {/* Tasks Widget */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckSquare size={17} color="#10b981" />
                Tâches à faire
              </h2>
              <Link href="/tasks" className="btn btn-ghost btn-sm" style={{ fontSize: "12px", gap: "4px", color: "var(--text-secondary)" }}>
                <span>Tout voir</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card" style={{ height: "48px", opacity: 0.5 }} />
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="glass-card" style={{ textAlign: "center", padding: "24px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Aucune tâche en attente</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {tasks.slice(0, 5).map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={loadDashboard} />
                ))}
              </div>
            )}
          </section>

          {/* Upcoming Reminders */}
          {reminders.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Bell size={17} color="#f59e0b" />
                Rappels programmés
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {reminders.slice(0, 4).map((rem) => (
                  <div key={rem.id} className="glass-card" style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {rem.title}
                      </p>
                      <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                        {formatDate(rem.fireAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventFormModal
          onClose={() => setShowEventForm(false)}
          onSaved={() => {
            setShowEventForm(false);
            loadDashboard();
          }}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/calendar?event=${event.id}`} style={{ textDecoration: "none" }}>
      <div
        className="glass-card-interactive"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "14px 18px",
          cursor: "pointer",
        }}
      >
        {/* Time block */}
        <div style={{ minWidth: "56px", textAlign: "center", flexShrink: 0 }}>
          <p style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff" }}>
            {formatTime(event.startAt)}
          </p>
          <p style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px" }}>
            {formatDateShort(event.startAt)}
          </p>
        </div>

        {/* Separator */}
        <div
          style={{
            width: "3px",
            height: "36px",
            borderRadius: "2px",
            background: "linear-gradient(180deg, #38bdf8, #6366f1, #a855f7)",
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#f8fafc",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: "3px",
            }}
          >
            {event.title}
          </p>
          {event.location && (
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              📍 {event.location}
            </p>
          )}
        </div>

        {/* Badges */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
          <span className={`badge ${getCategoryColor(event.category)}`} style={{ fontSize: "10px" }}>
            {getCategoryLabel(event.category)}
          </span>
          {event.mode === "PROFESSIONAL" && (
            <span style={{ fontSize: "10px", color: "#94a3b8" }}>
              <Briefcase size={10} style={{ display: "inline", marginRight: "3px" }} />
              Pro
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function TaskItem({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const [checking, setChecking] = useState(false);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setChecking(true);
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !task.isDone }),
      });
      onToggle();
    } catch {
      // ok
    }
    setChecking(false);
  };

  const priorityColors: Record<string, string> = {
    URGENT: "#ef4444",
    HIGH: "#f59e0b",
    NORMAL: "#6366f1",
    LOW: "#64748b",
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        opacity: task.isDone ? 0.5 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <button
        onClick={toggle}
        disabled={checking}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "6px",
          border: `2px solid ${task.isDone ? "#10b981" : "var(--border-default)"}`,
          background: task.isDone ? "#10b981" : "transparent",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
        id={`task-toggle-${task.id}`}
      >
        {task.isDone && <span style={{ color: "white", fontSize: "10px", fontWeight: "800" }}>✓</span>}
      </button>
      <p
        style={{
          flex: 1,
          fontSize: "13px",
          fontWeight: "500",
          color: "#f8fafc",
          textDecoration: task.isDone ? "line-through" : "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {task.title}
      </p>
      <div
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: priorityColors[task.priority] ?? priorityColors.NORMAL,
          flexShrink: 0,
        }}
      />
    </div>
  );
}
