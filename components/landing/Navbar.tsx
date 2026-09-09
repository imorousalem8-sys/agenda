"use client";

import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Alamajonda */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                Alamajonda
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                Rappels Vocaux & Agenda
              </span>
            </div>
          </Link>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/login"
              className="text-sm font-bold text-slate-700 hover:text-blue-600 px-3 sm:px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5"
            >
              <span>Commencer Gratuitement</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
