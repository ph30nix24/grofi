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
  IndianRupee,
} from "lucide-react";
import { PersonalLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface PersonalLoanDetailModalProps {
  lender: PersonalLoanLender | null;
  onClose: () => void;
}

export default function PersonalLoanDetailModal({
  lender,
  onClose,
}: PersonalLoanDetailModalProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState<"overview" | "eligibility" | "documents" | "proscons" | "faqs">("overview");
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
    { id: "overview", label: "Overview & Charges", icon: Percent },
    { id: "eligibility", label: "Eligibility", icon: UserCheck },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "proscons", label: "Pros & Cons", icon: CheckCircle2 },
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
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{lender.rating}</span>
                    {lender.reviewCount && (
                      <span className="text-gray-600 font-normal">({lender.reviewCount})</span>
                    )}
                  </span>
                )}
              </div>

              <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                {lender.name}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                {lender.tagline}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-gray-200/70 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100">
              <span className="text-gray-600 block text-[10px] uppercase font-bold">Interest Rate</span>
              <span className="font-bricolage font-bold text-sm sm:text-base text-primary">
                {lender.interestRate?.min ?? 9.99}% - {lender.interestRate?.max ?? 24}%
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100">
              <span className="text-gray-600 block text-[10px] uppercase font-bold">Max Loan Limit</span>
              <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900">{lender.maxAmount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100">
              <span className="text-gray-600 block text-[10px] uppercase font-bold">Disbursal Time</span>
              <span className="font-bold text-xs sm:text-sm text-amber-800">{lender.disbursalTime}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100">
              <span className="text-gray-600 block text-[10px] uppercase font-bold">Starting EMI</span>
              <span className="font-bold text-xs sm:text-sm text-emerald-800">₹{lender.startingEmiPerLakh} / Lakh</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-1 scrollbar-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW & CHARGES */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              {lender.overview && (
                <div>
                  <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">Editorial Verdict & Overview</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200/80">
                    {lender.overview}
                  </p>
                </div>
              )}

              {/* Comprehensive Fee Matrix */}
              <div>
                <h4 className="font-bricolage font-bold text-base text-gray-900 mb-3">Complete Fee & Charges Matrix</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block mb-1">Processing Fee</span>
                    <p className="font-semibold text-gray-800">{lender.processingFee}</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block mb-1">Foreclosure Charges</span>
                    <p className="font-semibold text-gray-800">{lender.foreclosureCharges || "2% to 4% after 12 EMIs"}</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block mb-1">Part-Prepayment Facility</span>
                    <p className="font-semibold text-gray-800">{lender.partPrepayment || "Allowed up to 25% of principal once a year"}</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block mb-1">Lock-In Period</span>
                    <p className="font-semibold text-gray-800">{lender.lockInPeriod || "6 Months minimum"}</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block mb-1">Annual Percentage Rate (APR)</span>
                    <p className="font-semibold text-gray-800">{lender.aprRange || "10.45% - 25.00% p.a."}</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block mb-1">Bounce Charges & Stamp Duty</span>
                    <p className="font-semibold text-gray-800">{lender.bounceCharges || "₹450 + GST"} • {lender.stampDuty || "As per State Act"}</p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-bricolage font-bold text-base text-gray-900 mb-3">Key Product Features</h4>
                <div className="space-y-2">
                  {lender.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY */}
          {activeTab === "eligibility" && (
            <div className="space-y-5 animate-fadeIn">
              <h4 className="font-bricolage font-bold text-base text-gray-900">Eligibility Criteria Requirements</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Applicant Age Bracket</span>
                  <p className="font-bold text-gray-900 text-sm">
                    {lender.eligibilityDetails?.age || "21 to 60 Years"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Minimum Net Monthly Salary</span>
                  <p className="font-bold text-emerald-800 text-sm">
                    {lender.eligibilityDetails?.minIncome || lender.minIncome}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Credit Score (CIBIL)</span>
                  <p className="font-bold text-primary text-sm">
                    {lender.eligibilityDetails?.cibil || `${lender.minCreditScore}+ or higher recommended`}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Employment Type</span>
                  <p className="font-bold text-gray-900 text-sm">
                    {lender.eligibilityDetails?.employmentType || "Salaried / Self-Employed Professional"}
                  </p>
                </div>
              </div>

              {lender.eligibilityDetails?.workExperience && (
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Work Experience Norm:</strong>
                    <span>{lender.eligibilityDetails.workExperience}</span>
                  </div>
                </div>
              )}

              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-0.5">Zero Credit Score Impact on Check</strong>
                  <span>Checking your eligibility through Grofi performs a soft inquiry which does not deduct points from your CIBIL profile.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bricolage font-bold text-base text-gray-900">Required Document Checklist</h4>
              <p className="text-xs text-gray-500">
                100% digital verification available via DigiLocker and RBI Account Aggregator.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Proof of Identity & Address</span>
                    <p className="text-gray-600 mt-0.5">
                      {lender.documentChecklist?.identityProof || "Aadhaar Card (instant OTP verification), PAN Card, Voter ID, or Passport"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Proof of Income</span>
                    <p className="text-gray-600 mt-0.5">
                      {lender.documentChecklist?.incomeProof || "Latest 3 months salary slips with corporate email OTP verification"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Bank Statement</span>
                    <p className="text-gray-600 mt-0.5">
                      {lender.documentChecklist?.bankProof || "Latest 6 months salary bank account statement via Account Aggregator (no PDF required)"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Employment Proof</span>
                    <p className="text-gray-600 mt-0.5">
                      {lender.documentChecklist?.employmentProof || "Official Company Employee ID card or Appointment/Offer Letter"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROS & CONS */}
          {activeTab === "proscons" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Pros */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4">
                  <h4 className="font-bricolage font-bold text-sm text-emerald-950 flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Key Advantages
                  </h4>
                  <ul className="space-y-2 text-xs text-emerald-900 font-montserrat">
                    {(lender.pros && lender.pros.length > 0
                      ? lender.pros
                      : [
                          "Fast digital approval & high sanction limits",
                          "Competitive interest rates starting from 9.99%",
                          "Paperless Account Aggregator e-KYC integration",
                        ]
                    ).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4">
                  <h4 className="font-bricolage font-bold text-sm text-amber-950 flex items-center gap-1.5 mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Things to Consider
                  </h4>
                  <ul className="space-y-2 text-xs text-amber-900 font-montserrat">
                    {(lender.cons && lender.cons.length > 0
                      ? lender.cons
                      : [
                          "Foreclosure charges may apply before completion of lock-in period",
                          "Rates vary based on company category and applicant credit profile",
                        ]
                    ).map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-3 animate-fadeIn">
              <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                Frequently Asked Questions about {lender.name}
              </h4>
              
              {lender.customFaqs && lender.customFaqs.length > 0 ? (
                lender.customFaqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-gray-600 font-montserrat leading-relaxed border-t border-gray-100 pt-2.5 bg-gray-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-500 py-4">No custom FAQs recorded for this lender.</p>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-gray-500 block">Lowest Rate Starting From</span>
            <span className="font-bricolage font-extrabold text-lg text-primary">
              {lender.interestRate?.min ?? 9.99}% p.a.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                openApplyModal(lender.name, lender.tagline);
              }}
              className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Apply with {lender.name.replace(/Personal Loan/i, "").trim()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
