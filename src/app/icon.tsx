import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
            inset: 0,
            background:
              "radial-gradient(circle at 32% 22%, rgba(255,59,69,0.5), transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#ff3b45",
          }}
        >
          {"</>"}
        </div>
      </div>
    ),
    size,
  );
}
