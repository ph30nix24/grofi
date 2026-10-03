"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, TrendingDown, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { BusinessLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import BusinessLoanDetailModal from "./BusinessLoanDetailModal";

interface BusinessLoanComparisonTableProps {
  lenders: BusinessLoanLender[];
  onSelectLender?: (lender: BusinessLoanLender) => void;
}

export default function BusinessLoanComparisonTable({
  lenders,
  onSelectLender,
}: BusinessLoanComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [internalSelectedLender, setInternalSelectedLender] = useState<BusinessLoanLender | null>(null);

  // Pagination state (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = lenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = lenders.slice(startIndex, endIndex);

  const handleSelect = (lender: BusinessLoanLender) => {
    if (onSelectLender) {
      onSelectLender(lender);
    } else {
      setInternalSelectedLender(lender);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("rate-matrix-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="rate-matrix-section" className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <TrendingDown className="w-3.5 h-3.5 text-gold" />
            2026 Commercial Loan Matrix
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Compare Top Business Loan <span className="text-primary">Interest Rates & Terms</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Side-by-side benchmark of commercial interest rates, starting EMIs, maximum limits, collateral rules, and minimum turnover requirements.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
          {/* Desktop & Tablet Table */}
          <div className="w-full">
            <table className="hidden md:table w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6 w-[24%]">Bank / Lender</th>
                  <th className="py-4 px-3 sm:px-4 w-[14%]">Interest Rate</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">Starting EMI / Lakh</th>
                  <th className="py-4 px-3 sm:px-4 w-[12%]">Max Loan Limit</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">Collateral Type</th>
                  <th className="py-4 px-3 sm:px-4 w-[12%]">Min Turnover</th>
                  <th className="py-4 px-4 text-center w-[12%]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {paginatedLenders.map((lender) => (
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
                            width={40}
                            height={40}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bricolage font-bold text-sm text-gray-900 group-hover:text-primary transition-colors leading-snug">
                            {lender.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-bold uppercase text-gray-500">
                              {lender.bankType}
                            </span>
                            {lender.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                {lender.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-3 sm:px-4 font-bricolage font-extrabold text-primary text-sm sm:text-base">
                      {lender.interestRate?.min}% - {lender.interestRate?.max}%
                    </td>

                    {/* Starting EMI */}
                    <td className="py-4 px-3 sm:px-4 font-bold text-emerald-800">
                      ₹{lender.startingEmiPerLakh} / Lakh
                    </td>

                    {/* Max Loan Limit */}
                    <td className="py-4 px-3 sm:px-4 font-bricolage font-bold text-gray-900">
                      {lender.maxAmount}
                    </td>

                    {/* Collateral Type */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {lender.collateralType.split("(")[0].trim()}
                      </span>
                    </td>

                    {/* Min Turnover */}
                    <td className="py-4 px-3 sm:px-4 text-xs font-semibold text-gray-600">
                      {lender.minTurnover}
                    </td>

                    {/* Action */}
                    <td
                      className="py-4 px-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => openApplyModal(lender.name, lender.tagline)}
                        className="bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2 px-3 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Stacked Card Rows */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedLenders.map((lender) => (
                <div
                  key={lender.id}
                  className="p-4 space-y-3 cursor-pointer hover:bg-gray-50/50"
                  onClick={() => handleSelect(lender)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={40}
                          height={40}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bricolage font-bold text-sm text-gray-900">
                          {lender.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase text-gray-500">
                          {lender.bankType}
                        </span>
                      </div>
                    </div>
                    {lender.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {lender.badge}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-[#FDFBF7] p-2.5 rounded-xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Interest Rate</span>
                      <span className="font-bold text-primary font-bricolage">
                        {lender.interestRate?.min}% - {lender.interestRate?.max}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Starting EMI</span>
                      <span className="font-bold text-emerald-800">₹{lender.startingEmiPerLakh} / Lakh</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Max Sanction</span>
                      <span className="font-bold text-gray-900 font-bricolage">{lender.maxAmount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Collateral</span>
                      <span className="font-semibold text-emerald-800">{lender.collateralType.split("(")[0].trim()}</span>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 pt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleSelect(lender)}
                      className="flex-1 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openApplyModal(lender.name, lender.tagline)}
                      className="flex-1 py-2 text-xs font-bold text-white bg-primary rounded-xl hover:bg-[#035259] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table Pagination */}
          {totalPages > 1 && (
            <div className="p-4 bg-gray-50/80 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <span>
                Showing {startIndex + 1}–{endIndex} of {totalItems} lenders
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="font-semibold">
                  Page {safeCurrentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Internal Modal Trigger */}
      <BusinessLoanDetailModal
        lender={internalSelectedLender}
        onClose={() => setInternalSelectedLender(null)}
      />
    </section>
  );
}
