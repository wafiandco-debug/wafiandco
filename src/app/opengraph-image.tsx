import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const alt = "WAFI & CO., Chartered Accountants";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Home",
    headline: "Audit, Tax, GST & Business Advisory in Calicut, Kerala",
    path: "",
  });
}
