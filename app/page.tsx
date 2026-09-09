import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Alamajonda — Vos rendez-vous, toujours au bon moment",
  description: "Alamajonda est l'assistant vocal IA intelligent pour une gestion d'agenda sans effort, précise et automatisée.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Barre de navigation épurée (Logo & Actions) */}
      <Navbar />

      {/* 2. Hero Section Principale avec Photo & 3 Piliers */}
      <Hero />

      {/* 3. Comment ça marche en 3 étapes */}
      <HowItWorks />

      {/* 4. Solutions adaptées à chaque profil */}
      <UseCases />

      {/* 5. Bannière d'Action Finale */}
      <CTASection />

      {/* 6. Pied de page épuré */}
      <Footer />
    </main>
  );
}
