"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  X,
} from "lucide-react";
import { CardStructure } from "../utils";
import { useApplyModal } from "../context/ApplyModalContext";

type CardCategory = "all" | "luxury" | "travel" | "cashback" | "rewards";

const categoryTabs: { id: CardCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Premium Cards", icon: <CreditCardIcon className="w-4 h-4" /> },
  { id: "luxury", label: "Super Premium & Luxury", icon: <Crown className="w-4 h-4" /> },
  { id: "travel", label: "Travel & Airport Lounges", icon: <Plane className="w-4 h-4" /> },
  { id: "cashback", label: "Cashback & Shopping", icon: <Percent className="w-4 h-4" /> },
  { id: "rewards", label: "High Rewards & Lifestyle", icon: <Gift className="w-4 h-4" /> },
];

interface Props {
  creditCards: CardStructure[] | null;
}

export default function CreditCardShowcase({ creditCards }: Props) {
  const { openApplyModal } = useApplyModal();
  const [selectedCategory, setSelectedCategory] = useState<CardCategory>("all");
  const [selectedCardModal, setSelectedCardModal] = useState<CardStructure | null>(null);

  const cardsList = creditCards || [];

  const filteredCards = cardsList.filter((card) => {
    if (selectedCategory === "all") return true;
    const categories = (card.category || []).map((c) => c.toLowerCase());
    if (selectedCategory === "luxury") {
      return categories.some((c) =>
        ["luxury", "premium", "super-premium", "lifestyle"].includes(c)
      );
    }
    if (selectedCategory === "travel") {
      return categories.some((c) =>
        ["travel", "lounge", "forex", "airlines", "flights"].includes(c)
      );
    }
    if (selectedCategory === "cashback") {
      return categories.some((c) =>
        ["cashback", "shopping", "fuel", "groceries", "upi"].includes(c)
      );
    }
    if (selectedCategory === "rewards") {
      return categories.some((c) =>
        ["rewards", "lifestyle", "dining", "entertainment"].includes(c)
      );
    }
    return false;
  });

  return (
    <section id="credit-cards" className="py-22 px-6 relative bg-linear-to-b from-[#F3F0DF]/40 via-white to-[#F3F0DF]/30 overflow-hidden">

      {/* Decorative background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-200 h-125 bg-linear-to-br from-[#B6CC9A]/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

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
            <div className="w-16 h-px bg-linear-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-linear-to-l from-transparent to-primary/30" />
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
        {filteredCards.length > 0 ? (
          <div className="flex flex-wrap gap-8">
            {filteredCards.map((card, idx) => {
              const perks = (card.keyHighlights && card.keyHighlights.length > 0)
                ? card.keyHighlights.slice(0, 3)
                : (card.welcomeBenefits && card.welcomeBenefits.length > 0)
                ? card.welcomeBenefits.slice(0, 3)
                : card.description ? [card.description] : [];

              return (
                <div
                  key={card.id}
                  className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 reveal-on-scroll ${
                    idx % 3 === 1 ? "delay-100" : idx % 3 === 2 ? "delay-200" : ""
                  }`}
                >

                  {/* ── Card Graphic & Header ── */}
                  <div className="p-6 pb-4">
                    {/* Bank / Network Header */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      {card.logo ? (
                        <div className="h-6 w-auto relative">
                          <Image
                            src={card.logo}
                            alt={card.issuer}
                            width={75}
                            height={22}
                            className="h-6 w-auto object-contain"
                          />
                        </div>
                      ) : (
                        <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-primary">
                          {card.issuer}
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {card.network}
                      </span>
                    </div>

                    {/* Card Graphic Mockup */}
                    <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden drop-shadow-md drop-shadow-gray-50 flex items-center justify-center">
                      {card?.cardImage ? (
                        <Image
                          src={card?.cardImage}
                          alt={card?.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#0a192f] via-[#102a43] to-[#040e1a] p-5 rounded-2xl flex flex-col justify-between text-white border border-blue-900/40 shadow-inner">
                          <div className="flex justify-between items-center relative z-10">
                            <span className="font-montserrat font-bold text-xs tracking-wider uppercase opacity-90">
                              {card.issuer}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/20">
                              {card.network}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 relative z-10 my-auto">
                            <div className="w-9 h-7 rounded-md bg-[#d4af37] shadow-inner border border-white/30 flex items-center justify-around px-1">
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
                            <span className="font-bricolage font-extrabold text-xs tracking-wider uppercase opacity-90">
                              {card.network}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Title & Badge */}
                    <div className="mt-4">
                      {card.badge && (
                        <div className="inline-block text-[11px] font-bold text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15 mb-2 truncate max-w-full">
                          {card.badge}
                        </div>
                      )}
                      <h3 className="font-bricolage font-bold text-xl text-gray-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {card.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-montserrat mt-0.5">
                        {card.issuer} • {card.categoryLabel || card.network}
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex-1 bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                          Joining / Annual Fee
                        </span>
                        <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
                          {card.annualFee || card.joiningFee || "Nil"}
                        </span>
                      </div>
                      <div className="flex-1 bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                          Reward Rate
                        </span>
                        <span className="text-xs font-bold text-emerald-700 font-montserrat block mt-0.5 truncate">
                          {card.rewardRate?.headline || card.rewardRate?.base || "Up to 5% Rewards"}
                        </span>
                      </div>
                    </div>

                    {/* Top Perks Bullet */}
                    {perks.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <ul className="space-y-1.5">
                          {perks.map((perk, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-montserrat">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="line-clamp-1">{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                  {/* ── Card Footer & Actions ── */}
                  <div className="p-6 pt-4 bg-gray-50/60 border-t border-gray-100 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedCardModal(card)}
                      className="flex-1 text-xs font-bold text-primary bg-white hover:bg-primary/5 py-3 px-4 rounded-xl border border-primary/20 transition-colors duration-200 text-center cursor-pointer font-montserrat"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() =>
                        openApplyModal(card.name, `${card.issuer} • ${card.badge || card.categoryLabel || "Credit Card"}`)
                      }
                      className="flex-1 text-xs font-bold text-white bg-primary hover:bg-primary/90 py-3 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer font-montserrat"
                    >
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm max-w-lg mx-auto">
            <CreditCardIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bricolage font-bold text-lg text-gray-800">
              No cards found in this category
            </h3>
            <p className="text-xs text-gray-500 font-montserrat mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any featured cards matching this filter. Switch to all cards or explore our full collection.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-all font-montserrat cursor-pointer"
              >
                Show All Featured Cards
              </button>
              <Link
                href="/credit-cards"
                className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-200 transition-all font-montserrat"
              >
                Browse All Cards
              </Link>
            </div>
          </div>
        )}

        {/* ── View All Cards Link ────────────────────────────────────────── */}
        <div className="text-center mt-12">
          <Link
            href="/credit-cards"
            className="inline-flex items-center gap-2 bg-white text-primary border border-primary/30 hover:border-primary hover:bg-primary hover:text-white px-7 py-3.5 rounded-xl font-montserrat text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>Explore All Credit Cards</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Bottom Value Banner: Card Eligibility & Pre-Approval ──────── */}
        <div className="mt-16 bg-linear-to-r from-primary via-[#04363a] to-primary rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden reveal-scale delay-150">
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
          <div className="fixed inset-0" onClick={() => setSelectedCardModal(null)} />
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10">

            {/* Close Button */}
            <button
              onClick={() => setSelectedCardModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 flex gap-4 items-start">
              {selectedCardModal.cardImage && (
                <div className="w-24 shrink-0">
                  <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden drop-shadow-sm bg-gray-50">
                    <Image
                      src={selectedCardModal.cardImage}
                      alt={selectedCardModal.name}
                      fill
                      sizes="100px"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15 inline-block">
                  {selectedCardModal.issuer}
                </span>
                <h3 className="font-bricolage font-bold text-2xl text-gray-900 mt-2 leading-snug">
                  {selectedCardModal.name}
                </h3>
                <p className="text-xs text-gray-500 font-montserrat mt-0.5">
                  {selectedCardModal.badge || selectedCardModal.categoryLabel} • {selectedCardModal.network}
                </p>
              </div>
            </div>

            {/* Welcome Benefits Box */}
            {selectedCardModal.welcomeBenefits && selectedCardModal.welcomeBenefits.length > 0 && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider font-montserrat">
                  <Gift className="w-4 h-4 text-amber-600" />
                  Welcome Benefits
                </div>
                <ul className="mt-2 space-y-1 text-xs font-semibold text-amber-950 font-montserrat">
                  {selectedCardModal.welcomeBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fee & Perks Details */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-montserrat">Annual Fee</h4>
                  <p className="text-xs font-bold text-gray-900 mt-0.5 font-montserrat">{selectedCardModal.annualFee || "Nil"}</p>
                  {selectedCardModal.feeWaiver && (
                    <p className="text-[11px] text-gray-500 mt-0.5 font-montserrat truncate" title={selectedCardModal.feeWaiver}>
                      Waiver: {selectedCardModal.feeWaiver}
                    </p>
                  )}
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-montserrat">Joining Fee</h4>
                  <p className="text-xs font-bold text-gray-900 mt-0.5 font-montserrat">{selectedCardModal.joiningFee || "Nil"}</p>
                  {selectedCardModal.forexMarkup && (
                    <p className="text-[11px] text-primary mt-0.5 font-montserrat truncate" title={selectedCardModal.forexMarkup}>
                      Forex: {selectedCardModal.forexMarkup}
                    </p>
                  )}
                </div>
              </div>

              {selectedCardModal.rewardRate && (
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80">
                  <h4 className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider font-montserrat flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Reward Structure
                  </h4>
                  {selectedCardModal.rewardRate.headline && (
                    <p className="text-xs font-bold text-emerald-900 font-montserrat">
                      {selectedCardModal.rewardRate.headline}
                    </p>
                  )}
                  {selectedCardModal.rewardRate.base && (
                    <p className="text-xs text-emerald-800 font-montserrat mt-1">
                      <strong>Base:</strong> {selectedCardModal.rewardRate.base}
                    </p>
                  )}
                  {selectedCardModal.rewardRate.accelerated && (
                    <p className="text-xs text-emerald-800 font-montserrat mt-0.5">
                      <strong>Accelerated:</strong> {selectedCardModal.rewardRate.accelerated}
                    </p>
                  )}
                </div>
              )}

              {selectedCardModal.loungeAccess && (
                <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-200/80">
                  <h4 className="text-[11px] font-bold text-sky-950 uppercase tracking-wider font-montserrat flex items-center gap-1.5 mb-1.5">
                    <Plane className="w-3.5 h-3.5 text-sky-600" />
                    Airport Lounge Access
                  </h4>
                  <div className="text-xs text-sky-900 font-montserrat space-y-1">
                    {selectedCardModal.loungeAccess.domestic && (
                      <p><strong>Domestic:</strong> {selectedCardModal.loungeAccess.domestic}</p>
                    )}
                    {selectedCardModal.loungeAccess.international && (
                      <p><strong>International:</strong> {selectedCardModal.loungeAccess.international}</p>
                    )}
                    {selectedCardModal.loungeAccess.spendCondition && (
                      <p className="text-[11px] text-sky-700 bg-white/70 p-1.5 rounded mt-1">
                        <strong>Condition:</strong> {selectedCardModal.loungeAccess.spendCondition}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {selectedCardModal.keyHighlights && selectedCardModal.keyHighlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-montserrat">Key Highlights</h4>
                  <ul className="space-y-2">
                    {selectedCardModal.keyHighlights.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-montserrat">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCardModal.editorialVerdict && (
                <div className="p-3.5 rounded-xl bg-[#EBF4ED] border border-primary/20">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block font-montserrat">
                    Grofi Verdict
                  </span>
                  <p className="text-xs text-gray-800 font-montserrat mt-1 leading-relaxed">
                    {selectedCardModal.editorialVerdict}
                  </p>
                  {selectedCardModal.bestFor && (
                    <p className="text-[11px] text-gray-600 font-montserrat mt-2 font-semibold">
                      Best For: <span className="text-primary font-bold">{selectedCardModal.bestFor}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal CTA */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedCardModal(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer font-montserrat"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const card = selectedCardModal;
                  setSelectedCardModal(null);
                  openApplyModal(card.name, `${card.issuer} • ${card.badge || card.categoryLabel || "Credit Card"}`);
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
