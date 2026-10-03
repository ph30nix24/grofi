import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { PersonalLoanLender } from "../components/type";
import LoanHero from "./components/LoanHero";
import LoanStickyNav from "./components/LoanStickyNav";
import LoanEditorialVerdict from "./components/LoanEditorialVerdict";
import LoanEmiCalculatorSection from "./components/LoanEmiCalculatorSection";
import LoanFeesSection from "./components/LoanFeesSection";
import LoanEligibilityDocsSection from "./components/LoanEligibilityDocsSection";
import LoanProsConsSection from "./components/LoanProsConsSection";
import LoanDisbursalStepsSection from "./components/LoanDisbursalStepsSection";
import LoanFaqSection from "./components/LoanFaqSection";
import SimilarLoansSection from "./components/SimilarLoansSection";
import LoanPreApprovedBanner from "./components/LoanPreApprovedBanner";
import LoanMobileApplyBar from "./components/LoanMobileApplyBar";


const SITE = "https://www.grofi.in";

export const revalidate = 3600;

// Pre-render static pages for all lenders in database
export async function generateStaticParams() {
  try {
    const lenders = await prisma.personalLoanLender.findMany({
      select: { id: true },
    });
    return lenders.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static loan params:", error);
    return [];
  }
}

// Cached fetcher with multi-strategy lookup (ID, alias, or name)
const fetchLoan = cache(async (loanId: string): Promise<PersonalLoanLender | null> => {
  try {
    // 1. Direct match by ID
    const byId = await prisma.personalLoanLender.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as PersonalLoanLender;

    // 2. Match by alias
    const byAlias = await prisma.personalLoanLender.findFirst({
      where: { aliases: { has: loanId } },
    });
    if (byAlias) return JSON.parse(JSON.stringify(byAlias)) as PersonalLoanLender;

    // 3. Fallback case-insensitive name match
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.personalLoanLender.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as PersonalLoanLender;
  } catch (error) {
    console.error("Error fetching personal loan lender:", error);
  }
  return null;
});

// Fetch top alternative lenders for comparison
async function fetchSimilarLenders(excludeId: string): Promise<PersonalLoanLender[]> {
  try {
    const list = await prisma.personalLoanLender.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { createdAt: "desc" },
      ],
    });
    return JSON.parse(JSON.stringify(list)) as PersonalLoanLender[];
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
      title: "Personal Loan Lender Not Found | Grofi",
      description: "The requested personal loan comparison could not be found on Grofi.",
    };
  }

  const title =
    lender.title ||
    `${lender.name} (2026): Interest Rates from ${lender.interestRate?.min ?? 9.99}% | Grofi`;

  const description =
    lender.description ||
    `${lender.tagline}. Check interest rates, EMI calculation, documents required, and instant paperless pre-approval with zero CIBIL impact on Grofi.`;

  const canonical = `${SITE}/personal-loans/${lender.id}`;
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
          `${lender.name} EMI calculator`,
          `${lender.name} eligibility`,
          "Grofi personal loans",
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

export default async function SelectedPersonalLoan({
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
    redirect(`/personal-loans/${lender.id}`);
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
            name: "Personal Loans",
            item: `${SITE}/personal-loans`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: lender.name,
            item: `${SITE}/personal-loans/${lender.id}`,
          },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.overview || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: lender.name.replace(/Personal Loan/i, "").trim(),
        },
        annualPercentageRate: lender.interestRate?.min ?? 9.99,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${SITE}/personal-loans/${lender.id}`,
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
              ratingCount: 1200,
            }
          : undefined,
      },
      ...(lender.customFaqs && lender.customFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: lender.customFaqs.map((faq) => ({
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

        {/* Hero Section with Live Lender Badges, Core Metrics & Preview */}
        <LoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Quick Dock */}
        <LoanStickyNav lender={lender} />

        {/* Editorial Verdict & Benchmark Scorecard */}
        <LoanEditorialVerdict lender={lender} />

        {/* Interactive Reducing Balance Loan EMI Calculator */}
        <LoanEmiCalculatorSection lender={lender} />

        {/* Complete Fees & Charges Matrix with RBI Guidelines */}
        <LoanFeesSection lender={lender} />

        {/* Eligibility Criteria & 100% Digital Document Checklist */}
        <LoanEligibilityDocsSection lender={lender} />

        {/* Honest Pros & Cons Assessment */}
        <LoanProsConsSection lender={lender} />

        {/* 4-Step End-to-End Digital Disbursal Journey */}
        <LoanDisbursalStepsSection lender={lender} />

        {/* Lender-Specific Searchable FAQs */}
        <LoanFaqSection lender={lender} />

        {/* Similar Alternative Lenders Comparison */}
        <SimilarLoansSection currentLender={lender} similarLenders={similarLenders} />

        {/* Pre-Approved Limit Banner CTA */}
        <LoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <LoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}