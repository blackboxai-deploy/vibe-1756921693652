import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSINT Platform - Intelligence Open Source",
  description: "Plateforme professionnelle d'Open Source Intelligence avec outils d'analyse et forum communautaire",
  keywords: "OSINT, intelligence, investigation, analyse, domaine, métadonnées, forum",
  authors: [{ name: "OSINT Team" }],
  openGraph: {
    title: "OSINT Platform - Intelligence Open Source",
    description: "Analysez, enquêtez et collaborez avec notre suite complète d'outils OSINT",
    type: "website",
    locale: "fr_FR"
  },
  robots: {
    index: true,
    follow: true
  },
  viewport: {
    width: "device-width",
    initialScale: 1
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${inter.className} bg-slate-950 antialiased`}>
        <div className="min-h-screen bg-slate-950">
          {children}
        </div>
      </body>
    </html>
  );
}