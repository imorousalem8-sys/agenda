"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Carte d'Appel à l'action épurée */}
        <div className="p-8 sm:p-12 rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/95 shadow-[0_20px_60px_rgba(37,99,235,0.12)]">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09132b] tracking-tight mb-4">
            Ne laissez plus jamais un retard <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              gâcher votre journée.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto mb-8">
            Rejoignez les professionnels qui gagnent chaque semaine en ponctualité et en sérénité.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 transition-all"
            >
              <span>Créer mon compte gratuitement</span>
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-700 hover:text-[#09132b] bg-white border border-slate-200 shadow-xs transition-all"
            >
              Se connecter
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-semibold flex-wrap">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-500" />
              14 jours d&apos;essai gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-500" />
              Sans carte bancaire
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
