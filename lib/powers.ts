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
    description:
      "+5 Peuple, Trésor, Armée. Mais −5 Pouvoir : les élites n'aiment pas le populisme.",
    tagline: "Quand tout va mal, parlez au pays.",
  },
  {
    id: "referendum",
    name: "Appel au Peuple",
    emoji: "📞",
    description:
      "Annule la dernière décision. Mais −4 Peuple et −2 Pouvoir : on voit que vous hésitez.",
    tagline: "Rattraper une erreur, ça se paie.",
  },
  {
    id: "services",
    name: "Services Secrets",
    emoji: "🕶️",
    description:
      "Révèle les effets exacts du prochain choix. Mais −3 Trésor : les fonds secrets coûtent.",
    tagline: "Le renseignement n'est jamais gratuit.",
  },
  {
    id: "remaniement",
    name: "Remaniement Ministériel",
    emoji: "♻️",
    description:
      "Reset des cooldowns conseillers. Mais −3 Pouvoir et −5 loyautés : vos ministres ne vous pardonnent pas.",
    tagline: "Un nouveau cabinet, une nouvelle méfiance.",
  },
];

export const POWERS_BY_ID: Record<PowerId, Power> = POWERS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<PowerId, Power>
);
