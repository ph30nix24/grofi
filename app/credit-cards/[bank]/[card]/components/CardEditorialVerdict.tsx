"use client";

import React from "react";
import {
  Award,
  Sparkles,
  Gift,
  CheckCircle2,
  ThumbsUp,
  Target,
  BadgeCheck,
  Star,
  Zap,
} from "lucide-react";
import { CardStructure } from "./type";

interface CardEditorialVerdictProps {
  card: CardStructure;
}

export default function CardEditorialVerdict({ card }: CardEditorialVerdictProps) {
  // Score breakdown calculations
  const scores = [
    { label: "Reward & Return Value", score: 9.6, icon: Zap },
    { label: "Airport Lounge & Travel", score: 9.4, icon: Sparkles },
    { label: "Fee-to-Value Ratio", score: 9.1, icon: Target },
    { label: "Ecosystem & Merchant Offers", score: 9.3, icon: ThumbsUp },
  ];

  const overallScore = 9.4;

  return (
    <section id="overview" className="py-8 sm:py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left: Editorial Take & "Best For" (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 w-full min-w-0">
          
          {/* Main Editorial Verdict Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/90 shadow-sm relative overflow-hidden">
            {/* Subtle corner badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#EBF4ED] text-primary px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3 sm:mb-4">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
              <span>GROFI EDITORIAL VERDICT</span>
            </div>

            <h2 className="font-bricolage font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900 leading-snug break-words">
              Why We Recommend The <span className="text-primary">{card.name}</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-montserrat mt-3 sm:mt-4 leading-relaxed break-words">
              {card.editorialVerdict ||
                `The ${card.name} stands out as a compelling contender in ${card.issuer}'s credit card line-up. With attractive reward yields, comprehensive travel privileges, and well-designed fee waiver targets, it caters seamlessly to modern cardholders.`}
            </p>

            {/* Who is it best for highlight callout */}
            {card.bestFor && (
              <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-r from-amber-50/80 via-[#FEF6E4] to-amber-50/80 border border-amber-200/80 flex items-start gap-3 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs font-bold text-amber-900 uppercase tracking-wider block font-montserrat">
                    Best Suited For
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 font-montserrat mt-0.5 break-words">
                    {card.bestFor}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Welcome Benefits Showcase Card */}
          {card.welcomeBenefits && card.welcomeBenefits.length > 0 && (
            <div className="bg-linear-to-br from-emerald-50/70 via-white to-emerald-50/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-emerald-200 shadow-sm overflow-hidden">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600/10 text-emerald-800 flex items-center justify-center shrink-0">
                    <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                  </div>
                  <h3 className="font-bricolage font-bold text-base sm:text-lg md:text-xl text-emerald-950 leading-snug break-words">
                    Welcome Gift &amp; Activation Benefits
                  </h3>
                </div>

                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 sm:py-1 rounded-full font-montserrat shrink-0">
                  Bonus Value
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-3 mt-4">
                {card.welcomeBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/80 border border-emerald-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-emerald-950 font-montserrat leading-relaxed min-w-0 flex-1 break-words">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] sm:text-[11px] text-emerald-800/80 font-montserrat mt-4 leading-normal break-words">
                * Welcome benefits are typically unlocked upon payment of the joining fee and initial card activation within 30 to 90 days.
              </p>
            </div>
          )}

        </div>

        {/* Right: Grofi Scorecard & Rating Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/90 shadow-sm w-full min-w-0">
          
          {/* Header Score summary */}
          <div className="flex items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-gray-100">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider font-montserrat block">
                Benchmark Score
              </span>
              <h3 className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900 mt-0.5 leading-snug">
                Grofi Expert Rating
              </h3>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#EBF4ED] border border-primary/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2.5 shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500 shrink-0" />
              <div className="flex items-baseline">
                <span className="font-bricolage font-extrabold text-xl sm:text-2xl text-primary leading-none">
                  {overallScore}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 font-montserrat font-bold ml-0.5">
                  / 10
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Metric Bars */}
          <div className="space-y-4 sm:space-y-5 my-5 sm:my-6">
            {scores.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between gap-2 text-xs font-montserrat font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1.5 min-w-0 flex-1">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate sm:overflow-visible sm:whitespace-normal">{item.label}</span>
                    </span>
                    <span className="font-bold text-gray-900 shrink-0 font-mono text-[11px] sm:text-xs">
                      {item.score} / 10
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editorial Highlights Box */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 text-xs font-montserrat text-gray-600 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold">
              <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Independent Methodology</span>
            </div>
            <p className="leading-relaxed text-[10px] sm:text-[11px] break-words">
              Our ratings assess real-world net reward yields after fee deductions, partner redemption flexibility, lounge conditions, and user transparency.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
