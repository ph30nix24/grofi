"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Calendar,
  Percent,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function ShortTermLoanEmiCalculator() {
  const { openApplyModal } = useApplyModal();

  // Inputs
  const [loanAmount, setLoanAmount] = useState<number>(50000); // ₹50,000 default
  const [interestRate, setInterestRate] = useState<number>(15.0); // 15% default
  const [tenureMonths, setTenureMonths] = useState<number>(6); // 6 months default

  // Amount Presets
  const amountPresets = [
    { label: "₹10K", value: 10000 },
    { label: "₹25K", value: 25000 },
    { label: "₹50K", value: 50000 },
    { label: "₹1L", value: 100000 },
    { label: "₹2L", value: 200000 },
    { label: "₹5L", value: 500000 },
  ];

  // Rate Presets
  const ratePresets = [
    { label: "SBI (11.15%)", rate: 11.15 },
    { label: "HDFC (12.5%)", rate: 12.5 },
    { label: "KreditBee (16.0%)", rate: 16.0 },
    { label: "CASHe (21.0%)", rate: 21.0 },
    { label: "mPokket (24.0%)", rate: 24.0 },
  ];

  // Tenure Presets
  const tenurePresets = [
    { label: "3 Mo", months: 3 },
    { label: "6 Mo", months: 6 },
    { label: "9 Mo", months: 9 },
    { label: "12 Mo", months: 12 },
    { label: "18 Mo", months: 18 },
    { label: "24 Mo", months: 24 },
  ];

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Short-Term Loan calculation (Monthly Reducing)
  const calculation = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureMonths;

    if (r === 0) {
      const emi = P / n;
      return {
        monthlyEmi: emi,
        totalPayment: P,
        totalInterest: 0,
        principalPercent: 100,
        interestPercent: 0,
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - P);

    const principalPercent = (P / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    return {
      monthlyEmi: emi,
      totalPayment,
      totalInterest,
      principalPercent,
      interestPercent,
    };
  }, [loanAmount, interestRate, tenureMonths]);

  // Comparison with standard 36-Month Long-Term Loan (baseline at 13.5% p.a.)
  const longTermComparison = useMemo(() => {
    const P = loanAmount;
    const r = 13.5 / 12 / 100;
    const n = 36; // 3 years

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - P);

    const interestSaved = Math.max(0, totalInterest - calculation.totalInterest);

    return {
      monthlyEmi: emi,
      totalInterest,
      interestSaved,
    };
  }, [loanAmount, calculation.totalInterest]);

  const monthlyRateText = (interestRate / 12).toFixed(2);

  return (
    <section id="short-term-calculator-section" className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            Smart Repayment Estimator
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Short-Term EMI & <span className="text-primary">Interest Savings Calculator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            See exactly how choosing a 3 to 12 month tenure cuts total interest outgo compared to multi-year loans.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm">
          {/* Left Column (7 cols): Interactive Sliders */}
          <div className="lg:col-span-7 space-y-7">
            {/* 1. Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-bold text-gray-800">
                  Short-Term Borrowing Amount
                </label>
                <div className="flex items-center gap-1 text-primary font-bricolage font-extrabold text-xl sm:text-2xl">
                  <span>₹</span>
                  <span>{formatINR(loanAmount)}</span>
                </div>
              </div>

              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>₹5,000 (Micro)</span>
                <span>₹5 Lakhs</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {amountPresets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setLoanAmount(p.value)}
                    className={`py-1 px-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      loanAmount === p.value
                        ? "bg-primary text-white border-primary shadow-2xs"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Short Tenure Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  Tenure (Months)
                </label>
                <span className="font-bricolage font-extrabold text-xl sm:text-2xl text-primary">
                  {tenureMonths} Months
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={24}
                step={1}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>1 Month (Bridge)</span>
                <span>24 Months</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {tenurePresets.map((t) => (
                  <button
                    key={t.months}
                    onClick={() => setTenureMonths(t.months)}
                    className={`py-1 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      tenureMonths === t.months
                        ? "bg-primary text-white border-primary shadow-2xs"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-primary" />
                  Annual Interest Rate (APR)
                </label>
                <div className="text-right">
                  <span className="font-bricolage font-extrabold text-xl sm:text-2xl text-primary">
                    {interestRate.toFixed(1)}% p.a.
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold block">
                    (~{monthlyRateText}% / month)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={10.0}
                max={32.0}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>10.0% (Prime Bank)</span>
                <span>32.0% (Instant NBFC)</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {ratePresets.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setInterestRate(r.rate)}
                    className={`py-1 px-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      interestRate === r.rate
                        ? "bg-primary text-white border-primary shadow-2xs"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Results & Comparison Card */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-5">
            {/* Monthly EMI Result */}
            <div className="text-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                Estimated Monthly EMI
              </span>
              <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-primary mt-1">
                ₹{formatINR(calculation.monthlyEmi)}
              </div>
              <span className="text-xs text-gray-600 block mt-1">
                for {tenureMonths} month{tenureMonths > 1 ? "s" : ""}
              </span>
            </div>

            {/* Breakdown Numbers */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Principal Borrowed:</span>
                <span className="font-bold text-gray-900">₹{formatINR(loanAmount)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Total Interest Outgo:</span>
                <span className="font-bold text-amber-700">₹{formatINR(calculation.totalInterest)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Total Repayment Amount:</span>
                <span className="font-bold text-gray-900">₹{formatINR(calculation.totalPayment)}</span>
              </div>
            </div>

            {/* Visual Repayment Breakdown Bar */}
            <div>
              <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                <span>Principal ({calculation.principalPercent.toFixed(0)}%)</span>
                <span>Interest ({calculation.interestPercent.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-gray-200">
                <div
                  style={{ width: `${calculation.principalPercent}%` }}
                  className="bg-primary transition-all duration-300"
                />
                <div
                  style={{ width: `${calculation.interestPercent}%` }}
                  className="bg-gold transition-all duration-300"
                />
              </div>
            </div>

            {/* Interest Savings Comparison vs 36-Month Loan */}
            {longTermComparison.interestSaved > 0 && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <TrendingDown className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Save ₹{formatINR(longTermComparison.interestSaved)} in Total Interest!</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  A typical 3-year loan of ₹{formatINR(loanAmount)} incurs approx ₹{formatINR(longTermComparison.totalInterest)} in total interest. Closing it in {tenureMonths} months saves substantial money.
                </p>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={() =>
                openApplyModal(
                  "Short-Term Personal Loan",
                  `Calculated ₹${formatINR(loanAmount)} for ${tenureMonths} Months (${interestRate}% p.a.)`
                )
              }
              className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <span>Apply for this Loan Offer</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero foreclosure penalty after cooling period</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
