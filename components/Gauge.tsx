"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface GaugeProps {
  value: number;
  label: string;
  emoji: string;
  color: string;
  size?: number;
}

export function Gauge({ value, label, emoji, color, size = 68 }: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const critical = clamped <= 20;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={clsx(
          "relative grid place-items-center rounded-full transition",
          critical && "animate-pulse-crit"
        )}
        style={{ width: size, height: size }}
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
      </div>
      <span className="text-[10px] uppercase tracking-[0.15em] text-ink-dim">
        {label}
      </span>
    </div>
  );
}
