import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { LoanAgainstPropertyLender } from "../components/type";
import { FALLBACK_LAP_LENDERS } from "../components/fallbackData";

import LoanAgainstPropertyLoanHero from "./components/LoanAgainstPropertyLoanHero";
import LoanAgainstPropertyLoanStickyNav from "./components/LoanAgainstPropertyLoanStickyNav";
import LoanAgainstPropertyLoanVerdict from "./components/LoanAgainstPropertyLoanVerdict";
import LoanAgainstPropertyLoanCalculator from "./components/LoanAgainstPropertyLoanCalculator";
import LoanAgainstPropertyLoanFeesSection from "./components/LoanAgainstPropertyLoanFeesSection";
import LoanAgainstPropertyLoanLtvSection from "./components/LoanAgainstPropertyLoanLtvSection";
import LoanAgainstPropertyLoanOverdraftSection from "./components/LoanAgainstPropertyLoanOverdraftSection";
import LoanAgainstPropertyLoanEligibilityDocs from "./components/LoanAgainstPropertyLoanEligibilityDocs";
import LoanAgainstPropertyLoanProsCons from "./components/LoanAgainstPropertyLoanProsCons";
import LoanAgainstPropertyLoanStepsSection from "./components/LoanAgainstPropertyLoanStepsSection";
import LoanAgainstPropertyLoanFaqSection from "./components/LoanAgainstPropertyLoanFaqSection";
import LoanAgainstPropertySimilarLenders from "./components/LoanAgainstPropertySimilarLenders";
import LoanAgainstPropertyLoanPreApprovedBanner from "./components/LoanAgainstPropertyLoanPreApprovedBanner";
import LoanAgainstPropertyLoanMobileApplyBar from "./components/LoanAgainstPropertyLoanMobileApplyBar";

const SITE = "https://www.grofi.in";

// Revalidate every hour
export const revalidate = 3600;

// Pre-render static paths directly from database records
export async function generateStaticParams() {
  try {
    const lenders = await prisma.loanAgainstProperty.findMany({
      select: { id: true },
    });
    if (lenders && lenders.length > 0) {
      return lenders.map((l) => ({ loan: l.id }));
    }
    return FALLBACK_LAP_LENDERS.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static loan against property params from database:", error);
    return FALLBACK_LAP_LENDERS.map((l) => ({ loan: l.id }));
  }
}

// Cached fetcher with database multi-strategy lookup (ID or case-insensitive name match)
const fetchLoan = cache(async (loanId: string): Promise<LoanAgainstPropertyLender | null> => {
  try {
    // 1. Direct match by ID in database
    const byId = await prisma.loanAgainstProperty.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as LoanAgainstPropertyLender;

    // 2. Fallback case-insensitive name lookup in database
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.loanAgainstProperty.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as LoanAgainstPropertyLender;
  } catch (error) {
    console.error("Error fetching Loan Against Property lender from database:", error);
  }

  // Fallback to static data if database is unavailable or record not found
  const fallback = FALLBACK_LAP_LENDERS.find(
    (l) => l.id.toLowerCase() === loanId.toLowerCase() || l.id.includes(loanId.toLowerCase())
  );
  if (fallback) return fallback;

  return null;
});

// Fetch top alternative mortgage lenders directly from database
async function fetchSimilarLenders(excludeId: string): Promise<LoanAgainstPropertyLender[]> {
  try {
    const list = await prisma.loanAgainstProperty.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh15Yr: "asc" },
        { rating: "desc" },
      ],
    });
    if (list && list.length > 0) {
      return JSON.parse(JSON.stringify(list)) as LoanAgainstPropertyLender[];
    }
  } catch (error) {
    console.warn("Error fetching similar LAP lenders from database:", error);
  }

  return FALLBACK_LAP_LENDERS.filter((l) => l.id !== excludeId).slice(0, 3);
}

