"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Calendar,
  Bell,
  CheckSquare,
  Compass,
  Clock,
  Check,
  RefreshCw,
  Loader2,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
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

const quickPrompts = [
  {
    label: "Créer un rendez-vous",
    prompt: "Prends rendez-vous demain à 14h avec Paul",
    icon: Calendar,
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.3)",
  },
  {
    label: "Ajouter un rappel",
    prompt: "Rappelle-moi à 18h d'acheter les pièces pour le projet",
    icon: Bell,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.15)",
    border: "rgba(245, 158, 11, 0.3)",
  },
  {
    label: "Créer une tâche",
    prompt: "Ajoute une tâche prioritaire : Finaliser le dossier client avant vendredi",
    icon: CheckSquare,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.15)",
    border: "rgba(16, 185, 129, 0.3)",
  },
  {
    label: "Voir mes rendez-vous",
    prompt: "Quels sont mes rendez-vous prévus pour aujourd'hui et demain ?",
    icon: Clock,
    color: "#818cf8",
    bg: "rgba(129, 140, 248, 0.15)",
    border: "rgba(129, 140, 248, 0.3)",
  },
  {
    label: "Organiser ma journée",
    prompt: "Organise ma journée en optimisant mes créneaux et mes priorités",
    icon: Compass,
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.15)",
    border: "rgba(6, 182, 212, 0.3)",
  },
];

