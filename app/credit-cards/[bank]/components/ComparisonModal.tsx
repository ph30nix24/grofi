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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
            <Scale className="w-3.5 h-3.5 text-gold" />
            Side-by-Side Comparison
          </div>
          <h3 className="font-bricolage font-bold text-2xl text-gray-900">
            Compare Selected {bankName} Cards ({cards.length})
          </h3>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-montserrat text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-3 font-bold text-gray-400 uppercase tracking-wider w-1/4">
                  Feature
                </th>
                {cards.map((c) => (
                  <th key={c.id} className="py-3 px-3 font-bricolage font-bold text-sm text-gray-900 w-1/3">
                    <div className="w-24 mb-2">
                      <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                        {c.cardImage ? (
                          <Image
                            src={c.cardImage}
                            alt={c.name}
                            fill
                            sizes="96px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary flex items-center justify-center text-white text-[10px] p-1 text-center">
                            {c.name}
                          </div>
                        )}
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
                <td className="py-3 px-3 font-semibold text-gray-500">Annual Fee</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 font-bold text-gray-900">
                    {c.annualFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">Joining Fee</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-800">
                    {c.joiningFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">Fee Waiver</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-700">
                    {c.feeWaiver || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">Reward Rate</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 font-bold text-emerald-700">
                    {c.rewardRate?.headline || "Standard rewards"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">Domestic Lounge</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-700">
                    {c.loungeAccess?.domestic || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">International Lounge</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-700">
                    {c.loungeAccess?.international || "None"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">Forex Markup</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-gray-800">
                    {c.forexMarkup || "3.5% + GST"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-gray-500">Action</td>
                {cards.map((c) => (
                  <td key={c.id} className="py-3 px-3">
                    <button
                      onClick={() => {
                        onClose();
                        openApplyModal(c.name, `${c.issuer} • ${c.badge || "Credit Card"}`);
                      }}
                      className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-all cursor-pointer font-montserrat whitespace-nowrap"
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
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 px-6 rounded-xl font-montserrat cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
