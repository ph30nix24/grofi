"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  TrendingDown,
  Building2,
  CheckCircle2,
  Calculator,
  Percent,
  Home,
  Layers,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import LoanAgainstPropertyHeroForm from "./LoanAgainstPropertyHeroForm";

export default function LoanAgainstPropertyHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const partnerLogos = [
    { name: "SBI", src: "/partners-logos/sbi-logo.webp" },
    { name: "HDFC Bank", src: "/partners-logos/hdfc-logo.webp" },
    { name: "ICICI Bank", src: "/partners-logos/icici-logo.webp" },
    { name: "Axis Bank", src: "/partners-logos/axis-logo.webp" },
    { name: "Bank of Baroda", src: "/partners-logos/bob-logo.webp" },
    { name: "Kotak Mahindra Bank", src: "/partners-logos/kotak-logo.webp" },
    { name: "Bajaj Finserv", src: "/partners-logos/bajaj-logo.webp" },
    { name: "Tata Capital", src: "/partners-logos/tata-logo.webp" },
    { name: "Punjab National Bank", src: "/partners-logos/punjab-logo.webp" },
    { name: "IDFC FIRST Bank", src: "/partners-logos/idfc-logo.webp" },
  ];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/60 overflow-hidden font-montserrat">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/home-loans" className="hover:text-primary transition-colors">
            Home Loans
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold">Loan Against Property</span>
        </nav>

        {/* 2-Column Hero: Left pitch/stats, Right inline eligibility form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols): Hero Pitch, Badges, Metrics & Navigation */}
          <div className="lg:col-span-7 text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs mb-4 sm:mb-5 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <span>Unlock Equity in Real Estate • Lowest Mortgage Rates from 8.75%</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-gray-900 tracking-tight leading-[1.12]">
              Loan Against Property <br />
              <span className="text-primary relative inline-block">
                & Mortgage Overdraft
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Monetize your residential, commercial, or industrial property to raise capital up to{" "}
              <strong className="text-gray-900 font-bold">₹25+ Crore</strong>. Compare 10+ top scheduled
              banks and HFCs offering rates from <strong className="text-gray-900 font-bold">8.75% p.a.</strong>,{" "}
              up to <strong className="text-gray-900 font-bold">75% LTV</strong>, 20-year flexible tenures,
              drop-line overdraft options, and zero prepayment penalties.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("lap-calculator-section")}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-gray-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Calculate EMI & LTV</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("lenders-list-section")}
                className="bg-white hover:bg-gray-50 text-primary border border-primary/20 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-gold" />
                <span>Compare 10+ Lenders</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("property-types-section")}
                className="bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Accepted Property Types</span>
              </button>
            </div>

            {/* Key Value Stat Cards (4-column Grid) */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Stat 1: Rates */}
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Rates From
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  8.75% <span className="text-xs font-normal text-gray-500">p.a.</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Repo / EBLR linked</p>
              </div>

              {/* Stat 2: Max Loan */}
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Home className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Max Loan
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  ₹25 Cr+
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">High ticket funding</p>
              </div>

              {/* Stat 3: LTV */}
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Percent className="w-3.5 h-3.5 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Max LTV
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  Up to 75%
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Of market valuation</p>
              </div>

              {/* Stat 4: Tenure */}
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Max Tenure
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  20 Years
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Flexible EMIs & OD</p>
              </div>
            </div>

            {/* Quick Guarantees Checkmarks */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0% Floating Prepayment Penalty</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Overdraft / Dropline OD Available</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep Legal & Technical Valuation</span>
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Instant Valuation & Fast Form */}
          <div className="lg:col-span-5">
            <LoanAgainstPropertyHeroForm />
          </div>
        </div>

        {/* Partner Banks Logo Strip */}
        <div className="mt-12 pt-8 border-t border-gray-200/70">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            Compare Mortgage Rates Across Leading Indian Banks & Financial Institutions
          </p>
          <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 lg:gap-8 opacity-85 hover:opacity-100 transition-opacity">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="bg-white/90 border border-gray-200/80 rounded-xl px-3 py-2 flex items-center justify-center shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all h-10 w-24 sm:w-28"
                title={partner.name}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={90}
                  height={32}
                  className="max-h-7 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
