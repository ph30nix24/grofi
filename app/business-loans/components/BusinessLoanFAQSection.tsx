"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Lightbulb,
  ThumbsUp,
  Percent,
  ShieldCheck,
  Building2,
  Zap,
} from "lucide-react";
import { BusinessLoanFAQItem } from "./type";

const FAQ_DATA: BusinessLoanFAQItem[] = [
  {
    id: "unsecured-limits",
    category: "collateral",
    categoryLabel: "Collateral & CGTMSE",
    question: "Can I get a business loan in India without pledging any collateral or property?",
    quickTakeaway: "Yes • Unsecured loans up to ₹75 Lakhs available • Up to ₹5 Cr with CGTMSE guarantee",
    answer: [
      "Yes, leading banks (HDFC, ICICI, Kotak, Axis, IDFC FIRST) and premier NBFCs (Bajaj Finserv, Tata Capital) offer collateral-free unsecured business loans up to ₹75 Lakhs to ₹1 Crore based purely on cash-flow metrics, audited financials, and GST return consistency.",
      "Furthermore, under the Government of India's CGTMSE scheme, Micro and Small Enterprises can secure up to ₹5 Crores in term loans and working capital credit without offering third-party guarantors or physical collateral.",
    ],
    proTip: "If you lack property collateral, maintain an immaculate 12-month current account banking record and submit filed GSTR-3B copies to unlock high unsecured limits.",
  },
  {
    id: "reducing-vs-flat-business",
    category: "rates",
    categoryLabel: "Rates & Charges",
    question: "How are business loan interest rates calculated, and what is the difference between Reducing Balance and Flat rates?",
    quickTakeaway: "Always select Monthly Reducing Balance • Flat rates appear low but cost nearly 1.8x more",
    answer: [
      "In a Monthly Reducing Balance method, interest is calculated solely on the outstanding principal loan balance at the end of each billing cycle. As you pay your EMIs, the principal decreases, which continuously lowers your interest outflow.",
      "In a Flat Interest Rate method, interest is calculated on the entire initial sanction amount for the entire duration, regardless of how much you have already paid. An 8% flat rate is equivalent to approximately 14.5% reducing rate.",
      "All commercial partner lenders listed on Grofi adhere strictly to RBI fair practice guidelines and calculate interest on an effective reducing balance benchmark.",
    ],
    proTip: "Always compare the Annual Percentage Rate (APR) rather than the nominal flat headline rate to understand the true borrowing cost.",
  },
  {
    id: "foreclosure-rules",
    category: "rates",
    categoryLabel: "Rates & Charges",
    question: "Can I foreclose or prepay my business loan early? What are the RBI penalty guidelines?",
    quickTakeaway: "Zero foreclosure penalty for MSEs on floating-rate loans under RBI mandates",
    answer: [
      "Under Reserve Bank of India (RBI) circulars, banks and NBFCs cannot levy any foreclosure charges or prepayment penalties on floating-rate loans sanctioned to individual proprietors and Micro/Small Enterprises (MSEs).",
      "For fixed-rate business loans, or loans extended to large private limited companies, lenders typically charge between 2% and 4% + GST on the outstanding principal balance if closed before the agreed tenure, usually subject to a 6-month lock-in.",
    ],
    proTip: "If you anticipate seasonal business cash windfalls, always opt for a floating-rate loan or an Overdraft (OD) facility so you can deposit surplus cash and save interest without penalty.",
  },
  {
    id: "turnover-vintage",
    category: "eligibility",
    categoryLabel: "Eligibility & Turnover",
    question: "What minimum annual turnover and operating vintage are required for loan approval?",
    quickTakeaway: "₹20L - ₹40L turnover • Minimum 2 to 3 years vintage for private banks; 1 year for NBFCs",
    answer: [
      "Scheduled commercial banks generally require a minimum annual turnover of ₹40 Lakhs with at least 3 years of audited financials or active GST registration.",
      "However, agile NBFCs and fintech lenders partner with enterprises having 1 year of vintage and ₹20 Lakhs to ₹25 Lakhs turnover, utilizing surrogate underwriting methods like POS card swipe volumes or GST portal data.",
    ],
    proTip: "Even if your registered business is under 2 years old, prior continuous industry experience of the promoter can be counted by credit underwriters to waive vintage shortfalls.",
  },
  {
    id: "cibil-score-needed-business",
    category: "eligibility",
    categoryLabel: "Eligibility & Turnover",
    question: "What minimum CIBIL score and Commercial Credit Report (CMR) rank are mandatory?",
    quickTakeaway: "675+ for PSU banks • 700+ for prime private banks • CMR Rank 1 to 5 for corporate entities",
    answer: [
      "For proprietorships and partnerships, lenders evaluate the personal CIBIL score of the key promoters (preferred 700 to 750+). For private limited and corporate entities, bureaus generate a Commercial CMR rank from 1 (lowest risk) to 10 (highest risk), with CMR 1 to 5 considered prime.",
      "If your score is between 650 and 699, sanctions are still viable through specialized NBFCs or by providing collateral security / co-applicant guarantees.",
    ],
    proTip: "Avoid running simultaneous hard credit inquiries across multiple banks directly; use Grofi's soft pre-check to maintain zero impact on your CIBIL.",
  },
  {
    id: "term-loan-vs-od",
    category: "collateral",
    categoryLabel: "Collateral & CGTMSE",
    question: "What is the difference between a Business Term Loan and a Drop-Line Overdraft (OD) facility?",
    quickTakeaway: "Term loans disburse lump sum with fixed EMI • OD charges interest only on the utilized amount",
    answer: [
      "A Term Loan is disbursed as a one-time lump-sum amount into your business account with fixed monthly EMIs over 1 to 5 years. It is best suited for capital expenditure, machinery purchase, or office expansion.",
      "An Overdraft (OD) or Cash Credit (CC) limit is a revolving credit line where you only pay interest on the money you actually draw out on a daily basis. You can deposit surplus business earnings back into the account anytime to reduce interest costs.",
    ],
    proTip: "If your cash flows fluctuate significantly with client payments and supplier cycles, choose an Overdraft facility like ICICI InstaOD or IDFC Booster OD.",
  },
  {
    id: "disbursal-timeline",
    category: "disbursal",
    categoryLabel: "Disbursal & Verification",
    question: "How fast can my enterprise receive sanctioned funds, and what is the Account Aggregator framework?",
    quickTakeaway: "48 to 72 hours for unsecured loans • Instant 100% paperless sync via RBI Account Aggregator",
    answer: [
      "Once you submit your application through Grofi, digital underwriting algorithms verify your GSTIN filings and bank statements within 2 to 4 hours. Final credit sanction and disbursement typically take 48 to 72 business hours.",
      "The RBI Account Aggregator (AA) framework is a highly secure, consent-based digital network that pulls verified bank statements directly from your bank without uploading bank statement PDFs or entering NetBanking passwords.",
    ],
    proTip: "Sharing statements via Account Aggregator accelerates sanction approval by up to 3 business days compared to manual physical branch verification.",
  },
  {
    id: "cgtmse-guarantee-cost",
    category: "collateral",
    categoryLabel: "Collateral & CGTMSE",
    question: "How much does the CGTMSE guarantee fee cost, and who pays it?",
    quickTakeaway: "Annual guarantee fee ranges from 0.37% to 1.35% + GST payable to the trust",
    answer: [
      "The CGTMSE guarantee fee is charged annually on the sanctioned loan amount, generally ranging from 0.37% to 1.35% depending on the loan quantum and borrower category.",
      "Subsidized lower fee brackets apply to women entrepreneurs, SC/ST promoters, and enterprises located in aspirational districts or the North-Eastern region.",
    ],
    proTip: "Even with the small annual guarantee fee, CGTMSE loans are far more cost-effective than private unsecured loans because PSU banks charge prime rates as low as 8.85% to 9.25% under the scheme.",
  },
];

