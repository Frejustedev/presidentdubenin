import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b1018",
          deep: "#05080d",
          panel: "#111827",
          card: "#151c27",
          elevated: "#1a2332",
        },
        gold: {
          DEFAULT: "#F39C12",
          light: "#F5B041",
          dark: "#B9770E",
        },
        benin: {
          green: "#008751",
          yellow: "#FCD116",
          red: "#E8112D",
        },
        gauge: {
          peuple: "#22d3ee",
          tresor: "#eab308",
          armee: "#ef4444",
          pouvoir: "#a855f7",
        },
        ink: {
          DEFAULT: "#e5e7eb",
          dim: "#9ca3af",
          faint: "#6b7280",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        card: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(243,156,18,0.08)",
        glow: "0 0 24px rgba(243,156,18,0.4)",
        critical: "0 0 30px rgba(239,68,68,0.55)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-crit": "pulseCrit 1.2s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.25)" },
        },
        pulseCrit: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(239,68,68,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(239,68,68,0.7)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
