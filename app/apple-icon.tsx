import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at center, rgba(243,156,18,0.2), #0b1018)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F39C12",
          fontSize: 100,
          fontWeight: 900,
          letterSpacing: -4,
          borderRadius: 36,
        }}
      >
        LS
      </div>
    ),
    { ...size }
  );
}
