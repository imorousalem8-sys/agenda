"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall, Mic, MessageSquare, CalendarCheck, CheckCircle2, Volume2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      
      {/* Background Soft Blue Glow Accent */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Copy & Right Photo */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20">
          
          {/* Left Column: Copy & Actions (6 cols) */}
          <div className="lg:col-span-6 text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Ne manquez plus <br />
              aucun <span className="text-blue-600">rendez-vous important</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée. Recevez un appel direct et des alertes sur-mesure au moment opportun.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5 text-center"
              >
                <span>Commencer Gratuitement</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                Sans carte bancaire
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                Installation en 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                Données 100% privées
              </span>
            </div>

          </div>

          {/* Right Column: Hero Photo & Floating Card (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-[500px]">
              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100 aspect-[4/3]">
                <Image
                  src="/images/hero-woman.jpg"
                  alt="Utilisatrice sereine recevant un rappel vocal Alamajonda"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Floating Voice Call Widget (Comme dans la maquette Option 1) */}
              <div className="absolute -bottom-6 left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-blue-100 p-4 sm:p-5 rounded-2xl shadow-xl shadow-blue-950/10 flex items-center gap-4 z-20 animate-in fade-in slide-in-from-bottom-3 duration-500 max-w-[340px]">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Volume2 className="w-6 h-6 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Appel Vocal
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Programmé à 14h30
                  </h4>
                  <p className="text-xs text-slate-500">
                    Consultation & Déplacement
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom 3 Feature Cards (Identique à la maquette Option 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-10 border-t border-slate-100">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 hover:border-blue-400 p-7 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Mic className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              Rappels Vocaux IA
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Planifiez des rappels vocaux clairs et naturels en quelques secondes pour ne rater aucun engagement.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 hover:border-blue-400 p-7 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              Multi-Canaux SMS
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Envoyez des confirmations et rappels automatiques par SMS et notifications pour une portée maximale.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 hover:border-blue-400 p-7 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CalendarCheck className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              Agenda Intelligent
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Organisez vos rendez-vous, réunions et tâches avec une planification fluide et intuitive.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
