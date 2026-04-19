"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { ENDINGS } from "@/lib/endings";
import { loadResults } from "@/lib/storage";
import {
  fetchDailyLeaderboard,
  fetchGlobalLeaderboard,
  type RemoteResult,
} from "@/lib/supabase";
import type { GameResult } from "@/lib/types";

type Tab = "global" | "daily" | "local";

type Row = {
  playerName: string;
  score: number;
  ending: string;
  year: number;
  decisions: number;
  playedAt: number;
};

export function LeaderboardScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const [tab, setTab] = useState<Tab>("global");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      let data: Row[] = [];
      if (tab === "global") {
        const remote = await fetchGlobalLeaderboard();
        data = remote.map(fromRemote);
      } else if (tab === "daily") {
        const remote = await fetchDailyLeaderboard();
        data = remote.map(fromRemote);
      } else {
        data = loadResults().map(fromLocal);
      }
      if (alive) {
        setRows(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [tab]);

  const sorted = [...rows].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen flex flex-col">
      <FlagBar />

      <div className="px-5 py-6 max-w-md w-full mx-auto flex-1">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen("title")} className="btn-ghost">
            ← Retour
          </button>
          <h2 className="font-display text-2xl font-bold text-gold">
            🏆 Classement
          </h2>
          <div className="w-12" />
        </div>

        <div className="flex gap-1 mb-4 p-1 bg-bg-panel/60 rounded-xl border border-white/5">
          <TabBtn id="global" current={tab} onClick={setTab}>
            🌍 Global
          </TabBtn>
          <TabBtn id="daily" current={tab} onClick={setTab}>
            📅 Défi
          </TabBtn>
          <TabBtn id="local" current={tab} onClick={setTab}>
            💾 Moi
          </TabBtn>
        </div>

        {loading ? (
          <div className="text-center text-ink-dim py-10">Chargement…</div>
        ) : sorted.length === 0 ? (
          <div className="text-center text-ink-dim py-10">
            <div className="text-5xl mb-3">
              {tab === "daily" ? "📅" : tab === "global" ? "🌍" : "💾"}
            </div>
            <p className="text-sm">
              {tab === "daily"
                ? "Personne n'a encore joué le défi d'aujourd'hui."
                : tab === "global"
                ? "Aucun score en ligne pour le moment."
                : "Aucune partie locale enregistrée."}
            </p>
            {tab !== "local" && (
              <p className="text-xs text-ink-faint mt-2">
                Le classement en ligne nécessite la configuration Supabase.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((r, idx) => {
              const ending = ENDINGS[r.ending as keyof typeof ENDINGS];
              const medal =
                idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
              return (
                <motion.div
                  key={`${r.playerName}-${r.playedAt}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(idx, 20) * 0.03 }}
                  className="panel p-3 flex items-center gap-3"
                >
                  <div className="w-8 text-center">
                    {medal ?? (
                      <span className="text-ink-faint font-mono text-sm">
                        #{idx + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ink font-medium truncate">
                      {r.playerName}
                    </div>
                    <div className="text-xs text-ink-dim flex items-center gap-1 flex-wrap">
                      <span style={{ color: ending?.color ?? "#e5e7eb" }}>
                        {ending?.emoji ?? "·"} {r.ending}
                      </span>
                      <span>· an {r.year}</span>
                    </div>
                  </div>
                  <div className="font-mono text-gold font-bold text-lg">
                    {r.score}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TabBtn({
  id,
  current,
  onClick,
  children,
}: {
  id: Tab;
  current: Tab;
  onClick: (t: Tab) => void;
  children: React.ReactNode;
}) {
  const active = id === current;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex-1 py-2 rounded-lg text-xs font-medium uppercase tracking-widest transition ${
        active
          ? "bg-gold/20 text-gold"
          : "text-ink-dim hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function fromRemote(r: RemoteResult): Row {
  return {
    playerName: r.player_name,
    score: r.score,
    ending: r.ending_type,
    year: r.year_reached,
    decisions: r.decisions_count,
    playedAt: new Date(r.played_at).getTime(),
  };
}

function fromLocal(r: GameResult): Row {
  return {
    playerName: r.playerName,
    score: r.score,
    ending: r.ending,
    year: r.yearReached,
    decisions: r.decisionsCount,
    playedAt: r.playedAt,
  };
}
