import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const alt = "Services | WAFI & CO., Chartered Accountants";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Our Services",
    headline: "Audit, Virtual CFO, GST, ITR, Incorporation & Business Advisory",
    path: "/services",
  });
}
