"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function BalanceTransferSavingsCalculator() {
  const { openApplyModal } = useApplyModal();

  // Inputs
  const [outstandingBalance, setOutstandingBalance] = useState<number>(5000000); // ₹50 Lakhs
  const [currentRate, setCurrentRate] = useState<number>(9.25); // 9.25%
  const [newRate, setNewRate] = useState<number>(7.25); // 7.25%
  const [remainingYears, setRemainingYears] = useState<number>(18); // 18 years
  const [topUpAmount, setTopUpAmount] = useState<number>(0); // ₹0 to ₹1 Cr
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Amount Presets
  const amountPresets = [
    { label: "₹30L", value: 3000000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹75L", value: 7500000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹1.5 Cr", value: 15000000 },
    { label: "₹2 Cr", value: 20000000 },
  ];

  // Bank Rate Presets
  const bankRatePresets = [
    { label: "BoI (7.10%)", rate: 7.1 },
    { label: "BoB (7.15%)", rate: 7.15 },
    { label: "SBI (7.25%)", rate: 7.25 },
    { label: "Canara (7.25%)", rate: 7.25 },
    { label: "HDFC (7.30%)", rate: 7.3 },
    { label: "Kotak (7.30%)", rate: 7.3 },
    { label: "Axis (7.35%)", rate: 7.35 },
    { label: "ICICI (7.40%)", rate: 7.4 },
    { label: "IDFC (7.50%)", rate: 7.5 },
  ];

  // Tenure Presets
  const tenurePresets = [
    { label: "10 Yrs", years: 10 },
    { label: "15 Yrs", years: 15 },
    { label: "18 Yrs", years: 18 },
    { label: "20 Yrs", years: 20 },
    { label: "25 Yrs", years: 25 },
  ];

  // Number Formatters
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const formatAmountText = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
    }
    return `₹${formatINR(val)}`;
  };

  // Math: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculation = useMemo(() => {
    const P = outstandingBalance;
    const n = remainingYears * 12;

    const rOld = currentRate / 12 / 100;
    const rNew = newRate / 12 / 100;

    // Existing Loan
    const factorOld = Math.pow(1 + rOld, n);
    const emiOld = Math.round((P * rOld * factorOld) / (factorOld - 1));
    const totalPaymentOld = emiOld * n;
    const totalInterestOld = totalPaymentOld - P;

    // New Loan (Transfer Only)
    const factorNew = Math.pow(1 + rNew, n);
    const emiNew = Math.round((P * rNew * factorNew) / (factorNew - 1));
    const totalPaymentNew = emiNew * n;
    const totalInterestNew = totalPaymentNew - P;

    // Savings
    const monthlySavings = Math.max(0, emiOld - emiNew);
    const grossInterestSaved = Math.max(0, totalInterestOld - totalInterestNew);

    // Switch fees (est capped fee ~₹15,000 + MODT ~0.2% max ₹10,000)
    const estimatedSwitchCosts = Math.min(25000, Math.round(15000 + P * 0.001));
    const netLifetimeSavings = Math.max(0, grossInterestSaved - estimatedSwitchCosts);

    const breakEvenMonths =
      monthlySavings > 0
        ? (estimatedSwitchCosts / monthlySavings).toFixed(1)
        : "N/A";

    // Top-Up calculation if selected
    let topUpEmi = 0;
    let topUpInterest = 0;
    let personalLoanComparisonSavings = 0;

    if (topUpAmount > 0) {
      const rTopUp = (newRate + 0.25) / 12 / 100; // typical 25 bps above home loan rate
      const factorTopUp = Math.pow(1 + rTopUp, n);
      topUpEmi = Math.round((topUpAmount * rTopUp * factorTopUp) / (factorTopUp - 1));
      topUpInterest = topUpEmi * n - topUpAmount;

      // Compare vs Personal Loan at 12.5% for 5 years (60 months)
      const rPl = 12.5 / 12 / 100;
      const nPl = Math.min(60, n);
      const factorPl = Math.pow(1 + rPl, nPl);
      const plEmi = Math.round((topUpAmount * rPl * factorPl) / (factorPl - 1));
      const plTotalInterest = plEmi * nPl - topUpAmount;
      personalLoanComparisonSavings = Math.max(0, plTotalInterest - topUpInterest);
    }

    // Year by year breakdown preview
    const yearlyBreakdown = [];
    let balanceOld = P;
    let balanceNew = P;
    let cumulativeSaved = 0;

    for (let yr = 1; yr <= Math.min(remainingYears, 10); yr++) {
      let intOldYr = 0;
      let intNewYr = 0;

      for (let m = 0; m < 12; m++) {
        const intOldMonth = balanceOld * rOld;
        const prinOldMonth = emiOld - intOldMonth;
        balanceOld = Math.max(0, balanceOld - prinOldMonth);
        intOldYr += intOldMonth;

        const intNewMonth = balanceNew * rNew;
        const prinNewMonth = emiNew - intNewMonth;
        balanceNew = Math.max(0, balanceNew - prinNewMonth);
        intNewYr += intNewMonth;
      }

      const yrSavings = Math.max(0, intOldYr - intNewYr);
      cumulativeSaved += yrSavings;

      yearlyBreakdown.push({
        year: yr,
        emiOldYear: emiOld * 12,
        emiNewYear: emiNew * 12,
        interestSavedThisYear: Math.round(yrSavings),
        cumulativeSavings: Math.round(cumulativeSaved),
        remainingPrincipal: Math.round(balanceNew),
      });
    }

    return {
      emiOld,
      emiNew,
      monthlySavings,
      totalInterestOld,
      totalInterestNew,
      grossInterestSaved,
      estimatedSwitchCosts,
      netLifetimeSavings,
      breakEvenMonths,
      topUpEmi,
      combinedEmi: emiNew + topUpEmi,
      personalLoanComparisonSavings,
      yearlyBreakdown,
    };
  }, [outstandingBalance, currentRate, newRate, remainingYears, topUpAmount]);

  return (
    <section id="savings-calculator" className="py-12 sm:py-16 bg-[#F8F6F0] border-t border-b border-gray-200/70 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold shadow-2xs mb-3">
            <Calculator className="w-4 h-4 text-gold" />
            <span>Interactive Savings & Top-Up Engine</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Calculate Your Home Loan Balance Transfer Savings
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            See exactly how much you save in monthly EMIs and total lifetime interest by moving your outstanding balance to a lower rate lender.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column (7 cols): Controls & Sliders */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              
              {/* Slider 1: Outstanding Balance */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Outstanding Loan Balance
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-primary font-mono">
                    {formatAmountText(outstandingBalance)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {amountPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setOutstandingBalance(preset.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        outstandingBalance === preset.value
                          ? "bg-primary text-white shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={1000000}
                  max={30000000}
                  step={250000}
                  value={outstandingBalance}
                  onChange={(e) => setOutstandingBalance(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>₹10 Lakhs</span>
                  <span>₹1.5 Crore</span>
                  <span>₹3 Crore</span>
                </div>
              </div>

              {/* Slider 2: Current Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Existing Interest Rate (Current Bank)
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-amber-700 font-mono">
                    {currentRate.toFixed(2)}% p.a.
                  </span>
                </div>

                <input
                  type="range"
                  min={7.5}
                  max={12.0}
                  step={0.05}
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>7.50%</span>
                  <span>9.00%</span>
                  <span>10.50%</span>
                  <span>12.00%</span>
                </div>
              </div>

              {/* Slider 3: Remaining Tenure */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Remaining Loan Tenure
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-gray-900 font-mono">
                    {remainingYears} Years ({remainingYears * 12} Months)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {tenurePresets.map((preset) => (
                    <button
                      key={preset.years}
                      type="button"
                      onClick={() => setRemainingYears(preset.years)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        remainingYears === preset.years
                          ? "bg-primary text-white shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={2}
                  max={30}
                  step={1}
                  value={remainingYears}
                  onChange={(e) => setRemainingYears(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: New Rate & Preset Bank Pills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    New Takeover Interest Rate
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-700 font-mono">
                    {newRate.toFixed(2)}% p.a.
                  </span>
                </div>

                {/* Bank Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {bankRatePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setNewRate(preset.rate)}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                        newRate === preset.rate
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={7.0}
                  max={9.5}
                  step={0.05}
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Optional Top-Up Slider */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-gold" />
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Additional Top-Up Loan (Optional)
                    </label>
                  </div>
                  <span className="text-sm font-bold text-gray-900 font-mono">
                    {topUpAmount > 0 ? formatAmountText(topUpAmount) : "None (₹0)"}
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={100000}
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full accent-gold h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>₹0 (No Top-Up)</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Live Savings Card */}
            <div className="lg:col-span-5 bg-linear-to-b from-[#EBF4ED]/50 via-emerald-50/40 to-[#FDFBF7] p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Your Net Transfer Savings
                </span>
                <h3 className="font-bricolage font-extrabold text-2xl text-gray-900">
                  Switching Summary
                </h3>

                {/* Primary Metric: Monthly EMI Reduction */}
                <div className="mt-5 p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-1">
                  <span className="text-xs text-gray-500 font-medium block">
                    Monthly EMI Savings
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                    ₹{formatINR(calculation.monthlySavings)}{" "}
                    <span className="text-xs font-bold text-gray-500">/ month</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span>Old EMI: <strong className="text-gray-800 font-mono">₹{formatINR(calculation.emiOld)}</strong></span>
                    <span>New EMI: <strong className="text-primary font-mono">₹{formatINR(calculation.emiNew)}</strong></span>
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200">
                    <span className="text-gray-600 font-medium">Total Lifetime Interest Saved:</span>
                    <span className="font-bold text-emerald-800 font-mono text-sm">
                      ₹{formatINR(calculation.grossInterestSaved)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200">
                    <span className="text-gray-600 font-medium">Est. Switch Costs (Capped Fee + MODT):</span>
                    <span className="font-bold text-gray-800 font-mono">
                      ~₹{formatINR(calculation.estimatedSwitchCosts)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300">
                    <span className="text-emerald-950 font-bold">Net Cash Pocket Savings:</span>
                    <span className="font-extrabold text-primary font-mono text-base">
                      ₹{formatINR(calculation.netLifetimeSavings)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200">
                    <span className="text-gray-600 font-medium">Break-Even Period:</span>
                    <span className="font-bold text-gray-900">
                      Recovered in {calculation.breakEvenMonths} Months
                    </span>
                  </div>

                  {topUpAmount > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>Top-Up EMI ({formatAmountText(topUpAmount)}):</span>
                        <span className="font-mono">₹{formatINR(calculation.topUpEmi)} / mo</span>
                      </div>
                      <div className="flex justify-between text-amber-800">
                        <span>Combined New Total EMI:</span>
                        <span className="font-bold font-mono">₹{formatINR(calculation.combinedEmi)} / mo</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      "Home Loan Balance Transfer",
                      `Save ₹${formatINR(calculation.monthlySavings)}/mo on ₹${(outstandingBalance / 100000).toFixed(0)}L balance switch from ${currentRate}% to ${newRate}%`
                    )
                  }
                  className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Lock in This Rate & Apply Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full text-center text-xs text-gray-600 hover:text-primary transition-colors flex items-center justify-center gap-1 font-medium cursor-pointer"
                >
                  <span>{showAmortization ? "Hide" : "View"} Year-by-Year Savings Breakdown</span>
                  {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>

          </div>

          {/* Toggleable Year-by-Year Amortization Schedule */}
          {showAmortization && (
            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200">
              <h4 className="font-bricolage font-bold text-base text-gray-900 mb-3">
                10-Year Cumulative Interest Savings Schedule
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Old Yearly Payment</th>
                      <th className="py-2.5 px-3">New Yearly Payment</th>
                      <th className="py-2.5 px-3">Yearly Saved</th>
                      <th className="py-2.5 px-3 text-emerald-700">Cumulative Savings</th>
                      <th className="py-2.5 px-3">Remaining Principal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/60 font-mono">
                    {calculation.yearlyBreakdown.map((row) => (
                      <tr key={row.year} className="hover:bg-white transition-colors">
                        <td className="py-2.5 px-3 font-bold font-montserrat">Year {row.year}</td>
                        <td className="py-2.5 px-3 text-gray-600">₹{formatINR(row.emiOldYear)}</td>
                        <td className="py-2.5 px-3 text-gray-900 font-semibold">₹{formatINR(row.emiNewYear)}</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">₹{formatINR(row.interestSavedThisYear)}</td>
                        <td className="py-2.5 px-3 text-primary font-extrabold">₹{formatINR(row.cumulativeSavings)}</td>
                        <td className="py-2.5 px-3 text-gray-500">₹{formatINR(row.remainingPrincipal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
