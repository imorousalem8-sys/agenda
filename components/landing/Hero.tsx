"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Radio,
  Mic,
  MessageSquare,
  CalendarCheck,
  Zap,
  ArrowRight,
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

  const formattedHours = time ? time.getHours().toString().padStart(2, "0") : "20";
  const formattedMinutes = time ? time.getMinutes().toString().padStart(2, "0") : "27";
  const formattedSeconds = time ? time.getSeconds().toString().padStart(2, "0") : "32";
  
  const formattedDate = time
    ? time.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).toUpperCase()
    : "SAM. 12 SEPT.";

  return (
    <section className="relative w-full bg-[#05070c] text-white pt-6 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Stage Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Cockpit Grid Responsive (Gauche: Horloge + Titre | Centre: Montre | Droite: Photo) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* A. Colonne Gauche : Horloge IA Rehaussée + Grand Titre & Sous-titre Personnalisés */}
          <div className="lg:col-span-4 flex flex-col items-start justify-center pr-0 lg:pr-2">
            
            {/* 1. Module Digital Horloge IA (Rehaussé en haut) */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-black/95 border border-emerald-500/35 backdrop-blur-2xl shadow-xl shadow-black/80 w-full max-w-[240px] mb-5 group hover:border-emerald-400/50 transition-all duration-300">
              
              {/* Header avec signal actif */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                    Horloge IA
                  </span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded font-semibold border border-emerald-500/20">
                  SYNC LIVE
                </span>
              </div>

              {/* Affichage de l'Heure */}
              <div className="flex items-baseline justify-between px-0.5 my-0.5 font-mono">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl sm:text-[1.65rem] font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    {formattedHours}:{formattedMinutes}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400">
                    :{formattedSeconds}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-800/90 px-1 py-0.5 rounded">
                  24H
                </span>
              </div>

              {/* Date & Latence */}
              <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-slate-300 text-[10px]">{formattedDate}</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <Zap size={10} /> &lt;0.1ms
                </span>
              </div>

            </div>

            {/* 2. Grand Titre Personnalisé (Style référence modernisé en mode sombre) */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.25rem] font-black text-white tracking-tight leading-[1.2] mb-3">
              Ne manquez plus aucun{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* 3. Sous-titre explicatif fluide */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-md">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* 4. Bouton d'action */}
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>En savoir plus</span>
              <ArrowRight size={14} />
            </Link>

          </div>

          {/* B. Colonne Centre : Montre Mécanique Squelette Lumineuse */}
          <div className="lg:col-span-4 w-full flex justify-center items-center py-2">
            <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[330px] md:h-[330px] rounded-full p-2 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-4 border-slate-700/80 flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                <Image
                  src="/images/dark-hud-watch.jpg"
                  alt="Horlogerie de précision Alamajonda"
                  fill
                  unoptimized={true}
                  className="object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* C. Colonne Droite : Photo Fondateur au Bureau */}
          <div className="lg:col-span-4 w-full flex justify-center lg:justify-end">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 group overflow-hidden w-full max-w-[320px] sm:max-w-[350px]">
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

        {/* 3. Les 3 Tableaux : Décollés, Centrés et Parfaitement Espacés */}
        <div 
          style={{ marginTop: "70px", marginBottom: "20px" }}
          className="w-full flex justify-center items-center flex-shrink-0"
        >
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
