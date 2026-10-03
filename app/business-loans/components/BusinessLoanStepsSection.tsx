"use client";

import React from "react";
import {
  Search,
  ShieldCheck,
  FileCheck2,
  Zap,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function BusinessLoanStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Compare & Select Lender",
      description:
        "Filter across 12+ partner banks and NBFCs by lowest interest rate, turnover eligibility, and collateral-free options up to ₹75 Lakhs.",
      badge: "Step 1",
    },
    {
      step: "02",
      icon: ShieldCheck,
      title: "Sync GST & Banking Data",
      description:
        "Paperlessly connect your GSTIN returns and 6-12 months Current Account bank statements via the RBI-regulated Account Aggregator framework.",
      badge: "100% Digital",
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "In-Principle Sanction (48h)",
      description:
        "Automated cash-flow underwriting assesses your business turnover and provides an official digital in-principle sanction letter in 48 to 72 hours.",
      badge: "Fast Track",
    },
    {
      step: "04",
      icon: Zap,
      title: "e-Sign & Fund Disbursal",
      description:
        "Complete Aadhaar e-Sign on the loan agreement and receive sanctioned working capital or term loan funds credited directly into your Current Account.",
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
            Seamless 4-Step Disbursal Journey
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How to Get a Business Loan <span className="text-primary">in 4 Simple Steps</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            From initial comparison to bank disbursal — 100% digital, zero physical branch queues, and transparent terms.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group"
              >
                {/* Step badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-bricolage font-extrabold text-3xl text-gray-200 group-hover:text-primary/20 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF4ED] text-primary border border-primary/15">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line marker */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-primary">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-12 bg-linear-to-r from-primary via-[#035259] to-primary rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-1">
              Ready to Expand Your Business?
            </span>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl leading-tight">
              Get Sanction Letters from Top Indian Banks in 48 Hours
            </h3>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
              Check your eligibility without any paperwork or branch visits. 100% paperless digital sanction.
            </p>
          </div>

          <button
            onClick={() => openApplyModal("Business Loan Fast-Track", "Pre-Approved MSME Working Capital")}
            className="bg-white hover:bg-gray-100 text-primary font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2 group"
          >
            <span>Start Digital Application</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
