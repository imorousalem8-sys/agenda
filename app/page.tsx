"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Volume2,
  Calendar,
  Bell,
  CheckSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  Play,
  Pause,
  Check,
  Clock,
  Activity,
  Users,
  ChevronRight,
  Headphones,
  Smartphone,
  Star,
  Mic,
  Sliders,
  ChevronLeft,
  Flame,
  Target,
  Download,
  Share2,
  CheckCircle2,
  MessageSquare,
  Send,
  CornerDownLeft,
  ChevronDown,
  Layers,
  PhoneCall,
  Lock,
  Globe,
  Radio,
  Cpu,
  Sparkle
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import TechnicalSupportSection from "@/components/landing/TechnicalSupportSection";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function LandingPage() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeVoiceGender, setActiveVoiceGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [activeTab, setActiveTab] = useState<"planning" | "voice" | "ai">("planning");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [interactivePrompt, setInteractivePrompt] = useState("");
  const [simulatedAiAnswer, setSimulatedAiAnswer] = useState<string | null>(null);

  const samplePrompts = [
    "RDV dentiste demain à 14h30 avec alarme veille",
    "Réunion de cadrage avec Marc vendredi à 10h",
    "Appeler le notaire lundi à 9h et me rappeler 30 min avant",
  ];

  const handleTestVoice = async (gender: "FEMALE" | "MALE" = activeVoiceGender, textCustom?: string) => {
    setActiveVoiceGender(gender);
    setIsPlayingVoice(true);
    await playAlertChime();

    const sample =
      textCustom ||
      (gender === "FEMALE"
        ? "Bonjour ! Je suis votre assistante Alamajonda. À 14h30, votre réunion stratégique commence. Votre dossier est prêt et synchronisé."
        : "Bonjour ! Votre copilote Alamajonda vous alerte : rendez-vous client dans 15 minutes. Tout votre planning de l'après-midi est optimisé.");

    speakAIText(sample, {
      gender,
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  const handleSimulatePrompt = (text: string) => {
    setInteractivePrompt(text);
    setSimulatedAiAnswer("✨ Analyse en cours par Alamajonda AI...");
    setTimeout(() => {
      setSimulatedAiAnswer(`✅ Événement créé avec succès : « ${text} »\n⏰ Alarme vocale activée J-1 et rappel 15 min avant.\n📂 Synchronisé avec Google & Apple Calendar.`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full bg-gradient-to-b from-blue-600/20 via-sky-500/10 to-transparent blur-[120px]" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-blue-700/10 blur-[150px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* 1. Header Navigation */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-sky-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.5)] px-5 py-3.5 flex items-center justify-between transition-all">
          <Logo size={32} showText={true} />

          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-semibold text-slate-300">
            <a href="#features" className="hover:text-sky-400 transition-colors">Fonctionnalités</a>
            <a href="#simulator" className="hover:text-sky-400 transition-colors">Démonstration</a>
            <a href="#voices" className="hover:text-sky-400 transition-colors">Studio Vocal</a>
            <a href="#pricing" className="hover:text-sky-400 transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all"
            >
              Connexion
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 border border-sky-400/40 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-1.5 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Ouvrir l&apos;App</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Monumental Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        {/* Floating Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-sky-400/30 text-sky-400 text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          L&apos;Agenda Intelligent Anti-Oubli Ultime
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Ne ratez plus jamais un seul rendez-vous. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Votre agenda vous parle.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Fini les notifications silencieuses que l&apos;on oublie. <strong className="text-slate-100 font-semibold">Alamajonda</strong> associe rappels vocaux proactifs, calendrier intelligent et copilote IA pour sécuriser 100% de vos journées.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-[0_10px_35px_rgba(37,99,235,0.45)] border border-sky-300/40 flex items-center gap-2.5 transition-all hover:scale-[1.04] active:scale-[0.98]"
          >
            <span>Démarrer gratuitement</span>
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => handleTestVoice("FEMALE")}
            className="px-7 py-4 rounded-xl text-base font-bold text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] flex items-center gap-3 transition-all hover:scale-[1.03]"
          >
            <div className={`w-3 h-3 rounded-full ${isPlayingVoice ? "bg-amber-400 animate-ping" : "bg-sky-400"}`} />
            <Volume2 size={19} />
            <span>{isPlayingVoice ? "Synthèse vocale en cours..." : "Tester la voix IA en direct"}</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto py-4 px-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md text-xs font-semibold text-slate-300">
          <div className="flex items-center justify-center gap-2">
            <Zap size={16} className="text-sky-400 shrink-0" />
            <span>Planification &lt; 2s</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Volume2 size={16} className="text-amber-400 shrink-0" />
            <span>Voix Française HD</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Calendar size={16} className="text-emerald-400 shrink-0" />
            <span>Synchro Google / Apple</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-indigo-400 shrink-0" />
            <span>Chiffrement Sécurisé</span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Live Simulator Section */}
      <section id="simulator" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-28">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-sky-400 tracking-wider uppercase">Expérience Interactive</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Voyez Alamajonda en action</h2>
          <p className="text-sm text-slate-400 mt-2">Testez directement les 3 fonctionnalités phares sans installer d&apos;application.</p>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-sky-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(37,99,235,0.2)] overflow-hidden backdrop-blur-2xl">
          {/* Mockup Header Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">app.alamajonda.com/simulator</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("planning")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "planning"
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "text-slate-400 hover:text-slate-200 bg-slate-800/40"
                }`}
              >
                📅 Planning Intelligent
              </button>
              <button
                onClick={() => setActiveTab("voice")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "voice"
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "text-slate-400 hover:text-slate-200 bg-slate-800/40"
                }`}
              >
                🔊 Alerte Vocale
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "ai"
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "text-slate-400 hover:text-slate-200 bg-slate-800/40"
                }`}
              >
                ✨ Copilote IA
              </button>
            </div>
          </div>

          {/* Tab 1: Planning View */}
          {activeTab === "planning" && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Votre Journée Optimisée</h3>
                  <p className="text-xs text-slate-400">3 événements synchronisés • 2 rappels vocaux armés</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  ● En direct
                </span>
              </div>

              <div className="grid gap-3">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between hover:border-sky-500/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400 font-bold">
                      <span className="text-xs">09:30</span>
                      <Clock size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Point d&apos;équipe &amp; Cadrage Q3</div>
                      <div className="text-xs text-slate-400">Salle Visioconférence • Contact : Marc Dupont</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-bold">PRO</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-sky-500/40 bg-sky-500/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center text-amber-400 font-bold">
                      <span className="text-xs">14:30</span>
                      <Volume2 size={14} className="animate-bounce" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Signature Notaire &amp; Bilan</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Rappel Vocal Actif</span>
                      </div>
                      <div className="text-xs text-slate-400">12 Avenue des Champs • Alarme J-1 confirmée</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">PERSO</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center justify-center text-indigo-400 font-bold">
                      <span className="text-xs">18:00</span>
                      <Target size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Séance Sport &amp; Récupération</div>
                      <div className="text-xs text-slate-400">Objectif 45 minutes sans notifications</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-bold">SANTÉ</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Voice Alert View */}
          {activeTab === "voice" && (
            <div className="p-6 sm:p-8 text-center space-y-6">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.5)] mb-4">
                  <Volume2 size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Annonce Vocale Proactive HD</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Alamajonda énonce vos rappels à voix haute au moment précis pour une efficacité maximale.
                </p>
              </div>

              {/* Waveform Animation */}
              <div className="flex items-center justify-center gap-1.5 h-12 max-w-xs mx-auto">
                {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 35, 75].map((h, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-sky-400 transition-all duration-300 ${
                      isPlayingVoice ? "animate-pulse" : "opacity-40"
                    }`}
                    style={{ height: isPlayingVoice ? `${h}%` : "20%" }}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleTestVoice("FEMALE")}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                >
                  <Play size={14} />
                  <span>Voix Féminine (Claire)</span>
                </button>
                <button
                  onClick={() => handleTestVoice("MALE")}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2"
                >
                  <Play size={14} />
                  <span>Voix Masculine (Copilote)</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: AI Copilot */}
          {activeTab === "ai" && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="text-left">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-sky-400" />
                  <span>Routage Instantané en Langage Naturel</span>
                </h3>
                <p className="text-xs text-slate-400">Cliquez sur un exemple ou saisissez une phrase :</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSimulatePrompt(p)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700 text-sky-300 border border-sky-500/20 text-left transition-all"
                  >
                    « {p} »
                  </button>
                ))}
              </div>

              {simulatedAiAnswer && (
                <div className="p-4 rounded-xl bg-blue-950/40 border border-sky-500/40 text-xs text-slate-200 font-mono whitespace-pre-line animate-fade-in">
                  {simulatedAiAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. Bento Grid: Les 6 Super-Pouvoirs */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-28">
        <div className="text-center mb-14">
          <span className="text-xs font-extrabold text-sky-400 tracking-wider uppercase">L&apos;Ingénierie Anti-Oubli</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">Conçu pour éliminer le stress</h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto mt-3">
            Chaque fonctionnalité est pensée pour libérer votre esprit et garantir une ponctualité sans faille.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-sky-500/20 hover:border-sky-500/40 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Volume2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Synthèse Vocale &amp; Alarme</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ne dépend plus de simples sonneries passives. L&apos;agenda vous dicte directement qui vous devez voir et où vous rendre.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/20 hover:border-indigo-500/40 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Copilote IA Instantané</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dictez ou écrivez un mémo brut. L&apos;IA extrait automatiquement la date, l&apos;heure, les priorités et arme le rappel en 2ms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Export Universel .ICS</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Synchronisation fluide avec Google Calendar, Apple Calendar et Outlook en un clic pour garder vos données partout.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cloisonnement Perso &amp; Pro</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Basculez entre votre vie professionnelle et privée sans mélange d&apos;alertes pour préserver votre équilibre mental.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-rose-500/20 hover:border-rose-500/40 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <CheckSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tâches &amp; Checklists Intelligentes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Décomposez vos objectifs complexes en sous-tâches concrètes associées à des alarmes d&apos;échéance.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sessions Focus Pomodoro</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Activez des blocs de concentration intense de 25 minutes pour avancer sur vos priorités sans aucune interruption.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Section: Comment ça marche (3 étapes claires) */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-28">
        <div className="text-center mb-14">
          <span className="text-xs font-extrabold text-sky-400 tracking-wider uppercase">Simplicité Absolue</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Opérationnel en 30 secondes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/20 border border-blue-500/40 text-sky-400 font-black text-lg flex items-center justify-center mb-4">
              1
            </div>
            <h4 className="text-base font-bold text-white mb-1">Créez ou dictez</h4>
            <p className="text-xs text-slate-400">Tapez un mot ou envoyez un mémo vocal en langage direct.</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/20 border border-blue-500/40 text-sky-400 font-black text-lg flex items-center justify-center mb-4">
              2
            </div>
            <h4 className="text-base font-bold text-white mb-1">L&apos;IA organise</h4>
            <p className="text-xs text-slate-400">Les rappels veille J-1 et alarmes vocales sont armés automatiquement.</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/20 border border-blue-500/40 text-sky-400 font-black text-lg flex items-center justify-center mb-4">
              3
            </div>
            <h4 className="text-base font-bold text-white mb-1">Soyez alerté à la voix</h4>
            <p className="text-xs text-slate-400">À l&apos;heure dite, Alamajonda vous alerte et vous êtes toujours à l&apos;heure.</p>
          </div>
        </div>
      </section>

      {/* 6. Section: Grille Tarifaire */}
      <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-28">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold text-sky-400 tracking-wider uppercase">Tarification Transparente</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">Investissez dans votre sérénité</h2>
          <p className="text-sm text-slate-400 mt-2">Commencez gratuitement et passez à l&apos;illimité quand vous êtes prêt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Plan Gratuit */}
          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Découverte</h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-semibold">Gratuit à vie</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Pour découvrir la puissance de l&apos;agenda vocal.</p>

              <div className="text-4xl font-black text-white mb-6">
                0€ <span className="text-xs font-normal text-slate-400">/ pour toujours</span>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span>Jusqu&apos;à 15 rendez-vous actifs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span>Synthèse vocale native standard</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span>Copilote IA (10 actions / jour)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span>Export de planning .ICS universel</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full py-3.5 rounded-xl text-center text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Créer mon compte gratuit
            </Link>
          </div>

          {/* Plan Pro */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-950/80 to-slate-900/90 border-2 border-sky-400/80 shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex flex-col justify-between relative">
            <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-black text-[11px] uppercase tracking-wider shadow-md">
              Recommandé
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Pro Illimité</h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-blue-500/20 text-sky-300 font-bold">Sans engagement</span>
              </div>
              <p className="text-xs text-sky-200 mb-6">Pour les professionnels, dirigeants et personnes exigeantes.</p>

              <div className="text-4xl font-black text-white mb-6">
                9,99€ <span className="text-xs font-normal text-slate-300">/ mois</span>
              </div>

              <ul className="space-y-3.5 text-xs text-white mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span><strong>Rendez-vous et alarmes illimités</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span><strong>Copilote IA sans restriction 24/7</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span><strong>Synthèse vocale HD multi-voix</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span>Rappels de veille J-1 systématiques</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-sky-400 shrink-0" />
                  <span>Support prioritaire par nos ingénieurs</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full py-3.5 rounded-xl text-center text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-[0_10px_25px_rgba(37,99,235,0.4)] border border-sky-300/40 transition-all hover:scale-[1.02]"
            >
              Passer à Alamajonda Pro
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Section: FAQ Accordion */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-28">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold text-sky-400 tracking-wider uppercase">Questions Fréquentes</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Tout ce que vous devez savoir</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Comment fonctionne la synthèse vocale d'Alamajonda ?",
              a: "Alamajonda utilise une technologie de synthèse vocale haute définition en français. Lorsque l'heure d'un rappel arrive, le système énonce vocalement le titre, le lieu et les consignes du rendez-vous sans que vous ayez besoin de regarder votre écran.",
            },
            {
              q: "Puis-je synchroniser mes rendez-vous avec Google ou Apple Calendar ?",
              a: "Oui ! Alamajonda propose un export universel au format standard .ICS compatible instantanément avec Google Calendar, Apple Calendar, Outlook et Thunderbird.",
            },
            {
              q: "Mes données personnelles sont-elles confidentielles ?",
              a: "Absolument. Vos événements, contacts et tâches sont strictement isolés dans votre compte sécurisé avec chiffrement de bout en bout et ne sont jamais revendus ni partagés.",
            },
            {
              q: "L'application fonctionne-t-elle sur téléphone mobile ?",
              a: "Oui, Alamajonda est une Progressive Web App (PWA) ultra-réactive conçue pour mobile, tablette et ordinateur de bureau avec une expérience fluide.",
            },
            {
              q: "Puis-je annuler mon abonnement Pro à tout moment ?",
              a: "Oui, sans aucun engagement. Vous pouvez gérer ou suspendre votre abonnement en un clic depuis votre espace paramètres.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-100 hover:text-sky-300 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-sky-400" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Final Call To Action */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-20 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 border border-sky-400/40 shadow-[0_25px_70px_rgba(37,99,235,0.45)]">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Prêt à transformer vos journées ?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
            Rejoignez dès maintenant les utilisateurs qui ont éliminé les retards et les oublis avec Alamajonda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl text-sm font-black text-blue-900 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-[1.03]"
            >
              Créer mon compte gratuitement
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl text-sm font-bold text-white bg-blue-900/40 hover:bg-blue-900/60 border border-white/30 backdrop-blur-md transition-all"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Technical Support Section */}
      <TechnicalSupportSection />

      {/* 10. Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          <div className="flex justify-center">
            <Logo size={28} showText={true} />
          </div>
          <p>© {new Date().getFullYear()} Alamajonda. Ton assistant, ton quotidien. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
