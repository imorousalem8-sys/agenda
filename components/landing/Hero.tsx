"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  Volume2,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Play,
  PhoneCall,
  Bell,
  Cpu,
  Radio,
  Sliders,
} from "lucide-react";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function Hero() {
  const [time, setTime] = useState<Date | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTestVoice = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playAlertChime();
    const message =
      "Bonjour ! Sentinelle Alamajonda activée. Votre agenda et vos alertes d'appels vocaux sont parfaitement synchronisés.";
    speakAIText(message, {
      gender: "FEMALE",
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const formattedHours = time ? time.getHours().toString().padStart(2, "0") : "10";
  const formattedMinutes = time ? time.getMinutes().toString().padStart(2, "0") : "09";
  const formattedSeconds = time ? time.getSeconds().toString().padStart(2, "0") : "42";
  const ampm = time && time.getHours() >= 12 ? "PM" : "AM";

  return (
    <section className="relative min-h-[90vh] bg-[#05070c] text-white pt-6 pb-20 overflow-hidden font-sans">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top HUD Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2.5 px-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
              Cockpit Alamajonda
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300">
              <Cpu size={13} className="text-cyan-400" />
              IA Vocale Prête
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono flex items-center gap-1.5">
              <Radio size={12} className="animate-pulse" />
              Système Synchronisé
            </span>
            <span className="hidden md:inline-flex px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
              Latence : 0.4ms
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: HUD Watch Center + Founder Office Top Right + Smart Text Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT COLUMN: Voice Signal & Event Timeline (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5 order-2 lg:order-1">
            
            {/* Card 1: Voice Analytics */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-500/40 transition-all shadow-xl shadow-black/40 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic size={15} className="text-emerald-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
                    Analyse Vocale
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  99.8% Clarté
                </span>
              </div>

              {/* Dynamic Oscillogram simulation */}
              <div className="h-14 flex items-center justify-between gap-1 px-2 bg-slate-950/70 rounded-xl border border-slate-800/60 my-2">
                {[40, 65, 30, 85, 95, 45, 70, 100, 60, 40, 80, 55, 90, 35, 75, 50].map(
                  (h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300"
                    />
                  )
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Statut : Écoute active
                </span>
                <button
                  onClick={handleTestVoice}
                  disabled={isPlayingAudio}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Play size={10} />
                  {isPlayingAudio ? "En cours..." : "Tester la voix"}
                </button>
              </div>
            </div>

            {/* Card 2: Event Timeline */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-xl shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-cyan-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
                    Chronologie des Événements
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Aujourd&apos;hui</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Réunion Stratégique</p>
                    <p className="text-[11px] text-slate-400">Briefing équipe & objectifs</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md text-[11px]">
                    10:15
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">Appel Vocal IA Programmé</p>
                    <p className="text-[11px] text-cyan-400 flex items-center gap-1">
                      <PhoneCall size={10} /> Rappel téléphonique
                    </p>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md text-[11px]">
                    11:30
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-300">Revue des Rendez-vous</p>
                    <p className="text-[11px] text-slate-500">Synchronisation automatique</p>
                  </div>
                  <span className="font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md text-[11px]">
                    14:00
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* CENTER COLUMN: The Iconic Glowing Skeleton Watch HUD (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 py-4">
            
            {/* Main Center Container with Glow */}
            <div className="relative flex flex-col items-center group w-full max-w-[430px]">
              
              {/* Emerald Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Watch Outer Ring & Frame */}
              <div className="relative w-[320px] h-[320px] sm:w-[370px] sm:h-[370px] rounded-full p-2 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-4 border-slate-700/80 flex items-center justify-center">
                
                {/* Watch Dial Inner Glass */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                  
                  {/* High Quality Background Watch Mechanical Visual */}
                  <Image
                    src="/images/dark-hud-watch.jpg"
                    alt="Horlogerie de précision Alamajonda"
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* High Tech Radial HUD Overlay */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
                </div>
              </div>

              {/* Digital Time & System Sync Badge directly beneath Watch */}
              <div className="mt-4 px-6 py-3 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-4 text-center">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Clock size={18} className="animate-spin-slow" />
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white">
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}{" "}
                    <span className="text-xs text-emerald-400">{ampm}</span>
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    Système
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    Synchronisé
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Founder Office Photo (Top Right) + Simplified Human Tasks (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5 order-3">
            
            {/* 📸 Top Right Highlighted Card: Founder Office Desk Photo */}
            <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/70 group overflow-hidden">
              
              <div className="relative rounded-[1.35rem] overflow-hidden bg-slate-950 aspect-[16/10]">
                {/* Official Founder Photo */}
                <Image
                  src="/images/founder-desk-official.jpg"
                  alt="Le Fondateur au bureau avec l'application Alamajonda sur MacBook"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette & sleek corner tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-white leading-none">
                        Espace Fondateur
                      </p>
                      <p className="text-[10px] text-emerald-300">
                        Agenda Pro & Assistant Vocal
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    EN DIRECT
                  </span>
                </div>
              </div>

            </div>

            {/* Card 4: Live Voice Transcription */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-xl shadow-black/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Volume2 size={15} className="text-emerald-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
                    Transcription Vocale
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">IA Active</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic">
                &ldquo;Rappelle-moi mon rendez-vous de 14h par téléphone avec 15 minutes d&apos;avance.&rdquo;
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium mt-2">
                <CheckCircle2 size={13} className="text-emerald-400" />
                Événement et appel vocal enregistrés
              </div>
            </div>

            {/* Card 5: Smart Tasks (Clean human tasks instead of code!) */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-500/40 transition-all shadow-xl shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-cyan-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
                    Actions & Tâches Intelligentes
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Automatisé</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200 bg-slate-950/60 p-2 rounded-lg border border-slate-800/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Appel vocal IA programmé pour le rendez-vous</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200 bg-slate-950/60 p-2 rounded-lg border border-slate-800/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Synchronisation instantanée avec le calendrier</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200 bg-slate-950/60 p-2 rounded-lg border border-slate-800/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Notification envoyée sur votre téléphone</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Headline & Call To Action Banner */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Votre temps, orchestré avec une{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                précision absolue.
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Alamajonda veille sur chaque minute de votre journée et vous appelle directement sur votre téléphone avec une voix ultra-naturelle.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>Accéder à mon agenda</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
