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
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanEligibilityDocsSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanEligibilityDocsSection({
  lender,
}: ShortTermLoanEligibilityDocsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const cibilCategory =
    lender.minCreditScore >= 720
      ? "Prime Credit Score (720+)"
      : lender.minCreditScore >= 650
      ? "Standard Credit Profile (650+)"
      : "Credit Builder / Low Barrier (600+)";

  const documents = [
    {
      title: "PAN Card",
      desc: "Mandatory tax identifier used for instant algorithmic credit score check and identity verification.",
      icon: UserCheck,
      badge: "Instant Verification",
    },
    {
      title: "Aadhaar Card (e-KYC)",
      desc: "Paperless verification via DigiLocker and UIDAI OTP. Zero physical photocopies needed.",
      icon: FileCheck2,
      badge: "100% Paperless",
    },
    {
      title: "Bank Account via Account Aggregator",
      desc: "Instant banking analysis via Sahamati RBI Account Aggregator. Zero password or PDF statement uploads.",
      icon: Landmark,
      badge: "Encrypted AA Fetch",
    },
    {
      title: "Digital Selfie Liveness Check",
      desc: "5-second automated camera match to prevent synthetic identity theft and spoofing.",
      icon: Camera,
      badge: "Biometric AI Match",
    },
    {
      title: "e-NACH / UPI AutoPay Setup",
      desc: "Set up automated monthly installment deductions using Debit Card, Net Banking, or UPI App.",
      icon: Smartphone,
      badge: "One-Time e-Mandate",
    },
  ];

  return (
    <section id="eligibility" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>QUALIFICATION &amp; CHECKLIST</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility &amp; Paperless KYC for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Designed for quick digital onboarding. Check minimum income and documents required for an instant sanction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 Eligibility Criteria Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm space-y-5">
            <h3 className="font-bricolage font-bold text-lg text-gray-900 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Eligibility Requirements</span>
              <span className="text-xs text-primary font-semibold">100% Digital</span>
            </h3>

            {/* Criteria 1: Age */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Age Criteria
                </span>
                <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 block mt-0.5">
                  21 to 58 Years
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Indian resident citizen with valid government ID proofs.
                </p>
              </div>
            </div>

            {/* Criteria 2: Income */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <IndianRupee className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Minimum Monthly Income
                </span>
                <span className="font-bricolage font-bold text-sm sm:text-base text-emerald-800 block mt-0.5">
                  {lender.minIncome}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Net income directly credited to your active bank account.
                </p>
              </div>
            </div>

            {/* Criteria 3: CIBIL */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Minimum Credit Score
                </span>
                <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 block mt-0.5">
                  {lender.minCreditScore}+ CIBIL Score
                </span>
                <p className="text-[11px] text-amber-800 font-semibold mt-0.5">
                  {cibilCategory}
                </p>
              </div>
            </div>

            {/* Criteria 4: Employment */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Employment Profiles
                </span>
                <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 block mt-0.5">
                  Salaried &amp; Self-Employed
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Salaried, contract workers, freelancers, or registered professionals.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  lender.name,
                  `Eligibility check for ${lender.name} • Minimum salary ${lender.minIncome}`
                )
              }
              className="w-full py-3 bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Check If You Qualify</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>

        {/* Right Column: 100% Paperless Document Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bricolage font-bold text-lg text-gray-900">
                  100% Digital Document Checklist
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Zero physical paperwork. Everything verified via DigiLocker &amp; Account Aggregator.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Paperless e-KYC
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {documents.map((doc, idx) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-200/80 flex items-start gap-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bricolage font-bold text-xs sm:text-sm text-gray-900">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                          {doc.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note on Account Aggregator */}
            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-950">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Why Account Aggregator (AA) is Better:</strong> You don't need to download PDFs from net banking or share bank passwords. AA uses RBI-approved encrypted token pipes to verify salary credits in seconds.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
