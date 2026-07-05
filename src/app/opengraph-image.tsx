import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Латиница вместо кириллицы: дефолтный шрифт ImageResponse не покрывает Cyrillic.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#08080a",
          color: "#f4f4f5",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -80,
            width: 420,
            height: 950,
            transform: "rotate(18deg)",
            background:
              "linear-gradient(90deg, rgba(229,35,46,0), rgba(229,35,46,0.55), rgba(229,35,46,0))",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#ff3b45",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 48, height: 3, background: "#e5232e" }} />
          Developer
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 28 }}>
          {site.latinName}
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 24,
            color: "#9d9da8",
            lineHeight: 1.4,
          }}
        >
          Mobile apps · Telegram Mini Apps · Websites · AI
        </div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#f4f4f5" }}>
          {`30+ projects delivered since ${site.since}`}
        </div>
      </div>
    ),
    size,
  );
}
