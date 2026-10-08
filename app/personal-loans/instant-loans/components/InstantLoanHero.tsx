"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  TrendingDown,
  Building2,
  Calculator,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import InstantLoanHeroForm from "./InstantLoanHeroForm";

export default function InstantLoanHero() {
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
    { name: "Bajaj Finserv", src: "/partners-logos/bajaj-logo.webp" },
    { name: "Tata Capital", src: "/partners-logos/tata-logo.webp" },
    { name: "IndusInd Bank", src: "/partners-logos/indusind-logo.webp" },
    { name: "Federal Bank", src: "/partners-logos/federal-logo.webp" },
    { name: "Canara Bank", src: "/partners-logos/canara-logo.webp" },
    { name: "IDFC FIRST Bank", src: "/partners-logos/idfc-logo.webp" },
    { name: "Bank of Baroda", src: "/partners-logos/bob-logo.webp" },
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
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs mb-4 sm:mb-5 animate-fadeIn">
              <Zap className="w-4 h-4 text-gold shrink-0" />
              <span>Instant Cash in Minutes • 100% Digital & RBI Regulated</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Title */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-gray-900 tracking-tight leading-[1.12]">
              Instant Personal Loans <br />
              <span className="text-primary relative inline-block">
                Credited in 10s to 15 Mins
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Emergency funding without the paperwork. Compare <strong className="text-gray-900 font-bold">16 top instant lenders</strong> — from 3-second bank disbursals to AI-driven micro loans up to <strong className="text-gray-900 font-bold">₹50 Lakhs</strong>. 100% paperless Aadhaar e-KYC.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection("lenders-list-section")}
                className="bg-primary hover:bg-[#02383d] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-gold" />
                <span>Explore 16 Instant Lenders</span>
              </button>

              <button
                onClick={() => scrollToSection("instant-emi-calculator-section")}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-xs hover:border-gray-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Calculate Instant EMI</span>
              </button>

              <button
                onClick={() => scrollToSection("safety-guide-section")}
                className="bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>RBI Safety Guide</span>
              </button>
            </div>

            {/* Key Metric Stat Cards (4 grid) */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Fastest Credit
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  3 - 10 Sec
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Direct Bank IMPS
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Rates From
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-emerald-700">
                  8.90% p.a.
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Monthly Reducing
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Max Sanction
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  ₹50 Lakhs
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Zero Collateral
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Verification
                  </span>
                </div>
                <div className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900">
                  100% Paperless
                </div>
                <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                  Aadhaar e-KYC
                </span>
              </div>
            </div>

            {/* Micro guarantees */}
            <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Soft Credit Pull (0 CIBIL Deduction)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                RBI-Licensed NBFCs & Banks Only
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                No Advance or Processing Fees Upfront
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Hero Qualifier Form */}
          <div className="lg:col-span-5">
            <InstantLoanHeroForm />
          </div>
        </div>

        {/* Partner Logos Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200/70">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">
            Pre-Approved Instant Disbursal Partners On Grofi
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-85">
            {partnerLogos.map((p, idx) => (
              <div
                key={idx}
                className="h-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                title={p.name}
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={110}
                  height={32}
                  className="max-h-7 max-w-[100px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
