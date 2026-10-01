"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Crown,
  Plane,
  Zap,
  ShieldCheck,
  Percent,
  Tag,
  Utensils,
  Check,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Coins,
  Globe,
  RefreshCw,
  Search,
  Scale,
  Gift,
} from "lucide-react";
import { getAllBankFeatures, BankFeaturesAndBenefits } from "@/libs/bankFeaturesData";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import CreditCardFAQSection from "./CreditCardFAQSection";

export default function AllBanksFeaturesExplorer() {
  const { openApplyModal } = useApplyModal();
  const allBanks = useMemo(() => getAllBankFeatures(), []);

  const [selectedBankSlug, setSelectedBankSlug] = useState<string>("hdfc-bank");
  const [activeTab, setActiveTab] = useState<"detail" | "compare">("detail");
  const [featureCategory, setFeatureCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const currentBank: BankFeaturesAndBenefits = useMemo(() => {
    return (
      allBanks.find((b) => b.slug === selectedBankSlug) ||
      allBanks[0]
    );
  }, [allBanks, selectedBankSlug]);

  const filteredFeatures = useMemo(() => {
    let list = currentBank.features;
    if (featureCategory !== "all") {
      if (featureCategory === "waivers") {
        list = list.filter((f) => f.category === "waiver" || f.category === "protection");
      } else {
        list = list.filter((f) => f.category === featureCategory);
      }
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q) ||
          f.tag.toLowerCase().includes(q) ||
          f.benefits.some((b) => b.toLowerCase().includes(q))
      );
    }
    return list;
  }, [currentBank, featureCategory, searchFilter]);

  const getFeatureIcon = (category: string) => {
    switch (category) {
      case "rewards":
        return <Percent className="w-5 h-5 text-amber-600" />;
      case "travel":
        return <Plane className="w-5 h-5 text-sky-600" />;
      case "dining":
        return <Utensils className="w-5 h-5 text-emerald-600" />;
      case "upi":
        return <Zap className="w-5 h-5 text-violet-600" />;
      case "waiver":
        return <Tag className="w-5 h-5 text-teal-600" />;
      case "protection":
        return <ShieldCheck className="w-5 h-5 text-primary" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold" />;
    }
  };

  const getIconBackground = (category: string) => {
    switch (category) {
      case "rewards":
        return "bg-amber-50 border-amber-200";
      case "travel":
        return "bg-sky-50 border-sky-200";
      case "dining":
        return "bg-emerald-50 border-emerald-200";
      case "upi":
        return "bg-violet-50 border-violet-200";
      case "waiver":
        return "bg-teal-50 border-teal-200";
      case "protection":
        return "bg-emerald-50 border-primary/20";
      default:
        return "bg-amber-50 border-amber-200";
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>COMPREHENSIVE DIRECTORY</span>
        </div>

        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Credit Card Features &amp; Benefits by Bank
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2 leading-relaxed">
          Compare reward accelerators, airport lounge privileges, RuPay UPI features, and annual fee waivers across India&apos;s top 10 credit card issuing banks.
        </p>
      </div>

      {/* ── Top Level View Switcher (Bank Deep Dive vs 10-Bank Comparison Matrix) ── */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
          <button
            onClick={() => setActiveTab("detail")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-montserrat transition-all cursor-pointer ${activeTab === "detail"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-600 hover:text-gray-900"
              }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Bank-by-Bank Deep Dive</span>
          </button>
          <button
            onClick={() => setActiveTab("compare")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-montserrat transition-all cursor-pointer ${activeTab === "compare"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-600 hover:text-gray-900"
              }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>10-Bank Comparison Matrix</span>
          </button>
        </div>
      </div>

      {/* ── Bank Selector Bar (Active in Detail View) ──────────────── */}
      {activeTab === "detail" && (
        <>
          <div className="mb-8">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block font-montserrat mb-3 text-center">
              Select an issuing bank to inspect features &amp; benefits
            </span>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-3 no-scrollbar sm:justify-center">
              {allBanks.map((b) => {
                const isSelected = b.slug === selectedBankSlug;
                return (
                  <button
                    key={b.slug}
                    onClick={() => {
                      setSelectedBankSlug(b.slug);
                      setFeatureCategory("all");
                    }}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer shrink-0 font-montserrat ${isSelected
                        ? "bg-white border-primary shadow-md ring-2 ring-primary/20 text-primary font-bold"
                        : "bg-white/80 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-white"
                      }`}
                  >
                    <div className="w-5 h-5 relative shrink-0">
                      <Image
                        src={b.logo}
                        alt={b.bankName}
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs whitespace-nowrap">{b.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Active Bank Header Banner ─────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FDFBF7] p-2 border border-gray-200 shrink-0 flex items-center justify-center">
                  <Image
                    src={currentBank.logo}
                    alt={currentBank.bankName}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bricolage font-extrabold text-2xl text-gray-900">
                      {currentBank.bankName}
                    </h3>
                    <span className="bg-[#EBF4ED] text-primary text-[10px] font-bold px-2 py-0.5 rounded-full font-montserrat">
                      Official Partner
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-montserrat font-medium">
                    {currentBank.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Link
                  href={`/credit-cards/${currentBank.slug}`}
                  className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-primary border border-primary/25 font-montserrat font-semibold text-xs py-2.5 px-4 rounded-xl shadow-2xs transition-all"
                >
                  <span>View All {currentBank.shortName} Cards</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() =>
                    openApplyModal(
                      `${currentBank.bankName} Pre-Approved Cards`,
                      "Instant soft eligibility check across all verified cards"
                    )
                  }
                  className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bank Key Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
              <div className="bg-[#FDFBF7] p-3 rounded-2xl border border-gray-200/80">
                <span className="text-[10px] uppercase font-bold text-gray-400 font-montserrat block">
                  Top Reward Rate
                </span>
                <p className="font-bricolage font-bold text-sm text-gray-900 mt-0.5">
                  {currentBank.keyMetrics.maxRewardRate}
                </p>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate">
                  {currentBank.keyMetrics.rewardCurrency}
                </span>
              </div>

              <div className="bg-[#FDFBF7] p-3 rounded-2xl border border-gray-200/80">
                <span className="text-[10px] uppercase font-bold text-gray-400 font-montserrat block">
                  Airport Lounges
                </span>
                <p className="font-bricolage font-bold text-sm text-gray-900 mt-0.5 truncate">
                  {currentBank.keyMetrics.domesticLounge.split("(")[0].trim()}
                </p>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate">
                  Priority Pass / DreamFolks
                </span>
              </div>

              <div className="bg-[#FDFBF7] p-3 rounded-2xl border border-gray-200/80">
                <span className="text-[10px] uppercase font-bold text-gray-400 font-montserrat block">
                  RuPay UPI Float
                </span>
                <p className="font-bricolage font-bold text-sm text-gray-900 mt-0.5">
                  Scan &amp; Pay Active
                </p>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate">
                  50-day interest-free
                </span>
              </div>

              <div className="bg-[#FDFBF7] p-3 rounded-2xl border border-gray-200/80">
                <span className="text-[10px] uppercase font-bold text-gray-400 font-montserrat block">
                  Forex Markup
                </span>
                <p className="font-bricolage font-bold text-sm text-gray-900 mt-0.5">
                  {currentBank.keyMetrics.forexMarkup}
                </p>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate">
                  Global currency markup
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-[#FDFBF7] p-3 rounded-2xl border border-gray-200/80">
                <span className="text-[10px] uppercase font-bold text-gray-400 font-montserrat block">
                  Annual Fee Waiver
                </span>
                <p className="font-bricolage font-bold text-sm text-gray-900 mt-0.5 truncate">
                  {currentBank.keyMetrics.feeWaiver.split("annual")[0].trim()}
                </p>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate">
                  Spend waiver policy
                </span>
              </div>
            </div>
          </div>

          {/* ── Sub-Filters & Search ──────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
              {[
                { id: "all", label: "All Perks" },
                { id: "rewards", label: "Rewards" },
                { id: "travel", label: "Lounges & Travel" },
                { id: "dining", label: "Dining & Movies" },
                { id: "upi", label: "RuPay UPI" },
                { id: "waivers", label: "Waivers & Safety" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFeatureCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-montserrat transition-all cursor-pointer whitespace-nowrap ${featureCategory === tab.id
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search features (e.g. cashback, lounge)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl font-montserrat focus:outline-hidden focus:ring-1 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* ── Feature Cards Grid ────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredFeatures.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${getIconBackground(
                        f.category
                      )}`}
                    >
                      {getFeatureIcon(f.category)}
                    </div>
                    <span className="bg-[#EBF4ED] text-primary text-[10px] font-bold px-2.5 py-1 rounded-full font-montserrat border border-primary/10 tracking-wide uppercase">
                      {f.tag}
                    </span>
                  </div>

                  <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-4">
                    {f.summary}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {f.benefits.map((b, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-700 font-montserrat leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-montserrat tracking-wider mb-0.5">
                    Best Suited For
                  </span>
                  <p className="text-[11px] font-medium text-gray-800 font-montserrat">
                    {f.bestSuitedFor}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Deep Dive Columns: Rewards & Travel ──────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-linear-to-br from-amber-50/50 via-white to-white p-6 rounded-3xl border border-amber-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider font-montserrat mb-2">
                <Coins className="w-4 h-4" />
                <span>Rewards &amp; Multipliers</span>
              </div>
              <h4 className="font-bricolage font-bold text-lg text-gray-900 mb-2">
                {currentBank.rewardsEcosystem.programName}
              </h4>
              <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-4">
                {currentBank.rewardsEcosystem.rateSummary}
              </p>

              <div className="mb-4 bg-white/80 p-3 rounded-2xl border border-amber-100">
                <span className="text-[10px] uppercase font-bold text-gray-500 font-montserrat block">
                  Point Cash Value
                </span>
                <p className="text-xs font-semibold text-gray-800 font-montserrat mt-0.5">
                  {currentBank.rewardsEcosystem.pointValuation}
                </p>
              </div>

              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold text-gray-500 font-montserrat block mb-1.5">
                  Accelerated Partners
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentBank.rewardsEcosystem.acceleratedPartners.map((partner, i) => (
                    <span
                      key={i}
                      className="bg-amber-100/70 text-amber-900 text-[11px] font-medium px-2.5 py-1 rounded-lg font-montserrat"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 font-montserrat block mb-1.5">
                  Redemption Options
                </span>
                <ul className="space-y-1 text-xs text-gray-700 font-montserrat">
                  {currentBank.rewardsEcosystem.redemptionOptions.map((opt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-600" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-linear-to-br from-sky-50/50 via-white to-white p-6 rounded-3xl border border-sky-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider font-montserrat mb-2">
                <Plane className="w-4 h-4" />
                <span>Airport Lounges &amp; Travel Privileges</span>
              </div>
              <h4 className="font-bricolage font-bold text-lg text-gray-900 mb-2">
                Domestic &amp; Global Lounge Policy
              </h4>
              <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-4">
                Relax in comfort before your flight with verified airport lounge access guidelines.
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
                  <span className="text-[10px] uppercase font-bold text-sky-800 font-montserrat block">
                    Domestic Terminals
                  </span>
                  <p className="text-xs text-gray-800 font-montserrat mt-0.5">
                    {currentBank.loungeAndTravel.domestic}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
                  <span className="text-[10px] uppercase font-bold text-sky-800 font-montserrat block">
                    International Visits
                  </span>
                  <p className="text-xs text-gray-800 font-montserrat mt-0.5">
                    {currentBank.loungeAndTravel.international}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
                  <span className="text-[10px] uppercase font-bold text-sky-800 font-montserrat block">
                    Spend Condition
                  </span>
                  <p className="text-xs text-gray-800 font-montserrat mt-0.5">
                    {currentBank.loungeAndTravel.spendCondition}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-600 font-montserrat">
                <RefreshCw className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{currentBank.waiversAndMilestones.fuelSurchargeWaiver}</span>
              </div>
            </div>
          </div>

          {/* ── Flagship Cards Spotlight ──────────────────────────────── */}
          {currentBank.flagshipCards.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary font-montserrat uppercase tracking-wider mb-1">
                    <Gift className="w-3.5 h-3.5 text-gold" />
                    <span>Top Flagship Card Lineup</span>
                  </div>
                  <h3 className="font-bricolage font-bold text-xl text-gray-900">
                    Flagship {currentBank.bankName} Cards
                  </h3>
                </div>
                <Link
                  href={`/credit-cards/${currentBank.slug}`}
                  className="text-xs font-bold text-primary hover:underline font-montserrat inline-flex items-center gap-1"
                >
                  <span>View all cards in {currentBank.shortName}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentBank.flagshipCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FDFBF7] border border-gray-200/80 hover:border-primary/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700 font-montserrat">
                          {card.category}
                        </span>
                        <span className="text-xs font-bold text-primary font-montserrat">
                          {card.annualFee}
                        </span>
                      </div>
                      <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-1">
                        {card.name}
                      </h4>
                      <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-3">
                        {card.highlight}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 font-montserrat font-medium">
                        Soft inquiry
                      </span>
                      <button
                        onClick={() =>
                          openApplyModal(
                            card.name,
                            `${currentBank.bankName} • ${card.category}`
                          )
                        }
                        className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold py-1 px-3 rounded-lg shadow-2xs transition-all cursor-pointer font-montserrat"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── 10-Bank Comparison Matrix View ────────────────────────── */}
      {activeTab === "compare" && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-[#FDFBF7]">
            <h3 className="font-bricolage font-bold text-xl text-gray-900">
              Side-by-Side Feature Comparison: All 10 Partner Banks
            </h3>
            <p className="text-xs text-gray-600 font-montserrat mt-1">
              Compare max reward rates, airport lounge networks, RuPay UPI features, forex markups, and fee waiver rules across every scheduled bank.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-montserrat">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-4 font-bold sticky left-0 bg-gray-50 z-10">Bank</th>
                  <th className="py-4 px-4 font-bold min-w-[140px]">Top Reward Rate</th>
                  <th className="py-4 px-4 font-bold min-w-[160px]">Airport Lounges</th>
                  <th className="py-4 px-4 font-bold min-w-[130px]">RuPay UPI</th>
                  <th className="py-4 px-4 font-bold min-w-[120px]">Forex Markup</th>
                  <th className="py-4 px-4 font-bold min-w-[180px]">Annual Fee Waiver</th>
                  <th className="py-4 px-4 font-bold text-right min-w-[120px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allBanks.map((bank) => (
                  <tr key={bank.slug} className="hover:bg-gray-50/60 transition-colors">
                    {/* Bank Name & Logo */}
                    <td className="py-4 px-4 sticky left-0 bg-white hover:bg-gray-50/60 z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 relative shrink-0">
                          <Image
                            src={bank.logo}
                            alt={bank.bankName}
                            width={28}
                            height={28}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block whitespace-nowrap">
                            {bank.shortName}
                          </span>
                          <span className="text-[10px] text-gray-400 block truncate max-w-[120px]">
                            {bank.tagline.split(":")[0]}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Top Reward Rate */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-emerald-700 block">
                        {bank.keyMetrics.maxRewardRate}
                      </span>
                      <span className="text-[10px] text-gray-500 block">
                        {bank.keyMetrics.rewardCurrency.split("/")[0]}
                      </span>
                    </td>

                    {/* Airport Lounges */}
                    <td className="py-4 px-4 text-gray-700">
                      <span className="font-medium block">
                        {bank.keyMetrics.domesticLounge.split("(")[0].trim()}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Priority Pass / DreamFolks
                      </span>
                    </td>

                    {/* RuPay UPI */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 text-[11px] font-bold px-2 py-0.5 rounded-md border border-violet-200">
                        <Zap className="w-3 h-3" />
                        <span>Enabled</span>
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        50-day credit float
                      </span>
                    </td>

                    {/* Forex Markup */}
                    <td className="py-4 px-4 font-semibold text-gray-800">
                      {bank.keyMetrics.forexMarkup}
                    </td>

                    {/* Annual Fee Waiver */}
                    <td className="py-4 px-4 text-gray-600">
                      <span className="block font-medium">
                        {bank.keyMetrics.feeWaiver}
                      </span>
                    </td>

                    {/* Action Link */}
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/credit-cards/${bank.slug}`}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-bold text-xs font-montserrat hover:underline"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── REIMAGINED CREDIT CARD GUIDE & FAQ SECTION ───────────────── */}
      <CreditCardFAQSection
        onCheckOffers={() =>
          openApplyModal(
            "Credit Card Pre-Approved Offers",
            "Check pre-approved luxury, travel, and cashback credit cards tailored for you."
          )
        }
      />
    </section>
  );
}
