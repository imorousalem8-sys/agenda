"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  Check,
  Clock,
  PhoneCall,
  Loader2,
  Volume2,
  Calendar,
  CheckSquare,
  ArrowRight,
  RefreshCw,
  User,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getStoredVoiceSettings, speakAIText } from "@/lib/voice";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  action?: {
    id?: string;
    type: "TASK" | "EVENT" | "REMINDER";
    title: string;
    notes: string;
    contactName?: string;
    dateTime: string;
    priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
    mode: "PERSONAL" | "PROFESSIONAL";
    category: string;
    destination?: "PC" | "PHONE_CALL" | "MOBILE_PUSH";
  } | null;
  saved?: boolean;
}

const quickPrompts = [
  "Mets-moi cette tâche demain à 14h avec Marc pour signer le devis",
  "Rappelle-moi d'appeler le médecin à 16h30",
  "Fais le point sur ma journée et mes tâches",
  "Rendez-vous chantier jeudi à 9h avec M. Dupont",
];

export default function AIAssistantWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Bonjour ! Je suis votre Agence & Copilote IA. Discutez avec moi ou dictez directement vos instructions (ex: *'Mets-moi cette tâche demain à 14h avec Marc'*). Je crée et programme vos activités instantanément.",
    },
  ]);

  const recognitionRef = useRef<unknown>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Listen to external toggle events
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-assistant", handleOpen);
    return () => window.removeEventListener("open-ai-assistant", handleOpen);
  }, []);

  // Speech Recognition initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = "fr-FR";
        recognition.continuous = false;
        recognition.interimResults = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setInputMessage(text);
          setIsListening(false);
          sendMessage(text);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("La reconnaissance vocale est disponible sur Google Chrome, Edge ou Safari.");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = recognitionRef.current as any;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setInputMessage("");
      recognition.start();
      setIsListening(true);
    }
  };

  const [activeTarget, setActiveTarget] = useState<{
    type: "EVENT" | "TASK" | "REMINDER";
    id: string;
    title: string;
    scheduledAt?: string;
  } | null>(null);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          activeTarget,
        }),
      });

      const data = await res.json();
      const aiReplyText = data.reply || "J'ai bien pris en compte votre demande.";

      if (data.activeTarget) {
        setActiveTarget(data.activeTarget);
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        action: data.action || null,
        saved: data.saved || false,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Speak back using chosen Voice TTS
      const settings = getStoredVoiceSettings();
      speakAIText(aiReplyText.replace(/\*\*/g, ""), { gender: settings.gender });

      // Trigger automatic UI refresh across all views
      window.dispatchEvent(new Event("task-updated"));
      window.dispatchEvent(new Event("reminder-updated"));
      window.dispatchEvent(new Event("event-updated"));
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: "Désolé, une erreur est survenue lors du traitement.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleTestVoice = () => {
    const settings = getStoredVoiceSettings();
    speakAIText("Bonjour ! Ceci est un test de ma voix d'assistant pour vos alertes et vos rappels.", {
      gender: settings.gender,
    });
  };

  if (pathname === "/agent") {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-widget-fab"
        aria-label="Ouvrir le Copilote IA"
        id="ai-assistant-fab"
      >
        <div className="ai-fab-glow" />
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={26} color="white" />
        </div>
        <span className="ai-fab-badge">IA PRO</span>
      </button>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="ai-drawer animate-scale-in">
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(13, 18, 30, 0.95), rgba(24, 32, 51, 0.95))",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
                }}
              >
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.01em" }}>
                  Agence & Copilote IA
                </h3>
                <p style={{ fontSize: "11px", color: "#34d399", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                  Prêt • Actions automatiques en direct
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <button
                onClick={handleTestVoice}
                className="btn btn-ghost btn-sm"
                style={{ padding: "6px", color: "#818cf8" }}
                title="Tester la voix"
              >
                <Volume2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: "6px" }}
                id="ai-assistant-close"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Quick Prompt Suggestion Bar */}
          <div
            style={{
              padding: "8px 12px",
              background: "rgba(0, 0, 0, 0.25)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputMessage(prompt);
                  sendMessage(prompt);
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
                className="quick-chip"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div
            style={{
              padding: "16px",
              height: "360px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "rgba(9, 13, 22, 0.95)",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  gap: "6px",
                }}
              >
                {/* Text Bubble */}
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "12px 16px",
                    borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.sender === "user"
                      ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                      : "rgba(24, 32, 51, 0.9)",
                    color: msg.sender === "user" ? "#ffffff" : "#f1f5f9",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    border: msg.sender === "ai" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.25)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>

                {/* Structured Action Execution Badge */}
                {msg.action && (
                  <div
                    className="animate-slide-up"
                    style={{
                      width: "90%",
                      background: "rgba(99, 102, 241, 0.08)",
                      border: "1px solid rgba(99, 102, 241, 0.35)",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span className="badge badge-glow-purple" style={{ fontSize: "10px" }}>
                        {msg.action.type === "TASK" ? "Tâche" : msg.action.type === "EVENT" ? "Rendez-vous" : "Rappel"}
                      </span>
                      <span style={{ fontSize: "10px", color: msg.action.priority === "URGENT" ? "#f87171" : "#818cf8", fontWeight: "700" }}>
                        {msg.action.priority === "URGENT" ? "⚠️ URGENT" : "PRIORITÉ NORMALE"}
                      </span>
                    </div>

                    <p style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>
                      {msg.action.title}
                    </p>

                    {msg.action.contactName && (
                      <p style={{ fontSize: "11px", color: "#38bdf8", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <User size={12} />
                        Contact : {msg.action.contactName}
                      </p>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#a5b4fc", marginBottom: "8px" }}>
                      <Clock size={12} />
                      {formatDate(msg.action.dateTime)}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontSize: "11px", fontWeight: "700" }}>
                      <Check size={14} />
                      Enregistré automatiquement en base de données !
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#94a3b8", fontSize: "12px", padding: "6px" }}>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite", color: "#6366f1" }} />
                <span>L&apos;IA réfléchit et exécute votre consigne...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid var(--border-subtle)",
              background: "var(--bg-secondary)",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ex: Mets cette tâche demain à 14h..."
                className="form-input"
                id="ai-chat-input"
                style={{ fontSize: "13px", padding: "10px 14px", borderRadius: "12px" }}
              />

              <button
                type="button"
                onClick={toggleListening}
                className={`btn btn-secondary ${isListening ? "listening-pulse" : ""}`}
                style={{
                  padding: "10px",
                  color: isListening ? "#ef4444" : "#818cf8",
                  borderColor: isListening ? "#ef4444" : undefined,
                  flexShrink: 0,
                  borderRadius: "12px",
                }}
                title={isListening ? "Arrêter le micro" : "Parler au micro"}
                id="ai-chat-mic"
              >
                {isListening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>

              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="btn btn-primary"
                style={{ padding: "10px 14px", flexShrink: 0, borderRadius: "12px" }}
                id="ai-chat-send"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .ai-widget-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #6366f1, #a855f7);
          border: 2px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9000;
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        .ai-widget-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.75);
        }
        .ai-fab-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 9px;
          font-weight: 900;
          padding: 2px 6px;
          border-radius: 10px;
          border: 2px solid #07090e;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          letter-spacing: 0.05em;
        }
        .ai-fab-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #6366f1, #ec4899);
          filter: blur(10px);
          opacity: 0.7;
          z-index: 0;
          animation: glowPulse 2.5s infinite;
        }
        .ai-drawer {
          position: fixed;
          bottom: 96px;
          right: 24px;
          width: calc(100vw - 32px);
          max-width: 440px;
          background: var(--bg-surface);
          border: 1px solid var(--border-accent);
          border-radius: 24px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.25);
          z-index: 9001;
          overflow: hidden;
        }
        .quick-chip:hover {
          background: rgba(99, 102, 241, 0.2) !important;
          color: #ffffff !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
        }
        .listening-pulse {
          animation: micPulse 1s infinite alternate;
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.85; }
        }
        @keyframes micPulse {
          0% { transform: scale(1); background: rgba(239,68,68,0.2); }
          100% { transform: scale(1.1); background: rgba(239,68,68,0.4); }
        }
      `}</style>
    </>
  );
}