// Dynamic SEO Metadata Generation using database values
export async function generateMetadata({
  params,
}: {
  params: Promise<{ loan: string }>;
}): Promise<Metadata> {
  const { loan } = await params;
  const lender = await fetchLoan(loan);

  if (!lender) {
    return {
      title: "Loan Against Property Lender Not Found | Grofi",
      description: "The requested loan against property mortgage scheme could not be found on Grofi.",
    };
  }

  const title =
    lender.title ||
    `${lender.name} (2026): Mortgage Rates from ${lender.interestRate?.min ?? 9.25}% | Grofi`;

  const description =
    lender.description ||
    `${lender.tagline}. Check mortgage interest rates starting from ${lender.interestRate?.min ?? 9.25}% p.a., EMI calculation, ${lender.maxLtv} funding up to ${lender.maxAmount}, and flexible overdraft options on Grofi.`;

  const canonical = `${SITE}/home-loans/loan-against-property/${lender.id}`;
  const ogImage = lender.logo || "/partners-logos/sbi-logo.webp";

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords: lender.keywords?.length
      ? lender.keywords
      : [
          lender.name,
          `${lender.name} interest rate`,
          `${lender.name} loan against property`,
          `${lender.name} mortgage loan`,
          `${lender.name} lap emi calculator`,
          `${lender.name} property overdraft`,
          "loan against property",
          "mortgage loan India",
          "Grofi loan against property",
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

export default async function SelectedLoanAgainstProperty({
  params,
}: {
  params: Promise<{ loan: string }>;
}) {
  const { loan } = await params;

  // Fetch lender strictly from database with fallback resilience
  const lender = await fetchLoan(loan);
  if (!lender) {
    notFound();
  }

  // Canonical redirect if accessed via non-canonical alias
  if (lender.id !== loan) {
    redirect(`/home-loans/loan-against-property/${lender.id}`);
  }

  // Fetch alternative lenders directly from database
  const similarLenders = await fetchSimilarLenders(lender.id);

  // Extract FAQs directly from database record
  const dbFaqs = Array.isArray(lender.faqs) ? lender.faqs : [];

  // Schema.org Structured Data (JSON-LD) for Search Engine Optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Home Loans",
            item: `${SITE}/home-loans`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Loan Against Property",
            item: `${SITE}/home-loans/loan-against-property`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: lender.name,
            item: `${SITE}/home-loans/loan-against-property/${lender.id}`,
          },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: lender.name.replace(/Loan Against Property|Mortgage Loan/i, "").trim(),
        },
        annualPercentageRate: lender.interestRate?.min ?? 9.25,
        feesAndCommissionsSpecification: lender.processingFeeCap || lender.processingFee,
        url: `${SITE}/home-loans/loan-against-property/${lender.id}`,
        image: `${SITE}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: lender.rating
          ? {
              "@type": "AggregateRating",
              ratingValue: lender.rating,
              bestRating: 5,
              worstRating: 1,
              ratingCount: 1500,
            }
          : undefined,
      },
      ...(dbFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: dbFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900 selection:bg-primary/20 selection:text-primary">
        <Navbar />

        {/* Hero Section with Bank Logos, Mortgage Metrics & Live Lead Form */}
        <LoanAgainstPropertyLoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Quick Dock */}
        <LoanAgainstPropertyLoanStickyNav lender={lender} />

        {/* Editorial Verdict & Benchmark Scorecard */}
        <LoanAgainstPropertyLoanVerdict lender={lender} />

        {/* Interactive Dual-Mode LAP EMI & Property LTV Sanction Calculator */}
        <LoanAgainstPropertyLoanCalculator lender={lender} />

        {/* Complete Fees & Statutory Charges Breakdown with RBI 0% Foreclosure Guarantee */}
        <LoanAgainstPropertyLoanFeesSection lender={lender} />

        {/* Accepted Property Types, LTV Ceilings & Technical Valuation Framework */}
        <LoanAgainstPropertyLoanLtvSection lender={lender} />

        {/* Term Loan vs Dropline Overdraft (OD) Mechanics & Real-World Savings */}
        <LoanAgainstPropertyLoanOverdraftSection lender={lender} />

        {/* Eligibility Criteria & Mandatory 30-Year Property Title Dossier Checklist */}
        <LoanAgainstPropertyLoanEligibilityDocs lender={lender} />

        {/* Objective Pros & Cons Assessment */}
        <LoanAgainstPropertyLoanProsCons lender={lender} />

        {/* 5-Step Digital Mortgage Disbursal Journey */}
        <LoanAgainstPropertyLoanStepsSection lender={lender} />

        {/* Lender-Specific Searchable FAQs Driven from DB */}
        <LoanAgainstPropertyLoanFaqSection lender={lender} />

        {/* Alternative Loan Against Property Lenders from DB */}
        <LoanAgainstPropertySimilarLenders
          currentLender={lender}
          similarLenders={similarLenders}
        />

        {/* Pre-Approved In-Principle Mortgage Sanction Banner CTA */}
        <LoanAgainstPropertyLoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <LoanAgainstPropertyLoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}