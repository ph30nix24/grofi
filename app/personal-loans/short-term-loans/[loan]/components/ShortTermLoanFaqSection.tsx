"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";

interface ShortTermLoanFaqSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanFaqSection({
  lender,
}: ShortTermLoanFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Default short-term specific FAQs if lender has few or none
  const defaultFaqs = [
    {
      category: "Repayment & Preclosure",
      question: `Can I repay my ${lender.name} loan before the selected tenure without penalties?`,
      answer: `Yes. Under RBI Fair Lending directives for individual floating rate credit, ${lender.name} allows borrowers to foreclose or prepay the outstanding balance early with zero foreclosure penalties. Prepaying early reduces total interest outgo immediately.`,
    },
    {
      category: "RBI Safety & Cooling-off",
      question: `What is the cooling-off period on ${lender.name} and how do I exercise it?`,
      answer: `${lender.name} provides a mandatory ${lender.coolingOffPeriod} cooling-off / look-up window as per RBI Digital Lending Guidelines. If you change your mind within this timeframe, you can exit the contract by returning the disbursed principal along with proportionate APR, paying zero cancellation charges.`,
    },
    {
      category: "Disbursal",
      question: `How fast will funds be transferred to my bank account?`,
      answer: `Once your digital e-KYC and e-NACH mandate are completed, disbursal is initiated via 24x7 IMPS rails within ${lender.disbursalTime}. Funds arrive directly in your verified bank account.`,
    },
    {
      category: "Eligibility",
      question: `Can I qualify for ${lender.name} if I have a lower credit score?`,
      answer: `${lender.name} requires a minimum CIBIL score of ${lender.minCreditScore}. If your score is around this mark or if you have a thin credit file, your application is evaluated using bank cash flow metrics via Account Aggregator.`,
    },
    {
      category: "Repayment & Preclosure",
      question: `How are monthly installments debited for ${lender.name}?`,
      answer: `Installments are automatically debited on your monthly repayment due date via the e-NACH / UPI AutoPay mandate established during digital onboarding. You can also make manual prepayments directly through the app or payment portal.`,
    },
  ];

  const allFaqs = useMemo(() => {
    const list = [...(lender.faqs || [])];
    // Add default FAQs if not already covered
    for (const d of defaultFaqs) {
      if (!list.some((f) => f.question.toLowerCase().includes(d.question.toLowerCase().substring(0, 20)))) {
        list.push(d);
      }
    }
    return list;
  }, [lender.faqs]);

  const categories = useMemo(() => {
    const cats = new Set<string>(["all"]);
    allFaqs.forEach((f) => {
      if (f.category) cats.add(f.category);
    });
    return Array.from(cats);
  }, [allFaqs]);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchCat =
        selectedCategory === "all" ||
        (faq.category && faq.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchQuery =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  return (
    <section id="faqs" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>BORROWER COMMON QUERIES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Everything you need to know about disbursals, repayment schedules, cooling-off protection, and charges.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="max-w-3xl mx-auto mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search questions about ${lender.name}...`}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs transition-all"
          />
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden pb-1 text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-2xs font-bold"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat === "all" ? "All Questions" : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs transition-all hover:border-gray-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer"
                >
                  <div className="space-y-1">
                    {faq.category && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-3xl border border-gray-200 text-xs text-gray-500">
            No questions found matching your search term.
          </div>
        )}
      </div>
    </section>
  );
}
