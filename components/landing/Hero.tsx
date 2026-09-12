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
    <section className="relative w-full bg-[#05070c] text-white pt-6 pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden font-sans">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Centered Stage */}
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* 1. Top HUD Status Bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex items-center justify-between py-2 px-5 rounded-2xl bg-slate-900/50 border border-slate-800/70 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <Radio size={13} className="text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* 2. Cockpit : Badge Heure en Haut à Gauche + Montre Centrée + Photo à Droite */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 relative">
          
          {/* A. 🕒 Badge Heure Numérique (Placé en haut à gauche de la montre) */}
          <div className="flex flex-col justify-center items-center lg:items-end self-center lg:self-start lg:pt-2">
            <div className="px-4 py-1.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-xl flex items-center gap-3 text-center">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Clock size={14} className="animate-spin-slow" />
                <span className="text-sm sm:text-base font-black font-mono tracking-wider text-white">
                  {formattedHours}:{formattedMinutes}:{formattedSeconds}{" "}
                  <span className="text-[10px] text-emerald-400">{ampm}</span>
                </span>
              </div>
              <div className="h-3.5 w-px bg-slate-700" />
              <div className="text-left">
                <div className="text-[8px] uppercase font-bold tracking-wider text-emerald-400">
                  Système
                </div>
                <div className="text-[10px] font-semibold text-slate-200">
                  Synchronisé
                </div>
              </div>
            </div>
          </div>

          {/* B. Montre Mécanique Centrée (Format compact et net) */}
          <div className="flex flex-col items-center group">
            <div className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] rounded-full p-2 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-4 border-slate-700/80 flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                <Image
                  src="/images/dark-hud-watch.jpg"
                  alt="Horlogerie de précision Alamajonda"
                  fill
                  unoptimized={true}
                  className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* C. Photo Fondateur au bureau */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 group overflow-hidden w-[260px] sm:w-[300px] md:w-[330px]">
              <div className="relative rounded-[1.35rem] overflow-hidden bg-slate-950 aspect-[16/11]">
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

        {/* 3. Les 3 Tableaux : Largement Espacés du Cockpit du haut avec un grand mt-14 sm:mt-20 */}
        <div className="w-full flex justify-center items-center mt-14 sm:mt-20">
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Tableau 1: Rappels Vocaux IA */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 backdrop-blur-xl shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 group">
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
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 group">
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
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-teal-500/40 backdrop-blur-xl shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 group">
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

      </div>
    </section>
  );
}
