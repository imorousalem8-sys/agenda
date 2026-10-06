import AlarmeAgendaLanding from "@/components/landing/AlarmeAgendaLanding";

export const metadata = {
  title: "AlarmeAgenda — N'oubliez plus jamais ce qui compte",
  description:
    "AlarmeAgenda organise vos rendez-vous, vos tâches et vos rappels, puis vous prévient au bon moment grâce à une expérience pensée pour vous.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#060c18]">
      <AlarmeAgendaLanding />
    </main>
  );
}
