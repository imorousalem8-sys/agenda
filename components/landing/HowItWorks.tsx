"use client";

import { Calendar, Bell, CheckCircle2, Sparkles, PhoneCall, Sliders, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Halo d'ambiance bleuté */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-100/40 via-indigo-50/30 to-blue-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* En-tête de section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200/80 shadow-[0_2px_12px_rgba(37,99,235,0.06)] text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} className="text-blue-600" />
            <span>FONCTIONNEMENT SIMPLE &amp; SANS EFFORT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09132b] tracking-tight leading-tight mb-4">
            Comment ça fonctionne ? <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Prêt en 3 étapes chronométrées.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Aucune configuration fastidieuse. AlarmAgenda prend immédiatement le relais dès votre premier événement.
          </p>
        </div>

        {/* Grille des 3 Étapes en Verre Dépoli */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
          
          {/* Étape 1 */}
          <div className="group relative p-8 sm:p-9 rounded-[28px] bg-white/75 backdrop-blur-2xl border border-white/90 hover:border-blue-300 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-13 h-13 px-4 py-2 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  01
                </span>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Calendar size={22} />
                </div>
              </div>

              <h3 className="text-xl font-black text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors">
                Notez votre rendez-vous
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Saisissez le titre, l&apos;horaire, le lieu et les consignes importantes en quelques secondes, au clavier ou à la voix.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 font-semibold flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Ex : Réunion Client Stratégique à 14h30</span>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="group relative p-8 sm:p-9 rounded-[28px] bg-white/75 backdrop-blur-2xl border border-white/90 hover:border-indigo-300 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-13 h-13 px-4 py-2 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  02
                </span>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Sliders size={22} />
                </div>
              </div>

              <h3 className="text-xl font-black text-[#09132b] mb-3 group-hover:text-indigo-600 transition-colors">
                Choisissez votre rappel
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Définissez le timing idéal (15 min avant, 1h avant) et le mode préféré : appel vocal direct, SMS automatique ou push.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 font-semibold flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Appel vocal prioritaire & SMS activés</span>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="group relative p-8 sm:p-9 rounded-[28px] bg-white/75 backdrop-blur-2xl border border-white/90 hover:border-blue-400 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-13 h-13 px-4 py-2 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  03
                </span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <PhoneCall size={22} />
                </div>
              </div>

              <h3 className="text-xl font-black text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors">
                L&apos;IA vous appelle à l&apos;heure
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Votre appareil sonne, l&apos;assistant vocal énonce clairement vos consignes et vous êtes toujours parfaitement prêt.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 font-semibold flex items-center gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Zéro retard garanti à 100%</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
