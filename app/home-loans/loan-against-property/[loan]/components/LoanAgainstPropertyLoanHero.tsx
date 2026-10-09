"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  Star,
  Calculator,
  ChevronRight,
  Share2,
  Check,
  Percent,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Home,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import LoanAgainstPropertyLoanHeroForm from "./LoanAgainstPropertyLoanHeroForm";

interface LoanAgainstPropertyLoanHeroProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanHero({
  lender,
}: LoanAgainstPropertyLoanHeroProps) {
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
    const el = document.getElementById("lap-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const rateText =
    lender.interestRate?.text ||
    `${lender.interestRate?.min ?? 9.25}% - ${lender.interestRate?.max ?? 11.5}% p.a.`;

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
            href="/home-loans/loan-against-property"
            className="hover:text-primary transition-colors hover:underline"
          >
            Loan Against Property
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
                {lender.bankType ? `${lender.bankType.toUpperCase()} MORTGAGE` : "MORTGAGE LOAN"}
              </span>

              {lender.badge && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {lender.badge}
                </span>
              )}

              {lender.overdraftAvailable && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  <Zap className="w-3 h-3 text-teal-600" />
                  OD Facility Available
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                RBI 0% Foreclosure
              </span>
            </div>

            {/* Lender Header: Logo & Title */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-gray-200 p-2.5 flex items-center justify-center shrink-0 shadow-sm">
                <Image
                  src={lender.logo}
                  alt={lender.name}
                  width={68}
                  height={68}
                  priority
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h1 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
                  {lender.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {lender.tagline}
                </p>

                {/* Rating & Review Counter */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{lender.rating || 4.8} / 5.0</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({lender.reviewCount || "25k+"} verified borrower ratings)
                  </span>
                </div>
              </div>
            </div>

            {/* ── Key Financial Metrics Strip (4 Stat Cards) ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {/* Interest Rate */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold mb-1">
                  <Percent className="w-3.5 h-3.5 text-primary" />
                  <span>Floor Rate</span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-primary">
                  {lender.interestRate?.min ?? 9.25}%
                  <span className="text-xs font-normal text-gray-500"> p.a.</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate mt-0.5">{rateText}</p>
              </div>

              {/* Starting EMI Per Lakh */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold mb-1">
                  <Calculator className="w-3.5 h-3.5 text-gold" />
                  <span>Starting EMI</span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  ₹{lender.startingEmiPerLakh15Yr}
                  <span className="text-xs font-normal text-gray-500"> / L</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">@ 15 Years Tenure</p>
              </div>

              {/* Max Sanction Amount */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold mb-1">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>Max Sanction</span>
                </div>
                <div className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900 truncate">
                  {lender.maxAmount.replace(/\(.*\)/, "").trim()}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Multi-crore funding</p>
              </div>

              {/* Max LTV */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold mb-1">
                  <Home className="w-3.5 h-3.5 text-gold" />
                  <span>Max LTV</span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-emerald-700">
                  {lender.maxLtvPercent}%
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Of Property Valuation</p>
              </div>
            </div>

            {/* ── Key Feature Bullet Points ── */}
            <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-gray-200/80 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Loan Against Property Highlights
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {lender.features?.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Processing Fee:</strong> {lender.processingFee}{" "}
                    {lender.processingFeeCap ? `(${lender.processingFeeCap})` : ""}
                  </span>
                </li>
                {lender.overdraftScheme && (
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Overdraft Facility:</strong> {lender.overdraftScheme}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openApplyModal(lender.name, "Loan Against Property")}
                className="bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer flex items-center gap-2"
              >
                <span>Apply for {lender.name}</span>
              </button>

              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-5 rounded-xl border border-gray-300 shadow-2xs hover:shadow-xs transition-all text-xs sm:text-sm cursor-pointer flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Estimate EMI &amp; LTV</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-3 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-xl border border-gray-200 transition-colors shadow-2xs shrink-0 cursor-pointer"
                title="Share Loan Scheme"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Lead & Valuation Form (5 cols) */}
          <div className="lg:col-span-5">
            <LoanAgainstPropertyLoanHeroForm lender={lender} />
          </div>
        </div>
      </div>
    </section>
  );
}
