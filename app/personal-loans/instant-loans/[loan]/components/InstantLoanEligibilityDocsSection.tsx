"use client";

import React from "react";
import {
  UserCheck,
  FileCheck2,
  Briefcase,
  Calendar,
  ShieldCheck,
  Building,
  Landmark,
  IndianRupee,
  Smartphone,
  Sparkles,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface InstantLoanEligibilityDocsSectionProps {
  lender: InstantLoanLender;
}

export default function InstantLoanEligibilityDocsSection({
  lender,
}: InstantLoanEligibilityDocsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const cibilCategory =
    lender.minCreditScore >= 720
      ? "Prime Credit Score (720+)"
      : lender.minCreditScore >= 650
      ? "Standard Credit Profile (650+)"
      : "Credit Builder Friendly (600+)";

  const documents = [
    {
      title: "Identity & Address Verification",
      desc: "Instant Aadhaar OTP verification via DigiLocker and PAN card verification.",
      icon: UserCheck,
      badge: "Instant e-KYC",
    },
    {
      title: "Bank Statement / Salary Proof",
      desc: "Instant statement fetch via RBI Account Aggregator (AA) framework without manual PDF passwords.",
      icon: Landmark,
      badge: "100% Paperless",
    },
    {
      title: "Smartphone Liveness & Selfie",
      desc: "5-second automated digital face match check using your smartphone camera.",
      icon: Camera,
      badge: "Biometric e-Check",
    },
    {
      title: "Auto-Debit e-Mandate",
      desc: "One-time e-NACH or UPI Autopay setup for smooth automated monthly EMI debits.",
      icon: Smartphone,
      badge: "e-Mandate",
    },
  ];

  return (
    <section id="eligibility" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>APPLICATION REQUIREMENTS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility &amp; Paperless Checklist for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Verify your eligibility parameters and review the 100% digital verification steps required for sanction.
        </p>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Eligibility Criteria (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs">
            <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-5 flex items-center justify-between">
              <span>Eligibility Criteria</span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Easy Criteria
              </span>
            </h3>

            <div className="space-y-4">
              {/* Minimum Monthly Income */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <IndianRupee className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Minimum Monthly Income
                  </span>
                  <div className="font-bricolage font-bold text-base text-gray-900 mt-0.5">
                    {lender.minIncome}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Net monthly in-hand income credited to your primary bank account
                  </p>
                </div>
              </div>

              {/* Minimum CIBIL Score */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    CIBIL Credit Score
                  </span>
                  <div className="font-bricolage font-bold text-base text-gray-900 mt-0.5 flex items-center gap-2">
                    <span>{lender.minCreditScore}+ Score</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {cibilCategory}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Scores above 750 unlock the lowest starting rate of {lender.interestRate?.min ?? 9.99}% p.a.
                  </p>
                </div>
              </div>

              {/* Age Bracket */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Age Bracket
                  </span>
                  <div className="font-bricolage font-bold text-base text-gray-900 mt-0.5">
                    21 – 58 Years
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Resident Indian citizens with an active savings bank account
                  </p>
                </div>
              </div>

              {/* Employment Profile */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Employment Category
                  </span>
                  <div className="font-bricolage font-bold text-base text-gray-900 mt-0.5">
                    Salaried or Self-Employed
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    MNCs, Corporates, SMEs, government organizations, or business owners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 100% Digital Document Checklist (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs">
            <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-5 flex items-center justify-between">
              <span>Paperless Verification</span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {lender.documentation}
              </span>
            </h3>

            <div className="space-y-4">
              {documents.map((doc, idx) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bricolage font-bold text-sm text-gray-900">
                          {doc.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-600 border border-gray-200">
                          {doc.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zero Physical Branch Visits Guarantee */}
          <div className="bg-[#EBF4ED] rounded-3xl p-5 border border-primary/20 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-gray-800 leading-relaxed">
              <strong className="text-primary font-bold block mb-0.5">
                Zero Physical Branch Visits Guarantee:
              </strong>
              With {lender.name}, the complete journey from initial eligibility check to agreement e-signing and IMPS account credit occurs 100% digitally on your phone.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
