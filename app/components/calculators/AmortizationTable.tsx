"use client";

import React from "react";
import { Calendar } from "lucide-react";
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
  return (
    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-150 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2 mb-6">
        <div>
          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Yearly Amortization Schedule
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-1">
            Complete breakdown of principal vs interest paid across your {tenureYears} year tenure.
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20 font-montserrat">
          Total Repayment: ₹{formatINR(totalPayment)}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm font-montserrat">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200/80 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 rounded-l-xl">Year</th>
              <th className="py-3 px-4">Principal Paid</th>
              <th className="py-3 px-4">Interest Paid</th>
              <th className="py-3 px-4">Total Paid in Year</th>
              <th className="py-3 px-4 rounded-r-xl">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {yearlyBreakdown.map((row) => (
              <tr key={row.year} className="hover:bg-primary/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center">
                    {row.year}
                  </span>
                  Year {row.year}
                </td>
                <td className="py-3.5 px-4 font-semibold text-emerald-700 font-bricolage text-base">
                  ₹ {formatINR(row.principalPaid)}
                </td>
                <td className="py-3.5 px-4 font-semibold text-amber-800 font-bricolage text-base">
                  ₹ {formatINR(row.interestPaid)}
                </td>
                <td className="py-3.5 px-4 font-bold text-primary font-bricolage text-base">
                  ₹ {formatINR(row.principalPaid + row.interestPaid)}
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-500 font-bricolage text-base">
                  ₹ {formatINR(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
