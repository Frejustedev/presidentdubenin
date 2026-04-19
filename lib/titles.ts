import type { GameResult, Gauges, PlayedEvent } from "./types";

export interface TitleDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  secret?: boolean;
  check: (ctx: TitleContext) => boolean;
}

export interface TitleContext {
  result: GameResult;
  allResults: GameResult[];
}

export const TITLES: TitleDef[] = [
  {
    id: "first_term",
    name: "Premier Mandat",
    description: "Terminer votre première partie",
    icon: "🎖️",
    check: ({ allResults }) => allResults.length >= 1,
  },
  {
    id: "legend",
    name: "Légende Vivante",
    description: "Obtenir la fin LÉGENDE",
    icon: "👑",
    check: ({ result }) => result.ending === "LÉGENDE",
  },
  {
    id: "survivor",
    name: "Le Survivant",
    description: "Atteindre l'année 7 avec toutes les jauges sous 25%",
    icon: "🥀",
    check: ({ result }) =>
      result.yearReached >= 7 &&
      Object.values(result.finalGauges).every((g) => g < 25),
  },
  {
    id: "people_father",
    name: "Père du Peuple",
    description: "Peuple jamais descendu sous 60% durant la partie",
    icon: "🫶",
    check: ({ result }) =>
      result.keyMoments.every((m) => m.gaugesAfter.peuple >= 60),
  },
  {
    id: "economist",
    name: "L'Économiste",
    description: "Trésor jamais descendu sous 60%",
    icon: "💎",
    check: ({ result }) =>
      result.keyMoments.every((m) => m.gaugesAfter.tresor >= 60),
  },
  {
    id: "iron_fist",
    name: "Main de Fer",
    description: "Accumuler 3 tags autoritaires",
    icon: "✊",
    check: ({ result }) =>
      result.tags.filter((t) =>
        ["autoritaire", "repression", "fraude", "repression_presse"].includes(t)
      ).length >= 3,
  },
  {
    id: "pacifist",
    name: "Le Pacifiste",
    description: "Terminer sans tag répression",
    icon: "🕊️",
    check: ({ result }) =>
      !result.tags.some((t) =>
        ["repression", "repression_presse", "repression_etudiants"].includes(t)
      ) && result.yearReached >= 7,
  },
  {
    id: "diplomat",
    name: "Le Diplomate",
    description: "Accumuler 3 tags de négociation",
    icon: "🤝",
    check: ({ result }) =>
      result.tags.filter((t) =>
        ["negociation", "dialogue_nord", "reconciliation", "dialogue_religieux"].includes(t)
      ).length >= 3,
  },
  {
    id: "incorruptible",
    name: "L'Incorruptible",
    description: "Refuser toute corruption",
    icon: "🛡️",
    check: ({ result }) => result.tags.includes("incorruptible"),
  },
  {
    id: "sovereign",
    name: "Le Souverain",
    description: "Sortir du CFA",
    icon: "🇧🇯",
    check: ({ result }) => result.tags.includes("sortie_cfa"),
  },
  {
    id: "coup_victim",
    name: "Trahi par le Kaki",
    description: "Subir un coup d'État",
    icon: "🪖",
    check: ({ result }) => result.ending === "COUP D'ÉTAT",
  },
  {
    id: "revolution",
    name: "Le Peuple a Parlé",
    description: "Être renversé par une révolution",
    icon: "🔥",
    check: ({ result }) => result.ending === "RÉVOLUTION",
  },
  {
    id: "tyrant",
    name: "Le Tyran",
    description: "Finir en TYRANNIE",
    icon: "⛓️",
    check: ({ result }) => result.ending === "TYRANNIE",
  },
  {
    id: "speedrun_loss",
    name: "Le Speedrunner",
    description: "Perdre en moins de 8 décisions",
    icon: "⚡",
    secret: true,
    check: ({ result }) =>
      result.decisionsCount < 8 &&
      ["RÉVOLUTION", "FAILLITE", "COUP D'ÉTAT", "EXIL"].includes(
        result.ending
      ),
  },
  {
    id: "oil_legacy",
    name: "L'Héritage Pétrolier",
    description: "Découvrir le gisement offshore",
    icon: "🛢️",
    secret: true,
    check: ({ result }) =>
      result.tags.includes("petrole_souverain") ||
      result.tags.includes("petrole_concession"),
  },
  {
    id: "transition",
    name: "Passage de Flambeau",
    description: "Organiser une transition démocratique",
    icon: "🤲",
    check: ({ result }) => result.ending === "TRANSITION",
  },
];

export function checkUnlockedTitles(ctx: TitleContext): TitleDef[] {
  return TITLES.filter((t) => t.check(ctx));
}
