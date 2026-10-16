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

function formatInterestRate(lender: PersonalLoanLender): string {
  if (lender.interestRate?.text) return lender.interestRate.text;
  if (typeof lender.interestRate?.min === "number") {
    return `${lender.interestRate.min}%${lender.interestRate.max ? ` - ${lender.interestRate.max}%` : ""} p.a.`;
  }
  return "Competitive p.a.";
}

export default function PersonalLoanCompareModal({
  isOpen,
  onClose,
  lenders,
}: PersonalLoanCompareModalProps) {
  const { openApplyModal } = useApplyModal();
  const [selectedPairIndex, setSelectedPairIndex] = React.useState<number>(0);
  const [mobileViewMode, setMobileViewMode] = React.useState<"side-by-side" | "table">("side-by-side");

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

  // Reset pair index if lenders change
  useEffect(() => {
    setSelectedPairIndex(0);
  }, [lenders]);

  if (!isOpen || lenders.length === 0) return null;

  // Active lenders for mobile 2-up comparison
  const pairs: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];

  const activePair = lenders.length >= 3 ? pairs[selectedPairIndex] || [0, 1] : [0, 1];
  const lenderA = lenders[activePair[0]] || lenders[0];
  const lenderB = lenders.length > 1 ? lenders[activePair[1]] || lenders[1] : null;

  const comparisonMetrics = [
    {
      id: "rate",
      label: "Interest Rate (% p.a.)",
      getValue: (l: PersonalLoanLender) => (
        <span className="font-bricolage font-bold text-sm sm:text-base text-primary">
          {formatInterestRate(l)}
        </span>
      ),
    },
    {
      id: "emi",
      label: "Starting EMI / Lakh (5 Yrs)",
      getValue: (l: PersonalLoanLender) => (
        <span className="font-semibold text-xs sm:text-sm text-emerald-800">
          ₹{l.startingEmiPerLakh} / Lakh
        </span>
      ),
    },
    {
      id: "maxAmount",
      label: "Maximum Loan Limit",
      getValue: (l: PersonalLoanLender) => (
        <span className="font-bricolage font-bold text-xs sm:text-sm text-gray-900">
          {l.maxAmount}
        </span>
      ),
    },
    {
      id: "tenure",
      label: "Repayment Tenure",
      getValue: (l: PersonalLoanLender) => (
        <span className="text-xs text-gray-700">
          {l.tenure}
        </span>
      ),
    },
    {
      id: "disbursal",
      label: "Disbursal Turnaround",
      getValue: (l: PersonalLoanLender) => (
        <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md text-[11px] sm:text-xs border border-amber-200/60">
          {l.disbursalTime}
        </span>
      ),
    },
    {
      id: "processingFee",
      label: "Processing Fee",
      getValue: (l: PersonalLoanLender) => (
        <span className="text-xs text-gray-600 leading-snug">
          {l.processingFee}
        </span>
      ),
    },
    {
      id: "cibil",
      label: "Min CIBIL Score",
      getValue: (l: PersonalLoanLender) => (
        <span className="font-semibold text-xs sm:text-sm text-gray-800">
          {l.minCreditScore}+
        </span>
      ),
    },
    {
      id: "income",
      label: "Min Monthly Income",
      getValue: (l: PersonalLoanLender) => (
        <span className="text-xs text-gray-700">
          {l.minIncome}
        </span>
      ),
    },
    {
      id: "foreclosure",
      label: "Prepayment / Foreclosure",
      getValue: (l: PersonalLoanLender) => (
        <span className="text-xs text-gray-600 leading-snug">
          {l.foreclosureCharges || "Standard bank foreclosure norms apply"}
        </span>
      ),
    },
    {
      id: "lockIn",
      label: "Lock-in Period",
      getValue: (l: PersonalLoanLender) => (
        <span className="text-xs font-semibold text-gray-700">
          {l.lockInPeriod || "6 Months"}
        </span>
      ),
    },
    {
      id: "recommendedFor",
      label: "Recommended For",
      getValue: (l: PersonalLoanLender) => (
        <span className="text-xs text-gray-700 leading-snug">
          {l.recommendedFor}
        </span>
      ),
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-100 flex items-center justify-center p-2.5 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-gray-50 via-white to-gray-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center border border-primary/20 shrink-0">
              <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            </div>
            <div>
              <h3 id="compare-modal-title" className="font-bricolage font-bold text-lg sm:text-2xl text-gray-900 leading-tight">
                Side-by-Side Loan Comparison
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Comparing {lenders.length} lenders across rates, fees, eligibility & disbursal speeds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile View Switcher (Visible only on screens < sm) */}
        <div className="sm:hidden px-3 pt-3 pb-1 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Mobile Layout:
          </span>
          <div className="flex items-center bg-gray-200/80 p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => setMobileViewMode("side-by-side")}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                mobileViewMode === "side-by-side"
                  ? "bg-white text-primary shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Side-by-Side (2-Up)
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode("table")}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                mobileViewMode === "table"
                  ? "bg-white text-primary shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Matrix Table
            </button>
          </div>
        </div>

        {/* Modal Comparison Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          
          {/* ─────────────────────────────────────────────────────────────
              1. MOBILE TRUE SIDE-BY-SIDE 2-UP VIEW (< 640px)
              Displays 2 lenders side by side on ANY mobile screen
              ───────────────────────────────────────────────────────────── */}
          {mobileViewMode === "side-by-side" && lenderB ? (
            <div className="sm:hidden space-y-3.5">
              {/* Pair Switcher if 3 lenders are being compared */}
              {lenders.length === 3 && (
                <div className="bg-gray-50 p-2 rounded-2xl border border-gray-200/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 px-1">
                    Comparing Pair:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: `${lenders[0].name.split(" ")[0]} vs ${lenders[1].name.split(" ")[0]}`, idx: 0 },
                      { label: `${lenders[0].name.split(" ")[0]} vs ${lenders[2].name.split(" ")[0]}`, idx: 1 },
                      { label: `${lenders[1].name.split(" ")[0]} vs ${lenders[2].name.split(" ")[0]}`, idx: 2 },
                    ].map((pair) => (
                      <button
                        key={pair.idx}
                        type="button"
                        onClick={() => setSelectedPairIndex(pair.idx)}
                        className={`py-1.5 px-1 rounded-xl text-[10px] font-bold truncate transition-all cursor-pointer text-center ${
                          selectedPairIndex === pair.idx
                            ? "bg-primary text-white shadow-xs"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {pair.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Side-by-Side Pinned Profiles Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs rounded-2xl border border-gray-200/90 shadow-sm p-3 -mx-0.5">
                <div className="grid grid-cols-2 divide-x divide-gray-200 gap-2">
                  {/* Left Lender */}
                  <div className="pr-1 flex flex-col items-center text-center justify-between">
                    <div className="h-8 w-20 relative flex items-center justify-center mb-1">
                      <Image
                        src={lenderA.logo}
                        alt={lenderA.name}
                        width={80}
                        height={30}
                        className="max-h-7 max-w-full object-contain"
                      />
                    </div>
                    <h4 className="font-bricolage font-bold text-xs text-gray-900 leading-tight line-clamp-1">
                      {lenderA.name}
                    </h4>
                    {lenderA.badge && (
                      <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 truncate max-w-full">
                        {lenderA.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openApplyModal(lenderA.name, lenderA.tagline);
                      }}
                      className="mt-2 w-full bg-primary hover:bg-[#035259] text-white font-bold text-[11px] py-1.5 px-2 rounded-lg shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Right Lender */}
                  <div className="pl-1 flex flex-col items-center text-center justify-between">
                    <div className="h-8 w-20 relative flex items-center justify-center mb-1">
                      <Image
                        src={lenderB.logo}
                        alt={lenderB.name}
                        width={80}
                        height={30}
                        className="max-h-7 max-w-full object-contain"
                      />
                    </div>
                    <h4 className="font-bricolage font-bold text-xs text-gray-900 leading-tight line-clamp-1">
                      {lenderB.name}
                    </h4>
                    {lenderB.badge && (
                      <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 truncate max-w-full">
                        {lenderB.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openApplyModal(lenderB.name, lenderB.tagline);
                      }}
                      className="mt-2 w-full bg-primary hover:bg-[#035259] text-white font-bold text-[11px] py-1.5 px-2 rounded-lg shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Metric Cards */}
              <div className="space-y-2">
                {comparisonMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-2xs"
                  >
                    <div className="bg-gray-50/90 px-3 py-1 border-b border-gray-100 text-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        {metric.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-100 p-2 text-center items-center">
                      <div className="px-1">
                        {metric.getValue(lenderA)}
                      </div>
                      <div className="px-1">
                        {metric.getValue(lenderB)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* ─────────────────────────────────────────────────────────────
              2. DESKTOP / TABLET MATRIX TABLE OR MOBILE TABLE MODE
              Visible on sm+ screens, or on mobile when 'Matrix Table' is toggled
              ───────────────────────────────────────────────────────────── */}
          <div className={`${mobileViewMode === "side-by-side" ? "hidden sm:block" : "block"} overflow-x-auto`}>
            {/* Horizontal scroll hint on mobile table mode */}
            <div className="sm:hidden flex items-center justify-between bg-slate-100 px-3 py-1.5 rounded-xl mb-3 text-[11px] text-gray-600">
              <span className="font-semibold text-gray-700">All {lenders.length} Lenders</span>
              <span className="text-primary font-bold">← Swipe horizontally →</span>
            </div>

            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="sticky left-0 z-20 py-4 px-3.5 w-1/4 min-w-30 sm:min-w-35 text-xs font-bold uppercase text-gray-500 bg-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                    Lender Profile
                  </th>
                  {lenders.map((lender) => (
                    <th key={lender.id} className="py-4 px-3 sm:px-4 min-w-37.5 sm:min-w-45 text-center align-top bg-white">
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
                {comparisonMetrics.map((metric) => (
                  <tr key={metric.id} className="hover:bg-gray-50/50">
                    <td className="sticky left-0 z-10 py-3.5 px-3.5 font-bold text-gray-700 bg-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.03)] whitespace-nowrap">
                      {metric.label}
                    </td>
                    {lenders.map((lender) => (
                      <td key={lender.id} className="py-3.5 px-3 sm:px-4 text-center">
                        {metric.getValue(lender)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <p className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1.5 truncate pr-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">All offers subject to bank verification. 100% free eligibility check.</span>
          </p>
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-700 hover:text-gray-900 px-3.5 sm:px-4 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 shrink-0"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

