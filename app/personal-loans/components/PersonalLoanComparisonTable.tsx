"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, TrendingDown, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Pagination state (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = lenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = lenders.slice(startIndex, endIndex);

  const handleSelect = (lender: PersonalLoanLender) => {
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
    <section id="rate-matrix-section" className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-gray-200/60">
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
          {/* Desktop & Tablet Table (No horizontal scroll, fully responsive) */}
          <div className="w-full">
            <table className="hidden md:table w-full text-left text-xs sm:text-sm font-montserrat border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6 w-[25%]">Bank / Lender</th>
                  <th className="py-4 px-3 sm:px-4 w-[14%]">Interest Rate</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">Starting EMI / Lakh</th>
                  <th className="py-4 px-3 sm:px-4 w-[12%]">Max Loan Limit</th>
                  <th className="py-4 px-3 sm:px-4 w-[12%]">Disbursal Speed</th>
                  <th className="py-4 px-3 sm:px-4 w-[14%]">Processing Fee</th>
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
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 group-hover:text-primary transition-colors leading-snug">
                              {lender.name}
                            </span>
                            {lender.badge && (
                              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                                {lender.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold mt-0.5">
                            {lender.bankType || "Bank"} • Min CIBIL {lender.minCreditScore}+
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-3 sm:px-4 font-bricolage font-bold text-sm sm:text-base text-primary">
                      {lender.interestRate?.min ?? 9.99}% - {lender.interestRate?.max ?? 24}% p.a.
                    </td>

                    {/* Starting EMI / Lakh */}
                    <td className="py-4 px-3 sm:px-4 font-semibold text-emerald-800">
                      ₹{lender.startingEmiPerLakh} / Lakh
                    </td>

                    {/* Max Loan Limit */}
                    <td className="py-4 px-3 sm:px-4 font-bricolage font-bold text-gray-900">
                      {lender.maxAmount}
                    </td>

                    {/* Disbursal Speed */}
                    <td className="py-4 px-3 sm:px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md text-xs border border-amber-200/60">
                        {lender.disbursalTime}
                      </span>
                    </td>

                    {/* Processing Fee */}
                    <td className="py-4 px-3 sm:px-4 text-xs text-gray-600 leading-relaxed">
                      {lender.processingFee}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelect(lender)}
                          className="text-xs font-semibold text-gray-500 hover:text-primary p-2 transition-colors cursor-pointer hidden lg:inline-block"
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

            {/* Mobile View (Cards for mobile - no horizontal scroll) */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedLenders.map((lender) => (
                <div
                  key={lender.id}
                  className="p-4 hover:bg-gray-50/80 transition-colors cursor-pointer"
                  onClick={() => handleSelect(lender)}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
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
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bricolage font-bold text-sm text-gray-900 leading-snug">
                            {lender.name}
                          </span>
                          {lender.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                              {lender.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 block uppercase font-semibold">
                          {lender.bankType || "Bank"} • Min CIBIL {lender.minCreditScore}+
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50/80 p-3 rounded-xl mb-3">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-medium">Interest Rate</span>
                      <span className="font-bricolage font-bold text-primary text-sm">
                        {lender.interestRate?.min ?? 9.99}% - {lender.interestRate?.max ?? 24}% p.a.
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-medium">Starting EMI</span>
                      <span className="font-semibold text-emerald-800 text-sm">
                        ₹{lender.startingEmiPerLakh} / Lakh
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-medium">Max Loan</span>
                      <span className="font-bricolage font-bold text-gray-900 text-sm">
                        {lender.maxAmount}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-medium">Disbursal</span>
                      <span className="font-bold text-amber-900 text-xs">
                        {lender.disbursalTime}
                      </span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-gray-200/60">
                      <span className="text-[10px] text-gray-500 uppercase block font-medium">Processing Fee</span>
                      <span className="text-xs text-gray-700">
                        {lender.processingFee}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleSelect(lender)}
                      className="flex-1 text-xs font-semibold text-gray-600 bg-white border border-gray-200 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => openApplyModal(lender.name, lender.tagline)}
                      className="flex-1 bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-montserrat">
              <span className="text-gray-500 font-medium">
                Showing <strong className="text-gray-900 font-bold">{startIndex + 1}</strong>–<strong className="text-gray-900 font-bold">{endIndex}</strong> of <strong className="text-gray-900 font-bold">{totalItems}</strong> lenders
              </span>

              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-2xs"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === safeCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-white shadow-xs scale-105"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-2xs"
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-2xs"
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

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
