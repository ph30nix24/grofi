"use client";

import React from "react";
import { Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanPreApprovedBannerProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanPreApprovedBanner({
  lender,
}: LoanAgainstPropertyLoanPreApprovedBannerProps) {
  const { openApplyModal } = useApplyModal();

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-montserrat">
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-[#173823] via-[#1E4D2B] to-[#122A1B] text-white p-8 sm:p-12 shadow-2xl border border-primary/30">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-gold border border-white/10 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Digital In-Principle Mortgage Sanction</span>
            </div>

            <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Ready to Unlock Liquidity with <span className="text-gold">{lender.name}</span>?
            </h2>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xl">
              Check your eligible mortgage limit up to {lender.maxAmount} with zero impact on your CIBIL credit score. Enjoy doorstep property legal vetting and dedicated senior credit desk assistance.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200/90 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                Soft Inquiry Only
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                0% Prepayment on Floating
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-gold" />
                Fast Track 5-Day Disbursal
              </span>
            </div>
          </div>

          {/* Action Box */}
          <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="bg-gold hover:bg-gold-hover active:scale-[0.99] text-gray-950 font-bold py-3.5 px-8 rounded-2xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Get In-Principle Sanction</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-[11px] text-gray-300 text-center sm:text-left lg:text-center">
              100% Paperless Assessment • Doorstep Service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
