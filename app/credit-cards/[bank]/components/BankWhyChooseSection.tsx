"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
  Coins,
  Globe,
  RefreshCw,
  Gift,
} from "lucide-react";
import { getBankFeatures } from "@/libs/bankFeaturesData";
import ApplyTriggerButton from "./ApplyTriggerButton";

interface BankWhyChooseSectionProps {
  bankName: string;
  bankSlug?: string;
}

const CATEGORY_FILTERS = [
  { id: "all", label: "All Features & Perks", icon: Sparkles },
  { id: "rewards", label: "Rewards & Cashback", icon: Percent },
  { id: "travel", label: "Travel & Airport Lounges", icon: Plane },
  { id: "dining", label: "Dining & Entertainment", icon: Utensils },
  { id: "upi", label: "RuPay UPI & Digital", icon: Zap },
  { id: "waivers", label: "Fee Waivers & Safety", icon: ShieldCheck },
];

export default function BankWhyChooseSection({
  bankName,
  bankSlug,
}: BankWhyChooseSectionProps) {
  const bankData = useMemo(() => {
    return getBankFeatures(bankSlug || bankName);
  }, [bankSlug, bankName]);

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFeatures = useMemo(() => {
    if (activeCategory === "all") return bankData.features;
    if (activeCategory === "waivers") {
      return bankData.features.filter(
        (f) => f.category === "waiver" || f.category === "protection"
      );
    }
    return bankData.features.filter((f) => f.category === activeCategory);
  }, [activeCategory, bankData.features]);

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
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-gray-200">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>OFFICIAL PARTNER PERKS &amp; PRIVILEGES</span>
        </div>

        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Why Choose <span className="text-primary">{bankData.bankName}</span> Credit Cards?
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2 leading-relaxed">
          {bankData.tagline}
        </p>

        <p className="text-xs text-gray-500 font-montserrat mt-2 max-w-2xl mx-auto leading-relaxed">
          {bankData.overview}
        </p>
      </div>

      {/* ── Key Metrics Strip ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-10">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold font-montserrat mb-1">
            <Crown className="w-3.5 h-3.5" />
            <span>Top Reward Rate</span>
          </div>
          <p className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
            {bankData.keyMetrics.maxRewardRate}
          </p>
          <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
            {bankData.keyMetrics.rewardCurrency}
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center gap-1.5 text-sky-600 text-xs font-bold font-montserrat mb-1">
            <Plane className="w-3.5 h-3.5" />
            <span>Airport Lounges</span>
          </div>
          <p className="font-bricolage font-bold text-base sm:text-lg text-gray-900 truncate">
            {bankData.keyMetrics.domesticLounge.split("(")[0].trim()}
          </p>
          <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
            Domestic &amp; Global Access
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center gap-1.5 text-violet-600 text-xs font-bold font-montserrat mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>RuPay UPI</span>
          </div>
          <p className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
            Scan &amp; Pay Active
          </p>
          <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
            Up to 50 days float
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center gap-1.5 text-teal-600 text-xs font-bold font-montserrat mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Forex Markup</span>
          </div>
          <p className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
            {bankData.keyMetrics.forexMarkup}
          </p>
          <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
            International Travel
          </span>
        </div>

        <div className="col-span-2 md:col-span-1 bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold font-montserrat mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Fee Waivers</span>
          </div>
          <p className="font-bricolage font-bold text-base sm:text-lg text-gray-900 truncate">
            {bankData.keyMetrics.feeWaiver.split("annual")[0].trim()}
          </p>
          <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
            Spend waiver milestone
          </span>
        </div>
      </div>

      {/* ── Category Filter Tabs ──────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {CATEGORY_FILTERS.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-montserrat transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200/80 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Features & Benefits Cards Grid ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Icon & Category Pill */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${getIconBackground(
                    feature.category
                  )}`}
                >
                  {getFeatureIcon(feature.category)}
                </div>
                <span className="bg-[#EBF4ED] text-primary text-[10px] font-bold px-2.5 py-1 rounded-full font-montserrat border border-primary/10 tracking-wide uppercase">
                  {feature.tag}
                </span>
              </div>

              {/* Title & Summary */}
              <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-4">
                {feature.summary}
              </p>

              {/* Detailed Bullet Points */}
              <ul className="space-y-2 mb-4">
                {feature.benefits.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-gray-700 font-montserrat leading-relaxed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Suited For Box */}
            <div className="pt-3 border-t border-gray-100 mt-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 block font-montserrat tracking-wider mb-0.5">
                Ideal For
              </span>
              <p className="text-[11px] font-medium text-gray-800 font-montserrat">
                {feature.bestSuitedFor}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Deep Dive: Rewards Engine & Lounge Rules ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Rewards Deep Dive */}
        <div className="bg-linear-to-br from-amber-50/50 via-white to-white p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider font-montserrat mb-2">
            <Coins className="w-4 h-4" />
            <span>Reward Ecosystem Deep Dive</span>
          </div>
          <h4 className="font-bricolage font-bold text-xl text-gray-900 mb-2">
            {bankData.rewardsEcosystem.programName}
          </h4>
          <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-4">
            {bankData.rewardsEcosystem.rateSummary}
          </p>

          <div className="mb-4 bg-white/80 p-3 rounded-2xl border border-amber-100">
            <span className="text-[10px] uppercase font-bold text-gray-500 font-montserrat block">
              Redemption Valuation
            </span>
            <p className="text-xs font-semibold text-gray-800 font-montserrat mt-0.5">
              {bankData.rewardsEcosystem.pointValuation}
            </p>
          </div>

          <div className="mb-4">
            <span className="text-[10px] uppercase font-bold text-gray-500 font-montserrat block mb-1.5">
              Key Accelerated Merchant Partners
            </span>
            <div className="flex flex-wrap gap-1.5">
              {bankData.rewardsEcosystem.acceleratedPartners.map((partner, i) => (
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
              Redemption Channels
            </span>
            <ul className="space-y-1 text-xs text-gray-700 font-montserrat">
              {bankData.rewardsEcosystem.redemptionOptions.map((opt, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Airport Lounges & Fee Waiver Rules */}
        <div className="bg-linear-to-br from-sky-50/50 via-white to-white p-6 sm:p-7 rounded-3xl border border-sky-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider font-montserrat mb-2">
            <Plane className="w-4 h-4" />
            <span>Lounge Access &amp; Waiver Policies</span>
          </div>
          <h4 className="font-bricolage font-bold text-xl text-gray-900 mb-2">
            Airport Lounge Privileges &amp; Spend Thresholds
          </h4>
          <p className="text-xs text-gray-600 font-montserrat leading-relaxed mb-4">
            Complimentary airport terminal relaxation guidelines, quarterly spend requirements, and annual fee reversal milestones.
          </p>

          <div className="space-y-3 mb-4">
            <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
              <span className="text-[10px] uppercase font-bold text-sky-800 font-montserrat block">
                Domestic Lounges
              </span>
              <p className="text-xs text-gray-800 font-montserrat mt-0.5">
                {bankData.loungeAndTravel.domestic}
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
              <span className="text-[10px] uppercase font-bold text-sky-800 font-montserrat block">
                International Access
              </span>
              <p className="text-xs text-gray-800 font-montserrat mt-0.5">
                {bankData.loungeAndTravel.international}
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
              <span className="text-[10px] uppercase font-bold text-sky-800 font-montserrat block">
                Fee Waiver Spend Rules
              </span>
              <p className="text-xs text-gray-800 font-montserrat mt-0.5">
                {bankData.waiversAndMilestones.waiverSpend}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-gray-600 font-montserrat">
            <RefreshCw className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>{bankData.waiversAndMilestones.fuelSurchargeWaiver}</span>
          </div>
        </div>
      </div>

      {/* ── Flagship Cards Spotlight ──────────────────────────────── */}
      {bankData.flagshipCards && bankData.flagshipCards.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary font-montserrat uppercase tracking-wider mb-1">
                <Gift className="w-3.5 h-3.5 text-gold" />
                <span>Top Flagship Card Lineup</span>
              </div>
              <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900">
                Flagship {bankData.bankName} Cards with These Features
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-montserrat">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero CIBIL Impact Soft Check</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bankData.flagshipCards.map((card, idx) => (
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
                    Instant video KYC
                  </span>
                  <ApplyTriggerButton
                    cardName={card.name}
                    cardSubtitle={`${bankData.bankName} • ${card.category}`}
                    label="Apply Now"
                    variant="primary"
                    className="py-1 px-3 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
