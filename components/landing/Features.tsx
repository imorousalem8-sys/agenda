"use client";

import { PhoneCall, BellRing, CalendarDays, Users, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
    title: "Rappels par Appel Vocal",
    description: "Recevez un appel téléphonique direct qui vous énonce clairement l'heure, le lieu et l'objet de votre rendez-vous.",
    badge: "Exclusif",
  },
  {
    icon: <BellRing className="w-6 h-6 text-blue-600" />,
    title: "Notifications Multi-Canaux",
    description: "Combinez alertes sonores, notifications push et SMS pour être alerté exactement au bon moment où que vous soyez.",
    badge: "Temps Réel",
  },
  {
    icon: <CalendarDays className="w-6 h-6 text-blue-600" />,
    title: "Planification Simplifiée",
    description: "Une vue calendrier fluide et intuitive pour organiser vos journées, vos semaines et vos rendez-vous récurrents.",
    badge: "Intuitif",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Gestion des Contacts & Lieux",
    description: "Associez vos médecins, clients, collaborateurs ou proches directement à vos événements en un clic.",
    badge: "Complet",
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Rappels Personnalisables",
    description: "Choisissez vos délais favoris : la veille, 2 heures avant, ou 15 minutes avant votre départ.",
    badge: "Sur-Mesure",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "Sécurité & Confidentialité",
    description: "Vos données d'agenda restent strictement privées, chiffrées et protégées selon les normes européennes RGPD.",
    badge: "Sécurisé",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
            FONCTIONNALITÉS ESSENTIELLES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Tout ce dont vous avez besoin pour être toujours à l&apos;heure
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Une interface claire, débarrassée du superflu, conçue pour vous faire gagner du temps et vous apporter une tranquillité d&apos;esprit totale.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 hover:border-blue-400 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
