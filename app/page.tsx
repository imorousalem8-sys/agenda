"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  Calendar,
  CheckSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  Play,
  Check,
  Clock,
  Sparkles,
  Target,
  ChevronDown,
  Layers,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import TechnicalSupportSection from "@/components/landing/TechnicalSupportSection";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function LandingPage() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeVoiceGender, setActiveVoiceGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [activeTab, setActiveTab] = useState<"planning" | "voice" | "ai">("planning");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [simulatedAiAnswer, setSimulatedAiAnswer] = useState<string | null>(null);

  const samplePrompts = [
    "RDV dentiste demain à 14h30 avec alarme veille",
    "Réunion de cadrage avec Marc vendredi à 10h",
    "Appeler le notaire lundi à 9h et me rappeler 30 min avant",
  ];

  const handleTestVoice = async (gender: "FEMALE" | "MALE" = activeVoiceGender) => {
    setActiveVoiceGender(gender);
    setIsPlayingVoice(true);
    await playAlertChime();

    const sample =
      gender === "FEMALE"
        ? "Bonjour ! Je suis votre assistante Alamajonda. À 14h30, votre réunion stratégique commence. Votre dossier est prêt et synchronisé."
        : "Bonjour ! Votre copilote Alamajonda vous alerte : rendez-vous client dans 15 minutes. Tout votre planning de l'après-midi est optimisé.";

    speakAIText(sample, {
      gender,
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  const handleSimulatePrompt = (text: string) => {
    setSimulatedAiAnswer("Analyse en cours par Alamajonda AI...");
    setTimeout(() => {
      setSimulatedAiAnswer(
        `Evenement cree avec succes : "${text}"\nAlarme vocale activee J-1 et rappel 15 min avant.\nSynchronise avec Google & Apple Calendar.`
      );
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full bg-gradient-to-b from-blue-600/20 via-sky-500/10 to-transparent blur-[120px]" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-blue-700/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ================================================================
          1. HEADER NAVIGATION
          ================================================================ */}
      <header id="header-nav" className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-3.5 flex items-center justify-between">
          <Logo size={32} showText={true} />

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalites</a>
            <a href="#simulator" className="hover:text-white transition-colors">Demonstration</a>
            <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              id="nav-login"
              href="/login"
              className="px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-slate-700/60 transition-all"
            >
              Connexion
            </Link>
            <Link
              id="nav-app"
              href="/dashboard"
              className="px-4 py-2 rounded-lg text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border border-blue-400/30 shadow-[0_0_16px_rgba(37,99,235,0.35)] flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Ouvrir l&apos;App</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================
          2. HERO SECTION
          ================================================================ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Agenda Intelligent avec Rappels Vocaux
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-tight leading-[1.08] max-w-4xl mx-auto mb-7">
          <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Ne ratez plus jamais{" "}
          </span>
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            un seul rendez-vous.{" "}
          </span>
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Votre agenda vous parle.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Fini les notifications silencieuses.{" "}
          <strong className="text-slate-200 font-semibold">Alamajonda</strong> associe rappels vocaux proactifs, calendrier intelligent et copilote IA pour securiser 100% de vos journees.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            id="cta-start"
            href="/register"
            className="px-8 py-4 rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-sky-500 shadow-[0_8px_30px_rgba(37,99,235,0.45)] border border-blue-400/30 flex items-center gap-2.5 transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Demarrer gratuitement
            <ArrowRight size={16} />
          </Link>

          <button
            id="cta-voice-test"
            onClick={() => handleTestVoice("FEMALE")}
            className="px-7 py-4 rounded-xl text-[15px] font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-slate-700/60 flex items-center gap-3 transition-all hover:scale-[1.02]"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isPlayingVoice ? "bg-amber-400 animate-ping" : "bg-sky-400"}`} />
            <Volume2 size={18} />
            <span>{isPlayingVoice ? "Synthese en cours..." : "Tester la voix IA"}</span>
          </button>
        </div>

        {/* Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto py-5 px-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-[12px] font-semibold text-slate-400">
          <div className="flex items-center justify-center gap-2.5">
            <Zap size={15} className="text-sky-400 shrink-0" />
            <span>Planification &lt; 2s</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Volume2 size={15} className="text-amber-400 shrink-0" />
            <span>Voix Francaise HD</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Calendar size={15} className="text-emerald-400 shrink-0" />
            <span>Synchro Google / Apple</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <ShieldCheck size={15} className="text-indigo-400 shrink-0" />
            <span>Chiffrement Securise</span>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. INTERACTIVE SIMULATOR
          ================================================================ */}
      <section id="simulator" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-32">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-sky-400 tracking-widest uppercase">Experience Interactive</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">Voyez Alamajonda en action</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Testez directement les 3 fonctionnalites phares sans installer d&apos;application.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-xl">
          {/* Browser Chrome */}
          <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3 bg-slate-950/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="text-[11px] font-mono text-slate-500 ml-3">app.alamajonda.com</span>
            </div>

            <div className="flex gap-1.5">
              {[
                { key: "planning" as const, icon: <Calendar size={12} />, label: "Planning" },
                { key: "voice" as const, icon: <Volume2 size={12} />, label: "Alerte Vocale" },
                { key: "ai" as const, icon: <Sparkles size={12} />, label: "Copilote IA" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                      : "text-slate-500 hover:text-slate-300 bg-slate-800/30"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Planning */}
          {activeTab === "planning" && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <div>
                  <h3 className="text-base font-bold text-white">Votre Journee Optimisee</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">3 evenements synchronises -- 2 rappels vocaux armes</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold">
                  En direct
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { time: "09:30", title: "Point d'equipe & Cadrage Q3", desc: "Salle Visioconference -- Marc Dupont", tag: "PRO", color: "blue" },
                  { time: "14:30", title: "Signature Notaire & Bilan", desc: "12 Avenue des Champs -- Alarme J-1", tag: "PERSO", color: "amber", vocal: true },
                  { time: "18:00", title: "Seance Sport & Recuperation", desc: "Objectif 45 minutes sans notifications", tag: "SANTE", color: "indigo" },
                ].map((evt, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl bg-slate-800/40 border ${evt.vocal ? "border-sky-500/30 bg-sky-500/5" : "border-slate-700/40"} flex items-center justify-between hover:border-sky-500/30 transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-lg bg-${evt.color}-500/10 border border-${evt.color}-500/25 flex flex-col items-center justify-center text-${evt.color}-400 font-bold text-[10px]`}>
                        <span>{evt.time}</span>
                        {evt.vocal ? <Volume2 size={12} className="animate-bounce" /> : <Clock size={12} />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-2">
                          {evt.title}
                          {evt.vocal && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold">Rappel Vocal</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{evt.desc}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-${evt.color}-500/15 text-${evt.color}-300`}>{evt.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Voice */}
          {activeTab === "voice" && (
            <div className="p-6 sm:p-8 text-center space-y-6">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)] mb-4">
                  <Volume2 size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Annonce Vocale Proactive HD</h3>
                <p className="text-[12px] text-slate-500 mt-1">
                  Vos rappels enonces a voix haute au moment precis.
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 h-12 max-w-xs mx-auto">
                {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 35, 75].map((h, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-sky-400 transition-all duration-300 ${
                      isPlayingVoice ? "animate-pulse" : "opacity-30"
                    }`}
                    style={{ height: isPlayingVoice ? `${h}%` : "20%" }}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleTestVoice("FEMALE")}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[12px] shadow-lg flex items-center gap-2 transition-all"
                >
                  <Play size={13} />
                  Voix Feminine
                </button>
                <button
                  onClick={() => handleTestVoice("MALE")}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[12px] border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <Play size={13} />
                  Voix Masculine
                </button>
              </div>
            </div>
          )}

          {/* Tab: AI Copilot */}
          {activeTab === "ai" && (
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-sky-400" />
                  Routage Instantane en Langage Naturel
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">Cliquez sur un exemple ou saisissez une phrase :</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSimulatePrompt(p)}
                    className="px-3 py-1.5 rounded-lg text-[11px] bg-slate-800/60 hover:bg-slate-700 text-sky-300 border border-slate-700/60 text-left transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {simulatedAiAnswer && (
                <div className="p-4 rounded-xl bg-blue-950/30 border border-sky-500/30 text-[12px] text-slate-300 font-mono whitespace-pre-line animate-fade-in">
                  {simulatedAiAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          4. FEATURES GRID
          ================================================================ */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-32">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-sky-400 tracking-widest uppercase">Fonctionnalites</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Concu pour eliminer le stress</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto mt-3">
            Chaque fonctionnalite est pensee pour liberer votre esprit et garantir une ponctualite sans faille.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: <Volume2 size={22} />, title: "Synthese Vocale & Alarme", desc: "Ne dependez plus de simples sonneries. L'agenda vous dicte directement qui vous devez voir et ou vous rendre.", color: "sky" },
            { icon: <Sparkles size={22} />, title: "Copilote IA Instantane", desc: "Dictez ou ecrivez un memo brut. L'IA extrait automatiquement la date, l'heure, les priorites et arme le rappel.", color: "indigo" },
            { icon: <Calendar size={22} />, title: "Export Universel .ICS", desc: "Synchronisation fluide avec Google Calendar, Apple Calendar et Outlook en un clic.", color: "emerald" },
            { icon: <Layers size={22} />, title: "Cloisonnement Perso & Pro", desc: "Basculez entre vie professionnelle et privee sans melange d'alertes pour preserver votre equilibre.", color: "amber" },
            { icon: <CheckSquare size={22} />, title: "Taches & Checklists", desc: "Decomposez vos objectifs complexes en sous-taches concretes associees a des alarmes d'echeance.", color: "rose" },
            { icon: <Target size={22} />, title: "Sessions Focus Pomodoro", desc: "Activez des blocs de concentration intense de 25 minutes pour avancer sans interruption.", color: "cyan" },
          ].map((card, i) => (
            <div
              key={i}
              className={`p-7 rounded-2xl bg-slate-900/60 border border-slate-800/60 hover:border-${card.color}-500/30 transition-all duration-300 group`}
            >
              <div className={`w-11 h-11 rounded-xl bg-${card.color}-500/10 border border-${card.color}-500/20 text-${card.color}-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          5. HOW IT WORKS (3 Steps)
          ================================================================ */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-sky-400 tracking-widest uppercase">Simplicite Absolue</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Operationnel en 30 secondes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Creez ou dictez", desc: "Tapez un mot ou envoyez un memo vocal en langage direct." },
            { step: "2", title: "L'IA organise", desc: "Les rappels veille J-1 et alarmes vocales sont armes automatiquement." },
            { step: "3", title: "Soyez alerte a la voix", desc: "A l'heure dite, Alamajonda vous alerte et vous etes toujours a l'heure." },
          ].map((item, i) => (
            <div key={i} className="text-center p-8 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/15 border border-blue-500/30 text-sky-400 font-black text-lg flex items-center justify-center mb-5">
                {item.step}
              </div>
              <h4 className="text-[15px] font-bold text-white mb-2">{item.title}</h4>
              <p className="text-[12px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          6. PRICING
          ================================================================ */}
      <section id="pricing" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-sky-400 tracking-widest uppercase">Tarification Transparente</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Investissez dans votre serenite</h2>
          <p className="text-sm text-slate-400 mt-3">Commencez gratuitement et passez a l&apos;illimite quand vous etes pret.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/60 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Decouverte</h3>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 font-semibold">Gratuit a vie</span>
            </div>
            <p className="text-[12px] text-slate-500 mb-6">Pour decouvrir la puissance de l&apos;agenda vocal.</p>

            <div className="text-4xl font-black text-white mb-8">
              0&#8364; <span className="text-[12px] font-normal text-slate-500">/ pour toujours</span>
            </div>

            <ul className="space-y-3 text-[13px] text-slate-300 mb-8 flex-1">
              {["Jusqu'a 15 rendez-vous actifs", "Synthese vocale native standard", "Copilote IA (10 actions / jour)", "Export de planning .ICS universel"].map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Check size={15} className="text-sky-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="w-full py-3.5 rounded-xl text-center text-[13px] font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors block"
            >
              Creer mon compte gratuit
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-950/70 to-slate-900/80 border-2 border-blue-500/50 shadow-[0_16px_40px_rgba(37,99,235,0.3)] flex flex-col relative">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
              Recommande
            </div>

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Pro Illimite</h3>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-blue-500/15 text-sky-300 font-bold">Sans engagement</span>
            </div>
            <p className="text-[12px] text-sky-200/70 mb-6">Pour les professionnels et personnes exigeantes.</p>

            <div className="text-4xl font-black text-white mb-8">
              9,99&#8364; <span className="text-[12px] font-normal text-slate-400">/ mois</span>
            </div>

            <ul className="space-y-3 text-[13px] text-slate-200 mb-8 flex-1">
              {[
                { text: "Rendez-vous et alarmes illimites", bold: true },
                { text: "Copilote IA sans restriction 24/7", bold: true },
                { text: "Synthese vocale HD multi-voix", bold: true },
                { text: "Rappels de veille J-1 systematiques", bold: false },
                { text: "Support prioritaire par nos ingenieurs", bold: false },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Check size={15} className="text-sky-400 shrink-0" />
                  <span className={f.bold ? "font-semibold" : ""}>{f.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="w-full py-3.5 rounded-xl text-center text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-[0_8px_20px_rgba(37,99,235,0.35)] border border-sky-400/30 transition-all hover:scale-[1.01] block"
            >
              Passer a Alamajonda Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          7. FAQ
          ================================================================ */}
      <section id="faq" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 mb-32">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-sky-400 tracking-widest uppercase">Questions Frequentes</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Tout ce que vous devez savoir</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Comment fonctionne la synthese vocale d'Alamajonda ?",
              a: "Alamajonda utilise une technologie de synthese vocale haute definition en francais. Lorsque l'heure d'un rappel arrive, le systeme enonce vocalement le titre, le lieu et les consignes du rendez-vous sans que vous ayez besoin de regarder votre ecran.",
            },
            {
              q: "Puis-je synchroniser mes rendez-vous avec Google ou Apple Calendar ?",
              a: "Oui. Alamajonda propose un export universel au format standard .ICS compatible instantanement avec Google Calendar, Apple Calendar, Outlook et Thunderbird.",
            },
            {
              q: "Mes donnees personnelles sont-elles confidentielles ?",
              a: "Absolument. Vos evenements, contacts et taches sont strictement isoles dans votre compte securise avec chiffrement de bout en bout et ne sont jamais revendus ni partages.",
            },
            {
              q: "L'application fonctionne-t-elle sur telephone mobile ?",
              a: "Oui, Alamajonda est une Progressive Web App (PWA) ultra-reactive concue pour mobile, tablette et ordinateur de bureau.",
            },
            {
              q: "Puis-je annuler mon abonnement Pro a tout moment ?",
              a: "Oui, sans aucun engagement. Vous pouvez gerer ou suspendre votre abonnement en un clic depuis votre espace parametres.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/50 border border-slate-800/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-[13px] font-semibold text-slate-200 hover:text-white transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform duration-200 shrink-0 ${
                    openFaq === idx ? "rotate-180 text-sky-400" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-[12px] text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          8. FINAL CTA
          ================================================================ */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-24 text-center">
        <div className="p-10 sm:p-16 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 border border-blue-500/30 shadow-[0_20px_50px_rgba(37,99,235,0.35)]">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Pret a transformer vos journees ?
          </h2>
          <p className="text-sm text-blue-100/80 max-w-lg mx-auto mb-8 leading-relaxed">
            Rejoignez des maintenant les utilisateurs qui ont elimine les retards et les oublis avec Alamajonda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl text-[14px] font-bold text-blue-900 bg-white hover:bg-slate-100 shadow-lg transition-all hover:scale-[1.02]"
            >
              Creer mon compte gratuitement
            </Link>
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm transition-all"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          9. TECHNICAL SUPPORT
          ================================================================ */}
      <TechnicalSupportSection />

      {/* ================================================================
          10. FOOTER
          ================================================================ */}
      <footer className="border-t border-slate-800/60 bg-slate-950 py-10 text-center text-[12px] text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          <div className="flex justify-center">
            <Logo size={28} showText={true} />
          </div>
          <p>&copy; {new Date().getFullYear()} Alamajonda. Votre assistant de productivite. Tous droits reserves.</p>
        </div>
      </footer>
    </div>
  );
}
