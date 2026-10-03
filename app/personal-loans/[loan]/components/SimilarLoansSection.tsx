"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
} from "lucide-react";
import { PersonalLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface SimilarLoansSectionProps {
  currentLender: PersonalLoanLender;
  similarLenders: PersonalLoanLender[];
}

export default function SimilarLoansSection({
  currentLender,
  similarLenders,
}: SimilarLoansSectionProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarLenders || similarLenders.length === 0) return null;

  return (
    <section id="similar-loans" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Building2 className="w-3.5 h-3.5 text-gold" />
          <span>ALTERNATIVE OFFERS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Compare Similar Personal Loans
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Compare interest rates, loan limits, and disbursal speeds between {currentLender.name} and top alternative lenders.
        </p>
      </div>

      {/* Grid of Similar Loans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarLenders.map((item) => {
          const loanHref = `/personal-loans/${item.id}`;
          const rateText = item.interestRate?.text || `${item.interestRate?.min ?? 9.99}% p.a. onwards`;

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
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {item.bankType ? item.bankType.toUpperCase() : "LENDER"}
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
                      Interest Rate
                    </span>
                    <span className="text-xs font-bold text-primary block mt-0.5 truncate">
                      {rateText}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Max Loan Limit
                    </span>
                    <span className="text-xs font-bold text-gray-900 block mt-0.5 truncate">
                      {item.maxAmount}
                    </span>
                  </div>

                  <div className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-[9px] font-semibold text-emerald-800 uppercase tracking-wider block">
                      Starting EMI
                    </span>
                    <span className="text-xs font-bold text-emerald-950 block mt-0.5 truncate">
                      ₹{item.startingEmiPerLakh} / Lakh
                    </span>
                  </div>

                  <div className="bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
                    <span className="text-[9px] font-semibold text-amber-800 uppercase tracking-wider block">
                      Disbursal Speed
                    </span>
                    <span className="text-xs font-bold text-amber-900 block mt-0.5 truncate">
                      {item.disbursalTime}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <Link
                  href={loanHref}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl text-center transition-colors"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      item.name,
                      `Apply for ${item.name} • Rates from ${item.interestRate?.min ?? 9.99}% p.a.`
                    )
                  }
                  className="flex-1 bg-primary hover:bg-[#035259] text-white text-xs font-bold py-2.5 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
