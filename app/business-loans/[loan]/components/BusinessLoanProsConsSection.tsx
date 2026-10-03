"use client";

import React from "react";
import { Check, X, Scale, ShieldCheck } from "lucide-react";
import { BusinessLoanLender } from "../../components/type";

interface BusinessLoanProsConsSectionProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanProsConsSection({ lender }: BusinessLoanProsConsSectionProps) {
  const pros = [
    `Substantial borrowing limit up to ${lender.maxAmount} under ${lender.collateralType.toLowerCase()} criteria`,
    `Rapid commercial disbursal timeline within ${lender.disbursalTime} directly to business current account`,
    "100% interest paid is tax-deductible as business expense under Section 36(1)(iii) of Income Tax Act",
    "Paperless bank statement and turnover appraisal via automated GSTN & RBI Account Aggregators",
    `Flexible repayment horizon up to ${lender.tenure} to balance working capital cycles`,
  ];

  const cons = [
    `Mandatory operational vintage requirement: ${lender.minVintage}`,
    `Minimum annual audited or GST-reported turnover benchmark: ${lender.minTurnover}`,
    `One-time processing fee of ${lender.processingFee} applies on final sanctioned facility`,
    "Detailed audited balance sheets, financials, and tax computations required for high-quantum borrowing",
  ];

  return (
    <section id="pros-cons" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Scale className="w-3.5 h-3.5 text-gold" />
          <span>OBJECTIVE COMMERCIAL APPRAISAL</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Pros &amp; Cons of <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          An honest, transparent breakdown of advantages and operational criteria before submitting your business credit application.
        </p>
      </div>

      {/* Side-by-Side Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Pros Column */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-emerald-950">
                Key Advantages (Pros)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              {pros.length} Strengths
            </span>
          </div>

          <ul className="space-y-3.5">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
                <X className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-rose-950">
                Factors to Consider (Cons)
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full">
              {cons.length} Requirements
            </span>
          </div>

          <ul className="space-y-3.5">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Editorial Transparency Note */}
      <div className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>
          Independent Editorial Policy: Grofi never levies advisory fees on businesses. Our commercial loan ratings are completely impartial.
        </span>
      </div>

    </section>
  );
}
