"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Calculator,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Check,
  CheckCircle2,
  Zap,
  Plane,
  Utensils,
  ShoppingBag,
  Receipt,
  Gift,
  Sliders,
  Coins,
  Plus,
  Minus,
  CreditCard,
  Coffee,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardRewardCalculatorProps {
  card: CardStructure;
}

// Helper to parse numeric fee from string like "₹2,500 + GST", "Nil", "Free"
function parseFeeNumber(feeStr?: string): number {
  if (!feeStr) return 0;
  if (/nil|free|₹0|zero/i.test(feeStr)) return 0;
  const match = feeStr.replace(/,/g, "").match(/₹?\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Helper to parse fee waiver spend threshold
function parseWaiverThreshold(waiverStr?: string): number {
  if (!waiverStr) return 200000;
  const match = waiverStr.replace(/,/g, "").match(/₹?\s*(\d+(\.\d+)?)\s*(lakhs?|lakh|l|k|cr)?/i);
  if (!match) return 200000;
  const num = parseFloat(match[1]);
  const unit = (match[3] || "").toLowerCase();
  if (unit.startsWith("cr")) return Math.round(num * 10000000);
  if (unit.startsWith("l")) return Math.round(num * 100000);
  if (unit.startsWith("k")) return Math.round(num * 1000);
  return num > 1000 ? Math.round(num) : Math.round(num * 100000);
}

// Preset spend personas for instant 1-tap configuration
const SPEND_PERSONAS = [
  {
    label: "Essentials",
    monthly: 25000,
    ratio: 30,
    tag: "Groceries & Bills",
    description: "Daily essentials, utilities & routine retail",
  },
  {
    label: "Active Lifestyle",
    monthly: 50000,
    ratio: 45,
    tag: "Dining & Shopping",
    description: "Food delivery, weekend dining & online shopping",
  },
  {
    label: "Executive Spender",
    monthly: 100000,
    ratio: 60,
    tag: "Travel & E-Commerce",
    description: "Frequent domestic flights, gadgets & luxury dining",
  },
  {
    label: "Premium Globetrotter",
    monthly: 200000,
    ratio: 75,
    tag: "International & Luxury",
    description: "Global travel, 5-star hotels & heavy card usage",
  },
];

// Redemption channel options
type RedemptionChannel = "travel" | "cashback" | "vouchers";

export default function CardRewardCalculator({ card }: CardRewardCalculatorProps) {
  const { openApplyModal } = useApplyModal();
  const sectionRef = useRef<HTMLElement>(null);

  // Mode: "quick" (single slider + accelerated %) vs "detailed" (category breakdown)
  const [calcMode, setCalcMode] = useState<"quick" | "detailed">("quick");

  // Timeframe: Year 1 (includes welcome bonuses vs joining fee) vs Year 2+ (pure annual spend vs renewal fee)
  const [timeline, setTimeline] = useState<"year1" | "annual">("annual");

  // Selected redemption avenue
  const [redemption, setRedemption] = useState<RedemptionChannel>("travel");

  // Detailed breakdown accordion toggle for mobile/tablet clarity
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  // Quick mode states
  const [monthlySpend, setMonthlySpend] = useState<number>(50000);
  const [acceleratedRatio, setAcceleratedRatio] = useState<number>(45);

  // Dynamic fill percentages for sliders
  const monthlySpendPct = Math.min(100, Math.max(0, ((monthlySpend - 10000) / (250000 - 10000)) * 100));
  const acceleratedRatioPct = Math.min(100, Math.max(0, ((acceleratedRatio - 10) / (90 - 10)) * 100));

  // Detailed category spends
  const [categorySpends, setCategorySpends] = useState({
    travel: 12000,
    dining: 10000,
    shopping: 15000,
    utilities: 8000,
    groceries: 5000,
  });

  // Parse card financials
  const annualFeeNum = useMemo(() => parseFeeNumber(card.annualFee), [card.annualFee]);
  const joiningFeeNum = useMemo(() => parseFeeNumber(card.joiningFee), [card.joiningFee]);
  const waiverThreshold = useMemo(() => parseWaiverThreshold(card.feeWaiver), [card.feeWaiver]);

  // Parse reward rates
  const rewardRateHeadline = card.rewardRate?.headline || "3.5%";
  const headlinePercentMatch = rewardRateHeadline.match(/(\d+(\.\d+)?)%/);
  const maxRate = headlinePercentMatch ? parseFloat(headlinePercentMatch[1]) : 3.5;
  const baseRate = Math.max(1.0, parseFloat((maxRate * 0.35).toFixed(2)));

  // Welcome benefit monetary estimation
  const welcomeBenefitValue = useMemo(() => {
    if (!card.welcomeBenefits || card.welcomeBenefits.length === 0) return 0;
    // Check if any benefit mentions a rupee amount
    for (const benefit of card.welcomeBenefits) {
      const match = benefit.replace(/,/g, "").match(/₹\s*(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    // If joining fee exists, welcome vouchers usually match or exceed joining fee in India
    return joiningFeeNum > 0 ? joiningFeeNum : 1500;
  }, [card.welcomeBenefits, joiningFeeNum]);

  // Category multiplier multipliers based on card nature
  const categoryMultipliers = useMemo(() => {
    const isTravelCard = card.category?.some((c) => /travel|airline|fuel/i.test(c));
    const isShoppingCard = card.category?.some((c) => /cashback|shopping|rewards/i.test(c));

    return {
      travel: isTravelCard ? maxRate : Math.max(baseRate * 1.5, maxRate * 0.9),
      dining: maxRate * 0.9,
      shopping: isShoppingCard ? maxRate : maxRate * 0.85,
      utilities: baseRate,
      groceries: baseRate * 1.1,
    };
  }, [card.category, maxRate, baseRate]);

  // Synchronize category spends with quick mode
  const effectiveMonthlySpend = useMemo(() => {
    if (calcMode === "quick") {
      return monthlySpend;
    }
    return Object.values(categorySpends).reduce((acc, curr) => acc + curr, 0);
  }, [calcMode, monthlySpend, categorySpends]);

  // Category adjustment handler
  const handleCategoryChange = (key: keyof typeof categorySpends, value: number) => {
    const clamped = Math.max(0, Math.min(150000, value));
    setCategorySpends((prev) => ({ ...prev, [key]: clamped }));
  };

  // Stepper increment/decrement
  const stepCategory = (key: keyof typeof categorySpends, delta: number) => {
    setCategorySpends((prev) => {
      const nextVal = Math.max(0, Math.min(150000, prev[key] + delta));
      return { ...prev, [key]: nextVal };
    });
  };

  // Step quick monthly spend
  const stepMonthlySpend = (delta: number) => {
    setMonthlySpend((prev) => Math.max(10000, Math.min(300000, prev + delta)));
  };

  // Full Calculation Engine
  const {
    annualTotalSpend,
    annualGrossReward,
    isWaiverAchieved,
    waiverProgressPct,
    waiverRemainingSpend,
    applicableFee,
    netAnnualBenefit,
    pointsEstimate,
    effectiveYieldRate,
    redemptionMultiplier,
    tangiblePerk,
  } = useMemo(() => {
    const annualSpend = effectiveMonthlySpend * 12;

    let gross = 0;
    if (calcMode === "quick") {
      const accelAnnual = annualSpend * (acceleratedRatio / 100);
      const baseAnnual = annualSpend * ((100 - acceleratedRatio) / 100);
      gross = (accelAnnual * (maxRate / 100)) + (baseAnnual * (baseRate / 100));
    } else {
      const annualTravel = categorySpends.travel * 12;
      const annualDining = categorySpends.dining * 12;
      const annualShopping = categorySpends.shopping * 12;
      const annualUtilities = categorySpends.utilities * 12;
      const annualGroceries = categorySpends.groceries * 12;

      gross =
        (annualTravel * (categoryMultipliers.travel / 100)) +
        (annualDining * (categoryMultipliers.dining / 100)) +
        (annualShopping * (categoryMultipliers.shopping / 100)) +
        (annualUtilities * (categoryMultipliers.utilities / 100)) +
        (annualGroceries * (categoryMultipliers.groceries / 100));
    }

    // Redemption avenue rate multiplier
    let redMult = 1.0;
    if (redemption === "travel") {
      redMult = 1.25; // 25% higher value when transferred to airline miles or hotel points
    } else if (redemption === "vouchers") {
      redMult = 1.1; // 10% bonus when redeemed for curated gift cards
    } else {
      redMult = 1.0; // direct statement credit
    }

    const adjustedGrossReward = Math.round(gross * redMult);

    // Fee waiver computation
    const achieved = annualFeeNum === 0 || annualSpend >= waiverThreshold;
    const progress = waiverThreshold > 0 ? Math.min(100, Math.round((annualSpend / waiverThreshold) * 100)) : 100;
    const remaining = Math.max(0, waiverThreshold - annualSpend);

    // Applicable fee depending on Year 1 vs Year 2+
    let feeCharged = 0;
    let welcomeBonusCredit = 0;

    if (timeline === "year1") {
      feeCharged = joiningFeeNum;
      welcomeBonusCredit = welcomeBenefitValue;
    } else {
      feeCharged = achieved ? 0 : annualFeeNum;
      welcomeBonusCredit = 0;
    }

    const net = Math.round(adjustedGrossReward + welcomeBonusCredit - feeCharged);
    const yieldPct = annualSpend > 0 ? parseFloat(((net / annualSpend) * 100).toFixed(2)) : 0;
    const points = Math.round(gross * 2.5);

    // Dynamic real-world reward perks based on net savings
    let perk = {
      icon: Coffee,
      title: "Ott Subscriptions & Dining",
      detail: "Covers 1 year of Netflix, Spotify & multiple dinners out",
    };
    if (net >= 45000) {
      perk = {
        icon: Plane,
        title: "2x International Flight Tickets",
        detail: "Equivalent to 2 return flight tickets to Dubai or Bangkok",
      };
    } else if (net >= 22000) {
      perk = {
        icon: Plane,
        title: "2x Domestic Return Flights",
        detail: "Fly round-trip anywhere in India (e.g. Mumbai, Goa, Delhi)",
      };
    } else if (net >= 12000) {
      perk = {
        icon: ShoppingBag,
        title: "₹12,000+ Luxury Brand Vouchers",
        detail: "Amazon, Myntra, or Taj stay vouchers completely paid for",
      };
    } else if (net >= 6000) {
      perk = {
        icon: Utensils,
        title: "25+ Free Gourmet Meals on Swiggy",
        detail: "Enjoy weekly complimentary weekend dinners & cafe treats",
      };
    }

    return {
      annualTotalSpend: annualSpend,
      annualGrossReward: adjustedGrossReward,
      isWaiverAchieved: achieved,
      waiverProgressPct: progress,
      waiverRemainingSpend: remaining,
      applicableFee: feeCharged,
      netAnnualBenefit: net,
      pointsEstimate: points,
      effectiveYieldRate: yieldPct,
      redemptionMultiplier: redMult,
      tangiblePerk: perk,
    };
  }, [
    effectiveMonthlySpend,
    calcMode,
    acceleratedRatio,
    maxRate,
    baseRate,
    categorySpends,
    categoryMultipliers,
    redemption,
    annualFeeNum,
    waiverThreshold,
    timeline,
    joiningFeeNum,
    welcomeBenefitValue,
  ]);

  return (
    <section
      ref={sectionRef}
      id="rewards-calculator"
      aria-label="Rewards & Savings Calculator"
      className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-3.5 sm:px-6 md:px-8 border-t border-gray-200/90 relative"
    >
      {/* ── Branded Header Section ── */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Calculator className="w-4 h-4 text-gold shrink-0" />
          <span>GROFI REWARD ENGINE™ • DYNAMIC YIELD SIMULATOR</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight wrap-break-word">
          Uncover Your True Net Yield with the{" "}
          <span className="text-primary underline decoration-gold/40 decoration-wavy decoration-2 underline-offset-4">
            {card.name}
          </span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-2.5 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
          Financially calibrated for {card.issuer} reward policies. Simulate your real spending habits, unlock milestone fee waivers, and forecast pure rupee savings.
        </p>

        {/* Mode Switcher Pills (Responsive 2-col on mobile, inline on desktop) */}
        <div className="mt-5 sm:mt-8 grid grid-cols-2 w-full max-w-sm mx-auto sm:max-w-none sm:w-auto sm:inline-flex p-1 bg-gray-100/90 rounded-2xl border border-gray-200 text-xs font-montserrat font-bold shadow-2xs">
          <button
            type="button"
            onClick={() => setCalcMode("quick")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-xl transition-all cursor-pointer text-center ${
              calcMode === "quick"
                ? "bg-white text-primary shadow-xs font-extrabold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Zap className={`w-3.5 h-3.5 shrink-0 ${calcMode === "quick" ? "text-gold" : "text-gray-400"}`} />
            <span className="sm:hidden text-xs">Quick Mode</span>
            <span className="hidden sm:inline">Quick Lifestyle Estimator</span>
          </button>
          
          <button
            type="button"
            onClick={() => setCalcMode("detailed")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-xl transition-all cursor-pointer text-center ${
              calcMode === "detailed"
                ? "bg-white text-primary shadow-xs font-extrabold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sliders className={`w-3.5 h-3.5 shrink-0 ${calcMode === "detailed" ? "text-gold" : "text-gray-400"}`} />
            <span className="sm:hidden text-xs">By Category</span>
            <span className="hidden sm:inline">Category Deep-Dive</span>
          </button>
        </div>
      </div>

      {/* ── Main Interactive Cockpit Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
        
        {/* ══════════════════════════════════════════════════════════════
            LEFT PANEL: SPEND CONFIGURATION ENGINE (7 cols)
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/90 shadow-sm space-y-6 sm:space-y-8">
          
          {/* Quick Mode Spend Setup */}
          {calcMode === "quick" ? (
            <div className="space-y-6">
              
              {/* Monthly Spend Slider + Stepper Header */}
              <div>
                <div className="space-y-2.5 mb-3">
                  <div>
                    <label
                      htmlFor="monthly-spend-slider"
                      className="text-xs font-bold text-gray-700 uppercase tracking-wider font-montserrat flex items-center gap-1.5"
                    >
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span>Estimated Monthly Card Spends</span>
                    </label>
                    <span className="text-[11px] text-gray-500 font-montserrat block">
                      Total planned card transactions per month
                    </span>
                  </div>

                  {/* High-visibility display with tap +/- steppers in a framed dial */}
                  <div className="flex items-center justify-between bg-gray-50/90 rounded-2xl p-2 sm:p-2.5 border border-gray-200/90 shadow-2xs">
                    <button
                      type="button"
                      aria-label="Decrease monthly spend by 5,000"
                      onClick={() => stepMonthlySpend(-5000)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200 shadow-2xs shrink-0 active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <div className="text-center px-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-montserrat leading-none">
                        Selected Monthly Spend
                      </span>
                      <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-primary block mt-0.5">
                        ₹{monthlySpend.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Increase monthly spend by 5,000"
                      onClick={() => stepMonthlySpend(5000)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200 shadow-2xs shrink-0 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="relative py-2">
                  <input
                    id="monthly-spend-slider"
                    type="range"
                    min={10000}
                    max={250000}
                    step={5000}
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    aria-valuemin={10000}
                    aria-valuemax={250000}
                    aria-valuenow={monthlySpend}
                    aria-label="Monthly card spend slider"
                    className="w-full custom-range-slider cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${monthlySpendPct}%, #E2E8F0 ${monthlySpendPct}%, #E2E8F0 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 font-montserrat font-medium mt-1.5">
                    <span>₹10k / mo</span>
                    <span className="hidden sm:inline">₹1.25L / mo</span>
                    <span>₹2.5L+ / mo</span>
                  </div>
                </div>

                {/* Spend Persona Chips */}
                <div className="mt-4">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 font-montserrat">
                    Quick Persona Presets
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SPEND_PERSONAS.map((persona) => {
                      const isSelected = monthlySpend === persona.monthly;
                      return (
                        <button
                          key={persona.label}
                          type="button"
                          onClick={() => {
                            setMonthlySpend(persona.monthly);
                            setAcceleratedRatio(persona.ratio);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-18.5 ${
                            isSelected
                              ? "bg-primary/5 border-primary text-primary shadow-xs ring-1 ring-primary"
                              : "bg-gray-50/80 hover:bg-gray-100 border-gray-200/90 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold font-montserrat truncate">{persona.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                          </div>
                          <span className="text-sm sm:text-base font-bricolage font-extrabold mt-0.5">
                            ₹{(persona.monthly / 1000).toFixed(0)}k/mo
                          </span>
                          <span className="text-[10px] text-gray-500 font-montserrat truncate mt-0.5">
                            {persona.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Accelerated Spends Ratio Slider */}
              <div className="pt-5 border-t border-gray-100">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="accelerated-spend-ratio"
                      className="text-xs font-bold text-gray-700 uppercase tracking-wider font-montserrat flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Online &amp; High-Reward Spends</span>
                    </label>
                    <span className="text-[11px] text-gray-500 font-montserrat block truncate">
                      (Flights, dining, Swiggy, Amazon &amp; shopping)
                    </span>
                  </div>
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 shrink-0">
                    {acceleratedRatio}%
                  </span>
                </div>

                <input
                  id="accelerated-spend-ratio"
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={acceleratedRatio}
                  onChange={(e) => setAcceleratedRatio(Number(e.target.value))}
                  aria-valuemin={10}
                  aria-valuemax={90}
                  aria-valuenow={acceleratedRatio}
                  aria-label="Percentage of spending in accelerated reward categories"
                  className="w-full custom-range-slider custom-range-slider-emerald cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #059669 0%, #059669 ${acceleratedRatioPct}%, #E2E8F0 ${acceleratedRatioPct}%, #E2E8F0 100%)`,
                  }}
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-montserrat font-medium mt-1">
                  <span>10% (Mostly Offline)</span>
                  <span className="hidden sm:inline">50% Balanced</span>
                  <span>90% (Heavy Online)</span>
                </div>
              </div>

            </div>
          ) : (
            /* Detailed Category Deep-Dive Mode */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900">
                    Custom Monthly Category Allocation
                  </h3>
                  <p className="text-xs text-gray-500 font-montserrat">
                    Fine-tune specific spends to mirror your actual card statement
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 font-montserrat uppercase font-bold block">
                    Combined Monthly
                  </span>
                  <span className="font-bricolage font-extrabold text-xl sm:text-2xl text-primary">
                    ₹{effectiveMonthlySpend.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* 5 Categories */}
              {[
                {
                  id: "travel" as const,
                  label: "Travel, Flights & Hotels",
                  icon: Plane,
                  color: "text-sky-600 bg-sky-50 border-sky-100",
                  multiplier: categoryMultipliers.travel,
                  hint: "Airlines, MakeMyTrip, Agoda, Uber",
                },
                {
                  id: "dining" as const,
                  label: "Dining & Food Delivery",
                  icon: Utensils,
                  color: "text-amber-600 bg-amber-50 border-amber-100",
                  multiplier: categoryMultipliers.dining,
                  hint: "Swiggy, Zomato, fine dining & cafes",
                },
                {
                  id: "shopping" as const,
                  label: "E-Commerce & Retail",
                  icon: ShoppingBag,
                  color: "text-purple-600 bg-purple-50 border-purple-100",
                  multiplier: categoryMultipliers.shopping,
                  hint: "Amazon, Flipkart, Myntra, apparel",
                },
                {
                  id: "utilities" as const,
                  label: "Utilities & Bill Payments",
                  icon: Receipt,
                  color: "text-blue-600 bg-blue-50 border-blue-100",
                  multiplier: categoryMultipliers.utilities,
                  hint: "Electricity, mobile, broadband & fuel",
                },
                {
                  id: "groceries" as const,
                  label: "Groceries & Supermarkets",
                  icon: Coffee,
                  color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                  multiplier: categoryMultipliers.groceries,
                  hint: "Blinkit, Zepto, Instamart, supermarkets",
                },
              ].map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gray-50/70 border border-gray-200/80 space-y-2.5 transition-all hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${cat.color} shrink-0`}>
                        <cat.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-montserrat font-bold text-xs sm:text-sm text-gray-900 block">
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-gray-500 font-montserrat">
                          {cat.hint} • <span className="font-semibold text-primary">{cat.multiplier.toFixed(1)}% yield</span>
                        </span>
                      </div>
                    </div>

                    {/* Stepper + Display */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        type="button"
                        aria-label={`Decrease ${cat.label} by 1,000`}
                        onClick={() => stepCategory(cat.id, -1000)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bricolage font-extrabold text-sm sm:text-base text-gray-900 min-w-18 text-center bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                        ₹{categorySpends[cat.id].toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${cat.label} by 1,000`}
                        onClick={() => stepCategory(cat.id, 1000)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={60000}
                    step={1000}
                    value={categorySpends[cat.id]}
                    onChange={(e) => handleCategoryChange(cat.id, Number(e.target.value))}
                    aria-label={`${cat.label} spend slider`}
                    className="w-full custom-range-slider cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #02474D 0%, #02474D ${Math.min(100, Math.max(0, (categorySpends[cat.id] / 60000) * 100))}%, #E2E8F0 ${Math.min(100, Math.max(0, (categorySpends[cat.id] / 60000) * 100))}%, #E2E8F0 100%)`,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Redemption Channel Selector ── */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider font-montserrat flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-gold" />
                <span>Preferred Redemption Avenue</span>
              </span>
              <span className="text-[11px] text-gray-500 font-montserrat">
                (Dictates conversion value per reward point)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: "travel" as const,
                  label: "AirMiles & Flights",
                  badge: "Highest Return (~1.25x)",
                  icon: Plane,
                  desc: "Air India, Singapore Krisflyer, Marriott",
                },
                {
                  id: "vouchers" as const,
                  label: "Brand Vouchers",
                  badge: "Popular (~1.1x)",
                  icon: Gift,
                  desc: "Amazon, Swiggy, Flipkart, Myntra",
                },
                {
                  id: "cashback" as const,
                  label: "Statement Credit",
                  badge: "Direct Cash (1.0x)",
                  icon: Receipt,
                  desc: "Direct reduction against monthly bill",
                },
              ].map((opt) => {
                const isActive = redemption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRedemption(opt.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? "bg-primary/5 border-primary text-primary ring-1 ring-primary shadow-2xs"
                        : "bg-gray-50/70 hover:bg-gray-100/80 border-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <opt.icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-gray-500"}`} />
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? "bg-primary text-white" : "bg-gray-200/70 text-gray-600"
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <span className="font-montserrat font-bold text-xs">{opt.label}</span>
                    <span className="text-[10px] text-gray-500 font-montserrat mt-0.5 line-clamp-1">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Official Reward Structure Micro-Specs ── */}
          {card.rewardRate && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/90 border border-gray-200 text-xs font-montserrat space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Card Reward Engine Specs</span>
                </span>
                <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full border border-gray-200 font-bold text-primary">
                  Currency: {card.rewardRate.rewardCurrency || "Reward Points"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-gray-700">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Standard Base Yield</span>
                  <span className="font-bold text-gray-900 text-xs block mt-0.5">
                    {card.rewardRate.base || `${baseRate}% on regular retail spends`}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Accelerated / Partner Multiplier</span>
                  <span className="font-bold text-emerald-800 text-xs block mt-0.5">
                    {card.rewardRate.accelerated || `${maxRate}% on accelerated categories`}
                  </span>
                </div>
              </div>

              {card.rewardRate.pointValue && (
                <p className="text-[11px] text-gray-500 italic">
                  * Official Point Value: {card.rewardRate.pointValue}
                </p>
              )}
            </div>
          )}

        </div>


        {/* ══════════════════════════════════════════════════════════════
            RIGHT PANEL: THE REWARD PASSPORT & YIELD STATEMENT (5 cols)
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 bg-linear-to-br from-[#023338] via-[#02474D] to-[#012225] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-primary/50">
          
          {/* Ambient Luxury Glow Accents */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-gold/15 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 space-y-6">
            
            {/* Header: Timeline Switcher (Year 1 vs Annual Renewal) */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-gold font-montserrat border border-gold/20">
                <TrendingUp className="w-3.5 h-3.5 text-gold" />
                <span>Projected Yield Statement</span>
              </div>

              {/* Year 1 vs Year 2 Toggle */}
              <div className="inline-flex bg-black/20 p-0.5 rounded-lg border border-white/10 text-[10px] font-montserrat font-bold">
                <button
                  type="button"
                  onClick={() => setTimeline("year1")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    timeline === "year1" ? "bg-gold text-white font-extrabold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Year 1 (Bonus)
                </button>
                <button
                  type="button"
                  onClick={() => setTimeline("annual")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    timeline === "annual" ? "bg-gold text-white font-extrabold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Subsequent Years
                </button>
              </div>
            </div>

            {/* Net Savings Display */}
            <div>
              <span className="block text-xs font-montserrat text-white/70 uppercase tracking-widest font-bold">
                Net Annual Value &amp; Savings
              </span>
              
              <div className="flex items-baseline gap-3 mt-1 flex-wrap">
                <span className="font-bricolage font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                  ₹{netAnnualBenefit.toLocaleString("en-IN")}
                </span>
                
                {effectiveYieldRate > 0 && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-xs font-montserrat font-extrabold">
                    <Zap className="w-3 h-3 text-emerald-300" />
                    <span>{effectiveYieldRate}% Net Return</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-white/70 font-montserrat mt-2">
                Calculated on annual spending of{" "}
                <strong className="text-white">₹{annualTotalSpend.toLocaleString("en-IN")}</strong>.
              </p>
            </div>

            {/* ── Fee Waiver Progress Meter ── */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5 font-montserrat text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white/90 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  <span>Annual Fee Waiver Goal</span>
                </span>
                <span className="text-[11px] font-bold text-gold">
                  {isWaiverAchieved ? "100% Waived!" : `${waiverProgressPct}% Reached`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isWaiverAchieved
                      ? "bg-linear-to-r from-emerald-400 to-emerald-300 shadow-sm"
                      : "bg-linear-to-r from-gold to-amber-300"
                  }`}
                  style={{ width: `${waiverProgressPct}%` }}
                />
              </div>

              <div className="flex items-start justify-between text-[11px] text-white/80">
                <span>Target: ₹{(waiverThreshold / 100000).toFixed(1)}L/yr</span>
                {isWaiverAchieved ? (
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Renewal Fee: ₹0</span>
                  </span>
                ) : (
                  <span className="text-amber-200">
                    Spend ₹{waiverRemainingSpend.toLocaleString("en-IN")} more to waive ₹{annualFeeNum}
                  </span>
                )}
              </div>
            </div>

            {/* ── Real-World Perk Equivalent Card ── */}
            <div className="p-4 rounded-2xl bg-linear-to-r from-white/10 via-white/15 to-white/10 border border-white/20 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gold/25 border border-gold/40 flex items-center justify-center shrink-0">
                <tangiblePerk.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-gold block font-montserrat tracking-wider">
                  Real-World Tangible Value
                </span>
                <span className="font-bricolage font-bold text-white text-sm sm:text-base block truncate">
                  {tangiblePerk.title}
                </span>
                <span className="text-[11px] text-white/75 font-montserrat block truncate">
                  {tangiblePerk.detail}
                </span>
              </div>
            </div>

            {/* ── Calculation Audit Breakdown ── */}
            <div className="space-y-2 pt-4 border-t border-white/15 text-xs font-montserrat">
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Gross Rewards Back</span>
                <span className="font-bold text-emerald-300 font-bricolage text-sm">
                  +₹{annualGrossReward.toLocaleString("en-IN")}
                </span>
              </div>

              {timeline === "year1" && welcomeBenefitValue > 0 && (
                <div className="flex items-center justify-between text-gold">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3 h-3 text-gold" />
                    <span>Welcome Gift / Vouchers</span>
                  </span>
                  <span className="font-bold font-bricolage text-sm">
                    +₹{welcomeBenefitValue.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-white/70">
                  {timeline === "year1" ? "Joining / Setup Fee" : "Annual Renewal Fee"}
                </span>
                <span className="font-bold font-bricolage text-sm">
                  {applicableFee === 0 ? (
                    <span className="text-emerald-300">₹0 (Waived / Free)</span>
                  ) : (
                    <span className="text-rose-300">-₹{applicableFee.toLocaleString("en-IN")}</span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-white/70">Projected Points Yield</span>
                <span className="font-bold text-gold">
                  ~{pointsEstimate.toLocaleString("en-IN")} {card.rewardRate?.rewardCurrency || "Pts"}
                </span>
              </div>
            </div>

            {/* Collapsible Explanatory Formula on Mobile/Desktop */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="w-full flex items-center justify-between text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer py-1"
              >
                <span>How is this calculated?</span>
                {showFormulaDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showFormulaDetails && (
                <div className="mt-2 p-3 rounded-xl bg-black/25 text-[11px] text-white/80 space-y-1.5 font-montserrat leading-relaxed border border-white/10">
                  <p>
                    • <strong>Gross Yield:</strong> Spends mapped against official {card.issuer} base rate ({baseRate}%) and accelerated multipliers ({maxRate}%).
                  </p>
                  <p>
                    • <strong>Fee Waiver:</strong> Automatically reverses annual fee when annual card volume reaches the ₹{(waiverThreshold / 100000).toFixed(1)}L milestone.
                  </p>
                  <p>
                    • <strong>Redemption Channel:</strong> {redemption.toUpperCase()} avenue applies a {redemptionMultiplier}x dynamic conversion efficiency factor.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* ── High-Conversion Apply Trigger Button ── */}
          <div className="mt-8 relative z-10">
            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  card.name,
                  `Estimated Annual Net Savings: ₹${netAnnualBenefit.toLocaleString("en-IN")}`
                )
              }
              className="w-full bg-linear-to-r from-gold via-[#C5A038] to-gold hover:from-[#C5A038] hover:to-gold text-white font-montserrat font-bold text-xs sm:text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-98 group"
            >
              <span>Apply for {card.name}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[10px] text-center text-white/60 font-montserrat mt-2">
              Instant Bank Approval • Zero CIBIL Impact Check
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
