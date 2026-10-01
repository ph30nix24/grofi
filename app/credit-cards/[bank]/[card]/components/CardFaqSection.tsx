"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  Search,
  X,
  ChevronDown,
  Lightbulb,
  CheckCircle2,
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
    faq_0: true,
    faq_1: true,
  });
  const [feedbackState, setFeedbackState] = useState<Record<string, "yes" | "no">>({});

  // Default curated FAQs for this card
  const faqs: FaqItem[] = useMemo(() => {
    const list: FaqItem[] = [
      {
        id: "faq_annual_fee",
        question: `How can I waive the annual renewal fee on the ${card.name}?`,
        answer: [
          `The annual renewal fee for ${card.name} is ${card.annualFee || "Nil"}.`,
          card.feeWaiver
            ? `You can have this fee completely waived by meeting the annual spend milestone: ${card.feeWaiver}. Spends across retail, online, dining, and utility payments count towards this milestone.`
            : `Please check your official card statement for milestone fee waiver notifications or contact ${card.issuer} customer support.`,
        ],
        proTip: `Plan large expenses (such as school fees, insurance, electronics, and travel bookings) on this card to comfortably cross the fee waiver milestone.`,
      },
      {
        id: "faq_reward_points",
        question: `What is the reward rate on ${card.name} and how do I redeem points?`,
        answer: [
          `The ${card.name} features: ${card.rewardRate?.headline || "attractive reward yields across all purchases"}.`,
          `Base reward: ${card.rewardRate?.base || "Standard reward rate on retail spends"}.`,
          `Accelerated reward: ${card.rewardRate?.accelerated || "Higher rewards on partner merchants and travel"}.`,
          `Reward points can be redeemed directly via the ${card.issuer} netbanking portal or mobile app for statement cash credit, flight tickets, hotel stays, or brand shopping vouchers.`,
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
            : `Access is complimentary as per published card tier guidelines.`,
        ],
        proTip: `Download the lounge network companion app (such as DreamFolks or Priority Pass) before traveling to check lounge capacity and location in advance.`,
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

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.some((line) => line.toLowerCase().includes(q))
    );
  }, [faqs, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => (allOpen[f.id] = true));
    setOpenItems(allOpen);
  };

  const handleCollapseAll = () => setOpenItems({});

  const allExpanded =
    filteredFaqs.length > 0 && filteredFaqs.every((f) => openItems[f.id]);

  return (
    <section id="faqs" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Everything You Need to Know About <span className="text-primary">{card.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Clear answers to common questions regarding annual fees, reward redemption, lounge rules, and delivery.
        </p>
      </div>

      {/* Search Bar & Expand/Collapse Controls */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. fee waiver, lounge, CIBIL)..."
            className="w-full bg-white border border-gray-200 pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm font-montserrat placeholder:text-gray-400 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={allExpanded ? handleCollapseAll : handleExpandAll}
          className="text-xs font-semibold text-primary hover:text-primary/80 font-montserrat px-3.5 py-2 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
        >
          <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              allExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <HelpCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="font-bricolage font-bold text-gray-800 text-sm">
              No matching questions found
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs font-bold text-primary hover:underline font-montserrat cursor-pointer"
            >
              Reset search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            const feedback = feedbackState[faq.id];

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 shadow-2xs overflow-hidden ${
                  isOpen
                    ? "border-primary/40 ring-2 ring-primary/5 shadow-md"
                    : "border-gray-200/90 hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-gray-100 text-gray-400 group-hover:text-gray-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-gray-100 animate-fadeIn space-y-3">
                    <div className="space-y-2 pt-2">
                      {faq.answer.map((p, idx) => (
                        <p
                          key={idx}
                          className="text-xs sm:text-sm text-gray-700 font-montserrat leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {faq.proTip && (
                      <div className="mt-3 bg-[#FEF6E4]/70 border border-amber-300/60 rounded-xl p-3 flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-950 font-montserrat leading-relaxed">
                          <strong>Grofi Pro Tip:</strong> {faq.proTip}
                        </p>
                      </div>
                    )}

                    {/* Feedback row */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-montserrat">
                      <div className="flex items-center gap-2">
                        {feedback ? (
                          <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Thank you for your feedback!
                          </span>
                        ) : (
                          <>
                            <span>Was this answer helpful?</span>
                            <button
                              onClick={() =>
                                setFeedbackState((prev) => ({ ...prev, [faq.id]: "yes" }))
                              }
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-[11px] font-semibold cursor-pointer"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Yes
                            </button>
                            <button
                              onClick={() =>
                                setFeedbackState((prev) => ({ ...prev, [faq.id]: "no" }))
                              }
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 hover:bg-rose-50 hover:text-rose-700 transition-colors text-[11px] font-semibold cursor-pointer"
                            >
                              <ThumbsDown className="w-3 h-3" />
                              No
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </section>
  );
}
