"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const desktopMotion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let lenis: Lenis | undefined;
    function sync() {
      lenis?.destroy();
      lenis = desktopMotion.matches ? new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        autoRaf: true,
      }) : undefined;
    }

    sync();
    desktopMotion.addEventListener("change", sync);
    return () => {
      desktopMotion.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
