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
  ArrowRight,
  ShieldCheck,
  Home,
  RefreshCw,
  Info,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyDetailModalProps {
  lender: LoanAgainstPropertyLender | null;
  onClose: () => void;
}

export default function LoanAgainstPropertyDetailModal({
  lender,
  onClose,
}: LoanAgainstPropertyDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<
    "overview" | "ltv_collateral" | "eligibility" | "documents" | "pros"
  >("overview");

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
    { id: "ltv_collateral", label: "LTV & Collateral", icon: Home },
    { id: "eligibility", label: "Eligibility", icon: UserCheck },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "pros", label: "Pros & Verdict", icon: CheckCircle2 },
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
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${lender.badgeColor || "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                    {lender.badge}
                  </span>
                )}
                {lender.overdraftAvailable && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Overdraft Available
                  </span>
                )}
              </div>

              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
                {lender.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {lender.tagline}
              </p>
            </div>

            {/* Rating Box */}
            <div className="hidden sm:flex flex-col items-end shrink-0 pl-4 border-l border-gray-200">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="font-bricolage font-bold text-sm text-amber-900">
                  {lender.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 mt-1">
                {lender.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-100">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">Interest Rate</span>
              <span className="font-bricolage font-bold text-sm text-gray-900">
                {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">Max LTV Ratio</span>
              <span className="font-bricolage font-bold text-sm text-emerald-700">
                {lender.maxLtvPercent}% LTV
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">Max Loan Amount</span>
              <span className="font-bricolage font-bold text-sm text-gray-900 truncate block">
                {lender.maxAmount}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">Max Tenure</span>
              <span className="font-bricolage font-bold text-sm text-primary">
                {lender.maxTenure}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto mt-4 pt-2 -mb-2 border-t border-gray-100 scrollbar-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
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

        {/* Modal Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW & RATES */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-fadeIn">
              {/* Rate & Fee Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-gold" />
                    Interest Rates & EMI Benchmarks
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Interest Rate Range:</span>
                      <strong className="text-gray-900 font-bold">{lender.interestRate?.text}</strong>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">EMI / ₹1 Lakh (15 Yrs):</span>
                      <strong className="text-primary font-bold">₹{lender.startingEmiPerLakh15Yr} / mo</strong>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">EMI / ₹1 Lakh (20 Yrs):</span>
                      <strong className="text-primary font-bold">₹{lender.startingEmiPerLakh20Yr} / mo</strong>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Benchmark Type:</span>
                      <span className="text-gray-700 font-medium">Repo Linked / EBLR / MCLR</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-primary" />
                    Processing Charges & Foreclosure
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Processing Fee:</span>
                      <span className="text-gray-900 font-medium">{lender.processingFee}</span>
                    </li>
                    {lender.processingFeeCap && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Fee Cap:</span>
                        <strong className="text-emerald-700 font-bold">{lender.processingFeeCap}</strong>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span className="text-gray-500">Foreclosure (Floating):</span>
                      <strong className="text-emerald-700 font-bold">0% / Nil (RBI Compliant)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Min CIBIL Score:</span>
                      <strong className="text-gray-900 font-bold">{lender.minCreditScore}+</strong>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-linear-to-br from-[#FDFBF7] to-white border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Features of {lender.name}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {lender.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LTV & COLLATERAL */}
          {activeTab === "ltv_collateral" && (
            <div className="space-y-5 animate-fadeIn">
              {/* LTV Breakdown */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bricolage font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-emerald-700" />
                    Loan to Value (LTV) Norms
                  </h4>
                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    Up to {lender.maxLtvPercent}% Market Value
                  </span>
                </div>
                <p className="text-xs text-emerald-900/80 mb-3">
                  {lender.maxLtv}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <strong className="block text-gray-900 font-bold mb-0.5">Residential</strong>
                    <span className="text-gray-600">Up to {lender.maxLtvPercent}% for self-occupied flats & houses</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <strong className="block text-gray-900 font-bold mb-0.5">Commercial</strong>
                    <span className="text-gray-600">Up to 60% - 65% for registered offices & retail spaces</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <strong className="block text-gray-900 font-bold mb-0.5">Industrial / Plot</strong>
                    <span className="text-gray-600">Up to 50% - 55% subject to municipal sanctions</span>
                  </div>
                </div>
              </div>

              {/* Overdraft Facility */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  Overdraft / Dropline OD Facility
                </h4>
                {lender.overdraftAvailable ? (
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lender.overdraftScheme || "Overdraft Scheme Available"}</span>
                    </div>
                    <p className="text-gray-600">
                      Link a current account to your property loan. Interest is calculated strictly on the daily utilized balance, not the sanctioned limit. Deposit surplus profits or business receivables anytime to instantly reduce interest outflow, and withdraw funds as needed via netbanking or chequebook.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    This institution primarily offers standard regular EMI Term Loans for Loan Against Property. Borrowers looking for an active OD limit can consider SBI, HDFC, ICICI, or Bank of Baroda.
                  </p>
                )}
              </div>

              {/* Accepted Collateral Types */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                  Permitted Property Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lender.propertyTypesAccepted.map((prop, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-white text-gray-800 border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY */}
          {activeTab === "eligibility" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-primary" />
                  Income & Profile Eligibility
                </h4>
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-900 block mb-1">Minimum Income Benchmark</span>
                    <p className="text-gray-600">{lender.minIncome}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-900 block mb-1">Minimum CIBIL Score</span>
                    <p className="text-gray-600">
                      Score of <strong className="text-gray-900 font-bold">{lender.minCreditScore}+</strong> required for lowest tier interest rates and fastest loan approvals.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-900 block mb-1">Age Limits</span>
                    <p className="text-gray-600">
                      Minimum 21 years at loan application; Maximum 65–70 years at loan maturity.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-900 block mb-1">Debt-to-Income / FOIR Ratio</span>
                    <p className="text-gray-600">
                      Total EMIs including the proposed LAP must not exceed 55% - 65% of net monthly verified income.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS REQUIRED */}
          {activeTab === "documents" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Property Docs */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-gold" />
                    Property Title Documents
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Original Registered Sale Deed / Conveyance Deed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mother Deed / 30-year chain of title deeds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Encumbrance Certificate (EC Form 15) for last 13–30 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Sanctioned Building Plan & Occupancy Certificate (OC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Latest Property Tax Paid receipts and Khata/Patta extract</span>
                    </li>
                  </ul>
                </div>

                {/* KYC & Financials */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" />
                    KYC & Income Proofs
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>PAN Card & Aadhaar / Passport of all property co-owners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Salaried: Last 3 months payslips & 6 months bank statement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Self-Employed: Last 3 years ITR with Computation of Income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Audited Balance Sheet & Profit & Loss statements with CA seal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>12 months current bank account statement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROS & VERDICT */}
          {activeTab === "pros" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 mb-3">
                  Why Choose {lender.name}?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {lender.pros.map((pro, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Advantage {idx + 1}</span>
                      </div>
                      <p className="text-xs text-gray-700 font-medium">{pro}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-linear-to-r from-[#EBF4ED] to-[#FDFBF7] p-4 rounded-xl border border-primary/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                    Editorial Verdict & Recommended Audience
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    {lender.recommendedFor}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-600 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pre-approved in-principle sanction with zero hard inquiry impact</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openApplyModal(lender.name, "Loan Against Property");
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-[#023337] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Apply for {lender.name.replace(/Loan Against Property|Mortgage Loan/i, "").trim()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
