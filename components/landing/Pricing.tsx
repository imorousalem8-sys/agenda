"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Halo d'ambiance bleuté */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-100/50 via-indigo-100/30 to-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* En-tête de section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200/80 shadow-[0_2px_12px_rgba(37,99,235,0.06)] text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} className="text-blue-600" />
            <span>TARIFICATION TRANSPARENTE &amp; SANS SURPRISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09132b] tracking-tight leading-tight mb-4">
            Choisissez la formule qui vous correspond
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Commencez gratuitement dès aujourd&apos;hui, sans engagement et sans carte bancaire requise.
          </p>
        </div>

        {/* 2 Cartes de Tarifs en Verre Dépoli */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Plan Gratuit / Découverte */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.06)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-bold text-slate-600 bg-slate-100/90 px-3.5 py-1 rounded-full mb-4">
                DÉCOUVERTE
              </div>
              <h3 className="text-2xl font-black text-[#09132b] mb-2">Gratuit</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Parfait pour planifier votre semaine et ne plus jamais oublier vos rendez-vous personnels.
              </p>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-4xl sm:text-5xl font-black text-[#09132b]">0€</span>
                <span className="text-slate-500 font-semibold text-sm">/ pour toujours</span>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Gestion illimitée de rendez-vous</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Notifications sonores &amp; push web instantanées</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Répertoire de contacts &amp; notes associées</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Accès multi-supports mobile &amp; ordinateur</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-slate-800 bg-white hover:bg-blue-50 hover:text-blue-700 transition-all border border-slate-200/90 shadow-sm"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Plan Pro / Illimité (Mise en valeur Premium) */}
          <div className="relative p-8 sm:p-10 rounded-[32px] bg-white/85 backdrop-blur-2xl border-2 border-blue-500/80 shadow-[0_25px_60px_-15px_rgba(37,99,235,0.20)] ring-4 ring-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            
            {/* Badge flottant "Recommandé" */}
            <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md shadow-blue-500/30 flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>RECOMMANDÉ</span>
            </div>

            <div>
              <div className="inline-block text-xs font-bold text-blue-700 bg-blue-100/70 px-3.5 py-1 rounded-full mb-4">
                PREMIUM ILLIMITÉ
              </div>
              <h3 className="text-2xl font-black text-[#09132b] mb-2">AlarmAgenda Pro</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Pour les professionnels qui exigent la certitude absolue de ne rater aucun engagement stratégique.
              </p>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  9€
                </span>
                <span className="text-slate-500 font-semibold text-sm">/ mois</span>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-bold text-[#09132b]">Tout ce qui est inclus dans Gratuit</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-bold text-blue-900">Rappels par Appels Vocaux directs sur mobile</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Rappels par SMS automatiques illimités</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Synchronisation bi-directionnelle Google &amp; Outlook</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Support prioritaire 7j/7 par WhatsApp &amp; téléphone</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Essayer AlarmAgenda Pro</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>

        {/* Note de réassurance */}
        <div className="mt-12 text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-6 flex-wrap">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-500" />
            14 jours d&apos;essai complet sans engagement
          </span>
          <span>•</span>
          <span>Annulation en 1 clic à tout moment</span>
          <span>•</span>
          <span>Paiement sécurisé par Stripe</span>
        </div>

      </div>
    </section>
  );
}
