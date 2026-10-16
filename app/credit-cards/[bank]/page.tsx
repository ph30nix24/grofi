import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import prisma from "@/libs/db";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BankHero from "./components/BankHero";
import BankPartnerSwitcher from "./components/BankPartnerSwitcher";
import ComparisonMatrixSection from "./components/ComparisonMatrixSection";
import BankCardExplorer from "./components/BankCardExplorer";
import BankWhyChooseSection from "./components/BankWhyChooseSection";
import BankFAQSection from "./components/BankFAQSection";
import BankPreApprovedBanner from "./components/BankPreApprovedBanner";
import { BankFAQS, CardStructure } from "../components/type";
import JsonLd from "@/app/components/JsonLd";
import { buildBankCreditCardsHubJsonLd } from "@/libs/structuredData";

import { PARTNER_BANKS, getBankSlug } from "./components/constants";

export const revalidate = 3600;

const fetchBankCards = cache(async (bankName: string, bankSlug: string): Promise<CardStructure[] | null> => {
  try {
    const rawData = await prisma.creditCard.findMany({
      where: {
        issuer: { equals: bankName, mode: "insensitive" },
      },
    });

    if (rawData.length > 0) {
      return JSON.parse(JSON.stringify(rawData)) as CardStructure[];
    }

    // Fallback: check if any cards match bankSlug via canonical getBankSlug
    const allCards = await prisma.creditCard.findMany();
    const matched = allCards.filter(
      (c) => c.issuer && getBankSlug(c.issuer).toLowerCase() === bankSlug.toLowerCase()
    );
    return JSON.parse(JSON.stringify(matched)) as CardStructure[];
  } catch (error) {
    console.warn("Failed to fetch data: ", error);
    return null;
  }
});

const fetchFAQs = cache(async (issuer: string): Promise<BankFAQS[] | null> => {
  try {
    const rawData = await prisma.bankFAQS.findMany({
      where: {
        bank: { equals: issuer, mode: "insensitive" },
      },
    });
    return JSON.parse(JSON.stringify(rawData)) as BankFAQS[];
  } catch (error) {
    console.warn("Failed to fetch data: ", error);
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string }>;
}): Promise<Metadata> {
  const bankSlug = (await params).bank;

  const partnerBank = PARTNER_BANKS.find(
    (b) => b.slug.toLowerCase() === bankSlug.toLowerCase()
  );
  const bank = partnerBank
    ? partnerBank.name
    : (bankSlug?.split("-") || [])
        .map((word, idx) => (idx === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
        .join(" ");

  const creditsCards = await fetchBankCards(bank, bankSlug);
  if (!creditsCards || creditsCards.length === 0) {
    return {
      title: "Bank Not Found | Grofi",
      description: "No credit cards found for this bank.",
    };
  }

  const ogImage = partnerBank?.logo || "/og-image.png";

  return {
    metadataBase: new URL("https://www.grofi.in"),
    title: `Best ${bank} Credit Cards in India (2026) | Compare Offers & Rewards | Grofi`,
    description: `Compare all ${bank} credit cards in India. Explore reward rates, airport lounge access, lifetime free offers, annual fees, and apply online with zero score impact.`,
    alternates: { canonical: `/credit-cards/${bankSlug}` },
    keywords: [
      `${bank} credit cards`,
      `best ${bank} credit card`,
      `apply ${bank} credit card online`,
      `${bank} lounge access credit card`,
      `${bank} lifetime free credit card`,
      `${bank} credit card rewards`,
      `compare ${bank} credit cards`,
      "Grofi credit cards",
    ],
    openGraph: {
      title: `Best ${bank} Credit Cards in India | Grofi`,
      description: `Compare all ${bank} credit cards with zero CIBIL impact soft checks. Explore reward rates, annual fees, and airport lounge perks.`,
      url: `https://www.grofi.in/credit-cards/${bankSlug}`,
      siteName: "Grofi",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 600,
          alt: `${bank} Credit Cards in India`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best ${bank} Credit Cards in India (2026) | Grofi`,
      description: `Compare all ${bank} credit cards with zero CIBIL impact soft checks. Explore reward rates and fees.`,
      images: [ogImage],
    },
  };
}

export default async function SelectedBankCreditCard({ params }: {
    params: Promise<{ bank: string }>
}) {
    const bankSlug = (await params).bank;

    const partnerBank = PARTNER_BANKS.find(
        (b) => b.slug.toLowerCase() === bankSlug.toLowerCase()
    );
    const bank = partnerBank
        ? partnerBank.name
        : (bankSlug?.split("-") || [])
            .map((word, idx) => (idx === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
            .join(" ");

    const creditsCards = await fetchBankCards(bank, bankSlug);
    if (!creditsCards || creditsCards.length === 0) {
        notFound();
    }

    const relatedFAQs = await fetchFAQs(bank);

    const jsonLd = buildBankCreditCardsHubJsonLd(
        bank,
        bankSlug,
        creditsCards || [],
        relatedFAQs || []
    );

    return (
        <>
            <JsonLd schema={jsonLd} />
            <main className="flex flex-col min-h-screen bg-[#FDFBF7] w-full max-w-full overflow-x-hidden">
                <Navbar />
                <BankHero
                    bankName={bank}
                    bankSlug={bankSlug}
                    cards={creditsCards || []}
                />
                <BankPartnerSwitcher
                    currentBankSlug={bankSlug}
                    currentBankName={bank}
                />
                
                <BankCardExplorer
                    initialCards={creditsCards || []}
                    bankName={bank}
                    bankSlug={bankSlug}
                />
                <ComparisonMatrixSection
                    bankName={bank}
                    cards={creditsCards || []}
                />
                <BankWhyChooseSection
                    bankName={bank}
                    bankSlug={bankSlug}
                />
                <BankFAQSection
                    bankName={bank}
                    faqs={relatedFAQs || []}
                />
                <BankPreApprovedBanner
                    bankName={bank}
                />
                <Footer />
            </main>
        </>
    )
}