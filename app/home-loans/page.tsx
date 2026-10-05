import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { HomeLoanLender } from "./components/type";
import HomeLoanHero from "./components/HomeLoanHero";
import HomeLoanExplorer from "./components/HomeLoanExplorer";
import HomeLoanEmiCalculator from "./components/HomeLoanEmiCalculator";
import HomeLoanComparisonTable from "./components/HomeLoanComparisonTable";
import HomeLoanStepsSection from "./components/HomeLoanStepsSection";
import HomeLoanTaxBenefitsGuide from "./components/HomeLoanTaxBenefitsGuide";
import HomeLoanFAQSection from "./components/HomeLoanFAQSection";
import HomeLoanTrustSection from "./components/HomeLoanTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Compare Best Home Loans in India (2026) | Lowest Interest Rates from 7.15% - Grofi",
  description:
    "Compare and apply for home loans across 13+ leading Indian banks and HFCs including SBI, HDFC, ICICI, Bank of Baroda, Kotak, Axis & LIC HFL. Lowest rates starting from 7.15% p.a., up to 90% property funding, SBI Maxgain overdraft, and zero prepayment penalties.",
  alternates: { canonical: "/home-loans" },
  keywords: [
    "home loans",
    "compare home loans",
    "best home loan India",
    "lowest home loan interest rate",
    "sbi home loan interest rate",
    "hdfc home loan",
    "icici home loan",
    "bank of baroda home loan",
    "axis bank home loan",
    "kotak home loan",
    "lic housing finance",
    "bajaj housing finance",
    "sbi maxgain home loan",
    "home loan balance transfer",
    "home loan emi calculator",
    "home loan tax exemption section 24b",
    "doorstep home loan approval",
    "Grofi home loans",
  ],
  openGraph: {
    title: "Compare Best Home Loans in India | Rates from 7.15% - Grofi",
    description:
      "Find India's lowest interest rate home loans starting from 7.15% p.a. Up to 90% property funding, Maxgain overdraft savings, and doorstep legal verification on Grofi.",
    url: "https://www.grofi.in/home-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Best Home Loans in India | Rates from 7.15% - Grofi",
    description:
      "Compare 13+ banks & HFCs. Up to 90% funding with lowest rates, balance transfers, and paperless verification.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchHomeLoans(): Promise<HomeLoanLender[]> {
  try {
    const rawData = await prisma.homeLoanData.findMany({
      orderBy: [
        { startingEmiPerLakh20Yr: "asc" },
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
        faqs: true
      }
    });
    return JSON.parse(JSON.stringify(rawData)) as HomeLoanLender[];
  } catch (error) {
    console.error("Failed to fetch home loans from database:", error);
    return [];
  }
}

export default async function HomeLoansPage() {
  const homeLoans = await fetchHomeLoans();

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
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Home Loan Lenders in India",
        "description": "Compare lowest interest rate home loans and balance transfers from top Indian scheduled commercial banks and housing finance companies.",
        "numberOfItems": homeLoans.length,
        "itemListElement": homeLoans.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "BankOrCreditUnion",
              "name": lender.name.replace(/Home Loan|Housing Loan/i, "").trim(),
            },
            "description": lender.tagline,
            "annualPercentageRate": lender.interestRate?.min ?? 7.15,
            "feesAndCommissionsSpecification": lender.processingFee,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Repo-Linked External Benchmark Lending Rate (EBLR)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "EBLR is an RBI-mandated mechanism where floating housing loan interest rates are directly tied to the RBI Repo Rate. When RBI reduces the repo rate, banks are required to pass on the rate cut to borrowers within 3 months.",
            },
          },
          {
            "@type": "Question",
            "name": "How does an Overdraft / Maxgain home loan save interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An overdraft home loan links a current account to your loan. Any surplus cash parked in this account offsets the outstanding principal balance for the daily interest calculation, reducing your total interest outflow while retaining instant withdrawal liquidity.",
            },
          },
          {
            "@type": "Question",
            "name": "What tax deductions can I claim on a home loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Section 24(b), you can deduct up to ₹2 Lakhs per year on interest paid for a self-occupied property. Under Section 80C, up to ₹1.5 Lakhs can be deducted on principal repayment. Joint co-owners can claim up to ₹7 Lakhs combined.",
            },
          },
          {
            "@type": "Question",
            "name": "Are there prepayment charges on floating-rate home loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Per RBI directives, individual floating-rate home loans carry 0% foreclosure and part-prepayment penalties.",
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

        {/* Hero Section with Partner Bank Logos & Fast Pre-Approval Form */}
        <HomeLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading home loan lenders...</span>
              </div>
            </div>
          }
        >
          <HomeLoanExplorer initialLenders={homeLoans} />
        </Suspense>

        {/* Dual-Mode EMI & Balance Transfer Savings Calculator */}
        <HomeLoanEmiCalculator />

        {/* 2026 Rates, EMIs & LTV Matrix Comparison Table */}
        <HomeLoanComparisonTable lenders={homeLoans} />

        {/* 5-Step Digital Disbursal & Property Legal Verification Journey */}
        <HomeLoanStepsSection />

        {/* Income Tax Savings Guide (Sec 24b, 80C, Joint Loan benefits) */}
        <HomeLoanTaxBenefitsGuide />

        {/* Categorized & Searchable FAQs */}
        <HomeLoanFAQSection />

        {/* Bank-Grade Security & Trust Guarantees */}
        <HomeLoanTrustSection />

        <Footer />
      </main>
    </>
  );
}