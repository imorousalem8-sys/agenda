"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Halo d'ambiance bleuté intense */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-blue-200/50 via-indigo-100/40 to-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        {/* Grande Carte d'Appel à l'Action en Verre Dépoli */}
        <div className="p-8 sm:p-14 lg:p-16 rounded-[40px] bg-white/80 backdrop-blur-2xl border-2 border-white/95 shadow-[0_25px_70px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/10 text-center relative overflow-hidden">
          
          {/* Ligne d'accent lumineuse en haut */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

          {/* Badge Shimmer */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            <span>OFFRE EXCLUSIVE • 14 JOURS D&apos;ESSAI INCLUS</span>
          </div>

          {/* Titre Majeur */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.10] mb-6 max-w-4xl mx-auto text-[#09132b]">
            Ne laissez plus jamais un retard <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              gâcher votre crédibilité.
            </span>
          </h2>

          {/* Sous-titre */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Rejoignez des centaines de professionnels et particuliers qui gagnent chaque semaine en sérénité et en ponctualité absolue grâce à AlarmAgenda.
          </p>

          {/* Boutons d'Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/register"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <span>Créer mon compte gratuitement</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-slate-700 hover:text-[#09132b] bg-white/80 hover:bg-white border border-slate-200/90 shadow-sm transition-all"
            >
              <span>Déjà inscrit ? Se connecter</span>
            </Link>
          </div>

          {/* 3 Garanties avec coches vertes */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 font-semibold pt-8 border-t border-blue-100/70">
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <Check size={12} className="stroke-[3]" />
              </div>
              <span>Aucune carte bancaire requise</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <Check size={12} className="stroke-[3]" />
              </div>
              <span>Prêt à l&apos;emploi en 2 minutes</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <ShieldCheck size={13} />
              </div>
              <span>Données chiffrées &amp; hébergement sécurisé</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
