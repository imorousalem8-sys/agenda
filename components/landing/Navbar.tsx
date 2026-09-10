"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo AlarmaAgenda */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Bell size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 leading-tight">
                AlarmaAgenda
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                Agenda intelligent • Rappels vocaux • Notifications
              </span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Commencer gratuitement
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
