import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmAgenda — Ne manquez plus aucun rendez-vous important",
  description: "L'assistant vocal IA intelligent pour une gestion d'agenda sans effort, précise et automatisée.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* 1. Navigation bar */}
      <Navbar />

      {/* 2. Hero Section Principale (Copie Conforme 1:1 de la Maquette) */}
      <div className="flex-1 w-full">
        <Hero />
      </div>

      {/* 3. Pied de page */}
      <Footer />
    </main>
  );
}
