"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Scale,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { BusinessLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenders: BusinessLoanLender[];
}

export default function BusinessLoanCompareModal({
  isOpen,
  onClose,
  lenders,
}: BusinessLoanCompareModalProps) {
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
                Side-by-Side Business Loan Comparison
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Comparing {lenders.length} lenders across interest rates, turnover criteria, collateral & features
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
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap justify-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                            {lender.bankType}
                          </span>
                          {lender.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              {lender.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {/* Interest Rate */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Interest Rate Range</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center font-bricolage font-extrabold text-primary text-sm sm:text-base">
                      {lender.interestRate?.text || `${lender.interestRate?.min}% - ${lender.interestRate?.max}% p.a.`}
                    </td>
                  ))}
                </tr>

                {/* Starting EMI */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Starting EMI / Lakh</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center font-bold text-emerald-800">
                      ₹{lender.startingEmiPerLakh} / Lakh
                    </td>
                  ))}
                </tr>

                {/* Max Sanction Quantum */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Maximum Sanction Limit</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center font-bricolage font-bold text-gray-900">
                      {lender.maxAmount}
                    </td>
                  ))}
                </tr>

                {/* Collateral Requirement */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Collateral Requirement</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {lender.collateralType}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Min Annual Turnover */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Min Annual Turnover</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center font-semibold text-gray-800">
                      {lender.minTurnover}
                    </td>
                  ))}
                </tr>

                {/* Min Business Vintage */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Min Business Vintage</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center text-gray-700">
                      {lender.minVintage}
                    </td>
                  ))}
                </tr>

                {/* Min CIBIL Score */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Min CIBIL / CMR Score</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center font-bold text-gray-900">
                      {lender.minCibilScore}+
                    </td>
                  ))}
                </tr>

                {/* Processing Fee */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Processing Fee</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center text-gray-600">
                      {lender.processingFee}
                    </td>
                  ))}
                </tr>

                {/* Disbursal Speed */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Disbursal Turnaround</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center font-bold text-amber-800">
                      {lender.disbursalTime}
                    </td>
                  ))}
                </tr>

                {/* Foreclosure Charges */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Foreclosure Terms</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center text-[11px] text-gray-500">
                      {lender.foreclosureCharges}
                    </td>
                  ))}
                </tr>

                {/* Best Suited For */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40">Recommended For</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 text-center text-xs text-gray-600 italic">
                      {lender.recommendedFor}
                    </td>
                  ))}
                </tr>

                {/* Key Features */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-500 bg-gray-50/40 align-top">Highlights</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3 px-4 align-top">
                      <ul className="space-y-1.5 text-xs text-gray-600">
                        {lender.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Action Buttons */}
                <tr className="bg-gray-50/50">
                  <td className="py-4 px-3 font-bold text-gray-500">Direct Application</td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-4 px-4 text-center">
                      <button
                        onClick={() => {
                          onClose();
                          openApplyModal(lender.name, lender.tagline);
                        }}
                        className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All partner loans adhere to RBI Micro & Small Enterprises lending guidelines.</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold px-4 py-2 rounded-xl bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
