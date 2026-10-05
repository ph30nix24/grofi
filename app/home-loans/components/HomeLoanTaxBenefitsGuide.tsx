"use client";

import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Users,
  Sparkles,
  Home,
} from "lucide-react";

export default function HomeLoanTaxBenefitsGuide() {
  const [isJointLoan, setIsJointLoan] = useState<boolean>(true);
  const [taxBracket, setTaxBracket] = useState<number>(30); // 30% default

  // Tax math: Sec 24b (max 2L per person) + Sec 80C (max 1.5L per person)
  const maxInterestDeduction = isJointLoan ? 400000 : 200000;
  const maxPrincipalDeduction = isJointLoan ? 300000 : 150000;
  const totalDeduction = maxInterestDeduction + maxPrincipalDeduction;
  const estimatedTaxSaved = Math.round(totalDeduction * (taxBracket / 100));

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const taxSections = [
    {
      section: "Section 24(b)",
      title: "Interest Repayment Deduction",
      limit: "Up to ₹2,00,000 / year",
      desc: "Claim deduction on interest paid towards home loan for self-occupied property. For let-out properties, the entire interest can be set off up to ₹2 Lakhs loss from house property.",
      highlight: "₹2 Lakhs per co-owner",
      badge: "Highest Tax Saver",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      section: "Section 80C",
      title: "Principal Repayment & Stamp Duty",
      limit: "Up to ₹1,50,000 / year",
      desc: "Deduct the principal amount repaid towards your housing loan. Additionally, registration fees and stamp duty expenses incurred in the year of purchase qualify under this bracket.",
      highlight: "Includes stamp duty & registration",
      badge: "80C Basket",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
      section: "Section 80EEA",
      title: "Affordable Housing Additional Deduction",
      limit: "Up to ₹1,50,000 / year",
      desc: "First-time home buyers purchasing an affordable property (stamp value ≤ ₹45 Lakhs) get an additional ₹1.5L interest rebate over and above Section 24(b).",
      highlight: "Total interest deduction up to ₹3.5L",
      badge: "First-Time Buyers",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      section: "Joint Home Loan",
      title: "Double Deductions for Co-Borrowers",
      limit: "Up to ₹7,00,000 combined / year",
      desc: "When husband and wife or parent and child apply as co-owners and co-borrowers, both can claim individual deductions under Section 24(b) and 80C separately.",
      highlight: "₹4L interest + ₹3L principal",
      badge: "Family Strategy",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <FileText className="w-3.5 h-3.5 text-gold" />
            Income Tax Savings Guide
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How to Save Up to <span className="text-primary">₹7 Lakhs on Income Tax</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Learn how Section 24(b), Section 80C, and joint ownership significantly cut your annual income tax liability under the Old Tax Regime.
          </p>
        </div>

        {/* 2-Column: Left 4 cards, Right Interactive Tax Benefit Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Cards Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {taxSections.map((item) => (
              <div
                key={item.section}
                className="bg-[#FDFBF7] rounded-3xl p-5 border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bricolage font-extrabold text-sm text-primary">
                      {item.section}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <div className="font-bricolage font-extrabold text-lg text-emerald-800 mb-2">
                    {item.limit}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/60 text-[11px] font-semibold text-primary flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Interactive Tax Savings Card (5 cols) */}
          <div className="lg:col-span-5 bg-linear-to-b from-gray-900 to-gray-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <h3 className="font-bricolage font-bold text-lg text-white">
                  Tax Savings Estimator
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                FY 2026-27
              </span>
            </div>

            {/* Applicant Switcher */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Applicant Profile
                </label>
                <div className="grid grid-cols-2 gap-2 bg-gray-800 p-1 rounded-xl border border-gray-700">
                  <button
                    type="button"
                    onClick={() => setIsJointLoan(false)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      !isJointLoan ? "bg-primary text-white shadow-2xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Single Borrower</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsJointLoan(true)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isJointLoan ? "bg-primary text-white shadow-2xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-gold" />
                    <span>Joint (Co-Owners)</span>
                  </button>
                </div>
              </div>

              {/* Tax Slab */}
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Your Income Tax Slab
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "20% Slab", value: 20 },
                    { label: "30% Slab", value: 30 },
                    { label: "39% (High)", value: 39 },
                  ].map((slab) => (
                    <button
                      key={slab.value}
                      type="button"
                      onClick={() => setTaxBracket(slab.value)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                        taxBracket === slab.value
                          ? "bg-gold text-gray-900 border-gold shadow-2xs"
                          : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      {slab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deduction Breakdown Box */}
              <div className="bg-gray-800/80 rounded-2xl p-4 border border-gray-700 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Section 24(b) Interest:</span>
                  <span className="font-bold text-white">₹{formatINR(maxInterestDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Section 80C Principal:</span>
                  <span className="font-bold text-white">₹{formatINR(maxPrincipalDeduction)}</span>
                </div>
                <div className="pt-2 border-t border-gray-700 flex justify-between">
                  <span className="text-gray-300 font-semibold">Total Taxable Income Reduced:</span>
                  <span className="font-bricolage font-extrabold text-sm text-gold">
                    ₹{formatINR(totalDeduction)}
                  </span>
                </div>
              </div>

              {/* Estimated Net Annual Cash Saved */}
              <div className="bg-emerald-950/70 border border-emerald-700/60 rounded-2xl p-4 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                  Estimated Cash Saved Every Year
                </span>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-emerald-300">
                  ₹{formatINR(estimatedTaxSaved)}
                </div>
                <p className="text-[11px] text-emerald-400/80 mt-1">
                  Direct cash relief into your bank account under the Old Tax Regime
                </p>
              </div>

              {/* Advice Tip */}
              <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                Tip: Co-owning the property with a spouse gives each borrower independent deduction limits, cutting family taxes by up to ₹2.1+ Lakhs every year.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
