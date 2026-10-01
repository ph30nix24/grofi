"use client";

import React from "react";
import {
  UserCheck,
  CheckCircle2,
  FileText,
  CreditCard,
  Briefcase,
  Calendar,
  Sparkles,
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
  const minScore = card.eligibility?.minCreditScore || 720;
  const employmentType = card.eligibility?.employmentType || "Salaried or Self-Employed";

  const documents = [
    {
      title: "Identity & Address Proof",
      desc: "Aadhaar Card (linked with mobile number for OTP), Passport, Driving License, or Voter ID.",
    },
    {
      title: "PAN Card",
      desc: "Mandatory physical or e-PAN copy required by RBI guidelines for all credit applications.",
    },
    {
      title: "Proof of Income",
      desc: "Salaried: Last 3 months' salary slips or bank statements. Self-employed: Latest ITR computation.",
    },
  ];

  return (
    <section id="eligibility" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <UserCheck className="w-3.5 h-3.5 text-gold" />
          <span>ELIGIBILITY CRITERIA</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Who Can Apply for the <span className="text-primary">{card.name}</span>?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Review minimum income, credit score thresholds, and essential verification documents.
        </p>
      </div>

      {/* Main Grid: Criteria Cards on Left, Documents & CTA on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Criteria Cards + Visual Score Meter (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Minimum Income */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Minimum Income
              </span>
              <div className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 mt-1">
                {minIncome}
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                Net in-hand monthly or annual earnings
              </p>
            </div>

            {/* Age Requirement */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Age Requirement
              </span>
              <div className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 mt-1">
                21 – 65 Years
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                Primary applicant (18+ for add-ons)
              </p>
            </div>

            {/* Employment Type */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Employment Profile
              </span>
              <div className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 mt-1">
                {employmentType}
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                With continuous employment proof
              </p>
            </div>

            {/* Nationality */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                Residential Status
              </span>
              <div className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 mt-1">
                Resident Indian
              </div>
              <p className="text-xs text-gray-500 font-montserrat mt-1">
                With valid Indian address proof
              </p>
            </div>

          </div>

          {/* Visual CIBIL Credit Score Meter Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Recommended Credit Score (CIBIL / Experian)
                </span>
                <h3 className="font-bricolage font-bold text-xl text-gray-900 mt-0.5">
                  {minScore}+ Score Recommended
                </h3>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-montserrat">
                High Approval
              </span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex my-4">
              <div className="w-[30%] bg-rose-400" title="Poor (300-600)" />
              <div className="w-[20%] bg-amber-400" title="Average (600-700)" />
              <div className="w-[30%] bg-teal-500" title="Good (700-750)" />
              <div className="w-[20%] bg-emerald-500" title="Excellent (750-900)" />
            </div>

            <div className="flex justify-between text-[11px] text-gray-500 font-montserrat font-semibold">
              <span className="text-rose-600">300 (Poor)</span>
              <span className="text-amber-600">650 (Fair)</span>
              <span className="text-teal-700">750 (Good)</span>
              <span className="text-emerald-700">900 (Excellent)</span>
            </div>

            <p className="text-xs text-gray-600 font-montserrat mt-3 leading-relaxed">
              Applicants with a credit score of {minScore} or higher enjoy fast-tracked approval and preferential credit limits from {card.issuer}.
            </p>
          </div>

        </div>

        {/* Right: Documents Checklist + Soft Eligibility CTA (5 cols) */}
        <div className="lg:col-span-5 bg-linear-to-b from-gray-50 via-white to-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-bricolage font-bold text-xl text-gray-900">
                Documents Required
              </h3>
            </div>

            <p className="text-xs text-gray-500 font-montserrat mb-6">
              100% digital paperless verification via Video KYC. Keep these documents ready:
            </p>

            <div className="space-y-4">
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
              className="w-full bg-primary hover:bg-[#035259] text-white font-montserrat font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
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
