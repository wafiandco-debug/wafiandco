import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const alt = "Insights | WAFI & CO., Chartered Accountants";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Insights",
    headline: "Practical Articles on Audit, Tax, GST & Compliance",
    path: "/insights",
  });
}
