"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard as CreditCardIcon,
  Sparkles,
  ArrowRight,
  Plane,
  Scale,
  Check,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

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
    <section id="similar-cards" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <CreditCardIcon className="w-3.5 h-3.5 text-gold" />
          <span>ALTERNATIVE CARDS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Explore Similar Cards from <span className="text-primary">{currentCard.issuer}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Compare rewards, annual fees, and airport lounge perks across alternative options.
        </p>
      </div>

      {/* Grid of Similar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarCards.map((card) => {
          const isFree =
            card.annualFee?.toLowerCase().includes("free") ||
            card.annualFee?.includes("₹0") ||
            card.annualFee?.toLowerCase().includes("nil");

          // Build link safely
          const targetIssuerSlug = card.issuer
            ? card.issuer.toLowerCase().trim().replace(/\s+/g, "-")
            : bankSlug;

          const cardHref = `/credit-cards/${bankSlug}/${card.id}`;

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
            >
              <div className="p-5 sm:p-6">
                
                {/* Issuer Logo & Network */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-gray-500 font-montserrat">
                    {card.issuer}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-montserrat">
                    {card.network}
                  </span>
                </div>

                {/* Card Image / Preview */}
                <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden drop-shadow-md mb-4 bg-gray-50">
                  <Link href={cardHref}>
                    {card.cardImage ? (
                      <Image
                        src={card.cardImage}
                        alt={card.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-tr from-primary to-[#035259] flex items-center justify-center p-4 text-white text-center">
                        <div>
                          <CreditCardIcon className="w-8 h-8 mx-auto text-gold mb-1.5" />
                          <p className="font-bricolage font-bold text-xs">{card.name}</p>
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

                <h3 className="font-bricolage font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-1">
                  <Link href={cardHref}>{card.name}</Link>
                </h3>

                <p className="text-xs text-gray-500 font-montserrat mt-1 line-clamp-2 leading-relaxed">
                  {card.description || `Explore top rewards and exclusive privileges with ${card.name}.`}
                </p>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                      Annual Fee
                    </span>
                    <span
                      className={`text-xs font-bold font-montserrat block mt-0.5 truncate ${
                        isFree ? "text-emerald-700" : "text-gray-900"
                      }`}
                    >
                      {card.annualFee || "Nil"}
                    </span>
                  </div>

                  <div className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-[9px] font-semibold text-emerald-800 uppercase tracking-wider block font-montserrat">
                      Reward Rate
                    </span>
                    <span className="text-xs font-bold text-emerald-950 font-montserrat block mt-0.5 truncate">
                      {card.rewardRate?.headline || "Up to 5%"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <Link
                  href={cardHref}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl text-center transition-colors font-montserrat"
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
                  className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 px-3 rounded-xl text-center transition-colors font-montserrat flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
