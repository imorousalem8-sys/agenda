"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
      
      {/* Subtle circle decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Prêt à ne plus jamais oublier un rendez-vous ?
        </h2>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
          Rejoignez des centaines d&apos;utilisateurs qui ont retrouvé une sérénité totale au quotidien grâce à Alamajonda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Créer mon compte gratuit</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-blue-100 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-blue-200" />
            Aucune carte bancaire requise
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-blue-200" />
            Actif en 2 minutes
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-blue-200" />
            Sans engagement
          </span>
        </div>

      </div>
    </section>
  );
}
