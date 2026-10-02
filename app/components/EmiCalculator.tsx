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
  ChevronDown,
  ChevronUp,
  Info,
  TrendingDown,
  Lock,
  Zap,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";

type LoanType = "personal" | "business" | "home";

interface BankPreset {
  name: string;
  rate: number;
}

interface LoanConfig {
  id: LoanType;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  tag: string;
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  amountPresets: { label: string; value: number }[];
  defaultRate: number;
  minRate: number;
  maxRate: number;
  stepRate: number;
  bankPresets: BankPreset[];
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
    tag: "Instant Disbursal",
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
      { label: "₹40L", value: 4000000 },
    ],
    defaultRate: 10.49,
    minRate: 9.99,
    maxRate: 24.0,
    stepRate: 0.1,
    bankPresets: [
      { name: "HDFC", rate: 9.99 },
      { name: "SBI", rate: 10.0 },
      { name: "Kotak", rate: 10.99 },
      { name: "Bajaj", rate: 11.0 },
    ],
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
    tag: "Up to ₹2 Crore",
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
    bankPresets: [
      { name: "SBI SME", rate: 10.5 },
      { name: "HDFC Biz", rate: 11.25 },
      { name: "Axis", rate: 12.0 },
      { name: "Tata Capital", rate: 13.5 },
    ],
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
    tag: "Lowest Rates @ 8.40%",
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
    bankPresets: [
      { name: "SBI Home", rate: 8.25 },
      { name: "HDFC Home", rate: 8.4 },
      { name: "ICICI Home", rate: 8.6 },
      { name: "BoB Home", rate: 8.75 },
    ],
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
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Handle switching loan types
  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    const cfg = loanConfigs[type];
    setAmount(cfg.defaultAmount);
    setInterestRate(cfg.defaultRate);
    setTenureYears(cfg.defaultTenureYears);
    setTenureUnit("years");
    setShowAmortization(false);
  };

  // Convert tenure for calculations
  const totalMonths = useMemo(() => {
    return tenureUnit === "years" ? tenureYears * 12 : tenureYears;
  }, [tenureYears, tenureUnit]);

  // EMI Math formula & Yearly Breakdown calculation
  const { monthlyEmi, totalInterest, totalPayment, principalPercent, interestPercent, yearlyBreakdown } =
    useMemo(() => {
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
          yearlyBreakdown: [],
        };
      }

      const compound = Math.pow(1 + r, n);
      const emi = (P * r * compound) / (compound - 1);
      const payment = emi * n;
      const interest = payment - P;

      const pPct = payment > 0 ? (P / payment) * 100 : 100;
      const iPct = payment > 0 ? (interest / payment) * 100 : 0;

      // Generate yearly amortization breakdown
      let balance = P;
      const breakdown: {
        year: number;
        principalPaid: number;
        interestPaid: number;
        balance: number;
      }[] = [];

      const totalYears = Math.ceil(n / 12);
      for (let yr = 1; yr <= totalYears; yr++) {
        let yrPrincipal = 0;
        let yrInterest = 0;
        const monthsInThisYear = yr === totalYears && n % 12 !== 0 ? n % 12 : 12;

        for (let m = 1; m <= monthsInThisYear; m++) {
          const monthlyInt = balance * r;
          const monthlyPrin = emi - monthlyInt;
          yrInterest += monthlyInt;
          yrPrincipal += monthlyPrin;
          balance = Math.max(0, balance - monthlyPrin);
        }

        breakdown.push({
          year: yr,
          principalPaid: Math.round(yrPrincipal),
          interestPaid: Math.round(yrInterest),
          balance: Math.round(balance),
        });
      }

      return {
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(interest),
        totalPayment: Math.round(payment),
        principalPercent: Math.round(pPct),
        interestPercent: Math.max(0, 100 - Math.round(pPct)),
        yearlyBreakdown: breakdown,
      };
    }, [amount, interestRate, totalMonths]);

  // Format currency in Indian standard format
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
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

  // Slider Fill Percentages
  const amountPercent = useMemo(() => {
    const min = activeConfig.minAmount;
    const max = activeConfig.maxAmount;
    return Math.min(100, Math.max(0, ((amount - min) / (max - min)) * 100));
  }, [amount, activeConfig]);

  const ratePercent = useMemo(() => {
    const min = activeConfig.minRate;
    const max = activeConfig.maxRate;
    return Math.min(100, Math.max(0, ((interestRate - min) / (max - min)) * 100));
  }, [interestRate, activeConfig]);

  const tenurePercent = useMemo(() => {
    const min = tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12;
    const max = tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12;
    return Math.min(100, Math.max(0, ((tenureYears - min) / (max - min)) * 100));
  }, [tenureYears, tenureUnit, activeConfig]);

  // Calculate SVG Pie/Donut Chart parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  return (
    <section
      id="emi-calculator"
      className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#FAF8F2] via-[#F4F1E6]/40 to-[#FAF8F2]"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#02474D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#B69226]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/15 mb-4 shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            Financial Intelligence Tool
          </div>

          <h2 className="font-bricolage font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
            Calculate Your{" "}
            <span className="text-primary relative inline-block">
              Loan EMI
              <span className="absolute bottom-1.5 left-0 w-full h-2 bg-gold/25 -z-10 rounded-full" />
            </span>{" "}
            in Real Time
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-gold rounded-xs shadow-2xs" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Plan your monthly outflow with complete clarity. Adjust loan parameters, compare bank benchmark rates, and visualize principal versus interest breakdown.
          </p>
        </div>

        {/* ── Loan Type Switcher Tabs ──────────────────────────────────── */}
        <div className="flex justify-center mb-10 reveal-on-scroll delay-100">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-1.5 sm:gap-2 max-w-full overflow-x-auto scrollbar-hidden">
            {(Object.keys(loanConfigs) as LoanType[]).map((type) => {
              const cfg = loanConfigs[type];
              const isActive = loanType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleLoanTypeChange(type)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-3 rounded-xl font-montserrat text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100/70"
                  }`}
                >
                  <span className={`transition-colors ${isActive ? "text-gold" : "text-gray-500"}`}>
                    {cfg.icon}
                  </span>
                  <span>{cfg.label}</span>
                  <span
                    className={`hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                    }`}
                  >
                    {cfg.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Calculator Grid ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Left Column: Sliders & Controls (58%) ─────────────────── */}
          <div className="w-full lg:w-[58%] bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_16px_40px_rgba(2,71,77,0.06)] border border-gray-150 flex flex-col gap-7 reveal-slide-left delay-150">
            {/* Active Loan Subtitle Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border border-primary/10 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                  {activeConfig.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider font-montserrat">
                      {activeConfig.label}
                    </p>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 font-montserrat font-medium">
                    {activeConfig.subtitle}
                  </p>
                </div>
              </div>
              <div className="self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200 px-3 py-1.5 rounded-full shadow-2xs font-montserrat">
                  <Zap className="w-3 h-3 text-gold shrink-0" />
                  {activeConfig.startingOffer}
                </span>
              </div>
            </div>

            {/* Control 1: Loan Amount */}
            <div className="bg-[#FAFBFB] hover:bg-white border border-gray-200/70 hover:border-primary/20 rounded-2xl p-5 transition-all shadow-2xs flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-bold text-gray-800 font-montserrat flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <IndianRupee className="w-4 h-4" />
                  </span>
                  <span>Loan Amount</span>
                </label>

                {/* Amount Numeric Input Box */}
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400 font-bold text-sm font-bricolage">₹</span>
                  <input
                    type="text"
                    value={formatINR(amount)}
                    onChange={(e) => {
                      const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(cleanVal)) {
                        setAmount(Math.min(activeConfig.maxAmount, Math.max(0, cleanVal)));
                      }
                    }}
                    className="w-36 sm:w-44 pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Range Slider with Custom Dynamic Fill */}
              <div className="pt-2">
                <input
                  type="range"
                  min={activeConfig.minAmount}
                  max={activeConfig.maxAmount}
                  step={activeConfig.stepAmount}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${amountPercent}%, #E2E8F0 ${amountPercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium mt-2">
                  <span>Min: {formatAmountText(activeConfig.minAmount)}</span>
                  <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                    {formatAmountText(amount)}
                  </span>
                  <span>Max: {formatAmountText(activeConfig.maxAmount)}</span>
                </div>
              </div>

              {/* Quick Amount Chips */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-hidden">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">
                  Quick:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeConfig.amountPresets.map((chip) => {
                    const isSelected = amount === chip.value;
                    return (
                      <button
                        key={chip.label}
                        onClick={() => setAmount(chip.value)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-montserrat font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-xs scale-105"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Control 2: Interest Rate */}
            <div className="bg-[#FAFBFB] hover:bg-white border border-gray-200/70 hover:border-primary/20 rounded-2xl p-5 transition-all shadow-2xs flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-bold text-gray-800 font-montserrat flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
                    <Percent className="w-4 h-4" />
                  </span>
                  <span>Interest Rate (p.a.)</span>
                </label>

                {/* Rate Input Box */}
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
                    className="w-28 pl-3 pr-7 py-2 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                  />
                  <span className="absolute right-3 text-gray-400 font-bold text-sm">%</span>
                </div>
              </div>

              {/* Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min={activeConfig.minRate}
                  max={activeConfig.maxRate}
                  step={activeConfig.stepRate}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${ratePercent}%, #E2E8F0 ${ratePercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium mt-2">
                  <span>Min: {activeConfig.minRate}%</span>
                  <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                    {interestRate}% p.a.
                  </span>
                  <span>Max: {activeConfig.maxRate}%</span>
                </div>
              </div>

              {/* Bank Rate Benchmarks */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-hidden">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">
                  Bank Rates:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeConfig.bankPresets.map((bank) => {
                    const isSelected = Math.abs(interestRate - bank.rate) < 0.05;
                    return (
                      <button
                        key={bank.name}
                        onClick={() => setInterestRate(bank.rate)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-montserrat font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? "bg-gold text-white border-gold shadow-xs"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span>{bank.name}</span>
                        <span className={`text-[10px] ${isSelected ? "text-white/90" : "text-gray-500"}`}>
                          ({bank.rate}%)
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Control 3: Loan Tenure */}
            <div className="bg-[#FAFBFB] hover:bg-white border border-gray-200/70 hover:border-primary/20 rounded-2xl p-5 transition-all shadow-2xs flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-bold text-gray-800 font-montserrat flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <span>Loan Tenure</span>
                </label>

                {/* Years / Months Unit Toggle + Input */}
                <div className="flex items-center gap-2">
                  <div className="bg-gray-150 p-1 rounded-xl flex items-center text-xs font-semibold font-montserrat">
                    <button
                      onClick={() => setTenureUnit("years")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        tenureUnit === "years"
                          ? "bg-white text-primary shadow-xs font-bold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setTenureUnit("months")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        tenureUnit === "months"
                          ? "bg-white text-primary shadow-xs font-bold"
                          : "text-gray-500 hover:text-gray-800"
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
                      className="w-24 pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-right font-bricolage font-extrabold text-primary text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                    />
                    <span className="absolute right-2.5 text-gray-400 font-bold text-xs font-montserrat">
                      {tenureUnit === "years" ? "Yr" : "Mo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min={tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12}
                  max={tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${tenurePercent}%, #E2E8F0 ${tenurePercent}%, #E2E8F0 100%)`,
                  }}
                  className="custom-range-slider"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat font-medium mt-2">
                  <span>
                    {tenureUnit === "years"
                      ? `${activeConfig.minTenureYears} Year`
                      : `${activeConfig.minTenureYears * 12} Mos`}
                  </span>
                  <span className="text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/10">
                    {tenureUnit === "years"
                      ? `${tenureYears} Years (${tenureYears * 12} Months)`
                      : `${tenureYears} Months (${(tenureYears / 12).toFixed(1)} Yrs)`}
                  </span>
                  <span>
                    {tenureUnit === "years"
                      ? `${activeConfig.maxTenureYears} Years`
                      : `${activeConfig.maxTenureYears * 12} Mos`}
                  </span>
                </div>
              </div>

              {/* Quick Tenure Chips */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-hidden">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">
                  Tenure:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeConfig.tenurePresets.map((chip) => {
                    const isSelected = tenureUnit === "years" && tenureYears === chip.years;
                    return (
                      <button
                        key={chip.label}
                        onClick={() => {
                          setTenureUnit("years");
                          setTenureYears(chip.years);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-montserrat font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-xs scale-105"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: EMI Summary & Executive Card (42%) ───────── */}
          <div className="w-full lg:w-[42%] flex flex-col gap-6 reveal-slide-right delay-200">
            {/* Primary Result Executive Card */}
            <div className="bg-gradient-to-br from-[#023338] via-[#02474D] to-[#012226] text-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(2,71,77,0.28)] border border-emerald-400/20 relative overflow-hidden flex flex-col justify-between">
              {/* Background Luxury Ambient Glows */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold/15 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

              {/* Card Header & Big Monthly EMI */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-emerald-300 uppercase tracking-widest font-montserrat">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Monthly Installment
                  </span>
                  <span className="text-[11px] font-semibold text-white/60 font-montserrat flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-gold" />
                    Reducing Balance
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-bricolage font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-none">
                    ₹ {formatINR(monthlyEmi)}
                  </span>
                  <span className="text-sm font-semibold text-white/70 font-montserrat">/ month</span>
                </div>

                <p className="text-xs text-emerald-100/70 mt-2 font-montserrat flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  Calculated for {totalMonths} months tenure @ {interestRate}% p.a.
                </p>
              </div>

              {/* Donut Chart & Visual Breakdown */}
              <div className="my-6 pt-6 border-t border-white/10 relative z-10">
                <div className="flex items-center justify-between gap-4">
                  {/* SVG Donut Ring with Gradients */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                      <defs>
                        <linearGradient id="emiPrincipalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#34D399" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="emiInterestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FBBF24" />
                          <stop offset="100%" stopColor="#D97706" />
                        </linearGradient>
                      </defs>

                      {/* Track background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="16"
                        fill="transparent"
                      />

                      {/* Principal Segment */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="url(#emiPrincipalGrad)"
                        strokeWidth="16"
                        strokeDasharray={`${principalStroke} ${circumference}`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />

                      {/* Interest Segment */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="url(#emiInterestGrad)"
                        strokeWidth="16"
                        strokeDasharray={`${interestStroke} ${circumference}`}
                        strokeDashoffset={-principalStroke}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>

                    {/* Center Percentage Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-200/70 font-bold font-montserrat">
                        Principal
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold font-bricolage text-white">
                        {principalPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Adjacent Legend & Stat Cards */}
                  <div className="flex-1 flex flex-col gap-2.5">
                    {/* Principal Stat */}
                    <div className="bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-xl p-3 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 text-xs text-white/80 font-montserrat font-medium">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-2xs" />
                          <span>Principal ({principalPercent}%)</span>
                        </div>
                      </div>
                      <p className="font-bricolage font-bold text-white text-base sm:text-lg">
                        ₹ {formatINR(amount)}
                      </p>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                        <div
                          style={{ width: `${principalPercent}%` }}
                          className="h-full bg-emerald-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Interest Stat */}
                    <div className="bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-xl p-3 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 text-xs text-white/80 font-montserrat font-medium">
                          <span className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 shadow-2xs" />
                          <span>Total Interest ({interestPercent}%)</span>
                        </div>
                      </div>
                      <p className="font-bricolage font-bold text-gold text-base sm:text-lg">
                        ₹ {formatINR(totalInterest)}
                      </p>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                        <div
                          style={{ width: `${interestPercent}%` }}
                          className="h-full bg-gold rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Payable Summary Bar */}
              <div className="bg-white/[0.09] backdrop-blur-md rounded-2xl p-4 sm:p-5 flex items-center justify-between border border-white/15 relative z-10 mb-4 shadow-inner">
                <div>
                  <p className="text-xs text-emerald-100/90 font-bold uppercase tracking-wider font-montserrat">
                    Total Amount Payable
                  </p>
                  <p className="text-[11px] text-white/50 font-montserrat mt-0.5">
                    (Principal + Total Interest)
                  </p>
                </div>
                <p className="font-bricolage font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  ₹ {formatINR(totalPayment)}
                </p>
              </div>

              {/* Smart Financial Tip Pill */}
              <div className="bg-emerald-950/40 border border-emerald-400/20 rounded-xl p-3 mb-5 flex items-start gap-2.5 text-xs text-emerald-100/90 font-montserrat">
                <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="leading-snug">
                  {tenureYears > 3
                    ? "Tip: Reducing tenure by 1 year cuts significant total interest outflow while slightly adjusting EMI."
                    : "Tip: A 3-year tenure provides an optimal balance between low monthly burden and minimal total interest."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 space-y-3">
                <button
                  onClick={() =>
                    openApplyModal(
                      activeConfig.label,
                      `Loan Amount: ₹${formatINR(amount)} • Rate: ${interestRate}% p.a. • Tenure: ${tenureYears} Yrs`
                    )
                  }
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#C9AA3C] to-[#B69226] hover:from-[#DFC053] hover:to-[#B69226] text-[#0A201C] font-bricolage font-extrabold text-base tracking-wide py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_12px_28px_rgba(182,146,38,0.4)] hover:shadow-[0_16px_36px_rgba(182,146,38,0.55)] active:scale-[0.98] group cursor-pointer"
                >
                  <span>Apply for {activeConfig.label}</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>

                {/* Amortization schedule drawer trigger */}
                <button
                  type="button"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full text-center text-xs font-semibold text-white/70 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer py-1 font-montserrat"
                >
                  <span>{showAmortization ? "Hide Yearly Schedule" : "View Yearly Amortization Schedule"}</span>
                  {showAmortization ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
                </button>
              </div>
            </div>

            {/* Value Props & Trust Badges */}
            <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-sm flex flex-col gap-3 reveal-on-scroll delay-300">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-700 font-montserrat">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Zero hidden charges • 100% transparent comparison</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-700 font-montserrat">
                <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Instant paperless eligibility check with top partner banks</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-700 font-montserrat">
                <div className="w-6 h-6 rounded-md bg-amber-50 text-gold flex items-center justify-center shrink-0 border border-amber-200/50">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>Zero impact on your CIBIL credit score</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Collapsible Yearly Amortization Schedule ─────────────────── */}
        {showAmortization && (
          <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-150 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2 mb-6">
              <div>
                <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Yearly Amortization Schedule
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-1">
                  Complete breakdown of principal vs interest paid across your {tenureYears} year tenure.
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20 font-montserrat">
                Total Repayment: ₹{formatINR(totalPayment)}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm font-montserrat">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200/80 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 rounded-l-xl">Year</th>
                    <th className="py-3 px-4">Principal Paid</th>
                    <th className="py-3 px-4">Interest Paid</th>
                    <th className="py-3 px-4">Total Paid in Year</th>
                    <th className="py-3 px-4 rounded-r-xl">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-primary/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center">
                          {row.year}
                        </span>
                        Year {row.year}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700 font-bricolage text-base">
                        ₹ {formatINR(row.principalPaid)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-amber-800 font-bricolage text-base">
                        ₹ {formatINR(row.interestPaid)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-primary font-bricolage text-base">
                        ₹ {formatINR(row.principalPaid + row.interestPaid)}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-500 font-bricolage text-base">
                        ₹ {formatINR(row.balance)}
                      </td>
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
