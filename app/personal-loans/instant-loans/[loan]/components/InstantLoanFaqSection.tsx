"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";

interface InstantLoanFaqSectionProps {
  lender: InstantLoanLender;
  bankFaqs?: { question: string; answer: string }[];
}

export default function InstantLoanFaqSection({
  lender,
  bankFaqs = [],
}: InstantLoanFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const defaultFaqs = useMemo(() => {
    const list = [
      {
        question: `How fast can I get funds disbursed from ${lender.name}?`,
        answer: `Funds are deposited into your bank account in ${lender.disbursalTime} after completion of digital e-KYC. The disbursal process is powered by 24x7 automated IMPS rails, meaning you receive funds directly into your verified bank account even on weekends and bank holidays.`,
      },
      {
        question: `Can I apply for ${lender.name} if my CIBIL score is below 700?`,
        answer: `The minimum CIBIL score required for ${lender.name} is ${lender.minCreditScore}. If your score is above 650 or you are new-to-credit, approval can still be granted based on monthly bank cashflows verified securely through the RBI Account Aggregator framework. Borrowers with CIBIL scores above 750 receive the lowest starting interest rate of ${lender.interestRate?.min ?? 9.99}% p.a.`,
      },
      {
        question: `What documents are required for an instant loan from ${lender.name}?`,
        answer: `${lender.name} requires ${lender.documentation}. You only need your PAN card, Aadhaar card (for instant OTP verification via DigiLocker), and your mobile number linked to your bank account for Account Aggregator salary statement verification. No paper documents or branch visits are required.`,
      },
      {
        question: `Will checking pre-approved offers for ${lender.name} on Grofi lower my credit score?`,
        answer: `No. When you check your pre-approved eligibility on Grofi, we conduct an algorithmic soft credit inquiry. Soft inquiries do not affect or lower your CIBIL credit score in any way.`,
      },
      {
        question: `What are the minimum and maximum loan amounts available?`,
        answer: `You can borrow as little as ${lender.minAmount} up to a maximum sanction limit of ${lender.maxAmount}, with flexible repayment tenures ranging from 3 months up to ${lender.tenure}.`,
      },
      {
        question: `How does automated EMI repayment work for ${lender.name}?`,
        answer: `During digital agreement setup, you register an e-Mandate via e-NACH (using Net Banking or Debit Card) or UPI Autopay. Your monthly EMI is automatically debited on the scheduled due date, ensuring you never miss a payment or damage your credit score.`,
      },
      {
        question: `Can I prepay or foreclose my instant loan early?`,
        answer: `Yes. Under RBI guidelines, banks and NBFCs cannot levy any foreclosure or prepayment penalties on individual floating rate personal loans. Fixed rate facilities may be subject to nominal charges after the initial lock-in period.`,
      },
    ];

    if (bankFaqs && bankFaqs.length > 0) {
      return [...list.slice(0, 4), ...bankFaqs, ...list.slice(4)];
    }

    return list;
  }, [lender, bankFaqs]);

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
          <HelpCircle className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>INSTANT LOAN FAQS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions About <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Everything you need to know about disbursal speed, e-KYC, repayment terms, and credit eligibility.
        </p>

        {/* Search input */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. CIBIL, disbursal, KYC, prepay)..."
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
            No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another search keyword.
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Answers verified from official lender digital schedule of charges.</span>
      </div>
    </section>
  );
}
