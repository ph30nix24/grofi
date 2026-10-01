"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Scale,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PersonalLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface PersonalLoanCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenders: PersonalLoanLender[];
}

export default function PersonalLoanCompareModal({
  isOpen,
  onClose,
  lenders,
}: PersonalLoanCompareModalProps) {
  const { openApplyModal } = useApplyModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || lenders.length === 0) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-gray-50 via-white to-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center border border-primary/20">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                Side-by-Side Loan Comparison
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Comparing {lenders.length} lenders across interest rates, fees, eligibility & disbursal speeds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Comparison Body: Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-3 w-1/4 min-w-[140px] text-xs font-bold uppercase text-gray-400 bg-gray-50/50 rounded-l-xl">
                    Lender Profile
                  </th>
                  {lenders.map((lender) => (
                    <th key={lender.id} className="py-4 px-4 min-w-[200px] text-center align-top bg-white">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-24 relative flex items-center justify-center mb-2">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={96}
                            height={36}
                            className="max-h-9 max-w-full object-contain"
                          />
                        </div>
                        <h4 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                          {lender.name}
                        </h4>
                        {lender.badge && (
                          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            {lender.badge}
                          </span>
                        )}
                        <button
                          onClick={() => {
                            onClose();
                            openApplyModal(lender.name, lender.tagline);
                          }}
                          className="mt-3 w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2 px-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {/* Interest Rate */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Interest Rate (% p.a.)</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-bricolage font-bold text-base text-primary">
                      {lender.interestRate?.text || `${lender.interestRate?.min ?? 9.99}% - ${lender.interestRate?.max ?? 24}% p.a.`}
                    </td>
                  ))}
                </tr>

                {/* Starting EMI / Lakh */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Starting EMI / Lakh (5 Yrs)</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-semibold text-emerald-800">
                      ₹{lender.startingEmiPerLakh} / Lakh
                    </td>
                  ))}
                </tr>

                {/* Max Loan Limit */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Maximum Loan Limit</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-bold text-gray-900 font-bricolage text-base">
                      {lender.maxAmount}
                    </td>
                  ))}
                </tr>

                {/* Tenure */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Repayment Tenure</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-gray-700">
                      {lender.tenure}
                    </td>
                  ))}
                </tr>

                {/* Disbursal Speed */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Disbursal Turnaround</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded-md text-xs">
                        {lender.disbursalTime}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Processing Fee */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Processing Fee</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-gray-700 text-xs">
                      {lender.processingFee}
                    </td>
                  ))}
                </tr>

                {/* Min CIBIL Score */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Min CIBIL Score</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-semibold text-gray-800">
                      {lender.minCreditScore}+
                    </td>
                  ))}
                </tr>

                {/* Min Monthly Salary */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Min Monthly Income</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-gray-700 text-xs">
                      {lender.minIncome}
                    </td>
                  ))}
                </tr>

                {/* Prepayment & Foreclosure */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Prepayment / Foreclosure</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs text-gray-600">
                      {lender.foreclosureCharges || "Standard bank foreclosure norms apply"}
                    </td>
                  ))}
                </tr>

                {/* Lock-In Period */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Lock-in Period</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs font-semibold text-gray-700">
                      {lender.lockInPeriod || "6 Months"}
                    </td>
                  ))}
                </tr>

                {/* Best For */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-3 font-bold text-gray-700 bg-gray-50/40">Recommended For</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs text-gray-700">
                      {lender.recommendedFor}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All offers subject to bank verification. 100% free eligibility check.</span>
          </p>
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-700 hover:text-gray-900 px-4 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
