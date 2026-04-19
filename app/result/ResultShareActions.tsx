"use client";

interface Props {
  name: string;
  score: string;
  ending: string;
  endingEmoji: string;
  year: string;
  decisions: string;
  isDaily: boolean;
  seed?: string;
}

export function ResultShareActions({
  name,
  score,
  ending,
  endingEmoji,
  year,
  decisions,
  isDaily,
  seed,
}: Props) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const daily = isDaily && seed
    ? `\n📅 Défi du ${seed.split("-").reverse().join("/")}`
    : "";
  const text = `${name} — ${endingEmoji} ${ending} · Score ${score}/100
Année ${year}/7 · ${decisions} décisions${daily}

Et toi, tu ferais mieux ? 🇧🇯
#LeSeptennat`;

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ text, url, title: "LE SEPTENNAT" });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        alert("Lien copié !");
      }
    } catch {}
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Lien copié !");
    } catch {}
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-2">
      <button onClick={share} className="btn-secondary">
        📤 Partager
      </button>
      <button onClick={copy} className="btn-secondary">
        🔗 Copier le lien
      </button>
    </div>
  );
}
