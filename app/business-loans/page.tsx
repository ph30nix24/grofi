import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { BusinessLoanLender } from "./components/type";
import BusinessLoanHero from "./components/BusinessLoanHero";
import BusinessLoanExplorer from "./components/BusinessLoanExplorer";
import BusinessLoanEmiCalculator from "./components/BusinessLoanEmiCalculator";
import BusinessLoanComparisonTable from "./components/BusinessLoanComparisonTable";
import BusinessLoanSchemesGuide from "./components/BusinessLoanSchemesGuide";
import BusinessLoanStepsSection from "./components/BusinessLoanStepsSection";
import BusinessLoanEligibilityGuide from "./components/BusinessLoanEligibilityGuide";
import BusinessLoanFAQSection from "./components/BusinessLoanFAQSection";
import BusinessLoanTrustSection from "./components/BusinessLoanTrustSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Compare Best Business Loans & MSME Finance in India (2026) | Rates from 8.85% - Grofi",
  description:
    "Compare and apply for business loans and working capital credit lines up to ₹2 Crore across 12+ leading Indian commercial banks and NBFCs including HDFC, SBI, ICICI, Axis, PNB, Bank of Baroda, Bajaj Finserv & Tata Capital. Collateral-free options, CGTMSE support, 48-hr disbursal, and ₹0 credit score impact on pre-approval.",
  alternates: { canonical: "/business-loans" },
  keywords: [
    "business loans",
    "MSME loans",
    "compare business loans",
    "best business loan India",
    "lowest business loan interest rate",
    "collateral free business loan",
    "unsecured business loan",
    "working capital loan",
    "cgtmse loan scheme",
    "mudra loan",
    "hdfc business growth loan",
    "sbi simplified small business loan",
    "icici instaod",
    "axis bank msme samriddhi",
    "pnb gst express",
    "bank of baroda sme loan",
    "bajaj finserv flexi business loan",
    "tata capital msme loan",
    "business loan emi calculator",
    "paperless business loan",
    "Grofi business loans",
  ],
  openGraph: {
    title: "Compare Best Business Loans in India | Rates from 8.85% p.a. - Grofi",
    description:
      "Fuel your enterprise with India's lowest business loan rates from 8.85% p.a. Collateral-free sanctions up to ₹75 Lakhs, credit lines up to ₹2 Crore, and 48-hour digital disbursals.",
    url: "https://www.grofi.in/business-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Best Business Loans & MSME Credit in India | Grofi",
    description:
      "Compare 12+ banks & NBFCs. Collateral-free options, CGTMSE coverage, and fast digital GST verification.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

async function fetchBusinessLoans(): Promise<BusinessLoanLender[]> {
  try {
    const rawData = await prisma.businessLoanData.findMany({
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { rating: "desc" },
      ],
    })
    return JSON.parse(JSON.stringify(rawData)) as BusinessLoanLender[];
  } catch (error) {
    console.error("Failed to fetch business loans from database:", error);
    return [];
  }
}

export default async function BusinessLoansPage() {
  const lenders = await fetchBusinessLoans();
  console.log(lenders)

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
            "name": "Business Loans",
            "item": "https://www.grofi.in/business-loans",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Top Business Loan Lenders & MSME Financiers in India",
        "description":
          "Compare lowest interest rate business loans, drop-line overdrafts, and collateral-free MSME credit from top Indian scheduled commercial banks and NBFCs.",
        "numberOfItems": lenders.length,
        "itemListElement": lenders.map((lender, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": lender.name,
            "provider": {
              "@type": "BankOrCreditUnion",
              "name": lender.name.replace(/Business Loan|Loan/i, "").trim(),
            },
            "description": lender.tagline,
            "annualPercentageRate": lender.interestRate?.min ?? 8.85,
            "feesAndCommissionsSpecification": lender.processingFee,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I get a business loan in India without pledging collateral?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Top lenders on Grofi offer unsecured collateral-free business loans up to ₹75 Lakhs to ₹1 Crore. Furthermore, Micro and Small Enterprises can secure up to ₹5 Crores collateral-free under the Government of India's CGTMSE scheme.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the lowest interest rate for business loans in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PSU commercial banks like Punjab National Bank (PNB) and Bank of Baroda provide business loans starting from 8.85% to 8.95% p.a. for GST-registered MSMEs, while leading private banks start around 10.75% to 11.00% p.a.",
            },
          },
          {
            "@type": "Question",
            "name": "Are there prepayment or foreclosure charges on business loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under RBI guidelines, floating-rate business loans sanctioned to individual proprietorships and Micro/Small Enterprises (MSEs) incur zero foreclosure or prepayment penalties.",
            },
          },
          {
            "@type": "Question",
            "name": "How fast are business loans disbursed on Grofi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With digital GST verification and the RBI Account Aggregator framework, in-principle approval is issued within 2 to 4 hours, and sanctioned funds are credited to your Current Account within 48 to 72 business hours.",
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

        {/* Hero Section with Partner Bank Logos & Pre-Approval Hero Form */}
        <BusinessLoanHero />

        {/* Interactive Marketplace Explorer (Category Pills, Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Loading MSME & business loan lenders...</span>
              </div>
            </div>
          }
        >
          <BusinessLoanExplorer initialLenders={lenders} />
        </Suspense>

        {/* Commercial & MSME EMI Calculator with Amortization Schedule */}
        <BusinessLoanEmiCalculator />

        {/* 2026 Rates, Fees & Collateral Matrix Comparison Table */}
        <BusinessLoanComparisonTable lenders={lenders} />

        {/* Indian Government MSME Schemes & Subsidies Guide (CGTMSE, MUDRA, Stand-Up, PMEGP) */}
        <BusinessLoanSchemesGuide />

        {/* 4-Step Digital Disbursal Journey */}
        <BusinessLoanStepsSection />

        {/* Entity-Wise Eligibility & Mandatory Document Checklist */}
        <BusinessLoanEligibilityGuide />

        {/* Searchable & Categorized FAQs */}
        <BusinessLoanFAQSection />

        {/* Bank-Grade Security & Trust Guarantees */}
        <BusinessLoanTrustSection />

        <Footer />
      </main>
    </>
  );
}