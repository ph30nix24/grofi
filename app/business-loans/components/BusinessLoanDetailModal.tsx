"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Percent,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { BusinessLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanDetailModalProps {
  lender: BusinessLoanLender | null;
  onClose: () => void;
}

export default function BusinessLoanDetailModal({
  lender,
  onClose,
}: BusinessLoanDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<"overview" | "eligibility" | "documents" | "features" | "faqs">("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Close on Escape & disable scroll
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
    { id: "eligibility", label: "Eligibility Criteria", icon: UserCheck },
    { id: "documents", label: "Documents Required", icon: FileText },
    { id: "features", label: "Features & Benefits", icon: CheckCircle2 },
    { id: "faqs", label: "Lender FAQs", icon: HelpCircle },
  ] as const;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        {/* Header Section */}
        <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 via-white to-gray-50 relative">
          <button
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
                  {lender.bankType?.toUpperCase() || "LENDER"}
                </span>
                {lender.badge && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {lender.badge}
                  </span>
                )}
                {lender.rating && (
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-amber-50/70 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{lender.rating}</span>
                    <span className="text-gray-400 font-normal">({lender.reviewCount})</span>
                  </span>
                )}
              </div>

              <h2 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-snug">
                {lender.name}
              </h2>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lender.tagline}</p>
            </div>

            <button
              onClick={() => {
                onClose();
                openApplyModal(lender.name, lender.tagline);
              }}
              className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5 self-stretch sm:self-center justify-center"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden mt-6 -mb-6 pt-1 border-t border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-gray-700 text-xs sm:text-sm">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Metric Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Interest Rate Range
                  </span>
                  <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary block mt-0.5">
                    {lender.interestRate?.text || `${lender.interestRate?.min}% - ${lender.interestRate?.max}% p.a.`}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Reducing balance</span>
                </div>

                <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Starting Monthly EMI
                  </span>
                  <span className="font-bricolage font-bold text-base sm:text-lg text-emerald-800 block mt-0.5">
                    ₹{lender.startingEmiPerLakh} / Lakh
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Indicative lowest bracket</span>
                </div>

                <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Max Sanction Amount
                  </span>
                  <span className="font-bricolage font-bold text-base sm:text-lg text-gray-900 block mt-0.5">
                    {lender.maxAmount}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Based on audited financials</span>
                </div>

                <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Disbursal Turnaround
                  </span>
                  <span className="font-bricolage font-bold text-base sm:text-lg text-amber-800 block mt-0.5">
                    {lender.disbursalTime}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Digital e-KYC & approval</span>
                </div>
              </div>

              {/* Loan Specifications Table */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-3.5 bg-gray-50/70 border-b border-gray-200 font-bold text-xs uppercase tracking-wider text-gray-600">
                  Commercial Loan Specifications & Fee Structure
                </div>
                <div className="divide-y divide-gray-100 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 hover:bg-gray-50/50">
                    <span className="font-semibold text-gray-500">Repayment Tenure</span>
                    <span className="sm:col-span-2 font-bold text-gray-900">{lender.tenure} (Up to {lender.tenureMonths} Months)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 hover:bg-gray-50/50">
                    <span className="font-semibold text-gray-500">Processing Fee</span>
                    <span className="sm:col-span-2 font-bold text-gray-900">{lender.processingFee}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 hover:bg-gray-50/50">
                    <span className="font-semibold text-gray-500">Collateral Requirement</span>
                    <span className="sm:col-span-2 font-bold text-emerald-800">{lender.collateralType}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 hover:bg-gray-50/50">
                    <span className="font-semibold text-gray-500">Foreclosure & Prepayment</span>
                    <span className="sm:col-span-2 text-gray-800">{lender.foreclosureCharges}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 hover:bg-gray-50/50">
                    <span className="font-semibold text-gray-500">Recommended For</span>
                    <span className="sm:col-span-2 text-primary font-semibold">{lender.recommendedFor}</span>
                  </div>
                </div>
              </div>

              {/* Informational Callout */}
              <div className="bg-[#EBF4ED]/60 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-gray-600 leading-relaxed">
                  <strong className="text-gray-900 font-bold block mb-0.5">RBI Fair Practices Code Compliant</strong>
                  All interest rates are calculated strictly on monthly reducing balance method. Micro and Small Enterprises (MSEs) borrowing on floating rate benchmarks enjoy statutory zero-foreclosure privileges under RBI circulars.
                </div>
              </div>
            </div>
          )}

          {/* 2. ELIGIBILITY TAB */}
          {activeTab === "eligibility" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Min Annual Turnover</span>
                  <span className="font-bricolage font-bold text-lg text-primary block mt-1">{lender.minTurnover}</span>
                  <p className="text-[11px] text-gray-500 mt-1">Verified via GSTIN filing & Bank statement credits</p>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Operating Vintage</span>
                  <span className="font-bricolage font-bold text-lg text-gray-900 block mt-1">{lender.minVintage}</span>
                  <p className="text-[11px] text-gray-500 mt-1">From initial date of incorporation / GST registration</p>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Min CIBIL / CMR Score</span>
                  <span className="font-bricolage font-bold text-lg text-emerald-800 block mt-1">{lender.minCibilScore}+</span>
                  <p className="text-[11px] text-gray-500 mt-1">Clean repayment history on existing term & OD limits</p>
                </div>
              </div>

              {/* Eligible Entities */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3">Eligible Business Constitutions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Sole Proprietorships:</strong> Traders, retailers, merchants with GSTIN</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Partnerships & LLPs:</strong> Registered firms with deed & active trade</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Private Limited Companies:</strong> MSMEs & emerging corporate entities</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Self-Employed Professionals:</strong> Doctors, CAs, Architects, Engineers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. DOCUMENTS TAB */}
          {activeTab === "documents" && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-gray-600 mb-2">
                100% paperless document submission is supported via Digilocker and RBI Account Aggregator framework:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80 space-y-2">
                  <h4 className="font-bricolage font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-gold" />
                    <span>Promoter & Director KYC</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>PAN Card of all Promoters / Partners / Directors</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Aadhaar Card (instant e-KYC verification)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Passport size photo & residential address proof</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80 space-y-2">
                  <h4 className="font-bricolage font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-gold" />
                    <span>Business Entity Proof</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>GST Registration Certificate & Udyam MSME certificate</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Partnership Deed / MOA & AOA with Certificate of Incorporation</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Shop & Establishment License or Trade License</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80 space-y-2">
                  <h4 className="font-bricolage font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gold" />
                    <span>Financial Statements</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Last 2 years Income Tax Returns (ITR) with CA computation</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Audited Balance Sheet and Profit & Loss Statement (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Past 12 months GSTR-3B and GSTR-1 returns</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80 space-y-2">
                  <h4 className="font-bricolage font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-gold" />
                    <span>Banking Records</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Latest 6 to 12 months Current Account bank statements</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct sync supported via RBI Account Aggregator</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Sanction letter & track record for existing credit lines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 4. FEATURES TAB */}
          {activeTab === "features" && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bricolage font-bold text-base text-gray-900">
                Key Product Benefits for Enterprise Borrowers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lender.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-gray-200/80 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700 leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. FAQS TAB */}
          {activeTab === "faqs" && (
            <div className="space-y-3 animate-fadeIn">
              <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                Frequently Asked Questions for {lender.name}
              </h4>
              {lender.faqs && lender.faqs.length > 0 ? (
                lender.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer"
                      >
                        <span className="font-bricolage font-bold text-xs sm:text-sm text-gray-900">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
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
                <p className="text-xs text-gray-500 italic">No specific FAQs available for this lender.</p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Pre-Approval Impact on CIBIL</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 font-bold px-4 py-2 rounded-xl bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                openApplyModal(lender.name, lender.tagline);
              }}
              className="bg-primary hover:bg-[#035259] text-white font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
