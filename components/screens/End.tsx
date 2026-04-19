"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/lib/gameStore";
import { ENDINGS } from "@/lib/endings";
import { Gauges } from "@/components/Gauges";
import { FlagBar } from "@/components/FlagBar";
import { EVENTS } from "@/data/events";
import {
  loadProfile,
  saveProfile,
  saveResult,
  loadResults,
  unlockTitle,
} from "@/lib/storage";
import { checkUnlockedTitles } from "@/lib/titles";
import type { GameResult } from "@/lib/types";

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
  const resetGame = useGame((s) => s.resetGame);
  const setScreen = useGame((s) => s.setScreen);
  const startGame = useGame((s) => s.startGame);

  const [newTitles, setNewTitles] = useState<string[]>([]);
  const endingDef = ending ? ENDINGS[ending] : ENDINGS.PAISIBLE;

  const keyMoments = useMemo(() => {
    return [...history]
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 5)
      .sort((a, b) => a.year - b.year);
  }, [history]);

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
      keyMoments,
      tags,
    };
    saveResult(result);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const share = async () => {
    const text = `Président(e) ${playerName || "Anonyme"} du Bénin 🇧🇯
Fin : ${endingDef.type} ${endingDef.emoji}
Score : ${score}/100 • Année ${year}/7 • ${decisionsCount} décisions
Et toi, tu ferais mieux ? #LeSeptennat`;
    try {
      if (navigator.share) {
        await navigator.share({ text, title: "LE SEPTENNAT" });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Résumé copié dans le presse-papier !");
      }
    } catch {}
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />

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

        {keyMoments.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-6"
          >
            <div className="text-[10px] tracking-widest text-ink-faint uppercase mb-3 text-center">
              Journal de votre mandat
            </div>
            <div className="space-y-3">
              {keyMoments.map((m, idx) => {
                const ev = EVENTS.find((e) => e.id === m.eventId);
                if (!ev) return null;
                const label = m.choice === "a" ? ev.a.label : ev.b.label;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#1a1410] border border-[#3d2d1f] text-[#e8d7a7]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    <div className="text-[9px] uppercase tracking-widest text-[#b8925a] mb-1">
                      Année {m.year} · La Gazette du Golfe
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      {ev.title}
                    </div>
                    <div className="text-xs mt-1 italic opacity-80">
                      Décision : {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="mt-8 grid gap-3">
          <button
            onClick={() => {
              resetGame();
              startGame();
            }}
            className="btn-primary"
          >
            REJOUER
          </button>
          <button
            onClick={() => setScreen("leaderboard")}
            className="btn-secondary"
          >
            🏆 Classement
          </button>
          <button onClick={share} className="btn-secondary">
            📤 Partager
          </button>
          <button onClick={resetGame} className="btn-ghost">
            Menu principal
          </button>
        </div>
      </div>
    </div>
  );
}
