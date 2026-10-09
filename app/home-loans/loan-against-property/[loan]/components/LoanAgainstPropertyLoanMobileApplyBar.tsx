"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanMobileApplyBarProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanMobileApplyBar({
  lender,
}: LoanAgainstPropertyLoanMobileApplyBarProps) {
  const { openApplyModal } = useApplyModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past the hero form (~500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-2xl animate-slideUp font-montserrat">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
            <Image
              src={lender.logo}
              alt={lender.name}
              width={32}
              height={32}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="font-bricolage font-bold text-xs text-gray-900 truncate">
              {lender.name}
            </div>
            <div className="text-[11px] text-primary font-bold">
              From {lender.interestRate?.min ?? 9.25}% p.a.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openApplyModal(lender.name, "Loan Against Property")}
          className="shrink-0 bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
