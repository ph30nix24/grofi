"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  Search,
  X,
  ChevronDown,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { CardStructure } from "./type";

interface FaqItem {
  id: string;
  question: string;
  answer: string[];
  proTip?: string;
}

interface CardFaqSectionProps {
  card: CardStructure;
  extraFaqs?: { question: string; answer: string }[];
}

export default function CardFaqSection({ card, extraFaqs }: CardFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    faq_annual_fee: true,
    faq_reward_points: true,
  });
  const [feedbackState, setFeedbackState] = useState<Record<string, "yes" | "no">>({});

  // Curated FAQs for this specific card
  const faqs: FaqItem[] = useMemo(() => {
    const list: FaqItem[] = [
      {
        id: "faq_annual_fee",
        question: `How can I waive the annual renewal fee on the ${card.name}?`,
        answer: [
          `The annual renewal fee for ${card.name} is ${card.annualFee || "Nil"}.`,
          card.feeWaiver
            ? `You can have this fee completely waived by meeting the annual spend milestone: ${card.feeWaiver}. Spends across retail, online shopping, travel, dining, and utility payments count towards this milestone.`
            : `Please check your official card statement for milestone fee waiver notifications or contact ${card.issuer} customer support.`,
        ],
        proTip: `Plan large expenses (such as school fees, insurance premiums, consumer electronics, and holiday travel) on this card to comfortably cross the annual waiver milestone.`,
      },
      {
        id: "faq_reward_points",
        question: `What is the reward yield on ${card.name} and how do I redeem points?`,
        answer: [
          `The ${card.name} features: ${card.rewardRate?.headline || "competitive reward yields across eligible card transactions"}.`,
          `Base reward: ${card.rewardRate?.base || "Standard reward rate on regular retail purchases"}.`,
          `Accelerated reward: ${card.rewardRate?.accelerated || "Higher rewards on partner merchants, dining & travel"}.`,
          `Reward points can be redeemed directly via the ${card.issuer} netbanking portal or mobile app for statement cash credit, flight tickets, hotel bookings, or brand shopping vouchers.`,
        ],
        proTip: `For highest value per point, redeem your ${card.rewardRate?.rewardCurrency || "points"} for airline air-miles or direct flight and hotel bookings.`,
      },
      {
        id: "faq_lounge",
        question: `How do I activate airport lounge access on the ${card.name}?`,
        answer: [
          `Domestic Lounges: ${card.loungeAccess?.domestic || "Check terms"}. Simply swipe your physical ${card.name} at participating terminal lounges in India. A nominal authorization charge of ₹2 (Visa/Mastercard) or ₹25 (RuPay) will be temporarily placed and reversed.`,
          `International Lounges: ${card.loungeAccess?.international || "Not available"}. If international lounge access is bundled, generate your digital Priority Pass / LoungeKey barcode through your cardholder portal.`,
          card.loungeAccess?.spendCondition
            ? `Note: ${card.loungeAccess.spendCondition}`
            : `Access is complimentary subject to published card tier guidelines.`,
        ],
        proTip: `Download the lounge companion app (such as DreamFolks or Priority Pass) before traveling to check lounge capacity and terminal locations in advance.`,
      },
      {
        id: "faq_cibil",
        question: `Will checking eligibility for ${card.name} on Grofi reduce my CIBIL score?`,
        answer: [
          `No. Eligibility checks initiated through Grofi utilize soft inquiry protocols that have absolutely ZERO negative impact on your credit score.`,
          `A formal hard inquiry is only initiated by ${card.issuer} if and when you decide to proceed with the final bank application submission.`,
        ],
        proTip: `Consistently keeping your total card credit utilization below 30% significantly improves your approval odds for premium cards.`,
      },
      {
        id: "faq_delivery",
        question: `How long does it take to receive the ${card.name} after applying?`,
        answer: [
          `Digital verification and approval typically take between 15 minutes to 24 hours after Video KYC completion.`,
          `Your virtual card becomes active immediately inside your ${card.issuer} mobile app for online transactions, while the physical card is securely delivered to your registered address within 3 to 5 business days.`,
        ],
        proTip: `Keep your physical PAN card and registered Aadhaar mobile number handy during Video KYC to complete approval in a single seamless call.`,
      },
    ];

    // Append extra bank-level FAQs if available
    if (extraFaqs && extraFaqs.length > 0) {
      extraFaqs.forEach((item, i) => {
        list.push({
          id: `extra_faq_${i}`,
          question: item.question,
          answer: [item.answer],
        });
      });
    }

    return list;
  }, [card, extraFaqs]);

  // Filter FAQs based on search
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.some((a) => a.toLowerCase().includes(q)) ||
        (f.proTip && f.proTip.toLowerCase().includes(q))
    );
  }, [faqs, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setFeedback = (id: string, val: "yes" | "no") => {
    setFeedbackState((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <section
      id="faqs"
      aria-label="Frequently Asked Questions"
      className="py-12 sm:py-16 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200/90"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <HelpCircle className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
          Everything You Need to Know About <span className="text-primary">{card.name}</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          Clear answers on fee waivers, reward points redemption, lounge rules, and approval timelines.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g., fee waiver, lounge, CIBIL, points)..."
            aria-label="Search FAQs"
            className="w-full bg-white pl-11 pr-10 py-3.5 rounded-2xl border border-gray-200/90 text-xs sm:text-sm font-montserrat text-gray-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5 sm:space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = Boolean(openItems[faq.id]);
            const feedback = feedbackState[faq.id];

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/60 transition-colors"
                >
                  <span className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180 bg-primary/10 text-primary" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-gray-600 font-montserrat space-y-3 border-t border-gray-100">
                    {faq.answer.map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}

                    {faq.proTip && (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-amber-950 mt-3">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed">
                          <strong>Grofi Pro Tip:</strong> {faq.proTip}
                        </span>
                      </div>
                    )}

                    {/* Feedback row */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                      <span>Was this answer helpful?</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFeedback(faq.id, "yes")}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            feedback === "yes"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                              : "hover:bg-gray-100 border-gray-200 text-gray-600"
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Yes</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFeedback(faq.id, "no")}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            feedback === "no"
                              ? "bg-rose-50 text-rose-700 border-rose-300 font-bold"
                              : "hover:bg-gray-100 border-gray-200 text-gray-600"
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>No</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-8 space-y-3">
            <p className="text-sm font-montserrat text-gray-600">
              No questions found matching &ldquo;<span className="font-bold text-gray-900">{searchQuery}</span>&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-primary hover:underline font-montserrat cursor-pointer"
            >
              Reset Search &amp; View All FAQs
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
