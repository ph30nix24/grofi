import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CardMetaData, CardStructure } from "./components/type";
import { PARTNER_BANKS } from "../components/constants";
import CardHero from "./components/CardHero";
import CardStickyNav from "./components/CardStickyNav";
import CardEditorialVerdict from "./components/CardEditorialVerdict";
import CardRewardCalculator from "./components/CardRewardCalculator";
import CardFeesSection from "./components/CardFeesSection";
import CardLoungeTravelSection from "./components/CardLoungeTravelSection";
import CardHighlightsSection from "./components/CardHighlightsSection";
import CardProsConsSection from "./components/CardProsConsSection";
import CardEligibilitySection from "./components/CardEligibilitySection";
import CardFaqSection from "./components/CardFaqSection";
import SimilarCardsSection from "./components/SimilarCardsSection";
import CardPreApprovedBanner from "./components/CardPreApprovedBanner";
import CardMobileApplyBar from "./components/CardMobileApplyBar";

const SITE = "https://www.grofi.in";

export const revalidate = 3600;

type CardResult = {
  structure: CardStructure;
  metadata: CardMetaData | null;
};

// Helper: Convert bank issuer string to canonical slug
function getBankSlug(issuer: string): string {
  const matched = PARTNER_BANKS.find(
    (b) => b.name.toLowerCase() === issuer.toLowerCase()
  );
  if (matched) return matched.slug;
  return issuer.toLowerCase().trim().replace(/\s+/g, "-");
}

// Helper: Check if slug matches issuer cleanly
function isBankMatch(bankSlug: string, issuer: string): boolean {
  const expectedSlug = getBankSlug(issuer);
  const cleanBankSlug = bankSlug.toLowerCase().replace(/-bank$/, "").replace(/[^a-z0-9]/g, "");
  const cleanExpected = expectedSlug.toLowerCase().replace(/-bank$/, "").replace(/[^a-z0-9]/g, "");
  return (
    cleanBankSlug === cleanExpected ||
    bankSlug.toLowerCase() === expectedSlug.toLowerCase() ||
    issuer.toLowerCase().replace(/\s+/g, "-").includes(bankSlug.toLowerCase())
  );
}


// Cached fetcher for single card structure and metadata
const fetchstructureData = cache(async (cardId: string): Promise<CardResult | null> => {
  try {
    const [rawData, metaData] = await Promise.all([
      prisma.creditCard.findUnique({ where: { id: cardId } }).catch(() => null),
      prisma.cardMetaData.findUnique({ where: { creditCardId: cardId } }).catch(() => null),
    ]);

    if (rawData) {
      return {
        structure: JSON.parse(JSON.stringify(rawData)) as CardStructure,
        metadata: metaData,
      };
    }
  } catch (error) {
    console.warn("Prisma fetch failed, falling back to local dataset:", error);
  }
  return null;
});

// Fetch similar cards
async function fetchSimilarCards(
  issuer: string,
  excludeId: string,
  _category?: string[]
): Promise<CardStructure[]> {
  try {
    const rawSimilar = await prisma.creditCard.findMany({
      where: {
        issuer,
        id: { not: excludeId },
      },
      take: 3,
    });

    if (rawSimilar && rawSimilar.length > 0) {
      return JSON.parse(JSON.stringify(rawSimilar)) as CardStructure[];
    }
    return []
  } catch {
    return []
  }
}

