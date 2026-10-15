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
import JsonLd from "@/app/components/JsonLd";
import { buildPersonalLoansHubJsonLd } from "@/libs/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Best Personal Loans in India (2026): Rates from 9.99%",
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
    title: "Best Personal Loans in India (2026): Rates from 9.99%",
    description:
      "Find India's lowest interest rate personal loans from 9.99% p.a. 100% paperless e-KYC, instant disbursals up to ₹50 Lakhs, and zero impact on your CIBIL score.",
    url: "https://www.grofi.in/personal-loans",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best Personal Loans in India - Grofi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Personal Loans in India (2026): Rates from 9.99%",
    description:
      "Compare 10+ banks & NBFCs. Instant disbursals up to ₹50 Lakhs with lowest rates and paperless verification.",
    images: ["/og-image.png"],
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

  const jsonLd = buildPersonalLoansHubJsonLd(lenders);

  return (
    <>
      <JsonLd schema={jsonLd} />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Hero Section with Partner Bank Logos */}
        <PersonalLoanHero />

        {/* Interactive Marketplace Explorer (Filters, Cards, Comparison Dock, Modals) */}
        <Suspense
          fallback={
            <div className="min-h-100 flex items-center justify-center text-sm text-gray-500 font-montserrat">
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