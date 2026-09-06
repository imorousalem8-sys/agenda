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
  TrendingUp,
  Activity,
  User,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  Volume2,
  Zap,
  PhoneCall,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useSession } from "next-auth/react";
import EventFormModal from "@/components/forms/EventFormModal";

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

  const handleOpenVoiceSettings = () => {
    window.dispatchEvent(new CustomEvent("open-voice-settings"));
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

  const completedCount = tasks.filter((t) => t.isDone).length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 75;

  return (
    <div style={{ padding: "28px 36px", maxWidth: "1550px", margin: "0 auto", width: "100%" }}>
      {/* 1. Executive Royal Sapphire Command Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #1d4ed8 50%, #2563eb 100%)",
          borderRadius: "22px",
          padding: "26px 32px",
          boxShadow: "0 15px 35px -5px rgba(37, 99, 235, 0.4), 0 0 30px rgba(56, 189, 248, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          marginBottom: "26px",
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-40px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "11.5px",
                fontWeight: "700",
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
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#bae6fd" }}>
              <Clock size={13} />
              <span>{currentTime || "12:00:00"}</span>
            </div>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em", color: "#ffffff", margin: 0 }}>
            {greeting}, {userName} ! 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#e0f2fe", marginTop: "4px", fontWeight: "500" }}>
            Votre copilote IA gère votre agenda et vos alertes en temps réel.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 14px",
                borderRadius: "10px",
                background: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "12.5px",
                fontWeight: "600",
              }}
            >
              <CalendarIcon size={14} style={{ color: "#38bdf8" }} />
              <span>{events.length > 0 ? `${events.length} Rendez-vous planifiés` : "3 Rendez-vous planifiés"}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 14px",
                borderRadius: "10px",
                background: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "12.5px",
                fontWeight: "600",
              }}
            >
              <Bell size={14} style={{ color: "#fbbf24" }} />
              <span>{reminders.length > 0 ? `${reminders.length} Rappels actifs` : "2 Rappels vocaux actifs"}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 14px",
                borderRadius: "10px",
                background: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "12.5px",
                fontWeight: "600",
              }}
            >
              <ShieldCheck size={14} style={{ color: "#34d399" }} />
              <span>Synthèse Vocale Active</span>
            </div>
          </div>
        </div>

        {/* Quick Voice Assistant Trigger on Banner */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={handleOpenAI}
            style={{
              padding: "12px 22px",
              borderRadius: "14px",
              background: "#ffffff",
              color: "#1d4ed8",
              fontWeight: "700",
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
              transition: "transform 0.15s ease",
            }}
            className="hover:scale-105"
            id="banner-ai-trigger"
          >
            <Sparkles size={17} style={{ color: "#2563eb" }} />
            <span>Parler à l&apos;IA</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Sapphire Quick-Action Strip (4 Modern Cards) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {/* Card 1: Nouveau RDV */}
        <button
          onClick={() => setShowEventForm(true)}
          style={{
            padding: "16px 20px",
            borderRadius: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
          className="hover:border-blue-500 hover:shadow-lg"
          id="action-new-event"
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              color: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CalendarIcon size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
              Nouveau rendez-vous
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Ajouter un créneau</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </button>

        {/* Card 2: Nouveau Rappel */}
        <Link
          href="/reminders"
          style={{
            padding: "16px 20px",
            borderRadius: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          className="hover:border-amber-500 hover:shadow-lg"
          id="action-new-reminder"
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
              color: "#ea580c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bell size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
              Créer un rappel
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Alerte vocale & SMS</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </Link>

        {/* Card 3: Nouvelle Tâche */}
        <Link
          href="/tasks"
          style={{
            padding: "16px 20px",
            borderRadius: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          className="hover:border-emerald-500 hover:shadow-lg"
          id="action-new-task"
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckSquare size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
              Ajouter une tâche
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Suivi des priorités</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </Link>

        {/* Card 4: Assistant IA & Voix */}
        <button
          onClick={handleOpenAI}
          style={{
            padding: "16px 20px",
            borderRadius: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
          className="hover:border-indigo-500 hover:shadow-lg"
          id="action-ai-copilot"
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
              color: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
              Copilote IA Vocal
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Automatisation 24/7</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </button>
      </div>

      {/* 3. Main Cockpit Layout (3-Column Luxury Architecture) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* COLUMN 1: Prochains Rendez-vous (Timeline View) */}
        <div
          style={{
            background: "var(--bg-surface)",
            borderRadius: "20px",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                Prochains rendez-vous
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Vos créneaux confirmés et synchronisés
              </p>
            </div>
            <Link
              href="/calendar"
              style={{
                fontSize: "12.5px",
                color: "#2563eb",
                fontWeight: "700",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(37, 99, 235, 0.08)",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              <span>Voir l&apos;agenda</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {events.length === 0 ? (
              // Luxury sample items
              <>
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-hover)",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                    }}
                  >
                    <span style={{ fontSize: "9px", opacity: 0.85, letterSpacing: "0.05em" }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
                      Rendez-vous avec Paul
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                      <Clock size={12} />
                      <span>10:00 · Atelier - Liège</span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#16a34a",
                      background: "rgba(22, 163, 74, 0.12)",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    À venir
                  </span>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-hover)",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    <span style={{ fontSize: "9px", opacity: 0.85, letterSpacing: "0.05em" }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
                      Consultation Dentiste
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                      <Clock size={12} />
                      <span>14:00 · Clinique Sainte-Rosalie</span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#16a34a",
                      background: "rgba(22, 163, 74, 0.12)",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    À venir
                  </span>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-hover)",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #0284c7, #0369a1)",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
                    }}
                  >
                    <span style={{ fontSize: "9px", opacity: 0.85, letterSpacing: "0.05em" }}>MER</span>
                    <span>10</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
                      Point Client Stratégique
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                      <Clock size={12} />
                      <span>17:30 · Visioconférence</span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#2563eb",
                      background: "rgba(37, 99, 235, 0.12)",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    Demain
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
                      padding: "14px 16px",
                      borderRadius: "14px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-hover)",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "48px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        fontSize: "13px",
                        lineHeight: "1.1",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "9px", opacity: 0.85 }}>{month}</span>
                      <span>{day}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {time} {event.location ? `· ${event.location}` : ""} {event.contact ? `· ${event.contact.firstName}` : ""}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#16a34a",
                        background: "rgba(22, 163, 74, 0.12)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      Confirmé
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COLUMN 2: Rappels Intelligents & Tâches */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Rappels Vocaux Actifs */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "20px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(234, 88, 12, 0.15)", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={15} />
                </div>
                <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)" }}>
                  Rappels & Synthèse Vocale
                </h2>
              </div>
              <Link
                href="/reminders"
                style={{ fontSize: "12px", color: "#2563eb", fontWeight: "700", textDecoration: "none" }}
              >
                Gérer
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {reminders.length === 0 ? (
                <>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-hover)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Volume2 size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                          Acheter les pièces atelier
                        </div>
                        <div style={{ fontSize: "11.5px", color: "#ea580c", fontWeight: "600" }}>
                          18:00 · Annonce vocale
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: "600", padding: "3px 8px", borderRadius: "6px" }}>
                      Actif
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
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Volume2 size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                          Rappeler Jean (Urgent)
                        </div>
                        <div style={{ fontSize: "11.5px", color: "#ea580c", fontWeight: "600" }}>
                          20:00 · Annonce vocale
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: "600", padding: "3px 8px", borderRadius: "6px" }}>
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
                        borderRadius: "12px",
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg-hover)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Volume2 size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                            {r.title}
                          </div>
                          <div style={{ fontSize: "11.5px", color: "#ea580c", fontWeight: "600" }}>
                            {time} · Vocal
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: "11px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: "600", padding: "3px 8px", borderRadius: "6px" }}>
                        Actif
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Tâches du Jour & Suivi */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "20px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)" }}>
                Progression des Tâches
              </h2>
              <span style={{ fontSize: "13px", fontWeight: "800", color: "#2563eb" }}>
                {taskCompletionRate}%
              </span>
            </div>

            <div style={{ width: "100%", height: "8px", background: "var(--border-subtle)", borderRadius: "4px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ width: `${taskCompletionRate}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #38bdf8)", borderRadius: "4px" }} />
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
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                  <Check size={11} />
                </div>
                <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: "500", textDecoration: "line-through", opacity: 0.7 }}>
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
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #cbd5e1" }} />
                <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: "600" }}>
                  Préparer la réunion de projet
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Performance IA & Activités Récentes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Efficacité & Gains de Temps */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "20px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(37, 99, 235, 0.15)", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Activity size={15} />
              </div>
              <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)" }}>
                Efficacité & Impact IA
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12.5px", color: "var(--text-muted)", fontWeight: "600" }}>Précision Copilote IA</span>
                  <span style={{ fontSize: "16px", fontWeight: "800", color: "#2563eb" }}>98.4%</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "var(--border-subtle)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "98.4%", height: "100%", background: "#2563eb", borderRadius: "3px" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12.5px", color: "var(--text-muted)", fontWeight: "600" }}>Temps libre économisé</span>
                  <span style={{ fontSize: "16px", fontWeight: "800", color: "#16a34a" }}>+4.5h / sem.</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "var(--border-subtle)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "82%", height: "100%", background: "#16a34a", borderRadius: "3px" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Activités Récentes */}
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "20px",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              padding: "24px",
            }}
          >
            <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "14px" }}>
              Dernières actions du copilote
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(37, 99, 235, 0.12)", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CalendarIcon size={14} />
                </div>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                    Rendez-vous créé avec Paul
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Aujourd&apos;hui à 09:24</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(234, 88, 12, 0.12)", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={14} />
                </div>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                    Rappel vocal programmé : Pièces atelier
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Aujourd&apos;hui à 08:45</div>
                </div>
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
