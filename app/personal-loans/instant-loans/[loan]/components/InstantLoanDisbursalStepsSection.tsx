"use client";

import React from "react";
import {
  Sparkles,
  Smartphone,
  Fingerprint,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Zap,
  Clock,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface InstantLoanDisbursalStepsSectionProps {
  lender: InstantLoanLender;
}

export default function InstantLoanDisbursalStepsSection({
  lender,
}: InstantLoanDisbursalStepsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      num: "01",
      icon: Smartphone,
      title: "Soft Eligibility Check",
      desc: "Provide basic mobile number and PAN details. Real-time algorithms run a soft pre-qualification check with zero impact on your CIBIL score.",
      badge: "Instant 30 Secs",
    },
    {
      num: "02",
      icon: Fingerprint,
      title: "Paperless Digital e-KYC",
      desc: "Verify identity via DigiLocker Aadhaar OTP and fetch salary flow statements automatically through RBI Account Aggregator.",
      badge: "100% Paperless",
    },
    {
      num: "03",
      icon: Sliders,
      title: "Customize Amount & Autopay",
      desc: `Choose your sanctioned amount from ${lender.minAmount} up to ${lender.maxAmount} and setup e-NACH or UPI Autopay for effortless EMI repayment.`,
      badge: "Flexible Terms",
    },
    {
      num: "04",
      icon: Zap,
      title: "Instant Direct Account Credit",
      desc: `Sign the digital loan agreement via Aadhaar e-Sign. Funds are deposited directly to your bank account in ${lender.disbursalTime} via 24x7 IMPS.`,
      badge: `In ${lender.disbursalTime}`,
      highlight: true,
    },
  ];

  return (
    <section id="disbursal-steps" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Clock className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>FAST 4-STEP DIGITAL JOURNEY</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How to Get Disbursal from <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Experience an automated end-to-end borrowing journey engineered for rapid fund transfer and zero friction.
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
                <span>Zero branch visits</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Box */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary via-[#023b40] to-primary text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
            Ready to Check Your Instant Sanction Limit?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90">
            Check your pre-approved limit for {lender.name} in 60 seconds with zero credit score impact.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            openApplyModal(
              lender.name,
              `Fast-track Application: Disbursal in ${lender.disbursalTime}`
            )
          }
          className="bg-white hover:bg-gray-100 active:scale-98 text-primary font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <span>Apply Online Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
