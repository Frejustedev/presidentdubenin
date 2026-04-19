import type { Metadata } from "next";
import Link from "next/link";
import { ENDINGS } from "@/lib/endings";
import type { EndingType } from "@/lib/types";
import { FlagBar } from "@/components/FlagBar";
import { ResultShareActions } from "./ResultShareActions";

interface PageProps {
  searchParams: Promise<{
    name?: string;
    score?: string;
    ending?: string;
    year?: string;
    decisions?: string;
    peuple?: string;
    tresor?: string;
    armee?: string;
    pouvoir?: string;
    daily?: string;
    seed?: string;
  }>;
}

function qs(p: Record<string, string | undefined>): string {
  const usp = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    if (v !== undefined) usp.set(k, v);
  });
  return usp.toString();
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const name = sp.name ?? "Anonyme";
  const score = sp.score ?? "0";
  const endingRaw = (sp.ending ?? "PAISIBLE") as EndingType;
  const ending = ENDINGS[endingRaw] ?? ENDINGS.PAISIBLE;

  const image = `/api/og-result?${qs(sp as Record<string, string | undefined>)}`;
  const title = `${name} — ${ending.emoji} ${ending.type} (${score}/100)`;
  const description = `${ending.subtitle}. Et toi, tu ferais mieux ? 🇧🇯`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1080, height: 1080 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ResultPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const name = sp.name ?? "Anonyme";
  const score = sp.score ?? "0";
  const year = sp.year ?? "1";
  const decisions = sp.decisions ?? "0";
  const endingRaw = (sp.ending ?? "PAISIBLE") as EndingType;
  const ending = ENDINGS[endingRaw] ?? ENDINGS.PAISIBLE;
  const isDaily = sp.daily === "1";

  const imageUrl = `/api/og-result?${qs(sp as Record<string, string | undefined>)}`;

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />

      <div className="flex-1 px-5 py-6 max-w-md w-full mx-auto">
        <div className="text-center mb-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
            🇧🇯 LE SEPTENNAT
          </div>
        </div>

        <div className="panel p-4 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`Résultat de ${name}`}
            className="w-full rounded-xl"
          />
        </div>

        <div className="mt-5 text-center">
          <div
            className="text-5xl"
            style={{ filter: `drop-shadow(0 0 16px ${ending.color}80)` }}
          >
            {ending.emoji}
          </div>
          <h1
            className="font-display text-2xl font-black mt-1"
            style={{ color: ending.color }}
          >
            {ending.type}
          </h1>
          <p className="text-ink-dim text-sm italic mt-1">
            {ending.subtitle}
          </p>
          <p className="text-ink mt-4">
            <span className="font-display text-lg">{name}</span>
            <span className="text-ink-dim"> · année {year}/7</span>
          </p>
          <p className="text-gold font-mono text-4xl font-bold mt-2">
            {score}
            <span className="text-ink-faint text-xl">/100</span>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint mt-1">
            {decisions} décisions
            {isDaily && " · 📅 Défi du jour"}
          </p>
        </div>

        <ResultShareActions
          name={name}
          score={score}
          ending={ending.type}
          endingEmoji={ending.emoji}
          year={year}
          decisions={decisions}
          isDaily={isDaily}
          seed={sp.seed}
        />

        <div className="mt-4 grid gap-2">
          <Link href="/" className="btn-primary text-center">
            JOUER MAINTENANT
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-ink-faint italic">
          Un jeu de Dr. Fréjuste Agboton
        </div>
      </div>
    </div>
  );
}
