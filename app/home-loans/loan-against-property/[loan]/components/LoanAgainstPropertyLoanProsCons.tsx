"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  ThumbsUp,
  AlertCircle,
  Scale,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanProsConsProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanProsCons({
  lender,
}: LoanAgainstPropertyLoanProsConsProps) {
  const { openApplyModal } = useApplyModal();

  const defaultCons = [
    "Stringent 30-year legal title search and technical structural valuation required before disbursal",
    "Agricultural land, unapproved colonies, and properties without sanctioned maps are not eligible",
    "Turnaround time of 5 to 8 business days due to mandatory advocate vetting and municipal scrutiny",
    "Processing fee and advocate inspection charges payable during loan evaluation",
  ];

  return (
    <section
      id="pros-cons"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Scale className="w-3.5 h-3.5 text-gold" />
          <span>OBJECTIVE ASSESSMENT</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Pros &amp; Cons of <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          An honest, unfiltered credit appraisal of {lender.name} to help you make a fully informed borrowing decision.
        </p>
      </div>

      {/* Grid: Pros Card vs Cons Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Pros (Strengths) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bricolage font-bold text-lg text-gray-900">
                Key Advantages &amp; Strengths
              </h3>
              <p className="text-xs text-gray-500">Why borrowers prefer this scheme</p>
            </div>
          </div>

          <ul className="space-y-3.5">
            {lender.pros?.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug font-medium">{pro}</span>
              </li>
            ))}
            <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">
                Substantially lower interest rates compared to unsecured business loans or personal loans (8.75%–11% vs 14%–24%).
              </span>
            </li>
            <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">
                High funding ceiling up to {lender.maxAmount} with extended tenure up to {lender.maxTenure}.
              </span>
            </li>
          </ul>
        </div>

        {/* Cons (Limitations & Considerations) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bricolage font-bold text-lg text-gray-900">
                Important Considerations
              </h3>
              <p className="text-xs text-gray-500">Factors to keep in mind before applying</p>
            </div>
          </div>

          <ul className="space-y-3.5">
            {defaultCons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grofi Expert Take Banner */}
      <div className="bg-linear-to-r from-[#F4F1EA] via-[#FDFBF7] to-[#F4F1EA] rounded-3xl p-6 sm:p-8 border border-gray-300/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Grofi Senior Credit Desk Recommendation</span>
            </div>
            <h4 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
              The Verdict on {lender.name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              If you hold clear title ownership of a residential or commercial property, {lender.name} offers one of the lowest cost routes to high-ticket liquidity in India. With {lender.interestRate?.min ?? 9.25}% floor rates, {lender.maxLtv} funding, and zero prepayment charges, it easily beats high-interest unsecured borrowing.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Get In-Principle Approval</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
