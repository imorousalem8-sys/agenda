"use client";

import React from "react";

export default function BMXRiderAnimation() {
  return (
    <div className="relative w-full h-36 overflow-visible pointer-events-none select-none my-1">
      
      {/* ========================================================= */}
      {/* 🛣️ PISTE DE GOUDRON STREET & PORTE DE LA GRANDE HORLOGE */}
      {/* ========================================================= */}
      <div className="absolute bottom-2 left-0 right-0 h-11 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y-2 border-emerald-500/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-between px-3 overflow-visible">
        
        {/* Texture Asphalte & Grain Bitume Réaliste */}
        <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:6px_6px] opacity-45 rounded-xl" />
        
        {/* Lignes Blanches & Jaunes de la Route */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-around z-0 px-8">
          <span className="w-10 h-[3px] bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="w-10 h-[3px] bg-white/80 rounded-full" />
          <span className="w-10 h-[3px] bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="w-10 h-[3px] bg-white/80 rounded-full" />
          <span className="w-10 h-[3px] bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
        </div>

        {/* 🚪 PORTAIL GAUCHE : Porte de Sortie Temporelle */}
        <div className="absolute -left-3 bottom-0 h-16 w-8 rounded-r-2xl bg-gradient-to-r from-slate-950 to-slate-900 border-2 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.7)] flex flex-col items-center justify-center z-10">
          <div className="w-2 h-10 bg-emerald-400/80 rounded-full animate-pulse blur-[1px]" />
          <span className="text-[6px] font-mono font-black text-emerald-300 uppercase tracking-tighter -rotate-90 mt-1">SORTIE</span>
        </div>

        {/* 🛹 Tremplin / Kicker Jump Réaliste */}
        <div className="absolute bottom-0 left-[38%] w-11 h-5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 rounded-tr-md border-r-2 border-t-2 border-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.8)] flex items-center justify-center transform -skew-x-12 z-10">
          <span className="text-[7px] font-mono font-black text-black tracking-tighter">▲ JUMP</span>
        </div>

        {/* 🚪 PORTAIL DROITE : LA PETITE PORTE DE LA GRANDE HORLOGE */}
        <div className="absolute -right-3 bottom-0 h-20 w-12 rounded-l-3xl bg-gradient-to-l from-slate-950 via-slate-900 to-emerald-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.9)] flex flex-col items-center justify-center z-30 overflow-hidden group">
          
          {/* Cadran d'horloge miniature sur la porte */}
          <div className="absolute top-1.5 w-6 h-6 rounded-full border border-emerald-400/80 bg-black/80 flex items-center justify-center animate-spin-slow">
            <div className="w-2.5 h-[1.5px] bg-emerald-400 origin-left rotate-45" />
            <div className="w-1.5 h-[1.5px] bg-cyan-400 origin-left -rotate-90" />
          </div>

          {/* Vantaux motorisés de l'horloge */}
          <div className="w-full h-11 mt-6 flex items-center justify-between px-0.5 relative">
            <div className="w-1/2 h-full bg-slate-950 border-r border-cyan-400/60 transition-all duration-300 animate-door-left" />
            <div className="w-1/2 h-full bg-slate-950 border-l border-cyan-400/60 transition-all duration-300 animate-door-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-cyan-400/50 blur-sm pointer-events-none" />
          </div>

          <span className="text-[6px] font-mono font-black text-cyan-300 uppercase tracking-tighter mt-0.5">HORLOGE IA</span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 1 : "DOM" (Pédalage Dynamique + Position Debout + Wheelings + Tours) */}
      {/* ========================================================= */}
      <div className="absolute bottom-[17px] animate-dom-ground-ride flex flex-col items-center z-20">
        
        {/* Nom au-dessus du personnage : DOM */}
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-slate-950 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] flex items-center gap-1 scale-90 -translate-y-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-emerald-300 uppercase font-mono">
            DOM
          </span>
          <span className="text-[8px] text-emerald-400 font-bold">⚡</span>
        </div>

        {/* Badges Flottants des Nouvelles Figures Dynamiques */}
        <div className="absolute -top-6 animate-trick-dom-ground px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 rounded text-[9px] font-mono font-black text-emerald-300 opacity-0 whitespace-nowrap shadow-[0_0_10px_rgba(16,185,129,0.8)]">
          🔥 DEBOUT SUR LE VÉLO !
        </div>

        {/* Aura de contact pneu/goudron */}
        <div className="absolute bottom-0 left-2 w-14 h-2 bg-emerald-400/40 rounded-full blur-[2px]" />

        {/* SVG BMX PRO + RIDER QUI PÉDALE VRAIMENT & SE MET DEBOUT */}
        <svg
          viewBox="0 0 115 75"
          className="w-20 h-14 overflow-visible drop-shadow-[0_0_10px_rgba(16,185,129,0.95)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonDomBike" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="bomberJacketDom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="skinDom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#a97142" />
            </linearGradient>
          </defs>

          {/* 🚲 ROUE ARRIÈRE PRO (Gomme noire + Rayons Néon + Pegs) */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="13" stroke="#090d16" strokeWidth="3" />
            <circle cx="25" cy="54" r="11" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="25" cy="54" r="4.5" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
            <line x1="25" y1="43" x2="25" y2="65" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <line x1="14" y1="54" x2="36" y2="54" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <line x1="17" y1="46" x2="33" y2="62" stroke="#34d399" strokeWidth="1" opacity="0.8" />
            <line x1="17" y1="62" x2="33" y2="46" stroke="#34d399" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="23" y="52.5" width="4" height="3" rx="1" fill="#38bdf8" />

          {/* 🚲 ROUE AVANT PRO (Gomme noire + Rayons Néon + Pegs) */}
          <g className="animate-spin-wheel origin-[78px_54px]">
            <circle cx="78" cy="54" r="13" stroke="#090d16" strokeWidth="3" />
            <circle cx="78" cy="54" r="11" stroke="#10b981" strokeWidth="2" />
            <circle cx="78" cy="54" r="4.5" fill="#022c22" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="78" y1="43" x2="78" y2="65" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
            <line x1="67" y1="54" x2="89" y2="54" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
            <line x1="70" y1="46" x2="86" y2="62" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
            <line x1="70" y1="62" x2="86" y2="46" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="76" y="52.5" width="4" height="3" rx="1" fill="#10b981" />

          {/* 🚲 CADRE HYDROFORMÉ BMX LUXE */}
          <path d="M 25 54 L 46 52 L 25 40 Z" stroke="url(#neonDomBike)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 46 52 L 70 36 L 46 36 Z" stroke="url(#neonDomBike)" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M 70 36 L 78 54" stroke="url(#neonDomBike)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 70 36 L 68 21" stroke="url(#neonDomBike)" strokeWidth="3.2" />

          {/* Tige & Selle Streetwear */}
          <path d="M 46 52 L 40 31" stroke="url(#neonDomBike)" strokeWidth="3" />
          <path d="M 32 29 L 45 31" stroke="#090d16" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 29 L 44 31" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />

          {/* Guidon BMX 4 pièces */}
          <path d="M 62 20 L 74 20" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <line x1="63" y1="23" x2="73" y2="23" stroke="#34d399" strokeWidth="1.5" />
          <line x1="62" y1="20" x2="64" y2="20" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="20" x2="74" y2="20" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />

          {/* ⚙️ PÉDALIER ROTATIF & PÉDALAGE RÉEL EN CONTINU */}
          <g className="animate-pedal-crank origin-[46px_52px]">
            {/* Plateau de pédalier */}
            <circle cx="46" cy="52" r="5" fill="#090d16" stroke="#34d399" strokeWidth="2" />
            {/* Manivelle Gauche */}
            <line x1="46" y1="52" x2="52" y2="62" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="50" y="61" width="5" height="2" rx="1" fill="#10b981" />
            {/* Manivelle Droite (opposée) */}
            <line x1="46" y1="52" x2="40" y2="42" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="38" y="41" width="5" height="2" rx="1" fill="#10b981" />
          </g>

          {/* =================================================== */}
          {/* 🧍 RIDER CORP & JAMBES QUI PÉDALENT ET SE LÈVENT DEBOUT */}
          {/* =================================================== */}
          <g className="animate-dom-standing-action">
            
            {/* Jambe Droite (Pédalage synchronisé haut/bas) */}
            <g className="animate-dom-leg-pedal">
              <path d="M 42 28 Q 48 42 52 58" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
              {/* Bande réfléchissante pantalon */}
              <path d="M 45 40 L 49 42" stroke="#34d399" strokeWidth="1.5" />
              {/* Basket Sneaker Chunky qui appuie sur la pédale */}
              <path d="M 50 58 L 58 60" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              <path d="M 51 60 L 58 60" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Buste / Veste Bomber Streetwear */}
            <path d="M 43 27 C 46 17 58 15 62 20 L 53 35 Z" fill="url(#bomberJacketDom)" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="56" cy="22" r="1.5" fill="#38bdf8" />
            <path d="M 52 18 L 48 30" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />

            {/* Bras 1 (sur le guidon) */}
            <path d="M 54 20 L 68 21" stroke="url(#bomberJacketDom)" strokeWidth="5" strokeLinecap="round" />
            <rect x="66" y="20" width="2" height="3" fill="#34d399" />
            <circle cx="69" cy="21" r="2.2" fill="url(#skinDom)" />

            {/* Bras 2 Débout Trick (Se lève en l'air lors de la position debout !) */}
            <g className="animate-dom-arm-trick">
              <path d="M 55 19 L 62 8" stroke="url(#bomberJacketDom)" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="63" cy="7" r="2.2" fill="url(#skinDom)" />
            </g>

            {/* Tête & Cou */}
            <circle cx="58" cy="13" r="5.5" fill="url(#skinDom)" />

            {/* 🧢 Casquette tournée en arrière Bad Boy */}
            <path d="M 53 12 C 53 6 63 6 64 12 Z" fill="#10b981" stroke="#06b6d4" strokeWidth="1" />
            <path d="M 53 12 Q 43 13 41 10" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 13 L 63 13" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          </g>

        </svg>
      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 2 : "SALEM" (Pédalage Continu, Wheelings & Tours Aériens) */}
      {/* ========================================================= */}
      <div className="absolute bottom-[17px] animate-salem-ground-ride flex flex-col items-center z-10">
        
        {/* Nom au-dessus du personnage : SALEM */}
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-slate-950 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] flex items-center gap-1 scale-90 -translate-y-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-cyan-300 uppercase font-mono">
            SALEM
          </span>
          <span className="text-[8px] text-cyan-400 font-bold">🚀</span>
        </div>

        {/* Badges Dynamiques */}
        <div className="absolute -top-6 animate-trick-salem-ground px-2 py-0.5 bg-cyan-500/30 border border-cyan-400 rounded text-[9px] font-mono font-black text-cyan-300 opacity-0 whitespace-nowrap shadow-[0_0_10px_rgba(6,182,212,0.8)]">
          ⚡ 360 TOUR COMPLET EN L&apos;AIR !
        </div>

        {/* Aura de contact pneu/goudron */}
        <div className="absolute bottom-0 left-2 w-14 h-2 bg-cyan-400/40 rounded-full blur-[2px]" />

        {/* SVG BMX PRO SALEM */}
        <svg
          viewBox="0 0 115 75"
          className="w-20 h-14 overflow-visible drop-shadow-[0_0_10px_rgba(6,182,212,0.95)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonSalemBike" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="windbreakerSalem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#083344" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="skinSalem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0ac69" />
              <stop offset="100%" stopColor="#b07d4b" />
            </linearGradient>
          </defs>

          {/* Roues Pro Salem */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="13" stroke="#090d16" strokeWidth="3" />
            <circle cx="25" cy="54" r="11" stroke="#a855f7" strokeWidth="2" />
            <circle cx="25" cy="54" r="4.5" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="25" y1="43" x2="25" y2="65" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
            <line x1="14" y1="54" x2="36" y2="54" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
            <line x1="17" y1="46" x2="33" y2="62" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
            <line x1="17" y1="62" x2="33" y2="46" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="23" y="52.5" width="4" height="3" rx="1" fill="#a855f7" />

          <g className="animate-spin-wheel origin-[78px_54px]">
            <circle cx="78" cy="54" r="13" stroke="#090d16" strokeWidth="3" />
            <circle cx="78" cy="54" r="11" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="78" cy="54" r="4.5" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="78" y1="43" x2="78" y2="65" stroke="#a855f7" strokeWidth="1.2" opacity="0.9" />
            <line x1="67" y1="54" x2="89" y2="54" stroke="#a855f7" strokeWidth="1.2" opacity="0.9" />
            <line x1="70" y1="46" x2="86" y2="62" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="70" y1="62" x2="86" y2="46" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="76" y="52.5" width="4" height="3" rx="1" fill="#06b6d4" />

          {/* Cadre BMX Salem */}
          <path d="M 25 54 L 46 52 L 25 40 Z" stroke="url(#neonSalemBike)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 46 52 L 70 36 L 46 36 Z" stroke="url(#neonSalemBike)" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M 70 36 L 78 54" stroke="url(#neonSalemBike)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 70 36 L 68 21" stroke="url(#neonSalemBike)" strokeWidth="3.2" />

          {/* Selle */}
          <path d="M 46 52 L 40 31" stroke="url(#neonSalemBike)" strokeWidth="3" />
          <path d="M 32 29 L 45 31" stroke="#090d16" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 29 L 44 31" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />

          {/* Guidon */}
          <path d="M 62 20 L 74 20" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
          <line x1="63" y1="23" x2="73" y2="23" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="62" y1="20" x2="64" y2="20" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="20" x2="74" y2="20" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />

          {/* ⚙️ PÉDALIER SALEM EN ROTATION CONTINUE */}
          <g className="animate-pedal-crank origin-[46px_52px]">
            <circle cx="46" cy="52" r="5" fill="#090d16" stroke="#06b6d4" strokeWidth="2" />
            <line x1="46" y1="52" x2="52" y2="62" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="50" y="61" width="5" height="2" rx="1" fill="#06b6d4" />
            <line x1="46" y1="52" x2="40" y2="42" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="38" y="41" width="5" height="2" rx="1" fill="#06b6d4" />
          </g>

          {/* Corps Salem & Jambes qui pédalent */}
          <g className="animate-salem-standing-action">
            <g className="animate-salem-leg-pedal">
              <path d="M 42 28 Q 48 42 52 58" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 45 40 L 49 42" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M 50 58 L 58 60" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
              <path d="M 51 60 L 58 60" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            <path d="M 43 27 C 46 17 58 15 62 20 L 53 35 Z" fill="url(#windbreakerSalem)" stroke="#06b6d4" strokeWidth="1.5" />
            <circle cx="56" cy="22" r="1.5" fill="#a855f7" />
            <path d="M 52 18 L 48 30" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" />

            <path d="M 54 20 L 68 21" stroke="url(#windbreakerSalem)" strokeWidth="5" strokeLinecap="round" />
            <circle cx="69" cy="21" r="2.2" fill="url(#skinSalem)" />

            <circle cx="58" cy="13" r="5.5" fill="url(#skinSalem)" />

            {/* 🧢 Casquette tournée en arrière Cyan Bad Boy */}
            <path d="M 53 12 C 53 6 63 6 64 12 Z" fill="#06b6d4" stroke="#a855f7" strokeWidth="1" />
            <path d="M 53 12 Q 43 13 41 10" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 13 L 63 13" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <style jsx>{`
        /* ===================================================
           PÉDALAGE DYNAMIQUE EN CONTINU (Jambes & Pédales)
           =================================================== */
        @keyframes pedalCrank {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pedal-crank {
          animation: pedalCrank 0.4s linear infinite;
        }

        /* Flexion / Extension des jambes au pédalage */
        @keyframes legPedalMotion {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-4px) scaleY(0.92);
          }
        }

        .animate-dom-leg-pedal {
          animation: legPedalMotion 0.4s ease-in-out infinite;
          transform-origin: 42px 28px;
        }

        .animate-salem-leg-pedal {
          animation: legPedalMotion 0.4s ease-in-out infinite;
          transform-origin: 42px 28px;
          animation-delay: 0.2s;
        }

        /* ===================================================
           FIGURE : SE METTRE DEBOUT SUR LE VÉLO (STAND-UP)
           =================================================== */
        @keyframes standingAction {
          0%, 15%, 45%, 100% {
            /* Position de conduite normale assise */
            transform: translateY(0px);
          }
          20%, 38% {
            /* SE MET DEBOUT SUR LES PÉDALES : ÉLÉVATION DU CORPS */
            transform: translateY(-7px) scaleY(1.06);
          }
        }

        .animate-dom-standing-action {
          animation: standingAction 10s ease-in-out infinite;
          transform-origin: 46px 52px;
        }

        .animate-salem-standing-action {
          animation: standingAction 10s ease-in-out infinite;
          transform-origin: 46px 52px;
          animation-delay: 2.5s;
        }

        /* Bras levé en l'air pendant le Stand-Up */
        @keyframes armTrickAction {
          0%, 18%, 40%, 100% {
            opacity: 0;
            transform: scale(0.6);
          }
          22%, 36% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-dom-arm-trick {
          animation: armTrickAction 10s ease-in-out infinite;
          transform-origin: 55px 19px;
        }

        /* ===================================================
           TRAJET RÉEL SUR LE GOUDRON + VRAIS WHEELINGS + TOURS EN L'AIR + ENTRÉE DANS L'HORLOGE
           =================================================== */
        @keyframes domGroundRide {
          0% {
            left: -4%;
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.9);
          }
          6% {
            /* Roulage normal avec pédalage actif */
            left: 5%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          14% {
            /* FIGURE 1 : SE MET DEBOUT SUR LE VÉLO EN ROULANT */
            left: 15%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          24% {
            /* FIGURE 2 : CABRAGE EN VRAI WHEELING ARRIÈRE AU SOL */
            left: 28%;
            opacity: 1;
            transform: translateY(0px) rotate(-35deg);
            transform-origin: 25px 54px;
          }
          33% {
            /* Repose de la roue avant pour foncer sur le tremplin */
            left: 36%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          38% {
            /* 🚀 ENVOI TREMPLIN : GRAND TOUR ACROBATIQUE 360 EN L'AIR */
            left: 44%;
            opacity: 1;
            transform: translateY(-44px) rotate(340deg);
          }
          46% {
            /* Atterrissage sur le goudron */
            left: 54%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          54% {
            /* Relance en Wheeling dynamique */
            left: 65%;
            opacity: 1;
            transform: translateY(0px) rotate(-26deg);
            transform-origin: 25px 54px;
          }
          64% {
            /* Sprint face à la porte */
            left: 78%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          72% {
            /* 🚪 ENTRÉE DANS LA PORTE DE LA GRANDE HORLOGE */
            left: 88%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(0.95);
          }
          78% {
            /* Aspiration lumineuse */
            left: 95%;
            opacity: 0;
            transform: translateY(-4px) rotate(0deg) scale(0.65);
          }
          100% {
            left: 95%;
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.65);
          }
        }

        @keyframes salemGroundRide {
          0% {
            left: -4%;
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.9);
          }
          6% {
            left: 5%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          15% {
            /* Stand-up Trick */
            left: 16%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          26% {
            /* VRAI WHEELING CABRÉ SALEM */
            left: 30%;
            opacity: 1;
            transform: translateY(0px) rotate(-36deg);
            transform-origin: 25px 54px;
          }
          34% {
            left: 36%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          40% {
            /* 🚀 ENVOI SUR TREMPLIN : 360 TOUR COMPLET EN L'AIR */
            left: 45%;
            opacity: 1;
            transform: translateY(-46px) rotate(-350deg);
          }
          48% {
            /* Atterrissage sur goudron */
            left: 56%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          56% {
            left: 68%;
            opacity: 1;
            transform: translateY(0px) rotate(-28deg);
            transform-origin: 25px 54px;
          }
          66% {
            left: 80%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          74% {
            /* 🚪 ENTRÉE DANS LA PORTE DE LA GRANDE HORLOGE */
            left: 89%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(0.95);
          }
          80% {
            left: 95%;
            opacity: 0;
            transform: translateY(-4px) rotate(0deg) scale(0.65);
          }
          100% {
            left: 95%;
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.65);
          }
        }

        /* Ouverture des portes de l'horloge */
        @keyframes doorLeftOpen {
          0%, 60%, 85%, 100% {
            transform: translateX(0%);
          }
          68%, 80% {
            transform: translateX(-90%);
          }
        }

        @keyframes doorRightOpen {
          0%, 60%, 85%, 100% {
            transform: translateX(0%);
          }
          68%, 80% {
            transform: translateX(90%);
          }
        }

        .animate-door-left {
          animation: doorLeftOpen 10s ease-in-out infinite;
        }

        .animate-door-right {
          animation: doorRightOpen 10s ease-in-out infinite;
        }

        /* Badges de figures alternées */
        @keyframes popTrickDomGround {
          0%, 10%, 46%, 100% {
            opacity: 0;
            transform: translateY(4px) scale(0.8);
          }
          14%, 22% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          36%, 44% {
            opacity: 1;
            transform: translateY(-12px) scale(1.08);
          }
        }

        @keyframes popTrickSalemGround {
          0%, 12%, 48%, 100% {
            opacity: 0;
            transform: translateY(4px) scale(0.8);
          }
          16%, 24% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          38%, 46% {
            opacity: 1;
            transform: translateY(-12px) scale(1.08);
          }
        }

        .animate-dom-ground-ride {
          animation: domGroundRide 10s cubic-bezier(0.35, 0, 0.25, 1) infinite;
        }

        .animate-salem-ground-ride {
          animation: salemGroundRide 10s cubic-bezier(0.35, 0, 0.25, 1) infinite;
          animation-delay: 2.5s;
        }

        .animate-trick-dom-ground {
          animation: popTrickDomGround 10s ease-in-out infinite;
        }

        .animate-trick-salem-ground {
          animation: popTrickSalemGround 10s ease-in-out infinite;
          animation-delay: 2.5s;
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
          animation: spinWheel 0.28s linear infinite;
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
