"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  CheckCircle2,
  ArrowRight,
  Search,
} from "lucide-react";
import { BalanceTransferLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferComparisonTableProps {
  lenders: BalanceTransferLender[];
}

export default function BalanceTransferComparisonTable({
  lenders,
}: BalanceTransferComparisonTableProps) {
  const { openApplyModal } = useApplyModal();
  const [filterType, setFilterType] = useState<string>("all");
  const [tableSearch, setTableSearch] = useState<string>("");

  const filteredLenders = lenders.filter((l) => {
    if (filterType !== "all") {
      if (l.bankType.toLowerCase() !== filterType.toLowerCase()) return false;
    }
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase().trim();
      return (
        l.name.toLowerCase().includes(q) ||
        (l.overdraftScheme || "").toLowerCase().includes(q) ||
        l.maxTopUpAmount.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-200/70 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold mb-3">
              <Table className="w-3.5 h-3.5 text-gold" />
              <span>2026 Balance Transfer Matrix</span>
            </div>
            <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
              Compare All {lenders.length} Balance Transfer Lenders
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl">
              Side-by-side overview of interest rates, statutory processing fee caps, turnaround timelines, and overdraft eligibility.
            </p>
          </div>

          {/* Quick Filters in Table */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter table..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterType("all")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === "all" ? "bg-white text-primary shadow-xs font-bold" : "text-gray-600"
                }`}
              >
                All ({lenders.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType("psu")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === "psu" ? "bg-white text-primary shadow-xs font-bold" : "text-gray-600"
                }`}
              >
                PSU
              </button>
              <button
                type="button"
                onClick={() => setFilterType("private")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === "private" ? "bg-white text-primary shadow-xs font-bold" : "text-gray-600"
                }`}
              >
                Private
              </button>
              <button
                type="button"
                onClick={() => setFilterType("hfc")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === "hfc" ? "bg-white text-primary shadow-xs font-bold" : "text-gray-600"
                }`}
              >
                HFCs
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 min-w-[220px]">Bank / Lender</th>
                  <th className="py-4 px-3 min-w-[130px]">Interest Rate</th>
                  <th className="py-4 px-3 min-w-[120px]">20-Yr EMI / L</th>
                  <th className="py-4 px-4 min-w-[180px]">Processing Fee & Cap</th>
                  <th className="py-4 px-3 min-w-[140px]">Max Top-Up</th>
                  <th className="py-4 px-3 min-w-[120px]">Turnaround</th>
                  <th className="py-4 px-3 min-w-[130px]">Overdraft OD</th>
                  <th className="py-4 px-4 text-center min-w-[130px]">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredLenders.map((lender) => (
                  <tr
                    key={lender.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Bank Name & Logo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center shrink-0">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={36}
                            height={36}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="font-bricolage font-bold text-gray-900 block leading-tight">
                            {lender.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-bold uppercase text-gray-400">
                              {lender.bankType.toUpperCase()}
                            </span>
                            {lender.badge && (
                              <span className="text-[10px] font-semibold text-emerald-700">
                                • {lender.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Interest Rate */}
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-primary font-bricolage text-sm block">
                        {lender.interestRate.min}% <span className="text-[11px] font-semibold text-gray-500">p.a.</span>
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Up to {lender.interestRate.max}%
                      </span>
                    </td>

                    {/* EMI / Lakh */}
                    <td className="py-3.5 px-3 font-bold text-gray-900 font-mono">
                      ₹{lender.startingEmiPerLakh20Yr}
                    </td>

                    {/* Processing Fee */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs text-gray-800 line-clamp-1" title={lender.processingFee}>
                        {lender.processingFee}
                      </div>
                      {lender.processingFeeCap && (
                        <div className="text-[10px] font-bold text-emerald-700 mt-0.5">
                          {lender.processingFeeCap}
                        </div>
                      )}
                    </td>

                    {/* Top-Up */}
                    <td className="py-3.5 px-3 font-semibold text-gray-900">
                      {lender.maxTopUpAmount}
                    </td>

                    {/* Turnaround */}
                    <td className="py-3.5 px-3 text-xs text-gray-700">
                      {lender.turnaroundTime}
                    </td>

                    {/* Overdraft */}
                    <td className="py-3.5 px-3">
                      {lender.overdraftScheme ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Standard</span>
                      )}
                    </td>

                    {/* Apply Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          openApplyModal(
                            lender.name,
                            `Home Loan Balance Transfer starting at ${lender.interestRate.min}% p.a.`
                          )
                        }
                        className="bg-primary hover:bg-[#035259] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
