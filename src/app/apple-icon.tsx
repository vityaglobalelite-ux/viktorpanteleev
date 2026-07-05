import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Латиница вместо кириллицы: дефолтный шрифт ImageResponse не покрывает Cyrillic.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -50,
            width: 130,
            height: 320,
            transform: "rotate(18deg)",
            background:
              "linear-gradient(90deg, rgba(229,35,46,0), rgba(229,35,46,0.55), rgba(229,35,46,0))",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -2,
            color: "#f4f4f5",
          }}
        >
          <div>VP</div>
          <div style={{ color: "#ff3b45" }}>.</div>
        </div>
      </div>
    ),
    size,
  );
}
