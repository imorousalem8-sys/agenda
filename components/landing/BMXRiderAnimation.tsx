"use client";

import React from "react";

export default function BMXRiderAnimation() {
  return (
    <div className="relative w-full h-24 overflow-visible pointer-events-none select-none my-1">
      {/* Circuit Rail Neon Multidirectionnel (Trajet de ride de la page d'accueil) */}
      <div className="absolute bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 via-cyan-400/60 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-pulse" />
      </div>

      {/* Particules et Étincelles sur le circuit */}
      <div className="absolute bottom-2 left-[15%] w-1.5 h-1.5 rounded-full bg-emerald-400 blur-[1px] animate-ping" />
      <div className="absolute bottom-2 left-[45%] w-2 h-2 rounded-full bg-cyan-400 blur-[1px] animate-ping" />
      <div className="absolute bottom-2 left-[80%] w-1.5 h-1.5 rounded-full bg-purple-400 blur-[1px] animate-ping" />

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 1 : "DOM" (Bad Boy Casquette en Arrière - BMX Vert & Cyan) */}
      {/* ========================================================= */}
      <div className="absolute bottom-2 animate-dom-circuit flex flex-col items-center z-20">
        
        {/* Nom au-dessus du personnage : DOM */}
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.7)] flex items-center gap-1 scale-90 -translate-y-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-emerald-300 uppercase font-mono">
            DOM
          </span>
          <span className="text-[8px] text-emerald-400 font-bold">⚡</span>
        </div>

        {/* Badge Flottant de Figure / Trick Combo */}
        <div className="absolute -top-6 animate-trick-dom px-1.5 py-0.2 bg-emerald-500/20 border border-emerald-400/60 rounded text-[8px] font-mono font-bold text-emerald-300 opacity-0 whitespace-nowrap">
          🔥 360 TAILWHIP
        </div>

        {/* Aura lumineuse sous le BMX */}
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-emerald-400/30 rounded-full blur-sm" />

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

          {/* Pédalier & Pieds en mouvement */}
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
      {/* 🚴‍♂️ RIDER 2 : "SALEM" (Bad Boy Casquette en Arrière - BMX Cyan & Violet) */}
      {/* ========================================================= */}
      <div className="absolute bottom-2 animate-salem-circuit flex flex-col items-center z-10">
        
        {/* Nom au-dessus du personnage : SALEM */}
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-slate-950/90 border border-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.7)] flex items-center gap-1 scale-90 -translate-y-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-cyan-300 uppercase font-mono">
            SALEM
          </span>
          <span className="text-[8px] text-cyan-400 font-bold">🚀</span>
        </div>

        {/* Badge Flottant de Figure / Trick Combo */}
        <div className="absolute -top-6 animate-trick-salem px-1.5 py-0.2 bg-cyan-500/20 border border-cyan-400/60 rounded text-[8px] font-mono font-bold text-cyan-300 opacity-0 whitespace-nowrap">
          ✨ AIR BACKFLIP
        </div>

        {/* Aura lumineuse sous le BMX */}
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-cyan-400/30 rounded-full blur-sm" />

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
          <path d="M 42 28 C 45 18 56 16 60 21 L 52 34 Z" fill="#090d16" stroke="#06b6d4" strokeWidth="1.5" />
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
           PARCOURS LONG & ENCHAÎNEMENT DE FIGURES : DOM
           (Figures: Sprint -> Manual -> Bunny Hop -> 360 Spin 
            -> Nose Manual -> Tailwhip -> Superman Air -> Landing)
           =================================================== */
        @keyframes domLongCircuit {
          0% {
            left: -15%;
            transform: translateY(0px) rotate(0deg);
          }
          10% {
            /* Sprint d'entrée */
            left: 5%;
            transform: translateY(0px) rotate(0deg);
          }
          18% {
            /* 1. FIGURE : WHEELIE / MANUAL (Cabrage roue arrière) */
            left: 18%;
            transform: translateY(-8px) rotate(-22deg);
          }
          26% {
            /* 2. FIGURE : GRAND BUNNY HOP (Décollage au-dessus des lettres) */
            left: 30%;
            transform: translateY(-38px) rotate(-18deg);
          }
          34% {
            /* 3. FIGURE : 360 APEX SPIN (Rotation aérienne) */
            left: 42%;
            transform: translateY(-44px) rotate(340deg);
          }
          42% {
            /* Réception & Grind le long du rail */
            left: 52%;
            transform: translateY(0px) rotate(0deg);
          }
          52% {
            /* 4. FIGURE : NOSE MANUAL (Équilibre sur roue avant) */
            left: 64%;
            transform: translateY(-4px) rotate(16deg);
          }
          62% {
            /* 5. FIGURE : MONSTER TAILWHIP (Saut acrobatique avec coup de cadre) */
            left: 75%;
            transform: translateY(-40px) rotate(-28deg);
          }
          70% {
            /* Extension Superman Air */
            left: 82%;
            transform: translateY(-32px) rotate(10deg);
          }
          80% {
            /* Réception amortie & Power slide */
            left: 90%;
            transform: translateY(0px) rotate(-4deg);
          }
          90% {
            /* Sprint final vers sortie */
            left: 102%;
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            /* Bouclage fluide du parcours */
            left: 115%;
            transform: translateY(0px) rotate(0deg);
          }
        }

        /* ===================================================
           PARCOURS LONG & ENCHAÎNEMENT DE FIGURES : SALEM
           (Figures: Sprint Poursuite -> Air Backflip -> Tabletop 
            -> Double Hop -> Sky 360 -> Fast Rollout)
           =================================================== */
        @keyframes salemLongCircuit {
          0% {
            left: -22%;
            transform: translateY(0px) rotate(0deg);
          }
          12% {
            /* Accélération derrière Dom */
            left: 0%;
            transform: translateY(0px) rotate(2deg);
          }
          22% {
            /* 1. FIGURE : BACKFLIP JUMP (Grand saut périlleux) */
            left: 15%;
            transform: translateY(-42px) rotate(-350deg);
          }
          32% {
            /* Réception souple */
            left: 28%;
            transform: translateY(0px) rotate(0deg);
          }
          40% {
            /* 2. FIGURE : TABLETOP AIR (BMX incliné à l'horizontale) */
            left: 38%;
            transform: translateY(-30px) rotate(24deg);
          }
          50% {
            /* 3. FIGURE : DOUBLE BUNNY HOP REBOUND */
            left: 50%;
            transform: translateY(-24px) rotate(-14deg);
          }
          60% {
            /* Manual acrobatique */
            left: 62%;
            transform: translateY(-10px) rotate(-20deg);
          }
          72% {
            /* 4. FIGURE : SKY 360 AIR STUNT */
            left: 76%;
            transform: translateY(-46px) rotate(350deg);
          }
          82% {
            /* Atterrissage en vitesse */
            left: 88%;
            transform: translateY(0px) rotate(0deg);
          }
          92% {
            /* Sprint de sortie */
            left: 100%;
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            /* Bouclage infini au départ */
            left: 118%;
            transform: translateY(0px) rotate(0deg);
          }
        }

        /* Déclenchement des badges de tricks lors des figures */
        @keyframes popTrickDom {
          0%, 25%, 75%, 100% {
            opacity: 0;
            transform: translateY(4px) scale(0.8);
          }
          30%, 40%, 63%, 69% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
        }

        @keyframes popTrickSalem {
          0%, 18%, 70%, 100% {
            opacity: 0;
            transform: translateY(4px) scale(0.8);
          }
          22%, 28%, 72%, 78% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
        }

        .animate-dom-circuit {
          animation: domLongCircuit 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-salem-circuit {
          animation: salemLongCircuit 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 2.2s;
        }

        .animate-trick-dom {
          animation: popTrickDom 10s ease-in-out infinite;
        }

        .animate-trick-salem {
          animation: popTrickSalem 10s ease-in-out infinite;
          animation-delay: 2.2s;
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
          animation: spinWheel 0.35s linear infinite;
        }
      `}</style>
    </div>
  );
}
