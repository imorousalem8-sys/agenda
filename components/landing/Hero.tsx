"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  Radio,
} from "lucide-react";

export default function Hero() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedHours = time ? time.getHours().toString().padStart(2, "0") : "10";
  const formattedMinutes = time ? time.getMinutes().toString().padStart(2, "0") : "09";
  const formattedSeconds = time ? time.getSeconds().toString().padStart(2, "0") : "42";
  const ampm = time && time.getHours() >= 12 ? "PM" : "AM";

  return (
    <section className="relative min-h-[90vh] bg-[#05070c] text-white pt-6 pb-20 overflow-hidden font-sans flex flex-col justify-between">
      {/* Background Matrix & Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top HUD Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
        <div className="flex items-center justify-between py-3 px-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl min-h-[52px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        
        {/* Main Grid: Centered Luxury Watch HUD + Top Right Founder Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SPACER (Col 2 for balance) */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* CENTER COLUMN: The Iconic Glowing Skeleton Watch HUD (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center py-4">
            
            {/* Main Center Container with Glow */}
            <div className="relative flex flex-col items-center group w-full max-w-[480px]">
              
              {/* Emerald Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/35 via-teal-500/25 to-cyan-500/35 rounded-full blur-3xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Watch Outer Ring & Frame */}
              <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[450px] md:h-[450px] rounded-full p-2.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-2xl shadow-black border-4 border-slate-700/80 flex items-center justify-center">
                
                {/* Watch Dial Inner Glass */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#070b10] flex items-center justify-center">
                  
                  {/* High Quality Background Watch Mechanical Visual */}
                  <Image
                    src="/images/dark-hud-watch.jpg"
                    alt="Horlogerie de précision Alamajonda"
                    fill
                    unoptimized={true}
                    className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* High Tech Radial HUD Overlay */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
                </div>
              </div>

              {/* Digital Time & System Sync Badge directly beneath Watch */}
              <div className="mt-5 px-7 py-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-5 text-center">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Clock size={18} className="animate-spin-slow" />
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white">
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}{" "}
                    <span className="text-xs text-emerald-400">{ampm}</span>
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div className="text-left min-w-[70px]">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    Système
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    Synchronisé
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Founder Office Photo (Top Right) (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start items-center lg:items-end">
            
            {/* 📸 Photo Fondateur au bureau - Format soigné, visible et élégant */}
            <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-slate-800 shadow-2xl shadow-black/80 group overflow-hidden w-full max-w-[340px]">
              <div className="relative rounded-[1.35rem] overflow-hidden bg-slate-950 aspect-[16/11]">
                <Image
                  src="/images/founder-desk-official.jpg"
                  alt="Le Fondateur au bureau avec l'application Alamajonda"
                  fill
                  unoptimized={true}
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Headline & Call To Action Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Votre temps, orchestré avec une{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                précision absolue.
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Alamajonda veille sur chaque minute de votre journée et vous appelle directement sur votre téléphone avec une voix ultra-naturelle.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>Accéder à mon agenda</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
