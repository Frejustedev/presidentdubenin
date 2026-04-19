import Link from "next/link";
import type { Metadata } from "next";
import { FlagBar } from "@/components/FlagBar";

export const metadata: Metadata = {
  title: "À propos — Le Septennat",
  description:
    "Le Septennat est un jeu de simulation présidentielle situé au Bénin. Création de Dr. Fréjuste Agboton.",
};

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />

      <div className="flex-1 px-5 py-8 max-w-md w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="btn-ghost">
            ← Retour
          </Link>
          <h1 className="font-display text-2xl font-bold text-gold">
            À propos
          </h1>
          <div className="w-12" />
        </div>

        <div className="text-center mb-8">
          <div className="text-[11px] tracking-[0.4em] text-gold/80">
            🇧🇯 LE SEPTENNAT
          </div>
          <div className="font-display text-4xl font-black mt-2 shimmer">
            LE SEPTENNAT
          </div>
          <div className="text-ink-dim italic text-sm mt-2">
            Simulation présidentielle du Bénin (2026 — 2033)
          </div>
        </div>

        <section className="space-y-5 text-ink text-[15px] leading-relaxed">
          <p>
            <strong>Le Septennat</strong> vous met dans la peau du président du
            Bénin pour 7 ans de mandat. Quatre jauges — Peuple, Trésor, Armée,
            Pouvoir — cachent leur valeur exacte. Vous gouvernez à l&apos;instinct,
            décision après décision, face à des événements inspirés de
            l&apos;actualité et des enjeux réels du pays.
          </p>

          <p>
            Chaque choix a un coût. Aucune option n&apos;est une bonne réponse.
            Tenez 7 ans, laissez un pays plus fort qu&apos;à votre arrivée — ou
            partez en exil, en révolution, par coup d&apos;État.
          </p>

          <div className="panel p-4">
            <h2 className="font-display text-lg text-gold mb-2">
              Inspirations
            </h2>
            <p className="text-sm text-ink-dim">
              Reigns, Lapse, Democracy 4, Sort The Court. Le Septennat
              revisite le genre pour un public africain : réalisme contextuel,
              chaînes narratives, conseillers archétypaux, journaux fictifs à
              biais politique.
            </p>
          </div>

          <div className="panel p-4">
            <h2 className="font-display text-lg text-gold mb-2">Crédits</h2>
            <p className="text-sm text-ink-dim">
              Conçu et développé par{" "}
              <strong className="text-ink">Dr. Fréjuste Agboton</strong>.
              <br />
              Direction artistique : palette drapeau béninois + or.
              <br />
              Typographies : Playfair Display · DM Sans · DM Mono.
            </p>
          </div>

          <div className="panel p-4">
            <h2 className="font-display text-lg text-gold mb-2">
              Avertissement
            </h2>
            <p className="text-sm text-ink-dim">
              Simulation fictive inspirée de faits réels et prospectifs. Aucun
              nom de personne vivante n&apos;est utilisé. Les événements sont
              des archétypes conçus pour l&apos;expérience ludique et
              pédagogique — pas des prédictions ni des jugements sur des
              personnalités actuelles.
            </p>
          </div>

          <div className="panel p-4">
            <h2 className="font-display text-lg text-gold mb-2">Technique</h2>
            <ul className="text-sm text-ink-dim space-y-1">
              <li>• Next.js 14 · React 18 · TypeScript</li>
              <li>• Tailwind CSS · Framer Motion · Zustand</li>
              <li>• Supabase (classement global)</li>
              <li>• Web Audio API · Web Share API · PWA</li>
              <li>• Hébergement Vercel (gratuit)</li>
            </ul>
          </div>

          <div className="panel p-4">
            <h2 className="font-display text-lg text-gold mb-2">Liens</h2>
            <div className="text-sm text-ink-dim space-y-1">
              <div>
                🌐{" "}
                <a
                  href="https://le-septennat.vercel.app"
                  className="text-gold underline"
                >
                  le-septennat.vercel.app
                </a>
              </div>
              <div>
                🐙{" "}
                <a
                  href="https://github.com/Frejustedev/presidentdubenin"
                  className="text-gold underline"
                >
                  github.com/Frejustedev/presidentdubenin
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-2">
          <Link href="/" className="btn-primary text-center">
            🎮 Jouer
          </Link>
        </div>

        <div className="mt-6 text-center text-[11px] text-ink-faint tracking-widest uppercase">
          v2.0 · © 2026 Dr. Fréjuste Agboton
        </div>
      </div>
    </div>
  );
}
