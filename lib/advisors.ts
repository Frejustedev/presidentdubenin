import type { Category, Effect, GaugeKey } from "./types";
export type { Category };

export type AdvisorId = "peuple" | "tresor" | "armee" | "pouvoir";

export interface Advisor {
  id: AdvisorId;
  name: string;
  title: string;
  archetype: string;
  emoji: string;
  accentColor: string;
  gauge: GaugeKey;
  bias: number; // 0-1, comment le conseiller pondère sa jauge
}

export const ADVISORS: Record<AdvisorId, Advisor> = {
  peuple: {
    id: "peuple",
    name: "Maman Adjovi",
    title: "La Voix du Marché",
    archetype: "Ancienne syndicaliste de Dantokpa",
    emoji: "👵",
    accentColor: "#22d3ee",
    gauge: "peuple",
    bias: 0.85,
  },
  tresor: {
    id: "tresor",
    name: "Dr. Sènou",
    title: "Le Banquier",
    archetype: "Ancien cadre de la BCEAO",
    emoji: "🧓",
    accentColor: "#eab308",
    gauge: "tresor",
    bias: 0.85,
  },
  armee: {
    id: "armee",
    name: "Colonel Baké",
    title: "Le Général",
    archetype: "Vétéran du Nord",
    emoji: "🎖️",
    accentColor: "#ef4444",
    gauge: "armee",
    bias: 0.85,
  },
  pouvoir: {
    id: "pouvoir",
    name: "Maître Dossou",
    title: "L'Éminence Grise",
    archetype: "Constitutionnaliste chevronné",
    emoji: "👨‍⚖️",
    accentColor: "#a855f7",
    gauge: "pouvoir",
    bias: 0.85,
  },
};

export const ADVISORS_LIST: Advisor[] = Object.values(ADVISORS);

export function advisorForCategory(cat: Category): AdvisorId {
  switch (cat) {
    case "PEUPLE":
      return "peuple";
    case "ÉCONOMIE":
      return "tresor";
    case "SÉCURITÉ":
      return "armee";
    case "POUVOIR":
      return "pouvoir";
  }
}

/**
 * Retourne un dialogue pour le conseiller en fonction de :
 * - son archétype (biais)
 * - les effets des deux choix sur sa jauge prioritaire
 * - la loyauté (possibilité de mentir ou se tromper)
 * - la catégorie de l'événement (thème : terrorisme, économie, etc.)
 */
