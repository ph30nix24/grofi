"use client";

import React from "react";
import {
  Zap,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferLoanTopUpOverdraftProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanTopUpOverdraft({
  lender,
}: BalanceTransferLoanTopUpOverdraftProps) {
  const { openApplyModal } = useApplyModal();
  const minRate = lender.interestRate?.min ?? 7.25;

  return (
    <section
      id="topup-overdraft"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Zap className="w-3.5 h-3.5 text-gold" />
          <span>LIQUIDITY &amp; SAVINGS MAXIMIZERS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Top-Up Loan &amp; Overdraft Facilities with <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Unlock significant cash liquidity for renovation, business, or education at housing loan interest rates, or choose an overdraft account to offset interest daily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-10">
        {/* Top-Up Loan Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bricolage font-bold text-lg text-gray-900">
                    High-Value Top-Up Loan
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium">
                    Sanctioned alongside your balance transfer
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {lender.topUpAvailable ? "AVAILABLE" : "ON REQUEST"}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Max Top-Up Limit:</span>
                <span className="font-bricolage font-bold text-base text-primary">
                  {lender.maxTopUpAmount}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Interest Rate:</span>
                <span className="font-bold text-gray-900">
                  Starts at {minRate}% p.a. (Same / near base home loan rate)
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Max LTV Funding:</span>
                <span className="font-bold text-gray-900">{lender.maxLtv}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Tenure:</span>
                <span className="font-bold text-gray-900">
                  Up to {lender.tenureYears} Years (Matches home loan balance)
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">End-Use Freedom:</span>
                <span className="font-bold text-emerald-700">
                  Home Renovation, Business, Education, Wedding (Multi-purpose)
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                `${lender.name} Top-Up Loan`,
                `Balance Transfer with Top-Up up to ${lender.maxTopUpAmount}`
              )
            }
            className="w-full bg-[#EBF4ED] hover:bg-primary hover:text-white text-primary font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply for Transfer + Top-Up</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Overdraft Facility Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bricolage font-bold text-lg text-gray-900">
                    Home Loan Overdraft Scheme
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium">
                    Interest saver operative account
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  lender.overdraftScheme
                    ? "text-purple-800 bg-purple-50 border-purple-200"
                    : "text-gray-600 bg-gray-50 border-gray-200"
                }`}
              >
                {lender.overdraftScheme ? "ENABLED" : "STANDARD TERM"}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Scheme Name:</span>
                <span className="font-bold text-gray-900">
                  {lender.overdraftScheme || "Standard Term Takeover"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">How It Works:</span>
                <span className="font-medium text-gray-900 text-right max-w-[240px]">
                  Park surplus salary/cash in linked account; interest calculated on net balance
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Liquidity Access:</span>
                <span className="font-bold text-purple-700">
                  100% Instant withdrawal via ATM, UPI &amp; NetBanking
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Interest Calculation:</span>
                <span className="font-bold text-gray-900">
                  Daily reducing balance offset
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">Pre-closure Lock:</span>
                <span className="font-bold text-emerald-700">
                  0% penalty to withdraw or deposit
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                `${lender.name} Overdraft Takeover`,
                `Transfer to ${lender.overdraftScheme || "Home Loan Overdraft"} at ${minRate}% p.a.`
              )
            }
            className="w-full bg-[#EBF4ED] hover:bg-primary hover:text-white text-primary font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Check Overdraft Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Comparison Matrix: Top-Up Loan vs Separate Personal Loan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm overflow-hidden">
        <div className="mb-4">
          <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
            Why Take a Top-Up at Balance Transfer Instead of a Personal Loan?
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            See the dramatic cost savings when availing ₹25 Lakhs through {lender.name} Top-Up vs an unsecured loan.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70">
                <th className="py-3 px-4 font-bold text-gray-700 uppercase">Feature</th>
                <th className="py-3 px-4 font-bold text-primary uppercase bg-primary/5">
                  {lender.name} Top-Up
                </th>
                <th className="py-3 px-4 font-bold text-gray-500 uppercase">
                  Standard Personal Loan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-900">Interest Rate</td>
                <td className="py-3 px-4 font-bold text-primary bg-primary/5">
                  {minRate}% – 8.75% p.a.
                </td>
                <td className="py-3 px-4 text-red-600 font-semibold">12.50% – 18.00% p.a.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-900">Tenure Range</td>
                <td className="py-3 px-4 font-bold text-primary bg-primary/5">
                  Up to {lender.tenureYears} Years
                </td>
                <td className="py-3 px-4">Up to 5 Years (60 Months)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-900">Monthly EMI (₹25 Lakhs)</td>
                <td className="py-3 px-4 font-bold text-emerald-700 bg-primary/5">
                  ~₹19,750 / mo (at 20 yrs)
                </td>
                <td className="py-3 px-4 text-red-700 font-bold">
                  ~₹56,250 / mo (at 5 yrs)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-900">Tax Benefits</td>
                <td className="py-3 px-4 font-bold text-primary bg-primary/5">
                  Deductible under Sec 24(b) if used for home improvement
                </td>
                <td className="py-3 px-4 text-gray-500">Nil (No tax deduction)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-900">Mortgage Charges</td>
                <td className="py-3 px-4 font-bold text-primary bg-primary/5">
                  ₹0 additional (Same underlying title deeds)
                </td>
                <td className="py-3 px-4 text-gray-500">N/A (Unsecured)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
