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
  ThumbsUp,
  Percent,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";

interface InstantLoanHighlightsSectionProps {
  lender: InstantLoanLender;
}

export default function InstantLoanHighlightsSection({
  lender,
}: InstantLoanHighlightsSectionProps) {
  // Speed benchmark score
  const speedScore = lender.disbursalSpeedCategory === "under-10-seconds"
    ? 9.9
    : lender.disbursalSpeedCategory === "under-15-mins"
    ? 9.7
    : lender.disbursalSpeedCategory === "under-2-hours"
    ? 9.3
    : 8.9;

  // Rate score
  const minRate = lender.interestRate?.min ?? 10.5;
  const rateScore = minRate <= 9.5 ? 9.8 : minRate <= 10.5 ? 9.5 : minRate <= 12.0 ? 9.1 : 8.6;

  // Amount score
  const maxAmt = lender.maxAmountNum || 1000000;
  const amountScore = maxAmt >= 4000000 ? 9.7 : maxAmt >= 1000000 ? 9.3 : 8.8;

  const benchmarkScores = [
    { label: "Disbursal Speed Benchmark", score: speedScore, icon: Zap },
    { label: "Interest Rate Competitiveness", score: rateScore, icon: Percent },
    { label: "Sanction Limit & Tenures", score: amountScore, icon: Coins },
    { label: "Digital e-KYC Experience", score: 9.6, icon: FileCheck2 },
  ];

  const pillars = [
    {
      title: "Rapid Disbursal Rails",
      desc: `Direct algorithmic approval deposited into your bank account in ${lender.disbursalTime} via 24x7 IMPS rails.`,
      icon: Clock,
      badge: lender.disbursalTime,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Paperless Verification",
      desc: `${lender.documentation} using DigiLocker Aadhaar OTP and RBI Account Aggregator banking feeds.`,
      icon: FileCheck2,
      badge: "Zero Paperwork",
      color: "text-blue-700 bg-blue-50 border-blue-200",
    },
    {
      title: "Credit Flexibility",
      desc: `Borrow from ${lender.minAmount} up to ${lender.maxAmount} with customizable repayment tenures of ${lender.tenure}.`,
      icon: Coins,
      badge: `Up to ${lender.maxAmount}`,
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      title: "Regulated Security",
      desc: "Zero contacts or gallery scraping. Strictly compliant with RBI Digital Lending directives with transparent KFS.",
      icon: ShieldCheck,
      badge: "RBI Protected",
      color: "text-purple-700 bg-purple-50 border-purple-200",
    },
  ];

  // Tailored pros for instant loans
  const instantPros = [
    `Lightning-fast disbursal turnaround of ${lender.disbursalTime}`,
    `${lender.documentation} — zero physical documents or branch visits`,
    `Starting interest rates from ${lender.interestRate?.min ?? 9.99}% p.a. with starting EMI of ₹${lender.startingEmiPerLakh}/Lakh`,
    lender.minCreditScore <= 650
      ? `Accessible for credit builders with minimum CIBIL score of ${lender.minCreditScore}`
      : `Attractive rate discounts for borrowers with CIBIL score above ${lender.minCreditScore}`,
  ];

  // Balanced considerations (cons)
  const instantCons = [
    `Processing fee of ${lender.processingFee} is deducted from the disbursed amount`,
    "Timely repayment is essential as overdue delays are promptly reported to credit bureaus",
  ];

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
              Why We Recommend <span className="text-primary">{lender.name}</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
              {lender.tagline}. With a guaranteed disbursal window of{" "}
              <strong>{lender.disbursalTime}</strong> and starting rates from{" "}
              <strong>{lender.interestRate?.min ?? 9.99}% p.a.</strong>, {lender.name} delivers one of the fastest, most streamlined digital borrowing experiences in India. Through automated Aadhaar e-KYC and digital bank statement feeds, eligible borrowers can access sovereign liquidity without cumbersome branch queues.
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
                  Instant Cash Features
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
                Lending Scorecard
              </h3>
              <div className="flex items-center gap-1 bg-[#EBF4ED] text-primary px-2.5 py-1 rounded-full text-xs font-bold border border-primary/15">
                <span>{lender.rating || 4.8}</span>
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
                  RBI Compliance
                </span>
                <span className="font-bold text-blue-700 mt-0.5 block">
                  100% Regulated
                </span>
              </div>
            </div>
          </div>

          {/* Quick Pre-Approval Guarantee Badge */}
          <div className="bg-[#EBF4ED]/70 border border-primary/20 rounded-3xl p-5 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-gray-800 leading-relaxed">
              <strong className="text-primary font-bold block mb-1">
                Grofi Transparency Commitment
              </strong>
              We audit lending partners against RBI digital lending directives. No unsolicited gallery access, no phone contact scrapes, and transparent Key Fact Statements (KFS) before any loan agreement is executed.
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
              {instantPros.length} Advantages
            </span>
          </div>

          <ul className="space-y-3">
            {instantPros.map((pro, idx) => (
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
                Things to Consider
              </h3>
            </div>
            <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
              {instantCons.length} Points
            </span>
          </div>

          <ul className="space-y-3">
            {instantCons.map((con, idx) => (
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
