import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TechnicalSupportSection from "@/components/landing/TechnicalSupportSection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmaAgenda — Votre temps, orchestré avec une précision absolue",
  description: "L'assistant intelligent qui veille sur vos rendez-vous et vous appelle directement par téléphone grâce à l'IA vocale.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-white font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Navigation bar */}
      <Navbar />

      {/* 2. Hero Section avec scène 3D épurée */}
      <Hero />

      {/* 3. Service Technique & Assistance */}
      <TechnicalSupportSection />

      {/* 4. Pied de page épuré */}
      <Footer />
    </main>
  );
}
