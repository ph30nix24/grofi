"use client";

import React from "react";
import {
  Percent,
  Info,
  ShieldCheck,
} from "lucide-react";
import { PersonalLoanLender } from "../../components/type";

interface LoanFeesSectionProps {
  lender: PersonalLoanLender;
}

export default function LoanFeesSection({ lender }: LoanFeesSectionProps) {
  const feeItems = [
    {
      title: "Processing Fee",
      value: lender.processingFee,
      description: "One-time non-refundable fee deducted directly from sanctioned loan disbursal",
      highlight: true,
      badge: "ONE-TIME",
    },
    {
      title: "Foreclosure / Full Pre-closure Charges",
      value: lender.foreclosureCharges || "Zero after 12 EMIs for select accounts; 2% to 4% + GST otherwise",
      description: "Applicable if you pay off the entire outstanding loan before the end of the sanctioned tenure",
    },
    {
      title: "Part-Prepayment Facility",
      value: lender.partPrepayment || "Allowed up to 25% of principal balance once per fiscal year after 6 EMIs",
      description: "Allows you to reduce outstanding principal and save significantly on long-term interest",
    },
    {
      title: "Mandatory Lock-in Period",
      value: lender.lockInPeriod || "6 Months minimum",
      description: "Minimum number of regular monthly EMIs required before prepayment or foreclosure is permitted",
    },
    {
      title: "Annual Percentage Rate (APR)",
      value: lender.aprRange || "10.45% - 25.00% p.a.",
      description: "Comprehensive annualized cost of borrowing including base interest rate and processing fees",
    },
    {
      title: "Cheque / NACH Bounce Charges",
      value: lender.bounceCharges || "₹450 to ₹500 + GST per bounce",
      description: "Levied by the lender if auto-debit fails due to insufficient account balance on EMI due date",
    },
    {
      title: "State Stamp Duty & Documentation",
      value: lender.stampDuty || "As per State Stamp Act (typically ₹100 - ₹500)",
      description: "Mandatory statutory government legal charge applicable for loan agreement execution",
    },
  ];

  return (
    <section id="fees-charges" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Percent className="w-3.5 h-3.5 text-gold" />
          <span>TRANSPARENT SCHEDULE OF CHARGES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Fees &amp; Charges Breakdown for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Clear, upfront disclosures with zero hidden charges. Fully aligned with RBI Fair Lending guidelines.
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
        
        {/* RBI Prepayment Mandate Callout */}
        <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-gray-800 leading-relaxed">
            <strong className="text-primary font-bold block mb-0.5">
              RBI Prepayment Fair Lending Mandate:
            </strong>
            As per Reserve Bank of India (RBI) guidelines, banks and NBFCs are not permitted to levy any foreclosure or pre-payment penalties on floating rate personal loans sanctioned to individual borrowers for non-business purposes.
          </div>
        </div>

        {/* GST Statutory Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-0.5">
              Statutory Goods &amp; Services Tax (GST):
            </strong>
            Government GST at the prevailing rate of 18% is applicable over and above all processing fees, bounce charges, and penal interest levied by the financial institution.
          </div>
        </div>

      </div>

    </section>
  );
}
