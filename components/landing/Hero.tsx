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
  Sparkles,
  ShieldCheck,
} from "lucide-react";
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
    <section className="relative w-full bg-[#05070c] text-white pt-4 sm:pt-8 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Stage Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* ========================================================= */}
        {/* 1. DISPOSITION DESKTOP (3 Colonnes Principales)           */}
        {/* ========================================================= */}
        <div className="w-full hidden lg:grid grid-cols-12 gap-8 items-center">
          
          {/* A. Colonne Gauche : Horloge IA + Grand Titre & Boutons */}
          <div 
            style={{ paddingLeft: "0.5cm" }}
            className="col-span-4 flex flex-col items-start justify-center pr-2"
          >
            {/* Module Digital Horloge IA */}
            <div 
              style={{ marginBottom: "0.8cm" }}
              className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-black/95 border-2 border-emerald-500/40 backdrop-blur-2xl shadow-xl shadow-black/80 w-full max-w-[250px] group hover:border-emerald-400/60 transition-all duration-300"
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
                <span className="text-[9px] font-mono bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/25">
                  SYNC LIVE
                </span>
              </div>

              <div className="flex items-baseline justify-between px-0.5 my-0.5 font-mono">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[1.75rem] font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    {formattedHours}:{formattedMinutes}
                  </span>
                  <span className="text-lg font-bold text-emerald-400">
                    :{formattedSeconds}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-800/90 px-1.5 py-0.5 rounded">
                  24H
                </span>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-slate-300 font-semibold">{formattedDate}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Zap size={10} /> &lt;0.1ms
                </span>
              </div>
            </div>

            {/* Grand Titre */}
            <h1 className="text-3xl xl:text-[2.35rem] font-black text-white tracking-tight leading-[1.2] mb-3 pt-0 relative z-10">
              Ne manquez plus aucun{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-md">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* Boutons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>En savoir plus</span>
                <ArrowRight size={15} />
              </button>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full font-bold text-sm text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all shadow-md"
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
        {/* 2. DISPOSITION MOBILE & TABLETTE (Le Site D'abord !)      */}
        {/* ========================================================= */}
        <div className="w-full flex lg:hidden flex-col items-center gap-5 sm:gap-6">
          
          {/* A. Horloge IA Mobile Agrandie */}
          <div className="p-3 rounded-2xl bg-gradient-to-b from-slate-900/95 to-black/95 border-2 border-emerald-500/40 backdrop-blur-2xl shadow-xl shadow-black/80 w-full max-w-[280px]">
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

          {/* B. Grand Titre en Grands Caractères + Boutons */}
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>En savoir plus</span>
                <ArrowRight size={14} />
              </button>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all shadow-md"
              >
                <span>Démarrer</span>
              </Link>
            </div>
          </div>

          {/* C. Duo Visuel Horizontal Agrandit (Montre + Photo côte à côte) */}
          <div className="w-full grid grid-cols-2 gap-3 sm:gap-6 items-center justify-center max-w-md my-1">
            
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

        {/* Séparateur Lumineux HUD Subtil */}
        <div className="w-full max-w-4xl my-6 sm:my-10 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 via-cyan-500/30 to-transparent" />
        </div>

        {/* ========================================================= */}
        {/* 4. LES 3 MODULES LUXE 3D ÉPAIS & STYLE PRO               */}
        {/* ========================================================= */}
        <div 
          className="w-full flex justify-center items-center flex-shrink-0 mt-4 sm:mt-8 mb-4 sm:mb-8"
        >
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            
            {/* Tableau 1: Rappels Vocaux IA (Cadre Épais 3D Luxe) */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-900/98 via-slate-950 to-black border-2 border-emerald-500/50 border-b-4 border-b-emerald-400 shadow-[0_20px_45px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400/80 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between">
              
              {/* Header Module avec badge relief */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                    <Mic size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      Module 01
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">TECHNOLOGIE IA</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40 font-bold shadow-sm">
                  AUDIO HD
                </span>
              </div>

              {/* Titre & Description Riche */}
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors">
                  Rappels Vocaux IA
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Planifiez des rappels vocaux par synthèse vocale naturelle. Votre téléphone sonne à l&apos;heure exacte pour vous dicter votre tâche avec une clarté absolue.
                </p>
              </div>

              {/* Pied de carte télémétrie */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Voix Haute Fidélité
                </span>
                <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  100% AUTO
                </span>
              </div>

            </div>

            {/* Tableau 2: Multi-Canaux SMS (Cadre Épais 3D Luxe) */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-900/98 via-slate-950 to-black border-2 border-cyan-500/50 border-b-4 border-b-cyan-400 shadow-[0_20px_45px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-400/80 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between">
              
              {/* Header Module avec badge relief */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/10 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                      Module 02
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">ROUTAGE DIRECT</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-full border border-cyan-400/40 font-bold shadow-sm">
                  SMS AUTO
                </span>
              </div>

              {/* Titre & Description Riche */}
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                  Multi-Canaux SMS
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Envoyez et recevez des confirmations instantanées par SMS et WhatsApp. Une transmission fiable et prioritaire pour ne rien laisser au hasard.
                </p>
              </div>

              {/* Pied de carte télémétrie */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Routage Instantané
                </span>
                <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  &lt; 1 SEC
                </span>
              </div>

            </div>

            {/* Tableau 3: Agenda Intelligent (Cadre Épais 3D Luxe) */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-900/98 via-slate-950 to-black border-2 border-teal-500/50 border-b-4 border-b-teal-400 shadow-[0_20px_45px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_rgba(20,184,166,0.15)] hover:border-teal-400/80 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between">
              
              {/* Header Module avec badge relief */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500/30 to-emerald-500/10 border-2 border-teal-500/50 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(20,184,166,0.4)]">
                    <CalendarCheck size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold block">
                      Module 03
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">PLANIFICATION IA</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-teal-300 bg-teal-500/20 px-2.5 py-1 rounded-full border border-teal-400/40 font-bold shadow-sm">
                  AGENDA 24/7
                </span>
              </div>

              {/* Titre & Description Riche */}
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white mb-2 tracking-tight group-hover:text-teal-300 transition-colors">
                  Agenda Intelligent
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Orchestrez vos rendez-vous, devis et réunions professionnelles. L&apos;IA priorise vos urgences et synchronise votre emploi du temps sans friction.
                </p>
              </div>

              {/* Pied de carte télémétrie */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-teal-400 font-bold">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  Synchronisation
                </span>
                <span className="bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  ACTIVE
                </span>
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
