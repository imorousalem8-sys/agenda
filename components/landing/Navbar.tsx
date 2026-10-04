"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/75 backdrop-blur-2xl border-b border-white/80 shadow-[0_4px_30px_rgba(37,99,235,0.05)]">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Officiel AlarmAgenda avec la nouvelle icône fournie */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-blue-600/30 group-hover:scale-105 group-hover:shadow-blue-600/40 transition-all duration-300 border border-blue-200/50">
              <Image
                src="/logo.png"
                alt="Logo AlarmAgenda"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#09132b] group-hover:text-blue-600 transition-colors">
                AlarmAgenda
              </span>
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase -mt-0.5">
                Assistant Vocal IA
              </span>
            </div>
          </Link>

          {/* Menu Central translucide avec reflets */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-blue-50/60 backdrop-blur-md border border-blue-100/80 shadow-inner">
            <Link
              href="#fonctionnalites"
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-white/90 transition-all"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#demo-vocale"
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-white/90 transition-all"
            >
              Démo Vocale
            </Link>
            <Link
              href="#comment-ca-marche"
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-white/90 transition-all"
            >
              Fonctionnement
            </Link>
            <Link
              href="#pricing"
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-white/90 transition-all"
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-white/90 transition-all"
            >
              FAQ
            </Link>
          </nav>

          {/* Boutons d'Action */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-white/70 transition-all"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <span>Commencer Gratuitement</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
