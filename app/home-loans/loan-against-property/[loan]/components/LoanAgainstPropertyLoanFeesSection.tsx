"use client";

import React from "react";
import {
  ShieldCheck,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";

interface LoanAgainstPropertyLoanFeesSectionProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanFeesSection({
  lender,
}: LoanAgainstPropertyLoanFeesSectionProps) {
  const feeItems = [
    {
      title: "Mortgage Processing Fee",
      value: lender.processingFee,
      description: `Administrative and loan underwriting fee. ${
        lender.processingFeeCap
          ? `Strictly legally capped at ${lender.processingFeeCap}.`
          : "Calculated as a small percentage of sanction amount."
      }`,
      highlight: true,
      badge: lender.processingFeeCap ? "CAPPED CEILING" : "TRANSPARENT",
    },
    {
      title: "Foreclosure / Pre-closure Penalty",
      value: lender.foreclosureCharges || "NIL (0%) for floating rate loans to individual borrowers",
      description: "Reserve Bank of India directive: Zero foreclosure penalties for individual borrowers on floating rate mortgage loans.",
      highlight: true,
      badge: "RBI 0% MANDATE",
    },
    {
      title: "Part-Prepayment Charges",
      value: "NIL (0% Penalty)",
      description: "Prepay any surplus capital at any time without any lock-in period or charges.",
    },
    {
      title: "State Stamp Duty & MODT",
      value: "0.1% to 0.5% of Loan Amount (State specific)",
      description: "Statutory state government charge for registering Memorandum of Deposit of Title Deeds (MODT).",
    },
    {
      title: "Legal Title Search & Advocate Scrutiny",
      value: "₹3,500 – ₹8,000 + GST (At actuals)",
      description: "Paid to the bank's empaneled legal advocate for vetting 30-year chain title deeds and issuing Non-Encumbrance Certificate (NEC).",
    },
    {
      title: "Technical Site Inspection & Valuation",
      value: "₹2,500 – ₹6,000 + GST (At actuals)",
      description: "Paid to the bank's certified structural engineer for physical property inspection and market valuation.",
    },
    {
      title: "CERSAI Registration Fee",
      value: "₹50 to ₹100 + GST",
      description: "Statutory Central Registry of Securitisation Asset Reconstruction and Security Interest filing fee.",
    },
    {
      title: "Cheque Bounce / ECS Failure Fee",
      value: "₹450 – ₹500 + GST per instance",
      description: "Penal charge levied only if an automated EMI deduction is dishonored due to insufficient balance.",
    },
  ];

  return (
    <section
      id="fees-charges"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Scale className="w-3.5 h-3.5 text-gold" />
          <span>STATUTORY FEE TRANSPARENCY</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Complete Schedule of Charges for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Transparent breakdown of processing fees, technical appraisal charges, stamp duties, and RBI-mandated zero foreclosure protections.
        </p>
      </div>

      {/* Grid of Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {feeItems.map((fee, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${
              fee.highlight
                ? "bg-white border-primary/30 shadow-md ring-1 ring-primary/10"
                : "bg-white border-gray-200 shadow-2xs hover:shadow-sm"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Charge Item #{idx + 1}
                </span>
                {fee.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {fee.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                  {fee.title}
                </h3>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-primary mt-1 leading-snug">
                  {fee.value}
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{fee.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory Consumer Protection Box */}
      <div className="mt-8 bg-linear-to-r from-emerald-50 via-teal-50/40 to-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                RBI Fair Practice Code &amp; Zero Prepayment Directive
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
                Per RBI Master Directions on Lending against Property, banks and NBFCs cannot charge foreclosure or prepayment penalties on floating rate loans availed by individuals (whether with or without co-obligants). You are legally entitled to prepay your LAP at 0% fee.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white px-3.5 py-2 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% RBI Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
