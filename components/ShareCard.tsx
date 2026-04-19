"use client";

import { forwardRef } from "react";
import type { GameResult } from "@/lib/types";
import { ENDINGS } from "@/lib/endings";

interface Props {
  result: GameResult;
}

/**
 * Composant rendu comme image de partage (via canvas ou screenshot).
 * Dimensions optimisees pour stories IG/WhatsApp et twitter card.
 */
export const ShareCard = forwardRef<HTMLDivElement, Props>(
  function ShareCard({ result }, ref) {
    const ending = ENDINGS[result.ending];
    const bar = (v: number) => {
      const filled = Math.round((v / 100) * 8);
      return "█".repeat(filled) + "░".repeat(8 - filled);
    };

    return (
      <div
        ref={ref}
        className="relative w-[540px] h-[960px] bg-bg-deep overflow-hidden"
        style={{
          fontFamily: "var(--font-sans)",
          background:
            "radial-gradient(ellipse at top, rgba(243,156,18,0.1), transparent 50%), #05080d",
        }}
      >
        <div className="flex h-2">
          <div className="flex-1 bg-benin-green" />
          <div className="flex-1 bg-benin-yellow" />
          <div className="flex-1 bg-benin-red" />
        </div>

        <div className="px-10 py-12 h-full flex flex-col">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.4em] text-gold mb-3">
              🇧🇯 LE SEPTENNAT
            </div>
            <div className="h-[1px] w-16 bg-gold/40 mx-auto" />
          </div>

          <div className="mt-8 text-center">
            <div className="text-ink-dim text-sm uppercase tracking-widest">
              Président(e)
            </div>
            <div
              className="font-display text-3xl font-bold text-ink mt-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {result.playerName}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div
              className="text-[120px] leading-none"
              style={{
                filter: `drop-shadow(0 0 40px ${ending.color}99)`,
              }}
            >
              {ending.emoji}
            </div>
            <div
              className="font-display font-black text-4xl mt-4 tracking-wider"
              style={{
                color: ending.color,
                fontFamily: "Playfair Display, serif",
              }}
            >
              {ending.type}
            </div>
            <div className="italic text-ink-dim text-center mt-2 max-w-xs">
              {ending.subtitle}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-8 text-ink-dim font-mono text-sm">
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span style={{ color: "#22d3ee" }}>
                {bar(result.finalGauges.peuple)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span style={{ color: "#eab308" }}>
                {bar(result.finalGauges.tresor)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span style={{ color: "#ef4444" }}>
                {bar(result.finalGauges.armee)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏛️</span>
              <span style={{ color: "#a855f7" }}>
                {bar(result.finalGauges.pouvoir)}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-ink-dim text-xs uppercase tracking-widest">
              Score final
            </div>
            <div
              className="text-6xl font-bold text-gold font-mono mt-1"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              {result.score}
              <span className="text-ink-faint text-2xl">/100</span>
            </div>
            <div className="text-ink-dim text-sm mt-1">
              Année {result.yearReached}/7 · {result.decisionsCount} décisions
            </div>
          </div>

          <div className="mt-auto pt-8 text-center">
            <div className="text-gold italic font-display text-lg">
              Et toi, tu ferais mieux ?
            </div>
            <div className="mt-3 text-xs text-ink-faint tracking-widest">
              #LeSeptennat · #Bénin2026
            </div>
          </div>
        </div>
      </div>
    );
  }
);
