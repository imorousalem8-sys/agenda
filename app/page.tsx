import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import MetricsBar from "@/components/landing/MetricsBar";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import ComparisonTable from "@/components/landing/ComparisonTable";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Alamajonda — L'Assistant Vocal IA & Agenda Intelligent Zéro Retard",
  description:
    "Alamajonda synchronise votre emploi du temps et vous passe un appel vocal intelligent à la seconde précise. Fini les retards et les notifications ignorées.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased selection:bg-[#0d55e0] selection:text-white">
      {/* 1. Header & Navigation (Menus bien centrés au milieu) */}
      <Navbar />

      {/* 2. Hero Stage : Titre, Callout Vocal Audio en Direct & Showcase Application */}
      <Hero />

      {/* 3. Bandeau de Réassurance & Métriques de Ponctualité */}
      <MetricsBar />

      {/* 4. Les Fonctionnalités Essentielles (Appels IA, Agenda, SMS, Copilote) */}
      <Features />

      {/* 5. Comment ça marche en 3 étapes simples */}
      <HowItWorks />

      {/* 6. Comparatif : Agenda Classique vs Alamajonda IA */}
      <ComparisonTable />

      {/* 7. Témoignages & Preuves Sociales Exécutives */}
      <Testimonials />

      {/* 8. Tarification Claire & Rassurante */}
      <Pricing />

      {/* 9. Questions Fréquentes (FAQ Interactive) */}
      <FAQ />

      {/* 10. Appel à l'action final grand format */}
      <CTASection />

      {/* 11. Pied de page structuré et complet */}
      <Footer />
    </main>
  );
}
