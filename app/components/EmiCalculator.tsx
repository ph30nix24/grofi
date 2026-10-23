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
  RotateCcw,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";
import {
  calculateEmi,
  formatINR,
  formatAmountText,
  getSliderPercentage,
} from "@/libs/calculators/emi";
import AmortizationTable from "./calculators/AmortizationTable";
import EmiDonutChart from "./calculators/EmiDonutChart";

export type LoanType = "personal" | "business" | "home";

export interface BankPreset {
  name: string;
  rate: number;
  label?: string;
  logo?: string;
  tagline?: string;
}

export interface LoanConfig {
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

export const loanPurposes: Record<LoanType, { label: string; icon: string }[]> = {
  personal: [
    { label: "Home Renovation", icon: "🏡" },
    { label: "Medical Emergency", icon: "🏥" },
    { label: "Wedding & Family", icon: "💍" },
    { label: "Debt Consolidation", icon: "💳" },
    { label: "Travel & Lifestyle", icon: "✈️" },
  ],
  business: [
    { label: "Working Capital", icon: "📈" },
    { label: "Festive Inventory", icon: "📦" },
    { label: "Machinery & Equipment", icon: "⚙️" },
    { label: "Business Expansion", icon: "🏢" },
    { label: "Vendor Overdraft", icon: "🤝" },
  ],
  home: [
    { label: "New Flat / Apartment", icon: "🔑" },
    { label: "Balance Transfer (Save EMI)", icon: "🔄" },
    { label: "Plot & Construction", icon: "🏗️" },
    { label: "Home Extension", icon: "📐" },
    { label: "Loan Against Property", icon: "🏛️" },
  ],
};

export const loanConfigs: Record<LoanType, LoanConfig> = {
  personal: {
    id: "personal",
    label: "Personal Loan",
    icon: <Wallet className="w-5 h-5 text-white" />,
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
      { name: "HDFC", rate: 9.99, label: "HDFC (9.99%)", logo: "/partners-logos/hdfc-logo.webp", tagline: "Lowest salaried rate" },
      { name: "SBI", rate: 10.0, label: "SBI (10%)", logo: "/partners-logos/sbi-logo.webp", tagline: "Xpress Credit zero hidden fee" },
      { name: "Kotak", rate: 10.99, label: "Kotak (10.99%)", logo: "/partners-logos/kotak-logo.webp", tagline: "Paperless digital e-KYC" },
      { name: "Bajaj", rate: 11.0, label: "Bajaj (11%)", logo: "/partners-logos/bajaj-logo.webp", tagline: "Instant digital sanction" },
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
    icon: <Briefcase className="w-5 h-5 text-white" />,
    subtitle: "Fuel your enterprise growth, working capital & expansion",
    tag: "Collateral Free",
    defaultAmount: 1500000,
    minAmount: 100000,
    maxAmount: 10000000,
    stepAmount: 50000,
    amountPresets: [
      { label: "₹5L", value: 500000 },
      { label: "₹15L", value: 1500000 },
      { label: "₹30L", value: 3000000 },
      { label: "₹50L", value: 5000000 },
      { label: "₹75L", value: 7500000 },
      { label: "₹1 Cr", value: 10000000 },
    ],
    defaultRate: 11.25,
    minRate: 10.5,
    maxRate: 26.0,
    stepRate: 0.1,
    bankPresets: [
      { name: "SBI SME", rate: 10.5, label: "SBI SME (10.5%)", logo: "/partners-logos/sbi-logo.webp", tagline: "Flexible business overdraft" },
      { name: "HDFC Biz", rate: 11.25, label: "HDFC Biz (11.25%)", logo: "/partners-logos/hdfc-logo.webp", tagline: "Working capital booster" },
      { name: "Axis", rate: 12.0, label: "Axis (12%)", logo: "/partners-logos/axis-logo.webp", tagline: "Zero audit up to ₹50L" },
      { name: "Bajaj", rate: 13.5, label: "Bajaj (13.5%)", logo: "/partners-logos/bajaj-logo.webp", tagline: "GST turnover linked" },
    ],
    defaultTenureYears: 4,
    minTenureYears: 1,
    maxTenureYears: 7,
    tenurePresets: [
      { label: "1 Yr", years: 1 },
      { label: "2 Yrs", years: 2 },
      { label: "3 Yrs", years: 3 },
      { label: "4 Yrs", years: 4 },
      { label: "5 Yrs", years: 5 },
      { label: "7 Yrs", years: 7 },
    ],
    startingOffer: "Starting @ 11.25% p.a. • Collateral Free",
  },
  home: {
    id: "home",
    label: "Home Loan",
    icon: <Home className="w-5 h-5 text-white" />,
    subtitle: "Lowest interest rates for buying, building or balance transfer",
    tag: "Subsidies Available",
    defaultAmount: 3500000,
    minAmount: 500000,
    maxAmount: 50000000,
    stepAmount: 100000,
    amountPresets: [
      { label: "₹20L", value: 2000000 },
      { label: "₹35L", value: 3500000 },
      { label: "₹50L", value: 5000000 },
      { label: "₹75L", value: 7500000 },
      { label: "₹1.5 Cr", value: 15000000 },
      { label: "₹3 Cr", value: 30000000 },
    ],
    defaultRate: 8.4,
    minRate: 8.25,
    maxRate: 15.0,
    stepRate: 0.05,
    bankPresets: [
      { name: "SBI", rate: 8.25, label: "SBI (8.25%)", logo: "/partners-logos/sbi-logo.webp", tagline: "India's lowest home loan rate" },
      { name: "HDFC", rate: 8.4, label: "HDFC (8.4%)", logo: "/partners-logos/hdfc-logo.webp", tagline: "Doorstep legal assistance" },
      { name: "ICICI", rate: 8.6, label: "ICICI (8.6%)", logo: "/partners-logos/icici-logo.webp", tagline: "Instant balance transfer" },
      { name: "BoB", rate: 8.75, label: "BoB (8.75%)", logo: "/partners-logos/bob-logo.webp", tagline: "Concession for women borrowers" },
    ],
    defaultTenureYears: 20,
    minTenureYears: 1,
    maxTenureYears: 30,
    tenurePresets: [
      { label: "5 Yrs", years: 5 },
      { label: "10 Yrs", years: 10 },
      { label: "15 Yrs", years: 15 },
      { label: "20 Yrs", years: 20 },
      { label: "25 Yrs", years: 25 },
      { label: "30 Yrs", years: 30 },
    ],
    startingOffer: "Starting @ 8.40% p.a. • Up to 30 Years",
  },
};

// Helper to provide dynamic financial context based on selected loan amount
function getAmountContext(amount: number, type: LoanType): string {
  if (type === "personal") {
    if (amount <= 300000) return "⚡ Ideal for emergency cash, medical backup & quick lifestyle needs • Disbursed in 4 hours";
    if (amount <= 1000000) return "⭐ Most popular for home renovation, weddings & family milestones • 100% paperless e-KYC";
    return "💎 High-value personal loan • Best for high-interest debt consolidation & major property upgrades";
  }
  if (type === "business") {
    if (amount <= 1500000) return "📦 Perfect for seasonal festive inventory, working capital buffer & quick supplier clearing";
    if (amount <= 5000000) return "⚙️ Suitable for machinery procurement, team hiring & new retail branch expansion";
    return "🏢 Enterprise-grade funding • Collateral-free overdraft with flexible interest-only drawdown";
  }
  // Home Loan
  if (amount <= 4000000) return "🔑 Affordable housing loan • Eligible for interest concessions & PMAY subsidies";
  if (amount <= 10000000) return "🏡 Standard ready-to-move apartment purchase • Compare 50+ lenders at 8.35% lowest APR";
  return "🏛️ Luxury residence & construction finance • Custom balance transfer saving up to ₹8,000/mo on EMI";
}

// Helper to provide strategic advice on chosen loan tenure
function getTenureStrategy(years: number, type: LoanType): { badge: string; text: string; tone: "emerald" | "amber" | "primary" } {
  const maxYears = type === "home" ? 30 : type === "business" ? 7 : 5;
  const ratio = years / maxYears;

  if (ratio <= 0.4) {
    return {
      badge: "Fast Debt Freedom",
      text: "Higher monthly EMI, but cuts total interest by up to 45% compared to longer tenures.",
      tone: "emerald",
    };
  }
  if (ratio <= 0.75) {
    return {
      badge: "Sweet Spot",
      text: "Optimal balance between low monthly burden and controlled cumulative interest outflow.",
      tone: "primary",
    };
  }
  return {
    badge: "Lowest Monthly EMI",
    text: "Minimizes monthly impact on your wallet; you can make partial pre-payments anytime penalty-free.",
    tone: "amber",
  };
}

export default function EmiCalculator() {
  const { openApplyModal } = useApplyModal();

  // Active Category State
  const [loanType, setLoanType] = useState<LoanType>("personal");
  const activeConfig = loanConfigs[loanType];

  // Selected Purpose Tag
  const [selectedPurpose, setSelectedPurpose] = useState<string>(loanPurposes.personal[0].label);

  // Dynamic Parameter States
  const [amount, setAmount] = useState<number>(activeConfig.defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(activeConfig.defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(activeConfig.defaultTenureYears);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Switch category and synchronize default values cleanly
  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    const cfg = loanConfigs[type];
    setAmount(cfg.defaultAmount);
    setInterestRate(cfg.defaultRate);
    setTenureYears(cfg.defaultTenureYears);
    setTenureUnit("years");
    setSelectedPurpose(loanPurposes[type][0].label);
  };

  // Reset to current category defaults
  const handleResetDefaults = () => {
    setAmount(activeConfig.defaultAmount);
    setInterestRate(activeConfig.defaultRate);
    setTenureYears(activeConfig.defaultTenureYears);
    setTenureUnit("years");
    setSelectedPurpose(loanPurposes[loanType][0].label);
  };

  // Switch tenure unit between years and months
  const handleTenureUnitChange = (unit: "years" | "months") => {
    if (unit === tenureUnit) return;
    if (unit === "months") {
      setTenureYears(tenureYears * 12);
    } else {
      setTenureYears(Math.max(1, Math.round(tenureYears / 12)));
    }
    setTenureUnit(unit);
  };

  // Convert tenure strictly to total months for calculation
  const totalMonths = useMemo(() => {
    return tenureUnit === "years" ? tenureYears * 12 : tenureYears;
  }, [tenureYears, tenureUnit]);

  // Execute centralized mathematical calculation
  const { monthlyEmi, totalInterest, totalPayment, principalPercent, interestPercent, yearlyBreakdown } =
    useMemo(() => {
      return calculateEmi(amount, interestRate, totalMonths);
    }, [amount, interestRate, totalMonths]);

  // Stepper handlers for tactile numeric nudging
  const handleStepAmount = (direction: "inc" | "dec") => {
    setAmount((prev) => {
      const step = activeConfig.stepAmount;
      const next = direction === "inc" ? prev + step : prev - step;
      return Math.min(activeConfig.maxAmount, Math.max(activeConfig.minAmount, next));
    });
  };

  const handleStepRate = (direction: "inc" | "dec") => {
    setInterestRate((prev) => {
      const step = activeConfig.stepRate;
      const next = direction === "inc" ? Number((prev + step).toFixed(2)) : Number((prev - step).toFixed(2));
      return Math.min(activeConfig.maxRate, Math.max(activeConfig.minRate, next));
    });
  };

  const handleStepTenure = (direction: "inc" | "dec") => {
    const min = tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12;
    const max = tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12;
    setTenureYears((prev) => {
      const next = direction === "inc" ? prev + 1 : prev - 1;
      return Math.min(max, Math.max(min, next));
    });
  };

  // Slider Fill Percentages
  const amountPercent = useMemo(() => {
    return getSliderPercentage(amount, activeConfig.minAmount, activeConfig.maxAmount);
  }, [amount, activeConfig]);

  const ratePercent = useMemo(() => {
    return getSliderPercentage(interestRate, activeConfig.minRate, activeConfig.maxRate);
  }, [interestRate, activeConfig]);

  const tenurePercent = useMemo(() => {
    const min = tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12;
    const max = tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12;
    return getSliderPercentage(tenureYears, min, max);
  }, [tenureYears, tenureUnit, activeConfig]);

  const amountContext = useMemo(() => getAmountContext(amount, loanType), [amount, loanType]);
  const tenureStrategy = useMemo(() => getTenureStrategy(tenureYears, loanType), [tenureYears, loanType]);

  const financialInsight = useMemo(() => {
    const interestRatio = amount > 0 ? (totalInterest / amount) * 100 : 0;
    if (loanType === "home") {
      if (tenureYears <= 15) {
        return {
          badge: "Smart Home Buyer Strategy",
          text: `Opting for ${tenureYears} yrs saves significant lakhs in interest while building home equity faster.`,
        };
      }
      return {
        badge: "Tax Exemption Benefit",
        text: `Eligible for Section 24(b) interest deduction up to ₹2 Lakh/yr and Section 80C principal deduction up to ₹1.5 Lakh/yr.`,
      };
    }
    if (loanType === "business") {
      return {
        badge: "Tax Deductible Interest",
        text: `Interest paid (₹${formatINR(totalInterest)}) is treated as a 100% tax-deductible operating expense, reducing net borrowing cost.`,
      };
    }
    // personal loan
    if (tenureYears <= 2) {
      return {
        badge: "Ultra-Fast Debt Free",
        text: `Total interest is only ${interestRatio.toFixed(1)}% of principal (₹${formatINR(totalInterest)}), keeping lifetime borrowing cost minimal.`,
      };
    }
    return {
      badge: "Flexible Prepayment Advantage",
      text: `Zero prepayment penalties on floating loans. Paying just ₹${formatINR(Math.round(monthlyEmi * 0.1))} extra per month can shave months off your tenure.`,
    };
  }, [loanType, tenureYears, totalInterest, amount, monthlyEmi]);

  return (
    <section
      id="emi-calculator"
      className="py-10 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 relative bg-linear-to-b from-[#F3F0DF]/35 via-white to-[#F3F0DF]/25 overflow-x-hidden overflow-hidden"
    >
      {/* ── Signature Grofi Ambient Background Glow ──────────────────────── */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-212.5 h-125 bg-linear-to-br from-[#B6CC9A]/15 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full  overflow-x-hidden">
        
        {/* ── Section Header (100% Aligned to Grofi Aesthetic) ─────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-3 sm:mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Financial Intelligence Tool
          </div>

          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl lg:text-5xl text-primary leading-tight">
            Calculate Your{" "}
            <span className="text-gold relative inline-block">
              Loan EMI
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/20 rounded-full" />
            </span>{" "}
            in Real Time
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-12 sm:w-16 h-px bg-linear-to-r from-transparent to-primary/30" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-12 sm:w-16 h-px bg-linear-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-xs sm:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Plan your monthly outflow with complete transparency. Adjust loan parameters, select partner bank offers, and customize for your specific borrowing purpose.
          </p>
        </div>

        {/* ── Category Switcher Tabs ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-10 reveal-on-scroll delay-100">
          <div
            role="tablist"
            aria-label="Loan Categories"
            className="bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-hidden"
          >
            {(Object.keys(loanConfigs) as LoanType[]).map((type) => {
              const cfg = loanConfigs[type];
              const isActive = loanType === type;
              return (
                <button
                  key={type}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="emi-calculator-content"
                  onClick={() => handleLoanTypeChange(type)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 min-h-10 sm:min-h-11 rounded-lg sm:rounded-xl font-montserrat text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer touch-manipulation ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <span className={`transition-colors ${isActive ? "text-gold" : "text-gray-500"}`}>
                    {cfg.icon}
                  </span>
                  <span>{cfg.label}</span>
                  <span
                    className={`hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#EBF4ED] text-primary border border-primary/15"
                    }`}
                  >
                    {cfg.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Reset Defaults Button */}
          <button
            type="button"
            onClick={handleResetDefaults}
            title="Reset parameters to category default"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary font-montserrat font-semibold px-3 py-2 rounded-xl hover:bg-white/90 transition-all border border-transparent hover:border-gray-200/80 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* ── Mobile Live Quick EMI Summary Header (Saves mobile scroll) ── */}
        <div className="lg:hidden bg-primary text-white rounded-2xl p-3.5 sm:p-5 shadow-xl border border-white/10 mb-4 sm:mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-200 uppercase tracking-wider font-montserrat">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">Monthly Installment</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-white tracking-tight truncate">
                  ₹ {formatINR(monthlyEmi)}
                </span>
                <span className="text-xs text-white/70 font-montserrat shrink-0">/mo</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  activeConfig.label,
                  `Purpose: ${selectedPurpose} • Loan: ₹${formatINR(amount)} • Rate: ${interestRate}% p.a. • Tenure: ${tenureYears} ${tenureUnit === "years" ? "Yrs" : "Mos"}`
                )
              }
              className="bg-gold hover:bg-[#c9a52f] text-black font-bricolage font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer touch-manipulation"
            >
              <span>Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative z-10 mt-3 pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-montserrat">
            <div className="bg-white/10 backdrop-blur-xs rounded-lg px-2.5 py-1.5 border border-white/10">
              <span className="text-[10px] text-white/60 block">Total Interest</span>
              <span className="font-bricolage font-bold text-gold text-xs sm:text-sm truncate block">
                ₹ {formatINR(totalInterest)}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-lg px-2.5 py-1.5 border border-white/10">
              <span className="text-[10px] text-white/60 block">Total Repayment</span>
              <span className="font-bricolage font-bold text-white text-xs sm:text-sm truncate block">
                ₹ {formatINR(totalPayment)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Calculator Grid ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 items-start w-full max-w-full">
          
          {/* ══════════════════════════════════════════════════════════════
              ── Left Column: Pixel-Perfect Calculator Controls (58%) ──
             ══════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[58%] max-w-full bg-white rounded-2xl sm:rounded-4xl p-3.5 sm:p-7 border border-[#E5E9EB] shadow-md flex flex-col gap-3.5 sm:gap-5 reveal-slide-left delay-150 overflow-hidden">
            
            {/* 1. Category Banner Box */}
            <div className="bg-[#F2F8F4] border border-[#D4E8DC] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                  {activeConfig.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bricolage font-extrabold text-xs sm:text-base text-primary tracking-wider uppercase truncate">
                      {activeConfig.label}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-montserrat mt-0.5 truncate">
                    {activeConfig.subtitle}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center shrink-0">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-primary bg-white border border-[#D5EADF] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-2xs font-montserrat">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{activeConfig.startingOffer}</span>
                </span>
              </div>
            </div>

            {/* 2. Loan Amount Card */}
            <div className="bg-white border border-[#E5E9EB] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xs flex flex-col gap-3 sm:gap-3.5 max-w-full overflow-hidden">
              {/* Top Row: Label & Numeric Input */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#EBF4ED] text-primary flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat truncate">
                    Loan Amount
                  </span>
                </div>

                <div className="border border-gray-200 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-2 bg-[#FAFCFB] flex items-center justify-between w-28 xs:w-32 sm:w-44 shrink-0 shadow-2xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <span className="text-gray-400 font-bold font-bricolage text-xs sm:text-sm">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Loan amount in rupees"
                    value={formatINR(amount)}
                    onChange={(e) => {
                      const cleanVal = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(cleanVal)) {
                        setAmount(Math.min(activeConfig.maxAmount, Math.max(0, cleanVal)));
                      }
                    }}
                    className="w-full text-right font-bricolage font-extrabold text-primary text-sm sm:text-lg bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Slider */}
              <div>
                <input
                  type="range"
                  aria-label="Loan Amount Slider"
                  aria-valuemin={activeConfig.minAmount}
                  aria-valuemax={activeConfig.maxAmount}
                  aria-valuenow={amount}
                  aria-valuetext={`₹ ${formatINR(amount)}`}
                  min={activeConfig.minAmount}
                  max={activeConfig.maxAmount}
                  step={activeConfig.stepAmount}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${amountPercent}%, #E2E8F0 ${amountPercent}%, #E2E8F0 100%)`,
                  }}
                  className="w-full custom-range-slider touch-manipulation cursor-pointer"
                />

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-montserrat font-medium mt-1 gap-1">
                  <span className="shrink-0">Min: {formatAmountText(activeConfig.minAmount)}</span>
                  <span className="text-primary font-bold bg-[#EBF4ED] px-2 sm:px-3 py-0.5 rounded-full border border-[#D1E7D8] shadow-2xs text-[11px] sm:text-xs truncate max-w-30 sm:max-w-none text-center">
                    {formatAmountText(amount)}
                  </span>
                  <span className="shrink-0 text-right">Max: {formatAmountText(activeConfig.maxAmount)}</span>
                </div>
              </div>

              {/* Quick Chips Row */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-montserrat mr-0.5 sm:mr-1 shrink-0">
                  QUICK:
                </span>
                {activeConfig.amountPresets.map((chip) => {
                  const isSelected = amount === chip.value;
                  return (
                    <button
                      key={chip.label}
                      type="button"
                      aria-label={`Select loan amount ${chip.label}`}
                      onClick={() => setAmount(chip.value)}
                      className={`text-[11px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border font-montserrat transition-all duration-200 cursor-pointer touch-manipulation ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-[#F8FAFB] hover:bg-gray-100 text-gray-700 border-gray-200/80 font-semibold"
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Interest Rate Card */}
            <div className="bg-white border border-[#E5E9EB] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xs flex flex-col gap-3 sm:gap-3.5 max-w-full overflow-hidden">
              {/* Top Row: Label & Numeric Input */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FEF6E8] text-[#D97706] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat truncate">
                    Interest Rate (p.a.)
                  </span>
                </div>

                <div className="border border-gray-200 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-2 bg-[#FAFCFB] flex items-center justify-between w-20 xs:w-24 sm:w-32 shrink-0 shadow-2xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <input
                    type="number"
                    inputMode="decimal"
                    aria-label="Annual interest rate percentage"
                    step={activeConfig.stepRate}
                    min={activeConfig.minRate}
                    max={activeConfig.maxRate}
                    value={interestRate}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) setInterestRate(val);
                    }}
                    className="w-full text-right font-bricolage font-extrabold text-primary text-sm sm:text-lg bg-transparent focus:outline-none"
                  />
                  <span className="text-gray-400 font-bold font-montserrat text-xs ml-1">%</span>
                </div>
              </div>

              {/* Slider */}
              <div>
                <input
                  type="range"
                  aria-label="Interest Rate Slider"
                  aria-valuemin={activeConfig.minRate}
                  aria-valuemax={activeConfig.maxRate}
                  aria-valuenow={interestRate}
                  aria-valuetext={`${interestRate}% per annum`}
                  min={activeConfig.minRate}
                  max={activeConfig.maxRate}
                  step={activeConfig.stepRate}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${ratePercent}%, #E2E8F0 ${ratePercent}%, #E2E8F0 100%)`,
                  }}
                  className="w-full custom-range-slider touch-manipulation cursor-pointer"
                />

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-montserrat font-medium mt-1 gap-1">
                  <span className="shrink-0">Min: {activeConfig.minRate}%</span>
                  <span className="text-primary font-bold bg-[#EBF4ED] px-2 sm:px-3 py-0.5 rounded-full border border-[#D1E7D8] shadow-2xs text-[11px] sm:text-xs">
                    {interestRate}% p.a.
                  </span>
                  <span className="shrink-0 text-right">Max: {activeConfig.maxRate}%</span>
                </div>
              </div>

              {/* Bank Rates Row */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-montserrat mr-0.5 sm:mr-1 shrink-0">
                  BANK RATES:
                </span>
                {activeConfig.bankPresets.map((bank) => {
                  const isSelected = Math.abs(interestRate - bank.rate) < 0.05;
                  const chipLabel = bank.label || `${bank.name} (${bank.rate}%)`;
                  return (
                    <button
                      key={bank.name}
                      type="button"
                      aria-label={`Select ${bank.name} benchmark rate of ${bank.rate}%`}
                      onClick={() => setInterestRate(bank.rate)}
                      className={`text-[11px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border font-montserrat transition-all duration-200 cursor-pointer touch-manipulation ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-[#F8FAFB] hover:bg-gray-100 text-gray-700 border-gray-200/80 font-medium"
                      }`}
                    >
                      {chipLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Loan Tenure Card */}
            <div className="bg-white border border-[#E5E9EB] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xs flex flex-col gap-3 sm:gap-3.5 max-w-full overflow-hidden">
              {/* Top Row: Label, Unit Switcher & Input */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#EBF4ED] text-primary flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat truncate">
                    Loan Tenure
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                  {/* Years / Months Switch */}
                  <div className="flex items-center text-[11px] sm:text-xs font-semibold font-montserrat gap-1.5 sm:gap-3 text-gray-500 bg-[#F4F6F5] sm:bg-transparent px-1.5 py-0.5 sm:px-0 sm:py-0 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleTenureUnitChange("years")}
                      className={`transition-colors cursor-pointer ${
                        tenureUnit === "years" ? "text-primary font-bold" : "hover:text-gray-800"
                      }`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTenureUnitChange("months")}
                      className={`transition-colors cursor-pointer ${
                        tenureUnit === "months" ? "text-primary font-bold" : "hover:text-gray-800"
                      }`}
                    >
                      Months
                    </button>
                  </div>

                  {/* Numeric Box */}
                  <div className="border border-gray-200 rounded-xl px-2 sm:px-3 py-1 sm:py-2 bg-[#FAFCFB] flex items-center justify-between w-16 xs:w-20 sm:w-24 shadow-2xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                    <input
                      type="number"
                      inputMode="numeric"
                      aria-label="Loan tenure duration"
                      min={tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12}
                      max={tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12}
                      value={tenureYears}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setTenureYears(val);
                      }}
                      className="w-full text-right font-bricolage font-extrabold text-primary text-sm sm:text-lg bg-transparent focus:outline-none"
                    />
                    <span className="text-gray-400 font-bold font-montserrat text-[11px] sm:text-xs ml-1">
                      {tenureUnit === "years" ? "Yr" : "Mo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div>
                <input
                  type="range"
                  aria-label="Loan Tenure Slider"
                  aria-valuemin={tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12}
                  aria-valuemax={tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12}
                  aria-valuenow={tenureYears}
                  aria-valuetext={
                    tenureUnit === "years"
                      ? `${tenureYears} Years (${tenureYears * 12} Months)`
                      : `${tenureYears} Months (${(tenureYears / 12).toFixed(1)} Years)`
                  }
                  min={tenureUnit === "years" ? activeConfig.minTenureYears : activeConfig.minTenureYears * 12}
                  max={tenureUnit === "years" ? activeConfig.maxTenureYears : activeConfig.maxTenureYears * 12}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #02474D 0%, #02474D ${tenurePercent}%, #E2E8F0 ${tenurePercent}%, #E2E8F0 100%)`,
                  }}
                  className="w-full custom-range-slider touch-manipulation cursor-pointer"
                />

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-montserrat font-medium mt-1 gap-1">
                  <span className="shrink-0">
                    {tenureUnit === "years"
                      ? `${activeConfig.minTenureYears} Yr`
                      : `${activeConfig.minTenureYears * 12} Mo`}
                  </span>
                  <span className="text-primary font-bold bg-[#EBF4ED] px-2 sm:px-3 py-0.5 rounded-full border border-[#D1E7D8] shadow-2xs text-[11px] sm:text-xs truncate max-w-32.5 sm:max-w-none text-center">
                    {tenureUnit === "years"
                      ? `${tenureYears} Yrs (${totalMonths} Mos)`
                      : `${tenureYears} Mos (${(tenureYears / 12).toFixed(1)} Yrs)`}
                  </span>
                  <span className="shrink-0 text-right">
                    {tenureUnit === "years"
                      ? `${activeConfig.maxTenureYears} Yrs`
                      : `${activeConfig.maxTenureYears * 12} Mos`}
                  </span>
                </div>
              </div>

              {/* Tenure Chips Row */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-montserrat mr-0.5 sm:mr-1 shrink-0">
                  TENURE:
                </span>
                {activeConfig.tenurePresets.map((chip) => {
                  const isSelected = tenureUnit === "years" && tenureYears === chip.years;
                  return (
                    <button
                      key={chip.label}
                      type="button"
                      aria-label={`Select tenure of ${chip.label}`}
                      onClick={() => {
                        setTenureUnit("years");
                        setTenureYears(chip.years);
                      }}
                      className={`text-[11px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border font-montserrat transition-all duration-200 cursor-pointer touch-manipulation ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-[#F8FAFB] hover:bg-gray-100 text-gray-700 border-gray-200/80 font-semibold"
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              ── Right Column: EMI Summary & Executive Card (42%) ──
             ══════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[42%] max-w-full flex flex-col gap-4 sm:gap-6 reveal-slide-right delay-200 overflow-hidden">
            
            {/* Primary Result Executive Card (Grofi Deep Forest Emerald) */}
            <div className="bg-[#02474D] text-white rounded-2xl sm:rounded-4xl p-4 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between border border-emerald-900/40 max-w-full">
              
              {/* Header Bar */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap mb-2">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#065A50] border border-[#0A7367]/40 text-[10px] sm:text-[11px] font-bold text-emerald-200 uppercase tracking-widest font-montserrat shadow-xs shrink-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                    MONTHLY INSTALLMENT
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium text-emerald-300/80 font-montserrat flex items-center gap-1 shrink-0">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    Reducing Balance
                  </span>
                </div>

                <div className="mt-3 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-bricolage font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none drop-shadow-sm truncate max-w-full">
                    ₹ {formatINR(monthlyEmi)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-emerald-200/70 font-montserrat">/ month</span>
                </div>

                <p className="text-xs text-emerald-200/60 mt-2 sm:mt-2.5 font-montserrat flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  Calculated for {totalMonths} months tenure @ {interestRate}% p.a.
                </p>
              </div>

              {/* Donut Chart & Visual Breakdown */}
              <div className="my-4 sm:my-5 pt-4 sm:pt-5 border-t border-white/10 relative z-10 max-w-full overflow-hidden">
                <EmiDonutChart
                  amount={amount}
                  totalInterest={totalInterest}
                  principalPercent={principalPercent}
                  interestPercent={interestPercent}
                />
              </div>

              {/* Total Payable Summary Bar */}
              <div className="bg-[#044D45]/70 border border-[#086359]/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 mt-1 backdrop-blur-xs relative z-10 shadow-inner">
                <p className="text-[10px] sm:text-[11px] font-bold text-emerald-200/80 tracking-wider uppercase font-montserrat">
                  TOTAL AMOUNT PAYABLE
                </p>
                <p className="text-[10px] text-emerald-300/60 font-montserrat mt-0.5">
                  (Principal + Total Interest)
                </p>
                <p className="font-bricolage font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight mt-1 truncate">
                  ₹ {formatINR(totalPayment)}
                </p>
              </div>

              {/* Dynamic Context-Aware Tip Pill */}
              <div className="bg-[#044D45]/40 border border-[#086359]/40 rounded-xl p-2.5 sm:p-3 mt-3 sm:mt-4 flex items-start gap-2 sm:gap-2.5 relative z-10">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-emerald-100/90 font-montserrat leading-relaxed">
                  {tenureYears > 3
                    ? "Tip: Reducing tenure by 1 year cuts significant total interest outflow while slightly adjusting EMI."
                    : "Tip: A 3-year tenure provides an optimal balance between low monthly burden and minimal total interest."}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      activeConfig.label,
                      `Loan Amount: ₹${formatINR(amount)} • Rate: ${interestRate}% p.a. • Tenure: ${tenureYears} ${tenureUnit === "years" ? "Yrs" : "Mos"}`
                    )
                  }
                  className="w-full bg-linear-to-r from-[#CCA236] to-[#B69226] hover:from-[#DFC053] hover:to-[#B69226] text-black font-bricolage font-extrabold text-sm sm:text-base tracking-wide py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-[0.98] group cursor-pointer touch-manipulation min-h-12"
                >
                  <span>Apply for {activeConfig.label}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {/* Amortization schedule drawer trigger */}
                <button
                  type="button"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full text-center text-xs font-semibold text-emerald-200/80 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer py-1.5 font-montserrat touch-manipulation"
                >
                  <span>{showAmortization ? "Hide Yearly Schedule" : "View Yearly Amortization Schedule"}</span>
                  {showAmortization ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
                </button>
              </div>
            </div>

            {/* Value Props & Trust Badges Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-gray-150 shadow-xs flex flex-col gap-2.5 sm:gap-3 reveal-on-scroll delay-300">
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-bold text-gray-700 font-montserrat">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center shrink-0 border border-primary/15">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span>Zero hidden charges • 100% transparent comparison</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-bold text-gray-700 font-montserrat">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center shrink-0 border border-primary/15">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span>Instant paperless eligibility check with top partner banks</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-bold text-gray-700 font-montserrat">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-50 text-gold flex items-center justify-center shrink-0 border border-amber-200/50">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span>Zero impact on your CIBIL credit score</span>
              </div>
            </div>

          </div>
        </div>
np
        {/* ── Collapsible Yearly Amortization Schedule ─────────────────── */}
        {showAmortization && (
          <AmortizationTable
            tenureYears={tenureYears}
            totalPayment={totalPayment}
            yearlyBreakdown={yearlyBreakdown}
          />
        )}
      </div>
    </section>
  );
}
