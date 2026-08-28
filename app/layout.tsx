import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "AlarmAgenda — Rappels intelligents",
    template: "%s | AlarmAgenda",
  },
  description:
    "Gérez vos rendez-vous, tâches et rappels avec AlarmAgenda. Ne laissez plus jamais un rendez-vous passer.",
  keywords: ["agenda", "rappels", "alarme", "calendrier", "rendez-vous", "tâches"],
  authors: [{ name: "AlarmAgenda" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AlarmAgenda",
  },
  openGraph: {
    type: "website",
    title: "AlarmAgenda — Rappels intelligents",
    description: "Ne laissez plus jamais passer un rendez-vous important.",
    siteName: "AlarmAgenda",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
