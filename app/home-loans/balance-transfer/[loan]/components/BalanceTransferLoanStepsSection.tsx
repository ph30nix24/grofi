"use client";

import React from "react";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferLoanStepsSectionProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanStepsSection({
  lender,
}: BalanceTransferLoanStepsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      title: "Digital Application & Sanction",
      time: "15 Minutes",
      description: `Submit your outstanding loan balance and basic financials online. ${lender.name} issues an instant in-principle approval with your locked takeover rate.`,
      highlight: "Paperless e-KYC",
    },
    {
      step: "02",
      title: "Procure Foreclosure Letter & LOD",
      time: "2 – 3 Days",
      description:
        "Request a Foreclosure / Outstanding Principal Statement and List of Documents (LOD) from your current bank or HFC branch.",
      highlight: "Bank Official Letterhead",
    },
    {
      step: "03",
      title: "Legal Search & Final Sanction",
      time: "1 – 2 Days",
      description: `${lender.name}'s panel advocate verifies property title chain and issues the official loan takeover sanction agreement.`,
      highlight: "Advocate Verification",
    },
    {
      step: "04",
      title: "Takeover Cheque Handover",
      time: "Turnaround: " + lender.turnaroundTime,
      description: `${lender.name} draws a Pay Order / Cheque directly favoring your existing bank to completely settle your outstanding loan.`,
      highlight: "Direct Inter-Bank Settlement",
    },
    {
      step: "05",
      title: "Title Deeds Handover & Top-Up Disbursal",
      time: "Within 30 Days (RBI)",
      description:
        "Your old bank releases original property title deeds directly to the new bank. Any requested top-up funds are credited instantly into your savings account.",
      highlight: "Zero Hassle Custody",
    },
  ];

  return (
    <section
      id="takeover-journey"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>END-TO-END TAKEOVER LIFECYCLE</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How Your Loan Transfers to <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          A seamless 5-step digital takeover process where you don&apos;t have to arrange liquid cash to close your existing loan.
        </p>
      </div>

      {/* 5 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative group hover:border-primary/40"
          >
            <div>
              {/* Step Number & Time */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-bricolage font-extrabold text-2xl text-primary/30 group-hover:text-primary transition-colors">
                  {item.step}
                </span>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {item.time}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bricolage font-bold text-sm text-gray-900 mt-3 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-gray-100">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {item.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#EBF4ED] border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-bricolage font-bold text-lg sm:text-xl text-primary">
            Ready to Begin Your Home Loan Takeover?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Our specialized balance transfer coordinators assist you in fetching the LOD and coordinating with your existing branch.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            openApplyModal(
              lender.name,
              `Home Loan Balance Transfer • Rates from ${lender.interestRate?.min ?? 7.25}% p.a.`
            )
          }
          className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0 active:scale-98"
        >
          <span>Initiate Takeover Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
