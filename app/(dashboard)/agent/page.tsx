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
  { label: "Créer un rendez-vous", prompt: "Prends rendez-vous demain à 14h avec Paul", icon: Calendar, color: "#2563eb", bg: "#eff6ff" },
  { label: "Ajouter un rappel", prompt: "Rappelle-moi à 18h d'acheter les pièces", icon: Bell, color: "#ea580c", bg: "#fff7ed" },
  { label: "Voir mes rendez-vous", prompt: "Quels sont mes rendez-vous demain ?", icon: Clock, color: "#4f46e5", bg: "#eef2ff" },
  { label: "Organiser ma journée", prompt: "Organise ma journée de demain", icon: Compass, color: "#16a34a", bg: "#f0fdf4" },
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
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        height: "calc(100vh - 64px)",
        background: "#f8fafc",
        overflow: "hidden",
      }}
    >
      {/* 1. Main Chat Conversation Area */}
      <div style={{ display: "flex", flexDirection: "column", height: "100%", borderRight: "1px solid #e2e8f0" }}>
        {/* Chat Header */}
        <div
          style={{
            padding: "16px 28px",
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h1 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Assistant IA</h1>
              <p style={{ fontSize: "12px", color: "#64748b" }}>Votre assistant personnel intelligent</p>
            </div>
          </div>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: voiceEnabled ? "#eff6ff" : "#f1f5f9",
              border: "1px solid",
              borderColor: voiceEnabled ? "#bfdbfe" : "#e2e8f0",
              color: voiceEnabled ? "#2563eb" : "#64748b",
              fontSize: "12.5px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{voiceEnabled ? "Voix activée" : "Muet"}</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: m.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "14px 18px",
                  borderRadius: m.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background:
                    m.sender === "user"
                      ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                      : "#ffffff",
                  color: m.sender === "user" ? "#ffffff" : "#0f172a",
                  fontSize: "14px",
                  lineHeight: "1.55",
                  whiteSpace: "pre-wrap",
                  border: m.sender === "user" ? "none" : "1px solid #e2e8f0",
                  boxShadow: m.sender === "user" ? "0 4px 16px rgba(37, 99, 235, 0.25)" : "0 2px 10px rgba(0, 0, 0, 0.04)",
                }}
              >
                {m.text}

                {/* Structured Action Confirmation Card */}
                {m.action && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "12px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      color: "#0f172a",
                    }}
                  >
                    <div style={{ fontWeight: "700", fontSize: "13px" }}>
                      {m.action.type === "EVENT" ? "📅 Rendez-vous confirmé" : "🔔 Action enregistrée"} : {m.action.title}
                    </div>
                    {m.action.dateTime && (
                      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                        Horaire : {new Date(m.action.dateTime).toLocaleString("fr-FR")}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                      <button
                        onClick={() => (window.location.href = "/calendar")}
                        style={{
                          padding: "5px 12px",
                          borderRadius: "6px",
                          background: "#2563eb",
                          color: "#ffffff",
                          border: "none",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Voir dans le calendrier
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2563eb", fontSize: "13px", padding: "10px 14px", background: "#eff6ff", borderRadius: "10px", width: "fit-content" }}>
              <Loader2 size={16} className="animate-spin text-blue-600" />
              <span>L&apos;IA réfléchit et prépare votre demande...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: "16px 28px",
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={isListening ? stopListening : startListening}
            style={{
              padding: "10px",
              borderRadius: "10px",
              background: isListening ? "#ffe4e6" : "#eff6ff",
              color: isListening ? "#e11d48" : "#2563eb",
              border: "1px solid",
              borderColor: isListening ? "#fecdd3" : "#bfdbfe",
              cursor: "pointer",
            }}
            title={isListening ? "Arrêter la dictée" : "Parler"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input
            type="text"
            placeholder="Écrivez votre message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: "11px 16px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              fontSize: "14px",
              color: "#0f172a",
              outline: "none",
            }}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputMessage.trim()}
            style={{
              padding: "11px 20px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#ffffff",
              border: "none",
              fontSize: "13.5px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: loading || !inputMessage.trim() ? 0.5 : 1,
            }}
          >
            <Send size={15} />
            <span>Envoyer</span>
          </button>
        </div>
      </div>

      {/* 2. Right Side: Actions rapides & Contexte */}
      <div style={{ padding: "24px 20px", background: "#ffffff", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" }}>
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
            Actions rapides & Contexte
          </h2>

          {/* Status Card */}
          <div
            style={{
              padding: "14px",
              borderRadius: "12px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#166534", marginBottom: "4px" }}>Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 8px #16a34a" }} />
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#15803d" }}>Assistant IA : En ligne & connecté</span>
            </div>
          </div>

          {/* Quick Action Prompt Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {quickPrompts.map((qp, idx) => {
              const Icon = qp.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.prompt)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  className="hover:border-blue-400 hover:shadow-sm"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: qp.bg,
                      color: qp.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{qp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <VoiceRecordingBubble
        isListening={isListening}
        transcript={liveTranscript}
        onStop={stopListening}
        onCancel={cancelListening}
      />
    </div>
  );
}
