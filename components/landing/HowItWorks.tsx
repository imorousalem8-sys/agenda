"use client";

import { Calendar, Bell, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Heading (4 cols) */}
          <div className="lg:col-span-4 text-left">
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              COMMENT ÇA FONCTIONNE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              En 3 étapes.
            </h2>
            <p className="text-base text-slate-600">
              Simple, rapide et efficace.
            </p>
          </div>

          {/* Right: 3 Steps Cards (8 cols) with arrows */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-3">
            
            {/* Step 1 */}
            <div className="flex-1 w-full p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between min-h-[175px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    01
                  </span>
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  Ajoutez votre rendez-vous
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Indiquez la date, l&apos;heure et les informations importantes.
                </p>
              </div>
            </div>

            <ArrowRight size={16} className="hidden sm:block text-slate-300 shrink-0" />

            {/* Step 2 */}
            <div className="flex-1 w-full p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between min-h-[175px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    02
                  </span>
                  <Bell size={18} className="text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  Choisissez votre rappel
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Appel vocal, notification ou SMS.
                </p>
              </div>
            </div>

            <ArrowRight size={16} className="hidden sm:block text-slate-300 shrink-0" />

            {/* Step 3 */}
            <div className="flex-1 w-full p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between min-h-[175px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    03
                  </span>
                  <CheckCircle2 size={18} className="text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  Laissez l&apos;application vous prévenir
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  AlarmaAgenda s&apos;occupe du rappel automatiquement.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
