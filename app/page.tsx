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
  title: "AlarmAgenda — Ne manquez plus aucun rendez-vous important",
  description: "L'assistant vocal IA intelligent pour une gestion d'agenda sans effort, précise et automatisée.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* 1. Barre de navigation */}
      <Navbar />

      {/* 2. Section Hero principale avec démo vocale interactive */}
      <div className="w-full">
        <Hero />
      </div>

      {/* 3. Les 3 piliers essentiels */}
      <Features />

      {/* 4. Démonstration produit & Alerte visuelle */}
      <ProductShowcase />

      {/* 5. Comment ça marche en 3 étapes */}
      <HowItWorks />

      {/* 6. Tarification claire et transparente */}
      <Pricing />

      {/* 7. Questions Fréquentes */}
      <FAQ />

      {/* 8. Bannière d'appel à l'action */}
      <CTASection />

      {/* 9. Pied de page */}
      <Footer />
    </main>
  );
}
