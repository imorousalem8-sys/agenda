"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo AlarmaAgenda */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                AlarmaAgenda
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Agenda intelligent • Rappels vocaux • Notifications
              </span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all"
            >
              Commencer gratuitement
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
