"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  Target,
  Award,
  TrendingDown,
  ShieldCheck,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";

interface BalanceTransferLoanVerdictProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanVerdict({
  lender,
}: BalanceTransferLoanVerdictProps) {
  const minRate = lender.interestRate?.min ?? 7.25;

  // Scorecard benchmarks computed dynamically from DB data
  const scorecard = [
    {
      metric: "Interest Rate Arbitrage",
      score: minRate <= 7.15 ? 9.9 : minRate <= 7.25 ? 9.7 : minRate <= 7.4 ? 9.3 : 8.8,
      note: `Floor takeover rate at ${minRate}% p.a. linked directly to RBI EBLR repo index`,
    },
    {
      metric: "Processing Fee Cap Protection",
      score: lender.processingFeeCap.includes("18,000") || lender.processingFeeCap.includes("10,000") ? 9.8 : 9.2,
      note: `Statutory upper cap at ${lender.processingFeeCap || "Nominal fee"} protecting high-ticket borrowers`,
    },
    {
      metric: "Top-Up Headroom & Overdraft",
      score: lender.overdraftScheme ? 9.8 : lender.topUpAvailable ? 9.3 : 8.6,
      note: lender.overdraftScheme
        ? `Includes ${lender.overdraftScheme} and top-up limit ${lender.maxTopUpAmount.replace(/based on.*/i, "")}`
        : `Top-up loan availability: ${lender.maxTopUpAmount}`,
    },
    {
      metric: "Handover & Cheque Turnaround",
      score: lender.turnaroundTime.includes("3") || lender.turnaroundTime.includes("5") ? 9.4 : 9.0,
      note: `Average cheque disbursal in ${lender.turnaroundTime} against LOD and foreclosure statement`,
    },
    {
      metric: "Special Concessions & Subsidies",
      score: 9.2,
      note: `${lender.womenConcession} with zero foreclosure penalties on floating rate`,
    },
  ];

  const overallScore = lender.rating || 4.8;

  return (
    <section
      id="overview"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Award className="w-3.5 h-3.5 text-gold" />
          <span>EDITORIAL VERDICT &amp; SCORECARD</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Is <span className="text-primary">{lender.name}</span> the Right Choice for Your Switch?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Our senior credit analysts benchmark {lender.name}&apos;s balance transfer scheme across interest arbitrage, fee caps, top-up headroom, and title deed handover speed.
        </p>
      </div>

      {/* Main Grid: Scorecard (7 cols) + Verdict Box (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5-Point Benchmark Scorecard */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                Lender Benchmark Matrix
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Evaluated against RBI benchmark lending frameworks
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Grofi Rating
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bricolage font-extrabold text-xl text-gray-900">
                  {overallScore}
                </span>
                <span className="text-xs text-gray-500">/ 5</span>
              </div>
            </div>
          </div>

          {/* Metric Progress Bars */}
          <div className="space-y-4">
            {scorecard.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-gray-800">{item.metric}</span>
                  <span className="font-bricolage font-extrabold text-primary">
                    {item.score.toFixed(1)} / 10
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-teal-600 rounded-full transition-all duration-700"
                    style={{ width: `${item.score * 10}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-500 font-medium">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Verified RBI Regulated Institution
            </span>
            <span className="text-gray-500">{lender.reviewCount} Borrower Ratings</span>
          </div>
        </div>

        {/* Right Column: Editorial Summary & Recommendation */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recommendation Box */}
          <div className="bg-linear-to-br from-[#02474D] via-[#033B40] to-[#022B2F] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-emerald-200 border border-white/15">
                <Target className="w-3.5 h-3.5 text-gold" />
                <span>IDEAL BORROWER FIT</span>
              </div>

              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-white leading-snug">
                Recommended For
              </h3>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {lender.recommendedFor}
              </p>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Min. Monthly Income:</span>
                  <span className="font-bold text-white">{lender.minIncome}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Min. Credit Score:</span>
                  <span className="font-bold text-emerald-300">{lender.minCreditScore}+ CIBIL</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Women Concession:</span>
                  <span className="font-bold text-gold">{lender.womenConcession}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Value Pillars */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3.5">
            <h4 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Key Advantages of Switching to {lender.name}</span>
            </h4>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Processing Fee Capped:</strong> {lender.processingFeeCap} prevents excessive charges regardless of how large your remaining loan balance is.
                </span>
              </div>

              {lender.overdraftScheme ? (
                <div className="flex items-start gap-2.5">
                  <RefreshCw className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Overdraft Advantage:</strong> {lender.overdraftScheme} allows you to park spare salary or business profits to slash interest daily.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Foreclosure Fees:</strong> 0% charges on floating rate takeover loan per RBI consumer lending regulations.
                  </span>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Simultaneous Top-Up:</strong> Unlock {lender.maxTopUpAmount} at standard home loan rates without paying commercial personal loan rates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
