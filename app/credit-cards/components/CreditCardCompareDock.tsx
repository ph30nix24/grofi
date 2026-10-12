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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl border border-primary/20 flex items-center gap-3 sm:gap-4 max-w-lg w-[92%] animate-scaleUp">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Scale className="w-5 h-5 text-primary shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-900 font-montserrat">
            Compare Cards ({compareList.length}/3)
          </p>
          <p className="text-[10px] text-gray-500 font-montserrat truncate">
            {compareList.map((c) => c.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenCompare}
          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all font-montserrat cursor-pointer"
        >
          Compare Now
        </button>
        <button
          onClick={onClearCompare}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title="Clear comparison"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
