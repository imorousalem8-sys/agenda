"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Bell, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Alamajonda
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" />
              </span>
              <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider">
                Rappels & Agenda IA
              </span>
            </div>
          </Link>

          {/* Navigation Links Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors py-1">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors py-1">
              Comment ça marche
            </a>
            <a href="#solutions" className="hover:text-blue-600 transition-colors py-1">
              Solutions
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors py-1">
              Tarifs
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors py-1">
              FAQ
            </a>
          </nav>

          {/* Action Buttons Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-50/70 transition-colors"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5"
            >
              <span>Créer un compte</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-blue-600 px-2.5 py-1.5 rounded-lg bg-blue-50"
            >
              Connexion
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Ouvrir le menu"
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100 space-y-2 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Fonctionnalités
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Comment ça marche
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Tarifs
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              FAQ
            </a>
            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
              >
                <span>Créer un compte gratuitement</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
