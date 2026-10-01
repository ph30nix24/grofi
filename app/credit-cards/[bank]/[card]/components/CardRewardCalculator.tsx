"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Sparkles,
  TrendingUp,
  Percent,
  Coins,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Check,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardRewardCalculatorProps {
  card: CardStructure;
}

// Helper to parse numeric fee
function parseFeeNumber(feeStr?: string): number {
  if (!feeStr) return 0;
  if (/nil|free|₹0|zero/i.test(feeStr)) return 0;
  const match = feeStr.replace(/,/g, "").match(/₹?\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function CardRewardCalculator({ card }: CardRewardCalculatorProps) {
  const { openApplyModal } = useApplyModal();

  // Monthly spend slider state
  const [monthlySpend, setMonthlySpend] = useState<number>(50000);
  const [acceleratedRatio, setAcceleratedRatio] = useState<number>(40); // % spent on accelerated categories

  const annualFeeNum = parseFeeNumber(card.annualFee);

  // Estimate rewards yield percentage
  const rewardRateHeadline = card.rewardRate?.headline || "3%";
  const headlinePercentMatch = rewardRateHeadline.match(/(\d+(\.\d+)?)%/);
  const maxRate = headlinePercentMatch ? parseFloat(headlinePercentMatch[1]) : 3.5;
  const baseRate = Math.max(1.0, maxRate * 0.35);

  // Calculate annual earnings
  const {
    annualTotalSpend,
    annualGrossReward,
    isWaiverAchieved,
    netAnnualBenefit,
    pointsEstimate,
  } = useMemo(() => {
    const annualSpend = monthlySpend * 12;

    // Accelerated spend portion
    const accelSpend = annualSpend * (acceleratedRatio / 100);
    const baseSpend = annualSpend * ((100 - acceleratedRatio) / 100);

    const grossValue = (accelSpend * (maxRate / 100)) + (baseSpend * (baseRate / 100));

    // Check waiver target (approx check from feeWaiver string or 2.5L+ default)
    const waiverSpendTargetMatch = card.feeWaiver?.replace(/,/g, "").match(/₹?\s*(\d+)\s*(L|k|lakh)?/i);
    let waiverThreshold = 200000;
    if (waiverSpendTargetMatch) {
      const val = parseInt(waiverSpendTargetMatch[1], 10);
      const unit = (waiverSpendTargetMatch[2] || "").toLowerCase();
      if (unit.startsWith("l")) waiverThreshold = val * 100000;
      else if (unit.startsWith("k")) waiverThreshold = val * 1000;
      else waiverThreshold = val;
    }

    const achieved = annualFeeNum === 0 || annualSpend >= waiverThreshold;
    const finalFee = achieved ? 0 : annualFeeNum;
    const net = Math.round(grossValue - finalFee);

    // Approximate points
    const points = Math.round(grossValue * 2);

    return {
      annualTotalSpend: annualSpend,
      annualGrossReward: Math.round(grossValue),
      isWaiverAchieved: achieved,
      netAnnualBenefit: net,
      pointsEstimate: points,
    };
  }, [monthlySpend, acceleratedRatio, maxRate, baseRate, card.feeWaiver, annualFeeNum]);

  return (
    <section id="rewards-calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-gold" />
          <span>ESTIMATED VALUE CALCULATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          How Much Can You Save with the <span className="text-primary">{card.name}</span>?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Adjust your expected monthly card spends to calculate your real annual rewards and net savings.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Spend Controls & Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
          
          {/* Monthly Spend Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider font-montserrat">
                Estimated Monthly Spends
              </label>
              <span className="font-bricolage font-extrabold text-2xl text-primary">
                ₹{monthlySpend.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={10000}
              max={250000}
              step={5000}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-[11px] text-gray-400 font-montserrat mt-1 font-medium">
              <span>₹10,000 / mo</span>
              <span>₹1,00,000 / mo</span>
              <span>₹2,50,000+ / mo</span>
            </div>

            {/* Quick Spend Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[25000, 50000, 100000, 150000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMonthlySpend(preset)}
                  className={`text-xs font-montserrat font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    monthlySpend === preset
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  ₹{(preset / 1000).toFixed(0)}k/mo
                </button>
              ))}
            </div>
          </div>

          {/* Category Split Slider */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider font-montserrat">
                Online &amp; Accelerated Spends
              </label>
              <span className="font-bricolage font-bold text-lg text-emerald-800">
                {acceleratedRatio}% of spends
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={90}
              step={5}
              value={acceleratedRatio}
              onChange={(e) => setAcceleratedRatio(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <p className="text-[11px] text-gray-500 font-montserrat mt-1.5">
              Includes flight &amp; hotel bookings, partner brands (Amazon, Swiggy, Flipkart), dining, and online shopping.
            </p>
          </div>

          {/* Reward Specs Information Card */}
          {card.rewardRate && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200/90 text-xs font-montserrat space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                  Official Reward Rate Specs
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200 font-semibold text-gray-700">
                  {card.rewardRate.rewardCurrency || "Points"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <div className="bg-white p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Base Spends</span>
                  <span className="font-bold text-gray-900 text-xs block mt-0.5">
                    {card.rewardRate.base || "1X to 2X Points per ₹100"}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Accelerated Spends</span>
                  <span className="font-bold text-emerald-800 text-xs block mt-0.5">
                    {card.rewardRate.accelerated || card.rewardRate.headline}
                  </span>
                </div>
              </div>

              {card.rewardRate.pointValue && (
                <p className="text-[11px] text-gray-500 italic">
                  * Reward Point Value: {card.rewardRate.pointValue} on statement credit or travel bookings.
                </p>
              )}
            </div>
          )}

        </div>

        {/* Right: Net Calculation Output Ticket (5 cols) */}
        <div className="lg:col-span-5 bg-linear-to-br from-primary via-[#024045] to-[#012528] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between border border-primary/40">
          
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-gold mb-3 font-montserrat">
              <TrendingUp className="w-3.5 h-3.5 text-gold" />
              <span>Projected Annual Net Yield</span>
            </div>

            <span className="block text-xs font-montserrat text-white/70 uppercase tracking-wider font-semibold">
              Net Annual Savings &amp; Value
            </span>
            <div className="font-bricolage font-extrabold text-3xl sm:text-5xl text-white mt-1">
              ₹{netAnnualBenefit.toLocaleString("en-IN")}
            </div>

            <p className="text-xs text-white/80 font-montserrat mt-2">
              Based on annual spending of ₹{annualTotalSpend.toLocaleString("en-IN")}.
            </p>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 my-6 pt-6 border-t border-white/15 text-xs font-montserrat">
              
              <div className="flex items-center justify-between">
                <span className="text-white/75">Gross Reward Value</span>
                <span className="font-bold text-emerald-300">
                  +₹{annualGrossReward.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/75">Annual Renewal Fee</span>
                <span className="font-bold">
                  {annualFeeNum === 0 ? (
                    <span className="text-emerald-300">₹0 (Lifetime Free)</span>
                  ) : isWaiverAchieved ? (
                    <span className="text-emerald-300">Waived (₹0)</span>
                  ) : (
                    <span className="text-rose-300">-₹{annualFeeNum.toLocaleString("en-IN")}</span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/75">Estimated Reward Points</span>
                <span className="font-bold text-gold">
                  ~{pointsEstimate.toLocaleString("en-IN")} {card.rewardRate?.rewardCurrency || "Pts"}
                </span>
              </div>
            </div>

            {/* Fee Waiver Status Callout */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs font-montserrat mb-6">
              {isWaiverAchieved ? (
                <div className="flex items-start gap-2 text-emerald-300">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fee Waiver Achieved!</strong> Your spends surpass the annual waiver threshold, making your annual renewal ₹0.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-amber-200">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-gold" />
                  <span>
                    <strong>Tip:</strong> {card.feeWaiver || `Spend ₹2L+ annually to waive the ₹${annualFeeNum} annual fee.`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() =>
              openApplyModal(
                card.name,
                `Estimated Annual Value: ₹${netAnnualBenefit.toLocaleString("en-IN")}`
              )
            }
            className="w-full bg-gold hover:bg-gold/90 text-white font-montserrat font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
          >
            <span>Claim These Savings • Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
}
