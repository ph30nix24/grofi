"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Percent,
  Calendar,
  Home,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function LoanAgainstPropertyCalculator() {
  const { openApplyModal } = useApplyModal();

  // Active Mode: "emi" for standard EMI calculator, "ltv" for Property Valuation & Max Loan Eligibility
  const [activeMode, setActiveMode] = useState<"emi" | "ltv">("emi");

  // Mode 1: EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(9.25); // 9.25% p.a.
  const [tenureYears, setTenureYears] = useState<number>(15); // 15 years
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Mode 2: Property Valuation & LTV State
  const [propertyMarketValue, setPropertyMarketValue] = useState<number>(15000000); // ₹1.5 Cr
  const [propertyCategory, setPropertyCategory] = useState<
    "residential_self" | "commercial_office" | "rented_property" | "industrial_shed"
  >("residential_self");
  const [monthlyIncome, setMonthlyIncome] = useState<number>(150000); // ₹1.5L / mo
  const [existingEmis, setExistingEmis] = useState<number>(20000); // ₹20k / mo

  // Preset Chips
  const loanAmountPresets = [
    { label: "₹25L", value: 2500000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹2 Cr", value: 20000000 },
    { label: "₹5 Cr", value: 50000000 },
    { label: "₹10 Cr", value: 100000000 },
  ];

  const bankRatePresets = [
    { label: "SBI (9.25%)", rate: 9.25 },
    { label: "HDFC (9.30%)", rate: 9.30 },
    { label: "Axis (9.35%)", rate: 9.35 },
    { label: "ICICI (9.45%)", rate: 9.45 },
    { label: "Kotak (9.50%)", rate: 9.50 },
    { label: "Bajaj (9.75%)", rate: 9.75 },
  ];

  const tenurePresets = [
    { label: "5 Yrs", years: 5 },
    { label: "10 Yrs", years: 10 },
    { label: "15 Yrs", years: 15 },
    { label: "20 Yrs", years: 20 },
  ];

  const propertyValuePresets = [
    { label: "₹50L", value: 5000000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹2 Cr", value: 20000000 },
    { label: "₹5 Cr", value: 50000000 },
    { label: "₹10 Cr", value: 100000000 },
  ];

  // Helper formatting INR
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const formatShortINR = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
    }
    return `₹${formatINR(val)}`;
  };

  // EMI Math Calculation
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

    const principalPercent = Math.max(0, Math.min(100, Math.round((P / totalPayment) * 100)));
    const interestPercent = 100 - principalPercent;

    // Generate yearly amortization
    let balance = P;
    const breakdown = [];
    for (let yr = 1; yr <= tenureYears; yr++) {
      let interestYear = 0;
      let principalYear = 0;
      for (let m = 1; m <= 12; m++) {
        const interestMonth = balance * r;
        const principalMonth = emi - interestMonth;
        interestYear += interestMonth;
        principalYear += principalMonth;
        balance = Math.max(0, balance - principalMonth);
      }
      breakdown.push({
        year: yr,
        emiPaid: Math.round(emi * 12),
        principalPaid: Math.round(principalYear),
        interestPaid: Math.round(interestYear),
        endingBalance: Math.round(balance),
      });
    }

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent,
      interestPercent,
      yearlyBreakdown: breakdown,
    };
  }, [loanAmount, interestRate, tenureYears]);

  // LTV & Income Eligibility Math
  const ltvCalculation = useMemo(() => {
    // Determine permissible LTV based on property category
    let maxLtvPercent = 75;
    let categoryLabel = "Residential Self-Occupied";

    if (propertyCategory === "residential_self") {
      maxLtvPercent = 75;
      categoryLabel = "Residential Self-Occupied (75% LTV)";
    } else if (propertyCategory === "commercial_office") {
      maxLtvPercent = 65;
      categoryLabel = "Commercial Office / Shop (65% LTV)";
    } else if (propertyCategory === "rented_property") {
      maxLtvPercent = 60;
      categoryLabel = "Rented Residential / Commercial (60% LTV)";
    } else if (propertyCategory === "industrial_shed") {
      maxLtvPercent = 50;
      categoryLabel = "Industrial Shed / Approved Unit (50% LTV)";
    }

    // 1. Max loan supported by Property Value
    const propertyMaxLoan = Math.round(propertyMarketValue * (maxLtvPercent / 100));

    // 2. Max EMI affordable based on FOIR (60% max debt service of income)
    const maxPermittedEmiOutflow = monthlyIncome * 0.60;
    const availableEmiCapacity = Math.max(5000, maxPermittedEmiOutflow - existingEmis);

    // Convert available EMI capacity to loan amount (at 9.5% p.a. for 15 years)
    const r = 0.095 / 12;
    const n = 15 * 12;
    const compound = Math.pow(1 + r, n);
    // Loan = EMI * (compound - 1) / (r * compound)
    const incomeMaxLoan = Math.round(
      (availableEmiCapacity * (compound - 1)) / (r * compound)
    );

    // Final sanctionable amount is min of propertyMaxLoan and incomeMaxLoan
    const recommendedLoan = Math.min(propertyMaxLoan, incomeMaxLoan);
    const equityBuffer = propertyMarketValue - recommendedLoan;
    const isIncomeBottleneck = incomeMaxLoan < propertyMaxLoan;

    return {
      maxLtvPercent,
      categoryLabel,
      propertyMaxLoan,
      incomeMaxLoan,
      availableEmiCapacity: Math.round(availableEmiCapacity),
      recommendedLoan,
      equityBuffer,
      isIncomeBottleneck,
    };
  }, [propertyMarketValue, propertyCategory, monthlyIncome, existingEmis]);

  // Track percentage fills for modern range slider styling
  const amountPercent = Math.min(
    100,
    Math.max(0, ((loanAmount - 1000000) / (150000000 - 1000000)) * 100)
  );
  const ratePercent = Math.min(
    100,
    Math.max(0, ((interestRate - 8.5) / (15.0 - 8.5)) * 100)
  );
  const tenurePercent = Math.min(
    100,
    Math.max(0, ((tenureYears - 1) / (20 - 1)) * 100)
  );
  const propertyPercent = Math.min(
    100,
    Math.max(0, ((propertyMarketValue - 2500000) / (250000000 - 2500000)) * 100)
  );
  const incomePercent = Math.min(
    100,
    Math.max(0, ((monthlyIncome - 30000) / (2500000 - 30000)) * 100)
  );
  const emisPercent = Math.min(
    100,
    Math.max(0, ((existingEmis - 0) / (500000 - 0)) * 100)
  );

  return (
    <section id="lap-calculator-section" className="py-12 sm:py-16 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            Interactive Mortgage Tools
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Loan Against Property <span className="text-primary">EMI & LTV Calculator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Calculate your monthly repayment obligation and check how much capital you can unlock based on your property valuation and monthly cash flow.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-6 inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200">
            <button
              type="button"
              onClick={() => setActiveMode("emi")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMode === "emi"
                  ? "bg-white text-primary shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>1. LAP EMI & Total Cost</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("ltv")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMode === "ltv"
                  ? "bg-white text-primary shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>2. Property Valuation & Max LTV</span>
            </button>
          </div>
        </div>

        {/* MODE 1: EMI & TOTAL COST CALCULATOR */}
        {activeMode === "emi" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: Sliders & Controls (7 cols) */}
            <div className="lg:col-span-7 bg-[#FDFBF7] rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-xs space-y-6">
              {/* Control 1: Loan Amount */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-primary" />
                    Loan Amount
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                    <input
                      type="text"
                      value={formatINR(loanAmount)}
                      onChange={(e) => {
                        const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                        if (!isNaN(cleanVal)) {
                          setLoanAmount(Math.min(150000000, Math.max(0, cleanVal)));
                        }
                      }}
                      className="w-36 sm:w-44 pl-7 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={150000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${amountPercent}%, #E2E8F0 ${amountPercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Min: ₹10 Lakhs</span>
                  <span className="text-primary font-bold bg-[#EBF4ED] px-2.5 py-0.5 rounded-md border border-primary/10">
                    {formatShortINR(loanAmount)}
                  </span>
                  <span>Max: ₹15 Crores</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {loanAmountPresets.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setLoanAmount(p.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl border transition-colors cursor-pointer ${
                        loanAmount === p.value
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Interest Rate */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-gold" />
                    Interest Rate (% p.a.)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min={7.5}
                      max={18.0}
                      step={0.05}
                      value={interestRate}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          setInterestRate(Math.min(20, Math.max(1, val)));
                        }
                      }}
                      className="w-24 pl-3 pr-7 py-1.5 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-amber-900 text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
                    />
                    <span className="absolute right-3 text-gray-400 font-bold text-sm">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={8.5}
                  max={15.0}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${ratePercent}%, #E2E8F0 ${ratePercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Min: 8.50%</span>
                  <span className="text-amber-900 font-bold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {interestRate.toFixed(2)}% p.a.
                  </span>
                  <span>Max: 15.00%</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {bankRatePresets.map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => setInterestRate(b.rate)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition-colors cursor-pointer ${
                        Math.abs(interestRate - b.rate) < 0.01
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Tenure */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Loan Tenure
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min={1}
                        max={25}
                        step={1}
                        value={tenureYears}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            setTenureYears(Math.min(30, Math.max(1, val)));
                          }
                        }}
                        className="w-20 pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-gray-900 text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                      />
                      <span className="absolute right-2 text-gray-400 font-bold text-xs">Yrs</span>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                      {tenureYears * 12} mos
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${tenurePercent}%, #E2E8F0 ${tenurePercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Min: 1 Year</span>
                  <span className="text-gray-900 font-bold bg-emerald-50 text-emerald-900 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {tenureYears} Years ({tenureYears * 12} Mos)
                  </span>
                  <span>Max: 20 Years</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {tenurePresets.map((t) => (
                    <button
                      key={t.years}
                      type="button"
                      onClick={() => setTenureYears(t.years)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl border transition-colors cursor-pointer ${
                        tenureYears === t.years
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Output Summary & Split (5 cols) */}
            <div className="lg:col-span-5 bg-linear-to-b from-primary via-[#023b40] to-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                  Monthly Repayment
                </div>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white mb-6">
                  ₹{formatINR(emiCalculation.monthlyEmi)}
                  <span className="text-sm font-normal text-gray-300"> / month</span>
                </div>

                {/* Progress Bar of Principal vs Interest */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                    <span className="text-emerald-300">Principal: {emiCalculation.principalPercent}%</span>
                    <span className="text-amber-300">Interest: {emiCalculation.interestPercent}%</span>
                  </div>
                  <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${emiCalculation.principalPercent}%` }}
                      className="bg-emerald-400 h-full"
                    />
                    <div
                      style={{ width: `${emiCalculation.interestPercent}%` }}
                      className="bg-amber-400 h-full"
                    />
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-3 bg-white/10 rounded-2xl p-4 text-xs">
                  <div className="flex justify-between items-center text-gray-200">
                    <span>Principal Amount:</span>
                    <strong className="font-bricolage text-sm text-white font-bold">
                      {formatShortINR(loanAmount)}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-200">
                    <span>Total Interest Payable:</span>
                    <strong className="font-bricolage text-sm text-amber-300 font-bold">
                      {formatShortINR(emiCalculation.totalInterest)}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-200 pt-2 border-t border-white/15">
                    <span>Total Payment (Principal + Int):</span>
                    <strong className="font-bricolage text-base text-white font-extrabold">
                      {formatShortINR(emiCalculation.totalPayment)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => openApplyModal("Loan Against Property", "Best Interest Rates")}
                  className="w-full bg-gold hover:bg-[#c9a52f] text-gray-950 font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for ₹{formatINR(loanAmount)} LAP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full text-center text-xs text-gray-300 hover:text-white flex items-center justify-center gap-1 font-medium cursor-pointer"
                >
                  <span>{showAmortization ? "Hide Yearly Breakdown" : "View Amortization Schedule"}</span>
                  {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Collapsible Amortization Table */}
            {showAmortization && (
              <div className="lg:col-span-12 bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 mt-4 shadow-sm overflow-x-auto animate-fadeIn">
                <h4 className="font-bricolage font-bold text-base text-gray-900 mb-3">
                  Year-by-Year Loan Amortization Schedule
                </h4>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Annual EMI</th>
                      <th className="py-2.5 px-3">Principal Repaid</th>
                      <th className="py-2.5 px-3">Interest Paid</th>
                      <th className="py-2.5 px-3">Outstanding Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {emiCalculation.yearlyBreakdown.map((row) => (
                      <tr key={row.year} className="hover:bg-gray-50/60">
                        <td className="py-2.5 px-3 font-bold text-gray-900">Year {row.year}</td>
                        <td className="py-2.5 px-3">₹{formatINR(row.emiPaid)}</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-semibold">₹{formatINR(row.principalPaid)}</td>
                        <td className="py-2.5 px-3 text-amber-700">₹{formatINR(row.interestPaid)}</td>
                        <td className="py-2.5 px-3 font-bold text-gray-900">₹{formatINR(row.endingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: PROPERTY VALUATION & MAX LTV CALCULATOR */}
        {activeMode === "ltv" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: Property Specs & Income (7 cols) */}
            <div className="lg:col-span-7 bg-[#FDFBF7] rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-xs space-y-6">
              {/* Property Category Selection */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Select Collateral Property Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(
                    [
                      { id: "residential_self", label: "Residential Self-Occupied", ltv: "Up to 75% LTV" },
                      { id: "commercial_office", label: "Commercial Office / Shop", ltv: "Up to 65% LTV" },
                      { id: "rented_property", label: "Rented Property", ltv: "Up to 60% LTV" },
                      { id: "industrial_shed", label: "Industrial Shed / Unit", ltv: "Up to 50% LTV" },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPropertyCategory(cat.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        propertyCategory === cat.id
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-bold text-xs">{cat.label}</div>
                      <div className={`text-[10px] mt-0.5 ${propertyCategory === cat.id ? "text-gold" : "text-gray-500"}`}>
                        {cat.ltv}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 1: Property Market Value */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-primary" />
                    Property Fair Market Valuation
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                    <input
                      type="text"
                      value={formatINR(propertyMarketValue)}
                      onChange={(e) => {
                        const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                        if (!isNaN(cleanVal)) {
                          setPropertyMarketValue(Math.min(250000000, Math.max(0, cleanVal)));
                        }
                      }}
                      className="w-36 sm:w-44 pl-7 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={2500000}
                  max={250000000}
                  step={500000}
                  value={propertyMarketValue}
                  onChange={(e) => setPropertyMarketValue(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${propertyPercent}%, #E2E8F0 ${propertyPercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Min: ₹25 Lakhs</span>
                  <span className="text-primary font-bold bg-[#EBF4ED] px-2.5 py-0.5 rounded-md border border-primary/10">
                    {formatShortINR(propertyMarketValue)}
                  </span>
                  <span>Max: ₹25 Crores</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {propertyValuePresets.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPropertyMarketValue(p.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl border transition-colors cursor-pointer ${
                        propertyMarketValue === p.value
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Monthly Income */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    Net Monthly Income / Profit
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                    <input
                      type="text"
                      value={formatINR(monthlyIncome)}
                      onChange={(e) => {
                        const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                        if (!isNaN(cleanVal)) {
                          setMonthlyIncome(Math.min(10000000, Math.max(0, cleanVal)));
                        }
                      }}
                      className="w-32 sm:w-40 pl-7 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-bold text-gray-900 text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={2500000}
                  step={10000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${incomePercent}%, #E2E8F0 ${incomePercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Min: ₹30k / mo</span>
                  <span className="text-gray-900 font-bold bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                    ₹{formatINR(monthlyIncome)} / mo
                  </span>
                  <span>Max: ₹25L / mo</span>
                </div>
              </div>

              {/* Control 3: Existing EMIs */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-amber-600" />
                    Existing Monthly Loan EMIs
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                    <input
                      type="text"
                      value={formatINR(existingEmis)}
                      onChange={(e) => {
                        const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                        if (!isNaN(cleanVal)) {
                          setExistingEmis(Math.min(5000000, Math.max(0, cleanVal)));
                        }
                      }}
                      className="w-32 sm:w-40 pl-7 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-bold text-gray-900 text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={5000}
                  value={existingEmis}
                  onChange={(e) => setExistingEmis(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${emisPercent}%, #E2E8F0 ${emisPercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Min: ₹0</span>
                  <span className="text-gray-900 font-bold bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                    ₹{formatINR(existingEmis)} / mo
                  </span>
                  <span>Max: ₹5L / mo</span>
                </div>
              </div>
            </div>

            {/* Right Column: LTV Capacity & Feasibility Verdict (5 cols) */}
            <div className="lg:col-span-5 bg-linear-to-b from-[#023b40] to-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                  Sanctionable Loan Feasibility
                </div>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white mb-2">
                  {formatShortINR(ltvCalculation.recommendedLoan)}
                </div>
                <p className="text-xs text-gray-300 mb-6">
                  Based on {ltvCalculation.maxLtvPercent}% LTV benchmark & 60% FOIR capacity
                </p>

                {/* 2-Column Comparison Pill */}
                <div className="space-y-3 bg-white/10 rounded-2xl p-4 text-xs mb-5">
                  <div className="flex justify-between items-center text-gray-200">
                    <span>1. Max Loan via Property LTV:</span>
                    <strong className="font-bricolage text-sm text-emerald-300 font-bold">
                      {formatShortINR(ltvCalculation.propertyMaxLoan)}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-200">
                    <span>2. Max Loan via Income (FOIR):</span>
                    <strong className="font-bricolage text-sm text-amber-300 font-bold">
                      {formatShortINR(ltvCalculation.incomeMaxLoan)}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-200 pt-2 border-t border-white/15">
                    <span>Unpledged Equity Buffer:</span>
                    <strong className="font-bricolage text-sm text-white font-bold">
                      {formatShortINR(ltvCalculation.equityBuffer)}
                    </strong>
                  </div>
                </div>

                {/* Key Insights Note */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-gray-200 flex items-start gap-2">
                  {ltvCalculation.isIncomeBottleneck ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span>
                        <strong>Pro Tip:</strong> Adding an earning co-applicant or declaring business turnover can increase your repayment capacity up to {formatShortINR(ltvCalculation.propertyMaxLoan)}.
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                      <span>
                        Strong financial profile! Your income effortlessly supports the maximum permissible property loan limit.
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => openApplyModal("Loan Against Property", "LTV Valuation Inquiry")}
                  className="w-full bg-gold hover:bg-[#c9a52f] text-gray-950 font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for {formatShortINR(ltvCalculation.recommendedLoan)} LAP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
