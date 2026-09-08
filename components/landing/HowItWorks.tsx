export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Créez votre rendez-vous",
      desc: "Ajoutez un événement en quelques secondes. Tapez un titre, une date et laissez l'IA compléter les détails.",
    },
    {
      step: "02",
      title: "Configurez vos rappels",
      desc: "Choisissez comment être rappelé : notification, alarme vocale ou appel automatique, à l'heure qui vous convient.",
    },
    {
      step: "03",
      title: "Ne manquez plus rien",
      desc: "Alamajonda s'occupe de vous alerter au bon moment. Vous arrivez toujours à l'heure, sans stress.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[12px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Comment ça marche
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight">
            Trois étapes simples
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              <div className="text-[3rem] font-black text-slate-100 leading-none mb-3 select-none">
                {item.step}
              </div>
              <h3 className="text-[16px] font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{item.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-6 w-12 border-t border-dashed border-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
