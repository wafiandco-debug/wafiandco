import { ImageResponse } from "next/og";
import { getInsight } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const alt = "WAFI & CO. Insights article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getInsight(slug);
  const title = post?.title ?? "WAFI & CO. Insights";
  const category = post?.category ?? "Insights";
  const authorName = post?.author_name ?? null;
  const authorPosition = post?.author_position ?? null;
  const authorPhoto = post?.author_photo_url
    ? new URL(post.author_photo_url, siteConfig.url).toString()
    : null;

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
            {category}
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
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {authorName ? (
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {authorPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authorPhoto}
                  width={84}
                  height={84}
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid rgba(255,255,255,0.25)",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    backgroundColor: "#ee741e",
                    color: "#ffffff",
                    fontSize: 32,
                    fontWeight: 700,
                    border: "3px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {initials(authorName)}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
                  {authorName}
                </div>
                {authorPosition && (
                  <div style={{ display: "flex", fontSize: 18, color: "#ffb648", marginTop: 2 }}>
                    {authorPosition}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.55)" }}>
            wafiandco.com/insights
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
