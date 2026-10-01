"use client";

import React from "react";
import {
  Plane,
  Sparkles,
  ShieldCheck,
  Globe,
  Coffee,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { CardStructure } from "./type";

interface CardLoungeTravelSectionProps {
  card: CardStructure;
}

export default function CardLoungeTravelSection({ card }: CardLoungeTravelSectionProps) {
  const domesticLounge = card.loungeAccess?.domestic || "Check terms";
  const intlLounge = card.loungeAccess?.international || "Not available";
  const spendCondition = card.loungeAccess?.spendCondition;

  const hasLounge =
    !domesticLounge.toLowerCase().includes("not available") &&
    !domesticLounge.toLowerCase().includes("nil");

  return (
    <section id="lounge-travel" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Plane className="w-3.5 h-3.5 text-gold" />
          <span>TRAVEL &amp; LUXURY PRIVILEGES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Airport Lounge Privileges on the <span className="text-primary">{card.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Experience gourmet dining, quiet workspaces, and premium comforts before every flight.
        </p>
      </div>

      {/* Main Two-Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Domestic Lounges Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200/90 bg-linear-to-b from-sky-50/40 via-white to-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-sky-700" />
              </div>
              <span className="text-[11px] font-bold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full font-montserrat">
                India Terminals
              </span>
            </div>

            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
              Domestic Airport Lounge Access
            </span>
            <h3 className="font-bricolage font-bold text-2xl text-gray-900 mt-1">
              {domesticLounge}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-3 leading-relaxed">
              Valid across 40+ domestic airport lounges including Mumbai (Adani), Delhi (Encalm), Bengaluru (080 Lounge), Hyderabad, Chennai, and Kolkata terminals.
            </p>

            <div className="mt-4 pt-4 border-t border-sky-100 space-y-2 text-xs font-montserrat text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complimentary buffet, beverages, high-speed Wi-Fi, and plush seating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Swipe ₹2 (Visa/Mastercard) or ₹25 (RuPay) authorization fee at entry</span>
              </div>
            </div>
          </div>

          {/* Network tag */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-montserrat">
            Operated via {card.network} Lounge Program &amp; DreamFolks Network
          </div>
        </div>

        {/* International Lounges Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/90 bg-linear-to-b from-emerald-50/40 via-white to-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-700" />
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full font-montserrat">
                Worldwide Terminals
              </span>
            </div>

            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
              International Lounge Access
            </span>
            <h3 className="font-bricolage font-bold text-2xl text-gray-900 mt-1">
              {intlLounge}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-3 leading-relaxed">
              Access over 1,300+ luxury airport lounges globally across Dubai, London Heathrow, Singapore Changi, New York JFK, Frankfurt, and Doha.
            </p>

            <div className="mt-4 pt-4 border-t border-emerald-100 space-y-2 text-xs font-montserrat text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Priority Pass / LoungeKey / DreamFolks Global membership supported</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guest privileges available as per card tier specifications</span>
              </div>
            </div>
          </div>

          {/* Network tag */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-montserrat">
            Worldwide access network via Priority Pass or DragonPass
          </div>
        </div>

      </div>

      {/* Spend Condition & Activation Advisory */}
      {spendCondition && (
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FEF6E4] border border-amber-300/80 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs font-montserrat text-amber-950 leading-relaxed">
            <strong className="font-bold text-amber-900 block mb-0.5">
              Important Spend Condition for Lounge Access:
            </strong>
            {spendCondition}
          </div>
        </div>
      )}

    </section>
  );
}
