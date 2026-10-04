import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import AutoUpdater from "@/components/AutoUpdater";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://agenda-gamma-orpin.vercel.app"),
  title: {
    default: "AlarmAgenda — Rappels intelligents",
    template: "%s | AlarmAgenda",
  },
  description:
    "Gérez vos rendez-vous, tâches et rappels avec AlarmAgenda. Ne laissez plus jamais un rendez-vous passer.",
  keywords: ["agenda", "rappels", "alarme", "calendrier", "rendez-vous", "tâches"],
  authors: [{ name: "AlarmAgenda" }],
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
    title: "AlarmAgenda",
  },
  openGraph: {
    type: "website",
    title: "AlarmAgenda — Rappels intelligents",
    description: "Ne laissez plus jamais passer un rendez-vous important.",
    siteName: "AlarmAgenda",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "AlarmAgenda Logo" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0284c7",
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
