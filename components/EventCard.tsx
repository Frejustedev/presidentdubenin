"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useState, useMemo } from "react";
import type { GameEvent, TraitId } from "@/lib/types";
import { useGame } from "@/lib/gameStore";

interface Props {
  event: GameEvent;
  onChoice: (choice: "a" | "b" | "c") => void;
}

const CAT_COLOR: Record<GameEvent["cat"], string> = {
  PEUPLE: "#22d3ee",
  "ÉCONOMIE": "#eab308",
  "SÉCURITÉ": "#ef4444",
  POUVOIR: "#a855f7",
};

export function EventCard({ event, onChoice }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const opacityA = useTransform(x, [-140, -30, 0], [1, 0.45, 0]);
  const opacityB = useTransform(x, [0, 30, 140], [0, 0.45, 1]);
  const [exiting, setExiting] = useState(false);

  const activeTraits = useGame((s) => s.activeTraits);
  const loyalties = useGame((s) => s.loyalties);
  const tags = useGame((s) => s.tags);
  const revealNext = useGame((s) => s.revealNext);

  const hiddenUnlocked = useMemo(() => {
    if (!event.c) return false;
    const c = event.c;
    if (c.unlockTrait && activeTraits.includes(c.unlockTrait as TraitId))
      return true;
    if (
      c.unlockLoyalty &&
      loyalties[c.unlockLoyalty.advisor] >= c.unlockLoyalty.min
    )
      return true;
    if (c.unlockTags && c.unlockTags.every((t) => tags.includes(t))) return true;
    return false;
  }, [event.c, activeTraits, loyalties, tags]);

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (exiting) return;
    const off = info.offset.x;
    const vel = info.velocity.x;
    if (off < -120 || vel < -500) {
      setExiting(true);
      onChoice("a");
    } else if (off > 120 || vel > 500) {
      setExiting(true);
      onChoice("b");
    }
  };

  const catColor = CAT_COLOR[event.cat];

  const fxBadge = (fx: typeof event.a.fx) => {
    if (!revealNext) return null;
    const bits: string[] = [];
    (["peuple", "tresor", "armee", "pouvoir"] as const).forEach((k) => {
      const v = fx[k];
      if (v === undefined || v === 0) return;
      const sign = v > 0 ? "+" : "";
      const emoji =
        k === "peuple"
          ? "👥"
          : k === "tresor"
          ? "💰"
          : k === "armee"
          ? "🛡️"
          : "🏛️";
      bits.push(`${emoji}${sign}${v}`);
    });
    return (
      <div className="text-[10px] text-gold font-mono mt-1">
        {bits.join(" ")}
      </div>
    );
  };

  return (
    <motion.div
      key={event.id}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={onDragEnd}
      style={{ x, rotate }}
      initial={{ y: 40, scale: 0.95, opacity: 0 }}
      animate={
        exiting
          ? {
              x: x.get() < 0 ? -420 : 420,
              rotate: x.get() < 0 ? -16 : 16,
              opacity: 0,
            }
          : { y: 0, scale: 1, opacity: 1 }
      }
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative panel p-6 w-full select-none touch-pan-y cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="chip"
          style={{
            color: catColor,
            borderColor: `${catColor}55`,
            background: `${catColor}11`,
          }}
        >
          {event.cat}
        </span>
        {event.rarity !== "common" && (
          <span className="text-[10px] uppercase tracking-widest text-gold/80">
            {event.rarity === "legendary"
              ? "★ Légendaire"
              : event.rarity === "rare"
              ? "Rare"
              : "Inhabituel"}
          </span>
        )}
      </div>

      <div className="text-center">
        <div className="text-6xl mb-3" aria-hidden>
          {event.icon}
        </div>
        <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-2 leading-tight">
          {event.title}
        </h2>
        <p className="text-sm text-ink-dim leading-relaxed min-h-[3.5rem]">
          {event.desc}
        </p>
      </div>

      <motion.div
        style={{ opacity: opacityA }}
        className="absolute inset-y-0 left-0 w-16 rounded-l-card bg-gradient-to-r from-white/10 to-transparent pointer-events-none grid place-items-center"
      >
        <span className="text-2xl">👈</span>
      </motion.div>
      <motion.div
        style={{ opacity: opacityB }}
        className="absolute inset-y-0 right-0 w-16 rounded-r-card bg-gradient-to-l from-white/10 to-transparent pointer-events-none grid place-items-center"
      >
        <span className="text-2xl">👉</span>
      </motion.div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            if (!exiting) {
              setExiting(true);
              onChoice("a");
            }
          }}
          className="text-left bg-bg-elevated border border-white/10 rounded-2xl p-3
                     hover:border-gold/40 transition active:scale-[0.98]"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-dim">
            ← A
          </div>
          <div className="text-sm font-medium text-ink mt-1">
            {event.a.label}
          </div>
          {fxBadge(event.a.fx)}
        </button>
        <button
          onClick={() => {
            if (!exiting) {
              setExiting(true);
              onChoice("b");
            }
          }}
          className="text-right bg-bg-elevated border border-white/10 rounded-2xl p-3
                     hover:border-gold/40 transition active:scale-[0.98]"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-dim">
            B →
          </div>
          <div className="text-sm font-medium text-ink mt-1">
            {event.b.label}
          </div>
          {fxBadge(event.b.fx)}
        </button>
      </div>

      {event.c && hiddenUnlocked && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            if (!exiting) {
              setExiting(true);
              onChoice("c");
            }
          }}
          className="mt-2 w-full text-center rounded-2xl p-3 border-2 transition active:scale-[0.98]"
          style={{
            borderColor: "#F39C12",
            background:
              "linear-gradient(180deg, rgba(243,156,18,0.15), rgba(243,156,18,0.05))",
            boxShadow: "0 0 30px rgba(243,156,18,0.25)",
          }}
        >
          <div className="text-[10px] uppercase tracking-widest text-gold">
            ✨ Option cachée
          </div>
          <div className="text-sm font-bold text-gold mt-1">
            {event.c.label}
          </div>
          {fxBadge(event.c.fx)}
        </motion.button>
      )}
    </motion.div>
  );
}
