"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
            TARIFS CLAIRS & TRANSPARENTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Choisissez la formule qui vous correspond
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Commencez gratuitement dès aujourd&apos;hui, sans engagement et sans carte bancaire.
          </p>
        </div>

        {/* 2 Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Plan Gratuit */}
          <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-4">
                DÉCOUVERTE
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Gratuit</h3>
              <p className="text-sm text-slate-600 mb-6">
                Idéal pour planifier et ne plus oublier ses rendez-vous personnels.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">0€</span>
                <span className="text-slate-500 font-medium text-sm">/ pour toujours</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Gestion illimitée de rendez-vous</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Notifications sonores & push web</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Répertoire de contacts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Accès mobile & ordinateur</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-all border border-slate-200"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Plan Pro / Illimité (Mise en avant) */}
          <div className="bg-white border-2 border-blue-600 p-8 sm:p-10 rounded-3xl shadow-xl shadow-blue-600/10 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 right-8 bg-blue-600 text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              Recommandé
            </div>

            <div>
              <div className="inline-block text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-4">
                PREMIUM
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Alamajonda Pro</h3>
              <p className="text-sm text-slate-600 mb-6">
                Pour ceux qui exigent la certitude absolue de ne rater aucun rendez-vous.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-blue-600">9€</span>
                <span className="text-slate-500 font-medium text-sm">/ mois</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-900">Tout ce qui est inclus dans Gratuit</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span className="font-semibold text-blue-900">Rappels par Appels Vocaux directs</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Rappels par SMS automatiques</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Rappels multi-créneaux programmables</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-600 shrink-0" />
                  <span>Support prioritaire 7j/7</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all"
            >
              <span>Essayer Alamajonda Pro</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
