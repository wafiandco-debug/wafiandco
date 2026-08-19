"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// The "Ready to..." CTA cards (div.bg-banner) sit inside an otherwise-opaque
// wrapper section (see globals.css) so their surrounding padding stays
// solid white. But the card itself must still show the real, single
// .site-bg-photo layer — not a copy — so it stays pixel-identical (same
// crop, same zoom, same moment) no matter where on the page it sits. CSS
// alone can't carve a hole in an ancestor's background shaped like an
// arbitrary descendant, so this measures each card's on-screen rect and
// exposes it as --hole-x/y/w/h on its wrapper section, consumed by a
// mask-composite:exclude rule in globals.css that cuts exactly that
// rectangle out of the wrapper's opaque fill.
export default function CtaBackgroundHole() {
  const pathname = usePathname();

  useEffect(() => {
    function measure() {
      const cards = document.querySelectorAll<HTMLElement>("div.bg-banner");
      cards.forEach((card) => {
        const section = card.closest("section");
        if (!section) return;
        const cardRect = card.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        // The hole is a plain rectangle, but the card has rounded corners
        // (rounded-3xl = 24px) — a hole matching the card's full bounding
        // box would poke past that curve at each corner, exposing a sliver
        // of undimmed .site-bg-photo outside the card's own rounded edge
        // (looked like a second, offset frame). Insetting by >= the corner
        // radius keeps every hole corner safely inside the curve; the tiny
        // corner tip that loses the see-through effect is covered by the
        // card's own dark overlay anyway, so it's not visible.
        const inset = 28;
        section.style.setProperty("--hole-x", `${cardRect.left + inset}px`);
        section.style.setProperty("--hole-y", `${cardRect.top - sectionRect.top + inset}px`);
        section.style.setProperty("--hole-w", `${Math.max(0, cardRect.width - inset * 2)}px`);
        section.style.setProperty("--hole-h", `${Math.max(0, cardRect.height - inset * 2)}px`);
      });
    }

    measure();

    let frame: number;
    function scheduleMeasure() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("load", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("load", scheduleMeasure);
    };
  }, [pathname]);

  return null;
}
