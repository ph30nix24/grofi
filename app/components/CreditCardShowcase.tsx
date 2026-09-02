"use client";

import React, { useState } from "react";
import Image from 'next/image';
import {
  Sparkles,
  Plane,
  CreditCard as CreditCardIcon,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  Crown,
  Percent,
  Gift,
} from "lucide-react";
import { cardsData } from "../utils";
import { useApplyModal } from "../context/ApplyModalContext";

type CardCategory = "all" | "luxury" | "travel" | "cashback" | "rewards";

interface CreditCardItem {
  id: string;
  name: string;
  imgSrc?: string;
  bank: string;
  category: "luxury" | "travel" | "cashback" | "rewards";
  badge: string;
  annualFee: string;
  feeWaiver?: string;
  rewardRate: string;
  loungeAccess: string;
  cardType: "Metal" | "Plastic" | "RuPay";
  keyPerks: string[];
  welcomeBenefit: string;
  // Card Visual Styling details
  cardTheme: {
    bgStyle: string;
    borderStyle: string;
    textColor: string;
    chipColor: string;
    network: "VISA" | "Mastercard" | "AMEX" | "Diners Club" | "RuPay";
    artElement?: "centurion" | "feather" | "infinia-facets" | "emerald-cut" | "globe" | "chevron" | "silk" | "neu-dots" | "gold-leaf";
  };
  applyLink: string;
}


const categoryTabs: { id: CardCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Premium Cards", icon: <CreditCardIcon className="w-4 h-4" /> },
  { id: "luxury", label: "Super Premium & Luxury", icon: <Crown className="w-4 h-4" /> },
  { id: "travel", label: "Travel & Airport Lounges", icon: <Plane className="w-4 h-4" /> },
  { id: "cashback", label: "Cashback & Shopping", icon: <Percent className="w-4 h-4" /> },
  { id: "rewards", label: "High Rewards & Lifestyle", icon: <Gift className="w-4 h-4" /> },
];

