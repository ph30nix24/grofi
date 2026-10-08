"use client";

import React from "react";
import Image from "next/image";
import { Scale, X, ArrowRight, Trash2, Zap, Clock } from "lucide-react";
import { InstantLoanLender } from "./type";

interface InstantLoanCompareDockProps {
  compareList: InstantLoanLender[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenCompareModal: () => void;
}

export default function InstantLoanCompareDock({
  compareList,
  onRemove,
  onClear,
  onOpenCompareModal,
}: InstantLoanCompareDockProps) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl animate-slideDown">
      <div className="bg-gray-900/95 backdrop-blur-md text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-gray-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 font-montserrat">
        {/* Left: Selected Lenders Thumbnails */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full w-full sm:w-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold shrink-0">
            <Scale className="w-4 h-4" />
            <span>Compare ({compareList.length}/3):</span>
          </div>

          <div className="flex items-center gap-2">
            {compareList.map((lender) => (
              <div
                key={lender.id}
                className="flex items-center gap-2 bg-gray-800/90 border border-gray-700 rounded-xl px-2.5 py-1.5 shrink-0"
              >
                <div className="w-6 h-6 rounded bg-white p-0.5 relative flex items-center justify-center">
                  <Image
                    src={lender.logo}
                    alt={lender.name}
                    width={24}
                    height={24}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block max-w-[90px] sm:max-w-[120px] truncate">
                    {lender.name.replace(/Personal Loan|Instant Loan/i, "").trim()}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-emerald-400 font-semibold">
                      {lender.interestRate?.min ?? 9.99}% p.a.
                    </span>
                    <span className="text-amber-400 font-medium flex items-center">
                      <Zap className="w-2.5 h-2.5" />
                      {lender.disbursalTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(lender.id)}
                  className="text-gray-400 hover:text-white p-0.5 rounded-full hover:bg-gray-700 cursor-pointer ml-1"
                  aria-label={`Remove ${lender.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {compareList.length < 3 && (
              <div className="hidden sm:flex items-center text-[11px] text-gray-400 italic px-2">
                Add {3 - compareList.length} more to compare
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1.5 flex items-center gap-1 cursor-pointer font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={onOpenCompareModal}
            className="bg-gold hover:bg-[#a3821f] text-gray-900 font-bold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Compare Side-by-Side</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
