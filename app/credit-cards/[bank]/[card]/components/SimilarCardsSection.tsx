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
import { PARTNER_BANKS } from "../../components/constants";

interface SimilarCardsSectionProps {
  currentCard: CardStructure;
  similarCards: CardStructure[];
  bankSlug: string;
}

// Canonical bank slug helper to prevent redirect hops
function resolveCardSlug(issuer?: string, defaultSlug = "hdfc-bank"): string {
  if (!issuer) return defaultSlug;
  const matched = PARTNER_BANKS.find(
    (b) => b.name.toLowerCase() === issuer.toLowerCase()
  );
  if (matched) return matched.slug;
  return issuer.toLowerCase().trim().replace(/\s+/g, "-");
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
      className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <CreditCardIcon className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>ALTERNATIVE CARDS &amp; COMPARISON</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          Explore Similar Cards from <span className="text-primary">{currentCard.issuer}</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          Compare reward structures, annual renewal fees, and airport lounge perks across alternative options.
        </p>
      </div>

      {/* Grid of Similar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {similarCards.map((card) => {
          const isFree =
            card.annualFee?.toLowerCase().includes("free") ||
            card.annualFee?.includes("₹0") ||
            card.annualFee?.toLowerCase().includes("nil");

          const cardSlug = resolveCardSlug(card.issuer, bankSlug);
          const cardHref = `/credit-cards/${cardSlug}/${card.id}`;

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
            >
              <div className="p-5 sm:p-6">
                
                {/* Issuer Logo & Network */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="text-xs font-bold text-gray-500 font-montserrat">
                    {card.issuer}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-montserrat">
                    {card.network}
                  </span>
                </div>

                {/* Card Visual Representation */}
                <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden drop-shadow-sm mb-4.5 bg-gray-50">
                  <Link href={cardHref} className="block w-full h-full relative" aria-label={`View ${card.name} details`}>
                    {card.cardImage ? (
                      <Image
                        src={card.cardImage}
                        alt={card.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#023338] via-primary to-[#012225] flex items-center justify-center p-4 text-white text-center rounded-2xl">
                        <div>
                          <CreditCardIcon className="w-8 h-8 mx-auto text-gold mb-1.5" />
                          <p className="font-bricolage font-bold text-xs">{card.name}</p>
                          <span className="text-[10px] font-mono text-white/70 block mt-1 uppercase">
                            {card.network}
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>

                {/* Badge & Title */}
                {card.badge && (
                  <span className="inline-block text-[10px] font-bold text-primary bg-[#EBF4ED] px-2.5 py-0.5 rounded-full border border-primary/15 mb-2 truncate max-w-full font-montserrat">
                    {card.badge}
                  </span>
                )}

                <h3 className="font-bricolage font-extrabold text-lg sm:text-xl text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-1">
                  <Link href={cardHref}>{card.name}</Link>
                </h3>

                <p className="text-xs text-gray-500 font-montserrat mt-1 line-clamp-2 leading-relaxed">
                  {card.description || `Explore top rewards, airport privileges, and fee waiver targets with ${card.name}.`}
                </p>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
                      Annual Fee
                    </span>
                    <span
                      className={`text-xs font-bold font-montserrat block mt-0.5 truncate ${
                        isFree ? "text-emerald-700" : "text-gray-900"
                      }`}
                    >
                      {isFree ? "Lifetime Free" : card.annualFee || "Nil"}
                    </span>
                  </div>

                  <div className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block font-montserrat">
                      Reward Yield
                    </span>
                    <span className="text-xs font-bold text-emerald-950 font-montserrat block mt-0.5 truncate">
                      {card.rewardRate?.headline || "Up to 5%"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 bg-white grid grid-cols-2 gap-2 border-t border-gray-100 mt-2">
                <Link
                  href={cardHref}
                  className="w-full text-center py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-bold font-montserrat text-gray-700 hover:bg-gray-50 hover:text-primary transition-all"
                >
                  View Details
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openApplyModal(
                      card.name,
                      `${card.issuer} • ${card.badge || "Credit Card"}`
                    )
                  }
                  className="w-full bg-primary hover:bg-[#035259] active:scale-95 text-white text-xs font-bold font-montserrat py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
