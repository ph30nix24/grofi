"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Lightbulb,
  Calendar,
  ShieldCheck,
  Percent,
  Zap,
} from "lucide-react";

export interface ShortTermLoanFAQItem {
  id: string;
  category: "general" | "tenure" | "cost" | "safety" | "eligibility";
  categoryLabel: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}

const FAQ_DATA: ShortTermLoanFAQItem[] = [
  {
    id: "what-is-short-term-loan",
    category: "general",
    categoryLabel: "General & Basics",
    question: "What is a short-term personal loan, and who is it best for?",
    quickTakeaway: "Unsecured personal credit with a 3 to 12-month tenure designed for rapid bridge funding.",
    answer: [
      "A short-term personal loan is an unsecured digital credit facility tailored for individuals requiring quick liquidity (typically ₹1,000 to ₹5,00,000) with compact repayment horizons between 3 and 12 months.",
      "Unlike conventional multi-year loans (3 to 7 years), short-term loans allow borrowers to clear their debt quickly once an anticipated bonus, customer payment, or salary arrives, eliminating multi-year balance sheet liabilities.",
    ],
    proTip: "Use short-term loans strictly for temporary liquidity gaps or emergency expenses, not for speculative financial investments.",
  },
  {
    id: "why-short-tenure-saves-interest",
    category: "cost",
    categoryLabel: "Interest & Cost",
    question: "Why do short-term loans save money even if their APR is slightly higher?",
    quickTakeaway: "Compounding duration matters more than annual interest rate for total rupee outflow.",
    answer: [
      "Interest accumulates over time. For example, borrowing ₹1,00,000 at 16% APR for 6 months results in approximately ₹4,728 in total interest.",
      "In contrast, borrowing the same ₹1,00,000 at a lower 13.5% APR over 36 months incurs over ₹22,184 in total interest outgo — nearly 5 times more. Short tenures minimize the principal exposure window, keeping total rupee interest minimal.",
    ],
    proTip: "Always look at 'Total Repayment Amount' in your Key Fact Statement (KFS) rather than comparing APR percentages in isolation.",
  },
  {
    id: "can-i-foreclose-early",
    category: "tenure",
    categoryLabel: "Tenures & Repayment",
    question: "Can I close or prepay my short-term loan early without paying a penalty?",
    quickTakeaway: "Yes, leading RBI-registered short-term lenders offer zero foreclosure penalties.",
    answer: [
      "Under Reserve Bank of India (RBI) guidelines, floating-rate personal loans to individual borrowers cannot carry foreclosure charges.",
      "Furthermore, top digital lenders like Navi, KreditBee, and major banks waive prepayment penalties after an initial minimum cooling window (e.g., 30 to 90 days), allowing you to pay off your balance early and stop future interest accrual immediately.",
    ],
    proTip: "When you receive your surplus cash, check your lender app for 'Full Prepayment' to close the loan and download your No Objection Certificate (NOC) digitally.",
  },
  {
    id: "cooling-off-period-explained",
    category: "safety",
    categoryLabel: "RBI Safety & KFS",
    question: "What is the RBI mandatory cooling-off / look-up period?",
    quickTakeaway: "A 1 to 3-day window where you can exit the loan with zero prepayment penalties.",
    answer: [
      "Under the RBI Digital Lending Guidelines, every regulated bank and NBFC must provide an explicit 'Cooling-Off / Look-Up Period' (typically 1 to 3 days for loans with tenure under 7 days, and 3+ days for longer loans).",
      "If you change your mind or secure alternative funding during this window, you can cancel the loan by simply returning the principal disbursed amount along with proportionate interest for those few days, without paying punitive foreclosure fees.",
    ],
    proTip: "Your cooling-off period start date and exact terms must be documented explicitly in your Key Fact Statement (KFS).",
  },
  {
    id: "cibil-600-eligibility",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    question: "Can I get a short-term personal loan if my credit score is around 600 or I am new to credit?",
    quickTakeaway: "Yes. Fintech partners like KreditBee, CASHe, and mPokket assess bank statement cash flows.",
    answer: [
      "While traditional public and private banks generally seek a CIBIL score of 720+, fintech and digital NBFC partners specialize in evaluating alternate data points via the Sahamati Account Aggregator.",
      "They assess your recurring monthly salary credits, UPI inflow stability, and employer category. Borrowers with scores between 600 and 680 or first-time young earners can comfortably qualify for micro short-term loans from ₹1,000 to ₹1,00,000.",
    ],
    proTip: "Repaying a 6-month short-term micro loan without a single default is one of the fastest ways to build a strong credit bureau score.",
  },
  {
    id: "paperwork-account-aggregator",
    category: "eligibility",
    categoryLabel: "Eligibility & Documentation",
    question: "What documents are required to apply for a short-term loan on Grofi?",
    quickTakeaway: "100% Paperless: PAN number, Aadhaar OTP e-KYC, and Account Aggregator bank consent.",
    answer: [
      "The entire journey is 100% paperless with zero physical branch visits.",
      "You will need your PAN card for tax identity, Aadhaar number for UIDAI OTP e-KYC, and a bank account enabled for digital verification via the Sahamati Account Aggregator. There is no need to upload PDF salary slips or physical bank statements with ink stamps.",
    ],
    proTip: "Ensure your Aadhaar is linked to your active mobile number to complete instant OTP verification without delay.",
  },
  {
    id: "what-is-key-fact-statement",
    category: "safety",
    categoryLabel: "RBI Safety & KFS",
    question: "What is a Key Fact Statement (KFS) and why is it legally mandatory?",
    quickTakeaway: "A single-page standardized summary showing true APR, all fees, net disbursal, and cooling-off terms.",
    answer: [
      "The Reserve Bank of India mandates that every regulated lending entity provide a standardized Key Fact Statement (KFS) to the borrower before agreement execution.",
      "The KFS provides total transparency: it clearly discloses the Annual Percentage Rate (APR) encompassing all upfront processing fees, insurance deductions, net money deposited into your bank, and the grievance redressal officer contact details. Lenders cannot charge any fee not explicitly stated in the KFS.",
    ],
    proTip: "Never sign a loan agreement if the lender refuses to show you a standardized KFS. Grofi partners exclusively with 100% KFS-compliant lenders.",
  },
  {
    id: "disbursal-timeline",
    category: "general",
    categoryLabel: "General & Basics",
    question: "How fast is the money deposited into my bank account?",
    quickTakeaway: "From 3 seconds (pre-approved bank offers) to under 15 minutes (fintech apps).",
    answer: [
      "For pre-approved bank customers (e.g. HDFC 10-Second, ICICI iMobile, SBI YONO), funds are transferred instantly via direct core-banking IMPS channels in seconds.",
      "For fintech and NBFC partners (e.g. Navi, KreditBee, CASHe), automated algorithmic underwriting and e-Sign take between 5 and 15 minutes from initiating application to cash arriving in your bank account.",
    ],
    proTip: "Apply during daytime banking hours (9 AM - 8 PM) for the fastest automated IMPS transfer processing.",
  },
];

