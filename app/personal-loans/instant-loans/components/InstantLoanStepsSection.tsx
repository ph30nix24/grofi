"use client";

import React from "react";
import {
  Smartphone,
  ShieldCheck,
  FileCheck2,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function InstantLoanStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      icon: Smartphone,
      time: "60 Seconds",
      title: "Enter Mobile & Soft Verification",
      description:
        "Input your mobile number, PAN, and basic income details. Our engine performs a soft credit inquiry that checks your pre-approved eligibility without deducting a single point from your CIBIL.",
      badge: "Zero CIBIL Impact",
    },
    {
      step: "02",
      icon: ShieldCheck,
      time: "2 Minutes",
      title: "Consent to Paperless e-KYC",
      description:
        "Verify your identity seamlessly via UIDAI Aadhaar OTP and securely connect your primary salary bank account using RBI's Account Aggregator framework. No paperwork, Xerox copies, or branch visits.",
      badge: "100% Paperless",
    },
    {
      step: "03",
      icon: FileCheck2,
      time: "60 Seconds",
      title: "Review Sanction & Key Fact Statement",
      description:
        "View your instant sanction letter with upfront Annual Percentage Rate (APR), processing fee breakdown, and monthly EMI schedule in strict compliance with RBI digital lending guidelines.",
      badge: "RBI Compliant KFS",
    },
    {
      step: "04",
      icon: Zap,
      time: "10s - 15 Mins",
      title: "Digital e-Sign & Bank Disbursal",
      description:
        "Authorize the digital agreement with an Aadhaar OTP e-Sign and setup e-Mandate auto-debit. The sanctioned cash is transferred directly to your bank account via instant IMPS or NEFT.",
      badge: "Cash in Bank",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-linear-to-b from-[#FDFBF7] via-white to-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            100% Digital Loan Lifecycle
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How Instant Disbursals Work in <span className="text-primary">4 Swift Steps</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            From initial mobile verification to sanctioned cash in your bank account in as fast as 10 seconds.
          </p>
        </div>

        {/* 4-Column Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all relative flex flex-col justify-between group hover:border-primary/40"
              >
                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-bricolage font-extrabold text-2xl text-primary/30 group-hover:text-primary transition-colors">
                      {item.step}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EBF4ED] text-primary border border-primary/20 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      {item.time}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bricolage font-bold text-base text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Assurance Badge */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <Zap className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{item.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-linear-to-r from-primary to-[#035961] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
              Need Instant Cash Credited Right Now?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl">
              Complete your soft eligibility inquiry in 60 seconds with zero paperwork and instant pre-approval terms.
            </p>
          </div>

          <button
            onClick={() => openApplyModal("Instant Personal Loan", "Fastest 10-second pre-approved cash disbursal")}
            className="bg-gold hover:bg-[#a3821f] text-gray-900 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Start Paperless Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
