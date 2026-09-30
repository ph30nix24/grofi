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
import { BankFAQS } from "../../components/type";

interface BankFAQSectionProps {
  bankName: string;
  faqs: BankFAQS[];
}

export default function BankFAQSection({ bankName, faqs }: BankFAQSectionProps) {
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [openFaqItems, setOpenFaqItems] = useState<Record<string, boolean>>({
    faq_0: true,
    faq_1: true,
  });
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, "yes" | "no">>({});

  // Curated Fallback FAQs for this bank if DB FAQs are empty
  const displayFaqs = useMemo(() => {
    if (faqs && faqs.length > 0) {
      return faqs.map((f, i) => ({
        id: `db_faq_${i}`,
        question: f.question,
        answer: [f.answer],
        proTip: `Compare ${bankName} card reward redemption options on Grofi to maximize net savings.`,
      }));
    }

    return [
      {
        id: "faq_cibil",
        question: `What minimum CIBIL score is required for ${bankName} credit cards?`,
        answer: [
          `Most ${bankName} credit cards require a minimum CIBIL credit score of 720 or higher for smooth online approval. For premium and luxury metal cards (such as high-tier travel or lifestyle variants), a score of 750+ with stable income is typically preferred.`,
          `If you are new to credit (credit score = -1 or zero), applying through a pre-approved customer offer or Fixed-Deposit backed route can guarantee approval while building an immaculate credit history.`,
        ],
        proTip: `Maintain credit utilization below 30% on your existing loans and cards to ensure quick instant approval from ${bankName}.`,
      },
      {
        id: "faq_ltf",
        question: `Does ${bankName} offer Lifetime Free (LTF) credit cards?`,
        answer: [
          `Yes! ${bankName} offers select Lifetime Free credit cards that come with ₹0 joining fee and ₹0 annual maintenance charges forever, without any mandatory spend condition.`,
          `Additionally, several cards feature spend-based fee waivers, where your annual fee is completely waived if you cross a defined annual spend threshold (typically ₹50,000 to ₹3,00,000 per year).`,
        ],
        proTip: `Look for cards marked "Lifetime Free" or "Fee Waived on Spends" in the filter to find cards that cost zero rupees to maintain.`,
      },
      {
        id: "faq_rupay_upi",
        question: `Can I link my ${bankName} RuPay credit card to UPI apps?`,
        answer: [
          `Yes. Any ${bankName} RuPay credit card can be instantly linked to Google Pay, PhonePe, Paytm, BHIM, or CRED. Once linked, you can simply scan any merchant QR code to pay using your credit line with up to 50 days interest-free period.`,
          `You also earn reward points or cashback on your everyday UPI QR transactions, making micro-spending significantly more rewarding.`,
        ],
        proTip: `Use your ${bankName} RuPay card for daily grocery, fuel, and dining UPI merchant payments to accumulate reward points effortlessly.`,
      },
      {
        id: "faq_approval_time",
        question: `How fast is ${bankName} credit card approval and physical dispatch?`,
        answer: [
          `Digital credit card applications submitted via Grofi undergo instant soft verification. If you complete the paperless Video KYC (V-KYC) with your PAN and Aadhaar, digital in-principle approval is often granted within 5 to 30 minutes.`,
          `Your virtual credit card details become active immediately for online transactions, while the physical card is typically delivered to your communication address within 3 to 5 business days.`,
        ],
        proTip: `Keep your original physical PAN card handy and ensure your Aadhaar-linked mobile phone is active to complete Video KYC in under 2 minutes.`,
      },
      {
        id: "faq_docs",
        question: `What documents are needed to apply for a ${bankName} credit card?`,
        answer: [
          `Applications through Grofi are 100% digital and paperless. You will only need your PAN Card number, Aadhaar number (linked with your mobile number for OTP verification), and address details.`,
          `Salaried applicants may occasionally provide net banking login or 3 months' salary slips, while self-employed applicants may share their latest ITR acknowledgment.`,
        ],
        proTip: `Soft eligibility checks on Grofi do NOT require income document uploads and do NOT affect your CIBIL score.`,
      },
    ];
  }, [faqs, bankName]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (!faqSearchQuery.trim()) return displayFaqs;
    const q = faqSearchQuery.toLowerCase().trim();
    return displayFaqs.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.some((line) => line.toLowerCase().includes(q))
    );
  }, [displayFaqs, faqSearchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAllFaqs = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => {
      allOpen[f.id] = true;
    });
    setOpenFaqItems(allOpen);
  };

  const handleCollapseAllFaqs = () => {
    setOpenFaqItems({});
  };

  const allFaqsExpanded =
    filteredFaqs.length > 0 && filteredFaqs.every((item) => openFaqItems[item.id]);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-gray-200">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions About <span className="text-primary">{bankName} Cards</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
          Everything you need to know before applying for {bankName} credit cards in India.
        </p>
      </div>

      {/* Search FAQs & Controls */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={faqSearchQuery}
            onChange={(e) => setFaqSearchQuery(e.target.value)}
            placeholder={`Search ${bankName} questions (e.g. CIBIL, annual fee, UPI)...`}
            className="w-full bg-white border border-gray-200 pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm font-montserrat placeholder:text-gray-400 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
          />
          {faqSearchQuery && (
            <button
              onClick={() => setFaqSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={allFaqsExpanded ? handleCollapseAllFaqs : handleExpandAllFaqs}
          className="text-xs font-semibold text-primary hover:text-primary/80 font-montserrat px-3.5 py-2 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
        >
          <span>{allFaqsExpanded ? "Collapse All" : "Expand All"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              allFaqsExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <HelpCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="font-bricolage font-bold text-gray-800 text-sm">
              No matching questions found
            </p>
            <button
              onClick={() => setFaqSearchQuery("")}
              className="mt-2 text-xs font-bold text-primary hover:underline font-montserrat cursor-pointer"
            >
              Reset question search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openFaqItems[faq.id];
            const feedback = helpfulFeedback[faq.id];

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
                                setHelpfulFeedback((prev) => ({ ...prev, [faq.id]: "yes" }))
                              }
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-[11px] font-semibold cursor-pointer"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Yes
                            </button>
                            <button
                              onClick={() =>
                                setHelpfulFeedback((prev) => ({ ...prev, [faq.id]: "no" }))
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