// Fetch bank FAQs
async function fetchBankFAQs(issuer: string): Promise<{ question: string; answer: string }[]> {
  try {
    const rawFaqs = await prisma.bankFAQS.findMany({
      where: { bank: issuer },
      take: 5,
    });
    if (rawFaqs && rawFaqs.length > 0) {
      return rawFaqs.map((f) => ({ question: f.question, answer: f.answer }));
    }
  } catch {
    // ignore
  }
  return [];
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string; card: string }>;
}): Promise<Metadata> {
  const { bank, card } = await params;

  const data = await fetchstructureData(card);
  if (!data || !data.structure) {
    return {
      title: "Credit Card Not Found | Grofi",
      description: "The requested credit card review could not be found on Grofi.",
    };
  }

  const { structure, metadata } = data;

  const title =
    metadata?.title ??
    `${structure.name} Review (2026): Fees, Rewards & Lounge Access | Grofi`;

  const description =
    metadata?.description ??
    structure.description ??
    `Compare ${structure.name} fees, reward rates, airport lounge access, and eligibility. Check instant approval on Grofi with zero CIBIL impact.`;

  const canonical = `${SITE}/credit-cards/${bank}/${card}`;
  const ogImage = metadata?.imageUrl || structure.cardImage || "/partners-logos/hdfc-logo.webp";

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords: metadata?.keywords ?? [
      structure.name,
      `${structure.issuer} credit cards`,
      `${structure.name} annual fee`,
      `${structure.name} reward rate`,
      `${structure.name} lounge access`,
      `${structure.name} eligibility`,
      "Grofi credit cards",
    ],
    alternates: { canonical },
    openGraph: {
      title: metadata?.openGraphTitle ?? title,
      description: metadata?.openGraphDesc ?? description,
      url: canonical,
      siteName: "Grofi",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 504,
          alt: metadata?.imageAlt || structure.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata?.twitterTitle ?? title,
      description: metadata?.twitterDesc ?? description,
      images: [ogImage],
    },
  };
}

export default async function SelectedCard({
  params,
}: {
  params: Promise<{ bank: string; card: string }>;
}) {
  const { bank, card } = await params;

  const data = await fetchstructureData(card);
  if (!data || !data.structure) {
    notFound();
  }

  const { structure, metadata } = data;

  // Validate that bank slug matches the card's issuer; if not, redirect to the canonical URL
  if (!isBankMatch(bank, structure.issuer)) {
    const canonicalBankSlug = getBankSlug(structure.issuer);
    redirect(`/credit-cards/${canonicalBankSlug}/${card}`);
  }

  // Fetch parallel related resources
  const [similarCards, bankFaqs] = await Promise.all([
    fetchSimilarCards(structure.issuer, structure.id, structure.category),
    fetchBankFAQs(structure.issuer),
  ]);

  // Structured Data (JSON-LD) for SEO
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
            name: "Credit Cards",
            item: `${SITE}/credit-cards`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: structure.issuer,
            item: `${SITE}/credit-cards/${bank}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: structure.name,
            item: `${SITE}/credit-cards/${bank}/${card}`,
          },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: structure.name,
        description: structure.description || metadata?.description,
        brand: {
          "@type": "Brand",
          name: structure.issuer,
        },
        feesAndCommissionsSpecification: `Annual Fee: ${structure.annualFee}, Joining Fee: ${structure.joiningFee}`,
        annualPercentageRate: "43.2%",
        image: metadata?.imageUrl || structure.cardImage,
        url: `${SITE}/credit-cards/${bank}/${card}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900 selection:bg-primary/20 selection:text-primary">
      {/* Structured Data Script for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero Section */}
      <CardHero card={structure} bankSlug={bank} />

      {/* Sticky Quick Nav Anchor Bar */}
      <CardStickyNav card={structure} />

      {/* Editorial Verdict & Score Card */}
      <CardEditorialVerdict card={structure} />

      {/* Interactive Value & Rewards Savings Calculator */}
      <CardRewardCalculator card={structure} />

      {/* Transparent Fees & Charges */}
      <CardFeesSection card={structure} />

      {/* Airport Lounge & Travel Privileges */}
      <CardLoungeTravelSection card={structure} />

      {/* Key Highlights Grid */}
      <CardHighlightsSection card={structure} />

      {/* Honest Pros & Cons Assessment */}
      <CardProsConsSection card={structure} />

      {/* Eligibility & Documents Checklist */}
      <CardEligibilitySection card={structure} />

      {/* Frequently Asked Questions */}
      <CardFaqSection card={structure} extraFaqs={bankFaqs} />

      {/* Similar & Alternative Cards */}
      <SimilarCardsSection
        currentCard={structure}
        similarCards={similarCards}
        bankSlug={bank}
      />

      {/* Bottom Pre-Approved CTA Banner */}
      <CardPreApprovedBanner card={structure} />

      {/* Mobile Sticky Bottom Apply Bar */}
      <CardMobileApplyBar card={structure} />

      <Footer />
    </main>
  );
}