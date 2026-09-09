"use client";

import { User, HardHat, Check, Calendar, Volume2 } from "lucide-react";

export default function UseCases() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Deux modes d'utilisation (6.5 cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              DEUX MODES D&apos;UTILISATION
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
              Un agenda pensé pour votre quotidien
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Mode Personnel */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
                      <User size={18} />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      Personnel
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Gérez vos rendez-vous et vos tâches au quotidien.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-blue-600 shrink-0" />
                      <span>Médecin</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-blue-600 shrink-0" />
                      <span>Démarches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-blue-600 shrink-0" />
                      <span>Réunions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-blue-600 shrink-0" />
                      <span>Événements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-blue-600 shrink-0" />
                      <span>Tâches personnelles</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mode Professionnel */}
              <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-emerald-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <HardHat size={18} />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      Professionnel
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Pour les artisans, indépendants et professionnels.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-600 shrink-0" />
                      <span>Rendez-vous clients</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-600 shrink-0" />
                      <span>Chantiers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-600 shrink-0" />
                      <span>Matériel à ne pas oublier</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-600 shrink-0" />
                      <span>Tâches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-600 shrink-0" />
                      <span>Rappels d&apos;intervention</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Un exemple concret (5.5 cols) */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-8">
              Un exemple concret
            </h3>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md">
              
              {/* Top date badge */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
                <Calendar size={15} className="text-blue-600" />
                <span>Demain — 08:00</span>
              </div>

              {/* Audio voice reminder box */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-1">
                  <Volume2 size={15} className="text-blue-600 animate-pulse shrink-0" />
                  <span>Rappel vocal</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed italic">
                  « Bonjour, vous avez un chantier à 9h00. N&apos;oubliez pas les raccords, les outils et le matériel prévu pour l&apos;intervention. »
                </p>
              </div>

              {/* Action / Appointment info */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    09
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">09:00 — Chantier client</div>
                    <div className="text-[10px] text-slate-400">Rue des Tilleuls, 12</div>
                  </div>
                </div>
              </div>

              {/* Photo Illustration */}
              <div className="rounded-xl overflow-hidden shadow-inner aspect-[16/9] relative border border-slate-100">
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
