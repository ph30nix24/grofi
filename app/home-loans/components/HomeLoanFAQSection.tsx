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

export interface HomeLoanFAQItem {
  id: string;
  category: "rates" | "transfer" | "overdraft" | "tax" | "eligibility";
  categoryLabel: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}

const FAQ_DATA: HomeLoanFAQItem[] = [
  {
    id: "eblr-repo-rate",
    category: "rates",
    categoryLabel: "Rates & EBLR",
    question: "What is Repo-Linked EBLR and how does it benefit home loan borrowers?",
    quickTakeaway: "100% transparent • Automatic rate cuts when RBI cuts repo rate",
    answer: [
      "External Benchmark Lending Rate (EBLR) is an RBI-mandated framework for all floating-rate housing loans from scheduled commercial banks. The interest rate is tied directly to the RBI Repo Rate plus an operating spread and credit-risk premium.",
      "Whenever the RBI cuts the repo rate, banks are legally mandated to pass on the rate cut to your home loan within 3 months, ensuring you don't stay locked into outdated high rates.",
      "All partner banks featured on Grofi (SBI, HDFC, ICICI, BoB, Kotak) benchmark floating housing loans against RBI EBLR with transparent resets.",
    ],
    proTip: "Check your sanction letter for the 'Reset Frequency' (usually quarterly or 3 months). When RBI policy changes, your EMI or tenure adjusts automatically.",
  },
  {
    id: "overdraft-maxgain-how",
    category: "overdraft",
    categoryLabel: "Overdraft & Maxgain",
    question: "How does a Home Loan Overdraft (SBI Maxgain / ICICI Money Saver) work?",
    quickTakeaway: "Park surplus salary to offset interest • Withdraw anytime with zero penalty",
    answer: [
      "A home loan overdraft account gives you a current/savings account linked directly to your housing loan. The interest on your loan is calculated daily on the net balance (Outstanding Principal minus Balance in Overdraft Account).",
      "For example, if you have a ₹50 Lakh loan and keep ₹10 Lakhs parked in your overdraft account, you are charged interest ONLY on ₹40 Lakhs for that day.",
      "Unlike a normal prepayment where money is permanently deposited into the loan, overdraft funds remain 100% liquid—you can withdraw them anytime via ATM, cheque, or UPI whenever needed.",
    ],
    proTip: "If you are a salaried professional receiving annual bonuses or maintaining an emergency fund, an Overdraft loan can shave 5 to 8 years off your loan tenure without locking away your liquidity.",
  },
  {
    id: "balance-transfer-savings",
    category: "transfer",
    categoryLabel: "Balance Transfer",
    question: "How much money can I actually save through a Home Loan Balance Transfer?",
    quickTakeaway: "Often saves ₹5 Lakhs to ₹25+ Lakhs over remaining tenure",
    answer: [
      "A home loan balance transfer involves refinancing your existing high-interest loan (e.g. 9.25% p.a.) with a new lender offering lower prime rates (e.g. 7.25% p.a.).",
      "On a ₹50 Lakh loan with 20 years remaining, even a 1.00% rate reduction cuts your monthly EMI by over ₹3,200 and saves approximately ₹8 Lakhs in total interest outgo.",
      "Additionally, balance transfer borrowers frequently qualify for high top-up loan sanctions at the exact same low home loan interest rates—far cheaper than 11-16% personal loans.",
    ],
    proTip: "Ensure your remaining tenure is at least 5 years and current principal is above ₹20 Lakhs so the interest savings easily outweigh one-time processing and MODT charges.",
  },
  {
    id: "tax-benefits-sections",
    category: "tax",
    categoryLabel: "Tax Deductions",
    question: "What income tax deductions can I claim on my home loan under Section 24(b) and 80C?",
    quickTakeaway: "Save up to ₹2L on interest (Sec 24b) and ₹1.5L on principal (Sec 80C) annually",
    answer: [
      "Under Section 24(b) of the Income Tax Act, you can claim a deduction of up to ₹2,00,000 per financial year against interest paid on a loan for a self-occupied property.",
      "Under Section 80C, you can claim up to ₹1,50,000 annually towards the principal repayment component. You can also include stamp duty and registration charges paid in the year of purchase within this limit.",
      "Under Section 80EEA, first-time home buyers of affordable housing (stamp value up to ₹45 Lakhs) can claim an additional ₹1,50,000 interest deduction.",
      "If you and your spouse co-own and co-borrow the property, both of you can claim these deductions individually, reaching up to ₹7,00,000 in combined annual deductions!",
    ],
    proTip: "These deductions apply under the Old Tax Regime. Compare your total deductions against the New Tax Regime slabs to pick the optimal filing method.",
  },
  {
    id: "women-concession-rules",
    category: "rates",
    categoryLabel: "Rates & EBLR",
    question: "How does the women borrower interest concession work?",
    quickTakeaway: "0.05% (5 bps) interest concession across leading banks and HFCs",
    answer: [
      "To encourage female property ownership, most scheduled commercial banks (such as SBI, Bank of Baroda, HDFC, Canara Bank, and Punjab National Bank) offer a 0.05% (5 bps) concession on standard card rates.",
      "To qualify, a woman must be either the sole applicant or the primary co-applicant and must also be a registered co-owner of the property.",
      "While 0.05% sounds modest, on a ₹75 Lakh home loan over 25 years, it saves over ₹70,000 to ₹1,00,000 in interest over the life of the loan.",
    ],
    proTip: "Registering the property in a woman's name in many states (like Delhi, Haryana, UP, and Maharashtra) also offers 1% to 2% lower stamp duty charges during property registration.",
  },
  {
    id: "prepayment-foreclosure-penalty",
    category: "rates",
    categoryLabel: "Rates & EBLR",
    question: "Are there any foreclosure or part-prepayment charges on home loans?",
    quickTakeaway: "Zero penalty • RBI strictly prohibits prepayment charges on individual floating loans",
    answer: [
      "Per Reserve Bank of India (RBI) directives, banks and housing finance companies (HFCs) are strictly prohibited from levying any foreclosure penalty or part-prepayment charges on floating-rate home loans sanctioned to individual borrowers.",
      "You are free to prepay any amount—whether ₹10,000 or ₹10 Lakhs—from your salary, bonus, or savings at any point without incurring any extra fee.",
      "Prepayment penalties only apply to fixed-rate housing loans or loans sanctioned to corporate entities / non-individual borrowers.",
    ],
    proTip: "Whenever you make a part-prepayment, ask your bank to reduce your loan tenure rather than lowering the EMI. Reducing tenure maximizes your total interest savings.",
  },
  {
    id: "cibil-score-needed-home-loan",
    category: "eligibility",
    categoryLabel: "Eligibility & Documents",
    question: "What minimum CIBIL score is required for home loan approval at lowest interest rates?",
    quickTakeaway: "750+ gets prime sovereign rates (7.15% - 7.35%) • 700+ gets approved",
    answer: [
      "Most scheduled commercial banks prefer a CIBIL score of 750 or above. Borrowers in the 750–900 tier are eligible for the lowest published rate slabs without risk spread markups.",
      "Borrowers with CIBIL scores between 700 and 749 are routinely approved, but lenders may add a 10–25 bps risk spread to the base rate.",
      "If your score is below 700, Housing Finance Companies (such as LIC HFL or Bajaj Housing Finance) offer specialized underwriting, or you can add a creditworthy co-applicant to strengthen eligibility.",
    ],
    proTip: "Clear all outstanding credit card balances and ensure zero delayed payments in the 6 months prior to applying to present a pristine credit profile.",
  },
  {
    id: "soft-inquiry-grofi-check",
    category: "eligibility",
    categoryLabel: "Eligibility & Documents",
    question: "Will checking my home loan eligibility on Grofi hurt my credit score?",
    quickTakeaway: "Zero Impact • Soft credit pull has no effect on your CIBIL score",
    answer: [
      "No. Checking your pre-approved eligibility and loan matches on Grofi triggers only a 'Soft Inquiry'. Soft credit pulls are completely invisible to other lenders and deduct zero points from your CIBIL score.",
      "A formal hard credit pull occurs only when you submit your completed application to a specific chosen bank for final disbursement.",
    ],
    proTip: "By matching you with the ideal bank upfront, Grofi prevents you from submitting random loan applications to multiple banks, protecting your CIBIL score from multiple hard hits.",
  },
];

