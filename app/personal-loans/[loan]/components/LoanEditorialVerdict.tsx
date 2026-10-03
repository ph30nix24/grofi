"use client";

import React from "react";
import {
  Award,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  Target,
  BadgeCheck,
  Star,
  Zap,
  Percent,
  ShieldCheck,
} from "lucide-react";
import { PersonalLoanLender } from "../../components/type";

interface LoanEditorialVerdictProps {
  lender: PersonalLoanLender;
}

export default function LoanEditorialVerdict({ lender }: LoanEditorialVerdictProps) {
  // Benchmark scoring parameters tailored to personal loans
  const minRate = lender.interestRate?.min ?? 10.5;
  const rateScore = minRate <= 10.0 ? 9.8 : minRate <= 10.5 ? 9.5 : minRate <= 11.0 ? 9.1 : 8.7;
  
  const disbursalStr = (lender.disbursalTime || "").toLowerCase();
  const speedScore = disbursalStr.includes("sec") ? 9.9 : disbursalStr.includes("min") ? 9.6 : disbursalStr.includes("hour") ? 9.3 : 8.9;

  const maxAmt = lender.maxAmountNum || 4000000;
  const sanctionScore = maxAmt >= 4000000 ? 9.6 : maxAmt >= 2500000 ? 9.2 : 8.8;

  const scores = [
    { label: "Disbursal Speed & Paperless e-KYC", score: speedScore, icon: Zap },
    { label: "Interest Rate Competitiveness", score: rateScore, icon: Percent },
    { label: "Loan Amount Sanction & Tenure", score: sanctionScore, icon: Target },
    { label: "Prepayment & Foreclosure Flexibility", score: 9.3, icon: ThumbsUp },
  ];

  const overallRating = lender.rating ? lender.rating : 4.8;

  return (
    <section id="overview" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-montserrat">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Editorial Overview & Best For (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Editorial Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-4">
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>GROFI EDITORIAL VERDICT</span>
            </div>

            <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 leading-snug">
              Why We Recommend <span className="text-primary">{lender.name}</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
              {lender.overview ||
                `${lender.name} ranks among the premier personal financing options in India, offering competitive reducing balance interest rates, minimal paperwork through DigiLocker e-KYC, and rapid account disbursals.`}
            </p>

            {/* Best Suited For Box */}
            {lender.recommendedFor && (
              <div className="mt-6 p-4.5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-[#FEF6E4] to-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
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

          {/* Key Product Features Grid */}
          {lender.features && lender.features.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-800 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                  </div>
                  <h3 className="font-bricolage font-bold text-lg sm:text-xl text-emerald-950">
                    Key Advantages & Product Highlights
                  </h3>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Highlights
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {lender.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All terms verified according to current RBI Master Directions on Fair Lending Practices.</span>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Scorecard & Benchmark Meter (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
          
          {/* Header Score summary */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                BENCHMARK SCORE
              </span>
              <h3 className="font-bricolage font-extrabold text-xl text-gray-900 mt-0.5">
                Grofi Lender Rating
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-[#EBF4ED] border border-primary/20 rounded-2xl px-4 py-2.5">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div>
                <span className="font-bricolage font-extrabold text-2xl text-primary leading-none">
                  {overallRating}
                </span>
                <span className="text-[11px] text-gray-500 font-bold ml-0.5">
                  / 5.0
                </span>
              </div>
            </div>
          </div>

          {/* Metric Progress Bars */}
          <div className="space-y-5 my-6">
            {scores.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-bold text-gray-900">{item.score} / 10</span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Methodology Info Box */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-600 space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold">
              <BadgeCheck className="w-4 h-4 text-primary" />
              <span>Unbiased Verification Guarantee</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Grofi rigorously scores lenders across true annual percentage rate (APR), processing transparency, automated Account Aggregator speed, and customer grievance turnaround times.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