export function advisorAdvice(
  advisorId: AdvisorId,
  choiceA: Effect,
  choiceB: Effect,
  loyalty: number,
  category?: Category
): { text: string; recommends: "a" | "b" | "hesitant" } {
  const adv = ADVISORS[advisorId];
  const myA = choiceA[adv.gauge] ?? 0;
  const myB = choiceB[adv.gauge] ?? 0;
  const diff = myA - myB;

  // Probabilité d'erreur selon loyauté (30% si loyauté=0, 0% si loyauté=100)
  const errorChance = (100 - loyalty) * 0.003;
  const mistaken = Math.random() < errorChance;

  let recommends: "a" | "b" | "hesitant";
  if (Math.abs(diff) < 3) recommends = "hesitant";
  else if (diff > 0) recommends = mistaken ? "b" : "a";
  else recommends = mistaken ? "a" : "b";

  // Dialogues selon archétype
  const LINES: Record<AdvisorId, Record<"a" | "b" | "hesitant", string[]>> = {
    peuple: {
      a: [
        "Mon fils, fais l'option A. Dantokpa va chanter ton nom.",
        "A, je te le dis. Le peuple est fatigué, donne-lui ça.",
        "L'option A c'est la bonne. Écoute les femmes du marché : elles savent.",
      ],
      b: [
        "Fais B, mon enfant. Ce que tu appelles A, c'est une trahison du peuple.",
        "Non, non, non. B. Le peuple ne pardonnera pas l'autre option.",
        "B, et n'hésite pas. Le ventre du peuple parle avant les ministres.",
      ],
      hesitant: [
        "Les deux me rendent nerveuse. Mais le peuple a faim, choisis avec ton cœur.",
        "Ni l'un ni l'autre n'est bon. Fais ce que ta mère ferait à ta place.",
      ],
    },
    tresor: {
      a: [
        "L'option A est fiscalement soutenable. Je la valide.",
        "A. Sans équivoque. B créerait un trou budgétaire que nous ne pourrions combler.",
        "Recommandation : A. Les ratios d'endettement restent acceptables.",
      ],
      b: [
        "B, Monsieur le Président. A est un gouffre financier.",
        "L'option B préserve nos réserves. A nous mettrait en difficulté avec la BCEAO.",
        "Vous demandez l'avis de votre Ministre des Finances ? B, sans hésiter.",
      ],
      hesitant: [
        "Le coût des deux est comparable. Décidez politiquement, pas économiquement.",
        "Les deux options sont équivalentes sur le plan budgétaire.",
      ],
    },
    armee: {
      a: [
        "Chef, A. La force parle une langue que tout le monde comprend.",
        "A, immédiatement. La faiblesse invite l'ennemi.",
        "A. Donnez-moi l'ordre et dans 48 heures c'est réglé.",
      ],
      b: [
        "Chef, B. A ferait de nous des cibles. Ils sentiraient le sang.",
        "Option B. Ce n'est pas le moment de provoquer.",
        "B. On ne tire pas sur ce qu'on ne voit pas bouger.",
      ],
      hesitant: [
        "Chef, aucune option ne me convient. Mais il faut trancher.",
        "Les deux ont leurs risques. Je ferai ce que vous ordonnez.",
      ],
    },
    pouvoir: {
      a: [
        "Monsieur le Président, l'option A est constitutionnellement solide.",
        "A. B exposerait votre mandat à une censure de la Cour.",
        "Sur le plan institutionnel, A est la voie la plus prudente.",
      ],
      b: [
        "Je vous recommande B. A est un coup politique risqué.",
        "B, Monsieur le Président. Préservons les équilibres.",
        "Optez pour B. A ferait s'agiter l'Assemblée contre vous.",
      ],
      hesitant: [
        "Juridiquement, les deux tiennent. C'est un choix politique, à vous.",
        "Les deux options se défendent. Votre intuition vaudra l'avis d'un juriste.",
      ],
    },
  };

  // Dialogues spécifiques à une catégorie d'événement si pertinent
  const CATEGORY_LINES: Partial<
    Record<AdvisorId, Partial<Record<Category, string[]>>>
  > = {
    peuple: {
      SÉCURITÉ: [
        "Mon fils, la guerre fait toujours des veuves. Pense aux mères.",
        "Quand les armes parlent, Dantokpa se tait. Mais elle n'oublie jamais.",
      ],
      ÉCONOMIE: [
        "Le ventre d'abord. Le reste vient après, toujours.",
        "Si les marchés ferment, le peuple se ferme aussi.",
      ],
    },
    tresor: {
      SÉCURITÉ: [
        "Chaque balle tirée coûte le salaire d'un fonctionnaire pendant un mois.",
        "La guerre ruine les nations avant de les sauver, rappelez-vous.",
      ],
      PEUPLE: [
        "La générosité sociale est un luxe qu'il faut financer, pas promettre.",
      ],
    },
    armee: {
      PEUPLE: [
        "Chef, les larmes du peuple séchent ; la faiblesse militaire reste.",
      ],
      ÉCONOMIE: [
        "Chef, sans armée solide, aucune économie ne tient debout.",
      ],
      POUVOIR: [
        "Chef, les institutions ne valent rien si personne ne les défend.",
      ],
    },
    pouvoir: {
      SÉCURITÉ: [
        "Monsieur le Président, l'état d'urgence a un coût constitutionnel.",
      ],
      PEUPLE: [
        "Monsieur le Président, l'opinion change vite ; la Cour, jamais.",
      ],
    },
  };

  // 40% chance de piocher dans le pool catégorie si disponible
  let text: string;
  const catPool = category && CATEGORY_LINES[advisorId]?.[category];
  if (catPool && catPool.length && Math.random() < 0.4) {
    text = catPool[Math.floor(Math.random() * catPool.length)];
  } else {
    const pool = LINES[advisorId][recommends];
    text = pool[Math.floor(Math.random() * pool.length)];
  }
  return { text, recommends };
}
