"use client";

import Link from "next/link";
import { ArrowRight, Check, Play, Calendar, User, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#0B1120] pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions (5 cols) */}
          <div className="lg:col-span-6 max-w-xl mx-auto lg:mx-0 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="text-sky-400 font-bold text-sm">+</span>
              Votre assistant de rendez-vous intelligent
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.12] tracking-tight mb-6">
              Vos rendez-vous,
              <br />
              toujours{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                au bon moment.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed mb-8">
              Alamajonda est une application intelligente qui planifie, rappelle et
              gère vos rendez-vous automatiquement. Fini les oublis et les
              déplacements inutiles. Prenez le contrôle de votre temps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-[#BAE6FD] hover:bg-[#93C5FD] shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="#voice-reminders"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <Play size={14} className="fill-slate-300 text-slate-300" />
                <span>Voir la démo</span>
              </a>
            </div>

            {/* Checklist items */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-sky-400 shrink-0" />
                Aucune carte bancaire requise
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-sky-400 shrink-0" />
                Installation rapide
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-sky-400 shrink-0" />
                Disponible sur tous vos appareils
              </span>
            </div>
          </div>

          {/* Right Column: Realistic Web & Mobile Mockup (7 cols) */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            
            {/* Laptop Frame */}
            <div className="w-full max-w-[560px] bg-slate-800/90 rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-slate-700/70">
              
              {/* Laptop Screen Bezel */}
              <div className="bg-white rounded-xl overflow-hidden shadow-inner text-slate-800">
                
                {/* Browser top header */}
                <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="mx-auto px-4 py-0.5 rounded bg-white text-[10px] text-slate-400 font-mono border border-slate-200">
                    app.alamajonda.com
                  </div>
                </div>

                {/* Dashboard Inside */}
                <div className="flex min-h-[300px] text-[11px]">
                  {/* Mini Sidebar */}
                  <div className="w-28 sm:w-32 bg-[#0F172A] text-slate-300 p-2.5 hidden sm:flex flex-col justify-between shrink-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 font-bold text-white text-xs pb-1 border-b border-slate-800">
                        <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-[9px]">A</div>
                        Alamajonda
                      </div>
                      <nav className="space-y-1 text-[10px]">
                        <div className="px-2 py-1 rounded text-slate-400">Accueil</div>
                        <div className="px-2 py-1 rounded bg-blue-600/30 text-sky-300 font-semibold flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-sky-400" />
                          Rendez-vous
                        </div>
                        <div className="px-2 py-1 rounded text-slate-400">Calendrier</div>
                        <div className="px-2 py-1 rounded text-slate-400">Contacts</div>
                        <div className="px-2 py-1 rounded text-slate-400">Notifications</div>
                        <div className="px-2 py-1 rounded text-slate-400">Paramètres</div>
                      </nav>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-3 sm:p-4 bg-[#F8FAFC]">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Mes rendez-vous</h4>
                        <div className="text-[9px] text-slate-400">Aujourd&apos;hui — Lundi 26 mai 2025</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] px-2 py-0.5 bg-blue-50 text-blue-600 font-semibold rounded-full border border-blue-200">
                          Aujourd&apos;hui
                        </span>
                      </div>
                    </div>

                    {/* Table / List */}
                    <div className="space-y-1.5 mb-3">
                      <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-[10px]">09:00</span>
                          <div>
                            <div className="font-semibold text-slate-800 text-[10px]">Consultation médicale</div>
                            <div className="text-[8px] text-slate-400">Dr. Martin — Cabinet médical</div>
                          </div>
                        </div>
                        <span className="text-[8px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Confirmé
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-[10px]">11:30</span>
                          <div>
                            <div className="font-semibold text-slate-800 text-[10px]">Rendez-vous coiffure</div>
                            <div className="text-[8px] text-slate-400">Salon Élégance</div>
                          </div>
                        </div>
                        <span className="text-[8px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Confirmé
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-[10px]">14:00</span>
                          <div>
                            <div className="font-semibold text-slate-800 text-[10px]">Réunion professionnelle</div>
                            <div className="text-[8px] text-slate-400">Agence Digital</div>
                          </div>
                        </div>
                        <span className="text-[8px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                          À venir
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-[10px]">16:30</span>
                          <div>
                            <div className="font-semibold text-slate-800 text-[10px]">Suivi client</div>
                            <div className="text-[8px] text-slate-400">Visio — Google Meet</div>
                          </div>
                        </div>
                        <span className="text-[8px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                          À venir
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Laptop bottom bar */}
              <div className="h-2.5 bg-slate-700/80 rounded-b-xl mx-auto w-1/3 mt-1" />
            </div>

            {/* Overlapping Phone Mockup (bottom right) */}
            <div className="absolute -bottom-4 right-0 sm:right-2 w-36 sm:w-44 bg-slate-900 rounded-2xl p-1.5 shadow-2xl border-2 border-slate-700 hidden sm:block">
              <div className="bg-white rounded-xl p-2.5 text-[9px] text-slate-800">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-[10px]">Mes rendez-vous</span>
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[7px] font-bold text-blue-600">A</div>
                </div>
                <div className="text-[7px] text-slate-400 mb-1">Aujourd&apos;hui</div>
                <div className="bg-slate-50 p-1.5 rounded mb-1">
                  <div className="font-bold text-[8px] text-slate-800">09:00 Consultation</div>
                  <div className="text-[7px] text-slate-400">Dr. Martin</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded mb-1.5">
                  <div className="font-bold text-[8px] text-slate-800">11:30 Coiffure</div>
                  <div className="text-[7px] text-slate-400">Salon Élégance</div>
                </div>
                <div className="bg-blue-600 text-white rounded-full py-1 text-center font-bold text-[8px]">
                  Rappel vocal activé
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
