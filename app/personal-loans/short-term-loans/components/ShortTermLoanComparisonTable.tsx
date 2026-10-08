"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Search,
  Calendar,
  Building2,
  FileCheck,
} from "lucide-react";
import { ShortTermLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import ShortTermLoanDetailModal from "./ShortTermLoanDetailModal";

interface ShortTermLoanComparisonTableProps {
  lenders: ShortTermLoanLender[];
}

export default function ShortTermLoanComparisonTable({
  lenders,
}: ShortTermLoanComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [selectedLender, setSelectedLender] = useState<ShortTermLoanLender | null>(null);
  const [tableSearch, setTableSearch] = useState("");
  const [lenderTypeFilter, setLenderTypeFilter] = useState("all");

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredLenders = useMemo(() => {
    return lenders.filter((l) => {
      if (lenderTypeFilter !== "all" && l.lenderType.toLowerCase() !== lenderTypeFilter.toLowerCase()) {
        return false;
      }
      if (!tableSearch.trim()) return true;
      const q = tableSearch.toLowerCase().trim();
      return (
        l.name.toLowerCase().includes(q) ||
        l.disbursalTime.toLowerCase().includes(q) ||
        l.rbiRegulatedEntity.toLowerCase().includes(q) ||
        l.maxAmount.toLowerCase().includes(q) ||
        l.shortTenureOptions?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [lenders, tableSearch, lenderTypeFilter]);

  const totalItems = filteredLenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = filteredLenders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("short-term-comparison-table-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  return (
    <section
      id="short-term-comparison-table-section"
      className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
              <TrendingDown className="w-3.5 h-3.5 text-gold" />
              Comprehensive Market Matrix
            </div>
            <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
              Compare Short-Term Loan <span className="text-primary">Rates, Tenures & Disbursals</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl">
              Side-by-side transparency across all {lenders.length} featured institutions with starting rates, fees, short tenure options, and cooling-off protection.
            </p>
          </div>

          {/* Quick Table Search & Type Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search matrix..."
                value={tableSearch}
                onChange={(e) => {
                  setTableSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary font-medium"
              />
            </div>

            <select
              value={lenderTypeFilter}
              onChange={(e) => {
                setLenderTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-white border border-gray-200 rounded-xl px-2.5 py-2 text-gray-700 font-semibold focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="bank">Banks</option>
              <option value="nbfc">NBFCs</option>
              <option value="fintech">Fintechs</option>
            </select>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[860px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-5">Lender & RBI Entity</th>
                  <th className="py-4 px-4">Interest Rate (APR)</th>
                  <th className="py-4 px-4">EMI / ₹1 Lakh</th>
                  <th className="py-4 px-4">Loan Limits</th>
                  <th className="py-4 px-4">Short Tenures</th>
                  <th className="py-4 px-4">Disbursal Time</th>
                  <th className="py-4 px-4">Cooling-Off</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {paginatedLenders.map((lender) => (
                  <tr
                    key={lender.id}
                    className="hover:bg-amber-50/20 transition-colors group"
                  >
                    {/* Lender & RBI Entity */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 p-1 flex items-center justify-center shrink-0">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={32}
                            height={32}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="font-bricolage font-bold text-gray-900 group-hover:text-primary transition-colors block leading-tight">
                            {lender.name}
                          </span>
                          <span className="text-[10px] text-gray-500 line-clamp-1">
                            {lender.rbiRegulatedEntity}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary block">
                        {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                      </span>
                      {lender.interestRate?.monthlyRateText && (
                        <span className="text-[10px] text-amber-700 font-semibold block">
                          {lender.interestRate.monthlyRateText}
                        </span>
                      )}
                    </td>

                    {/* EMI / Lakh */}
                    <td className="py-4 px-4 font-bold text-gray-900">
                      ₹{formatINR(lender.startingEmiPerLakh)}/mo
                    </td>

                    {/* Loan Limits */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900 block">
                        {lender.minAmount} - {lender.maxAmount}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Fee: {lender.processingFee}
                      </span>
                    </td>

                    {/* Short Tenures */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {lender.shortTenureOptions?.slice(0, 3).map((opt) => (
                          <span
                            key={opt}
                            className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold"
                          >
                            {opt}
                          </span>
                        )) || (
                          <span className="text-gray-600">{lender.tenure}</span>
                        )}
                        {(lender.shortTenureOptions?.length || 0) > 3 && (
                          <span className="text-[10px] text-gray-400 self-center">
                            +{(lender.shortTenureOptions?.length || 0) - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Disbursal Time */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                        <Zap className="w-3 h-3 text-gold" />
                        {lender.disbursalTime}
                      </span>
                    </td>

                    {/* Cooling-Off Period */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        <FileCheck className="w-3 h-3 text-blue-600" />
                        {lender.coolingOffPeriod}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLender(lender)}
                          className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Details
                        </button>

                        <button
                          onClick={() =>
                            openApplyModal(
                              lender.name,
                              `Short-Term Loan application for ${lender.name}`
                            )
                          }
                          className="bg-primary hover:bg-[#02383d] text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3 text-gold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
            <span>
              Showing {startIndex + 1} to {endIndex} of {totalItems} lending institutions
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40 cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="px-2 font-bold text-gray-800">
                  Page {safeCurrentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40 cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal for Details */}
        <ShortTermLoanDetailModal
          lender={selectedLender}
          onClose={() => setSelectedLender(null)}
        />
      </div>
    </section>
  );
}
