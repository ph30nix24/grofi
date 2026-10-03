"use client";

import React from "react";
import { Sparkles, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { BusinessLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanPreApprovedBannerProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanPreApprovedBanner({ lender }: BusinessLoanPreApprovedBannerProps) {
  const { openApplyModal } = useApplyModal();

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-montserrat">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-[#023b40] to-primary p-8 sm:p-12 text-white shadow-2xl">
        
        {/* Decorative lighting background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-3xl">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-200 border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>INSTANT MSME PRE-APPROVAL CHECK</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Check Your Pre-Approved Credit Limit for <span className="text-emerald-300">{lender.name}</span>
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 mt-3 leading-relaxed max-w-2xl">
            Get sanctioned up to <strong className="text-white">{lender.maxAmount}</strong> at rates starting from <strong className="text-white">{lender.interestRate?.min ?? 10.75}% p.a.</strong> No physical paperwork, rapid digital verification via GSTN and Account Aggregator, and zero impact on your CIBIL or commercial CMR score.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100/80 my-6">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Instant Soft Sanction</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Zero CIBIL / CMR Impact</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-300" />
              <span>100% Paperless GST &amp; e-KYC</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                lender.name,
                `Pre-approved Business Check: ${lender.name} • Soft Inquiry`
              )
            }
            className="bg-white hover:bg-gray-100 text-primary font-bold text-xs sm:text-sm py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98"
          >
            <span>Check Pre-Approved MSME Eligibility Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

        </div>

      </div>
    </section>
  );
}
