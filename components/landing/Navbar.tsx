"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shadow-xs">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Officiel avec l'icône bleue fournie + Texte Alamajonda */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-blue-200/60 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                priority
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#09132b] group-hover:text-blue-700 transition-colors">
              Alamajonda
            </span>
          </Link>

          {/* Menu Central conforme à la maquette */}
          <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-slate-700">
            <Link href="#cartes-presentation" className="hover:text-blue-700 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="hover:text-blue-700 transition-colors">
              Tarifs
            </Link>
            <Link href="#cartes-presentation" className="hover:text-blue-700 transition-colors">
              Solutions
            </Link>
            <Link href="#cartes-presentation" className="hover:text-blue-700 transition-colors">
              Tutoriels
            </Link>
            <Link href="#blog" className="hover:text-blue-700 transition-colors">
              Blog
            </Link>
          </nav>

          {/* Bouton Commencer Gratuitement conforme à la maquette */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
            >
              <span>Commencer Gratuitement</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
