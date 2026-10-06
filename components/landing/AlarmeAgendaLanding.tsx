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
} from "lucide-react";
import "@/components/alarmeagenda-ref.css";

export default function AlarmeAgendaLanding() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* =========================================================================
          ARRIÈRE-PLAN FLUIDE 3D AVEC VAPEUR VOLUMÉTRIQUE ÉTALÉE DANS TOUS LES SENS
          Style officiel avec volutes de vapeur animées et reflets iridescents
         ========================================================================= */}
      <div className="aa-fluid-background-root" aria-hidden="true">
        <div className="aa-fluid-bg-image" />
        <div className="aa-steam-layer">
          <div className="aa-steam-cloud aa-steam-cloud-1" />
          <div className="aa-steam-cloud aa-steam-cloud-2" />
          <div className="aa-steam-cloud aa-steam-cloud-3" />
        </div>
        <div className="aa-steam-vignette" />
      </div>

      {/* =========================================================================
          1. NAVIGATION HAUTE INTERACTIVE & VIVANTE
         ========================================================================= */}
      <header className="relative z-50 w-full border-b border-white/[0.08] bg-[#050a18]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo officiel */}
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

          {/* Menus centraux */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-white relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 no-underline"
            >
              Accueil
            </Link>
            <Link
              href="#fonctionnalites"
              className="text-slate-400 hover:text-white transition-colors no-underline"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="text-slate-400 hover:text-white transition-colors no-underline"
            >
              Tarifs
            </Link>
            <Link
              href="#a-propos"
              className="text-slate-400 hover:text-white transition-colors no-underline"
            >
              À propos
            </Link>
          </nav>

          {/* Actions à droite */}
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
          2. SECTION HERO (PARTIE 1 CORRIGÉE : RESPIRATION, ZÉRO COLLISION)
         ========================================================================= */}
      <section className="relative z-10 pt-10 sm:pt-14 pb-14 px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Colonne Gauche : Espace aéré, typographie d'élite, zéro tassement */}
          <div className="lg:col-span-5 space-y-7">
            {/* Titre principal majestueux à fort impact */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-black tracking-tight leading-[1.12] text-white">
              N&apos;OUBLIEZ PLUS <br />
              JAMAIS <span className="text-[#3b82f6] drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">CE QUI COMPTE</span>
            </h1>

            {/* Description claire et confortable */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              L&apos;agenda intelligent et assistant proactif qui planifie vos journées, synchronise vos tâches et vous alerte au moment idéal avec rappels intelligents et vocaux.
            </p>

            {/* Boutons d'action espacés sans aucune collision */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-extrabold text-sm hover:bg-slate-100 transition-all duration-300 shadow-[0_6px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 no-underline group cursor-pointer"
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
          </div>

          {/* Colonne Droite : Le MacBook Pro et iPhone officiels, cadrés net sans aucun badge débordant */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] group">
              <div 
                className="relative w-full transition-all duration-700 ease-out group-hover:scale-[1.015]"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 100%)",
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
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. LES 3 BLOCS CARRÉS CLÉS (TYPOGRAPHIE ÉPAISSE, GRAND FORMAT, SANS TRONCATURE)
         ========================================================================= */}
      <section className="relative z-10 py-16 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-bold text-blue-400 mb-3 shadow-[0_0_15px_rgba(37,99,235,0.25)]">
            <Sparkles size={13} className="text-blue-400" />
            <span>CONÇU POUR VOTRE SÉRÉNITÉ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Ce que fait AlarmeAgenda pour vous
          </h2>
        </div>

        {/* Grille des 3 blocs carrés stylés, typographie épaisse et percutante */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* BLOC 1 : Planification Prédictive */}
          <Link
            href="/calendar"
            className="group relative rounded-3xl bg-gradient-to-b from-[#0f1d40] to-[#081026] border border-blue-500/35 hover:border-blue-400 p-8 sm:p-9 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(37,99,235,0.3)] flex flex-col justify-between min-h-[360px] no-underline text-inherit"
          >
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-400/50 text-blue-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                <Calendar size={30} strokeWidth={2.6} />
              </div>
              <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug">
                Planification Prédictive &amp; Zéro Oubli
              </h3>
              <p className="text-[15px] sm:text-base text-slate-100 leading-relaxed font-bold">
                AlarmeAgenda analyse votre emploi du temps et anticipe vos trajets et vos temps de préparation pour vous alerter avant chaque imprévu.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.12] flex items-center justify-between mt-4">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>98% Ponctualité Garantie</span>
              </span>
              <span className="text-blue-300 group-hover:text-white group-hover:translate-x-2 transition-all font-black text-xl">→</span>
            </div>
          </Link>

          {/* BLOC 2 : Rappels Vocaux Proactifs */}
          <Link
            href="/reminders"
            className="group relative rounded-3xl bg-gradient-to-b from-[#241a0d] to-[#081026] border border-amber-500/35 hover:border-amber-400 p-8 sm:p-9 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(245,158,11,0.3)] flex flex-col justify-between min-h-[360px] no-underline text-inherit"
          >
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/30 border border-amber-400/50 text-amber-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                <Volume2 size={30} strokeWidth={2.6} />
              </div>
              <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug">
                Rappels Vocaux Proactifs
              </h3>
              <p className="text-[15px] sm:text-base text-slate-100 leading-relaxed font-bold">
                Plus besoin d&apos;avoir les yeux rivés sur votre écran : une voix claire et contextuelle vous prévient au moment opportun avec les détails essentiels.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.12] flex items-center justify-between mt-4">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Alertes Vocales &amp; Sonores</span>
              </span>
              <span className="text-amber-300 group-hover:text-white group-hover:translate-x-2 transition-all font-black text-xl">→</span>
            </div>
          </Link>

          {/* BLOC 3 : Synchronisation Multi-Appareils */}
          <Link
            href="/dashboard"
            className="group relative rounded-3xl bg-gradient-to-b from-[#0a231d] to-[#081026] border border-emerald-500/35 hover:border-emerald-400 p-8 sm:p-9 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(16,185,129,0.3)] flex flex-col justify-between min-h-[360px] no-underline text-inherit"
          >
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <Laptop size={30} strokeWidth={2.6} />
              </div>
              <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug">
                Synchronisation Instantanée
              </h3>
              <p className="text-[15px] sm:text-base text-slate-100 leading-relaxed font-bold">
                Passez de votre ordinateur à votre mobile sans interruption. Vos tâches, rendez-vous et alarmes se mettent à jour en temps réel à la seconde près.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.12] flex items-center justify-between mt-4">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cloud &middot; PC &middot; Mobile</span>
              </span>
              <span className="text-emerald-300 group-hover:text-white group-hover:translate-x-2 transition-all font-black text-xl">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          4. BANDEAU DES 5 FONCTIONNALITÉS (EXACT RÉFÉRENCE)
         ========================================================================= */}
      <section id="fonctionnalites" className="relative z-10 py-8 px-6 lg:px-8 border-t border-white/[0.08] bg-[#050a18]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8">
            {/* 1. Rappels intelligents */}
            <Link
              href="/reminders"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-300">
                <Calendar size={17} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-tight">Rappels intelligents</span>
            </Link>

            {/* 2. Assistant IA */}
            <Link
              href="/assistant"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-300">
                <Brain size={17} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-tight">Assistant IA</span>
            </Link>

            {/* 3. Synchro multi-appareils */}
            <Link
              href="/today"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-300">
                <Laptop size={17} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-tight">Synchro multi-appareils</span>
            </Link>

            {/* 4. Sécurisé */}
            <Link
              href="/settings"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-300">
                <ShieldCheck size={17} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-tight">Sécurisé</span>
            </Link>

            {/* 5. Tableau de bord */}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-300">
                <Layers size={17} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-tight">Tableau de bord</span>
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
