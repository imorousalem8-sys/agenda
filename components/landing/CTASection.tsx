"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
          Prêt à ne plus jamais oublier un rendez-vous ?
        </h2>

        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed mb-8">
          Rejoignez des centaines d&apos;utilisateurs qui ont retrouvé une sérénité totale au quotidien grâce à Alamajonda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-lg transition-all"
          >
            <span>Créer mon compte gratuit</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-blue-100 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-blue-200 shrink-0" />
            Sans carte bancaire
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-blue-200 shrink-0" />
            Actif en 2 minutes
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-blue-200 shrink-0" />
            Sans engagement
          </span>
        </div>

      </div>
    </section>
  );
}
