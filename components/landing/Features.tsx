"use client";

import { Mic, Calendar, Bell } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
          Votre agenda. Vos rappels. Votre tranquillité.
        </h2>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Pillar 1 */}
          <div className="flex flex-col items-center p-6 rounded-2xl transition-all hover:bg-slate-50/80">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-blue-600 shadow-sm">
              <Mic size={26} strokeWidth={1.8} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              Rappels vocaux
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              L&apos;application peut vous rappeler vos <span className="text-slate-800 font-medium underline underline-offset-2">rendez-vous</span> avec un message vocal clair et naturel.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-center p-6 rounded-2xl transition-all hover:bg-slate-50/80">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-blue-600 shadow-sm">
              <Calendar size={26} strokeWidth={1.8} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              Agenda intelligent
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Organisez vos rendez-vous, <span className="text-slate-800 font-medium underline underline-offset-2">tâches et événements</span> au même endroit.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col items-center p-6 rounded-2xl transition-all hover:bg-slate-50/80">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-blue-600 shadow-sm">
              <Bell size={26} strokeWidth={1.8} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              Notifications &amp; SMS
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Recevez vos rappels par le canal qui vous convient.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
