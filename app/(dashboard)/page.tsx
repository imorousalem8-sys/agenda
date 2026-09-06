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
  const [greeting, setGreeting] = useState("Bonjour");

  const userName = session?.user?.name ? session.user.name.split(" ")[0] : "Salem";

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

  const handleOpenAI = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  const completedTasksCount = tasks.filter((t) => t.isDone).length;
  const totalTasksCount = Math.max(tasks.length, 5);

  return (
    <div style={{ padding: "28px 36px", maxWidth: "1500px", margin: "0 auto", width: "100%" }}>
      {/* 1. Top Royal Sapphire Hero Greeting Banner */}
      <div className="hero-banner">
        <div className="hero-left">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
              {greeting}, {userName} ! 👋
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.9)", fontWeight: "500" }}>
            Voici un aperçu de votre journée. Tout est sous contrôle !
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
            <div className="hero-stat-pill">
              <CalendarIcon size={15} style={{ color: "#93c5fd" }} />
              <span>{events.length > 0 ? `${events.length} Rendez-vous aujourd'hui` : "3 Rendez-vous planifiés"}</span>
            </div>
            <div className="hero-stat-pill">
              <Bell size={15} style={{ color: "#fde047" }} />
              <span>{reminders.length > 0 ? `${reminders.length} Rappels actifs` : "2 Rappels actifs"}</span>
            </div>
            <div className="hero-stat-pill">
              <CheckSquare size={15} style={{ color: "#86efac" }} />
              <span>{tasks.length > 0 ? `${tasks.length} Tâches en cours` : "5 Tâches en cours"}</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right", maxWidth: "340px" }} className="hidden lg:block">
          <div
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontSize: "12.5px",
              fontStyle: "italic",
              lineHeight: "1.4",
            }}
          >
            « Une bonne organisation aujourd&apos;hui, c&apos;est moins de stress demain. »
          </div>
        </div>
      </div>

      {/* 2. Quick Action Grid (4 polished action cards) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {/* Action 1: Nouveau rendez-vous */}
        <button
          onClick={() => setShowEventForm(true)}
          className="glass-card-interactive"
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#eff6ff",
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
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Nouveau rendez-vous</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Ajouter un créneau rapidement</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </button>

        {/* Action 2: Créer un rappel */}
        <Link
          href="/reminders"
          className="glass-card-interactive"
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "none",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#fff7ed",
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
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Créer un rappel</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Ne plus jamais oublier</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </Link>

        {/* Action 3: Ajouter une tâche */}
        <Link
          href="/tasks"
          className="glass-card-interactive"
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "none",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#f0fdf4",
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
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Ajouter une tâche</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Organiser votre travail</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </Link>

        {/* Action 4: Parler à l'IA */}
        <button
          onClick={handleOpenAI}
          className="glass-card-interactive"
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            textAlign: "left",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#faf5ff",
              color: "#9333ea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Parler à l&apos;IA</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Votre assistant intelligent</div>
          </div>
          <ArrowRight size={16} style={{ color: "#94a3b8" }} />
        </button>
      </div>

      {/* 3. Three-Column Main Layout (Non-overlapping, airy, high contrast) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* COLUMN 1: Prochains rendez-vous */}
        <div className="glass-card" style={{ padding: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Prochains rendez-vous</h2>
            <Link
              href="/calendar"
              style={{ fontSize: "13px", color: "#2563eb", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span>Voir tout</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {events.length === 0 ? (
              // Clean default structured events from mockup
              <>
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "46px",
                      borderRadius: "10px",
                      background: "#2563eb",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "10px", opacity: 0.85 }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Rendez-vous avec Paul</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>10:00 · Atelier - Liège</div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#16a34a",
                      background: "#dcfce7",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    À venir
                  </span>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "46px",
                      borderRadius: "10px",
                      background: "#4f46e5",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "10px", opacity: 0.85 }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Rendez-vous dentiste</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>14:00 · Clinique - Liège</div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#16a34a",
                      background: "#dcfce7",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    À venir
                  </span>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "46px",
                      borderRadius: "10px",
                      background: "#0284c7",
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "1.1",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "10px", opacity: 0.85 }}>MAR</span>
                    <span>09</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Rendez-vous client</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>17:30 · Bureau - Liège</div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#16a34a",
                      background: "#dcfce7",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
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
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "46px",
                        borderRadius: "10px",
                        background: "#2563eb",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "13px",
                        lineHeight: "1.1",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "10px", opacity: 0.85 }}>{month}</span>
                      <span>{day}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{event.title}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {time} {event.location ? `· ${event.location}` : ""} {event.contact ? `· ${event.contact.firstName}` : ""}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#16a34a",
                        background: "#dcfce7",
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      À venir
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COLUMN 2: Rappels du jour & Tâches en cours */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Rappels du jour */}
          <div className="glass-card" style={{ padding: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Rappels du jour</h2>
              <Link
                href="/reminders"
                style={{ fontSize: "13px", color: "#2563eb", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span>Voir tout</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {reminders.length === 0 ? (
                <>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Bell size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#0f172a" }}>Acheter les pièces</div>
                        <div style={{ fontSize: "11.5px", color: "#ea580c", fontWeight: "500" }}>18:00 · Priorité</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", background: "#f1f5f9", padding: "3px 8px", borderRadius: "6px", color: "#475569" }}>
                      Personnel
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Bell size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#0f172a" }}>Appeler Jean</div>
                        <div style={{ fontSize: "11.5px", color: "#ea580c", fontWeight: "500" }}>20:00 · Priorité</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", background: "#f1f5f9", padding: "3px 8px", borderRadius: "6px", color: "#475569" }}>
                      Personnel
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Bell size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#0f172a" }}>Vérifier facture</div>
                        <div style={{ fontSize: "11.5px", color: "#2563eb", fontWeight: "500" }}>16:30 · Normal</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", background: "#fef3c7", padding: "3px 8px", borderRadius: "6px", color: "#b45309" }}>
                      Travail
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
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        background: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Bell size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#0f172a" }}>{r.title}</div>
                          <div style={{ fontSize: "11.5px", color: "#ea580c", fontWeight: "500" }}>{time} · Vocal</div>
                        </div>
                      </div>
                      <span style={{ fontSize: "11px", background: "#f1f5f9", padding: "3px 8px", borderRadius: "6px", color: "#475569" }}>
                        Actif
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Tâches en cours (Mini progress card) */}
          <div className="glass-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Tâches en cours</div>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#2563eb" }}>5 / 8</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: "62.5%", height: "100%", background: "#2563eb", borderRadius: "4px" }} />
            </div>
          </div>
        </div>

        {/* COLUMN 3: Statistiques rapides & Activités */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Statistiques rapides */}
          <div className="glass-card" style={{ padding: "22px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
              Statistiques rapides
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Efficacité IA</span>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>85%</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "85%", height: "100%", background: "#2563eb", borderRadius: "3px" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Tâches complétées</span>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#16a34a" }}>100%</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "100%", height: "100%", background: "#16a34a", borderRadius: "3px" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Temps libre gagné</span>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#4f46e5" }}>+35%</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "70%", height: "100%", background: "#4f46e5", borderRadius: "3px" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Dernières activités */}
          <div className="glass-card" style={{ padding: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Dernières activités</h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Récents</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CalendarIcon size={14} />
                </div>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#0f172a" }}>Rendez-vous créé avec Paul</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>Aujourd&apos;hui à 09:24</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={14} />
                </div>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#0f172a" }}>Rappel ajouté : Acheter les pièces</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>Aujourd&apos;hui à 08:45</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#0f172a" }}>Tâche terminée : Vérifier facture</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>Hier à 18:32</div>
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
