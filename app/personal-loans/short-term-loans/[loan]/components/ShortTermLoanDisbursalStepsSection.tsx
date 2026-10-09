"use client";

import React from "react";
import {
  Smartphone,
  FileCheck2,
  Sliders,
  Zap,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanDisbursalStepsSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanDisbursalStepsSection({
  lender,
}: ShortTermLoanDisbursalStepsSectionProps) {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      title: "Soft Check & Instant Offer",
      time: "60 Seconds",
      desc: `Enter your basic mobile & PAN details. Algorithmic engines calculate your pre-approved limit from ${lender.minAmount} to ${lender.maxAmount} with zero impact on your CIBIL score.`,
      icon: Smartphone,
      badge: "Zero CIBIL Impact",
    },
    {
      step: "02",
      title: "Paperless e-KYC Verification",
      time: "2 Minutes",
      desc: "Authenticate your Aadhaar via instant DigiLocker OTP and connect your salary account safely via Sahamati Account Aggregator without uploading PDF statements.",
      icon: FileCheck2,
      badge: "100% Paperless",
    },
    {
      step: "03",
      title: "Pick Short Tenure & Review KFS",
      time: "1 Minute",
      desc: `Choose your preferred short tenure (${lender.shortTenureOptions?.[0] || "3 Months"} to ${lender.tenureMonths || 12}M) and review your transparent Key Fact Statement detailing exact fees and APR.`,
      icon: Sliders,
      badge: "Transparent APR",
    },
    {
      step: "04",
      title: "Instant Bank IMPS Disbursal",
      time: lender.disbursalTime,
      desc: `e-Sign the digital agreement via Aadhaar OTP and set up automated e-NACH/UPI AutoPay. Funds transfer directly into your savings account in ${lender.disbursalTime}.`,
      icon: Zap,
      badge: `In ${lender.disbursalTime}`,
    },
  ];

  return (
    <section id="disbursal-steps" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Clock className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>FAST 4-STEP ONBOARDING</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How to Get Funds from <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          From application to money in your bank account in 4 simple paperless steps.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bricolage font-extrabold text-sm">
                    {item.step}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.time}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                <span>{item.badge}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Strip */}
      <div className="bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/80 border border-emerald-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h4 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
              Ready to borrow short-term with zero branch visits?
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Check your pre-approved limit in 60 seconds with zero impact on your CIBIL score.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            openApplyModal(
              lender.name,
              `Disbursal flow for ${lender.name} • Disbursal in ${lender.disbursalTime}`
            )
          }
          className="bg-primary hover:bg-[#035259] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <span>Start 4-Step Application</span>
          <ArrowRight className="w-4 h-4 text-gold" />
        </button>
      </div>
    </section>
  );
}
