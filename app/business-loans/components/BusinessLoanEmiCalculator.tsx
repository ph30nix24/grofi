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
  ChevronDown,
  ChevronUp,
  Info,
  Building2,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function BusinessLoanEmiCalculator() {
  const { openApplyModal } = useApplyModal();

  // Calculator inputs
  const [loanAmount, setLoanAmount] = useState<number>(2500000); // ₹25 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(10.75); // 10.75% default
  const [tenureYears, setTenureYears] = useState<number>(4); // 4 years default
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Quick chips for business loan amounts
  const amountPresets = [
    { label: "₹5L", value: 500000 },
    { label: "₹15L", value: 1500000 },
    { label: "₹25L", value: 2500000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹75L", value: 7500000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹2 Cr", value: 20000000 },
  ];

  // Quick chips for bank benchmark rates from DB
  const bankRatePresets = [
    { label: "PNB (8.85%)", rate: 8.85 },
    { label: "BoB (8.95%)", rate: 8.95 },
    { label: "SBI (9.10%)", rate: 9.10 },
    { label: "HDFC (10.75%)", rate: 10.75 },
    { label: "Axis (10.80%)", rate: 10.80 },
    { label: "ICICI (11.00%)", rate: 11.00 },
    { label: "Bajaj (12.00%)", rate: 12.00 },
  ];

  // Quick chips for tenure
  const tenurePresets = [
    { label: "1 Year", years: 1 },
    { label: "2 Years", years: 2 },
    { label: "3 Years", years: 3 },
    { label: "4 Years", years: 4 },
    { label: "5 Years", years: 5 },
    { label: "7 Years", years: 7 },
  ];

  // Formatting helper
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Monthly EMI Math calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculation = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (r === 0 || n === 0) {
      return {
        monthlyEmi: Math.round(P / Math.max(1, n)),
        totalInterest: 0,
        totalPayment: P,
        principalPercent: 100,
        interestPercent: 0,
        yearlyBreakdown: [],
      };
    }

    const compound = Math.pow(1 + r, n);
    const emi = (P * r * compound) / (compound - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const principalPct = Math.round((P / totalPayment) * 100);
    const interestPct = Math.max(0, 100 - principalPct);

    // Generate yearly amortization breakdown
    let balance = P;
    const yearlyBreakdown: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];

    for (let yr = 1; yr <= tenureYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      for (let m = 1; m <= 12; m++) {
        const monthlyInterest = balance * r;
        const monthlyPrincipal = emi - monthlyInterest;
        yrInterest += monthlyInterest;
        yrPrincipal += monthlyPrincipal;
        balance = Math.max(0, balance - monthlyPrincipal);
      }
      yearlyBreakdown.push({
        year: yr,
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
        balance: Math.round(balance),
      });
    }

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent: principalPct,
      interestPercent: interestPct,
      yearlyBreakdown,
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <section id="emi-calculator-section" className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            Commercial Loan Calculator
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Business Loan & MSME <span className="text-primary">EMI Calculator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Estimate your monthly working capital outflow, interest costs, and amortization schedule across flexible commercial tenures up to 7 years.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (7 cols): Input Sliders & Presets */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            {/* 1. Loan Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  <span>Required Loan / Working Capital</span>
                </label>
                <div className="bg-[#FDFBF7] px-3 py-1 rounded-xl border border-gray-200">
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                    ₹{formatINR(loanAmount)}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={100000}
                max={20000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>₹1 Lakh</span>
                <span>₹50 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹2 Crores</span>
              </div>

              {/* Amount Quick Presets */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {amountPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setLoanAmount(preset.value)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      loanAmount === preset.value
                        ? "bg-primary text-white border-primary shadow-2xs"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-primary" />
                  <span>Annual Interest Rate (% p.a.)</span>
                </label>
                <div className="bg-[#FDFBF7] px-3 py-1 rounded-xl border border-gray-200">
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={8.5}
                max={25.0}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>8.50% (Lowest PSU)</span>
                <span>15.00%</span>
                <span>25.00% (NBFC High)</span>
              </div>

              {/* Bank Presets */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {bankRatePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setInterestRate(preset.rate)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      Math.abs(interestRate - preset.rate) < 0.01
                        ? "bg-primary text-white border-primary shadow-2xs"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Repayment Tenure</span>
                </label>
                <div className="bg-[#FDFBF7] px-3 py-1 rounded-xl border border-gray-200">
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                    {tenureYears} {tenureYears === 1 ? "Year" : "Years"} ({tenureYears * 12} Months)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>1 Year</span>
                <span>3 Years</span>
                <span>5 Years</span>
                <span>7 Years</span>
              </div>

              {/* Tenure Presets */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tenurePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setTenureYears(preset.years)}
                    className={`text-xs px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      tenureYears === preset.years
                        ? "bg-primary text-white border-primary shadow-2xs"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Output Summary Card */}
          <div className="lg:col-span-5 bg-linear-to-b from-[#F2EFE9]/60 via-[#FDFBF7] to-[#FDFBF7] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200/80">
            <div>
              <div className="text-center pb-6 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1">
                  Monthly Business EMI
                </span>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-primary">
                  ₹{formatINR(calculation.monthlyEmi)}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ month</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Calculated using Monthly Reducing Balance method
                </p>
              </div>

              {/* Payment Breakdown Cards */}
              <div className="py-6 space-y-3.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 font-medium">Principal Loan Amount</span>
                  <span className="font-bold text-gray-900 font-bricolage">
                    ₹{formatINR(loanAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 font-medium">Total Interest Payable</span>
                  <span className="font-bold text-emerald-800 font-bricolage">
                    ₹{formatINR(calculation.totalInterest)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-gray-200">
                  <span className="text-primary font-bold">Total Payment (Principal + Interest)</span>
                  <span className="font-bricolage font-extrabold text-primary text-base sm:text-lg">
                    ₹{formatINR(calculation.totalPayment)}
                  </span>
                </div>

                {/* Progress bar visual */}
                <div className="pt-2">
                  <div className="h-3 w-full bg-emerald-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${calculation.principalPercent}%` }}
                      className="bg-primary h-full transition-all duration-300"
                    />
                    <div
                      style={{ width: `${calculation.interestPercent}%` }}
                      className="bg-gold h-full transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1.5 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                      Principal: {calculation.principalPercent}%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
                      Interest: {calculation.interestPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-4">
              <button
                onClick={() =>
                  openApplyModal(
                    `Business Loan - ₹${formatINR(loanAmount)}`,
                    `${interestRate}% p.a. for ${tenureYears} Years`
                  )
                }
                className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Apply for this Loan Amount</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full py-2.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-gray-200 rounded-xl"
              >
                <span>{showAmortization ? "Hide Yearly Schedule" : "View Amortization Schedule"}</span>
                {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Amortization Table Accordion */}
        {showAmortization && (
          <div className="mt-6 bg-white rounded-3xl border border-gray-200 shadow-md p-5 sm:p-6 animate-fadeIn overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                  Yearly Loan Amortization Schedule
                </h4>
                <p className="text-xs text-gray-500">
                  Principal repaid vs interest paid per year over {tenureYears} years
                </p>
              </div>
              <div className="text-xs font-semibold text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/20">
                ₹{formatINR(loanAmount)} @ {interestRate}%
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Principal Repaid</th>
                    <th className="py-3 px-4">Interest Paid</th>
                    <th className="py-3 px-4">Total Annual Outflow</th>
                    <th className="py-3 px-4">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {calculation.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Year {row.year}</td>
                      <td className="py-3 px-4 font-semibold text-primary">₹{formatINR(row.principalPaid)}</td>
                      <td className="py-3 px-4 text-emerald-800">₹{formatINR(row.interestPaid)}</td>
                      <td className="py-3 px-4 font-bold text-gray-800">₹{formatINR(row.principalPaid + row.interestPaid)}</td>
                      <td className="py-3 px-4 font-semibold text-gray-500">₹{formatINR(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
