"use client";

import { Calendar, Bell, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Headline (4 cols) */}
          <div className="lg:col-span-4 text-left">
            <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">
              COMMENT ÇA FONCTIONNE
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
              En 3 étapes.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Simple, rapide et efficace.
            </p>
          </div>

          {/* Right: 3 Cards (8 cols) */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-2.5">
            
            {/* Step 1 */}
            <div className="flex-1 w-full p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[145px]">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                    01
                  </span>
                  <Calendar size={15} className="text-blue-600" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  Ajoutez votre rendez-vous
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Indiquez la date, l&apos;heure et les informations importantes.
                </p>
              </div>
            </div>

            <ArrowRight size={14} className="hidden sm:block text-slate-300 shrink-0" />

            {/* Step 2 */}
            <div className="flex-1 w-full p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[145px]">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                    02
                  </span>
                  <Bell size={15} className="text-blue-600" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  Choisissez votre rappel
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Appel vocal, notification ou SMS.
                </p>
              </div>
            </div>

            <ArrowRight size={14} className="hidden sm:block text-slate-300 shrink-0" />

            {/* Step 3 */}
            <div className="flex-1 w-full p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[145px]">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                    03
                  </span>
                  <CheckCircle2 size={15} className="text-blue-600" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  Laissez l&apos;application vous prévenir
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
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
