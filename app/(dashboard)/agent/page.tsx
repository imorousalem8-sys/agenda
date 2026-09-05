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
  Bot,
  Brain,
  Bell,
  Sparkles,
  Calendar,
  Terminal,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getStoredVoiceSettings, speakAIText } from "@/lib/voice";
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
      text: "Bonjour. Je suis votre Agence IA Personnelle & Copilote d'Action.\n\nJe gère vos rendez-vous, structure vos chantiers et priorités, et déclenche vos alarmes vocales persistantes. Comment puis-je vous aider ?",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
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

  // Standard, reliable Speech Recognition with Real-Time Interim Results
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = "fr-FR";
        recognition.continuous = true;
        recognition.interimResults = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          let currentText = "";
          for (let i = 0; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          setLiveTranscript(currentText);
          setInputMessage(currentText);
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
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
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
  }, []);

  const stopListeningAndSend = useCallback(() => {
    stopListening();
    const text = liveTranscript.trim() || inputMessage.trim();
    if (text) {
      handleSendMessage(text);
      setLiveTranscript("");
    }
  }, [liveTranscript, inputMessage]);

  const cancelListening = useCallback(() => {
    stopListening();
    setLiveTranscript("");
  }, [stopListening]);

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

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
        throw new Error(data.error || "Une erreur est survenue lors de la communication avec l'Agence IA.");
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

      // Spoken response
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
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue lors de la communication avec l'Agence IA.";
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
        padding: "16px clamp(10px, 3vw, 24px)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header Pro - Agence IA Command Center */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderRadius: "12px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={18} color="#34d399" />
          </div>
          <div>
            <h1 style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.01em", margin: 0 }}>
              Agence IA Personnelle • Copilote Exécutif
            </h1>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
              Gestion autonome de vos rendez-vous, alertes persistantes et chantiers
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-voice-live-modal"))}
            style={{
              padding: "5px 12px",
              fontSize: "11.5px",
              fontWeight: "600",
              color: "#38bdf8",
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            title="Lancer le mode vocal continu en direct"
          >
            <Mic size={13} />
            <span>Mode Vocal Live</span>
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                color: "#fca5a5",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                gap: "5px",
                fontSize: "11px",
                padding: "4px 8px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <StopCircle size={12} />
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
            style={{
              background: "transparent",
              border: "1px solid var(--border-subtle)",
              borderRadius: "6px",
              padding: "5px 8px",
              color: voiceEnabled ? "#38bdf8" : "var(--text-muted)",
              cursor: "pointer",
            }}
            title={voiceEnabled ? "Désactiver la lecture vocale" : "Activer la lecture vocale"}
          >
            {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              setMessages([
                {
                  id: `reset-${Date.now()}`,
                  sender: "ai",
                  text: "Discussion réinitialisée. Comment l'Agence IA peut-elle vous aider ?",
                },
              ]);
              setActiveTarget(null);
            }}
            style={{
              background: "transparent",
              border: "1px solid var(--border-subtle)",
              borderRadius: "6px",
              padding: "5px 8px",
              color: "#94a3b8",
              cursor: "pointer",
            }}
            title="Effacer la conversation"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Quick Executive Agency Chips */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px", marginBottom: "8px" }}>
        {[
          { label: "Fais le point sur ma journée", prompt: "Fais le point complet sur ma journée d'aujourd'hui et mes priorités." },
          { label: "Optimise mes créneaux demain", prompt: "Organise ma journée de demain et planifie les urgences." },
          { label: "Planifier un rendez-vous", prompt: "Ajoute un rendez-vous important demain à 14h." },
          { label: "Programmer une alarme vocale", prompt: "Rappelle-moi dans 30 minutes de vérifier les devis urgents." },
        ].map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(item.prompt)}
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "6px",
              padding: "4px 10px",
              color: "#cbd5e1",
              fontSize: "11px",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {item.label}
          </button>
        ))}
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
              padding: "8px 14px",
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
                À votre écoute... Parlez naturellement.
              </span>
            </div>

            <button
              onClick={stopListening}
              style={{ background: "none", border: "none", padding: "2px 8px", fontSize: "11px", color: "#fca5a5", cursor: "pointer" }}
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
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "#07080b",
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
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: msg.sender === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: msg.sender === "user"
                    ? "#ffffff"
                    : "#11141d",
                  color: msg.sender === "user" ? "#000000" : "#f8fafc",
                  fontSize: "13px",
                  fontWeight: msg.sender === "user" ? "600" : "400",
                  lineHeight: "1.5",
                  border: msg.sender === "ai" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </div>

              {/* Action Result Card */}
              {msg.action && (
                <div
                  style={{
                    width: "min(400px, 90%)",
                    background: "#0e111a",
                    border: "1px solid rgba(52, 211, 153, 0.3)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#ffffff" }}>{msg.action.title}</div>
                    {msg.action.dateTime && (
                      <div style={{ color: "#94a3b8", fontSize: "11px" }}>{msg.action.dateTime}</div>
                    )}
                  </div>
                  {msg.saved && (
                    <span style={{ fontSize: "10px", background: "rgba(52, 211, 153, 0.15)", color: "#34d399", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>
                      SYNCHRONISÉ
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "#11141d", borderRadius: "8px", width: "fit-content", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <Loader2 size={14} className="animate-spin" color="#34d399" />
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>L&apos;Agence IA analyse et exécute votre consigne...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: "10px 14px",
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            style={{
              background: isListening ? "#ef4444" : "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isListening ? "#ffffff" : "#38bdf8",
              cursor: "pointer",
              flexShrink: 0,
            }}
            title={isListening ? "Arrêter la dictée" : "Parler à l'Agence IA"}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Dictez ou écrivez à votre Agence IA (ex: Bloque 15h demain pour la réunion)..."
            style={{
              flex: 1,
              background: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              padding: "9px 12px",
              color: "#ffffff",
              fontSize: "13px",
              outline: "none",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={loading || !inputMessage.trim()}
            style={{
              background: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              opacity: !inputMessage.trim() ? 0.5 : 1,
            }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* Floating Animated Voice Recording Bubble HUD */}
      <VoiceRecordingBubble
        isListening={isListening}
        transcript={liveTranscript}
        onStop={stopListeningAndSend}
        onCancel={cancelListening}
      />
    </div>
  );
}