export default function HomeLoanFAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("eblr-repo-rate");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "rates", label: "Rates & EBLR" },
    { id: "overdraft", label: "Overdraft & Maxgain" },
    { id: "transfer", label: "Balance Transfer" },
    { id: "tax", label: "Tax Deductions" },
    { id: "eligibility", label: "Eligibility & CIBIL" },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const inQuestion = item.question.toLowerCase().includes(q);
        const inTakeaway = item.quickTakeaway.toLowerCase().includes(q);
        const inAnswer = item.answer.some((a) => a.toLowerCase().includes(q));
        if (!inQuestion && !inTakeaway && !inAnswer) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Home Loan Knowledge Base
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Clear, expert answers on repo-linked EBLR rates, overdraft interest savings, tax deductions, and balance transfers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. Maxgain, repo rate, tax benefit, prepayment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-2xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-hidden transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-2xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-xs text-gray-500">
              No questions matched your search query. Try searching for &ldquo;rate&rdquo;, &ldquo;tax&rdquo;, or &ldquo;overdraft&rdquo;.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md mb-1.5 inline-block">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                      <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 shrink-0" />
                        <span>{faq.quickTakeaway}</span>
                      </p>
                    </div>

                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-180 bg-primary text-white" : "text-gray-500"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-gray-600 border-t border-gray-100 leading-relaxed space-y-2.5 animate-fadeIn">
                      {faq.answer.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}

                      {faq.proTip && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-relaxed">
                            <strong className="font-bold">Grofi Pro Tip: </strong>
                            {faq.proTip}
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
