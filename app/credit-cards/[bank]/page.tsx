import { Metadata } from "next";
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

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string }>;
}): Promise<Metadata> {
  const bankSlug = (await params).bank;

  const issuer = bankSlug?.split("-") || [];
  const bank = issuer
    .map((word, idx) => (idx === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");

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
    },
  };
}

async function fetchBankCards(issuer: string): Promise<CardStructure[] | null> {
    try {
        const rawData = await prisma.creditCard.findMany({
            where: { issuer }
        })

        return JSON.parse(JSON.stringify(rawData)) as CardStructure[]
    } catch (error) {
        console.warn("Failed to fetch data: ", error)
        return null
    }
}

async function fetchFAQs(issuer: string): Promise<BankFAQS[] | null> {
    try {
        const rawData = await prisma.bankFAQS.findMany({
            where: { bank: issuer }
        })
        console.log(rawData.length)
        return JSON.parse(JSON.stringify(rawData)) as BankFAQS[]
    } catch (error) {
        console.warn("Failed to fetch data: ", error)
        return null
    }
}


export default async function SelectedBankCreditCard({ params }: {
    params: Promise<{ bank: string }>
}) {
    const bankSlug = (await params).bank

    const issuer = bankSlug?.split("-") || [];
    const bank = issuer
        .map((word, idx) => (idx === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
        .join(" ");

    const creditsCards = await fetchBankCards(bank)
    const relatedFAQs = await fetchFAQs(bank)

    return (
        <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
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
    )
}