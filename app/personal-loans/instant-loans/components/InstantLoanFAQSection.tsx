"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Lightbulb,
  Zap,
} from "lucide-react";

export interface InstantLoanFAQItem {
  id: string;
  category: "speed" | "safety" | "eligibility" | "charges";
  categoryLabel: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}

const FAQ_DATA: InstantLoanFAQItem[] = [
  {
    id: "how-10-sec-possible",
    category: "speed",
    categoryLabel: "Speed & Process",
    question: "How can an instant personal loan be disbursed in under 10 seconds?",
    quickTakeaway: "Pre-approved underwriting + automated IMPS rails = Instant account credit",
    answer: [
      "Leading Indian banks like HDFC, ICICI, and SBI run periodic algorithmic assessments on their existing savings and salary account customers. If you maintain regular cash inflows and timely credit repayments, the bank pre-sanctions an approved loan limit.",
      "When you accept this pre-approved offer via your net banking or mobile banking app, the loan agreement is generated instantly and funds are transferred within 3 to 10 seconds using real-time automated IMPS payment gateways without any human underwriter intervention.",
    ],
    proTip: "If you have an active salary account with a private or public bank, always check their pre-approved personal loan offers first before applying elsewhere.",
  },
  {
    id: "rbi-safety-apps",
    category: "safety",
    categoryLabel: "Safety & RBI Rules",
    question: "Are instant loan apps on Grofi safe and RBI regulated?",
    quickTakeaway: "100% RBI Compliant • Zero unauthorized apps • Mandatory Key Fact Statement",
    answer: [
      "Yes, 100%. Grofi partners exclusively with Scheduled Commercial Banks (like HDFC, SBI, ICICI, Axis) and RBI-registered Systemically Important NBFCs (like Bajaj Finserv, Tata Capital, Krazybee Services, PayU Finance, Bhanix Finance).",
      "All partners strictly comply with the RBI Digital Lending Directives, which prohibit apps from requesting intrusive device permissions (such as phone contacts, media galleries, or call logs). Disbursals and repayments occur strictly between your bank account and the regulated lender.",
    ],
    proTip: "Every legitimate lender is legally required to provide you with a Key Fact Statement (KFS) detailing the full Annual Percentage Rate (APR) before disbursal. Never borrow without receiving a KFS.",
  },
  {
    id: "low-cibil-instant",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    question: "Can I get an instant loan if my CIBIL score is below 650 or I am new to credit?",
    quickTakeaway: "Yes • Fintech partners evaluate bank statement cashflows rather than only past bureau history",
    answer: [
      "Traditional banks typically require a CIBIL score of 720 or higher. However, modern fintech lenders like KreditBee, CASHe, PaySense, and Navi use alternative underwriting algorithms that assess your monthly salary credits, spending stability, and employer category.",
      "If your score is between 600 and 650, or if you have no credit score (New to Credit), these fintech apps can still sanction micro loans from ₹5,000 to ₹1,00,000 within 10 to 15 minutes, allowing you to build your credit footprint.",
    ],
    proTip: "Paying your initial small instant loan EMIs strictly on time is one of the fastest ways to elevate your CIBIL score above 750 within 6 to 9 months.",
  },
  {
    id: "account-aggregator-explainer",
    category: "speed",
    categoryLabel: "Speed & Process",
    question: "What is an Account Aggregator and why is no physical paperwork needed?",
    quickTakeaway: "RBI framework for instant, tamper-proof, consent-based bank statement sharing",
    answer: [
      "The Account Aggregator (AA) ecosystem is an RBI-governed digital network that lets you securely share encrypted financial data from your bank to an authorized lender in real-time.",
      "Instead of downloading PDF bank statements, unlocking password-protected files, or uploading physical salary slips, you simply approve an OTP consent prompt. The lender receives machine-readable verification directly from your bank within 10 seconds, eliminating manual document review.",
    ],
    proTip: "Account Aggregator data sharing is 100% consent-driven. The lender cannot view or withdraw funds from your account via AA; it only reads transaction history.",
  },
  {
    id: "advance-fee-hidden-charges",
    category: "charges",
    categoryLabel: "Charges & Fees",
    question: "Do instant loan providers require any advance payment or deposit?",
    quickTakeaway: "Never • Legitimate lenders deduct fees only from the sanctioned amount",
    answer: [
      "No legitimate RBI-regulated bank or NBFC will ever ask you to transfer an 'advance processing fee', 'file release deposit', or 'insurance charge' via UPI or Google Pay before releasing your loan.",
      "All permissible processing charges (typically 1% to 3% + GST) are automatically deducted from the final sanctioned loan amount upon disbursement. If any app or agent demands an upfront deposit to approve your loan, it is guaranteed to be a fraudulent scam.",
    ],
    proTip: "Grofi is 100% free for borrowers. We never charge any platform fees or advisory commissions.",
  },
  {
    id: "prepayment-foreclosure",
    category: "charges",
    categoryLabel: "Charges & Fees",
    question: "Can I foreclose or prepay my instant personal loan early?",
    quickTakeaway: "Yes • RBI restricts penalties on individual floating rate loans; cooling-off period applies",
    answer: [
      "Under RBI regulations, individual floating rate loans incur zero foreclosure or prepayment penalties. For fixed-rate loans, lenders may charge between 2% and 4% if foreclosed before a set tenure (usually 6 months).",
      "Additionally, all RBI-compliant digital loans come with a statutory cooling-off/look-up period (typically 3 to 7 days). If you decide you no longer need the money, you can return the principal amount plus proportionate day interest with zero foreclosure charges.",
    ],
    proTip: "If you anticipate repaying quickly with an upcoming bonus, select lenders like Navi or SBI which offer zero foreclosure charges on early repayment.",
  },
];

export default function InstantLoanFAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("how-10-sec-possible");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "speed", label: "Speed & Process" },
    { id: "safety", label: "Safety & RBI Rules" },
    { id: "eligibility", label: "Eligibility & CIBIL" },
    { id: "charges", label: "Charges & Fees" },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inQuestion = item.question.toLowerCase().includes(q);
        const inTakeaway = item.quickTakeaway.toLowerCase().includes(q);
        const inAnswer = item.answer.some((a) => a.toLowerCase().includes(q));
        if (!inQuestion && !inTakeaway && !inAnswer) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Clear Answers • Instant Clarity
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Instant Personal Loan <span className="text-primary">Frequently Asked Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Everything you need to know about instant disbursals, safe digital borrowing, and CIBIL impact.
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search instant loan FAQs (e.g. 10 seconds, CIBIL, account aggregator, safety)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  selectedCategory === c.id
                    ? "bg-primary text-white border-primary shadow-2xs"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Items */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isExpanded ? "border-primary/40 shadow-md" : "border-gray-200/80 shadow-2xs hover:border-gray-300"
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF4ED] text-primary border border-primary/20">
                        {faq.categoryLabel}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold hidden sm:inline">
                        • {faq.quickTakeaway}
                      </span>
                    </div>

                    <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isExpanded ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Answer Body */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-gray-100 space-y-3 animate-fadeIn text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.answer.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}

                    {/* Pro Tip */}
                    <div className="mt-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                      <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Grofi Pro Tip: </strong>
                        <span>{faq.proTip}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
