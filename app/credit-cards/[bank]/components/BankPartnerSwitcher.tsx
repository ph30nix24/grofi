import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { PARTNER_BANKS } from "./constants";

interface BankPartnerSwitcherProps {
  currentBankSlug: string;
  currentBankName: string;
}

export default function BankPartnerSwitcher({
  currentBankSlug,
  currentBankName,
}: BankPartnerSwitcherProps) {
  return (
    <div className="bg-[#FAF8F2] border-b border-[#DDE3C1]/70 py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-montserrat flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            Browse Other Leading Banks
          </span>
          <Link
            href="/credit-cards"
            className="text-xs font-bold text-primary hover:text-gold transition-colors font-montserrat inline-flex items-center gap-1"
          >
            <span>All 10+ Banks</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hidden">
          {PARTNER_BANKS.map((b) => {
            const isCurrent =
              b.slug.toLowerCase() === currentBankSlug.toLowerCase() ||
              b.name.toLowerCase() === currentBankName.toLowerCase();

            return (
              <Link
                key={b.slug}
                href={`/credit-cards/${b.slug}`}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-montserrat text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                  isCurrent
                    ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                    : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border-gray-200 shadow-2xs"
                }`}
              >
                <div className="w-4 h-4 relative shrink-0">
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={16}
                    height={16}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{b.name}</span>
                {isCurrent && (
                  <span className="text-[10px] bg-gold text-white px-1.5 py-0.2 rounded-md font-bold">
                    Active
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
