"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-blue-50/50 to-white text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Shimmer Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
          <Sparkles size={13} className="text-blue-600" />
          <span>OFFRE DE BIENVENUE • 14 JOURS D&apos;ESSAI INCLUS</span>
        </div>

        {/* Monumental Title */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] mb-6 max-w-3xl mx-auto text-slate-900">
          Ne laissez plus jamais un retard <br className="hidden sm:inline" />
          <span className="text-[#1d4ed8]">
            gâcher votre crédibilité.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Rejoignez des centaines de professionnels et particuliers qui gagnent chaque semaine en sérénité et en efficacité grâce à AlarmAgenda.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Créer mon compte gratuitement</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all"
          >
            <span>Déjà inscrit ? Se connecter</span>
          </Link>
        </div>

        {/* 3 Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium pt-8 border-t border-slate-200/70">
          <span className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600 stroke-[2.5]" />
            <span>Aucune carte bancaire requise</span>
          </span>
          <span className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600 stroke-[2.5]" />
            <span>Configuration en moins de 2 minutes</span>
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-600" />
            <span>Données 100% chiffrées & sécurisées</span>
          </span>
        </div>
      </div>
    </section>
  );
}
