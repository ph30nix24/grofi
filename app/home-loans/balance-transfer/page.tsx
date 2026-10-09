import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { BalanceTransferLender } from "./components/type";
import BalanceTransferHero from "./components/BalanceTransferHero";
import BalanceTransferExplorer from "./components/BalanceTransferExplorer";
import BalanceTransferSavingsCalculator from "./components/BalanceTransferSavingsCalculator";
import BalanceTransferComparisonTable from "./components/BalanceTransferComparisonTable";
import BalanceTransferStepsSection from "./components/BalanceTransferStepsSection";
import BalanceTransferBenefitsGuide from "./components/BalanceTransferBenefitsGuide";
import BalanceTransferFAQSection from "./components/BalanceTransferFAQSection";
import BalanceTransferTrustSection from "./components/BalanceTransferTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title:
    "Compare Best Home Loan Balance Transfer in India (2026) | Lowest Rates from 7.10% - Grofi",
  description:
    "Compare and transfer your existing home loan across 14+ leading banks and HFCs including SBI, Bank of Baroda, HDFC, ICICI, Kotak, Union Bank, Canara & LIC HFL. Lowest takeover rates starting from 7.10% p.a., capped processing fees, top-up loans up to ₹5 Cr, SBI Maxgain overdraft, and zero prepayment penalties.",
  alternates: { canonical: "/home-loans/balance-transfer" },
  keywords: [
    "home loan balance transfer",
    "switch home loan",
    "lowest home loan balance transfer interest rate",
    "sbi home loan balance transfer",
    "hdfc home loan transfer",
    "icici balance transfer home loan",
    "bank of baroda home loan takeover",
    "home loan takeover scheme",
    "home loan balance transfer calculator",
    "home loan top up at balance transfer",
    "sbi maxgain balance transfer",
    "home loan takeover documents list",
    "reduce home loan emi",
    "Grofi home loan balance transfer",
  ],
  openGraph: {
    title: "Home Loan Balance Transfer (2026) | Lowest Rates from 7.10% - Grofi",
    description:
      "Save up to ₹15+ Lakhs in interest by transferring your home loan to top banks. Enjoy capped processing fees, overdraft benefits, and instant top-ups up to ₹5 Cr on Grofi.",
    url: "https://www.grofi.in/home-loans/balance-transfer",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan Balance Transfer in India | Rates from 7.10% - Grofi",
    description:
      "Compare 14+ verified banks & HFCs. Switch to lowest interest rates, save on monthly EMIs, and unlock high-value top-up loans.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchBalanceTransfers(): Promise<BalanceTransferLender[]> {
  try {
    const rawData = await prisma.loanTransfer.findMany({
      orderBy: [
        { startingEmiPerLakh20Yr: "asc" },
        { rating: "desc" },
      ],
    });

    return JSON.parse(JSON.stringify(rawData)) as BalanceTransferLender[];
  } catch (error) {
    console.error("Failed to fetch balance transfer data from database:", error);
    return [];
  }
}

export default async function BalanceTransferPage() {
  const lenders = await fetchBalanceTransfers();

  // Extract FAQs from database lenders for JSON-LD Structured Data
  const jsonLdFaqs = lenders
    .flatMap((l) => (Array.isArray(l.faqs) ? l.faqs : []))
    .slice(0, 8);

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
            "name": "Balance Transfer",
            "item": "https://www.grofi.in/home-loans/balance-transfer",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Home Loan Balance Transfer Lenders in India",
        "description":
          "Compare lowest interest rate home loan takeover and balance transfer schemes with top-up options from top Indian banks and HFCs.",
        "numberOfItems": lenders.length,
        "itemListElement": lenders.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "BankOrCreditUnion",
              "name": lender.name.replace(/Home Loan|Balance Transfer|Takeover Scheme|Takeover/i, "").trim(),
            },
            "description": lender.tagline,
            "annualPercentageRate": lender.interestRate?.min ?? 7.15,
            "feesAndCommissionsSpecification": lender.processingFeeCap || lender.processingFee,
          },
        })),
      },
      ...(jsonLdFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": jsonLdFaqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            },
          ]
        : []),
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
        <BalanceTransferHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading balance transfer lenders from database...</span>
              </div>
            </div>
          }
        >
          <BalanceTransferExplorer initialLenders={lenders} />
        </Suspense>

        {/* Dual-Action Interactive Balance Transfer & Top-Up Savings Calculator */}
        <BalanceTransferSavingsCalculator />

        {/* 2026 Rates, EMIs, Fees & Turnaround Comparison Matrix Table */}
        <BalanceTransferComparisonTable lenders={lenders} />

        {/* 5-Step Digital Takeover Journey & Document Checklist */}
        <BalanceTransferStepsSection />

        {/* Financial Advisory Guide (Rate Arbitrage, Top-Ups, Maxgain OD, Tax Continuity) */}
        <BalanceTransferBenefitsGuide />

        {/* Categorized & Searchable FAQs Powered Exclusively by Database Records */}
        <BalanceTransferFAQSection lenders={lenders} />

        {/* Bank-Grade Security & Trust Guarantees */}
        <BalanceTransferTrustSection />

        <Footer />
      </main>
    </>
  );
}