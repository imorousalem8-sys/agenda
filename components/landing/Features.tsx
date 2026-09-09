"use client";

import { Mic, Calendar, Bell } from "lucide-react";

export default function Features() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-10">
          Votre agenda. Vos rappels. Votre tranquillité.
        </h2>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
              <Mic size={20} strokeWidth={1.8} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Rappels vocaux
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              L&apos;application peut vous rappeler vos <span className="text-slate-800 underline underline-offset-2">rendez-vous</span> avec un message vocal clair et naturel.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
              <Calendar size={20} strokeWidth={1.8} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Agenda intelligent
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Organisez vos rendez-vous, <span className="text-slate-800 underline underline-offset-2">tâches et événements</span> au même endroit.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
              <Bell size={20} strokeWidth={1.8} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Notifications &amp; SMS
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Recevez vos rappels par le canal qui vous convient.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
