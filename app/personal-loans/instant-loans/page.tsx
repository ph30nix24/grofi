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
import JsonLd from "@/app/components/JsonLd";
import { buildInstantLoansHubJsonLd } from "@/libs/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Instant Personal Loans (2026): Fast Online Approval",
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
    title: "Instant Personal Loans (2026): Fast Online Approval",
    description:
      "Compare 16 verified RBI-regulated instant lenders. 100% paperless e-KYC, 10-second bank disbursals up to ₹50 Lakhs, and zero impact on your credit score.",
    url: "https://www.grofi.in/personal-loans/instant-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Instant Personal Loans with 24x7 Digital Disbursals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Personal Loans (2026): Fast Online Approval",
    description:
      "Emergency cash made simple. Compare top 16 instant lenders including HDFC, SBI, ICICI, Navi & KreditBee with paperless e-KYC.",
    images: ["/og-image.png"],
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

  const jsonLd = buildInstantLoansHubJsonLd(lenders);

  return (
    <>
      <JsonLd schema={jsonLd} />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Hero Section with Partner Bank Logos & Instant Qualifier Form */}
        <InstantLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-100 flex items-center justify-center text-sm text-gray-500 font-montserrat">
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