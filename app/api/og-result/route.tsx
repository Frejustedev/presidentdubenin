import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { ENDINGS } from "@/lib/endings";
import type { EndingType } from "@/lib/types";

export const runtime = "edge";

const COLORS = {
  peuple: "#22d3ee",
  tresor: "#eab308",
  armee: "#ef4444",
  pouvoir: "#a855f7",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get("name") || "Anonyme").slice(0, 30);
  const score = parseInt(searchParams.get("score") || "0", 10);
  const year = parseInt(searchParams.get("year") || "1", 10);
  const decisions = parseInt(searchParams.get("decisions") || "0", 10);
  const endingRaw = (searchParams.get("ending") || "PAISIBLE") as EndingType;
  const ending = ENDINGS[endingRaw] ?? ENDINGS.PAISIBLE;
  const peuple = clamp(parseInt(searchParams.get("peuple") || "50", 10));
  const tresor = clamp(parseInt(searchParams.get("tresor") || "50", 10));
  const armee = clamp(parseInt(searchParams.get("armee") || "50", 10));
  const pouvoir = clamp(parseInt(searchParams.get("pouvoir") || "50", 10));
  const isDaily = searchParams.get("daily") === "1";
  const seed = searchParams.get("seed") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1080,
          background:
            "radial-gradient(ellipse at top, rgba(243,156,18,0.15), transparent 50%), #05080d",
          color: "#e5e7eb",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", height: 14 }}>
          <div style={{ flex: 1, background: "#008751" }} />
          <div style={{ flex: 1, background: "#FCD116" }} />
          <div style={{ flex: 1, background: "#E8112D" }} />
        </div>

        <div
          style={{
            flex: 1,
            padding: "60px 80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 14,
              color: "#F39C12",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            🇧🇯 LE SEPTENNAT
          </div>
          <div
            style={{
              height: 2,
              width: 80,
              background: "#F39C12",
              opacity: 0.5,
              margin: "20px auto 0",
            }}
          />

          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                textTransform: "uppercase",
                letterSpacing: 6,
                color: "#9ca3af",
              }}
            >
              Président(e)
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#f0ece4",
                marginTop: 12,
              }}
            >
              {name}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <div
              style={{
                fontSize: 200,
                lineHeight: 1,
              }}
            >
              {ending.emoji}
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: 4,
                color: ending.color,
                marginTop: 20,
              }}
            >
              {ending.type}
            </div>
            <div
              style={{
                fontSize: 26,
                fontStyle: "italic",
                color: "#9ca3af",
                marginTop: 12,
                maxWidth: 800,
                textAlign: "center",
              }}
            >
              {ending.subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
              marginTop: 30,
              fontFamily: "monospace",
              fontSize: 28,
            }}
          >
            <GaugeBar emoji="👥" value={peuple} color={COLORS.peuple} />
            <GaugeBar emoji="💰" value={tresor} color={COLORS.tresor} />
            <GaugeBar emoji="🛡️" value={armee} color={COLORS.armee} />
            <GaugeBar emoji="🏛️" value={pouvoir} color={COLORS.pouvoir} />
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                textTransform: "uppercase",
                letterSpacing: 6,
                color: "#9ca3af",
              }}
            >
              Score
            </div>
            <div
              style={{
                fontSize: 110,
                fontWeight: 900,
                color: "#F39C12",
                fontFamily: "monospace",
                marginTop: 8,
              }}
            >
              {score}
              <span style={{ color: "#6b7280", fontSize: 52 }}>/100</span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#9ca3af",
                marginTop: 4,
              }}
            >
              Année {year}/7 · {decisions} décisions
              {isDaily && ` · 📅 Défi ${seed ? seed.split("-").reverse().join("/") : ""}`}
            </div>
          </div>

          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "#F39C12",
              fontSize: 32,
              fontStyle: "italic",
            }}
          >
            Et toi, tu ferais mieux ?
          </div>
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: 18,
              letterSpacing: 4,
              marginTop: 10,
            }}
          >
            #LeSeptennat · #Bénin2026
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}

function clamp(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

function GaugeBar({
  emoji,
  value,
  color,
}: {
  emoji: string;
  value: number;
  color: string;
}) {
  const filled = Math.round((value / 100) * 8);
  const bar = "█".repeat(filled) + "░".repeat(Math.max(0, 8 - filled));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 32 }}>{emoji}</span>
      <span style={{ color, fontFamily: "monospace" }}>{bar}</span>
    </div>
  );
}
