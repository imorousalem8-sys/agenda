"use client";

import React from "react";

export default function BMXRiderAnimation() {
  return (
    <div className="relative w-full h-32 overflow-visible pointer-events-none select-none my-2">
      
      {/* ========================================================= */}
      {/* 🛣️ PISTE DE GOUDRON STREET & TREMPLINS ("Petits trucs qui sautent") */}
      {/* ========================================================= */}
      <div className="absolute bottom-1 left-0 right-0 h-10 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y-2 border-emerald-500/40 shadow-inner shadow-black flex items-center justify-between px-4 overflow-hidden">
        
        {/* Texture Asphalte & Grain Goudron */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />
        
        {/* Ligne Blanche & Jaune discontinue de la Route (Marquage au sol) */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-around z-0">
          <span className="w-12 h-[3px] bg-amber-400/80 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <span className="w-12 h-[3px] bg-white/70 rounded-full" />
          <span className="w-12 h-[3px] bg-amber-400/80 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <span className="w-12 h-[3px] bg-white/70 rounded-full" />
          <span className="w-12 h-[3px] bg-amber-400/80 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <span className="w-12 h-[3px] bg-white/70 rounded-full" />
        </div>

        {/* 🛹 Tremplin / Kicker 1 (Ramp Jump gauche) */}
        <div className="absolute bottom-0 left-[26%] w-10 h-5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 rounded-tr-lg border-r-2 border-t-2 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)] flex items-center justify-center transform -skew-x-12">
          <span className="text-[7px] font-mono font-black text-black tracking-tighter">▲ JUMP</span>
        </div>

        {/* 🛹 Tremplin / Kicker 2 (Ramp Jump droite) */}
        <div className="absolute bottom-0 left-[68%] w-10 h-5 bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 rounded-tr-lg border-r-2 border-t-2 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)] flex items-center justify-center transform -skew-x-12">
          <span className="text-[7px] font-mono font-black text-black tracking-tighter">▲ JUMP</span>
        </div>

        {/* Étincelles & Particules de saut sur les tremplins */}
        <div className="absolute bottom-4 left-[28%] w-2 h-2 rounded-full bg-emerald-300 blur-[1px] animate-ping" />
        <div className="absolute bottom-4 left-[70%] w-2 h-2 rounded-full bg-cyan-300 blur-[1px] animate-ping" />
      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 1 : "DOM" (Longs Wheelings du Bonheur & Sauts Tremplins) */}
      {/* ========================================================= */}
      <div className="absolute bottom-4 animate-dom-street-course flex flex-col items-center z-20">
        
        {/* Nom au-dessus du personnage : DOM */}
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-slate-950/95 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] flex items-center gap-1 scale-90 -translate-y-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-emerald-300 uppercase font-mono">
            DOM
          </span>
          <span className="text-[8px] text-emerald-400 font-bold">⚡</span>
        </div>

        {/* Badges Dynamiques de Tricks (Wheelings & Sauts) */}
        <div className="absolute -top-6 animate-trick-dom-street px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 rounded text-[9px] font-mono font-extrabold text-emerald-300 opacity-0 whitespace-nowrap shadow-[0_0_8px_rgba(16,185,129,0.6)]">
          🔥 LONG WHEELING
        </div>

        {/* Aura lumineuse & trace d'étincelles */}
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-emerald-400/35 rounded-full blur-sm" />

        {/* SVG BMX DOM */}
        <svg
          viewBox="0 0 110 75"
          className="w-20 h-14 overflow-visible drop-shadow-[0_0_10px_rgba(16,185,129,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Neon Light Speed Trail */}
          <path
            d="M 2 54 Q 18 50 35 52"
            stroke="url(#trailDom)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
          />

          <defs>
            <linearGradient id="neonEmeraldDom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="trailDom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="skinDom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#a97142" />
            </linearGradient>
          </defs>

          {/* Roue Arrière (Spinning) */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="12" stroke="#06b6d4" strokeWidth="2.5" />
            <circle cx="25" cy="54" r="3" fill="#34d399" />
            <line x1="25" y1="42" x2="25" y2="66" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="13" y1="54" x2="37" y2="54" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="16" y1="45" x2="34" y2="63" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="16" y1="63" x2="34" y2="45" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
          </g>

          {/* Roue Avant (Spinning) */}
          <g className="animate-spin-wheel origin-[75px_54px]">
            <circle cx="75" cy="54" r="12" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="75" cy="54" r="3" fill="#06b6d4" />
            <line x1="75" y1="42" x2="75" y2="66" stroke="#10b981" strokeWidth="1" opacity="0.8" />
            <line x1="63" y1="54" x2="87" y2="54" stroke="#10b981" strokeWidth="1" opacity="0.8" />
            <line x1="66" y1="45" x2="84" y2="63" stroke="#10b981" strokeWidth="1" opacity="0.8" />
            <line x1="66" y1="63" x2="84" y2="45" stroke="#10b981" strokeWidth="1" opacity="0.8" />
          </g>

          {/* Cadre BMX */}
          <path
            d="M 25 54 L 44 52 L 68 36 L 46 36 L 25 54 Z"
            stroke="url(#neonEmeraldDom)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 44 52 L 68 36 L 75 54" stroke="url(#neonEmeraldDom)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 44 52 L 40 32" stroke="url(#neonEmeraldDom)" strokeWidth="3" />
          <path d="M 33 30 L 45 32" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 30 L 45 32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M 68 36 L 66 22" stroke="url(#neonEmeraldDom)" strokeWidth="3" />
          <path d="M 60 21 L 72 21" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />

          {/* Pédalier & Pédalage */}
          <circle cx="44" cy="52" r="3.5" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
          <line x1="44" y1="52" x2="49" y2="60" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="49" cy="60" r="2" fill="#34d399" />

          {/* Jambes & Baskets */}
          <path d="M 40 30 Q 42 44 49 58" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 47 58 L 54 60" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

          {/* Corps / Hoodie */}
          <path d="M 42 28 C 45 18 56 16 60 21 L 52 34 Z" fill="#090d16" stroke="#10b981" strokeWidth="1.5" />
          <path d="M 46 23 L 53 27" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

          {/* Bras & Mains */}
          <path d="M 52 21 L 66 23" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="66" cy="23" r="2.5" fill="url(#skinDom)" />

          {/* Tête */}
          <circle cx="56" cy="14" r="5.5" fill="url(#skinDom)" />

          {/* 🧢 Casquette tournée en arrière Bad Boy */}
          <path d="M 51 13 C 51 7 61 7 62 13 Z" fill="#10b981" stroke="#06b6d4" strokeWidth="1" />
          <path d="M 51 13 Q 41 14 40 11" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
          {/* Lunettes de soleil noires */}
          <path d="M 56 14 L 61 14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 2 : "SALEM" (Wheelings en Poursuite & Backflip Kicker) */}
      {/* ========================================================= */}
      <div className="absolute bottom-4 animate-salem-street-course flex flex-col items-center z-10">
        
        {/* Nom au-dessus du personnage : SALEM */}
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-slate-950/95 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] flex items-center gap-1 scale-90 -translate-y-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-cyan-300 uppercase font-mono">
            SALEM
          </span>
          <span className="text-[8px] text-cyan-400 font-bold">🚀</span>
        </div>

        {/* Badges Dynamiques de Tricks */}
        <div className="absolute -top-6 animate-trick-salem-street px-2 py-0.5 bg-cyan-500/30 border border-cyan-400 rounded text-[9px] font-mono font-extrabold text-cyan-300 opacity-0 whitespace-nowrap shadow-[0_0_8px_rgba(6,182,212,0.6)]">
          ⚡ 360 KICKER AIR
        </div>

        {/* Aura lumineuse */}
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-cyan-400/35 rounded-full blur-sm" />

        {/* SVG BMX SALEM */}
        <svg
          viewBox="0 0 110 75"
          className="w-20 h-14 overflow-visible drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Neon Light Speed Trail */}
          <path
            d="M 2 54 Q 18 50 35 52"
            stroke="url(#trailSalem)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
          />

          <defs>
            <linearGradient id="neonCyanSalem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="trailSalem" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="skinSalem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0ac69" />
              <stop offset="100%" stopColor="#b07d4b" />
            </linearGradient>
          </defs>

          {/* Roue Arrière (Spinning) */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="12" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="25" cy="54" r="3" fill="#06b6d4" />
            <line x1="25" y1="42" x2="25" y2="66" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
            <line x1="13" y1="54" x2="37" y2="54" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
            <line x1="16" y1="45" x2="34" y2="63" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
            <line x1="16" y1="63" x2="34" y2="45" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
          </g>

          {/* Roue Avant (Spinning) */}
          <g className="animate-spin-wheel origin-[75px_54px]">
            <circle cx="75" cy="54" r="12" stroke="#06b6d4" strokeWidth="2.5" />
            <circle cx="75" cy="54" r="3" fill="#a855f7" />
            <line x1="75" y1="42" x2="75" y2="66" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="63" y1="54" x2="87" y2="54" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="66" y1="45" x2="84" y2="63" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="66" y1="63" x2="84" y2="45" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
          </g>

          {/* Cadre BMX */}
          <path
            d="M 25 54 L 44 52 L 68 36 L 46 36 L 25 54 Z"
            stroke="url(#neonCyanSalem)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 44 52 L 68 36 L 75 54" stroke="url(#neonCyanSalem)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 44 52 L 40 32" stroke="url(#neonCyanSalem)" strokeWidth="3" />
          <path d="M 33 30 L 45 32" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 30 L 45 32" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M 68 36 L 66 22" stroke="url(#neonCyanSalem)" strokeWidth="3" />
          <path d="M 60 21 L 72 21" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />

          {/* Pédalier */}
          <circle cx="44" cy="52" r="3.5" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <line x1="44" y1="52" x2="49" y2="60" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="49" cy="60" r="2" fill="#06b6d4" />

          {/* Jambes & Baskets */}
          <path d="M 40 30 Q 42 44 49 58" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 47 58 L 54 60" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />

          {/* Hoodie Body */}
          <path d="M 42 28 C 45 18 56 16 60 21 L 52 34 Z" fill="#090d16" stroke="#06b6d4" strokeWidth="1" />
          <path d="M 46 23 L 53 27" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />

          {/* Bras & Mains */}
          <path d="M 52 21 L 66 23" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="66" cy="23" r="2.5" fill="url(#skinSalem)" />

          {/* Tête */}
          <circle cx="56" cy="14" r="5.5" fill="url(#skinSalem)" />

          {/* 🧢 Casquette tournée en arrière Cyan */}
          <path d="M 51 13 C 51 7 61 7 62 13 Z" fill="#06b6d4" stroke="#a855f7" strokeWidth="1" />
          <path d="M 51 13 Q 41 14 40 11" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          {/* Lunettes de soleil noires */}
          <path d="M 56 14 L 61 14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <style jsx>{`
        /* ===================================================
           PARCOURS RUE / GOUDRON & LONGS WHEELINGS DU BONHEUR : DOM
           (Descente depuis l'horloge -> Entrée sur Goudron ->
            LONG WHEELING CABRÉ -> Tremplin 1 -> Grand Saut 360 ->
            Atterrissage & Manual -> Tremplin 2 -> Monster Tailwhip ->
            Wheeling de sortie -> Boucle infinie)
           =================================================== */
        @keyframes domStreetCourse {
          0% {
            left: -15%;
            top: -20px;
            transform: translateY(0px) rotate(12deg);
          }
          8% {
            /* Descente depuis l'horloge vers la route goudronnée */
            left: 2%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          16% {
            /* DÉBUT DU LONG WHEELING DU BONHEUR (Cabrage roue arrière à 35°) */
            left: 10%;
            top: 0px;
            transform: translateY(-12px) rotate(-35deg);
          }
          24% {
            /* MAINTIEN DU WHEELING SUR PLUSIEURS MÈTRES */
            left: 20%;
            top: 0px;
            transform: translateY(-14px) rotate(-38deg);
          }
          27% {
            /* Descente de la roue avant à l'approche du Tremplin 1 */
            left: 25%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          32% {
            /* 🚀 ENVOI SUR TREMPLIN 1 (Grand Saut Acrobatique en l'air) */
            left: 31%;
            top: 0px;
            transform: translateY(-48px) rotate(-22deg);
          }
          38% {
            /* 360 Spin en plein vol au-dessus du goudron */
            left: 38%;
            top: 0px;
            transform: translateY(-52px) rotate(340deg);
          }
          45% {
            /* Atterrissage souple sur le goudron */
            left: 46%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          52% {
            /* 2ÈME WHEELING RAPIDE & MANUAL */
            left: 56%;
            top: 0px;
            transform: translateY(-10px) rotate(-30deg);
          }
          66% {
            /* Arrivée sur Tremplin 2 (Kicker 2) */
            left: 67%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          72% {
            /* 🚀 ENVOI TREMPLIN 2 : MONSTER AIR TAILWHIP */
            left: 74%;
            top: 0px;
            transform: translateY(-50px) rotate(-32deg);
          }
          80% {
            /* Extension Superman en l'air */
            left: 82%;
            top: 0px;
            transform: translateY(-38px) rotate(14deg);
          }
          88% {
            /* Réception et dernier Wheeling de célébration */
            left: 92%;
            top: 0px;
            transform: translateY(-8px) rotate(-26deg);
          }
          96% {
            /* Sortie à droite */
            left: 105%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            /* Bouclage propre au départ à gauche */
            left: 118%;
            top: -20px;
            transform: translateY(0px) rotate(0deg);
          }
        }

        /* ===================================================
           PARCOURS RUE / GOUDRON & WHEELINGS EN SÉRIE : SALEM
           (Descente -> Poursuite -> Wheeling -> Kicker 1 ->
            Air Backflip -> Manual -> Kicker 2 -> 360 Air -> Sortie)
           =================================================== */
        @keyframes salemStreetCourse {
          0% {
            left: -22%;
            top: -20px;
            transform: translateY(0px) rotate(10deg);
          }
          10% {
            /* Arrivée sur le goudron */
            left: 0%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          18% {
            /* GRAND WHEELING CABRÉ SALEM */
            left: 12%;
            top: 0px;
            transform: translateY(-14px) rotate(-38deg);
          }
          26% {
            /* Maintien équilibre sur 1 roue */
            left: 22%;
            top: 0px;
            transform: translateY(-14px) rotate(-36deg);
          }
          31% {
            /* Tremplin 1 : BACKFLIP PÉRILLEUX DANS LES AIRS */
            left: 29%;
            top: 0px;
            transform: translateY(-50px) rotate(-350deg);
          }
          40% {
            /* Réception propre sur le bitume */
            left: 40%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          48% {
            /* Double Bunny hop Rebond */
            left: 49%;
            top: 0px;
            transform: translateY(-24px) rotate(-16deg);
          }
          56% {
            /* Wheeling de relance */
            left: 58%;
            top: 0px;
            transform: translateY(-12px) rotate(-28deg);
          }
          69% {
            /* 🚀 ENVOI SUR TREMPLIN 2 (Mega Air 360 Tabletop) */
            left: 71%;
            top: 0px;
            transform: translateY(-54px) rotate(350deg);
          }
          78% {
            /* Plané horizontal en altitude */
            left: 80%;
            top: 0px;
            transform: translateY(-40px) rotate(22deg);
          }
          88% {
            /* Réception & Power Slide avec étincelles */
            left: 90%;
            top: 0px;
            transform: translateY(0px) rotate(-4deg);
          }
          96% {
            left: 104%;
            top: 0px;
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            left: 120%;
            top: -20px;
            transform: translateY(0px) rotate(0deg);
          }
        }

        /* Badges de tricks synchronisés aux wheelings et sauts */
        @keyframes popTrickDomStreet {
          0%, 12%, 46%, 64%, 86%, 100% {
            opacity: 0;
            transform: translateY(6px) scale(0.7);
          }
          16%, 24% {
            opacity: 1;
            transform: translateY(-12px) scale(1.05);
          }
          32%, 40% {
            opacity: 1;
            transform: translateY(-16px) scale(1.1);
          }
          72%, 80% {
            opacity: 1;
            transform: translateY(-16px) scale(1.1);
          }
        }

        @keyframes popTrickSalemStreet {
          0%, 14%, 42%, 66%, 86%, 100% {
            opacity: 0;
            transform: translateY(6px) scale(0.7);
          }
          18%, 26% {
            opacity: 1;
            transform: translateY(-12px) scale(1.05);
          }
          32%, 39% {
            opacity: 1;
            transform: translateY(-16px) scale(1.1);
          }
          70%, 78% {
            opacity: 1;
            transform: translateY(-16px) scale(1.1);
          }
        }

        .animate-dom-street-course {
          animation: domStreetCourse 11s cubic-bezier(0.38, 0, 0.22, 1) infinite;
        }

        .animate-salem-street-course {
          animation: salemStreetCourse 11s cubic-bezier(0.38, 0, 0.22, 1) infinite;
          animation-delay: 2.6s;
        }

        .animate-trick-dom-street {
          animation: popTrickDomStreet 11s ease-in-out infinite;
        }

        .animate-trick-salem-street {
          animation: popTrickSalemStreet 11s ease-in-out infinite;
          animation-delay: 2.6s;
        }

        @keyframes spinWheel {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-wheel {
          animation: spinWheel 0.3s linear infinite;
        }
      `}</style>
    </div>
  );
}
