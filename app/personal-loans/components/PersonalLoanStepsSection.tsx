"use client";

import React from "react";
import {
  Search,
  ShieldCheck,
  FileCheck2,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function PersonalLoanStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Compare & Select Lender",
      description:
        "Filter across 10+ partner banks by lowest interest rates, highest limits, or instant disbursal speed suited to your income profile.",
      badge: "Step 1",
    },
    {
      step: "02",
      icon: ShieldCheck,
      title: "Zero-Impact Pre-Approval",
      description:
        "Check your custom pre-approved loan sanction and exact EMI terms via soft credit pull without deducting a single point from your CIBIL.",
      badge: "No CIBIL Hit",
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "100% Digital Paperless KYC",
      description:
        "Verify your identity in 2 minutes via Aadhaar OTP and securely upload bank statements using RBI's Account Aggregator framework.",
      badge: "Zero Paperwork",
    },
    {
      step: "04",
      icon: Zap,
      title: "Instant Bank Disbursal",
      description:
        "Sign the digital loan agreement via e-Sign and get sanctioned funds credited straight into your bank savings account in as fast as 10 seconds.",
      badge: "Funds Credited",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-linear-to-b from-[#FDFBF7] via-white to-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Seamless 4-Step Journey
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How Grofi Digital Loan Disbursal <span className="text-primary">Works</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            From discovering the lowest interest rate to seeing money credited to your account—100% paperless, rapid, and transparent.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bricolage font-extrabold text-2xl text-primary/30 group-hover:text-primary transition-colors">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                      {st.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] border border-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 mb-2 leading-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-primary group-hover:text-[#035259]">
                  <span>Fast Process</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA strip */}
        <div className="mt-12 bg-linear-to-r from-primary to-[#035259] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl leading-tight">
              Ready to check your pre-approved loan offers?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Zero physical documentation. Soft CIBIL check. Disbursals within hours.
            </p>
          </div>

          <button
            onClick={() => openApplyModal("Personal Loan", "Instant pre-approved loan check")}
            className="bg-gold hover:bg-[#c9a52f] text-gray-950 font-montserrat font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Check My Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
