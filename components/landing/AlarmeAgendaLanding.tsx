"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Bell,
  Volume2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Smartphone,
  ChevronRight,
  AlertCircle,
  Play,
  Sun,
  Shield,
  Laptop,
  Brain,
  Layers,
  MapPin,
  User,
  Search,
  X,
  Zap,
} from "lucide-react";
import "@/components/alarmeagenda-ref.css";

export default function AlarmeAgendaLanding() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060c18] text-white font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* =========================================================================
          1. NAVIGATION HAUTE INTERACTIVE & VIVANTE
         ========================================================================= */}
      <header className="relative z-50 w-full border-b border-white/[0.06] bg-[#060c18]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo officiel avec micro-lueur au survol */}
          <Link href="/" className="flex items-center gap-3 no-underline text-white group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-500/30 flex items-center justify-center bg-[#07132e] shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300">
              <Image
                src="/images/alarmagenda-logo.png"
                alt="Logo AlarmeAgenda"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Alarme<span className="text-blue-500">Agenda</span>
            </span>
          </Link>

          {/* Menus centraux animés avec soulignement fluide */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-white relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 transition-colors no-underline"
            >
              Accueil
            </Link>
            <Link
              href="#fonctionnalites"
              className="text-slate-400 hover:text-white transition-colors relative pb-1 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-500/60 no-underline"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="text-slate-400 hover:text-white transition-colors relative pb-1 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-500/60 no-underline"
            >
              Tarifs
            </Link>
            <Link
              href="#a-propos"
              className="text-slate-400 hover:text-white transition-colors relative pb-1 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-500/60 no-underline"
            >
              À propos
            </Link>
          </nav>

          {/* Actions à droite interactives */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
              title="Mode clair / sombre"
            >
              <Sun size={18} />
            </button>

            <Link
              href="/login"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-full border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.25] transition-all no-underline"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_4px_20px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.65)] hover:-translate-y-0.5 no-underline group"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. SECTION HERO VIVANTE — SCÈNE MAÎTRESSE AVEC EFFETS DE PROFONDEUR
         ========================================================================= */}
      <section className="relative z-10 pt-8 sm:pt-12 pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          {/* Colonne Gauche : Titre percutant, boutons et indicateurs vivants */}
          <div className="lg:col-span-5 space-y-6">
            {/* Petit badge vivant avec pulsation douce */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-medium text-blue-300 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span>Assistant IA &amp; Rappels en direct</span>
            </div>

            {/* Titre principal percutant */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-black tracking-tight leading-[1.1] text-white">
              N&apos;OUBLIEZ PLUS <br />
              JAMAIS <span className="text-[#3b82f6] drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">CE QUI COMPTE</span>
            </h1>

            {/* Proposition de valeur percutante et claire */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              L&apos;agenda intelligent et assistant proactif qui planifie vos journées, synchronise vos tâches et vous alerte au moment idéal avec rappels intelligents et vocaux.
            </p>

            {/* Boutons d'action vivants avec micro-animations au survol */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-extrabold text-sm hover:bg-slate-100 transition-all duration-300 shadow-[0_6px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 no-underline group"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] hover:border-white/[0.3] text-white text-sm font-semibold transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-white/[0.12] group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Play size={11} className="fill-white ml-0.5" />
                </div>
                <span>Découvrir la démo</span>
              </button>
            </div>

            {/* Micro-indicateurs en ligne */}
            <div className="pt-6 grid grid-cols-2 sm:flex sm:items-center gap-5 text-xs text-slate-400 border-t border-white/[0.08]">
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <Bell size={14} className="text-blue-400" />
                <span>Rappels intelligents</span>
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-blue-400">✦</span>
                <span>Assistant IA</span>
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <Laptop size={14} className="text-blue-400" />
                <span>Synchro multi-appareils</span>
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <ShieldCheck size={14} className="text-blue-400" />
                <span>Sécurisé</span>
              </span>
            </div>
          </div>

          {/* Colonne Droite : Scène 3D vivante avec profondeur et badge interactif flottant */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] group">
              {/* Image photoréaliste officielle du MacBook Pro et de l'iPhone avec respiration fluide */}
              <div 
                className="relative w-full transition-all duration-700 ease-out group-hover:scale-[1.015]"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 100%)",
                }}
              >
                <Image
                  src="/images/alarmeagenda-devices-midnight.png"
                  alt="AlarmeAgenda sur ordinateur MacBook Pro et iPhone"
                  width={770}
                  height={540}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] select-none pointer-events-none"
                />
              </div>

              {/* Badge flottant vivant « Prochain Rdv » pour donner vie à l'interface */}
              <div className="absolute -bottom-2 left-6 sm:left-12 px-4 py-2.5 rounded-2xl bg-[#0c1633]/90 border border-blue-500/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 transition-transform duration-500 group-hover:translate-y-[-4px]">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                  <Calendar size={15} />
                </div>
                <div>
                  <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                    PROCHAIN RENDEZ-VOUS · DANS 2H 15
                  </div>
                  <div className="text-xs font-bold text-white">
                    Rendez-vous professionnel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BANDEAU DES 5 FONCTIONNALITÉS — CARTES VIVANTES AVEC SURVOL LUMINEUX
         ========================================================================= */}
      <section id="fonctionnalites" className="relative z-10 py-12 px-6 lg:px-8 border-t border-white/[0.08] bg-[#050a14]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {/* 1. Rappels intelligents */}
            <Link
              href="/reminders"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-blue-500/30 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(37,99,235,0.5)] transition-all duration-300">
                <Calendar size={19} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block leading-tight">Rappels intelligents</span>
                <span className="text-[10px] text-slate-400 font-normal">Alertes proactives</span>
              </div>
            </Link>

            {/* 2. Assistant IA */}
            <Link
              href="/assistant"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-blue-500/30 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(37,99,235,0.5)] transition-all duration-300">
                <Brain size={19} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block leading-tight">Assistant IA</span>
                <span className="text-[10px] text-slate-400 font-normal">Commandes vocales</span>
              </div>
            </Link>

            {/* 3. Synchro multi-appareils */}
            <Link
              href="/today"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-blue-500/30 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(37,99,235,0.5)] transition-all duration-300">
                <Laptop size={19} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block leading-tight">Multi-appareils</span>
                <span className="text-[10px] text-slate-400 font-normal">Temps réel fluide</span>
              </div>
            </Link>

            {/* 4. Sécurisé */}
            <Link
              href="/settings"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-blue-500/30 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(37,99,235,0.5)] transition-all duration-300">
                <ShieldCheck size={19} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block leading-tight">Sécurisé</span>
                <span className="text-[10px] text-slate-400 font-normal">Chiffrement de bout</span>
              </div>
            </Link>

            {/* 5. Tableau de bord */}
            <Link
              href="/dashboard"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-blue-500/30 text-slate-300 hover:text-white transition-all duration-300 group no-underline col-span-2 sm:col-span-1"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(37,99,235,0.5)] transition-all duration-300">
                <Layers size={19} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block leading-tight">Tableau de bord</span>
                <span className="text-[10px] text-slate-400 font-normal">Accès immédiat</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODALE VIDÉO / DÉMO INTERACTIVE
         ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0e1628] rounded-2xl border border-white/[0.12] p-6 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-white mb-2">Découvrir AlarmeAgenda</h3>
            <p className="text-xs text-slate-300 mb-6">
              Votre assistant personnel intelligent qui organise votre agenda, vos tâches et vos rappels vocaux.
            </p>
            <div className="aspect-video rounded-xl bg-black/60 border border-white/[0.08] flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(37,99,235,0.6)]">
                <Play size={24} className="fill-white ml-1" />
              </div>
              <span className="text-xs text-slate-300 font-medium">Démonstration interactive d&apos;AlarmeAgenda</span>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs text-slate-300 hover:text-white"
              >
                Fermer
              </button>
              <Link
                href="/register"
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Créer un compte gratuit →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FOOTER MINIMALISTE SOMBRE
         ========================================================================= */}
      <footer className="py-6 px-6 text-center text-[11px] text-slate-500 border-t border-white/[0.04]">
        © {new Date().getFullYear()} AlarmeAgenda. Tous droits réservés. Organise. Rappelle. Avance.
      </footer>
    </div>
  );
}
