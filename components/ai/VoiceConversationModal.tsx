"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  MicOff,
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  Loader2,
  Zap,
} from "lucide-react";
import AudioWaveVisualizer from "./AudioWaveVisualizer";
import { speakAIText } from "@/lib/voice";

interface VoiceConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceConversationModal({
  isOpen,
  onClose,
}: VoiceConversationModalProps) {
  const [voiceState, setVoiceState] = useState<"listening" | "thinking" | "speaking" | "idle">("idle");
  const [transcript, setTranscript] = useState("");
  const [lastAIReply, setLastAIReply] = useState("");
  const [actionDone, setActionDone] = useState<string | null>(null);
  const [autoListen, setAutoListen] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    isSpeakingRef.current = false;
    if (voiceState === "speaking") {
      setVoiceState("idle");
    }
  }, [voiceState]);

  const startListening = useCallback(() => {
    stopSpeaking();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("La reconnaissance vocale nécessite Chrome, Safari ou Edge.");
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setVoiceState("listening");
      };

      recognition.onresult = (event: any) => {
        let currentText = "";
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);

        if (event.results[0].isFinal && currentText.trim().length > 1) {
          processVoiceMessage(currentText.trim());
        }
      };

      recognition.onerror = () => {
        setVoiceState("idle");
      };

      recognition.onend = () => {
        if (voiceState === "listening") {
          setVoiceState("idle");
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setVoiceState("idle");
    }
  }, [stopSpeaking, voiceState]);

  const processVoiceMessage = async (text: string) => {
    if (!text.trim()) return;

    setVoiceState("thinking");
    setActionDone(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de traitement");

      const reply = data.spokenReply || data.reply || "J'ai bien noté.";
      setLastAIReply(reply);

      if (data.saved) {
        setActionDone(data.action?.title || "Action enregistrée dans votre planning");
        window.dispatchEvent(new Event("task-updated"));
        window.dispatchEvent(new Event("reminder-updated"));
        window.dispatchEvent(new Event("event-updated"));
        window.dispatchEvent(new Event("ai-quota-updated"));
      }

      // Voice response
      setVoiceState("speaking");
      isSpeakingRef.current = true;

      speakAIText(reply.replace(/[*•#]/g, ""), {
        onStart: () => {
          setVoiceState("speaking");
          isSpeakingRef.current = true;
        },
        onEnd: () => {
          isSpeakingRef.current = false;
          setVoiceState("idle");
          // Continuous loop: listen again if autoListen is active
          if (autoListen) {
            setTimeout(() => {
              startListening();
            }, 600);
          }
        },
        onError: () => {
          isSpeakingRef.current = false;
          setVoiceState("idle");
        },
      });
    } catch (err: unknown) {
      setVoiceState("idle");
      setLastAIReply("Désolé, une erreur est survenue lors du traitement.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ok
        }
      }
      setVoiceState("idle");
      setTranscript("");
      setLastAIReply("");
      setActionDone(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(5, 7, 10, 0.94)",
        backdropFilter: "blur(25px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 24px 48px",
        color: "#ffffff",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                voiceState === "listening"
                  ? "#38bdf8"
                  : voiceState === "speaking"
                  ? "#34d399"
                  : voiceState === "thinking"
                  ? "#fbbf24"
                  : "#64748b",
            }}
          />
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)" }}>
            Mode Vocal Direct • Copilote IA
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setAutoListen(!autoListen)}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: "11px", color: autoListen ? "#38bdf8" : "var(--text-muted)", padding: "4px 8px" }}
            title="Dialogue continu"
          >
            {autoListen ? "✓ Dialogue Continu" : "Mode Manuel"}
          </button>
          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: "6px", color: "var(--text-muted)" }}
            id="voice-modal-close"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Central Visualizer & Orb */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <AudioWaveVisualizer state={voiceState} size="lg" />

        {/* State Label */}
        <div style={{ minHeight: "60px" }}>
          {voiceState === "listening" && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#f8fafc" }}>
                Je vous écoute...
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                {transcript || "Parlez librement de vos chantiers, tâches, rappels ou consignes."}
              </p>
            </div>
          )}

          {voiceState === "thinking" && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Loader2 size={18} className="animate-spin" />
                <span>Analyse & Exécution...</span>
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                « {transcript} »
              </p>
            </div>
          )}

          {voiceState === "speaking" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#34d399" }}>
                {lastAIReply}
              </h2>
            </div>
          )}

          {voiceState === "idle" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#94a3b8" }}>
                Prêt
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                Appuyez sur le micro pour reprendre la parole.
              </p>
            </div>
          )}
        </div>

        {/* Action Confirmation Banner */}
        {actionDone && (
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#6ee7b7",
              fontWeight: "600",
            }}
          >
            <CheckCircle2 size={15} />
            <span>{actionDone}</span>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {voiceState === "speaking" ? (
          <button
            onClick={stopSpeaking}
            className="btn btn-secondary"
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "600",
              gap: "8px",
              background: "#1e293b",
              color: "#f8fafc",
            }}
          >
            <VolumeX size={18} />
            <span>Couper la parole (Interrompre)</span>
          </button>
        ) : (
          <button
            onClick={() => {
              if (voiceState === "listening") {
                if (recognitionRef.current) recognitionRef.current.stop();
                setVoiceState("idle");
              } else {
                startListening();
              }
            }}
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: voiceState === "listening" ? "#ef4444" : "var(--accent-primary)",
              border: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)",
              transition: "all 0.2s ease",
            }}
            className="hover:scale-105"
            title={voiceState === "listening" ? "Arrêter l'écoute" : "Parler"}
          >
            {voiceState === "listening" ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
        )}
      </div>
    </div>
  );
}
