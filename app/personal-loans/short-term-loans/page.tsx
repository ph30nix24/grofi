import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { ShortTermLoanLender } from "./components/type";
import ShortTermLoanHero from "./components/ShortTermLoanHero";
import ShortTermLoanExplorer from "./components/ShortTermLoanExplorer";
import ShortTermLoanEmiCalculator from "./components/ShortTermLoanEmiCalculator";
import ShortTermLoanComparisonTable from "./components/ShortTermLoanComparisonTable";
import ShortTermLoanStepsSection from "./components/ShortTermLoanStepsSection";
import ShortTermLoanGuideSection from "./components/ShortTermLoanGuideSection";
import ShortTermLoanFAQSection from "./components/ShortTermLoanFAQSection";
import ShortTermLoanTrustSection from "./components/ShortTermLoanTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Short Term Personal Loans (2026) | Flexible 3 to 12 Month Credit - Grofi",
  description:
    "Compare 15 top short-term personal loan lenders in India. Flexible 3 to 12-month tenures, zero foreclosure penalties, instant disbursals from 3 seconds to 15 minutes, starting rates from 10.0% p.a., and mandatory RBI KFS & cooling-off protection.",
  alternates: { canonical: "/personal-loans/short-term-loans" },
  keywords: [
    "short term personal loans",
    "short tenure personal loan",
    "3 month personal loan",
    "6 month personal loan",
    "micro personal loan",
    "instant short term loan",
    "salary advance loan",
    "bridge financing loan",
    "zero foreclosure personal loan",
    "kreditbee short term loan",
    "cashe salary advance",
    "fibe earlysalary loan",
    "navi short term cash loan",
    "sbi xpress short loan",
    "hdfc 10 second short loan",
    "rbi cooling off period loans",
    "key fact statement kfs loans",
    "Grofi short term loans",
  ],
  openGraph: {
    title: "Short Term Personal Loans (2026) | Flexible 3-12 Month Credit - Grofi",
    description:
      "Compare 15 verified RBI-regulated short-term lenders. 3 to 12-month tenures, zero foreclosure penalties, minimal total interest outgo, and instant bank disbursals up to ₹40 Lakhs.",
    url: "https://www.grofi.in/personal-loans/short-term-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Short Term Personal Loans in India | Flexible 3-12 Months - Grofi",
    description:
      "Borrow quick and repay fast with zero long-term liabilities. Compare top short-term lenders including SBI, HDFC, Navi, KreditBee & CASHe with paperless e-KYC.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchShortTermLoans(): Promise<ShortTermLoanLender[]> {
  try {
    const rawData = await prisma.shortTermLoan.findMany({
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { id: "asc" },
      ],
    });

    return JSON.parse(JSON.stringify(rawData)) as ShortTermLoanLender[];
  } catch (error) {
    console.error("Error while fetching short term loans from database:", error);
    return [];
  }
}

export default async function ShortTermPersonalLoanPage() {
  const lenders = await fetchShortTermLoans();

  // JSON-LD Structured Data for Search Engines
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
            "name": "Personal Loans",
            "item": "https://www.grofi.in/personal-loans",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Short Term Loans",
            "item": "https://www.grofi.in/personal-loans/short-term-loans",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Short-Term Personal Loan Lenders in India",
        "description":
          "Compare lowest interest rate short-term personal loans from top Indian scheduled commercial banks and RBI-registered NBFCs with 3 to 12-month tenures.",
        "numberOfItems": lenders.length,
        "itemListElement": lenders.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "FinancialService",
              "name": lender.rbiRegulatedEntity,
            },
            "description": lender.tagline,
            "annualPercentageRate": lender.interestRate?.min ?? 10.0,
            "feesAndCommissionsSpecification": lender.processingFee,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why do short-term loans save money even if their APR is slightly higher?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Compounding duration is the primary driver of total loan cost. Borrowing ₹1 Lakh for 6 months at 16% APR results in approximately ₹4,728 in interest, whereas a 3-year loan at 13.5% incurs over ₹22,184 in interest — nearly 5x higher.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the mandatory RBI cooling-off period on short-term loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under RBI Digital Lending Directives, every regulated lender must provide a cooling-off look-up period of 1 to 3 days allowing borrowers to exit the loan with zero prepayment penalties by repaying only the principal and proportionate APR.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I prepay or foreclose a short-term personal loan early without a penalty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Top digital lenders like Navi, KreditBee, and major banks waive prepayment and foreclosure fees, allowing borrowers to clear their balance early without penalty once liquidity returns.",
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

        {/* Hero Section with Pitch, Short-Term Metrics & Quick Qualifier Form */}
        <ShortTermLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Compare Dock & Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading short-term loan lenders...</span>
              </div>
            </div>
          }
        >
          <ShortTermLoanExplorer initialLenders={lenders} />
        </Suspense>

        {/* Interactive Short-Term EMI & Interest Savings Calculator */}
        <ShortTermLoanEmiCalculator />

        {/* Comprehensive Market Matrix Comparison Table */}
        <ShortTermLoanComparisonTable lenders={lenders} />

        {/* 4-Step 100% Digital & Paperless Disbursal Journey */}
        <ShortTermLoanStepsSection />

        {/* Financial Guide: Short vs Long Cost Math & RBI Regulatory Protections */}
        <ShortTermLoanGuideSection />

        {/* Searchable & Categorized FAQs */}
        <ShortTermLoanFAQSection />

        {/* Bank-Grade Security & Regulatory Trust Guarantees */}
        <ShortTermLoanTrustSection />

        <Footer />
      </main>
    </>
  );
}