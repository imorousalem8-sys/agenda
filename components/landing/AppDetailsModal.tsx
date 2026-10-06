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
  Pause,
  Volume2,
  Smartphone,
  TrendingUp,
  Cpu,
  Layers,
  Check,
} from "lucide-react";

interface AppDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDetailsModal({ isOpen, onClose }: AppDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "demo">("overview");
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        setIsPlayingDemo(false);
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingDemo(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, onClose]);

  const handlePlayDemoVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingDemo) {
        window.speechSynthesis.cancel();
        setIsPlayingDemo(false);
        return;
      }
      window.speechSynthesis.cancel();
      setIsPlayingDemo(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant personnel Alamajonda. Vous avez un rendez-vous important prévu à 14 heures 30 avec votre client à l'atelier. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
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
      {/* Backdrop sombre avec flou immersif */}
      <div
        onClick={() => {
          if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }
          setIsPlayingDemo(false);
          onClose();
        }}
        className="fixed inset-0 bg-[#02050f]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Container Modale Cyber Luxury Haute Définition */}
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#081226] via-[#050b1a] to-[#02050e] border border-cyan-500/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.15)] z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Ligne Lumineuse Supérieure */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500" />

        {/* 1. Header de la Modale */}
        <div className="relative px-6 sm:px-8 pt-6 pb-4 border-b border-cyan-500/15 flex items-center justify-between bg-[#040817]/70 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/35 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  ALAMAJONDA IA
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-medium">
                  GUIDE &amp; FONCTIONNEMENT
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                À quoi consiste l&apos;application ?
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
              }
              setIsPlayingDemo(false);
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/60 hover:border-cyan-400/50"
            title="Fermer la fenêtre"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2. Navigation par Onglets Segmentés (Design Cyber Glass) */}
        <div className="px-6 sm:px-8 py-3.5 border-b border-cyan-500/10 bg-[#060c20]/50 flex items-center gap-2.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
            }`}
          >
            <Zap size={14} className={activeTab === "overview" ? "text-cyan-400" : ""} />
            <span>1. Le Concept &amp; Vision</span>
          </button>
          
          <button
            onClick={() => setActiveTab("benefits")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "benefits"
                ? "bg-gradient-to-r from-indigo-500/25 to-purple-500/25 text-indigo-300 border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
            }`}
          >
            <CheckCircle2 size={14} className={activeTab === "benefits" ? "text-indigo-400" : ""} />
            <span>2. Vos Gains au Quotidien</span>
          </button>

          <button
            onClick={() => setActiveTab("demo")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "demo"
                ? "bg-gradient-to-r from-emerald-500/25 to-teal-500/25 text-emerald-300 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
            }`}
          >
            <Volume2 size={14} className={activeTab === "demo" ? "text-emerald-400" : ""} />
            <span>3. Démonstration Vocale</span>
          </button>
        </div>

        {/* 3. Corps du Contenu avec Défilement Doux */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 leading-relaxed font-sans">
          
          {/* =========================================================
              ONGLET 1 : LE CONCEPT & ARCHITECTURE
             ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Carte Principale de Synthèse */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1836]/80 to-[#070e22]/90 border border-cyan-500/20 shadow-lg">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  <h3 className="text-base font-bold text-white">
                    Un Agenda Intelligent Piloté par l&apos;Intelligence Artificielle
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-cyan-300 font-semibold">Alamajonda</span> est votre assistant exécutif personnel conçu pour orchestrer vos journées sans charge mentale. 
                  Fini la saisie laborieuse formulaire par formulaire : vous pouvez <strong className="text-white font-semibold">parler ou écrire en langage 100% naturel</strong>. L&apos;IA comprend vos intentions en temps réel, extrait les dates, heures, urgences et personnes associées.
                </p>
              </div>

              {/* Grille des 3 Piliers Technologiques */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Pilier 1 */}
                <div className="p-4 rounded-2xl bg-[#09142e]/60 border border-cyan-500/18 hover:border-cyan-400/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      <Mic size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">Capture Vocale IA</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dictez simplement : l&apos;IA structure vos rendez-vous, tâches et rappels en 1 seconde.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
                    <Check size={12} />
                    <span>Zéro friction</span>
                  </div>
                </div>

                {/* Pilier 2 */}
                <div className="p-4 rounded-2xl bg-[#09142e]/60 border border-indigo-500/18 hover:border-indigo-400/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-3 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                      <PhoneCall size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">Appels Vocaux Réels</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      L&apos;IA peut vous appeler directement sur votre téléphone pour vous énoncer le rappel de vive voix.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-indigo-400 font-medium">
                    <Check size={12} />
                    <span>Impossible d&apos;oublier</span>
                  </div>
                </div>

                {/* Pilier 3 */}
                <div className="p-4 rounded-2xl bg-[#09142e]/60 border border-purple-500/18 hover:border-purple-400/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-3 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <MessageSquare size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">Alertes Multi-Canaux</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Notifications instantanées, alarmes sonores et synchronisation Google / Apple Calendar (.ics).
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-purple-400 font-medium">
                    <Check size={12} />
                    <span>100% synchronisé</span>
                  </div>
                </div>
              </div>

              {/* Barre de Métriques & Sérénité */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-indigo-950/30 to-purple-950/30 border border-cyan-500/20 flex items-center justify-around flex-wrap gap-3 text-center">
                <div>
                  <div className="text-base font-black text-cyan-300">+5.2h / sem.</div>
                  <div className="text-[11px] text-slate-400">Temps gagné</div>
                </div>
                <div className="w-[1px] h-8 bg-slate-800 hidden sm:block" />
                <div>
                  <div className="text-base font-black text-emerald-400">0 Oubli</div>
                  <div className="text-[11px] text-slate-400">Rappels proactifs</div>
                </div>
                <div className="w-[1px] h-8 bg-slate-800 hidden sm:block" />
                <div>
                  <div className="text-base font-black text-indigo-300">100% Sécurisé</div>
                  <div className="text-[11px] text-slate-400">Chiffrement RGPD</div>
                </div>
              </div>

            </div>
          )}

          {/* =========================================================
              ONGLET 2 : EN QUOI ÇA FACILITE LA VIE ?
             ========================================================= */}
          {activeTab === "benefits" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-slate-400">
                Découvrez concrètement comment Alamajonda élimine la charge mentale de votre planning :
              </p>

              {/* Avantage 1 */}
              <div className="p-4 rounded-2xl bg-[#0a1532]/70 border border-cyan-500/25 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm shrink-0 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">
                    Zéro effort de saisie : dictez et continuez votre journée
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dites simplement : <span className="italic text-cyan-200 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">« Rappelle-moi mon rendez-vous chez le dentiste demain à 14h30 et note d&apos;apporter le dossier »</span>. L&apos;IA configure l&apos;événement, règle l&apos;alarme et la priorité instantanément.
                  </p>
                </div>
              </div>

              {/* Avantage 2 */}
              <div className="p-4 rounded-2xl bg-[#0a1532]/70 border border-indigo-500/25 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-mono font-bold text-sm shrink-0 mt-0.5 shadow-[0_0_10px_rgba(99,102,241,0.25)]">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">
                    Annonce vocale et téléphone qui sonne : fini les alertes ignorées
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fini les notifications silencieuses noyées au fond de la poche. L&apos;IA vous appelle, vous dicte vos priorités et vous permet de reporter de 10 minutes en 1 clic si vous êtes occupé.
                  </p>
                </div>
              </div>

              {/* Avantage 3 */}
              <div className="p-4 rounded-2xl bg-[#0a1532]/70 border border-purple-500/25 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 font-mono font-bold text-sm shrink-0 mt-0.5 shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">
                    Cloisonnement Pro / Perso &amp; Clarté Mentale
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Catégorisation automatique de vos réunions, chantiers, devis et obligations personnelles. Votre esprit reste serein et vos objectifs avancent chaque jour sans stress.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              ONGLET 3 : DÉMONSTRATION VOCALE EN DIRECT
             ========================================================= */}
          {activeTab === "demo" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Box Lecteur Audio Cyber */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1836] via-[#09142d] to-[#040817] border border-cyan-500/35 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Volume2 size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Simulation d&apos;Appel Vocal IA</h4>
                      <p className="text-[11px] text-slate-400">Exemple de voix générée par Alamajonda</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 border border-cyan-500/35 px-2.5 py-1 rounded-full font-bold">
                    SYNTHÈSE HD
                  </span>
                </div>

                {/* Simulation de Transcription */}
                <div className="p-3.5 rounded-xl bg-[#040817]/80 border border-slate-800 text-xs text-slate-300 mb-4 leading-relaxed font-mono">
                  <span className="text-cyan-400 font-bold">IA: </span>
                  « Bonjour ! C&apos;est votre assistant personnel Alamajonda. Vous avez un rendez-vous important prévu à 14h30 avec votre client à l&apos;atelier. Souhaitez-vous le confirmer ou le reporter de dix minutes ? »
                </div>

                {/* Bouton de Déclenchement Audio */}
                <button
                  type="button"
                  onClick={handlePlayDemoVoice}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  {isPlayingDemo ? (
                    <>
                      <Pause size={16} className="text-white animate-pulse" />
                      <span>Arrêter la voix</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} className="text-white" />
                      <span>Écouter la démonstration vocale en direct</span>
                    </>
                  )}
                </button>
              </div>

              {/* Badge de Sécurité & Confidentialité */}
              <div className="p-4 rounded-xl bg-[#09142e]/60 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-3">
                <ShieldCheck className="text-emerald-400 shrink-0" size={20} />
                <span>
                  Vos données sont chiffrées de bout en bout. Respect absolu de la vie privée, aucune revente de données et conformité stricte aux standards RGPD.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* 4. Footer avec Boutons d'Action Clairs */}
        <div className="px-6 sm:px-8 py-4 border-t border-cyan-500/15 bg-[#030714] flex flex-col sm:flex-row items-center justify-between gap-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Déjà inscrit ?</span>
            <Link
              href="/login"
              onClick={onClose}
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors"
            >
              Se connecter à mon espace
            </Link>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                setIsPlayingDemo(false);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            >
              Fermer
            </button>
            <Link
              href="/register"
              onClick={onClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
            >
              <span>Créer mon compte gratuit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
