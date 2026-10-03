import React from "react";

export type GrofiLoaderVariant = "fullscreen" | "inline" | "overlay" | "minimal";
export type GrofiLoaderStyle = "beam" | "shimmer" | "wave" | "orbit";
export type GrofiLoaderTheme = "brand" | "light" | "dark" | "transparent";
export type GrofiLoaderSize = "sm" | "md" | "lg";

export interface GrofiLoaderProps {
  /** Display variant: fullscreen page, inline block, absolute overlay, or ultra-minimal */
  variant?: GrofiLoaderVariant;
  /** Animation micro-interaction style */
  styleType?: GrofiLoaderStyle;
  /** Brand text to display (defaults to 'grofi') */
  text?: string;
  /** Optional micro-tagline under the loader */
  subtitle?: string | null;
  /** Color theme palette */
  theme?: GrofiLoaderTheme;
  /** Sizing scale */
  size?: GrofiLoaderSize;
  /** Additional CSS class names */
  className?: string;
}

export default function GrofiLoader({
  variant = "fullscreen",
  styleType = "beam",
  text = "grofi",
  subtitle = "Smart Financial Growth",
  theme = "brand",
  size = "md",
  className = "",
}: GrofiLoaderProps) {
  // Theme Backgrounds
  const themeBgMap: Record<GrofiLoaderTheme, string> = {
    brand: "bg-[#FAF8EE]",
    light: "bg-white",
    dark: "bg-[#01292C]",
    transparent: "bg-transparent",
  };

  // Text colors
  const isDark = theme === "dark";
  const primaryText = isDark ? "text-[#FAF8EE]" : "text-[#02474D]";
  const mutedText = isDark ? "text-white/50" : "text-[#02474D]/60";
  const trackBg = isDark ? "bg-white/10" : "bg-[#02474D]/10";

  // Size configurations
  const sizeClasses = {
    sm: {
      text: "text-2xl sm:text-3xl tracking-[0.22em]",
      dot: "w-2 h-2 mb-1",
      stemOffset: "mt-[-0.28em]",
      track: "w-24 h-[1.5px]",
      tagline: "text-[9px] tracking-[0.26em]",
      orbitBox: "w-20 h-20",
      orbitDot: "w-1.5 h-1.5 -top-0.5",
    },
    md: {
      text: "text-4xl sm:text-5xl tracking-[0.25em]",
      dot: "w-2.5 h-2.5 mb-1.5",
      stemOffset: "mt-[-0.3em]",
      track: "w-32 sm:w-36 h-[2px]",
      tagline: "text-[10px] tracking-[0.3em]",
      orbitBox: "w-28 h-28",
      orbitDot: "w-2 h-2 -top-1",
    },
    lg: {
      text: "text-5xl sm:text-6xl tracking-[0.28em]",
      dot: "w-3 h-3 mb-2",
      stemOffset: "mt-[-0.32em]",
      track: "w-44 h-[2.5px]",
      tagline: "text-xs tracking-[0.32em]",
      orbitBox: "w-36 h-36",
      orbitDot: "w-2.5 h-2.5 -top-1",
    },
  }[size];

  // Base container layout
  const containerBase =
    variant === "fullscreen"
      ? `fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm ${themeBgMap[theme]}`
      : variant === "overlay"
      ? `absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xs ${themeBgMap[theme]}`
      : `flex flex-col items-center justify-center p-6 ${themeBgMap[theme]}`;

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={`${containerBase} ${className} transition-colors select-none`}
    >
      {/* ── STYLE 1: Horizon Beam (Flagship Minimalist) ──────────────── */}
      {styleType === "beam" && (
        <div className="flex flex-col items-center justify-center gap-3">
          {/* Typographic Wordmark with Golden Dot Accent */}
          <div className="relative flex items-center">
            {text.toLowerCase() === "grofi" ? (
              <>
                <span className={`font-bricolage font-extrabold ${sizeClasses.text} ${primaryText}`}>
                  grof
                </span>
                <span className={`relative inline-flex flex-col items-center font-bricolage font-extrabold ${sizeClasses.text} ${primaryText}`}>
                  {/* Glowing Golden Accent Dot */}
                  <span className={`${sizeClasses.dot} rounded-full bg-[#B69226] animate-grofi-pulse-dot shadow-xs`} />
                  {/* Stem */}
                  <span className={`leading-none ${sizeClasses.stemOffset}`}>ı</span>
                </span>
              </>
            ) : (
              <span className={`font-bricolage font-extrabold ${sizeClasses.text} ${primaryText}`}>
                {text}
              </span>
            )}
          </div>

          {/* Micro Horizon Progress Beam */}
          {variant !== "minimal" && (
            <div className={`${sizeClasses.track} ${trackBg} rounded-full relative overflow-hidden mt-0.5`}>
              <div className="animate-grofi-beam bg-linear-to-r from-[#02474D] via-[#B69226] to-[#02474D] shadow-[0_0_8px_rgba(182,146,38,0.5)] h-full" />
            </div>
          )}

          {/* Micro Tagline */}
          {subtitle && variant !== "minimal" && (
            <span className={`${sizeClasses.tagline} font-semibold uppercase ${mutedText} mt-1`}>
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* ── STYLE 2: Liquid Metallic Shimmer ───────────────────────── */}
      {styleType === "shimmer" && (
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="relative">
            <span
              className={`font-bricolage font-extrabold ${sizeClasses.text} animate-grofi-shimmer bg-clip-text text-transparent bg-gradient-to-r from-[#02474D] via-[#B69226] to-[#02474D]`}
            >
              {text}
            </span>
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#B69226] animate-grofi-pulse-dot" />
          </div>

          {variant !== "minimal" && (
            <div className="w-16 h-[1.5px] bg-[#B69226]/40 rounded-full" />
          )}

          {subtitle && variant !== "minimal" && (
            <span className={`${sizeClasses.tagline} font-semibold uppercase ${mutedText} mt-1`}>
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* ── STYLE 3: Sequential Letter Pulse ──────────────────────── */}
      {styleType === "wave" && (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className={`flex items-center gap-1 font-bricolage font-extrabold ${sizeClasses.text} ${primaryText}`}>
            <span className="inline-block animate-grofi-wave-0">g</span>
            <span className="inline-block animate-grofi-wave-1">r</span>
            <span className="inline-block animate-grofi-wave-2">o</span>
            <span className="inline-block animate-grofi-wave-3">f</span>
            <span className="relative inline-flex flex-col items-center animate-grofi-wave-4">
              <span className={`${sizeClasses.dot} rounded-full bg-[#B69226] animate-grofi-pulse-dot`} />
              <span className={`leading-none ${sizeClasses.stemOffset}`}>ı</span>
            </span>
          </div>

          {subtitle && variant !== "minimal" && (
            <span className={`${sizeClasses.tagline} font-semibold uppercase ${mutedText} mt-1`}>
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* ── STYLE 4: Orbital Halo ──────────────────────────────────── */}
      {styleType === "orbit" && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`relative ${sizeClasses.orbitBox} flex items-center justify-center`}>
            {/* Fine Hairline Ring */}
            <div className={`absolute inset-0 rounded-full border ${isDark ? "border-white/15" : "border-[#02474D]/15"}`} />

            {/* Orbiting Golden Dot */}
            <div className="absolute inset-0 animate-grofi-orbit">
              <div
                className={`${sizeClasses.orbitDot} rounded-full bg-[#B69226] shadow-[0_0_8px_#B69226] absolute left-1/2 -translate-x-1/2`}
              />
            </div>

            {/* Central Typography */}
            <div className={`font-bricolage font-extrabold text-2xl tracking-[0.2em] ${primaryText} flex items-center`}>
              grof<span className="text-[#B69226]">i</span>
            </div>
          </div>

          {subtitle && variant !== "minimal" && (
            <span className={`${sizeClasses.tagline} font-semibold uppercase ${mutedText}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Screen reader announcement */}
      <span className="sr-only">Loading Grofi...</span>
    </div>
  );
}
