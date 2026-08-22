import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgCard({
  eyebrow,
  headline,
  path,
}: {
  eyebrow: string;
  headline: string;
  path: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#16171b",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(238,116,30,0.35), transparent 55%), radial-gradient(circle at 10% 90%, rgba(207,154,63,0.28), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: -1,
              backgroundImage:
                "linear-gradient(100deg, #ffb648 0%, #ffffff 50%, #ffb648 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            WAFI &amp; CO.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 17,
              color: "#cf9a3f",
              letterSpacing: 4,
              marginTop: 8,
            }}
          >
            CHARTERED ACCOUNTANTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              backgroundColor: "#ee741e",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 600,
              padding: "8px 22px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              fontSize: 50,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              maxWidth: 1000,
            }}
          >
            {headline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.55)" }}>
          {`wafiandco.com${path}`}
        </div>
      </div>
    ),
    ogImageSize
  );
}
