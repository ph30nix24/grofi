"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  LayoutGrid,
  SlidersHorizontal,
  Play,
  X,
  Heart,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { InstagramReel, FALLBACK_REELS } from "@/libs/instagram";

interface InstagramGalleryProps {
  reels?: InstagramReel[];
  isLoading?: boolean;
}

export function InstagramReelSkeleton({
  viewMode = "carousel",
  index = 0,
}: {
  viewMode?: "carousel" | "grid";
  index?: number;
}) {
  return (
    <div
      className={`${
        viewMode === "carousel"
          ? "snap-start shrink-0 w-[270px] sm:w-[290px] md:w-[310px]"
          : "w-full"
      } aspect-[9/16] aspect-reel min-h-[460px] rounded-3xl relative overflow-hidden bg-linear-to-b from-[#0e1e21] via-[#091517] to-[#040a0b] border border-gray-200/40 shadow-md p-5 flex flex-col justify-between select-none ${
        index % 4 === 1
          ? "delay-75"
          : index % 4 === 2
          ? "delay-150"
          : index % 4 === 3
          ? "delay-200"
          : ""
      }`}
    >
      {/* Shimmer Sweeping Highlight */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />

      {/* Top Header Placeholder */}
      <div className="flex items-center justify-between">
        <div className="w-16 h-6 rounded-full bg-white/10 animate-pulse" />
        <div className="w-14 h-6 rounded-full bg-white/10 animate-pulse" />
      </div>

      {/* Center Play Button Placeholder */}
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Bottom Content Placeholders */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/15 animate-pulse shrink-0" />
          <div className="w-20 h-3.5 rounded-md bg-white/15 animate-pulse" />
          <div className="w-10 h-3.5 rounded-full bg-white/10 ml-auto animate-pulse" />
        </div>

        <div className="space-y-1.5">
          <div className="w-11/12 h-4 rounded-md bg-white/20 animate-pulse" />
          <div className="w-3/4 h-4 rounded-md bg-white/15 animate-pulse" />
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="w-24 h-3 rounded-md bg-white/10 animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Clean helper to extract a catchy title/hook from the caption
function extractHook(caption?: string): { title: string; subtitle: string } {
  if (!caption) {
    return {
      title: "Smart Financial Advice in 60s",
      subtitle: "Watch this reel for quick actionable money tips.",
    };
  }

  const lines = caption
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const firstLine = lines[0] || "";
  // Strip out excessive emojis or punctuation for the headline
  const title = firstLine.length > 75 ? firstLine.slice(0, 72) + "..." : firstLine;
  const secondLine = lines.slice(1).join(" ");
  const subtitle =
    secondLine.length > 110 ? secondLine.slice(0, 107) + "..." : secondLine || firstLine;

  return { title, subtitle };
}

// Format relative date
function formatRelativeDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffHours < 24) return `${Math.max(1, diffHours)}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

export default function InstagramGallery({
  reels = FALLBACK_REELS,
  isLoading = false,
}: InstagramGalleryProps) {
  const displayReels = reels && reels.length > 0 ? reels : FALLBACK_REELS;

  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [activeModalReel, setActiveModalReel] = useState<InstagramReel | null>(null);
  const [modalIframeLoaded, setModalIframeLoaded] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setModalIframeLoaded(false);
  }, [activeModalReel]);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCopyLink = (url: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Keyboard navigation for watch modal
  useEffect(() => {
    if (!activeModalReel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalReel(null);
      } else if (e.key === "ArrowLeft") {
        const idx = displayReels.findIndex((r) => r.id === activeModalReel.id);
        if (idx > 0) setActiveModalReel(displayReels[idx - 1]);
      } else if (e.key === "ArrowRight") {
        const idx = displayReels.findIndex((r) => r.id === activeModalReel.id);
        if (idx < displayReels.length - 1) setActiveModalReel(displayReels[idx + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalReel, displayReels]);

  return (
    <section
      id="insta-reels"
      className="py-22 px-4 sm:px-6 relative bg-linear-to-b from-[#F3F0DF]/30 via-white to-[#F3F0DF]/40 overflow-hidden font-montserrat"
    >
      {/* ── Background Ambient Lighting ───────────────────────────────── */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-linear-to-br from-purple-500/10 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-linear-to-tl from-amber-500/10 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          
          {/* Eyebrow Instagram Pill with Grofi Logo */}
          <div className="inline-flex items-center gap-2.5 bg-linear-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-pink-500/20 mb-4 shadow-xs">
            <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 ring-1 ring-pink-500/40">
              <Image
                src="/short-image.png"
                alt="Grofi Logo"
                width={16}
                height={16}
                className="w-full h-full object-cover"
              />
            </div>
            <span>Live from @grofi_ Instagram</span>
          </div>

          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Financial Wisdom in 60s:{" "}
            <span className="text-gold relative inline-block">
              Watch Our Reels
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/20 rounded-full" />
            </span>
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-linear-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/65 leading-relaxed max-w-2xl mx-auto">
            Bite-sized financial breakdowns on credit cards, gold investments, bank rate cuts, and loan approvals verified by Grofi financial experts.
          </p>

          {/* Live Community Action Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 text-xs font-montserrat">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-xs border border-gray-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-gray-900">50K+</span>
              <span className="text-gray-500">Instagram Community</span>
            </div>
            <a
              href="https://www.instagram.com/grofi_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold px-4 py-2 rounded-2xl shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Follow @grofi_ on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>

        </div>

        {/* ── Controls Bar: View Mode Switch & Carousel Navigation ─────── */}
        <div className="flex items-center justify-between gap-4 mb-8 reveal-on-scroll delay-100">
          
          {/* View Mode Toggle */}
          <div className="bg-white p-1 rounded-2xl shadow-xs border border-gray-200/80 inline-flex items-center gap-1">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-montserrat text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Carousel Slider</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-montserrat text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>

          {/* Carousel Arrows (only in carousel mode) */}
          {viewMode === "carousel" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-2xl bg-white hover:bg-primary text-gray-700 hover:text-white border border-gray-200 shadow-xs flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-2xl bg-white hover:bg-primary text-gray-700 hover:text-white border border-gray-200 shadow-xs flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

        {/* ── Native 9:16 Video Reel Cards ─────────────────────────────── */}
        <div
          ref={carouselRef}
          className={
            viewMode === "carousel"
              ? "flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-hidden -mx-2 px-2 scroll-smooth"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8 pt-2"
          }
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <InstagramReelSkeleton key={i} viewMode={viewMode} index={i} />
            ))
          ) : (
            displayReels.map((reel, index) => {
            const { title } = extractHook(reel.caption);
            const isCopied = copiedId === reel.id;
            const hasError = imageErrors[reel.id];
            // Always prioritize live thumbnail_url / media_url coming with data from Instagram Graph API
            const rawThumbnail = reel.thumbnail_url || reel.media_url;
            const fallbackImg = FALLBACK_REELS[index % FALLBACK_REELS.length].thumbnail_url || "/products/credit-cards.webp";
            const thumbSrc = !hasError && rawThumbnail ? rawThumbnail : fallbackImg;
            const isExternal = Boolean(thumbSrc?.startsWith("http"));

            return (
              <div
                key={reel.id}
                onClick={() => setActiveModalReel(reel)}
                className={`${
                  viewMode === "carousel"
                    ? "snap-start shrink-0 w-[270px] sm:w-[290px] md:w-[310px]"
                    : "w-full"
                } aspect-[9/16] aspect-reel min-h-[460px] rounded-3xl relative overflow-hidden group cursor-pointer border border-gray-200/90 shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 select-none`}
              >
                {/* ── Edge-to-Edge Video Thumbnail Poster ──────────────── */}
                <div className="absolute inset-0 bg-[#0a181a]">
                  <Image
                    src={thumbSrc}
                    alt={title}
                    fill
                    unoptimized={isExternal}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 4}
                    className={`object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out ${
                      loadedImages[reel.id] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [reel.id]: true }))
                    }
                    onError={() => {
                      setImageErrors((prev) => ({ ...prev, [reel.id]: true }));
                      setLoadedImages((prev) => ({ ...prev, [reel.id]: true }));
                    }}
                  />

                  {/* linear Vignettes for Perfect Legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/40 pointer-events-none" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
                </div>

                {/* ── Per-Post Skeleton Loader Layer (Visible while loading) ── */}
                <div
                  className={`absolute inset-0 z-20 bg-linear-to-b from-[#0e1e21] via-[#091517] to-[#040a0b] flex flex-col justify-between p-5 transition-opacity duration-500 overflow-hidden ${
                    loadedImages[reel.id] ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  {/* Shimmer Sweeping Highlight */}
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />

                  {/* Top Header Placeholder */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-6 rounded-full bg-white/10 animate-pulse" />
                    <div className="w-14 h-6 rounded-full bg-white/10 animate-pulse" />
                  </div>

                  {/* Center Play Button Placeholder */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center animate-pulse">
                      <div className="w-6 h-6 rounded-full bg-white/15" />
                    </div>
                  </div>

                  {/* Bottom Content Placeholders */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/15 animate-pulse shrink-0" />
                      <div className="w-20 h-3.5 rounded-md bg-white/15 animate-pulse" />
                      <div className="w-10 h-3.5 rounded-full bg-white/10 ml-auto animate-pulse" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-11/12 h-4 rounded-md bg-white/20 animate-pulse" />
                      <div className="w-3/4 h-4 rounded-md bg-white/15 animate-pulse" />
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div className="w-24 h-3 rounded-md bg-white/10 animate-pulse" />
                      <div className="w-4 h-4 rounded-full bg-white/10 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* ── Top Bar inside Card ──────────────────────────────── */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  {/* Instagram Reel Clapper Badge */}
                  <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-semibold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" />
                    <span>Reel</span>
                  </div>

                  {/* Timestamp / Likes Pill */}
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/25 text-white text-[11px] font-bold">
                    <Calendar className="w-3 h-3 text-white/80" />
                    <span>{formatRelativeDate(reel.timestamp)}</span>
                  </div>
                </div>

                {/* ── Center Floating Frosted Glass Play Button ────────── */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-115 group-hover:bg-linear-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] transition-all duration-300">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* ── Quick Action Overlay Buttons ─────────────────────── */}
                <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-2.5">
                  {/* Direct Link to Instagram */}
                  <a
                    href={reel.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open on Instagram"
                    title="Open on Instagram"
                    className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#E1306C] hover:scale-110 transition-all cursor-pointer shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Copy Link Button */}
                  <button
                    type="button"
                    onClick={(e) => handleCopyLink(reel.permalink, reel.id, e)}
                    aria-label="Copy reel link"
                    title="Copy link"
                    className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-gold hover:scale-110 transition-all cursor-pointer shadow-md"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* ── Bottom Content Overlay ───────────────────────────── */}
                <div className="absolute inset-x-0 bottom-0 p-5 pt-12 bg-linear-to-t from-black via-black/85 to-transparent z-10 flex flex-col justify-end">
                  
                  {/* Creator Tag & Verified Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] shrink-0 shadow-xs">
                      <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                        <Image
                          src="/short-image.png"
                          alt="Grofi Logo"
                          width={28}
                          height={28}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white flex items-center gap-1 font-montserrat">
                      @grofi_
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3897f0] fill-white shrink-0" />
                    </span>

                    {reel.like_count !== undefined && reel.like_count > 0 && (
                      <span className="ml-auto text-[10px] font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                        <span>{reel.like_count}</span>
                      </span>
                    )}
                  </div>

                  {/* Reel Headline */}
                  <h3 className="font-bricolage font-bold text-sm sm:text-base text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors mb-2.5">
                    {title}
                  </h3>

                  {/* Watch Callout Bar */}
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white group-hover:text-gold transition-colors">
                    <span className="inline-flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Watch Reel
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>

                </div>

              </div>
            );
          }))}
        </div>

        {/* Mobile Swipe Helper */}
        {viewMode === "carousel" && (
          <div className="sm:hidden flex items-center justify-center gap-1.5 text-xs text-gray-500 font-montserrat mt-2">
            <span>👈 Swipe sideways to watch more reels 👉</span>
          </div>
        )}

        {/* ── Bottom Follow CTA Banner ─────────────────────────────────── */}
        <div className="mt-14 bg-linear-to-r from-[#012f33] via-[#02474D] to-[#012f33] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 reveal-scale delay-150">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-pink-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 flex items-center justify-center shrink-0 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex items-center justify-center">
                <Image
                  src="/short-image.png"
                  alt="Grofi Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
                Never Miss a Rate Cut or Card Offer
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-montserrat mt-1 max-w-xl">
                Join over 50,000+ Indians on Instagram getting daily credit card reward breakdowns, bank interest rate changes, and CIBIL tips.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/grofi_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2.5 whitespace-nowrap cursor-pointer"
            >
              <span>Follow @grofi_ on Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

      {/* ── Dedicated Watch Lightbox / Modal ─────────────────────────── */}
      {activeModalReel && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setActiveModalReel(null)}
        >
          <div
            className="bg-[#0f191b] border border-white/15 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[92vh] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalReel(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left / Prev Reel Button */}
            <button
              onClick={() => {
                const idx = displayReels.findIndex((r) => r.id === activeModalReel.id);
                if (idx > 0) setActiveModalReel(displayReels[idx - 1]);
                else setActiveModalReel(displayReels[displayReels.length - 1]);
              }}
              aria-label="Previous reel"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-primary text-white border border-white/20 items-center justify-center transition-all hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right / Next Reel Button */}
            <button
              onClick={() => {
                const idx = displayReels.findIndex((r) => r.id === activeModalReel.id);
                if (idx < displayReels.length - 1) setActiveModalReel(displayReels[idx + 1]);
                else setActiveModalReel(displayReels[0]);
              }}
              aria-label="Next reel"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-primary text-white border border-white/20 items-center justify-center transition-all hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* ── Left Player: Clean Instagram Embed Frame with Skeleton ── */}
            <div className="w-full md:w-[350px] lg:w-[380px] h-[520px] sm:h-[580px] bg-slate-950 relative flex items-center justify-center shrink-0 overflow-hidden">
              {!modalIframeLoaded && (
                <div className="absolute inset-0 z-10 bg-linear-to-b from-[#0e1e21] via-[#091517] to-[#040a0b] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  {/* Real Instagram poster preview behind shimmer while player loads */}
                  {(activeModalReel.thumbnail_url || activeModalReel.media_url) && (
                    <Image
                      src={activeModalReel.thumbnail_url || activeModalReel.media_url || ""}
                      alt={extractHook(activeModalReel.caption).title}
                      fill
                      unoptimized={Boolean((activeModalReel.thumbnail_url || activeModalReel.media_url)?.startsWith("http"))}
                      className="object-cover opacity-25 blur-xs"
                    />
                  )}
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3 animate-pulse relative z-10">
                    <Sparkles className="w-6 h-6 text-gold animate-spin" />
                  </div>
                  <p className="font-bricolage font-bold text-sm text-white mb-1 relative z-10">
                    Loading Instagram Player...
                  </p>
                  <p className="text-[11px] text-white/60 font-montserrat relative z-10">
                    Connecting to @grofi_
                  </p>
                </div>
              )}
              <iframe
                src={`${activeModalReel.permalink}embed/`}
                className={`w-full h-full border-0 transition-opacity duration-300 ${
                  modalIframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                scrolling="no"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={extractHook(activeModalReel.caption).title}
                onLoad={() => setModalIframeLoaded(true)}
              />
            </div>

            {/* ── Right Content: Reel Details & Actions ────────────────── */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between text-white overflow-y-auto">
              <div>
                
                {/* Profile Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 shrink-0 shadow-md">
                      <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex items-center justify-center">
                        <Image
                          src="/short-image.png"
                          alt="Grofi Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bricolage font-bold text-base text-white">Grofi Official</span>
                        <CheckCircle2 className="w-4 h-4 text-[#3897f0] fill-white" />
                      </div>
                      <p className="text-xs text-white/60 font-montserrat">@grofi_ • Verified Financial Partner</p>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/grofi_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all border border-white/15 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Follow</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Full Reel Caption */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold bg-gold/15 px-2.5 py-0.5 rounded-md inline-block mb-3 border border-gold/25">
                    Featured Instagram Reel
                  </span>

                  <h4 className="font-bricolage font-bold text-lg sm:text-xl text-white mb-3 leading-snug">
                    {extractHook(activeModalReel.caption).title}
                  </h4>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-white/80 leading-relaxed font-montserrat whitespace-pre-line max-h-56 overflow-y-auto">
                    {activeModalReel.caption || "Watch this reel on Instagram for the full guide and community discussion."}
                  </div>
                </div>

                {/* Engagement Stats Strip */}
                <div className="flex items-center gap-4 text-xs text-white/60 font-montserrat mb-6">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-white/70" />
                    <span>Posted {formatRelativeDate(activeModalReel.timestamp)}</span>
                  </div>
                  {activeModalReel.like_count !== undefined && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      <span>{activeModalReel.like_count} Likes</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Action CTAs */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={activeModalReel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Watch &amp; Comment on Instagram</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleCopyLink(activeModalReel.permalink, activeModalReel.id)}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedId === activeModalReel.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Reel</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
