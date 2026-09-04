"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Clock,
  User,
  Loader2,
  StopCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getStoredVoiceSettings, speakAIText } from "@/lib/voice";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  action?: {
    id?: string;
    type: "TASK" | "EVENT" | "REMINDER" | "CONTACT" | "INFO" | "DELETE_CONFIRM";
    title: string;
    notes?: string;
    contactName?: string;
    dateTime?: string;
    priority?: string;
    mode?: string;
    category?: string;
  } | null;
  saved?: boolean;
}

export default function AgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-init",
      sender: "ai",
      text: "Bonjour. Je suis votre copilote IA connecté à votre agenda.\n\nVous pouvez discuter librement avec moi par écrit ou cliquer sur le micro pour me parler.",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [activeTarget, setActiveTarget] = useState<{
    type: "EVENT" | "TASK" | "REMINDER";
    id: string;
    title: string;
    scheduledAt?: string;
  } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Clean up audio & speech when leaving the page
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ok
        }
      }
    };
  }, []);

  // Standard, reliable Speech Recognition (SINGLE SHOT, NEVER LOOPS)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = "fr-FR";
        recognition.continuous = false; // Strictly single phrase
        recognition.interimResults = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          setIsListening(false);
          const transcript = event.results[0][0].transcript;

          if (transcript && transcript.trim().length >= 2) {
            setInputMessage(transcript);
            handleSendMessage(transcript);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert("La reconnaissance vocale nécessite Google Chrome, Edge ou Safari.");
      return;
    }
    // Stop any AI talking immediately
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

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
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    // Stop speaking immediately
    stopSpeaking();
    stopListening();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const historyPayload = messages.slice(-8).map((m) => ({
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

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de la communication avec l'assistant.");
      }

      const replyText = data.reply || "Je suis à votre écoute. Que puis-je faire pour vous ?";

      if (data.activeTarget) {
        setActiveTarget(data.activeTarget);
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        action: data.action || null,
        saved: data.saved || false,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Spoken response (if voice is enabled)
      if (voiceEnabled) {
        setIsSpeaking(true);
        const settings = getStoredVoiceSettings();
        speakAIText(replyText.replace(/[*•#]/g, ""), {
          gender: settings.gender,
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      }

      // Refresh other dashboard widgets
      if (data.saved) {
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
        window.dispatchEvent(new Event("event-updated"));
      }
      window.dispatchEvent(new Event("ai-quota-updated"));
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue lors de la communication avec l'assistant.";
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: `⚠️ ${errorMsg}`,
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        height: "calc(100vh - 44px)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 28px 24px",
        width: "100%",
      }}
    >
      {/* Top Header Pro */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderRadius: "10px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          marginBottom: "16px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.01em" }}>
            Console Copilote IA
          </h1>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Contrôle vocal et textuel connecté à vos événements, tâches et alertes
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-voice-live-modal"))}
            className="btn btn-secondary btn-sm"
            style={{
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: "600",
              gap: "6px",
              color: "#38bdf8",
              borderColor: "rgba(56, 189, 248, 0.3)",
            }}
            title="Lancer le dialogue vocal continu avec visualiseur d'onde et Orb"
          >
            <Mic size={14} />
            <span>Mode Vocal Live (Orb)</span>
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="btn btn-sm"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                color: "#fca5a5",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                gap: "6px",
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              <StopCircle size={13} />
              <span>Arrêter la voix</span>
            </button>
          )}

          <button
            onClick={() => {
              const newVal = !voiceEnabled;
              setVoiceEnabled(newVal);
              if (!newVal) {
                stopSpeaking();
              }
            }}
            className="btn btn-ghost btn-sm"
            style={{ padding: "6px 8px", color: voiceEnabled ? "#38bdf8" : "var(--text-muted)" }}
            title={voiceEnabled ? "Désactiver la lecture vocale" : "Activer la lecture vocale"}
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              setMessages([
                {
                  id: `reset-${Date.now()}`,
                  sender: "ai",
                  text: "Discussion réinitialisée. Comment puis-je vous aider ?",
                },
              ]);
              setActiveTarget(null);
            }}
            className="btn btn-ghost btn-sm"
            style={{ padding: "6px 8px" }}
            title="Effacer la conversation"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "12px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Active Listening indicator */}
        {isListening && (
          <div
            style={{
              padding: "8px 16px",
              background: "rgba(239, 68, 68, 0.12)",
              borderBottom: "1px solid rgba(239, 68, 68, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  display: "inline-block",
                }}
                className="animate-pulse"
              />
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#fca5a5" }}>
                À votre écoute... Énoncez votre consigne.
              </span>
            </div>

            <button
              onClick={stopListening}
              className="btn btn-ghost btn-sm"
              style={{ padding: "2px 8px", fontSize: "11px", color: "#fca5a5" }}
            >
              Annuler
            </button>
          </div>
        )}

        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--bg-app)",
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
                maxWidth: "100%",
              }}
            >
              {/* Bubble */}
              <div
                style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: msg.sender === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: msg.sender === "user"
                    ? "var(--accent-primary)"
                    : "var(--bg-card)",
                  color: "#ffffff",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  border: msg.sender === "ai" ? "1px solid var(--border-subtle)" : "none",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </div>

              {/* Action Card */}
              {msg.action && (
                <div
                  style={{
                    width: "80%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "10px", fontWeight: "600", color: "#38bdf8", textTransform: "uppercase" }}>
                      {msg.action.type === "EVENT" ? "Rendez-vous" : msg.action.type === "TASK" ? "Tâche" : "Rappel"}
                    </span>
                    <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle2 size={12} />
                      Enregistré
                    </span>
                  </div>

                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff", marginBottom: "2px" }}>
                    {msg.action.title}
                  </p>

                  {msg.action.contactName && (
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>
                      👤 Contact : {msg.action.contactName}
                    </p>
                  )}

                  {msg.action.dateTime && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#38bdf8" }}>
                      <Clock size={11} />
                      {formatDate(msg.action.dateTime)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "12px", padding: "4px" }}>
              <Loader2 size={14} className="animate-spin" style={{ color: "var(--accent-primary)" }} />
              <span>Traitement de votre demande...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Écrivez ou dictez votre consigne..."
              className="form-input"
              id="agent-chat-input"
              style={{ fontSize: "13px", padding: "8px 12px", flex: 1 }}
            />

            <button
              type="button"
              onClick={() => {
                if (isListening) stopListening();
                else startListening();
              }}
              className={`btn ${isListening ? "btn-danger" : "btn-secondary"}`}
              style={{
                padding: "8px 14px",
                flexShrink: 0,
                fontSize: "12px",
                gap: "6px",
                borderColor: isListening ? "#ef4444" : undefined,
                color: isListening ? "#ffffff" : "#38bdf8",
              }}
              title={isListening ? "Arrêter d'écouter" : "Parler au micro"}
              id="agent-mic-btn"
            >
              {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              <span>{isListening ? "Écoute..." : "Micro"}</span>
            </button>

            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="btn btn-primary"
              style={{ padding: "8px 16px", flexShrink: 0, fontSize: "12px" }}
              id="agent-send-btn"
            >
              <Send size={14} />
              <span>Envoyer</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
