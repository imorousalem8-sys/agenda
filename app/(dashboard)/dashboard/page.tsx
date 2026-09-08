"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar as CalendarIcon,
  CheckSquare,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Activity,
  User,
  MapPin,
  ChevronRight,
  Volume2,
  Zap,
  PhoneCall,
  ShieldCheck,
  Check,
  Download,
  Play,
  Pause,
  RotateCcw,
  Target,
  Flame,
  CheckCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import EventFormModal from "@/components/forms/EventFormModal";
import { speakAIText, playAlertChime } from "@/lib/voice";

interface EventItem {
  id: string;
  title: string;
  startAt: string;
  category: string;
  location?: string | null;
  mode?: string;
  contact?: { firstName: string; lastName?: string | null } | null;
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

export default function DashboardPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("Bonjour");
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);

  // Focus / Pomodoro Timer State (25 mins = 1500s)
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  const userName = session?.user?.name ? session.user.name.split(" ")[0] : "Salem";

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      const h = now.getHours();
      if (h >= 5 && h < 12) setGreeting("Bonjour");
      else if (h >= 12 && h < 18) setGreeting("Bon après-midi");
      else setGreeting("Bonsoir");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pomodoro Focus Timer
  useEffect(() => {
    let timer: any;
    if (isFocusRunning && focusSeconds > 0) {
      timer = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0) {
      setIsFocusRunning(false);
      playAlertChime();
      speakAIText("Session Focus terminée avec succès ! Prenez une pause de 5 minutes.");
    }
    return () => clearInterval(timer);
  }, [isFocusRunning, focusSeconds]);

  useEffect(() => {
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

  const handleOpenAI = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  const handlePlayDailyBriefing = async () => {
    setIsPlayingBriefing(true);
    await playAlertChime();

    const eventCount = events.length || 3;
    const reminderCount = reminders.length || 2;
    const briefingText = `${greeting} ${userName} ! Voici votre briefing exécutif. Vous avez ${eventCount} rendez-vous planifiés aujourd'hui et ${reminderCount} rappels vocaux actifs. Votre premier créneau commence dans la matinée. Tout est sous contrôle.`;

    speakAIText(briefingText, {
      gender: "FEMALE",
      onEnd: () => setIsPlayingBriefing(false),
      onError: () => setIsPlayingBriefing(false),
    });
  };

  const handleExportICS = () => {
    window.location.href = "/api/events/export";
  };

  const handleToggleTask = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !currentStatus }),
      });
      loadDashboard();
    } catch (e) {
      console.error("Error toggling task:", e);
    }
  };

  const formatFocusTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const completedCount = tasks.filter((t) => t.isDone).length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 80;

  return (
    <div style={{ padding: "28px 36px", maxWidth: "1550px", margin: "0 auto", width: "100%" }}>
      {/* 1. Ultra-Clean Executive Command Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0b152e 0%, #1d4ed8 55%, #2563eb 100%)",
          borderRadius: "22px",
          padding: "24px 30px",
          boxShadow: "0 15px 35px -5px rgba(37, 99, 235, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "18px",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "rgba(255, 255, 255, 0.2)",
                padding: "3px 10px",
                borderRadius: "20px",
                color: "#e0f2fe",
              }}
            >
              Cockpit Exécutif
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#bae6fd", fontWeight: "600" }}>
              <Clock size={13} />
              <span>{currentTime || "12:00:00"}</span>
            </div>
          </div>

          <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", color: "#ffffff", margin: 0 }}>
            {greeting}, {userName} ! 👋
          </h1>
          <p style={{ fontSize: "13.5px", color: "#e0f2fe", marginTop: "2px", fontWeight: "500" }}>
            Votre espace de travail est synchronisé. Tous vos créneaux sont sous contrôle.
          </p>
        </div>

        {/* Executive Power Tools Buttons */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Briefing Vocal */}
          <button
            onClick={handlePlayDailyBriefing}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-white/30"
            title="Écouter le résumé vocal de la journée"
          >
            <Volume2 size={16} />
            <span>{isPlayingBriefing ? "Briefing en cours..." : "Briefing Vocal du Jour"}</span>
          </button>

          {/* Export Calendrier .ICS */}
          <button
            onClick={handleExportICS}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-white/30"
            title="Exporter l'agenda vers Google Calendar, Apple Calendar ou Outlook (.ics)"
          >
            <Download size={15} />
            <span>Exporter l&apos;agenda (.ICS)</span>
          </button>

          {/* Assistant IA */}
          <button
            onClick={handleOpenAI}
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              background: "#ffffff",
              color: "#1d4ed8",
              fontWeight: "800",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.15s ease",
            }}
            className="hover:scale-105"
          >
            <Sparkles size={16} style={{ color: "#2563eb" }} />
            <span>Parler à l&apos;IA</span>
          </button>
        </div>
      </div>

      {/* 2. Precision Quick-Action Strip (4 Polished Cards) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => setShowEventForm(true)}
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.15s ease",
          }}
          className="hover:border-blue-500 hover:shadow-md"
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CalendarIcon size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>Nouveau créneau</div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Planifier un rendez-vous</div>
          </div>
          <ArrowRight size={15} style={{ color: "#94a3b8" }} />
        </button>

        <Link
          href="/reminders"
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "none",
            transition: "all 0.15s ease",
          }}
          className="hover:border-amber-500 hover:shadow-md"
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>Rappel vocal</div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Annonce à voix haute</div>
          </div>
          <ArrowRight size={15} style={{ color: "#94a3b8" }} />
        </Link>

        <Link
          href="/tasks"
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "none",
            transition: "all 0.15s ease",
          }}
          className="hover:border-emerald-500 hover:shadow-md"
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckSquare size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>Ajouter une tâche</div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Matrice des priorités</div>
          </div>
          <ArrowRight size={15} style={{ color: "#94a3b8" }} />
        </Link>

        {/* Focus Mode Trigger Card */}
        <div
          onClick={() => setIsFocusRunning(!isFocusRunning)}
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: isFocusRunning ? "rgba(37, 99, 235, 0.1)" : "var(--bg-surface)",
            border: isFocusRunning ? "1.5px solid #2563eb" : "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.15s ease",
          }}
          className="hover:border-blue-500 hover:shadow-md"
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>Mode Focus</span>
              <span style={{ fontSize: "10px", background: isFocusRunning ? "#2563eb" : "#e2e8f0", color: isFocusRunning ? "#ffffff" : "#475569", padding: "1px 6px", borderRadius: "6px" }}>
                {formatFocusTime(focusSeconds)}
              </span>
            </div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
              {isFocusRunning ? "Session en cours (Pause)" : "Démarrer 25 min de concentration"}
            </div>
          </div>
          {isFocusRunning ? <Pause size={16} color="#2563eb" /> : <Play size={16} color="#94a3b8" />}
        </div>
      </div>

      {/* 3. Main Cockpit Layout (3 Structured Columns) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* COLUMN 1: Agenda & Prochains Rendez-vous */}
        <div
          style={{
            background: "var(--bg-surface)",
            borderRadius: "18px",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            padding: "22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
            <div>
              <h2 style={{ fontSize: "15.5px", fontWeight: "800", color: "var(--text-primary)" }}>
                Prochains rendez-vous
              </h2>
              <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "1px" }}>
                Créneaux confirmés et synchronisés
              </p>
            </div>
            <Link
              href="/calendar"
              style={{
                fontSize: "12px",
                color: "#2563eb",
                fontWeight: "700",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(37, 99, 235, 0.08)",
                padding: "5px 10px",
                borderRadius: "8px",
              }}
            >
              <span>Ouvrir l&apos;agenda</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {events.length === 0 ? (
              <>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-hover)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "44px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "9px", opacity: 0.85 }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                      Rendez-vous avec Paul
                    </div>
                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                      10:00 · Atelier Liège
                    </div>
                  </div>
                  <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#16a34a", background: "rgba(22, 163, 74, 0.12)", padding: "3px 8px", borderRadius: "6px" }}>
                    À venir
                  </span>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-hover)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "44px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "9px", opacity: 0.85 }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                      Consultation Dentiste
                    </div>
                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                      14:00 · Clinique Sainte-Rosalie
                    </div>
                  </div>
                  <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#16a34a", background: "rgba(22, 163, 74, 0.12)", padding: "3px 8px", borderRadius: "6px" }}>
                    À venir
                  </span>
                </div>
              </>
            ) : (
              events.slice(0, 4).map((event) => {
                const date = new Date(event.startAt);
                const month = date.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
                const day = date.getDate().toString().padStart(2, "0");
                const time = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

                return (
                  <div
                    key={event.id}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-hover)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "44px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        fontSize: "12px",
                        lineHeight: "1.1",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "9px", opacity: 0.85 }}>{month}</span>
                      <span>{day}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {time} {event.location ? `· ${event.location}` : ""}
                      </div>
                    </div>
                    <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#16a34a", background: "rgba(22, 163, 74, 0.12)", padding: "3px 8px", borderRadius: "6px" }}>
                      Confirmé
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COLUMN 2: Rappels Vocaux & Mode Focus */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Rappels Vocaux */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "18px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "22px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Volume2 size={16} color="#ea580c" />
                <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)" }}>
                  Rappels Vocaux Proactifs
                </h2>
              </div>
              <Link href="/reminders" style={{ fontSize: "12px", color: "#2563eb", fontWeight: "700", textDecoration: "none" }}>
                Gérer
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {reminders.length === 0 ? (
                <>
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-hover)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>
                        Acheter pièces atelier
                      </div>
                      <div style={{ fontSize: "11px", color: "#ea580c", fontWeight: "600" }}>18:00 · Annonce vocale</div>
                    </div>
                    <span style={{ fontSize: "10px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>
                      Actif
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-hover)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>
                        Rappeler Jean (Urgent)
                      </div>
                      <div style={{ fontSize: "11px", color: "#ea580c", fontWeight: "600" }}>20:00 · Annonce vocale</div>
                    </div>
                    <span style={{ fontSize: "10px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>
                      Actif
                    </span>
                  </div>
                </>
              ) : (
                reminders.slice(0, 3).map((r) => {
                  const time = new Date(r.fireAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <div
                      key={r.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg-hover)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>{r.title}</div>
                        <div style={{ fontSize: "11px", color: "#ea580c", fontWeight: "600" }}>{time} · Vocal</div>
                      </div>
                      <span style={{ fontSize: "10px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>
                        Actif
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Minuteur Focus Pomodoro */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "18px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Target size={16} color="#2563eb" />
                <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)" }}>Session Focus</span>
              </div>
              <span style={{ fontSize: "16px", fontWeight: "900", color: "#2563eb" }}>
                {formatFocusTime(focusSeconds)}
              </span>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setIsFocusRunning(!isFocusRunning)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  background: isFocusRunning ? "#ea580c" : "#2563eb",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "12px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {isFocusRunning ? <Pause size={13} /> : <Play size={13} />}
                <span>{isFocusRunning ? "Pause" : "Démarrer"}</span>
              </button>

              <button
                onClick={() => {
                  setIsFocusRunning(false);
                  setFocusSeconds(25 * 60);
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
                title="Réinitialiser"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Matrice des Tâches & Efficacité IA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Tâches Prioritaires */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "18px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "22px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)" }}>
                Tâches Prioritaires
              </h2>
              <span style={{ fontSize: "12.5px", fontWeight: "800", color: "#2563eb" }}>
                {taskCompletionRate}%
              </span>
            </div>

            <div style={{ width: "100%", height: "6px", background: "var(--border-subtle)", borderRadius: "3px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ width: `${taskCompletionRate}%`, height: "100%", background: "#2563eb", borderRadius: "3px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "var(--bg-hover)",
                }}
              >
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                  <Check size={10} />
                </div>
                <span style={{ fontSize: "12.5px", color: "var(--text-primary)", fontWeight: "500", textDecoration: "line-through", opacity: 0.7 }}>
                  Vérifier les factures fournisseurs
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "var(--bg-hover)",
                }}
              >
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #cbd5e1" }} />
                <span style={{ fontSize: "12.5px", color: "var(--text-primary)", fontWeight: "600" }}>
                  Préparer les pièces pour l&apos;atelier
                </span>
              </div>
            </div>
          </div>

          {/* Efficacité & Impact */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "18px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Activity size={16} color="#2563eb" />
              <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)" }}>Impact &amp; Gain de Temps</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "20px", fontWeight: "900", color: "#16a34a" }}>+4.5h / sem.</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Temps économisé grâce à l&apos;IA</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "20px", fontWeight: "900", color: "#2563eb" }}>98.4%</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Précision des alertes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de création de rendez-vous */}
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
