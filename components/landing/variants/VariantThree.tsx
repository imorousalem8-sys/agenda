"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Square, PhoneCall, Calendar, Clock, Bell, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { playAlertChime } from "@/lib/voice";

export default function VariantThree() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("14:30");

  const handleTriggerCall = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }
      playAlertChime();
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(
        `Alerte AlarmAgenda : Votre rendez-vous de ${selectedSlot} est confirmé. Vos dossiers clients sont prêts sur votre espace.`
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre direct et épuré */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            <span>MODÈLE 3 · COCKPIT PANORAMIQUE PRO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#09132b] tracking-tight mb-3">
            Votre temps est précieux. <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              L&apos;IA veille sur vos heures.
            </span>
          </h1>
          <p className="text-base text-slate-500 max-w-md mx-auto">
            Sélectionnez votre créneau et testez l&apos;appel vocal instantané.
          </p>
        </div>

        {/* GRANDE VUE D'IMAGE PANORAMIQUE AVEC COCKPIT INTÉGRÉ */}
        <div className="relative w-full rounded-[36px] overflow-hidden p-3 bg-white/80 backdrop-blur-2xl border border-white/95 shadow-[0_25px_80px_rgba(37,99,235,0.18)]">
          <div className="relative w-full h-[420px] sm:h-[540px] rounded-[28px] overflow-hidden">
            <Image
              src="/images/hero-businesswoman.jpg"
              alt="Femme d'affaires en réunion"
              fill
              priority
              className="object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/30 to-transparent" />

            {/* Panneau de Contrôle Cockpit Translucide (À Gauche de l'Image) */}
            <div className="absolute top-6 left-6 bottom-6 w-full max-w-[340px] sm:max-w-[380px] bg-white/90 backdrop-blur-2xl rounded-[24px] p-6 shadow-2xl border border-white flex flex-col justify-between">
              
              <div>
                {/* Header du Cockpit avec le logo officiel */}
                <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm shrink-0 border border-blue-200">
                    <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#09132b]">Simulateur d&apos;Appel IA</h3>
                    <span className="text-[11px] text-blue-600 font-bold">Technologie AlarmAgenda</span>
                  </div>
                </div>

                {/* Choix d'un horaire */}
                <div className="mt-5 space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Choisir l&apos;heure du rappel :
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["09:00", "14:30", "17:15"].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedSlot === slot
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Écran d'onde vocale */}
                <div className="mt-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700 mb-2">
                    <PhoneCall size={14} className={isPlaying ? "animate-bounce" : ""} />
                    <span>Rappel programmé à {selectedSlot}</span>
                  </div>

                  {/* Ondes sonores */}
                  <div className="flex items-center justify-center gap-1 h-6">
                    {[30, 80, 50, 100, 70, 90, 40, 85, 60].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full bg-blue-600 transition-all ${
                          isPlaying ? "animate-pulse" : "opacity-40"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bouton de déclenchement */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={handleTriggerCall}
                  type="button"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  {isPlaying ? <Square size={13} className="fill-white" /> : <Play size={13} className="fill-white" />}
                  <span>{isPlaying ? "Couper l'appel" : "Déclencher l'appel vocal test"}</span>
                </button>

                <Link
                  href="/register"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center gap-1.5 transition-all text-center block"
                >
                  <span>Créer mon compte (Gratuit)</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Cartouches d'efficacité en bas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#09132b]">Sonnerie Prioritaire</h4>
              <p className="text-xs text-slate-500">Passe même à travers le mode silencieux.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#09132b]">Zéro Conflit de Date</h4>
              <p className="text-xs text-slate-500">Google Calendar &amp; Outlook connectés.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#09132b]">Ponctualité 100%</h4>
              <p className="text-xs text-slate-500">Pour particuliers et professionnels.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
