"use client";

import React, { useState } from "react";
import {
  FileText,
  Percent,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingDown,
  Sparkles,
} from "lucide-react";

export default function HomeLoanTaxBenefitsSection() {
  const [taxSlab, setTaxSlab] = useState<number>(30); // 30% or 20%

  // Tax savings estimation
  const singleMaxInterestDeduction = 200000;
  const singleMaxPrincipalDeduction = 150000;
  const totalSingleDeduction = singleMaxInterestDeduction + singleMaxPrincipalDeduction;
  const singleTaxSavings = Math.round(totalSingleDeduction * (taxSlab / 100));

  const totalJointDeduction = totalSingleDeduction * 2;
  const jointTaxSavings = Math.round(totalJointDeduction * (taxSlab / 100));

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="tax-benefits" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <FileText className="w-3.5 h-3.5 text-gold" />
          <span>INCOME TAX SAVINGS GUIDE</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Home Loan Tax Deductions: <span className="text-primary">Save up to ₹7 Lakhs/Year</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Leverage Sections 24(b) and 80C under the Indian Income Tax Act to significantly lower your annual tax liability.
        </p>
      </div>

      {/* 3-Column Deductions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Section 24(b) Interest */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Section 24(b)
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Interest Repayment
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Max Annual Deduction</span>
            <div className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 mt-0.5">
              ₹2,00,000 <span className="text-xs font-normal text-gray-500">/ year</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Deduct up to ₹2 Lakhs per fiscal year against the interest portion of your EMI for a self-occupied property. For let-out (rented) homes, the entire interest is eligible subject to house property loss set-off limits.
          </p>

          <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
            ✓ Available under Old Tax Regime
          </div>
        </div>

        {/* Section 80C Principal */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Section 80C
            </span>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Principal &amp; Stamp Duty
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Max Annual Deduction</span>
            <div className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 mt-0.5">
              ₹1,50,000 <span className="text-xs font-normal text-gray-500">/ year</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Claim up to ₹1.5 Lakhs annually on the principal repayment amount. You can also claim stamp duty and registration fees paid during the year of purchase within this overall limit.
          </p>

          <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
            ✓ Lock-in: Property must not be sold for 5 years
          </div>
        </div>

        {/* Joint Co-Borrower Benefit */}
        <div className="bg-gradient-to-br from-[#EBF4ED] via-white to-[#EBF4ED] rounded-3xl p-6 border border-primary/20 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-primary/10">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Joint Home Loan
            </span>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              Double Benefit
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Combined Couple Deduction</span>
            <div className="font-bricolage font-extrabold text-2xl sm:text-3xl text-primary mt-0.5">
              ₹7,00,000 <span className="text-xs font-normal text-gray-500">/ year</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            When husband and wife (or co-owners) co-sign as co-borrowers and contribute to the EMI, both can claim separate deductions of ₹2 Lakhs (Sec 24b) and ₹1.5 Lakhs (Sec 80C) each!
          </p>

          <div className="pt-2 border-t border-primary/10 text-[11px] text-emerald-800 font-bold">
            ✓ Save over ₹2 Lakhs in direct tax cash every year!
          </div>
        </div>
      </div>

      {/* Interactive Tax Savings Summary Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Select Your Income Tax Bracket
            </span>
            <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
              <button
                type="button"
                onClick={() => setTaxSlab(20)}
                className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  taxSlab === 20 ? "bg-white text-primary shadow-2xs" : "text-gray-500"
                }`}
              >
                20% Slab
              </button>
              <button
                type="button"
                onClick={() => setTaxSlab(30)}
                className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  taxSlab === 30 ? "bg-white text-primary shadow-2xs" : "text-gray-500"
                }`}
              >
                30% Slab
              </button>
            </div>
          </div>

          <h4 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
            Estimated In-Hand Cash Saved Each Financial Year
          </h4>
          <p className="text-xs text-gray-500 max-w-xl">
            Calculated under Old Tax Regime assuming optimal claim under Section 24(b) and Section 80C.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-center min-w-[130px]">
            <span className="text-[10px] text-gray-500 font-semibold block uppercase">Single Borrower</span>
            <span className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 block mt-0.5">
              ₹{formatINR(singleTaxSavings)}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">Annual Tax Saved</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center min-w-[140px]">
            <span className="text-[10px] text-emerald-800 font-semibold block uppercase">Joint Borrowers</span>
            <span className="font-bricolage font-extrabold text-xl sm:text-2xl text-emerald-800 block mt-0.5">
              ₹{formatINR(jointTaxSavings)}
            </span>
            <span className="text-[10px] text-emerald-800 font-semibold">Annual Tax Saved</span>
          </div>
        </div>
      </div>
    </section>
  );
}
