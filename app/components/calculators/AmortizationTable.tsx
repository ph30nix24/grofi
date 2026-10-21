"use client";

import React from "react";
import { Calendar, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import { AmortizationYear, formatINR } from "@/libs/calculators/emi";

interface AmortizationTableProps {
  tenureYears: number;
  totalPayment: number;
  yearlyBreakdown: AmortizationYear[];
}

export default function AmortizationTable({
  tenureYears,
  totalPayment,
  yearlyBreakdown,
}: AmortizationTableProps) {
  const totalPrincipal = yearlyBreakdown.reduce((sum, row) => sum + row.principalPaid, 0);
  const totalInterest = yearlyBreakdown.reduce((sum, row) => sum + row.interestPaid, 0);

  return (
    <div className="mt-8 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-8 shadow-xl border border-gray-150 animate-fadeIn max-w-full overflow-hidden">
      {/* ── Table Header & Legend ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-gray-100 gap-3 sm:gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>Repayment Schedule</span>
          </div>
          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 flex items-center gap-2">
            Yearly Amortization Schedule
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-0.5">
            Clear yearly trajectory of how each payment reduces principal vs interest across your {tenureYears}-year tenure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="bg-[#FAF8F2] border border-primary/20 rounded-xl px-3.5 py-1.5 flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Principal</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-gold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Interest</span>
            </div>
          </div>

          <span className="text-xs font-bold bg-primary text-white px-3.5 py-1.5 rounded-xl font-montserrat shadow-xs whitespace-nowrap">
            Total: ₹{formatINR(totalPayment)}
          </span>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex items-center justify-between sm:hidden text-[11px] text-gray-500 font-montserrat mb-2.5 px-1">
        <span>Detailed breakdown per year</span>
        <span className="font-semibold text-primary inline-flex items-center gap-1">
          <span>Swipe table</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>

      {/* ── Table Container ────────────────────────────────────────── */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200/80 shadow-2xs">
        <table className="w-full min-w-[620px] text-left text-xs sm:text-sm font-montserrat">
          <thead>
            <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Year</th>
              <th className="py-3.5 px-4">Principal Paid</th>
              <th className="py-3.5 px-4">Interest Paid</th>
              <th className="py-3.5 px-4">Yearly Split</th>
              <th className="py-3.5 px-4">Total Paid in Year</th>
              <th className="py-3.5 px-4">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {yearlyBreakdown.map((row) => {
              const yearTotal = row.principalPaid + row.interestPaid;
              const principalRatio = yearTotal > 0 ? (row.principalPaid / yearTotal) * 100 : 50;

              return (
                <tr key={row.year} className="hover:bg-primary/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2 whitespace-nowrap">
                    <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-extrabold flex items-center justify-center shrink-0">
                      {row.year}
                    </span>
                    <span>Year {row.year}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700 font-bricolage text-sm sm:text-base whitespace-nowrap">
                    ₹ {formatINR(row.principalPaid)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-amber-800 font-bricolage text-sm sm:text-base whitespace-nowrap">
                    ₹ {formatINR(row.interestPaid)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="w-24 h-2 bg-amber-100 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${principalRatio}%` }}
                        className="h-full bg-emerald-500 rounded-l-full"
                        title={`Principal: ${principalRatio.toFixed(0)}%`}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-primary font-bricolage text-sm sm:text-base whitespace-nowrap">
                    ₹ {formatINR(yearTotal)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-500 font-bricolage text-sm sm:text-base whitespace-nowrap">
                    ₹ {formatINR(row.balance)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#F8FAF8] border-t-2 border-primary/20 font-bold text-gray-900">
              <td className="py-4 px-4 font-bricolage text-sm sm:text-base">
                Total ({tenureYears} Years)
              </td>
              <td className="py-4 px-4 font-bricolage text-sm sm:text-base text-emerald-700">
                ₹ {formatINR(totalPrincipal)}
              </td>
              <td className="py-4 px-4 font-bricolage text-sm sm:text-base text-amber-800">
                ₹ {formatINR(totalInterest)}
              </td>
              <td className="py-4 px-4">
                <div className="w-24 h-2 bg-amber-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(totalPrincipal / totalPayment) * 100}%` }}
                    className="h-full bg-emerald-500 rounded-l-full"
                  />
                </div>
              </td>
              <td className="py-4 px-4 font-bricolage text-sm sm:text-base text-primary font-extrabold">
                ₹ {formatINR(totalPayment)}
              </td>
              <td className="py-4 px-4 text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fully Amortized</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