export default function CreditCardShowcase() {
  const { openApplyModal } = useApplyModal();
  const [selectedCategory, setSelectedCategory] = useState<CardCategory>("all");
  const [selectedCardModal, setSelectedCardModal] = useState<CreditCardItem | null>(null);

  const filteredCards = cardsData.filter((card) => {
    if (selectedCategory === "all") return true;
    return card.category === selectedCategory;
  });

  return (
    <section id="credit-cards" className="py-22 px-6 relative bg-gradient-to-b from-[#F3F0DF]/40 via-white to-[#F3F0DF]/30 overflow-hidden">

      {/* Decorative background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-[#B6CC9A]/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Curated Elite Portfolio
          </div>

          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Explore India’s Most{" "}
            <span className="text-gold relative inline-block">
              Rewarding Credit Cards
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/20 rounded-full" />
            </span>
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            From invite-only luxury metal cards to high-yield cashback champions. Compare welcome bonuses, airport lounge privileges, and rewards tailored for your lifestyle.
          </p>
        </div>

        {/* ── Category Filter Tabs ─────────────────────────────────────── */}
        <div className="flex justify-center mb-12 reveal-on-scroll delay-100">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-2 max-w-full overflow-x-auto">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-montserrat text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Cards Showcase Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card, idx) => (
            <div
              key={card.id}
              className={`bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 reveal-on-scroll ${
                idx % 3 === 1 ? "delay-100" : idx % 3 === 2 ? "delay-200" : ""
              }`}
            >

              {/* ── Card Graphic & Header ── */}
              <div className="p-6 pb-4">
                {card.imgSrc?.length === 0 ? (
                  <div
                    className={`relative w-full aspect-[1.586/1] rounded-2xl p-5 ${card.cardTheme.bgStyle} ${card.cardTheme.textColor} border ${card.cardTheme.borderStyle} shadow-xl flex flex-col justify-between overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    {card.cardTheme.artElement === "infinia-facets" && (
                      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-indigo-600 to-transparent" />
                    )}
                    {card.cardTheme.artElement === "feather" && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-28 h-28 opacity-40 pointer-events-none bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-xl" />
                    )}
                    {card.cardTheme.artElement === "centurion" && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-gray-500/30 flex items-center justify-center opacity-30">
                        <div className="w-14 h-14 rounded-full border border-dashed border-gray-400" />
                      </div>
                    )}
                    {card.cardTheme.artElement === "emerald-cut" && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent opacity-40" />
                    )}
                    {card.cardTheme.artElement === "chevron" && (
                      <div className="absolute right-0 top-0 bottom-0 w-16 bg-yellow-400/20 clip-path-chevron pointer-events-none" />
                    )}
                    {card.cardTheme.artElement === "gold-leaf" && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-yellow-200/30 via-transparent to-transparent opacity-50" />
                    )}
                    {card.cardTheme.artElement === "globe" && (
                      <div className="absolute right-2 bottom-2 w-24 h-24 rounded-full border border-white/10 opacity-30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-white/15" />
                      </div>
                    )}

                    <div className="flex items-center justify-between relative z-10">
                      <span className="font-montserrat font-bold text-xs tracking-wider uppercase opacity-90">
                        {card.bank}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/20">
                        {card.cardType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 relative z-10 my-auto">
                      <div
                        className={`w-9 h-7 rounded-md ${card.cardTheme.chipColor} shadow-inner border border-white/30 flex items-center justify-around px-1`}
                      >
                        <div className="w-px h-full bg-black/20" />
                        <div className="w-px h-full bg-black/20" />
                      </div>
                      <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M8.5 16.5a5 5 0 0 1 0-9M12 19a8.5 8.5 0 0 0 0-14M15.5 21.5a12 12 0 0 0 0-19" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex items-end justify-between relative z-10">
                      <div>
                        <p className="font-bricolage font-bold text-sm tracking-wide leading-tight">
                          {card.name}
                        </p>
                        <p className="text-[10px] font-mono tracking-widest opacity-60 mt-0.5">
                          •••• •••• •••• 8824
                        </p>
                      </div>
                      <span className="font-bricolage font-extrabold text-sm tracking-wider uppercase opacity-90">
                        {card.cardTheme.network}
                      </span>
                    </div>

                  </div>
                ) : (
                  <div className="w-full h-fit relative">
                    <Image
                      src={card.imgSrc ?? ''}
                      alt={card.id}
                      width={400}
                      height={100}
                      className="rounded-xl"
                    />
                  </div>
                )}

                {/* Card Title & Badge */}
                <div className="mt-5">
                  <div className="inline-block text-[11px] font-bold text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15 mb-2">
                    {card.badge}
                  </div>
                  <h3 className="font-bricolage font-bold text-xl text-gray-900 leading-snug">
                    {card.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-montserrat mt-0.5">{card.bank}</p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Joining / Annual Fee
                    </span>
                    <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5">
                      {card.annualFee}
                    </span>
                  </div>
                  <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Reward Rate
                    </span>
                    <span className="text-xs font-bold text-emerald-700 font-montserrat block mt-0.5">
                      {card.rewardRate}
                    </span>
                  </div>
                </div>

                {/* Top Perks Bullet */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <ul className="space-y-1.5">
                    {card.keyPerks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-montserrat">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* ── Card Footer & Actions ── */}
              <div className="p-6 pt-4 bg-gray-50/60 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCardModal(card)}
                  className="flex-1 text-xs font-bold text-primary bg-white hover:bg-primary/5 py-3 px-4 rounded-xl border border-primary/20 transition-colors duration-200 text-center cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => openApplyModal(card.name, `${card.bank} • ${card.badge}`)}
                  className="flex-1 text-xs font-bold text-white bg-primary hover:bg-primary/90 py-3 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ── Bottom Value Banner: Card Eligibility & Pre-Approval ──────── */}
        <div className="mt-16 bg-gradient-to-r from-primary via-[#04363a] to-primary rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden reveal-scale delay-150">
          <div className="absolute right-0 top-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-[#B6CC9A] mb-3">
              <ShieldCheck className="w-4 h-4 text-gold" />
              100% Free • No Impact on Credit Score
            </div>
            <h3 className="font-bricolage font-bold text-2xl sm:text-3xl text-white">
              Not sure which card is right for you?
            </h3>
            <p className="text-white/70 text-sm font-montserrat mt-2">
              Check your pre-approved credit card offers across 10+ partner banks instantly based on your income and spending preferences.
            </p>
          </div>

          <div className="relative z-10 flex sm:flex-row flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => openApplyModal("Credit Card Pre-Approved Offers", "Check pre-approved luxury, travel and cashback credit cards tailored for you.")}
              className="bg-gold hover:bg-gold/90 text-white text-sm font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap font-montserrat"
            >
              Check Pre-Approved Offers
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────── */}
      {selectedCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp">

            {/* Close Button */}
            <button
              onClick={() => setSelectedCardModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15">
                {selectedCardModal.bank}
              </span>
              <h3 className="font-bricolage font-bold text-2xl text-gray-900 mt-2">
                {selectedCardModal.name}
              </h3>
              <p className="text-xs text-gray-500 font-montserrat">{selectedCardModal.badge}</p>
            </div>

            {/* Welcome Bonus Box */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Gift className="w-4 h-4 text-amber-600" />
                Welcome Benefit
              </div>
              <p className="text-xs font-semibold text-amber-950 mt-1 font-montserrat">
                {selectedCardModal.welcomeBenefit}
              </p>
            </div>

            {/* Fee & Perks Details */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fee Structure</h4>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{selectedCardModal.annualFee}</p>
                {selectedCardModal.feeWaiver && (
                  <p className="text-xs text-gray-500 mt-0.5 font-montserrat">
                    Fee Waiver: {selectedCardModal.feeWaiver}
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Airport Lounge Access</h4>
                <p className="text-xs text-gray-700 mt-0.5 font-montserrat font-medium">
                  {selectedCardModal.loungeAccess}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Highlights</h4>
                <ul className="mt-2 space-y-2">
                  {selectedCardModal.keyPerks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-montserrat">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal CTA */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedCardModal(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const card = selectedCardModal;
                  setSelectedCardModal(null);
                  openApplyModal(card.name, `${card.bank} • ${card.badge}`);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-3.5 rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer font-montserrat"
              >
                Apply Online <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
