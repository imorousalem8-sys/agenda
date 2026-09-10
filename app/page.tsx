import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CTASection from "@/components/landing/CTASection";
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

      {/* 2. Hero Section avec scène 3D d'espace de travail et IA */}
      <Hero />

      {/* 3. Les 3 Tableaux de 3 Lignes décrivant l'application */}
      <Features />

      {/* 4. Bannière d'action royale */}
      <CTASection />

      {/* 5. Pied de page épuré */}
      <Footer />
    </main>
  );
}
