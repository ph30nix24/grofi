import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ShortTermLoanLender } from "../components/type";
import ShortTermLoanHero from "./components/ShortTermLoanHero";
import ShortTermLoanStickyNav from "./components/ShortTermLoanStickyNav";
import ShortTermLoanHighlightsSection from "./components/ShortTermLoanHighlightsSection";
import ShortTermLoanEmiCalculatorSection from "./components/ShortTermLoanEmiCalculatorSection";
import ShortTermLoanRbiSafeguardsSection from "./components/ShortTermLoanRbiSafeguardsSection";
import ShortTermLoanFeesSection from "./components/ShortTermLoanFeesSection";
import ShortTermLoanEligibilityDocsSection from "./components/ShortTermLoanEligibilityDocsSection";
import ShortTermLoanDisbursalStepsSection from "./components/ShortTermLoanDisbursalStepsSection";
import ShortTermLoanFaqSection from "./components/ShortTermLoanFaqSection";
import SimilarShortTermLoansSection from "./components/SimilarShortTermLoansSection";
import ShortTermLoanPreApprovedBanner from "./components/ShortTermLoanPreApprovedBanner";
import ShortTermLoanMobileApplyBar from "./components/ShortTermLoanMobileApplyBar";
import { buildShortTermLoanJsonLd } from "@/libs/structuredData";
import JsonLd from "@/app/components/JsonLd";

const SITE = "https://www.grofi.in";

// Revalidate every hour
export const revalidate = 3600;

// Pre-render static pages for all short-term lenders in database
export async function generateStaticParams() {
  try {
    const lenders = await prisma.shortTermLoan.findMany({
      select: { id: true },
    });
    return lenders.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static short-term loan params:", error);
    return [];
  }
}

// Cached fetcher with multi-strategy lookup (ID or clean name)
const fetchLoan = cache(async (loanId: string): Promise<ShortTermLoanLender | null> => {
  try {
    // 1. Direct match by ID
    const byId = await prisma.shortTermLoan.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as ShortTermLoanLender;

    // 2. Fallback case-insensitive name match
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.shortTermLoan.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as ShortTermLoanLender;
  } catch (error) {
    console.error("Error fetching short term loan lender:", error);
  }
  return null;
});

// Fetch top alternative short-term lenders for comparison
async function fetchSimilarShortTermLoans(excludeId: string): Promise<ShortTermLoanLender[]> {
  try {
    const list = await prisma.shortTermLoan.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { id: "asc" },
      ],
    });
    return JSON.parse(JSON.stringify(list)) as ShortTermLoanLender[];
  } catch (error) {
    console.warn("Error fetching similar short-term loans:", error);
    return [];
  }
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ loan: string }>;
}): Promise<Metadata> {
  const { loan } = await params;
  const lender = await fetchLoan(loan);

  if (!lender) {
    return {
      title: "Short-Term Personal Loan Not Found | Grofi",
      description: "The requested short-term personal loan comparison could not be found on Grofi.",
    };
  }

  const title =
    lender.title ||
    `${lender.name} (2026): Short-Term Cash in ${lender.disbursalTime} | Grofi`;
  const description =
    lender.description ||
    `${lender.tagline}. Starting rates from ${lender.interestRate?.min ?? 12.0}% p.a., amounts up to ${lender.maxAmount}, paperless ${lender.documentation}. Check pre-approved offers with zero CIBIL impact on Grofi.`;
  const canonical = `${SITE}/personal-loans/short-term-loans/${lender.id}`;
  const ogImage = lender.logo || "/partners-logos/hdfc-logo.webp";

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords: lender.keywords?.length
      ? lender.keywords
      : [
          lender.name,
          `${lender.name} interest rate`,
          `${lender.name} short term loan`,
          `${lender.name} EMI calculator`,
          `${lender.name} disbursal time`,
          `${lender.name} eligibility`,
          "short term personal loan",
          "salary advance loan",
          "micro personal loan",
          "Grofi short term loans",
        ],
    alternates: { canonical },
    openGraph: {
      title: lender.openGraphTitle || title,
      description: lender.openGraphDesc || description,
      url: canonical,
      siteName: "Grofi",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 600,
          alt: lender.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lender.twitterTitle || title,
      description: lender.twitterDesc || description,
      images: [ogImage],
    },
  };
}

export default async function SelectedShortTermLoan({
  params,
}: {
  params: Promise<{ loan: string }>;
}) {
  const { loan } = await params;

  const lender = await fetchLoan(loan);
  if (!lender) {
    notFound();
  }

  // Canonical redirect if accessed via non-canonical alias
  if (lender.id !== loan) {
    permanentRedirect(`/personal-loans/short-term-loans/${lender.id}`);
  }

  const similarLenders = await fetchSimilarShortTermLoans(lender.id);

  // Schema.org Structured Data (JSON-LD) for Search Engine Optimization
  const jsonLd = buildShortTermLoanJsonLd(lender, SITE);

  return (
    <>
      <JsonLd schema={jsonLd} />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900 selection:bg-primary/20 selection:text-primary">
        <Navbar />

        {/* Hero Section with Partner Badges, Metrics, & Qualifier Form */}
        <ShortTermLoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Mini Quick Apply Dock */}
        <ShortTermLoanStickyNav lender={lender} />

        {/* Editorial Verdict, 4 Value Pillars, Benchmark Scorecard & Features */}
        <ShortTermLoanHighlightsSection lender={lender} />

        {/* Interactive Short-Tenure Reducing Balance EMI Calculator & Savings Math */}
        <ShortTermLoanEmiCalculatorSection lender={lender} />

        {/* Mandatory RBI Digital Lending Safeguards & Cooling-off Protection */}
        <ShortTermLoanRbiSafeguardsSection lender={lender} />

        {/* Complete Schedule of Fees & Charges with Real-World Scenario */}
        <ShortTermLoanFeesSection lender={lender} />

        {/* Eligibility Criteria & 100% Digital Document Checklist */}
        <ShortTermLoanEligibilityDocsSection lender={lender} />

        {/* 4-Step 100% Paperless Digital Disbursal Flow */}
        <ShortTermLoanDisbursalStepsSection lender={lender} />

        {/* Searchable Lender FAQs & Short-Term Borrower Q&A */}
        <ShortTermLoanFaqSection lender={lender} />

        {/* Similar Short-Term Loans Comparison */}
        <SimilarShortTermLoansSection
          currentLender={lender}
          similarLenders={similarLenders}
        />

        {/* Pre-Approved Instant Sanction Banner CTA */}
        <ShortTermLoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <ShortTermLoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}