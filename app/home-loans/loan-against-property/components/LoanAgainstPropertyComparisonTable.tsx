"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import LoanAgainstPropertyDetailModal from "./LoanAgainstPropertyDetailModal";

interface LoanAgainstPropertyComparisonTableProps {
  lenders: LoanAgainstPropertyLender[];
  onSelectLender?: (lender: LoanAgainstPropertyLender) => void;
}

export default function LoanAgainstPropertyComparisonTable({
  lenders,
  onSelectLender,
}: LoanAgainstPropertyComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [internalSelectedLender, setInternalSelectedLender] = useState<LoanAgainstPropertyLender | null>(null);

  // Pagination state (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = lenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = lenders.slice(startIndex, endIndex);

  const handleSelect = (lender: LoanAgainstPropertyLender) => {
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
            2026 Mortgage Rates Matrix
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Compare Top Loan Against Property <span className="text-primary">Rates, EMIs & LTV</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Compare verified interest rate bands, starting monthly EMIs per lakh, maximum property valuation funding (LTV), and overdraft schemes across all 10 lenders.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
          <div className="w-full">
            {/* Desktop Table View */}
            <table className="hidden md:table w-full text-left text-xs sm:text-sm font-montserrat border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6 w-[24%]">Bank / Institution</th>
                  <th className="py-4 px-3 sm:px-4 w-[14%]">Interest Rate</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">EMI / Lakh (15Y)</th>
                  <th className="py-4 px-3 sm:px-4 w-[13%]">EMI / Lakh (20Y)</th>
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
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                            {lender.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-gray-400 font-semibold uppercase">
                              {lender.bankType}
                            </span>
                            {lender.badge && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold truncate max-w-[120px]">
                                {lender.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-3 sm:px-4">
                      <div className="font-bricolage font-bold text-gray-900 text-sm sm:text-base">
                        {lender.interestRate?.min ?? 9.0}%
                      </div>
                      <div className="text-[10px] text-gray-500 line-clamp-1">
                        {lender.interestRate?.text}
                      </div>
                    </td>

                    {/* EMI / Lakh (15Y) */}
                    <td className="py-4 px-3 sm:px-4">
                      <div className="font-bold text-primary">
                        ₹{lender.startingEmiPerLakh15Yr}
                      </div>
                      <span className="text-[10px] text-gray-400">/ lakh / month</span>
                    </td>

                    {/* EMI / Lakh (20Y) */}
                    <td className="py-4 px-3 sm:px-4">
                      <div className="font-bold text-gray-800">
                        ₹{lender.startingEmiPerLakh20Yr}
                      </div>
                      <span className="text-[10px] text-gray-400">/ lakh / month</span>
                    </td>

                    {/* Max LTV */}
                    <td className="py-4 px-3 sm:px-4">
                      <div className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-xs">
                        Up to {lender.maxLtvPercent}%
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                        {lender.maxAmount}
                      </div>
                    </td>

                    {/* Overdraft Scheme */}
                    <td className="py-4 px-3 sm:px-4">
                      {lender.overdraftAvailable ? (
                        <div>
                          <div className="text-xs font-bold text-primary flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>OD Facility</span>
                          </div>
                          <div className="text-[10px] text-gray-500 line-clamp-1">
                            {lender.overdraftScheme || "Interest on daily balance"}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Term Loan Only</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openApplyModal(lender.name, "Loan Against Property");
                        }}
                        className="bg-primary hover:bg-[#023337] text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedLenders.map((lender) => (
                <div
                  key={lender.id}
                  className="p-4 space-y-3 cursor-pointer hover:bg-gray-50/80 transition-colors"
                  onClick={() => handleSelect(lender)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={36}
                          height={36}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm leading-tight">
                          {lender.name}
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">
                          {lender.bankType}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bricolage font-extrabold text-sm text-gray-900">
                        {lender.interestRate?.min}% p.a.
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        {lender.maxLtvPercent}% LTV
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">EMI / Lakh (15Y)</span>
                      <strong className="text-primary font-bold">₹{lender.startingEmiPerLakh15Yr} / mo</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Overdraft Scheme</span>
                      <span className="font-medium text-gray-800">
                        {lender.overdraftAvailable ? "OD Available" : "Term Loan"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openApplyModal(lender.name, "Loan Against Property");
                    }}
                    className="w-full bg-primary text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div>
              Showing <strong className="text-gray-900">{startIndex + 1}</strong> to{" "}
              <strong className="text-gray-900">{endIndex}</strong> of{" "}
              <strong className="text-gray-900">{totalItems}</strong> institutions
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  className="p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const p = idx + 1;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        safeCurrentPage === p
                          ? "bg-primary text-white shadow-2xs"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  className="p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Internal Details Modal if triggered from table */}
      <LoanAgainstPropertyDetailModal
        lender={internalSelectedLender}
        onClose={() => setInternalSelectedLender(null)}
      />
    </section>
  );
}
