"use client";

import React from "react";
import {
  CalendarRange,
  ShieldCheck,
  FileCheck2,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function ShortTermLoanStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      icon: CalendarRange,
      time: "60 Seconds",
      title: "Select Amount & Short Tenure",
      description:
        "Choose an exact borrowing amount from ₹1,000 to ₹5 Lakhs and pick a comfortable short tenure between 3 and 12 months. Our engine performs a zero-impact soft credit qualification.",
      badge: "No CIBIL Impact",
    },
    {
      step: "02",
      icon: ShieldCheck,
      time: "2 Minutes",
      title: "100% Paperless e-KYC",
      description:
        "Authenticate digitally via UIDAI Aadhaar OTP and verify your bank account using the RBI-approved Sahamati Account Aggregator. No physical documents, no PDF bank statement upload, no physical visits.",
      badge: "Zero Paperwork",
    },
    {
      step: "03",
      icon: FileCheck2,
      time: "60 Seconds",
      title: "Review KFS & Setup AutoPay",
      description:
        "Examine your mandatory Key Fact Statement (KFS) containing the exact Annual Percentage Rate (APR), zero foreclosure clause, and cooling-off terms. Complete e-NACH / UPI AutoPay setup in one tap.",
      badge: "RBI Compliant KFS",
    },
    {
      step: "04",
      icon: Zap,
      time: "3s - 15 Mins",
      title: "Direct IMPS Bank Transfer",
      description:
        "Sign the digital loan agreement via OTP. The sanctioned funds are wired directly into your verified bank account via instant IMPS or NEFT payment rails ready for immediate withdrawal.",
      badge: "Instant Bank Credit",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-linear-to-b from-white via-[#FDFBF7] to-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Clock className="w-3.5 h-3.5 text-gold" />
            100% Digital Journey
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How to Get a Short-Term Loan in <span className="text-primary">4 Simple Steps</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            From initial tenure selection to instant bank disbursal — experience a transparent, RBI-supervised digital credit journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
              >
                <div>
                  {/* Step Number & Time Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-bricolage font-extrabold text-3xl sm:text-4xl text-primary/20 group-hover:text-primary/40 transition-colors">
                      {item.step}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {item.time}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 mb-1.5">
                      {item.badge}
                    </span>
                    <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-primary">
                  <span>Step {item.step} of 04</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-linear-to-r from-primary via-[#033b40] to-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-gold text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Emergency Cash Needed Today?
            </span>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
              Check Pre-Approved Short-Term Loans in Under 60 Seconds
            </h3>
            <p className="text-xs text-gray-200 mt-1 max-w-xl">
              100% digital check without deducting points from your CIBIL score. Compare offers from 15 RBI regulated lenders.
            </p>
          </div>

          <button
            onClick={() =>
              openApplyModal(
                "Short-Term Personal Loan",
                "Applied from 4-Step Disbursal Journey"
              )
            }
            className="bg-gold hover:bg-[#a3821f] text-gray-950 font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Start Your Paperless Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
