import type { GaugeKey, PlayedEvent } from "./types";
import { EVENTS } from "@/data/events";

export type NewspaperBias = "pro" | "opposition" | "neutre" | "populaire" | "anglais";

export interface Newspaper {
  name: string;
  bias: NewspaperBias;
}

export const NEWSPAPERS: Newspaper[] = [
  { name: "Le Matinal de Cotonou", bias: "pro" },
  { name: "L'Événement Précis", bias: "opposition" },
  { name: "La Gazette du Golfe", bias: "neutre" },
  { name: "Fraternité", bias: "populaire" },
  { name: "The Bénin Herald", bias: "anglais" },
];

export interface JournalEntry {
  year: number;
  newspaper: Newspaper;
  headline: string;
  subheadline: string;
  eventId: number;
  choice: "a" | "b" | "c";
  direction: "positive" | "negative" | "neutral";
}

function dominantGauge(played: PlayedEvent): GaugeKey {
  const diffs = {
    peuple: Math.abs(played.gaugesAfter.peuple - played.gaugesBefore.peuple),
    tresor: Math.abs(played.gaugesAfter.tresor - played.gaugesBefore.tresor),
    armee: Math.abs(played.gaugesAfter.armee - played.gaugesBefore.armee),
    pouvoir: Math.abs(played.gaugesAfter.pouvoir - played.gaugesBefore.pouvoir),
  };
  let max: GaugeKey = "peuple";
  (Object.keys(diffs) as GaugeKey[]).forEach((k) => {
    if (diffs[k] > diffs[max]) max = k;
  });
  return max;
}

function direction(played: PlayedEvent): "positive" | "negative" | "neutral" {
  const g = dominantGauge(played);
  const delta = played.gaugesAfter[g] - played.gaugesBefore[g];
  if (delta > 3) return "positive";
  if (delta < -3) return "negative";
  return "neutral";
}

function pickNewspaper(dir: ReturnType<typeof direction>, year: number): Newspaper {
  // Direction positive → pro-gouv plus probable
  // Direction négative → opposition plus probable
  const pool = [...NEWSPAPERS];
  const rand = Math.abs(Math.sin(year * 13.7)) * pool.length;
  if (dir === "positive") {
    return pool.find((n) => n.bias === "pro") ?? pool[Math.floor(rand) % pool.length];
  }
  if (dir === "negative") {
    return (
      pool.find((n) => n.bias === "opposition") ??
      pool[Math.floor(rand) % pool.length]
    );
  }
  return pool[Math.floor(rand) % pool.length];
}

function headlineFor(
  eventId: number,
  choice: "a" | "b" | "c",
  bias: NewspaperBias,
  dir: ReturnType<typeof direction>
): { headline: string; subheadline: string } {
  const ev = EVENTS.find((e) => e.id === eventId);
  if (!ev) return { headline: "Décision présidentielle", subheadline: "" };
  const c = choice === "a" ? ev.a : choice === "b" ? ev.b : ev.c ?? ev.a;
  const label = c.label;

  // Gabarits selon biais
  if (bias === "pro") {
    return {
      headline: `Le Président agit : « ${label} »`,
      subheadline:
        dir === "positive"
          ? "Une décision saluée par les observateurs"
          : "Un choix audacieux mais nécessaire",
    };
  }
  if (bias === "opposition") {
    return {
      headline:
        dir === "negative"
          ? `« ${label} » : l'opposition dénonce`
          : `Décision contestée : ${label}`,
      subheadline:
        dir === "negative"
          ? "La dérive se confirme, disent les critiques"
          : "Effets inattendus sur la vie quotidienne",
    };
  }
  if (bias === "populaire") {
    return {
      headline: `« ${label} » — Le pays réagit`,
      subheadline:
        dir === "positive"
          ? "Dans les marchés, on commence à espérer"
          : dir === "negative"
          ? "Mécontentement dans plusieurs quartiers"
          : "Une affaire qui divise",
    };
  }
  if (bias === "anglais") {
    return {
      headline: `Benin: "${label}"`,
      subheadline:
        dir === "positive"
          ? "Investors respond cautiously positively"
          : "International observers express concerns",
    };
  }
  return {
    headline: `Palais: ${label}`,
    subheadline: "La décision présidentielle et ses suites",
  };
}

export function buildJournal(history: PlayedEvent[]): JournalEntry[] {
  return [...history]
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5)
    .sort((a, b) => a.year - b.year)
    .map((p) => {
      const dir = direction(p);
      const newspaper = pickNewspaper(dir, p.year);
      const { headline, subheadline } = headlineFor(
        p.eventId,
        p.choice,
        newspaper.bias,
        dir
      );
      return {
        year: p.year,
        newspaper,
        headline,
        subheadline,
        eventId: p.eventId,
        choice: p.choice,
        direction: dir,
      };
    });
}
