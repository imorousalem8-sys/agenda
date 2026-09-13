"use client";

import React, { useState } from "react";
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
  Phone,
} from "lucide-react";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function Hero() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

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
        "Bonjour ! C'est votre assistant personnel Alamajonda. Vous avez votre rendez-vous client important prévu à 14 heures 30. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#f8fafc] to-white text-slate-900 pt-8 sm:pt-12 pb-20 sm:pb-28 font-sans overflow-hidden">
      {/* Conteneur avec marges garanties de chaque côté */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* =========================================================
            1. HERO STAGE : 2 COLONNES HAUTE COUTURE
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 sm:mb-20">
          
          {/* A. Colonne Gauche : Eyebrow + Grand Titre + Pitch + CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center pr-0 lg:pr-4 z-10">
            
            {/* Eyebrow Badge Exécutif */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                NOUVELLE GÉNÉRATION D&apos;AGENDA IA
              </span>
            </div>

            {/* Grand Titre (Typographie Élégante & Cadrée) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#09132b] tracking-tight leading-[1.14] mb-5 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#09132b] via-[#1d4ed8] to-[#2563eb] bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* Sous-titre Explicatif */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl text-left">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée. Dictez vos créneaux en langage naturel, l&apos;IA synchronise vos calendriers et <strong className="text-slate-900 font-semibold">vous appelle directement par téléphone</strong> pour vous dicter vos urgences.
            </p>


            {/* Micro-Preuve Sociale */}
            <div className="flex items-center gap-5 text-xs text-slate-500 font-medium flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                Installation en 1 min
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-blue-600 shrink-0" />
                Conforme RGPD
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-amber-500 shrink-0" />
                Zéro friction
              </span>
            </div>

          </div>

          {/* B. Colonne Droite : Photo Haute Définition & Bulle Vocale Interactive */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            {/* Halo Décoratif Subtil */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/60 via-indigo-50/40 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

            {/* Cadre Photo Professionnel */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/80 bg-slate-100 group">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme professionnelle utilisant l'assistant vocal IA Alamajonda"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bulle d'Appel Vocal Flottante (Design iOS / Haute Finition) */}
              <div
                onClick={handlePlayVoiceDemo}
                className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 bg-white/95 backdrop-blur-xl border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-slate-900/10 flex items-center gap-3.5 z-20 max-w-[270px] sm:max-w-[300px] cursor-pointer hover:scale-105 transition-all"
                title="Cliquer pour écouter l'annonce vocale"
              >
                {/* Icône Onde Sonore Bleue */}
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
                  {isPlayingVoice ? <Pause size={18} /> : <Volume2 size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span>Appel Vocal IA</span>
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                      {isPlayingVoice ? "EN LECTURE" : "14h30"}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {isPlayingVoice ? "Écoute de la voix en cours..." : "Programmé · Rendez-vous client"}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            2. LES 3 GRANDS PILIERS BENTO (Cartes de Luxe & Typographie Agrandie)
           ========================================================= */}
        <div id="fonctionnalites" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-4">
          
          {/* CARTE 1 : Rappels Vocaux IA */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_15px_45px_rgba(11,21,46,0.06)] border border-slate-200/80 hover:border-blue-300 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Icône Micro Stylisée */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#1d4ed8] mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Mic size={26} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                Rappels Vocaux IA
              </h3>
              
              <p className="text-base sm:text-[16px] text-slate-600 leading-relaxed font-normal mb-4">
                Dictez simplement vos rappels et vos engagements à haute voix. Notre intelligence artificielle comprend vos phrases en langage naturel, identifie les dates, les heures et les urgences avec une précision absolue.
              </p>

              <div className="flex flex-col gap-2 pt-2 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  Compréhension vocale naturelle
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  Synthèse vocale HD ultra-réaliste
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600">
              <span>Voix Haute Définition</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* CARTE 2 : Multi-Canaux SMS & Appels */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_15px_45px_rgba(11,21,46,0.06)] border border-slate-200/80 hover:border-blue-300 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Icône Téléphone Stylisée */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#1d4ed8] mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <PhoneCall size={26} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                Appels &amp; Alertes SMS
              </h3>
              
              <p className="text-base sm:text-[16px] text-slate-600 leading-relaxed font-normal mb-4">
                Ne manquez plus jamais un créneau décisif. Votre assistant vous appelle directement sur votre mobile et vous transmet vos alertes par SMS et WhatsApp à la seconde près.
              </p>

              <div className="flex flex-col gap-2 pt-2 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  Appel vocal automatisé sur téléphone
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  Notifications SMS &amp; WhatsApp instantanées
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600">
              <span>Téléphonie &amp; Multi-Canaux</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* CARTE 3 : Agenda Intelligent & Anti-Conflits */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_15px_45px_rgba(11,21,46,0.06)] border border-slate-200/80 hover:border-blue-300 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Icône Calendrier Stylisée */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#1d4ed8] mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Calendar size={26} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                Agenda Intelligent
              </h3>
              
              <p className="text-base sm:text-[16px] text-slate-600 leading-relaxed font-normal mb-4">
                Centralisez vos rendez-vous, réunions et tâches professionnelles en toute simplicité. Synchronisation bidirectionnelle fluide avec Google Calendar, Apple Calendar (.ICS) et Outlook.
              </p>

              <div className="flex flex-col gap-2 pt-2 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  Détection automatique des conflits d&apos;horaires
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  Synchronisation Google &amp; Apple 24/7
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600">
              <span>Synchronisation Universelle</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
