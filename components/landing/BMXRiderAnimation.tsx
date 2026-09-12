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
      {/* 🚴‍♂️ RIDER 1 : "DOM" (Pédalage Réaliste Synchronisé : Pédale au sol, Fixe en l'air) */}
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

        {/* Badges Flottants des Figures */}
        <div className="absolute -top-6 animate-trick-dom-ground px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 rounded text-[9px] font-mono font-black text-emerald-300 opacity-0 whitespace-nowrap shadow-[0_0_10px_rgba(16,185,129,0.8)]">
          🔥 DEBOUT SUR LE VÉLO !
        </div>

        {/* Aura de contact pneu/goudron */}
        <div className="absolute bottom-0 left-2 w-14 h-2 bg-emerald-400/40 rounded-full blur-[2px]" />

        {/* SVG BMX PRO HAUTE DÉFINITION + RIDER STREETWEAR RÉALISTE */}
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
              <stop offset="60%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="skinDom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#a97142" />
            </linearGradient>
            <linearGradient id="cargoDom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* 🚲 ROUE ARRIÈRE BMX PRO (Pneu sculpté + Jante néon + Rayons + Pegs) */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            {/* Pneu gomme épaisse avec crampons */}
            <circle cx="25" cy="54" r="13.5" stroke="#090d16" strokeWidth="3" />
            <circle cx="25" cy="54" r="12" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 1" />
            {/* Jante renforcée */}
            <circle cx="25" cy="54" r="10.5" stroke="#06b6d4" strokeWidth="2.2" />
            {/* Disque & Moyeu usiné */}
            <circle cx="25" cy="54" r="4.5" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
            {/* Rayons croisés */}
            <line x1="25" y1="42" x2="25" y2="66" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <line x1="13" y1="54" x2="37" y2="54" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <line x1="16.5" y1="45.5" x2="33.5" y2="62.5" stroke="#34d399" strokeWidth="1" opacity="0.8" />
            <line x1="16.5" y1="62.5" x2="33.5" y2="45.5" stroke="#34d399" strokeWidth="1" opacity="0.8" />
          </g>
          {/* Peg cascadeur arrière */}
          <rect x="22.5" y="52.5" width="5" height="3" rx="1.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="0.8" />

          {/* 🚲 ROUE AVANT BMX PRO */}
          <g className="animate-spin-wheel origin-[78px_54px]">
            <circle cx="78" cy="54" r="13.5" stroke="#090d16" strokeWidth="3" />
            <circle cx="78" cy="54" r="12" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="78" cy="54" r="10.5" stroke="#10b981" strokeWidth="2.2" />
            <circle cx="78" cy="54" r="4.5" fill="#022c22" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="78" y1="42" x2="78" y2="66" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
            <line x1="66" y1="54" x2="90" y2="54" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
            <line x1="69.5" y1="45.5" x2="86.5" y2="62.5" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
            <line x1="69.5" y1="62.5" x2="86.5" y2="45.5" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="75.5" y="52.5" width="5" height="3" rx="1.5" fill="#10b981" stroke="#0f172a" strokeWidth="0.8" />

          {/* 🚲 CADRE ALUMINIUM HYDROFORMÉ RÉALISTE */}
          {/* Haubans arrière & bases */}
          <path d="M 25 54 L 46 52 L 25 39 Z" stroke="url(#neonDomBike)" strokeWidth="2.8" strokeLinejoin="round" />
          {/* Renfort triangle avant */}
          <path d="M 46 52 L 70 36 L 46 35 Z" stroke="url(#neonDomBike)" strokeWidth="3.4" strokeLinejoin="round" />
          {/* Gousset de renfort sous douille */}
          <path d="M 64 39 L 70 36 L 68 43 Z" fill="#10b981" opacity="0.7" />
          {/* Fourche BMX droite & tube de direction */}
          <path d="M 70 36 L 78 54" stroke="url(#neonDomBike)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 70 36 L 68 21" stroke="url(#neonDomBike)" strokeWidth="3.2" />

          {/* Tige & Selle Slim Pivotal */}
          <path d="M 46 52 L 40 30" stroke="url(#neonDomBike)" strokeWidth="3" />
          <path d="M 31 28 L 45 30" stroke="#090d16" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 32 28 L 44 30" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" />

          {/* Guidon BMX 4 pièces & Potence Top-Load */}
          <path d="M 61 20 L 75 20" stroke="#38bdf8" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="62" y1="23" x2="74" y2="23" stroke="#34d399" strokeWidth="1.8" />
          {/* Grips à collerette */}
          <line x1="61" y1="20" x2="63.5" y2="20" stroke="#10b981" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="72.5" y1="20" x2="75" y2="20" stroke="#10b981" strokeWidth="5.5" strokeLinecap="round" />

          {/* ⚙️ PÉDALIER : SYNCHRONISÉ AVEC LE ROULAGE (Pédale au sol, Stop en l'air !) */}
          <g className="animate-dom-pedal-cycle origin-[46px_52px]">
            {/* Boîtier & Couronne 25 dents */}
            <circle cx="46" cy="52" r="5.5" fill="#090d16" stroke="#34d399" strokeWidth="2" />
            {/* Manivelle tubulaire 175mm Gauche */}
            <line x1="46" y1="52" x2="52" y2="63" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />
            <rect x="50" y="62" width="6" height="2.5" rx="1.2" fill="#10b981" />
            {/* Manivelle Droite opposée */}
            <line x1="46" y1="52" x2="40" y2="41" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />
            <rect x="37" y="40" width="6" height="2.5" rx="1.2" fill="#10b981" />
          </g>

          {/* =================================================== */}
          {/* 🧍 RIDER DOM : ANATOMIE RÉALISTE & VÊTEMENTS STREETWEAR */}
          {/* =================================================== */}
          <g className="animate-dom-standing-action">
            
            {/* Jambe Droite : Pédalage réaliste (Actif au sol, Figé en l'air) */}
            <g className="animate-dom-leg-motion origin-[42px_28px]">
              {/* Cuisse & Pantalon Cargo avec plis anatomiques */}
              <path d="M 42 27 Q 47 38 48 46" stroke="url(#cargoDom)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Mollet */}
              <path d="M 48 46 L 53 59" stroke="url(#cargoDom)" strokeWidth="5.5" strokeLinecap="round" />
              {/* Poche latérale cargo */}
              <rect x="44" y="38" width="5" height="4" rx="1" fill="#334155" />
              <line x1="45" y1="40" x2="48" y2="40" stroke="#34d399" strokeWidth="1" />
              {/* Sneaker Chunky réaliste (Semelle intermédiaire + empeigne + logo) */}
              <path d="M 50 58 L 59 60" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 51 60.5 L 59 60.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="53" cy="58.5" r="1" fill="#fff" />
            </g>

            {/* Buste / Veste Bomber Réaliste */}
            <path d="M 43 26 C 46 16 59 14 63 19 L 53 35 Z" fill="url(#bomberJacketDom)" stroke="#10b981" strokeWidth="1.6" />
            {/* Blason brodé sur la poitrine */}
            <circle cx="57" cy="21" r="1.8" fill="#38bdf8" />
            <path d="M 53 17 L 48 30" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" />
            {/* Ourlet côtelé bas de veste */}
            <path d="M 47 33 L 53 35" stroke="#090d16" strokeWidth="2.5" strokeLinecap="round" />

            {/* Bras 1 (Prise ferme sur le grip du guidon) */}
            <path d="M 54 19 L 68 21" stroke="url(#bomberJacketDom)" strokeWidth="5.5" strokeLinecap="round" />
            <rect x="66" y="19.5" width="2.5" height="3.5" rx="1" fill="#34d399" />
            <circle cx="69.5" cy="21" r="2.5" fill="url(#skinDom)" />

            {/* Bras 2 (Se lève uniquement lors de la figure "Debout") */}
            <g className="animate-dom-arm-trick">
              <path d="M 55 18 L 63 7" stroke="url(#bomberJacketDom)" strokeWidth="5" strokeLinecap="round" />
              <circle cx="64" cy="6" r="2.5" fill="url(#skinDom)" />
            </g>

            {/* Tête, Visage & Profil Réaliste */}
            <circle cx="58" cy="13" r="5.8" fill="url(#skinDom)" />
            {/* Mâchoire sculptée */}
            <path d="M 55 15 Q 60 17 62 13" stroke="url(#skinDom)" strokeWidth="1.5" />

            {/* 🧢 Casquette Snapback tournée en arrière Haute Définition */}
            <path d="M 53 12 C 53 5 64 5 65 12 Z" fill="#10b981" stroke="#06b6d4" strokeWidth="1.2" />
            {/* Bouton central sur le dôme */}
            <circle cx="58.5" cy="5.5" r="1" fill="#38bdf8" />
            {/* Visière incurvée tournée vers l'arrière */}
            <path d="M 53 12 Q 42 13 40 10" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
            {/* Bande de réglage snapback à l'avant */}
            <path d="M 62 11 L 64 11" stroke="#090d16" strokeWidth="1.5" />
            {/* Lunettes de soleil noires avec reflet */}
            <path d="M 57.5 13.5 L 63.5 13.5" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="58.5" y1="13" x2="61" y2="13" stroke="#38bdf8" strokeWidth="1" />
          </g>

        </svg>
      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 2 : "SALEM" (Pédalage Réaliste au Sol + Stop en L'air) */}
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

        {/* Aura de contact */}
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
              <stop offset="60%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="skinSalem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0ac69" />
              <stop offset="100%" stopColor="#b07d4b" />
            </linearGradient>
          </defs>

          {/* Roues Pro Salem */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="13.5" stroke="#090d16" strokeWidth="3" />
            <circle cx="25" cy="54" r="12" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="25" cy="54" r="10.5" stroke="#a855f7" strokeWidth="2.2" />
            <circle cx="25" cy="54" r="4.5" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="25" y1="42" x2="25" y2="66" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
            <line x1="13" y1="54" x2="37" y2="54" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
            <line x1="16.5" y1="45.5" x2="33.5" y2="62.5" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
            <line x1="16.5" y1="62.5" x2="33.5" y2="45.5" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="22.5" y="52.5" width="5" height="3" rx="1.5" fill="#a855f7" stroke="#0f172a" strokeWidth="0.8" />

          <g className="animate-spin-wheel origin-[78px_54px]">
            <circle cx="78" cy="54" r="13.5" stroke="#090d16" strokeWidth="3" />
            <circle cx="78" cy="54" r="12" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="78" cy="54" r="10.5" stroke="#06b6d4" strokeWidth="2.2" />
            <circle cx="78" cy="54" r="4.5" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="78" y1="42" x2="78" y2="66" stroke="#a855f7" strokeWidth="1.2" opacity="0.9" />
            <line x1="66" y1="54" x2="90" y2="54" stroke="#a855f7" strokeWidth="1.2" opacity="0.9" />
            <line x1="69.5" y1="45.5" x2="86.5" y2="62.5" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <line x1="69.5" y1="62.5" x2="86.5" y2="45.5" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
          </g>
          <rect x="75.5" y="52.5" width="5" height="3" rx="1.5" fill="#06b6d4" stroke="#0f172a" strokeWidth="0.8" />

          {/* Cadre Salem */}
          <path d="M 25 54 L 46 52 L 25 39 Z" stroke="url(#neonSalemBike)" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M 46 52 L 70 36 L 46 35 Z" stroke="url(#neonSalemBike)" strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M 70 36 L 78 54" stroke="url(#neonSalemBike)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 70 36 L 68 21" stroke="url(#neonSalemBike)" strokeWidth="3.2" />

          {/* Selle */}
          <path d="M 46 52 L 40 30" stroke="url(#neonSalemBike)" strokeWidth="3" />
          <path d="M 31 28 L 45 30" stroke="#090d16" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 32 28 L 44 30" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round" />

          {/* Guidon */}
          <path d="M 61 20 L 75 20" stroke="#a855f7" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="62" y1="23" x2="74" y2="23" stroke="#06b6d4" strokeWidth="1.8" />
          <line x1="61" y1="20" x2="63.5" y2="20" stroke="#06b6d4" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="72.5" y1="20" x2="75" y2="20" stroke="#06b6d4" strokeWidth="5.5" strokeLinecap="round" />

          {/* ⚙️ PÉDALIER SALEM : SYNCHRONISÉ */}
          <g className="animate-salem-pedal-cycle origin-[46px_52px]">
            <circle cx="46" cy="52" r="5.5" fill="#090d16" stroke="#06b6d4" strokeWidth="2" />
            <line x1="46" y1="52" x2="52" y2="63" stroke="#a855f7" strokeWidth="2.8" strokeLinecap="round" />
            <rect x="50" y="62" width="6" height="2.5" rx="1.2" fill="#06b6d4" />
            <line x1="46" y1="52" x2="40" y2="41" stroke="#a855f7" strokeWidth="2.8" strokeLinecap="round" />
            <rect x="37" y="40" width="6" height="2.5" rx="1.2" fill="#06b6d4" />
          </g>

          {/* Corps & Vêtements Salem */}
          <g className="animate-salem-standing-action">
            <g className="animate-salem-leg-motion origin-[42px_28px]">
              <path d="M 42 27 Q 47 38 48 46" stroke="#0f172a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 48 46 L 53 59" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 45 40 L 49 42" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M 50 58 L 59 60" stroke="#06b6d4" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 51 60.5 L 59 60.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            <path d="M 43 26 C 46 16 59 14 63 19 L 53 35 Z" fill="url(#windbreakerSalem)" stroke="#06b6d4" strokeWidth="1.6" />
            <circle cx="57" cy="21" r="1.8" fill="#a855f7" />
            <path d="M 53 17 L 48 30" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" />

            <path d="M 54 19 L 68 21" stroke="url(#windbreakerSalem)" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="69.5" cy="21" r="2.5" fill="url(#skinSalem)" />

            <circle cx="58" cy="13" r="5.8" fill="url(#skinSalem)" />

            {/* 🧢 Casquette Cyan Snapback */}
            <path d="M 53 12 C 53 5 64 5 65 12 Z" fill="#06b6d4" stroke="#a855f7" strokeWidth="1.2" />
            <circle cx="58.5" cy="5.5" r="1" fill="#38bdf8" />
            <path d="M 53 12 Q 42 13 40 10" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 57.5 13.5 L 63.5 13.5" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <style jsx>{`
        /* ===================================================
           LOGIQUE PHYSIQUE DE PÉDALAGE RÉALISTE :
           - 0% à 32% : Pédalage actif au sol pour accélérer & cabrer
           - 35% à 48% : EN L'AIR (Saut Kicker) -> PÉDALAGE ARRÊTÉ / FIGÉ
           - 50% à 68% : Réception au sol -> Pédalage réenclenché
           - 70% à 100% : Roue libre en entrant dans l'horloge
           =================================================== */
        @keyframes domPedalLogic {
          0% {
            transform: rotate(0deg);
          }
          32% {
            /* Pédalage intense sur le goudron */
            transform: rotate(1440deg);
          }
          35%, 48% {
            /* 🛑 EN L'AIR : PÉDALAGE TOTALEMENT STOPPÉ / FIGÉ POUR ÉQUILIBRE */
            transform: rotate(1440deg);
          }
          50% {
            /* Atterrissage : Reprise du pédalage */
            transform: rotate(1440deg);
          }
          68% {
            transform: rotate(2520deg);
          }
          72%, 100% {
            /* Roue libre entrée horloge */
            transform: rotate(2520deg);
          }
        }

        @keyframes salemPedalLogic {
          0% {
            transform: rotate(0deg);
          }
          34% {
            transform: rotate(1440deg);
          }
          37%, 48% {
            /* 🛑 EN L'AIR : STOP FIGÉ */
            transform: rotate(1440deg);
          }
          52% {
            transform: rotate(1440deg);
          }
          68% {
            transform: rotate(2520deg);
          }
          74%, 100% {
            transform: rotate(2520deg);
          }
        }

        .animate-dom-pedal-cycle {
          animation: domPedalLogic 10s ease-in-out infinite;
        }

        .animate-salem-pedal-cycle {
          animation: salemPedalLogic 10s ease-in-out infinite;
          animation-delay: 2.5s;
        }

        /* Mouvement de flexion de la jambe synchronisé */
        @keyframes domLegFlexLogic {
          0%, 8%, 16%, 24%, 52%, 60%, 68% {
            transform: translateY(0px) scaleY(1);
          }
          4%, 12%, 20%, 28%, 56%, 64% {
            transform: translateY(-3.5px) scaleY(0.93);
          }
          33%, 49%, 72%, 100% {
            /* 🛑 Jambe fixe et stable en l'air */
            transform: translateY(0px) scaleY(1);
          }
        }

        .animate-dom-leg-motion {
          animation: domLegFlexLogic 10s ease-in-out infinite;
        }

        .animate-salem-leg-motion {
          animation: domLegFlexLogic 10s ease-in-out infinite;
          animation-delay: 2.5s;
        }

        /* ===================================================
           FIGURE : SE METTRE DEBOUT SUR LE VÉLO (STAND-UP)
           =================================================== */
        @keyframes standingAction {
          0%, 12%, 45%, 100% {
            transform: translateY(0px);
          }
          16%, 25% {
            /* SE MET DEBOUT SUR LES PÉDALES */
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

        @keyframes armTrickAction {
          0%, 14%, 27%, 100% {
            opacity: 0;
            transform: scale(0.6);
          }
          17%, 24% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-dom-arm-trick {
          animation: armTrickAction 10s ease-in-out infinite;
          transform-origin: 55px 18px;
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
            left: 5%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          14% {
            /* FIGURE 1 : DEBOUT SUR LE VÉLO */
            left: 15%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          24% {
            /* FIGURE 2 : VRAI WHEELING ARRIÈRE AU SOL */
            left: 28%;
            opacity: 1;
            transform: translateY(0px) rotate(-35deg);
            transform-origin: 25px 54px;
          }
          33% {
            left: 36%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          38% {
            /* 🚀 ENVOI TREMPLIN : 360 EN L'AIR (SANS PÉDALER) */
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
            /* Relance */
            left: 65%;
            opacity: 1;
            transform: translateY(0px) rotate(-26deg);
            transform-origin: 25px 54px;
          }
          64% {
            left: 78%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          72% {
            /* 🚪 ENTRÉE DANS LA PORTE DE L'HORLOGE */
            left: 88%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(0.95);
          }
          78% {
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
            left: 16%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          26% {
            /* VRAI WHEELING */
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
            /* 🚀 ENVOI TREMPLIN : 360 EN L'AIR (SANS PÉDALER) */
            left: 45%;
            opacity: 1;
            transform: translateY(-46px) rotate(-350deg);
          }
          48% {
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
            /* 🚪 ENTRÉE DANS LA PORTE */
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
