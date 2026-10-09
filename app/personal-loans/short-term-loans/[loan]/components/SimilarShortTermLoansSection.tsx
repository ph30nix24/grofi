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
  Calendar,
  Percent,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface SimilarShortTermLoansSectionProps {
  currentLender: ShortTermLoanLender;
  similarLenders: ShortTermLoanLender[];
}

export default function SimilarShortTermLoansSection({
  currentLender,
  similarLenders,
}: SimilarShortTermLoansSectionProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarLenders || similarLenders.length === 0) return null;

  return (
    <section id="similar-loans" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>MARKET ALTERNATIVES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Compare Similar Short-Term Loans
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Compare interest rates, turnaround times, and limits between {currentLender.name} and top alternative short-term lenders.
        </p>
      </div>

      {/* Grid of Similar Short-Term Loans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarLenders.map((item) => {
          const loanHref = `/personal-loans/short-term-loans/${item.id}`;
          const rateText =
            item.interestRate?.text ||
            `${item.interestRate?.min ?? 12.0}% p.a. onwards`;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
            >
              {/* Top accent strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-emerald-600 to-[#B69226]" />

              <div className="p-6 space-y-4">
                {/* Header: Logo + Name + Speed */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl bg-white border border-gray-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <Link href={loanHref}>
                        <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="text-[11px] text-gray-500 font-medium block truncate max-w-[190px]">
                        {item.rbiRegulatedEntity}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {item.disbursalTime}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs text-gray-600 line-clamp-2 min-h-[32px] leading-relaxed">
                  {item.tagline}
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-gray-50/80 border border-gray-100 text-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Starting Rate
                    </span>
                    <span className="font-bricolage font-bold text-xs text-primary truncate block mt-0.5">
                      {item.interestRate?.min ?? 12.0}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Limit
                    </span>
                    <span className="font-bricolage font-bold text-xs text-gray-900 truncate block mt-0.5">
                      {item.maxAmount}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Min CIBIL
                    </span>
                    <span className="font-bricolage font-bold text-xs text-emerald-700 truncate block mt-0.5">
                      {item.minCreditScore}+
                    </span>
                  </div>
                </div>

                {/* Short Tenures Preview */}
                {item.shortTenureOptions && item.shortTenureOptions.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">
                      Tenures: <strong>{item.shortTenureOptions.slice(0, 3).join(", ")}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  href={loanHref}
                  className="text-xs font-bold text-gray-700 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      item.name,
                      `Short-Term Loan in ${item.disbursalTime} • Starting from ${item.interestRate?.min ?? 12.0}% p.a.`
                    )
                  }
                  className="bg-primary hover:bg-[#035259] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Zap className="w-3 h-3 fill-white" />
                  <span>Quick Apply</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
