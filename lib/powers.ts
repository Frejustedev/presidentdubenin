export type PowerId = "discours" | "referendum" | "services" | "remaniement";

export interface Power {
  id: PowerId;
  name: string;
  emoji: string;
  description: string;
  tagline: string;
}

export const POWERS: Power[] = [
  {
    id: "discours",
    name: "Discours à la Nation",
    emoji: "🔥",
    description: "Boost immédiat de toutes les jauges de +5.",
    tagline: "Quand tout va mal, parlez au pays.",
  },
  {
    id: "referendum",
    name: "Appel au Peuple",
    emoji: "📞",
    description: "Annule la dernière décision prise et ses effets.",
    tagline: "Rattraper une erreur, une seule fois.",
  },
  {
    id: "services",
    name: "Services Secrets",
    emoji: "🕶️",
    description: "Révèle les effets exacts du prochain choix (une fois).",
    tagline: "Quand l'instinct ne suffit plus.",
  },
  {
    id: "remaniement",
    name: "Remaniement Ministériel",
    emoji: "♻️",
    description: "Réinitialise les cooldowns des 4 conseillers.",
    tagline: "Un nouveau cabinet, une nouvelle chance.",
  },
];

export const POWERS_BY_ID: Record<PowerId, Power> = POWERS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<PowerId, Power>
);
