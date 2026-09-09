"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Panoramic Blue Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
              Ne laissez plus le temps vous échapper.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Rejoignez AlarmaAgenda et vivez l&apos;expérience de la tranquillité absolue.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] shrink-0"
          >
            <span>Rejoindre AlarmaAgenda</span>
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>
    </section>
  );
}
