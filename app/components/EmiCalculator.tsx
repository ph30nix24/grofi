"use client";

import React, { useState, useMemo } from "react";
import {
  Wallet,
  Briefcase,
  Home,
  Percent,
  Calendar,
  IndianRupee,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";

type LoanType = "personal" | "business" | "home";

interface LoanConfig {
  id: LoanType;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  amountPresets: { label: string; value: number }[];
  defaultRate: number;
  minRate: number;
  maxRate: number;
  stepRate: number;
  defaultTenureYears: number;
  minTenureYears: number;
  maxTenureYears: number;
  tenurePresets: { label: string; years: number }[];
  startingOffer: string;
}

const loanConfigs: Record<LoanType, LoanConfig> = {
  personal: {
    id: "personal",
    label: "Personal Loan",
    icon: <Wallet className="w-4 h-4" />,
    subtitle: "Collateral-free instant cash for all personal needs",
    defaultAmount: 500000,
    minAmount: 50000,
    maxAmount: 5000000,
    stepAmount: 25000,
    amountPresets: [
      { label: "₹1L", value: 100000 },
      { label: "₹3L", value: 300000 },
      { label: "₹5L", value: 500000 },
      { label: "₹10L", value: 1000000 },
      { label: "₹25L", value: 2500000 },
    ],
    defaultRate: 10.49,
    minRate: 9.99,
    maxRate: 24.0,
    stepRate: 0.1,
    defaultTenureYears: 3,
    minTenureYears: 1,
    maxTenureYears: 5,
    tenurePresets: [
      { label: "1 Yr", years: 1 },
      { label: "2 Yrs", years: 2 },
      { label: "3 Yrs", years: 3 },
      { label: "4 Yrs", years: 4 },
      { label: "5 Yrs", years: 5 },
    ],
    startingOffer: "Starting @ 10.49% p.a. • Instant Disbursal",
  },
  business: {
    id: "business",
    label: "Business Loan",
    icon: <Briefcase className="w-4 h-4" />,
    subtitle: "Fuel company working capital and business expansion",
    defaultAmount: 1500000,
    minAmount: 100000,
    maxAmount: 20000000,
    stepAmount: 50000,
    amountPresets: [
      { label: "₹5L", value: 500000 },
      { label: "₹15L", value: 1500000 },
      { label: "₹30L", value: 3000000 },
      { label: "₹50L", value: 5000000 },
      { label: "₹1Cr", value: 10000000 },
    ],
    defaultRate: 11.25,
    minRate: 10.5,
    maxRate: 26.0,
    stepRate: 0.1,
    defaultTenureYears: 4,
    minTenureYears: 1,
    maxTenureYears: 7,
    tenurePresets: [
      { label: "1 Yr", years: 1 },
      { label: "2 Yrs", years: 2 },
      { label: "3 Yrs", years: 3 },
      { label: "5 Yrs", years: 5 },
      { label: "7 Yrs", years: 7 },
    ],
    startingOffer: "Starting @ 11.25% p.a. • Collateral Free Options",
  },
  home: {
    id: "home",
    label: "Home Loan",
    icon: <Home className="w-4 h-4" />,
    subtitle: "Low EMI home loans for buying, building or renovation",
    defaultAmount: 3500000,
    minAmount: 500000,
    maxAmount: 50000000,
    stepAmount: 100000,
    amountPresets: [
      { label: "₹20L", value: 2000000 },
      { label: "₹35L", value: 3500000 },
      { label: "₹50L", value: 5000000 },
      { label: "₹75L", value: 7500000 },
      { label: "₹1.5Cr", value: 15000000 },
    ],
    defaultRate: 8.4,
    minRate: 8.25,
    maxRate: 15.0,
    stepRate: 0.05,
    defaultTenureYears: 20,
    minTenureYears: 1,
    maxTenureYears: 30,
    tenurePresets: [
      { label: "5 Yrs", years: 5 },
      { label: "10 Yrs", years: 10 },
      { label: "15 Yrs", years: 15 },
      { label: "20 Yrs", years: 20 },
      { label: "30 Yrs", years: 30 },
    ],
    startingOffer: "Starting @ 8.40% p.a. • Up to 30 Years Tenure",
  },
};

export default function EmiCalculator() {
  const { openApplyModal } = useApplyModal();
  const [loanType, setLoanType] = useState<LoanType>("personal");

  const activeConfig = loanConfigs[loanType];

  const [amount, setAmount] = useState<number>(activeConfig.defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(activeConfig.defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(activeConfig.defaultTenureYears);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");

  // Handle switching loan types
  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    const cfg = loanConfigs[type];
    setAmount(cfg.defaultAmount);
    setInterestRate(cfg.defaultRate);
    setTenureYears(cfg.defaultTenureYears);
  };

  // Convert tenure for calculations
  const totalMonths = useMemo(() => {
    return tenureUnit === "years" ? tenureYears * 12 : tenureYears;
  }, [tenureYears, tenureUnit]);

  // EMI Math formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const { monthlyEmi, totalInterest, totalPayment, principalPercent, interestPercent } = useMemo(() => {
    const P = amount;
    const r = interestRate / 12 / 100;
    const n = Math.max(1, totalMonths);

    if (r === 0) {
      const emi = P / n;
      return {
        monthlyEmi: Math.round(emi),
        totalInterest: 0,
        totalPayment: Math.round(P),
        principalPercent: 100,
        interestPercent: 0,
      };
    }

    const compound = Math.pow(1 + r, n);
    const emi = (P * r * compound) / (compound - 1);
    const payment = emi * n;
    const interest = payment - P;

    const pPct = payment > 0 ? (P / payment) * 100 : 100;
    const iPct = payment > 0 ? (interest / payment) * 100 : 0;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayment: Math.round(payment),
      principalPercent: Math.round(pPct),
      interestPercent: Math.round(iPct),
    };
  }, [amount, interestRate, totalMonths]);

  // Format currency in Indian standard format
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Format Indian text label for preview (e.g. 50 Lakhs, 1.2 Crore)
  const formatAmountText = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
    }
    return `₹ ${formatINR(val)}`;
  };

  // Calculate SVG Pie/Donut Chart parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  return (
    <section id="emi-calculator" className="py-20 px-6 relative bg-linear-to-b from-[#F3F0DF]/30 via-white to-[#F3F0DF]/50">
      <div className="max-w-7xl mx-auto">
        
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Financial Planning Tool
          </div>

          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Calculate Your{" "}
            <span className="text-gold relative inline-block">
              Loan EMI
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/20 rounded-full" />
            </span>{" "}
            in Seconds
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-linear-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Plan your repayments smartly. Adjust loan amount, tenure, and interest rate to estimate your monthly EMI and total interest outflow.
          </p>
        </div>

        {/* ── Loan Type Switcher Tabs ──────────────────────────────────── */}
        <div className="flex justify-center mb-10 reveal-on-scroll delay-100">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-2 max-w-full overflow-x-auto">
            {(Object.keys(loanConfigs) as LoanType[]).map((type) => {
              const cfg = loanConfigs[type];
              const isActive = loanType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleLoanTypeChange(type)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {cfg.icon}
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Calculator Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column: Sliders & Controls (7 Cols) ───────────────── */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 flex flex-col gap-8 reveal-slide-left delay-150">
            
            {/* Active Loan Subtitle Banner */}
            <div className="flex items-center justify-between bg-primary/4 border border-primary/10 rounded-2xl p-4">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">{activeConfig.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{activeConfig.subtitle}</p>
              </div>
              <span className="hidden sm:inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                {activeConfig.startingOffer}
              </span>
            </div>

            {/* Control 1: Loan Amount */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 font-montserrat flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  Loan Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400 font-bold text-sm">₹</span>
                  <input
                    type="text"
                    value={formatINR(amount)}
                    onChange={(e) => {
                      const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(cleanVal)) {
                        setAmount(Math.min(activeConfig.maxAmount, Math.max(0, cleanVal)));
                      }
                    }}
                    className="w-40 sm:w-48 pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-right font-montserrat font-bold text-primary text-base focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={activeConfig.minAmount}
                max={activeConfig.maxAmount}
                step={activeConfig.stepAmount}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>Min: {formatAmountText(activeConfig.minAmount)}</span>
                <span className="text-primary font-semibold">{formatAmountText(amount)}</span>
                <span>Max: {formatAmountText(activeConfig.maxAmount)}</span>
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeConfig.amountPresets.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setAmount(chip.value)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                      amount === chip.value
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Interest Rate */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 font-montserrat flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-primary" />
                  Interest Rate (p.a.)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step={activeConfig.stepRate}
                    min={activeConfig.minRate}
                    max={activeConfig.maxRate}
                    value={interestRate}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) setInterestRate(val);
                    }}
                    className="w-28 pl-3 pr-7 py-2 bg-gray-50 border border-gray-200 rounded-xl text-right font-montserrat font-bold text-primary text-base focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                  <span className="absolute right-3 text-gray-400 font-bold text-sm">%</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={activeConfig.minRate}
                max={activeConfig.maxRate}
                step={activeConfig.stepRate}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>Min: {activeConfig.minRate}%</span>
                <span className="text-primary font-semibold">{interestRate}% p.a.</span>
                <span>Max: {activeConfig.maxRate}%</span>
              </div>
            </div>

            {/* Control 3: Loan Tenure */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 font-montserrat flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  Loan Tenure
                </label>
                
                {/* Years / Months Unit Toggle */}
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-1 rounded-xl flex items-center text-xs font-semibold">
                    <button
                      onClick={() => setTenureUnit("years")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        tenureUnit === "years" ? "bg-white text-primary shadow-2xs" : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setTenureUnit("months")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        tenureUnit === "months" ? "bg-white text-primary shadow-2xs" : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Months
                    </button>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min={tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12}
                      max={tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12}
                      value={tenureYears}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setTenureYears(val);
                      }}
                      className="w-24 pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-right font-montserrat font-bold text-primary text-base focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                    <span className="absolute right-2.5 text-gray-400 font-bold text-xs">
                      {tenureUnit === "years" ? "Yr" : "Mo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12}
                max={tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>
                  {tenureUnit === "years"
                    ? `${activeConfig.minTenureYears} Year`
                    : `${activeConfig.minTenureYears * 12} Months`}
                </span>
                <span className="text-primary font-semibold">
                  {tenureUnit === "years"
                    ? `${tenureYears} Years (${tenureYears * 12} Months)`
                    : `${tenureYears} Months (${(tenureYears / 12).toFixed(1)} Yrs)`}
                </span>
                <span>
                  {tenureUnit === "years"
                    ? `${activeConfig.maxTenureYears} Years`
                    : `${activeConfig.maxTenureYears * 12} Months`}
                </span>
              </div>

              {/* Quick Tenure Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeConfig.tenurePresets.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => {
                      setTenureUnit("years");
                      setTenureYears(chip.years);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                      tenureUnit === "years" && tenureYears === chip.years
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right Column: EMI Summary & Visual Ring Chart (5 Cols) ─── */}
          <div className="lg:col-span-5 flex flex-col gap-6 reveal-slide-right delay-200">
            
            {/* Primary Result Card */}
            <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Background decorative glow */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold/15 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

              <div className="relative z-10">
                <span className="text-xs font-semibold tracking-widest text-[#B6CC9A] uppercase">
                  Monthly Installment
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-bricolage font-bold text-4xl sm:text-5xl text-white tracking-tight">
                    ₹ {formatINR(monthlyEmi)}
                  </span>
                  <span className="text-sm font-medium text-white/70">/ month</span>
                </div>
                <p className="text-xs text-white/60 mt-1 font-montserrat">
                  Calculated for tenure of {totalMonths} months @ {interestRate}% p.a.
                </p>
              </div>

              {/* Donut Chart & Ratio Visualizer */}
              <div className="my-6 pt-6 border-t border-white/10 flex items-center justify-around gap-4 relative z-10">
                
                {/* SVG Ring Donut */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    {/* Background Circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="18"
                      fill="transparent"
                    />
                    {/* Principal Circle Segment */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#4ade80"
                      strokeWidth="18"
                      strokeDasharray={`${principalStroke} ${circumference}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-500 ease-out"
                    />
                    {/* Interest Circle Segment */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#C9AA3C"
                      strokeWidth="18"
                      strokeDasharray={`${interestStroke} ${circumference}`}
                      strokeDashoffset={-principalStroke}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  
                  {/* Center percentage badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Principal</span>
                    <span className="text-base font-bold font-bricolage text-white">{principalPercent}%</span>
                  </div>
                </div>

                {/* Legend & Breakdown */}
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4ade80] shrink-0" />
                    <div>
                      <p className="text-white/70">Principal ({principalPercent}%)</p>
                      <p className="font-bold text-white text-sm">₹ {formatINR(amount)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold shrink-0" />
                    <div>
                      <p className="text-white/70">Total Interest ({interestPercent}%)</p>
                      <p className="font-bold text-white text-sm">₹ {formatINR(totalInterest)}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Total Payable Summary Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between border border-white/10 relative z-10">
                <div>
                  <p className="text-xs text-white/70 font-medium">Total Amount Payable</p>
                  <p className="text-xs text-white/50">(Principal + Total Interest)</p>
                </div>
                <p className="font-bricolage font-bold text-xl sm:text-2xl text-white">
                  ₹ {formatINR(totalPayment)}
                </p>
              </div>

              {/* Apply CTA Button */}
              <div className="mt-6 relative z-10">
                <button
                  onClick={() => openApplyModal(activeConfig.label, `Loan Amount: ₹${formatINR(amount)} • Rate: ${interestRate}% p.a. • Tenure: ${tenureYears} Yrs`)}
                  className="w-full bg-gold hover:bg-gold/90 text-white font-montserrat font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl group cursor-pointer"
                >
                  Apply for {activeConfig.label}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

            {/* Value Props Strip */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 reveal-on-scroll delay-300">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero hidden charges • 100% transparent comparison</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Instant paperless eligibility check with top partner banks</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
