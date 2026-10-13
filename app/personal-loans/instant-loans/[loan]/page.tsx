import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { InstantLoanLender } from "../components/type";
import InstantLoanHero from "./components/InstantLoanHero";
import InstantLoanStickyNav from "./components/InstantLoanStickyNav";
import InstantLoanHighlightsSection from "./components/InstantLoanHighlightsSection";
import InstantLoanEmiCalculatorSection from "./components/InstantLoanEmiCalculatorSection";
import InstantLoanFeesSection from "./components/InstantLoanFeesSection";
import InstantLoanEligibilityDocsSection from "./components/InstantLoanEligibilityDocsSection";
import InstantLoanDisbursalStepsSection from "./components/InstantLoanDisbursalStepsSection";
import InstantLoanSafetyTrustSection from "./components/InstantLoanSafetyTrustSection";
import InstantLoanFaqSection from "./components/InstantLoanFaqSection";
import SimilarInstantLoansSection from "./components/SimilarInstantLoansSection";
import InstantLoanPreApprovedBanner from "./components/InstantLoanPreApprovedBanner";
import InstantLoanMobileApplyBar from "./components/InstantLoanMobileApplyBar";
import { buildInstantLoanJsonLd } from "@/libs/structuredData";
import JsonLd from "@/app/components/JsonLd";

const SITE = "https://www.grofi.in";

// Revalidate every hour
export const revalidate = 3600;

// Pre-render static pages for all instant lenders in database
export async function generateStaticParams() {
  try {
    const lenders = await prisma.instantLoansData.findMany({
      select: { id: true },
    });
    return lenders.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static instant loan params:", error);
    return [];
  }
}

// Cached fetcher with multi-strategy lookup (ID, alias, or clean name)
const fetchLoan = cache(async (loanId: string): Promise<InstantLoanLender | null> => {
  try {
    // 1. Direct match by ID
    const byId = await prisma.instantLoansData.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as InstantLoanLender;

    // 2. Fallback case-insensitive name match
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.instantLoansData.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as InstantLoanLender;
  } catch (error) {
    console.error("Error fetching instant loan lender:", error);
  }
  return null;
});

// Fetch top alternative instant lenders for comparison
async function fetchSimilarInstantLoans(excludeId: string): Promise<InstantLoanLender[]> {
  try {
    const list = await prisma.instantLoansData.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { id: "asc" },
      ],
    });
    return JSON.parse(JSON.stringify(list)) as InstantLoanLender[];
  } catch (error) {
    console.warn("Error fetching similar instant loans:", error);
    return [];
  }
}

// Optional helper to fetch bank-specific FAQs from database
async function fetchBankFaqs(lenderName: string): Promise<{ question: string; answer: string }[]> {
  try {
    const bankTokens = [
      "HDFC",
      "ICICI",
      "SBI",
      "Axis",
      "IDFC",
      "IndusInd",
      "Federal",
      "Canara",
      "AU",
      "BOB",
      "YES",
    ];
    const matchedToken = bankTokens.find((token) =>
      lenderName.toLowerCase().includes(token.toLowerCase())
    );
    if (!matchedToken) return [];

    const faqs = await prisma.bankFAQS.findMany({
      where: {
        bank: { contains: matchedToken, mode: "insensitive" },
      },
      take: 3,
    });
    return faqs.map((f) => ({ question: f.question, answer: f.answer }));
  } catch (error) {
    console.warn("Error fetching bank FAQs:", error);
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
      title: "Instant Personal Loan Not Found | Grofi",
      description: "The requested instant personal loan comparison could not be found on Grofi.",
    };
  }

  const title = `${lender.name} (2026): Cash in ${lender.disbursalTime}`;
  const rateSnippet = typeof lender.interestRate?.min === "number" ? `Starting rates from ${lender.interestRate.min}% p.a., ` : "";
  const description = `${lender.tagline}. ${rateSnippet}amounts up to ${lender.maxAmount}, paperless ${lender.documentation}. Check pre-approved offers with zero CIBIL impact on Grofi.`;
  const canonical = `${SITE}/personal-loans/instant-loans/${lender.id}`;
  const ogImage = lender.logo || "/partners-logos/hdfc-logo.webp";

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords: [
      lender.name,
      `${lender.name} interest rate`,
      `${lender.name} instant loan`,
      `${lender.name} EMI calculator`,
      `${lender.name} disbursal time`,
      `${lender.name} eligibility`,
      "instant personal loan",
      "fast cash loan",
      "paperless loan",
      "Grofi instant loans",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SelectedInstantLoan({
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
    permanentRedirect(`/personal-loans/instant-loans/${lender.id}`);
  }

  const [similarLenders, bankFaqs] = await Promise.all([
    fetchSimilarInstantLoans(lender.id),
    fetchBankFaqs(lender.name),
  ]);

  // Schema.org Structured Data (JSON-LD) for Search Engine Optimization
  const jsonLd = buildInstantLoanJsonLd(lender, SITE);

  return (
    <>
      <JsonLd schema={jsonLd} />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900 selection:bg-primary/20 selection:text-primary">
        <Navbar />

        {/* Hero Section with Partner Badges, Metrics, & Qualifier Form */}
        <InstantLoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Mini Quick Apply Dock */}
        <InstantLoanStickyNav lender={lender} />

        {/* Editorial Verdict, 4 Value Pillars, & Benchmark Scorecard */}
        <InstantLoanHighlightsSection lender={lender} />

        {/* Interactive Reducing Balance EMI & Repayment Calculator */}
        <InstantLoanEmiCalculatorSection lender={lender} />

        {/* Complete Schedule of Fees & Charges with RBI Fair Lending Guidelines */}
        <InstantLoanFeesSection lender={lender} />

        {/* Eligibility Criteria & 100% Digital Document Checklist */}
        <InstantLoanEligibilityDocsSection lender={lender} />

        {/* 4-Step 100% Paperless Digital Disbursal Flow */}
        <InstantLoanDisbursalStepsSection lender={lender} />

        {/* Borrower Safety, RBI Compliance, & App Metrics */}
        <InstantLoanSafetyTrustSection lender={lender} />

        {/* Searchable Lender FAQs & Bank Schedule Disclosures */}
        <InstantLoanFaqSection lender={lender} bankFaqs={bankFaqs} />

        {/* Similar Instant Loans Comparison */}
        <SimilarInstantLoansSection
          currentLender={lender}
          similarLenders={similarLenders}
        />

        {/* Pre-Approved Instant Sanction Banner CTA */}
        <InstantLoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <InstantLoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}