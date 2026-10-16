"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Gift,
  Sparkles,
  Plane,
  Check,
  ArrowRight,
} from "lucide-react";
import { CardStructure } from "./type";

interface CreditCardDetailModalProps {
  card: CardStructure | null;
  onClose: () => void;
  onApply: (card: CardStructure) => void;
}

export default function CreditCardDetailModal({
  card,
  onClose,
  onApply,
}: CreditCardDetailModalProps) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4.5 sm:p-6 md:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer z-10"
          aria-label="Close card details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-5 pb-5 border-b border-gray-100 pr-0 sm:pr-8">
          <div className="w-32 sm:w-36 shrink-0">
            <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src={card.cardImage || ""}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15 inline-block mb-1.5 sm:mb-2 font-montserrat">
              {card.issuer}
            </span>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
              {card.name}
            </h3>
            <p className="text-xs text-gray-500 font-montserrat mt-1">
              {card.badge || card.categoryLabel} • {card.network}
            </p>
          </div>
        </div>

        {/* Welcome Benefit Callout */}
        {card.welcomeBenefits && card.welcomeBenefits.length > 0 && (
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 mb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider font-montserrat">
              <Gift className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Welcome Benefit</span>
            </div>
            <p className="text-xs font-semibold text-amber-950 mt-1 font-montserrat leading-relaxed">
              {card.welcomeBenefits.join(" • ")}
            </p>
          </div>
        )}

        {/* Fee & Charges Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
              Joining Fee
            </span>
            <span className="text-xs font-bold text-gray-900 block mt-0.5 font-montserrat">
              {card.joiningFee}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
              Annual Fee
            </span>
            <span className="text-xs font-bold text-gray-900 block mt-0.5 font-montserrat">
              {card.annualFee}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
              Fee Waiver
            </span>
            <span
              className="text-xs font-bold text-gray-900 block mt-0.5 font-montserrat line-clamp-2 leading-tight"
              title={card.feeWaiver || "None"}
            >
              {card.feeWaiver || "Not applicable"}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
              Forex Markup
            </span>
            <span className="text-xs font-bold text-primary block mt-0.5 font-montserrat">
              {card.forexMarkup || "3.5% + GST"}
            </span>
          </div>
        </div>

        {/* Reward System Breakdown */}
        {card.rewardRate && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider font-montserrat flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Reward Structure &amp; Redemption</span>
            </h4>
            <div className="space-y-2 text-xs font-montserrat text-emerald-900">
              {card.rewardRate.headline && (
                <p className="font-semibold text-emerald-950">
                  • {card.rewardRate.headline}
                </p>
              )}
              {card.rewardRate.base && (
                <p>
                  <strong>Base Rewards:</strong> {card.rewardRate.base}
                </p>
              )}
              {card.rewardRate.accelerated && (
                <p>
                  <strong>Accelerated Spends:</strong> {card.rewardRate.accelerated}
                </p>
              )}
              {card.rewardRate.pointValue && (
                <p>
                  <strong>Point Cash Value:</strong> {card.rewardRate.pointValue} (
                  {card.rewardRate.rewardCurrency || "Reward Points"})
                </p>
              )}
            </div>
          </div>
        )}

        {/* Airport Lounge Privileges */}
        {card.loungeAccess && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80">
            <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wider font-montserrat flex items-center gap-1.5 mb-2">
              <Plane className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Airport Lounge Privileges</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-montserrat text-sky-900">
              <div>
                <span className="font-bold block text-sky-950">Domestic Lounges:</span>
                <p className="mt-0.5">{card.loungeAccess.domestic || "Not available"}</p>
              </div>
              <div>
                <span className="font-bold block text-sky-950">International Lounges:</span>
                <p className="mt-0.5">{card.loungeAccess.international || "Not available"}</p>
              </div>
              {card.loungeAccess.spendCondition && (
                <div className="col-span-1 sm:col-span-2 text-[11px] text-sky-700 bg-white/70 p-2.5 rounded-lg">
                  <strong>Spend Condition:</strong> {card.loungeAccess.spendCondition}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Highlights */}
        {card.keyHighlights && card.keyHighlights.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-montserrat">
              Key Features &amp; Perks
            </h4>
            <ul className="space-y-2">
              {card.keyHighlights.map((perk, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-montserrat">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pros & Cons */}
        {((card.pros && card.pros.length > 0) || (card.cons && card.cons.length > 0)) && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {card.pros && card.pros.length > 0 && (
              <div className="flex-1 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-2 font-montserrat">
                  Pros
                </span>
                <ul className="space-y-1.5 text-xs text-emerald-900 font-montserrat">
                  {card.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {card.cons && card.cons.length > 0 && (
              <div className="flex-1 bg-rose-50/50 p-3.5 rounded-2xl border border-rose-200">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-2 font-montserrat">
                  Cons &amp; Limitations
                </span>
                <ul className="space-y-1.5 text-xs text-rose-900 font-montserrat">
                  {card.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Editorial Verdict */}
        {card.editorialVerdict && (
          <div className="mb-6 p-4 rounded-2xl bg-[#EBF4ED] border border-primary/20">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block font-montserrat">
              Grofi Editorial Verdict
            </span>
            <p className="text-xs text-gray-800 font-montserrat mt-1 leading-relaxed">
              {card.editorialVerdict}
            </p>
            {card.bestFor && (
              <p className="text-[11px] text-gray-600 font-montserrat mt-2 font-semibold">
                Best For: <span className="text-primary font-bold">{card.bestFor}</span>
              </p>
            )}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer font-montserrat"
          >
            Close
          </button>
          <button
            onClick={() => onApply(card)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-3.5 rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-montserrat"
          >
            <span>Apply Online</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
