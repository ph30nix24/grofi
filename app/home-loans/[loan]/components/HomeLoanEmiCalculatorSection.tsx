"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface HomeLoanEmiCalculatorSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanEmiCalculatorSection({ lender }: HomeLoanEmiCalculatorSectionProps) {
  const { openApplyModal } = useApplyModal();

  const [activeTab, setActiveTab] = useState<"standard" | "transfer">("standard");

  const minRate = lender.interestRate?.min ?? 7.15;
  const maxRate = lender.interestRate?.max ?? 9.50;
  const maxSanction = lender.maxAmountNum || 100000000;
  const maxTenureYears = Math.min(30, lender.tenureYears || 30);

  // ── Mode 1: Standard EMI Calculator States ──
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(minRate);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Quick Amount Presets
  const standardPresets = useMemo(() => {
    const list = [3000000, 5000000, 7500000, 10000000, 15000000];
    return list.filter((amt) => amt <= maxSanction);
  }, [maxSanction]);

  // Standard Reducing Balance Calculation
  const standardResults = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

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

    // 20Y vs 30Y comparison on same principal & rate
    const n20 = 20 * 12;
    const n30 = 30 * 12;
    const emi20 = r === 0 ? p / n20 : (p * r * Math.pow(1 + r, n20)) / (Math.pow(1 + r, n20) - 1);
    const emi30 = r === 0 ? p / n30 : (p * r * Math.pow(1 + r, n30)) / (Math.pow(1 + r, n30) - 1);
    const int20 = emi20 * n20 - p;
    const int30 = emi30 * n30 - p;
    const interestDiff30vs20 = int30 - int20;

    // First 6 months amortization
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
      emi20: Math.round(emi20),
      emi30: Math.round(emi30),
      interestDiff30vs20: Math.round(interestDiff30vs20),
      schedulePreview: preview,
    };
  }, [loanAmount, interestRate, tenureYears]);

  // ── Mode 2: Balance Transfer & Overdraft Savings States ──
  const [existingPrincipal, setExistingPrincipal] = useState<number>(5000000);
  const [existingRate, setExistingRate] = useState<number>(8.75);
  const [newRate, setNewRate] = useState<number>(minRate);
  const [remainingTenure, setRemainingTenure] = useState<number>(18);
  const [overdraftSurplus, setOverdraftSurplus] = useState<number>(300000);

  const transferSavings = useMemo(() => {
    const p = existingPrincipal;
    const n = remainingTenure * 12;

    const rOld = existingRate / 12 / 100;
    const emiOld = rOld === 0 ? p / n : (p * rOld * Math.pow(1 + rOld, n)) / (Math.pow(1 + rOld, n) - 1);
    const totalOld = emiOld * n;

    const rNew = newRate / 12 / 100;
    const emiNew = rNew === 0 ? p / n : (p * rNew * Math.pow(1 + rNew, n)) / (Math.pow(1 + rNew, n) - 1);
    const totalNew = emiNew * n;

    const interestSaved = Math.max(0, totalOld - totalNew);
    const monthlySaved = Math.max(0, emiOld - emiNew);

    // Overdraft savings estimation
    const effectiveP = Math.max(100000, p - overdraftSurplus);
    const emiOd = rNew === 0 ? effectiveP / n : (effectiveP * rNew * Math.pow(1 + rNew, n)) / (Math.pow(1 + rNew, n) - 1);
    const totalOd = emiOd * n;
    const odInterestSaved = Math.max(0, totalNew - totalOd);

    return {
      oldEmi: Math.round(emiOld),
      newEmi: Math.round(emiNew),
      monthlySaved: Math.round(monthlySaved),
      totalInterestSaved: Math.round(interestSaved),
      odInterestSaved: Math.round(odInterestSaved),
    };
  }, [existingPrincipal, existingRate, newRate, remainingTenure, overdraftSurplus]);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatLakhs = (val: number): string => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)} Lakh`;
    return `₹${formatINR(val)}`;
  };

  return (
    <section id="emi-calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-gold" />
          <span>REDUCING BALANCE &amp; SAVINGS CALCULATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Calculate EMI &amp; Interest Savings for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Calculate precise monthly EMIs or discover how switching your loan saves lakhs in interest.
        </p>

        {/* Dual Mode Switcher Tabs */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-gray-100 border border-gray-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("standard")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "standard"
                ? "bg-white text-primary shadow-xs border border-gray-200/60"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Calculator className="w-4 h-4 text-primary" />
            <span>Home Loan EMI Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("transfer")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "transfer"
                ? "bg-white text-emerald-800 shadow-xs border border-gray-200/60"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>Balance Transfer &amp; Overdraft Savings</span>
          </button>
        </div>
      </div>

      {activeTab === "standard" ? (
        /* MODE 1: STANDARD EMI CALCULATOR (EQUALIZED HEIGHTS) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
          {/* Left Column: Sliders & Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Loan Parameters
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLoanAmount(5000000);
                    setInterestRate(minRate);
                    setTenureYears(20);
                  }}
                  className="text-xs font-bold text-primary hover:text-[#035259] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* SLIDER 1: LOAN AMOUNT */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span>Sanction Loan Amount</span>
                  </label>
                  <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl border border-primary/20">
                    ₹{formatINR(loanAmount)}
                  </div>
                </div>

                <input
                  type="range"
                  min={1000000}
                  max={Math.min(100000000, maxSanction)}
                  step={200000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>₹10 Lakhs</span>
                  <span>Max: {lender.maxAmount}</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {standardPresets.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setLoanAmount(amt)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        loanAmount === amt
                          ? "bg-primary text-white shadow-2xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {formatLakhs(amt)}
                    </button>
                  ))}
                </div>
              </div>

              {/* SLIDER 2: INTEREST RATE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-primary" />
                    <span>Interest Rate (p.a.)</span>
                  </label>
                  <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl border border-primary/20">
                    {interestRate.toFixed(2)}%
                  </div>
                </div>

                <input
                  type="range"
                  min={minRate}
                  max={maxRate}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>Min: {minRate}% (Best CIBIL 750+)</span>
                  <span>Max: {maxRate}% p.a.</span>
                </div>
              </div>

              {/* SLIDER 3: TENURE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Repayment Tenure</span>
                  </label>
                  <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl border border-primary/20">
                    {tenureYears} Years ({tenureYears * 12} Mos)
                  </div>
                </div>

                <input
                  type="range"
                  min={5}
                  max={maxTenureYears}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>5 Years</span>
                  <span>Max: {maxTenureYears} Years</span>
                </div>

                <div className="flex gap-2 pt-1">
                  {[10, 15, 20, 25, 30].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setTenureYears(y)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        tenureYears === y
                          ? "bg-primary text-white shadow-2xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {y} Yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* 20Y vs 30Y Tenure Trade-off Pill (Balanced into Left Card) */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">20Y vs 30Y Tenure Trade-off:</span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-md">Smart Decision Tip</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60 shadow-2xs">
                    <span className="text-[10px] text-gray-500 block">20-Year EMI</span>
                    <span className="font-bricolage font-bold text-sm text-gray-900">
                      ₹{formatINR(standardResults.emi20)}/mo
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60 shadow-2xs">
                    <span className="text-[10px] text-gray-500 block">30-Year EMI</span>
                    <span className="font-bricolage font-bold text-sm text-emerald-700">
                      ₹{formatINR(standardResults.emi30)}/mo
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-900 leading-snug">
                  Choosing 30 years lowers your monthly payment by ₹{formatINR(standardResults.emi20 - standardResults.emi30)}/mo, but adds ₹{formatLakhs(standardResults.interestDiff30vs20)} in total interest outlay!
                </p>
              </div>
            </div>

            {/* Bottom Trust Assurance on Left Card */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Monthly Reducing Balance Calculation</span>
              </div>
              <span>0% Foreclosure Penalty</span>
            </div>
          </div>

          {/* Right Column: Calculated Results Summary & Comparison (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between h-full space-y-5">
            <div className="space-y-4">
              {/* Main EMI Highlight Box */}
              <div className="bg-gradient-to-br from-primary to-[#035259] rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block mb-1">
                  Calculated Monthly EMI
                </span>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  ₹{formatINR(standardResults.monthlyEmi)}
                </div>
                <p className="text-[11px] text-emerald-100/80 mt-1 font-medium">
                  For {tenureYears} Years @ {interestRate.toFixed(2)}% p.a.
                </p>
              </div>

              {/* Breakdown Values Matrix */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <span className="text-gray-500 font-medium">Principal Sanction Amount</span>
                  <span className="font-bricolage font-bold text-sm text-gray-900">
                    ₹{formatINR(loanAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <span className="text-gray-500 font-medium">Total Interest Payable</span>
                  <span className="font-bricolage font-bold text-sm text-amber-700">
                    ₹{formatINR(standardResults.totalInterest)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <span className="text-gray-500 font-medium">Total Outflow (Principal + Interest)</span>
                  <span className="font-bricolage font-bold text-sm text-gray-900">
                    ₹{formatINR(standardResults.totalPayment)}
                  </span>
                </div>
              </div>

              {/* Visual Breakdown Progress Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-primary">Principal: {standardResults.principalPercent}%</span>
                  <span className="text-amber-700">Interest: {standardResults.interestPercent}%</span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${standardResults.principalPercent}%` }}
                  />
                  <div
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{ width: `${standardResults.interestPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions of Right Card */}
            <div className="space-y-3 pt-2">
              {/* Action Trigger Button */}
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    lender.name,
                    `Home Loan EMI Application: ₹${formatINR(standardResults.monthlyEmi)}/mo for ₹${formatINR(loanAmount)}`
                  )
                }
                className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <span>Apply for this EMI (₹{formatINR(standardResults.monthlyEmi)}/mo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Amortization Schedule Accordion Toggle */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-700 hover:text-primary transition-colors cursor-pointer py-1"
                >
                  <span>View Initial 6-Month Amortization Schedule</span>
                  {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAmortization && (
                  <div className="mt-3 overflow-x-auto text-[11px] border border-gray-200 rounded-xl bg-white shadow-2xs">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="p-2">Mo</th>
                          <th className="p-2">Principal</th>
                          <th className="p-2">Interest</th>
                          <th className="p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {standardResults.schedulePreview.map((row) => (
                          <tr key={row.month} className="hover:bg-gray-50/50">
                            <td className="p-2 font-bold text-gray-900">{row.month}</td>
                            <td className="p-2 text-emerald-800">₹{formatINR(row.principalPart)}</td>
                            <td className="p-2 text-amber-800">₹{formatINR(row.interestPart)}</td>
                            <td className="p-2 text-gray-700">₹{formatINR(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: BALANCE TRANSFER & OVERDRAFT SAVINGS CALCULATOR (EQUALIZED HEIGHTS) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
          {/* Left Column: Sliders for Existing Loan (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Existing Home Loan Details
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  0% Foreclosure Penalty
                </span>
              </div>

              {/* SLIDER 1: EXISTING PRINCIPAL */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Outstanding Loan Balance
                  </label>
                  <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-base sm:text-lg px-3.5 py-1 rounded-xl border border-primary/20">
                    ₹{formatINR(existingPrincipal)}
                  </div>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={20000000}
                  step={250000}
                  value={existingPrincipal}
                  onChange={(e) => setExistingPrincipal(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>₹10 Lakhs</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* SLIDER 2: CURRENT RATE VS NEW RATE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Current Rate
                    </label>
                    <span className="font-bricolage font-bold text-sm text-red-600">
                      {existingRate.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={7.5}
                    max={11.0}
                    step={0.05}
                    value={existingRate}
                    onChange={(e) => setExistingRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      New Rate ({lender.name})
                    </label>
                    <span className="font-bricolage font-bold text-sm text-emerald-700">
                      {newRate.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={minRate}
                    max={minRate + 1.5}
                    step={0.05}
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* SLIDER 3: REMAINING TENURE */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Remaining Tenure
                  </label>
                  <span className="font-bricolage font-bold text-sm text-gray-900">
                    {remainingTenure} Years ({remainingTenure * 12} Mos)
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={25}
                  step={1}
                  value={remainingTenure}
                  onChange={(e) => setRemainingTenure(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* OPTIONAL OVERDRAFT SURPLUS SLIDER */}
              {lender.overdraftScheme && (
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                        {lender.overdraftScheme} Feature
                      </span>
                      <label className="text-xs font-bold text-gray-800">
                        Average Surplus Savings Parked
                      </label>
                    </div>
                    <span className="font-bricolage font-bold text-sm text-purple-900">
                      ₹{formatINR(overdraftSurplus)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={2000000}
                    step={50000}
                    value={overdraftSurplus}
                    onChange={(e) => setOverdraftSurplus(Number(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <p className="text-[11px] text-purple-900 leading-snug">
                    Parking this surplus in your overdraft account saves an additional{" "}
                    <strong>₹{formatLakhs(transferSavings.odInterestSaved)}</strong> in interest!
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Trust Note */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Bank Transfer • Minimal Documentation</span>
              </span>
              <span>Top-Up Facility Available</span>
            </div>
          </div>

          {/* Right Column: Balance Transfer Savings Highlight (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block mb-1">
                  Total Interest You Save
                </span>
                <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  ₹{formatINR(transferSavings.totalInterestSaved)}
                </div>
                <p className="text-[11px] text-emerald-100/90 mt-1 font-medium">
                  By switching from {existingRate.toFixed(2)}% to {newRate.toFixed(2)}%
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-2xs">
                  <span className="text-gray-500 font-medium">Current Monthly EMI</span>
                  <span className="font-bricolage font-bold text-sm text-red-700">
                    ₹{formatINR(transferSavings.oldEmi)}/mo
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-2xs">
                  <span className="text-gray-500 font-medium">New Monthly EMI with {lender.name}</span>
                  <span className="font-bricolage font-bold text-sm text-emerald-800">
                    ₹{formatINR(transferSavings.newEmi)}/mo
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-2xs">
                  <span className="text-emerald-900 font-bold">Monthly In-Hand Savings</span>
                  <span className="font-bricolage font-extrabold text-sm sm:text-base text-emerald-700">
                    ₹{formatINR(transferSavings.monthlySaved)} / month
                  </span>
                </div>
              </div>

              {/* Quick Benefits list */}
              <div className="space-y-2 text-xs text-gray-700 pt-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero foreclosure fee on existing floating rate loan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Option for Top-Up Loan at identical low housing rate</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  lender.name,
                  `Home Loan Balance Transfer Application • Saving ₹${formatINR(transferSavings.totalInterestSaved)}`
                )
              }
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <span>Apply for Balance Transfer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
