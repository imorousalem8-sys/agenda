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
  Bot,
  Send,
  Loader2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  MapPin,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import EventFormModal from "@/components/forms/EventFormModal";
import DashboardClockHero from "@/components/dashboard/DashboardClockHero";
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

const actionChips = [
  "Organise ma journée de demain",
  "Demain chantier 8h avec Martin, rappelle-moi 30 min avant",
  "Rappelle-moi d'appeler le médecin à 16h30",
  "Ajoute la tâche : acheter 2 coudes et 3 manchons",
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

  const upcomingEvents = events.slice(0, 4);
  const urgentTasks = tasks.slice(0, 5);
  const pendingReminders = reminders.slice(0, 4);

  return (
    <div style={{ padding: "24px 28px", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
      {/* Top Hero & Live Digital Clock */}
      <div style={{ marginBottom: "24px" }}>
        <DashboardClockHero />
      </div>

      {/* Central AI Command Bar (Brain & Hands Paradigm) */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: "20px",
          padding: "20px 24px",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(16px)",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "800", color: "#f8fafc" }}>
              {greeting}, {session?.user?.name?.split(" ")[0] || "Salem"} ! Que faisons-nous ?
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Parlez naturellement. L&apos;assistant planifie vos rendez-vous, tâches et alarmes vocales en une phrase.
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            padding: "8px 14px",
          }}
        >
          <button
            onClick={toggleVoice}
            className={`btn btn-ghost btn-sm ${isListening ? "text-rose-400 animate-pulse" : "text-slate-400"}`}
            style={{ padding: "6px" }}
            title={isListening ? "Arrêter l'écoute" : "Dicter une action"}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
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
              fontSize: "14px",
              outline: "none",
            }}
          />

          <button
            onClick={() => handleExecuteAI()}
            disabled={aiLoading || !aiPrompt.trim()}
            className="btn btn-primary"
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              fontWeight: "700",
              fontSize: "13px",
              gap: "6px",
            }}
          >
            {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            <span>Exécuter</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div style={{ display: "flex", gap: "8px", marginTop: "12px", overflowX: "auto", paddingBottom: "2px" }}>
          {actionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleExecuteAI(chip)}
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                fontSize: "11px",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              className="hover:border-indigo-400 hover:text-white"
            >
              ✨ {chip}
            </button>
          ))}
        </div>

        {/* AI Execution Feedback Area */}
        {(aiFeedback || aiSteps.length > 0) && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px 18px",
              borderRadius: "14px",
              background: "rgba(10, 15, 30, 0.8)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
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

      {/* Grid of Live Action Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {/* Card 1: Agenda & Prochains Rendez-vous */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "18px",
            padding: "20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ padding: "6px", borderRadius: "8px", background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8" }}>
                <Calendar size={18} />
              </div>
              <span style={{ fontWeight: "800", fontSize: "14px", color: "#f8fafc" }}>Prochains Rendez-vous</span>
            </div>
            <Link
              href="/calendar"
              style={{ fontSize: "12px", color: "#38bdf8", textDecoration: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((ev) => {
                const date = new Date(ev.startAt);
                const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                const dayStr = date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
                return (
                  <div
                    key={ev.id}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "13px", color: "#f8fafc" }}>{ev.title}</div>
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

          <button
            onClick={() => setShowEventForm(true)}
            className="btn btn-outline btn-sm"
            style={{ width: "100%", marginTop: "14px", fontSize: "12px", gap: "6px" }}
          >
            <Plus size={14} />
            <span>Ajouter manuellement</span>
          </button>
        </div>

        {/* Card 2: Tâches & Priorités */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "18px",
            padding: "20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ padding: "6px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                <CheckSquare size={18} />
              </div>
              <span style={{ fontWeight: "800", fontSize: "14px", color: "#f8fafc" }}>Tâches en Cours</span>
            </div>
            <Link
              href="/tasks"
              style={{ fontSize: "12px", color: "#34d399", textDecoration: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            {urgentTasks.length > 0 ? (
              urgentTasks.map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.priority === "URGENT" ? "#f43f5e" : "#10b981" }} />
                    <span style={{ fontWeight: "600", fontSize: "13px", color: "#f8fafc" }}>{t.title}</span>
                  </div>
                  {t.priority === "URGENT" && (
                    <span style={{ fontSize: "10px", fontWeight: "800", background: "rgba(244, 63, 94, 0.15)", color: "#fb7185", padding: "2px 6px", borderRadius: "4px" }}>
                      URGENT
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)", fontSize: "12px" }}>
                Toutes vos tâches sont accomplies !
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Rappels & Alarmes Vocales */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "18px",
            padding: "20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ padding: "6px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
                <Bell size={18} />
              </div>
              <span style={{ fontWeight: "800", fontSize: "14px", color: "#f8fafc" }}>Rappels Vocaux Actifs</span>
            </div>
            <Link
              href="/reminders"
              style={{ fontSize: "12px", color: "#fbbf24", textDecoration: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            {pendingReminders.length > 0 ? (
              pendingReminders.map((r) => {
                const date = new Date(r.fireAt);
                const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                return (
                  <div
                    key={r.id}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "13px", color: "#f8fafc" }}>{r.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Prévu à {timeStr} ({r.method})</div>
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
        <EventFormModal onClose={() => setShowEventForm(false)} />
      )}
    </div>
  );
}
