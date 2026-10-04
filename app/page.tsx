import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ProductShowcase from "@/components/landing/ProductShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmAgenda — L'Assistant Vocal IA & Agenda Intelligent",
  description: "L'assistant vocal IA haute précision pour une gestion de planning sans effort, des rappels par appel direct et zéro retard garanti.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f1f6ff] text-slate-900 font-sans antialiased flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* Texture de grille subtile en arrière-plan */}
      <div className="fixed inset-0 bg-[radial-gradient(#3b82f6_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none -z-10" />

      {/* 1. Navigation flottante en verre dépoli */}
      <Navbar />

      {/* 2. Hero Stage avec démo vocale interactive */}
      <div className="w-full">
        <Hero />
      </div>

      {/* 3. Les 3 piliers essentiels */}
      <Features />

      {/* 4. Cockpit interactif & Alerte vocale en direct */}
      <ProductShowcase />

      {/* 5. Comment ça marche en 3 étapes */}
      <HowItWorks />

      {/* 6. Tarification claire et transparente */}
      <Pricing />

      {/* 7. Questions Fréquentes */}
      <FAQ />

      {/* 8. Bannière d'appel à l'action */}
      <CTASection />

      {/* 9. Pied de page haut de gamme */}
      <Footer />
    </main>
  );
}
