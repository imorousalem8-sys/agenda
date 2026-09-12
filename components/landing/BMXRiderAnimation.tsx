"use client";

import React from "react";

export default function BMXRiderAnimation() {
  return (
    <div className="relative w-full h-16 overflow-visible pointer-events-none select-none my-1">
      {/* Dynamic Runway Laser Rail (Le parcours de ride au-dessus des lettres) */}
      <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-cyan-500/50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-pulse" />
      </div>

      {/* Sparks / Energy Dots along the track */}
      <div className="absolute bottom-1.5 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400 blur-[1px] animate-ping" />
      <div className="absolute bottom-1.5 left-2/3 w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px] animate-ping" />

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 1 : Bad Boy 1 (Casquette en Arrière, BMX Emerald) */}
      {/* ========================================================= */}
      <div className="absolute bottom-1 animate-rider-1 flex items-center z-20">
        {/* Glow Aura under BMX 1 */}
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-emerald-400/25 rounded-full blur-sm" />

        {/* SVG BMX 1 */}
        <svg
          viewBox="0 0 110 75"
          className="w-20 h-14 overflow-visible drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Neon Light Speed Trail */}
          <path
            d="M 2 54 Q 18 50 35 52"
            stroke="url(#trail1)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
          />

          <defs>
            <linearGradient id="neonEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="trail1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="skinTone1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#a97142" />
            </linearGradient>
          </defs>

          {/* === 🚲 BMX BIKE === */}
          {/* Back Wheel (Spinning) */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="12" stroke="#06b6d4" strokeWidth="2.5" />
            <circle cx="25" cy="54" r="3" fill="#34d399" />
            <line x1="25" y1="42" x2="25" y2="66" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
            <line x1="13" y1="54" x2="37" y2="54" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
            <line x1="16" y1="45" x2="34" y2="63" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
            <line x1="16" y1="63" x2="34" y2="45" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          </g>

          {/* Front Wheel (Spinning) */}
          <g className="animate-spin-wheel origin-[75px_54px]">
            <circle cx="75" cy="54" r="12" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="75" cy="54" r="3" fill="#06b6d4" />
            <line x1="75" y1="42" x2="75" y2="66" stroke="#10b981" strokeWidth="1" opacity="0.7" />
            <line x1="63" y1="54" x2="87" y2="54" stroke="#10b981" strokeWidth="1" opacity="0.7" />
            <line x1="66" y1="45" x2="84" y2="63" stroke="#10b981" strokeWidth="1" opacity="0.7" />
            <line x1="66" y1="63" x2="84" y2="45" stroke="#10b981" strokeWidth="1" opacity="0.7" />
          </g>

          {/* Frame & Fork */}
          <path
            d="M 25 54 L 44 52 L 68 36 L 46 36 L 25 54 Z"
            stroke="url(#neonEmerald)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 44 52 L 68 36 L 75 54" stroke="url(#neonEmerald)" strokeWidth="3" strokeLinejoin="round" />
          
          {/* Seat & Handlebars */}
          <path d="M 44 52 L 40 32" stroke="url(#neonEmerald)" strokeWidth="3" />
          <path d="M 33 30 L 45 32" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 30 L 45 32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M 68 36 L 66 22" stroke="url(#neonEmerald)" strokeWidth="3" />
          <path d="M 60 21 L 72 21" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />

          {/* Pedals */}
          <circle cx="44" cy="52" r="3.5" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
          <line x1="44" y1="52" x2="49" y2="60" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="49" cy="60" r="2" fill="#34d399" />

          {/* === 🧢 RIDER 1 (Streetwear + Casquette en Arrière) === */}
          {/* Legs & Shoes */}
          <path d="M 40 30 Q 42 44 49 58" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 47 58 L 54 60" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

          {/* Hoodie Body */}
          <path d="M 42 28 C 45 18 56 16 60 21 L 52 34 Z" fill="#090d16" stroke="#10b981" strokeWidth="1.5" />
          <path d="M 46 23 L 53 27" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

          {/* Arms & Hands */}
          <path d="M 52 21 L 66 23" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="66" cy="23" r="2.5" fill="url(#skinTone1)" />

          {/* Head & Neck */}
          <circle cx="56" cy="14" r="5.5" fill="url(#skinTone1)" />

          {/* 🧢 Backwards Cap (Casquette à l'envers Bad Boy) */}
          <path d="M 51 13 C 51 7 61 7 62 13 Z" fill="#10b981" stroke="#06b6d4" strokeWidth="1" />
          {/* Visière vers l'arrière */}
          <path d="M 51 13 Q 42 14 41 11" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
          {/* Bad Boy Lunettes Noires */}
          <path d="M 56 14 L 61 14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 🚴‍♂️ RIDER 2 : Bad Boy 2 (Casquette Cyan, BMX Cyan & Tricks) */}
      {/* ========================================================= */}
      <div className="absolute bottom-1 animate-rider-2 flex items-center z-10">
        {/* Glow Aura under BMX 2 */}
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-cyan-400/25 rounded-full blur-sm" />

        {/* SVG BMX 2 */}
        <svg
          viewBox="0 0 110 75"
          className="w-20 h-14 overflow-visible drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Neon Light Speed Trail */}
          <path
            d="M 2 54 Q 18 50 35 52"
            stroke="url(#trail2)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
          />

          <defs>
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="trail2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="skinTone2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0ac69" />
              <stop offset="100%" stopColor="#b07d4b" />
            </linearGradient>
          </defs>

          {/* === 🚲 BMX BIKE 2 === */}
          {/* Back Wheel (Spinning) */}
          <g className="animate-spin-wheel origin-[25px_54px]">
            <circle cx="25" cy="54" r="12" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="25" cy="54" r="3" fill="#06b6d4" />
            <line x1="25" y1="42" x2="25" y2="66" stroke="#a855f7" strokeWidth="1" opacity="0.7" />
            <line x1="13" y1="54" x2="37" y2="54" stroke="#a855f7" strokeWidth="1" opacity="0.7" />
            <line x1="16" y1="45" x2="34" y2="63" stroke="#a855f7" strokeWidth="1" opacity="0.7" />
            <line x1="16" y1="63" x2="34" y2="45" stroke="#a855f7" strokeWidth="1" opacity="0.7" />
          </g>

          {/* Front Wheel (Spinning) */}
          <g className="animate-spin-wheel origin-[75px_54px]">
            <circle cx="75" cy="54" r="12" stroke="#06b6d4" strokeWidth="2.5" />
            <circle cx="75" cy="54" r="3" fill="#a855f7" />
            <line x1="75" y1="42" x2="75" y2="66" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
            <line x1="63" y1="54" x2="87" y2="54" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
            <line x1="66" y1="45" x2="84" y2="63" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
            <line x1="66" y1="63" x2="84" y2="45" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          </g>

          {/* Frame & Fork */}
          <path
            d="M 25 54 L 44 52 L 68 36 L 46 36 L 25 54 Z"
            stroke="url(#neonCyan)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 44 52 L 68 36 L 75 54" stroke="url(#neonCyan)" strokeWidth="3" strokeLinejoin="round" />
          
          {/* Seat & Handlebars */}
          <path d="M 44 52 L 40 32" stroke="url(#neonCyan)" strokeWidth="3" />
          <path d="M 33 30 L 45 32" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 33 30 L 45 32" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M 68 36 L 66 22" stroke="url(#neonCyan)" strokeWidth="3" />
          <path d="M 60 21 L 72 21" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />

          {/* Pedals */}
          <circle cx="44" cy="52" r="3.5" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <line x1="44" y1="52" x2="49" y2="60" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="49" cy="60" r="2" fill="#06b6d4" />

          {/* === 🧢 RIDER 2 (Streetwear + Casquette en Arrière Cyan) === */}
          {/* Legs & Shoes */}
          <path d="M 40 30 Q 42 44 49 58" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 47 58 L 54 60" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />

          {/* Hoodie Body */}
          <path d="M 42 28 C 45 18 56 16 60 21 L 52 34 Z" fill="#090d16" stroke="#06b6d4" strokeWidth="1.5" />
          <path d="M 46 23 L 53 27" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />

          {/* Arms & Hands */}
          <path d="M 52 21 L 66 23" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="66" cy="23" r="2.5" fill="url(#skinTone2)" />

          {/* Head & Neck */}
          <circle cx="56" cy="14" r="5.5" fill="url(#skinTone2)" />

          {/* 🧢 Backwards Cap (Casquette Cyan à l'envers Bad Boy) */}
          <path d="M 51 13 C 51 7 61 7 62 13 Z" fill="#06b6d4" stroke="#a855f7" strokeWidth="1" />
          {/* Visière vers l'arrière */}
          <path d="M 51 13 Q 42 14 41 11" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          {/* Bad Boy Lunettes Noires */}
          <path d="M 56 14 L 61 14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <style jsx>{`
        /* --- Animation Rider 1 (Bunny hops & Tricks) --- */
        @keyframes riderOneCourse {
          0% {
            left: -12%;
            transform: translateY(0px) rotate(0deg);
          }
          18% {
            /* Approche et flat ride */
            transform: translateY(0px) rotate(0deg);
          }
          28% {
            /* 1er Grand Bunny Hop au-dessus des lettres */
            transform: translateY(-28px) rotate(-16deg);
          }
          38% {
            /* Apex Trick (Figure en l'air) */
            transform: translateY(-34px) rotate(12deg);
          }
          48% {
            /* Atterrissage en manual */
            transform: translateY(0px) rotate(-5deg);
          }
          62% {
            /* 2ème saut / Grind */
            transform: translateY(-18px) rotate(-10deg);
          }
          72% {
            /* Rétablissement */
            transform: translateY(0px) rotate(0deg);
          }
          85% {
            /* Sprint */
            transform: translateY(0px) rotate(2deg);
          }
          100% {
            left: 108%;
            transform: translateY(0px) rotate(0deg);
          }
        }

        /* --- Animation Rider 2 (Poursuite avec figures décalées) --- */
        @keyframes riderTwoCourse {
          0% {
            left: -18%;
            transform: translateY(0px) rotate(0deg);
          }
          22% {
            /* Wheelie (Roue arrière) */
            transform: translateY(-6px) rotate(-18deg);
          }
          34% {
            /* Descente en vitesse */
            transform: translateY(0px) rotate(0deg);
          }
          44% {
            /* Gros Saut Tailwhip acrobatique */
            transform: translateY(-36px) rotate(18deg);
          }
          54% {
            /* 360 Spin feel */
            transform: translateY(-26px) rotate(-8deg);
          }
          66% {
            /* Réception souple */
            transform: translateY(0px) rotate(0deg);
          }
          80% {
            /* Saut final */
            transform: translateY(-15px) rotate(-12deg);
          }
          100% {
            left: 112%;
            transform: translateY(0px) rotate(0deg);
          }
        }

        .animate-rider-1 {
          animation: riderOneCourse 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-rider-2 {
          animation: riderTwoCourse 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1.8s;
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
          animation: spinWheel 0.45s linear infinite;
        }
      `}</style>
    </div>
  );
}
