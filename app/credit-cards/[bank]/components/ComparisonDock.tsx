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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-gray-300 shadow-2xl rounded-2xl p-3 sm:px-5 sm:py-3.5 flex items-center gap-3 sm:gap-5 animate-slideDown max-w-[95vw]">
      <div className="flex items-center gap-2">
        <Scale className="w-4 h-4 text-gold shrink-0" />
        <span className="text-xs font-bold text-gray-900 font-montserrat whitespace-nowrap">
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
            <span className="truncate max-w-[120px]">{c.name}</span>
            <button
              onClick={() => onRemove(c)}
              className="text-gray-400 hover:text-gray-700 cursor-pointer"
              title="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCompare}
          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer font-montserrat whitespace-nowrap"
        >
          Compare Now
        </button>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-2 py-1 font-montserrat cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
