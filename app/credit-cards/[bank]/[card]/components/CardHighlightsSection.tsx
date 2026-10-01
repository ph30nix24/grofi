"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Plane,
  Utensils,
  Award,
  Gift,
  CreditCard,
} from "lucide-react";
import { CardStructure } from "./type";

interface CardHighlightsSectionProps {
  card: CardStructure;
}

const HIGHLIGHT_ICONS = [
  Zap,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Utensils,
  Plane,
  Award,
  Gift,
];

export default function CardHighlightsSection({ card }: CardHighlightsSectionProps) {
  const highlights = card.keyHighlights || [];

  if (highlights.length === 0) return null;

  return (
    <section id="highlights" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>KEY CARD HIGHLIGHTS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          What Makes <span className="text-primary">{card.name}</span> Stand Out?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Discover the top benefits, special offers, and protections engineered into this card.
        </p>
      </div>

      {/* Grid of Perks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((highlight, idx) => {
          const IconComponent = HIGHLIGHT_ICONS[idx % HIGHLIGHT_ICONS.length];
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex items-start gap-4 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-montserrat mb-1">
                  Feature #{idx + 1}
                </span>
                <p className="text-xs sm:text-sm font-montserrat font-medium text-gray-800 leading-relaxed group-hover:text-gray-950">
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
