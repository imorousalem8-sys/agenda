"use client";

import { Calendar, Bell, CheckCircle2, ArrowRight, Sparkles, PhoneCall, Sliders } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      
      {/* Background Accent Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Sparkles size={13} />
            <span>FONCTIONNEMENT SIMPLE &amp; INTUITIF</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Comment ça fonctionne ? <br />
            <span className="text-blue-600">Prêt en 3 étapes chronométrées.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Aucun réglage complexe. AlarmaAgenda prend le relais dès votre premier événement.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-extrabold text-lg flex items-center justify-center border border-blue-200 shadow-inner">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Calendar size={20} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Notez votre rendez-vous
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Saisissez le titre, l&apos;heure, le lieu et vos consignes importantes en quelques secondes.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Ex : Rendez-vous client à 14h30</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 font-extrabold text-lg flex items-center justify-center border border-indigo-200 shadow-inner">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                <Sliders size={20} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Choisissez votre rappel
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Définissez l&apos;heure d&apos;alerte (15 min avant, 1h avant) et le mode préféré : appel vocal, SMS ou push.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Appel vocal prioritaire activé</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 font-extrabold text-lg flex items-center justify-center border border-emerald-200 shadow-inner">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <PhoneCall size={20} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                L&apos;IA vous appelle à l&apos;heure
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Votre téléphone sonne, l&apos;assistant vous récite votre consigne avec clarté. Vous êtes toujours prêt.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-700 font-medium flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Zéro retard, zéro oubli garanti</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
