"use client";

import React from "react";
import {
  Plane,
  Globe,
  Coffee,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CardStructure } from "./type";

interface CardLoungeTravelSectionProps {
  card: CardStructure;
}

export default function CardLoungeTravelSection({ card }: CardLoungeTravelSectionProps) {
  const domesticLounge = card.loungeAccess?.domestic || "Check terms";
  const intlLounge = card.loungeAccess?.international || "Not available";
  const spendCondition = card.loungeAccess?.spendCondition;

  const hasDomesticLounge =
    !domesticLounge.toLowerCase().includes("not available") &&
    !domesticLounge.toLowerCase().includes("nil") &&
    !domesticLounge.toLowerCase().includes("no lounge");

  const hasIntlLounge =
    !intlLounge.toLowerCase().includes("not available") &&
    !intlLounge.toLowerCase().includes("nil") &&
    !intlLounge.toLowerCase().includes("no lounge");

  return (
    <section
      id="lounge-travel"
      aria-label="Airport Lounge and Travel Privileges"
      className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <Plane className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>AIRPORT LOUNGE &amp; TRAVEL PRIVILEGES</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          Airport Lounge Privileges on the <span className="text-primary">{card.name}</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          {hasDomesticLounge || hasIntlLounge
            ? "Experience complimentary gourmet dining, quiet workspaces, and premium comforts before every flight."
            : "Transparent assessment of travel and airport lounge conditions bundled with this card tier."}
        </p>
      </div>

      {/* Main Two-Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Domestic Lounges Card */}
        <div className={`rounded-3xl p-6 sm:p-8 border shadow-xs flex flex-col justify-between transition-all ${
          hasDomesticLounge
            ? "bg-linear-to-b from-sky-50/50 via-white to-white border-sky-200/90"
            : "bg-gray-50/70 border-gray-200/90"
        }`}>
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                hasDomesticLounge ? "bg-sky-100 text-sky-800" : "bg-gray-200 text-gray-600"
              }`}>
                <Coffee className="w-5 h-5 text-sky-700" />
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full font-montserrat ${
                hasDomesticLounge ? "text-sky-800 bg-sky-100" : "text-gray-600 bg-gray-200"
              }`}>
                India Terminals
              </span>
            </div>

            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
              Domestic Airport Lounge Access
            </span>
            
            <h3 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
              {domesticLounge}
            </h3>

            {hasDomesticLounge ? (
              <>
                <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-3 leading-relaxed">
                  Valid across 40+ premier domestic airport lounges including Mumbai (Adani), Delhi (Encalm), Bengaluru (080 Lounge), Hyderabad, Chennai, and Kolkata terminals.
                </p>

                <div className="mt-5 pt-4 border-t border-sky-100 space-y-2.5 text-xs font-montserrat text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complimentary buffet dining, non-alcoholic beverages, high-speed Wi-Fi, and plush lounge seating</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Nominal swipe authorization fee of ₹2 (Visa/Mastercard) or ₹25 (RuPay) reversed automatically</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 text-xs font-montserrat text-gray-600 space-y-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>No Complimentary Domestic Lounge Access</span>
                </div>
                <p className="leading-relaxed">
                  This card focuses rewards on retail, shopping, and everyday cashback rather than travel lounges. Paid access is available at standard airport counter rates.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-montserrat">
            {hasDomesticLounge
              ? `Operated via ${card.network} Domestic Lounge Program & DreamFolks Network`
              : "Consider premium travel cards if frequent airport lounge access is a priority."}
          </div>
        </div>

        {/* International Lounges Card */}
        <div className={`rounded-3xl p-6 sm:p-8 border shadow-xs flex flex-col justify-between transition-all ${
          hasIntlLounge
            ? "bg-linear-to-b from-emerald-50/50 via-white to-white border-emerald-200/90"
            : "bg-gray-50/70 border-gray-200/90"
        }`}>
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                hasIntlLounge ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
              }`}>
                <Globe className="w-5 h-5 text-emerald-700" />
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full font-montserrat ${
                hasIntlLounge ? "text-emerald-800 bg-emerald-100" : "text-gray-600 bg-gray-200"
              }`}>
                Worldwide Terminals
              </span>
            </div>

            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-montserrat">
              International Lounge Access
            </span>
            
            <h3 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
              {intlLounge}
            </h3>

            {hasIntlLounge ? (
              <>
                <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-3 leading-relaxed">
                  Access over 1,300+ luxury airport lounges across major international flight hubs in Dubai, London Heathrow, Singapore Changi, New York JFK, and Doha.
                </p>

                <div className="mt-5 pt-4 border-t border-emerald-100 space-y-2.5 text-xs font-montserrat text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Priority Pass / LoungeKey / DreamFolks Global membership supported</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Guest privileges available subject to published bank tier terms</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 text-xs font-montserrat text-gray-600 space-y-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>No Complimentary International Lounge Access</span>
                </div>
                <p className="leading-relaxed">
                  Complimentary international airport lounge access is reserved for premium travel credit cards.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-montserrat">
            {hasIntlLounge
              ? "Worldwide access network via Priority Pass, LoungeKey, or DragonPass"
              : "Standard foreign currency markup applies on international card swipes."}
          </div>
        </div>

      </div>

      {/* Spend Condition & Activation Advisory */}
      {spendCondition && (
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FEF6E4] border border-amber-300/80 flex items-start gap-3.5 shadow-2xs">
          <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs font-montserrat text-amber-950 leading-relaxed">
            <strong className="font-bold text-amber-900 block mb-0.5 text-xs sm:text-sm">
              Quarterly Spend Criteria for Lounge Access:
            </strong>
            {spendCondition}
          </div>
        </div>
      )}

    </section>
  );
}
