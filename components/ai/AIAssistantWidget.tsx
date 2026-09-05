"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  Loader2,
  Volume2,
  RefreshCw,
  Zap,
  Radio,
} from "lucide-react";
import { speakAIText } from "@/lib/voice";
import AgentStepCard from "./AgentStepCard";
import ToolCallCard from "./ToolCallCard";
import QuotaIndicator from "./QuotaIndicator";
import VoiceRecordingBubble from "./VoiceRecordingBubble";
import { AgentStep, AIActionExecutionResult } from "@/lib/ai/types";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  steps?: AgentStep[];
  action?: AIActionExecutionResult | null;
  saved?: boolean;
}

const quickPrompts = [
  "Demain chantier 8h, rappelle-moi d'aller chez le fournisseur avant et d'appeler Martin à 17h",
  "Organise ma journée de demain",
  "Rappelle-moi d'appeler le médecin à 16h30",
  "Ajoute la tâche : commander 2 coudes et 3 manchons",
];

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Bonjour. Je suis votre Copilote IA connecté à votre agenda et vos tâches. Écrivez votre consigne ou lancez le mode vocal pour dialoguer directement.",
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-assistant", handleOpen);
    return () => window.removeEventListener("open-ai-assistant", handleOpen);
  }, []);

  const openVoiceLiveMode = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("open-voice-live-modal"));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, sender: "user", text },
    ];
    setMessages(newMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const history = newMessages.slice(-6).map((m) => ({
        role: (m.sender === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erreur assistant");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.reply,
          steps: data.steps,
          action: data.action,
          saved: data.saved,
        },
      ]);

      if (data.saved) {
        window.dispatchEvent(new Event("event-updated"));
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
      }

      window.dispatchEvent(new Event("ai-quota-updated"));

      if (data.spokenReply) {
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

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListeningAndSend();
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setLiveTranscript("");
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      let currentText = "";
      for (let i = 0; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript;
      }
      setLiveTranscript(currentText);
      setInputMessage(currentText);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListeningAndSend = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    const text = liveTranscript.trim() || inputMessage.trim();
    if (text) {
      handleSendMessage(text);
      setLiveTranscript("");
    }
  };

  const cancelListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setLiveTranscript("");
  };

  return (
    <>
      {/* Floating Trigger Button - Obsidian Pro Style */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 40,
            padding: "10px 16px",
            borderRadius: "10px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-strong)",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          className="hover:border-slate-500"
          id="floating-ai-btn"
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #2563eb, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <Sparkles size={14} />
          </div>
          <span>Copilote IA</span>
          <QuotaIndicator compact />
        </button>
      )}

      {/* Slide-out Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "420px",
            maxWidth: "calc(100vw - 32px)",
            height: "620px",
            maxHeight: "calc(100vh - 48px)",
            borderRadius: "14px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-subtle)",
              background: "var(--bg-sidebar)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <Sparkles size={17} />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc" }}>
                  Copilote IA d&apos;Action
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>En ligne & connecté</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={openVoiceLiveMode}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: "4px 8px",
                  fontSize: "11px",
                  fontWeight: "600",
                  gap: "4px",
                  color: "#38bdf8",
                  borderColor: "rgba(56, 189, 248, 0.3)",
                }}
                title="Passer en Mode Vocal Live (Orb)"
              >
                <Radio size={12} />
                <span>Mode Vocal Live</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: "6px", color: "var(--text-muted)" }}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", background: "var(--bg-app)" }}>
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
                    maxWidth: "88%",
                    padding: "10px 14px",
                    borderRadius: m.sender === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: m.sender === "user" ? "var(--accent-primary)" : "var(--bg-card)",
                    color: "#f8fafc",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                    border: m.sender === "user" ? "none" : "1px solid var(--border-subtle)",
                  }}
                >
                  {m.text}
                </div>

                {/* Multi-step progress indicator */}
                {m.steps && m.steps.length > 0 && (
                  <div style={{ width: "88%", marginTop: "6px" }}>
                    {m.steps.map((step) => (
                      <AgentStepCard key={step.id} step={step} />
                    ))}
                  </div>
                )}

                {/* Primary Action Card */}
                {m.action && (
                  <div style={{ width: "88%" }}>
                    <ToolCallCard action={m.action} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "12px", padding: "6px" }}>
                <Loader2 size={14} className="animate-spin text-sky-400" />
                <span>Traitement de l&apos;action en cours...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts */}
          <div
            style={{
              padding: "6px 12px",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              background: "var(--bg-card)",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
                className="hover:border-slate-500 hover:text-white"
              >
                {p.slice(0, 32)}...
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid var(--border-subtle)",
              background: "var(--bg-card)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={toggleVoiceInput}
              className={`btn btn-ghost btn-sm ${isListening ? "text-rose-400" : "text-slate-400"}`}
              style={{ padding: "6px" }}
              title={isListening ? "Arrêter l'écoute" : "Dicter une consigne"}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Écrivez ou dictez votre consigne..."
              style={{
                flex: 1,
                background: "var(--bg-app)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "13px",
                color: "#f8fafc",
                outline: "none",
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              className="btn btn-primary btn-sm"
              style={{
                padding: "7px 12px",
                borderRadius: "8px",
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Animated Voice Recording Bubble HUD */}
      <VoiceRecordingBubble
        isListening={isListening}
        transcript={liveTranscript}
        onStop={stopListeningAndSend}
        onCancel={cancelListening}
      />
    </>
  );
}
