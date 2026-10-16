"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { CardStructure } from "../../components/type";
import ApplyTriggerButton from "./ApplyTriggerButton";

interface ComparisonMatrixSectionProps {
  bankName: string;
  cards: CardStructure[];
}

function getCardSubtitle(card: CardStructure): string {
  if (card.categoryLabel) return card.categoryLabel;
  if (card.badge) return card.badge;
  if (card.bestFor) return card.bestFor;
  return "Rewards & Cashback";
}

function getRewardHighlight(card: CardStructure): string {
  if (card.rewardRate?.headline) return card.rewardRate.headline;
  if (card.rewardRate?.accelerated) return card.rewardRate.accelerated;
  if (card.keyHighlights && card.keyHighlights[0]) return card.keyHighlights[0];
  return "Earn accelerated rewards on retail spends";
}

function getLoungeDisplay(card: CardStructure): string {
  if (!card.loungeAccess) return "Not available";
  const dom = card.loungeAccess.domestic;
  const intl = card.loungeAccess.international;

  if (dom && intl && !/not available|none/i.test(intl)) {
    return `${dom} (Int: ${intl})`;
  }
  if (dom) return dom;
  if (intl && !/not available|none/i.test(intl)) return intl;
  return "Not available";
}

export default function ComparisonMatrixSection({
  bankName,
  cards,
}: ComparisonMatrixSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [cards]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -240 : 240;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (!cards || cards.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0 overflow-hidden">
      {/* ── Section Header with Navigation Controls ───────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F2] text-[#E11D48] px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border border-[#FFE4E6] font-montserrat shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
            <span>Side-by-Side Comparison Matrix</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0F172A] tracking-tight leading-tight wrap-break-word">
            Key {bankName} Cards at a Glance
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#64748B] font-montserrat mt-1.5 leading-relaxed max-w-2xl">
            Compare fees, maximum reward yields, airport lounge perks, and waiver milestones across flagship {bankName} cards side by side.
          </p>
        </div>

        {/* Scroll Controls & Counter */}
        <div className="flex items-center gap-2 self-start sm:self-end shrink-0">
          <span className="text-[11px] font-semibold text-slate-500 font-montserrat hidden sm:inline">
            Comparing {cards.length} cards
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-white text-slate-700 hover:text-primary hover:border-primary/40 shadow-2xs cursor-pointer active:scale-95"
                  : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
              }`}
              title="Previous cards"
              aria-label="Scroll left to previous cards"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-white text-slate-700 hover:text-primary hover:border-primary/40 shadow-2xs cursor-pointer active:scale-95"
                  : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
              }`}
              title="Next cards"
              aria-label="Scroll right to next cards"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Swipe Guidance Banner ── */}
      <div className="sm:hidden flex items-center justify-between bg-slate-100/90 border border-slate-200/80 px-3 py-2 rounded-xl mb-3 text-[11px] font-montserrat text-slate-600">
        <span className="font-semibold text-slate-700">Side-by-side view ({cards.length} cards)</span>
        <span className="text-primary font-bold">← Swipe horizontally →</span>
      </div>

      {/* ── True Side-by-Side Matrix Table ────────────────────────── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scroll-smooth scrollbar-hidden"
        >
          <table className="w-max min-w-full border-collapse font-montserrat text-xs text-left">
            <thead>
              {/* Card Profile Header Row */}
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="sticky left-0 z-30 bg-slate-50/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 align-bottom shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Card Specs
                  </span>
                  <span className="font-bricolage font-bold text-sm sm:text-base text-slate-900 block mt-0.5">
                    Comparison
                  </span>
                </th>
                {cards.map((card) => {
                  const subtitle = getCardSubtitle(card);
                  return (
                    <th
                      key={card.id}
                      className="p-3.5 sm:p-5 w-47.5 sm:w-56.25 md:w-61.25 max-w-61.25 align-top border-r border-slate-100 last:border-r-0"
                    >
                      {/* Card Thumbnail */}
                      <div className="w-24 sm:w-28 mb-3">
                        <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-md bg-slate-100">
                          {card.cardImage ? (
                            <Image
                              src={card.cardImage}
                              alt={card.name}
                              fill
                              sizes="120px"
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-tr from-primary to-[#035259] flex items-center justify-center p-2 text-white text-center font-bricolage text-[10px] font-bold">
                              {card.name}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Badge */}
                      {card.badge && (
                        <span className="inline-block text-[9px] sm:text-[10px] font-bold text-primary bg-[#EBF4ED] px-2 py-0.5 rounded-full border border-primary/15 mb-1.5 truncate max-w-full">
                          {card.badge}
                        </span>
                      )}

                      {/* Card Name */}
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2">
                        {card.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 truncate">
                        {subtitle}
                      </p>

                      {/* Top Quick Apply Button */}
                      <div className="mt-3">
                        <ApplyTriggerButton
                          cardName={card.name}
                          cardSubtitle={`${card.issuer} • ${card.badge || "Credit Card"}`}
                          label="Apply"
                          variant="emerald"
                          className="w-full py-1.5 text-xs font-bold shadow-xs hover:shadow-md"
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Row 1: Annual Fee */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="sticky left-0 z-20 bg-white/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Annual Fee</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Per year</span>
                  </div>
                </td>
                {cards.map((card) => {
                  const isFree =
                    /nil|free|₹0/i.test(card.annualFee || "") ||
                    /lifetime free/i.test(card.badge || "");
                  return (
                    <td
                      key={card.id}
                      className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                    >
                      <span
                        className={`text-xs sm:text-sm font-montserrat ${
                          isFree
                            ? "text-emerald-700 font-extrabold"
                            : "text-slate-900 font-bold"
                        }`}
                      >
                        {card.annualFee || "Nil"}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Row 2: Joining Fee */}
              <tr className="hover:bg-slate-50/50 transition-colors bg-slate-50/20">
                <td className="sticky left-0 z-20 bg-slate-50/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Joining Fee</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">One-time fee</span>
                  </div>
                </td>
                {cards.map((card) => (
                  <td
                    key={card.id}
                    className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {card.joiningFee || "Nil"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 3: Fee Waiver Spend */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="sticky left-0 z-20 bg-white/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Waiver Spend</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Annual milestone</span>
                  </div>
                </td>
                {cards.map((card) => (
                  <td
                    key={card.id}
                    className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                  >
                    <span
                      className="text-xs text-slate-700 leading-snug line-clamp-2"
                      title={card.feeWaiver || "No spend waiver"}
                    >
                      {card.feeWaiver || "No spend waiver"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 4: Reward Highlight */}
              <tr className="hover:bg-slate-50/50 transition-colors bg-slate-50/20">
                <td className="sticky left-0 z-20 bg-slate-50/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Reward Rate</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Top cashback &amp; perks</span>
                  </div>
                </td>
                {cards.map((card) => {
                  const rewardHighlight = getRewardHighlight(card);
                  return (
                    <td
                      key={card.id}
                      className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                    >
                      <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100/90 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] sm:text-xs font-semibold text-emerald-900 leading-snug line-clamp-3">
                          {rewardHighlight}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row 5: Airport Lounge Access */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="sticky left-0 z-20 bg-white/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Airport Lounge</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Terminal access</span>
                  </div>
                </td>
                {cards.map((card) => {
                  const lounge = getLoungeDisplay(card);
                  return (
                    <td
                      key={card.id}
                      className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                    >
                      <span
                        className="text-xs text-slate-700 leading-snug line-clamp-2"
                        title={lounge}
                      >
                        {lounge}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Row 6: Forex Markup */}
              <tr className="hover:bg-slate-50/50 transition-colors bg-slate-50/20">
                <td className="sticky left-0 z-20 bg-slate-50/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Forex Markup</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Int&apos;l currency</span>
                  </div>
                </td>
                {cards.map((card) => (
                  <td
                    key={card.id}
                    className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {card.forexMarkup || "3.50%"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 7: Best Suited For */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="sticky left-0 z-20 bg-white/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-900 font-bold">Best Suited For</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Target category</span>
                  </div>
                </td>
                {cards.map((card) => (
                  <td
                    key={card.id}
                    className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                  >
                    <span className="text-xs font-medium text-slate-600 line-clamp-2">
                      {card.bestFor || card.categoryLabel || "Shopping & Rewards"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 8: Action Bottom CTA */}
              <tr className="bg-slate-50/60">
                <td className="sticky left-0 z-20 bg-slate-50/95 backdrop-blur-xs p-3.5 sm:p-5 w-27.5 sm:w-33.75 md:w-40 font-bold text-slate-700 shadow-[3px_0_10px_-2px_rgba(0,0,0,0.07)] border-r border-slate-200">
                  <span className="block text-xs text-slate-900 font-bold">Action</span>
                  <span className="text-[10px] text-slate-400 font-normal hidden sm:block">Digital application</span>
                </td>
                {cards.map((card) => (
                  <td
                    key={card.id}
                    className="p-3.5 sm:p-5 border-r border-slate-100 last:border-r-0 align-middle"
                  >
                    <ApplyTriggerButton
                      cardName={card.name}
                      cardSubtitle={`${card.issuer} • ${card.badge || "Credit Card"}`}
                      label="Apply Now"
                      variant="emerald"
                      className="w-full py-2.5 min-h-10 text-xs font-bold shadow-xs hover:shadow-md"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
