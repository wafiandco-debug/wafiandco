import { siteConfig } from "@/lib/site";

// IndexNow tells participating search engines (Bing, Yandex, Seznam, Naver,
// Yep) that a URL was added, changed, or removed, so they re-crawl it
// without waiting to discover the change. Google does not take part.
//
// The key is not a secret: the protocol requires it to be publicly served at
// /<key>.txt so engines can confirm we own the site. That file lives in
// /public and must always match this constant.
export const INDEXNOW_KEY = "69a94b64a0dbd5fcd95c831bdd34a1fb";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Best-effort: a failure here must never break saving an article, so it logs
// and returns. Only runs on the live production deployment — local dev and
// preview builds would otherwise ping engines about URLs they didn't change.
export async function submitToIndexNow(paths: string[]): Promise<void> {
  if (process.env.VERCEL_ENV !== "production") return;

  const urlList = [...new Set(paths)].map((p) => `${siteConfig.url}${p}`);
  if (urlList.length === 0) return;

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(siteConfig.url).host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    // 200 = accepted, 202 = accepted pending key validation.
    if (!res.ok) {
      console.error(`IndexNow rejected submission: HTTP ${res.status}`);
    }
  } catch (err) {
    console.error("IndexNow submission failed:", err);
  }
}
