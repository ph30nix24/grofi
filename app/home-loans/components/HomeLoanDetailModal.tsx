"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Star,
  CheckCircle2,
  FileText,
  UserCheck,
  Percent,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Building2,
  Home,
  RefreshCw,
  Info,
} from "lucide-react";
import { HomeLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface HomeLoanDetailModalProps {
  lender: HomeLoanLender | null;
  onClose: () => void;
}

export default function HomeLoanDetailModal({
  lender,
  onClose,
}: HomeLoanDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<
    "overview" | "ltv_overdraft" | "eligibility" | "documents" | "pros" | "faqs"
  >("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Close on Escape & disable background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lender) {
        onClose();
      }
    };
    if (lender) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lender, onClose]);

  if (!lender) return null;

  const tabs = [
    { id: "overview", label: "Overview & Rates", icon: Percent },
    { id: "ltv_overdraft", label: "LTV & Overdraft", icon: Home },
    { id: "eligibility", label: "Eligibility", icon: UserCheck },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "pros", label: "Pros & Verdict", icon: CheckCircle2 },
    { id: "faqs", label: "Bank FAQs", icon: HelpCircle },
  ] as const;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        
        {/* Header Section */}
        <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 via-white to-gray-50 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pr-10">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shadow-xs shrink-0">
              <Image
                src={lender.logo}
                alt={lender.name}
                width={60}
                height={60}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {lender.bankType.toUpperCase()}
                </span>
                {lender.badge && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {lender.badge}
                  </span>
                )}
                {lender.overdraftScheme && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    Overdraft: {lender.overdraftScheme}
                  </span>
                )}
              </div>

              <h2 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 tracking-tight leading-snug">
                {lender.name}
              </h2>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                {lender.tagline}
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-900">{lender.rating}</span>
                <span className="text-[10px] text-gray-500">({lender.reviewCount})</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-1">Verified Borrower Rating</span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-gray-100">
            <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-semibold block uppercase">Interest Rate</span>
              <span className="font-bricolage font-bold text-primary text-sm sm:text-base">
                {lender.interestRate?.text}
              </span>
            </div>
            <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-semibold block uppercase">Starting EMI / Lakh</span>
              <span className="font-bricolage font-bold text-gray-900 text-sm sm:text-base">
                ₹{lender.startingEmiPerLakh20Yr} <span className="text-[10px] font-normal text-gray-500">(20Y)</span>
              </span>
            </div>
            <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-semibold block uppercase">Max Funding</span>
              <span className="font-bricolage font-bold text-blue-700 text-sm sm:text-base">
                {lender.maxLtv}
              </span>
            </div>
            <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-semibold block uppercase">Women Concession</span>
              <span className="font-bricolage font-bold text-emerald-700 text-sm sm:text-base">
                {lender.womenConcession.split(" ")[0]} {lender.womenConcession.includes("bps") ? "bps Off" : "Discount"}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-4 sm:px-6 bg-gray-50/50 overflow-x-auto gap-2 scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-primary" />
                    <span>Rate & Benchmark Structure</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Benchmark Type:</span>
                      <span className="font-semibold text-gray-800">RBI Repo-linked EBLR</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Interest Rate Slabs:</span>
                      <span className="font-semibold text-primary">{lender.interestRate?.text}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">EMI per ₹1 Lakh (20 Yr):</span>
                      <span className="font-semibold text-gray-900">₹{lender.startingEmiPerLakh20Yr} / month</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">EMI per ₹1 Lakh (30 Yr):</span>
                      <span className="font-semibold text-emerald-700">₹{lender.startingEmiPerLakh30Yr} / month</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Max Repayment Tenure:</span>
                      <span className="font-semibold text-gray-900">{lender.maxTenure}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Fees & Foreclosure Policy</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Processing Fee:</span>
                      <span className="font-semibold text-gray-800 text-right max-w-[200px]">{lender.processingFee}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Prepayment / Foreclosure:</span>
                      <span className="font-semibold text-emerald-700">{lender.foreclosureCharges}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Legal & Technical Valuation:</span>
                      <span className="font-semibold text-gray-800">At actuals (approx ₹3,500 – ₹7,500)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Stamp Duty & MODT:</span>
                      <span className="font-semibold text-gray-800">As per state government rules</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended For Box */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-gold/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4 text-[#8c6e18]" />
                  </div>
                  <div>
                    <h5 className="font-bricolage font-bold text-xs sm:text-sm text-gray-900">
                      Grofi Editorial Recommendation
                    </h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {lender.recommendedFor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LTV & OVERDRAFT */}
          {activeTab === "ltv_overdraft" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <h4 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-700" />
                  <span>RBI Loan-to-Value (LTV) Framework for {lender.name}</span>
                </h4>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  LTV indicates the percentage of the property&apos;s registered agreement value that the lender will finance. You provide the rest as your down payment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
                    <span className="text-[10px] font-bold uppercase text-blue-600">Property ≤ ₹30 Lakhs</span>
                    <div className="font-bricolage font-extrabold text-xl text-blue-900 mt-1">Up to 90%</div>
                    <p className="text-[11px] text-blue-700 mt-1">Down payment: Minimum 10%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-[10px] font-bold uppercase text-gray-500">₹30 Lakhs – ₹75 Lakhs</span>
                    <div className="font-bricolage font-extrabold text-xl text-gray-900 mt-1">Up to 80%</div>
                    <p className="text-[11px] text-gray-600 mt-1">Down payment: Minimum 20%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-[10px] font-bold uppercase text-gray-500">Above ₹75 Lakhs</span>
                    <div className="font-bricolage font-extrabold text-xl text-gray-900 mt-1">Up to 75%</div>
                    <p className="text-[11px] text-gray-600 mt-1">Down payment: Minimum 25%</p>
                  </div>
                </div>
              </div>

              {/* Overdraft Section */}
              <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-purple-200">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      Interest-Saving Innovation
                    </span>
                    <h4 className="font-bricolage font-bold text-base text-gray-900 mt-1.5">
                      {lender.overdraftScheme ? `${lender.overdraftScheme} Facility` : "Home Loan Overdraft Availability"}
                    </h4>
                  </div>
                  <RefreshCw className="w-5 h-5 text-purple-600 shrink-0" />
                </div>

                {lender.overdraftScheme ? (
                  <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                    <p>
                      With {lender.overdraftScheme}, your home loan account functions with an attached current account. Any surplus funds, monthly salary credits, or bonus savings parked into this account are automatically offset against your outstanding home loan principal for daily interest calculation.
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                      <span className="font-medium text-purple-900">Liquidity with Zero Penalty:</span>
                      <span className="text-gray-600">Withdraw your funds anytime via ATM, UPI, or NetBanking without pre-closure charges.</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-600">
                    {lender.name} currently does not provide an integrated overdraft savings account product. Standard term housing loans with zero part-prepayment charges are provided.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY */}
          {activeTab === "eligibility" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <span>Salaried Individuals</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Age Bracket:</span>
                      <span className="font-semibold text-gray-800">21 to 65 years</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Minimum Monthly Income:</span>
                      <span className="font-semibold text-primary">{lender.minIncome}</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Minimum CIBIL Score:</span>
                      <span className="font-semibold text-emerald-700">{lender.minCreditScore}+</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Employment Vintage:</span>
                      <span className="font-semibold text-gray-800">Min 2 yrs total (6 mos current)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-gold" />
                    <span>Self-Employed / Business</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Age Bracket:</span>
                      <span className="font-semibold text-gray-800">23 to 70 years</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Minimum Annual Income:</span>
                      <span className="font-semibold text-primary">₹3.5 Lakhs+ ITR</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Minimum CIBIL Score:</span>
                      <span className="font-semibold text-emerald-700">{lender.minCreditScore}+</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Business Continuity:</span>
                      <span className="font-semibold text-gray-800">Min 3 years verified</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Women Concession Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-900 block">Women Borrower Concession Available:</span>
                  <p className="text-emerald-700">{lender.womenConcession}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200">
                  <h5 className="font-bricolage font-bold text-xs uppercase text-primary tracking-wider mb-2">
                    1. Applicant KYC & Income Proof
                  </h5>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>PAN Card and Aadhaar Card (e-KYC verified)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Latest 3 months salary slips with official seal/letterhead</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Last 6 months salary bank account statement (PDF)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Latest Form 16 (Part A & B) or 2 years filed ITR</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200">
                  <h5 className="font-bricolage font-bold text-xs uppercase text-primary tracking-wider mb-2">
                    2. Property Legal Documents
                  </h5>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Registered Agreement for Sale / Allotment Letter</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Approved Building Plan & Commencement Certificate</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>NOC from Builder / Society / Statutory Authority</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Title Search Report (Chain of title deeds for 30 years)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROS & VERDICT */}
          {activeTab === "pros" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Advantages & Highlights</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {lender.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {lender.pros && lender.pros.length > 0 && (
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
                  <h5 className="font-bricolage font-bold text-xs uppercase text-emerald-900 tracking-wider mb-2">
                    Why Borrowers Choose {lender.name}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {lender.pros.map((p, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200 shadow-2xs">
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-3 animate-fadeIn">
              {lender.faqs && lender.faqs.length > 0 ? (
                lender.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary">Q{idx + 1}.</span>
                          <span className="text-xs sm:text-sm font-bold text-gray-900">{faq.question}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-1 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-gray-500">
                  No lender-specific FAQs recorded. Refer to general FAQs below.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero obligation • Soft inquiry with zero CIBIL impact</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openApplyModal(lender.name, `Home Loan - ${lender.interestRate?.text}`);
              }}
              className="flex-1 sm:flex-initial bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>Apply for {lender.name}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
