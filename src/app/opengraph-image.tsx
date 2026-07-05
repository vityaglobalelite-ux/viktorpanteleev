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
          background: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 600 }}>{site.latinName}</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#a1a1aa" }}>
          Developer
        </div>
      </div>
    ),
    size,
  );
}
