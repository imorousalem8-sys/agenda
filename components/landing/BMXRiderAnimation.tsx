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
        
        {/* Lignes Blanches & Jaunes de la Route (Marquage au sol) */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-around z-0 px-8">
          <span className="w-10 h-[3px] bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="w-10 h-[3px] bg-white/80 rounded-full" />
          <span className="w-10 h-[3px] bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="w-10 h-[3px] bg-white/80 rounded-full" />
          <span className="w-10 h-[3px] bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
        </div>

        {/* 🚪 PORTAIL GAUCHE : Porte de Sortie Temporelle (Réapparition sur le goudron) */}
        <div className="absolute -left-3 bottom-0 h-16 w-8 rounded-r-2xl bg-gradient-to-r from-slate-950 to-slate-900 border-2 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.7)] flex flex-col items-center justify-center z-10">
          <div className="w-2 h-10 bg-emerald-400/80 rounded-full animate-pulse blur-[1px]" />
          <span className="text-[6px] font-mono font-black text-emerald-300 uppercase tracking-tighter -rotate-90 mt-1">SORTIE</span>
        </div>

        {/* 🛹 Tremplin / Kicker Jump Réaliste */}
        <div className="absolute bottom-0 left-[38%] w-11 h-5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 rounded-tr-md border-r-2 border-t-2 border-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.8)] flex items-center justify-center transform -skew-x-12 z-10">
          <span className="text-[7px] font-mono font-black text-black tracking-tighter">▲ JUMP</span>
        </div>

        {/* 🚪 PORTAIL DROITE : LA PETITE PORTE DE LA GRANDE HORLOGE (Entrée secrète) */}
        <div className="absolute -right-3 bottom-0 h-20 w-12 rounded-l-3xl bg-gradient-to-l from-slate-950 via-slate-900 to-emerald-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.9)] flex flex-col items-center justify-center z-30 overflow-hidden group">
          
          {/* Cadran d'horloge miniature sur la porte */}
          <div className="absolute top-1.5 w-6 h-6 rounded-full border border-emerald-400/80 bg-black/80 flex items-center justify-center animate-spin-slow">
            <div className="w-2.5 h-[1.5px] bg-emerald-400 origin-left rotate-45" />
            <div className="w-1.5 h-[1.5px] bg-cyan-400 origin-left -rotate-90" />
          </div>

          {/* Vantaux de la porte motorisée (S'ouvrent à l'arrivée des riders) */}
          <div className="w-full h-11 mt-6 flex items-center justify-between px-0.5 relative">
            <div className="w-1/2 h-full bg-slate-950 border-r border-cyan-400/60 transition-all duration-300 animate-door-left" />
            <div className="w-1/2 h-full bg-slate-950 border-l border-cyan-400/60 transition-all duration-300 animate-door-right" />
            {/* Faisceau lumineux à l'intérieur de l'horloge */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-cyan-400/50 blur-sm pointer-events-none" />
          </div>

          <span className="text-[6px] font-mono font-black text-cyan-300 uppercase tracking-tighter mt-0.5">HORLOGE IA</span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 1 : "DOM" (Streetwear Veste Bomber, Vrai Wheeling Ancré au Sol) */}
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

        {/* Badge Flottant du Vrai Wheeling */}
        <div className="absolute -top-6 animate-trick-dom-ground px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 rounded text-[9px] font-mono font-black text-emerald-300 opacity-0 whitespace-nowrap shadow-[0_0_10px_rgba(16,185,129,0.8)]">
          🔥 VRAI WHEELING ARRIÈRE
        </div>

        {/* Aura de contact pneu/goudron */}
        <div className="absolute bottom-0 left-2 w-14 h-2 bg-emerald-400/40 rounded-full blur-[2px]" />

        {/* SVG BMX PRO ULTRA-STYLÉ + RIDER HABILLÉ STREETWEAR */}
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
            {/* Pneu gomme épaisse */}
            <circle cx="25" cy="54" r="13" stroke="#090d16" strokeWidth="3" />
            {/* Jante néon */}
            <circle cx="25" cy="54" r="11" stroke="#06b6d4" strokeWidth="2" />
            {/* Disque de frein & Moyeu */}
            <circle cx="25" cy="54" r="4.5" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
            {/* Rayons BMX */}
            <line x1="25" y1="43" x2="25" y2="65" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <line x1="14" y1="54" x2="36" y2="54" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <line x1="17" y1="46" x2="33" y2="62" stroke="#34d399" strokeWidth="1" opacity="0.8" />
            <line x1="17" y1="62" x2="33" y2="46" stroke="#34d399" strokeWidth="1" opacity="0.8" />
          </g>
          {/* Peg arrière (Cale-pied cascadeur) */}
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
          {/* Base & Haubans arrière */}
          <path d="M 25 54 L 46 52 L 25 40 Z" stroke="url(#neonDomBike)" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Triangle avant */}
          <path d="M 46 52 L 70 36 L 46 36 Z" stroke="url(#neonDomBike)" strokeWidth="3.2" strokeLinejoin="round" />
          {/* Tube de direction & Fourche renforcée */}
          <path d="M 70 36 L 78 54" stroke="url(#neonDomBike)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 70 36 L 68 21" stroke="url(#neonDomBike)" strokeWidth="3.2" />

          {/* Tige de Selle & Selle Streetwear Cuir/Néon */}
          <path d="M 46 52 L 40 31" stroke="url(#neonDomBike)" strokeWidth="3" />
          <path d="M 32 29 L 45 31" stroke="#090d16" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 29 L 44 31" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />

          {/* Guidon BMX 4 pièces avec barre de renfort & poignées grip */}
          <path d="M 62 20 L 74 20" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <line x1="63" y1="23" x2="73" y2="23" stroke="#34d399" strokeWidth="1.5" />
          {/* Grips néon aux extrémités */}
          <line x1="62" y1="20" x2="64" y2="20" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="20" x2="74" y2="20" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />

          {/* Pédalier & Chaîne chromée */}
          <circle cx="46" cy="52" r="4.5" fill="#090d16" stroke="#34d399" strokeWidth="2" />
          <line x1="25" y1="54" x2="46" y2="52" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Manivelle & Pédale avec bande réfléchissante */}
          <line x1="46" y1="52" x2="51" y2="61" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="49" y="60" width="5" height="2" rx="1" fill="#10b981" />

          {/* 👕 VÊTEMENTS STREETWEAR DOM (Veste Bomber + Pantalon Cargo + Baskets Chunky) */}
          {/* Jambe arrière & Pantalon Cargo avec poche latérale */}
          <path d="M 42 29 Q 44 45 51 59" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          {/* Bande réfléchissante sur pantalon */}
          <path d="M 45 42 L 48 44" stroke="#34d399" strokeWidth="1.5" />
          {/* Basket montante Sneaker Chunky (Semelle épaisse verte) */}
          <path d="M 49 59 L 57 61" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          <path d="M 50 61 L 57 61" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Veste Bomber Streetwear (Coupe stylée avec col et taille côtelés) */}
          <path d="M 43 27 C 46 17 58 15 62 20 L 53 35 Z" fill="url(#bomberJacketDom)" stroke="#10b981" strokeWidth="1.5" />
          {/* Logo / Blason poitrine */}
          <circle cx="56" cy="22" r="1.5" fill="#38bdf8" />
          {/* Zip central dorure néon */}
          <path d="M 52 18 L 48 30" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bras avec manche de bomber & Poignet de maintien */}
          <path d="M 54 20 L 68 21" stroke="url(#bomberJacketDom)" strokeWidth="5" strokeLinecap="round" />
          {/* Montre connectée au poignet */}
          <rect x="66" y="20" width="2" height="3" fill="#34d399" />
          {/* Main sur le grip */}
          <circle cx="69" cy="21" r="2.2" fill="url(#skinDom)" />

          {/* Tête & Cou */}
          <circle cx="58" cy="13" r="5.5" fill="url(#skinDom)" />

          {/* 🧢 Casquette tournée en arrière Bad Boy (Snapback avec visière arrière) */}
          <path d="M 53 12 C 53 6 63 6 64 12 Z" fill="#10b981" stroke="#06b6d4" strokeWidth="1" />
          {/* Visière incurvée tournée vers l'arrière */}
          <path d="M 53 12 Q 43 13 41 10" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
          {/* Lunettes de soleil noires Bad Boy */}
          <path d="M 58 13 L 63 13" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 2 : "SALEM" (Streetwear Coupe-Vent Cyan, Wheeling & Poursuite) */}
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

        {/* Badge Flottant du Vrai Wheeling */}
        <div className="absolute -top-6 animate-trick-salem-ground px-2 py-0.5 bg-cyan-500/30 border border-cyan-400 rounded text-[9px] font-mono font-black text-cyan-300 opacity-0 whitespace-nowrap shadow-[0_0_10px_rgba(6,182,212,0.8)]">
          ⚡ WHEELING CABRÉ PRO
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

          {/* Roue Arrière Pro */}
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

          {/* Roue Avant Pro */}
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

          {/* Tige & Selle */}
          <path d="M 46 52 L 40 31" stroke="url(#neonSalemBike)" strokeWidth="3" />
          <path d="M 32 29 L 45 31" stroke="#090d16" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 29 L 44 31" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />

          {/* Guidon & Grips */}
          <path d="M 62 20 L 74 20" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
          <line x1="63" y1="23" x2="73" y2="23" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="62" y1="20" x2="64" y2="20" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="20" x2="74" y2="20" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />

          {/* Pédalier & Chaîne */}
          <circle cx="46" cy="52" r="4.5" fill="#090d16" stroke="#06b6d4" strokeWidth="2" />
          <line x1="25" y1="54" x2="46" y2="52" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="46" y1="52" x2="51" y2="61" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="49" y="60" width="5" height="2" rx="1" fill="#06b6d4" />

          {/* 👕 VÊTEMENTS STREETWEAR SALEM (Coupe-Vent Cyan + Jogger + Sneakers) */}
          <path d="M 42 29 Q 44 45 51 59" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <path d="M 45 42 L 48 44" stroke="#a855f7" strokeWidth="1.5" />
          {/* Sneaker Air Cyan */}
          <path d="M 49 59 L 57 61" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
          <path d="M 50 61 L 57 61" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Coupe-vent stylé */}
          <path d="M 43 27 C 46 17 58 15 62 20 L 53 35 Z" fill="url(#windbreakerSalem)" stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="56" cy="22" r="1.5" fill="#a855f7" />
          <path d="M 52 18 L 48 30" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bras */}
          <path d="M 54 20 L 68 21" stroke="url(#windbreakerSalem)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="69" cy="21" r="2.2" fill="url(#skinSalem)" />

          {/* Tête */}
          <circle cx="58" cy="13" r="5.5" fill="url(#skinSalem)" />

          {/* 🧢 Casquette tournée en arrière Cyan Bad Boy */}
          <path d="M 53 12 C 53 6 63 6 64 12 Z" fill="#06b6d4" stroke="#a855f7" strokeWidth="1" />
          <path d="M 53 12 Q 43 13 41 10" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          <path d="M 58 13 L 63 13" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>

      <style jsx>{`
        /* ===================================================
           TRAJET RÉEL SUR LE GOUDRON + VRAIS WHEELINGS + ENTRÉE DANS L'HORLOGE : DOM
           (Sortie du portail gauche -> Roulage au sol sur le bitume ->
            LONG VRAI WHEELING ANCRÉ AU SOL -> Tremplin Kicker ->
            Saut -> Atterrissage sur goudron -> ENTRÉE DANS LA PORTE DE L'HORLOGE)
           =================================================== */
        @keyframes domGroundRide {
          0% {
            /* Sortie du portail gauche directement sur le goudron */
            left: -4%;
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.9);
          }
          6% {
            /* Roulage normal : les 2 roues collées sur le goudron */
            left: 5%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          14% {
            /* DÉBUT DU VRAI WHEELING : Roue arrière collée au goudron, roue avant levée haut */
            left: 14%;
            opacity: 1;
            transform: translateY(0px) rotate(-34deg);
            transform-origin: 25px 54px; /* Pivot parfait sur la roue arrière ! */
          }
          26% {
            /* MAINTIEN DU WHEELING AU SOL SUR PLUSIEURS MÈTRES */
            left: 28%;
            opacity: 1;
            transform: translateY(0px) rotate(-36deg);
            transform-origin: 25px 54px;
          }
          32% {
            /* Repose de la roue avant sur le goudron à l'approche du tremplin */
            left: 35%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          38% {
            /* 🚀 ENVOI SUR TREMPLIN : Décollage en l'air */
            left: 44%;
            opacity: 1;
            transform: translateY(-36px) rotate(-22deg);
          }
          46% {
            /* Atterrissage franc et net sur le goudron */
            left: 54%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          54% {
            /* Mini wheeling de relance au sol vers la grande horloge */
            left: 65%;
            opacity: 1;
            transform: translateY(0px) rotate(-28deg);
            transform-origin: 25px 54px;
          }
          64% {
            /* Roulage à vive allure face à la porte de l'horloge */
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
            /* Absorption à l'intérieur de l'horloge */
            left: 95%;
            opacity: 0;
            transform: translateY(-4px) rotate(0deg) scale(0.65);
          }
          100% {
            /* Transition invisible et réapparition au départ à gauche */
            left: 95%;
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.65);
          }
        }

        /* ===================================================
           TRAJET RÉEL SUR LE GOUDRON + VRAIS WHEELINGS + ENTRÉE DANS L'HORLOGE : SALEM
           =================================================== */
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
          16% {
            /* VRAI WHEELING ARRIÈRE SALEM */
            left: 16%;
            opacity: 1;
            transform: translateY(0px) rotate(-35deg);
            transform-origin: 25px 54px;
          }
          28% {
            /* Maintien wheeling au sol */
            left: 30%;
            opacity: 1;
            transform: translateY(0px) rotate(-38deg);
            transform-origin: 25px 54px;
          }
          34% {
            left: 36%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          40% {
            /* 🚀 ENVOI SUR TREMPLIN */
            left: 45%;
            opacity: 1;
            transform: translateY(-38px) rotate(-24deg);
          }
          48% {
            /* Atterrissage sur le goudron */
            left: 56%;
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
          56% {
            left: 68%;
            opacity: 1;
            transform: translateY(0px) rotate(-26deg);
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

        /* Animation d'ouverture synchronisée des portes de l'horloge */
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

        /* Badges de tricks synchronisés aux wheelings */
        @keyframes popTrickDomGround {
          0%, 12%, 30%, 100% {
            opacity: 0;
            transform: translateY(4px) scale(0.8);
          }
          15%, 27% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes popTrickSalemGround {
          0%, 14%, 32%, 100% {
            opacity: 0;
            transform: translateY(4px) scale(0.8);
          }
          17%, 29% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
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
