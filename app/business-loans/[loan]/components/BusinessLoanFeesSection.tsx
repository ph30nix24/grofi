"use client";

import React from "react";
import {
  Percent,
  Info,
  ShieldCheck,
} from "lucide-react";
import { BusinessLoanLender } from "../../components/type";

interface BusinessLoanFeesSectionProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanFeesSection({ lender }: BusinessLoanFeesSectionProps) {
  const feeItems = [
    {
      title: "Processing Fee",
      value: lender.processingFee,
      description: "One-time upfront fee deducted from the sanctioned loan disbursal amount",
      highlight: true,
      badge: "ONE-TIME",
    },
    {
      title: "Foreclosure / Pre-Closure Charges",
      value: lender.foreclosureCharges || "Nil for MSEs on floating rate; 2% to 4% + GST for others",
      description: "Levied if the loan balance is closed prior to the contracted loan tenure",
    },
    {
      title: "Collateral & Security Norms",
      value: lender.collateralType || "Collateral-Free (Unsecured)",
      description: "Pledge requirements. Unsecured loans do not require primary or collateral asset mortgage",
      highlight: true,
      badge: "SECURITY",
    },
    {
      title: "Part-Prepayment Facility",
      value: "Allowed up to 25% of outstanding balance per fiscal year after initial lock-in",
      description: "Flexibility to deploy surplus business profits and save on long-term compound interest",
    },
    {
      title: "Annual Credit Review / Line Renewal",
      value: lender.bankType === "nbfc" ? "Nil" : "0.25% to 0.50% of sanctioned limit (for OD/CC lines)",
      description: "Annual verification fee applicable on revolving overdraft / dropline cash credit lines",
    },
    {
      title: "NACH / EMI Cheque Bounce Charges",
      value: "₹500 to ₹750 + GST per failed auto-debit attempt",
      description: "Levied by the lending institution if current account balance is insufficient on the EMI due date",
    },
    {
      title: "Statutory Stamp Duty & Agreement",
      value: "As per State Stamp Act (typically ₹500 to ₹2,500)",
      description: "Direct statutory state government charge for loan contract and hypothecation deed execution",
    },
  ];

  return (
    <section id="fees-charges" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Percent className="w-3.5 h-3.5 text-gold" />
          <span>COMMERCIAL SCHEDULE OF CHARGES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Fees &amp; Charges for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Transparent, upfront schedule of charges with zero disguised costs. Fully compliant with RBI MSME lending directives.
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
        
        {/* RBI MSME Prepayment Mandate Callout */}
        <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-gray-800 leading-relaxed">
            <strong className="text-primary font-bold block mb-0.5">
              RBI MSME Prepayment Exemption:
            </strong>
            Under Reserve Bank of India (RBI) circulars for Micro and Small Enterprises (MSEs), banks and NBFCs are strictly prohibited from charging any foreclosure or prepayment penalties on floating rate term loans sanctioned to MSE entities.
          </div>
        </div>

        {/* GST Statutory Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-0.5">
              Statutory Goods &amp; Services Tax (GST):
            </strong>
            Government GST at the prevailing statutory rate of 18% is applicable over and above all processing fees, verification charges, and bounce fees charged by financial institutions.
          </div>
        </div>

      </div>

    </section>
  );
}
