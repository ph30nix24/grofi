import React from "react";
import { Sparkles } from "lucide-react";
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
  if (!cards || cards.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* ── Badge ─────────────────────────────────────────────────── */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-1.5 bg-[#FFF1F2] text-[#E11D48] px-3.5 py-1 rounded-full text-xs font-semibold border border-[#FFE4E6] font-montserrat shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>Side-by-Side Comparison Matrix</span>
        </div>
      </div>

      {/* ── Heading & Subtitle ────────────────────────────────────── */}
      <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
        Key {bankName} Cards at a Glance
      </h2>
      <p className="text-sm sm:text-base text-[#64748B] font-montserrat mt-2 leading-relaxed max-w-3xl">
        Compare fees, maximum reward yields, airport lounge perks, and waiver milestones across flagship {bankName} cards.
      </p>

      {/* ── Table Card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <div className="min-w-255">
            {/* Table Header */}
            <div className="flex items-center bg-[#F8FAFC] border-b border-slate-200 py-4 px-6 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#475569]">
              <div className="w-[21%] shrink-0 pr-4">CARD NAME</div>
              <div className="w-[13%] shrink-0 pr-4">ANNUAL FEE</div>
              <div className="w-[16%] shrink-0 pr-4">WAIVER SPEND</div>
              <div className="w-[21%] shrink-0 pr-4">REWARD HIGHLIGHT</div>
              <div className="w-[15%] shrink-0 pr-4">AIRPORT LOUNGE</div>
              <div className="w-[7%] shrink-0 pr-2">FOREX</div>
              <div className="w-[7%] shrink-0 text-right"></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100 font-montserrat text-xs">
              {cards.map((card) => {
                const subtitle = getCardSubtitle(card);
                const rewardHighlight = getRewardHighlight(card);
                const lounge = getLoungeDisplay(card);

                return (
                  <div
                    key={card.id}
                    className="flex items-center px-6 py-5 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* CARD NAME */}
                    <div className="w-[21%] shrink-0 pr-4">
                      <h4 className="font-bricolage font-bold text-sm sm:text-base text-[#0F172A] leading-snug">
                        {card.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-montserrat mt-0.5">
                        {subtitle}
                      </p>
                    </div>

                    {/* ANNUAL FEE */}
                    <div className="w-[13%] shrink-0 pr-4">
                      <span className="font-bold text-[#0F172A] text-sm sm:text-base font-montserrat ">
                        {card.annualFee || "Nil"}
                      </span>
                    </div>

                    {/* WAIVER SPEND */}
                    <div className="w-[16%] shrink-0 pr-4">
                      <span className="text-xs text-slate-600 font-montserrat leading-relaxed block">
                        {card.feeWaiver || "No spend waiver"}
                      </span>
                    </div>

                    {/* REWARD HIGHLIGHT */}
                    <div className="w-[21%] shrink-0 pr-4">
                      <span className="text-xs sm:text-sm font-bold text-[#16A34A] font-montserrat leading-relaxed block">
                        {rewardHighlight}
                      </span>
                    </div>

                    {/* AIRPORT LOUNGE */}
                    <div className="w-[15%] shrink-0 pr-4">
                      <span className="text-xs text-slate-700 font-montserrat leading-relaxed block">
                        {lounge}
                      </span>
                    </div>

                    {/* FOREX */}
                    <div className="w-[7%] shrink-0 pr-2">
                      <span className="font-bold text-[#0F172A] text-xs sm:text-sm font-montserrat">
                        {card.forexMarkup || "3.50%"}
                      </span>
                    </div>

                    {/* ACTION */}
                    <div className="w-[7%] shrink-0 flex justify-end">
                      <ApplyTriggerButton
                        cardName={card.name}
                        cardSubtitle={`${card.issuer} • ${card.badge || "Credit Card"}`}
                        label="Apply"
                        variant="emerald"
                        className="px-3.5 py-1.5 text-xs font-bold shadow-xs hover:shadow-md"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
