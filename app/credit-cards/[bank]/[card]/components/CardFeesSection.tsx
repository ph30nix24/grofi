"use client";

import React from "react";
import {
  Percent,
  Info,
  CheckCircle2,
  CreditCard,
  RefreshCw,
  Award,
  Globe,
  Banknote,
  Clock,
} from "lucide-react";
import { CardStructure } from "./type";

interface CardFeesSectionProps {
  card: CardStructure;
}

export default function CardFeesSection({ card }: CardFeesSectionProps) {
  const isFree =
    card.annualFee?.toLowerCase().includes("free") ||
    card.annualFee?.includes("₹0") ||
    card.annualFee?.toLowerCase().includes("nil");

  const isJoiningFree =
    card.joiningFee?.includes("0") ||
    card.joiningFee?.toLowerCase().includes("nil") ||
    card.joiningFee?.toLowerCase().includes("free");

  const feeItems = [
    {
      title: "Joining Fee",
      value: card.joiningFee || "Nil",
      description: "One-time setup fee billed on your first monthly card statement",
      badge: isJoiningFree ? "FREE" : undefined,
      icon: CreditCard,
    },
    {
      title: "Annual / Renewal Fee",
      value: card.annualFee || "Nil",
      description: "Billed annually starting from the 2nd year of card membership",
      badge: isFree ? "LIFETIME FREE" : undefined,
      highlight: true,
      icon: RefreshCw,
    },
    {
      title: "Spend-Based Fee Waiver",
      value: card.feeWaiver || "Not applicable",
      description: "Annual renewal fee is reversed upon crossing this spend milestone in the preceding card year",
      fullWidth: true,
      icon: Award,
    },
    {
      title: "Forex Markup Fee",
      value: card.forexMarkup || "3.5% + GST",
      description: "Charges applicable on foreign currency transactions and cross-border payments",
      icon: Globe,
    },
    {
      title: "Finance Charges (APR)",
      value: "3.60% p.m. (43.2% p.a.)",
      description: "Standard interest rate applicable on revolving card balances",
      icon: Percent,
    },
    {
      title: "Cash Advance Fee",
      value: "2.5% (Min. ₹500)",
      description: "Fee applicable on ATM cash withdrawals via credit card",
      icon: Banknote,
    },
    {
      title: "Interest-Free Period",
      value: "Up to 50 Days",
      description: "Grace window from the first day of billing cycle till due date",
      icon: Clock,
    },
  ];

  return (
    <section
      id="fees-charges"
      aria-label="Fees and Charges"
      className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <Percent className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>TRANSPARENT PRICING &amp; CHARGES</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          Complete Fee Schedule for the <span className="text-primary">{card.name}</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          Zero hidden charges. Transparent pricing verified against official {card.issuer} regulatory schedules.
        </p>
      </div>

      {/* Grid of Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {feeItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between ${
                item.highlight
                  ? "border-primary/50 ring-2 ring-primary/10 bg-linear-to-b from-white via-primary/5 to-white"
                  : "border-gray-200/90 hover:border-gray-300"
              } ${item.fullWidth ? "md:col-span-2 lg:col-span-3 bg-linear-to-r from-emerald-50/50 via-white to-emerald-50/30 border-emerald-200/90" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-primary shrink-0">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-montserrat">
                      {item.title}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-montserrat tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 mb-2">
                  {item.value}
                </div>
              </div>

              <p className="text-xs text-gray-600 font-montserrat leading-relaxed pt-2 border-t border-gray-100">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pro Tip Callout & Statutory GST Notice */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Fee Waiver Advice Callout */}
        <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs font-montserrat text-gray-800 leading-relaxed">
            <strong className="text-primary font-bold block mb-1 text-xs sm:text-sm">
              How to Waive Your Annual Fee:
            </strong>
            {card.feeWaiver || "Consolidate your routine monthly grocery, fuel, dining, and utility payments through this card to comfortably meet the annual fee waiver criteria."}
          </div>
        </div>

        {/* GST Note */}
        <div className="bg-gray-50 border border-gray-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
          <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs font-montserrat text-gray-600 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-1 text-xs sm:text-sm">
              Statutory Goods &amp; Services Tax (GST):
            </strong>
            Government Goods and Services Tax (GST) of 18% is statutorily levied over and above all credit card fee components and finance charges in India.
          </div>
        </div>

      </div>

    </section>
  );
}
