import type { Ending, EndingType, Gauges } from "./types";

export const ENDINGS: Record<EndingType, Ending> = {
  LÉGENDE: {
    type: "LÉGENDE",
    emoji: "👑",
    color: "#F39C12",
    subtitle: "Votre nom est gravé dans l'histoire",
    narrative:
      "Vous avez achevé votre septennat avec panache. Les historiens vous compareront aux grandes figures d'Afrique. Cotonou vous a érigé une statue. Le Bénin est plus fort, plus libre, plus uni.",
  },
  PAISIBLE: {
    type: "PAISIBLE",
    emoji: "🕊️",
    color: "#008751",
    subtitle: "Un mandat sans éclat, sans drame",
    narrative:
      "Vous quittez le pouvoir sans gloire ni scandale. Le pays tourne. Les Béninois vous regrettent déjà... un peu.",
  },
  IMPOPULAIRE: {
    type: "IMPOPULAIRE",
    emoji: "😐",
    color: "#9ca3af",
    subtitle: "Un président qu'on a fini par oublier",
    narrative:
      "Votre mandat s'achève dans l'indifférence. Votre parti a perdu les législatives. Vous partez sans tambour.",
  },
  RÉVOLUTION: {
    type: "RÉVOLUTION",
    emoji: "🔥",
    color: "#E8112D",
    subtitle: "Le peuple vous a chassé",
    narrative:
      "Dantokpa a pris feu. Les marches ont convergé sur la Marina. Vous avez quitté le palais par hélicoptère. Le nom que le peuple vous donne, vous ne l'apprendrez jamais.",
  },
  FAILLITE: {
    type: "FAILLITE",
    emoji: "💸",
    color: "#eab308",
    subtitle: "Les caisses sont vides",
    narrative:
      "La BCEAO a suspendu vos lignes de crédit. Les fonctionnaires ne sont plus payés depuis trois mois. Le FMI impose un plan d'ajustement humiliant. Vous démissionnez.",
  },
  "COUP D'ÉTAT": {
    type: "COUP D'ÉTAT",
    emoji: "🪖",
    color: "#ef4444",
    subtitle: "L'armée a pris le palais",
    narrative:
      "Des chars sont apparus sur le boulevard de la Marina à l'aube. Un général que vous aviez sous-estimé annonce la suspension de la Constitution. Vous êtes assigné à résidence.",
  },
  TYRANNIE: {
    type: "TYRANNIE",
    emoji: "⛓️",
    color: "#a855f7",
    subtitle: "Vous régnez par la peur",
    narrative:
      "Les institutions ne sont plus que des façades. La HAAC a fermé. L'Assemblée applaudit vos décrets. Mais quand vous tomberez, personne ne versera de larme.",
  },
  EXIL: {
    type: "EXIL",
    emoji: "✈️",
    color: "#22d3ee",
    subtitle: "La CEDEAO vous a poussé dehors",
    narrative:
      "Sous pression internationale, vous partez pour le Togo. De Lomé, vous regardez le Bénin continuer sans vous. Certains appellent ça une trahison, d'autres une sagesse.",
  },
  TRANSITION: {
    type: "TRANSITION",
    emoji: "📜",
    color: "#FCD116",
    subtitle: "Vous avez organisé votre succession",
    narrative:
      "Vous avez quitté le pouvoir dans les règles, organisé un scrutin libre, et passé l'écharpe à votre successeur. Un président comme il y en a peu.",
  },
};

export function determineEnding(
  gauges: Gauges,
  year: number,
  tags: string[]
): EndingType {
  const { peuple, tresor, armee, pouvoir } = gauges;

  // Fins prématurées (jauge à zéro)
  if (peuple <= 0) return "RÉVOLUTION";
  if (tresor <= 0) return "FAILLITE";
  if (armee <= 0) return "COUP D'ÉTAT";
  if (pouvoir <= 0) return "EXIL";

  // Fin année 7 : selon les tags et jauges
  if (year >= 7) {
    const score = peuple + tresor + armee + pouvoir;
    const autoritaire = tags.filter((t) =>
      ["autoritaire", "repression", "fraude", "troisieme_mandat"].includes(t)
    ).length;

    if (
      tags.includes("legende") ||
      (score >= 280 && !tags.includes("autoritaire"))
    ) {
      return "LÉGENDE";
    }
    if (autoritaire >= 3 || tags.includes("troisieme_mandat")) {
      return "TYRANNIE";
    }
    if (tags.includes("transition_propre")) return "TRANSITION";
    if (score >= 220) return "PAISIBLE";
    return "IMPOPULAIRE";
  }

  return "PAISIBLE";
}

export function computeScore(
  gauges: Gauges,
  year: number,
  decisionsCount: number,
  ending: EndingType
): number {
  const { peuple, tresor, armee, pouvoir } = gauges;
  const gaugeScore = (peuple + tresor + armee + pouvoir) / 4;
  const yearBonus = year * 4;
  const decisionsBonus = Math.min(decisionsCount * 0.3, 15);

  const endingMultiplier: Record<EndingType, number> = {
    LÉGENDE: 1.35,
    TRANSITION: 1.25,
    PAISIBLE: 1.1,
    IMPOPULAIRE: 0.9,
    TYRANNIE: 0.85,
    EXIL: 0.6,
    "COUP D'ÉTAT": 0.5,
    FAILLITE: 0.45,
    RÉVOLUTION: 0.4,
  };

  return Math.round(
    (gaugeScore + yearBonus + decisionsBonus) * endingMultiplier[ending]
  );
}
