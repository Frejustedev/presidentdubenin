import type { Effect, GaugeKey, TraitId } from "./types";

export interface TraitDef {
  id: TraitId;
  name: string;
  emoji: string;
  description: string;
  costXP: number;
}

export const TRAITS: TraitDef[] = [
  {
    id: "charisme",
    name: "Charisme",
    emoji: "✨",
    description:
      "+2 sur les gains de Peuple, mais -1 sur les gains de Pouvoir (on parle trop fort pour les cadres).",
    costXP: 100,
  },
  {
    id: "rigueur",
    name: "Rigueur Budgétaire",
    emoji: "💎",
    description:
      "+2 sur les gains de Trésor, mais -1 sur les gains de Peuple (austérité impopulaire).",
    costXP: 100,
  },
  {
    id: "strategie",
    name: "Stratège Militaire",
    emoji: "⚔️",
    description:
      "+2 sur les gains d'Armée, mais -1 sur les gains de Trésor (l'armée coûte cher).",
    costXP: 100,
  },
  {
    id: "animal_politique",
    name: "Animal Politique",
    emoji: "🐍",
    description:
      "+2 sur les gains de Pouvoir, mais -1 sur les gains de Peuple (les manœuvres éclaboussent).",
    costXP: 100,
  },
  {
    id: "vieux_routier",
    name: "Vieux Routier",
    emoji: "🧭",
    description:
      "Cooldown conseillers réduit d'un tour, mais loyauté initiale -10 (ils vous connaissent trop).",
    costXP: 150,
  },
  {
    id: "visionnaire",
    name: "Visionnaire",
    emoji: "👁️",
    description:
      "Débloque le 3e choix sur certaines cartes rares, mais -1 sur les gains de Trésor (projets coûteux).",
    costXP: 200,
  },
];

/**
 * Trade-offs : chaque trait a un bonus principal ET une contrepartie.
 */
export function applyTraitsToEffect(
  fx: Effect,
  activeTraits: TraitId[]
): Effect {
  const result: Effect = { ...fx };
  const posBumps: Partial<Record<GaugeKey, number>> = {};
  const negBumps: Partial<Record<GaugeKey, number>> = {};

  if (activeTraits.includes("charisme")) {
    posBumps.peuple = (posBumps.peuple ?? 0) + 2;
    negBumps.pouvoir = (negBumps.pouvoir ?? 0) + 1;
  }
  if (activeTraits.includes("rigueur")) {
    posBumps.tresor = (posBumps.tresor ?? 0) + 2;
    negBumps.peuple = (negBumps.peuple ?? 0) + 1;
  }
  if (activeTraits.includes("strategie")) {
    posBumps.armee = (posBumps.armee ?? 0) + 2;
    negBumps.tresor = (negBumps.tresor ?? 0) + 1;
  }
  if (activeTraits.includes("animal_politique")) {
    posBumps.pouvoir = (posBumps.pouvoir ?? 0) + 2;
    negBumps.peuple = (negBumps.peuple ?? 0) + 1;
  }
  if (activeTraits.includes("visionnaire")) {
    negBumps.tresor = (negBumps.tresor ?? 0) + 1;
  }

  (["peuple", "tresor", "armee", "pouvoir"] as GaugeKey[]).forEach((g) => {
    const v = result[g] ?? 0;
    if (v > 0 && posBumps[g]) result[g] = v + (posBumps[g] ?? 0);
    if (v > 0 && negBumps[g]) result[g] = (result[g] ?? v) - (negBumps[g] ?? 0);
  });

  return result;
}
