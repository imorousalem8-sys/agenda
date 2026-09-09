import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Alamajonda — Vos rendez-vous, toujours au bon moment",
  description: "Alamajonda est l'application intelligente qui planifie, organise et vous rappelle automatiquement vos rendez-vous par appels vocaux, SMS et notifications.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. En-tête / Navigation */}
      <Navbar />

      {/* 2. Hero Section Principale */}
      <Hero />

      {/* 3. Fonctionnalités Essentielles */}
      <Features />

      {/* 4. Comment ça marche (3 étapes) */}
      <HowItWorks />

      {/* 5. Cas d'usage & Profils */}
      <UseCases />

      {/* 6. Tarification Claire */}
      <Pricing />

      {/* 7. Questions Fréquentes (FAQ) */}
      <FAQ />

      {/* 8. Bannière d'Action Finale */}
      <CTASection />

      {/* 9. Pied de page */}
      <Footer />
    </main>
  );
}
