"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Calculator } from "lucide-react";
import { HomeLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface HomeLoanMobileApplyBarProps {
  lender: HomeLoanLender;
}

export default function HomeLoanMobileApplyBar({ lender }: HomeLoanMobileApplyBarProps) {
  const { openApplyModal } = useApplyModal();

  const scrollToCalculator = () => {
    const el = document.getElementById("emi-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/90 p-3 shadow-lg font-montserrat">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
            <Image
              src={lender.logo}
              alt={lender.name}
              width={32}
              height={32}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="truncate">
            <span className="block text-xs font-bricolage font-bold text-gray-900 truncate">
              {lender.name}
            </span>
            <span className="block text-[11px] font-bold text-primary">
              From {lender.interestRate?.min ?? 7.15}% p.a.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={scrollToCalculator}
            className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Calculate EMI"
          >
            <Calculator className="w-4 h-4 text-primary" />
          </button>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                lender.name,
                `Home Loan Application • Rates from ${lender.interestRate?.min ?? 7.15}% p.a.`
              )
            }
            className="bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1 cursor-pointer active:scale-98"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
