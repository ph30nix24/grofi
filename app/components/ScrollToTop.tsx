"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  /** Scroll distance in pixels after which button becomes visible */
  threshold?: number;
  /** Optional custom class names */
  className?: string;
}

export default function ScrollToTop({
  threshold = 300,
  className = "",
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#02474D] text-[#DDE3C1] hover:text-white hover:bg-[#035961] border border-[#B69226]/40 hover:border-[#B69226] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-[#02474D]/30 transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69226] focus-visible:ring-offset-2 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      } ${className}`}
    >
      <ArrowUp className="w-5 h-5 text-[#DDE3C1] hover:text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
