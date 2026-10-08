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
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Smartphone,
  Download,
} from "lucide-react";
import { InstantLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface InstantLoanDetailModalProps {
  lender: InstantLoanLender | null;
  onClose: () => void;
}

export default function InstantLoanDetailModal({
  lender,
  onClose,
}: InstantLoanDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<"overview" | "speed" | "eligibility" | "features">("overview");

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
    { id: "speed", label: "Speed & Journey", icon: Zap },
    { id: "eligibility", label: "Eligibility & KYC", icon: UserCheck },
    { id: "features", label: "Features & Safety", icon: ShieldCheck },
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
                  {lender.disbursalTime} Disbursal
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-1">{lender.tagline}</p>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{lender.rating.toFixed(1)}</span>
                  <span className="text-gray-400 font-normal">
                    ({lender.appDownloads ? `${lender.appDownloads} downloads` : `${lender.reviewCount} reviews`})
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RBI-Governed {lender.lenderType.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-5 overflow-x-auto border-b border-gray-200/80 pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
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
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 4 Stat Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Interest Rate</span>
                  <p className="font-bricolage font-bold text-base text-emerald-700 mt-1">{lender.interestRate.text}</p>
                  <span className="text-[10px] text-gray-500">Reducing Balance</span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Starting EMI</span>
                  <p className="font-bricolage font-bold text-base text-gray-900 mt-1">
                    ₹{lender.startingEmiPerLakh.toLocaleString("en-IN")}/mo
                  </p>
                  <span className="text-[10px] text-gray-500">Per ₹1 Lakh Borrowed</span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Max Amount</span>
                  <p className="font-bricolage font-bold text-base text-primary mt-1">{lender.maxAmount}</p>
                  <span className="text-[10px] text-gray-500">From {lender.minAmount}</span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Disbursal Window</span>
                  <p className="font-bricolage font-bold text-base text-amber-700 mt-1">{lender.disbursalTime}</p>
                  <span className="text-[10px] text-gray-500">100% Digital KYC</span>
                </div>
              </div>

              {/* Fee and tenure specifics */}
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                  Transparent Fees & Tenure Terms
                </h4>
                <div className="flex justify-between py-1.5 border-b border-gray-200/50">
                  <span className="text-gray-500">Processing Fee:</span>
                  <span className="font-semibold text-gray-800">{lender.processingFee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-200/50">
                  <span className="text-gray-500">Loan Tenure:</span>
                  <span className="font-semibold text-gray-800">{lender.tenure}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-200/50">
                  <span className="text-gray-500">Best Recommended For:</span>
                  <span className="font-semibold text-primary">{lender.recommendedFor}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Security / Collateral:</span>
                  <span className="font-semibold text-emerald-700">None (100% Unsecured Personal Loan)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "speed" && (
            <div className="space-y-5">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-bricolage font-bold text-sm text-gray-900">
                    Disbursal Timeframe: {lender.disbursalTime}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Once digital KYC and the Key Fact Statement (KFS) are accepted, funds are pushed via instant IMPS or NEFT straight to your savings account.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bricolage font-bold text-sm text-gray-900">
                  Disbursal Journey Breakdown:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="font-bold text-primary block mb-1">1. Soft Verification</span>
                    <p className="text-gray-500">Mobile OTP & PAN verification in under 60 seconds with zero credit score hit.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="font-bold text-primary block mb-1">2. Digital Underwriting</span>
                    <p className="text-gray-500">{lender.documentation} using RBI Account Aggregator or Aadhaar OTP.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="font-bold text-primary block mb-1">3. Direct Deposit</span>
                    <p className="text-gray-500">Funds credited in {lender.disbursalTime} directly to your active bank account.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "eligibility" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-primary" />
                    Eligibility Criteria
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500">Min CIBIL Score:</span>
                      <span className="font-bold text-gray-800">{lender.minCreditScore}+</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500">Min Monthly Income:</span>
                      <span className="font-bold text-gray-800">{lender.minIncome}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500">Borrower Age:</span>
                      <span className="font-semibold text-gray-800">21 - 58 Years</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Citizenship:</span>
                      <span className="font-semibold text-gray-800">Resident Indian Citizen</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Required Paperless KYC
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>PAN Card number for instant credit bureau check</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Aadhaar number linked to active mobile for OTP e-KYC</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Net banking or Account Aggregator consent for salary proof</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No physical paperwork or physical branch visitation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-4">
              <div className="bg-[#EBF4ED] p-4 rounded-2xl border border-primary/20 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bricolage font-bold text-sm text-gray-900">
                    100% RBI Regulatory Compliance
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    This loan is facilitated strictly by RBI-registered banks or systemically important NBFCs. No phone contacts or gallery access requested. Full Key Fact Statement (KFS) provided before loan execution.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">Key Lender Highlights:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {lender.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 flex items-start gap-2.5 text-xs text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            Soft credit pull • Disbursal in {lender.disbursalTime}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-none text-center"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                openApplyModal(lender.name, `Instant loan with ${lender.disbursalTime} disbursal`);
              }}
              className="px-5 py-2.5 bg-primary hover:bg-[#02383d] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
            >
              <span>Apply for {lender.name.replace(/Personal Loan|Instant Loan/i, "").trim()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
