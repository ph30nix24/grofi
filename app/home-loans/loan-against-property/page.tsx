import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { LoanAgainstPropertyLender } from "./components/type";
import { FALLBACK_LAP_LENDERS } from "./components/fallbackData";
import LoanAgainstPropertyHero from "./components/LoanAgainstPropertyHero";
import LoanAgainstPropertyExplorer from "./components/LoanAgainstPropertyExplorer";
import LoanAgainstPropertyCalculator from "./components/LoanAgainstPropertyCalculator";
import LoanAgainstPropertyComparisonTable from "./components/LoanAgainstPropertyComparisonTable";
import LoanAgainstPropertyStepsSection from "./components/LoanAgainstPropertyStepsSection";
import LoanAgainstPropertyTypesGuide from "./components/LoanAgainstPropertyTypesGuide";
import LoanAgainstPropertyVsOthers from "./components/LoanAgainstPropertyVsOthers";
import LoanAgainstPropertyTaxGuide from "./components/LoanAgainstPropertyTaxGuide";
import LoanAgainstPropertyFAQSection from "./components/LoanAgainstPropertyFAQSection";
import LoanAgainstPropertyTrustSection from "./components/LoanAgainstPropertyTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Compare Best Loan Against Property in India (2026) | Mortgage Rates from 8.75% - Grofi",
  description:
    "Compare Loan Against Property (LAP) and mortgage overdraft across 10+ top Indian banks & NBFCs including SBI, HDFC, ICICI, Axis, Bank of Baroda, Kotak & Bajaj Finserv. Lowest interest rates starting from 8.75% p.a., up to 75% LTV, funding up to ₹25+ Cr, flexible overdraft facilities, and zero prepayment penalties for individuals.",
  alternates: { canonical: "/home-loans/loan-against-property" },
  keywords: [
    "loan against property",
    "compare loan against property",
    "best mortgage loan India",
    "lowest lap interest rate",
    "loan against property interest rate 2026",
    "sbi loan against property",
    "hdfc loan against property",
    "icici lap",
    "axis bank loan against property",
    "bank of baroda mortgage loan",
    "kotak loan against property",
    "bajaj finserv lap",
    "tata capital loan against property",
    "idfc first bank lap",
    "property overdraft facility",
    "dropline overdraft against property",
    "commercial property mortgage loan",
    "loan against residential property",
    "lap emi calculator",
    "lap ltv calculator",
    "lap tax deduction section 37",
    "Grofi loan against property",
  ],
  openGraph: {
    title: "Compare Best Loan Against Property in India | Rates from 8.75% - Grofi",
    description:
      "Unlock property equity up to ₹25+ Crore with India's lowest mortgage interest rates starting at 8.75% p.a. Up to 75% LTV, dropline overdraft options, and doorstep legal verification on Grofi.",
    url: "https://www.grofi.in/home-loans/loan-against-property",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Against Property (2026) | Compare Top 10 Banks - Grofi",
    description:
      "Compare 10+ verified banks & NBFCs. Up to 75% LTV funding, multi-crore ticket sizes, overdraft facilities, and zero prepayment penalties on floating rates.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchLoanAgainstProperty(): Promise<LoanAgainstPropertyLender[]> {
  try {
    const rawData = await prisma.loanAgainstProperty.findMany({
      orderBy: [
        { startingEmiPerLakh15Yr: "asc" },
        { rating: "desc" },
      ],
      omit: {
        title: true,
        description: true,
        keywords: true,
        openGraphTitle: true,
        openGraphDesc: true,
        twitterTitle: true,
        twitterDesc: true,
        faqs: true,
      },
    });

    const parsed = JSON.parse(JSON.stringify(rawData)) as LoanAgainstPropertyLender[];
    if (parsed && parsed.length > 0) {
      return parsed;
    }
    return FALLBACK_LAP_LENDERS;
  } catch (error) {
    console.warn("Database fetch failed for Loan Against Property, using fallback data:", error);
    return FALLBACK_LAP_LENDERS;
  }
}

export default async function LoanAgainstPropertyPage() {
  const lenders = await fetchLoanAgainstProperty();

  // JSON-LD Structured Data for Search Engine Optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.grofi.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Home Loans",
            "item": "https://www.grofi.in/home-loans",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Loan Against Property",
            "item": "https://www.grofi.in/home-loans/loan-against-property",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Loan Against Property (LAP) Lenders in India",
        "description":
          "Compare lowest interest rate mortgage loans and overdraft facilities against residential and commercial property from top Indian banks and NBFCs.",
        "numberOfItems": lenders.length,
        "itemListElement": lenders.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "BankOrCreditUnion",
              "name": lender.name.replace(/Loan Against Property|Mortgage Loan/i, "").trim(),
            },
            "description": lender.tagline,
            "annualPercentageRate": lender.interestRate?.min ?? 9.25,
            "feesAndCommissionsSpecification": lender.processingFee,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between a Home Loan and a Loan Against Property (LAP)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A home loan is taken exclusively to buy or construct a residential property. A Loan Against Property (LAP) pledges an existing unencumbered property to raise capital for any legal purpose including business expansion, debt consolidation, or higher education.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the maximum LTV ratio permitted on a Loan Against Property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Banks typically sanction up to 70% to 75% of fair market value for residential self-occupied properties, 60% to 65% for commercial offices/shops, and 50% to 55% for industrial properties.",
            },
          },
          {
            "@type": "Question",
            "name": "How does an Overdraft / Dropline OD work on a Loan Against Property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An overdraft LAP links a current account to your mortgaged property limit. Interest is charged strictly on the daily utilized balance, not the sanctioned limit. Borrowers can deposit surplus cash anytime to reduce interest and withdraw as needed.",
            },
          },
          {
            "@type": "Question",
            "name": "Are there prepayment charges on floating rate Loan Against Property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Per RBI directives, individual borrowers availing floating-rate mortgage loans incur 0% / Nil foreclosure charges and part-prepayment penalties.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I claim income tax deductions on a Loan Against Property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Under Section 37(1), 100% of the interest paid is fully deductible as a business expense if loan proceeds are utilized for business operations. Under Section 24(b), up to ₹2 Lakhs can be deducted if used for residential home renovation.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Hero Section with Partner Bank Logos & Instant Property Valuation Form */}
        <LoanAgainstPropertyHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading Loan Against Property lenders...</span>
              </div>
            </div>
          }
        >
          <LoanAgainstPropertyExplorer initialLenders={lenders} />
        </Suspense>

        {/* Dual-Mode Interactive LAP Calculator (EMI & Amortization + Property LTV Feasibility) */}
        <LoanAgainstPropertyCalculator />

        {/* 2026 LAP Rates, EMIs & LTV Matrix Comparison Table */}
        <LoanAgainstPropertyComparisonTable lenders={lenders} />

        {/* 5-Step Digital Mortgage Disbursal Journey */}
        <LoanAgainstPropertyStepsSection />

        {/* Accepted Property Types, LTVs & 30-Year Title Deeds Checklist */}
        <LoanAgainstPropertyTypesGuide />

        {/* LAP vs Personal Loan vs Home Loan Top-Up vs Business Loan */}
        <LoanAgainstPropertyVsOthers />

        {/* Income Tax Act Guide (Section 37(1) Business & Section 24(b) Renovation Deductions) */}
        <LoanAgainstPropertyTaxGuide />

        {/* Categorized & Searchable FAQs */}
        <LoanAgainstPropertyFAQSection />

        {/* Bank-Grade Security & Trust Guarantees */}
        <LoanAgainstPropertyTrustSection />

        <Footer />
      </main>
    </>
  );
}