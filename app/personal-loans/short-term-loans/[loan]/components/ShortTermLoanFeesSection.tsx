"use client";

import React from "react";
import {
  Percent,
  Info,
  ShieldCheck,
  FileText,
  AlertCircle,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";

interface ShortTermLoanFeesSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanFeesSection({ lender }: ShortTermLoanFeesSectionProps) {
  const rateText =
    lender.interestRate?.text ||
    `${lender.interestRate?.min ?? 12.0}% - ${lender.interestRate?.max ?? 30.0}% p.a.`;

  const feeItems = [
    {
      title: "Processing Fee",
      value: lender.processingFee,
      description: "One-time digital processing fee deducted upfront from the sanctioned loan amount prior to bank disbursal.",
      highlight: true,
      badge: "ONE-TIME",
    },
    {
      title: "Interest Rate (Monthly & Annual)",
      value: `${rateText}${lender.interestRate?.monthlyRateText ? ` (${lender.interestRate.monthlyRateText})` : ""}`,
      description: "Calculated strictly on the monthly diminishing principal balance. Zero flat-rate compounding.",
      highlight: true,
      badge: "MONTHLY DIMINISHING",
    },
    {
      title: "Prepayment & Foreclosure Charges",
      value: "Zero charges (As per RBI Mandate for individual floating-rate loans)",
      description: "Clear your loan balance early with zero penalties once your salary, bonus, or liquidity is available.",
      highlight: false,
      badge: "NIL CHARGES",
    },
    {
      title: "AutoPay / e-NACH Bounce Penalty",
      value: "₹450 to ₹500 + GST per failed mandate",
      description: "Levied only if the automated monthly EMI deduction fails due to insufficient balance in your registered bank account.",
      highlight: false,
    },
    {
      title: "Digital E-Stamping & Statutory Charge",
      value: "₹100 to ₹350 (As per State Stamp Act)",
      description: "Mandatory statutory government legal charge for executing the digital e-contract on NeSL / legal stamping portal.",
      highlight: false,
    },
    {
      title: "Cooling-Off Cancellation Fee",
      value: `Zero charges within ${lender.coolingOffPeriod}`,
      description: "Exit the loan during the look-up period without prepayment penalties by returning principal and proportionate interest.",
      highlight: false,
      badge: "RBI DIRECTIVE",
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
          Fees &amp; Charges for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Itemized schedule of charges in accordance with RBI Key Fact Statement (KFS) directives. Zero hidden levies or undocumented fees.
        </p>
      </div>

      {/* Main Grid: Fee Cards + Practical Example */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fee Schedule Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feeItems.map((fee, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border transition-all ${
                  fee.highlight
                    ? "bg-white border-primary/30 shadow-xs"
                    : "bg-white border-gray-200/90 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {fee.title}
                  </span>
                  {fee.badge && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        fee.badge === "NIL CHARGES"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : fee.badge === "ONE-TIME"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {fee.badge}
                    </span>
                  )}
                </div>

                <div className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-1.5 leading-snug">
                  {fee.value}
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {fee.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Mandatory Key Fact Statement (KFS):</strong> Before you e-sign the loan contract, {lender.name} will display an itemized KFS sheet specifying your exact net in-hand disbursement, total repayable amount, and annual percentage rate (APR).
            </div>
          </div>
        </div>

        {/* Right Column: Real-World Scenario Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#035259] to-[#02383d] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-emerald-300">
            <Coins className="w-5 h-5 text-[#C9AA3C]" />
            <h3 className="font-bricolage font-bold text-base sm:text-lg text-white">
              Transparent Example: ₹50,000 for 6 Months
            </h3>
          </div>

          <p className="text-xs text-emerald-100/90 mb-5 leading-relaxed">
            See exactly how a typical ₹50,000 short-term credit facility breaks down from sanction to final settlement:
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-emerald-200">Gross Sanctioned Amount:</span>
              <strong className="text-white font-bold">₹50,000</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-emerald-200">Processing Fee ({lender.processingFeePercent || 2.5}% + GST):</span>
              <strong className="text-amber-300 font-bold">- ₹1,475</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-emerald-200">Digital Stamp Duty:</span>
              <strong className="text-amber-300 font-bold">- ₹150</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-white/15 bg-white/10 px-3 rounded-xl">
              <span className="text-white font-bold">Net Disbursed to Bank:</span>
              <strong className="text-emerald-300 font-extrabold text-sm">₹48,375</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-emerald-200">Monthly EMI (6 Months @ {lender.interestRate?.min ?? 16}%):</span>
              <strong className="text-white font-bold">₹8,728 / mo</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-emerald-200">Total Repayment Amount:</span>
              <strong className="text-white font-bold">₹52,368</strong>
            </div>

            <div className="flex justify-between py-2.5 pt-3 bg-black/20 px-3 rounded-xl">
              <span className="text-emerald-200 font-bold">Total Cost of Credit:</span>
              <strong className="text-amber-300 font-extrabold text-sm">₹3,993</strong>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/15 flex items-center gap-2 text-[11px] text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Zero pre-closure penalty. Clear before 6 months to reduce interest further!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
