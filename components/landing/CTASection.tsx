"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#071D49] via-[#0A2968] to-[#071D49] text-white relative overflow-hidden">
      
      {/* Decorative subtle blue wave glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
          Ne laissez plus votre agenda décider à votre place.
        </h2>

        <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto leading-relaxed mb-8">
          Créez votre compte gratuitement et laissez votre assistant vous rappeler ce qui compte vraiment.
        </p>

        <div className="flex justify-center mb-8">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            <span>Créer mon compte gratuitement</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-blue-200 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
            Sans carte bancaire
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
            Sans engagement
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
            Quelques minutes pour commencer
          </span>
        </div>

      </div>
    </section>
  );
}
