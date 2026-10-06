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
  MapPin,
  Volume2,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Target,
  Flame,
  CloudSun,
  Download,
  TrendingUp,
  Check,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  User,
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
  const [activeTab, setActiveTab] = useState<"calendar" | "tasks">("calendar");
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

    const handleOpenNewEvent = () => setShowEventForm(true);
    const handleTriggerBriefing = () => handlePlayDailyBriefing();

    window.addEventListener("open-new-event", handleOpenNewEvent);
    window.addEventListener("play-daily-briefing", handleTriggerBriefing);

    return () => {
      window.removeEventListener("task-updated", handleRefresh);
      window.removeEventListener("reminder-updated", handleRefresh);
      window.removeEventListener("event-updated", handleRefresh);
      window.removeEventListener("open-new-event", handleOpenNewEvent);
      window.removeEventListener("play-daily-briefing", handleTriggerBriefing);
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

    const eventCount = events.length || 0;
    const reminderCount = reminders.length || 0;
    const taskCount = tasks.length || 0;
    const briefingText = `${greeting} ${userName} ! Vous avez ${eventCount} rendez-vous programmés, ${reminderCount} rappels vocaux actifs et ${taskCount} tâches en attente. Tout est parfaitement synchronisé. Excellente journée à vous !`;

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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !currentStatus }),
      });
      loadDashboard();
    } catch (e) {
      console.error("Error toggling task:", e);
    }
  };

  const handleDismissReminder = async (id: string) => {
    try {
      await fetch(`/api/reminders/${id}/dismiss`, { method: "PUT" });
      loadDashboard();
    } catch (e) {
      console.error("Error dismissing reminder:", e);
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

  const doneTasksCount = tasks.filter((t) => t.isDone).length;
  const timeSavedHours = ((doneTasksCount * 0.5) + (events.length * 0.75)).toFixed(1);

  return (
    <div className="w-full px-6 sm:px-8 lg:px-10 py-8 space-y-8">
      {/* =========================================================================
          HEADER SUPÉRIEUR DU WORKSPACE (STYLE A : PLEINE LARGEUR & BORD À BORD)
         ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Système 100% synchronisé ⚡
            </span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-medium capitalize">
              {currentDateFormatted || "Aujourd'hui"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#3b82f6]">{userName}</span>
          </h1>
        </div>

        {/* Contrôles contextuels à droite */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayDailyBriefing}
            disabled={isPlayingBriefing}
            className="dash-btn-glass"
            title="Écouter le briefing vocal de la journée"
          >
            <Volume2 size={16} className={isPlayingBriefing ? "animate-bounce text-[#38bdf8]" : "text-[#38bdf8]"} />
            <span>{isPlayingBriefing ? "Lecture en cours..." : "Briefing Vocal"}</span>
          </button>

          <a
            href="/api/events/export"
            download="agenda-alamajonda.ics"
            className="dash-btn-glass hidden sm:inline-flex"
            title="Exporter l'agenda en .ICS"
          >
            <Download size={15} />
            <span>Export .ICS</span>
          </a>

          <button
            onClick={() => setShowEventForm(true)}
            className="dash-btn-primary"
            id="dash-new-event-btn"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Nouveau Rendez-vous</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          RANGÉE 1 DU STYLE A : CARTES KPI SUR UNE SEULE LIGNE HORIZONTALE
         ========================================================================= */}
      <div className="dash-metric-ribbon">
        {/* KPI 1 : Tâches à accomplir */}
        <Link href="/tasks" className="dash-metric-item">
          <div className="dash-metric-icon-box">
            <CheckSquare size={19} />
          </div>
          <div>
            <div className="dash-metric-label">Tâches à accomplir</div>
            <div className="dash-metric-val">{tasks.filter((t) => !t.isDone).length}</div>
          </div>
        </Link>

        {/* KPI 2 : Rendez-vous programmés */}
        <Link href="/calendar" className="dash-metric-item">
          <div className="dash-metric-icon-box">
            <CalendarIcon size={19} />
          </div>
          <div>
            <div className="dash-metric-label">Rendez-vous programmés</div>
            <div className="dash-metric-val">{events.length}</div>
          </div>
        </Link>

        {/* KPI 3 : Alarmes & Rappels vocaux */}
        <Link href="/reminders" className="dash-metric-item">
          <div className="dash-metric-icon-box text-amber-400 bg-amber-500/10 border-amber-500/20">
            <Bell size={19} />
          </div>
          <div>
            <div className="dash-metric-label">Alarmes vocales</div>
            <div className="dash-metric-val text-amber-400">{reminders.length}</div>
          </div>
        </Link>

        {/* KPI 4 : Temps gagné calculé */}
        <div className="dash-metric-item">
          <div className="dash-metric-icon-box text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
            <Zap size={19} />
          </div>
          <div>
            <div className="dash-metric-label">Temps économisé</div>
            <div className="dash-metric-val text-[#38bdf8]">+{timeSavedHours}h</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RANGÉE 2 DU STYLE A : SECTION CŒUR MÉTIER (65% AGENDA | 35% RAPPELS VOCAUX)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* VOLET GAUCHE (65% / 8 COLONNES) : AGENDA & PLANNING CHRONOLOGIQUE AÉRÉ */}
        <div className="lg:col-span-8 space-y-6">
          <div className="dash-card p-7 sm:p-8 space-y-6">
            
            {/* Entête de l'agenda */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0d55e0]/20 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Planning &amp; Rendez-vous de la Journée
                  </h2>
                  <p className="text-xs text-slate-400">
                    {events.length} créneau{events.length > 1 ? "x" : ""} synchronisé{events.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <Link
                href="/calendar"
                className="text-xs font-semibold text-[#38bdf8] hover:text-white px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all flex items-center gap-1.5"
              >
                <span>Vue Calendrier</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Timeline des Rendez-vous réels (Zéro faux rendez-vous) */}
            <div className="dash-timeline-container pt-2">
              {events.length > 0 ? (
                events.map((evt) => {
                  const eventDate = new Date(evt.startAt);
                  const timeFormatted = eventDate.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <div key={evt.id} className="dash-timeline-row">
                      <div className="dash-time-label">{timeFormatted}</div>
                      <div className="dash-timeline-line" />
                      
                      <div className="dash-timeline-event">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="dash-event-time-pill">{timeFormatted}</span>
                          <div className="min-w-0">
                            <h3 className="dash-event-title">{evt.title}</h3>
                            <div className="flex items-center gap-3.5 text-xs text-slate-400 mt-0.5">
                              {evt.location && (
                                <span className="flex items-center gap-1 truncate">
                                  <MapPin size={11} className="text-[#38bdf8] shrink-0" />
                                  {evt.location}
                                </span>
                              )}
                              {evt.contact && (
                                <span className="flex items-center gap-1 truncate">
                                  <User size={11} className="text-slate-400 shrink-0" />
                                  Avec {evt.contact.firstName} {evt.contact.lastName || ""}
                                </span>
                              )}
                              {!evt.location && !evt.contact && (
                                <span className="text-[11px] text-slate-500">Rendez-vous synchronisé</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="dash-avatars-cluster">
                          <div className="dash-avatar-circle" title="Salem">S</div>
                          <div className="dash-avatar-circle bg-[#0d55e0] text-[#38bdf8]" title="Participant">
                            {evt.contact ? evt.contact.firstName.charAt(0).toUpperCase() : "A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                /* État zéro authentique et spacieux */
                <div className="py-12 px-6 text-center rounded-2xl bg-white/[0.015] border border-white/[0.04]">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0d55e0]/15 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mb-3 shadow-[0_0_20px_rgba(13,85,224,0.2)]">
                    <CalendarIcon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-white">Aucun rendez-vous aujourd&apos;hui</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-5 max-w-md mx-auto leading-relaxed">
                    Votre journée est entièrement libre. Planifiez un créneau ou synchronisez vos calendriers en un instant.
                  </p>
                  <button
                    onClick={() => setShowEventForm(true)}
                    className="dash-btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={15} strokeWidth={2.5} />
                    <span>Planifier un rendez-vous</span>
                  </button>
                </div>
              )}
            </div>

            {/* Barre d'Ajout Express Intégrée en bas de Timeline */}
            <form onSubmit={handleCreateQuickTask} className="dash-timeline-quickadd">
              <Plus size={16} className="text-[#38bdf8] shrink-0" />
              <input
                type="text"
                value={quickTaskText}
                onChange={(e) => setQuickTaskText(e.target.value)}
                placeholder="Ajouter une priorité express ou un rappel... (Appuyez sur Entrée)"
                disabled={isCreatingTask}
                className="dash-timeline-input"
              />
              <button
                type="submit"
                disabled={!quickTaskText.trim() || isCreatingTask}
                className="px-4 py-2 rounded-xl bg-[#0d55e0] hover:bg-[#1e60e8] text-white text-xs font-bold transition-all disabled:opacity-40"
              >
                {isCreatingTask ? "Ajout..." : "Ajouter"}
              </button>
            </form>

          </div>
        </div>

        {/* VOLET DROIT (35% / 4 COLONNES) : ALARMES & RAPPELS VOCAUX */}
        <div className="lg:col-span-4 space-y-6">
          <div className="dash-card p-7 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0d55e0]/20 border border-[#38bdf8]/30 text-[#38bdf8] flex items-center justify-center">
                  <Volume2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Alarmes &amp; Rappels Vocaux</h3>
                  <p className="text-[11px] text-slate-400">Synthèse vocale en temps réel</p>
                </div>
              </div>

              <Link
                href="/reminders"
                className="text-xs font-semibold text-[#38bdf8] hover:text-white transition-colors"
              >
                Gérer
              </Link>
            </div>

            {/* Visualiseur d'Onde Sonore Cyan Animée */}
            <div className="dash-soundwave-container" title="Visualiseur audio vocal de l'assistant">
              {[...Array(26)].map((_, i) => (
                <div
                  key={i}
                  className="dash-soundwave-bar"
                  style={{
                    animationDelay: `${(i * 0.08) % 1.2}s`,
                    animationDuration: `${1.1 + (i % 5) * 0.25}s`,
                  }}
                />
              ))}
            </div>

            {/* Liste des rappels réels */}
            <div className="space-y-3 pt-1">
              {reminders.length > 0 ? (
                reminders.slice(0, 3).map((rem) => {
                  const remDate = new Date(rem.fireAt);
                  return (
                    <div
                      key={rem.id}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3 hover:border-[#38bdf8]/30 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Volume2 size={15} className="text-[#38bdf8] shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{rem.title}</h4>
                          <div className="text-[11px] font-semibold text-[#38bdf8]">
                            {remDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDismissReminder(rem.id)}
                        className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                        title="Acquitter"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-7 px-4 text-center rounded-xl bg-white/[0.015] border border-white/[0.04]">
                  <Volume2 size={22} className="mx-auto text-slate-500 mb-2 opacity-60" />
                  <p className="text-xs font-bold text-white">0 alarme active</p>
                  <p className="text-[11px] text-slate-400 mt-1 mb-4 leading-relaxed">
                    Vos alarmes vocales sonneront automatiquement à l&apos;heure dite.
                  </p>
                  <Link href="/reminders" className="dash-btn-glass text-xs inline-flex items-center gap-1.5 py-1.5 px-3">
                    <Plus size={13} />
                    <span>Créer une alarme</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Bannière info alerte vocale */}
            <div className="p-3.5 rounded-xl bg-[#0d55e0]/10 border border-[#38bdf8]/20 flex items-start gap-2.5">
              <Sparkles size={15} className="text-[#38bdf8] mt-0.5 shrink-0" />
              <div className="text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Synthèse Proactive :</strong> Votre navigateur émet un carillon puis dicte vos alertes à haute voix.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          RANGÉE 3 DU STYLE A : DONNÉES & ACTIVITÉ (65% TÂCHES | 35% IMPACT PRODUCTIVITÉ)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* VOLET GAUCHE (65% / 8 COLONNES) : TABLE DE GESTION DES PRIORITÉS & TÂCHES */}
        <div className="lg:col-span-8 space-y-6">
          <div className="dash-card p-7 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0d55e0]/20 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                  <CheckSquare size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Tâches &amp; Priorités d&apos;Exécution
                  </h3>
                  <p className="text-xs text-slate-400">
                    {tasks.filter((t) => !t.isDone).length} tâche{tasks.filter((t) => !t.isDone).length > 1 ? "s" : ""} en cours
                  </p>
                </div>
              </div>

              <Link
                href="/tasks"
                className="text-xs font-semibold text-[#38bdf8] hover:text-white px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all flex items-center gap-1.5"
              >
                <span>Toutes les tâches</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Liste structurée des tâches avec case à cocher */}
            <div className="space-y-3">
              {tasks.length > 0 ? (
                tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id, task.isDone)}
                    className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#38bdf8]/30 transition-all flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                          task.isDone
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-slate-500 hover:border-[#38bdf8]"
                        }`}
                      >
                        {task.isDone && <Check size={12} strokeWidth={3} />}
                      </div>

                      <span
                        className={`text-sm font-medium truncate ${
                          task.isDone
                            ? "line-through text-slate-500"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {task.priority === "URGENT" && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          URGENT
                        </span>
                      )}
                      {task.priority === "HIGH" && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          PRIORITAIRE
                        </span>
                      )}
                      {task.priority !== "URGENT" && task.priority !== "HIGH" && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                          STANDARD
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <CheckCircle2 size={24} className="mx-auto text-emerald-400 mb-2 opacity-80" />
                  <p className="text-xs font-bold text-white">Toutes les tâches sont accomplies</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Ajoutez une nouvelle tâche via la barre rapide ci-dessus.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VOLET DROIT (35% / 4 COLONNES) : IMPACT PRODUCTIVITÉ & COPILOTE EXPRESS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="dash-card p-7 space-y-5">
            <div className="flex items-center justify-between text-xs pb-3.5 border-b border-white/[0.06]">
              <span className="font-bold text-white flex items-center gap-2">
                <Target size={14} className="text-[#38bdf8]" />
                Productivité &amp; Réalisation
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Temps Réel
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="dash-impact-card">
                <div className="dash-impact-val">+{timeSavedHours}h</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Économisées</div>
              </div>

              <div className="dash-impact-card">
                <div className="dash-impact-val text-emerald-400">
                  {tasks.length > 0 ? `${Math.round((doneTasksCount / tasks.length) * 100)}%` : "100%"}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Taux complétion</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/agent"
                className="w-full p-3.5 rounded-xl bg-[#0d55e0]/20 hover:bg-[#0d55e0]/30 border border-[#38bdf8]/30 flex items-center justify-between gap-3 text-xs font-bold text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-[#38bdf8]" />
                  <span>Ouvrir le Copilote IA</span>
                </div>
                <ArrowRight size={14} className="text-[#38bdf8] group-hover:translate-x-1 transition-transform" />
              </Link>
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
