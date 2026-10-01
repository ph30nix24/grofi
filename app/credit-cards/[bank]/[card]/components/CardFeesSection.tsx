"use client";

import React from "react";
import {
  CreditCard,
  ShieldAlert,
  Percent,
  RefreshCw,
  Globe,
  Info,
  CheckCircle2,
  DollarSign,
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

  const feeItems = [
    {
      title: "Joining Fee",
      value: card.joiningFee || "Nil",
      description: "One-time fee charged on the first statement",
      badge: card.joiningFee?.includes("0") || card.joiningFee?.toLowerCase().includes("nil") ? "FREE" : undefined,
    },
    {
      title: "Annual / Renewal Fee",
      value: card.annualFee || "Nil",
      description: "Billed annually starting from the 2nd year",
      badge: isFree ? "LIFETIME FREE" : undefined,
      highlight: true,
    },
    {
      title: "Spend-Based Fee Waiver",
      value: card.feeWaiver || "Not applicable",
      description: "Annual fee reversed upon crossing this spend milestone in the preceding card year",
      fullWidth: true,
    },
    {
      title: "Forex Markup Fee",
      value: card.forexMarkup || "3.5% + GST",
      description: "Charges applicable on foreign currency transactions and cross-border payments",
    },
    {
      title: "Finance Charges (APR)",
      value: "3.60% p.m. (43.2% p.a.)",
      description: "Standard interest rate on revolving card balances",
    },
    {
      title: "Cash Advance Fee",
      value: "2.5% (Min. ₹500)",
      description: "Fee on ATM cash withdrawals via credit card",
    },
    {
      title: "Interest-Free Period",
      value: "Up to 50 Days",
      description: "From the first day of billing cycle till due date",
    },
  ];

  return (
    <section id="fees-charges" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Percent className="w-3.5 h-3.5 text-gold" />
          <span>TRANSPARENT PRICING</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Fees &amp; Charges Breakdown for <span className="text-primary">{card.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Zero hidden costs. Complete fee schedule verified with {card.issuer} official guidelines.
        </p>
      </div>

      {/* Grid of Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {feeItems.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-2xs ${
              item.highlight
                ? "border-primary/40 ring-2 ring-primary/5"
                : "border-gray-200/90 hover:border-gray-300"
            } ${item.fullWidth ? "md:col-span-2 lg:col-span-3 bg-linear-to-r from-emerald-50/40 via-white to-emerald-50/20 border-emerald-200" : ""}`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-montserrat">
                {item.title}
              </span>
              {item.badge && (
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-montserrat tracking-wide">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 mb-1.5">
              {item.value}
            </div>

            <p className="text-xs text-gray-600 font-montserrat leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pro Tip Callout & GST Note */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Fee Waiver Advice */}
        <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs font-montserrat text-gray-800 leading-relaxed">
            <strong className="text-primary font-bold block mb-0.5">
              How to Avoid the Annual Fee:
            </strong>
            {card.feeWaiver || "Route your everyday grocery, fuel, utility, and insurance spends through this card to comfortably meet the annual fee waiver criteria."}
          </div>
        </div>

        {/* GST Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs font-montserrat text-gray-600 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-0.5">
              Statutory Goods &amp; Services Tax (GST):
            </strong>
            Government Goods and Services Tax (GST) of 18% is applicable over and above all credit card fee components and finance charges.
          </div>
        </div>

      </div>

    </section>
  );
}
