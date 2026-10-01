"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Briefcase,
  CheckCircle2,
  FileCheck2,
  Lightbulb,
  Building,
} from "lucide-react";

export default function PersonalLoanEligibilityGuide() {
  const [profileType, setProfileType] = useState<"salaried" | "selfEmployed">("salaried");

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <UserCheck className="w-3.5 h-3.5 text-gold" />
            Eligibility & Guidelines
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Personal Loan <span className="text-primary">Eligibility & Documents</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Understand minimum income, credit score thresholds, and essential paperwork needed to secure fast approvals across banks.
          </p>
        </div>

        {/* Profile Switcher Pills */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setProfileType("salaried")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                profileType === "salaried"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Salaried Professionals</span>
            </button>

            <button
              onClick={() => setProfileType("selfEmployed")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                profileType === "selfEmployed"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Self-Employed / Business</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Criteria vs Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Criteria Requirements */}
          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{profileType === "salaried" ? "Salaried Applicant Criteria" : "Self-Employed Criteria"}</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start justify-between p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-semibold text-gray-500">Age Requirement:</span>
                <span className="font-bold text-gray-900 text-right">
                  {profileType === "salaried" ? "21 to 60 Years" : "23 to 65 Years"}
                </span>
              </div>

              <div className="flex items-start justify-between p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-semibold text-gray-500">Minimum Net Income:</span>
                <span className="font-bold text-emerald-800 text-right">
                  {profileType === "salaried"
                    ? "₹25,000/mo (₹50k in metros like Mumbai, Delhi)"
                    : "Annual Net Profit ≥ ₹3,50,000 (ITR)"}
                </span>
              </div>

              <div className="flex items-start justify-between p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-semibold text-gray-500">Minimum CIBIL Score:</span>
                <span className="font-bold text-primary text-right">
                  720+ (750+ qualifies for prime corporate rate bracket)
                </span>
              </div>

              <div className="flex items-start justify-between p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-semibold text-gray-500">Work Experience / Vintage:</span>
                <span className="font-bold text-gray-900 text-right">
                  {profileType === "salaried"
                    ? "Min 2 years total, min 6 mos with current employer"
                    : "Min 3 consecutive years in same business"}
                </span>
              </div>

              <div className="flex items-start justify-between p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-semibold text-gray-500">Banking Relationship:</span>
                <span className="font-bold text-gray-900 text-right">
                  Salary credit / current account in an active Indian scheduled bank
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Required Documents */}
          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-6 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-gold" />
              <span>Required Paperless Document Checklist</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-900 block text-xs mb-1">
                  1. Identity & Proof of Residence
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Aadhaar Card (instant OTP e-KYC), PAN Card (mandatory for tax validation), Passport, or Voter ID.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-900 block text-xs mb-1">
                  2. Income Verification
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {profileType === "salaried"
                    ? "Latest 3 months salary slips with corporate email authentication or recent Form 16."
                    : "Last 2 years Income Tax Returns (ITR) with computation of income, balance sheet & P&L certified by CA."}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-900 block text-xs mb-1">
                  3. Bank Statements (Paperless)
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Latest 6 months operative salary / current bank account statements via RBI Account Aggregator framework (no PDF upload required).
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-900 block text-xs mb-1">
                  4. Professional / Business Proof
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {profileType === "salaried"
                    ? "Official company ID badge or appointment letter."
                    : "GST registration certificate, Trade License, or Shop & Establishment Act certificate."}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Golden Tips to Get Lowest Rate */}
        <div className="mt-12 bg-linear-to-r from-amber-50/70 via-orange-50/30 to-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-gold" />
            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-amber-950">
              4 Tips to Secure the Lowest Personal Loan Interest Rate
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-montserrat">
            <div className="bg-white/80 p-4 rounded-2xl border border-amber-100">
              <strong className="font-bold text-gray-900 block mb-1">Maintain CIBIL 750+</strong>
              <p className="text-gray-600 leading-relaxed">
                Applicants with 750+ CIBIL score get access to preferential tier-1 pricing (9.99% p.a.) and fee waivers.
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-amber-100">
              <strong className="font-bold text-gray-900 block mb-1">Check Salary Bank Offers</strong>
              <p className="text-gray-600 leading-relaxed">
                Banks offer pre-approved instant loans with zero documentation and lower rates to their existing salary account holders.
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-amber-100">
              <strong className="font-bold text-gray-900 block mb-1">Keep FOIR Below 40%</strong>
              <p className="text-gray-600 leading-relaxed">
                Your total active monthly EMI obligations should not exceed 40% of your net monthly salary for prime sanction limits.
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-amber-100">
              <strong className="font-bold text-gray-900 block mb-1">Choose Reducing Balance</strong>
              <p className="text-gray-600 leading-relaxed">
                Always ensure the lender computes interest on a monthly reducing balance, not a flat rate, to save thousands on interest.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
