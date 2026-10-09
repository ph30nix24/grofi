"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Zap, Clock } from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface ShortTermLoanMobileApplyBarProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanMobileApplyBar({
  lender,
}: ShortTermLoanMobileApplyBarProps) {
  const { openApplyModal } = useApplyModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl animate-slideDown font-montserrat">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Lender Logo & Quick Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-white p-1 flex items-center justify-center">
            <Image
              src={lender.logo}
              alt={lender.name}
              width={32}
              height={32}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h4 className="font-bricolage font-bold text-xs text-gray-900 truncate">
              {lender.name}
            </h4>
            <p className="text-[10px] text-gray-500 truncate flex items-center gap-1">
              <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {lender.disbursalTime}
              </span>
              <span>•</span>
              <span>From <strong className="text-primary font-bold">{lender.interestRate?.min ?? 12.0}%</strong></span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() =>
            openApplyModal(
              lender.name,
              `Short-Term Loan in ${lender.disbursalTime} • Rates from ${lender.interestRate?.min ?? 12.0}% p.a.`
            )
          }
          className="bg-primary hover:bg-[#035259] active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
}
