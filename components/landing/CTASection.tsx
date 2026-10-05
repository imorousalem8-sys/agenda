"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enveloppe Bleu Profond / Royal */}
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#070d1e] via-[#0b1736] to-[#0a2569] p-8 sm:p-14 lg:p-16 text-white overflow-hidden shadow-[0_25px_80px_rgba(7,13,30,0.35)] border border-blue-900/40">
          
          {/* Halos d'ambiance saphir */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d55e0]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Logo officiel central avec badge */}
            <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-8 shadow-sm">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <Image src="/logo.png" alt="Alamajonda" fill className="object-contain" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Alamajonda Executive Suite
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
              Ne laissez plus jamais un retard compromettre vos opportunités.
            </h2>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Rejoignez des centaines de dirigeants, professions libérales et entrepreneurs qui ont confié la vigilance de leur emploi du temps à Alamajonda.
            </p>

            {/* Bouton CTA Grand Format */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] shadow-xl shadow-blue-900/50 hover:-translate-y-0.5 transition-all"
              >
                <span>Créer mon compte gratuitement</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
              >
                Déjà membre ? Se connecter
              </Link>
            </div>

            {/* Réassurance */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Activation instantanée en 2 min
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue-300" />
                Sécurité bancaire &amp; RGPD
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
