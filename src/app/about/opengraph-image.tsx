import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const alt = "About WAFI & CO., Chartered Accountants";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "About Us",
    headline: "Chartered Accountants in Calicut, Built on Trust & Expertise",
    path: "/about",
  });
}
