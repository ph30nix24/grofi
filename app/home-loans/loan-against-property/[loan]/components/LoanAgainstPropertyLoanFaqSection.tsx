"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircleQuestion,
} from "lucide-react";
import { LoanAgainstPropertyLender, LoanAgainstPropertyFAQ } from "../../components/type";

// Universal LAP FAQs to complement DB FAQs
const universalFaqs: LoanAgainstPropertyFAQ[] = [
  {
    question: "Can I claim income tax deductions on a Loan Against Property?",
    answer:
      "Yes, tax deductions depend on the end use of the loan. Under Section 37(1) of the Income Tax Act, 100% of interest paid is tax-deductible as a business expenditure if loan funds are deployed in business operations. If utilized for residential home renovation or extension, interest up to ₹2 Lakhs per annum is deductible under Section 24(b).",
    category: "Tax Benefits",
  },
  {
    question: "Are there any foreclosure or prepayment penalties on this loan?",
    answer:
      "In compliance with RBI regulations, individual borrowers availing floating interest rate mortgage loans incur 0% / Nil prepayment or foreclosure charges. You can make part-prepayments or close the loan early without financial penalties.",
    category: "Prepayment & Fees",
  },
  {
    question: "How does a Loan Against Property compare to an unsecured Personal Loan?",
    answer:
      "A Loan Against Property offers drastically lower interest rates (starting ~8.75%–10.5% vs 11%–24% for personal loans), much higher borrowing limits (up to ₹25+ Crores vs ₹40–50 Lakhs), and longer tenures up to 15–20 years, making monthly EMIs substantially more manageable.",
    category: "Product Comparison",
  },
  {
    question: "Can I pledge a commercial property or only residential properties?",
    answer:
      "Most lenders accept both residential properties (apartments, villas, builder floors) and commercial properties (offices, retail shops). However, residential assets generally secure higher LTVs than commercial assets.",
    category: "Property & LTV",
  },
];

interface LoanAgainstPropertyLoanFaqSectionProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanFaqSection({
  lender,
}: LoanAgainstPropertyLoanFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Combine DB FAQs with universal FAQs
  const allFaqs: LoanAgainstPropertyFAQ[] = useMemo(() => {
    const dbList: LoanAgainstPropertyFAQ[] = Array.isArray(lender.faqs) ? lender.faqs : [];
    // Deduplicate by question text
    const seen = new Set<string>();
    const combined: LoanAgainstPropertyFAQ[] = [];

    for (const f of [...dbList, ...universalFaqs]) {
      const qClean = f.question.trim().toLowerCase();
      if (!seen.has(qClean)) {
        seen.add(qClean);
        combined.push(f);
      }
    }
    return combined;
  }, [lender.faqs]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    allFaqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ["all", ...Array.from(set)];
  }, [allFaqs]);

  // Filtered FAQs based on category and search
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (f.category && f.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchesQuery =
        !searchQuery.trim() ||
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  return (
    <section
      id="faqs"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>BORROWER FAQ KNOWLEDGE BASE</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions on <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Clear, verified answers covering property documentation, LTV ceilings, tax deductions, and overdraft mechanics.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search ${lender.name} questions (e.g. LTV, tax, tenure, documents)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-2xs focus:border-primary focus:outline-hidden text-xs sm:text-sm transition-all"
          />
        </div>

        {/* Category Pills */}
        {categories.length > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "All Questions" : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAQs Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircleQuestion className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{faq.answer}</p>
                    {faq.category && (
                      <div className="mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
            <p className="text-xs text-gray-500">No questions match your search query.</p>
          </div>
        )}
      </div>
    </section>
  );
}
