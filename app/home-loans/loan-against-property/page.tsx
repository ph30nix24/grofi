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
import JsonLd from "@/app/components/JsonLd";
import { buildLapHubJsonLd } from "@/libs/structuredData";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Compare Best Loan Against Property in India - Grofi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Against Property (2026) | Compare Top 10 Banks - Grofi",
    description:
      "Compare 10+ verified banks & NBFCs. Up to 75% LTV funding, multi-crore ticket sizes, overdraft facilities, and zero prepayment penalties on floating rates.",
    images: ["/og-image.png"],
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

  const jsonLd = buildLapHubJsonLd(lenders);

  return (
    <>
      <JsonLd schema={jsonLd} />

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