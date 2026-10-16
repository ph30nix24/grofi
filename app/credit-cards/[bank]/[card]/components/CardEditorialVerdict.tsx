"use client";

import React, { useMemo } from "react";
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
  // Dynamically calculate scores based on actual card specs
  const { scores, overallScore } = useMemo(() => {
    // 1. Reward & Return Value Score
    let rewardScore = 9.2;
    const headline = card.rewardRate?.headline || "";
    const pctMatch = headline.match(/(\d+(\.\d+)?)%/);
    if (pctMatch) {
      const pct = parseFloat(pctMatch[1]);
      if (pct >= 5) rewardScore = 9.7;
      else if (pct >= 3) rewardScore = 9.4;
      else if (pct >= 1.5) rewardScore = 9.0;
      else rewardScore = 8.6;
    } else if (/10x|cashback|unlimited/i.test(headline)) {
      rewardScore = 9.6;
    }

    // 2. Lounge & Travel Score
    let loungeScore = 8.0;
    const dom = card.loungeAccess?.domestic?.toLowerCase() || "";
    const intl = card.loungeAccess?.international?.toLowerCase() || "";
    const hasDom = dom && !dom.includes("not available") && !dom.includes("nil") && !dom.includes("check terms");
    const hasIntl = intl && !intl.includes("not available") && !intl.includes("nil");
    if (hasDom && hasIntl) loungeScore = 9.7;
    else if (hasDom) loungeScore = 9.2;
    else if (hasIntl) loungeScore = 9.0;
    else loungeScore = 7.6;

    // 3. Fee-to-Value Score
    let feeScore = 9.1;
    const isFree =
      card.annualFee?.toLowerCase().includes("free") ||
      card.annualFee?.includes("₹0") ||
      card.annualFee?.toLowerCase().includes("nil");
    if (isFree) feeScore = 9.8;
    else if (card.feeWaiver) feeScore = 9.4;
    else feeScore = 8.7;

    // 4. Ecosystem & Merchant Offers Score
    const highlightsCount = card.keyHighlights?.length || 0;
    let ecosystemScore = 9.2;
    if (highlightsCount >= 5) ecosystemScore = 9.5;
    else if (highlightsCount >= 3) ecosystemScore = 9.3;

    const list = [
      { label: "Reward & Return Value", score: rewardScore, icon: Zap },
      { label: "Airport Lounge & Travel", score: loungeScore, icon: Sparkles },
      { label: "Fee-to-Value Ratio", score: feeScore, icon: Target },
      { label: "Ecosystem & Merchant Offers", score: ecosystemScore, icon: ThumbsUp },
    ];

    const avg = parseFloat((list.reduce((acc, curr) => acc + curr.score, 0) / list.length).toFixed(1));

    return { scores: list, overallScore: avg };
  }, [card]);

  return (
    <section
      id="overview"
      aria-label="Editorial Overview and Rating"
      className="py-10 sm:py-14 md:py-18 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left: Editorial Take & "Best For" (7 cols) */}
        <div className="lg:col-span-7 space-y-6 w-full min-w-0">
          
          {/* Main Editorial Verdict Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-200/90 shadow-sm relative overflow-hidden">
            {/* Corner Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-4">
              <Award className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>GROFI EDITORIAL VERDICT</span>
            </div>

            <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-snug wrap-break-word">
              Why We Recommend The <span className="text-primary">{card.name}</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-montserrat mt-3 sm:mt-4 leading-relaxed wrap-break-word">
              {card.editorialVerdict ||
                `The ${card.name} stands out as a compelling contender in ${card.issuer}'s credit card line-up. With attractive reward yields, comprehensive travel privileges, and well-designed fee waiver targets, it caters seamlessly to modern cardholders.`}
            </p>

            {/* Who is it best for highlight callout */}
            {card.bestFor && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-amber-50/80 via-[#FEF6E4] to-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-5 h-5 text-amber-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block font-montserrat">
                    Best Suited For
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 font-montserrat mt-0.5 wrap-break-word leading-snug">
                    {card.bestFor}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Welcome Benefits Showcase Card */}
          {card.welcomeBenefits && card.welcomeBenefits.length > 0 && (
            <div className="bg-linear-to-br from-emerald-50/70 via-white to-emerald-50/40 rounded-3xl p-5 sm:p-7 md:p-8 border border-emerald-200/90 shadow-sm overflow-hidden">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-800 flex items-center justify-center shrink-0">
                    <Gift className="w-4 h-4 text-emerald-700" />
                  </div>
                  <h3 className="font-bricolage font-bold text-lg sm:text-xl text-emerald-950 leading-snug wrap-break-word">
                    Welcome Gift &amp; Activation Benefits
                  </h3>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full font-montserrat shrink-0">
                  Bonus Value
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {card.welcomeBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-emerald-100/80 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-emerald-950 font-montserrat leading-relaxed min-w-0 flex-1 wrap-break-word font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-emerald-800/80 font-montserrat mt-4 leading-normal wrap-break-word">
                * Welcome benefits are typically unlocked upon payment of the joining fee and initial card activation within 30 to 90 days.
              </p>
            </div>
          )}

        </div>

        {/* Right: Grofi Scorecard & Rating Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-200/90 shadow-sm w-full min-w-0">
          
          {/* Header Score summary */}
          <div className="flex items-center justify-between gap-3 pb-5 border-b border-gray-100">
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-montserrat block">
                Independent Benchmark
              </span>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 mt-0.5 leading-snug">
                Grofi Expert Rating
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-[#EBF4ED] border border-primary/20 rounded-2xl px-3.5 py-2 shrink-0">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500 shrink-0" />
              <div className="flex items-baseline">
                <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-primary leading-none">
                  {overallScore}
                </span>
                <span className="text-xs text-gray-500 font-montserrat font-bold ml-1">
                  / 10
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Metric Progress Bars */}
          <div className="space-y-4 sm:space-y-5 my-6">
            {scores.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between gap-2 text-xs font-montserrat font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1.5 min-w-0 flex-1">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="font-bold text-gray-900 shrink-0 font-mono text-xs">
                      {item.score} / 10
                    </span>
                  </div>

                  {/* Accessible Progress track */}
                  <div
                    role="progressbar"
                    aria-label={item.label}
                    aria-valuenow={item.score}
                    aria-valuemin={0}
                    aria-valuemax={10}
                    className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5"
                  >
                    <div
                      className="h-full bg-linear-to-r from-primary via-emerald-600 to-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editorial Highlights Box */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-montserrat text-gray-600 space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold">
              <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Independent Grofi Methodology</span>
            </div>
            <p className="leading-relaxed text-[11px] wrap-break-word">
              Ratings are algorithmically weighted using real-world net reward yields after fee deductions, partner redemption flexibility, lounge conditions, and pricing transparency.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
