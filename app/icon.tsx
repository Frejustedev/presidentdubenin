import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b1018",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F39C12",
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: -1,
          borderRadius: 6,
        }}
      >
        LS
      </div>
    ),
    { ...size }
  );
}
