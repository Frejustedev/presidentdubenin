import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { ServiceWorkerRegistry } from "@/components/ServiceWorkerRegistry";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="fr"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <ServiceWorkerRegistry />
      </body>
    </html>
  );
}
