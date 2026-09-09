"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, Bell, ShieldCheck, Zap, Calendar, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50/60 via-white to-white pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge Pilule */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>La solution intelligente de gestion & rappels de rendez-vous</span>
        </div>

        {/* Grand Titre Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Ne manquez plus jamais <br className="hidden sm:inline" />
          un <span className="text-blue-600">rendez-vous important.</span>
        </h1>

        {/* Sous-titre explicatif */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          Alamajonda planifie, organise et vous rappelle automatiquement chacun de vos rendez-vous par 
          <strong className="text-slate-900 font-semibold"> appel vocal direct</strong>, 
          <strong className="text-slate-900 font-semibold"> SMS</strong> et 
          <strong className="text-slate-900 font-semibold"> notification</strong>. 
          Gagnez en sérénité et libérez votre esprit.
        </p>

        {/* Boutons d'Action Principaux */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5"
          >
            <span>Démarrer gratuitement</span>
            <ArrowRight size={18} />
          </Link>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 shadow-sm transition-all"
          >
            <span>Découvrir le fonctionnement</span>
          </a>
        </div>

        {/* Garanties et réassurance */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs sm:text-sm font-medium text-slate-500 mb-16">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
            <span>Gratuit & sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
            <span>Configuration en 2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
            <span>Données privées & sécurisées</span>
          </div>
        </div>

        {/* Bandeau des Chiffres Clés & Valeur Produit (Bleu & Blanc) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white border border-blue-100 p-6 sm:p-8 rounded-2xl shadow-xl shadow-blue-900/5">
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-1">99.9%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600">Ponctualité assurée</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-1">Appel & SMS</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600">Rappels multi-canaux</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-1">0 Oubli</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600">Fini les rendez-vous manqués</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-1">100% Web</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600">Mobile, tablette & PC</div>
          </div>
        </div>

      </div>
    </section>
  );
}
