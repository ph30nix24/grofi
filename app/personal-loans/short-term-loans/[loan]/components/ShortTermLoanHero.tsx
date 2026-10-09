"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Share2,
  Check,
  Star,
  Zap,
  Clock,
  IndianRupee,
  Building2,
  Lock,
  Smartphone,
  CheckCircle2,
  Percent,
  Download,
  Calendar,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import ShortTermLoanHeroForm from "./ShortTermLoanHeroForm";

interface ShortTermLoanHeroProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanHero({ lender }: ShortTermLoanHeroProps) {
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
    const el = document.getElementById("emi-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const rateText =
    lender.interestRate?.text ||
    `${lender.interestRate?.min ?? 12.0}% - ${lender.interestRate?.max ?? 30.0}% p.a.`;

  const lenderTypeLabel =
    lender.lenderType === "bank"
      ? "SCHEDULED BANK"
      : lender.lenderType === "nbfc"
      ? "RBI REGISTERED NBFC"
      : "FINTECH DIGITAL LENDER";

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-[#F3EFE6]/70 via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/80 font-montserrat">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C9AA3C]/10 rounded-full blur-3xl pointer-events-none -ml-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 mb-6 sm:mb-8"
        >
          <Link href="/" className="hover:text-primary transition-colors hover:underline">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/personal-loans" className="hover:text-primary transition-colors hover:underline">
            Personal Loans
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link
            href="/personal-loans/short-term-loans"
            className="hover:text-primary transition-colors hover:underline"
          >
            Short Term Loans
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-primary font-bold truncate max-w-[240px] sm:max-w-none">
            {lender.name}
          </span>
        </nav>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Short-Term Loan Metrics & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                <Building2 className="w-3 h-3" />
                {lenderTypeLabel}
              </span>

              {/* Speed Highlight Pill */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Disbursal: {lender.disbursalTime}</span>
              </span>

              {/* Short Tenure Pill */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                <Calendar className="w-3 h-3 text-amber-700" />
                <span>{lender.shortTenureOptions?.[0] || "3 Months"} to {lender.tenureMonths || 12}M</span>
              </span>

              {lender.badge && (
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ${
                    lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {lender.badge}
                </span>
              )}

              {/* RBI Regulated */}
              {lender.rbiRegulated && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>100% RBI Regulated</span>
                </span>
              )}

              {/* Rating */}
              {lender.rating && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-800 border border-gray-200 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{lender.rating}</span>
                  <span className="text-gray-400 font-normal">({lender.reviewCount})</span>
                </div>
              )}

              {/* App Downloads if present */}
              {lender.appDownloads && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  <Download className="w-3 h-3 text-purple-600" />
                  <span>{lender.appDownloads} Downloads</span>
                </span>
              )}
            </div>

            {/* Lender Header: Logo + Title + Tagline */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white border border-gray-200 p-2.5 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src={lender.logo}
                  alt={lender.name}
                  width={68}
                  height={68}
                  className="max-h-full max-w-full object-contain"
                  priority
                />
              </div>

              <div>
                <h1 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 leading-tight">
                  {lender.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-medium">
                  {lender.tagline}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-200/80 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>DLRE: {lender.rbiRegulatedEntity}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Core Metrics 4-Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {/* Interest Rate */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Percent className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Interest Rate</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-primary truncate">
                  {rateText}
                </div>
                {lender.interestRate?.monthlyRateText ? (
                  <span className="text-[10px] text-amber-700 font-semibold block truncate">
                    {lender.interestRate.monthlyRateText}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-500">p.a. onwards</span>
                )}
              </div>

              {/* Disbursal Speed */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Disbursal</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-emerald-700 truncate">
                  {lender.disbursalTime}
                </div>
                <span className="text-[10px] text-gray-500">via 24x7 IMPS</span>
              </div>

              {/* Loan Amount */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <IndianRupee className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Short Limit</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900 truncate">
                  {lender.maxAmount}
                </div>
                <span className="text-[10px] text-gray-500">Min {lender.minAmount}</span>
              </div>

              {/* Starting EMI */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">EMI/Lakh (12M)</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900 truncate">
                  ₹{new Intl.NumberFormat("en-IN").format(lender.startingEmiPerLakh)}
                </div>
                <span className="text-[10px] text-gray-500">per month</span>
              </div>
            </div>

            {/* Quick Specs Pill Box */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-gray-200/80 shadow-2xs space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">
                    Min CIBIL Score
                  </span>
                  <span className="font-bold text-gray-900 mt-0.5 block">
                    {lender.minCreditScore}+ Score
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">
                    Min Monthly Income
                  </span>
                  <span className="font-bold text-gray-900 mt-0.5 block">
                    {lender.minIncome}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">
                    Paperwork
                  </span>
                  <span className="font-bold text-emerald-700 mt-0.5 block truncate" title={lender.documentation}>
                    {lender.documentation}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">
                    Processing Fee
                  </span>
                  <span className="font-bold text-gray-900 mt-0.5 block truncate" title={lender.processingFee}>
                    {lender.processingFee}
                  </span>
                </div>
              </div>

              {/* Short tenure options preview */}
              {lender.shortTenureOptions && lender.shortTenureOptions.length > 0 && (
                <div className="pt-2.5 border-t border-gray-100 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-gray-500 font-semibold text-[11px]">Tenure Choices:</span>
                  {lender.shortTenureOptions.map((opt) => (
                    <span
                      key={opt}
                      className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold text-[10px] border border-amber-200"
                    >
                      {opt}
                    </span>
                  ))}
                  <span className="text-[10px] text-emerald-700 font-semibold ml-auto flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Zero Early Closure Fee
                  </span>
                </div>
              )}

              {/* Recommended For highlight banner */}
              {lender.recommendedFor && (
                <div className="pt-2.5 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-700">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900 font-bold">Best For:</strong> {lender.recommendedFor}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    lender.name,
                    `Short-Term Loan in ${lender.disbursalTime} • Rates from ${lender.interestRate?.min ?? 12.0}% p.a.`
                  )
                }
                className="bg-primary hover:bg-[#035259] active:scale-98 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Apply for Short-Term Loan</span>
              </button>

              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <span>Calculate Short-Term EMI</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:text-gray-900 transition-all cursor-pointer shadow-2xs"
                title="Share this loan"
                aria-label="Share this short term loan offer"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Security Guarantee Strip */}
            <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero CIBIL Impact Soft Check
              </span>
              <span className="flex items-center gap-1 text-gray-600 font-medium">
                <Lock className="w-3.5 h-3.5 text-primary" />
                256-Bit SSL Encrypted
              </span>
              <span className="hidden sm:flex items-center gap-1 text-gray-600 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-gray-500" />
                100% Paperless e-KYC
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Hero Qualifier Form (5 cols) */}
          <div className="lg:col-span-5">
            <ShortTermLoanHeroForm lender={lender} />
          </div>
        </div>
      </div>
    </section>
  );
}
