"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Scale,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { HomeLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface HomeLoanCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenders: HomeLoanLender[];
}

export default function HomeLoanCompareModal({
  isOpen,
  onClose,
  lenders,
}: HomeLoanCompareModalProps) {
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
                Side-by-Side Home Loan Comparison
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Comparing {lenders.length} lenders across interest rates, EMIs, LTV ratios, overdraft schemes & fees
              </p>
            </div>
          </div>

          <button
            type="button"
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
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {lender.bankType.toUpperCase()}
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

              <tbody className="divide-y divide-gray-100 text-gray-700">
                {/* Interest Rate */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Interest Rate Range
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center">
                      <span className="font-bricolage font-extrabold text-base text-primary block">
                        {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                      </span>
                      <span className="text-[10px] text-gray-500">Repo-linked EBLR</span>
                    </td>
                  ))}
                </tr>

                {/* Starting EMI / Lakh (20 Yr) */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    EMI / ₹1 Lakh (20 Yr)
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center">
                      <span className="font-bold text-gray-900">
                        ₹{lender.startingEmiPerLakh20Yr} / mo
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Starting EMI / Lakh (30 Yr) */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    EMI / ₹1 Lakh (30 Yr)
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center">
                      <span className="font-bold text-emerald-700">
                        ₹{lender.startingEmiPerLakh30Yr} / mo
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Max Loan Limit */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Max Loan Limit
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-medium">
                      {lender.maxAmount}
                    </td>
                  ))}
                </tr>

                {/* Max Tenure */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Max Tenure
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-medium">
                      {lender.maxTenure}
                    </td>
                  ))}
                </tr>

                {/* Max LTV Ratio */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Max LTV (Funding)
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-medium text-blue-700">
                      {lender.maxLtv}
                    </td>
                  ))}
                </tr>

                {/* Overdraft Scheme */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Overdraft / Maxgain
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center">
                      {lender.overdraftScheme ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                          {lender.overdraftScheme}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Not Available</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Women Borrower Concession */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Women Concession
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs text-gray-700">
                      {lender.womenConcession}
                    </td>
                  ))}
                </tr>

                {/* Processing Fee */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Processing Fee
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs text-gray-600">
                      {lender.processingFee}
                    </td>
                  ))}
                </tr>

                {/* Foreclosure Charges */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Foreclosure Penalty
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs text-emerald-700 font-medium">
                      {lender.foreclosureCharges}
                    </td>
                  ))}
                </tr>

                {/* Min CIBIL Score */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Min CIBIL Score
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center font-bold text-gray-800">
                      {lender.minCreditScore}+
                    </td>
                  ))}
                </tr>

                {/* Min Monthly Income */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Min Income
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 text-center text-xs text-gray-600">
                      {lender.minIncome}
                    </td>
                  ))}
                </tr>

                {/* Standout Features */}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-gray-900 bg-gray-50/50 align-top">
                    Standout Perks
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-3.5 px-4 align-top">
                      <ul className="space-y-1.5 text-[11px] text-gray-600">
                        {lender.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Action CTA */}
                <tr>
                  <td className="py-4 px-3 font-semibold text-gray-900 bg-gray-50/50">
                    Next Step
                  </td>
                  {lenders.map((lender) => (
                    <td key={lender.id} className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          openApplyModal(lender.name, `Home Loan - ${lender.interestRate?.text}`);
                        }}
                        className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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

        {/* Modal Footer Note */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pre-approval checks carry zero impact on your CIBIL score</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-semibold cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
