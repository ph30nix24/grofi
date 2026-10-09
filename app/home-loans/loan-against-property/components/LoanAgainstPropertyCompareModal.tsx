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
import { LoanAgainstPropertyLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenders: LoanAgainstPropertyLender[];
}

export default function LoanAgainstPropertyCompareModal({
  isOpen,
  onClose,
  lenders,
}: LoanAgainstPropertyCompareModalProps) {
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
                Side-by-Side LAP & Mortgage Comparison
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Comparing {lenders.length} lenders across interest rates, EMIs, LTV ratios, overdraft schemes & processing fees
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
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-0.5">
                          {lender.bankType.toUpperCase()}
                        </span>
                        {lender.badge && (
                          <span className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {lender.badge}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            openApplyModal(lender.name, "Loan Against Property");
                          }}
                          className="mt-3 w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
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
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Interest Rate Range
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <span className="font-bricolage font-extrabold text-base text-gray-900 block">
                        {l.interestRate?.text || `${l.interestRate?.min}% - ${l.interestRate?.max}% p.a.`}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        From {l.interestRate?.min}% p.a.
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Starting EMI / Lakh (15 Yrs) */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    EMI / ₹1 Lakh (15 Yrs)
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <span className="font-bold text-primary text-sm sm:text-base">
                        ₹{l.startingEmiPerLakh15Yr}
                      </span>
                      <span className="text-[10px] text-gray-500 block">/ month</span>
                    </td>
                  ))}
                </tr>

                {/* Starting EMI / Lakh (20 Yrs) */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    EMI / ₹1 Lakh (20 Yrs)
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <span className="font-bold text-gray-800 text-sm">
                        ₹{l.startingEmiPerLakh20Yr}
                      </span>
                      <span className="text-[10px] text-gray-500 block">/ month</span>
                    </td>
                  ))}
                </tr>

                {/* Max LTV Ratio */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Max LTV Ratio
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <span className="font-bricolage font-bold text-sm text-gray-900 block">
                        {l.maxLtvPercent}% LTV
                      </span>
                      <span className="text-[10px] text-gray-500 line-clamp-2">
                        {l.maxLtv}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Max Loan Amount */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Max Loan Amount
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center font-semibold text-gray-800 text-xs sm:text-sm">
                      {l.maxAmount}
                    </td>
                  ))}
                </tr>

                {/* Max Tenure */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Max Tenure
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-xs text-gray-700">
                      {l.maxTenure}
                    </td>
                  ))}
                </tr>

                {/* Overdraft Facility */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Overdraft Scheme
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      {l.overdraftAvailable ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Available</span>
                          </span>
                          {l.overdraftScheme && (
                            <span className="text-[10px] text-gray-600 mt-1 max-w-[170px]">
                              {l.overdraftScheme}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">
                          Term Loan Only
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Processing Fee */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Processing Fee
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-xs text-gray-700">
                      <div>{l.processingFee}</div>
                      {l.processingFeeCap && (
                        <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                          {l.processingFeeCap}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Foreclosure Charges */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Foreclosure Penalty
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-[11px] text-gray-600">
                      {l.foreclosureCharges}
                    </td>
                  ))}
                </tr>

                {/* Accepted Property Types */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Collateral Types
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {l.propertyTypesAccepted.map((prop, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md"
                          >
                            {prop}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Minimum CIBIL Score */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Min CIBIL Score
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center font-bold text-gray-800 text-xs">
                      {l.minCreditScore}+
                    </td>
                  ))}
                </tr>

                {/* Key Pros */}
                <tr>
                  <td className="py-3 px-3 font-bold text-gray-700 bg-gray-50/50">
                    Top Differentiators
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-left">
                      <ul className="space-y-1 text-xs text-gray-600">
                        {l.pros.slice(0, 3).map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11px]">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>0% prepayment charges for individual borrowers on floating rate loans.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
