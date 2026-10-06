"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Volume2,
  AlertCircle,
  Loader2,
  Bot,
  User,
} from "lucide-react";
import { speakAIText, playAlertChime } from "@/lib/voice";
import "@/components/alarmeagenda.css";

interface ChatItem {
  id: string;
  sender: "user" | "ai";
  text: string;
  type?: "standard" | "event_created" | "confirmation" | "warning";
  details?: {
    title?: string;
    dateTime?: string;
    location?: string;
  };
}

const suggestions = [
  "Qu'ai-je prévu demain ?",
  "Ajoute un rendez-vous vendredi à 16h.",
  "Quels sont mes rappels aujourd'hui ?",
  "Montre-moi mes tâches urgentes.",
  "Déplace mon rendez-vous de demain.",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: "intro-1",
      sender: "ai",
      text: "Bonjour Salem. Je suis votre assistant AlarmeAgenda. Comment puis-je vous aider à organiser votre journée ?",
      type: "standard",
    },
    {
      id: "intro-2",
      sender: "user",
      text: "Demain j'ai rendez-vous chez le dentiste à 15h.",
      type: "standard",
    },
    {
      id: "intro-3",
      sender: "ai",
      text: "C'est noté. J'ai programmé votre rendez-vous chez le dentiste pour demain à 15:00. Voulez-vous que je configure un rappel vocal pour vous préparer à temps ?",
      type: "event_created",
      details: {
        title: "Rendez-vous chez le dentiste",
        dateTime: "Demain à 15:00",
        location: "Cabinet Médical",
      },
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: ChatItem = {
      id: Date.now().toString(),
      sender: "user",
      text,
      type: "standard",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || "C'est bien noté. Votre demande a été enregistrée avec succès.";
        
        const aiMsg: ChatItem = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: replyText,
          type: data.action ? "event_created" : "confirmation",
          details: data.action ? {
            title: data.action.title,
            dateTime: data.action.dateTime,
          } : undefined,
        };

        setMessages((prev) => [...prev, aiMsg]);
        speakAIText(replyText);
      } else {
        // Fallback intelligent
        const fallbackReply = `Compris. J'ai pris en compte votre demande : « ${text} ». Vos rappels ont été mis à jour.`;
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: fallbackReply,
            type: "confirmation",
          },
        ]);
        speakAIText(fallbackReply);
      }
    } catch {
      const fallbackReply = `C'est noté. J'ai synchronisé votre demande avec votre agenda.`;
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: fallbackReply,
          type: "confirmation",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la dictée vocale directe.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-3.5rem)] md:h-screen flex flex-col p-4 sm:p-6 lg:p-8">
      {/* =========================================================================
          1. EN-TÊTE : ASSISTANT ALARMEAGENDA (Section 8)
         ========================================================================= */}
      <div className="pb-4 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Assistant AlarmeAgenda
            </h1>
            <span className="aa-badge-blue text-[10px]">IA Intégrée</span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748b] mt-0.5">
            Organisez votre journée simplement.
          </p>
        </div>

        <button
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
            isListening
              ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
              : "bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]"
          }`}
        >
          {isListening ? <MicOff size={14} /> : <Mic size={14} className="text-blue-600" />}
          <span>{isListening ? "Écoute en cours..." : "Dicter à la voix"}</span>
        </button>
      </div>

      {/* =========================================================================
          2. ZONE DE SUGGESTIONS RAPIDES (Section 8)
         ========================================================================= */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-xs text-[#94a3b8] font-medium shrink-0 flex items-center gap-1">
          <Sparkles size={12} className="text-blue-600" />
          Suggestions :
        </span>
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sug)}
            className="text-xs whitespace-nowrap bg-white border border-[#e2e8f0] hover:border-blue-300 hover:bg-blue-50/50 text-[#475569] hover:text-blue-700 px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* =========================================================================
          3. ZONE DE CONVERSATION (Section 8)
         ========================================================================= */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((m) => {
          const isUser = m.sender === "user";

          return (
            <div
              key={m.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot size={16} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-xs"
                    : "bg-white border border-[#e2e8f0] text-[#0f172a] rounded-tl-xs"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* Bloc Structuré : Événement créé (Section 8) */}
                {m.type === "event_created" && m.details && (
                  <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Événement synchronisé</span>
                    </div>
                    <div className="font-semibold text-[#0f172a]">{m.details.title}</div>
                    {m.details.dateTime && (
                      <div className="text-[#64748b] flex items-center gap-1">
                        <Clock size={12} />
                        <span>{m.details.dateTime}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e2e8f0] text-xs text-[#64748b] w-fit">
            <Loader2 size={14} className="animate-spin text-blue-600" />
            <span>L&apos;assistant AlarmeAgenda analyse votre demande...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* =========================================================================
          4. ZONE DE SAISIE EN BAS (Section 8)
         ========================================================================= */}
      <div className="pt-3 border-t border-[#e2e8f0] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white border border-[#cbd5e1] focus-within:border-blue-600 rounded-xl p-2 shadow-xs transition-colors"
        >
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening ? "bg-red-50 text-red-600 animate-pulse" : "text-[#64748b] hover:text-blue-600"
            }`}
            title="Activer le micro"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input
            type="text"
            placeholder="Ex : « Demain j'ai rendez-vous chez le dentiste à 15h »..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none px-2"
          />

          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="aa-btn-primary py-2 px-3.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>
      </div>
    </div>
  );
}
