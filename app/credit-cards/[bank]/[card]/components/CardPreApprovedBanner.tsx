"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import { CardStructure } from "./type";

interface CardPreApprovedBannerProps {
  card: CardStructure;
}

export default function CardPreApprovedBanner({ card }: CardPreApprovedBannerProps) {
  const { openApplyModal } = useApplyModal();

  return (
    <section aria-label="Pre-Approved Credit Card Banner" className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-12 sm:py-16 md:py-20">
      <div className="bg-linear-to-br from-[#02474D] via-[#03363b] to-[#012225] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-primary/50">
        
        {/* Ambient Luxury Glows */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-gold mb-3.5 font-montserrat border border-gold/20">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>INSTANT DIGITAL VERIFICATION</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight wrap-break-word">
            Ready to Apply for the <span className="text-gold">{card.name}</span>?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-white/85 font-montserrat mt-3 leading-relaxed">
            Check your pre-approved credit limit and instant approval eligibility across {card.issuer} with 100% paperless verification and zero score impact.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 text-xs text-white/90 font-montserrat">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              100% Free Service
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              No CIBIL Score Impact
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              256-Bit Bank Grade Security
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() =>
              openApplyModal(
                card.name,
                `${card.issuer} • Pre-Approved Digital Application`
              )
            }
            className="w-full sm:w-auto bg-linear-to-r from-gold via-[#C5A038] to-gold hover:from-[#C5A038] hover:to-gold active:scale-98 text-white text-xs sm:text-sm font-bold px-8 py-4.5 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer font-montserrat whitespace-nowrap group"
          >
            <span>Check Pre-Approved Offer</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
