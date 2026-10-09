"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  TrendingDown,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanEmiCalculatorSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanEmiCalculatorSection({
  lender,
}: ShortTermLoanEmiCalculatorSectionProps) {
  const { openApplyModal } = useApplyModal();

  const minAmount = lender.minAmountNum || 25000;
  const maxAmount = lender.maxAmountNum || 4000000;
  const defaultAmount = Math.min(Math.max(50000, minAmount), maxAmount);

  const minRate = lender.interestRate?.min ?? 9.99;
  const maxRate = Math.max(lender.interestRate?.max ?? 21.0, minRate + 1);

  const maxTenureMonths = Math.min(lender.tenureMonths || 12, 12);
  const defaultTenure = Math.min(6, maxTenureMonths);

  // States
  const [loanAmount, setLoanAmount] = useState<number>(defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(minRate);
  const [tenureMonths, setTenureMonths] = useState<number>(defaultTenure);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Helper for max amount display text (e.g. "₹40 Lakhs" or "₹5 Lakhs")
  const maxAmountLabel = useMemo(() => {
    if (lender.maxAmount) return lender.maxAmount;
    if (maxAmount >= 10000000) return `₹${maxAmount / 10000000} Cr`;
    if (maxAmount >= 100000) return `₹${maxAmount / 100000} Lakhs`;
    return `₹${formatINR(maxAmount)}`;
  }, [lender.maxAmount, maxAmount]);

  // Quick Amount Presets matching the reference design
  const presets = useMemo(() => {
    const list = [25000, 50000, 100000, 200000, 500000, 4000000];
    const filtered = list.filter((amt) => amt >= minAmount && amt <= maxAmount);
    if (!filtered.includes(maxAmount) && maxAmount <= 4000000) {
      filtered.push(maxAmount);
    }
    if (!filtered.includes(minAmount)) {
      filtered.unshift(minAmount);
    }
    return Array.from(new Set(filtered));
  }, [minAmount, maxAmount]);

  // Tenure options in months
  const tenureOptions = [1, 2, 3, 6, 9, 12].filter((m) => m <= maxTenureMonths);

  // Track percentage calculations for dual-colored slider backgrounds
  const amountPct = ((loanAmount - minAmount) / (maxAmount - minAmount || 1)) * 100;
  const tenurePct = ((tenureMonths - 1) / (maxTenureMonths - 1 || 1)) * 100;
  const ratePct = ((interestRate - minRate) / (maxRate - minRate || 1)) * 100;

  // Calculations
  const {
    monthlyEmi,
    totalInterest,
    totalPayment,
    principalPercent,
    interestPercent,
    processingFeeEstimate,
    schedulePreview,
  } = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = Math.max(1, tenureMonths);

    let emi = 0;
    if (r === 0) {
      emi = p / n;
    } else {
      emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPay = emi * n;
    const totalInt = totalPay - p;

    const pPct = Math.round((p / totalPay) * 100);
    const iPct = 100 - pPct;

    const feePct = lender.processingFeePercent || 1.0;
    const estFee = Math.max(500, Math.round(p * (feePct / 100)));

    let balance = p;
    const preview = [];
    for (let month = 1; month <= n; month++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      balance = Math.max(0, balance - principalPart);
      preview.push({
        month,
        principalPart: Math.round(principalPart),
        interestPart: Math.round(interestPart),
        balance: Math.round(balance),
      });
    }

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      principalPercent: pPct,
      interestPercent: iPct,
      processingFeeEstimate: estFee,
      schedulePreview: preview,
    };
  }, [loanAmount, interestRate, tenureMonths, lender.processingFeePercent]);

  // Comparison math: Short Tenure vs 36 Months Long Tenure
  const comparison = useMemo(() => {
    const p = loanAmount;
    // Standard 36-month personal loan benchmark rate (~14.5% p.a.)
    const longRate = 14.5 / 12 / 100;
    const longN = 36;
    const longEmi = (p * longRate * Math.pow(1 + longRate, longN)) / (Math.pow(1 + longRate, longN) - 1);
    const longTotalInterest = longEmi * longN - p;

    const savings = Math.max(0, Math.round(longTotalInterest - totalInterest));
    const percentSaved = Math.round((savings / longTotalInterest) * 100);

    return {
      longTotalInterest: Math.round(longTotalInterest),
      savings,
      percentSaved,
    };
  }, [loanAmount, totalInterest]);

  return (
    <section id="emi-calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>SHORT-TERM REPAYMENT ESTIMATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Calculate Your EMI for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Compact repayment terms keep total interest costs low. Simulate your monthly installment and review total interest payable before applying.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
          {/* Slider 1: Loan Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="calculator-loan-amount" className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span>Loan Amount</span>
              </label>
              <div className="font-bricolage font-extrabold text-base sm:text-lg text-[#035259] bg-[#f0fdf9] px-3.5 py-1 rounded-xl border border-[#ccede6]">
                ₹{formatINR(loanAmount)}
              </div>
            </div>

            <input
              id="calculator-loan-amount"
              aria-label="Loan Amount"
              type="range"
              min={minAmount}
              max={maxAmount}
              step={maxAmount > 100000 ? 5000 : 1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #035259 ${amountPct}%, #e5e7eb ${amountPct}%)`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#035259] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#035259] [&::-moz-range-thumb]:border-none"
            />

            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>Min: ₹{formatINR(minAmount)}</span>
              <span>Max: {maxAmountLabel}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setLoanAmount(preset)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    loanAmount === preset
                      ? "bg-[#033b3d] text-white border-[#033b3d] shadow-xs"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  ₹{formatINR(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 2: Short Tenure in Months */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label htmlFor="calculator-loan-tenure" className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#d97706]" />
                <span>Repayment Tenure</span>
              </label>
              <div className="font-bricolage font-extrabold text-base sm:text-lg text-[#b45309] bg-[#fffbeb] px-3.5 py-1 rounded-xl border border-[#fde68a]">
                {tenureMonths} Months
              </div>
            </div>

            <input
              id="calculator-loan-tenure"
              aria-label="Repayment Tenure"
              type="range"
              min={1}
              max={maxTenureMonths}
              step={1}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #d97706 ${tenurePct}%, #e5e7eb ${tenurePct}%)`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d97706] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#d97706] [&::-moz-range-thumb]:border-none"
            />

            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>1 Month</span>
              <span>{maxTenureMonths} Months</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {tenureOptions.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setTenureMonths(m)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    tenureMonths === m
                      ? "bg-[#d97706] text-white border-[#d97706] shadow-xs"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {m}M
                </button>
              ))}
            </div>
          </div>

          {/* Slider 3: Interest Rate */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label htmlFor="calculator-interest-rate" className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-[#059669]" />
                <span>Interest Rate (p.a.)</span>
              </label>
              <div className="font-bricolage font-extrabold text-base sm:text-lg text-[#059669] bg-[#ecfdf5] px-3.5 py-1 rounded-xl border border-[#a7f3d0]">
                {interestRate.toFixed(2)}%
              </div>
            </div>

            <input
              id="calculator-interest-rate"
              aria-label="Interest Rate"
              type="range"
              min={minRate}
              max={maxRate}
              step={0.01}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #059669 ${ratePct}%, #e5e7eb ${ratePct}%)`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#059669] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#059669] [&::-moz-range-thumb]:border-none"
            />

            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>Min: {minRate}% p.a.</span>
              <span>Max: {maxRate}% p.a.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Results Summary & Educational Cost Compare (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Dark Teal Card */}
          <div className="bg-gradient-to-b from-[#023338] via-[#033b41] to-[#02282c] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2dd4bf]">
                  MONTHLY INSTALLMENT (EMI)
                </span>
                <span className="bg-white/10 text-[#5eead4] px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-white/5">
                  {tenureMonths} Mo Tenure
                </span>
              </div>

              <div>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  ₹{formatINR(monthlyEmi)}
                </div>
                <span className="text-xs text-[#99f6e4] mt-1 block">
                  per month for {tenureMonths} months
                </span>
              </div>

              {/* Breakdown Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-[#99f6e4] font-medium">
                  <span>Principal ({principalPercent}%)</span>
                  <span>Interest ({interestPercent}%)</span>
                </div>
                <div className="h-1.5 w-full bg-black/30 rounded-full flex overflow-hidden">
                  <div
                    className="bg-[#cca332] h-full transition-all duration-300"
                    style={{ width: `${principalPercent}%` }}
                  />
                  <div
                    className="bg-[#2dd4bf] h-full transition-all duration-300"
                    style={{ width: `${interestPercent}%` }}
                  />
                </div>
              </div>

              {/* Details grid 2x2 */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-gray-300 text-[11px] block">Total Interest</span>
                  <strong className="font-bricolage font-bold text-base text-white mt-0.5 block">
                    ₹{formatINR(totalInterest)}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-300 text-[11px] block">Total Amount</span>
                  <strong className="font-bricolage font-bold text-base text-white mt-0.5 block">
                    ₹{formatINR(totalPayment)}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-300 text-[11px] block">Est. Processing Fee</span>
                  <strong className="font-bricolage font-bold text-sm text-white mt-0.5 block">
                    ₹{formatINR(processingFeeEstimate)} + GST
                  </strong>
                </div>
                <div>
                  <span className="text-gray-300 text-[11px] block">Turnaround</span>
                  <strong className="font-bricolage font-bold text-sm text-[#34d399] mt-0.5 block">
                    {lender.disbursalTime}
                  </strong>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    lender.name,
                    `EMI ₹${formatINR(monthlyEmi)}/mo for ₹${formatINR(loanAmount)} over ${tenureMonths} months`
                  )
                }
                className="w-full py-3.5 px-4 bg-[#cca332] hover:bg-[#b8932b] text-gray-950 font-bricolage font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 active:scale-98"
              >
                <Zap className="w-4 h-4 fill-gray-950" />
                <span>Apply for ₹{formatINR(loanAmount)} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Educational Savings Card */}
          <div className="bg-[#fffdf5] border border-[#fde68a] rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <TrendingDown className="w-4 h-4 text-[#d97706]" />
              <span>Why Short-Term Loans Save Huge Money</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              If you borrowed ₹{formatINR(loanAmount)} on a standard 36-month personal loan, you would pay approximately{" "}
              <strong className="text-gray-900">₹{formatINR(comparison.longTotalInterest)}</strong> in total interest.
            </p>

            <div className="bg-white rounded-2xl p-4 border border-[#fde68a] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  INTEREST SAVED BY PAYING IN {tenureMonths}M
                </span>
                <span className="font-bricolage font-extrabold text-base sm:text-lg text-[#065f46] mt-0.5 block">
                  ₹{formatINR(comparison.savings)}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">
                {comparison.percentSaved}% Saved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Accordion */}
      <div className="mt-8 bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900">
              View {tenureMonths}-Month Repayment Schedule Breakdown
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
            <span>{showAmortization ? "Hide Schedule" : "Show Schedule"}</span>
            {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAmortization && (
          <div className="p-4 sm:p-6 border-t border-gray-100 overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700 min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 text-[11px] uppercase font-bold">
                  <th className="py-2.5 px-3">Month</th>
                  <th className="py-2.5 px-3">Principal Part</th>
                  <th className="py-2.5 px-3">Interest Part</th>
                  <th className="py-2.5 px-3">Total Installment</th>
                  <th className="py-2.5 px-3">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schedulePreview.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50/60">
                    <td className="py-2.5 px-3 font-bold text-gray-900">Month {row.month}</td>
                    <td className="py-2.5 px-3 text-gray-800">₹{formatINR(row.principalPart)}</td>
                    <td className="py-2.5 px-3 text-amber-700">₹{formatINR(row.interestPart)}</td>
                    <td className="py-2.5 px-3 font-semibold text-gray-900">₹{formatINR(monthlyEmi)}</td>
                    <td className="py-2.5 px-3 text-gray-500">₹{formatINR(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
