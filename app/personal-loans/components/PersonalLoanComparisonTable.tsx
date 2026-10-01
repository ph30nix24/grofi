"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, TrendingDown, ShieldCheck } from "lucide-react";
import { PersonalLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import PersonalLoanDetailModal from "./PersonalLoanDetailModal";

interface PersonalLoanComparisonTableProps {
  lenders: PersonalLoanLender[];
  onSelectLender?: (lender: PersonalLoanLender) => void;
}

export default function PersonalLoanComparisonTable({
  lenders,
  onSelectLender,
}: PersonalLoanComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [internalSelectedLender, setInternalSelectedLender] = useState<PersonalLoanLender | null>(null);

  const handleSelect = (lender: PersonalLoanLender) => {
    if (onSelectLender) {
      onSelectLender(lender);
    } else {
      setInternalSelectedLender(lender);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider mb-2.5">
            <TrendingDown className="w-3.5 h-3.5 text-gold" />
            2026 Interest Rate Matrix
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Compare Top Personal Loan <span className="text-primary">Interest Rates & Fees</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 font-montserrat">
            Instant side-by-side overview of interest rates, starting EMIs, maximum loan limits, and turnaround times across all partner institutions.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-montserrat border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6">Bank / Lender</th>
                  <th className="py-4 px-3 sm:px-4">Interest Rate</th>
                  <th className="py-4 px-3 sm:px-4">Starting EMI / Lakh</th>
                  <th className="py-4 px-3 sm:px-4">Max Loan Limit</th>
                  <th className="py-4 px-3 sm:px-4">Disbursal Speed</th>
                  <th className="py-4 px-3 sm:px-4">Processing Fee</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {lenders.map((lender) => (
                  <tr
                    key={lender.id}
                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleSelect(lender)}
                  >
                    {/* Bank / Lender */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={36}
                            height={36}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 group-hover:text-primary transition-colors">
                              {lender.name}
                            </span>
                            {lender.badge && (
                              <span className="hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                                {lender.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            {lender.bankType || "Bank"} • Min CIBIL {lender.minCreditScore}+
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-3 sm:px-4 font-bricolage font-bold text-sm sm:text-base text-primary whitespace-nowrap">
                      {lender.interestRate?.min ?? 9.99}% - {lender.interestRate?.max ?? 24}% p.a.
                    </td>

                    {/* Starting EMI / Lakh */}
                    <td className="py-4 px-3 sm:px-4 font-semibold text-emerald-800 whitespace-nowrap">
                      ₹{lender.startingEmiPerLakh} / Lakh
                    </td>

                    {/* Max Loan Limit */}
                    <td className="py-4 px-3 sm:px-4 font-bricolage font-bold text-gray-900 whitespace-nowrap">
                      {lender.maxAmount}
                    </td>

                    {/* Disbursal Speed */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded-md text-xs whitespace-nowrap">
                        {lender.disbursalTime}
                      </span>
                    </td>

                    {/* Processing Fee */}
                    <td className="py-4 px-3 sm:px-4 text-xs text-gray-600 max-w-[180px] truncate" title={lender.processingFee}>
                      {lender.processingFee}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelect(lender)}
                          className="text-xs font-semibold text-gray-500 hover:text-primary p-2 transition-colors cursor-pointer hidden sm:inline-block"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openApplyModal(lender.name, lender.tagline)}
                          className="bg-primary hover:bg-[#035259] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-1 cursor-pointer"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-gray-50/80 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-montserrat gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Interest rates subject to applicant credit profile, CIBIL score & employer category.</span>
            </span>
            <span className="font-semibold text-gray-700">Updated: October 2026</span>
          </div>
        </div>

      </div>

      {/* Internal Modal if onSelectLender wasn't passed */}
      {internalSelectedLender && (
        <PersonalLoanDetailModal
          lender={internalSelectedLender}
          onClose={() => setInternalSelectedLender(null)}
        />
      )}
    </section>
  );
}
