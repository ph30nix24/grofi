"use client";

import React from "react";
import { Check, X, Scale, ShieldCheck, AlertCircle } from "lucide-react";
import { CardStructure } from "./type";

interface CardProsConsSectionProps {
  card: CardStructure;
}

export default function CardProsConsSection({ card }: CardProsConsSectionProps) {
  const pros = card.pros || [];
  const cons = card.cons || [];

  if (pros.length === 0 && cons.length === 0) return null;

  return (
    <section id="pros-cons" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Scale className="w-3.5 h-3.5 text-gold" />
          <span>BALANCED EDITORIAL ASSESSMENT</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Pros &amp; Cons of the <span className="text-primary">{card.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          An honest, transparent evaluation of strengths and limitations before you submit your application.
        </p>
      </div>

      {/* Side-by-Side Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Pros Column */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-emerald-950">
                What We Love (Pros)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full font-montserrat">
              {pros.length} Advantages
            </span>
          </div>

          <ul className="space-y-3.5">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-montserrat text-emerald-950 leading-relaxed font-medium">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
                <X className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-rose-950">
                Things to Consider (Cons)
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-100/90 px-2.5 py-1 rounded-full font-montserrat">
              {cons.length} Limitations
            </span>
          </div>

          <ul className="space-y-3.5">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-montserrat text-rose-950 leading-relaxed font-medium">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Transparency Note */}
      <div className="mt-8 text-center text-xs text-gray-500 font-montserrat flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>
          Independent Editorial Policy: Grofi never charges consumers for recommendations. All reviews are unbiased.
        </span>
      </div>

    </section>
  );
}
