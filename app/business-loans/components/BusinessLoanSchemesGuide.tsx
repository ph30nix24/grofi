"use client";

import React, { useState } from "react";
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Percent,
  Sparkles,
  ArrowRight,
  Info,
  Building,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function BusinessLoanSchemesGuide() {
  const { openApplyModal } = useApplyModal();
  const [activeScheme, setActiveScheme] = useState<"cgtmse" | "mudra" | "standup" | "pmegp">("cgtmse");

  const schemes = [
    {
      id: "cgtmse",
      name: "CGTMSE Guarantee",
      subtitle: "Up to ₹5 Cr Collateral-Free",
      badge: "Most Popular",
      coverage: "Up to 85% credit guarantee by Govt of India",
      loanLimit: "Up to ₹5 Crores",
      collateral: "Nil / Zero Third-Party Guarantee",
      target: "New and existing Micro & Small Enterprises (MSEs) in manufacturing and services.",
      highlights: [
        "Eliminates the requirement for secondary property or land mortgage",
        "Supported by all scheduled commercial banks (SBI, PNB, BoB, Canara, HDFC, ICICI)",
        "Covers term loans and working capital facilities (Cash Credit / Overdraft)",
        "Annual guarantee fee subsidized for women entrepreneurs, SC/ST, and aspirational districts",
      ],
      howToApply: "Apply directly through partner banks on Grofi. The lending bank submits the guarantee coverage directly to the CGTMSE trust portal.",
    },
    {
      id: "mudra",
      name: "Pradhan Mantri MUDRA",
      subtitle: "Shishu, Kishore & Tarun",
      badge: "Zero Paperwork",
      coverage: "100% collateral-free refinancing scheme",
      loanLimit: "Up to ₹20 Lakhs (Tarun Plus)",
      collateral: "Zero collateral required",
      target: "Non-corporate, non-farm small/micro enterprises, retailers, artisans, and shopkeepers.",
      highlights: [
        "Shishu: Loans up to ₹50,000 for early-stage micro-ventures",
        "Kishore: Loans from ₹50,000 to ₹5 Lakhs for working capital & equipment purchase",
        "Tarun: Loans from ₹5 Lakhs to ₹10 Lakhs for established enterprises",
        "Tarun Plus: Extended up to ₹20 Lakhs for entrepreneurs who repaid earlier loans",
      ],
      howToApply: "Available at all PSU and private banks. Requires basic KYC, Udyam registration, and past 6 months banking statements.",
    },
    {
      id: "standup",
      name: "Stand-Up India Scheme",
      subtitle: "For Women & SC/ST Promoters",
      badge: "Greenfield Focus",
      coverage: "Composite loan (term loan + working capital)",
      loanLimit: "₹10 Lakhs to ₹1 Crore",
      collateral: "CGTMSE guarantee or minimal collateral",
      target: "At least one SC/ST and one Woman entrepreneur per bank branch setting up a new venture.",
      highlights: [
        "Covers up to 85% of project cost (promoter contribution only 15%)",
        "Repayment period of up to 7 years with a moratorium period of up to 18 months",
        "Available for manufacturing, services, trading sectors, and agri-allied activities",
        "Includes pre-loan training, handholding, and working capital setup",
      ],
      howToApply: "Submit your business plan and project report through Grofi partner banks for priority Stand-Up processing.",
    },
    {
      id: "pmegp",
      name: "PMEGP Scheme",
      subtitle: "15% to 35% Govt Subsidy",
      badge: "Capital Subsidy",
      coverage: "Margin Money subsidy by Ministry of MSME",
      loanLimit: "Up to ₹50 Lakhs (Mfg) / ₹20 Lakhs (Services)",
      collateral: "Exempt up to ₹10 Lakhs / CGTMSE supported",
      target: "Individuals, SHGs, and production units generating employment in rural and urban areas.",
      highlights: [
        "Urban units receive 15% (General) to 25% (Special category) capital subsidy",
        "Rural units receive 25% (General) to 35% (Special category) subsidy straight into loan escrow",
        "Beneficiary contribution required is only 5% to 10% of total project cost",
        "No educational qualification needed for projects up to ₹10L in manufacturing and ₹5L in services",
      ],
      howToApply: "Apply online on KVIC PMEGP e-portal with project report, then route loan sanction via your preferred scheduled bank.",
    },
  ] as const;

  const current = schemes.find((s) => s.id === activeScheme) || schemes[0];

  return (
    <section id="msme-schemes-section" className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Government Backed MSME Support
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Indian Government MSME Schemes & <span className="text-primary">Subsidies</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Combine bank commercial credit lines with sovereign credit guarantees like CGTMSE and MUDRA to unlock collateral-free loans up to ₹5 Crores with subsidized rates.
          </p>
        </div>

        {/* Scheme Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {schemes.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScheme(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                activeScheme === item.id
                  ? "bg-[#FDFBF7] border-primary shadow-md ring-1 ring-primary/20"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {item.badge}
                </span>
                {activeScheme === item.id && (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </div>
              <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Selected Scheme Detail Card */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (7 cols): Highlights & Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-primary mb-1">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span>Scheme Details & Objective</span>
                </div>
                <h3 className="font-bricolage font-bold text-2xl text-gray-900 leading-tight">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  {current.target}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Sanction Quantum
                  </span>
                  <span className="font-bricolage font-bold text-sm sm:text-base text-primary block mt-0.5">
                    {current.loanLimit}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Collateral Security
                  </span>
                  <span className="font-bricolage font-bold text-sm sm:text-base text-emerald-800 block mt-0.5">
                    {current.collateral}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Guarantee / Subsidy
                  </span>
                  <span className="font-semibold text-xs text-gray-900 block mt-0.5">
                    {current.coverage}
                  </span>
                </div>
              </div>

              {/* Highlights Checklist */}
              <div>
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3">
                  Why Entrepreneurs Choose {current.name}:
                </h4>
                <div className="space-y-2.5">
                  {current.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): How to Apply & Direct Action */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
              <div>
                <h4 className="font-bricolage font-bold text-base text-gray-900 mb-1">
                  How to Access via Grofi
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {current.howToApply}
                </p>
              </div>

              <div className="bg-[#EBF4ED]/60 border border-primary/10 rounded-xl p-3.5 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% Seamless Banking Routing</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  When you apply on Grofi, our algorithm automatically identifies whether your profile qualifies for CGTMSE collateral-free guarantee or MUDRA subsidization, routing your application to the appropriate branch nodal officer.
                </p>
              </div>

              <button
                onClick={() => openApplyModal(`Govt Scheme: ${current.name}`, current.subtitle)}
                className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Apply for {current.name}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-gray-400">
                  Zero commission • Official banking channel integration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
