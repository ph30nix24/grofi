"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, CreditCard } from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardMobileApplyBarProps {
  card: CardStructure;
}

export default function CardMobileApplyBar({ card }: CardMobileApplyBarProps) {
  const { openApplyModal } = useApplyModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (400px)
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const isFree =
    card.annualFee?.toLowerCase().includes("free") ||
    card.annualFee?.includes("₹0") ||
    card.annualFee?.toLowerCase().includes("nil");

  return (
    <div
      role="region"
      aria-label="Quick Mobile Application"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/90 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        
        {/* Card Thumbnail & Core Spec */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-12 h-8 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-gray-50 drop-shadow-2xs">
            {card.cardImage ? (
              <Image
                src={card.cardImage}
                alt={card.name}
                fill
                sizes="48px"
                className="object-contain p-0.5"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-tr from-primary to-[#035259] flex items-center justify-center text-white">
                <CreditCard className="w-4 h-4 text-gold" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-bricolage font-bold text-xs text-gray-900 truncate leading-snug">
              {card.name}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] font-montserrat truncate mt-0.5">
              <span className="text-gray-500">Fee:</span>
              <strong className={isFree ? "text-emerald-700 font-extrabold" : "text-gray-900 font-bold"}>
                {isFree ? "Lifetime Free" : card.annualFee || "Nil"}
              </strong>
            </div>
          </div>
        </div>

        {/* Primary High-Contrast Apply CTA */}
        <button
          type="button"
          onClick={() =>
            openApplyModal(
              card.name,
              `${card.issuer} • ${card.badge || "Instant Application"}`
            )
          }
          className="bg-primary hover:bg-[#035259] active:scale-95 text-white font-montserrat font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer transition-all duration-200 min-h-11"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
