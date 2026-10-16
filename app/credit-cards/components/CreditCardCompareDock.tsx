"use client";

import React from "react";
import { Scale, X } from "lucide-react";
import { CardStructure } from "./type";

interface CreditCardCompareDockProps {
  compareList: CardStructure[];
  onOpenCompare: () => void;
  onClearCompare: () => void;
}

export default function CreditCardCompareDock({
  compareList,
  onOpenCompare,
  onClearCompare,
}: CreditCardCompareDockProps) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl border border-primary/20 flex items-center gap-2.5 sm:gap-4 max-w-lg w-[calc(100%-1.5rem)] sm:w-[92%] animate-scaleUp">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-900 font-montserrat leading-tight">
            Compare Cards ({compareList.length}/3)
          </p>
          <p className="text-[10px] text-gray-500 font-montserrat truncate mt-0.5">
            {compareList.map((c) => c.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          onClick={onOpenCompare}
          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-9.5 sm:min-h-10 rounded-xl transition-all font-montserrat cursor-pointer shadow-xs active:scale-95"
        >
          Compare Now
        </button>
        <button
          onClick={onClearCompare}
          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          title="Clear comparison"
          aria-label="Clear all compared cards"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
