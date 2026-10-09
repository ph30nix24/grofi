"use client";

import React from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferLoanPreApprovedBannerProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanPreApprovedBanner({
  lender,
}: BalanceTransferLoanPreApprovedBannerProps) {
  const { openApplyModal } = useApplyModal();
  const minRate = lender.interestRate?.min ?? 7.25;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-montserrat">
      <div className="relative rounded-3xl bg-linear-to-r from-[#02474D] via-[#033B40] to-[#022B2F] p-8 sm:p-12 text-white shadow-2xl overflow-hidden border border-[#045961]">
        {/* Ambient decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Instant Paperless In-Principle Sanction</span>
            </div>

            <h3 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Ready to Cut Your Home Loan EMI with <span className="text-gold">{lender.name}</span>?
            </h3>

            <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed">
              Transfer your outstanding loan at <strong className="text-white font-bold">{minRate}% p.a.</strong> Enjoy capped processing fees ({lender.processingFeeCap}), top-up up to <strong className="text-white font-bold">{lender.maxTopUpAmount.replace(/based on.*/i, "").trim()}</strong>, and zero prepayment penalties.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-emerald-100 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Zero Impact on CIBIL Score
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Dedicated LOD Assistance Desk
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                100% Free Consultation
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                const formEl = document.getElementById("hero-apply-form");
                if (formEl) {
                  formEl.scrollIntoView({ behavior: "smooth" });
                  const input = formEl.querySelector("input");
                  if (input) input.focus();
                } else {
                  openApplyModal(
                    lender.name,
                    `Direct Balance Transfer • Rates from ${minRate}% p.a.`
                  );
                }
              }}
              className="w-full sm:w-auto bg-[#E5B537] hover:bg-[#F5C545] text-[#02474D] font-extrabold text-xs sm:text-sm py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 group"
            >
              <span>Check Pre-Approved Offer</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
