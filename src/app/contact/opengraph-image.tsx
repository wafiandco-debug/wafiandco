import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const alt = "Contact WAFI & CO., Chartered Accountants";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Contact Us",
    headline: "Get in Touch with WAFI & CO., Chartered Accountants",
    path: "/contact",
  });
}
