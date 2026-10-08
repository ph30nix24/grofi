"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Percent,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Calendar,
  Layers,
  FileCheck,
} from "lucide-react";
import { ShortTermLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: ShortTermLoanLender[];
  onRemove: (id: string) => void;
}

export default function ShortTermLoanCompareModal({
  isOpen,
  onClose,
  compareList,
  onRemove,
}: ShortTermLoanCompareModalProps) {
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

  if (!isOpen || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-gray-50 via-white to-gray-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Side-by-Side Analysis
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {compareList.length} Selected Lenders
              </span>
            </div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 mt-0.5">
              Compare Short-Term Personal Loans
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Comparison Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-400 w-44">
                    Comparison Parameter
                  </th>
                  {compareList.map((lender) => (
                    <th key={lender.id} className="py-4 px-3 text-left align-top">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 p-1.5 flex items-center justify-center shrink-0">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={40}
                            height={40}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <button
                          onClick={() => onRemove(lender.id)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 block leading-tight">
                        {lender.name}
                      </span>
                      {lender.badge && (
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"}`}>
                          {lender.badge}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {/* RBI Regulated Entity */}
                <tr className="bg-emerald-50/40">
                  <td className="py-3 px-3 font-semibold text-gray-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>RBI Regulated Entity</span>
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <span className="font-semibold text-emerald-900 block">
                        {lender.rbiRegulatedEntity}
                      </span>
                      <span className="text-[10px] text-emerald-700 uppercase font-bold tracking-wider">
                        {lender.lenderType.toUpperCase()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Interest Rate */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-gray-900 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Annual Interest Rate (APR)</span>
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <span className="font-bold text-primary text-sm block">
                        {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                      </span>
                      {lender.interestRate?.monthlyRateText && (
                        <span className="text-[11px] text-amber-700 font-medium block">
                          Monthly: {lender.interestRate.monthlyRateText}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Starting EMI */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    Starting EMI / ₹1 Lakh (12M)
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3 font-bold text-gray-900 text-sm">
                      ₹{new Intl.NumberFormat("en-IN").format(lender.startingEmiPerLakh)}/mo
                    </td>
                  ))}
                </tr>

                {/* Loan Amount Range */}
                <tr className="bg-gray-50/60">
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    Loan Amount Limits
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <span className="font-bold text-gray-900">
                        {lender.minAmount} - {lender.maxAmount}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Short Tenure Options */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-gray-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Short Tenure Options</span>
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {lender.shortTenureOptions?.map((opt) => (
                          <span
                            key={opt}
                            className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold"
                          >
                            {opt}
                          </span>
                        )) || (
                          <span className="font-semibold text-gray-800">{lender.tenure}</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Disbursal Speed */}
                <tr className="bg-gray-50/60">
                  <td className="py-3 px-3 font-semibold text-gray-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Turnaround Speed</span>
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-gold shrink-0" />
                        {lender.disbursalTime}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Processing Fee */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    Processing Fee
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3 text-gray-700 font-medium">
                      {lender.processingFee}
                    </td>
                  ))}
                </tr>

                {/* Cooling-Off Period & KFS */}
                <tr className="bg-emerald-50/30">
                  <td className="py-3 px-3 font-semibold text-gray-900 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cooling-Off & KFS Protection</span>
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Look-Up: {lender.coolingOffPeriod}
                        </span>
                        <span className="block text-[10px] text-gray-500">
                          {lender.kfsProvided ? "Mandatory RBI KFS Disclosed" : "KFS Available"}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Eligibility Criteria */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    Min Score & Income
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3">
                      <div>
                        <span className="font-bold text-gray-900 block">
                          CIBIL: {lender.minCreditScore}+
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Income: {lender.minIncome}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Documentation */}
                <tr className="bg-gray-50/60">
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    Documentation
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3 font-medium text-gray-800">
                      {lender.documentation}
                    </td>
                  ))}
                </tr>

                {/* Pros */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-gray-900 align-top">
                    Key Strengths
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3 align-top">
                      <ul className="space-y-1">
                        {lender.pros?.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1 text-[11px] text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        )) || (
                          <li className="text-gray-400 italic">Fast approval</li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cons */}
                <tr className="bg-gray-50/40">
                  <td className="py-3 px-3 font-semibold text-gray-900 align-top">
                    Drawbacks to Note
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-3 px-3 align-top">
                      <ul className="space-y-1">
                        {lender.cons?.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1 text-[11px] text-amber-800">
                            <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        )) || (
                          <li className="text-gray-400 italic">None reported</li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Direct Action Row */}
                <tr>
                  <td className="py-4 px-3 font-semibold text-gray-900">
                    Check Eligibility
                  </td>
                  {compareList.map((lender) => (
                    <td key={lender.id} className="py-4 px-3">
                      <button
                        onClick={() => {
                          onClose();
                          openApplyModal(
                            lender.name,
                            `Short-Term Loan application for ${lender.name}`
                          );
                        }}
                        className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                      >
                        <span>Apply Online</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
