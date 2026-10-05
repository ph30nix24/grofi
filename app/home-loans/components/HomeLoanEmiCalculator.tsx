"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Percent,
  Calendar,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function HomeLoanEmiCalculator() {
  const { openApplyModal } = useApplyModal();

  // Mode: "emi" for standard EMI calculator, "transfer" for Balance Transfer savings
  const [activeMode, setActiveMode] = useState<"emi" | "transfer">("emi");

  // Mode 1: Regular EMI state
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(7.25); // 7.25% p.a.
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Mode 2: Balance Transfer state
  const [transferBalance, setTransferBalance] = useState<number>(6000000); // ₹60 Lakhs
  const [currentRate, setCurrentRate] = useState<number>(9.25); // Existing 9.25%
  const [newRate, setNewRate] = useState<number>(7.25); // New 7.25%
  const [remainingYears, setRemainingYears] = useState<number>(18); // 18 years

  // Quick Chips
  const amountPresets = [
    { label: "₹30L", value: 3000000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹75L", value: 7500000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹1.5 Cr", value: 15000000 },
    { label: "₹2 Cr", value: 20000000 },
  ];

  const bankRatePresets = [
    { label: "Canara (7.15%)", rate: 7.15 },
    { label: "BoB (7.20%)", rate: 7.20 },
    { label: "SBI (7.25%)", rate: 7.25 },
    { label: "HDFC (7.30%)", rate: 7.30 },
    { label: "Axis (7.35%)", rate: 7.35 },
    { label: "ICICI (7.40%)", rate: 7.40 },
  ];

  const tenurePresets = [
    { label: "10 Yrs", years: 10 },
    { label: "15 Yrs", years: 15 },
    { label: "20 Yrs", years: 20 },
    { label: "25 Yrs", years: 25 },
    { label: "30 Yrs", years: 30 },
  ];

  // Helper formatting INR
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

  const getPercent = (value: number, min: number, max: number): number => {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  };

  // Monthly EMI Math calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emiCalculation = useMemo(() => {
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

    // Amortization schedule
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

  // Balance Transfer Math calculation
  const transferCalculation = useMemo(() => {
    const P = transferBalance;
    const n = remainingYears * 12;

    const rOld = currentRate / 12 / 100;
    const compOld = Math.pow(1 + rOld, n);
    const oldEmi = (P * rOld * compOld) / (compOld - 1);
    const oldTotalInterest = oldEmi * n - P;

    const rNew = newRate / 12 / 100;
    const compNew = Math.pow(1 + rNew, n);
    const newEmi = (P * rNew * compNew) / (compNew - 1);
    const newTotalInterest = newEmi * n - P;

    const monthlySavings = Math.max(0, Math.round(oldEmi - newEmi));
    const totalInterestSaved = Math.max(0, Math.round(oldTotalInterest - newTotalInterest));
    const estimatedTransferCost = Math.round(P * 0.0035 + 5000); // 0.35% fee + legal
    const netSavings = Math.max(0, totalInterestSaved - estimatedTransferCost);

    return {
      oldEmi: Math.round(oldEmi),
      newEmi: Math.round(newEmi),
      monthlySavings,
      totalInterestSaved,
      estimatedTransferCost,
      netSavings,
    };
  }, [transferBalance, currentRate, newRate, remainingYears]);

  // Slider Fill Percentages
  const amountPercent = getPercent(loanAmount, 1000000, 50000000);
  const ratePercent = getPercent(interestRate, 6.5, 12.0);
  const tenurePercent = getPercent(tenureYears, 5, 30);

  const transferBalancePercent = getPercent(transferBalance, 1000000, 30000000);
  const currentRatePercent = getPercent(currentRate, 7.5, 14.0);
  const newRatePercent = getPercent(newRate, 6.5, 9.0);
  const remainingYearsPercent = getPercent(remainingYears, 3, 30);

  return (
    <section id="emi-calculator-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            Financial Planning Tools
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Home Loan EMI & <span className="text-primary">Balance Transfer Calculator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Calculate your exact monthly outflow or discover how much money you can save by transferring your current home loan to India&apos;s lowest interest rates.
          </p>

          {/* Calculator Mode Switcher */}
          <div className="flex justify-center mt-6">
            <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveMode("emi")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeMode === "emi"
                    ? "bg-primary text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Home Loan EMI</span>
              </button>

              <button
                type="button"
                id="balance-transfer-calculator"
                onClick={() => setActiveMode("transfer")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeMode === "transfer"
                    ? "bg-primary text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <RefreshCw className="w-4 h-4 text-gold" />
                <span>Balance Transfer Savings</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: STANDARD EMI CALCULATOR (Seamless Unified 2-Column Card) */}
        {activeMode === "emi" ? (
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left 7 Columns: Interactive Sliders & Inputs */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between space-y-7">
                
                {/* Control 1: Home Loan Amount */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat flex items-center gap-1.5 uppercase tracking-wide">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span>Home Loan Amount</span>
                    </label>

                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                      <input
                        type="text"
                        value={formatINR(loanAmount)}
                        onChange={(e) => {
                          const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                          if (!isNaN(cleanVal)) {
                            setLoanAmount(Math.min(50000000, Math.max(1000000, cleanVal)));
                          }
                        }}
                        className="w-36 sm:w-44 pl-7 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1000000}
                    max={50000000}
                    step={500000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${amountPercent}%, #E2E8F0 ${amountPercent}%, #E2E8F0 100%)`,
                    }}
                    className="custom-range-slider"
                  />

                  <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium">
                    <span>Min: ₹10 Lakhs</span>
                    <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                      {formatAmountText(loanAmount)}
                    </span>
                    <span>Max: ₹5 Crores</span>
                  </div>

                  {/* Amount Quick Presets: flex-wrap to avoid any scrollbar */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {amountPresets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setLoanAmount(preset.value)}
                        className={`text-xs font-montserrat font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          loanAmount === preset.value
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 2: Interest Rate */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat flex items-center gap-1.5 uppercase tracking-wide">
                      <Percent className="w-4 h-4 text-gold" />
                      <span>Interest Rate (% p.a.)</span>
                    </label>

                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min={6.5}
                        max={14.0}
                        step={0.05}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 6.5)}
                        className="w-24 pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-amber-900 text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
                      />
                      <span className="absolute right-3 text-gray-400 font-bold text-sm">%</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={6.5}
                    max={12.0}
                    step={0.05}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${ratePercent}%, #E2E8F0 ${ratePercent}%, #E2E8F0 100%)`,
                    }}
                    className="custom-range-slider"
                  />

                  <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium">
                    <span>Min: 6.50% (Prime)</span>
                    <span className="text-amber-900 font-bold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      {interestRate.toFixed(2)}% p.a.
                    </span>
                    <span>Max: 12.00%</span>
                  </div>

                  {/* Bank Rate Quick Presets: flex-wrap to avoid any scrollbar */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {bankRatePresets.map((preset) => (
                      <button
                        key={preset.rate}
                        type="button"
                        onClick={() => setInterestRate(preset.rate)}
                        className={`text-xs font-montserrat font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          Math.abs(interestRate - preset.rate) < 0.01
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 3: Repayment Tenure */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat flex items-center gap-1.5 uppercase tracking-wide">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Repayment Tenure</span>
                    </label>

                    <div className="bg-[#EBF4ED] border border-primary/20 rounded-xl px-3.5 py-1.5 font-bricolage font-extrabold text-sm sm:text-base text-primary shadow-2xs">
                      {tenureYears} Years ({tenureYears * 12} mos)
                    </div>
                  </div>

                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${tenurePercent}%, #E2E8F0 ${tenurePercent}%, #E2E8F0 100%)`,
                    }}
                    className="custom-range-slider"
                  />

                  <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium">
                    <span>Min: 5 Years</span>
                    <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                      {tenureYears} Years ({tenureYears * 12} Months)
                    </span>
                    <span>Max: 30 Years</span>
                  </div>

                  {/* Tenure Quick Presets: flex-wrap to avoid any scrollbar */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tenurePresets.map((preset) => (
                      <button
                        key={preset.years}
                        type="button"
                        onClick={() => setTenureYears(preset.years)}
                        className={`text-xs font-montserrat font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          tenureYears === preset.years
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right 5 Columns: Result Breakdown & CTA (Stretches equally to match left side height) */}
              <div className="lg:col-span-5 bg-linear-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-700/80 pb-3 mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold font-montserrat">
                      Monthly Repayment Breakdown
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60">
                      EBLR Reducing
                    </span>
                  </div>

                  {/* Large Monthly EMI Figure */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bricolage text-2xl font-bold text-white">₹</span>
                      <span className="font-bricolage text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {formatINR(emiCalculation.monthlyEmi)}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-400 font-montserrat">/ month</span>
                    </div>
                    <p className="text-xs text-gray-400 font-montserrat mt-1">
                      Effective EMI: ₹{formatINR(Math.round(emiCalculation.monthlyEmi / (loanAmount / 100000)))} per ₹1 Lakh
                    </p>
                  </div>

                  {/* Visual Ratio Bar: Principal vs Interest */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-semibold font-montserrat mb-1.5">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                        Principal: {emiCalculation.principalPercent}%
                      </span>
                      <span className="text-amber-400 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        Interest: {emiCalculation.interestPercent}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${emiCalculation.principalPercent}%` }}
                        className="bg-emerald-500 transition-all duration-300"
                      />
                      <div
                        style={{ width: `${emiCalculation.interestPercent}%` }}
                        className="bg-amber-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Detailed Breakdown Summary Cards */}
                  <div className="space-y-2.5 mb-5 text-xs sm:text-sm font-montserrat">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/80 border border-gray-700/80">
                      <span className="text-gray-400">Principal Amount:</span>
                      <span className="font-bold text-white font-bricolage text-sm sm:text-base">₹{formatINR(loanAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/80 border border-gray-700/80">
                      <span className="text-gray-400">Total Interest Payable:</span>
                      <span className="font-bold text-amber-400 font-bricolage text-sm sm:text-base">₹{formatINR(emiCalculation.totalInterest)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/80 border border-gray-700/80">
                      <span className="text-gray-300 font-bold">Total Amount Payable:</span>
                      <span className="font-bold text-white font-bricolage text-base sm:text-lg">₹{formatINR(emiCalculation.totalPayment)}</span>
                    </div>
                  </div>

                  {/* Tax Benefit Quick Tip */}
                  <div className="p-3.5 rounded-2xl bg-gray-800/60 border border-gray-700 text-xs text-gray-300">
                    <span className="font-bold text-gold block mb-0.5">Tax Savings Advantage:</span>
                    Save up to ₹2 Lakhs on interest (Sec 24b) and up to ₹1.5 Lakhs on principal (Sec 80C) annually!
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={() => openApplyModal("Home Loan", `Loan Sanction - ₹${formatINR(loanAmount)}`)}
                    className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Apply at {interestRate}% p.a.</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="w-full text-xs text-gray-400 hover:text-white py-1.5 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showAmortization ? "Hide Yearly Schedule" : "View Amortization Schedule"}</span>
                    {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* MODE 2: BALANCE TRANSFER CALCULATOR (Seamless Unified 2-Column Card) */
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left 7 Columns */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between space-y-7">
                
                {/* Existing Loan Balance */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat flex items-center gap-1.5 uppercase tracking-wide">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span>Outstanding Principal</span>
                    </label>

                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                      <input
                        type="text"
                        value={formatINR(transferBalance)}
                        onChange={(e) => {
                          const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                          if (!isNaN(cleanVal)) {
                            setTransferBalance(Math.min(30000000, Math.max(1000000, cleanVal)));
                          }
                        }}
                        className="w-36 sm:w-44 pl-7 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1000000}
                    max={30000000}
                    step={500000}
                    value={transferBalance}
                    onChange={(e) => setTransferBalance(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${transferBalancePercent}%, #E2E8F0 ${transferBalancePercent}%, #E2E8F0 100%)`,
                    }}
                    className="custom-range-slider"
                  />

                  <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium">
                    <span>Min: ₹10 Lakhs</span>
                    <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                      {formatAmountText(transferBalance)}
                    </span>
                    <span>Max: ₹3 Crores</span>
                  </div>
                </div>

                {/* Rates Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/80 space-y-2">
                    <label className="text-xs font-bold text-gray-500 block uppercase tracking-wide">
                      Your Current Rate
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="font-bricolage font-extrabold text-lg text-red-600">
                        {currentRate.toFixed(2)}% p.a.
                      </span>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min={7.5}
                          max={14}
                          step={0.1}
                          value={currentRate}
                          onChange={(e) => setCurrentRate(Number(e.target.value) || 7.5)}
                          className="w-18 pl-2 pr-5 py-1 text-xs font-bold border border-gray-200 rounded-lg text-right"
                        />
                        <span className="absolute right-1.5 text-gray-400 font-bold text-xs">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={7.5}
                      max={14}
                      step={0.1}
                      value={currentRate}
                      onChange={(e) => setCurrentRate(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${currentRatePercent}%, #E2E8F0 ${currentRatePercent}%, #E2E8F0 100%)`,
                      }}
                      className="custom-range-slider"
                    />
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-2">
                    <label className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">
                      New Rate with Partner
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="font-bricolage font-extrabold text-lg text-emerald-700">
                        {newRate.toFixed(2)}% p.a.
                      </span>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min={6.5}
                          max={9.0}
                          step={0.05}
                          value={newRate}
                          onChange={(e) => setNewRate(Number(e.target.value) || 6.5)}
                          className="w-18 pl-2 pr-5 py-1 text-xs font-bold border border-emerald-200 rounded-lg text-right"
                        />
                        <span className="absolute right-1.5 text-gray-400 font-bold text-xs">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={6.5}
                      max={9.0}
                      step={0.05}
                      value={newRate}
                      onChange={(e) => setNewRate(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #02474D 0%, #02474D ${newRatePercent}%, #E2E8F0 ${newRatePercent}%, #E2E8F0 100%)`,
                      }}
                      className="custom-range-slider"
                    />
                  </div>
                </div>

                {/* Remaining Tenure */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat flex items-center gap-1.5 uppercase tracking-wide">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Remaining Tenure</span>
                    </label>

                    <div className="bg-[#EBF4ED] border border-primary/20 rounded-xl px-3.5 py-1.5 font-bricolage font-extrabold text-sm sm:text-base text-primary shadow-2xs">
                      {remainingYears} Years ({remainingYears * 12} mos)
                    </div>
                  </div>

                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={remainingYears}
                    onChange={(e) => setRemainingYears(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${remainingYearsPercent}%, #E2E8F0 ${remainingYearsPercent}%, #E2E8F0 100%)`,
                    }}
                    className="custom-range-slider"
                  />

                  <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium">
                    <span>Min: 3 Years</span>
                    <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                      {remainingYears} Years ({remainingYears * 12} Months)
                    </span>
                    <span>Max: 30 Years</span>
                  </div>
                </div>

              </div>

              {/* Right 5 Columns: Savings Breakdown */}
              <div className="lg:col-span-5 bg-linear-to-b from-[#023338] to-[#012226] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Total Lifetime Savings
                  </span>
                  <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                    ₹{formatINR(transferCalculation.netSavings)}
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    Net interest saved over {remainingYears} years after processing costs!
                  </p>

                  {/* Monthly EMI Comparison */}
                  <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Current Monthly EMI:</span>
                      <span className="font-bold text-gray-200 line-through">
                        ₹{formatINR(transferCalculation.oldEmi)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-semibold">New Monthly EMI:</span>
                      <span className="font-bricolage font-bold text-base text-emerald-400">
                        ₹{formatINR(transferCalculation.newEmi)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-gold font-bold">Monthly Savings:</span>
                      <span className="font-bricolage font-extrabold text-sm text-gold">
                        Save ₹{formatINR(transferCalculation.monthlySavings)} / mo
                      </span>
                    </div>
                  </div>

                  {/* Transfer Breakdown */}
                  <div className="space-y-2 mt-5 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Total Interest Saved:</span>
                      <span className="font-semibold text-emerald-400">
                        ₹{formatINR(transferCalculation.totalInterestSaved)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Transfer & Legal Fees:</span>
                      <span className="text-gray-400">₹{formatINR(transferCalculation.estimatedTransferCost)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => openApplyModal("Home Loan Balance Transfer", `Save ₹${formatINR(transferCalculation.netSavings)} - New Rate ${newRate}%`)}
                    className="w-full bg-gold hover:bg-[#a3801f] text-gray-900 font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Sparkles className="w-4 h-4 text-gray-900" />
                    <span>Transfer Loan & Save Lakhs</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Amortization Table Modal/Collapsible */}
        {activeMode === "emi" && showAmortization && (
          <div className="mt-8 bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-xs animate-fadeIn">
            <h4 className="font-bricolage font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary" />
              <span>Year-by-Year Amortization Schedule</span>
            </h4>
            <div className="overflow-x-auto max-h-96 [scrollbar-width:thin]">
              <table className="w-full text-left text-xs font-montserrat">
                <thead className="bg-gray-100 text-gray-600 uppercase font-bold sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Year</th>
                    <th className="py-2.5 px-3">Principal Paid (₹)</th>
                    <th className="py-2.5 px-3">Interest Paid (₹)</th>
                    <th className="py-2.5 px-3">Outstanding Balance (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {emiCalculation.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50/80">
                      <td className="py-2 px-3 font-semibold text-gray-900">Year {row.year}</td>
                      <td className="py-2 px-3 text-emerald-700 font-medium">₹{formatINR(row.principalPaid)}</td>
                      <td className="py-2 px-3 text-amber-700 font-medium">₹{formatINR(row.interestPaid)}</td>
                      <td className="py-2 px-3 text-gray-800 font-bold">₹{formatINR(row.balance)}</td>
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
