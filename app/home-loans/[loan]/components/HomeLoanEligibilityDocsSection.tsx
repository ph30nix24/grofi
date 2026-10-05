"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Building2,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Percent,
  Download,
  AlertCircle,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanEligibilityDocsSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanEligibilityDocsSection({
  lender,
}: HomeLoanEligibilityDocsSectionProps) {
  const [applicantType, setApplicantType] = useState<"salaried" | "selfEmployed">("salaried");

  return (
    <section id="eligibility" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-gold" />
          <span>ELIGIBILITY CRITERIA &amp; CHECKLIST</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility &amp; Documents Required for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Verify qualifying age, income thresholds, CIBIL benchmarks, and mandatory property title deeds before applying.
        </p>
      </div>

      {/* ── 1. ELIGIBILITY MATRIX ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Salaried Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                Salaried Applicants
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              FAST TRACK E-KYC
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Age Bracket:</span>
              <span className="font-bold text-gray-900">21 to 65 Years</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Minimum Monthly Salary:</span>
              <span className="font-bold text-primary">{lender.minIncome}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Minimum CIBIL Score:</span>
              <span className="font-bold text-emerald-700">{lender.minCreditScore}+ Score</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Employment Vintage:</span>
              <span className="font-bold text-gray-900">Min 2 Yrs Total (6 Mos current)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Eligible Profiles:</span>
              <span className="font-bold text-gray-900">Govt, MNC, Public &amp; Private Ltd Employees</span>
            </div>
          </div>
        </div>

        {/* Self-Employed Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center text-[#8c6e18]">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                Self-Employed Professionals &amp; Business
              </h3>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              CUSTOM PROGRAM
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Age Bracket:</span>
              <span className="font-bold text-gray-900">23 to 70 Years</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Minimum Annual Income (ITR):</span>
              <span className="font-bold text-primary">₹3.5 Lakhs+ Net Taxable Profit</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Minimum CIBIL Score:</span>
              <span className="font-bold text-emerald-700">{lender.minCreditScore}+ Score</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Business Continuity:</span>
              <span className="font-bold text-gray-900">Min 3 Years in the same line of business</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Eligible Profiles:</span>
              <span className="font-bold text-gray-900">Doctors, CAs, Architects, Traders &amp; MSMEs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Women Concession Banner Callout */}
      <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-emerald-50 via-[#EBF4ED] to-emerald-50 border border-emerald-300 flex items-center gap-3.5 shadow-2xs">
        <Percent className="w-6 h-6 text-emerald-700 shrink-0" />
        <div className="text-xs">
          <span className="font-bold text-emerald-950 text-sm block">
            Women Borrower Interest Concession ({lender.womenConcession})
          </span>
          <p className="text-emerald-800 mt-0.5 leading-relaxed">
            Avail a 5 bps (0.05% per annum) discount on the applicable interest rate by adding a woman as the sole owner or primary joint co-applicant. On a ₹50 Lakh loan for 20 years, this translates to over ₹35,000 in direct interest savings!
          </p>
        </div>
      </div>

      {/* ── 2. COMPREHENSIVE DOCUMENT CHECKLIST ── */}
      <div id="documents" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900">
              Complete Documentation Checklist
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Ensure all property documents and applicant KYC credentials are ready for fast 3-day approval.
            </p>
          </div>

          {/* Switch Salaried / Self-Employed */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setApplicantType("salaried")}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                applicantType === "salaried"
                  ? "bg-white text-primary shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Salaried Documents
            </button>
            <button
              type="button"
              onClick={() => setApplicantType("selfEmployed")}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                applicantType === "selfEmployed"
                  ? "bg-white text-primary shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Self-Employed Documents
            </button>
          </div>
        </div>

        {/* 3 Document Cards: KYC, Income, Property Legal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: KYC & Identity */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="font-bricolage font-bold text-base text-gray-900">
                KYC &amp; Residence Proof
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>PAN Card:</strong> Mandatory for all applicants &amp; co-applicants</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Aadhaar Card:</strong> Linked with active mobile for instant OTP e-KYC</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Current Address Proof:</strong> Passport, Voter ID, or Utility bill</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>2 Passport size photographs of all applicants</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Income Proof */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="font-bricolage font-bold text-base text-gray-900">
                Financial &amp; Income Proof
              </h4>
            </div>

            {applicantType === "salaried" ? (
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Salary Slips:</strong> Latest 3 months original pay slips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Form 16:</strong> Latest 2 financial years (Part A &amp; Part B)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bank Statement:</strong> Last 6 months salary credit bank account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Existing active loan sanction letters (if any)</span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>ITR &amp; Computation:</strong> Last 3 financial years CA-certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Audited Financials:</strong> Balance sheet &amp; Profit &amp; Loss account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bank Statement:</strong> Last 12 months current &amp; savings accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Business proof (GST registration, MSME Udyam certificate)</span>
                </li>
              </ul>
            )}
          </div>

          {/* Card 3: Property Legal Documents */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="font-bricolage font-bold text-base text-gray-900">
                Property Legal Deeds
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sale Agreement:</strong> Registered agreement for sale or allotment letter</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Title Chain Deeds:</strong> 30 years historical chain title deeds</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sanction Plan:</strong> Approved building layout plan &amp; CC</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>NOC &amp; Nil EC:</strong> Builder/Society NOC &amp; 13–30 year Nil Encumbrance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
