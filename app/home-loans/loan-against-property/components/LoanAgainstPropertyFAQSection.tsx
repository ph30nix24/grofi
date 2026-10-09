"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Lightbulb,
} from "lucide-react";

export interface LAPFAQItem {
  id: string;
  category: "eligibility" | "property" | "rates" | "foreclosure" | "documents";
  categoryLabel: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}

const FAQ_DATA: LAPFAQItem[] = [
  {
    id: "lap-difference-home-loan",
    category: "eligibility",
    categoryLabel: "Basics & Eligibility",
    question: "What is the difference between a Home Loan and a Loan Against Property (LAP)?",
    quickTakeaway: "Home Loan buys a house • LAP pledges an existing property to raise cash for any purpose",
    answer: [
      "A Home Loan is strictly an 'end-use specific' loan taken exclusively to purchase, construct, or extend a residential property. The interest rates are marginally lower (7.15% - 8.5% p.a.), and funding can reach up to 90% of the property value.",
      "A Loan Against Property (Mortgage Loan), in contrast, allows you to pledge an already owned, unencumbered residential or commercial property to raise cash for ANY legal requirement—such as business expansion, working capital, debt consolidation, medical emergencies, or overseas education.",
      "LAP offers loan amounts up to ₹25+ Crores, tenures up to 20 years, and interest rates starting from 8.75% to 10.5% p.a.",
    ],
    proTip: "If you already have an ongoing home loan on the property, check if a 'Top-Up Home Loan' is possible before applying for a fresh LAP, as top-ups are often faster and carry home loan rates.",
  },
  {
    id: "how-much-loan-against-property",
    category: "property",
    categoryLabel: "Property & Valuation",
    question: "How much loan can I get against my property (LTV ratio norms)?",
    quickTakeaway: "Up to 70% – 75% for residential • Up to 60% – 65% for commercial properties",
    answer: [
      "The loan quantum is determined by two factors: the Fair Market Value (FMV) of the property (assessed by bank-empanelled technical valuers) and your monthly repayment capacity (Fixed Obligation to Income Ratio - FOIR).",
      "For self-occupied residential houses and flats, banks sanction up to 70% to 75% of the market valuation.",
      "For commercial properties (registered offices, retail shops, showrooms), the Loan-to-Value (LTV) typically ranges between 55% and 65%.",
      "For industrial properties and warehouse sheds, LTV is generally capped at 50% to 55%.",
    ],
    proTip: "Ensure your property has a clear municipal completion certificate (CC) or occupancy certificate (OC). Properties with unauthorized deviation floors suffer heavy valuation haircuts.",
  },
  {
    id: "dropline-overdraft-how",
    category: "rates",
    categoryLabel: "Rates & Overdraft",
    question: "How does a Mortgage Overdraft / Dropline OD work on a Loan Against Property?",
    quickTakeaway: "Interest charged ONLY on utilized funds • Zero interest on unused credit limit",
    answer: [
      "An overdraft LAP links a current account to your mortgaged property limit. Instead of receiving the entire multi-crore loan as a lump sum, the bank sanctions a drawing limit.",
      "Interest is calculated strictly on the daily utilized balance at the close of business hours, NOT on the total sanctioned limit.",
      "You can deposit surplus business sales or customer receivables into the account at any time to instantly bring down your interest outflow, and withdraw funds whenever business vendor payments or raw material needs arise.",
    ],
    proTip: "For MSME business owners with seasonal cash flow cycles, opting for an Overdraft LAP can save 40% – 60% in annual interest expenses compared to a traditional term loan.",
  },
  {
    id: "foreclosure-charges-lap",
    category: "foreclosure",
    categoryLabel: "Prepayment & Fees",
    question: "Are there prepayment or foreclosure charges on Loan Against Property?",
    quickTakeaway: "0% penalty on floating rate loans for individual borrowers under RBI mandate",
    answer: [
      "In compliance with official Reserve Bank of India (RBI) notifications, banks and Housing Finance Companies (HFCs) CANNOT levy any foreclosure charges or part-prepayment penalties on floating rate loans granted to individual borrowers (sole or joint).",
      "However, if the loan is availed in the name of a non-individual entity (Pvt Ltd Company, Partnership Firm, or LLP) or carries a fixed interest rate, lenders may charge between 2% and 4% + GST on the outstanding principal.",
    ],
    proTip: "If you run a proprietorship or family business, apply as individual co-owners with your spouse or family members to permanently enjoy 0% floating foreclosure penalties.",
  },
  {
    id: "documents-title-chain",
    category: "documents",
    categoryLabel: "Title Deeds & Legal",
    question: "What property documents are required for a Loan Against Property?",
    quickTakeaway: "Original Registered Sale Deed • 30-year chain deeds • Encumbrance Certificate Form 15",
    answer: [
      "1. Original Registered Title Deed / Conveyance Deed in the name of the current applicant.",
      "2. Chain of prior Title Deeds tracing the property's legal ownership uninterrupted for the past 30 years (Mother Deed, Partition Deeds, Gift Deeds, Allotment Letters).",
      "3. Encumbrance Certificate (EC Form 15) for the last 13 to 30 years from the sub-registrar office.",
      "4. Approved Sanctioned Layout / Building Plan issued by the municipal authority or town planning corporation.",
      "5. Latest Municipal Property Tax Paid receipts and Khata / Patta mutation extract.",
    ],
    proTip: "If your original title deed is deposited with another bank under an existing mortgage, Grofi can arrange a 'Takeover / Balance Transfer' where the new bank issues a payout pay-order to retrieve the deeds directly.",
  },
  {
    id: "cibil-score-lap",
    category: "eligibility",
    categoryLabel: "Basics & Eligibility",
    question: "What is the minimum CIBIL score required for Loan Against Property?",
    quickTakeaway: "700+ gets best interest rates • NBFCs approve credit scores down to 650+",
    answer: [
      "Top scheduled banks (SBI, HDFC, ICICI, Axis, Bank of Baroda) require a credit score of 720 to 750+ to offer their lowest benchmark interest rates (8.75% - 9.50% p.a.).",
      "However, since Loan Against Property is a secured mortgage backed by physical real estate collateral, leading NBFCs and HFCs (such as Bajaj Finserv, Tata Capital, Godrej Housing) regularly sanction loans for borrowers with CIBIL scores between 650 and 700.",
    ],
    proTip: "If you have a past technical default or low credit score, adding a creditworthy co-applicant (such as an earning spouse or child with a 750+ CIBIL score) dramatically improves approval odds.",
  },
  {
    id: "tax-benefits-lap-section",
    category: "rates",
    categoryLabel: "Rates & Overdraft",
    question: "Can I claim income tax deductions on a Loan Against Property?",
    quickTakeaway: "Yes! 100% interest deductible under Sec 37(1) for business • Up to ₹2L under Sec 24(b) for home repair",
    answer: [
      "Yes, depending on how the loan proceeds are utilized:",
      "1. Under Section 37(1): If LAP funds are used for business operations, working capital, or office equipment, 100% of the interest paid is fully tax-deductible as a business expenditure from your gross profit.",
      "2. Under Section 24(b): If the loan is utilized for home repair, renovation, or structural extension, you can claim an interest deduction of up to ₹2 Lakhs per year (for self-occupied property).",
      "Note: Principal repayments on LAP do NOT qualify for deduction under Section 80C.",
    ],
    proTip: "Maintain documented audit trails (bank account statements and vendor invoices) demonstrating that the disbursed mortgage proceeds were directly utilized for eligible business or renovation expenses.",
  },
  {
    id: "negative-locations-lap",
    category: "property",
    categoryLabel: "Property & Valuation",
    question: "Can I get a loan against Gram Panchayat or unauthorized colony property?",
    quickTakeaway: "Generally rejected by major banks • Approved only if DTCP/BMRDA layout regularized",
    answer: [
      "Major scheduled banks (SBI, HDFC, ICICI) strictly require clear municipal corporation sanctions (BBMP, BMC, DDA, HUDA, BDA, etc.). Properties located in unapproved Gram Panchayat zones or unauthorized colonies lacking layout regularization are generally ineligible.",
      "However, specialized housing finance companies and regional NBFCs consider properties with Gram Panchayat approval if the land is non-agricultural (NA converted) and falls within recognized municipal urban agglomeration master plans.",
    ],
    proTip: "Obtain a formal legal opinion on your property papers from Grofi's legal desk before paying non-refundable technical valuation fees to banks.",
  },
];

export default function LoanAgainstPropertyFAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("lap-difference-home-loan");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "eligibility", label: "Eligibility & Basics" },
    { id: "property", label: "Property & Valuation" },
    { id: "rates", label: "Rates & Overdraft" },
    { id: "foreclosure", label: "Prepayment & Fees" },
    { id: "documents", label: "Title Deeds & Legal" },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inQuestion = item.question.toLowerCase().includes(q);
        const inTakeaway = item.quickTakeaway.toLowerCase().includes(q);
        const inAnswer = item.answer.some((p) => p.toLowerCase().includes(q));
        const inTip = item.proTip.toLowerCase().includes(q);
        if (!inQuestion && !inTakeaway && !inAnswer && !inTip) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs-section" className="py-12 sm:py-16 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Frequently Asked Questions
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Loan Against Property <span className="text-primary">Questions Answered</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Clear, transparent answers on property valuation norms, legal title deeds, overdraft mechanisms, and foreclosure charges.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. overdraft, CIBIL score, Gram Panchayat, foreclosure)..."
            className="w-full bg-gray-50 text-gray-800 text-xs sm:text-sm pl-10 pr-9 py-3 rounded-2xl border border-gray-200 focus:outline-hidden focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-hidden">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === c.id
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#FDFBF7] border-primary/30 shadow-xs"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                        {faq.categoryLabel}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 hidden sm:inline">
                        • {faq.quickTakeaway}
                      </span>
                    </div>
                    <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 space-y-3 animate-fadeIn border-t border-gray-100/80">
                    <div className="space-y-2 leading-relaxed pt-2">
                      {faq.answer.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Pro Tip Callout */}
                    <div className="bg-white border border-gray-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-gray-700 shadow-2xs">
                      <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 font-bold block mb-0.5">Grofi Mortgage Advisory Tip:</strong>
                        <span>{faq.proTip}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">
                No FAQs match your search query &quot;{searchQuery}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
