"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  MicOff,
  Send,
  Calendar,
  Bell,
  CheckSquare,
  Compass,
  Clock,
  Loader2,
  Volume2,
  VolumeX,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { speakAIText } from "@/lib/voice";
import VoiceRecordingBubble from "@/components/ai/VoiceRecordingBubble";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  action?: {
    id?: string;
    type: "TASK" | "EVENT" | "REMINDER" | "CONTACT" | "INFO" | "DELETE_CONFIRM";
    title: string;
    notes?: string;
    dateTime?: string;
    category?: string;
  } | null;
  saved?: boolean;
}

// 5 Fonctions clés dans un ordre précis, exactement comme sur la maquette de référence
const quickPills = [
  {
    id: "event",
    label: "Planifier un rendez-vous",
    prompt: "Prends rendez-vous demain à 14h avec Paul pour faire le point",
    icon: Calendar,
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.15)",
    border: "rgba(52, 211, 153, 0.35)",
  },
  {
    id: "reminder",
    label: "Programmer une alarme",
    prompt: "Rappelle-moi à 18h de vérifier les livrables du projet",
    icon: Bell,
    color: "#f87171",
    bg: "rgba(248, 113, 113, 0.15)",
    border: "rgba(248, 113, 113, 0.35)",
  },
  {
    id: "task",
    label: "Créer une tâche",
    prompt: "Ajoute une tâche prioritaire : Finaliser la proposition client avant vendredi",
    icon: CheckSquare,
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.15)",
    border: "rgba(96, 165, 250, 0.35)",
  },
  {
    id: "slots",
    label: "Consulter l'agenda",
    prompt: "Quels sont mes rendez-vous et créneaux prévus pour aujourd'hui et demain ?",
    icon: Clock,
    color: "#c084fc",
    bg: "rgba(192, 132, 252, 0.15)",
    border: "rgba(192, 132, 252, 0.35)",
  },
  {
    id: "optimize",
    label: "Optimiser ma journée",
    prompt: "Analyse mon planning d'aujourd'hui et propose-moi une organisation optimisée",
    icon: Compass,
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.35)",
  },
];

