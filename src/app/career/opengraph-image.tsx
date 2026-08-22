import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const alt = "Careers at WAFI & CO., Chartered Accountants";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Careers",
    headline: "Build Your Career with WAFI & CO.",
    path: "/career",
  });
}
