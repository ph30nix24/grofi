"use client";

import React from "react";
import Image from "next/image";
import { X, Check, ArrowRight } from "lucide-react";
import { CardStructure } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardDetailsModalProps {
  card: CardStructure | null;
  onClose: () => void;
}

export default function CardDetailsModal({ card, onClose }: CardDetailsModalProps) {
  const { openApplyModal } = useApplyModal();

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10 min-w-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close card details modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start mb-6 pr-8 sm:pr-0">
          <div className="w-36 sm:w-44 shrink-0">
            <div className="relative w-full aspect-[1.586/1] rounded-xl sm:rounded-2xl overflow-hidden drop-shadow-md">
              {card.cardImage ? (
                <Image
                  src={card.cardImage}
                  alt={card.name}
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xs p-2 text-center font-bricolage font-bold">
                  {card.name}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            {card.badge && (
              <span className="inline-block text-[10px] font-bold text-primary bg-[#EBF4ED] px-2.5 py-0.5 rounded-full border border-primary/15 mb-1.5 truncate max-w-full">
                {card.badge}
              </span>
            )}
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-snug wrap-break-word">
              {card.name}
            </h3>
            <p className="text-xs text-gray-500 font-montserrat mt-1">
              Issued by <strong className="text-gray-800 font-bold">{card.issuer}</strong> • {card.network}
            </p>
          </div>
        </div>

        {/* Key Fees Breakdown (2x2 grid on mobile, 4-col on sm) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-6">
          <div className="bg-gray-50/90 p-2.5 sm:p-3 rounded-xl border border-gray-100 text-center min-w-0">
            <span className="text-[10px] text-gray-400 font-semibold block font-montserrat uppercase truncate">
              Annual Fee
            </span>
            <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
              {card.annualFee || "Nil"}
            </span>
          </div>
          <div className="bg-gray-50/90 p-2.5 sm:p-3 rounded-xl border border-gray-100 text-center min-w-0">
            <span className="text-[10px] text-gray-400 font-semibold block font-montserrat uppercase truncate">
              Joining Fee
            </span>
            <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
              {card.joiningFee || "Nil"}
            </span>
          </div>
          <div className="bg-gray-50/90 p-2.5 sm:p-3 rounded-xl border border-gray-100 text-center min-w-0">
            <span className="text-[10px] text-gray-400 font-semibold block font-montserrat uppercase truncate">
              Fee Waiver
            </span>
            <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 line-clamp-2 leading-tight" title={card.feeWaiver}>
              {card.feeWaiver || "None"}
            </span>
          </div>
          <div className="bg-gray-50/90 p-2.5 sm:p-3 rounded-xl border border-gray-100 text-center min-w-0">
            <span className="text-[10px] text-gray-400 font-semibold block font-montserrat uppercase truncate">
              Forex Markup
            </span>
            <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
              {card.forexMarkup || "3.5% + GST"}
            </span>
          </div>
        </div>

        {/* Reward Program Specs */}
        {card.rewardRate && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block font-montserrat mb-1">
              Reward Points &amp; Return Value
            </span>
            <p className="text-sm font-bold text-emerald-950 font-montserrat">
              {card.rewardRate.headline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-3 text-xs font-montserrat text-emerald-900">
              {card.rewardRate.base && (
                <div className="flex-1">
                  <span className="font-bold text-emerald-950 block">Base Rewards:</span>
                  <p className="mt-0.5">{card.rewardRate.base}</p>
                </div>
              )}
              {card.rewardRate.accelerated && (
                <div className="flex-1">
                  <span className="font-bold text-emerald-950 block">Accelerated Rewards:</span>
                  <p className="mt-0.5">{card.rewardRate.accelerated}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lounge Access Privileges */}
        {card.loungeAccess && (
          <div className="mb-6 p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80">
            <span className="text-[10px] font-bold text-sky-800 uppercase tracking-widest block font-montserrat mb-1">
              Airport Lounge Privileges
            </span>
            <div className="flex flex-col sm:flex-row gap-3 text-xs font-montserrat text-sky-900">
              <div className="flex-1">
                <span className="font-bold block text-sky-950">Domestic Lounges:</span>
                <p className="mt-0.5">{card.loungeAccess.domestic || "Not available"}</p>
              </div>
              <div className="flex-1">
                <span className="font-bold block text-sky-950">International Lounges:</span>
                <p className="mt-0.5">{card.loungeAccess.international || "Not available"}</p>
              </div>
              {card.loungeAccess.spendCondition && (
                <div className="w-full text-[11px] text-sky-700 bg-white/70 p-2 rounded-lg mt-2">
                  <strong>Spend Condition:</strong> {card.loungeAccess.spendCondition}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Features & Perks */}
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
        <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 min-h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer font-montserrat flex items-center justify-center"
          >
            Close Details
          </button>
          <button
            onClick={() => {
              onClose();
              openApplyModal(card.name, `${card.issuer} • ${card.badge || "Credit Card"}`);
            }}
            className="w-full sm:flex-1 min-h-11.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-3 px-4 rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-montserrat active:scale-[0.98]"
          >
            <span>Apply Online</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
