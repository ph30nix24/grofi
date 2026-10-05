"use client";

import React, { useState, useMemo } from "react";
import {
  Home,
  RefreshCw,
  Info,
  CheckCircle2,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  Percent,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanLtvSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanLtvSection({ lender }: HomeLoanLtvSectionProps) {
  const [propertyCost, setPropertyCost] = useState<number>(7500000);

  // Dynamic LTV Slabs based on RBI Framework
  const { ltvPercent, maxLoan, minDownPayment } = useMemo(() => {
    let ltv = 75;
    if (propertyCost <= 3000000) {
      ltv = 90;
    } else if (propertyCost <= 7500000) {
      ltv = 80;
    } else {
      ltv = 75;
    }

    const loan = Math.round((propertyCost * ltv) / 100);
    const downPayment = propertyCost - loan;

    return {
      ltvPercent: ltv,
      maxLoan: loan,
      minDownPayment: downPayment,
    };
  }, [propertyCost]);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="ltv-overdraft" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Home className="w-3.5 h-3.5 text-gold" />
          <span>RBI LENDING NORMS &amp; OVERDRAFT SAVINGS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          LTV Ratio &amp; Overdraft Facility for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Understand how much property value {lender.name} will fund and how you can save lakhs using smart overdraft accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: RBI LTV Matrix & Down Payment Calculator (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between h-full space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-1.5">
                RBI Mandated Loan-to-Value (LTV) Slabs
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                LTV represents the percentage of the property agreement value funded by {lender.name}. The remaining amount must be contributed by the buyer as down payment (own contribution).
              </p>
            </div>

            {/* 3 RBI Slabs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Property ≤ ₹30 Lakhs
                </span>
                <div className="font-bricolage font-extrabold text-2xl text-blue-900">
                  Up to 90%
                </div>
                <p className="text-[11px] text-blue-800">Min 10% Down Payment</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  ₹30L – ₹75 Lakhs
                </span>
                <div className="font-bricolage font-extrabold text-2xl text-gray-900">
                  Up to 80%
                </div>
                <p className="text-[11px] text-gray-600">Min 20% Down Payment</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Above ₹75 Lakhs
                </span>
                <div className="font-bricolage font-extrabold text-2xl text-gray-900">
                  Up to 75%
                </div>
                <p className="text-[11px] text-gray-600">Min 25% Down Payment</p>
              </div>
            </div>

            {/* Interactive Down Payment Estimator */}
            <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Target Property Value
                </label>
                <span className="font-bricolage font-bold text-base text-primary">
                  ₹{formatINR(propertyCost)}
                </span>
              </div>

              <input
                type="range"
                min={2000000}
                max={30000000}
                step={250000}
                value={propertyCost}
                onChange={(e) => setPropertyCost(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">
                    Max Sanction ({ltvPercent}% LTV)
                  </span>
                  <span className="font-bricolage font-bold text-base text-primary">
                    ₹{formatINR(maxLoan)}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">
                    Min Down Payment Needed
                  </span>
                  <span className="font-bricolage font-bold text-base text-gray-900">
                    ₹{formatINR(minDownPayment)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Per RBI Master Direction on Housing Finance</span>
            <span>Registration Charges Extra</span>
          </div>
        </div>

        {/* Right Column: Overdraft Feature Deep Dive (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-purple-50/60 via-white to-purple-50/40 rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm flex flex-col justify-between h-full space-y-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                  Interest Saving Architecture
                </span>
                <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-2">
                  {lender.overdraftScheme
                    ? `${lender.overdraftScheme} Feature`
                    : "Home Loan Overdraft Structure"}
                </h3>
              </div>
              <RefreshCw className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
            </div>

            {lender.overdraftScheme ? (
              <div className="space-y-3.5 text-xs text-gray-700 leading-relaxed">
                <p>
                  Under {lender.overdraftScheme}, an operative current account is attached directly to your home loan. Whenever you receive your monthly salary, performance bonuses, or surplus rental income, simply park it into this account.
                </p>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Daily Balance Offset:</strong>
                      Interest is calculated solely on (Outstanding Principal minus Parked Surplus), cutting daily interest drastically.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">100% Emergency Liquidity:</strong>
                      Unlike standard prepayments, you retain full access to withdraw parked funds anytime via ATM, debit card, or UPI without penalties.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Cut Tenure by 5–8 Years:</strong>
                      Even parking an average of ₹2 Lakh to ₹5 Lakh can shave several years off a 20-year loan tenure.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                <p>
                  {lender.name} provides standard term home loans with zero prepayment penalties. While it does not include a hybrid overdraft current account, you can make unlimited part-prepayments without any fees to reduce principal.
                </p>
                <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                  <strong className="text-gray-900 block mb-1">Standard Term Loan Advantage:</strong>
                  Lower processing fee and slightly tighter starting interest rate spreads compared to overdraft-linked products.
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Linked to RBI Repo EBLR</span>
            <span>Zero Foreclosure Fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}
