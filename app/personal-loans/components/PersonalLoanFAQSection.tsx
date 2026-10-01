"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Lightbulb,
  ThumbsUp,
} from "lucide-react";

export interface LoanFAQItem {
  id: string;
  category: "rates" | "eligibility" | "disbursal" | "prepayment";
  categoryLabel: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}

const FAQ_DATA: LoanFAQItem[] = [
  {
    id: "reducing-vs-flat",
    category: "rates",
    categoryLabel: "Rates & Charges",
    question: "What is the difference between Reducing Balance Rate and Flat Interest Rate?",
    quickTakeaway: "Always pick Monthly Reducing Balance • Flat rates look lower but cost nearly double",
    answer: [
      "In a Monthly Reducing Balance method, interest is calculated solely on the outstanding principal balance remaining at the end of each month. As you pay your EMIs, the principal component reduces, significantly diminishing the total interest paid over time.",
      "In a Flat Interest Rate method, interest is calculated on the entire initial sanction amount for the full tenure, irrespective of how much principal you've already repaid. A 7% flat rate is equivalent to an effective reducing rate of almost 13% p.a.",
      "All partner banks featured on Grofi calculate personal loan interest strictly on a monthly reducing balance method in full compliance with RBI fair practices code.",
    ],
    proTip: "Never compare flat rates with reducing rates directly. Ask for the Annual Percentage Rate (APR) to compare the true total cost of borrowing.",
  },
  {
    id: "cibil-score-needed",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    question: "What minimum CIBIL score is required for personal loan approval?",
    quickTakeaway: "720+ for standard approvals • 750+ for lowest 9.99% interest brackets",
    answer: [
      "Most scheduled commercial banks (HDFC, ICICI, SBI, Axis) prefer a CIBIL score of 720 or higher. A score above 750 places you in the premier borrower tier, giving you access to lower interest rates (starting at 9.99% p.a.), faster digital approval, and minimal processing charges.",
      "If your CIBIL score is between 650 and 700, you can still secure a personal loan through premier NBFCs like Bajaj Finserv or Tata Capital, or by applying with a creditworthy co-applicant.",
    ],
    proTip: "Before applying, ensure you have no late credit card payments or EMI defaults in the preceding 6 to 12 months, as recent credit behavior is weighted most heavily by underwriting algorithms.",
  },
  {
    id: "soft-inquiry-cibil",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    question: "Will checking my loan eligibility on Grofi impact my credit score?",
    quickTakeaway: "Zero Impact • Soft inquiry does not reduce any CIBIL points",
    answer: [
      "No! Checking your pre-approved personal loan eligibility on Grofi performs a 'Soft Credit Pull'. Soft inquiries are recorded for informational purposes only and have zero impact on your CIBIL or Experian credit score.",
      "A 'Hard Credit Inquiry' is triggered only when you formally submit a completed loan application with a specific bank for final disbursement. Because Grofi matches you with lenders before applying, you avoid multiple hard inquiries that could otherwise harm your score.",
    ],
    proTip: "Avoid submitting simultaneous loan applications to multiple banks directly, as each hard inquiry can temporarily shave 5 to 10 points off your credit score.",
  },
  {
    id: "foreclosure-prepayment",
    category: "prepayment",
    categoryLabel: "Prepayment & Foreclosure",
    question: "Can I prepay or foreclose my personal loan early? Are there charges?",
    quickTakeaway: "Yes • Allowed after lock-in period (typically 6-12 months) with 2%–4% fee or ₹0 for select accounts",
    answer: [
      "Yes, borrowers are legally permitted to prepay their personal loans partially or foreclose the loan fully. Most banks require a mandatory lock-in period of 6 to 12 completed EMIs before foreclosure is enabled.",
      "Under current RBI regulations, floating-rate personal loans sanctioned to individuals cannot be charged foreclosure penalties. For fixed-rate personal loans, lenders typically charge between 2% and 4% + GST on the outstanding principal balance. Some premier salary corporate wealth packages feature zero foreclosure charges after 12 EMIs.",
    ],
    proTip: "Opt for part-prepayment once every year using annual bonuses or windfalls. Prepaying even 10% to 20% of your principal can shave months off your tenure and save substantial interest.",
  },
  {
    id: "account-aggregator-safe",
    category: "disbursal",
    categoryLabel: "Disbursal & Safety",
    question: "What is the RBI Account Aggregator framework and is it secure?",
    quickTakeaway: "100% Encrypted • RBI licensed framework with zero password sharing",
    answer: [
      "The RBI Account Aggregator (AA) framework is a government-backed digital ecosystem that allows citizens to securely share financial statements with regulated lenders without uploading PDFs or sharing NetBanking passwords.",
      "All data transmission is encrypted end-to-end, consent-driven, and verified through an OTP sent to your registered mobile number. The lender cannot view or modify transactions beyond the approved statement period, ensuring total privacy.",
    ],
    proTip: "Using Account Aggregator reduces approval and sanction time from days to under 10 minutes because bank algorithms can verify income automatically.",
  },
  {
    id: "salary-to-loan-multiplier",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    question: "How much personal loan can I get based on my monthly salary?",
    quickTakeaway: "Typically 15x to 25x of your net monthly in-hand salary",
    answer: [
      "Banks generally calculate maximum loan eligibility using the Fixed Obligation to Income Ratio (FOIR). Lenders ensure that your total active monthly EMI repayments (including the prospective loan EMI) do not exceed 40% to 50% of your net monthly salary.",
      "As a standard thumb rule, salaried professionals in Tier-1 corporate brackets can obtain loan sanctions ranging from 15 times to up to 25 times their net monthly salary. For instance, an in-hand monthly salary of ₹1,00,000 with zero existing EMIs can easily qualify for a sanction of ₹15 Lakhs to ₹25 Lakhs.",
    ],
    proTip: "Closing or settling old unused credit card EMI lines or personal loans before applying drastically increases your disposable FOIR, unlocking significantly higher loan limits.",
  },
  {
    id: "tax-benefits-personal-loan",
    category: "rates",
    categoryLabel: "Rates & Charges",
    question: "Are there any tax benefits available on personal loans in India?",
    quickTakeaway: "Yes, if used for Home Renovation (Sec 24b) or Business Assets (Sec 37)",
    answer: [
      "While personal loans taken for general consumer expenses (such as vacations, weddings, or electronics) offer no tax deductions, tax benefits can be claimed under specific end-use circumstances:",
      "1. Home Renovation or Purchase: If the loan amount is proven to be utilized for home repair, renovation, or purchase, interest paid up to ₹30,000 per year (for repair) or ₹2,00,000 per year (for self-occupied property purchase/construction) is tax-deductible under Section 24(b) of the Income Tax Act.",
      "2. Business Purposes: If invested in a self-employed business or equipment, the entire interest component can be deducted as a legitimate business expense under Section 37(1).",
    ],
    proTip: "Maintain receipts, contractor invoices, and bank trail vouchers if you intend to claim income tax deductions under Section 24(b) or 37(1).",
  },
  {
    id: "bank-vs-nbfc-loan",
    category: "disbursal",
    categoryLabel: "Disbursal & Safety",
    question: "Should I choose a Bank or an NBFC for a personal loan?",
    quickTakeaway: "Banks offer lowest rates (from 9.99%) • NBFCs offer faster turnaround and flexible eligibility",
    answer: [
      "Scheduled Commercial Banks (such as HDFC, SBI, ICICI, Axis) typically provide the lowest interest rates and highest loan amounts up to ₹50 Lakhs, but require stricter credit score criteria (720+) and corporate company categorization.",
      "Non-Banking Financial Companies (NBFCs like Bajaj Finserv and Tata Capital) often process applications faster with flexible CIBIL score acceptance and flexi-hybrid loan facilities (withdrawing funds as needed and paying interest only on the utilized sum).",
    ],
    proTip: "If you have a 750+ CIBIL score and work with an established corporate firm, choose a bank for the lowest interest rate. If you need lightning 20-minute emergency disbursal or have a moderate credit score, an NBFC is the ideal choice.",
  },
];

