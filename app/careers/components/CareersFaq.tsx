"use client";

import React, { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { candidateFaqs } from "../data/careersData";

export default function CareersFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            Candidate <span className="text-primary">FAQ</span>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Everything you need to know about interview timelines, equity policies, and day-to-day life at Grofi.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {candidateFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#02282C] font-bricolage pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#EBF4ED] text-primary" : "text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? Help card */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-[#02282C] font-bricolage">
                Have a specific question not covered here?
              </h4>
              <p className="text-xs text-gray-500">
                Reach out to our talent acquisition team directly.
              </p>
            </div>
          </div>
          <a
            href="mailto:careers@grofi.in"
            className="text-xs sm:text-sm font-bold text-primary hover:text-[#01353a] underline underline-offset-4 decoration-primary/30"
          >
            careers@grofi.in
          </a>
        </div>
      </div>
    </section>
  );
}
