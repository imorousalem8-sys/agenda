import { Calendar, Bell, Users, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Calendar size={22} className="text-blue-600" strokeWidth={1.7} />,
    title: "Planification intelligente",
    desc: "L'IA analyse vos disponibilités et optimise vos créneaux.",
  },
  {
    icon: <Bell size={22} className="text-blue-600" strokeWidth={1.7} />,
    title: "Rappels automatiques",
    desc: "Ne ratez plus aucun rendez-vous grâce aux notifications et appels.",
  },
  {
    icon: <Users size={22} className="text-blue-600" strokeWidth={1.7} />,
    title: "Gestion des contacts",
    desc: "Gardez tous vos contacts au même endroit.",
  },
  {
    icon: <Shield size={22} className="text-blue-600" strokeWidth={1.7} />,
    title: "Sécurité avancée",
    desc: "Vos données sont protégées et restent privées.",
  },
  {
    icon: <Smartphone size={22} className="text-blue-600" strokeWidth={1.7} />,
    title: "Multi-appareils",
    desc: "Disponible sur mobile, tablette et ordinateur.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Pretitle */}
        <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
          POURQUOI CHOISIR ALAMAJONDA ?
        </p>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Bien plus qu&apos;un simple agenda
        </h2>

        {/* Section Subtitle */}
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto mb-14 sm:mb-16">
          Alamajonda s&apos;occupe de tout : planification, rappels et suivi. Vous vous concentrez sur l&apos;essentiel.
        </p>

        {/* 5 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 text-center">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group p-4 rounded-2xl transition-all hover:bg-slate-50"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
