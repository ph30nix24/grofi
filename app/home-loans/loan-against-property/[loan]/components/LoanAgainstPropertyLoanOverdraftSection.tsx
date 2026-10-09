"use client";

import React from "react";
import {
  Zap,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanOverdraftSectionProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanOverdraftSection({
  lender,
}: LoanAgainstPropertyLoanOverdraftSectionProps) {
  const { openApplyModal } = useApplyModal();

  return (
    <section
      id="overdraft-facility"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Zap className="w-3.5 h-3.5 text-gold" />
          <span>LIQUIDITY &amp; OVERDRAFT FLEXIBILITY</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          {lender.name} Overdraft Facility vs Term Loan
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Compare structured term loan amortizations with dropline property overdraft limits to optimize interest outflows.
        </p>
      </div>

      {/* Main Grid: Comparison Table Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-stretch">
        {/* Option 1: Standard LAP Term Loan */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Structure Type A
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                Predictable Budgeting
              </span>
            </div>

            <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900">
              Standard Mortgage Term Loan
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              The full sanctioned loan amount is disbursed directly into your bank account. You repay through fixed monthly EMIs composed of principal and interest over 10 to 15 years.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                "Fixed monthly EMI enables predictable household or business budgeting",
                "Lower interest margin compared to overdraft facility structures",
                "Disciplined principal reduction with every monthly payment",
                "0% foreclosure and part-prepayment charges for individual borrowers",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">Best Suited For:</div>
            <div className="text-xs font-bold text-gray-900 mt-0.5">
              One-time capital expenditures like debt consolidation, asset acquisition, or wedding.
            </div>
          </div>
        </div>

        {/* Option 2: Dropline / Property Overdraft */}
        <div className="bg-linear-to-b from-white to-[#F6FBF8] rounded-3xl p-6 sm:p-8 border border-teal-300 shadow-md flex flex-col justify-between relative overflow-hidden ring-1 ring-teal-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/60 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-teal-100">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Structure Type B
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-200">
                {lender.overdraftAvailable ? "Available with " + lender.name : "High Liquidity Option"}
              </span>
            </div>

            <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900">
              Dropline Property Overdraft (OD)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              A credit limit is sanctioned against your property in a linked current account. Interest is calculated strictly on the daily utilized balance, not on the total sanctioned limit.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                "Deposit surplus funds or daily business collections anytime to slash interest",
                "Withdraw capital whenever unexpected cash flow requirements arise",
                "No repetitive loan documentation or appraisal fees for re-borrowing",
                lender.overdraftScheme
                  ? `Specific scheme: ${lender.overdraftScheme}`
                  : "Dropline limit gradually reduces each month to ensure gradual repayment",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-teal-950 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-100 relative z-10">
            <div className="text-xs text-teal-700">Best Suited For:</div>
            <div className="text-xs font-bold text-gray-900 mt-0.5">
              Business owners, traders, and professionals requiring dynamic working capital.
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Case Study Highlight */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real World Overdraft Savings Illustration</span>
            </div>
            <h4 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
              How Mr. Gupta Saved ₹3.8 Lakhs on ₹1 Crore LAP
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              With a sanctioned limit of ₹1 Crore, Mr. Gupta only utilized ₹40 Lakhs for 8 months to purchase inventory, while depositing surplus business collections into the linked account. Rather than paying 10% on the entire ₹1 Crore (₹10 Lakhs/yr), he only paid interest on the net ₹40 Lakhs (₹2.67 Lakhs), pocketing over ₹3.8 Lakhs in pure interest savings.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="w-full lg:w-auto bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Explore Mortgage Sanction Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
