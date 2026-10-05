"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Square,
  Volume2,
  PhoneCall,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
  BellRing,
} from "lucide-react";
import { playAlertChime } from "@/lib/voice";

export default function Hero() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoiceDemo = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
        return;
      }
      playAlertChime();
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant vocal Alamajonda. Votre rendez-vous stratégique est programmé aujourd'hui à 14 heures 30 avec la direction. Vos documents sont prêts."
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.02;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-[#f8faff]">
      {/* Halo d'ambiance bleuté doux et raffiné (sans néon agressif) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/60 via-blue-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. EN-TÊTE DU HERO : CENTRÉ, PUISSANT & ÉQUILIBRÉ
           ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          {/* Badge Haute Précision */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0d55e0] animate-pulse" />
            <span>L&apos;Assistant Vocal IA &amp; Agenda Exécutif</span>
          </div>

          {/* Titre Principal sans détour */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0b1736] tracking-tight leading-[1.12] mb-6">
            Ne manquez plus aucun <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0d55e0] via-[#0b47bf] to-[#1e40af] bg-clip-text text-transparent">
              rendez-vous important.
            </span>
          </h1>

          {/* Description claire et engageante */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal">
            Alamajonda synchronise votre emploi du temps et vous passe un véritable appel vocal à la seconde exacte. Fini les retards, les notifications ignorées et le stress des réunions.
          </p>

          {/* Boutons d'Action Centrés */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-8">
            <Link
              href="/register"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <span>Commencer Gratuitement</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={handlePlayVoiceDemo}
              type="button"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm font-bold border transition-all ${
                isPlayingVoice
                  ? "bg-blue-50 text-[#0d55e0] border-[#0d55e0] shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-700 hover:text-[#0d55e0] border-slate-200 hover:border-blue-300 shadow-xs"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#0d55e0] flex items-center justify-center">
                {isPlayingVoice ? (
                  <Square size={13} className="fill-[#0d55e0]" />
                ) : (
                  <Play size={13} className="fill-[#0d55e0] ml-0.5" />
                )}
              </div>
              <span>{isPlayingVoice ? "Arrêter la voix" : "Écouter l'Appel Vocal IA"}</span>
            </button>
          </div>

          {/* Points de Réassurance discrets */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#0d55e0]" /> Sans carte bancaire requise
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#0d55e0]" /> Synchronisation Google &amp; Outlook
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#0d55e0]" /> Conforme RGPD &amp; Données Chiffrées
            </span>
          </div>

        </div>

        {/* ========================================================
            2. SHOWCASE VISUEL GRAND FORMAT HAUT DE GAMME
           ======================================================== */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Cadre mockup d'application */}
          <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-[0_25px_70px_rgba(11,23,54,0.12)] overflow-hidden">
            
            {/* Barre de fenêtre supérieure façon OS moderne */}
            <div className="h-12 bg-slate-50/90 border-b border-slate-200/80 px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-semibold text-slate-500">
                  Alamajonda Executive Cockpit · En direct
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>IA Active &amp; Prête</span>
              </div>
            </div>

            {/* Corps du Mockup : Agencement Exécutif */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-b from-white to-[#fbfcfe]">
              
              {/* Colonne Gauche : Appel IA en direct (5 colonnes) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Carte Appel Téléphonique IA */}
                <div
                  onClick={handlePlayVoiceDemo}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#0b1736] to-[#0d55e0] text-white shadow-xl shadow-blue-900/20 border border-blue-400/30 cursor-pointer hover:scale-[1.02] transition-all group"
                  title="Cliquez pour écouter la simulation"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                      Appel Entrant IA
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      14:15:00
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 p-1 border border-white/20 shrink-0">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Alamajonda Copilot
                      </h4>
                      <p className="text-xs text-blue-100">
                        {isPlayingVoice ? "Audio en cours…" : "Prêt à sonner à 14h15"}
                      </p>
                    </div>
                  </div>

                  {/* Message retranscrit */}
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-blue-50 leading-relaxed mb-4">
                    &ldquo;Votre réunion de stratégie commence dans 15 minutes en salle du Conseil. Dossier financier synchronisé.&rdquo;
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-white/15">
                    <span className="text-blue-100 flex items-center gap-1.5">
                      <PhoneCall size={14} className="text-emerald-400 animate-bounce" />
                      Sonnerie réelle GSM / Push
                    </span>
                    <span className="text-white underline underline-offset-4 group-hover:text-blue-200">
                      {isPlayingVoice ? "Couper" : "Tester le son"}
                    </span>
                  </div>
                </div>

                {/* Statut & Indicateur de Ponctualité */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0d55e0] flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Taux de Ponctualité</div>
                      <div className="text-lg font-black text-[#0b1736]">100% à l&apos;heure</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60">
                    +0 retard ce mois
                  </span>
                </div>

              </div>

              {/* Colonne Droite : Vue Agenda & Événements (7 colonnes) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                
                {/* En-tête de la journée */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <CalendarIcon size={18} className="text-[#0d55e0]" />
                    <span className="text-sm font-bold text-[#0b1736]">
                      Agenda d&apos;aujourd&apos;hui · Synchronisé
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    3 rendez-vous programmés
                  </span>
                </div>

                {/* Liste d'événements ordonnée */}
                <div className="space-y-3">
                  {/* Événement 1 */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-10 rounded-full bg-[#0d55e0]" />
                      <div>
                        <div className="text-sm font-bold text-[#0b1736]">
                          Comité de Direction &amp; Synthèse Mensuelle
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>14h30 - 15h30</span>
                          <span>•</span>
                          <span>Salle Prestige</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0d55e0] bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-xs">
                      Appel IA à 14h15
                    </span>
                  </div>

                  {/* Événement 2 */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-10 rounded-full bg-slate-300" />
                      <div>
                        <div className="text-sm font-semibold text-[#0b1736]">
                          Point Stratégie Investisseurs avec Me Laurent
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>16h00 - 17h00</span>
                          <span>•</span>
                          <span>Visioconférence sécurisée</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      Rappel SMS 15:45
                    </span>
                  </div>

                  {/* Événement 3 */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-10 rounded-full bg-slate-300" />
                      <div>
                        <div className="text-sm font-semibold text-[#0b1736]">
                          Dîner d&apos;Affaires &amp; Partenariat Clé
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>19h30</span>
                          <span>•</span>
                          <span>Hôtel Le Bristol</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      Appel IA à 18h45
                    </span>
                  </div>
                </div>

                {/* Barre basse : Détection proactive */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} className="text-[#0d55e0]" />
                    <span>L&apos;IA a vérifié le temps de trajet : aucun bouchon détecté sur votre trajet.</span>
                  </span>
                  <span className="font-bold text-[#0d55e0]">Optimisé</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
