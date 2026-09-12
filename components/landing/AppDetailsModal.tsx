"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Mic,
  PhoneCall,
  MessageSquare,
  Sparkles,
  CalendarCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  Volume2,
  Smartphone,
} from "lucide-react";

interface AppDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDetailsModal({ isOpen, onClose }: AppDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "how-it-works">("overview");
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePlayDemoVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingDemo(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant Alamajonda. Vous avez votre rendez-vous client important prévu à 14 heures 30. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingDemo(false);
      utterance.onerror = () => setIsPlayingDemo(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop sombre flouté */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Container Modale HUD Luxe */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-black border-2 border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.35)] z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header de la Modale */}
        <div className="relative px-5 sm:px-7 pt-6 pb-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ALAMAJONDA IA
                </span>
                <span className="text-[10px] font-mono text-slate-400">GUIDE OFFICIEL</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                À quoi consiste l&apos;application ?
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            title="Fermer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation par Onglets */}
        <div className="px-5 sm:px-7 pt-3 pb-1 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            }`}
          >
            <Zap size={13} />
            <span>1. Le Concept</span>
          </button>
          
          <button
            onClick={() => setActiveTab("benefits")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "benefits"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            }`}
          >
            <CheckCircle2 size={13} />
            <span>2. En quoi ça vous facilite la vie ?</span>
          </button>

          <button
            onClick={() => setActiveTab("how-it-works")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "how-it-works"
                ? "bg-purple-500/20 text-purple-300 border border-purple-400/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            }`}
          >
            <Clock size={13} />
            <span>3. Démonstration</span>
          </button>
        </div>

        {/* Corps de la Présentation avec Scroll */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1 : LE CONCEPT */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Une gestion d&apos;agenda nouvelle génération par l&apos;Intelligence Artificielle
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-emerald-400 font-semibold">Alamajonda</strong> est un assistant personnel intelligent conçu pour orchestrer votre temps avec une précision chirurgicale. Contrairement aux agendas classiques où vous devez taper laborieusement chaque champ, Alamajonda vous permet de **parler ou d&apos;écrire naturellement** : l&apos;IA comprend immédiatement vos intentions, extrait les dates, heures, urgences et personnes concernées.
                </p>
              </div>

              {/* 3 Piliers Majeurs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                    <Mic size={14} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">Capture Vocale IA</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Parlez librement, l&apos;IA structure vos rendez-vous et vos tâches en 1 seconde.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                    <PhoneCall size={14} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">Appels Vocaux Réels</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    L&apos;IA vous appelle directement sur votre téléphone pour vous énoncer le rappel.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-teal-500/20">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 mb-2">
                    <MessageSquare size={14} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">Alertes Multi-Canaux</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Notifications SMS, alertes sonores et synchronisation 24h/24 sans aucun retard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 : EN QUOI ÇA VOUS FACILITE LA VIE ? */}
          {activeTab === "benefits" && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="text-xs text-slate-400 mb-2">
                Voici concrètement comment Alamajonda transforme votre quotidien et élimine la charge mentale :
              </div>

              {/* Avantage 1 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-emerald-500/30 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                    Zéro effort de saisie : vous dictez, l&apos;IA s&apos;occupe du reste
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dites simplement : <em>« Rappelle-moi mon rendez-vous chez le dentiste demain à 14h30 et ajoute une note urgente pour le dossier »</em>. L&apos;IA crée le rendez-vous, paramètre l&apos;alarme et la priorité en temps réel.
                  </p>
                </div>
              </div>

              {/* Avantage 2 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-cyan-500/30 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                    Impossible d&apos;oublier : votre téléphone sonne à l&apos;heure exacte
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fini les simples notifications silencieuses que l&apos;on ignore dans la poche. L&apos;IA vous appelle et vous dicte clairement vos tâches, avec la possibilité de reporter de 10 minutes en 1 clic.
                  </p>
                </div>
              </div>

              {/* Avantage 3 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-teal-500/30 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                    Séparation Pro & Perso & Gestion Anti-Stress
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Classement automatique de vos chantiers, devis, rendez-vous médicaux et obligations familiales. Vous gardez l&apos;esprit serein et gagnez jusqu&apos;à 5 heures par semaine.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 : DÉMONSTRATION VOCALE */}
          {activeTab === "how-it-works" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 border border-emerald-500/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="text-emerald-400" size={18} />
                    <span className="text-xs font-bold text-white">Écouter la Voix de l&apos;IA en Direct</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    SYNTHÈSE VOCALE HD
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Cliquez sur le bouton ci-dessous pour tester un exemple d&apos;appel vocal généré par votre assistant IA :
                </p>

                <button
                  type="button"
                  onClick={handlePlayDemoVoice}
                  disabled={isPlayingDemo}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <Play size={14} className={isPlayingDemo ? "animate-spin" : ""} />
                  <span>{isPlayingDemo ? "Lecture de la voix en cours..." : "Lancer la démonstration vocale"}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="text-emerald-400 shrink-0" size={18} />
                <span>Données chiffrées de bout en bout, respect absolu de la vie privée et conformité RGPD.</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer avec Boutons d'Action */}
        <div className="px-5 sm:px-7 py-4 border-t border-slate-800/80 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Déjà inscrit ?</span>
            <Link href="/login" className="text-cyan-400 hover:underline font-semibold">
              Se connecter
            </Link>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Fermer
            </button>
            <Link
              href="/register"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
            >
              <span>Créer mon compte gratuit</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
