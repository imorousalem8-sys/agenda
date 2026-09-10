"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-r from-[#071F52] via-[#0A2E7A] to-[#071F52] text-white relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2.5 text-white">
          Ne laissez plus votre agenda décider à votre place.
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-blue-100/80 max-w-lg mx-auto leading-relaxed mb-6">
          Créez votre compte gratuitement et laissez votre assistant vous rappeler ce qui compte vraiment.
        </p>

        {/* Button */}
        <div className="flex justify-center mb-6">
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all"
          >
            <span>Créer mon compte gratuitement</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Checks */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-blue-200 font-medium">
          <span className="flex items-center gap-1">
            <Check size={13} className="text-sky-400 shrink-0 stroke-[2.5]" />
            Sans carte bancaire
          </span>
          <span className="flex items-center gap-1">
            <Check size={13} className="text-sky-400 shrink-0 stroke-[2.5]" />
            Sans engagement
          </span>
          <span className="flex items-center gap-1">
            <Check size={13} className="text-sky-400 shrink-0 stroke-[2.5]" />
            Quelques minutes pour commencer
          </span>
        </div>

      </div>
    </section>
  );
}
