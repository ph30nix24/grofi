"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Home,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanCalculatorProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanCalculator({
  lender,
}: LoanAgainstPropertyLoanCalculatorProps) {
  const { openApplyModal } = useApplyModal();

  const minLenderRate = lender.interestRate?.min ?? 9.25;
  const maxLenderRate = lender.interestRate?.max ?? 11.5;
  const maxTenureYears = lender.tenureYears || 15;
  const maxSanctionCap = lender.maxAmountNum || 100000000;

  // Active Tab: "emi" | "ltv"
  const [activeTab, setActiveTab] = useState<"emi" | "ltv">("emi");

  // ── Tab 1: EMI Calculator State ──
  const [loanAmount, setLoanAmount] = useState<number>(10000000); // ₹1 Crore
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(minLenderRate);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // ── Tab 2: LTV & Property Valuation State ──
  const [propertyValue, setPropertyValue] = useState<number>(20000000); // ₹2 Crore
  const [propertyCategory, setPropertyCategory] = useState<
    "residential" | "commercial" | "industrial"
  >("residential");
  const [surplusDeposit, setSurplusDeposit] = useState<number>(1500000); // ₹15 Lakhs parked in OD

  // Amount Presets
  const amountPresets = [
    { label: "₹25L", value: 2500000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹2.5 Cr", value: 25000000 },
    { label: "₹5 Cr", value: 50000000 },
  ].filter((p) => p.value <= maxSanctionCap);

  // Property Value Presets
  const propertyPresets = [
    { label: "₹50L", value: 5000000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹2 Cr", value: 20000000 },
    { label: "₹5 Cr", value: 50000000 },
    { label: "₹10 Cr", value: 100000000 },
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

  // ── EMI Calculations ──
  const emiCalculation = useMemo(() => {
    const P = loanAmount;
    const n = tenureYears * 12;
    const r = interestRate / 12 / 100;

    const factor = Math.pow(1 + r, n);
    const emi = Math.round((P * r * factor) / (factor - 1));
    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - P);
    const interestPercentage = Math.round((totalInterest / totalPayment) * 100);

    // Amortization schedule per year
    let balance = P;
    const schedule: Array<{
      year: number;
      openingBalance: number;
      principalPaid: number;
      interestPaid: number;
      closingBalance: number;
    }> = [];

    for (let yr = 1; yr <= tenureYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      const opening = balance;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * r;
        const principalForMonth = emi - interestForMonth;
        yrInterest += interestForMonth;
        yrPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      schedule.push({
        year: yr,
        openingBalance: Math.round(opening),
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
        closingBalance: Math.round(balance),
      });
    }

    return {
      emi,
      totalPayment,
      totalInterest,
      interestPercentage,
      schedule,
    };
  }, [loanAmount, tenureYears, interestRate]);

  // ── LTV & Overdraft Feasibility Calculations ──
  const ltvCalculation = useMemo(() => {
    const baseLtv = lender.maxLtvPercent || 65;
    const effectiveLtvPercent =
      propertyCategory === "residential"
        ? baseLtv
        : propertyCategory === "commercial"
        ? Math.min(baseLtv - 10, 55)
        : 50;

    const eligibleSanction = Math.min(
      propertyValue * (effectiveLtvPercent / 100),
      maxSanctionCap
    );

    // Overdraft annual interest saving estimation
    const annualRate = interestRate / 100;
    const cappedDeposit = Math.min(surplusDeposit, eligibleSanction);
    const annualInterestSaved = Math.round(cappedDeposit * annualRate);
    const fiveYearSavings = annualInterestSaved * 5;

    return {
      effectiveLtvPercent,
      eligibleSanction,
      annualInterestSaved,
      fiveYearSavings,
    };
  }, [
    propertyValue,
    propertyCategory,
    lender.maxLtvPercent,
    maxSanctionCap,
    interestRate,
    surplusDeposit,
  ]);

  return (
    <section
      id="lap-calculator"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-gold" />
          <span>DUAL-MODE MORTGAGE CALCULATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Calculate Your <span className="text-primary">{lender.name}</span> EMI &amp; LTV Sanction
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Model monthly repayment schedules, loan-to-value limits, and interest savings with flexible overdraft facilities.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center border border-gray-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("emi")}
              className={`py-2 px-4 sm:px-6 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "emi"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-primary" />
              <span>EMI &amp; Amortization</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ltv")}
              className={`py-2 px-4 sm:px-6 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "ltv"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home className="w-3.5 h-3.5 text-primary" />
              <span>Property LTV &amp; Sanction</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === "emi" ? (
        /* ── Tab 1: Monthly EMI & Amortization Calculator ── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Mortgage Loan Amount</span>
                <span className="font-bricolage font-extrabold text-primary text-base sm:text-lg">
                  {formatAmountText(loanAmount)}
                </span>
              </div>

              {/* Presets */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {amountPresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setLoanAmount(p.value)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
                      loanAmount === p.value
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={1000000}
                max={maxSanctionCap}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Min ₹10 Lakhs</span>
                <span>Max Sanction: {formatAmountText(maxSanctionCap)}</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Loan Tenure</span>
                <span className="font-bricolage font-extrabold text-gray-900 text-base">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {[5, 10, 15, 20]
                  .filter((y) => y <= maxTenureYears)
                  .map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setTenureYears(y)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
                        tenureYears === y
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {y} Years
                    </button>
                  ))}
              </div>

              <input
                type="range"
                min={1}
                max={maxTenureYears}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1 Year</span>
                <span>Max {maxTenureYears} Years</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Annual Interest Rate</span>
                <span className="font-bricolage font-extrabold text-primary text-base">
                  {interestRate.toFixed(2)}% p.a.
                </span>
              </div>

              <input
                type="range"
                min={minLenderRate - 0.5}
                max={maxLenderRate + 2.5}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Lender Floor: {minLenderRate}%</span>
                <span>Ceiling: {maxLenderRate}%</span>
              </div>
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-linear-to-b from-white to-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-lg space-y-6">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Monthly Loan Repayment
              </div>
              <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-primary mt-1">
                ₹{formatINR(emiCalculation.emi)}
                <span className="text-sm font-semibold text-gray-500"> / month</span>
              </div>
            </div>

            {/* Principal & Interest Breakdown */}
            <div className="space-y-3 pt-3 border-t border-gray-200 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal Sanction:</span>
                <span className="font-bold text-gray-900">{formatAmountText(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest Payable:</span>
                <span className="font-bold text-gray-900">
                  {formatAmountText(emiCalculation.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-gray-200">
                <span className="font-bold text-gray-900">Total Amount Payable:</span>
                <span className="font-bricolage font-extrabold text-sm text-gray-900">
                  {formatAmountText(emiCalculation.totalPayment)}
                </span>
              </div>

              {/* Progress bar split */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden flex">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${100 - emiCalculation.interestPercentage}%` }}
                    title="Principal"
                  />
                  <div
                    className="bg-gold h-full"
                    style={{ width: `${emiCalculation.interestPercentage}%` }}
                    title="Interest"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                    Principal ({100 - emiCalculation.interestPercentage}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
                    Interest ({emiCalculation.interestPercentage}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Amortization Schedule */}
            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{showAmortization ? "Hide" : "View"} Yearly Amortization Schedule</span>
              {showAmortization ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for {formatAmountText(loanAmount)} with {lender.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Amortization Table Expandable */}
          {showAmortization && (
            <div className="lg:col-span-12 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm overflow-x-auto animate-fadeIn">
              <h4 className="font-bricolage font-bold text-lg text-gray-900 mb-3">
                Year-by-Year Amortization Schedule
              </h4>
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Year</th>
                    <th className="py-2.5 px-3">Opening Balance</th>
                    <th className="py-2.5 px-3">Principal Paid</th>
                    <th className="py-2.5 px-3">Interest Paid</th>
                    <th className="py-2.5 px-3">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {emiCalculation.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-3 font-bold text-gray-900">Year {row.year}</td>
                      <td className="py-2.5 px-3 text-gray-600">₹{formatINR(row.openingBalance)}</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-semibold">
                        ₹{formatINR(row.principalPaid)}
                      </td>
                      <td className="py-2.5 px-3 text-amber-700">₹{formatINR(row.interestPaid)}</td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">
                        ₹{formatINR(row.closingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* ── Tab 2: Property Valuation & Max LTV Loan Feasibility ── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            {/* Property Category */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Property Collateral Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "residential", label: "Residential", icon: Home, desc: "Flat/Villa" },
                  { id: "commercial", label: "Commercial", icon: Briefcase, desc: "Office/Shop" },
                  { id: "industrial", label: "Industrial", icon: Layers, desc: "Factory/Land" },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = propertyCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setPropertyCategory(
                          item.id as "residential" | "commercial" | "industrial"
                        )
                      }
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1 shrink-0" />
                      <div className="text-xs font-bold">{item.label}</div>
                      <div
                        className={`text-[10px] ${
                          isActive ? "text-white/80" : "text-gray-400"
                        }`}
                      >
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Valuation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Fair Market Value of Property</span>
                <span className="font-bricolage font-extrabold text-primary text-base sm:text-lg">
                  {formatAmountText(propertyValue)}
                </span>
              </div>

              {/* Presets */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {propertyPresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPropertyValue(p.value)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
                      propertyValue === p.value
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={2000000}
                max={200000000}
                step={500000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Min ₹20 Lakhs</span>
                <span>Max ₹20 Crore</span>
              </div>
            </div>

            {/* Overdraft Surplus Deposit Simulation */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-teal-600" />
                  Average Surplus Cash Deposited in OD Account
                </span>
                <span className="font-bricolage font-extrabold text-teal-700 text-base">
                  {formatAmountText(surplusDeposit)}
                </span>
              </div>

              <input
                type="range"
                min={100000}
                max={ltvCalculation.eligibleSanction || 5000000}
                step={100000}
                value={surplusDeposit}
                onChange={(e) => setSurplusDeposit(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-500 leading-normal">
                By parking emergency or business liquidity in your Property Overdraft account, interest is computed strictly on the net debit balance on a daily basis.
              </p>
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-linear-to-b from-white to-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-lg space-y-6">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Max Eligible Sanction ({ltvCalculation.effectiveLtvPercent}% LTV)
              </div>
              <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-emerald-700 mt-1">
                {formatAmountText(ltvCalculation.eligibleSanction)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Based on {lender.name}&apos;s verified mortgage underwriting norms.
              </p>
            </div>

            {/* Overdraft Interest Savings Callout */}
            <div className="bg-teal-50 border border-teal-200/90 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Overdraft Facility Advantage</span>
              </div>
              <div className="text-xs text-teal-800 space-y-1">
                <div className="flex justify-between">
                  <span>Annual Interest Saved:</span>
                  <strong className="font-bricolage font-extrabold text-teal-950">
                    ~₹{formatINR(ltvCalculation.annualInterestSaved)}/yr
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>5-Year Cumulative Savings:</span>
                  <strong className="font-bricolage font-extrabold text-teal-950">
                    ~₹{formatINR(ltvCalculation.fiveYearSavings)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Key Valuation Norms */}
            <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Property Collateral:</span>
                <span className="font-bold text-gray-900 capitalize">{propertyCategory}</span>
              </div>
              <div className="flex justify-between">
                <span>Permissible LTV:</span>
                <span className="font-bold text-primary">{ltvCalculation.effectiveLtvPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Prepayment Penalties:</span>
                <span className="font-bold text-emerald-700">0% Nil (Individual Floating)</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Equity with {lender.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
