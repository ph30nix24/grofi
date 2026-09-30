"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ApplyTriggerButtonProps {
  cardName: string;
  cardSubtitle?: string;
  label?: string;
  className?: string;
  variant?: "primary" | "outline" | "gold" | "emerald";
  showArrow?: boolean;
}

export default function ApplyTriggerButton({
  cardName,
  cardSubtitle,
  label = "Apply",
  className = "",
  variant = "emerald",
  showArrow = false,
}: ApplyTriggerButtonProps) {
  const { openApplyModal } = useApplyModal();

  const baseStyles =
    "inline-flex items-center justify-center gap-1.5 font-montserrat font-semibold text-xs sm:text-sm py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]";

  const variantStyles = {
    emerald: "bg-[#10B981] hover:bg-[#059669] text-white shadow-xs",
    primary: "bg-primary hover:bg-primary/90 text-white shadow-xs",
    outline: "bg-white hover:bg-gray-50 text-primary border border-primary/25 shadow-2xs",
    gold: "bg-gold hover:bg-gold/90 text-white shadow-md",
  };

  return (
    <button
      type="button"
      onClick={() => openApplyModal(cardName, cardSubtitle)}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span>{label}</span>
      {showArrow && <ArrowRight className="w-3.5 h-3.5" />}
    </button>
  );
}
