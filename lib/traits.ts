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
    description: "+2 sur tous les effets positifs pour le Peuple.",
    costXP: 100,
  },
  {
    id: "rigueur",
    name: "Rigueur Budgétaire",
    emoji: "💎",
    description: "+2 sur tous les effets positifs pour le Trésor.",
    costXP: 100,
  },
  {
    id: "strategie",
    name: "Stratège Militaire",
    emoji: "⚔️",
    description: "+2 sur tous les effets positifs pour l'Armée.",
    costXP: 100,
  },
  {
    id: "animal_politique",
    name: "Animal Politique",
    emoji: "🐍",
    description: "+2 sur tous les effets positifs pour le Pouvoir.",
    costXP: 100,
  },
  {
    id: "vieux_routier",
    name: "Vieux Routier",
    emoji: "🧭",
    description: "Cooldown conseillers réduit d'un tour.",
    costXP: 150,
  },
  {
    id: "visionnaire",
    name: "Visionnaire",
    emoji: "👁️",
    description: "Débloque le 3e choix sur certaines cartes rares.",
    costXP: 200,
  },
];

export function applyTraitsToEffect(
  fx: Effect,
  activeTraits: TraitId[]
): Effect {
  const result: Effect = { ...fx };
  const bumps: Partial<Record<GaugeKey, number>> = {};
  if (activeTraits.includes("charisme")) bumps.peuple = 2;
  if (activeTraits.includes("rigueur")) bumps.tresor = 2;
  if (activeTraits.includes("strategie")) bumps.armee = 2;
  if (activeTraits.includes("animal_politique")) bumps.pouvoir = 2;

  (Object.keys(bumps) as GaugeKey[]).forEach((g) => {
    const v = result[g] ?? 0;
    if (v > 0) result[g] = v + (bumps[g] ?? 0);
  });

  return result;
}
