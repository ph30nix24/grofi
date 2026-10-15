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
import JsonLd from "@/app/components/JsonLd";
import { buildShortTermLoansHubJsonLd } from "@/libs/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Short Term Personal Loans (2026): 3 to 12 Month Credit",
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
    title: "Short Term Personal Loans (2026): 3 to 12 Month Credit",
    description:
      "Compare 15 verified RBI-regulated short-term lenders. 3 to 12-month tenures, zero foreclosure penalties, minimal total interest outgo, and instant bank disbursals up to ₹40 Lakhs.",
    url: "https://www.grofi.in/personal-loans/short-term-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Short Term Personal Loans in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Short Term Personal Loans (2026): 3 to 12 Month Credit",
    description:
      "Borrow quick and repay fast with zero long-term liabilities. Compare top short-term lenders including SBI, HDFC, Navi, KreditBee & CASHe with paperless e-KYC.",
    images: ["/og-image.png"],
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

  const jsonLd = buildShortTermLoansHubJsonLd(lenders);

  return (
    <>
      <JsonLd schema={jsonLd} />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Hero Section with Pitch, Short-Term Metrics & Quick Qualifier Form */}
        <ShortTermLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Compare Dock & Modals) */}
        <Suspense
          fallback={
            <div className="min-h-100 flex items-center justify-center text-sm text-gray-500 font-montserrat">
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