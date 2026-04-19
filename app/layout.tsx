import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://le-septennat.vercel.app"),
  title: "LE SEPTENNAT — Simulation Présidentielle",
  description:
    "Gouvernez le Bénin pendant 7 ans. Chaque décision compte. Survivrez-vous à votre mandat ?",
  applicationName: "Le Septennat",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Septennat",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "Bénin",
    "jeu",
    "président",
    "simulation",
    "politique",
    "Afrique",
  ],
  authors: [{ name: "Dr. Fréjuste Agboton" }],
  openGraph: {
    title: "LE SEPTENNAT — Simulation Présidentielle du Bénin",
    description:
      "Gouvernez le Bénin pendant 7 ans. Chaque décision compte.",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Septennat",
  },
  twitter: {
    card: "summary_large_image",
    title: "LE SEPTENNAT — Simulation Présidentielle du Bénin",
    description: "Et toi, tu gouvernerais mieux ? 🇧🇯",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1018",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
