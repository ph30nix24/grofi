import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { HomeLoanLender } from "../components/type";

import HomeLoanHero from "./components/HomeLoanHero";
import HomeLoanStickyNav from "./components/HomeLoanStickyNav";
import HomeLoanEditorialVerdict from "./components/HomeLoanEditorialVerdict";
import HomeLoanEmiCalculatorSection from "./components/HomeLoanEmiCalculatorSection";
import HomeLoanFeesSection from "./components/HomeLoanFeesSection";
import HomeLoanLtvSection from "./components/HomeLoanLtvSection";
import HomeLoanEligibilityDocsSection from "./components/HomeLoanEligibilityDocsSection";
import HomeLoanTaxBenefitsSection from "./components/HomeLoanTaxBenefitsSection";
import HomeLoanProsConsSection from "./components/HomeLoanProsConsSection";
import HomeLoanDisbursalStepsSection from "./components/HomeLoanDisbursalStepsSection";
import HomeLoanFaqSection from "./components/HomeLoanFaqSection";
import SimilarHomeLoansSection from "./components/SimilarHomeLoansSection";
import HomeLoanPreApprovedBanner from "./components/HomeLoanPreApprovedBanner";
import HomeLoanMobileApplyBar from "./components/HomeLoanMobileApplyBar";

const SITE = "https://www.grofi.in";

export const revalidate = 3600;

// Pre-render static pages for all lenders in database
export async function generateStaticParams() {
  try {
    const lenders = await prisma.homeLoanData.findMany({
      select: { id: true },
    });
    return lenders.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static home loan params:", error);
    return [];
  }
}

// Cached fetcher with multi-strategy lookup (ID or name fallback)
const fetchLoan = cache(async (loanId: string): Promise<HomeLoanLender | null> => {
  try {
    // 1. Direct match by ID
    const byId = await prisma.homeLoanData.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as HomeLoanLender;

    // 2. Fallback case-insensitive name match
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.homeLoanData.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as HomeLoanLender;
  } catch (error) {
    console.error("Error fetching home loan lender:", error);
  }
  return null;
});

// Fetch top alternative lenders for comparison
async function fetchSimilarLenders(excludeId: string): Promise<HomeLoanLender[]> {
  try {
    const list = await prisma.homeLoanData.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh20Yr: "asc" },
        { rating: "desc" },
      ],
    });
    return JSON.parse(JSON.stringify(list)) as HomeLoanLender[];
  } catch (error) {
    console.warn("Error fetching similar lenders:", error);
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
      title: "Home Loan Lender Not Found | Grofi",
      description: "The requested home loan comparison could not be found on Grofi.",
    };
  }

  const title =
    lender.title ||
    `${lender.name} (2026): Interest Rates from ${lender.interestRate?.min ?? 7.15}% | Grofi`;

  const description =
    lender.description ||
    `${lender.tagline}. Check interest rates, EMI calculation, max ${lender.maxLtv} funding, tax exemptions, and instant pre-approval with zero CIBIL impact on Grofi.`;

  const canonical = `${SITE}/home-loans/${lender.id}`;
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
          `${lender.name} home loan EMI calculator`,
          `${lender.name} eligibility`,
          `${lender.name} maxgain overdraft`,
          "Grofi home loans",
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

export default async function SelectedHomeLoan({
  params,
}: {
  params: Promise<{ loan: string }>;
}) {
  const { loan } = await params;

  const lender = await fetchLoan(loan);
  if (!lender) {
    notFound();
  }

  // If accessed by an alias rather than canonical ID, redirect to canonical slug
  if (lender.id !== loan) {
    redirect(`/home-loans/${lender.id}`);
  }

  const similarLenders = await fetchSimilarLenders(lender.id);

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
            name: lender.name,
            item: `${SITE}/home-loans/${lender.id}`,
          },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: lender.name.replace(/Home Loan|Housing Loan/i, "").trim(),
        },
        annualPercentageRate: lender.interestRate?.min ?? 7.15,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${SITE}/home-loans/${lender.id}`,
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
      ...(lender.faqs && lender.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: lender.faqs.map((faq) => ({
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

        {/* Hero Section with Live Lender Badges, Core Metrics & Form */}
        <HomeLoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Quick Dock */}
        <HomeLoanStickyNav lender={lender} />

        {/* Editorial Verdict & Benchmark Scorecard */}
        <HomeLoanEditorialVerdict lender={lender} />

        {/* Interactive Dual-Mode EMI & Balance Transfer Savings Calculator */}
        <HomeLoanEmiCalculatorSection lender={lender} />

        {/* Complete Fees & Charges Matrix with RBI Fair Lending Directive */}
        <HomeLoanFeesSection lender={lender} />

        {/* RBI Loan-to-Value (LTV) Framework & Overdraft Savings */}
        <HomeLoanLtvSection lender={lender} />

        {/* Eligibility Criteria & Property Document Checklist */}
        <HomeLoanEligibilityDocsSection lender={lender} />

        {/* Income Tax Savings Guide (Sec 24b, 80C & Joint Loan Benefits) */}
        <HomeLoanTaxBenefitsSection />

        {/* Honest Pros & Cons Assessment */}
        <HomeLoanProsConsSection lender={lender} />

        {/* 5-Step End-to-End Digital Disbursal Journey */}
        <HomeLoanDisbursalStepsSection lender={lender} />

        {/* Lender-Specific Searchable FAQs */}
        <HomeLoanFaqSection lender={lender} />

        {/* Similar Alternative Lenders Comparison */}
        <SimilarHomeLoansSection currentLender={lender} similarLenders={similarLenders} />

        {/* Pre-Approved Limit Banner CTA */}
        <HomeLoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <HomeLoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}