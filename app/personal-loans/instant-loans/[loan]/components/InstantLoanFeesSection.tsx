"use client";

import React from "react";
import {
  Percent,
  Info,
  ShieldCheck,
  FileText,
  AlertCircle,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";

interface InstantLoanFeesSectionProps {
  lender: InstantLoanLender;
}

export default function InstantLoanFeesSection({ lender }: InstantLoanFeesSectionProps) {
  const rateText =
    lender.interestRate?.text ||
    `${lender.interestRate?.min ?? 9.99}% - ${lender.interestRate?.max ?? 24.0}% p.a.`;

  const feeItems = [
    {
      title: "Processing Fee",
      value: lender.processingFee,
      description: "One-time digital processing fee deducted directly from the sanctioned disbursal amount.",
      highlight: true,
      badge: "ONE-TIME",
    },
    {
      title: "Annual Interest Rate (Reducing)",
      value: rateText,
      description: "Calculated strictly on the diminishing loan principal balance each month.",
      highlight: true,
      badge: "MONTHLY DIMINISHING",
    },
    {
      title: "Foreclosure / Pre-closure Charges",
      value: "Zero charges (As per RBI Mandate for floating rate individual loans)",
      description: "Permitted after initial lock-in period; zero penalty for floating rate personal loans to individuals.",
    },
    {
      title: "e-NACH / UPI Autopay Bounce Charges",
      value: "₹450 to ₹500 + GST per failed mandate",
      description: "Levied only if the automated monthly EMI deduction fails due to insufficient account balance.",
    },
    {
      title: "State Stamp Duty & Digital E-Stamping",
      value: "₹100 to ₹500 (As per State Stamp Act)",
      description: "Mandatory statutory government legal charge for executing the digital loan contract.",
    },
    {
      title: "Disbursal Turnaround Rail",
      value: `Instant (${lender.disbursalTime})`,
      description: "Automated real-time IMPS payment bridge with zero manual paper handling charges.",
    },
  ];

  return (
    <section id="fees-charges" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Percent className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>TRANSPARENT SCHEDULE OF CHARGES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Fees &amp; Charges Breakdown for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          100% upfront disclosure with zero hidden fees. All partners adhere to the RBI Fair Practices Code.
        </p>
      </div>

      {/* Grid of Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {feeItems.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-2xs ${
              item.highlight
                ? "border-primary/40 ring-2 ring-primary/5 bg-gradient-to-br from-white via-emerald-50/20 to-white"
                : "border-gray-200/90 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {item.title}
              </span>
              {item.badge && (
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full tracking-wide">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-1.5 leading-snug">
              {item.value}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Regulatory & Advisory Info Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Fact Statement (KFS) callout */}
        <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-gray-800 leading-relaxed">
            <strong className="text-primary font-bold block mb-0.5">
              RBI Key Fact Statement (KFS) Transparency:
            </strong>
            Prior to executing your loan agreement, {lender.name} issues a standardized KFS detailing the exact Annual Percentage Rate (APR), recovery charges, and grievance redressal officer details.
          </div>
        </div>

        {/* GST Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-0.5">
              Statutory Goods &amp; Services Tax (GST):
            </strong>
            Government GST at 18% is applicable over and above the processing fee and administrative charges levied by financial institutions.
          </div>
        </div>
      </div>
    </section>
  );
}
