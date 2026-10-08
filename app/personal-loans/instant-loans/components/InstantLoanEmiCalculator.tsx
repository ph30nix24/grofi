"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  Zap,
  Info,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function InstantLoanEmiCalculator() {
  const { openApplyModal } = useApplyModal();

  // Inputs
  const [loanAmount, setLoanAmount] = useState<number>(100000); // ₹1 Lakh default
  const [interestRate, setInterestRate] = useState<number>(11.5); // 11.5% default
  const [tenureMonths, setTenureMonths] = useState<number>(12); // 12 months default

  // Amount Presets
  const amountPresets = [
    { label: "₹25K", value: 25000 },
    { label: "₹50K", value: 50000 },
    { label: "₹1L", value: 100000 },
    { label: "₹3L", value: 300000 },
    { label: "₹5L", value: 500000 },
    { label: "₹10L", value: 1000000 },
    { label: "₹25L", value: 2500000 },
  ];

  // Rate Presets
  const ratePresets = [
    { label: "Axis (8.90%)", rate: 8.9 },
    { label: "HDFC (9.99%)", rate: 9.99 },
    { label: "SBI (10.0%)", rate: 10.0 },
    { label: "Navi (12.0%)", rate: 12.0 },
    { label: "CASHe (18.0%)", rate: 18.0 },
  ];

  // Tenure Presets
  const tenurePresets = [
    { label: "3 Mo", months: 3 },
    { label: "6 Mo", months: 6 },
    { label: "12 Mo", months: 12 },
    { label: "24 Mo", months: 24 },
    { label: "36 Mo", months: 36 },
    { label: "48 Mo", months: 48 },
    { label: "60 Mo", months: 60 },
  ];

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Monthly Reducing EMI Calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
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

  // Expected turnaround category
  const estimatedSpeed = useMemo(() => {
    if (loanAmount <= 200000) {
      return {
        badge: "⚡ Under 10 Minutes",
        color: "bg-emerald-50 text-emerald-800 border-emerald-300",
        desc: "Instant paperless IMPS transfer via fintech apps & digital banking.",
      };
    } else if (loanAmount <= 1000000) {
      return {
        badge: "⏱️ Under 15 - 30 Minutes",
        color: "bg-amber-50 text-amber-900 border-amber-300",
        desc: "Pre-approved bank credit & fast Account Aggregator underwriting.",
      };
    } else {
      return {
        badge: "🕒 1 to 4 Hours (Same Day)",
        color: "bg-blue-50 text-blue-900 border-blue-300",
        desc: "High ticket sovereign sanction with online video-KYC check.",
      };
    }
  }, [loanAmount]);

  return (
    <section id="instant-emi-calculator-section" className="py-14 sm:py-20 bg-linear-to-b from-[#FDFBF7] via-white to-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            Instant EMI & Turnaround Estimator
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Calculate Your <span className="text-primary">Monthly Repayment & Speed</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Slide to estimate your EMI, total interest payable, and the expected disbursal turnaround window.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Sliders & Presets */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-md space-y-7">
            {/* 1. Loan Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  Loan Amount Needed
                </label>
                <div className="bg-[#EBF4ED] px-3.5 py-1.5 rounded-xl border border-primary/20 text-right">
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                    ₹{formatINR(loanAmount)}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={10000}
                max={4000000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                <span>₹10,000</span>
                <span>₹20 Lakhs</span>
                <span>₹40 Lakhs</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {amountPresets.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setLoanAmount(p.value)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      loanAmount === p.value
                        ? "bg-primary text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interest Rate */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-emerald-700" />
                  Interest Rate (p.a.)
                </label>
                <div className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-right">
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-emerald-800">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={8.5}
                max={36}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                <span>8.5% (Prime)</span>
                <span>20%</span>
                <span>36% (Fintech Max)</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {ratePresets.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setInterestRate(r.rate)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      interestRate === r.rate
                        ? "bg-emerald-700 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tenure */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  Loan Duration (Months)
                </label>
                <div className="bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200 text-right">
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-amber-900">
                    {tenureMonths} Months
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={3}
                max={60}
                step={1}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />

              <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                <span>3 Months</span>
                <span>36 Months</span>
                <span>60 Months</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {tenurePresets.map((t) => (
                  <button
                    key={t.months}
                    type="button"
                    onClick={() => setTenureMonths(t.months)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      tenureMonths === t.months
                        ? "bg-gold text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live Repayment Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-gold to-emerald-500" />

            {/* Estimated monthly EMI */}
            <div className="text-center pt-2">
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                Monthly Repayment EMI
              </span>
              <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-primary mt-1">
                ₹{formatINR(calculation.monthlyEmi)}
              </div>
              <span className="text-xs text-gray-500 mt-0.5 block">
                for {tenureMonths} months @ {interestRate}% p.a.
              </span>
            </div>

            {/* Turnaround Speed Indicator */}
            <div className={`p-3.5 rounded-2xl border ${estimatedSpeed.color} flex items-start gap-3`}>
              <Clock className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs block">{estimatedSpeed.badge}</span>
                <span className="text-[11px] opacity-90 block mt-0.5">{estimatedSpeed.desc}</span>
              </div>
            </div>

            {/* Breakup Details */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Principal Borrowed:</span>
                <span className="font-bold text-gray-900">₹{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Total Interest Payable:</span>
                <span className="font-bold text-emerald-700">₹{formatINR(calculation.totalInterest)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Total Sanction Payment:</span>
                <span className="font-bold text-primary text-sm font-bricolage">
                  ₹{formatINR(calculation.totalPayment)}
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1.5">
                <span>Principal ({calculation.principalPercent.toFixed(0)}%)</span>
                <span>Interest ({calculation.interestPercent.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${calculation.principalPercent}%` }}
                  className="h-full bg-primary"
                />
                <div
                  style={{ width: `${calculation.interestPercent}%` }}
                  className="h-full bg-gold"
                />
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                openApplyModal(
                  "Instant Personal Loan",
                  `Calculated ₹${formatINR(loanAmount)} for ${tenureMonths} months @ ₹${formatINR(calculation.monthlyEmi)}/mo`
                )
              }
              className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 text-gold" />
              <span>Get Disbursed For This Amount</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
