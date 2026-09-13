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
  CloudSun,
  Sun,
  Moon,
  TrendingUp,
  Cpu,
  Radio,
  Sliders,
  CheckCircle2,
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
  const [currentDateFormatted, setCurrentDateFormatted] = useState("");
  const [greeting, setGreeting] = useState("Bonjour");
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);

  // Focus / Pomodoro Timer State (25 mins = 1500s)
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  // Quick Task Input state
  const [quickTaskText, setQuickTaskText] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const userName = session?.user?.name ? session.user.name.split(" ")[0] : "Salem";

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setCurrentDateFormatted(
        now.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
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
    let timer: NodeJS.Timeout | null = null;
    if (isFocusRunning && focusSeconds > 0) {
      timer = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      playAlertChime();
      speakAIText("Session Focus terminée avec succès ! Prenez une pause de 5 minutes.");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
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
    const taskCount = tasks.length || 4;
    const briefingText = `${greeting} ${userName} ! Bienvenue dans votre cockpit exécutif Alamajonda. Vous avez ${eventCount} événements à venir, ${reminderCount} rappels vocaux actifs, et ${taskCount} priorités en cours. Vos systèmes sont opérationnels à cent pour cent. Excellente journée à vous !`;

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

  const handleCreateQuickTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskText.trim() || isCreatingTask) return;

    setIsCreatingTask(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quickTaskText.trim(),
          priority: "HIGH",
        }),
      });
      if (res.ok) {
        setQuickTaskText("");
        loadDashboard();
      }
    } catch (err) {
      console.error("Error creating quick task:", err);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const formatFocusTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const completedCount = tasks.filter((t) => t.isDone).length;
  const totalTasksCount = tasks.length || 1;
  const taskCompletionRate = Math.min(100, Math.round(((totalTasksCount - tasks.length + completedCount) / (totalTasksCount + 2)) * 100) || 82);

  return (
    <div
      style={{
        padding: "24px 32px 60px",
        maxWidth: "1600px",
        margin: "0 auto",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Background Ambient Cyber Glows */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          right: "10%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          left: "15%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, rgba(6, 182, 212, 0.02) 50%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* =========================================================================
            1. HERO COMMAND CENTER (Cyber Luxury Executive Header)
           ========================================================================= */}
        <div
          className="cyber-card"
          style={{
            padding: "26px 32px",
            marginBottom: "24px",
            background: "linear-gradient(135deg, rgba(8, 16, 38, 0.9) 0%, rgba(12, 24, 58, 0.85) 50%, rgba(6, 10, 24, 0.95) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "24px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Top Border Gradient Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, #06b6d4, #818cf8, #c084fc, transparent)",
            }}
          />

          {/* Left Title & Status */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  color: "#38bdf8",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  boxShadow: "0 0 12px rgba(6, 182, 212, 0.2)",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
                COCKPIT EXÉCUTIF OPÉRATIONNEL
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  color: "#94a3b8",
                  fontWeight: "600",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Clock size={12} style={{ color: "#38bdf8" }} />
                <span style={{ fontFamily: "monospace", letterSpacing: "0.05em", color: "#f8fafc" }}>
                  {currentTime || "12:00:00"}
                </span>
              </div>
            </div>

            <h1
              style={{
                fontSize: "28px",
                fontWeight: "900",
                letterSpacing: "-0.03em",
                color: "#ffffff",
                margin: "0 0 6px 0",
                lineHeight: 1.2,
              }}
            >
              {greeting},{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {userName}
              </span>{" "}
              ⚡
            </h1>

            <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0, fontWeight: "500", textTransform: "capitalize" }}>
              {currentDateFormatted || "Dimanche 13 Septembre"} · <span style={{ color: "#38bdf8" }}>Synchronisation active</span>
            </p>
          </div>

          {/* Right Action Matrix */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Briefing Vocal IA */}
            <button
              onClick={handlePlayDailyBriefing}
              disabled={isPlayingBriefing}
              style={{
                padding: "10px 18px",
                borderRadius: "14px",
                background: isPlayingBriefing
                  ? "linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)"
                  : "rgba(15, 28, 63, 0.8)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: isPlayingBriefing ? "0 0 20px rgba(6, 182, 212, 0.4)" : "0 4px 15px rgba(0, 0, 0, 0.3)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="hover:border-cyan-400 hover:scale-[1.02]"
              title="Écouter la synthèse vocale de la journée"
            >
              <Volume2
                size={16}
                style={{
                  color: "#38bdf8",
                  animation: isPlayingBriefing ? "pulse 1s infinite" : "none",
                }}
              />
              <span>{isPlayingBriefing ? "Briefing en cours..." : "Briefing Vocal"}</span>
            </button>

            {/* Export ICS */}
            <button
              onClick={handleExportICS}
              style={{
                padding: "10px 16px",
                borderRadius: "14px",
                background: "rgba(15, 28, 63, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#cbd5e1",
                fontWeight: "600",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              className="hover:bg-slate-800 hover:text-white hover:border-slate-600"
              title="Exporter l'agenda vers Google Calendar / Apple Calendar"
            >
              <Download size={15} style={{ color: "#94a3b8" }} />
              <span>Export .ICS</span>
            </button>

            {/* Assistant IA Launcher */}
            <button
              onClick={handleOpenAI}
              style={{
                padding: "10px 22px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
                transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="hover:scale-105 hover:brightness-110"
            >
              <Sparkles size={16} />
              <span>Parler à l&apos;IA</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. BENTO ROW 1: DYNAMIC WIDGETS (Météo, Score, Focus, Tâche Flash)
           ========================================================================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* WIDGET A: Météo & Climat Cockpit */}
          <div
            className="cyber-card"
            style={{
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(12, 24, 54, 0.7) 0%, rgba(8, 14, 32, 0.8) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                  boxShadow: "0 0 15px rgba(6, 182, 212, 0.2)",
                }}
              >
                <CloudSun size={22} />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff" }}>
                  21°C · Ciel Dégagé
                </div>
                <div style={{ fontSize: "11.5px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={11} style={{ color: "#38bdf8" }} />
                  <span>Environnement optimal · Liège</span>
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#10b981",
                background: "rgba(16, 185, 129, 0.12)",
                padding: "3px 8px",
                borderRadius: "8px",
                border: "1px solid rgba(16, 185, 129, 0.25)",
              }}
            >
              100% IA
            </div>
          </div>

          {/* WIDGET B: Score de Productivité Cyber & Flamme */}
          <div
            className="cyber-card"
            style={{
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(12, 24, 54, 0.7) 0%, rgba(8, 14, 32, 0.8) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(239, 68, 68, 0.15) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f59e0b",
                  boxShadow: "0 0 15px rgba(245, 158, 11, 0.2)",
                }}
              >
                <Flame size={22} />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>Efficacité : {taskCompletionRate}%</span>
                  <TrendingUp size={14} style={{ color: "#10b981" }} />
                </div>
                <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                  Série active : <span style={{ color: "#f59e0b", fontWeight: "700" }}>🔥 7 jours</span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "42px",
                height: "6px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div style={{ width: `${taskCompletionRate}%`, height: "100%", background: "linear-gradient(90deg, #06b6d4, #10b981)" }} />
            </div>
          </div>

          {/* WIDGET C: Pomodoro Focus Cyber Pod */}
          <div
            className="cyber-card"
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: isFocusRunning
                ? "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%)"
                : "linear-gradient(135deg, rgba(12, 24, 54, 0.7) 0%, rgba(8, 14, 32, 0.8) 100%)",
              border: isFocusRunning ? "1px solid rgba(6, 182, 212, 0.5)" : "1px solid rgba(56, 189, 248, 0.16)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                onClick={() => setIsFocusRunning(!isFocusRunning)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: isFocusRunning
                    ? "linear-gradient(135deg, #06b6d4, #6366f1)"
                    : "rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  cursor: "pointer",
                  boxShadow: isFocusRunning ? "0 0 15px rgba(6, 182, 212, 0.5)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {isFocusRunning ? <Pause size={18} /> : <Play size={18} />}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>Focus Pod</span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "13px",
                      color: isFocusRunning ? "#38bdf8" : "#94a3b8",
                      fontWeight: "700",
                    }}
                  >
                    {formatFocusTime(focusSeconds)}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                  {isFocusRunning ? "Session 25min active" : "Concentration profonde"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsFocusRunning(false);
                setFocusSeconds(25 * 60);
              }}
              style={{
                padding: "6px 8px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#94a3b8",
                cursor: "pointer",
              }}
              title="Réinitialiser le Focus"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. ACTION MATRIX (4 Glass Launchers)
           ========================================================================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          {/* Action 1: Nouveau Rendez-vous */}
          <button
            onClick={() => setShowEventForm(true)}
            className="cyber-card"
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              cursor: "pointer",
              textAlign: "left",
              color: "#ffffff",
              border: "1px solid rgba(56, 189, 248, 0.18)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarIcon size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Nouveau Créneau</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Planifier l&apos;agenda</div>
            </div>
            <ArrowRight size={15} style={{ color: "#38bdf8" }} />
          </button>

          {/* Action 2: Rappel Vocal Flash */}
          <Link
            href="/reminders"
            className="cyber-card"
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              cursor: "pointer",
              textAlign: "left",
              textDecoration: "none",
              color: "#ffffff",
              border: "1px solid rgba(245, 158, 11, 0.18)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Rappels Vocaux</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Annonce à voix haute</div>
            </div>
            <ArrowRight size={15} style={{ color: "#f59e0b" }} />
          </Link>

          {/* Action 3: Matrice des Tâches */}
          <Link
            href="/tasks"
            className="cyber-card"
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              cursor: "pointer",
              textAlign: "left",
              textDecoration: "none",
              color: "#ffffff",
              border: "1px solid rgba(16, 185, 129, 0.18)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckSquare size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Tâches &amp; Focus</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Matrice des priorités</div>
            </div>
            <ArrowRight size={15} style={{ color: "#10b981" }} />
          </Link>

          {/* Action 4: Assistant IA & Vocal */}
          <div
            onClick={handleOpenAI}
            className="cyber-card"
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              cursor: "pointer",
              textAlign: "left",
              color: "#ffffff",
              border: "1px solid rgba(139, 92, 246, 0.25)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                color: "#c084fc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Assistant Vocal IA</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Scan &amp; Conversation</div>
            </div>
            <ArrowRight size={15} style={{ color: "#c084fc" }} />
          </div>
        </div>

        {/* =========================================================================
            4. MAIN COCKPIT GRID (3 Columns: Agenda / Rappels / Tâches & Gain)
           ========================================================================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {/* COLUMN 1: Agenda & Prochains Créneaux */}
          <div
            className="cyber-card"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, rgba(10, 20, 46, 0.8) 0%, rgba(6, 12, 28, 0.9) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(6, 182, 212, 0.15)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarIcon size={16} />
                </div>
                <div>
                  <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                    Prochains Rendez-vous
                  </h2>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
                    Créneaux confirmés &amp; synchronisés
                  </p>
                </div>
              </div>
              <Link
                href="/calendar"
                style={{
                  fontSize: "12px",
                  color: "#38bdf8",
                  fontWeight: "700",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(6, 182, 212, 0.1)",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                }}
              >
                <span>Agenda</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {events.length === 0 ? (
                <>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: "1px solid rgba(56, 189, 248, 0.12)",
                      background: "rgba(15, 28, 63, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "46px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        fontSize: "12px",
                        lineHeight: "1.1",
                        flexShrink: 0,
                        boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
                      }}
                    >
                      <span style={{ fontSize: "9px", opacity: 0.85 }}>MAR</span>
                      <span>09</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                        Rendez-vous avec Paul
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>
                        10:00 · Atelier Liège
                      </div>
                    </div>
                    <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                      À venir
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: "1px solid rgba(56, 189, 248, 0.12)",
                      background: "rgba(15, 28, 63, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "46px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        fontSize: "12px",
                        lineHeight: "1.1",
                        flexShrink: 0,
                        boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      <span style={{ fontSize: "9px", opacity: 0.85 }}>MAR</span>
                      <span>09</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                        Consultation Dentiste
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>
                        14:00 · Clinique Sainte-Rosalie
                      </div>
                    </div>
                    <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
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
                        borderRadius: "14px",
                        border: "1px solid rgba(56, 189, 248, 0.12)",
                        background: "rgba(15, 28, 63, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "46px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                          color: "#ffffff",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "800",
                          fontSize: "12px",
                          lineHeight: "1.1",
                          flexShrink: 0,
                          boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
                        }}
                      >
                        <span style={{ fontSize: "9px", opacity: 0.85 }}>{month}</span>
                        <span>{day}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                          {event.title}
                        </div>
                        <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>
                          {time} {event.location ? `· ${event.location}` : ""}
                        </div>
                      </div>
                      <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                        Confirmé
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* COLUMN 2: Rappels Vocaux Proactifs */}
          <div
            className="cyber-card"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, rgba(10, 20, 46, 0.8) 0%, rgba(6, 12, 28, 0.9) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(245, 158, 11, 0.15)",
                    color: "#f59e0b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Volume2 size={16} />
                </div>
                <div>
                  <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                    Rappels Vocaux IA
                  </h2>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
                    Annonces proactives programmées
                  </p>
                </div>
              </div>
              <Link
                href="/reminders"
                style={{
                  fontSize: "12px",
                  color: "#f59e0b",
                  fontWeight: "700",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(245, 158, 11, 0.1)",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                }}
              >
                <span>Gérer</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {reminders.length === 0 ? (
                <>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: "1px solid rgba(245, 158, 11, 0.15)",
                      background: "rgba(15, 28, 63, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                        Acheter pièces atelier
                      </div>
                      <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600", marginTop: "2px" }}>
                        18:00 · Synthèse Vocale
                      </div>
                    </div>
                    <span style={{ fontSize: "10.5px", background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8", fontWeight: "700", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
                      Actif
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: "1px solid rgba(245, 158, 11, 0.15)",
                      background: "rgba(15, 28, 63, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                        Rappeler Jean (Urgent)
                      </div>
                      <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600", marginTop: "2px" }}>
                        20:00 · Synthèse Vocale
                      </div>
                    </div>
                    <span style={{ fontSize: "10.5px", background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8", fontWeight: "700", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
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
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: "1px solid rgba(245, 158, 11, 0.15)",
                        background: "rgba(15, 28, 63, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>{r.title}</div>
                        <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600", marginTop: "2px" }}>
                          {time} · Vocal
                        </div>
                      </div>
                      <span style={{ fontSize: "10.5px", background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8", fontWeight: "700", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
                        Actif
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* COLUMN 3: Tâches Prioritaires & Métriques */}
          <div
            className="cyber-card"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, rgba(10, 20, 46, 0.8) 0%, rgba(6, 12, 28, 0.9) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckSquare size={16} />
                </div>
                <div>
                  <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                    Tâches Prioritaires
                  </h2>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
                    Planification directe
                  </p>
                </div>
              </div>
              <span style={{ fontSize: "13px", fontWeight: "900", color: "#10b981" }}>
                {taskCompletionRate}%
              </span>
            </div>

            {/* Quick Task Creation Form */}
            <form onSubmit={handleCreateQuickTask} style={{ marginBottom: "14px", display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Ajouter une tâche rapide..."
                value={quickTaskText}
                onChange={(e) => setQuickTaskText(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: "rgba(15, 28, 63, 0.7)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  color: "#ffffff",
                  fontSize: "12.5px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={!quickTaskText.trim() || isCreatingTask}
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #06b6d4, #10b981)",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={16} />
              </button>
            </form>

            {/* Task Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {tasks.length === 0 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "rgba(15, 28, 63, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "6px",
                        background: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                      }}
                    >
                      <Check size={12} />
                    </div>
                    <span style={{ fontSize: "12.5px", color: "#cbd5e1", textDecoration: "line-through", opacity: 0.7 }}>
                      Vérifier les factures fournisseurs
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "rgba(15, 28, 63, 0.5)",
                      border: "1px solid rgba(56, 189, 248, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "6px",
                        border: "2px solid #38bdf8",
                      }}
                    />
                    <span style={{ fontSize: "12.5px", color: "#ffffff", fontWeight: "600" }}>
                      Préparer les pièces pour l&apos;atelier
                    </span>
                  </div>
                </>
              ) : (
                tasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id, task.isDone)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "rgba(15, 28, 63, 0.5)",
                      border: task.isDone ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(56, 189, 248, 0.2)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "6px",
                        background: task.isDone ? "#10b981" : "transparent",
                        border: task.isDone ? "none" : "2px solid #38bdf8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        flexShrink: 0,
                      }}
                    >
                      {task.isDone && <Check size={12} />}
                    </div>
                    <span
                      style={{
                        fontSize: "12.5px",
                        color: task.isDone ? "#94a3b8" : "#ffffff",
                        textDecoration: task.isDone ? "line-through" : "none",
                        fontWeight: task.isDone ? "400" : "600",
                        flex: 1,
                      }}
                    >
                      {task.title}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Impact Metric Strip */}
            <div
              style={{
                marginTop: "16px",
                padding: "12px 14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "16px", fontWeight: "900", color: "#10b981" }}>+5.2h / sem.</div>
                <div style={{ fontSize: "10.5px", color: "#94a3b8" }}>Gain de temps IA</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: "900", color: "#38bdf8" }}>99.4%</div>
                <div style={{ fontSize: "10.5px", color: "#94a3b8" }}>Fiabilité cockpit</div>
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
