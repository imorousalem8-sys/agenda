"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mic,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  Volume2,
  Zap,
  TrendingUp,
  MessageSquare,
  Lock,
  ChevronRight,
} from "lucide-react";
import AppDetailsModal from "./AppDetailsModal";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function Hero() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayVoiceDemo = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
        return;
      }
      playAlertChime();
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour Salem ! Vous avez un rendez-vous important prévu à 14 heures 30 avec votre client. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative w-full bg-[#030712] text-white pt-8 sm:pt-14 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Subtle Gradient Lighting (Linear / Stripe Executive Luxury) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* =========================================================================
            1. EYEBROW BADGE (Sleek Executive Luxury Pill)
           ========================================================================= */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-lg shadow-black/40 backdrop-blur-md mb-6 hover:border-slate-600 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-300">
            Alamajonda Executive OS 2.0
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
            Intelligence Vocale &amp; Agenda <ChevronRight size={12} />
          </span>
        </div>

        {/* =========================================================================
            2. HERO HEADLINE & PITCH (Clean, Powerful, €15k High-End Typography)
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-5">
            Votre temps orchestré avec une{" "}
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
              précision chirurgicale.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Fini les formulaires laborieux. Dictez vos rendez-vous en langage naturel, l&apos;IA planifie, synchronise vos calendriers et <strong className="text-white font-semibold">vous appelle directement par téléphone</strong> pour vous dicter vos urgences.
          </p>
        </div>

        {/* =========================================================================
            3. PRIMARY CALL TO ACTIONS & AUDIO PREVIEW TRIGGER
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md mx-auto mb-12 sm:mb-16">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Démarrer gratuitement</span>
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            onClick={() => setShowDetailsModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>En savoir plus</span>
            <Sparkles size={14} className="text-cyan-400" />
          </button>
        </div>

        {/* =========================================================================
            4. PREVIEW DU COCKPIT EN DIRECT (Ultra-Clean Glass Showcase)
           ========================================================================= */}
        <div className="w-full max-w-5xl relative mb-16 sm:mb-24">
          
          {/* Subtle Frame Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-cyan-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

          {/* Main Showcase Panel */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/95 via-[#080f22] to-[#040817] border border-slate-700/60 shadow-2xl overflow-hidden">
            
            {/* Window Topbar */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700/60" />
                <span className="w-3 h-3 rounded-full bg-slate-700/60" />
                <span className="w-3 h-3 rounded-full bg-slate-700/60" />
                <span className="ml-2 text-xs font-mono text-slate-400 font-medium">
                  alamajonda.app/dashboard · Executive
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  SYNC TEMPS RÉEL {currentTime}
                </span>
              </div>
            </div>

            {/* Showcase Grid Content */}
            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left: Interactive Voice Demonstration Pod */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Volume2 size={15} />
                  <span>SYNTHÈSE VOCALE PROACTIVE &amp; APPEL RÉEL</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  « Votre téléphone sonne, l&apos;IA vous dicte votre planning. »
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pas de bip inaudible ou de notification manquée. Alamajonda vous transmet vos rappels critiques de vive voix avec un ton naturel et bienveillant.
                </p>

                {/* Interactive Audio Player Bar */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePlayVoiceDemo}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {isPlayingVoice ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlayingVoice ? "Pause" : "Écouter l'IA"}</span>
                  </button>

                  <div className="flex-1 flex items-center gap-1 h-6">
                    {[40, 75, 50, 90, 60, 85, 45, 95, 70, 40, 80, 55, 90, 65, 45, 80].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${isPlayingVoice ? h : Math.max(20, h * 0.3)}%` }}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          isPlayingVoice ? "bg-cyan-400" : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    0:15
                  </span>
                </div>
              </div>

              {/* Right: Live Mockup Card (Meeting & Task Flow) */}
              <div className="lg:col-span-6 space-y-3">
                {/* Event Card 1 */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold text-xs">
                      14:30
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Rendez-vous Client Stratégique</div>
                      <div className="text-xs text-slate-400">Atelier Liège · Confirmé par IA</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Synchronisé
                  </span>
                </div>

                {/* Event Card 2 */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 font-bold text-xs">
                      18:00
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Rappel : Valider les devis en cours</div>
                      <div className="text-xs text-slate-400">Annonce vocale téléphonique programmée</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    Appel prévu
                  </span>
                </div>

                {/* Stat Pill */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    Zéro double réservation
                  </span>
                  <span>Google &amp; Apple Calendar (.ICS)</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* =========================================================================
            5. LES 3 PILIERS HAUT DE GAMME (Clean Luxury Bento Cards)
           ========================================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Pilier 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Mic size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Capture Vocale &amp; Saisie Zéro Effort
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Parlez comme à un collègue. L&apos;IA extrait instantanément les dates, contacts, durées et priorités.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-cyan-400">
              100% Langage Naturel
            </div>
          </div>

          {/* Pilier 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <PhoneCall size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Appels Vocaux &amp; Notifications Réelles
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Votre téléphone sonne à l&apos;heure dite. L&apos;IA énonce votre rappel et vous permet de reporter d&apos;un simple mot.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-indigo-400">
              Fiabilité &amp; Ponctualité Absolue
            </div>
          </div>

          {/* Pilier 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Calendar size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Synchronisation Multi-Plateformes
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Exportation immédiate vers Google Calendar, Outlook et Apple Calendar avec flux .ICS universel.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-emerald-400">
              Export .ICS &amp; WhatsApp
            </div>
          </div>

        </div>

        {/* =========================================================================
            6. TRUST & CONFIDENTIALITY BAR
           ========================================================================= */}
        <div className="w-full max-w-3xl py-4 px-6 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-around flex-wrap gap-4 text-center">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Chiffrement 256-bit &amp; RGPD</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Zap size={16} className="text-cyan-400" />
            <span>Réponse en moins de 1 seconde</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp size={16} className="text-indigo-400" />
            <span>+5.2h / semaine économisées</span>
          </div>
        </div>

      </div>

      {/* Modale "En Savoir Plus" */}
      <AppDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </section>
  );
}
