import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import AutoUpdater from "@/components/AutoUpdater";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://agenda-gamma-orpin.vercel.app"),
  title: {
    default: "Alamajonda — Assistant Vocal IA & Agenda de Précision",
    template: "%s | Alamajonda",
  },
  description:
    "Gérez vos rendez-vous, tâches et rappels avec Alamajonda. L'assistant vocal IA qui vous appelle au bon moment et synchronise votre emploi du temps.",
  keywords: ["agenda", "rappels", "alarme", "calendrier", "rendez-vous", "tâches", "assistant vocal IA"],
  authors: [{ name: "Alamajonda" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Alamajonda",
  },
  openGraph: {
    type: "website",
    title: "Alamajonda — Assistant Vocal IA & Agenda de Précision",
    description: "Ne laissez plus jamais passer un rendez-vous important avec Alamajonda.",
    siteName: "Alamajonda",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "Alamajonda Logo" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d55e0",
  colorScheme: "light",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <AutoUpdater />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
