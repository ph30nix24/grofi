"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  ThumbsUp,
  AlertTriangle,
  Scale,
  Sparkles,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanProsConsSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanProsConsSection({ lender }: HomeLoanProsConsSectionProps) {
  const pros =
    lender.pros && lender.pros.length > 0
      ? lender.pros
      : [
          `Starting interest rate from ${lender.interestRate?.min ?? 7.15}% p.a. linked directly to RBI Repo Rate`,
          `High loan-to-value funding up to ${lender.maxLtv} for property purchases`,
          `NIL (0%) prepayment & foreclosure charges on floating interest rates`,
          lender.overdraftScheme
            ? `${lender.overdraftScheme} overdraft account lets you save interest while retaining liquidity`
            : "Flexible part-prepayment facility anytime without lock-in penalties",
          `Special 5 bps (${lender.womenConcession}) interest concession for women borrowers`,
          "Extensive panel of pre-approved builder projects across India for faster sanctions",
        ];

  const cons = [
    "Strict 30-year chain title search required; properties with legal discrepancies are rejected",
    lender.bankType.toLowerCase() === "psu"
      ? "Turnaround time can take 5–8 days compared to private fintech lenders"
      : "Slightly higher processing fees on non-promotional months",
    "Requires minimum credit score of " + lender.minCreditScore + "+ to qualify for the advertised floor rate",
    "Physical doorstep verification of property site and boundary walls is mandatory before disbursal",
  ];

  return (
    <section id="pros-cons" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Scale className="w-3.5 h-3.5 text-gold" />
          <span>HONEST EDITORIAL ASSESSMENT</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Pros &amp; Cons of <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          A neutral assessment of strengths and trade-offs to help you decide if {lender.name} aligns with your borrowing requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Pros Column */}
        <div className="bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/20 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bricolage font-bold text-lg text-emerald-950">
                Key Strengths &amp; Advantages
              </h3>
              <p className="text-[11px] text-emerald-700 font-medium">Why homebuyers choose this lender</p>
            </div>
          </div>

          <ul className="space-y-3 pt-1">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="bg-gradient-to-br from-amber-50/30 via-white to-amber-50/10 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-amber-100">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bricolage font-bold text-lg text-amber-950">
                Important Considerations
              </h3>
              <p className="text-[11px] text-amber-700 font-medium">Potential bottlenecks to plan for</p>
            </div>
          </div>

          <ul className="space-y-3 pt-1">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
