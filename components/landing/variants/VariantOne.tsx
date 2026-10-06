"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Square, CheckCircle2, ShieldCheck, Mic, Calendar, Zap, Check } from "lucide-react";
import { playAlertChime } from "@/lib/voice";

export default function VariantOne() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
        return;
      }
      playAlertChime();
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant AlarmAgenda. Votre rendez-vous professionnel démarre à 14 heures 30. Tout est en ordre."
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Grand Format Panoramique */}
      <section className="pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Titre et accroche au-dessus de l'image */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-blue-200/70 shadow-sm text-blue-700 text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>MODÈLE 1 · IMMERSIF GRAND FORMAT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#09132b] tracking-tight leading-[1.08] mb-5">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                rendez-vous important.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              AlarmAgenda vous appelle au bon moment et veille sur chaque échéance de votre journée.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 transition-all"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight size={17} />
              </Link>
              <button
                onClick={handlePlayVoice}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white/90 backdrop-blur-xl border border-blue-100 hover:border-blue-300 shadow-sm transition-all"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {isPlayingVoice ? <Square size={12} className="fill-blue-600" /> : <Play size={12} className="fill-blue-600 ml-0.5" />}
                </div>
                <span>{isPlayingVoice ? "Arrêter" : "Écouter l'assistant"}</span>
              </button>
            </div>
          </div>

          {/* Image Large Royale */}
          <div className="relative w-full rounded-[36px] overflow-hidden p-2 sm:p-3 bg-white/80 backdrop-blur-2xl border border-white/95 shadow-[0_30px_90px_-20px_rgba(37,99,235,0.20)]">
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-[28px] overflow-hidden bg-slate-100">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme d'affaires souriante"
                fill
                priority
                className="object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

              {/* Capsule gauche */}
              <div
                onClick={handlePlayVoice}
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white flex items-center gap-3.5 z-20 max-w-[280px] cursor-pointer hover:scale-105 transition-all"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md shrink-0 border border-blue-200">
                  <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-[#09132b]">Appel Vocal IA</div>
                  <div className="text-[11px] text-blue-600 font-bold truncate mt-0.5">
                    {isPlayingVoice ? "Onde en cours..." : "Programmé à 14h30"}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 h-2.5">
                    {[40, 80, 50, 100, 70, 90, 40].map((h, i) => (
                      <span key={i} className={`w-0.5 rounded-full bg-blue-600 ${isPlayingVoice ? 'animate-pulse' : 'opacity-50'}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Capsule droite */}
              <div className="hidden sm:flex absolute bottom-8 right-8 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white items-center gap-3 z-20 max-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-[#09132b]">Rendez-vous prêt</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Ponctualité garantie</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 piliers épurés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-7 rounded-[26px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Mic size={20} />
              </div>
              <h3 className="text-lg font-black text-[#09132b] mb-2">Appels Vocaux IA</h3>
              <p className="text-sm text-slate-600">Votre téléphone sonne réellement et l&apos;assistant vous énonce vos rendez-vous.</p>
            </div>
            <div className="p-7 rounded-[26px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Calendar size={20} />
              </div>
              <h3 className="text-lg font-black text-[#09132b] mb-2">Agenda Intelligent</h3>
              <p className="text-sm text-slate-600">Synchronisé automatiquement avec Google Calendar et Outlook en continu.</p>
            </div>
            <div className="p-7 rounded-[26px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-black text-[#09132b] mb-2">Rappels Multi-Canaux</h3>
              <p className="text-sm text-slate-600">Alertes par SMS et notifications push pour vous et vos contacts avant chaque RDV.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
