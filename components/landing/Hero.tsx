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
  ArrowRight,
  Play,
  Radio,
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
    speakAIText("Test audio Alamajonda", {
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

      {/* Top HUD Status Bar - Lisse et épuré */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between py-3 px-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl min-h-[52px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: HUD Watch Center + Founder Office Top Right + Smooth Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT COLUMN: 2 Cards lisses (Espace intérieur totalement épuré) */}
          <div className="lg:col-span-3 flex flex-col gap-5 order-2 lg:order-1">
            
            {/* Card 1: Espace Gauche Haut (avec onde sonore) */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-500/40 transition-all shadow-xl shadow-black/40 min-h-[160px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Mic size={16} className="text-emerald-400" />
              </div>

              {/* Dynamic Oscillogram Waveform */}
              <div className="h-14 flex items-center justify-between gap-1 px-3 bg-slate-950/40 rounded-xl my-2">
                {[40, 65, 30, 85, 95, 45, 70, 100, 60, 40, 80, 55, 90, 35, 75, 50].map(
                  (h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full opacity-80"
                    />
                  )
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <button
                  onClick={handleTestVoice}
                  disabled={isPlayingAudio}
                  aria-label="Tester la voix"
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
                >
                  <Play size={12} />
                </button>
              </div>
            </div>

            {/* Card 2: Espace Gauche Bas (Intérieur totalement lisse sans sous-cadres) */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-xl shadow-black/40 min-h-[220px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Calendar size={16} className="text-cyan-400" />
              </div>
              <div className="flex-1 w-full" />
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

              {/* Digital Time & System Sync Badge */}
              <div className="mt-4 px-6 py-3 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-4 text-center">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Clock size={18} className="animate-spin-slow" />
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white">
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}{" "}
                    <span className="text-xs text-emerald-400">{ampm}</span>
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div className="text-left min-w-[70px]">
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

          {/* RIGHT COLUMN: Founder Office Photo (Top Right) + 2 Smooth Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5 order-3">
            
            {/* 📸 Top Right: Photo Fondateur au bureau (Propre, lisse et sans barre superposée) */}
            <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/70 group overflow-hidden">
              <div className="relative rounded-[1.35rem] overflow-hidden bg-slate-950 aspect-[16/10]">
                <Image
                  src="/images/founder-desk-official.jpg"
                  alt="Le Fondateur au bureau"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Card 3: Espace Droite Milieu (Totalement lisse à l'intérieur) */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-xl shadow-black/40 min-h-[140px] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <Volume2 size={16} className="text-emerald-400" />
              </div>
              <div className="flex-1 w-full" />
            </div>

            {/* Card 4: Espace Droite Bas (Totalement lisse à l'intérieur) */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-500/40 transition-all shadow-xl shadow-black/40 min-h-[150px] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <Sparkles size={16} className="text-cyan-400" />
              </div>
              <div className="flex-1 w-full" />
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
