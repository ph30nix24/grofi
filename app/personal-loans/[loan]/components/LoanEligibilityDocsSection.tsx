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
  IndianRupee,
} from "lucide-react";
import { PersonalLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanEligibilityDocsSectionProps {
  lender: PersonalLoanLender;
}

export default function LoanEligibilityDocsSection({ lender }: LoanEligibilityDocsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const minIncome = lender.eligibilityDetails?.minIncome || lender.minIncome;
  const minScore = lender.minCreditScore || 720;
  const ageBracket = lender.eligibilityDetails?.age || "21 – 60 Years";
  const employmentType = lender.eligibilityDetails?.employmentType || "Salaried Corporate / MNC Employee or Self-Employed";
  const workExperience = lender.eligibilityDetails?.workExperience || "Minimum 2 years total work experience with at least 6 months in current company";

  const documents = [
    {
      title: "Proof of Identity & Address",
      desc: lender.documentChecklist?.identityProof || "Aadhaar Card (instant OTP verification via DigiLocker), PAN Card, or Passport",
      icon: UserCheck,
    },
    {
      title: "Proof of Income",
      desc: lender.documentChecklist?.incomeProof || "Latest 3 months salary slips with company seal/corporate email OTP or latest Form 16 / ITR",
      icon: Briefcase,
    },
    {
      title: "Bank Account Statements",
      desc: lender.documentChecklist?.bankProof || "Latest 6 months salary bank statements via automated RBI Account Aggregator (no PDF password hassles)",
      icon: Landmark,
    },
    {
      title: "Employment Continuity Proof",
      desc: lender.documentChecklist?.employmentProof || "Official Company Employee ID Card, Appointment Letter, or official HR verification",
      icon: Building,
    },
  ];

  return (
    <section id="eligibility" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-gold" />
          <span>APPLICATION REQUIREMENTS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility &amp; Paperless Documents for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Verify your eligibility requirements and review the documents needed for 100% digital sanction.
        </p>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Eligibility Criteria Cards & CIBIL Gauge (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Minimum Income */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Minimum Monthly Income
              </span>
              <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-1">
                {minIncome}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Net in-hand monthly credited salary
              </p>
            </div>

            {/* Age Bracket */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Applicant Age Bracket
              </span>
              <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-1">
                {ageBracket}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                At the time of loan maturity
              </p>
            </div>

            {/* Employment Type */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Employment Status
              </span>
              <div className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-1">
                Salaried / Professional
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {employmentType}
              </p>
            </div>

            {/* Work Stability */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-3">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Work Stability Norm
              </span>
              <div className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mt-1">
                {workExperience}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Continuous employment track record
              </p>
            </div>

          </div>

          {/* CIBIL Credit Score Meter Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  CIBIL Score Benchmark
                </span>
                <h3 className="font-bricolage font-bold text-xl text-gray-900 mt-0.5">
                  {minScore}+ Recommended for Lowest Rates
                </h3>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Prime Approval
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Applicants with scores above 750 receive instant preferential pricing from {lender.name} starting from {lender.interestRate?.min ?? 9.99}% p.a.
            </p>

            {/* Score Range Bar */}
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex my-3">
              <div className="w-[30%] bg-rose-400" title="Poor (300-600)" />
              <div className="w-[20%] bg-amber-400" title="Average (600-700)" />
              <div className="w-[30%] bg-teal-500" title="Good (700-750)" />
              <div className="w-[20%] bg-emerald-500" title="Excellent (750-900)" />
            </div>

            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span className="text-rose-600">300 (Poor)</span>
              <span className="text-amber-600">650 (Fair)</span>
              <span className="text-teal-700">750 (Good)</span>
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
              Paperless verification available via DigiLocker and RBI Account Aggregator. Zero branch visits required:
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
                  `Eligibility Check: ${lender.name} • Soft Inquiry`
                )
              }
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <span>Check Pre-Approved Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero CIBIL Impact Pre-Approval Check</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
