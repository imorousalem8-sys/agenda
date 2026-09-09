"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo AlarmaAgenda */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Bell size={18} />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              AlarmaAgenda
            </span>
          </Link>

          {/* Right Action */}
          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden sm:inline-block"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 hover:shadow-lg transition-all"
            >
              Démarrer gratuitement
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
