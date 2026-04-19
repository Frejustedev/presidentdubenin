import type { GameResult } from "./types";

export interface TitleDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  secret?: boolean;
  category?: "style" | "fin" | "secret" | "progression";
  check: (ctx: TitleContext) => boolean;
}

export interface TitleContext {
  result: GameResult;
  allResults: GameResult[];
}

const countEnding = (all: GameResult[], t: string) =>
  all.filter((r) => r.ending === t).length;

export const TITLES: TitleDef[] = [
  // ============ PROGRESSION ============
  {
    id: "first_term",
    name: "Premier Mandat",
    description: "Terminer votre première partie",
    icon: "🎖️",
    category: "progression",
    check: ({ allResults }) => allResults.length >= 1,
  },
  {
    id: "five_terms",
    name: "Cinq Mandats",
    description: "Terminer 5 parties",
    icon: "🏆",
    category: "progression",
    check: ({ allResults }) => allResults.length >= 5,
  },
  {
    id: "ten_terms",
    name: "Vétéran Politique",
    description: "Terminer 10 parties",
    icon: "🎗️",
    category: "progression",
    check: ({ allResults }) => allResults.length >= 10,
  },
  {
    id: "collector",
    name: "Le Collectionneur",
    description: "Voir 30 événements différents",
    icon: "📚",
    category: "progression",
    check: ({ allResults }) => {
      const s = new Set<number>();
      allResults.forEach((r) =>
        r.keyMoments.forEach((m) => s.add(m.eventId))
      );
      return s.size >= 30;
    },
  },

  // ============ STYLE DE JEU ============
  {
    id: "people_father",
    name: "Père du Peuple",
    description: "Peuple jamais descendu sous 60%",
    icon: "🫶",
    category: "style",
    check: ({ result }) =>
      result.keyMoments.length > 0 &&
      result.keyMoments.every((m) => m.gaugesAfter.peuple >= 60),
  },
  {
    id: "economist",
    name: "L'Économiste",
    description: "Trésor jamais descendu sous 60%",
    icon: "💎",
    category: "style",
    check: ({ result }) =>
      result.keyMoments.length > 0 &&
      result.keyMoments.every((m) => m.gaugesAfter.tresor >= 60),
  },
  {
    id: "warlord",
    name: "Le Faucon",
    description: "Armée jamais descendue sous 60%",
    icon: "🦅",
    category: "style",
    check: ({ result }) =>
      result.keyMoments.length > 0 &&
      result.keyMoments.every((m) => m.gaugesAfter.armee >= 60),
  },
  {
    id: "statesman",
    name: "L'Homme d'État",
    description: "Pouvoir jamais descendu sous 60%",
    icon: "🎩",
    category: "style",
    check: ({ result }) =>
      result.keyMoments.length > 0 &&
      result.keyMoments.every((m) => m.gaugesAfter.pouvoir >= 60),
  },
  {
    id: "iron_fist",
    name: "Main de Fer",
    description: "3 tags autoritaires accumulés",
    icon: "✊",
    category: "style",
    check: ({ result }) =>
      result.tags.filter((t) =>
        ["autoritaire", "repression", "fraude", "repression_presse"].includes(
          t
        )
      ).length >= 3,
  },
  {
    id: "pacifist",
    name: "Le Pacifiste",
    description: "Terminer un septennat entier sans répression",
    icon: "🕊️",
    category: "style",
    check: ({ result }) =>
      result.yearReached >= 7 &&
      !result.tags.some((t) =>
        ["repression", "repression_presse", "repression_etudiants"].includes(
          t
        )
      ),
  },
  {
    id: "diplomat",
    name: "Le Diplomate",
    description: "3 tags de négociation accumulés",
    icon: "🤝",
    category: "style",
    check: ({ result }) =>
      result.tags.filter((t) =>
        [
          "negociation",
          "dialogue_nord",
          "reconciliation",
          "dialogue_religieux",
        ].includes(t)
      ).length >= 3,
  },
  {
    id: "incorruptible",
    name: "L'Incorruptible",
    description: "Refuser toute tentative de corruption",
    icon: "🛡️",
    category: "style",
    check: ({ result }) => result.tags.includes("incorruptible"),
  },
  {
    id: "sovereign",
    name: "Le Souverain",
    description: "Sortir du franc CFA",
    icon: "🇧🇯",
    category: "style",
    check: ({ result }) => result.tags.includes("sortie_cfa"),
  },
  {
    id: "reformer",
    name: "Le Réformateur",
    description: "Dissoudre ou réformer la CRIET",
    icon: "⚖️",
    category: "style",
    check: ({ result }) => result.tags.includes("reforme_justice"),
  },
  {
    id: "populist",
    name: "Le Populiste",
    description: "Accumuler 5 tags pro-peuple",
    icon: "📣",
    category: "style",
    check: ({ result }) =>
      result.tags.filter((t) =>
        [
          "jeunesse_soutien",
          "emploi_jeunes",
          "president_du_peuple",
          "solidarite_climat",
          "sante_invest",
        ].includes(t)
      ).length >= 3,
  },

  // ============ FINS ============
  {
    id: "legend",
    name: "Légende Vivante",
    description: "Obtenir la fin LÉGENDE",
    icon: "👑",
    category: "fin",
    check: ({ result }) => result.ending === "LÉGENDE",
  },
  {
    id: "legend_master",
    name: "Maître de l'Histoire",
    description: "Obtenir LÉGENDE 3 fois",
    icon: "🌟",
    category: "fin",
    check: ({ allResults }) => countEnding(allResults, "LÉGENDE") >= 3,
  },
  {
    id: "transition",
    name: "Passage de Flambeau",
    description: "Organiser une transition démocratique",
    icon: "🤲",
    category: "fin",
    check: ({ result }) => result.ending === "TRANSITION",
  },
  {
    id: "coup_victim",
    name: "Trahi par le Kaki",
    description: "Subir un coup d'État",
    icon: "🪖",
    category: "fin",
    check: ({ result }) => result.ending === "COUP D'ÉTAT",
  },
  {
    id: "coup_trilogy",
    name: "Abonné aux Coups d'État",
    description: "Subir 3 coups d'État",
    icon: "⚔️",
    category: "fin",
    check: ({ allResults }) => countEnding(allResults, "COUP D'ÉTAT") >= 3,
  },
  {
    id: "revolution",
    name: "Le Peuple a Parlé",
    description: "Être renversé par une révolution",
    icon: "🔥",
    category: "fin",
    check: ({ result }) => result.ending === "RÉVOLUTION",
  },
  {
    id: "tyrant",
    name: "Le Tyran",
    description: "Finir en TYRANNIE",
    icon: "⛓️",
    category: "fin",
    check: ({ result }) => result.ending === "TYRANNIE",
  },
  {
    id: "bankrupt",
    name: "Le Gaspilleur",
    description: "Finir en FAILLITE",
    icon: "💸",
    category: "fin",
    check: ({ result }) => result.ending === "FAILLITE",
  },
  {
    id: "exiled",
    name: "L'Exilé",
    description: "Partir en EXIL",
    icon: "✈️",
    category: "fin",
    check: ({ result }) => result.ending === "EXIL",
  },

  // ============ SECRETS ============
  {
    id: "survivor",
    name: "Le Survivant",
    description: "Atteindre l'an 7 avec toutes les jauges sous 25%",
    icon: "🥀",
    secret: true,
    category: "secret",
    check: ({ result }) =>
      result.yearReached >= 7 &&
      Object.values(result.finalGauges).every((g) => g < 25),
  },
  {
    id: "speedrun_loss",
    name: "Le Speedrunner",
    description: "Perdre en moins de 8 décisions",
    icon: "⚡",
    secret: true,
    category: "secret",
    check: ({ result }) =>
      result.decisionsCount < 8 &&
      ["RÉVOLUTION", "FAILLITE", "COUP D'ÉTAT", "EXIL"].includes(
        result.ending
      ),
  },
  {
    id: "oil_sovereign",
    name: "L'Or Noir Béninois",
    description: "Nationaliser le pétrole offshore",
    icon: "🛢️",
    secret: true,
    category: "secret",
    check: ({ result }) => result.tags.includes("petrole_souverain"),
  },
  {
    id: "third_way",
    name: "La Troisième Voie",
    description: "Proposer un nouveau bloc ouest-africain",
    icon: "🌍",
    secret: true,
    category: "secret",
    check: ({ result }) => result.tags.includes("troisieme_voie"),
  },
  {
    id: "crown_abomey",
    name: "Fils d'Abomey",
    description: "Accepter l'épée rituelle du Roi d'Abomey",
    icon: "👑",
    secret: true,
    category: "secret",
    check: ({ result }) => result.tags.includes("legitimite_coutumiere"),
  },
  {
    id: "perfect_end",
    name: "Le Mandat Parfait",
    description: "Terminer l'année 7 avec toutes jauges ≥ 80",
    icon: "💯",
    secret: true,
    category: "secret",
    check: ({ result }) =>
      result.yearReached >= 7 &&
      Object.values(result.finalGauges).every((g) => g >= 80),
  },
  {
    id: "daily_winner",
    name: "Champion du Jour",
    description: "Remporter un défi du jour (score ≥ 70)",
    icon: "📅",
    secret: true,
    category: "secret",
    check: ({ result }) => result.isDailyChallenge === true && result.score >= 70,
  },
  {
    id: "streak_7",
    name: "Une semaine au Palais",
    description: "7 jours de défi consécutifs",
    icon: "🗓️",
    category: "progression",
    check: ({ allResults }) => {
      if (typeof window === "undefined") return false;
      try {
        const raw = localStorage.getItem("septennat_streak_v1");
        if (!raw) return false;
        const parsed = JSON.parse(raw) as { count?: number };
        return (parsed.count ?? 0) >= 7;
      } catch {
        return false;
      }
    },
  },
  {
    id: "streak_30",
    name: "Un mandat complet",
    description: "30 jours de défi consécutifs",
    icon: "📆",
    category: "progression",
    check: () => {
      if (typeof window === "undefined") return false;
      try {
        const raw = localStorage.getItem("septennat_streak_v1");
        if (!raw) return false;
        const parsed = JSON.parse(raw) as { count?: number };
        return (parsed.count ?? 0) >= 30;
      } catch {
        return false;
      }
    },
  },
];

export function checkUnlockedTitles(ctx: TitleContext): TitleDef[] {
  return TITLES.filter((t) => t.check(ctx));
}
