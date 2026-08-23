import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.fullName,
    short_name: siteConfig.name,
    description:
      "WAFI & CO., Chartered Accountants — Audit, Virtual CFO, GST, ITR, Incorporation, Certifications, Advisory, and Accounting Services in Calicut, Kerala.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16171b",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
