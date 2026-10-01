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
      // Show when scrolled past hero (450px)
      setVisible(window.scrollY > 450);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl animate-slideDown">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        
        {/* Card Thumbnail / Mini Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-12 h-8 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-50 drop-shadow-xs">
            {card.cardImage ? (
              <Image
                src={card.cardImage}
                alt={card.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                <CreditCard className="w-4 h-4 text-gold" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="font-bricolage font-bold text-xs text-gray-900 truncate">
              {card.name}
            </h4>
            <p className="text-[10px] text-gray-500 font-montserrat truncate">
              Fee: <strong className={isFree ? "text-emerald-700" : "text-gray-900"}>{card.annualFee || "Nil"}</strong>
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() =>
            openApplyModal(
              card.name,
              `${card.issuer} • ${card.badge || "Credit Card"}`
            )
          }
          className="bg-primary hover:bg-[#035259] active:scale-95 text-white font-montserrat font-bold text-xs py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer transition-all"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
