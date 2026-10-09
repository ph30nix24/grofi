"use client";

import React from "react";
import {
  FileText,
  Briefcase,
  Home,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function LoanAgainstPropertyTaxGuide() {
  const { openApplyModal } = useApplyModal();

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <FileText className="w-3.5 h-3.5 text-gold" />
            Income Tax Act (IT Act) Guide
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Tax Benefits & Deductions on <span className="text-primary">Loan Against Property</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            How business owners, professionals, and homeowners can legitimately write off LAP interest payments under Section 37(1) and Section 24(b).
          </p>
        </div>

        {/* 2-Column Tax Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Section 37(1) - Business Use */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-primary/20 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                100% Interest Deductible
              </span>
            </div>

            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-2">
              Section 37(1): Business Expansion & Working Capital
            </h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              When Loan Against Property funds are infused into commercial operations, manufacturing, raw material procurement, or technology acquisition:
            </p>

            <ul className="space-y-2 text-xs text-gray-700 mb-5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Revenue Expense:</strong> The entire annual interest paid on the mortgage loan is treated as a deductible business expense.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Substantial Tax Savings:</strong> Reduces net taxable business profit, delivering 25% – 35% effective cash savings based on your tax slab.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Processing Fee & Charges:</strong> Bank loan processing fees, valuation costs, and legal documentation fees can also be written off.
                </span>
              </li>
            </ul>

            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 font-medium">
              💡 <strong>Audit Requirement:</strong> Maintain clear banking fund-trail evidence proving LAP disbursements were credited to your current account and used for business transactions.
            </div>
          </div>

          {/* Card 2: Section 24(b) - Home Repair / Renovation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-primary/20 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                Up to ₹2 Lakhs Deduction
              </span>
            </div>

            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-2">
              Section 24(b): Residential Renovation & Improvement
            </h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              If a salaried or self-employed individual utilizes LAP proceeds for home extension, remodeling, or structural repair of a residential property:
            </p>

            <ul className="space-y-2 text-xs text-gray-700 mb-5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Self-Occupied House:</strong> Deduction up to <strong>₹2,00,000 per financial year</strong> against taxable salary/income under the Old Tax Regime.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Rented-Out Property:</strong> The entire actual interest incurred can be deducted against rental income receipts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Joint Co-Borrowers:</strong> If spouses co-own the property, both can claim individual deductions up to ₹2 Lakhs each (₹4 Lakhs total).
                </span>
              </li>
            </ul>

            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 text-[11px] text-amber-900 font-medium">
              💡 <strong>Proof Requirement:</strong> Retain contractor bills, architect estimates, and renovation purchase invoices to substantiate the end-use claim during ITR filing.
            </div>
          </div>
        </div>

        {/* Section 80C Distinction Callout Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bricolage font-bold text-sm sm:text-base text-gray-900">
                Important Difference: Section 80C Does NOT Apply to LAP Principal
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 max-w-2xl">
                Unlike a fresh purchase home loan where principal repayments qualify for up to ₹1.5 Lakh deduction under Section 80C, <strong>Loan Against Property principal is NOT tax-deductible under 80C</strong>. Only the interest portion qualifies under Section 37(1) or 24(b).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openApplyModal("Loan Against Property", "Tax Optimized Structuring")}
            className="w-full sm:w-auto bg-primary hover:bg-[#023337] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Consult Mortgage Expert</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
