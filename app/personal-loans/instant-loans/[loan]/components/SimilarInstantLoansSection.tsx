"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface SimilarInstantLoansSectionProps {
  currentLender: InstantLoanLender;
  similarLenders: InstantLoanLender[];
}

export default function SimilarInstantLoansSection({
  currentLender,
  similarLenders,
}: SimilarInstantLoansSectionProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarLenders || similarLenders.length === 0) return null;

  return (
    <section id="similar-loans" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>ALTERNATIVE INSTANT OFFERS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Compare Similar Instant Loans
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Compare interest rates, turnaround times, and limits between {currentLender.name} and top alternative instant lenders.
        </p>
      </div>

      {/* Grid of Similar Instant Loans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarLenders.map((item) => {
          const loanHref = `/personal-loans/instant-loans/${item.id}`;
          const rateText =
            item.interestRate?.text ||
            `${item.interestRate?.min ?? 9.99}% p.a. onwards`;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
            >
              {/* Top accent strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-emerald-600 to-[#B69226]" />

              <div className="p-5 sm:p-6">
                {/* Header: Logo & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={52}
                      height={52}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {item.disbursalTime}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-bricolage font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-1">
                  <Link href={loanHref}>{item.name}</Link>
                </h3>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.tagline}
                </p>

                {/* Quick 2x2 Metric Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Starting Rate
                    </span>
                    <span className="text-xs font-bold text-primary block mt-0.5 truncate">
                      {rateText}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Max Amount
                    </span>
                    <span className="text-xs font-bold text-gray-900 block mt-0.5 truncate">
                      {item.maxAmount}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">
                      EMI / Lakh
                    </span>
                    <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                      ₹{item.startingEmiPerLakh}/mo
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Min CIBIL
                    </span>
                    <span className="text-xs font-bold text-gray-900 block mt-0.5">
                      {item.minCreditScore}+ Score
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  href={loanHref}
                  className="text-xs font-bold text-primary hover:text-[#035259] flex items-center gap-1 transition-colors group-hover:underline"
                >
                  <span>Full Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      item.name,
                      `Instant Loan: ${item.name} • Disbursal in ${item.disbursalTime}`
                    )
                  }
                  className="bg-primary hover:bg-[#035259] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1 shadow-2xs transition-all cursor-pointer active:scale-95"
                >
                  <Zap className="w-3 h-3 fill-white" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
