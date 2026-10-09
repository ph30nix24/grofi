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
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { BalanceTransferLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferDetailModalProps {
  lender: BalanceTransferLender | null;
  onClose: () => void;
}

export default function BalanceTransferDetailModal({
  lender,
  onClose,
}: BalanceTransferDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<
    "overview" | "topup_od" | "eligibility" | "fees" | "highlights" | "faqs"
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
    { id: "topup_od", label: "Top-Up & Overdraft", icon: RefreshCw },
    { id: "eligibility", label: "Eligibility & LOD", icon: UserCheck },
    { id: "fees", label: "Processing & Caps", icon: FileText },
    { id: "highlights", label: "Pros & Highlights", icon: CheckCircle2 },
    { id: "faqs", label: "Lender FAQs", icon: HelpCircle },
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
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lender.badgeColor || "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                    {lender.badge}
                  </span>
                )}
                {lender.overdraftScheme && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Overdraft OD Available
                  </span>
                )}
              </div>

              <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                {lender.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {lender.tagline}
              </p>
            </div>

            {/* Rating pill */}
            <div className="hidden sm:flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="text-xs font-bold text-amber-900">{lender.rating}</span>
                <span className="text-[10px] text-gray-400">({lender.reviewCount})</span>
              </div>
              <span className="text-[10px] text-gray-400 mt-1">Verified Borrower Score</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-gray-800 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: OVERVIEW & RATES */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Starting Takeover Rate
                  </span>
                  <span className="text-xl font-extrabold text-primary font-bricolage mt-1 block">
                    {lender.interestRate.min}% <span className="text-xs font-semibold text-gray-500">p.a.</span>
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    Range: {lender.interestRate.text || `${lender.interestRate.min}% - ${lender.interestRate.max}%`}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Starting 20-Yr EMI
                  </span>
                  <span className="text-xl font-extrabold text-gray-900 font-mono mt-1 block">
                    ₹{lender.startingEmiPerLakh20Yr}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Per ₹1 Lakh Borrowed</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Starting 30-Yr EMI
                  </span>
                  <span className="text-xl font-extrabold text-gray-900 font-mono mt-1 block">
                    ₹{lender.startingEmiPerLakh30Yr}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Per ₹1 Lakh Borrowed</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Turnaround Speed
                  </span>
                  <span className="text-base font-bold text-gray-900 mt-1 block truncate">
                    {lender.turnaroundTime}
                  </span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">Fast-track cheque</span>
                </div>
              </div>

              {/* Recommended For Box */}
              <div className="bg-[#EBF4ED]/60 border border-primary/20 rounded-2xl p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Ideal Borrower Profile
                </span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {lender.recommendedFor}
                </p>
              </div>

              {/* Quick specs list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500">Maximum Loan Amount:</span>
                  <span className="font-bold text-gray-900">{lender.maxAmount}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500">Maximum Tenure:</span>
                  <span className="font-bold text-gray-900">{lender.maxTenure}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500">Max LTV Funding:</span>
                  <span className="font-bold text-gray-900">{lender.maxLtv}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500">Women Rate Concession:</span>
                  <span className="font-bold text-emerald-700">{lender.womenConcession}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TOP-UP & OVERDRAFT */}
          {activeTab === "topup_od" && (
            <div className="space-y-4">
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bricolage font-bold text-sm sm:text-base text-emerald-950">
                    Top-Up Loan Facility at Balance Transfer
                  </h4>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed mb-3">
                  When switching your loan to {lender.name}, you can avail an immediate Top-Up loan up to{" "}
                  <strong className="font-bold text-emerald-950">{lender.maxTopUpAmount}</strong> at standard home loan interest rates—substantially cheaper than high-cost personal loans (11%–16%).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200 text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-800/80 block">Top-Up Status</span>
                    <span className="font-bold text-emerald-950">{lender.topUpAvailable ? "Available Instantly" : "On Request"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-800/80 block">Max Limit</span>
                    <span className="font-bold text-emerald-950">{lender.maxTopUpAmount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-800/80 block">Separate Mortgage Charge</span>
                    <span className="font-bold text-emerald-950">Nil / Combined</span>
                  </div>
                </div>
              </div>

              {/* Overdraft Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <h4 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-2">
                  Overdraft / Smart Savings Scheme
                </h4>
                {lender.overdraftScheme ? (
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lender.overdraftScheme}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This scheme links your home loan account to a operational current account. Any surplus funds parked in this account offset your principal outstanding for daily interest computation. You retain full liquidity to withdraw at any time via NetBanking or ATM.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    {lender.name} provides a standard term loan balance transfer with fixed monthly EMIs and 0% foreclosure charges on floating interest rates.
                  </p>
                )}
              </div>

              {/* Foreclosure Rules */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">Prepayment & Foreclosure Penalty:</span>
                <span className="font-bold text-emerald-700">{lender.foreclosureCharges}</span>
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY & LOD */}
          {activeTab === "eligibility" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 block mb-1">
                    Minimum CIBIL Score
                  </span>
                  <span className="text-2xl font-extrabold text-primary font-bricolage block">
                    {lender.minCreditScore}+
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Scores of 750+ unlock lowest tier rates ({lender.interestRate.min}%).
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 block mb-1">
                    Minimum Monthly Income
                  </span>
                  <span className="text-2xl font-extrabold text-gray-900 font-bricolage block">
                    {lender.minIncome}
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Combined household or co-applicant income is accepted.
                  </p>
                </div>
              </div>

              {/* Essential LOD & Takeover Checklist */}
              <div className="bg-[#EBF4ED]/40 border border-primary/20 rounded-2xl p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                  List of Documents (LOD) & Takeover Paperwork
                </h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Foreclosure / Outstanding Balance Letter:</strong> Official statement from current bank specifying exact payoff amount and validity date.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>List of Documents (LOD):</strong> Formal bank letter detailing all original property title deeds in their custody.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Loan Track Record:</strong> Last 12 to 18 months repayment statement showing zero bouncing or overdue EMIs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Income & KYC Proof:</strong> 3 months salary slips, 6 months bank statement, Form 16 / ITR, PAN & Aadhaar.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: PROCESSING FEES & CAPS */}
          {activeTab === "fees" && (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Standard Processing Fee
                    </span>
                    <span className="text-base sm:text-lg font-bold text-gray-900 block mt-0.5">
                      {lender.processingFee}
                    </span>
                  </div>
                  {lender.processingFeePercent && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {lender.processingFeePercent}% of loan
                    </span>
                  )}
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">
                      Statutory Fee Protection Cap:
                    </span>
                    <span className="text-xs text-emerald-800 font-semibold block mt-0.5">
                      {lender.processingFeeCap || "Capped under standard takeover guidelines"}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-1">
                      Ensures your fees do not balloon even on large ₹1 Cr–₹5 Cr takeover amounts.
                    </span>
                  </div>
                </div>
              </div>

              {/* Ancillary Charges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500">Foreclosure Fee:</span>
                  <span className="font-bold text-emerald-700">{lender.foreclosureCharges}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500">Women Concession:</span>
                  <span className="font-bold text-gray-900">{lender.womenConcession}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HIGHLIGHTS & PROS */}
          {activeTab === "highlights" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                  Key Standout Features
                </h4>
                <div className="space-y-2">
                  {lender.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {lender.pros && lender.pros.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                    Key Advantages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {lender.pros.map((pro, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2 font-medium"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-3">
              {lender.faqs && lender.faqs.length > 0 ? (
                lender.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {faq.category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 shrink-0">
                              {faq.category}
                            </span>
                          )}
                          <span className="font-bricolage font-bold text-xs sm:text-sm text-gray-900 truncate">
                            {faq.question}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3.5 sm:px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-400 text-xs">
                  No FAQs listed for this lender.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs text-gray-500 block">
              Floor Interest Rate
            </span>
            <span className="text-base font-extrabold text-primary font-bricolage">
              {lender.interestRate.min}% p.a. • {lender.processingFeeCap || lender.processingFee}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                openApplyModal(
                  lender.name,
                  `Balance Transfer starting at ${lender.interestRate.min}% p.a. • ${lender.processingFeeCap || lender.processingFee}`
                );
              }}
              className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Apply for Transfer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
