import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LE SEPTENNAT — Simulation Présidentielle du Bénin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at top, rgba(243,156,18,0.18), transparent 60%), #05080d",
          display: "flex",
          flexDirection: "column",
          color: "#e5e7eb",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", height: 10 }}>
          <div style={{ flex: 1, background: "#008751" }} />
          <div style={{ flex: 1, background: "#FCD116" }} />
          <div style={{ flex: 1, background: "#E8112D" }} />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 80px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 12,
              color: "#F39C12",
              fontWeight: 600,
              marginBottom: 30,
            }}
          >
            🇧🇯 BÉNIN · 2026 — 2033
          </div>

          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              letterSpacing: -2,
              background:
                "linear-gradient(90deg, #F39C12 0%, #FFE082 50%, #F39C12 100%)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1,
            }}
          >
            LE SEPTENNAT
          </div>

          <div
            style={{
              fontSize: 36,
              color: "#9ca3af",
              fontStyle: "italic",
              marginTop: 24,
              textAlign: "center",
            }}
          >
            Gouvernez le Bénin. Chaque décision compte.
          </div>

          <div
            style={{
              display: "flex",
              gap: 60,
              marginTop: 70,
              fontSize: 88,
            }}
          >
            <div>👥</div>
            <div>💰</div>
            <div>🛡️</div>
            <div>🏛️</div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: 24,
            color: "#6b7280",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          SIMULATION PRÉSIDENTIELLE
        </div>
      </div>
    ),
    { ...size }
  );
}
