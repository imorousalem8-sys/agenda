"use client";

import Link from "next/link";
import { ArrowRight, Check, Volume2, Search, Bell, Home, Calendar, FileText, Settings } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
      
      {/* Soft Blue Ambient Circle behind mockup */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Copy & Actions (6 cols) */}
          <div className="lg:col-span-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-4">
              VOTRE ASSISTANT POUR NE PLUS RIEN OUBLIER
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-slate-900 tracking-tight leading-[1.2] mb-3.5">
              N&apos;oubliez plus jamais <br />
              <span className="text-blue-600">un rendez-vous important.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-md">
              AlarmaAgenda organise vos rendez-vous et vous prévient au bon moment grâce aux rappels vocaux, notifications et SMS.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/login"
                className="text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 underline underline-offset-4 transition-colors"
              >
                Se connecter
              </Link>
            </div>

            {/* Checklist items */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Check size={13} className="text-blue-600 shrink-0 stroke-[2.5]" />
                Sans carte bancaire
              </span>
              <span className="flex items-center gap-1">
                <Check size={13} className="text-blue-600 shrink-0 stroke-[2.5]" />
                Configuration en quelques minutes
              </span>
              <span className="flex items-center gap-1">
                <Check size={13} className="text-blue-600 shrink-0 stroke-[2.5]" />
                Disponible sur ordinateur et mobile
              </span>
            </div>

          </div>

          {/* Right Column: Scaled Device Mockup (6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            <div className="relative w-full max-w-[440px]">
              
              {/* Laptop Frame */}
              <div className="w-[85%] bg-slate-800 rounded-xl p-2 shadow-xl border border-slate-700/70">
                <div className="bg-white rounded-lg overflow-hidden shadow-inner text-slate-800">
                  
                  {/* Top Bar */}
                  <div className="bg-slate-50 px-2.5 py-1 border-b border-slate-200 flex items-center justify-between text-[8px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600 flex items-center justify-center text-[5px] text-white font-bold">
                        A
                      </div>
                      <span className="font-bold text-slate-900 text-[8px]">AlarmaAgenda</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[8px]">
                      <Search size={9} />
                      <Bell size={9} />
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[7px]">
                        SA
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex min-h-[175px] text-[8px]">
                    
                    {/* Mini Sidebar */}
                    <div className="w-16 bg-slate-50 border-r border-slate-100 p-1.5 space-y-0.5 hidden sm:block">
                      <div className="flex items-center gap-1 px-1 py-0.5 text-slate-400 rounded">
                        <Home size={8} />
                        <span>Accueil</span>
                      </div>
                      <div className="flex items-center gap-1 px-1 py-0.5 bg-blue-50 text-blue-700 font-bold rounded">
                        <Calendar size={8} />
                        <span>Agenda</span>
                      </div>
                      <div className="flex items-center gap-1 px-1 py-0.5 text-slate-400 rounded">
                        <FileText size={8} />
                        <span>Tâches</span>
                      </div>
                      <div className="flex items-center gap-1 px-1 py-0.5 text-slate-400 rounded">
                        <Bell size={8} />
                        <span>Rappels</span>
                      </div>
                      <div className="flex items-center gap-1 px-1 py-0.5 text-slate-400 rounded">
                        <Settings size={8} />
                        <span>Paramètres</span>
                      </div>
                    </div>

                    {/* Schedule List */}
                    <div className="flex-1 p-2 bg-white">
                      <div className="mb-1.5">
                        <div className="font-bold text-slate-900 text-[9px]">Aujourd&apos;hui</div>
                        <div className="text-[7px] text-slate-400">Lundi 12 mai 2025</div>
                      </div>

                      <div className="space-y-1">
                        <div className="p-1 rounded bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-blue-700 text-[8px]">09:00</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[8px]">Rendez-vous client</div>
                              <div className="text-[6px] text-slate-400">Cabinet Dupont</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-600 text-[8px]">12:30</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[8px]">Déjeuner</div>
                              <div className="text-[6px] text-slate-400">Restaurant Le Central</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-600 text-[8px]">14:30</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[8px]">Consultation</div>
                              <div className="text-[6px] text-slate-400">Dr. Martin</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-600 text-[8px]">17:00</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[8px]">Chantier</div>
                              <div className="text-[6px] text-slate-400">Rue des Tilleuls</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

              {/* Smartphone Mockup */}
              <div className="absolute right-0 -bottom-2 w-[125px] sm:w-[140px] bg-slate-900 rounded-[1.5rem] p-1.5 shadow-2xl border border-slate-700 z-20">
                <div className="bg-slate-950 text-white rounded-[1.2rem] p-2 pt-3 min-h-[200px] flex flex-col justify-between">
                  <div className="text-center">
                    <div className="w-8 h-2 bg-slate-800 rounded-full mx-auto mb-1.5" />
                    <div className="text-lg font-light">14:15</div>
                    <div className="text-[7px] text-slate-400 mb-2.5">Lundi 12 mai</div>

                    {/* Notification card */}
                    <div className="bg-white text-slate-900 rounded-lg p-1.5 text-left shadow border border-slate-200">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-0.5">
                          <div className="w-2 h-2 rounded bg-blue-600 text-white font-bold text-[5px] flex items-center justify-center">
                            A
                          </div>
                          <span className="text-[7px] font-bold">AlarmaAgenda</span>
                        </div>
                        <span className="text-[6px] text-slate-400">maintenant</span>
                      </div>
                      <div className="text-[7px] font-bold text-blue-700">
                        Rappel vocal dans 15 min
                      </div>
                      <div className="text-[6px] text-slate-500 leading-tight">
                        Rdv client à 14h30.
                      </div>
                    </div>
                  </div>

                  <div className="w-10 h-0.5 bg-slate-600 rounded-full mx-auto" />
                </div>
              </div>

              {/* Floating Pill Card (Rappel vocal) */}
              <div className="absolute -bottom-4 left-1 sm:left-2 bg-white/95 backdrop-blur-md border border-blue-200/90 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-30">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Volume2 size={12} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-[7px] font-bold text-blue-600 uppercase">
                    Rappel vocal
                  </div>
                  <div className="text-[9px] font-semibold text-slate-800">
                    Votre rendez-vous commence dans 15 minutes.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
