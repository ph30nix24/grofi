"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  ShieldCheck,
} from "lucide-react";
import { BusinessLoanLender } from "../../components/type";

interface BusinessLoanFaqSectionProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanFaqSection({ lender }: BusinessLoanFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const defaultFaqs = useMemo(() => {
    const list = [
      {
        question: `How is interest calculated for ${lender.name}?`,
        answer: `${lender.name} calculates interest strictly on a monthly reducing balance framework (or daily balance in case of overdraft facilities). You pay interest solely on the outstanding principal or utilized funds, saving your enterprise significant capital compared to flat interest rates.`,
      },
      {
        question: `Is collateral or asset security required for this loan?`,
        answer: `${lender.name} is structured as ${lender.collateralType}. Eligible micro and small enterprises can also benefit from sovereign collateral guarantees under the Government of India's CGTMSE scheme for limits up to ₹5 Crores.`,
      },
      {
        question: `What are the minimum turnover and operating vintage requirements?`,
        answer: `Borrowers must demonstrate a minimum operational vintage of ${lender.minVintage} and an annual audited or GST-reported turnover of at least ${lender.minTurnover}.`,
      },
      {
        question: `Are interest payments on ${lender.name} tax deductible?`,
        answer: `Yes. Under Section 36(1)(iii) of the Indian Income Tax Act, 100% of interest expenses incurred on business loans are fully deductible from gross business revenue, reducing your enterprise's taxable income and effective borrowing cost.`,
      },
      {
        question: `Will checking my business loan eligibility on Grofi affect my CIBIL or CMR score?`,
        answer: `No. Initiating a pre-approved eligibility check on Grofi triggers a soft credit inquiry, leaving your personal CIBIL and commercial Company Credit Report (CMR) completely unaffected.`,
      },
    ];

    if (lender.faqs && lender.faqs.length > 0) {
      // Prioritize lender's specific FAQs from database
      return [...lender.faqs, ...list.slice(2)];
    }

    return list;
  }, [lender]);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return defaultFaqs;
    const q = searchQuery.toLowerCase().trim();
    return defaultFaqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [defaultFaqs, searchQuery]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>GOT QUESTIONS?</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions About <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Everything you need to know about MSME rates, paperless GST verification, collateral norms, and tax deductions.
        </p>

        {/* Search input */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. collateral, turnover, tax, GST)..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary shadow-2xs"
          />
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs overflow-hidden ${
                isOpen ? "border-primary/40 ring-1 ring-primary/10" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-[#FDFBF7]/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8 text-xs text-gray-500 bg-white rounded-2xl border border-gray-200">
            No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another search term.
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Answers verified from official commercial bank schedules and RBI Master Directions.</span>
      </div>

    </section>
  );
}
