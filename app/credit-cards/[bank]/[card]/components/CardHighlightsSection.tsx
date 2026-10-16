"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Plane,
  Utensils,
  Gift,
  Coins,
  Coffee,
  Ticket,
  Percent,
} from "lucide-react";
import { CardStructure } from "./type";

interface CardHighlightsSectionProps {
  card: CardStructure;
}

// Semantic icon resolver for highlights
function getHighlightIcon(text: string) {
  const l = text.toLowerCase();
  if (l.includes("fuel") || l.includes("surcharge")) return Zap;
  if (l.includes("movie") || l.includes("ticket") || l.includes("cinema") || l.includes("bookmyshow")) return Ticket;
  if (l.includes("dining") || l.includes("food") || l.includes("swiggy") || l.includes("zomato") || l.includes("restaurant")) return Utensils;
  if (l.includes("travel") || l.includes("flight") || l.includes("airline") || l.includes("hotel") || l.includes("airmile")) return Plane;
  if (l.includes("lounge")) return Coffee;
  if (l.includes("cashback") || l.includes("reward") || l.includes("point") || l.includes("savings")) return Coins;
  if (l.includes("insurance") || l.includes("fraud") || l.includes("protect") || l.includes("cover")) return ShieldCheck;
  if (l.includes("voucher") || l.includes("gift") || l.includes("welcome") || l.includes("bonus")) return Gift;
  if (l.includes("discount") || l.includes("off") || l.includes("percent") || l.includes("%")) return Percent;
  if (l.includes("shop") || l.includes("amazon") || l.includes("flipkart") || l.includes("retail")) return ShoppingBag;
  return Sparkles;
}

export default function CardHighlightsSection({ card }: CardHighlightsSectionProps) {
  const highlights = card.keyHighlights || [];

  if (highlights.length === 0) return null;

  return (
    <section
      id="highlights"
      aria-label="Key Card Highlights"
      className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>KEY CARD HIGHLIGHTS &amp; PRIVILEGES</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          What Makes <span className="text-primary">{card.name}</span> Stand Out?
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          Top card benefits, milestone perks, partner privileges, and consumer protections engineered into this tier.
        </p>
      </div>

      {/* Grid of Perks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {highlights.map((highlight, idx) => {
          const IconComponent = getHighlightIcon(highlight);
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex items-start gap-4 shadow-2xs hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-2xs">
                <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-montserrat mb-1">
                  Highlight #{idx + 1}
                </span>
                <p className="text-xs sm:text-sm font-montserrat font-medium text-gray-800 leading-relaxed group-hover:text-gray-950 wrap-break-word">
                  {highlight}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
