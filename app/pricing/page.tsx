"use client";

import Link from "next/link";
import { Check, Bell, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import "@/components/alarmeagenda.css";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased">
      {/* Header simple */}
      <header className="bg-white border-b border-[#e2e8f0] px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Bell size={16} />
          </div>
          <span className="font-bold text-base text-[#0f172a]">
            Alarme<span className="text-blue-600">Agenda</span>
          </span>
        </Link>
        <Link href="/dashboard" className="aa-btn-secondary text-xs py-2 px-3.5">
          Retour au tableau de bord
        </Link>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Tarification transparente</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Des formules pensées pour votre sérénité
          </h1>
          <p className="text-sm text-[#64748b]">
            Choisissez l&apos;offre adaptée à votre rythme. Vous pouvez changer de formule à tout moment.
          </p>
        </div>

        {/* Grille FREE / PRO (Section 22) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan FREE */}
          <div className="aa-card p-8 bg-white flex flex-col justify-between">
            <div>
              <div className="text-base font-bold text-[#0f172a]">FREE</div>
              <p className="text-xs text-[#64748b] mt-1">Pour découvrir AlarmeAgenda sans contrainte.</p>
              
              <div className="my-6">
                <span className="text-3xl font-extrabold text-[#0f172a]">0 €</span>
                <span className="text-xs text-[#64748b] ml-1">/ mois</span>
              </div>

              <div className="space-y-3 text-xs text-[#475569]">
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Gestion illimitée des rendez-vous &amp; tâches</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Notifications de rappel classiques</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Synchronisation agenda multi-appareils</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>5 requêtes assistant IA par jour</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/register" className="w-full aa-btn-secondary block text-center py-2.5">
                Commencer gratuitement
              </Link>
            </div>
          </div>

          {/* Plan PRO */}
          <div className="aa-card p-8 bg-white border-blue-400 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Recommandé
            </div>

            <div>
              <div className="text-base font-bold text-blue-700">PRO</div>
              <p className="text-xs text-[#64748b] mt-1">Pour les utilisateurs qui veulent une expérience complète.</p>
              
              <div className="my-6">
                <span className="text-3xl font-extrabold text-[#0f172a]">9,90 €</span>
                <span className="text-xs text-[#64748b] ml-1">/ mois</span>
              </div>

              <div className="space-y-3 text-xs text-[#475569]">
                <div className="flex items-center gap-2.5 font-semibold text-[#0f172a]">
                  <Check size={15} className="text-blue-600 shrink-0" />
                  <span>Tout ce qui est inclus dans FREE</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-blue-600 shrink-0" />
                  <span>Rappels vocaux parlés en direct</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-blue-600 shrink-0" />
                  <span>Assistant IA sans limitation d&apos;usage</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-blue-600 shrink-0" />
                  <span>Anticipation automatique des temps de trajet</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={15} className="text-blue-600 shrink-0" />
                  <span>Briefing audio matinal automatique</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/register?plan=pro" className="w-full aa-btn-primary block text-center py-2.5">
                Passer à PRO
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
