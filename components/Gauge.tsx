"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface GaugeProps {
  value: number;
  label: string;
  emoji: string;
  color: string;
  size?: number;
  tooltip?: string;
}

export function Gauge({
  value,
  label,
  emoji,
  color,
  size = 68,
  tooltip,
}: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const critical = clamped <= 20;
  const [delta, setDelta] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev !== value) {
      const d = value - prev;
      if (d !== 0) {
        setDelta(d);
        const id = setTimeout(() => setDelta(null), 1200);
        prevRef.current = value;
        return () => clearTimeout(id);
      }
      prevRef.current = value;
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1 relative">
      <div
        className={clsx(
          "relative grid place-items-center rounded-full transition",
          critical && "animate-pulse-crit",
          tooltip && "cursor-help"
        )}
        style={{ width: size, height: size }}
        onClick={tooltip ? () => setShowTip((s) => !s) : undefined}
        onMouseEnter={tooltip ? () => setShowTip(true) : undefined}
        onMouseLeave={tooltip ? () => setShowTip(false) : undefined}
        role={tooltip ? "button" : undefined}
        aria-label={`${label} : ${clamped}%`}
      >
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={4}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>
        <span className="text-2xl" aria-hidden>
          {emoji}
        </span>
        <AnimatePresence>
          {delta !== null && (
            <motion.span
              key={Date.now()}
              initial={{ opacity: 0, y: 0, scale: 0.9 }}
              animate={{ opacity: 1, y: -26, scale: 1 }}
              exit={{ opacity: 0, y: -36 }}
              transition={{ duration: 1.2 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-xs font-bold pointer-events-none"
              style={{
                color: delta > 0 ? "#22c55e" : "#ef4444",
                textShadow: "0 2px 6px rgba(0,0,0,0.8)",
              }}
            >
              {delta > 0 ? `+${delta}` : delta}
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {tooltip && showTip && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute z-30 top-full mt-2 w-48 p-2 rounded-lg text-[10px] text-ink bg-bg-deep/95 border border-white/10 text-center pointer-events-none shadow-lg"
              role="tooltip"
            >
              {tooltip}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-[0.15em] text-ink-dim">
        {label}
      </span>
    </div>
  );
}
