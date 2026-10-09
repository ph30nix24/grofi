"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { BalanceTransferLender } from "../../components/type";

interface BalanceTransferLoanFaqSectionProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanFaqSection({
  lender,
}: BalanceTransferLoanFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Directly use the FAQs fetched from the database for this lender
  const dbFaqs = useMemo(() => {
    return Array.isArray(lender.faqs) ? lender.faqs : [];
  }, [lender.faqs]);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return dbFaqs;
    const query = searchQuery.toLowerCase();
    return dbFaqs.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query) ||
        (f.category && f.category.toLowerCase().includes(query))
    );
  }, [dbFaqs, searchQuery]);

  if (dbFaqs.length === 0) return null;

  return (
    <section
      id="faqs"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>LENDER VERIFIED FAQS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions About <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Official answers on interest rate resets, takeover cheque settlement, title deed handovers, and top-up disbursal.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${lender.name} takeover questions...`}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-2xs"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="space-y-1 pr-2">
                      {faq.category && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                          {faq.category}
                        </span>
                      )}
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-600 mt-0.5">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
              No questions matched your search query. Try typing another keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
