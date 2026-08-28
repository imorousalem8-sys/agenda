// Voice synthesis and preferences manager for French AI Voices

export type VoiceGender = "FEMALE" | "MALE";
export type AlertMode = "DIRECT_VOICE" | "CALL_SIMULATION";

export interface VoiceSettings {
  gender: VoiceGender;
  alertMode: AlertMode;
  rate: number; // 0.8 - 1.2
  pitch: number; // 0.8 - 1.2
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  gender: "FEMALE", // Female voice by default as requested
  alertMode: "DIRECT_VOICE", // Direct auto-speaking without having to pick up by default!
  rate: 1.0,
  pitch: 1.05,
};

export function getStoredVoiceSettings(): VoiceSettings {
  if (typeof window === "undefined") return DEFAULT_VOICE_SETTINGS;
  try {
    const savedGender = localStorage.getItem("aa-voice-gender") as VoiceGender | null;
    const savedMode = localStorage.getItem("aa-alert-mode") as AlertMode | null;
    const savedRate = localStorage.getItem("aa-voice-rate");
    const savedPitch = localStorage.getItem("aa-voice-pitch");

    return {
      gender: savedGender === "MALE" ? "MALE" : "FEMALE",
      alertMode: savedMode === "CALL_SIMULATION" ? "CALL_SIMULATION" : "DIRECT_VOICE",
      rate: savedRate ? parseFloat(savedRate) : DEFAULT_VOICE_SETTINGS.rate,
      pitch: savedPitch ? parseFloat(savedPitch) : savedGender === "MALE" ? 0.92 : 1.08,
    };
  } catch {
    return DEFAULT_VOICE_SETTINGS;
  }
}

export function saveVoiceSettings(settings: Partial<VoiceSettings>) {
  if (typeof window === "undefined") return;
  try {
    if (settings.gender) localStorage.setItem("aa-voice-gender", settings.gender);
    if (settings.alertMode) localStorage.setItem("aa-alert-mode", settings.alertMode);
    if (settings.rate !== undefined) localStorage.setItem("aa-voice-rate", settings.rate.toString());
    if (settings.pitch !== undefined) localStorage.setItem("aa-voice-pitch", settings.pitch.toString());
    window.dispatchEvent(new Event("voice-settings-changed"));
  } catch (e) {
    console.warn("Could not save voice settings:", e);
  }
}

/**
 * Finds the best natural voice matching French and gender preference.
 */
export function getBestFrenchVoice(gender: VoiceGender = "FEMALE"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const frenchVoices = voices.filter((v) => v.lang.startsWith("fr"));
  if (frenchVoices.length === 0) return voices[0] || null;

  // Female voice keywords
  const femaleKeywords = [
    "denise", "julie", "audrey", "marie", "celine", "hortense", "virginie",
    "female", "féminin", "natural", "google français", "lucie", "chloe", "lea"
  ];

  // Male voice keywords
  const maleKeywords = [
    "henri", "thomas", "paul", "sebastien", "sébastien", "nicolas", "mathieu",
    "male", "masculin", "google français", "pierre", "alain", "claude"
  ];

  const keywords = gender === "FEMALE" ? femaleKeywords : maleKeywords;

  // 1. Look for premium natural online voices matching keyword
  for (const kw of keywords) {
    const found = frenchVoices.find(
      (v) => v.name.toLowerCase().includes(kw) && (v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Google") || v.name.includes("Premium"))
    );
    if (found) return found;
  }

  // 2. Look for any voice matching keyword
  for (const kw of keywords) {
    const found = frenchVoices.find((v) => v.name.toLowerCase().includes(kw));
    if (found) return found;
  }

  // 3. Fallback to first French voice
  return frenchVoices[0];
}

/**
 * Speaks text using the configured French AI voice.
 */
export function speakAIText(
  text: string,
  options?: {
    gender?: VoiceGender;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  window.speechSynthesis.cancel(); // Stop previous utterances

  const settings = getStoredVoiceSettings();
  const gender = options?.gender || settings.gender;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = settings.rate || 1.0;
  utterance.pitch = gender === "FEMALE" ? (settings.pitch || 1.08) : (settings.pitch || 0.92);

  const bestVoice = getBestFrenchVoice(gender);
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  if (options?.onStart) utterance.onstart = options.onStart;
  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Play a modern intro chime before speaking
 */
export function playAlertChime(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      const playChimeTone = (freq: number, start: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      };

      const now = ctx.currentTime;
      playChimeTone(587.33, now, 0.35); // D5
      playChimeTone(880.00, now + 0.15, 0.6); // A5

      setTimeout(() => {
        ctx.close().catch(() => {});
        resolve();
      }, 700);
    } catch {
      resolve();
    }
  });
}
