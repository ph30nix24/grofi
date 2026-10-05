"use client";

import React, { useState } from "react";
import { CreditCard, TrendingUp, Banknote, Sparkles, BookOpen } from "lucide-react";

interface BlogImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
}

export default function BlogImage({ src, alt, category, className = "" }: BlogImageProps) {
  const [hasError, setHasError] = useState(false);

  // Return thematic icon and gradient styling based on category
  const getCategoryTheme = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes("credit card") || c.includes("card")) {
      return {
        bg: "from-[#02282C] via-[#02474D] to-[#0A5C63]",
        accent: "text-amber-300",
        icon: CreditCard,
        pattern: "radial-gradient(circle at 80% 20%, rgba(182, 146, 38, 0.25) 0%, transparent 60%)",
        label: "Credit Cards",
      };
    }
    if (c.includes("score") || c.includes("cibil")) {
      return {
        bg: "from-[#0B2545] via-[#133E87] to-[#1D4ED8]",
        accent: "text-sky-300",
        icon: TrendingUp,
        pattern: "radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.25) 0%, transparent 60%)",
        label: "Credit Score",
      };
    }
    if (c.includes("loan") || c.includes("personal")) {
      return {
        bg: "from-[#063321] via-[#0E5838] to-[#15803D]",
        accent: "text-emerald-300",
        icon: Banknote,
        pattern: "radial-gradient(circle at 80% 80%, rgba(52, 211, 153, 0.25) 0%, transparent 60%)",
        label: "Personal Loan",
      };
    }
    return {
      bg: "from-[#1E1E24] via-[#02474D] to-[#B69226]",
      accent: "text-amber-200",
      icon: BookOpen,
      pattern: "radial-gradient(circle at 50% 50%, rgba(182, 146, 38, 0.2) 0%, transparent 70%)",
      label: "Financial Guide",
    };
  };

  const theme = getCategoryTheme(category);
  const IconComponent = theme.icon;

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${theme.bg} flex items-center justify-center select-none ${className}`}
        style={{ backgroundImage: theme.pattern }}
      >
        {/* Subtle decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Floating thematic icon illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-lg transform transition-transform group-hover:scale-110">
            <IconComponent className={`w-8 h-8 ${theme.accent}`} />
          </div>
          <span className="text-white/80 font-semibold text-xs tracking-wider uppercase font-montserrat flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold" />
            {theme.label}
          </span>
        </div>

        {/* Subtle Grofi watermark in bottom corner */}
        <div className="absolute bottom-2.5 right-3 text-[10px] font-bold tracking-widest text-white/30 uppercase font-bricolage">
          Grofi Research
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gray-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
}
