"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0B1120] border-b border-slate-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Alamajonda
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#"
              className="text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
            >
              Accueil
            </a>
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#voice-reminders"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Rappels Vocaux
            </a>
            <a
              href="#profiles"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Solutions
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              aria-label="Mode sombre/clair"
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Sun size={18} />
            </button>

            <Link
              href="/login"
              className="text-sm font-semibold text-slate-200 hover:text-white px-3 py-2 transition-colors"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-900 bg-[#BAE6FD] hover:bg-[#93C5FD] shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-200 px-2.5 py-1.5"
            >
              Connexion
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-800/50"
            >
              Accueil
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              Fonctionnalités
            </a>
            <a
              href="#voice-reminders"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              Rappels Vocaux
            </a>
            <a
              href="#profiles"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              Solutions
            </a>
            <div className="pt-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 rounded-full text-sm font-semibold text-slate-900 bg-[#BAE6FD]"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
