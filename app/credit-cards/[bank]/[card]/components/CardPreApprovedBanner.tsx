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
    <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-12 sm:py-16">
      <div className="bg-linear-to-br from-[#02474D] via-[#03363b] to-[#012225] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-primary/40">
        
        {/* Ambient Glows */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-gold mb-3 font-montserrat">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Instant Digital Verification</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Ready to Apply for the <span className="text-gold">{card.name}</span>?
          </h2>

          <p className="text-xs sm:text-sm text-white/80 font-montserrat mt-2.5 leading-relaxed">
            Check your pre-approved credit limit and instant approval eligibility across {card.issuer} with 100% paperless verification and zero score impact.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-5 text-xs text-white/90 font-montserrat">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Free Service
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              No CIBIL Score Impact
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              256-Bit Bank Grade Encryption
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
            className="w-full sm:w-auto bg-gold hover:bg-[#c9a52f] text-white text-xs sm:text-sm font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer font-montserrat whitespace-nowrap active:scale-[0.98]"
          >
            <span>Check Pre-Approved Offer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
