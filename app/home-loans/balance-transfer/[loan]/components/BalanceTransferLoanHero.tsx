"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  RefreshCw,
  Star,
  Calculator,
  ChevronRight,
  Share2,
  Check,
  Percent,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import BalanceTransferLoanHeroForm from "./BalanceTransferLoanHeroForm";

interface BalanceTransferLoanHeroProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanHero({
  lender,
}: BalanceTransferLoanHeroProps) {
  const { openApplyModal } = useApplyModal();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("savings-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const rateText =
    lender.interestRate?.text ||
    `${lender.interestRate?.min ?? 7.25}% - ${lender.interestRate?.max ?? 8.75}% p.a.`;

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/80 font-montserrat">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none -ml-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* ── Breadcrumb Navigation ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 mb-6 sm:mb-8"
        >
          <Link href="/" className="hover:text-primary transition-colors hover:underline">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/home-loans" className="hover:text-primary transition-colors hover:underline">
            Home Loans
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link
            href="/home-loans/balance-transfer"
            className="hover:text-primary transition-colors hover:underline"
          >
            Balance Transfer
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-primary font-bold truncate max-w-[240px] sm:max-w-none">
            {lender.name}
          </span>
        </nav>

        {/* ── Main Hero Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Lender Information & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                <Building2 className="w-3 h-3" />
                {lender.bankType ? `${lender.bankType.toUpperCase()} TAKEOVER` : "TAKEOVER SCHEME"}
              </span>

              {lender.badge && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {lender.badge}
                </span>
              )}

              {lender.overdraftScheme && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                  <RefreshCw className="w-3 h-3 text-purple-600" />
                  Overdraft Available
                </span>
              )}

              {lender.topUpAvailable && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  Top-Up to {lender.maxTopUpAmount.replace(/Up to /i, "")}
                </span>
              )}
            </div>

            {/* Lender Header: Logo, Title & Tagline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4.5">
              <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 p-2.5 flex items-center justify-center shadow-sm shrink-0">
                <Image
                  src={lender.logo}
                  alt={lender.name}
                  width={68}
                  height={68}
                  className="max-h-full max-w-full object-contain"
                  priority
                />
              </div>

              <div className="space-y-1.5">
                <h1 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
                  {lender.name}
                </h1>

                {/* Rating & Review Counter */}
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md font-bold border border-amber-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{lender.rating || 4.8} / 5</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 font-medium">
                    Verified Borrowers: <strong className="text-gray-900">{lender.reviewCount}</strong>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Direct Takeover Desk
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl">
              {lender.tagline}
            </p>

            {/* ── Key Metrics Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {/* Interest Rate */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <Percent className="w-3 h-3 text-primary" />
                  <span>Takeover Rate</span>
                </div>
                <div className="mt-1 font-bricolage font-extrabold text-base sm:text-xl text-primary">
                  {rateText}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5 font-medium">
                  Linked to RBI EBLR
                </div>
              </div>

              {/* Starting EMI */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <Calculator className="w-3 h-3 text-emerald-600" />
                  <span>Starting EMI</span>
                </div>
                <div className="mt-1 font-bricolage font-extrabold text-base sm:text-xl text-gray-900">
                  ₹{lender.startingEmiPerLakh20Yr}
                  <span className="text-xs font-normal text-gray-500"> / Lakh</span>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  ₹{lender.startingEmiPerLakh30Yr}/L for 30 Yrs
                </div>
              </div>

              {/* Max Amount & Top-Up */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-gold" />
                  <span>Max Limit</span>
                </div>
                <div className="mt-1 font-bricolage font-extrabold text-base sm:text-lg text-gray-900 truncate" title={lender.maxAmount}>
                  {lender.maxAmount.includes("Cr") ? lender.maxAmount.split("(")[0].trim() : lender.maxAmount}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 truncate">
                  Top-Up {lender.maxTopUpAmount.replace(/based on.*/i, "").trim()}
                </div>
              </div>

              {/* Processing Fee Cap */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <Percent className="w-3 h-3 text-amber-600" />
                  <span>Processing Fee</span>
                </div>
                <div className="mt-1 font-bricolage font-bold text-xs sm:text-sm text-gray-900 truncate" title={lender.processingFee}>
                  {lender.processingFeeCap || lender.processingFee}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5 truncate">
                  Rate: {lender.processingFeePercent}% of loan
                </div>
              </div>

              {/* Turnaround Time */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span>Takeover Speed</span>
                </div>
                <div className="mt-1 font-bricolage font-extrabold text-base sm:text-lg text-gray-900">
                  {lender.turnaroundTime}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  LOD Cheque Handover
                </div>
              </div>

              {/* Foreclosure Charges */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Pre-Closure</span>
                </div>
                <div className="mt-1 font-bricolage font-extrabold text-base sm:text-lg text-emerald-700">
                  0% NIL Penalty
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  RBI Mandate on Floating
                </div>
              </div>
            </div>

            {/* Features Bullet Points from DB */}
            {lender.features && lender.features.length > 0 && (
              <div className="bg-white/80 rounded-2xl p-4 border border-gray-200/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                  Key Takeover Highlights
                </span>
                <div className="space-y-1.5">
                  {lender.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    lender.name,
                    `Direct Balance Transfer • Rates from ${lender.interestRate?.min ?? 7.25}% p.a. • Fee Cap: ${lender.processingFeeCap}`
                  )
                }
                className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Apply for Takeover</span>
              </button>

              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white hover:bg-gray-50 text-primary border border-primary/25 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-2xs hover:border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-gold" />
                <span>Calculate Your Exact Savings</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer shadow-2xs"
                title="Share this balance transfer scheme"
                aria-label="Share"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Interactive Form (5 cols) */}
          <div className="lg:col-span-5">
            <BalanceTransferLoanHeroForm lender={lender} />
          </div>
        </div>
      </div>
    </section>
  );
}
