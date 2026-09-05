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
  Sparkles,
  Send,
  Loader2,
  Mic,
  MicOff,
  MapPin,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import EventFormModal from "@/components/forms/EventFormModal";
import AgentStepCard from "@/components/ai/AgentStepCard";
import ToolCallCard from "@/components/ai/ToolCallCard";
import { AgentStep, AIActionExecutionResult } from "@/lib/ai/types";
import { speakAIText } from "@/lib/voice";

interface EventItem {
  id: string;
  title: string;
  startAt: string;
  category: string;
  location?: string | null;
  reminders: { id: string; fireAt: string; status: string }[];
}

interface ReminderItem {
  id: string;
  title: string;
  fireAt: string;
  status: string;
  method: string;
}

interface TaskItem {
  id: string;
  title: string;
  priority: string;
  isDone: boolean;
  dueAt?: string | null;
}

const quickActions = [
  "Organise ma journée de demain",
  "Demain chantier 8h avec Martin, rappelle-moi 30 min avant",
  "Rappelle-moi d'appeler le médecin à 16h30",
  "Ajoute la tâche : commander 2 coudes et 3 manchons",
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [greeting, setGreeting] = useState("Bonjour");

  // Direct AI Command Bar State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiSteps, setAiSteps] = useState<AgentStep[]>([]);
  const [aiAction, setAiAction] = useState<AIActionExecutionResult | null>(null);
  const [isListening, setIsListening] = useState(false);

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
        evRes.ok ? evRes.json() : { events: [] },
        remRes.ok ? remRes.json() : { reminders: [] },
        taskRes.ok ? taskRes.json() : { tasks: [] },
      ]);

      setEvents(evData.events || []);
      setReminders(remData.reminders || []);
      setTasks(taskData.tasks || []);
    } catch (e) {
      console.error("Dashboard data load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAI = async (textToRun?: string) => {
    const text = (textToRun || aiPrompt).trim();
    if (!text || aiLoading) return;

    setAiLoading(true);
    setAiFeedback(null);
    setAiSteps([]);
    setAiAction(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erreur de traitement");
      }

      const data = await res.json();
      setAiFeedback(data.reply);
      setAiSteps(data.steps || []);
      setAiAction(data.action || null);

      if (data.saved) {
        loadDashboard();
        window.dispatchEvent(new Event("ai-quota-updated"));
      }

      if (data.spokenReply) {
        speakAIText(data.spokenReply);
      }

      setAiPrompt("");
    } catch (err: unknown) {
      setAiFeedback(err instanceof Error ? err.message : "Erreur de communication avec l'assistant.");
    } finally {
      setAiLoading(false);
    }
  };

  const toggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Reconnaissance vocale non disponible sur ce navigateur.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      if (transcript) {
        setAiPrompt(transcript);
        handleExecuteAI(transcript);
      }
    };

    recognition.start();
  };

  const todayFormatted = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const upcomingEvents = events.slice(0, 4);
  const urgentTasks = tasks.slice(0, 5);
  const pendingReminders = reminders.slice(0, 4);

  return (
    <div style={{ padding: "32px 36px", maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
      {/* 1. Header Pro */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--text-muted)",
                textTransform: "capitalize",
              }}
            >
              {todayFormatted}
            </span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", letterSpacing: "-0.02em" }}>
            {greeting}, {session?.user?.name || "Alexandre"}
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Synthèse de votre activité, vos priorités et vos alertes du jour.
          </p>
        </div>

        {/* Quick Metrics & Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "7px 14px",
              borderRadius: "8px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              fontSize: "12px",
              fontWeight: "600",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#38bdf8" }} />
              <span>{events.length} RDV</span>
            </div>
            <div style={{ width: "1px", height: "14px", background: "var(--border-subtle)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
              <span>{tasks.length} Tâches</span>
            </div>
            <div style={{ width: "1px", height: "14px", background: "var(--border-subtle)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b" }} />
              <span>{reminders.length} Alertes</span>
            </div>
          </div>

          <button
            onClick={() => setShowEventForm(true)}
            className="btn btn-primary"
            style={{
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              gap: "6px",
            }}
          >
            <Plus size={15} />
            <span>Nouveau rendez-vous</span>
          </button>
        </div>
      </div>

      {/* 2. Direct AI Action Bar */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "12px",
          padding: "18px 20px",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc" }}>
                Assistant & Copilote IA
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Exécutez vos actions en langage naturel ou par commande vocale.
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "var(--bg-app)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "8px",
            padding: "6px 12px",
          }}
        >
          <button
            onClick={toggleVoice}
            className={`btn btn-ghost btn-sm ${isListening ? "text-rose-400" : "text-slate-400"}`}
            style={{ padding: "4px" }}
            title={isListening ? "Arrêter l'écoute" : "Dicter une consigne"}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleExecuteAI();
            }}
            placeholder="Ex : « Demain chantier 8h, rappelle-moi d'aller chez le fournisseur avant et d'appeler Martin à 17h »"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#f8fafc",
              fontSize: "13px",
              outline: "none",
            }}
          />

          <button
            onClick={() => handleExecuteAI()}
            disabled={aiLoading || !aiPrompt.trim()}
            className="btn btn-primary"
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              fontWeight: "600",
              fontSize: "12px",
              gap: "6px",
            }}
          >
            {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            <span>Exécuter</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: "flex", gap: "6px", marginTop: "10px", overflowX: "auto" }}>
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleExecuteAI(action)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: "500",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              className="hover:border-slate-500 hover:text-white"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Execution Feedback */}
        {(aiFeedback || aiSteps.length > 0) && (
          <div
            style={{
              marginTop: "14px",
              padding: "14px 16px",
              borderRadius: "8px",
              background: "var(--bg-app)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {aiFeedback && (
              <div style={{ fontSize: "13px", color: "#f8fafc", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                {aiFeedback}
              </div>
            )}

            {aiSteps.length > 0 && (
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {aiSteps.map((step) => (
                  <AgentStepCard key={step.id} step={step} />
                ))}
              </div>
            )}

            {aiAction && (
              <div style={{ marginTop: "10px" }}>
                <ToolCallCard action={aiAction} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. High-End 3-Column Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {/* Column 1: Rendez-vous */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={16} style={{ color: "#38bdf8" }} />
              <span style={{ fontWeight: "600", fontSize: "13px", color: "#f8fafc" }}>Prochains Rendez-vous</span>
            </div>
            <Link
              href="/calendar"
              style={{ fontSize: "12px", color: "#38bdf8", textDecoration: "none", fontWeight: "500", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((ev) => {
                const date = new Date(ev.startAt);
                const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                const dayStr = date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
                return (
                  <div
                    key={ev.id}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "13px", color: "#f8fafc" }}>{ev.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                        <span>{dayStr} à {timeStr}</span>
                        {ev.location && (
                          <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <MapPin size={10} />
                            <span>{ev.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)", fontSize: "12px" }}>
                Aucun rendez-vous sur les 7 prochains jours.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Tâches */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckSquare size={16} style={{ color: "#10b981" }} />
              <span style={{ fontWeight: "600", fontSize: "13px", color: "#f8fafc" }}>Tâches Prioritaires</span>
            </div>
            <Link
              href="/tasks"
              style={{ fontSize: "12px", color: "#10b981", textDecoration: "none", fontWeight: "500", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {urgentTasks.length > 0 ? (
              urgentTasks.map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: t.priority === "URGENT" ? "#f43f5e" : "#10b981" }} />
                    <span style={{ fontWeight: "500", fontSize: "13px", color: "#f8fafc" }}>{t.title}</span>
                  </div>
                  {t.priority === "URGENT" && (
                    <span style={{ fontSize: "10px", fontWeight: "600", background: "rgba(244, 63, 94, 0.15)", color: "#fb7185", padding: "2px 6px", borderRadius: "4px" }}>
                      URGENT
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)", fontSize: "12px" }}>
                Toutes vos tâches sont accomplies.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Rappels & Alertes */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bell size={16} style={{ color: "#f59e0b" }} />
              <span style={{ fontWeight: "600", fontSize: "13px", color: "#f8fafc" }}>Rappels Vocaux</span>
            </div>
            <Link
              href="/reminders"
              style={{ fontSize: "12px", color: "#f59e0b", textDecoration: "none", fontWeight: "500", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {pendingReminders.length > 0 ? (
              pendingReminders.map((r) => {
                const date = new Date(r.fireAt);
                const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                return (
                  <div
                    key={r.id}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "13px", color: "#f8fafc" }}>{r.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Prévu à {timeStr} ({r.method})</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)", fontSize: "12px" }}>
                Aucun rappel en attente.
              </div>
            )}
          </div>
        </div>
      </div>

      {showEventForm && (
        <EventFormModal
          onClose={() => setShowEventForm(false)}
          onSaved={() => {
            setShowEventForm(false);
            loadDashboard();
          }}
        />
      )}
    </div>
  );
}
