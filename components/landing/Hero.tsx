"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Clock,
  Radio,
  Mic,
  MessageSquare,
  CalendarCheck,
} from "lucide-react";

export default function Hero() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedHours = time ? time.getHours().toString().padStart(2, "0") : "10";
  const formattedMinutes = time ? time.getMinutes().toString().padStart(2, "0") : "09";
  const formattedSeconds = time ? time.getSeconds().toString().padStart(2, "0") : "42";
  const ampm = time && time.getHours() >= 12 ? "PM" : "AM";

  return (
    <section className="relative min-h-[85vh] bg-[#05070c] text-white pt-4 pb-8 overflow-hidden font-sans flex flex-col justify-between">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top HUD Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-3">
        <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl min-h-[42px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <Radio size={13} className="text-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        
        {/* Main Grid: Centered Luxury Watch HUD + Top Right Founder Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-5">
          
          {/* LEFT SPACER (Col 2 for balance) */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* CENTER COLUMN: The Iconic Glowing Skeleton Watch HUD (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center py-1">
            
            {/* Main Center Container with Glow */}
            <div className="relative flex flex-col items-center group w-full max-w-[420px]">
              
              {/* Emerald Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/35 via-teal-500/25 to-cyan-500/35 rounded-full blur-3xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Watch Outer Ring & Frame */}
              <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[390px] md:h-[390px] rounded-full p-2 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-4 border-slate-700/80 flex items-center justify-center">
                
                {/* Watch Dial Inner Glass */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                  
                  {/* High Quality Background Watch Mechanical Visual */}
                  <Image
                    src="/images/dark-hud-watch.jpg"
                    alt="Horlogerie de précision Alamajonda"
                    fill
                    unoptimized={true}
                    className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* High Tech Radial HUD Overlay */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
                </div>
              </div>

              {/* Digital Time & System Sync Badge directly beneath Watch */}
              <div className="mt-3.5 px-5 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-3.5 text-center">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Clock size={15} className="animate-spin-slow" />
                  <span className="text-base sm:text-lg font-black font-mono tracking-wider text-white">
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}{" "}
                    <span className="text-xs text-emerald-400">{ampm}</span>
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-700" />
                <div className="text-left min-w-[60px]">
                  <div className="text-[9px] uppercase font-bold tracking-wider text-emerald-400">
                    Système
                  </div>
                  <div className="text-[10px] font-semibold text-slate-200">
                    Synchronisé
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Founder Office Photo (Top Right) (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start items-center lg:items-end">
            
            {/* 📸 Photo Fondateur au bureau - Format soigné et bien proportionné */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 group overflow-hidden w-full max-w-[270px]">
              <div className="relative rounded-[0.9rem] overflow-hidden bg-slate-950 aspect-[16/11]">
                <Image
                  src="/images/founder-desk-official.jpg"
                  alt="Le Fondateur au bureau avec l'application Alamajonda"
                  fill
                  unoptimized={true}
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>

        </div>

        {/* 🌟 3 Feature Cards (Tableaux) - Format Compact, Discret & Épuré */}
        <div className="max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-3.5">
          
          {/* Tableau 1: Rappels Vocaux IA */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 backdrop-blur-xl shadow-lg shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Mic size={16} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1 tracking-tight">
              Rappels Vocaux IA
            </h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Planifiez des rappels vocaux clairs et naturels en quelques secondes.
            </p>
          </div>

          {/* Tableau 2: Multi-Canaux SMS */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-xl shadow-lg shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <MessageSquare size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1 tracking-tight">
              Multi-Canaux SMS
            </h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
            </p>
          </div>

          {/* Tableau 3: Agenda Intelligent */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 backdrop-blur-xl shadow-lg shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/30 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <CalendarCheck size={16} className="text-teal-400 group-hover:text-teal-300 transition-colors" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1 tracking-tight">
              Agenda Intelligent
            </h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Organisez vos rendez-vous, réunions et tâches avec une planification intelligente.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
