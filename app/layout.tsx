import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LE SEPTENNAT — Simulation Présidentielle",
  description:
    "Gouvernez le Bénin pendant 7 ans. Chaque décision compte. Survivrez-vous à votre mandat ?",
  applicationName: "Le Septennat",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
