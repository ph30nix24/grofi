"use client";

import React from "react";
import { Check, X, Scale, ShieldCheck } from "lucide-react";
import { CardStructure } from "./type";

interface CardProsConsSectionProps {
  card: CardStructure;
}

export default function CardProsConsSection({ card }: CardProsConsSectionProps) {
  const pros = card.pros || [];
  const cons = card.cons || [];

  if (pros.length === 0 && cons.length === 0) return null;

  return (
    <section
      id="pros-cons"
      aria-label="Pros and Cons Assessment"
      className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <Scale className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>BALANCED EDITORIAL ASSESSMENT</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          Honest Pros &amp; Cons of the <span className="text-primary">{card.name}</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          An objective evaluation of key strengths and structural limitations before submitting your application.
        </p>
      </div>

      {/* Side-by-Side Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        
        {/* Pros Column */}
        <div className="bg-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-200/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Check className="w-4 h-4 stroke-3" />
              </div>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-emerald-950">
                What We Love (Pros)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full font-montserrat">
              {pros.length} Strengths
            </span>
          </div>

          <ul className="space-y-4">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-montserrat text-emerald-950 leading-relaxed font-medium wrap-break-word">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="bg-rose-50/40 rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-rose-200/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <X className="w-4 h-4 stroke-3" />
              </div>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-rose-950">
                Things to Consider (Cons)
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-100/90 px-3 py-1 rounded-full font-montserrat">
              {cons.length} Caveats
            </span>
          </div>

          <ul className="space-y-4">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-montserrat text-rose-950 leading-relaxed font-medium wrap-break-word">
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
        <span>Grofi conducts unbiased independent evaluations without sponsored brand favoritism.</span>
      </div>

    </section>
  );
}