export default function PersonalLoanFAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("reducing-vs-flat");
  const [votedMap, setVotedMap] = useState<Record<string, "yes" | "no">>({});

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "rates", label: "Rates & EMIs" },
    { id: "eligibility", label: "Eligibility & CIBIL" },
    { id: "disbursal", label: "Disbursal & Safety" },
    { id: "prepayment", label: "Prepayment & Fees" },
  ];

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.quickTakeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleVote = (id: string, vote: "yes" | "no") => {
    setVotedMap((prev) => ({ ...prev, [id]: vote }));
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Transparent Answers
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Clear, authoritative answers to help you navigate interest rates, prepayment norms, and instant loan approvals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions about interest rates, CIBIL, foreclosure..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const hasVoted = votedMap[faq.id];

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                    isOpen ? "border-primary/40 shadow-sm" : "border-gray-200/80 hover:border-gray-300"
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EBF4ED] text-primary border border-primary/15">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                      <p className="text-xs text-emerald-800 font-semibold mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {faq.quickTakeaway}
                      </p>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed animate-fadeIn">
                      {faq.answer.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}

                      {/* ProTip Box */}
                      {faq.proTip && (
                        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-950 mt-4">
                          <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold block mb-0.5">Grofi Expert ProTip:</strong>
                            <span>{faq.proTip}</span>
                          </div>
                        </div>
                      )}

                      {/* Was this helpful? */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>Was this answer helpful?</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVote(faq.id, "yes")}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                              hasVoted === "yes"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : "hover:bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>Yes</span>
                          </button>
                          <button
                            onClick={() => handleVote(faq.id, "no")}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                              hasVoted === "no"
                                ? "bg-red-50 text-red-700 border-red-300"
                                : "hover:bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            <span>No</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-sm font-semibold text-gray-700">No matching questions found.</p>
              <p className="text-xs text-gray-500 mt-1">Try adjusting your search query or choosing another category.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
