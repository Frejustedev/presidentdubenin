"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useState } from "react";
import type { GameEvent } from "@/lib/types";

interface Props {
  event: GameEvent;
  onChoice: (choice: "a" | "b") => void;
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
      {/* Catégorie */}
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

      {/* Emoji + titre */}
      <div className="text-center">
        <div className="text-6xl mb-3" aria-hidden>
          {event.icon}
        </div>
        <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-2 leading-tight">
          {event.title}
        </h2>
        <p className="text-sm text-ink-dim leading-relaxed min-h-[4rem]">
          {event.desc}
        </p>
      </div>

      {/* Indicateurs latéraux */}
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

      {/* Choix */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (!exiting) {
              setExiting(true);
              onChoice("a");
            }
          }}
          className="group text-left bg-bg-elevated border border-white/10 rounded-2xl p-3
                     hover:border-gold/40 transition active:scale-[0.98]"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-dim">
            ← A
          </div>
          <div className="text-sm font-medium text-ink mt-1">
            {event.a.label}
          </div>
        </button>
        <button
          onClick={() => {
            if (!exiting) {
              setExiting(true);
              onChoice("b");
            }
          }}
          className="group text-right bg-bg-elevated border border-white/10 rounded-2xl p-3
                     hover:border-gold/40 transition active:scale-[0.98]"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-dim">
            B →
          </div>
          <div className="text-sm font-medium text-ink mt-1">
            {event.b.label}
          </div>
        </button>
      </div>

      <div className="mt-3 text-[10px] text-center text-ink-faint">
        Glisser la carte ou cliquer un choix
      </div>
    </motion.div>
  );
}
