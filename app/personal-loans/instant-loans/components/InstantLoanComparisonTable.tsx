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
  X,
  Star,
} from "lucide-react";
import { InstantLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import InstantLoanDetailModal from "./InstantLoanDetailModal";

interface InstantLoanComparisonTableProps {
  lenders: InstantLoanLender[];
}

export default function InstantLoanComparisonTable({
  lenders,
}: InstantLoanComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [selectedLender, setSelectedLender] = useState<InstantLoanLender | null>(null);
  const [tableSearch, setTableSearch] = useState("");

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredLenders = useMemo(() => {
    if (!tableSearch.trim()) return lenders;
    const q = tableSearch.toLowerCase().trim();
    return lenders.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.disbursalTime.toLowerCase().includes(q) ||
        l.lenderType.toLowerCase().includes(q) ||
        l.maxAmount.toLowerCase().includes(q)
    );
  }, [lenders, tableSearch]);

  const totalItems = filteredLenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = filteredLenders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("rate-matrix-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const getSpeedPill = (speedCat: string, time: string) => {
    switch (speedCat) {
      case "under-10-seconds":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "under-15-mins":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "under-2-hours":
        return "bg-blue-100 text-blue-900 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <section id="rate-matrix-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
              <TrendingDown className="w-3.5 h-3.5 text-gold" />
              2026 Instant Rate & Speed Matrix
            </div>
            <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
              Compare Instant Loan <span className="text-primary">Rates, Turnaround & Limits</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl">
              Complete transparency across all 16 featured partner institutions with starting rates, fees, and digital KYC mode.
            </p>
          </div>

          {/* Quick Table Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search table..."
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary shadow-2xs"
            />
            {tableSearch && (
              <button
                onClick={() => setTableSearch("")}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-5">Lender Name</th>
                  <th className="py-4 px-4">Disbursal Speed</th>
                  <th className="py-4 px-4">Interest Rate</th>
                  <th className="py-4 px-4">Starting EMI / L</th>
                  <th className="py-4 px-4">Max Sanction</th>
                  <th className="py-4 px-4">Min CIBIL</th>
                  <th className="py-4 px-4">Processing Fee</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLenders.map((lender) => (
                  <tr
                    key={lender.id}
                    className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLender(lender)}
                  >
                    {/* Lender & Logo */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={34}
                            height={34}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bricolage font-bold text-sm text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                            <span>{lender.name}</span>
                            {lender.badge && (
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border hidden sm:inline-block ${lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"}`}>
                                {lender.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-500 block truncate max-w-[160px]">
                            {lender.tagline}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Disbursal Speed */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getSpeedPill(lender.disbursalSpeedCategory, lender.disbursalTime)}`}>
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>{lender.disbursalTime}</span>
                      </span>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-emerald-700 block">
                        {lender.interestRate.text}
                      </span>
                      <span className="text-[10px] text-gray-400">Reducing p.a.</span>
                    </td>

                    {/* Starting EMI / Lakh */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900 block">
                        ₹{lender.startingEmiPerLakh.toLocaleString("en-IN")}/mo
                      </span>
                      <span className="text-[10px] text-gray-400">per ₹1 Lakh</span>
                    </td>

                    {/* Max Sanction */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary block">
                        {lender.maxAmount}
                      </span>
                      <span className="text-[10px] text-gray-400">From {lender.minAmount}</span>
                    </td>

                    {/* Min CIBIL */}
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${lender.minCreditScore <= 650 ? "text-amber-700" : "text-gray-800"}`}>
                        {lender.minCreditScore}+
                      </span>
                      <span className="text-[10px] text-gray-400 block truncate max-w-[100px]">
                        {lender.documentation}
                      </span>
                    </td>

                    {/* Processing Fee */}
                    <td className="py-4 px-4 text-gray-600 text-[11px] max-w-[160px] truncate" title={lender.processingFee}>
                      {lender.processingFee}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openApplyModal(lender.name, `Instant loan with ${lender.disbursalTime} disbursal`)}
                        className="bg-primary hover:bg-[#02383d] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3 text-gold" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-gray-500">
              Showing {startIndex + 1} to {endIndex} of {totalItems} lenders
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(Math.max(1, safeCurrentPage - 1))}
                  disabled={safeCurrentPage === 1}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`w-7 h-7 rounded-lg font-bold transition-all cursor-pointer ${
                      safeCurrentPage === idx + 1
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, safeCurrentPage + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <InstantLoanDetailModal
        lender={selectedLender}
        onClose={() => setSelectedLender(null)}
      />
    </section>
  );
}
