"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[septennat]", error);
  }, [error]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl mb-4">⚠️</div>
      <h1 className="font-display text-3xl font-bold text-gold mb-2">
        Une crise imprévue
      </h1>
      <p className="text-ink-dim max-w-md mb-8">
        Le Palais rencontre une difficulté technique. Rafraîchissez ou
        recommencez. Vos données locales sont sauvegardées.
      </p>
      <div className="grid gap-3 w-full max-w-xs">
        <button onClick={reset} className="btn-primary">
          Réessayer
        </button>
        <a href="/" className="btn-secondary">
          Retour à l&apos;accueil
        </a>
      </div>
      {error.digest && (
        <div className="mt-6 text-[10px] font-mono text-ink-faint">
          {error.digest}
        </div>
      )}
    </div>
  );
}
