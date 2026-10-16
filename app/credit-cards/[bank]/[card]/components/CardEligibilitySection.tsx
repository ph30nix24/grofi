"use client";

import React, { useMemo } from "react";
import {
  UserCheck,
  CheckCircle2,
  FileText,
  CreditCard,
  Briefcase,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardEligibilitySectionProps {
  card: CardStructure;
}

export default function CardEligibilitySection({ card }: CardEligibilitySectionProps) {
  const { openApplyModal } = useApplyModal();

  const minIncome = card.eligibility?.minIncome || "₹30,000 / month";
  const rawScore = card.eligibility?.minCreditScore || 720;
  const minScore = typeof rawScore === "string" ? parseInt(rawScore.replace(/\D/g, ""), 10) || 720 : rawScore;
  const employmentType = card.eligibility?.employmentType || "Salaried or Self-Employed";

  // Score pointer position (300 to 900 range)
  const scorePercent = useMemo(() => {
    const clamped = Math.max(300, Math.min(900, minScore));
    return Math.round(((clamped - 300) / 600) * 100);
  }, [minScore]);

  const documents = [
    {
      title: "Identity & Address Verification",
      desc: "Aadhaar Card (linked with mobile number for instantaneous e-KYC), Passport, Driving License, or Voter ID.",
    },
    {
      title: "PAN Card",
      desc: "Mandatory physical or verifiable e-PAN copy required by RBI guidelines for all formal credit evaluations.",
    },
    {
      title: "Proof of Income",
      desc: "Salaried: Last 3 months' salary slips or net banking account aggregator consent. Self-employed: Latest ITR computation.",
    },
  ];

  return (
    <section
      id="eligibility"
      aria-label="Eligibility and Documents"
      className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <UserCheck className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>ELIGIBILITY CRITERIA &amp; CHECKLIST</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          Who Can Apply for the <span className="text-primary">{card.name}</span>?
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          Review minimum income thresholds, credit score benchmarks, and essential documentation before starting.
        </p>
      </div>

      {/* Main Grid: Criteria Cards on Left, Documents & CTA on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Criteria Cards + Visual Score Meter (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Minimum Income */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3.5">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Minimum Income
              </span>
              <div className="font-bricolage font-extrabold text-2xl text-gray-900 mt-1">
                {minIncome}
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                Net in-hand monthly or annual earnings
              </p>
            </div>

            {/* Age Requirement */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-3.5">
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Age Requirement
              </span>
              <div className="font-bricolage font-extrabold text-2xl text-gray-900 mt-1">
                21 – 65 Years
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                Primary cardholder (18+ for add-on cards)
              </p>
            </div>

            {/* Employment Type */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-3.5">
                <UserCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Employment Profile
              </span>
              <div className="font-bricolage font-extrabold text-2xl text-gray-900 mt-1">
                {employmentType}
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                With continuous regular employment history
              </p>
            </div>

            {/* Nationality */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-3.5">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Residential Status
              </span>
              <div className="font-bricolage font-extrabold text-2xl text-gray-900 mt-1">
                Resident Indian
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                With valid Indian residential address proof
              </p>
            </div>

          </div>

          {/* Visual CIBIL Credit Score Meter Box with Dynamic Pointer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Recommended Credit Score (CIBIL / Experian)
                </span>
                <h3 className="font-bricolage font-extrabold text-2xl text-gray-900 mt-0.5">
                  {minScore}+ Score Recommended
                </h3>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full font-montserrat">
                High Approval Zone
              </span>
            </div>

            {/* Visual Gauge Bar with Position Marker */}
            <div className="relative pt-6 pb-2 my-2">
              {/* Dynamic Target Marker */}
              <div
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-500"
                style={{ left: `${scorePercent}%` }}
              >
                <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 font-mono">
                  {minScore}+
                </span>
                <span className="w-2 h-2 bg-primary rotate-45 -mt-1" />
              </div>

              <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                <div className="w-[25%] bg-rose-400" title="Poor (300-600)" />
                <div className="w-[20%] bg-amber-400" title="Average (600-700)" />
                <div className="w-[25%] bg-teal-500" title="Good (700-750)" />
                <div className="w-[30%] bg-emerald-500" title="Excellent (750-900)" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-gray-500 font-montserrat font-semibold mt-1">
              <span className="text-rose-600">300 (Poor)</span>
              <span className="text-amber-600">600 (Fair)</span>
              <span className="text-teal-700">750 (Good)</span>
              <span className="text-emerald-700">900 (Excellent)</span>
            </div>

            <p className="text-xs text-gray-600 font-montserrat mt-4 leading-relaxed pt-3 border-t border-gray-100">
              Applicants with a score above <strong>{minScore}</strong> qualify for expedited approval, optimal credit limits, and zero security deposit requirements from {card.issuer}.
            </p>
          </div>

        </div>

        {/* Right: Documents Checklist + Soft Eligibility CTA (5 cols) */}
        <div className="lg:col-span-5 bg-linear-to-b from-gray-50/90 via-white to-gray-50/90 rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
          
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900">
                Documents Required
              </h3>
            </div>

            <p className="text-xs text-gray-500 font-montserrat mb-5">
              100% digital paperless verification via Video KYC. Keep these documents ready:
            </p>

            <div className="space-y-3.5">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-montserrat font-bold text-xs sm:text-sm text-gray-900">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-montserrat mt-0.5 leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Check Trigger */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  card.name,
                  `Eligibility Check: ${card.issuer} • Soft Verification`
                )
              }
              className="w-full bg-primary hover:bg-[#035259] active:scale-98 text-white font-montserrat font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Check Pre-Approved Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-montserrat mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero CIBIL Impact Soft Check</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
