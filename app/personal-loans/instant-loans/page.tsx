import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { InstantLoanLender } from "./components/type";
import InstantLoanHero from "./components/InstantLoanHero";
import InstantLoanExplorer from "./components/InstantLoanExplorer";
import InstantLoanEmiCalculator from "./components/InstantLoanEmiCalculator";
import InstantLoanComparisonTable from "./components/InstantLoanComparisonTable";
import InstantLoanStepsSection from "./components/InstantLoanStepsSection";
import InstantLoanSafetyGuide from "./components/InstantLoanSafetyGuide";
import InstantLoanFAQSection from "./components/InstantLoanFAQSection";
import InstantLoanTrustSection from "./components/InstantLoanTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Instant Personal Loans (2026) | Pre-Approved Cash in 10s to 15 Mins - Grofi",
  description:
    "Compare 16 instant personal loan lenders in India. Fast disbursals from 3 seconds to 15 minutes, 100% paperless Aadhaar e-KYC, starting rates from 8.90% p.a., loan amounts up to ₹50 Lakhs with zero CIBIL impact on pre-approval.",
  alternates: { canonical: "/personal-loans/instant-loans" },
  keywords: [
    "instant personal loans",
    "instant loan app",
    "pre approved personal loan",
    "fast cash loan",
    "paperless personal loan",
    "hdfc 10 second instant loan",
    "icici instant personal loan",
    "sbi yono instant loan",
    "navi instant cash loan",
    "kreditbee instant loan",
    "bajaj insta personal loan",
    "cashe instant loan",
    "paysense instant credit line",
    "fibe personal loan",
    "instant loan without salary slip",
    "emergency loan 15 minutes",
    "rbi approved instant loan apps",
    "Grofi instant loans",
  ],
  openGraph: {
    title: "Instant Personal Loans (2026) | Pre-Approved Cash in Minutes - Grofi",
    description:
      "Compare 16 verified RBI-regulated instant lenders. 100% paperless e-KYC, 10-second bank disbursals up to ₹50 Lakhs, and zero impact on your credit score.",
    url: "https://www.grofi.in/personal-loans/instant-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Personal Loans in India | Disbursal in 10s to 15 Mins - Grofi",
    description:
      "Emergency cash made simple. Compare top 16 instant lenders including HDFC, SBI, ICICI, Navi & KreditBee with paperless e-KYC.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchInstantLoans(): Promise<InstantLoanLender[]> {
  try {
    const rawData = await prisma.instantLoansData.findMany({
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { id: "asc" },
      ],
    });

    return JSON.parse(JSON.stringify(rawData)) as InstantLoanLender[];
  } catch (error) {
    console.error("Error while fetching instant loans data from database:", error);
    return [];
  }
}

export default async function InstantLoansPage() {
  const lenders = await fetchInstantLoans();

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
            "name": "Instant Personal Loans",
            "item": "https://www.grofi.in/personal-loans/instant-loans",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Instant Personal Loan Lenders in India",
        "description": "Compare lowest interest rate instant personal loans from top Indian scheduled commercial banks and RBI-registered NBFCs.",
        "numberOfItems": lenders.length,
        "itemListElement": lenders.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "FinancialService",
              "name": lender.name.replace(/Personal Loan|Instant Loan/i, "").trim(),
            },
            "description": lender.tagline,
            "annualPercentageRate": lender.interestRate?.min ?? 9.99,
            "feesAndCommissionsSpecification": lender.processingFee,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can an instant personal loan be disbursed in under 10 seconds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Leading Indian banks like HDFC, ICICI, and SBI run periodic algorithmic assessments on their existing savings account customers. When you accept the pre-approved offer, the funds are deposited into your account via automated IMPS rails in 3 to 10 seconds without human intervention.",
            },
          },
          {
            "@type": "Question",
            "name": "Are instant loan apps on Grofi safe and RBI regulated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Grofi partners exclusively with Scheduled Commercial Banks and RBI-registered Systemically Important NBFCs that strictly adhere to the RBI Digital Lending Directives, prohibiting access to phone contacts or photo galleries.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I get an instant loan if my CIBIL score is below 650 or I am new to credit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Fintech partners like KreditBee, CASHe, and Navi assess your monthly salary flows and digital banking activity via Account Aggregator rather than solely relying on past credit bureau score.",
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

        {/* Hero Section with Partner Bank Logos & Instant Qualifier Form */}
        <InstantLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading instant loan lenders...</span>
              </div>
            </div>
          }
        >
          <InstantLoanExplorer initialLenders={lenders} />
        </Suspense>

        {/* Interactive Instant Loan EMI & Turnaround Estimator */}
        <InstantLoanEmiCalculator />

        {/* 2026 Rates, Turnaround & Limits Matrix Comparison Table */}
        <InstantLoanComparisonTable lenders={lenders} />

        {/* 4-Step 100% Paperless Disbursal Journey */}
        <InstantLoanStepsSection />

        {/* Safety Guide: Safe RBI Regulated Apps vs Fraud Apps & Borrower Criteria */}
        <InstantLoanSafetyGuide />

        {/* Categorized & Searchable FAQs */}
        <InstantLoanFAQSection />

        {/* Bank-Grade Security & Trust Guarantees */}
        <InstantLoanTrustSection />

        <Footer />
      </main>
    </>
  );
}