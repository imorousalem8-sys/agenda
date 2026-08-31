"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  Loader2,
  Volume2,
  RefreshCw,
  Zap,
} from "lucide-react";
import { speakAIText } from "@/lib/voice";
import AgentStepCard from "./AgentStepCard";
import ToolCallCard from "./ToolCallCard";
import QuotaIndicator from "./QuotaIndicator";
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
  "Demain chantier 8h, il me manque 2 coudes et 3 manchons, rappelle-moi d'aller chez le fournisseur avant et d'appeler Martin à 17h",
  "Organise ma journée de demain",
  "Rappelle-moi d'appeler le médecin à 16h30",
  "Fais le point sur ma semaine",
];

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Bonjour ! Je suis votre Copilote IA d'action. Dictez-moi vos rendez-vous, tâches multiples ou demandez-moi d'organiser votre journée. J'agis directement dans votre application.",
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

      // Trigger global event updates
      if (data.saved) {
        window.dispatchEvent(new Event("event-updated"));
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
      }

      // Update quota badge globally
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
      recognitionRef.current?.stop();
      setIsListening(false);
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
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInputMessage(transcript);
        handleSendMessage(transcript);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 40,
            padding: "12px 18px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="hover:scale-105"
        >
          <Bot size={20} />
          <span>Assistant IA</span>
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
            borderRadius: "20px",
            background: "rgba(10, 15, 30, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(20px)",
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              background: "linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1))",
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
                  background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#f8fafc" }}>
                  Assistant IA d&apos;Action
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>En ligne & Prêt à agir</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <QuotaIndicator compact />
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: "6px", color: "var(--text-muted)" }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
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
                    borderRadius: m.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: m.sender === "user" ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "rgba(30, 41, 59, 0.8)",
                    color: "#f8fafc",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                    border: m.sender === "user" ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "12px", padding: "8px" }}>
                <Loader2 size={16} className="animate-spin text-indigo-400" />
                <span>L&apos;assistant analyse et prépare les actions...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div
            style={{
              padding: "6px 12px",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "11px",
                  color: "#cbd5e1",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                {p.slice(0, 32)}...
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(15, 23, 42, 0.6)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={toggleVoiceInput}
              className={`btn btn-ghost btn-sm ${isListening ? "text-rose-400 animate-pulse" : "text-slate-400"}`}
              style={{ padding: "8px" }}
              title={isListening ? "Arrêter l'écoute" : "Dicter une consigne"}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
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
              placeholder="Dictez ou écrivez une action..."
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
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
                padding: "8px 12px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                borderRadius: "10px",
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
