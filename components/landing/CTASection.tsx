"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Aurora Mesh Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Shimmer Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles size={13} className="text-blue-400" />
          <span>OFFRE DE BIENVENUE • 14 JOURS D&apos;ESSAI INCLUS</span>
        </div>

        {/* Monumental Title */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] mb-6 max-w-3xl mx-auto text-white">
          Ne laissez plus jamais un retard <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            gâcher votre crédibilité.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Rejoignez des centaines de professionnels et particuliers qui gagnent chaque semaine en sérénité et en efficacité.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-base font-bold text-slate-950 bg-white hover:bg-blue-50 shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-[1.03] transition-all duration-200"
          >
            <span>Créer mon compte gratuitement</span>
            <ArrowRight size={18} className="text-blue-600" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
          >
            <span>Déjà inscrit ? Se connecter</span>
          </Link>
        </div>

        {/* 3 Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium pt-6 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <Check size={15} className="text-emerald-400 stroke-[2.5]" />
            Sans carte bancaire
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={15} className="text-emerald-400 stroke-[2.5]" />
            Sans engagement, résiliable en 1 clic
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-blue-400 stroke-[2.5]" />
            Données 100% sécurisées en France
          </span>
        </div>

      </div>
    </section>
  );
}
