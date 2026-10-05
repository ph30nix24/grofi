"use client";

import React from "react";
import {
  Percent,
  Info,
  ShieldCheck,
  Building2,
  FileText,
  Scale,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanFeesSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanFeesSection({ lender }: HomeLoanFeesSectionProps) {
  const feeItems = [
    {
      title: "Processing Fee",
      value: lender.processingFee,
      description: "One-time administrative fee deducted during loan sanction & documentation",
      highlight: true,
      badge: "ONE-TIME",
    },
    {
      title: "Foreclosure / Pre-closure Charges",
      value: lender.foreclosureCharges || "NIL (0%) for floating rate home loans to individuals",
      description: "Mandated by RBI: 0% penalty when closing floating rate loans from own or borrowed funds",
      highlight: true,
      badge: "RBI 0% MANDATE",
    },
    {
      title: "Part-Prepayment Charges",
      value: "NIL (0% Penalty)",
      description: "Pay any surplus amount anytime to instantly reduce outstanding principal and save interest",
    },
    {
      title: "Legal & Title Search Fee",
      value: "₹3,500 – ₹7,500 + GST (At actuals)",
      description: "Paid directly to the bank's empaneled advocate for 30-year chain title deed verification",
    },
    {
      title: "Technical Site Valuation Fee",
      value: "₹2,500 – ₹5,000 + GST (At actuals)",
      description: "Paid to the bank's certified structural engineer for property inspection and market valuation",
    },
    {
      title: "MODT & State Stamp Duty",
      value: "0.1% to 0.5% of Loan Amount",
      description: "Statutory state government charge for registering Memorandum of Deposit of Title Deeds",
    },
    {
      title: "CERSAI Registration Fee",
      value: "₹50 to ₹100 + GST",
      description: "Central Registry of Securitisation Asset Reconstruction security interest filing fee",
    },
    {
      title: "Rate Conversion / Switch Fee",
      value: "₹1,000 to ₹5,000 + GST",
      description: "Applicable if you wish to reset your interest rate spread/margin to the lowest new borrower rate",
    },
    {
      title: "Cheque / NACH Return Charge",
      value: "₹450 to ₹500 + GST per bounce",
      description: "Levied if the monthly EMI auto-debit fails due to insufficient balance in your salary account",
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
          Upfront disclosure of every administrative, valuation, and statutory fee. Zero hidden costs under RBI Fair Practice code.
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
              RBI Prepayment Fair Practice Directive:
            </strong>
            As per Reserve Bank of India notification RBI/2014-15/63, banks and Housing Finance Companies (HFCs) are strictly prohibited from charging any foreclosure charges or pre-payment penalties on floating rate term loans sanctioned to individual borrowers.
          </div>
        </div>

        {/* GST Statutory Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-0.5">
              Statutory Goods &amp; Services Tax (GST):
            </strong>
            Government GST at the prevailing rate of 18% is applicable over and above all processing fees, valuation fees, legal fees, bounce charges, and penal interest levied by the financial institution.
          </div>
        </div>
      </div>
    </section>
  );
}
