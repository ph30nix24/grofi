"use client";

import React from "react";
import {
  UserCheck,
  FileText,
  Briefcase,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Building,
  Landmark,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";
import { BusinessLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanEligibilityDocsSectionProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanEligibilityDocsSection({ lender }: BusinessLoanEligibilityDocsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const minTurnover = lender.minTurnover || "₹25 Lakhs / year";
  const minVintage = lender.minVintage || "2 Years in Business";
  const minScore = lender.minCibilScore || 700;

  const documents = [
    {
      title: "Business Registration & Proof",
      desc: "GST Registration Certificate, Udyam MSME Certificate, Partnership Deed or Certificate of Incorporation (COI) & MOA/AOA.",
      icon: Building,
    },
    {
      title: "GST Returns (12 Months)",
      desc: "GSTR-3B and GSTR-1 returns for the trailing 12 months (automated digital OTP pull available via GSTN portal).",
      icon: FileSpreadsheet,
    },
    {
      title: "Current Account Bank Statements",
      desc: "Latest 6 to 12 months primary current account statements fetched friction-free via RBI-regulated Account Aggregators.",
      icon: Landmark,
    },
    {
      title: "Financials & Income Tax Returns",
      desc: "Last 2 fiscal years ITR with computation of income, CA-audited Balance Sheet, and Profit & Loss statements for limits above ₹25 Lakhs.",
      icon: Briefcase,
    },
    {
      title: "Promoter & Director KYC",
      desc: "PAN Card and Aadhaar (DigiLocker instant OTP authentication) for all designated partners, directors, or proprietors.",
      icon: UserCheck,
    },
  ];

  return (
    <section id="eligibility" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-gold" />
          <span>COMMERCIAL CRITERIA</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility &amp; Paperless Checklist for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Verify company criteria and see the documents required for automated MSME sanction and swift disbursal.
        </p>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Eligibility Criteria Cards & CIBIL Gauge (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Minimum Turnover */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Minimum Annual Turnover
              </span>
              <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-1">
                {minTurnover}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Audited or GST-declared turnover
              </p>
            </div>

            {/* Business Vintage */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Operating Vintage
              </span>
              <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-1">
                {minVintage}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Continuous operational history
              </p>
            </div>

            {/* Eligible Constitutions */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-3">
                <Building className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Eligible Entities
              </span>
              <div className="font-bricolage font-bold text-base sm:text-lg text-gray-900 mt-1">
                Proprietorship / LLP / Pvt Ltd
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Indian commercial establishments
              </p>
            </div>

            {/* Promoter Age & Ownership */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Promoter Age &amp; Equity
              </span>
              <div className="font-bricolage font-bold text-base sm:text-lg text-gray-900 mt-1">
                21 to 65 Years
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min 51% Indian promoter holding
              </p>
            </div>

          </div>

          {/* CIBIL / CMR Credit Score Meter Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Credit Rating Benchmark
                </span>
                <h3 className="font-bricolage font-bold text-xl text-gray-900 mt-0.5">
                  {minScore}+ CIBIL Score (or CMR 1 - 3) Recommended
                </h3>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Prime MSME Pricing
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Enterprises with healthy GST compliance and promoter scores of 720+ qualify for preferential commercial interest rates starting at {lender.interestRate?.min ?? 10.75}% p.a.
            </p>

            {/* Score Range Bar */}
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex my-3">
              <div className="w-[30%] bg-rose-400" title="Sub-Prime (300-600)" />
              <div className="w-[20%] bg-amber-400" title="Moderate (600-680)" />
              <div className="w-[30%] bg-teal-500" title="Good (680-740)" />
              <div className="w-[20%] bg-emerald-500" title="Prime (740-900)" />
            </div>

            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span className="text-rose-600">300 (High Risk)</span>
              <span className="text-amber-600">650 (Moderate)</span>
              <span className="text-teal-700">720 (Preferred)</span>
              <span className="text-emerald-700">900 (Excellent)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Required Documents Checklist + Pre-approval CTA (5 cols) */}
        <div id="documents" className="lg:col-span-5 bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-bricolage font-bold text-xl text-gray-900">
                100% Digital Document Checklist
              </h3>
            </div>

            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Paperless verification available via DigiLocker, GSTN, and RBI Account Aggregators. Zero physical branch paperwork needed:
            </p>

            <div className="space-y-3.5">
              {documents.map((doc, idx) => {
                const Icon = doc.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Pre-Approval Check Box */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  lender.name,
                  `MSME Eligibility Check: ${lender.name} • Soft Inquiry`
                )
              }
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <span>Check Pre-Approved MSME Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero CIBIL / CMR Impact Pre-Approval Check</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
