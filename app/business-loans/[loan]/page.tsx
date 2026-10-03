import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { BusinessLoanLender } from "../components/type";
import BusinessLoanHero from "./components/BusinessLoanHero";
import BusinessLoanStickyNav from "./components/BusinessLoanStickyNav";
import BusinessLoanEditorialVerdict from "./components/BusinessLoanEditorialVerdict";
import BusinessLoanEmiCalculatorSection from "./components/BusinessLoanEmiCalculatorSection";
import BusinessLoanFeesSection from "./components/BusinessLoanFeesSection";
import BusinessLoanEligibilityDocsSection from "./components/BusinessLoanEligibilityDocsSection";
import BusinessLoanGovernmentSchemes from "./components/BusinessLoanGovernmentSchemes";
import BusinessLoanProsConsSection from "./components/BusinessLoanProsConsSection";
import BusinessLoanDisbursalStepsSection from "./components/BusinessLoanDisbursalStepsSection";
import BusinessLoanFaqSection from "./components/BusinessLoanFaqSection";
import SimilarBusinessLoansSection from "./components/SimilarBusinessLoansSection";
import BusinessLoanPreApprovedBanner from "./components/BusinessLoanPreApprovedBanner";
import BusinessLoanMobileApplyBar from "./components/BusinessLoanMobileApplyBar";

const SITE = "https://www.grofi.in";

export const revalidate = 3600;

// Pre-render static pages for all business loan lenders in database
export async function generateStaticParams() {
  try {
    const lenders = await prisma.businessLoanData.findMany({
      select: { id: true },
    });
    return lenders.map((l) => ({ loan: l.id }));
  } catch (error) {
    console.warn("Could not pre-render static business loan params:", error);
    return [];
  }
}

// Cached fetcher with multi-strategy lookup (ID, or fallback name match)
const fetchLoan = cache(async (loanId: string): Promise<BusinessLoanLender | null> => {
  try {
    // 1. Direct match by ID
    const byId = await prisma.businessLoanData.findUnique({
      where: { id: loanId },
    });
    if (byId) return JSON.parse(JSON.stringify(byId)) as BusinessLoanLender;

    // 2. Fallback case-insensitive name match
    const cleanQuery = loanId.replace(/-/g, " ").trim();
    const byName = await prisma.businessLoanData.findFirst({
      where: { name: { contains: cleanQuery, mode: "insensitive" } },
    });
    if (byName) return JSON.parse(JSON.stringify(byName)) as BusinessLoanLender;
  } catch (error) {
    console.error("Error fetching business loan lender:", error);
  }
  return null;
});

// Fetch top alternative commercial lenders for comparison
async function fetchSimilarLenders(excludeId: string): Promise<BusinessLoanLender[]> {
  try {
    const list = await prisma.businessLoanData.findMany({
      where: { id: { not: excludeId } },
      take: 3,
      orderBy: [
        { startingEmiPerLakh: "asc" },
        { rating: "desc" },
      ],
    });
    return JSON.parse(JSON.stringify(list)) as BusinessLoanLender[];
  } catch (error) {
    console.warn("Error fetching similar business loan lenders:", error);
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
      title: "Business Loan Lender Not Found | Grofi",
      description: "The requested business loan lender could not be found on Grofi.",
    };
  }

  const title =
    lender.title ||
    `${lender.name} (2026): Interest Rates from ${lender.interestRate?.min ?? 10.75}% | Grofi`;

  const description =
    lender.description ||
    `${lender.tagline}. Check interest rates, monthly EMI calculation, MSME documents required, and instant paperless pre-approval with zero CIBIL impact on Grofi.`;

  const canonical = `${SITE}/business-loans/${lender.id}`;
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
          `${lender.name} MSME eligibility`,
          "Grofi business loans",
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

export default async function SelectedBusinessLoan({
  params,
}: {
  params: Promise<{ loan: string }>;
}) {
  const { loan } = await params;

  const lender = await fetchLoan(loan);
  if (!lender) {
    notFound();
  }

  // If accessed by a slug rather than canonical ID, redirect to canonical slug
  if (lender.id !== loan) {
    redirect(`/business-loans/${lender.id}`);
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
            name: "Business Loans",
            item: `${SITE}/business-loans`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: lender.name,
            item: `${SITE}/business-loans/${lender.id}`,
          },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: lender.name.replace(/Business Loan|Loan/i, "").trim(),
        },
        annualPercentageRate: lender.interestRate?.min ?? 10.75,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${SITE}/business-loans/${lender.id}`,
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

        {/* Hero Section with Live Commercial Badges, Core MSME Metrics & Apply Form */}
        <BusinessLoanHero lender={lender} />

        {/* Sticky Anchor Navigation Bar with Quick Dock */}
        <BusinessLoanStickyNav lender={lender} />

        {/* Editorial Verdict & Benchmark Scorecard */}
        <BusinessLoanEditorialVerdict lender={lender} />

        {/* Interactive Reducing Balance Business Loan EMI Calculator with Tax Advantage */}
        <BusinessLoanEmiCalculatorSection lender={lender} />

        {/* Complete Fees & Charges Matrix with RBI MSE Mandate */}
        <BusinessLoanFeesSection lender={lender} />

        {/* MSME Eligibility Criteria & 100% Digital Document Checklist */}
        <BusinessLoanEligibilityDocsSection lender={lender} />

        {/* Central Govt MSME Schemes (CGTMSE, MUDRA, Stand-Up India, PMEGP) */}
        <BusinessLoanGovernmentSchemes lender={lender} />

        {/* Honest Commercial Pros & Cons Assessment */}
        <BusinessLoanProsConsSection lender={lender} />

        {/* 4-Step End-to-End Digital MSME Disbursal Journey */}
        <BusinessLoanDisbursalStepsSection lender={lender} />

        {/* Lender-Specific Searchable FAQs */}
        <BusinessLoanFaqSection lender={lender} />

        {/* Similar Alternative Commercial Lenders Comparison */}
        <SimilarBusinessLoansSection currentLender={lender} similarLenders={similarLenders} />

        {/* Pre-Approved MSME Limit Banner CTA */}
        <BusinessLoanPreApprovedBanner lender={lender} />

        {/* Mobile Sticky Bottom Apply Bar */}
        <BusinessLoanMobileApplyBar lender={lender} />

        <Footer />
      </main>
    </>
  );
}