"use client";

import React from "react";
import {
  Scale,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function LoanAgainstPropertyVsOthers() {
  const { openApplyModal } = useApplyModal();

  const comparisonRows = [
    {
      feature: "Interest Rate Range",
      lap: "8.75% – 10.50% p.a.",
      lapHighlight: true,
      personalLoan: "10.50% – 18.00% p.a.",
      topUp: "8.25% – 9.50% p.a.",
      businessLoan: "13.00% – 22.00% p.a.",
    },
    {
      feature: "Maximum Loan Amount",
      lap: "Up to ₹25+ Crore (75% LTV)",
      lapHighlight: true,
      personalLoan: "Up to ₹40 – ₹50 Lakhs",
      topUp: "Up to ₹50 Lakhs – ₹1 Crore",
      businessLoan: "Up to ₹50 Lakhs – ₹75 Lakhs",
    },
    {
      feature: "Maximum Loan Tenure",
      lap: "Up to 15 – 20 Years",
      lapHighlight: true,
      personalLoan: "Up to 5 – 7 Years",
      topUp: "Capped to remaining HL tenure",
      businessLoan: "Up to 3 – 5 Years",
    },
    {
      feature: "Monthly EMI Burden (₹50 Lakhs)",
      lap: "₹45,518 / mo (15 yrs @ 9%)",
      lapHighlight: true,
      personalLoan: "₹1,07,470 / mo (5 yrs @ 11%)",
      topUp: "₹43,500 / mo (15 yrs @ 8.5%)",
      businessLoan: "₹1,13,800 / mo (5 yrs @ 13.5%)",
    },
    {
      feature: "Collateral / Security",
      lap: "Residential / Commercial Property",
      lapHighlight: false,
      personalLoan: "None (100% Unsecured)",
      topUp: "Existing Mortgaged Home",
      businessLoan: "None (Unsecured)",
    },
    {
      feature: "End-Use Freedom",
      lap: "100% Flexible (Business or Personal)",
      lapHighlight: true,
      personalLoan: "100% Flexible",
      topUp: "Renovation or Personal",
      businessLoan: "Business Operations Only",
    },
    {
      feature: "Income Tax Benefits",
      lap: "Full deduction under Sec 37(1) for business",
      lapHighlight: true,
      personalLoan: "No tax deduction",
      topUp: "Up to ₹2L under Sec 24(b) if used for repair",
      businessLoan: "Interest deductible for business",
    },
    {
      feature: "Overdraft Facility (OD)",
      lap: "Yes (Available at top banks)",
      lapHighlight: true,
      personalLoan: "Rarely Available",
      topUp: "Available at select banks",
      businessLoan: "Overdraft with high interest",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Scale className="w-3.5 h-3.5 text-gold" />
            Financing Options Compared
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Loan Against Property vs <span className="text-primary">Personal & Business Loans</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Why mortgaging an existing property saves over 50% in interest outflows and cuts monthly EMI stress by more than half compared to unsecured borrowing.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200 text-gray-600 font-bold uppercase text-[11px]">
                  <th className="py-4 px-4 sm:px-6 w-1/4">Key Parameters</th>
                  <th className="py-4 px-4 bg-primary/10 text-primary border-x border-primary/20 w-1/4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bricolage font-extrabold text-sm sm:text-base text-primary">
                        Loan Against Property (LAP)
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        Lowest Interest & Multi-Crore
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-4 w-1/6 text-center">Personal Loan</th>
                  <th className="py-4 px-4 w-1/6 text-center">Home Loan Top-Up</th>
                  <th className="py-4 px-4 w-1/6 text-center">Unsecured Business Loan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-gray-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-white/40">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-primary bg-primary/5 border-x border-primary/20">
                      <div className="inline-flex items-center gap-1.5 justify-center">
                        {row.lapHighlight && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                        <span>{row.lap}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-600">
                      {row.personalLoan}
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-600">
                      {row.topUp}
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-600">
                      {row.businessLoan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Callout */}
          <div className="p-4 sm:p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Conclusion:</strong> For funding requirements above ₹25 Lakhs, Loan Against Property delivers maximum savings, lowest monthly cash drain, and massive tax write-offs.
              </span>
            </div>

            <button
              type="button"
              onClick={() => openApplyModal("Loan Against Property", "Interest Savings Evaluation")}
              className="w-full sm:w-auto bg-primary hover:bg-[#023337] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Explore Lowest LAP Rates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
