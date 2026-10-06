"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Bell,
  Volume2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Smartphone,
  ChevronRight,
  AlertCircle,
  Play,
  Sun,
  Shield,
  Laptop,
  Brain,
  Layers,
  MapPin,
  User,
  Search,
  X,
} from "lucide-react";
import "@/components/alarmeagenda-ref.css";

export default function AlarmeAgendaLanding() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060c18] text-white font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* =========================================================================
          VERSION MAÎTRESSE BUREAU / TABLETTE : REPRODUCTION IDENTIQUE 100%
         ========================================================================= */}
      <div className="relative w-full max-w-[1440px] mx-auto overflow-hidden">
        {/* Scène visuelle officielle complète */}
        <div className="relative w-full aspect-[1376/768] select-none">
          <Image
            src="/images/alarmeagenda-hero-midnight.jpg"
            alt="AlarmeAgenda — N'oubliez plus jamais ce qui compte"
            fill
            priority
            quality={100}
            className="object-contain object-top"
          />

          {/* =====================================================================
              ZONES INTERACTIVES CLIQUABLES SUR L'IMAGE EXACTE
             ===================================================================== */}
          {/* 1. Logo Haut Gauche -> / */}
          <Link
            href="/"
            title="AlarmeAgenda Accueil"
            className="absolute left-[4.5%] top-[2.2%] w-[13.5%] h-[6.5%] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Accueil AlarmeAgenda"
          />

          {/* 2. Menu Navigation : Accueil */}
          <Link
            href="/"
            title="Accueil"
            className="absolute left-[18.2%] top-[3%] w-[3.8%] h-[5%] rounded cursor-pointer hover:bg-white/[0.04] transition-colors"
            aria-label="Accueil"
          />

          {/* 3. Menu Navigation : Fonctionnalités */}
          <Link
            href="#fonctionnalites"
            title="Fonctionnalités"
            className="absolute left-[22.4%] top-[3%] w-[6.4%] h-[5%] rounded cursor-pointer hover:bg-white/[0.04] transition-colors"
            aria-label="Fonctionnalités"
          />

          {/* 4. Menu Navigation : Tarifs */}
          <Link
            href="/pricing"
            title="Tarifs"
            className="absolute left-[29.2%] top-[3%] w-[3.2%] h-[5%] rounded cursor-pointer hover:bg-white/[0.04] transition-colors"
            aria-label="Tarifs"
          />

          {/* 5. Menu Navigation : À propos */}
          <Link
            href="#a-propos"
            title="À propos"
            className="absolute left-[32.8%] top-[3%] w-[4.4%] h-[5%] rounded cursor-pointer hover:bg-white/[0.04] transition-colors"
            aria-label="À propos"
          />

          {/* 6. Bouton Se connecter (Haut Droite) */}
          <Link
            href="/login"
            title="Se connecter"
            className="absolute left-[52.2%] top-[2.6%] w-[6.2%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/[0.08] transition-all"
            aria-label="Se connecter"
          />

          {/* 7. Bouton Commencer gratuitement (Pilule bleue Haut Droite) */}
          <Link
            href="/register"
            title="Commencer gratuitement"
            className="absolute left-[58.8%] top-[2.6%] w-[9.2%] h-[5.8%] rounded-full cursor-pointer hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            aria-label="Commencer gratuitement"
          />

          {/* 8. Bouton Hero Blanc : Commencer gratuitement -> */}
          <Link
            href="/register"
            title="Commencer gratuitement"
            className="absolute left-[5.4%] top-[73.2%] w-[12.2%] h-[7.2%] rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_4px_25px_rgba(255,255,255,0.2)]"
            aria-label="Commencer gratuitement"
          />

          {/* 9. Bouton Hero Verre : Découvrir la démo */}
          <button
            type="button"
            onClick={() => setVideoModalOpen(true)}
            title="Découvrir la démo"
            className="absolute left-[18.2%] top-[73.2%] w-[8.6%] h-[7.2%] rounded-full cursor-pointer hover:bg-white/[0.1] hover:scale-[1.02] transition-all"
            aria-label="Découvrir la démo"
          />

          {/* 10. Bas 1 : Rappels intelligents -> /reminders */}
          <Link
            href="/reminders"
            title="Voir les rappels intelligents"
            className="absolute left-[5.2%] top-[86%] w-[11.2%] h-[9%] rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors"
            aria-label="Rappels intelligents"
          />

          {/* 11. Bas 2 : Assistant IA -> /assistant */}
          <Link
            href="/assistant"
            title="Voir l'assistant IA"
            className="absolute left-[19.2%] top-[86%] w-[9.6%] h-[9%] rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors"
            aria-label="Assistant IA"
          />

          {/* 12. Bas 3 : Synchro multi-appareils -> /today */}
          <Link
            href="/today"
            title="Voir la synchronisation"
            className="absolute left-[32%] top-[86%] w-[13.5%] h-[9%] rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors"
            aria-label="Synchro multi-appareils"
          />

          {/* 13. Bas 4 : Sécurisé -> /settings */}
          <Link
            href="/settings"
            title="Sécurité & Confidentialité"
            className="absolute left-[47.6%] top-[86%] w-[7.8%] h-[9%] rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors"
            aria-label="Sécurité"
          />

          {/* 14. Bas 5 : Tableau de bord -> /dashboard */}
          <Link
            href="/dashboard"
            title="Accéder au Tableau de bord"
            className="absolute left-[58.8%] top-[86%] w-[10.5%] h-[9%] rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors"
            aria-label="Tableau de bord"
          />
        </div>
      </div>

      {/* =========================================================================
          VERSION MOBILE / PETIT ÉCRAN (< 768px) POUR UN CONFORT TOTAL
         ========================================================================= */}
      <div className="md:hidden px-6 py-8 space-y-6 bg-[#060c18] border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-blue-500/30 flex items-center justify-center bg-[#07132e]">
              <Image
                src="/images/alarmagenda-logo.png"
                alt="Logo AlarmeAgenda"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-lg">AlarmeAgenda</span>
          </div>

          <Link
            href="/login"
            className="text-xs px-4 py-2 rounded-full border border-white/[0.1] text-slate-200"
          >
            Se connecter
          </Link>
        </div>

        <div className="space-y-4 pt-2">
          <h1 className="text-2xl font-black leading-tight">
            N&apos;OUBLIEZ PLUS JAMAIS <br />
            <span className="text-blue-500">CE QUI COMPTE</span>
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            L&apos;agenda intelligent et assistant proactif qui planifie vos journées, synchronise vos tâches et vous alerte au moment idéal avec rappels intelligents et vocaux.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/register"
              className="w-full text-center py-3 rounded-full bg-white text-black font-bold text-sm shadow-md"
            >
              Commencer gratuitement →
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-center py-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-sm font-semibold"
            >
              Accéder au Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODALE VIDÉO / DÉMO INTERACTIVE
         ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0e1628] rounded-2xl border border-white/[0.12] p-6 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-white mb-2">Découvrir AlarmeAgenda</h3>
            <p className="text-xs text-slate-300 mb-6">
              Votre assistant personnel intelligent qui organise votre agenda, vos tâches et vos rappels vocaux.
            </p>
            <div className="aspect-video rounded-xl bg-black/60 border border-white/[0.08] flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(37,99,235,0.6)]">
                <Play size={24} className="fill-white ml-1" />
              </div>
              <span className="text-xs text-slate-300 font-medium">Démonstration interactive en cours de préparation</span>
            </div>
            <div className="mt-6 flex justify-end">
              <Link
                href="/register"
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Commencer gratuitement →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FOOTER MINIMALISTE SOMBRE
         ========================================================================= */}
      <footer className="py-6 px-6 text-center text-[11px] text-slate-500 border-t border-white/[0.04]">
        © {new Date().getFullYear()} AlarmeAgenda. Tous droits réservés. Organise. Rappelle. Avance.
      </footer>
    </div>
  );
}
