"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Building2, Zap } from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertySimilarLendersProps {
  currentLender: LoanAgainstPropertyLender;
  similarLenders: LoanAgainstPropertyLender[];
}

export default function LoanAgainstPropertySimilarLenders({
  currentLender,
  similarLenders,
}: LoanAgainstPropertySimilarLendersProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarLenders || similarLenders.length === 0) return null;

  return (
    <section
      id="similar-lenders"
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
          Benchmark mortgage lending parameters across other premier banks and HFCs offering high LTV funding and dropline overdraft limits.
        </p>
      </div>

      {/* Grid of 3 Alternative Lenders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarLenders.map((lender) => {
          const rateText =
            lender.interestRate?.text ||
            `${lender.interestRate?.min ?? 9.25}% - ${lender.interestRate?.max ?? 11.5}% p.a.`;

          return (
            <div
              key={lender.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-primary/40 relative"
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {lender.bankType.toUpperCase()} MORTGAGE
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
                    <p className="text-xs text-gray-500 line-clamp-1">{lender.tagline}</p>
                  </div>
                </div>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs border-t border-gray-100">
                  <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 font-medium">Interest Rate</span>
                    <div className="font-bricolage font-extrabold text-sm text-primary">
                      {lender.interestRate?.min ?? 9.25}% p.a.
                    </div>
                    <span className="text-[10px] text-gray-400 truncate block">{rateText}</span>
                  </div>

                  <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 font-medium">Starting EMI</span>
                    <div className="font-bricolage font-extrabold text-sm text-gray-900">
                      ₹{lender.startingEmiPerLakh15Yr} / L
                    </div>
                    <span className="text-[10px] text-gray-400 block">@ 15 Years</span>
                  </div>

                  <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 font-medium">Max Sanction</span>
                    <div className="font-bricolage font-extrabold text-xs sm:text-sm text-gray-900 truncate">
                      {lender.maxAmount.replace(/\(.*\)/, "").trim()}
                    </div>
                  </div>

                  <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 font-medium">Max LTV</span>
                    <div className="font-bricolage font-extrabold text-xs sm:text-sm text-emerald-700">
                      {lender.maxLtvPercent}%
                    </div>
                  </div>
                </div>

                {/* Overdraft tag */}
                {lender.overdraftAvailable && (
                  <div className="flex items-center gap-1.5 text-[11px] text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                    <Zap className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">Overdraft / Dropline Facility Supported</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex items-center gap-2">
                <Link
                  href={`/home-loans/loan-against-property/${lender.id}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold transition-colors shadow-2xs hover:shadow-xs flex items-center justify-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => openApplyModal(lender.name, "Loan Against Property")}
                  className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
