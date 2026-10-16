"use client";

import React from "react";
import Image from "next/image";
import { X, Scale } from "lucide-react";
import { CardStructure } from "./type";

interface CreditCardComparisonModalProps {
  isOpen: boolean;
  compareList: CardStructure[];
  onClose: () => void;
  onApply: (card: CardStructure) => void;
}

export default function CreditCardComparisonModal({
  isOpen,
  compareList,
  onClose,
  onApply,
}: CreditCardComparisonModalProps) {
  if (!isOpen || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
          aria-label="Close comparison modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4 sm:mb-6 pr-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
            <Scale className="w-3.5 h-3.5 text-gold" />
            Side-by-Side Comparison
          </div>
          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
            Compare Selected Cards ({compareList.length})
          </h3>
          <p className="text-[11px] text-gray-500 font-montserrat mt-2 sm:hidden flex items-center gap-1">
            <span>← Swipe horizontally to inspect features →</span>
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-left border-collapse font-montserrat text-xs min-w-130">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-3 font-bold text-gray-400 uppercase tracking-wider sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)] min-w-30 w-1/4">
                  Feature
                </th>
                {compareList.map((c) => (
                  <th
                    key={c.id}
                    className="py-3 px-3 font-bricolage font-bold text-sm text-gray-900 min-w-37.5 w-1/3"
                  >
                    <div className="w-24 mb-2">
                      <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                        <Image
                          src={c.cardImage || ""}
                          alt={c.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain transition-transform duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                    {c.name}
                    <span className="block text-[11px] font-normal text-gray-500 font-montserrat">
                      {c.issuer}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Annual Fee</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 font-bold text-gray-900">
                    {c.annualFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Joining Fee</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-800">
                    {c.joiningFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Fee Waiver</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-700">
                    {c.feeWaiver || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Reward Rate</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 font-bold text-emerald-700">
                    {c.rewardRate?.headline || "Standard rewards"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Domestic Lounge</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-700">
                    {c.loungeAccess?.domestic || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">International Lounge</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-700">
                    {c.loungeAccess?.international || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Forex Markup</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-800">
                    {c.forexMarkup || "3.5% + GST"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]">Action</td>
                {compareList.map((c) => (
                  <td key={c.id} className="py-3 px-3">
                    <button
                      onClick={() => onApply(c)}
                      className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 px-3.5 min-h-9.5 rounded-xl shadow-xs transition-all cursor-pointer font-montserrat whitespace-nowrap active:scale-95"
                    >
                      Apply Now
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 px-6 min-h-11 rounded-xl font-montserrat cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
