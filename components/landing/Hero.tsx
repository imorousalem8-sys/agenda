"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Volume2, Search, Bell, User, Clock, Calendar, Briefcase, FileText, Settings, Home } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white pt-10 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-50/80 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions (5.5 cols) */}
          <div className="lg:col-span-6 text-left">
            
            {/* Pre-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6">
              VOTRE ASSISTANT POUR NE PLUS RIEN OUBLIER
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
              N&apos;oubliez plus jamais <br />
              <span className="text-blue-600">un rendez-vous important.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              AlarmaAgenda organise vos rendez-vous et vous prévient au bon moment grâce aux rappels vocaux, notifications et SMS.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 underline underline-offset-4 px-2 py-2 transition-colors"
              >
                Se connecter
              </Link>
            </div>

            {/* Checklist items */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                Sans carte bancaire
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                Configuration en quelques minutes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                Disponible sur ordinateur et mobile
              </span>
            </div>

          </div>

          {/* Right Column: Realistic Laptop & Smartphone Visual (6.5 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            
            <div className="relative w-full max-w-[560px]">
              
              {/* Laptop Mockup */}
              <div className="w-[88%] sm:w-[85%] bg-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-slate-700/80">
                <div className="bg-white rounded-xl overflow-hidden shadow-inner text-slate-800">
                  
                  {/* Laptop Topbar */}
                  <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-200/80 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex items-center justify-center text-[7px] text-white font-bold">
                        A
                      </div>
                      <span className="font-bold text-slate-900">AlarmaAgenda</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Search size={11} />
                      <Bell size={11} />
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[8px]">
                        SA
                      </div>
                    </div>
                  </div>

                  {/* Laptop Body */}
                  <div className="flex min-h-[220px] text-[10px]">
                    
                    {/* Sidebar */}
                    <div className="w-24 bg-slate-50 border-r border-slate-100 p-2 space-y-1 hidden sm:block">
                      <div className="flex items-center gap-1 px-1.5 py-1 text-slate-500 rounded">
                        <Home size={10} />
                        <span>Accueil</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-1 bg-blue-50 text-blue-700 font-bold rounded">
                        <Calendar size={10} />
                        <span>Agenda</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-1 text-slate-500 rounded">
                        <FileText size={10} />
                        <span>Tâches</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-1 text-slate-500 rounded">
                        <Bell size={10} />
                        <span>Rappels</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-1 text-slate-500 rounded">
                        <Settings size={10} />
                        <span>Paramètres</span>
                      </div>
                    </div>

                    {/* Schedule View */}
                    <div className="flex-1 p-2.5 sm:p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">Aujourd&apos;hui</h4>
                          <span className="text-[8px] text-slate-400">Lundi 12 mai 2025</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5">
                        <div className="p-1.5 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-700 text-[9px]">09:00</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[9px]">Rendez-vous client</div>
                              <div className="text-[7px] text-slate-400">Cabinet Dupont</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-600 text-[9px]">12:30</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[9px]">Déjeuner</div>
                              <div className="text-[7px] text-slate-400">Restaurant Le Central</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-600 text-[9px]">14:30</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[9px]">Consultation</div>
                              <div className="text-[7px] text-slate-400">Dr. Martin</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-600 text-[9px]">17:00</span>
                            <div>
                              <div className="font-bold text-slate-800 text-[9px]">Chantier</div>
                              <div className="text-[7px] text-slate-400">Rue des Tilleuls</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

              {/* Smartphone Mockup (Overlapping right) */}
              <div className="absolute right-0 -bottom-3 sm:-bottom-4 w-[160px] sm:w-[195px] bg-slate-900 rounded-[2rem] p-2 shadow-2xl border-2 border-slate-700 z-20">
                <div className="bg-slate-950 text-white rounded-[1.6rem] p-3 pt-4 min-h-[260px] flex flex-col justify-between">
                  {/* Lock Screen Header */}
                  <div className="text-center">
                    <div className="w-12 h-3 bg-slate-800 rounded-full mx-auto mb-2" />
                    <div className="text-2xl font-light tracking-tight">14:15</div>
                    <div className="text-[9px] text-slate-400 mb-4">Lundi 12 mai</div>

                    {/* Incoming Push Notification */}
                    <div className="bg-white/95 text-slate-900 rounded-xl p-2.5 text-left shadow-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded bg-blue-600 flex items-center justify-center text-[7px] text-white font-bold">
                            A
                          </div>
                          <span className="text-[9px] font-bold">AlarmaAgenda</span>
                        </div>
                        <span className="text-[7px] text-slate-400">maintenant</span>
                      </div>
                      <div className="text-[8px] font-bold text-blue-700 mb-0.5">
                        Rappel vocal dans 15 minutes
                      </div>
                      <div className="text-[7px] text-slate-600 leading-tight">
                        « Vous avez un rendez-vous avec votre client à 14h30. »
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar indicator */}
                  <div className="w-16 h-1 bg-slate-600 rounded-full mx-auto" />
                </div>
              </div>

              {/* Floating Pill Card (Bottom) */}
              <div className="absolute -bottom-6 left-2 sm:left-4 bg-white/95 backdrop-blur-md border border-blue-200 px-4 py-2.5 rounded-full shadow-xl shadow-blue-900/10 flex items-center gap-2.5 z-30">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Volume2 size={15} className="text-blue-600 animate-pulse" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-blue-700 uppercase">
                    Rappel vocal
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
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