export default function AgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-init",
      sender: "ai",
      text: "Bonjour ! Je suis votre Copilote IA connecté à votre agenda, vos tâches et vos alarmes vocales. Que souhaitez-vous planifier ou organiser aujourd'hui ?",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
          setLiveTranscript(currentText);
          setInputMessage(currentText);
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
    setLiveTranscript("");
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      // ok
    }
    setIsListening(false);
    const text = liveTranscript.trim() || inputMessage.trim();
    if (text) {
      handleSendMessage(text);
      setLiveTranscript("");
    }
  }, [liveTranscript, inputMessage]);

  const cancelListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      // ok
    }
    setIsListening(false);
    setLiveTranscript("");
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].slice(-8).map((m) => ({
        role: (m.sender === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
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
          text: err instanceof Error ? err.message : "Une erreur est survenue lors de l'appel à l'assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-[calc(100vh-64px)] overflow-hidden"
      style={{
        backgroundColor: "#030712",
        backgroundImage:
          "radial-gradient(ellipse 1100px 700px at 20% 10%, rgba(13, 85, 224, 0.16) 0%, transparent 60%), radial-gradient(ellipse 900px 600px at 80% 90%, rgba(56, 189, 248, 0.12) 0%, transparent 55%)",
      }}
    >
      {/* =========================================================================
          1. EN-TÊTE PRINCIPAL : PLEINE LARGEUR & AÉRÉ
         ========================================================================= */}
      <header className="px-6 sm:px-8 py-4 bg-[#060e22]/90 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d55e0] to-[#38bdf8] text-white flex items-center justify-center shadow-[0_0_20px_rgba(13,85,224,0.45)] border border-[#38bdf8]/40 shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-wide truncate">
                Copilote IA Alamajonda
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                En ligne &amp; synchronisé
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              Assistant exécutif connecté à votre agenda, vos tâches et vos rappels vocaux
            </p>
          </div>
        </div>

        {/* Bouton Toggle Voix IA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              voiceEnabled
                ? "bg-[#0d55e0]/20 text-[#38bdf8] border-[#38bdf8]/35 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                : "bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white"
            }`}
            title={voiceEnabled ? "Désactiver la voix IA" : "Activer la voix IA"}
          >
            {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="hidden sm:inline">{voiceEnabled ? "Voix IA Active" : "Voix Coupée"}</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. BANDEAU DES ACTIONS RAPIDES : TOUTES SUR LA MÊME LIGNE AVEC PETIT ESPACE
         ========================================================================= */}
      <div className="px-6 sm:px-8 py-3 bg-[#060e22]/60 backdrop-blur-md border-b border-white/[0.06] shrink-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.prompt)}
                className="group p-2.5 sm:p-3 rounded-xl bg-[rgba(11,20,42,0.65)] hover:bg-[rgba(15,27,56,0.95)] border border-[rgba(56,189,248,0.14)] hover:border-[#38bdf8]/50 flex items-center gap-3 text-left transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: qp.bg,
                    borderColor: qp.border,
                    color: qp.color,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#38bdf8] transition-colors block truncate">
                    {qp.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    Déclencher l&apos;action
                  </span>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-[#38bdf8] transition-colors shrink-0 hidden lg:block" />
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3. ZONE DE CONVERSATION CENTRÉE & SPACIEUSE (PLEINE LARGEUR)
         ========================================================================= */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] px-5 py-4 rounded-2xl text-sm leading-relaxed transition-all ${
                  m.sender === "user"
                    ? "rounded-tr-xs bg-gradient-to-br from-[#0d55e0] via-[#1d4ed8] to-[#2563eb] text-white border border-[#38bdf8]/40 shadow-[0_8px_25px_rgba(13,85,224,0.35)]"
                    : "rounded-tl-xs bg-[#0b142a]/85 backdrop-blur-md text-white border border-white/[0.09] shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                }`}
              >
                {/* Badge Expéditeur */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      m.sender === "user" ? "text-cyan-200" : "text-[#38bdf8]"
                    }`}
                  >
                    {m.sender === "user" ? "Vous" : "Copilote IA"}
                  </span>
                </div>

                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* Carte de Confirmation d'Action Structurée */}
                {m.action && (
                  <div className="mt-3.5 p-3.5 rounded-xl bg-[#060c1e] border border-[#38bdf8]/30 shadow-inner">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        {m.action.type === "EVENT"
                          ? "📅 Rendez-vous planifié"
                          : m.action.type === "TASK"
                          ? "✅ Tâche enregistrée"
                          : "🔔 Alarme vocale programmée"}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-[#38bdf8] mt-1">
                      {m.action.title}
                    </div>

                    {m.action.dateTime && (
                      <div className="text-[11px] text-slate-400 mt-1">
                        Horaire : {new Date(m.action.dateTime).toLocaleString("fr-FR")}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/[0.06]">
                      <button
                        onClick={() =>
                          (window.location.href =
                            m.action?.type === "TASK" ? "/tasks" : "/calendar")
                        }
                        className="px-3 py-1.5 rounded-lg bg-[#0d55e0] hover:bg-[#1e60e8] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-[0_2px_10px_rgba(13,85,224,0.4)]"
                      >
                        <span>
                          {m.action.type === "TASK"
                            ? "Voir dans les tâches"
                            : "Voir dans le calendrier"}
                        </span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0d55e0]/15 border border-[#38bdf8]/25 text-[#38bdf8] text-xs font-medium w-fit backdrop-blur-md">
              <Loader2 size={15} className="animate-spin text-[#38bdf8]" />
              <span>Le Copilote IA analyse votre demande et synchronise vos données...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* =========================================================================
          4. BARRE DE SAISIE INFÉRIEURE : CENTRÉE & HAUT DE GAMME
         ========================================================================= */}
      <footer className="px-6 sm:px-8 py-4 bg-[#060e22]/95 backdrop-blur-xl border-t border-white/[0.08] shrink-0">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Bouton Microphone Vocal */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-xl border transition-all shrink-0 ${
              isListening
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.35)]"
                : "bg-white/[0.03] text-[#38bdf8] border-[#38bdf8]/30 hover:bg-[#0d55e0]/20 hover:border-[#38bdf8]/60"
            }`}
            title={isListening ? "Arrêter la dictée" : "Activer la dictée vocale"}
          >
            {isListening ? <MicOff size={19} /> : <Mic size={19} />}
          </button>

          {/* Champ de Texte */}
          <input
            type="text"
            placeholder="Écrivez votre message ou dictez votre demande à voix haute..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 bg-[#0b142a]/80 border border-white/[0.12] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
          />

          {/* Bouton Envoyer */}
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputMessage.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0d55e0] to-[#2563eb] hover:from-[#1e60e8] hover:to-[#38bdf8] text-white text-xs sm:text-sm font-bold border border-[#38bdf8]/40 transition-all flex items-center gap-2 shadow-[0_4px_18px_rgba(13,85,224,0.4)] disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send size={15} />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </div>
      </footer>

      <VoiceRecordingBubble
        isListening={isListening}
        transcript={liveTranscript}
        onStop={stopListening}
        onCancel={cancelListening}
      />
    </div>
  );
}
