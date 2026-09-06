"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  Loader2,
  Radio,
  Minimize2,
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
  "Prends rendez-vous demain à 14h avec Dominique",
  "Rappelle-moi d'appeler le médecin à 16h30",
  "Ajoute la tâche : commander fournitures pour le chantier",
  "Organise ma journée de demain",
];

export default function AIAssistantWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Bonjour. Je suis votre Copilote IA connecté à votre agenda, vos alarmes et vos tâches. Que souhaitez-vous planifier aujourd'hui ?",
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-close on page navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-ai-assistant", handleOpen);
    window.addEventListener("close-ai-assistant", handleClose);
    window.addEventListener("open-upgrade-modal" as any, handleClose);
    window.addEventListener("open-voice-live-modal" as any, handleClose);

    return () => {
      window.removeEventListener("open-ai-assistant", handleOpen);
      window.removeEventListener("close-ai-assistant", handleClose);
      window.removeEventListener("open-upgrade-modal" as any, handleClose);
      window.removeEventListener("open-voice-live-modal" as any, handleClose);
    };
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
      {/* Floating Trigger Button - Luxury Slate Style */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 40,
            padding: "10px 18px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #152244 0%, #1c2d5a 100%)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="hover:scale-105"
          id="floating-ai-btn"
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #38bdf8, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 0 12px rgba(56, 189, 248, 0.4)",
            }}
          >
            <Sparkles size={15} />
          </div>
          <span style={{ color: "#ffffff", fontWeight: "700" }}>Copilote IA</span>
          <QuotaIndicator compact />
        </button>
      )}

      {/* Solid Opaque Slide-out Panel (Zero Transparency Bleed) */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "430px",
            maxWidth: "calc(100vw - 32px)",
            height: "620px",
            maxHeight: "calc(100vh - 48px)",
            borderRadius: "18px",
            backgroundColor: "#152244",
            border: "1px solid rgba(99, 102, 241, 0.45)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(99, 102, 241, 0.25)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "#0f1a36",
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
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #38bdf8, #6366f1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
                }}
              >
                <Sparkles size={17} />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
                  Copilote IA d&apos;Action
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "500" }}>En ligne & connecté</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={openVoiceLiveMode}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: "600",
                  gap: "5px",
                  color: "#38bdf8",
                  borderColor: "rgba(56, 189, 248, 0.35)",
                  background: "rgba(56, 189, 248, 0.1)",
                }}
                title="Passer en Mode Vocal Live (Orb)"
              >
                <Radio size={13} />
                <span>Mode Vocal</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: "6px", color: "#94a3b8" }}
                title="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Area (Solid Dark Opaque Background) */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#0b1329",
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
                    maxWidth: "88%",
                    padding: "11px 15px",
                    borderRadius: m.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background:
                      m.sender === "user"
                        ? "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)"
                        : "#1c2d5a",
                    color: "#ffffff",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                    border: m.sender === "user" ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#38bdf8", fontSize: "12px", padding: "8px 12px", background: "rgba(56, 189, 248, 0.1)", borderRadius: "8px", width: "fit-content" }}>
                <Loader2 size={15} className="animate-spin text-sky-400" />
                <span>Traitement de votre demande...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              backgroundColor: "#152244",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "11px",
                  color: "#cbd5e1",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                className="hover:border-indigo-400 hover:text-white hover:bg-slate-700"
              >
                {p.slice(0, 34)}...
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "#0f1a36",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={toggleVoiceInput}
              className={`btn btn-ghost btn-sm ${isListening ? "text-rose-400" : "text-sky-400"}`}
              style={{ padding: "7px", borderRadius: "8px", background: isListening ? "rgba(244, 63, 94, 0.15)" : "rgba(56, 189, 248, 0.1)" }}
              title={isListening ? "Arrêter l'écoute" : "Dicter une consigne"}
            >
              {isListening ? <MicOff size={17} /> : <Mic size={17} />}
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
                backgroundColor: "#0b1329",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "10px",
                padding: "9px 14px",
                fontSize: "13px",
                color: "#ffffff",
                outline: "none",
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              className="btn btn-primary btn-sm"
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
              }}
            >
              <Send size={15} />
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
