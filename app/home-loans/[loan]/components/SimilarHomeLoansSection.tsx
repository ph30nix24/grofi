"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RefreshCw, Star, Percent, Home } from "lucide-react";
import { HomeLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface SimilarHomeLoansSectionProps {
  currentLender: HomeLoanLender;
  similarLenders: HomeLoanLender[];
}

export default function SimilarHomeLoansSection({
  currentLender,
  similarLenders,
}: SimilarHomeLoansSectionProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarLenders || similarLenders.length === 0) return null;

  return (
    <section id="similar-loans" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Home className="w-3.5 h-3.5 text-gold" />
          <span>MARKET ALTERNATIVES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Compare Top Alternatives to <span className="text-primary">{currentLender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Review other leading banks and housing finance institutions offering competitive repo-linked rates.
        </p>
      </div>

      {/* Grid of Similar Lenders (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarLenders.map((lender) => (
          <div
            key={lender.id}
            className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-primary/40 relative"
          >
            <div className="p-5 sm:p-6 space-y-4">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {lender.bankType.toUpperCase()} LENDER
                </span>
                {lender.rating && (
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{lender.rating}</span>
                  </div>
                )}
              </div>

              {/* Bank Name & Logo */}
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                  <Image
                    src={lender.logo}
                    alt={lender.name}
                    width={40}
                    height={40}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors leading-snug">
                    {lender.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {lender.tagline}
                  </p>
                </div>
              </div>

              {/* Rate & Starting EMI Box */}
              <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">Interest Rate</span>
                  <span className="font-bricolage font-extrabold text-base text-primary">
                    {lender.interestRate?.text}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block">EMI / Lakh (20Y)</span>
                    <span className="font-bold text-gray-900">₹{lender.startingEmiPerLakh20Yr}/mo</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">EMI / Lakh (30Y)</span>
                    <span className="font-bold text-emerald-700">₹{lender.startingEmiPerLakh30Yr}/mo</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                  {lender.maxLtv} Funding
                </span>
                {lender.overdraftScheme && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                    {lender.overdraftScheme}
                  </span>
                )}
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  0% Prepayment Fee
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
              <Link
                href={`/home-loans/${lender.id}`}
                className="flex-1 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-bold text-xs py-2.5 rounded-xl shadow-2xs text-center transition-all cursor-pointer"
              >
                View Details
              </Link>
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    lender.name,
                    `Home Loan Application • Rates from ${lender.interestRate?.min ?? 7.15}% p.a.`
                  )
                }
                className="flex-1 bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span>Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
