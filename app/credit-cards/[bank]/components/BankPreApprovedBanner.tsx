"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BankPreApprovedBannerProps {
  bankName: string;
}

export default function BankPreApprovedBanner({ bankName }: BankPreApprovedBannerProps) {
  const { openApplyModal } = useApplyModal();

  return (
    <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pb-16">
      <div className="bg-linear-to-br from-primary via-[#043b40] to-primary text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-gold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Instant Digital Eligibility</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-white">
            Check Pre-Approved {bankName} Cards in 60 Seconds
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-montserrat mt-2 leading-relaxed">
            Find out your credit limit, approval probability, and lifetime free eligibility with 100% paperless verification and zero score impact.
          </p>
        </div>

        <div className="relative z-10 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={() =>
              openApplyModal(`${bankName} Credit Card`, `${bankName} Pre-Approved Offers`)
            }
            className="w-full md:w-auto bg-gold hover:bg-gold/90 text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-montserrat whitespace-nowrap active:scale-[0.98]"
          >
            <span>Check Pre-Approved Offers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
