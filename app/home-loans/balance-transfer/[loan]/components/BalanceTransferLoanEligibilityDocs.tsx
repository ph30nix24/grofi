"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Building2,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";

interface BalanceTransferLoanEligibilityDocsProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanEligibilityDocs({
  lender,
}: BalanceTransferLoanEligibilityDocsProps) {
  const [applicantType, setApplicantType] = useState<"salaried" | "selfEmployed">("salaried");

  return (
    <section
      id="eligibility-docs"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-gold" />
          <span>ELIGIBILITY CRITERIA &amp; LOD CHECKLIST</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility &amp; Takeover Documents for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Verify qualifying benchmarks and assemble the mandatory List of Documents (LOD) and foreclosure statement required from your current bank.
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
                Salaried Borrowers
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              FASTEST CLEARANCE
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Age Bracket:</span>
              <span className="font-bold text-gray-900">21 to 65 Years (at maturity)</span>
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
              <span className="text-gray-500">Existing Loan Vintage:</span>
              <span className="font-bold text-gray-900">Min. 6–12 Consecutive Clean EMIs</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Women Borrower Benefit:</span>
              <span className="font-bold text-primary">{lender.womenConcession}</span>
            </div>
          </div>
        </div>

        {/* Self-Employed Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                Self-Employed Professionals &amp; Business
              </h3>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              BUSINESS / MSME
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Age Bracket:</span>
              <span className="font-bold text-gray-900">23 to 70 Years</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Business Vintage:</span>
              <span className="font-bold text-gray-900">Min. 3 Years in continuous operations</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Minimum Annual Income:</span>
              <span className="font-bold text-primary">₹3.6 Lakhs ITR / P&amp;L</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Minimum CIBIL Score:</span>
              <span className="font-bold text-emerald-700">{lender.minCreditScore}+ Score</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Banking Assessment:</span>
              <span className="font-bold text-gray-900">12 Months Current Account Statement</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MANDATORY TAKEOVER DOCUMENT CHECKLIST ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              <span>Mandatory Balance Transfer Document Checklist</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Everything required by {lender.name}&apos;s credit &amp; legal teams to issue takeover cheque
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setApplicantType("salaried")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                applicantType === "salaried"
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Salaried Documents
            </button>
            <button
              type="button"
              onClick={() => setApplicantType("selfEmployed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                applicantType === "selfEmployed"
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Self-Employed Documents
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: KYC & Identity */}
          <div className="space-y-3">
            <h4 className="font-bricolage font-bold text-sm text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <span>KYC &amp; Applicant Proofs</span>
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>PAN Card of all applicants &amp; co-owners</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Aadhaar Card with DigiLocker OTP authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Current residence address proof (Electricity/Passport)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Recent passport-size color photographs</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Income Proofs */}
          <div className="space-y-3">
            <h4 className="font-bricolage font-bold text-sm text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Income &amp; Financials</span>
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {applicantType === "salaried" ? (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Latest 3 months salary slips with official seal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Latest 2 years Form 16 (Part A &amp; Part B)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>6 months salary account bank statements (PDF)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Official corporate email verification or ID card</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Last 3 years ITR with Computation of Income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Audited Balance Sheet &amp; P&amp;L Statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>12 months current account bank statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>GST Registration Certificate &amp; 1-year GST returns</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: The Critical LOD & Old Bank Papers */}
          <div className="space-y-3 bg-primary/5 p-4 rounded-2xl border border-primary/15">
            <h4 className="font-bricolage font-bold text-sm text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Existing Bank LOD &amp; Foreclosure</span>
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>List of Documents (LOD):</strong> Official letter detailing all original property title deeds deposited with existing bank
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Foreclosure Statement:</strong> Exact outstanding loan balance valid for current month
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>12 Months Statement of Account (SOA):</strong> Showing zero EMI bounces or penal charges
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Photocopies of registered Sale Deed &amp; Sanction Plan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
