"use client";

import React from "react";
import {
  FileText,
  Home,
  Scale,
  PenTool,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanStepsSectionProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanStepsSection({
  lender,
}: LoanAgainstPropertyLoanStepsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      title: "Digital In-Principle Sanction",
      time: "15 Minutes",
      icon: FileText,
      description: "Fill our rapid eligibility form. Our algorithm computes your debt service capacity and provides an immediate in-principle sanction letter with provisional loan amount.",
    },
    {
      step: "02",
      title: "Technical Site Valuation",
      time: "Day 1 – 2",
      icon: Home,
      description: `A certified structural engineer empaneled with ${lender.name} conducts a physical site inspection to determine the fair realizable market valuation of the mortgaged asset.`,
    },
    {
      step: "03",
      title: "30-Year Legal Title Search",
      time: "Day 2 – 4",
      icon: Scale,
      description: "Empaneled legal counsel examines the 30-year chain of title deeds, checks local sub-registrar encumbrance records, and issues a clean Title Clearance Certificate (TCC).",
    },
    {
      step: "04",
      title: "Document Signing & MODT Creation",
      time: "Day 4 – 5",
      icon: PenTool,
      description: "Sign the loan agreement and deposit original title deeds to create a registered Memorandum of Deposit of Title Deeds (MODT) at the sub-registrar office.",
    },
    {
      step: "05",
      title: "Direct Account Disbursal",
      time: "Day 5 – 7",
      icon: CheckCircle2,
      description: `Loan proceeds are directly credited via RTGS to your designated bank account, or your ${lender.name} Dropline Property Overdraft limit is activated for withdrawals.`,
    },
  ];

  return (
    <section
      id="disbursal-steps"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>FAST DIGITAL PROCESS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How to Get Disbursed with <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          A seamless 5-step digital mortgage journey engineered for fast technical valuation and transparent legal title clearances.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-primary/40 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bricolage font-extrabold text-2xl text-primary/30 group-hover:text-primary transition-colors">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {st.time}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">{st.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disbursal Guarantee CTA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
              Need Expedited Legal Processing?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Our mortgage specialists assist with legal pre-verification to shave 3 days off the standard approval timeline.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openApplyModal(lender.name, "Loan Against Property")}
          className="w-full sm:w-auto bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <span>Initiate Application for {lender.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