export default function BusinessLoanFAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("unsecured-limits");

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "collateral", label: "Collateral & CGTMSE", icon: ShieldCheck },
    { id: "rates", label: "Rates & Charges", icon: Percent },
    { id: "eligibility", label: "Eligibility & Turnover", icon: Building2 },
    { id: "disbursal", label: "Disbursal & Speed", icon: Zap },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuestion = item.question.toLowerCase().includes(q);
        const matchesAnswer = item.answer.some((a) => a.toLowerCase().includes(q));
        const matchesTakeaway = item.quickTakeaway.toLowerCase().includes(q);
        if (!matchesQuestion && !matchesAnswer && !matchesTakeaway) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Knowledge Base & Clarifications
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Everything you need to know about commercial interest benchmarks, collateral-free CGTMSE rules, turnover eligibility, and disbursal timelines.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search e.g. CGTMSE, foreclosure, turnover, overdraft..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hidden pb-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-gray-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-primary/40 shadow-md ring-1 ring-primary/10" : "border-gray-200/90 shadow-2xs hover:border-gray-300"
                  }`}
                >
                  {/* Header Button */}
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EBF4ED] text-primary">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                      {faq.quickTakeaway && !isOpen && (
                        <p className="text-xs text-emerald-800 font-semibold mt-1">
                          ⚡ {faq.quickTakeaway}
                        </p>
                      )}
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Collapsible Answer */}
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 border-t border-gray-100 pt-3 text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed animate-fadeIn">
                      {faq.quickTakeaway && (
                        <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-emerald-950 font-semibold flex items-center gap-2 text-xs">
                          <ThumbsUp className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>{faq.quickTakeaway}</span>
                        </div>
                      )}

                      {faq.answer.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}

                      {faq.proTip && (
                        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-950 text-xs flex items-start gap-2.5">
                          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold block mb-0.5">Grofi Underwriter Tip:</strong>
                            <span>{faq.proTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
              <p className="text-xs text-gray-500">No questions match &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Clear search and view all FAQs
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
