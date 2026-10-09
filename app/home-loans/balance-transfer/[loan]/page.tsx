import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { BalanceTransferLender } from "../components/type";

import BalanceTransferLoanHero from "./components/BalanceTransferLoanHero";
import BalanceTransferLoanStickyNav from "./components/BalanceTransferLoanStickyNav";
import BalanceTransferLoanVerdict from "./components/BalanceTransferLoanVerdict";
import BalanceTransferLoanCalculator from "./components/BalanceTransferLoanCalculator";
import BalanceTransferLoanFeesSection from "./components/BalanceTransferLoanFeesSection";
import BalanceTransferLoanTopUpOverdraft from "./components/BalanceTransferLoanTopUpOverdraft";
import BalanceTransferLoanEligibilityDocs from "./components/BalanceTransferLoanEligibilityDocs";
import BalanceTransferLoanProsCons from "./components/BalanceTransferLoanProsCons";
import BalanceTransferLoanStepsSection from "./components/BalanceTransferLoanStepsSection";
import BalanceTransferLoanFaqSection from "./components/BalanceTransferLoanFaqSection";
import BalanceTransferSimilarLenders from "./components/BalanceTransferSimilarLenders";
import BalanceTransferLoanPreApprovedBanner from "./components/BalanceTransferLoanPreApprovedBanner";
import BalanceTransferLoanMobileApplyBar from "./components/BalanceTransferLoanMobileApplyBar";

const SITE = "https://www.grofi.in";

// Revalidate every hour
export const revalidate = 3600;

// Pre-render static paths directly from database records
export async function generateStaticParams() {
  try {
    const lenders = await prisma.loanTransfer.findMany({
      select: { id: true },
    });
    return lenders.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static balance transfer params from database:", error);
    return [];
  }
}

// Cached fetcher with database multi-strategy lookup (Exact ID or case-insensitive name match)
const fetchLoan = cache(async (loanId: string): Promise<BalanceTransferLender | null> => {
  try {
    // 1. Direct match by ID in database
    const byId = await prisma.loanTransfer.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as BalanceTransferLender;

    // 2. Fallback case-insensitive name lookup in database
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.loanTransfer.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as BalanceTransferLender;
  } catch (error) {
    console.error("Error fetching balance transfer lender from database:", error);
  }
  return null;
});

// Fetch top alternative balance transfer lenders directly from database
async function fetchSimilarLenders(excludeId: string): Promise<BalanceTransferLender[]> {
  try {
    const list = await prisma.loanTransfer.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh20Yr: "asc" },
        { rating: "desc" },
      ],
    });
    return JSON.parse(JSON.stringify(list)) as BalanceTransferLender[];
  } catch (error) {
    console.warn("Error fetching similar balance transfer lenders from database:", error);
    return [];
  }
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
      title: "Balance Transfer Scheme Not Found | Grofi",
      description: "The requested home loan balance transfer scheme could not be found on Grofi.",
    };
  }

  const title =
    lender.title ||
    `${lender.name} (2026): Takeover Rates from ${lender.interestRate?.min ?? 7.25}% | Grofi`;

  const description =
    lender.description ||
    `${lender.tagline}. Switch your existing housing loan to ${lender.name} starting from ${lender.interestRate?.min ?? 7.25}% p.a. Enjoy capped processing fees (${lender.processingFeeCap}), top-up up to ${lender.maxTopUpAmount}, and zero prepayment penalties.`;

  const canonical = `${SITE}/home-loans/balance-transfer/${lender.id}`;
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
          `${lender.name} balance transfer`,
          `${lender.name} home loan takeover`,
          `${lender.name} savings calculator`,
          `${lender.name} top up loan`,
          "home loan balance transfer",
          "switch home loan",
          "Grofi balance transfer",
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

export default async function SelectedBalanceTransfer({
  params,
}: {
  params: Promise<{ loan: string }>;
}) {
  const { loan } = await params;

  // Fetch lender strictly from database
  const lender = await fetchLoan(loan);
  if (!lender) {
    notFound();
  }

  // Canonical redirect if accessed via non-canonical alias
  if (lender.id !== loan) {
    redirect(`/home-loans/balance-transfer/${lender.id}`);
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
            name: "Balance Transfer",
            item: `${SITE}/home-loans/balance-transfer`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: lender.name,
            item: `${SITE}/home-loans/balance-transfer/${lender.id}`,
          },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: lender.name.replace(/Home Loan|Balance Transfer|Takeover Scheme|Takeover/i, "").trim(),
        },
        annualPercentageRate: lender.interestRate?.min ?? 7.25,
        feesAndCommissionsSpecification: lender.processingFeeCap || lender.processingFee,
        url: `${SITE}/home-loans/balance-transfer/${lender.id}`,
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

        {/* Hero Section with Bank Logos, Takeover Metrics & Quick Savings Form */}
        <BalanceTransferLoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Quick Dock */}
        <BalanceTransferLoanStickyNav lender={lender} />

        {/* Editorial Verdict & Benchmark Scorecard */}
        <BalanceTransferLoanVerdict lender={lender} />

        {/* Interactive Dual-Mode Balance Transfer & Top-Up Savings Calculator */}
        <BalanceTransferLoanCalculator lender={lender} />

        {/* Complete Fees & Takeover Charges Breakdown with RBI 30-Day Guarantee */}
        <BalanceTransferLoanFeesSection lender={lender} />

        {/* Top-Up Loans & Overdraft Facilities Deep Dive */}
        <BalanceTransferLoanTopUpOverdraft lender={lender} />

        {/* Eligibility Criteria & Mandatory List of Documents (LOD) Checklist */}
        <BalanceTransferLoanEligibilityDocs lender={lender} />

        {/* Honest Pros & Cons Assessment */}
        <BalanceTransferLoanProsCons lender={lender} />

        {/* 5-Step Digital Takeover & Cheque Disbursal Journey */}
        <BalanceTransferLoanStepsSection lender={lender} />

        {/* Lender-Specific Searchable FAQs Driven from DB */}
        <BalanceTransferLoanFaqSection lender={lender} />

        {/* Alternative Balance Transfer Lenders from DB */}
        <BalanceTransferSimilarLenders
          currentLender={lender}
          similarLenders={similarLenders}
        />

        {/* Pre-Approved Limit Banner CTA */}
        <BalanceTransferLoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <BalanceTransferLoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}