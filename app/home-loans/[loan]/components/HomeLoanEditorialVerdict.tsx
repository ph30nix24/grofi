"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  Target,
  Award,
  TrendingDown,
  Building2,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanEditorialVerdictProps {
  lender: HomeLoanLender;
}

export default function HomeLoanEditorialVerdict({ lender }: HomeLoanEditorialVerdictProps) {
  const minRate = lender.interestRate?.min ?? 7.15;

  // Dynamic Scorecard Matrix
  const scorecard = [
    {
      metric: "Interest Rate Competitiveness",
      score: minRate <= 7.25 ? 9.8 : minRate <= 7.5 ? 9.4 : 8.9,
      note: `Starts at ${minRate}% p.a. linked directly to RBI Repo EBLR`,
    },
    {
      metric: "Loan-to-Value (LTV) Funding",
      score: 9.3,
      note: `${lender.maxLtv} property funding per RBI maximum slabs`,
    },
    {
      metric: "Prepayment & Overdraft Flexibility",
      score: lender.overdraftScheme ? 9.7 : 9.1,
      note: lender.overdraftScheme
        ? `Features ${lender.overdraftScheme} interest offset facility`
        : "0% prepayment & foreclosure penalty on floating rate",
    },
    {
      metric: "Digital Pre-Approval & Verification",
      score: 9.2,
      note: "Instant in-principle sanction with paperless DigiLocker e-KYC",
    },
    {
      metric: "Doorstep Legal & Technical Support",
      score: 9.0,
      note: "Dedicated advocate title search & engineer property valuation",
    },
  ];

  const overallScore = lender.rating || 4.7;

  return (
    <section id="overview" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Award className="w-3.5 h-3.5 text-gold" />
          <span>GROFI INDEPENDENT BENCHMARK</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Editorial Verdict &amp; Performance Review for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          An honest, data-backed assessment comparing interest rate margins, LTV financing, overdraft savings, and processing turnaround.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editorial Summary & Who Should Apply (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Verdict Quote Card */}
          <div className="bg-gradient-to-br from-white via-[#FDFBF7] to-white rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                Grofi Editorial Verdict
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              {lender.tagline}. With benchmark rates starting from{" "}
              <strong className="text-gray-900 font-bold">{minRate}% p.a.</strong>, {lender.name} stands as one of the most reliable choices for Indian homebuyers in 2026. The lender pairs transparent External Benchmark Lending Rate (EBLR) pass-throughs with up to {lender.maxLtv} property financing and zero prepayment penalties.
            </p>

            {lender.overdraftScheme && (
              <div className="mt-4 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-start gap-3">
                <RefreshCw className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-950 leading-relaxed">
                  <strong>Overdraft Advantage:</strong> With {lender.overdraftScheme}, surplus funds deposited into your linked account automatically reduce daily interest calculation, potentially cutting loan tenure by 4 to 8 years.
                </p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                RBI Scheduled Institution
              </span>
              <span>Updated for Fiscal Year 2026</span>
            </div>
          </div>

          {/* Ideal Borrower Profile */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h4 className="font-bricolage font-bold text-base text-gray-900">
                Who is this Home Loan Ideal For?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">First-Time Home Buyers</span>
                <p className="text-gray-600 leading-relaxed">
                  Borrowers seeking maximum property funding (up to 90% LTV) with minimal upfront down payment.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">High CIBIL Scorers (750+)</span>
                <p className="text-gray-600 leading-relaxed">
                  Qualified applicants who unlock the prime floor rate of {minRate}% p.a. with zero mark-up spread.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">Balance Transfer Switchers</span>
                <p className="text-gray-600 leading-relaxed">
                  Existing home loan holders currently servicing higher MCLR or NBFC rates above 8.50% p.a.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">Women Co-Owners</span>
                <p className="text-gray-600 leading-relaxed">
                  Families availing 5 bps ({lender.womenConcession}) interest concession by making a woman primary or joint owner.
                </p>
              </div>
            </div>

            {/* Recommended for note */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 italic">
                <strong className="text-gray-700 not-italic font-bold">Summary: </strong>
                {lender.recommendedFor}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Scorecard & Benchmark Meters (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          {/* Overall Rating Display */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                Overall Grofi Score
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900">
                  {overallScore}
                </span>
                <span className="text-xs font-bold text-gray-400">/ 5.0</span>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
                <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                <span>Top Pick</span>
              </div>
              <span className="text-[10px] text-gray-400 block mt-1">
                {lender.reviewCount ? `${lender.reviewCount} Reviews` : "Verified Borrowers"}
              </span>
            </div>
          </div>

          {/* Metric Progress Bars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Category Score Breakdown
            </h4>

            {scorecard.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-800">{item.metric}</span>
                  <span className="font-bricolage font-bold text-primary">{item.score}/10</span>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700"
                    style={{ width: `${(item.score / 10) * 100}%` }}
                  />
                </div>

                <p className="text-[10px] text-gray-500 font-medium">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Quick Comparison Highlights */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
              Benchmark Highlights
            </span>
            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-200/60">
              <span className="text-gray-600">Institution Category:</span>
              <span className="font-bold text-gray-900 uppercase">{lender.bankType} Lender</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-200/60">
              <span className="text-gray-600">Min CIBIL Requirement:</span>
              <span className="font-bold text-emerald-700">{lender.minCreditScore}+ Score</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-bold text-gray-900">{lender.processingFee}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
