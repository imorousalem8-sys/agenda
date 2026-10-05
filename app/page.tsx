import ExactIdenticalLanding from "@/components/landing/ExactIdenticalLanding";

export const metadata = {
  title: "Alamajonda — Ne manquez plus aucun rendez-vous important",
  description:
    "L'assistant vocal IA intelligent pour une gestion d'agenda sans effort, précise et automatisée.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased">
      <ExactIdenticalLanding />
    </main>
  );
}
