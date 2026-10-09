"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { BalanceTransferLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenders: BalanceTransferLender[];
}

export default function BalanceTransferCompareModal({
  isOpen,
  onClose,
  lenders,
}: BalanceTransferCompareModalProps) {
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
                Side-by-Side Balance Transfer Comparison
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Comparing {lenders.length} lenders across interest rates, fees, caps, top-up headroom & turnaround
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
                        <h4 className="font-bricolage font-bold text-sm text-gray-900 leading-snug">
                          {lender.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {lender.bankType.toUpperCase()}
                          </span>
                          {lender.badge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Interest Rate Range
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <span className="font-extrabold text-base text-primary font-bricolage block">
                        {l.interestRate.text || `${l.interestRate.min}% - ${l.interestRate.max}% p.a.`}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        Floor: {l.interestRate.min}% p.a.
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 20-Yr EMI */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    EMI / Lakh (20 Yrs)
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center font-bold text-gray-900 font-mono">
                      ₹{l.startingEmiPerLakh20Yr} / Lakh
                    </td>
                  ))}
                </tr>

                {/* 30-Yr EMI */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    EMI / Lakh (30 Yrs)
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center font-bold text-gray-900 font-mono">
                      ₹{l.startingEmiPerLakh30Yr} / Lakh
                    </td>
                  ))}
                </tr>

                {/* Processing Fee & Cap */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Processing Fee & Cap
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <div className="text-xs font-medium text-gray-800">
                        {l.processingFee}
                      </div>
                      {l.processingFeeCap && (
                        <div className="text-[11px] font-bold text-emerald-700 mt-0.5">
                          Cap: {l.processingFeeCap}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Max Top-Up Amount */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Top-Up Loan Headroom
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      <span className="font-bold text-gray-900 block">
                        {l.maxTopUpAmount}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        {l.topUpAvailable ? "Available along with takeover" : "Not Available"}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Overdraft Scheme */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Overdraft / Maxgain Facility
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center">
                      {l.overdraftScheme ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {l.overdraftScheme}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Standard Term Loan
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Turnaround Time */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Approval & Disbursal Speed
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center font-semibold text-gray-700">
                      {l.turnaroundTime}
                    </td>
                  ))}
                </tr>

                {/* Max LTV Ratio */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Max LTV Ratio
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-xs text-gray-700">
                      {l.maxLtv}
                    </td>
                  ))}
                </tr>

                {/* Min CIBIL Score */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Min CIBIL Score
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center font-bold text-gray-900">
                      {l.minCreditScore}+
                    </td>
                  ))}
                </tr>

                {/* Min Income */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Minimum Monthly Income
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-xs text-gray-700">
                      {l.minIncome}
                    </td>
                  ))}
                </tr>

                {/* Foreclosure Charges */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Foreclosure Charges
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-xs text-emerald-700 font-medium">
                      {l.foreclosureCharges}
                    </td>
                  ))}
                </tr>

                {/* Women Concession */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Women Borrower Concession
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-center text-xs text-gray-700">
                      {l.womenConcession}
                    </td>
                  ))}
                </tr>

                {/* Key Features */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-3 font-semibold text-gray-600 bg-gray-50/30 align-top">
                    Standout Highlights
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-4 px-4 align-top">
                      <ul className="space-y-1.5 text-left text-[11px] text-gray-600">
                        {l.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Action CTA */}
                <tr>
                  <td className="py-4 px-3 font-semibold text-gray-600 bg-gray-50/30">
                    Apply Now
                  </td>
                  {lenders.map((l) => (
                    <td key={l.id} className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          openApplyModal(
                            l.name,
                            `Balance Transfer starting at ${l.interestRate.min}% p.a. • ${l.processingFeeCap || l.processingFee}`
                          );
                        }}
                        className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span>Switch to {l.name.replace(/Home Loan|Balance Transfer/i, "").trim()}</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All interest rates are linked to RBI External Benchmark Rate (EBLR).</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold px-4 py-2 cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
