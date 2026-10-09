"use client";

import React from "react";
import {
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCheck2,
  Coins,
  ShieldCheck,
  Target,
  Clock,
  Percent,
  Check,
  AlertCircle,
  Calendar,
  RotateCcw,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";

interface ShortTermLoanHighlightsSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanHighlightsSection({
  lender,
}: ShortTermLoanHighlightsSectionProps) {
  // Speed benchmark score
  const speedScore =
    lender.disbursalSpeedCategory === "under-5-mins"
      ? 9.9
      : lender.disbursalSpeedCategory === "under-15-mins"
      ? 9.7
      : lender.disbursalSpeedCategory === "under-2-hours"
      ? 9.3
      : 8.9;

  // Rate score
  const minRate = lender.interestRate?.min ?? 14.0;
  const rateScore = minRate <= 11.0 ? 9.8 : minRate <= 14.0 ? 9.4 : minRate <= 18.0 ? 9.0 : 8.5;

  // Amount & tenure flexibility score
  const maxAmt = lender.maxAmountNum || 500000;
  const amountScore = maxAmt >= 1000000 ? 9.7 : maxAmt >= 300000 ? 9.4 : 9.0;

  const benchmarkScores = [
    { label: "Disbursal Speed Benchmark", score: speedScore, icon: Zap },
    { label: "Interest Rate Competitiveness", score: rateScore, icon: Percent },
    { label: "Short Tenure & Limit Flexibility", score: amountScore, icon: Calendar },
    { label: "Digital e-KYC & Paperless Flow", score: 9.7, icon: FileCheck2 },
  ];

  const pillars = [
    {
      title: "Minimal Total Interest Outgo",
      desc: "By settling within 3 to 12 months, you stop interest compounding early, saving thousands compared to multi-year term loans.",
      icon: Coins,
      badge: "Save on Interest",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Rapid Automated Disbursal",
      desc: `Direct algorithmic approval deposited into your bank account in ${lender.disbursalTime} via automated 24x7 IMPS rails.`,
      icon: Clock,
      badge: lender.disbursalTime,
      color: "text-blue-700 bg-blue-50 border-blue-200",
    },
    {
      title: "Zero Prepayment Penalty",
      desc: "Close the loan ahead of schedule as soon as your salary, bonus, or liquidity arrives without lock-in penalties.",
      icon: RotateCcw,
      badge: "Zero Foreclosure Fee",
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      title: "100% RBI Fair Lending",
      desc: `Originated by ${lender.rbiRegulatedEntity} with mandatory KFS disclosure and cooling-off protection.`,
      icon: ShieldCheck,
      badge: "RBI Protected",
      color: "text-purple-700 bg-purple-50 border-purple-200",
    },
  ];

  const defaultPros = [
    `Rapid turnaround time of ${lender.disbursalTime} directly to bank account`,
    `Flexible short tenures from ${lender.shortTenureOptions?.[0] || "3 Months"} allowing rapid loan payoff`,
    `Paperless verification via Aadhaar OTP e-KYC and Account Aggregator`,
    lender.minCreditScore <= 650
      ? `Accessible for entry-level professionals with minimum CIBIL score of ${lender.minCreditScore}`
      : `Competitive rates starting at ${lender.interestRate?.min ?? 12.0}% p.a. for good credit profiles`,
  ];

  const prosList = lender.pros && lender.pros.length > 0 ? lender.pros : defaultPros;

  const defaultCons = [
    `Processing fee of ${lender.processingFee} is deducted from the disbursed amount`,
    "Short tenures require higher monthly cash flow compared to 3-5 year tenures",
  ];

  const consList = lender.cons && lender.cons.length > 0 ? lender.cons : defaultCons;

  return (
    <section id="overview" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-montserrat">
      {/* ── Main Editorial Overview Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Verdict & Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-4">
              <Award className="w-3.5 h-3.5 text-[#C9AA3C]" />
              <span>GROFI EDITORIAL VERDICT</span>
            </div>

            <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 leading-snug">
              Why We Recommend <span className="text-primary">{lender.name}</span> for Short-Term Needs
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
              {lender.tagline}. With a turnaround time of <strong>{lender.disbursalTime}</strong> and starting rates from{" "}
              <strong>{lender.interestRate?.min ?? 12.0}% p.a.</strong>, {lender.name} delivers one of the most cost-effective bridges for short-term liquidity in India. Rather than trapping borrowers in long 3 to 5-year repayment cycles where interest balloons, this product lets you borrow precisely what is required and clear the balance quickly.
            </p>

            {/* Best For Callout */}
            {lender.recommendedFor && (
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-[#FEF6E4] to-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                    Ideal Borrower Profile
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">
                    {lender.recommendedFor}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Features Highlights Box */}
          {lender.features && lender.features.length > 0 && (
            <div id="highlights" className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-800 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                  </div>
                  <h3 className="font-bricolage font-bold text-lg sm:text-xl text-emerald-950">
                    Key Features & Advantages
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Short-Term Benefits
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {lender.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-800 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Benchmark Scorecard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="font-bricolage font-bold text-lg text-gray-900">
                Short-Term Lending Scorecard
              </h3>
              <div className="flex items-center gap-1 bg-[#EBF4ED] text-primary px-2.5 py-1 rounded-full text-xs font-bold border border-primary/15">
                <span>{lender.rating || 4.7}</span>
                <span className="text-gray-400 font-normal">/ 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {benchmarkScores.map((b, idx) => {
                const Icon = b.icon;
                const pct = (b.score / 10) * 100;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        {b.label}
                      </span>
                      <span className="font-bold text-gray-900">{b.score} / 10</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">
                  Disbursal Turnaround
                </span>
                <span className="font-bold text-emerald-700 mt-0.5 block truncate">
                  {lender.disbursalTime}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">
                  Cooling-Off Window
                </span>
                <span className="font-bold text-blue-700 mt-0.5 block truncate">
                  {lender.coolingOffPeriod}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Pre-Approval Guarantee Badge */}
          <div className="bg-[#EBF4ED]/70 border border-primary/20 rounded-3xl p-5 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-gray-800 leading-relaxed">
              <strong className="text-primary font-bold block mb-1">
                Grofi Short-Term Borrowing Charter
              </strong>
              We audit lending partners against RBI digital lending directives. All fees are disclosed in an itemized Key Fact Statement (KFS) prior to agreement execution, ensuring zero hidden clauses or compounding traps.
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 Pillar Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${pillar.color}`}>
                    {pillar.badge}
                  </span>
                </div>
                <h4 className="font-bricolage font-bold text-base text-gray-900 mb-1.5">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Pros & Considerations (Cons) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Pros */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-emerald-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="font-bricolage font-bold text-lg text-emerald-950">
                Key Benefits (Pros)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {prosList.length} Advantages
            </span>
          </div>

          <ul className="space-y-3">
            {prosList.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-rose-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center">
                <AlertCircle className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="font-bricolage font-bold text-lg text-rose-950">
                Points to Consider
              </h3>
            </div>
            <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
              {consList.length} Points
            </span>
          </div>

          <ul className="space-y-3">
            {consList.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span className="text-xs text-rose-950 font-medium leading-relaxed">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
