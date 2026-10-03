"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Share2,
  Check,
  Star,
  Zap,
  Calculator,
  Percent,
  Clock,
  IndianRupee,
  Building2,
  Lock,
} from "lucide-react";
import { PersonalLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import LoanHeroForm from "./LoanHeroForm";

interface LoanHeroProps {
  lender: PersonalLoanLender;
}

export default function LoanHero({ lender }: LoanHeroProps) {
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

  const rateText = lender.interestRate?.text || `${lender.interestRate?.min ?? 9.99}% - ${lender.interestRate?.max ?? 24.0}% p.a.`;

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-[#F3EFE6]/70 via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/80 font-montserrat">
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
          <Link href="/personal-loans" className="hover:text-primary transition-colors hover:underline">
            Personal Loans
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-primary font-bold truncate max-w-[240px] sm:max-w-none">
            {lender.name}
          </span>
        </nav>

        {/* ── Main Hero Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Lender Information & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                <Building2 className="w-3 h-3" />
                {lender.bankType ? `${lender.bankType.toUpperCase()} LENDER` : "VERIFIED LENDER"}
              </span>

              {lender.badge && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {lender.badge}
                </span>
              )}

              {lender.rating && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-800 border border-gray-200 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{lender.rating}</span>
                  {lender.reviewCount && (
                    <span className="text-gray-400 font-normal">({lender.reviewCount} reviews)</span>
                  )}
                </div>
              )}
            </div>

            {/* Lender Title & Brand */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-gray-200 p-2.5 flex items-center justify-center shrink-0 shadow-sm">
                <Image
                  src={lender.logo}
                  alt={lender.name}
                  width={72}
                  height={72}
                  priority
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h1 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-[2.6rem] text-gray-900 tracking-tight leading-[1.15]">
                  {lender.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-medium">
                  {lender.tagline}
                </p>
              </div>
            </div>

            {/* Core Metrics 3x2 Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Percent className="w-3 h-3 text-primary" />
                  <span>Interest Rate</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                  {rateText}
                </div>
                <span className="text-[10px] text-gray-500">Monthly Reducing</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <IndianRupee className="w-3 h-3 text-emerald-600" />
                  <span>Max Loan Limit</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900">
                  {lender.maxAmount}
                </div>
                <span className="text-[10px] text-gray-500">Collateral Free</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Disbursal Time</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-amber-900">
                  {lender.disbursalTime}
                </div>
                <span className="text-[10px] text-gray-500">Direct to Account</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3 text-blue-500" />
                  <span>Starting EMI</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-emerald-800">
                  ₹{lender.startingEmiPerLakh} / Lakh
                </div>
                <span className="text-[10px] text-gray-500">For 5 Years Tenure</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3 text-teal-600" />
                  <span>Repayment Tenure</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900">
                  {lender.tenure}
                </div>
                <span className="text-[10px] text-gray-500">Flexible Repayment</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  <span>Min CIBIL Score</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                  {lender.minCreditScore}+
                </div>
                <span className="text-[10px] text-gray-500">Higher = Lower Rates</span>
              </div>
            </div>

            {/* Key Product Features List */}
            {lender.features && lender.features.length > 0 && (
              <div className="space-y-2 pt-1">
                {lender.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById("hero-apply-form");
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: "smooth" });
                    const input = formEl.querySelector("input");
                    if (input) input.focus();
                  } else {
                    openApplyModal(
                      lender.name,
                      `Direct Personal Loan Application • Rates from ${lender.interestRate?.min ?? 9.99}% p.a.`
                    );
                  }
                }}
                className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-4 px-7 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98 group"
              >
                <span>Check Pre-Approved Offer</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-2xs hover:border-gray-400 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Calculate EMI</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 p-4 rounded-xl transition-all shadow-2xs cursor-pointer"
                title="Share this loan details"
                aria-label="Share"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500 pt-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero CIBIL Impact Soft Check</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1.5 text-gray-600">
                <Lock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>100% Paperless DigiLocker e-KYC</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inline Pre-Approval Form (5 cols) */}
          <div className="lg:col-span-5">
            <LoanHeroForm lender={lender} />
          </div>

        </div>
      </div>
    </section>
  );
}
