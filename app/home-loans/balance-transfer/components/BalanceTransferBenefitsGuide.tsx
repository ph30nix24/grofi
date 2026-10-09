"use client";

import React from "react";
import {
  TrendingDown,
  Sparkles,
  Zap,
  RefreshCw,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";

export default function BalanceTransferBenefitsGuide() {

  const guideSections = [
    {
      title: "The 0.50% Rate Arbitrage Rule",
      subtitle: "When is a home loan balance transfer mathematically profitable?",
      icon: TrendingDown,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            As a golden rule of financial planning, initiating a home loan takeover is unequivocally beneficial if:
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Interest rate gap is at least 0.50% (50 basis points) or higher:</strong> A drop from 9.25% to 7.25% (2.0% gap) can save upwards of ₹15–20 Lakhs on a ₹50 Lakh loan.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Remaining repayment tenure exceeds 5 years:</strong> In the initial half of a home loan tenure, EMIs are interest-heavy. Switching early maximizes compounding savings.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Outstanding principal exceeds ₹20 Lakhs:</strong> The absolute savings vastly surpass statutory switch processing fees (capped at ₹15,000–₹18,000).
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Cheapest Debt: Home Loan Top-Up",
      subtitle: "Why Top-Ups beat personal loans & credit cards by 40%–50%",
      icon: Zap,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            When transferring your existing housing loan, banks allow you to tap into the appreciated market value of your property through an instant <strong>Top-Up facility</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-950 block mb-1">
                Home Loan Top-Up (7.25% – 8.25%)
              </span>
              <p className="text-xs text-emerald-800">
                Secured against property equity. Long tenures up to 15–20 years keep monthly EMIs exceptionally small. Zero restrictions on end use.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="font-bold text-amber-950 block mb-1">
                Unsecured Personal Loan (11.0% – 16.0%)
              </span>
              <p className="text-xs text-amber-800">
                Unsecured debt with short 3–5 year tenures resulting in heavy monthly outgo and 40% higher total interest burden.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Converting to Overdraft (SBI Maxgain)",
      subtitle: "Park idle cash to slash daily interest with zero lock-in",
      icon: RefreshCw,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            Standard home loans only accept lump-sum part-prepayments. If you switch to an overdraft scheme like <strong>SBI Maxgain</strong> or <strong>PNB Max-Saver</strong>:
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Your loan account functions as an operational current account with cheque book, NetBanking, and ATM card access.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Any surplus salary, business receivables, or emergency funds parked in this account offset your principal outstanding for daily interest computation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                You can withdraw the surplus amount anytime at 0% penalty whenever money is needed.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Tax Deductions Continuity (Sec 24b & 80C)",
      subtitle: "Does switching banks impact your income tax deductions?",
      icon: FileCheck2,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            <strong>No.</strong> Your income tax benefits under the Income Tax Act remain 100% intact when transferring a home loan:
          </p>
          <div className="space-y-2 pt-1">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <strong className="text-gray-900 block mb-0.5">Section 24(b) - Interest Deduction:</strong>
              Deduct up to <strong>₹2 Lakhs per financial year</strong> on interest paid for a self-occupied residential property. Both the interest paid to your old bank and new bank in that fiscal year are combined.
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <strong className="text-gray-900 block mb-0.5">Section 80C - Principal Repayment:</strong>
              Deduct up to <strong>₹1.5 Lakhs per financial year</strong> on the principal component repaid. Note: Prepayment of old loan via balance transfer does not qualify as additional 80C principal deduction.
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-200/70 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold shadow-2xs mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Expert Advisory Guide</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Strategic Benefits of Balance Transfer
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Understand the financial mechanics of interest arbitrage, top-up liquidity, overdraft accounts, and tax deductions.
          </p>
        </div>

        {/* Accordion / Tab Guide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideSections.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-gray-50/70 rounded-3xl p-6 sm:p-7 border border-gray-200/80 hover:border-primary/40 hover:bg-white hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/70">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
