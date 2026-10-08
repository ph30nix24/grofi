"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Percent,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  FileText,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { ShortTermLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanDetailModalProps {
  lender: ShortTermLoanLender | null;
  onClose: () => void;
}

export default function ShortTermLoanDetailModal({
  lender,
  onClose,
}: ShortTermLoanDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<"overview" | "rbi" | "eligibility" | "faqs">("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
    { id: "rbi", label: "RBI & Safeguards", icon: ShieldCheck },
    { id: "eligibility", label: "Eligibility & KYC", icon: UserCheck },
    { id: "faqs", label: "Pros, Cons & FAQs", icon: FileText },
  ] as const;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 via-white to-gray-50 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 p-2 shadow-2xs flex items-center justify-center shrink-0">
              <Image
                src={lender.logo}
                alt={lender.name}
                width={56}
                height={56}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                  {lender.name}
                </span>
                {lender.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"}`}>
                    {lender.badge}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lender.disbursalTime}
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2">{lender.tagline}</p>

              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {lender.rbiRegulatedEntity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-4 sm:px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "border-primary text-primary bg-white/70"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-gray-700 text-xs">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Top Rate Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                    Annual Rate (APR)
                  </span>
                  <div className="font-bricolage font-extrabold text-base sm:text-lg text-primary">
                    {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                  </div>
                  {lender.interestRate?.monthlyRateText && (
                    <span className="text-[10px] text-amber-700 font-medium block mt-0.5">
                      {lender.interestRate.monthlyRateText}
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                    Starting EMI (12M)
                  </span>
                  <div className="font-bricolage font-extrabold text-base sm:text-lg text-amber-900">
                    ₹{new Intl.NumberFormat("en-IN").format(lender.startingEmiPerLakh)}
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">per ₹1 Lakh</span>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                    Loan Amount
                  </span>
                  <div className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900">
                    {lender.minAmount} - {lender.maxAmount}
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Micro to Large</span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                    Processing Fee
                  </span>
                  <div className="font-bricolage font-bold text-xs sm:text-sm text-emerald-900">
                    {lender.processingFee}
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Transparent KFS</span>
                </div>
              </div>

              {/* Short Tenure Options */}
              <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/70">
                <span className="font-bricolage font-bold text-sm text-gray-900 block mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  Available Short Tenure Options
                </span>
                <div className="flex flex-wrap gap-2">
                  {lender.shortTenureOptions?.map((opt) => (
                    <span
                      key={opt}
                      className="px-3 py-1.5 rounded-xl bg-white text-gray-900 border border-amber-200 font-bold text-xs shadow-2xs"
                    >
                      {opt}
                    </span>
                  )) || (
                    <span className="text-gray-700 font-semibold">{lender.tenure}</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-2">
                  Borrowers can choose compact repayment tenures to keep total interest outgo minimal, closing the loan early whenever cash is available.
                </p>
              </div>

              {/* Features List */}
              <div>
                <span className="font-bricolage font-bold text-sm text-gray-900 block mb-3">
                  Key Product Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {lender.features?.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "rbi" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span className="font-bricolage font-bold text-sm text-emerald-950">
                    RBI Digital Lending Compliance
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed mb-3">
                  This loan is originated by <strong className="text-gray-900">{lender.rbiRegulatedEntity}</strong>. It operates under strict supervision of the Reserve Bank of India.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-emerald-200/80">
                    <strong className="text-gray-900 font-bold block mb-1">
                      Cooling-Off / Look-Up Period
                    </strong>
                    <span className="text-emerald-800 font-semibold text-sm block">
                      {lender.coolingOffPeriod}
                    </span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">
                      Exit the loan by paying principal and proportionate APR with zero penalty.
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200/80">
                    <strong className="text-gray-900 font-bold block mb-1">
                      Key Fact Statement (KFS)
                    </strong>
                    <span className="text-emerald-800 font-semibold text-sm block">
                      {lender.kfsProvided ? "100% Mandated & Provided" : "Standardized KFS"}
                    </span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">
                      Itemizes full APR, recovery mechanisms, and net disbursement before agreement signing.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                <span className="font-bold text-gray-900 text-xs block">
                  Mandatory Consumer Safeguards:
                </span>
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No intrusive permissions: No access to your contact book or photo gallery.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct bank-to-bank transfer: Zero intermediate unregulated wallets.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent digital recovery: Strict adherence to RBI Fair Practices Code.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "eligibility" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Minimum Credit Score
                  </span>
                  <div className="font-bricolage font-extrabold text-base text-gray-900">
                    {lender.minCreditScore}+ CIBIL
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {lender.minCreditScore <= 600 ? "Friendly to thin credit files" : "Standard credit profile"}
                  </span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Minimum Monthly Income
                  </span>
                  <div className="font-bricolage font-extrabold text-base text-gray-900">
                    {lender.minIncome}
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    Net credited to bank account
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/10">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
                  Documentation Mode
                </span>
                <span className="font-bold text-primary text-sm block">
                  {lender.documentation}
                </span>
                <p className="text-[11px] text-gray-600 mt-1">
                  100% paperless verification using Aadhaar OTP e-KYC and Sahamati Account Aggregator for instant bank verification without manual salary slip or PDF uploads.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                <span className="text-amber-800 text-[10px] font-bold uppercase tracking-wider block mb-1">
                  Best Suited For
                </span>
                <span className="font-bold text-gray-900 text-xs block">
                  {lender.recommendedFor}
                </span>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-6">
              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200">
                  <span className="font-bricolage font-bold text-xs text-emerald-900 block mb-2">
                    Key Advantages
                  </span>
                  <ul className="space-y-1.5">
                    {lender.pros?.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/40 p-4 rounded-2xl border border-red-200">
                  <span className="font-bricolage font-bold text-xs text-red-900 block mb-2">
                    Points to Keep in Mind
                  </span>
                  <ul className="space-y-1.5">
                    {lender.cons?.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-red-800">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lender FAQs from DB */}
              {lender.faqs && lender.faqs.length > 0 && (
                <div>
                  <span className="font-bricolage font-bold text-sm text-gray-900 block mb-3">
                    Frequently Asked Questions for {lender.name}
                  </span>
                  <div className="space-y-2">
                    {lender.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                          className="w-full text-left p-3 flex items-center justify-between gap-2 cursor-pointer font-semibold text-xs text-gray-900 hover:bg-gray-100/60"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              openFaqIndex === i ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaqIndex === i && (
                          <div className="px-3 pb-3 text-[11px] text-gray-600 border-t border-gray-100 pt-2 bg-white">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Apply CTA */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
          <div className="hidden sm:block text-xs text-gray-500">
            <span>Disbursal: <strong className="text-gray-900">{lender.disbursalTime}</strong></span>
            <span className="mx-2">•</span>
            <span>Tenure: <strong className="text-gray-900">{lender.shortTenureOptions?.[0] || lender.tenure}</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                openApplyModal(
                  lender.name,
                  `Short-Term Loan application for ${lender.name}`
                );
              }}
              className="bg-primary hover:bg-[#02383d] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for {lender.name.replace(/Personal Loan|Instant Loan/i, "").trim()}</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
