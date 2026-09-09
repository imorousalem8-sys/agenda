"use client";

import Link from "next/link";
import { ArrowRight, Mic, MessageSquare, CalendarCheck, CheckCircle2, Volume2, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-slate-100">
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Copy & Actions (6 cols) */}
          <div className="lg:col-span-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Votre assistant vocal IA intelligent</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-5">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              <span className="text-blue-600">rendez-vous important</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Alamajonda planifie, organise et vous rappelle automatiquement chacun de vos rendez-vous par appel vocal direct, SMS et notification.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 transition-all text-center"
              >
                <span>Commencer Gratuitement</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all text-center"
              >
                <span>Se connecter</span>
              </Link>
            </div>

            {/* Trust Checklist */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                Sans carte bancaire
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                Actif en 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                Données 100% sécurisées
              </span>
            </div>

          </div>

          {/* Right Column: Real Image & Floating Badge (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-[460px]">
              
              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-woman.jpg"
                  alt="Utilisatrice recevant un rappel vocal Alamajonda"
                  className="w-full h-full object-cover object-center block"
                  loading="eager"
                />
              </div>

              {/* Floating Voice Call Widget */}
              <div className="absolute -bottom-5 left-3 sm:-left-5 bg-white/95 backdrop-blur-md border border-blue-200/80 p-3.5 sm:p-4 rounded-xl shadow-lg shadow-blue-900/10 flex items-center gap-3 z-20 max-w-[300px]">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Appel Vocal
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Programmé à 14h30
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Consultation & Déplacement
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Pillar 1 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <Mic className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              Rappels Vocaux IA
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Planifiez des rappels vocaux clairs et naturels en quelques secondes pour ne rater aucun engagement.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <MessageSquare className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              Multi-Canaux SMS
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Envoyez des confirmations et rappels automatiques par SMS et notifications pour une portée maximale.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <CalendarCheck className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              Agenda Intelligent
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Organisez vos rendez-vous, réunions et tâches avec une planification fluide et intuitive.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
