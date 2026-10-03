import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
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
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* ── Badge ─────────────────────────────────────────────────── */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-1.5 bg-[#FFF1F2] text-[#E11D48] px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border border-[#FFE4E6] font-montserrat shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
          <span>Side-by-Side Comparison Matrix</span>
        </div>
      </div>

      {/* ── Heading & Subtitle ────────────────────────────────────── */}
      <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0F172A] tracking-tight leading-tight break-words">
        Key {bankName} Cards at a Glance
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-[#64748B] font-montserrat mt-2 leading-relaxed max-w-3xl">
        Compare fees, maximum reward yields, airport lounge perks, and waiver milestones across flagship {bankName} cards.
      </p>

      {/* ── Table Card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden mt-6 sm:mt-8">
        
        {/* ── Mobile Stacked Cards View (< 768px) ── */}
        <div className="md:hidden divide-y divide-slate-100 font-montserrat">
          {cards.map((card) => {
            const subtitle = getCardSubtitle(card);
            const rewardHighlight = getRewardHighlight(card);
            const lounge = getLoungeDisplay(card);

            return (
              <div key={card.id} className="p-4 space-y-3.5">
                {/* Header row: Card Name + Apply Button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bricolage font-bold text-base text-[#0F172A] leading-snug break-words">
                      {card.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-montserrat mt-0.5 truncate">
                      {subtitle}
                    </p>
                  </div>
                  <ApplyTriggerButton
                    cardName={card.name}
                    cardSubtitle={`${card.issuer} • ${card.badge || "Credit Card"}`}
                    label="Apply"
                    variant="emerald"
                    className="px-3.5 py-1.5 text-xs font-bold shadow-xs hover:shadow-md shrink-0"
                  />
                </div>

                {/* Specs 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 min-w-0">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block font-montserrat truncate">
                      Annual Fee
                    </span>
                    <span className="text-xs font-bold text-[#0F172A] font-montserrat block mt-0.5 truncate">
                      {card.annualFee || "Nil"}
                    </span>
                  </div>

                  <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 min-w-0">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block font-montserrat truncate">
                      Waiver Spend
                    </span>
                    <span className="text-xs font-medium text-slate-700 font-montserrat block mt-0.5 truncate" title={card.feeWaiver}>
                      {card.feeWaiver || "No spend waiver"}
                    </span>
                  </div>

                  <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 min-w-0">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block font-montserrat truncate">
                      Airport Lounge
                    </span>
                    <span className="text-xs font-medium text-slate-700 font-montserrat block mt-0.5 truncate" title={lounge}>
                      {lounge}
                    </span>
                  </div>

                  <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 min-w-0">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block font-montserrat truncate">
                      Forex Markup
                    </span>
                    <span className="text-xs font-bold text-[#0F172A] font-montserrat block mt-0.5 truncate">
                      {card.forexMarkup || "3.50%"}
                    </span>
                  </div>
                </div>

                {/* Reward Highlight Banner */}
                {rewardHighlight && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-emerald-900 leading-snug break-words">
                      {rewardHighlight}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Desktop & Tablet Table (>= 768px) ── */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table Header */}
            <div className="flex items-center bg-[#F8FAFC] border-b border-slate-200 py-4 px-6 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#475569]">
              <div className="w-[22%] shrink-0 pr-4">CARD NAME</div>
              <div className="w-[13%] shrink-0 pr-4">ANNUAL FEE</div>
              <div className="w-[16%] shrink-0 pr-4">WAIVER SPEND</div>
              <div className="w-[21%] shrink-0 pr-4">REWARD HIGHLIGHT</div>
              <div className="w-[14%] shrink-0 pr-4">AIRPORT LOUNGE</div>
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
                    <div className="w-[22%] shrink-0 pr-4 min-w-0">
                      <h4 className="font-bricolage font-bold text-sm sm:text-base text-[#0F172A] leading-snug truncate">
                        {card.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-montserrat mt-0.5 truncate">
                        {subtitle}
                      </p>
                    </div>

                    {/* ANNUAL FEE */}
                    <div className="w-[13%] shrink-0 pr-4 min-w-0">
                      <span className="font-bold text-[#0F172A] text-sm sm:text-base font-montserrat truncate block">
                        {card.annualFee || "Nil"}
                      </span>
                    </div>

                    {/* WAIVER SPEND */}
                    <div className="w-[16%] shrink-0 pr-4 min-w-0">
                      <span className="text-xs text-slate-600 font-montserrat leading-relaxed block truncate" title={card.feeWaiver || "No spend waiver"}>
                        {card.feeWaiver || "No spend waiver"}
                      </span>
                    </div>

                    {/* REWARD HIGHLIGHT */}
                    <div className="w-[21%] shrink-0 pr-4 min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-[#16A34A] font-montserrat leading-relaxed block line-clamp-2" title={rewardHighlight}>
                        {rewardHighlight}
                      </span>
                    </div>

                    {/* AIRPORT LOUNGE */}
                    <div className="w-[14%] shrink-0 pr-4 min-w-0">
                      <span className="text-xs text-slate-700 font-montserrat leading-relaxed block line-clamp-2" title={lounge}>
                        {lounge}
                      </span>
                    </div>

                    {/* FOREX */}
                    <div className="w-[7%] shrink-0 pr-2 min-w-0">
                      <span className="font-bold text-[#0F172A] text-xs sm:text-sm font-montserrat truncate block">
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
