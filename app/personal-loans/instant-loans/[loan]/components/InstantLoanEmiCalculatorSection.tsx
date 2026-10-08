"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface InstantLoanEmiCalculatorSectionProps {
  lender: InstantLoanLender;
}

export default function InstantLoanEmiCalculatorSection({
  lender,
}: InstantLoanEmiCalculatorSectionProps) {
  const { openApplyModal } = useApplyModal();

  const minAmount = lender.minAmountNum || 10000;
  const maxAmount = lender.maxAmountNum || 4000000;
  const defaultAmount = Math.min(Math.max(200000, minAmount), maxAmount);

  const minRate = lender.interestRate?.min ?? 9.99;
  const maxRate = Math.max(lender.interestRate?.max ?? 24.0, minRate + 1);

  const maxTenureMonths = lender.tenureMonths || 60;
  const defaultTenure = Math.min(24, maxTenureMonths);

  // States
  const [loanAmount, setLoanAmount] = useState<number>(defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(minRate);
  const [tenureMonths, setTenureMonths] = useState<number>(defaultTenure);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Quick Amount Presets
  const presets = useMemo(() => {
    const list = [50000, 100000, 200000, 500000, 1000000, 2500000];
    const filtered = list.filter((amt) => amt >= minAmount && amt <= maxAmount);
    if (!filtered.includes(maxAmount)) {
      filtered.push(maxAmount);
    }
    return filtered;
  }, [minAmount, maxAmount]);

  // Currency Formatter
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

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
    const n = tenureMonths;

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

    const feePct = lender.processingFeePercent || 2.0;
    const estFee = Math.round(p * (feePct / 100));

    // First 6 months preview
    let balance = p;
    const preview = [];
    for (let month = 1; month <= Math.min(6, n); month++) {
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

  return (
    <section id="emi-calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>REDUCING BALANCE CALCULATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Instant Loan EMI Calculator for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Estimate your exact monthly repayment, total interest payable, and potential processing charges based on {lender.name}&apos;s current rates.
        </p>
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-7">
          {/* Slider 1: Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-primary" />
                Loan Amount
              </label>
              <div className="font-bricolage font-extrabold text-xl text-primary">
                ₹{formatINR(loanAmount)}
              </div>
            </div>

            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={maxAmount > 500000 ? 10000 : 2000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5">
              <span>Min: {lender.minAmount}</span>
              <span>Max: {lender.maxAmount}</span>
            </div>

            {/* Quick amount presets */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLoanAmount(amt)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    loanAmount === amt
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  ₹{amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-primary" />
                Interest Rate (p.a.)
              </label>
              <div className="font-bricolage font-extrabold text-xl text-primary">
                {interestRate.toFixed(2)}%
              </div>
            </div>

            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5">
              <span>Lender Min: {minRate}%</span>
              <span>Lender Max: {maxRate.toFixed(2)}%</span>
            </div>
          </div>

          {/* Slider 3: Tenure Months */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Repayment Tenure
              </label>
              <div className="font-bricolage font-extrabold text-xl text-primary">
                {tenureMonths} Months ({Math.round((tenureMonths / 12) * 10) / 10} Yrs)
              </div>
            </div>

            <input
              type="range"
              min={3}
              max={maxTenureMonths}
              step={3}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5">
              <span>3 Months</span>
              <span>Max: {lender.tenure}</span>
            </div>

            {/* Quick Tenure Pills */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {[6, 12, 24, 36, 48, 60]
                .filter((m) => m <= maxTenureMonths)
                .map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tenureMonths === m
                        ? "bg-primary text-white shadow-2xs"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {m} Mos
                  </button>
                ))}
            </div>
          </div>

          {/* Amortization schedule toggle */}
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>View Initial 6-Month Repayment Schedule</span>
              {showAmortization ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {showAmortization && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Month</th>
                      <th className="p-2.5">Principal</th>
                      <th className="p-2.5">Interest</th>
                      <th className="p-2.5">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {schedulePreview.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50/70">
                        <td className="p-2.5 font-medium text-gray-900">Month {row.month}</td>
                        <td className="p-2.5 text-emerald-700 font-bold">₹{formatINR(row.principalPart)}</td>
                        <td className="p-2.5 text-amber-700 font-bold">₹{formatINR(row.interestPart)}</td>
                        <td className="p-2.5 text-gray-600">₹{formatINR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary via-[#023b40] to-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9AA3C]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                Monthly Repayment
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-300 border border-white/15 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lender.disbursalTime}
              </span>
            </div>

            <div>
              <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white">
                ₹{formatINR(monthlyEmi)}
                <span className="text-xs font-normal text-emerald-200 ml-1">/ month</span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-1">
                Calculated on monthly reducing balance method.
              </p>
            </div>

            {/* Visual breakdown bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-100 mb-1.5">
                <span>Principal ({principalPercent}%)</span>
                <span>Interest ({interestPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${principalPercent}%` }}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${interestPercent}%` }}
                />
              </div>
            </div>

            {/* Output details rows */}
            <div className="space-y-3 pt-3 border-t border-white/15 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-emerald-100">Principal Amount:</span>
                <span className="font-bold text-white">₹{formatINR(loanAmount)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-emerald-100">Total Interest Payable:</span>
                <span className="font-bold text-amber-300">₹{formatINR(totalInterest)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-emerald-100">Total Repayment (P + I):</span>
                <span className="font-bold text-white text-sm">₹{formatINR(totalPayment)}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-emerald-200">
                <span>Est. Processing Fee ({lender.processingFeePercent || 2}%):</span>
                <span>≈ ₹{formatINR(processingFeeEstimate)} + GST</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  lender.name,
                  `Calculated: ₹${formatINR(loanAmount)} for ${tenureMonths} Mos (EMI: ₹${formatINR(monthlyEmi)}/mo)`
                )
              }
              className="w-full bg-white hover:bg-gray-100 active:scale-98 text-primary font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer group"
            >
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span>Apply for this ₹{formatINR(monthlyEmi)}/mo EMI</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Zero CIBIL score inquiry penalty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
