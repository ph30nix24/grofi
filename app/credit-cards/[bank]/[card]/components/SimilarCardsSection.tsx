"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard as CreditCardIcon,
  ArrowRight,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import { getBankSlug, isFreeCard } from "../../components/constants";

interface SimilarCardsSectionProps {
  currentCard: CardStructure;
  similarCards: CardStructure[];
  bankSlug: string;
}

export default function SimilarCardsSection({
  currentCard,
  similarCards,
  bankSlug,
}: SimilarCardsSectionProps) {
  const { openApplyModal } = useApplyModal();

  if (!similarCards || similarCards.length === 0) return null;

  return (
    <section
      id="similar-cards"
      aria-label="Similar Credit Cards"
      className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-2.5 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#EBF4ED] text-primary px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-2.5 sm:mb-3.5">
          <CreditCardIcon className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>ALTERNATIVE CARDS &amp; COMPARISON</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight px-2 sm:px-0">
          Explore Similar Cards from <span className="text-primary">{currentCard.issuer}</span>
        </h2>
        
        <p className="text-[11px] sm:text-sm md:text-base text-gray-600 font-montserrat mt-2 sm:mt-3 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
          Compare reward structures, annual renewal fees, and airport lounge perks across alternative options.
        </p>
      </div>

      {/* Grid of Similar Cards (2 at a time on mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
        {similarCards.map((card) => {
          const isFree = isFreeCard(card);
          const cardSlug = getBankSlug(card.issuer);
          const cardHref = `/credit-cards/${cardSlug}/${card.id}`;

          return (
            <div
              key={card.id}
              className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
            >
              <div className="p-2 sm:p-5 flex-1 flex flex-col">
                
                {/* Issuer Logo & Network */}
                <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3.5">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-600 font-montserrat truncate max-w-[60%]">
                    {card.issuer}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-full font-montserrat shrink-0">
                    {card.network}
                  </span>
                </div>

                {/* Card Visual Representation */}
                <div className="relative w-full aspect-[1.586/1] rounded-lg sm:rounded-2xl overflow-hidden drop-shadow-xs sm:drop-shadow-sm mb-2 sm:mb-4 bg-gray-50">
                  <Link href={cardHref} className="block w-full h-full relative" aria-label={`View ${card.name} details`}>
                    {card.cardImage ? (
                      <Image
                        src={card.cardImage}
                        alt={card.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#023338] via-primary to-[#012225] flex items-center justify-center p-2.5 sm:p-4 text-white text-center rounded-lg sm:rounded-2xl">
                        <div>
                          <CreditCardIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gold mb-1" />
                          <p className="font-bricolage font-bold text-[10px] sm:text-xs line-clamp-1">{card.name}</p>
                          <span className="text-[9px] font-mono text-white/70 block mt-0.5 uppercase">
                            {card.network}
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>

                {/* Badge & Title */}
                <div className="min-w-0 flex-1">
                  {card.badge && (
                    <span className="inline-block text-[9px] sm:text-[10px] font-bold text-primary bg-[#EBF4ED] px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-full border border-primary/15 mb-1 sm:mb-2 truncate max-w-full font-montserrat">
                      {card.badge}
                    </span>
                  )}

                  <h3 className="font-bricolage font-bold text-xs sm:text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[2.4em] sm:min-h-[2.6em]">
                    <Link href={cardHref}>{card.name}</Link>
                  </h3>

                  <p className="text-[10px] sm:text-xs text-gray-500 font-montserrat mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                    {card.description || `Explore top rewards, airport privileges, and fee waiver targets with ${card.name}.`}
                  </p>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
                  <div className="bg-gray-50/90 p-1.5 sm:p-2.5 rounded-md sm:rounded-xl border border-gray-100 min-w-0">
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-wider block font-montserrat truncate">
                      Annual Fee
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-bold font-montserrat block mt-0.5 truncate ${
                        isFree ? "text-emerald-700 font-extrabold" : "text-gray-900"
                      }`}
                    >
                      {isFree ? "Free" : card.annualFee || "Nil"}
                    </span>
                  </div>

                  <div className="bg-emerald-50/40 p-1.5 sm:p-2.5 rounded-md sm:rounded-xl border border-emerald-100 min-w-0">
                    <span className="text-[8px] sm:text-[9px] font-bold text-emerald-800 uppercase tracking-wider block font-montserrat truncate">
                      Reward Yield
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-emerald-950 font-montserrat block mt-0.5 truncate">
                      {card.rewardRate?.headline ? card.rewardRate.headline.slice(0, 16) : "Up to 5%"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons: Stacked on mobile, side-by-side on sm: */}
              <div className="p-2 sm:p-4 sm:pt-0 bg-gray-50/80 sm:bg-white flex flex-col sm:grid sm:grid-cols-2 gap-1.5 sm:gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      card.name,
                      `${card.issuer} • ${card.badge || "Credit Card"}`
                    )
                  }
                  className="w-full bg-primary hover:bg-[#035259] active:scale-95 text-white text-[11px] sm:text-xs font-bold font-montserrat min-h-8.5 sm:min-h-10 py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer order-1 sm:order-2"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>

                <Link
                  href={cardHref}
                  className="w-full text-center min-h-6.5 sm:min-h-10 py-1 sm:py-2.5 px-2 rounded-lg sm:rounded-xl border border-gray-200 sm:border-gray-200 text-[10px] sm:text-xs font-semibold sm:font-bold font-montserrat text-gray-700 hover:bg-gray-50 hover:text-primary transition-all flex items-center justify-center bg-white shadow-2xs order-2 sm:order-1"
                >
                  Details
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
