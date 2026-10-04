"use client";

import { Mic, Calendar, ShieldCheck, Sparkles, CheckCircle2, Zap, ArrowRight, Bell, Clock } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-20 sm:py-28 bg-slate-50/60 text-slate-900 relative overflow-hidden border-y border-slate-200/80">
      {/* Background Dot Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Soft Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            <span>3 PILIERS ESSENTIELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Simple. Puissant. <span className="text-[#1d4ed8]">Zéro retard.</span>
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Une combinaison unique d&apos;agenda visuel, de rappels vocaux intelligents et d&apos;intelligence artificielle proactive.
          </p>
        </div>

        {/* 3 Compact & Stylish Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1 : 🎙️ Appel Vocal IA */}
          <div className="group relative p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-md shadow-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shadow-xs border border-blue-100 group-hover:scale-105 transition-transform">
                  <Mic size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Appel Vocal & Alerte
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold tracking-wide uppercase">
                    Sonnerie réelle garantie
                  </span>
                </div>
              </div>

              {/* 3 Concise Lines */}
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Alerte vocale réelle :</strong> Votre appareil sonne et énonce précisément vos consignes à l&apos;heure fixée.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Voix naturelle HD :</strong> L&apos;IA dicte les adresses, contacts et urgences avec clarté.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Acquittement direct :</strong> Validez ou reportez de 10 min en un seul clic ou geste.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-semibold">
              <span>Zéro oubli garanti</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>

          {/* Card 2 : 📅 Agenda Intelligent */}
          <div className="group relative p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-400 shadow-md shadow-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shadow-xs border border-indigo-100 group-hover:scale-105 transition-transform">
                  <Calendar size={22} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Agenda Intelligent
                  </h3>
                  <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
                    Vues Jour, Semaine, Mois
                  </span>
                </div>
              </div>

              {/* 3 Concise Lines */}
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Saisie express :</strong> Ajoutez rendez-vous, réunions et chantiers en 3 secondes.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Checklists & Lieux :</strong> Organisez outillage, adresses et priorités pour chaque mission.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Synchronisation :</strong> Calendrier réactif avec export ICS universel.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-semibold">
              <span>Organisation limpide</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>

          {/* Card 3 : ⚡ Copilote IA Cloud */}
          <div className="group relative p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-400 shadow-md shadow-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform">
                  <Sparkles size={22} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Copilote IA Flash
                  </h3>
                  <span className="text-xs text-emerald-600 font-semibold tracking-wide uppercase">
                    Réponse ultra-rapide &lt; 1s
                  </span>
                </div>
              </div>

              {/* 3 Concise Lines */}
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Ordres instantanés :</strong> « Rappelle-moi à 15h d&apos;appeler Paul », l&apos;IA programme tout automatiquement.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Conversation naturelle :</strong> Posez des questions, demandez des conseils sans faux rendez-vous.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0 shadow-xs" />
                  <p className="leading-snug">
                    <strong className="text-slate-900 font-semibold">Mode Urgence vitale :</strong> Déclenchement d&apos;alarme prioritaire immédiate sur les ordres critiques.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Performance Cloud Gemini</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Bottom Quick Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Tout est 100% opérationnel en ligne
              </p>
              <p className="text-xs text-slate-500">
                Disponible immédiatement sur ordinateur, tablette et smartphone sans installation requise.
              </p>
            </div>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md shadow-blue-600/20 transition-all shrink-0"
          >
            <span>Créer mon compte</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
