"use client";

import Link from "next/link";
import { Bell, Sparkles, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo AlarmaAgenda avec Glow */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                <Bell size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 bg-clip-text text-transparent tracking-tight">
                  AlarmaAgenda
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                  <Sparkles size={10} className="text-blue-600" />
                  IA Vocale
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden md:inline-block">
                Agenda intelligent &amp; Rappels par appel vocal
              </span>
            </div>
          </Link>

          {/* Actions Droite */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden sm:inline-block"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="relative group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all duration-200"
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
