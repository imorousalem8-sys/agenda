import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmAgenda — L'Assistant Vocal IA & Agenda Intelligent",
  description: "L'assistant vocal IA qui vous appelle au bon moment et synchronise votre emploi du temps sans aucun retard.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f1f6ff] text-slate-900 font-sans antialiased flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* Texture subtile */}
      <div className="fixed inset-0 bg-[radial-gradient(#3b82f6_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none -z-10" />

      {/* 1. Barre de navigation épurée */}
      <Navbar />

      {/* 2. Hero Stage Grand Format : Visuel Pleine Largeur & Écritures au-dessus */}
      <Hero />

      {/* 3. Les 3 fonctionnalités essentielles (ordonnées, sans blabla) */}
      <Features />

      {/* 4. Tarification claire */}
      <Pricing />

      {/* 5. Appel à l'action final */}
      <CTASection />

      {/* 6. Pied de page sobre */}
      <Footer />
    </main>
  );
}
