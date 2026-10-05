"use client";

import React from "react";
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Key,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface HomeLoanDisbursalStepsSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanDisbursalStepsSection({
  lender,
}: HomeLoanDisbursalStepsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      title: "Online In-Principle Sanction",
      time: "15 Minutes",
      desc: "Fill in your income & property requirements to receive an instant provisional pre-approval letter specifying your maximum borrowing capacity.",
    },
    {
      step: "02",
      title: "DigiLocker e-KYC & Document Pickup",
      time: "Within 24 Hours",
      desc: "Instant digital verification of PAN and Aadhaar via DigiLocker. Our doorstep executive collects physical property deeds with digital receipt.",
    },
    {
      step: "03",
      title: "Legal Title Search & Site Valuation",
      time: "2 – 4 Business Days",
      desc: "Bank's empaneled advocate verifies the 30-year ownership chain. A structural engineer conducts an on-site physical valuation of the property.",
    },
    {
      step: "04",
      title: "Final Sanction & MODT Execution",
      time: "1 Business Day",
      desc: "Receive the formal sanction letter with exact EBLR rate. Sign the loan agreement and register the Memorandum of Deposit of Title Deeds (MODT).",
    },
    {
      step: "05",
      title: "Direct Disbursal to Seller / Builder",
      time: "Immediate Transfer",
      desc: "Funds are disbursed directly to the developer or resale seller via RTGS. Collect your property keys and start your EMI journey!",
    },
  ];

  return (
    <section id="disbursal-steps" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <FileCheck2 className="w-3.5 h-3.5 text-gold" />
          <span>END-TO-END DIGITAL APPLICATION</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How to Apply for <span className="text-primary">{lender.name}</span> in 5 Easy Steps
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          From preliminary eligibility check to doorstep legal verification and direct bank disbursal.
        </p>
      </div>

      {/* 5-Step Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-5 border border-gray-200 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-primary/20 group-hover:text-primary transition-colors">
                  {item.step}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                  <Clock className="w-3 h-3 text-gold" />
                  {item.time}
                </span>
              </div>

              <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Verified Process</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fast CTA */}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() =>
            openApplyModal(
              lender.name,
              `Home Loan Application • Instant in-principle approval`
            )
          }
          className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
        >
          <span>Start Your 15-Minute Pre-Approval</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
