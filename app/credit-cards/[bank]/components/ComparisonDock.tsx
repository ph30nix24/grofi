"use client";

import React from "react";
import { Scale, X } from "lucide-react";
import { CardStructure } from "../../components/type";

interface ComparisonDockProps {
  compareList: CardStructure[];
  onRemove: (card: CardStructure) => void;
  onClear: () => void;
  onOpenCompare: () => void;
}

export default function ComparisonDock({
  compareList,
  onRemove,
  onClear,
  onOpenCompare,
}: ComparisonDockProps) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-gray-300 shadow-2xl rounded-2xl p-3 sm:px-5 sm:py-3.5 flex items-center justify-between sm:justify-start gap-2.5 sm:gap-5 animate-slideDown w-[calc(100%-1.5rem)] sm:w-auto max-w-xl">
      <div className="flex items-center gap-2 min-w-0">
        <Scale className="w-4 h-4 text-gold shrink-0" />
        <span className="text-xs font-bold text-gray-900 font-montserrat truncate">
          {compareList.length} of 3 Selected
        </span>
      </div>

      {/* Thumbnail Pills */}
      <div className="hidden sm:flex items-center gap-2">
        {compareList.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-700 font-montserrat"
          >
            <span className="truncate max-w-30">{c.name}</span>
            <button
              onClick={() => onRemove(c)}
              className="text-gray-400 hover:text-gray-700 cursor-pointer p-0.5"
              title="Remove"
              aria-label={`Remove ${c.name} from comparison`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenCompare}
          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3.5 sm:px-4 py-2 min-h-9.5 sm:min-h-10 rounded-xl shadow-md transition-all cursor-pointer font-montserrat whitespace-nowrap flex items-center justify-center active:scale-[0.98]"
        >
          Compare Now
        </button>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-2.5 py-1.5 min-h-9.5 font-montserrat cursor-pointer flex items-center justify-center"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
