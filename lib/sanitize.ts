/**
 * Nettoyage du nom de joueur : lettres, chiffres, espaces, tirets, apostrophes.
 * Max 30 caracteres. Rejette les emojis, HTML, scripts.
 */
export function sanitizePlayerName(raw: string): string {
  // Caracteres Unicode : lettres, chiffres, espace, tiret, apostrophe, point
  const cleaned = raw.replace(/[^\p{L}\p{N} .'-]/gu, "");
  // Compacter les espaces multiples + trim final
  const compacted = cleaned.replace(/\s+/g, " ").trim();
  return compacted.slice(0, 30);
}

/**
 * Liste minimale de mots blacklistes (grossieretes FR/EN evidentes).
 * A enrichir cote serveur.
 */
const BLACKLIST = [
  "fuck",
  "shit",
  "bitch",
  "connard",
  "salope",
  "putain",
  "nègre",
  "negro",
  "faggot",
];

export function isBlacklisted(name: string): boolean {
  const lower = name.toLowerCase();
  return BLACKLIST.some((w) => lower.includes(w));
}

export function isValidPlayerName(raw: string): { ok: boolean; reason?: string } {
  const s = sanitizePlayerName(raw);
  if (s.length < 1) return { ok: false, reason: "Nom vide." };
  if (s.length > 30) return { ok: false, reason: "Nom trop long." };
  if (isBlacklisted(s)) return { ok: false, reason: "Nom inapproprié." };
  return { ok: true };
}
