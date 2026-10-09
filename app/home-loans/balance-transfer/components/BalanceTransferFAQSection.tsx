"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { BalanceTransferLender, BalanceTransferFaq } from "./type";

interface BalanceTransferFAQSectionProps {
  lenders: BalanceTransferLender[];
}

export default function BalanceTransferFAQSection({
  lenders,
}: BalanceTransferFAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Extract all unique FAQs from lenders in DB
  const { allFaqs, categories } = useMemo(() => {
    const map = new Map<string, BalanceTransferFaq>();

    lenders.forEach((lender) => {
      if (Array.isArray(lender.faqs)) {
        lender.faqs.forEach((faq) => {
          if (faq.question && faq.answer && !map.has(faq.question)) {
            map.set(faq.question, {
              question: faq.question,
              answer: faq.answer,
              category: faq.category || "General",
            });
          }
        });
      }
    });

    const faqsList = Array.from(map.values());
    const catsSet = new Set<string>();
    faqsList.forEach((f) => {
      if (f.category) catsSet.add(f.category);
    });

    const cats = ["All", ...Array.from(catsSet)];

    return { allFaqs: faqsList, categories: cats };
  }, [lenders]);

  // Filter FAQs by category & search query
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      if (selectedCategory !== "All" && faq.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        return (
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  return (
    <section id="faqs-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold shadow-2xs mb-3">
            <HelpCircle className="w-4 h-4 text-gold" />
            <span>Borrower FAQ Knowledgebase</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Everything you need to know about switching banks, List of Documents (LOD), overdraft schemes, and fee caps.
          </p>
        </div>

        {/* Search & Categories Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-8 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>

          {/* Category Chips */}
          {categories.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenIndex(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* FAQs Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-gray-500 text-xs">
            No FAQs found matching your criteria. Try resetting the search or category filter.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs transition-all hover:border-primary/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                      {faq.category && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 shrink-0 mt-0.5 sm:mt-0">
                          {faq.category}
                        </span>
                      )}
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
