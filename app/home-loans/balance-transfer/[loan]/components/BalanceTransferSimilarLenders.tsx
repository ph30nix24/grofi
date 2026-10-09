"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Building2 } from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferSimilarLendersProps {
  currentLender: BalanceTransferLender;
  similarLenders: BalanceTransferLender[];
}

export default function BalanceTransferSimilarLenders({
  currentLender,
  similarLenders,
}: BalanceTransferSimilarLendersProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarLenders || similarLenders.length === 0) return null;

  return (
    <section
      id="similar-transfers"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Building2 className="w-3.5 h-3.5 text-gold" />
          <span>MARKET ALTERNATIVES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Compare Top Alternatives to <span className="text-primary">{currentLender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Explore other verified banks and HFCs offering low takeover rates, high top-ups, and fast cheque disbursal.
        </p>
      </div>

      {/* Grid of 3 Alternative Lenders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarLenders.map((lender) => {
          const rateText =
            lender.interestRate?.text ||
            `${lender.interestRate?.min ?? 7.25}% - ${lender.interestRate?.max ?? 8.75}% p.a.`;

          return (
            <div
              key={lender.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-primary/40 relative"
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {lender.bankType.toUpperCase()} TAKEOVER
                  </span>
                  {lender.rating && (
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{lender.rating}</span>
                    </div>
                  )}
                </div>

                {/* Bank Name & Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    <Image
                      src={lender.logo}
                      alt={lender.name}
                      width={44}
                      height={44}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bricolage font-bold text-base text-gray-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {lender.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {lender.tagline}
                    </p>
                  </div>
                </div>

                {/* Metric Summary Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                  <div className="bg-gray-50 p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      Takeover Rate
                    </span>
                    <span className="font-bricolage font-extrabold text-sm text-primary block mt-0.5 truncate">
                      {rateText}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      Starting EMI
                    </span>
                    <span className="font-bricolage font-extrabold text-sm text-gray-900 block mt-0.5">
                      ₹{lender.startingEmiPerLakh20Yr}/L
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      Fee Cap
                    </span>
                    <span className="font-semibold text-xs text-gray-800 block mt-0.5 truncate" title={lender.processingFeeCap}>
                      {lender.processingFeeCap || lender.processingFee}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      Turnaround
                    </span>
                    <span className="font-semibold text-xs text-gray-800 block mt-0.5 truncate">
                      {lender.turnaroundTime}
                    </span>
                  </div>
                </div>

                {/* Overdraft or Top-up feature pill */}
                {lender.overdraftScheme ? (
                  <div className="text-[11px] text-purple-700 bg-purple-50 p-2 rounded-xl border border-purple-200 font-medium truncate">
                    Overdraft: {lender.overdraftScheme}
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200 font-medium truncate">
                    Top-Up Limit: {lender.maxTopUpAmount.replace(/based on.*/i, "").trim()}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  href={`/home-loans/balance-transfer/${lender.id}`}
                  className="flex-1 text-center py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:text-primary hover:border-primary transition-all bg-white shadow-2xs"
                >
                  View Details
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      lender.name,
                      `Takeover application • Rates from ${lender.interestRate?.min ?? 7.25}% p.a.`
                    )
                  }
                  className="py-2.5 px-4 rounded-xl bg-primary hover:bg-[#035259] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
