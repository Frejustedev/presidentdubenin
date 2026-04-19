import type { GameResult } from "./types";
import { ENDINGS } from "./endings";

export function shareText(result: GameResult): string {
  const ending = ENDINGS[result.ending];
  const lines: Record<string, string> = {
    LÉGENDE: `J'ai gouverné le Bénin pendant 7 ans et je suis devenu(e) une légende. Score : ${result.score}/100.`,
    TRANSITION: `J'ai quitté le pouvoir dans les règles après 7 ans. Passation propre. Score : ${result.score}/100.`,
    PAISIBLE: `Mandat terminé, ni gloire ni scandale. Score : ${result.score}/100.`,
    IMPOPULAIRE: `J'ai fini dans l'indifférence générale. Score : ${result.score}/100. Pas ma meilleure partie.`,
    RÉVOLUTION: `Le peuple m'a chassé(e) du pouvoir. Je ne suis apparemment pas fait(e) pour la politique 😅`,
    FAILLITE: `J'ai ruiné l'économie du Bénin en ${result.yearReached} ans. Désolé les gars 📉`,
    "COUP D'ÉTAT": `J'ai été renversé(e) par l'armée à l'an ${result.yearReached}. Le pouvoir, c'est fragile...`,
    TYRANNIE: `Je suis devenu(e) dictateur. C'est parti d'une bonne intention, je vous jure... 👑`,
    EXIL: `La CEDEAO m'a poussé(e) à l'exil. De Lomé, je regarde le Bénin continuer sans moi.`,
  };

  return `${lines[ending.type]}

🇧🇯 ${ending.emoji} ${ending.type} · Score ${result.score}/100
Année ${result.yearReached}/7 · ${result.decisionsCount} décisions

Et toi, tu ferais mieux ?
👉 https://le-septennat.vercel.app

#LeSeptennat #Bénin2026`;
}

export async function nativeShare(
  result: GameResult,
  imageBlob?: Blob
): Promise<boolean> {
  const text = shareText(result);
  try {
    if (imageBlob && "canShare" in navigator) {
      const file = new File([imageBlob], "le-septennat.png", {
        type: "image/png",
      });
      const nav = navigator as Navigator & {
        canShare?: (d: ShareData) => boolean;
      };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await navigator.share({
          text,
          files: [file],
          title: "LE SEPTENNAT",
        });
        return true;
      }
    }
    if (navigator.share) {
      await navigator.share({ text, title: "LE SEPTENNAT" });
      return true;
    }
  } catch {}

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
