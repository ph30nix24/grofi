"use client";

import React from "react";
import {
  ShieldCheck,
  Scale,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";

interface BalanceTransferLoanFeesSectionProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanFeesSection({
  lender,
}: BalanceTransferLoanFeesSectionProps) {
  const feeItems = [
    {
      title: "Takeover Processing Fee",
      value: lender.processingFee,
      description: `One-time loan takeover administrative and vetting fee. Strictly capped at ${lender.processingFeeCap}.`,
      highlight: true,
      badge: "CAPPED CEILING",
    },
    {
      title: "Foreclosure / Pre-closure Penalty",
      value: lender.foreclosureCharges || "NIL (0%) for floating rate loans to individual borrowers",
      description: "Mandated by Reserve Bank of India: 0% foreclosure charges when shifting floating-rate loans.",
      highlight: true,
      badge: "RBI 0% MANDATE",
    },
    {
      title: "Part-Prepayment Charges",
      value: "NIL (0% Penalty)",
      description: "Prepay any surplus funds at any time with no lock-in period or charges.",
    },
    {
      title: "State Stamp Duty & MODT",
      value: "0.1% to 0.5% of Transferred Amount (State specific)",
      description: "Statutory state charge for registering Memorandum of Deposit of Title Deeds (MODT).",
    },
    {
      title: "Legal LOD & Title Search Verification",
      value: "₹3,500 – ₹7,000 + GST (At actuals)",
      description: "Paid to the bank's empaneled advocate for vetting the List of Documents (LOD) and 30-year chain title deeds.",
    },
    {
      title: "Technical Site Inspection",
      value: "₹2,500 – ₹5,000 + GST (At actuals)",
      description: "Paid to the bank's certified structural engineer for physical property inspection and re-valuation.",
    },
    {
      title: "CERSAI Registration Fee",
      value: "₹50 to ₹100 + GST",
      description: "Statutory Central Registry of Securitisation Asset Reconstruction security interest filing fee.",
    },
    {
      title: "Document Retrieval & Handover Fee",
      value: "₹0 from new bank",
      description: "Old bank must hand over original title deeds within 30 days of loan takeover clearance per RBI circular.",
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
          <span>FULL COST TRANSPARENCY</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Complete Fees &amp; Charges for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          No hidden surprises. All takeover fees, processing fee caps, and statutory charges clearly itemized under RBI Fair Practices Code.
        </p>
      </div>

      {/* Grid of Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {feeItems.map((fee, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 border transition-all ${
              fee.highlight
                ? "bg-linear-to-br from-emerald-50/40 via-white to-teal-50/20 border-emerald-200 shadow-sm"
                : "bg-white border-gray-200 shadow-2xs"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                  {fee.title}
                </h3>
                <span className="font-bricolage font-extrabold text-primary text-sm sm:text-base block">
                  {fee.value}
                </span>
              </div>
              {fee.badge && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  {fee.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {fee.description}
            </p>
          </div>
        ))}
      </div>

      {/* RBI Mandatory Handover Directive Guarantee */}
      <div className="mt-8 bg-[#EBF4ED]/60 border border-primary/20 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-gold" />
        </div>
        <div className="space-y-1 flex-1">
          <h4 className="font-bricolage font-bold text-base text-primary">
            RBI Title Deed Handover Directive (30-Day Guarantee)
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            Under RBI Circular (RBI/2023-24/60), your existing lender is legally required to release all original property documents and remove charges with CERSAI within <strong>30 days</strong> of full takeover settlement. In case of delay, the lender must pay compensation of <strong>₹5,000 per day</strong> to the borrower.
          </p>
        </div>
      </div>
    </section>
  );
}
