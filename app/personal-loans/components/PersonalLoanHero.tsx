"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Percent,
  Calculator,
  TrendingDown,
  Building2,
  CheckCircle2,
} from "lucide-react";
import PersonalLoanHeroForm from "./PersonalLoanHeroForm";

export default function PersonalLoanHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const partnerLogos = [
    { name: "HDFC Bank", src: "/partners-logos/hdfc-logo.webp" },
    { name: "SBI", src: "/partners-logos/sbi-logo.webp" },
    { name: "ICICI Bank", src: "/partners-logos/icici-logo.webp" },
    { name: "Axis Bank", src: "/partners-logos/axis-logo.webp" },
    { name: "IDFC FIRST Bank", src: "/partners-logos/idfc-logo.webp" },
    { name: "Bank of Baroda", src: "/partners-logos/bob-logo.webp" },
    { name: "IndusInd Bank", src: "/partners-logos/indusind-logo.webp" },
    { name: "Kotak Mahindra Bank", src: "/partners-logos/kotak-logo.webp" },
    { name: "Bajaj Finserv", src: "/partners-logos/bajaj-logo.webp" },
    { name: "Tata Capital", src: "/partners-logos/tata-logo.webp" },
  ];

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/60 overflow-hidden font-montserrat">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Hero: Left pitch/stats, Right inline eligibility form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (7 cols): Hero Pitch, Badges, Metrics & Navigation */}
          <div className="lg:col-span-7 text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs mb-4 sm:mb-5 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <span>India&apos;s Smartest Personal Loan Marketplace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-gray-900 tracking-tight leading-[1.12]">
              Compare Personal Loans & <br />
              <span className="text-primary relative inline-block">
                Get Instant Approval
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Lowest interest rates starting at <strong className="text-gray-900 font-bold">9.99% p.a.</strong> • 
              Collateral-free sanctions up to <strong className="text-gray-900 font-bold">₹50 Lakhs</strong> • 
              Disbursals in as fast as 10 seconds with zero credit score impact on pre-approval.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection("emi-calculator-section")}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-gray-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Calculate Your EMI</span>
              </button>

              <button
                onClick={() => scrollToSection("lenders-list-section")}
                className="bg-white hover:bg-gray-50 text-primary border border-primary/20 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-gold" />
                <span>Explore 10+ Lenders</span>
              </button>
            </div>

            {/* Key Value Stat Cards (2x2 Grid) */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Rates From
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  9.99% <span className="text-xs font-normal text-gray-500">p.a.</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Reducing balance</p>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Percent className="w-3.5 h-3.5 text-blue-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Max Sanction
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  ₹50 Lakhs
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Zero collateral</p>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Disbursal Speed
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  10 Seconds
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Pre-approved profiles</p>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Score Impact
                  </span>
                </div>
                <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  ₹0 / Zero Hit
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Soft inquiry</p>
              </div>
            </div>

            {/* Quick Trust Checklist */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                100% Paperless e-KYC
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                No Physical Branch Visits
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                RBI Regulated Lenders Only
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Instant Personal Loan Pre-Approved Form */}
          <div className="lg:col-span-5">
            <PersonalLoanHeroForm />
          </div>

        </div>

        {/* Partner Banks Logo Ticker */}
        <div className="mt-12 pt-8 border-t border-gray-200/70">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6 font-montserrat">
            Compare across India&apos;s leading RBI-regulated Banks & NBFCs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="h-9 w-24 sm:w-28 relative flex items-center justify-center hover:scale-105 transition-transform"
                title={partner.name}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={110}
                  height={36}
                  className="max-h-8 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
