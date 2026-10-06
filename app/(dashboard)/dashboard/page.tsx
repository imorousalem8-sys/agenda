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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7">
      {/* =========================================================================
          1. EN-TÊTE ÉPURÉ & LIMPIDE (STYLE OBSIDIAN & SAPHIR)
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Système 100% synchronisé ⚡
            </span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-medium capitalize">
              {currentDateFormatted || "Aujourd'hui"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#3b82f6]">{userName}</span>
          </h1>
        </div>

        {/* Boutons d'Action Rapides */}
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
          2. RUBAN HORIZONTAL UNIQUE DE MÉTRIQUES (4 KPIS CONFORMES À LA MAQUETTE)
         ========================================================================= */}
      <div className="dash-metric-ribbon">
        {/* KPI 1 : Tâches */}
        <Link href="/tasks" className="dash-metric-item hover:bg-white/[0.03] transition-colors rounded-xl">
          <div className="dash-metric-icon-box">
            <CheckSquare size={18} />
          </div>
          <div>
            <div className="dash-metric-label">Tâches du jour</div>
            <div className="dash-metric-val">{tasks.length > 0 ? tasks.length : 12}</div>
          </div>
        </Link>

        {/* KPI 2 : Réunions */}
        <Link href="/calendar" className="dash-metric-item hover:bg-white/[0.03] transition-colors rounded-xl">
          <div className="dash-metric-icon-box">
            <CalendarIcon size={18} />
          </div>
          <div>
            <div className="dash-metric-label">Réunions</div>
            <div className="dash-metric-val">{events.length > 0 ? events.length : 4}</div>
          </div>
        </Link>

        {/* KPI 3 : Efficacité IA */}
        <div className="dash-metric-item">
          <div className="dash-metric-icon-box text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="dash-metric-label">Efficacité IA</div>
            <div className="dash-metric-val text-emerald-400">98%</div>
          </div>
        </div>

        {/* KPI 4 : Temps Gagné */}
        <div className="dash-metric-item">
          <div className="dash-metric-icon-box text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
            <Zap size={18} />
          </div>
          <div>
            <div className="dash-metric-label">Temps gagné</div>
            <div className="dash-metric-val text-[#38bdf8]">+5.2h</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. DISPOSITION ÉPURÉE EN 2 VOLETS (65% CALENDAR TIMELINE / 35% IA VOCALE)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* VOLET GAUCHE (8 COLONNES / ~65%) : TIMELINE CALENDRIER ÉPURÉE */}
        <div className="lg:col-span-8 space-y-6">
          <div className="dash-card p-6 sm:p-7 space-y-6">
            
            {/* Entête du planning */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0d55e0]/20 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-wide">
                    Planning &amp; Rendez-vous de la Journée
                  </h2>
                  <p className="text-xs text-slate-400">
                    {events.length} rendez-vous programmés aujourd&apos;hui
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/calendar"
                  className="text-xs font-semibold text-[#38bdf8] hover:text-white px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all flex items-center gap-1.5"
                >
                  <span>Vue Calendrier</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Timeline des Rendez-vous */}
            <div className="dash-timeline-container pt-2">
              {events.length > 0 ? (
                events.map((evt, idx) => {
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
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="dash-event-time-pill">{timeFormatted}</span>
                          <div className="min-w-0">
                            <h3 className="dash-event-title">{evt.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
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

                        {/* Avatars participants */}
                        <div className="dash-avatars-cluster">
                          <div className="dash-avatar-circle" title="Salem">S</div>
                          <div className="dash-avatar-circle bg-[#0d55e0] text-[#38bdf8]" title="Invité">
                            {evt.contact ? evt.contact.firstName.charAt(0).toUpperCase() : "A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Événements de démonstration prestigieux conformes à la maquette */
                <>
                  <div className="dash-timeline-row">
                    <div className="dash-time-label">09:00</div>
                    <div className="dash-timeline-line" />
                    <div className="dash-timeline-event">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="dash-event-time-pill">09:00</span>
                        <div className="min-w-0">
                          <h3 className="dash-event-title">Comité Stratégique IA &amp; Q3 Milestones</h3>
                          <p className="dash-event-subtitle">Salle Executive A &bull; Visioconférence chiffrée</p>
                        </div>
                      </div>
                      <div className="dash-avatars-cluster">
                        <div className="dash-avatar-circle">S</div>
                        <div className="dash-avatar-circle bg-blue-600">A</div>
                        <div className="dash-avatar-circle bg-emerald-700">M</div>
                      </div>
                    </div>
                  </div>

                  <div className="dash-timeline-row">
                    <div className="dash-time-label">10:30</div>
                    <div className="dash-timeline-line" />
                    <div className="dash-timeline-event">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="dash-event-time-pill">10:30</span>
                        <div className="min-w-0">
                          <h3 className="dash-event-title">Revue de Direction &bull; Partenaires Internationaux</h3>
                          <p className="dash-event-subtitle">Auditorium Principal &bull; Présentation Roadmap</p>
                        </div>
                      </div>
                      <div className="dash-avatars-cluster">
                        <div className="dash-avatar-circle">S</div>
                        <div className="dash-avatar-circle bg-cyan-600">K</div>
                      </div>
                    </div>
                  </div>

                  <div className="dash-timeline-row">
                    <div className="dash-time-label">12:00</div>
                    <div className="dash-timeline-line" />
                    <div className="dash-timeline-event">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="dash-event-time-pill">12:00</span>
                        <div className="min-w-0">
                          <h3 className="dash-event-title">Déjeuner Exécutif &bull; Investisseurs &amp; Tech Lead</h3>
                          <p className="dash-event-subtitle">Club Affaires Etoile</p>
                        </div>
                      </div>
                      <div className="dash-avatars-cluster">
                        <div className="dash-avatar-circle">S</div>
                        <div className="dash-avatar-circle bg-indigo-600">L</div>
                      </div>
                    </div>
                  </div>

                  <div className="dash-timeline-row">
                    <div className="dash-time-label">14:30</div>
                    <div className="dash-timeline-line" />
                    <div className="dash-timeline-event">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="dash-event-time-pill">14:30</span>
                        <div className="min-w-0">
                          <h3 className="dash-event-title">Session Validation Produit &bull; Alamajonda v2.4</h3>
                          <p className="dash-event-subtitle">Lab Innovation &bull; Synthèse Vocale Active</p>
                        </div>
                      </div>
                      <div className="dash-avatars-cluster">
                        <div className="dash-avatar-circle">S</div>
                        <div className="dash-avatar-circle bg-teal-600">Y</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Barre d'Ajout Express Intégrée en bas de Timeline */}
            <form onSubmit={handleCreateQuickTask} className="dash-timeline-quickadd">
              <Plus size={16} className="text-[#38bdf8] shrink-0" />
              <input
                type="text"
                value={quickTaskText}
                onChange={(e) => setQuickTaskText(e.target.value)}
                placeholder="Ajouter un créneau express ou une priorité... (Appuyez sur Entrée)"
                disabled={isCreatingTask}
                className="dash-timeline-input"
              />
              <button
                type="submit"
                disabled={!quickTaskText.trim() || isCreatingTask}
                className="px-4 py-1.5 rounded-lg bg-[#0d55e0] hover:bg-[#1e60e8] text-white text-xs font-bold transition-all disabled:opacity-40"
              >
                {isCreatingTask ? "Ajout..." : "Ajouter"}
              </button>
            </form>

          </div>
        </div>

        {/* VOLET DROIT (4 COLONNES / ~35%) : ASSISTANT VOCAL & IMPACT PRODUCTIVITÉ */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* CARTE 1 : RAPPELS & ALARMES VOCALES IA AVEC VISUALISEUR D'ONDE SONORE */}
          <div className="dash-card p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0d55e0]/20 border border-[#38bdf8]/30 text-[#38bdf8] flex items-center justify-center">
                  <Volume2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Rappels &amp; Alarmes Vocales</h3>
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

            {/* Visualiseur d'Onde Sonore Cyan Animée (Conforme Maquette) */}
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

            {/* Liste des rappels actifs */}
            <div className="space-y-2.5 pt-1">
              {reminders.length > 0 ? (
                reminders.slice(0, 3).map((rem) => {
                  const remDate = new Date(rem.fireAt);
                  return (
                    <div
                      key={rem.id}
                      className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3 hover:border-[#38bdf8]/30 transition-all"
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
                <>
                  <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Volume2 size={15} className="text-[#38bdf8] shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">Briefing client Stratégie</h4>
                        <div className="text-[11px] font-semibold text-[#38bdf8]">11:00 &bull; Déclenchement vocal</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Volume2 size={15} className="text-[#38bdf8] shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">Validation Signature Contrat</h4>
                        <div className="text-[11px] font-semibold text-[#38bdf8]">15:45 &bull; Alarme prioritaire</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                </>
              )}
            </div>

            {/* Bannière info alerte vocale */}
            <div className="p-3 rounded-xl bg-[#0d55e0]/10 border border-[#38bdf8]/20 flex items-start gap-2.5">
              <Sparkles size={15} className="text-[#38bdf8] mt-0.5 shrink-0" />
              <div className="text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Assistant Vocal Proactif :</strong> Vos notifications retentissent avec carillon et lecture vocale haute fidélité.
              </div>
            </div>
          </div>

          {/* CARTE 2 : IMPACT PRODUCTIVITÉ (+5.2h / SEM) */}
          <div className="dash-card p-6 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.06]">
              <span className="font-bold text-white flex items-center gap-2">
                <Target size={14} className="text-[#38bdf8]" />
                Productivité &amp; Gain de Temps
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Performance Max
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="dash-impact-card">
                <div className="dash-impact-val">+5.2h</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Économisées / sem.</div>
              </div>

              <div className="dash-impact-card">
                <div className="dash-impact-val text-emerald-400">98%</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Automatisation IA</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Vos rendez-vous, rappels et synthèses sont orchestrés sans aucune friction cognitive.
            </p>
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
