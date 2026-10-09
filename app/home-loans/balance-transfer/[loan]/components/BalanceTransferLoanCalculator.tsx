"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  ArrowRight,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Zap,
  Info,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferLoanCalculatorProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanCalculator({
  lender,
}: BalanceTransferLoanCalculatorProps) {
  const { openApplyModal } = useApplyModal();

  const minLenderRate = lender.interestRate?.min ?? 7.25;
  const maxLenderRate = lender.interestRate?.max ?? 8.75;
  const maxTenureAllowed = lender.tenureYears || 30;

  // State inputs
  const [outstandingBalance, setOutstandingBalance] = useState<number>(5000000); // ₹50 Lakhs
  const [currentRate, setCurrentRate] = useState<number>(9.25);
  const [newRate, setNewRate] = useState<number>(minLenderRate);
  const [remainingYears, setRemainingYears] = useState<number>(18);
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const [showBreakup, setShowBreakup] = useState<boolean>(false);

  // Amount Presets
  const amountPresets = [
    { label: "₹30L", value: 3000000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹75L", value: 7500000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹1.5 Cr", value: 15000000 },
    { label: "₹2 Cr", value: 20000000 },
  ];

  // Tenure Presets
  const tenurePresets = [
    { label: "10 Yrs", years: 10 },
    { label: "15 Yrs", years: 15 },
    { label: "18 Yrs", years: 18 },
    { label: "20 Yrs", years: 20 },
    { label: "25 Yrs", years: 25 },
  ].filter((t) => t.years <= maxTenureAllowed);

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

  // Calculations
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

    // New Loan (Transfer Amount Only)
    const factorNew = Math.pow(1 + rNew, n);
    const emiNew = Math.round((P * rNew * factorNew) / (factorNew - 1));
    const totalPaymentNew = emiNew * n;
    const totalInterestNew = totalPaymentNew - P;

    // Savings without top-up
    const monthlySavings = Math.max(0, emiOld - emiNew);
    const grossInterestSaved = Math.max(0, totalInterestOld - totalInterestNew);

    // With Top-Up
    const P_total = P + topUpAmount;
    const emiWithTopUp = Math.round((P_total * rNew * factorNew) / (factorNew - 1));
    const emiDifferenceWithTopUp = emiWithTopUp - emiOld;

    // Estimated switch fees (processing fee cap from DB or default cap ~₹18k + MODT ~0.2%)
    let estimatedProcessingFee = Math.round(P * (lender.processingFeePercent / 100));
    if (lender.processingFeeCap && lender.processingFeeCap.includes("18,000")) {
      estimatedProcessingFee = Math.min(18000, estimatedProcessingFee);
    } else if (lender.processingFeeCap && lender.processingFeeCap.includes("10,000")) {
      estimatedProcessingFee = Math.min(10000, estimatedProcessingFee);
    } else if (lender.processingFeeCap && lender.processingFeeCap.includes("15,000")) {
      estimatedProcessingFee = Math.min(15000, estimatedProcessingFee);
    } else {
      estimatedProcessingFee = Math.min(25000, estimatedProcessingFee);
    }

    const estimatedMODT = Math.min(15000, Math.round(P * 0.002));
    const totalSwitchCosts = estimatedProcessingFee + estimatedMODT + 5000; // Legal/valuation
    const netLifetimeSavings = Math.max(0, grossInterestSaved - totalSwitchCosts);

    return {
      emiOld,
      emiNew,
      monthlySavings,
      grossInterestSaved,
      totalPaymentOld,
      totalPaymentNew,
      totalInterestOld,
      totalInterestNew,
      topUpAmount,
      emiWithTopUp,
      emiDifferenceWithTopUp,
      totalSwitchCosts,
      estimatedProcessingFee,
      estimatedMODT,
      netLifetimeSavings,
    };
  }, [
    outstandingBalance,
    remainingYears,
    currentRate,
    newRate,
    topUpAmount,
    lender.processingFeePercent,
    lender.processingFeeCap,
  ]);

  return (
    <section
      id="savings-calculator"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-gold" />
          <span>TAILORED SAVINGS SIMULATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Calculate Your Exact Savings with <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Compare your current monthly EMI and total interest outgo against {lender.name}&apos;s floor takeover rate of{" "}
          <strong className="text-primary font-bold">{minLenderRate}% p.a.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          {/* Outstanding Balance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Outstanding Loan Principal
              </label>
              <span className="font-bricolage font-extrabold text-lg sm:text-xl text-primary">
                {formatAmountText(outstandingBalance)}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={30000000}
              step={200000}
              value={outstandingBalance}
              onChange={(e) => setOutstandingBalance(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            {/* Quick Presets */}
            <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1 scrollbar-none">
              {amountPresets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setOutstandingBalance(p.value)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    outstandingBalance === p.value
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Current Bank Interest Rate
              </label>
              <span className="font-bricolage font-extrabold text-base sm:text-lg text-amber-700">
                {currentRate.toFixed(2)}% p.a.
              </span>
            </div>
            <input
              type="range"
              min={8.0}
              max={12.0}
              step={0.05}
              value={currentRate}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>8.0% (Competitive)</span>
              <span>9.25% (Market Avg)</span>
              <span>12.0% (High NBFC)</span>
            </div>
          </div>

          {/* New Rate with this Lender */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  New Rate at {lender.name}
                </label>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                  OFFER RATE
                </span>
              </div>
              <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                {newRate.toFixed(2)}% p.a.
              </span>
            </div>
            <input
              type="range"
              min={Math.max(6.8, minLenderRate - 0.5)}
              max={Math.max(10.0, maxLenderRate + 0.5)}
              step={0.05}
              value={newRate}
              onChange={(e) => setNewRate(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>Min: {minLenderRate}%</span>
              <span>Default Offer: {minLenderRate}%</span>
              <span>Max: {maxLenderRate}%</span>
            </div>
          </div>

          {/* Remaining Tenure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Remaining Loan Tenure
              </label>
              <span className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900">
                {remainingYears} Years ({remainingYears * 12} EMIs)
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={maxTenureAllowed}
              step={1}
              value={remainingYears}
              onChange={(e) => setRemainingYears(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex items-center gap-2 mt-2">
              {tenurePresets.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setRemainingYears(t.years)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    remainingYears === t.years
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Top-Up Slider */}
          {lender.topUpAvailable && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Add-on Top-Up Loan
                  </label>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    OPTIONAL
                  </span>
                </div>
                <span className="font-bricolage font-extrabold text-base sm:text-lg text-emerald-700">
                  {topUpAmount === 0 ? "None (₹0)" : formatAmountText(topUpAmount)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10000000}
                step={100000}
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Top-up sanctioned at home loan takeover rate ({newRate}%). Max permissible: {lender.maxTopUpAmount}.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Live Savings Scorecard (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Savings Card */}
          <div className="bg-linear-to-br from-[#02474D] via-[#033B40] to-[#022B2F] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-emerald-200 border border-white/15">
                <TrendingDown className="w-3.5 h-3.5 text-gold" />
                <span>INTEREST ARBITRAGE BENEFIT</span>
              </div>

              {/* Monthly EMI Comparison */}
              <div>
                <span className="text-xs text-gray-300 block">Estimated Monthly Savings</span>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gold mt-0.5">
                  ₹{formatINR(calculation.monthlySavings)}
                  <span className="text-sm font-normal text-gray-300"> / month</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Monthly EMI drops from <span className="line-through text-red-300">₹{formatINR(calculation.emiOld)}</span> to{" "}
                  <strong className="text-white font-bold">₹{formatINR(calculation.emiNew)}</strong>
                </p>
              </div>

              {/* Net Lifetime Savings Box */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200">Gross Interest Saved:</span>
                  <span className="font-bold text-emerald-300">
                    ₹{formatINR(calculation.grossInterestSaved)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200">Est. Switching Costs:</span>
                  <span className="font-medium text-gray-300">
                    - ₹{formatINR(calculation.totalSwitchCosts)}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Net Lifetime Savings:
                  </span>
                  <span className="font-bricolage font-extrabold text-base text-gold">
                    ₹{formatINR(calculation.netLifetimeSavings)}
                  </span>
                </div>
              </div>

              {/* Top-Up note if selected */}
              {topUpAmount > 0 && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3 text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Zap className="w-4 h-4 text-gold" />
                    <span>With ₹{formatAmountText(topUpAmount)} Top-Up:</span>
                  </div>
                  <p>
                    Combined EMI: <strong className="text-white">₹{formatINR(calculation.emiWithTopUp)}/mo</strong>{" "}
                    ({calculation.emiDifferenceWithTopUp >= 0 ? "+" : ""}₹{formatINR(calculation.emiDifferenceWithTopUp)} vs current EMI)
                  </p>
                </div>
              )}

              {/* Action CTA */}
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    lender.name,
                    `Balance Transfer (${formatAmountText(outstandingBalance)} at ${newRate}% p.a.) • Est Savings: ₹${formatINR(calculation.monthlySavings)}/mo`
                  )
                }
                className="w-full bg-[#E5B537] hover:bg-[#F5C545] text-[#02474D] font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Switch to {lender.name} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fee & Switch Cost Breakdown Toggle */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => setShowBreakup(!showBreakup)}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span>Estimated Switch Cost Breakdown</span>
              </div>
              {showBreakup ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {showBreakup && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600 animate-fadeIn">
                <div className="flex justify-between">
                  <span>Takeover Processing Fee ({lender.processingFeePercent}%):</span>
                  <span className="font-bold text-gray-900">
                    ₹{formatINR(calculation.estimatedProcessingFee)} (Capped at {lender.processingFeeCap})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>State MODT / Title Deposit:</span>
                  <span className="font-bold text-gray-900">₹{formatINR(calculation.estimatedMODT)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Legal &amp; Valuation Verification:</span>
                  <span className="font-bold text-gray-900">~₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Existing Bank Foreclosure Penalty:</span>
                  <span className="font-bold text-emerald-700">₹0 (RBI 0% Rule)</span>
                </div>
                <p className="text-[11px] text-gray-500 pt-1 border-t border-gray-100 leading-relaxed">
                  Switch fees are recovered within <strong>{Math.ceil(calculation.totalSwitchCosts / Math.max(1, calculation.monthlySavings))} months</strong> of lower EMI payments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
