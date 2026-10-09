"use client";

import React from "react";
import { Sparkles, ShieldCheck, ArrowRight, Lock, CheckCircle2, Zap } from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanPreApprovedBannerProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanPreApprovedBanner({
  lender,
}: ShortTermLoanPreApprovedBannerProps) {
  const { openApplyModal } = useApplyModal();

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-montserrat">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-[#023b40] to-primary p-8 sm:p-12 text-white shadow-2xl">
        {/* Decorative lighting background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9AA3C]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-200 border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9AA3C]" />
            <span>INSTANT SHORT-TERM LIMIT CHECK</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Check Your Pre-Approved Limit for <span className="text-emerald-300">{lender.name}</span>
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 mt-3 leading-relaxed max-w-2xl">
            Get sanctioned from <strong className="text-white">{lender.minAmount}</strong> up to{" "}
            <strong className="text-white">{lender.maxAmount}</strong> in just{" "}
            <strong className="text-white">{lender.disbursalTime}</strong>. 100% paperless DigiLocker e-KYC with zero impact on your CIBIL score.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100/80 my-6">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Instant Soft Sanction</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Zero CIBIL Impact</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-300" />
              <span>100% Paperless DigiLocker e-KYC</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                lender.name,
                `Instant Pre-Approval Check for ${lender.name} • Limit up to ${lender.maxAmount}`
              )
            }
            className="bg-[#C9AA3C] hover:bg-[#b89b33] text-gray-950 font-bricolage font-bold text-xs sm:text-sm py-3.5 px-7 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4 fill-gray-950" />
            <span>Check Pre-Approved Offer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
