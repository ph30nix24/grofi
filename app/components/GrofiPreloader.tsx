"use client";

import { useEffect, useState } from "react";
import GrofiLoader, { GrofiLoaderStyle, GrofiLoaderTheme } from "./GrofiLoader";

interface GrofiPreloaderProps {
  /** Minimum duration in milliseconds to display before smooth fade-out (default: 600ms) */
  minDuration?: number;
  /** Loader animation style (default: 'beam') */
  styleType?: GrofiLoaderStyle;
  /** Palette theme (default: 'brand') */
  theme?: GrofiLoaderTheme;
}

export default function GrofiPreloader({
  minDuration = 600,
  styleType = "beam",
  theme = "brand",
}: GrofiPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Only run on the browser
    const timer = setTimeout(() => {
      setIsFading(true);
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // 500ms fade-out transition duration
      return () => clearTimeout(removeTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] transition-opacity duration-500 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <GrofiLoader variant="fullscreen" styleType={styleType} theme={theme} />
    </div>
  );
}
