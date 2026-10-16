"use client";

import React from "react";
import Image from "next/image";
import { X, Scale } from "lucide-react";
import { CardStructure } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ComparisonModalProps {
  isOpen: boolean;
  cards: CardStructure[];
  bankName: string;
  onClose: () => void;
}

export default function ComparisonModal({
  isOpen,
  cards,
  bankName,
  onClose,
}: ComparisonModalProps) {
  const { openApplyModal } = useApplyModal();

  if (!isOpen || cards.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10 min-w-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close comparison modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-5 sm:mb-6 pr-10 min-w-0">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
            <Scale className="w-3.5 h-3.5 text-gold shrink-0" />
            Side-by-Side Comparison
          </div>
          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 wrap-break-word">
            Compare Selected {bankName} Cards ({cards.length})
          </h3>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="sm:hidden text-[11px] text-gray-500 font-montserrat flex items-center justify-center gap-1.5 mb-3 bg-gray-50 border border-gray-200/70 p-2 rounded-xl">
          <span>← Swipe horizontally to inspect features →</span>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl">
          <table className="w-full min-w-125 text-left border-collapse font-montserrat text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="py-3 px-3.5 font-bold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50/95 backdrop-blur-xs z-10 min-w-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Feature
                </th>
                {cards.map((c) => (
                  <th key={c.id} className="py-3 px-3.5 font-bricolage font-bold text-sm text-gray-900 min-w-37.5">
                    <div className="w-20 mb-2">
                      <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-md bg-gray-100">
                        {c.cardImage ? (
                          <Image
                            src={c.cardImage}
                            alt={c.name}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary flex items-center justify-center text-white text-[10px] p-1 text-center font-bricolage">
                            {c.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="wrap-break-word line-clamp-2">{c.name}</span>
                    <span className="block text-[11px] font-normal text-gray-500 font-montserrat truncate">
                      {c.issuer}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Annual Fee
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 font-bold text-gray-900">
                    {c.annualFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Joining Fee
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 text-gray-800">
                    {c.joiningFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Fee Waiver
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 text-gray-700">
                    {c.feeWaiver || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Reward Rate
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 font-bold text-emerald-700">
                    {c.rewardRate?.headline || "Standard rewards"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Domestic Lounge
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 text-gray-700">
                    {c.loungeAccess?.domestic || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  International Lounge
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 text-gray-700">
                    {c.loungeAccess?.international || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Forex Markup
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5 text-gray-800">
                    {c.forexMarkup || "3.5% + GST"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3.5 font-semibold text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Action
                </td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3.5">
                    <button
                      onClick={() => {
                        onClose();
                        openApplyModal(c.name, `${c.issuer} • ${c.badge || "Credit Card"}`);
                      }}
                      className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 px-3.5 min-h-9.5 rounded-xl shadow-xs transition-all cursor-pointer font-montserrat whitespace-nowrap active:scale-[0.98]"
                    >
                      Apply Now
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 sm:mt-6 text-right">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 px-6 rounded-xl font-montserrat cursor-pointer transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
