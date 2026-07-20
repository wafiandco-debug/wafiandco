"use client";

import { useEffect } from "react";

// Deters casual downloading — blocks the "Save image" / "Open image in new
// tab" right-click menu and drag-to-desktop for images and elements with a
// CSS background-image. Not real protection: anyone using DevTools or "View
// Page Source" can still reach the underlying file, since the browser has
// to download it to render the page at all.
export default function ImageProtection() {
  useEffect(() => {
    function isImageTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      if (target.tagName === "IMG") return true;
      // Only match actual image files (url(...)) — CSS gradients are also
      // implemented via background-image and must not be caught here, or
      // every gradient button/badge on the site would lose its context menu.
      return getComputedStyle(target).backgroundImage.startsWith("url(");
    }

    function handleContextMenu(e: MouseEvent) {
      if (isImageTarget(e.target)) e.preventDefault();
    }

    function handleDragStart(e: DragEvent) {
      if (isImageTarget(e.target)) e.preventDefault();
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
