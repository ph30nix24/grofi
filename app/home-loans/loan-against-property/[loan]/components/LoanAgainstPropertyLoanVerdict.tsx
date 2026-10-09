"use client";

import React from "react";
import {
  CheckCircle2,
  Award,
  ShieldCheck,
  Star,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanVerdictProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanVerdict({
  lender,
}: LoanAgainstPropertyLoanVerdictProps) {
  const { openApplyModal } = useApplyModal();
  const minRate = lender.interestRate?.min ?? 9.25;

  // Scorecard benchmarks computed dynamically from DB data
  const scorecard = [
    {
      metric: "Mortgage Benchmark Rate Spread",
      score: minRate <= 9.3 ? 9.8 : minRate <= 9.8 ? 9.5 : minRate <= 10.3 ? 9.1 : 8.7,
      note: `Floor mortgage rate at ${minRate}% p.a. pegged to benchmark repo/MCLR lending frameworks.`,
    },
    {
      metric: "Property LTV Ratio Efficiency",
      score: lender.maxLtvPercent >= 70 ? 9.8 : lender.maxLtvPercent >= 65 ? 9.5 : 9.0,
      note: `Sanctions up to ${lender.maxLtvPercent}% market value on residential assets (${lender.maxLtv}).`,
    },
    {
      metric: "Processing Fee Cap & Cost Transparency",
      score: lender.processingFeeCap ? 9.7 : 9.1,
      note: lender.processingFeeCap
        ? `Statutory ceiling cap of ${lender.processingFeeCap} protects multi-crore ticket sizes.`
        : `Competitive rate of ${lender.processingFee} with zero hidden appraisal costs.`,
    },
    {
      metric: "Liquidity & Overdraft Headroom",
      score: lender.overdraftAvailable ? 9.8 : 8.8,
      note: lender.overdraftAvailable
        ? `Includes ${lender.overdraftScheme || "Flexible Property Overdraft"} to save interest via surplus cash deposits.`
        : "Standard fixed term loan with structured monthly principal-interest amortization.",
    },
    {
      metric: "Doorstep Title & Valuation Turnaround",
      score: 9.3,
      note: "Empaneled legal advocates and certified structural engineers conduct prompt 30-year search & valuation.",
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
          Is <span className="text-primary">{lender.name}</span> the Best Mortgage for Your Property?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Our senior credit desk evaluates {lender.name} across benchmark interest rate spreads, collateral LTV ceilings, fee caps, and overdraft flexibility.
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
                Assessed against RBI banking frameworks &amp; market peers
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{overallScore} / 10 Benchmark Index</span>
            </div>
          </div>

          <div className="space-y-4">
            {scorecard.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800">{item.metric}</span>
                  <span className="font-bricolage font-extrabold text-primary text-sm">
                    {item.score} / 10
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.score * 10}%` }}
                  />
                </div>

                <p className="text-[11px] text-gray-500 leading-normal">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Quick Regulatory Note */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2.5 text-xs text-gray-600 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Fair Lending Assurance:</strong> In full alignment with RBI circulars, individual borrowers availing floating-rate mortgage loans incur <strong>0% foreclosure penalties</strong> and part-prepayment charges.
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Verdict Summary Box */}
        <div className="lg:col-span-5 bg-linear-to-b from-white to-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-lg space-y-5 relative overflow-hidden">
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Analyst Consensus
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-gray-900 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{lender.rating || 4.8} Overall Rating</span>
            </div>
          </div>

          <div>
            <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
              Best For:
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1 leading-relaxed">
              {lender.recommendedFor}
            </p>
          </div>

          {/* Key Advantages Checklist */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Key Advantages
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              {lender.pros?.slice(0, 4).map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Multi-purpose end use: Business expansion, debt consolidation, or asset acquisition.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <div className="text-gray-500 text-[10px]">Min CIBIL Score</div>
              <div className="font-bricolage font-extrabold text-gray-900 text-sm">
                {lender.minCreditScore}+
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <div className="text-gray-500 text-[10px]">Max Tenure</div>
              <div className="font-bricolage font-extrabold text-gray-900 text-sm">
                {lender.maxTenure}
              </div>
            </div>
          </div>

          {/* Apply CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for {lender.name}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
