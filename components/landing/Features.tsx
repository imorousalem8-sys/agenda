import { Volume2, Calendar, Users, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Calendar size={22} strokeWidth={1.5} />,
    title: "Planification intelligente",
    desc: "L'IA analyse vos disponibilités et optimise vos créneaux.",
  },
  {
    icon: <Volume2 size={22} strokeWidth={1.5} />,
    title: "Rappels automatiques",
    desc: "Ne ratez plus aucun rendez-vous grâce aux notifications et appels.",
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: "Gestion des contacts",
    desc: "Gardez tous vos contacts au même endroit.",
  },
  {
    icon: <Shield size={22} strokeWidth={1.5} />,
    title: "Sécurité avancée",
    desc: "Vos données sont protégées et restent privées.",
  },
  {
    icon: <Smartphone size={22} strokeWidth={1.5} />,
    title: "Multi-appareils",
    desc: "Disponible sur mobile, tablette et ordinateur.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[12px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Pourquoi choisir Alamajonda ?
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight">
            Bien plus qu&apos;un simple agenda
          </h2>
          <p className="text-[15px] text-slate-400 mt-3 max-w-xl mx-auto">
            Alamajonda s&apos;occupe de tout : planification, rappels et suivi. Vous vous concentrez sur l&apos;essentiel.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {features.map((feat, i) => (
            <div key={i} className="text-center group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-300">
                {feat.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-slate-800 mb-1.5">{feat.title}</h3>
              <p className="text-[12px] text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
