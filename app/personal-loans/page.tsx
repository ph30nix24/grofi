import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { PersonalLoanLender } from "./components/type";
import PersonalLoanHero from "./components/PersonalLoanHero";
import PersonalLoanExplorer from "./components/PersonalLoanExplorer";
import PersonalLoanEmiCalculator from "./components/PersonalLoanEmiCalculator";
import PersonalLoanComparisonTable from "./components/PersonalLoanComparisonTable";
import PersonalLoanStepsSection from "./components/PersonalLoanStepsSection";
import PersonalLoanEligibilityGuide from "./components/PersonalLoanEligibilityGuide";
import PersonalLoanFAQSection from "./components/PersonalLoanFAQSection";
import PersonalLoanTrustSection from "./components/PersonalLoanTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Compare Best Personal Loans in India (2026) | Lowest Interest Rates from 9.99% - Grofi",
  description:
    "Compare and apply for personal loans across 10+ leading Indian banks and NBFCs including HDFC, SBI, ICICI, Axis, Kotak, IDFC, Bajaj Finserv & Tata Capital. Instant paperless e-KYC, lowest rates from 9.99% p.a., and ₹0 credit score impact on pre-approval.",
  alternates: { canonical: "/personal-loans" },
  keywords: [
    "personal loans",
    "compare personal loans",
    "best personal loan India",
    "lowest personal loan interest rate",
    "instant personal loan",
    "hdfc personal loan",
    "sbi xpress credit",
    "icici personal loan",
    "axis bank personal loan",
    "idfc first personal loan",
    "bajaj finserv flexi loan",
    "tata capital personal loan",
    "kotak personal loan",
    "personal loan emi calculator",
    "pre-approved personal loan",
    "paperless personal loan",
    "Grofi personal loans",
  ],
  openGraph: {
    title: "Compare Best Personal Loans in India | Lowest Interest Rates - Grofi",
    description:
      "Find India's lowest interest rate personal loans from 9.99% p.a. 100% paperless e-KYC, instant disbursals up to ₹50 Lakhs, and zero impact on your CIBIL score.",
    url: "https://www.grofi.in/personal-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Best Personal Loans in India | Rates from 9.99% - Grofi",
    description:
      "Compare 10+ banks & NBFCs. Instant disbursals up to ₹50 Lakhs with lowest rates and paperless verification.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchPersonalLoans(): Promise<PersonalLoanLender[]> {
  try {
    const rawData = await prisma.personalLoanLender.findMany({
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { createdAt: "desc" },
      ],
    });
    return JSON.parse(JSON.stringify(rawData)) as PersonalLoanLender[];
  } catch (error) {
    console.error("Failed to fetch personal loans from database:", error);
    return [];
  }
}

export default async function PersonalLoansPage() {
  const lenders = await fetchPersonalLoans();

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
            "name": "Personal Loans",
            "item": "https://www.grofi.in/personal-loans",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Personal Loan Lenders in India",
        "description": "Compare lowest interest rate personal loans from top Indian scheduled commercial banks and NBFCs.",
        "numberOfItems": lenders.length,
        "itemListElement": lenders.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "BankOrCreditUnion",
              "name": lender.name.replace(/Personal Loan/i, "").trim(),
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
            "name": "What is the difference between Reducing Balance Rate and Flat Interest Rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In a Monthly Reducing Balance method, interest is calculated solely on the outstanding principal balance at the end of each month. In a Flat Interest Rate method, interest is calculated on the entire initial sanction amount for the full tenure, making it significantly more expensive.",
            },
          },
          {
            "@type": "Question",
            "name": "What minimum CIBIL score is required for personal loan approval?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most scheduled commercial banks (HDFC, ICICI, SBI, Axis) prefer a CIBIL score of 720 or higher. A score above 750 qualifies you for prime interest rates starting at 9.99% p.a.",
            },
          },
          {
            "@type": "Question",
            "name": "Will checking my loan eligibility on Grofi hurt my credit score?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Checking pre-approved eligibility on Grofi performs a soft credit inquiry which causes zero deduction to your CIBIL score.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I prepay or foreclose my personal loan early?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, borrowers are allowed to prepay or foreclose after the lock-in period (typically 6-12 months). RBI rules restrict penalties on individual floating rate loans.",
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

        {/* Hero Section with Partner Bank Logos */}
        <PersonalLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading personal loan lenders...</span>
              </div>
            </div>
          }
        >
          <PersonalLoanExplorer initialLenders={lenders} />
        </Suspense>

        {/* Interactive Personal Loan EMI Calculator */}
        <PersonalLoanEmiCalculator />

        {/* 2026 Rates & Fees Matrix Comparison Table */}
        <PersonalLoanComparisonTable lenders={lenders} />

        {/* 4-Step Digital Disbursal Journey */}
        <PersonalLoanStepsSection />

        {/* Salaried vs Self-Employed Eligibility & Paperless Documents Guide */}
        <PersonalLoanEligibilityGuide />

        {/* Categorized & Searchable FAQs */}
        <PersonalLoanFAQSection />

        {/* Bank-Grade Security & Trust Guarantees */}
        <PersonalLoanTrustSection />

        <Footer />
      </main>
    </>
  );
}