"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Phone, PhoneOff, PhoneCall, Volume2, Clock, CheckCircle2, RotateCcw, AlertTriangle, Play, Sparkles } from "lucide-react";
import { getStoredVoiceSettings, speakAIText, playAlertChime, type VoiceGender, type AlertMode } from "@/lib/voice";

export interface AICallData {
  id: string;
  title: string;
  body?: string | null;
  fireAt: string;
  method?: string;
  taskId?: string | null;
  eventId?: string | null;
  event?: {
    title: string;
    startAt: string;
    location?: string | null;
    description?: string | null;
  } | null;
}

interface AICallModalProps {
  call: AICallData | null;
  onDismiss: (id: string) => void;
  onSnooze: (id: string, minutes: number) => void;
  onCompleteTask?: (taskId: string) => void;
}

export default function AICallModal({
  call,
  onDismiss,
  onSnooze,
  onCompleteTask,
}: AICallModalProps) {
  const [callState, setCallState] = useState<"RINGING" | "SPEAKING" | "WAITING_ACTION">("SPEAKING");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText, setSpeechText] = useState<string>("");
  const [gender, setGender] = useState<VoiceGender>("FEMALE");
  const [alertMode, setAlertMode] = useState<AlertMode>("DIRECT_VOICE");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load voice preferences
  useEffect(() => {
    const s = getStoredVoiceSettings();
    setGender(s.gender);
    setAlertMode(s.alertMode);
  }, []);

  // Build the complete, natural speech text in French based on exact user input
  const buildSpeechContent = useCallback((data: AICallData, currentGender: VoiceGender) => {
    const detailNotes = data.body ? data.body.replace(/^Note:\s*/i, "") : "";
    const eventDesc = data.event?.description || "";
    const eventLocation = data.event?.location ? `Lieu : ${data.event.location}.` : "";

    const assistantPrefix = currentGender === "FEMALE" ? "votre assistante vocale" : "votre assistant vocal";

    // Format natural spoken time (e.g. "14 heures 30")
    const timeToAnnounce = data.event?.startAt || data.fireAt;
    let spokenTime = "";
    if (timeToAnnounce) {
      try {
        const d = new Date(timeToAnnounce);
        const h = d.getHours();
        const m = d.getMinutes();
        spokenTime = m === 0 ? `${h} heures` : `${h} heures ${m < 10 ? `0${m}` : m}`;
      } catch {
        spokenTime = "";
      }
    }

    let content = "";
    if (data.event) {
      content = `Bonjour ! Vous avez le rendez-vous « ${data.title} » prévu à ${spokenTime || "l'horaire indiqué"}. `;
    } else if (data.taskId) {
      content = `Bonjour ! Vous avez la tâche « ${data.title} » programmée pour ${spokenTime || "maintenant"}. `;
    } else {
      content = `Bonjour ! Vous avez votre rappel « ${data.title} » prévu pour ${spokenTime || "maintenant"}. `;
    }

    if (detailNotes && !detailNotes.includes("Rappel programmé suite à notre échange")) {
      content += `Vous avez noté : ${detailNotes}. `;
    }

    if (eventDesc) {
      content += `Détails : ${eventDesc}. `;
    }

    if (eventLocation) {
      content += `${eventLocation} `;
    }

    content += `C'est ${assistantPrefix} IA. Avez-vous terminé ou souhaitez-vous reporter ce rappel ?`;

    return content;
  }, []);

  // Speak the constructed message
  const triggerSpeech = useCallback((textToSpeak: string, currentGender: VoiceGender) => {
    setIsSpeaking(true);
    setCallState("SPEAKING");

    speakAIText(textToSpeak, {
      gender: currentGender,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setCallState("WAITING_ACTION");
      },
      onError: () => {
        setIsSpeaking(false);
        setCallState("WAITING_ACTION");
      },
    });
  }, []);

  // Ringtone for CALL_SIMULATION mode
  const startRingtone = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const playRingPattern = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.setValueAtTime(523.25, now);
        osc2.frequency.setValueAtTime(659.25, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
      };

      playRingPattern();
      ringIntervalRef.current = setInterval(playRingPattern, 2500);

      if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 800]);
    } catch {
      // AudioContext error
    }
  }, []);

  const stopRingtone = useCallback(() => {
    if (ringIntervalRef.current) {
      clearInterval(ringIntervalRef.current);
      ringIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);

  // When call / alert arrives
  useEffect(() => {
    if (call) {
      const settings = getStoredVoiceSettings();
      setGender(settings.gender);
      setAlertMode(settings.alertMode);

      const text = buildSpeechContent(call, settings.gender);
      setSpeechText(text);

      if (settings.alertMode === "DIRECT_VOICE") {
        // DIRECT AUTO-SPEAK MODE: Play chime and start talking immediately!
        setCallState("SPEAKING");
        playAlertChime().then(() => {
          triggerSpeech(text, settings.gender);
        });
      } else {
        // CALL SIMULATION MODE: Ring first
        setCallState("RINGING");
        startRingtone();
      }
    } else {
      stopRingtone();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
    return () => {
      stopRingtone();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [call, buildSpeechContent, triggerSpeech, startRingtone, stopRingtone]);

  // Answer button (for call mode)
  const handleAnswer = () => {
    stopRingtone();
    triggerSpeech(speechText, gender);
  };

  // Decline / Close
  const handleDecline = () => {
    stopRingtone();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (call) onSnooze(call.id, 5);
  };

  // Complete
  const handleComplete = () => {
    stopRingtone();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (call) {
      const closingMsg = gender === "FEMALE" ? "Très bien ! J'ai validé cette tâche. Bonne continuation !" : "Parfait ! J'ai marqué ce rappel comme terminé. À bientôt !";
      speakAIText(closingMsg, { gender });
      setTimeout(() => {
        if (call.taskId && onCompleteTask) onCompleteTask(call.taskId);
        onDismiss(call.id);
      }, 1600);
    }
  };

  // Snooze 10 min
  const handleSnooze10 = () => {
    stopRingtone();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (call) {
      const snoozeMsg = "Compris ! Je vous rappelle dans 10 minutes.";
      speakAIText(snoozeMsg, { gender });
      setTimeout(() => {
        onSnooze(call.id, 10);
      }, 1500);
    }
  };

  if (!call) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(5, 7, 15, 0.94)",
        backdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.3s ease-out",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Alerte vocale de rappel IA"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "linear-gradient(180deg, #131726 0%, #0d101c 100%)",
          borderRadius: "32px",
          border: gender === "FEMALE" ? "1.5px solid rgba(236, 72, 153, 0.4)" : "1.5px solid rgba(99, 102, 241, 0.4)",
          padding: "36px 28px",
          boxShadow: gender === "FEMALE"
            ? "0 0 80px rgba(236, 72, 153, 0.25), 0 20px 40px rgba(0,0,0,0.8)"
            : "0 0 80px rgba(99, 102, 241, 0.25), 0 20px 40px rgba(0,0,0,0.8)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow behind avatar */}
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "200px",
            background: gender === "FEMALE"
              ? "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
          }}
        />

        {/* Top bar status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: isSpeaking ? "#10b981" : gender === "FEMALE" ? "#ec4899" : "#6366f1",
              boxShadow: isSpeaking ? "0 0 12px #10b981" : "0 0 12px #ec4899",
              animation: "pulseDot 1s infinite",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isSpeaking ? "#6ee7b7" : gender === "FEMALE" ? "#f472b6" : "#a5b4fc",
            }}
          >
            {isSpeaking
              ? `IA en train de parler (${gender === "FEMALE" ? "Voix Féminine" : "Voix Masculine"})...`
              : callState === "RINGING"
              ? "Appel entrant..."
              : "Rappel vocal actif"}
          </span>
        </div>

        {/* Animated Avatar */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
          {isSpeaking && (
            <>
              <div className="voice-pulse-ring-1" style={{ borderColor: gender === "FEMALE" ? "rgba(236,72,153,0.4)" : "rgba(99,102,241,0.4)" }} />
              <div className="voice-pulse-ring-2" style={{ borderColor: gender === "FEMALE" ? "rgba(236,72,153,0.3)" : "rgba(99,102,241,0.3)" }} />
            </>
          )}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: gender === "FEMALE"
                ? "linear-gradient(135deg, #ec4899, #8b5cf6)"
                : "linear-gradient(135deg, #6366f1, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              border: "3px solid rgba(255,255,255,0.25)",
              position: "relative",
              zIndex: 2,
            }}
          >
            {gender === "FEMALE" ? (
              <span style={{ fontSize: "44px" }}>👩</span>
            ) : (
              <span style={{ fontSize: "44px" }}>👨</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
          {call.title}
        </h2>
        <p style={{ fontSize: "13px", color: gender === "FEMALE" ? "#f472b6" : "var(--accent-primary)", fontWeight: "600", marginBottom: "16px" }}>
          🔔 Rappel vocal automatique
        </p>

        {/* Content Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "18px",
            padding: "16px 20px",
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          {call.body && (
            <div style={{ marginBottom: "8px" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.06em" }}>
                Notes & Détails
              </p>
              <p style={{ fontSize: "14px", color: "#e2e8f0", marginTop: "2px", lineHeight: "1.4" }}>
                {call.body.replace(/^Note:\s*/i, "")}
              </p>
            </div>
          )}

          {call.event && (
            <div style={{ fontSize: "13px", color: "#93c5fd", display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={13} />
              Rendez-vous à {new Date(call.event.startAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              {call.event.location ? ` • 📍 ${call.event.location}` : ""}
            </div>
          )}
        </div>

        {/* Sound Waves when speaking */}
        {callState !== "RINGING" && (
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "28px", marginBottom: "12px" }}>
              {[0.5, 1.3, 0.8, 1.6, 1.0, 1.4, 0.7, 1.2, 0.6].map((scale, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: isSpeaking ? "24px" : "6px",
                    borderRadius: "2px",
                    background: isSpeaking ? (gender === "FEMALE" ? "#ec4899" : "#10b981") : "#64748b",
                    animation: isSpeaking ? `soundWave 0.8s ease-in-out infinite alternate ${i * 0.1}s` : "none",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => triggerSpeech(speechText, gender)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: "12px", color: "#94a3b8" }}
              id="voice-replay-btn"
            >
              <Volume2 size={13} style={{ display: "inline", marginRight: "5px" }} />
              Réécouter l&apos;énoncé vocal
            </button>
          </div>
        )}

        {/* Action Controls */}
        {callState === "RINGING" ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 10px" }}>
            <div style={{ textAlign: "center" }}>
              <button onClick={handleDecline} className="call-btn decline-btn" id="call-decline">
                <PhoneOff size={28} color="white" />
              </button>
              <span style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginTop: "8px", fontWeight: "600" }}>
                Refuser
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={handleAnswer} className="call-btn answer-btn" id="call-answer">
                <Phone size={30} color="white" />
              </button>
              <span style={{ fontSize: "12px", color: "#6ee7b7", display: "block", marginTop: "8px", fontWeight: "700" }}>
                Écouter
              </span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                onClick={handleComplete}
                className="btn btn-primary"
                style={{ padding: "14px", background: "linear-gradient(135deg, #10b981, #059669)", border: "none", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}
                id="voice-action-done"
              >
                <CheckCircle2 size={17} />
                C&apos;est fait !
              </button>
              <button
                onClick={handleSnooze10}
                className="btn btn-secondary"
                style={{ padding: "14px", justifyContent: "center", fontSize: "14px", fontWeight: "600" }}
                id="voice-action-snooze"
              >
                <RotateCcw size={17} />
                Reporter 10 min
              </button>
            </div>

            <button
              onClick={handleDecline}
              className="btn btn-ghost"
              style={{
                width: "100%",
                padding: "10px",
                color: "#94a3b8",
                justifyContent: "center",
                fontSize: "12px",
                marginTop: "4px",
              }}
              id="voice-action-close"
            >
              Fermer l&apos;alerte
            </button>
          </div>
        )}
      </div>

      <style>{`
        .call-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: none;
          display: flex;
          alignItems: center;
          justifyContent: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .decline-btn {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 8px 24px rgba(239,68,68,0.4);
        }
        .answer-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 8px 30px rgba(16,185,129,0.5);
          animation: answerPulse 1.5s infinite;
        }
        .voice-pulse-ring-1, .voice-pulse-ring-2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid;
          pointer-events: none;
        }
        .voice-pulse-ring-1 {
          width: 120px;
          height: 120px;
          animation: pulseRingAnim 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .voice-pulse-ring-2 {
          width: 120px;
          height: 120px;
          animation: pulseRingAnim 2s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s infinite;
        }
        @keyframes pulseRingAnim {
          0% { width: 100px; height: 100px; opacity: 1; }
          100% { width: 180px; height: 180px; opacity: 0; }
        }
        @keyframes answerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes soundWave {
          0% { height: 6px; }
          100% { height: 26px; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
