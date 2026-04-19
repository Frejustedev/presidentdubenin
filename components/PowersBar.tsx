"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { POWERS } from "@/lib/powers";
import { sfxPower, vibrate } from "@/lib/audio";

export function PowersBar() {
  const powersUsed = useGame((s) => s.powersUsed);
  const use = useGame((s) => s.usePower);
  const history = useGame((s) => s.history);
  const revealNext = useGame((s) => s.revealNext);

  return (
    <div className="flex items-center justify-between gap-1.5">
      {POWERS.map((p) => {
        const used = powersUsed.includes(p.id);
        const disabled =
          used || (p.id === "referendum" && history.length === 0);
        return (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (disabled) return;
              sfxPower();
              vibrate([30, 20, 40]);
              use(p.id);
            }}
            disabled={disabled}
            className={clsx(
              "flex-1 flex flex-col items-center py-1.5 px-1 rounded-xl border transition",
              used
                ? "opacity-30 grayscale cursor-not-allowed border-white/5 bg-bg-panel/30"
                : "border-gold/20 bg-gold/5 hover:border-gold/50 active:scale-95"
            )}
            title={`${p.name} — ${p.description}`}
          >
            <span className="text-lg">{p.emoji}</span>
            <span className="text-[8px] uppercase tracking-widest text-ink-dim line-clamp-1">
              {p.name.split(" ").slice(-1)[0]}
            </span>
          </motion.button>
        );
      })}
      {revealNext && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[9px] text-gold font-mono uppercase"
        >
          🔍 Actif
        </motion.span>
      )}
    </div>
  );
}
