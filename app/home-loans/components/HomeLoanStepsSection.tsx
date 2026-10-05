"use client";

import React from "react";
import {
  Search,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Home,
  Zap,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function HomeLoanStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Compare & Get In-Principle Sanction",
      description:
        "Select your preferred bank from 13+ options. Check your loan eligibility & preliminary sanction limit within 2 minutes via a soft credit inquiry.",
      badge: "Zero CIBIL Hit",
    },
    {
      step: "02",
      icon: Home,
      title: "Property Technical Valuation",
      description:
        "Bank-empanelled civil engineers perform doorstep property inspection, carpet area verification, and fair market valuation.",
      badge: "Doorstep Support",
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "Legal Title Verification",
      description:
        "Senior advocates conduct a 30-year chain-of-title search, verifying non-encumbrance, approved layout plans, and RERA registration.",
      badge: "100% Secure Title",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Sanction Letter & MODT Signing",
      description:
        "Receive your formal sanction letter with customized interest rate and overdraft terms. Sign the digital loan agreement & MODT.",
      badge: "Rate Locked",
    },
    {
      step: "05",
      icon: Zap,
      title: "Direct Disbursal to Seller",
      description:
        "Sanctioned loan amount is disbursed directly to the property builder/seller via RTGS or pay-order, completing your home purchase.",
      badge: "Dream Home Keys",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-linear-to-b from-[#FDFBF7] via-white to-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Seamless 5-Step Journey
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How Grofi Home Loan Disbursal <span className="text-primary">Works</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            From initial rate comparison to doorstep legal clearance and direct seller disbursal—transparent, end-to-end guidance.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bricolage font-extrabold text-xl text-primary/30 group-hover:text-primary transition-colors">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                      {st.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-2xl bg-[#EBF4ED] border border-primary/15 text-primary flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-2 leading-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Verified by Grofi</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-linear-to-r from-primary via-[#035259] to-primary text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-gold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doorstep Legal & Valuation Included</span>
            </div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
              Ready to Buy Your Dream Home?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl">
              Get matched with India&apos;s lowest home loan interest rates starting from 7.15% p.a. with zero obligation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openApplyModal("Home Loan", "Pre-Approved Sanction")}
            className="bg-gold hover:bg-[#a3801f] text-gray-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Check My Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
