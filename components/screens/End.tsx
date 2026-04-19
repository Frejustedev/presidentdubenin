"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGame } from "@/lib/gameStore";
import { ENDINGS } from "@/lib/endings";
import { Gauges } from "@/components/Gauges";
import { FlagBar } from "@/components/FlagBar";
import { Journal } from "@/components/Journal";
import { ShareCard } from "@/components/ShareCard";
import { buildJournal } from "@/lib/journal";
import {
  loadProfile,
  saveProfile,
  saveResult,
  loadResults,
  unlockTitle,
} from "@/lib/storage";
import { checkUnlockedTitles } from "@/lib/titles";
import type { GameResult } from "@/lib/types";
import { nativeShare, shareText } from "@/lib/share";
import { sfxEndingBad, sfxEndingGood, sfxTitleUnlock, vibrate } from "@/lib/audio";
import { submitScoreRemote } from "@/lib/supabase";

export function EndScreen() {
  const gauges = useGame((s) => s.gauges);
  const year = useGame((s) => s.year);
  const decisionsCount = useGame((s) => s.decisionsCount);
  const history = useGame((s) => s.history);
  const tags = useGame((s) => s.tags);
  const ending = useGame((s) => s.ending);
  const score = useGame((s) => s.score);
  const playerName = useGame((s) => s.playerName);
  const startedAt = useGame((s) => s.startedAt);
  const activeTraits = useGame((s) => s.activeTraits);
  const isDaily = useGame((s) => s.isDaily);
  const dailySeed = useGame((s) => s.dailySeed);
  const resetGame = useGame((s) => s.resetGame);
  const setScreen = useGame((s) => s.setScreen);
  const startGame = useGame((s) => s.startGame);

  const [newTitles, setNewTitles] = useState<string[]>([]);
  const [savedResult, setSavedResult] = useState<GameResult | null>(null);
  const endingDef = ending ? ENDINGS[ending] : ENDINGS.PAISIBLE;
  const shareRef = useRef<HTMLDivElement>(null);

  const journal = useMemo(() => buildJournal(history), [history]);

  useEffect(() => {
    if (!ending) return;
    const result: GameResult = {
      playerName: playerName || "Anonyme",
      score,
      ending,
      yearReached: year,
      decisionsCount,
      durationSeconds: startedAt
        ? Math.floor((Date.now() - startedAt) / 1000)
        : 0,
      finalGauges: gauges,
      playedAt: Date.now(),
      keyMoments: [...history].sort((a, b) => b.impact - a.impact).slice(0, 5),
      tags,
      isDailyChallenge: isDaily,
      dailySeed: dailySeed ?? undefined,
      activeTraits,
    };
    saveResult(result);
    setSavedResult(result);
    // Envoi best-effort vers Supabase (fallback local garanti)
    submitScoreRemote(result).catch(() => {});
    const all = loadResults();
    const existing = loadProfile();
    const bestScore = Math.max(score, existing?.bestScore ?? 0);
    saveProfile({
      name: playerName || "Anonyme",
      totalGames: (existing?.totalGames ?? 0) + 1,
      bestScore,
      createdAt: existing?.createdAt ?? Date.now(),
    });

    const unlocked = checkUnlockedTitles({ result, allResults: all });
    const fresh: string[] = [];
    unlocked.forEach((t) => {
      const list = unlockTitle(t.id);
      if (list[list.length - 1] === t.id) fresh.push(t.name);
    });
    setNewTitles(fresh);

    const good = ["LÉGENDE", "TRANSITION", "PAISIBLE"].includes(ending);
    if (good) {
      sfxEndingGood();
      vibrate([80, 40, 120]);
    } else {
      sfxEndingBad();
      vibrate(500);
    }
    if (fresh.length > 0) setTimeout(sfxTitleUnlock, 900);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const share = async () => {
    if (!savedResult) return;
    try {
      const mod = await import("html-to-image");
      if (shareRef.current) {
        const blob = await mod.toBlob(shareRef.current, {
          pixelRatio: 2,
          backgroundColor: "#05080d",
        });
        if (blob) {
          await nativeShare(savedResult, blob);
          return;
        }
      }
    } catch {}
    await nativeShare(savedResult);
  };

  const downloadImage = async () => {
    if (!savedResult) return;
    try {
      const mod = await import("html-to-image");
      if (shareRef.current) {
        const dataUrl = await mod.toPng(shareRef.current, {
          pixelRatio: 2,
          backgroundColor: "#05080d",
        });
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `le-septennat-${savedResult.playerName}.png`;
        a.click();
      }
    } catch {}
  };

  const copyText = async () => {
    if (!savedResult) return;
    try {
      await navigator.clipboard.writeText(shareText(savedResult));
    } catch {}
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />

      {/* Share card off-screen for rendering */}
      <div
        className="absolute -left-[9999px] top-0 pointer-events-none"
        aria-hidden
      >
        {savedResult && <ShareCard ref={shareRef} result={savedResult} />}
      </div>

      <div className="flex-1 px-5 py-6 max-w-md w-full mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center"
        >
          <div
            className="text-7xl mb-2"
            style={{
              filter: `drop-shadow(0 0 24px ${endingDef.color}80)`,
            }}
          >
            {endingDef.emoji}
          </div>
          <h1
            className="font-display text-3xl font-black tracking-wide"
            style={{ color: endingDef.color }}
          >
            {endingDef.type}
          </h1>
          <p className="italic text-ink-dim mt-1">{endingDef.subtitle}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-sm text-ink leading-relaxed text-center"
        >
          {endingDef.narrative}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="panel mt-6 p-4"
        >
          <div className="text-[10px] tracking-widest text-ink-faint uppercase text-center mb-3">
            Jauges finales
          </div>
          <Gauges values={gauges} size={54} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-6 text-center"
        >
          <div className="text-[10px] tracking-widest text-ink-faint uppercase">
            Score
          </div>
          <div className="font-mono text-gold text-5xl font-bold">
            {score}
            <span className="text-ink-faint text-2xl">/100</span>
          </div>
          <div className="text-xs text-ink-dim mt-1">
            Année {year} · {decisionsCount} décisions
            {isDaily && " · Défi du jour"}
          </div>
        </motion.div>

        {newTitles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 panel p-4"
          >
            <div className="text-[10px] tracking-widest text-gold uppercase mb-2">
              Titres débloqués
            </div>
            <div className="space-y-1">
              {newTitles.map((t) => (
                <div key={t} className="text-sm text-ink">
                  🏅 {t}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {journal.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-6"
          >
            <div className="text-[10px] tracking-widest text-ink-faint uppercase mb-3 text-center">
              Revue de presse
            </div>
            <Journal entries={journal} />
          </motion.div>
        )}

        <div className="mt-8 grid gap-2">
          <button
            onClick={() => {
              resetGame();
              startGame();
            }}
            className="btn-primary"
          >
            REJOUER
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={share} className="btn-secondary">
              📤 Partager
            </button>
            <button onClick={downloadImage} className="btn-secondary">
              🖼️ Image
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={copyText} className="btn-secondary">
              📋 Copier
            </button>
            <button
              onClick={() => setScreen("leaderboard")}
              className="btn-secondary"
            >
              🏆 Classement
            </button>
          </div>
          <button onClick={resetGame} className="btn-ghost">
            Menu principal
          </button>
        </div>
      </div>
    </div>
  );
}
