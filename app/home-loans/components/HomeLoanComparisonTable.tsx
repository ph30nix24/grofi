"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, TrendingDown, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { HomeLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import HomeLoanDetailModal from "./HomeLoanDetailModal";

interface HomeLoanComparisonTableProps {
  lenders: HomeLoanLender[];
  onSelectLender?: (lender: HomeLoanLender) => void;
}

export default function HomeLoanComparisonTable({
  lenders,
  onSelectLender,
}: HomeLoanComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [internalSelectedLender, setInternalSelectedLender] = useState<HomeLoanLender | null>(null);

  // Pagination state (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = lenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = lenders.slice(startIndex, endIndex);

  const handleSelect = (lender: HomeLoanLender) => {
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
            2026 Home Loan Rates Matrix
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Compare Top Home Loan <span className="text-primary">Interest Rates & Fees</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Compare verified interest rates, starting EMI per lakh (20 vs 30 years), maximum property funding (LTV), and overdraft facilities across all 13 lenders.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
          <div className="w-full">
            <table className="hidden md:table w-full text-left text-xs sm:text-sm font-montserrat border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6 w-[24%]">Bank / Institution</th>
                  <th className="py-4 px-3 sm:px-4 w-[14%]">Interest Rate</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">EMI / Lakh (20Y)</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">EMI / Lakh (30Y)</th>
                  <th className="py-4 px-3 sm:px-4 w-[12%]">Max LTV</th>
                  <th className="py-4 px-3 sm:px-4 w-[14%]">Overdraft Scheme</th>
                  <th className="py-4 px-4 text-center w-[10%]">Action</th>
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
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bricolage font-bold text-gray-900 group-hover:text-primary transition-colors text-sm sm:text-base">
                              {lender.name}
                            </span>
                            {lender.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                                {lender.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 block truncate">
                            {lender.bankType.toUpperCase()} • Min CIBIL {lender.minCreditScore}+
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="font-bricolage font-extrabold text-primary text-sm sm:text-base block">
                        {lender.interestRate?.text}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        EBLR Repo Linked
                      </span>
                    </td>

                    {/* EMI / Lakh 20Y */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="font-bold text-gray-900 text-sm">
                        ₹{lender.startingEmiPerLakh20Yr}
                      </span>
                      <span className="text-[10px] text-gray-400 block">/ month</span>
                    </td>

                    {/* EMI / Lakh 30Y */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="font-bold text-emerald-700 text-sm">
                        ₹{lender.startingEmiPerLakh30Yr}
                      </span>
                      <span className="text-[10px] text-gray-400 block">/ month</span>
                    </td>

                    {/* Max LTV */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="font-bold text-blue-700 text-xs sm:text-sm">
                        {lender.maxLtv}
                      </span>
                      <span className="text-[10px] text-gray-400 block">RBI Guideline</span>
                    </td>

                    {/* Overdraft Scheme */}
                    <td className="py-4 px-3 sm:px-4">
                      {lender.overdraftScheme ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                          <RefreshCw className="w-3 h-3 text-purple-600" />
                          <span className="truncate max-w-[110px]">{lender.overdraftScheme}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Standard Loan</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => openApplyModal(lender.name, `Home Loan - ${lender.interestRate?.text}`)}
                        className="bg-primary hover:bg-[#035259] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-2xs hover:shadow-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View Card List */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedLenders.map((lender) => (
                <div key={lender.id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
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
                      <h4 className="font-bricolage font-bold text-sm text-gray-900">{lender.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500">
                        <span>{lender.bankType.toUpperCase()}</span>
                        {lender.badge && <span>• {lender.badge}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Rate</span>
                      <span className="font-bold text-primary">{lender.interestRate?.text}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">20Y EMI / Lakh</span>
                      <span className="font-bold text-gray-900">₹{lender.startingEmiPerLakh20Yr}/mo</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">30Y EMI / Lakh</span>
                      <span className="font-bold text-emerald-700">₹{lender.startingEmiPerLakh30Yr}/mo</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Max Funding</span>
                      <span className="font-bold text-blue-700">{lender.maxLtv}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleSelect(lender)}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => openApplyModal(lender.name, `Home Loan - ${lender.interestRate?.text}`)}
                      className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Table Footer with Pagination */}
          {totalPages > 1 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
              <span>
                Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong> of <strong>{totalItems}</strong> institutions
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, safeCurrentPage - 1))}
                  disabled={safeCurrentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      safeCurrentPage === page
                        ? "bg-primary text-white shadow-2xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, safeCurrentPage + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Internal Modal if opened via table */}
      <HomeLoanDetailModal
        lender={internalSelectedLender}
        onClose={() => setInternalSelectedLender(null)}
      />
    </section>
  );
}