export default function ShortTermLoanFAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("what-is-short-term-loan");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "Basics & Overview" },
    { id: "cost", label: "Interest & Cost Math" },
    { id: "tenure", label: "Tenures & Repayment" },
    { id: "safety", label: "RBI Safety & KFS" },
    { id: "eligibility", label: "Eligibility & KYC" },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      if (selectedCategory !== "all" && faq.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inQuestion = faq.question.toLowerCase().includes(q);
        const inAnswer = faq.answer.some((a) => a.toLowerCase().includes(q));
        const inTakeaway = faq.quickTakeaway.toLowerCase().includes(q);
        return inQuestion || inAnswer || inTakeaway;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="short-term-faq-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Clear Answers
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Short-Term Loan <span className="text-primary">Frequently Asked Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Everything you need to know about short tenures, zero foreclosure charges, RBI cooling-off rights, and paperless KYC.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., foreclosure, cooling off, CIBIL, KFS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary shadow-2xs font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-200">
              <HelpCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">
                No questions found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-primary/40 shadow-md ring-1 ring-primary/10"
                      : "border-gray-200/80 shadow-2xs hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                      {!isOpen && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {faq.quickTakeaway}
                        </p>
                      )}
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-primary/10 text-primary" : "text-gray-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-gray-100 text-xs text-gray-600 space-y-3 animate-fadeIn">
                      {/* Quick Takeaway Banner */}
                      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2 text-amber-900 font-medium">
                        <Zap className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-bold">Key Takeaway:</strong> {faq.quickTakeaway}
                        </span>
                      </div>

                      {/* Full Answer Paragraphs */}
                      {faq.answer.map((para, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {para}
                        </p>
                      ))}

                      {/* Pro-Tip Box */}
                      {faq.proTip && (
                        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-relaxed">
                            <strong className="font-bold">Grofi Advisory:</strong> {faq.proTip}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
