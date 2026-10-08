"use client";

import React from "react";
import Image from "next/image";
import {
  Zap,
  Clock,
  ShieldCheck,
  TrendingDown,
  Calculator,
  CalendarRange,
  Scale,
  Sparkles,
  ArrowRight,
  Percent,
} from "lucide-react";
import ShortTermLoanHeroForm from "./ShortTermLoanHeroForm";

export default function ShortTermLoanHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const partnerLogos = [
    { name: "HDFC Bank", src: "/partners-logos/hdfc-logo.webp" },
    { name: "ICICI Bank", src: "/partners-logos/icici-logo.webp" },
    { name: "SBI YONO", src: "/partners-logos/sbi-logo.webp" },
    { name: "Axis Bank", src: "/partners-logos/axis-logo.webp" },
    { name: "Kotak Mahindra", src: "/partners-logos/kotak-logo.webp" },
    { name: "Bajaj Finserv", src: "/partners-logos/bajaj-logo.webp" },
    { name: "Federal Bank", src: "/partners-logos/federal-logo.webp" },
    { name: "IndusInd Bank", src: "/partners-logos/indusind-logo.webp" },
    { name: "Canara Bank", src: "/partners-logos/canara-logo.webp" },
    { name: "IDFC FIRST Bank", src: "/partners-logos/idfc-logo.webp" },
    { name: "AU Small Finance Bank", src: "/partners-logos/au-logo.webp" },
    { name: "YES Bank", src: "/partners-logos/yes-bank-logo.webp" },
  ];

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/60 overflow-hidden font-montserrat">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols): Hero Pitch & Metrics */}
          <div className="lg:col-span-7 text-left">
            {/* Trust badge pill */}
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs mb-4 sm:mb-5">
              <CalendarRange className="w-4 h-4 text-gold shrink-0" />
              <span>3 to 12 Month Tenures • Zero Long-Term Debt Burden</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Title */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-gray-900 tracking-tight leading-[1.12]">
              Short-Term Personal Loans <br />
              <span className="text-primary relative inline-block">
                Borrow Quick. Repay Fast.
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Flexible liquidity from <strong className="text-gray-900 font-bold">₹1,000 to ₹40 Lakhs</strong> designed for immediate bridge needs, salary advances, or seasonal expenses. Enjoy <strong className="text-gray-900 font-bold">low total interest outgo</strong>, zero foreclosure penalties, and 100% paperless Account Aggregator verification.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection("short-term-lenders-section")}
                className="bg-primary hover:bg-[#02383d] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-gold" />
                <span>Explore 15 Short-Term Lenders</span>
              </button>

              <button
                onClick={() => scrollToSection("short-term-calculator-section")}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-gray-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Short-Term EMI & Interest Calculator</span>
              </button>

              <button
                onClick={() => scrollToSection("short-term-comparison-table-section")}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs hover:border-gray-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-primary" />
                <span>Rate & Tenure Matrix</span>
              </button>

              <button
                onClick={() => scrollToSection("short-term-guide-section")}
                className="bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>RBI KFS & Cooling-Off Guide</span>
              </button>
            </div>

            {/* Key Metric Stat Cards (4 grid) */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Fastest Disbursal
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  3s to 15 Mins
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Direct Bank IMPS
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Micro Loans From
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-emerald-700">
                  ₹1,000
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Up to ₹40 Lakhs
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <CalendarRange className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Short Tenures
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  3 - 12 Months
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Early payoff benefits
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    RBI Protection
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  100% KFS
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Mandatory Look-Up
                </span>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Zero foreclosure penalties after initial window</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Sahamati Account Aggregator verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Options for CIBIL 600+ & first-time earners</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Form */}
          <div className="lg:col-span-5">
            <ShortTermLoanHeroForm />
          </div>
        </div>

        {/* Partner Logos Ticker / Grid */}
        <div className="mt-12 pt-8 border-t border-gray-200/70">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
            Compare Top RBI-Regulated Short-Term Lending Partners & Banks
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 opacity-85 hover:opacity-100 transition-opacity">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="h-10 px-3 py-1.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105"
                title={partner.name}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={80}
                  height={28}
                  className="max-h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
