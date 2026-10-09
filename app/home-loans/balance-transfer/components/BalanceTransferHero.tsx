"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  RefreshCw,
  Building2,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import BalanceTransferHeroForm from "./BalanceTransferHeroForm";

export default function BalanceTransferHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const partnerLogos = [
    { name: "SBI", src: "/partners-logos/sbi-logo.webp" },
    { name: "Bank of Baroda", src: "/partners-logos/bob-logo.webp" },
    { name: "HDFC Bank", src: "/partners-logos/hdfc-logo.webp" },
    { name: "ICICI Bank", src: "/partners-logos/icici-logo.webp" },
    { name: "Kotak Mahindra", src: "/partners-logos/kotak-logo.webp" },
    { name: "Axis Bank", src: "/partners-logos/axis-logo.webp" },
    { name: "Union Bank", src: "/partners-logos/union-logo.webp" },
    { name: "Canara Bank", src: "/partners-logos/canara-logo.webp" },
    { name: "Punjab National Bank", src: "/partners-logos/punjab-logo.webp" },
    { name: "Bajaj Housing Finance", src: "/partners-logos/bajaj-logo.webp" },
    { name: "LIC Housing Finance", src: "/partners-logos/lic-logo.webp" },
    { name: "Bank of India", src: "/partners-logos/boi-logo.webp" },
    { name: "IDFC FIRST Bank", src: "/partners-logos/idfc-logo.webp" },
    { name: "Federal Bank", src: "/partners-logos/federal-logo.webp" },
  ];

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/60 overflow-hidden font-montserrat">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Hero: Left pitch/stats, Right inline form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (7 cols): Hero Pitch, Badges, Metrics & Navigation */}
          <div className="lg:col-span-7 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs mb-4 sm:mb-5">
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <span>Home Loan Balance Transfer (2026)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-gray-900 tracking-tight leading-[1.14]">
              Switch Your Home Loan & <br />
              <span className="text-primary relative inline-block">
                Save Up to ₹15+ Lakhs
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Transfer your existing high-interest housing loan to India&apos;s lowest rates starting at{" "}
              <strong className="text-gray-900 font-bold">7.10% p.a.</strong> Across 14 verified banks & HFCs.
              Enjoy <strong className="text-gray-900 font-bold">capped processing fees</strong>, 
              large <strong className="text-gray-900 font-bold">Top-Up loans up to ₹5 Cr</strong>, 
              SBI Maxgain overdraft integration, and <strong className="text-gray-900 font-bold">0% foreclosure penalties</strong> on floating rates.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("savings-calculator")}
                className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-gold" />
                <span>Calculate Your Exact Savings</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("lenders-list")}
                className="bg-white hover:bg-gray-50 text-primary border border-primary/20 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-gold" />
                <span>Compare 14+ Lenders</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("steps-section")}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs hover:border-gray-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-primary" />
                <span>How Switch Works</span>
              </button>
            </div>

            {/* Key Value Metric Cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-gray-200/70">
              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Lowest Takeover Rate
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-primary font-bricolage mt-0.5 block">
                  7.10% <span className="text-xs font-semibold text-gray-500">p.a.</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                  BoI / BoB / Union
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Max Top-Up Loan
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-gray-900 font-bricolage mt-0.5 block">
                  ₹5 Crore
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                  Same as home loan rate
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Processing Fee Cap
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-gray-900 font-bricolage mt-0.5 block">
                  Capped ₹15k-₹18k
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                  No runaway fee %
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Foreclosure Penalty
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-700 font-bricolage mt-0.5 block">
                  0% / Nil
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                  RBI Mandate
                </span>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Transfer to Overdraft (SBI Maxgain / PNB Max-Saver)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Retain Section 24(b) & 80C Tax Deductions
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                RBI 30-day deed handover protection
              </span>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive Hero Form */}
          <div className="lg:col-span-5">
            <BalanceTransferHeroForm />
          </div>

        </div>

        {/* Partner Logos Strip */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Compare Balance Transfer & Top-Up Offers From India&apos;s Leading 14+ Lenders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-85 grayscale hover:grayscale-0 transition-all duration-300">
            {partnerLogos.map((bank) => (
              <div
                key={bank.name}
                className="h-8 w-24 relative flex items-center justify-center filter drop-shadow-2xs transition-transform hover:scale-105"
                title={bank.name}
              >
                <Image
                  src={bank.src}
                  alt={bank.name}
                  width={96}
                  height={32}
                  className="max-h-7 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
