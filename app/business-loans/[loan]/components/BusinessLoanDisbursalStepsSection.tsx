"use client";

import React from "react";
import {
  Sparkles,
  Smartphone,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Zap,
  FileCheck,
} from "lucide-react";
import { BusinessLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanDisbursalStepsSectionProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanDisbursalStepsSection({ lender }: BusinessLoanDisbursalStepsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      num: "01",
      icon: Smartphone,
      title: "Soft Eligibility & GST Check",
      desc: "Submit your business entity details and mobile number. Instant automated credit check with zero impact on promoter CIBIL or commercial CMR score.",
      badge: "Instant 60 Secs",
    },
    {
      num: "02",
      icon: FileCheck,
      title: "Paperless GST & Bank Sync",
      desc: "Provide GSTIN for automated turnover verification and connect Current Account statements seamlessly via RBI-regulated Account Aggregators.",
      badge: "100% Paperless",
    },
    {
      num: "03",
      icon: Sliders,
      title: "Sanction & Tenure Selection",
      desc: `Select your sanctioned working capital limit or term loan up to ${lender.maxAmount} and customize your repayment tenure up to ${lender.tenure}.`,
      badge: "Flexible Terms",
    },
    {
      num: "04",
      icon: Zap,
      title: "Current Account Disbursal",
      desc: `Execute the digital agreement via Aadhaar e-Sign. Approved capital is credited directly to your business current account within ${lender.disbursalTime}.`,
      badge: lender.disbursalTime,
      highlight: true,
    },
  ];

  return (
    <section id="disbursal-steps" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>FAST DIGITAL DISBURSAL</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How to Get Disbursal from <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Experience an end-to-end digital MSME lending process designed for minimal friction, rapid turnaround, and maximum compliance.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col justify-between relative group ${
                step.highlight
                  ? "border-primary/40 ring-2 ring-primary/5 bg-gradient-to-b from-emerald-50/30 via-white to-white"
                  : "border-gray-200/90"
              }`}
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-primary/25 group-hover:text-primary transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {step.badge}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Step Title & Desc */}
                <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero branch visits required</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Box */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary via-[#023b40] to-primary text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
            Ready to Check Your Enterprise Credit Limit?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90">
            Check your pre-approved business loan limit for {lender.name} in under 60 seconds with zero credit score impact.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            openApplyModal(
              lender.name,
              `Fast-track Business Loan: Disbursal in ${lender.disbursalTime}`
            )
          }
          className="bg-white hover:bg-gray-100 text-primary font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <span>Apply Online Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