export default function AgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [inputMessage, setInputMessage] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Reconnaissance vocale Web Speech API avec envoi automatique sur silence
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "fr-FR";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let currentText = "";
          for (let i = 0; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          const trimmed = currentText.trim();
          setLiveTranscript(trimmed);
          setInputMessage(trimmed);

          // Réinitialiser le timer de silence
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Détection automatique de pause de parole -> Envoi automatique sans cliquer !
          if (trimmed.length > 2) {
            const isFinal = event.results[event.results.length - 1]?.isFinal;
            const delay = isFinal ? 900 : 1400;

            silenceTimerRef.current = setTimeout(() => {
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.stop();
                } catch {
                  // ignore
                }
              }
              setIsListening(false);
              handleSendMessage(trimmed);
            }, delay);
          }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert("La reconnaissance vocale nécessite Google Chrome, Edge ou Safari.");
      return;
    }
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    setLiveTranscript("");
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const cancelListening = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setLiveTranscript("");
    setInputMessage("");
  }, []);

  const handleOpenMenu = () => {
    window.dispatchEvent(new CustomEvent("open-dashboard-menu"));
  };

  const handleResetConversation = () => {
    if (!confirm("Réinitialiser le fil de discussion avec le Copilote ?")) return;
    setMessages([]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    if (isListening) {
      stopListening();
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLiveTranscript("");
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur assistant");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.reply,
          action: data.action,
          saved: data.saved,
        },
      ]);

      if (data.saved) {
        window.dispatchEvent(new Event("event-updated"));
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
      }

      if (voiceEnabled && data.spokenReply) {
        speakAIText(data.spokenReply);
      }
    } catch (err: unknown) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text:
            err instanceof Error
              ? err.message
              : "Une erreur est survenue lors de l'appel à l'assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#050811] text-white">
      {/* =========================================================================
          1. HEADER PRINCIPAL : ÉLITE EXÉCUTIVE & FINITIONS HAUT DE GAMME
         ========================================================================= */}
      <header className="px-6 lg:px-10 py-4 bg-[#070d1e]/90 backdrop-blur-2xl border-b border-white/[0.08] flex items-center justify-between gap-6 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Logo & Titre de Marque */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00d2ff] via-[#0d55e0] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_0_24px_rgba(56,189,248,0.55)] border border-[#38bdf8]/50 shrink-0">
            <Sparkles size={20} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="text-base lg:text-lg font-black text-white tracking-tight leading-tight">
                Copilote IA
              </h1>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#0d55e0]/30 text-[#38bdf8] border border-[#38bdf8]/35 tracking-wider uppercase">
                Pro
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block font-medium mt-0.5">
              Alamajonda • Orchestration Exécutive
            </span>
          </div>
        </div>

        {/* Centre : Badge Moteur En Ligne & Synchronisé */}
        <div className="hidden lg:flex items-center">
          <div className="h-9 px-4 rounded-full bg-emerald-950/40 text-emerald-400 text-xs font-bold border border-emerald-500/35 flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.18)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
            <span className="tracking-wide">Moteur En Ligne &amp; Synchronisé</span>
          </div>
        </div>

        {/* Contrôles Header : Mode Vocal Direct + Changer de section + Barre Audio + Reset */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Bouton Mode Vocal Direct Live (Dialogue Continu mains-libres) */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-voice-live-modal"))}
            className="h-9 px-3.5 rounded-xl bg-gradient-to-r from-[#0d55e0]/25 to-[#38bdf8]/15 hover:from-[#0d55e0]/40 hover:to-[#38bdf8]/30 border border-[#38bdf8]/40 hover:border-[#38bdf8]/70 text-[#38bdf8] hover:text-white text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            title="Lancer le dialogue vocal continu en direct (Siri / ChatGPT Voice Pro)"
          >
            <Radio size={15} className="animate-pulse text-[#38bdf8]" />
            <span className="hidden md:inline">Mode Vocal Direct</span>
          </button>

          {/* Bouton Sortir / Changer de section */}
          <button
            onClick={handleOpenMenu}
            className="h-9 px-3.5 rounded-xl bg-gradient-to-r from-white/[0.06] to-white/[0.03] hover:from-[#0d55e0]/30 hover:to-[#2563eb]/30 border border-white/[0.12] hover:border-[#38bdf8]/50 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            title="Ouvrir le menu pour sortir ou changer de section"
          >
            <LayoutGrid size={15} className="text-[#38bdf8]" />
            <span className="hidden sm:inline">Menu Navigation</span>
          </button>

          {/* Contrôle Volume Audio horizontal stylisé */}
          <div className="h-9 flex items-center gap-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-slate-400 hover:text-white transition-colors"
              title={voiceEnabled ? "Désactiver la voix" : "Activer la voix"}
            >
              {voiceEnabled ? <Volume2 size={16} className="text-[#38bdf8]" /> : <VolumeX size={16} />}
            </button>
            <div className="w-14 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  voiceEnabled ? "w-3/4 bg-gradient-to-r from-[#0d55e0] to-[#38bdf8]" : "w-0 bg-transparent"
                }`}
              />
            </div>
            <button
              onClick={isListening ? stopListening : startListening}
              className={`transition-colors ${isListening ? "text-rose-400" : "text-slate-400 hover:text-[#38bdf8]"}`}
              title="Dictée vocale"
            >
              <Mic size={15} />
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={handleResetConversation}
            className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-all"
            title="Réinitialiser la conversation"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. LE RUBAN DE COMMANDES HORIZONTAL : CAPSULES AGRANDIES & LUXE SAAS 2026
             (DIMENSIONS GÉNÉREUSES, DOUBLE HIÉRARCHIE TYPO, ZÉRO AMATEURISME)
         ========================================================================= */}
      <section className="px-6 lg:px-10 py-4 bg-[#060c1d]/95 backdrop-blur-xl border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-0.5">
          {quickPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                onClick={() => handleSendMessage(pill.prompt)}
                className="group flex-1 min-w-[225px] h-14 px-4.5 py-2.5 rounded-2xl bg-gradient-to-b from-[#0f1c3d]/90 to-[#091126]/95 hover:from-[#142654] hover:to-[#0d1a3a] border border-white/[0.1] hover:border-[#38bdf8]/55 flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_6px_22px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_28px_rgba(13,85,224,0.35)] shrink-0 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icône noble avec écrin en verre teinté */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 shadow-sm"
                    style={{
                      backgroundColor: pill.bg,
                      borderColor: pill.border,
                      color: pill.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Double niveau de texte : Titre en gras + Sous-titre explicatif */}
                  <div className="min-w-0">
                    <span className="text-[13px] font-bold text-white group-hover:text-[#38bdf8] transition-colors whitespace-nowrap block leading-tight">
                      {pill.label}
                    </span>
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors whitespace-nowrap block mt-0.5 font-medium leading-tight">
                      {pill.id === "event"
                        ? "Bloquer un créneau"
                        : pill.id === "reminder"
                        ? "Alerte parlée vocale"
                        : pill.id === "task"
                        ? "Flux d'action prioritaire"
                        : pill.id === "slots"
                        ? "Synthèse disponibilités"
                        : "Time-blocking IA"}
                    </span>
                  </div>
                </div>

                {/* Micro-indicateur d'action à droite */}
                <div className="w-6 h-6 rounded-lg bg-white/[0.04] group-hover:bg-[#0d55e0]/30 border border-transparent group-hover:border-[#38bdf8]/35 flex items-center justify-center text-slate-500 group-hover:text-[#38bdf8] transition-all shrink-0">
                  <ChevronDown size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. CANVAS CONVERSATIONNEL : SPACIEUX, PLEIN ÉCRAN & EXACT COMME LA MAQUETTE
         ========================================================================= */}
      <main className="flex-1 flex flex-col h-full bg-[#050811] overflow-hidden min-w-0">
        {/* Fil des messages au centre */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Orbe Lumineuse 3D du Copilote IA (Exactement comme sur la maquette) */}
                {m.sender === "ai" && (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00d2ff] via-[#0d55e0] to-[#051336] shadow-[0_0_25px_rgba(56,189,248,0.7),_inset_0_2px_4px_rgba(255,255,255,0.45)] border border-[#38bdf8]/40 flex items-center justify-center text-white shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-cyan-200/40 shadow-inner animate-pulse" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] px-6 py-4 rounded-3xl text-sm leading-relaxed transition-all shadow-xl ${
                    m.sender === "user"
                      ? "rounded-tr-xs bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white border border-[#38bdf8]/35 shadow-[0_8px_25px_rgba(29,78,216,0.35)]"
                      : "rounded-tl-xs bg-[#0b142c]/95 backdrop-blur-xl text-slate-100 border border-white/[0.09] shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-[13.5px] leading-relaxed font-normal">
                    {m.text}
                  </div>

                  {/* Carte d'Exécution Structurée en Direct */}
                  {m.action && (
                    <div className="mt-3.5 p-3.5 rounded-2xl bg-[#050a18] border border-[#38bdf8]/35 shadow-inner flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <CheckCircle2 size={15} className="text-emerald-400" />
                          <span>
                            {m.action.type === "EVENT"
                              ? "Rendez-vous planifié dans votre agenda"
                              : m.action.type === "TASK"
                              ? "Tâche prioritaire enregistrée"
                              : "Alarme vocale programmée"}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Synchronisé
                        </span>
                      </div>

                      <div className="text-sm font-bold text-[#38bdf8]">
                        {m.action.title}
                      </div>

                      {m.action.dateTime && (
                        <div className="text-xs text-slate-400">
                          Horaire : {new Date(m.action.dateTime).toLocaleString("fr-FR")}
                        </div>
                      )}

                      <div className="pt-2 mt-1 border-t border-white/[0.08] flex items-center gap-3">
                        <Link
                          href={m.action?.type === "TASK" ? "/tasks" : "/calendar"}
                          className="px-3 py-1.5 rounded-xl bg-[#0d55e0] hover:bg-[#1e60e8] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-[0_2px_10px_rgba(13,85,224,0.4)]"
                        >
                          <span>
                            {m.action.type === "TASK"
                              ? "Voir mes tâches"
                              : "Voir sur le calendrier"}
                          </span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0d55e0]/15 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-semibold w-fit backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <Loader2 size={16} className="animate-spin text-[#38bdf8]" />
                <span>Le Copilote IA analyse votre demande et synchronise vos données...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
        </div>

        {/* =========================================================================
            4. BARRE DE COMMANDE VOCALE BASSE : CENTRAGE ABSOLU À 50%
               L'ORBE VOCALE CYAN EST PARFAITEMENT AU MILIEU EXACT DE L'ÉCRAN
         ========================================================================= */}
        <footer className="w-full flex justify-center items-center p-4 sm:p-6 bg-gradient-to-t from-[#050811] via-[#050811]/95 to-transparent shrink-0">
          <div className="w-full max-w-3xl relative rounded-full bg-[#0b142c]/95 border border-white/[0.12] h-16 shadow-[0_12px_45px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
            {/* Moitié Gauche : Champ de Saisie Texte */}
            <div className="absolute left-6 right-[calc(50%+34px)] top-0 bottom-0 flex items-center">
              <input
                type="text"
                placeholder="Écrivez ou dictez votre demande..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none font-medium truncate"
              />
            </div>

            {/* EXACT AU CENTRE ABSOLU (50% GÉOMÉTRIQUE PARFAIT) : ORBE CYAN GLOWING */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`rounded-full flex items-center justify-center transition-all duration-300 transform cursor-pointer border ${
                  isListening
                    ? "bg-rose-500 text-white border-rose-300 animate-pulse shadow-[0_0_35px_rgba(244,63,94,0.85)] scale-110"
                    : "bg-gradient-to-tr from-[#00d2ff] via-[#38bdf8] to-[#0d55e0] text-white border-cyan-200/40 shadow-[0_0_30px_rgba(0,210,255,0.8),_0_0_14px_rgba(56,189,248,0.95)] hover:scale-108 active:scale-95"
                }`}
                style={{ width: "54px", height: "54px" }}
                title={isListening ? "Arrêter l'écoute" : "Activer la dictée vocale"}
              >
                {isListening ? <MicOff size={23} /> : <Mic size={23} />}
              </button>
            </div>

            {/* Moitié Droite : Indicateur Micro & Bouton Envoyer */}
            <div className="absolute left-[calc(50%+34px)] right-5 top-0 bottom-0 flex items-center justify-end gap-3 z-10">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-full transition-colors ${
                  isListening ? "text-rose-400" : "text-slate-400 hover:text-[#38bdf8]"
                }`}
                title="Microphone"
              >
                <Mic size={16} />
              </button>

              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputMessage.trim()}
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-[#0d55e0] text-slate-300 hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                title="Envoyer"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </footer>
      </main>

      <VoiceRecordingBubble
        isListening={isListening}
        transcript={liveTranscript}
        onStop={stopListening}
        onCancel={cancelListening}
      />
    </div>
  );
}
