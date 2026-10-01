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
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function PersonalLoanEmiCalculator() {
  const { openApplyModal } = useApplyModal();

  // Calculator inputs
  const [loanAmount, setLoanAmount] = useState<number>(500000); // ₹5 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(10.49); // 10.49% default
  const [tenureYears, setTenureYears] = useState<number>(3); // 3 years default
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Quick chips for amounts
  const amountPresets = [
    { label: "₹1L", value: 100000 },
    { label: "₹3L", value: 300000 },
    { label: "₹5L", value: 500000 },
    { label: "₹10L", value: 1000000 },
    { label: "₹25L", value: 2500000 },
    { label: "₹40L", value: 4000000 },
  ];

  // Quick chips for bank rates
  const bankRatePresets = [
    { label: "HDFC (9.99%)", rate: 9.99 },
    { label: "SBI (10.00%)", rate: 10.0 },
    { label: "BoB (10.15%)", rate: 10.15 },
    { label: "Kotak (10.99%)", rate: 10.99 },
    { label: "Bajaj (11.00%)", rate: 11.0 },
  ];

  // Quick chips for tenure
  const tenurePresets = [
    { label: "1 Year", years: 1 },
    { label: "2 Years", years: 2 },
    { label: "3 Years", years: 3 },
    { label: "4 Years", years: 4 },
    { label: "5 Years", years: 5 },
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
    <section id="emi-calculator-section" className="py-12 sm:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            Precise Financial Planning
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Personal Loan <span className="text-primary">EMI Calculator</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-montserrat">
            Calculate your monthly repayment obligation, total interest burden, and find the most suitable tenure before applying.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left 7 Columns: Interactive Sliders & Inputs */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 space-y-8">
              
              {/* Slider 1: Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 font-montserrat flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    Loan Amount
                  </label>
                  <div className="bg-[#EBF4ED] border border-primary/20 rounded-xl px-3.5 py-1.5 font-bricolage font-extrabold text-base sm:text-xl text-primary flex items-center">
                    <span>₹</span>
                    <span>{formatINR(loanAmount)}</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={50000}
                  max={5000000}
                  step={25000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[11px] font-semibold text-gray-400 font-montserrat mt-1">
                  <span>₹50,000</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                </div>

                {/* Amount Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {amountPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setLoanAmount(preset.value)}
                      className={`text-xs font-montserrat font-semibold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                        loanAmount === preset.value
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 font-montserrat flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-gold" />
                    Interest Rate (% p.a.)
                  </label>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-1.5 font-bricolage font-extrabold text-base sm:text-xl text-amber-900">
                    {interestRate.toFixed(2)}%
                  </div>
                </div>

                <input
                  type="range"
                  min={9.99}
                  max={26.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B69226]"
                />

                <div className="flex justify-between text-[11px] font-semibold text-gray-400 font-montserrat mt-1">
                  <span>9.99% (Best PSU/Pvt)</span>
                  <span>18.00%</span>
                  <span>26.00%</span>
                </div>

                {/* Bank Rate Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {bankRatePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setInterestRate(preset.rate)}
                      className={`text-xs font-montserrat font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        Math.abs(interestRate - preset.rate) < 0.05
                          ? "bg-[#B69226] text-white border-[#B69226] shadow-xs"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 font-montserrat flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Loan Tenure
                  </label>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-1.5 font-bricolage font-extrabold text-base sm:text-xl text-emerald-900">
                    {tenureYears} {tenureYears === 1 ? "Year" : "Years"} ({tenureYears * 12} Mos)
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />

                <div className="flex justify-between text-[11px] font-semibold text-gray-400 font-montserrat mt-1">
                  <span>1 Year</span>
                  <span>4 Years</span>
                  <span>7 Years</span>
                </div>

                {/* Tenure Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {tenurePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setTenureYears(preset.years)}
                      className={`text-xs font-montserrat font-semibold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                        tenureYears === preset.years
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Visual Calculation Result & CTA */}
            <div className="lg:col-span-5 bg-linear-to-b from-gray-50 to-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                
                {/* Result Pill */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-montserrat">
                    Calculated Monthly EMI
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <TrendingDown className="w-3 h-3" />
                    Monthly Reducing
                  </span>
                </div>

                {/* Large Monthly EMI Figure */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bricolage text-2xl font-bold text-primary">₹</span>
                    <span className="font-bricolage text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
                      {formatINR(calculation.monthlyEmi)}
                    </span>
                    <span className="text-sm font-semibold text-gray-500 font-montserrat">/ month</span>
                  </div>
                  <p className="text-xs text-gray-500 font-montserrat mt-1.5">
                    For a ₹{formatINR(loanAmount)} loan over {tenureYears} years @ {interestRate.toFixed(2)}% p.a.
                  </p>
                </div>

                {/* Visual Ratio Bar: Principal vs Interest */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold font-montserrat mb-1.5">
                    <span className="text-gray-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                      Principal: {calculation.principalPercent}%
                    </span>
                    <span className="text-gray-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
                      Interest: {calculation.interestPercent}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${calculation.principalPercent}%` }}
                      className="bg-primary transition-all duration-300"
                    />
                    <div
                      style={{ width: `${calculation.interestPercent}%` }}
                      className="bg-[#B69226] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Detailed Breakdown Summary Cards */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/80 text-xs sm:text-sm font-montserrat">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-bold text-gray-900 font-bricolage text-base">₹{formatINR(loanAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/80 text-xs sm:text-sm font-montserrat">
                    <span className="text-gray-600">Total Interest Payable:</span>
                    <span className="font-bold text-amber-800 font-bricolage text-base">₹{formatINR(calculation.totalInterest)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#EBF4ED] border border-primary/20 text-xs sm:text-sm font-montserrat font-bold">
                    <span className="text-primary">Total Amount Payable:</span>
                    <span className="text-primary font-bricolage text-lg">₹{formatINR(calculation.totalPayment)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() =>
                    openApplyModal(
                      "Personal Loan",
                      `Applying for loan amount: ₹${formatINR(loanAmount)} at ₹${formatINR(calculation.monthlyEmi)}/mo`
                    )
                  }
                  className="w-full bg-primary hover:bg-[#035259] text-white font-montserrat font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Apply with this EMI</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Amortization schedule toggle */}
                <button
                  type="button"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full text-center text-xs font-semibold text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1 cursor-pointer py-1 font-montserrat"
                >
                  <span>{showAmortization ? "Hide Yearly Breakdown" : "View Yearly Repayment Schedule"}</span>
                  {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Collapsible Yearly Amortization Schedule */}
          {showAmortization && (
            <div className="border-t border-gray-200 bg-gray-50 p-6 sm:p-8 animate-fadeIn">
              <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Year-by-Year Amortization Schedule
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-montserrat">
                  <thead>
                    <tr className="border-b border-gray-300 text-gray-500 font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Principal Paid</th>
                      <th className="py-2.5 px-3">Interest Paid</th>
                      <th className="py-2.5 px-3">Total Paid in Year</th>
                      <th className="py-2.5 px-3">Outstanding Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700">
                    {calculation.yearlyBreakdown.map((row) => (
                      <tr key={row.year} className="hover:bg-white transition-colors">
                        <td className="py-2.5 px-3 font-bold text-gray-900">Year {row.year}</td>
                        <td className="py-2.5 px-3 font-semibold text-primary">₹{formatINR(row.principalPaid)}</td>
                        <td className="py-2.5 px-3 font-semibold text-amber-800">₹{formatINR(row.interestPaid)}</td>
                        <td className="py-2.5 px-3 font-bold text-gray-900">
                          ₹{formatINR(row.principalPaid + row.interestPaid)}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-gray-500">₹{formatINR(row.balance)}</td>
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
