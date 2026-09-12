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
    <section className="relative w-full bg-[#05070c] text-white pt-4 sm:pt-8 pb-12 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Stage Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* ========================================================= */}
        {/* DISPOSITION DESKTOP (3 Colonnes : Texte | Montre | Photo) */}
        {/* ========================================================= */}
        <div className="w-full hidden lg:grid grid-cols-12 gap-8 items-center">
          
          {/* A. Colonne Gauche : Horloge IA + BMX + Grand Titre & Boutons */}
          <div 
            style={{ paddingLeft: "0.5cm" }}
            className="col-span-4 flex flex-col items-start justify-center pr-2"
          >
            {/* 1. Module Digital Horloge IA */}
            <div 
              style={{ marginBottom: "1cm" }}
              className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-black/95 border border-emerald-500/35 backdrop-blur-2xl shadow-xl shadow-black/80 w-full max-w-[240px] group hover:border-emerald-400/50 transition-all duration-300"
            >
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
                  LIVE
                </span>
              </div>

              <div className="flex items-baseline justify-between px-0.5 my-0.5 font-mono">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[1.65rem] font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    {formattedHours}:{formattedMinutes}
                  </span>
                  <span className="text-lg font-bold text-emerald-400">
                    :{formattedSeconds}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-800/90 px-1 py-0.5 rounded">
                  24H
                </span>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-slate-300">{formattedDate}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Zap size={10} /> &lt;0.1ms
                </span>
              </div>
            </div>

            {/* Parcours BMX Bad Boys */}
            <div className="w-full max-w-md overflow-visible relative -mb-1">
              <BMXRiderAnimation />
            </div>

            {/* Grand Titre */}
            <h1 className="text-3xl xl:text-[2.25rem] font-black text-white tracking-tight leading-[1.2] mb-3 pt-0 relative z-10">
              Ne manquez plus aucun{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-md">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* Boutons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>En savoir plus</span>
                <ArrowRight size={14} />
              </button>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Démarrer</span>
              </Link>
            </div>
          </div>

          {/* B. Colonne Centre : Montre Squelette Lumineuse Agrandie */}
          <div className="col-span-4 w-full flex justify-center items-center py-2">
            <div className="relative w-[300px] h-[300px] xl:w-[330px] xl:h-[330px] rounded-full p-2 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-4 border-slate-700/80 flex items-center justify-center">
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
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-950/90 border border-emerald-400/60 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.6)] flex items-center gap-1.5 z-20 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-emerald-300 tracking-wider">SAS HORLOGE IA</span>
                </div>
              </div>
            </div>
          </div>

          {/* C. Colonne Droite : Photo Fondateur au Bureau Agrandie */}
          <div className="col-span-4 w-full flex justify-end items-center">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 group overflow-hidden w-full max-w-[350px]">
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

        {/* ========================================================= */}
        {/* DISPOSITION MOBILE & TABLETTE RÉPARTIE SUR TOUT L'ESPACE  */}
        {/* (Grand Titre Bien Visible + Duo Visuel Horizontal Agrandit) */}
        {/* ========================================================= */}
        <div className="w-full flex lg:hidden flex-col items-center gap-5 sm:gap-7">
          
          {/* 1. Haut : Horloge IA Agrandie + Circuit BMX */}
          <div className="w-full flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-b from-slate-900/95 to-black/95 border border-emerald-500/35 backdrop-blur-2xl shadow-xl shadow-black/80 w-full max-w-[280px]">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                    Horloge IA
                  </span>
                </div>
                <span className="text-[8px] font-mono bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
                  LIVE SYNC
                </span>
              </div>

              <div className="flex items-baseline justify-between px-1 my-0.5 font-mono">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    {formattedHours}:{formattedMinutes}
                  </span>
                  <span className="text-base font-bold text-emerald-400">
                    :{formattedSeconds}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-800/90 px-1.5 py-0.5 rounded">
                  24H
                </span>
              </div>

              <div className="mt-1 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span className="text-slate-300">{formattedDate}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Zap size={10} /> &lt;0.1ms
                </span>
              </div>
            </div>

            {/* Circuit BMX animé */}
            <div className="w-full max-w-md overflow-visible relative my-1">
              <BMXRiderAnimation />
            </div>
          </div>

          {/* 2. Centre : Grand Titre en Grands Caractères + Sous-titre + Boutons */}
          <div className="w-full text-center flex flex-col items-center px-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
              Ne manquez plus aucun{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 max-w-lg">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>En savoir plus</span>
                <ArrowRight size={14} />
              </button>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Démarrer</span>
              </Link>
            </div>
          </div>

          {/* 3. Duo Visuel Horizontal Agrandit (Montre + Photo côte à côte à l'horizontale) */}
          <div className="w-full grid grid-cols-2 gap-3 sm:gap-6 items-center justify-center max-w-md my-2">
            
            {/* Montre Agrandie */}
            <div className="w-full flex justify-center items-center">
              <div className="relative w-[140px] h-[140px] sm:w-[190px] sm:h-[190px] rounded-full p-1.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-2 border-slate-700/80 flex items-center justify-center">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                  <Image
                    src="/images/dark-hud-watch.jpg"
                    alt="Horlogerie de précision Alamajonda"
                    fill
                    unoptimized={true}
                    className="object-cover opacity-95"
                    priority
                  />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400/60 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.6)] flex items-center gap-1 z-20 pointer-events-none whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[7px] font-mono font-bold text-emerald-300 tracking-wider">SAS HORLOGE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Fondateur Agrandie */}
            <div className="w-full flex justify-center items-center">
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 w-full max-w-[170px] sm:max-w-[210px]">
                <div className="relative rounded-[0.9rem] overflow-hidden bg-slate-950 aspect-[16/11]">
                  <Image
                    src="/images/founder-desk-official.jpg"
                    alt="Le Fondateur au bureau avec l'application Alamajonda"
                    fill
                    unoptimized={true}
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* LES 3 MODULES DE HAUTE TECHNOLOGIE (Remplissent l'espace bas) */}
        {/* ========================================================= */}
        <div 
          className="w-full flex justify-center items-center flex-shrink-0 mt-8 sm:mt-16 md:mt-20 mb-4 sm:mb-8"
        >
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
            
            {/* Tableau 1: Rappels Vocaux IA */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl shadow-black/70 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Mic size={14} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    Module 01
                  </span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  AUDIO IA
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight group-hover:text-emerald-300 transition-colors">
                  Rappels Vocaux IA
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Planifiez des rappels vocaux clairs et naturels en quelques secondes sans effort.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Voix Haute Fidélité
                </span>
                <span className="font-bold">100% AUTO</span>
              </div>

            </div>

            {/* Tableau 2: Multi-Canaux SMS */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-black/70 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <MessageSquare size={14} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    Module 02
                  </span>
                </div>
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 font-bold">
                  SMS AUTO
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                  Multi-Canaux SMS
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Routage Instantané
                </span>
                <span className="font-bold">&lt; 1 SEC</span>
              </div>

            </div>

            {/* Tableau 3: Agenda Intelligent */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-teal-500/30 backdrop-blur-2xl shadow-2xl shadow-black/70 hover:border-teal-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                    <CalendarCheck size={14} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    Module 03
                  </span>
                </div>
                <span className="text-[9px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 font-bold">
                  AGENDA 24/7
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight group-hover:text-teal-300 transition-colors">
                  Agenda Intelligent
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Organisez vos rendez-vous, réunions et tâches avec une synchronisation intelligente.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-teal-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Synchronisation
                </span>
                <span className="font-bold">ACTIVE</span>
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
