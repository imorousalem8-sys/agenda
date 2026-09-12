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
  Activity,
  CheckCircle2,
} from "lucide-react";
import BMXRiderAnimation from "./BMXRiderAnimation";
import AppDetailsModal from "./AppDetailsModal";

export default function Hero() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedHours = time ? time.getHours().toString().padStart(2, "0") : "20";
  const formattedMinutes = time ? time.getMinutes().toString().padStart(2, "0") : "35";
  const formattedSeconds = time ? time.getSeconds().toString().padStart(2, "0") : "10";
  
  const formattedDate = time
    ? time.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).toUpperCase()
    : "SAM. 12 SEPT.";

  return (
    <section className="relative w-full bg-[#05070c] text-white pt-3 sm:pt-6 pb-16 sm:pb-28 px-2 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Stage Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Cockpit Grid Responsive — 100% HORIZONTAL SUR MOBILE & DESKTOP (3 Colonnes Côte à Côte) */}
        <div className="w-full grid grid-cols-12 gap-1.5 sm:gap-4 md:gap-6 lg:gap-8 items-center">
          
          {/* A. Colonne Gauche : Décollée du bord + Horloge IA + Parcours BMX + Grand Titre & Boutons */}
          <div 
            className="col-span-5 lg:col-span-4 flex flex-col items-start justify-center pr-0.5 sm:pr-2 pl-1 sm:pl-3"
          >
            
            {/* 1. Module Digital Horloge IA (Espacement proportionné) */}
            <div 
              className="p-1.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/95 to-black/95 border border-emerald-500/35 backdrop-blur-2xl shadow-xl shadow-black/80 w-full max-w-[240px] group hover:border-emerald-400/50 transition-all duration-300 mb-2 sm:mb-[1cm]"
            >
              {/* Header avec signal actif */}
              <div className="flex items-center justify-between pb-1 sm:pb-2 mb-1 sm:mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[7px] sm:text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                    Horloge IA
                  </span>
                </div>
                <span className="text-[6px] sm:text-[9px] font-mono bg-emerald-500/15 text-emerald-300 px-1 sm:px-1.5 py-0.5 rounded font-semibold border border-emerald-500/20">
                  LIVE
                </span>
              </div>

              {/* Affichage de l'Heure */}
              <div className="flex items-baseline justify-between px-0.5 my-0.5 font-mono">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-sm sm:text-2xl lg:text-[1.65rem] font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    {formattedHours}:{formattedMinutes}
                  </span>
                  <span className="text-[10px] sm:text-base font-bold text-emerald-400">
                    :{formattedSeconds}
                  </span>
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 bg-slate-800/90 px-1 py-0.5 rounded">
                  24H
                </span>
              </div>

              {/* Date & Latence */}
              <div className="mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[7px] sm:text-[10px] font-mono text-slate-400">
                <span className="text-slate-300 text-[7px] sm:text-[10px] truncate max-w-[65%]">{formattedDate}</span>
                <span className="text-emerald-400 flex items-center gap-0.5 text-[7px] sm:text-[10px]">
                  <Zap size={9} /> &lt;0.1ms
                </span>
              </div>
            </div>

            {/* Parcours BMX Bad Boys (DOM & SALEM sur le goudron) */}
            <div className="w-full max-w-md overflow-visible relative -mb-1">
              <BMXRiderAnimation />
            </div>

            {/* 2. Grand Titre Personnalisé */}
            <h1 className="text-[0.72rem] xs:text-[0.85rem] sm:text-2xl lg:text-3xl xl:text-[2.1rem] font-black text-white tracking-tight leading-[1.15] mb-1 sm:mb-3 pt-0 relative z-10">
              Ne manquez plus aucun{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* 3. Sous-titre explicatif fluide */}
            <p className="text-[7.5px] xs:text-[9px] sm:text-xs md:text-sm text-slate-300 leading-tight sm:leading-relaxed mb-2 sm:mb-5 max-w-md line-clamp-3 sm:line-clamp-none">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* 4. Boutons d'action */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-bold text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>En savoir plus</span>
                <ArrowRight size={11} className="hidden xs:inline" />
              </button>

              <Link
                href="/register"
                className="inline-flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full font-bold text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Démarrer</span>
              </Link>
            </div>

          </div>

          {/* B. Colonne Centre : Montre Mécanique Squelette Lumineuse (Toujours Horizontale) */}
          <div className="col-span-3 lg:col-span-4 w-full flex justify-center items-center py-1 sm:py-2">
            <div className="relative w-[75px] h-[75px] xs:w-[95px] xs:h-[95px] sm:w-[170px] sm:h-[170px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] rounded-full p-1 sm:p-2 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-2 sm:border-4 border-slate-700/80 flex items-center justify-center shrink-0">
              <div className="relative w-full h-full rounded-full overflow-hidden border sm:border-2 border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                <Image
                  src="/images/dark-hud-watch.jpg"
                  alt="Horlogerie de précision Alamajonda"
                  fill
                  unoptimized={true}
                  className="object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
                {/* Mini Sas / Porte Temporelle de l'Horloge */}
                <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-950/90 border border-emerald-400/60 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.6)] flex items-center gap-1 sm:gap-1.5 z-20 pointer-events-none whitespace-nowrap">
                  <span className="w-1 h-1 sm:h-1.5 sm:w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[6px] sm:text-[9px] font-mono font-bold text-emerald-300 tracking-wider">SAS HORLOGE IA</span>
                </div>
              </div>
            </div>
          </div>

          {/* C. Colonne Droite : Photo Fondateur au Bureau (Toujours Horizontale) */}
          <div className="col-span-4 lg:col-span-4 w-full flex justify-end items-center">
            <div className="relative rounded-xl sm:rounded-3xl p-0.5 sm:p-1 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 group overflow-hidden w-full max-w-[110px] xs:max-w-[135px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px]">
              <div className="relative rounded-[0.6rem] sm:rounded-[1.35rem] overflow-hidden bg-slate-950 aspect-[16/11]">
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

        {/* 3. Les 3 Modules de Haute Technologie (Toujours en Ligne Horizontale sur 3 Colonnes) */}
        <div 
          className="w-full flex justify-center items-center flex-shrink-0 mt-8 sm:mt-16 md:mt-20 mb-4 sm:mb-8"
        >
          <div className="w-full max-w-5xl grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-5">
            
            {/* Tableau 1: Rappels Vocaux IA (Horizontal sur 3 colonnes) */}
            <div className="relative p-2 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl shadow-black/70 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
              
              {/* Header Module avec badge */}
              <div className="flex items-center justify-between mb-1.5 sm:mb-3 pb-1 sm:pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Mic size={12} className="sm:hidden" />
                    <Mic size={14} className="hidden sm:inline" />
                  </div>
                  <span className="text-[7px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    M 01
                  </span>
                </div>
                <span className="text-[6px] sm:text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 sm:px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  AUDIO
                </span>
              </div>

              {/* Titre & Description */}
              <div>
                <h3 className="text-[9px] xs:text-[11px] sm:text-base font-bold text-white mb-0.5 sm:mb-1.5 tracking-tight group-hover:text-emerald-300 transition-colors">
                  Rappels Vocaux IA
                </h3>
                <p className="text-[7px] xs:text-[8px] sm:text-xs text-slate-400 leading-tight sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                  Planifiez des rappels vocaux clairs et naturels en quelques secondes.
                </p>
              </div>

              {/* Pied de carte télémétrie */}
              <div className="pt-1 sm:pt-2 border-t border-slate-800/60 flex items-center justify-between text-[6.5px] sm:text-[10px] font-mono text-emerald-400">
                <span className="flex items-center gap-0.5 sm:gap-1 text-slate-400 truncate">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Voix HD
                </span>
                <span className="font-bold shrink-0">100% AUTO</span>
              </div>

            </div>

            {/* Tableau 2: Multi-Canaux SMS (Horizontal sur 3 colonnes) */}
            <div className="relative p-2 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-black/70 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
              
              {/* Header Module avec badge */}
              <div className="flex items-center justify-between mb-1.5 sm:mb-3 pb-1 sm:pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <MessageSquare size={12} className="sm:hidden" />
                    <MessageSquare size={14} className="hidden sm:inline" />
                  </div>
                  <span className="text-[7px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    M 02
                  </span>
                </div>
                <span className="text-[6px] sm:text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1 sm:px-2 py-0.5 rounded-full border border-cyan-500/20 font-bold">
                  SMS
                </span>
              </div>

              {/* Titre & Description */}
              <div>
                <h3 className="text-[9px] xs:text-[11px] sm:text-base font-bold text-white mb-0.5 sm:mb-1.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                  Multi-Canaux SMS
                </h3>
                <p className="text-[7px] xs:text-[8px] sm:text-xs text-slate-400 leading-tight sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                  Envoyez des confirmations et rappels automatiques par SMS instantanément.
                </p>
              </div>

              {/* Pied de carte télémétrie */}
              <div className="pt-1 sm:pt-2 border-t border-slate-800/60 flex items-center justify-between text-[6.5px] sm:text-[10px] font-mono text-cyan-400">
                <span className="flex items-center gap-0.5 sm:gap-1 text-slate-400 truncate">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Routage
                </span>
                <span className="font-bold shrink-0">&lt; 1 SEC</span>
              </div>

            </div>

            {/* Tableau 3: Agenda Intelligent (Horizontal sur 3 colonnes) */}
            <div className="relative p-2 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-teal-500/30 backdrop-blur-2xl shadow-2xl shadow-black/70 hover:border-teal-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
              
              {/* Header Module avec badge */}
              <div className="flex items-center justify-between mb-1.5 sm:mb-3 pb-1 sm:pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                    <CalendarCheck size={12} className="sm:hidden" />
                    <CalendarCheck size={14} className="hidden sm:inline" />
                  </div>
                  <span className="text-[7px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    M 03
                  </span>
                </div>
                <span className="text-[6px] sm:text-[9px] font-mono text-teal-400 bg-teal-500/10 px-1 sm:px-2 py-0.5 rounded-full border border-teal-500/20 font-bold">
                  24/7
                </span>
              </div>

              {/* Titre & Description */}
              <div>
                <h3 className="text-[9px] xs:text-[11px] sm:text-base font-bold text-white mb-0.5 sm:mb-1.5 tracking-tight group-hover:text-teal-300 transition-colors">
                  Agenda Intelligent
                </h3>
                <p className="text-[7px] xs:text-[8px] sm:text-xs text-slate-400 leading-tight sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                  Organisez vos rendez-vous et tâches avec une synchronisation continue.
                </p>
              </div>

              {/* Pied de carte télémétrie */}
              <div className="pt-1 sm:pt-2 border-t border-slate-800/60 flex items-center justify-between text-[6.5px] sm:text-[10px] font-mono text-teal-400">
                <span className="flex items-center gap-0.5 sm:gap-1 text-slate-400 truncate">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Sync
                </span>
                <span className="font-bold shrink-0">ACTIVE</span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Modale interactive de Présentation Détaillée de l'Application */}
      <AppDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </section>
  );
}
