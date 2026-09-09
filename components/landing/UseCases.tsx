"use client";

import { User, HardHat, Check, Calendar, Volume2 } from "lucide-react";

export default function UseCases() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Deux modes d'utilisation (6.5 cols) */}
          <div className="lg:col-span-7">
            <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">
              DEUX MODES D&apos;UTILISATION
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
              Un agenda pensé pour votre quotidien
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Card Personnel */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/70 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <User size={14} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Personnel
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-500 mb-3.5 leading-relaxed">
                    Gérez vos rendez-vous et vos tâches au quotidien.
                  </p>

                  <ul className="space-y-1.5 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Médecin</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Démarches</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Réunions</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Événements</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Tâches personnelles</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card Professionnel */}
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-emerald-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <HardHat size={14} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Professionnel
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-500 mb-3.5 leading-relaxed">
                    Pour les artisans, indépendants et professionnels.
                  </p>

                  <ul className="space-y-1.5 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Rendez-vous clients</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Chantiers</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Matériel à ne pas oublier</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Tâches</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={11} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Rappels d&apos;intervention</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Un exemple concret (5.5 cols) */}
          <div className="lg:col-span-5">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-6">
              Un exemple concret
            </h3>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-md">
              
              {/* Date Header */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">
                <Calendar size={13} className="text-blue-600" />
                <span>Demain — 08:00</span>
              </div>

              {/* Voice message callout */}
              <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-100 mb-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 mb-0.5">
                  <Volume2 size={13} className="text-blue-600 shrink-0" />
                  <span>Rappel vocal</span>
                </div>
                <p className="text-[10px] text-slate-700 leading-relaxed italic">
                  « Bonjour, vous avez un chantier à 9h00. N&apos;oubliez pas les raccords, les outils et le matériel prévu pour l&apos;intervention. »
                </p>
              </div>

              {/* Location Box */}
              <div className="flex items-center p-2 rounded-lg bg-slate-50 border border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px]">
                    09
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">09:00 — Chantier client</div>
                    <div className="text-[9px] text-slate-400">Rue des Tilleuls, 12</div>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="rounded-lg overflow-hidden border border-slate-100 h-32 sm:h-36 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/chantier-artisan.jpg"
                  alt="Chantier artisan AlarmaAgenda"
                  className="w-full h-full object-cover object-center"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
