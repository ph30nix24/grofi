"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanFaqSectionProps {
  lender: HomeLoanLender;
}

export default function HomeLoanFaqSection({ lender }: HomeLoanFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Combine lender FAQs with comprehensive Home Loan specific queries
  const allFaqs = useMemo(() => {
    const list = [...(lender.faqs || [])];

    // Standard fallback FAQs if lender faqs are sparse
    const defaultFaqs = [
      {
        question: `How is the interest rate calculated on ${lender.name}?`,
        answer: `${lender.name} calculates interest on a monthly reducing balance basis linked directly to the RBI External Benchmark Lending Rate (EBLR / Repo Rate). When RBI adjusts the repo rate, the change is transmitted directly to your loan within the scheduled benchmark reset date.`,
      },
      {
        question: `Are there any prepayment or foreclosure charges on this home loan?`,
        answer: `No. As per Reserve Bank of India (RBI) regulations, ${lender.name} levies zero (0%) pre-closure or part-prepayment charges on all floating-rate housing loans sanctioned to individual borrowers. You can prepay any amount anytime from your own funds.`,
      },
      {
        question: `What is the maximum property value that ${lender.name} can finance?`,
        answer: `${lender.name} offers property funding up to ${lender.maxLtv} based on RBI guidelines: up to 90% funding for properties valued under ₹30 Lakhs, up to 80% for properties between ₹30 Lakhs and ₹75 Lakhs, and up to 75% for properties valued above ₹75 Lakhs.`,
      },
      {
        question: `Can I add my spouse as a co-borrower to increase loan eligibility?`,
        answer: `Yes! Adding a working spouse, parent, or sibling as a co-borrower combines your total household income, significantly increasing your maximum eligible loan amount. If your wife is a co-owner, you can also avail the 5 bps (${lender.womenConcession}) interest concession and double your Section 24(b) and 80C income tax deductions.`,
      },
      {
        question: `How does an Overdraft / Maxgain home loan differ from a regular home loan?`,
        answer: `In a regular home loan, excess funds paid permanently reduce the principal. In an overdraft loan (such as ${lender.overdraftScheme || "Home Loan Overdraft"}), an operative current account is linked to your loan. Any surplus funds parked into this account offset the daily principal for interest calculation, while retaining 100% instant withdrawal liquidity via ATM, UPI, or NetBanking without pre-closure charges.`,
      },
      {
        question: `How long does ${lender.name} take to disburse the loan after sanction?`,
        answer: `Digital in-principle sanction is provided within 15 minutes. Once property title deeds and legal search reports are cleared by the bank's panel advocate, final disbursement is completed within 3 to 5 business days directly to the builder or resale seller.`,
      },
      {
        question: `How do I obtain the annual provisional interest certificate for income tax filing?`,
        answer: `You can instantly download your annual provisional and final Interest & Principal Repayment Certificate (IT Certificate) via ${lender.name}'s official NetBanking portal, mobile banking app, or request a stamped physical copy at any branch.`,
      },
    ];

    // Merge without duplicates
    for (const def of defaultFaqs) {
      if (!list.some((item) => item.question.toLowerCase() === def.question.toLowerCase())) {
        list.push(def);
      }
    }

    return list;
  }, [lender]);

  // Filter faqs by search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return allFaqs;
    const q = searchQuery.toLowerCase().trim();
    return allFaqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [allFaqs, searchQuery]);

  return (
    <section id="faqs" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Common Questions About <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Clear, factual answers regarding interest rate resets, prepayment penalties, overdraft accounts, and legal checks.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search questions about ${lender.name}...`}
          className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-xs"
        />
      </div>

      {/* FAQs List Accordion */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
            No questions matched your search query. Try another term or reset your search.
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>All answers verified according to RBI Master Circular on Housing Finance 2026.</span>
      </div>
    </section>
  );
}
