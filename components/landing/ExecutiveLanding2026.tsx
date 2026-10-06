"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  Calendar,
  Bell,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Zap,
} from "lucide-react";
import { playAlertChime } from "@/lib/voice";
import "./executive2026.css";

export default function ExecutiveLanding2026() {
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
      const text =
        "Bonjour Salem. C'est votre copilote vocal Alamajonda. Votre réunion de négociation est programmée à 14 heures 30 avec votre client. Vos documents et votre itinéraire sont prêts.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="el-page">
      {/* Halo d'ambiance supérieur (Linear / Raycast style) */}
      <div className="el-ambient-glow" aria-hidden="true" />

      {/* =========================================================================
          1. NAVBAR ÉLÉGANTE & MINIMALISTE
         ========================================================================= */}
      <header className="el-navbar">
        <div className="el-navbar-container">
          <Link href="/" className="el-brand" aria-label="Accueil Alamajonda">
            <div className="el-brand-logo">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                priority
                sizes="32px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <span>
              Alama<span>jonda</span>
            </span>
          </Link>

          <nav className="el-nav-links" aria-label="Navigation">
            <Link href="#copilote" className="el-nav-link">
              Copilote Vocal
            </Link>
            <Link href="#agenda" className="el-nav-link">
              Agenda & Canevas
            </Link>
            <Link href="#fonctionnement" className="el-nav-link">
              Fonctionnement
            </Link>
            <Link href="#temoignages" className="el-nav-link">
              Témoignages
            </Link>
          </nav>

          <div className="el-nav-actions">
            <Link href="/login" className="el-btn-ghost">
              Connexion
            </Link>
            <Link href="/dashboard" className="el-btn-primary">
              <span>Accéder au Cockpit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION — AUTORITÉ ABSOLUE & PROPOSITION DE VALEUR CHOC
         ========================================================================= */}
      <section className="el-hero">
        <div className="el-badge">
          <span className="el-badge-dot" />
          <span>Copilote Vocal Autonome • Moteur d&apos;Agenda 2026</span>
        </div>

        <h1 className="el-title">
          Votre agenda ne vous attend plus. <br />
          <span className="el-title-gradient">Il prend les devants par la voix.</span>
        </h1>

        <p className="el-subtitle">
          Le premier assistant d&apos;agenda autonome qui vous appelle au moment opportun, synchronise vos priorités d&apos;un mot et libère votre esprit de la charge mentale.
        </p>

        <div className="el-hero-actions">
          <Link href="/dashboard" className="el-btn-lg-primary">
            <span>Démarrer l&apos;expérience</span>
            <ArrowRight size={18} />
          </Link>

          <button
            type="button"
            onClick={handlePlayVoice}
            className={`el-btn-lg-voice ${isPlayingVoice ? "is-active" : ""}`}
            title="Tester la synthèse vocale en direct"
          >
            {isPlayingVoice ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isPlayingVoice ? "Arrêter la voix" : "Écouter l'annonce vocale en direct"}</span>
          </button>
        </div>

        {/* =========================================================================
            3. PRODUCT STAGE — MOCKUP INTERACTIF HAUTE-FIDÉLITÉ DU COCKPIT
           ========================================================================= */}
        <div className="el-product-stage" id="copilote">
          <div className="el-product-window">
            {/* Barre de titre fenêtre type macOS / Raycast */}
            <div className="el-window-header">
              <div className="el-window-dots">
                <div className="el-window-dot" />
                <div className="el-window-dot" />
                <div className="el-window-dot" />
              </div>
              <div className="el-window-title">
                <Sparkles size={13} className="text-cyan-400" />
                <span>Alamajonda Executive Cockpit — Aperçu en Temps Réel</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Synchronisé</span>
              </div>
            </div>

            {/* Corps de la fenêtre (Timeline + Carte interactive) */}
            <div className="el-window-body">
              {/* Carte gauche : Copilote & Prochaine alerte vocale */}
              <div className="el-mockup-panel">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <Mic size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Copilote Vocal Direct</div>
                      <div className="text-[10px] text-slate-400">Écoute active & auto-envoi</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                    Actif
                  </span>
                </div>

                {/* Bulle d'anticipation */}
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#0e172e] to-[#080d1a] border border-white/[0.08] text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                    <CheckCircle2 size={14} />
                    <span>Créneau verrouillé à la voix</span>
                  </div>
                  <div className="text-sm font-bold text-white mb-0.5">
                    Négociation Partenaires
                  </div>
                  <div className="text-xs text-slate-400">
                    Aujourd&apos;hui de 14:30 à 15:30 • Bureau Principal
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                    <span>Alerte vocale : -15 min</span>
                    <span className="text-cyan-400 font-medium">Appel proactif</span>
                  </div>
                </div>

                {/* Orbe centrale de commande vocale miniature */}
                <div className="pt-2 flex flex-col items-center justify-center text-center">
                  <div
                    onClick={handlePlayVoice}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00d2ff] via-[#38bdf8] to-[#0d55e0] flex items-center justify-center text-white cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:scale-105 transition-transform"
                    title="Cliquer pour écouter l'assistant vocal"
                  >
                    <Mic size={22} />
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-2">
                    {isPlayingVoice ? "L'IA vous briefe oralement…" : "Cliquez sur l'orbe pour tester la voix"}
                  </div>
                </div>
              </div>

              {/* Vue Timeline droite : Représentation pure du temps (Amie / Linear style) */}
              <div className="el-mockup-timeline text-left">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={13} className="text-blue-400" />
                    <span>Planning de la Journée</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Mardi 6 Octobre 2026</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="font-mono text-xs text-slate-400 w-12">09:00</span>
                    <div className="w-1.5 h-7 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-white">Briefing Matinal & Revue Stratégie</div>
                      <div className="text-[10px] text-slate-400">Synthèse vocale automatique de 30 secondes</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="font-mono text-xs text-slate-400 w-12">11:30</span>
                    <div className="w-1.5 h-7 rounded-full bg-emerald-500" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-white">Revue de Projet Technique</div>
                      <div className="text-[10px] text-slate-400">Équipe Architecture & Sécurité</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0d55e0]/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(13,85,224,0.3)]">
                    <span className="font-mono text-xs text-cyan-300 font-bold w-12">14:30</span>
                    <div className="w-1.5 h-7 rounded-full bg-cyan-400" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>Présentation Client & Démonstration Live</span>
                        <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono">En cours</span>
                      </div>
                      <div className="text-[10px] text-cyan-200">Alarme vocale confirmée et synchronisée</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="font-mono text-xs text-slate-400 w-12">17:00</span>
                    <div className="w-1.5 h-7 rounded-full bg-slate-600" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-white">Clôture des Tâches & Bilan</div>
                      <div className="text-[10px] text-slate-400">Planification des priorités du lendemain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BENTO GRID — 4 PILIERS DE VALEUR (ZÉRO PRICING, ZÉRO ABONNEMENT)
         ========================================================================= */}
      <section className="el-bento-section" id="agenda">
        <div className="el-section-head">
          <span className="el-section-tag">Sous le capot</span>
          <h2 className="el-section-title">
            Conçu pour ceux dont chaque minute compte
          </h2>
          <p className="el-section-desc">
            Une interface épurée, une réactivité chirurgicale et une intelligence vocale qui agit sans friction.
          </p>
        </div>

        <div className="el-bento-grid">
          {/* Pilier 1 */}
          <div className="el-bento-card">
            <div className="el-card-icon">
              <Mic size={22} />
            </div>
            <h3 className="el-card-title">Copilote Vocal Délié & Auto-Envoi</h3>
            <p className="el-card-text">
              Dictez vos créneaux, réunions et rappels naturellement. Notre détection de silence intelligente enregistre votre instruction dès que vous vous arrêtez de parler, sans avoir à cliquer 10 fois pour valider.
            </p>
          </div>

          {/* Pilier 2 */}
          <div className="el-bento-card">
            <div className="el-card-icon">
              <Bell size={22} />
            </div>
            <h3 className="el-card-title">Alarmes Proactives & Anticipation Vocale</h3>
            <p className="el-card-text">
              Fini les notifications silencieuses que l&apos;on oublie dans sa poche. Alamajonda fait retentir une sonnerie claire et énonce à voix haute l&apos;intitulé de votre rendez-vous pour vous garantir une ponctualité sans faille.
            </p>
          </div>

          {/* Pilier 3 */}
          <div className="el-bento-card" id="fonctionnement">
            <div className="el-card-icon">
              <Calendar size={22} />
            </div>
            <h3 className="el-card-title">Canevas Continu & Time-Blocking</h3>
            <p className="el-card-text">
              Une visualisation par blocs temporels de 08:00 à 20:00 pensée pour la concentration. Vos rendez-vous, tâches urgentes et disponibilités s&apos;alignent sur une surface continue et fluide.
            </p>
          </div>

          {/* Pilier 4 */}
          <div className="el-bento-card">
            <div className="el-card-icon">
              <Zap size={22} />
            </div>
            <h3 className="el-card-title">Briefing Audio Exécutif Matinal</h3>
            <p className="el-card-text">
              D&apos;un seul clic au réveil, écoutez la synthèse audio de votre journée. L&apos;IA parcourt vos priorités et vous présente le déroulement exact de vos heures à venir pendant que vous prenez votre café.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TÉMOIGNAGES & RETOURS D'EXPÉRIENCE
         ========================================================================= */}
      <section className="el-trust-section" id="temoignages">
        <div className="el-section-head">
          <span className="el-section-tag">Retours d&apos;expérience</span>
          <h2 className="el-section-title">Adopté par les dirigeants exigeants</h2>
        </div>

        <div className="el-quote-grid">
          <div className="el-quote-card">
            <p className="el-quote-text">
              « Entre mes audiences et mes rendez-vous clients, les alertes vocales d&apos;Alamajonda ont totalement éliminé le stress des départs de dernière minute. »
            </p>
            <div className="el-quote-author">
              <div className="el-author-avatar">AL</div>
              <div className="el-author-info">
                <h4>Alexandre Lefèvre</h4>
                <p>Avocat d&apos;Affaires, Paris</p>
              </div>
            </div>
          </div>

          <div className="el-quote-card">
            <p className="el-quote-text">
              « La dictée vocale sans validation inutile me permet de bloquer mes créneaux en conduisant entre deux réunions de chantier. C&apos;est bluffant d&apos;efficacité. »
            </p>
            <div className="el-quote-author">
              <div className="el-author-avatar">MB</div>
              <div className="el-author-info">
                <h4>Marc Benhamou</h4>
                <p>Directeur Général Immobilier</p>
              </div>
            </div>
          </div>

          <div className="el-quote-card">
            <p className="el-quote-text">
              « Le design est calme, reposant et d&apos;une précision chirurgicale. On sent immédiatement que ce n&apos;est pas un simple calendrier classique, mais un véritable cockpit. »
            </p>
            <div className="el-quote-author">
              <div className="el-author-avatar">SR</div>
              <div className="el-author-info">
                <h4>Sophie Raynaud</h4>
                <p>Fondatrice & CEO SaaS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BANDEAU DE CONVERSION FINAL ÉPURÉ
         ========================================================================= */}
      <section className="el-cta-final">
        <h2 className="el-cta-title">Reprenez le contrôle de votre temps</h2>
        <p className="el-cta-desc">
          Entrez dans le cockpit et confiez l&apos;anticipation de vos journées à une intelligence vocale dédiée.
        </p>
        <Link href="/dashboard" className="el-btn-lg-primary">
          <span>Ouvrir mon Cockpit Alamajonda</span>
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* =========================================================================
          7. FOOTER MINIMALISTE
         ========================================================================= */}
      <footer className="el-footer">
        <div className="el-footer-content">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Moteur d&apos;agenda opérationnel • Chiffrement de bout en bout</span>
          </div>
          <div>© {new Date().getFullYear()} Alamajonda. Tous droits réservés.</div>
        </div>
      </footer>
    </div>
  );
}
