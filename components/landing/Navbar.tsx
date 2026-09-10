"use client";

import Link from "next/link";
import { Bell, Sparkles, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo AlarmaAgenda avec Glow */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Bell size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  AlarmaAgenda
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  <Sparkles size={10} className="text-cyan-400" />
                  IA Vocale
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden md:inline-block">
                Agenda intelligent &amp; Rappels par appel vocal
              </span>
            </div>
          </Link>

          {/* Actions Droite */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors hidden sm:inline-block"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="relative group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Démarrer gratuitement</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
