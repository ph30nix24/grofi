import { Metadata } from "next";
import prisma from "@/libs/db";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreditCardExplorer from "./components/CreditCardExplorer";
import AllBanksFeaturesExplorer from "./components/AllBanksFeaturesExplorer";
import { CardStructure } from "./components/type";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Compare Best Credit Cards in India (200+ Cards) | Grofi",
  description:
    "Compare 200+ credit cards across HDFC, SBI, ICICI, Axis Bank, IndusInd, AU Bank, and more. Explore reward rates, airport lounge access, lifetime free offers, and instant pre-approved cards on Grofi.",
  alternates: { canonical: "/credit-cards" },
  keywords: [
    "credit cards",
    "compare credit cards",
    "best credit cards India",
    "lifetime free credit card",
    "lounge access credit cards",
    "cashback credit cards",
    "travel credit cards",
    "rupay credit cards",
    "upi credit cards",
    "hdfc infinia",
    "sbi cashback card",
    "axis magnus",
    "Grofi credit cards",
  ],
  openGraph: {
    title: "Compare Best Credit Cards in India | Grofi",
    description:
      "Find India's highest reward rate and lifetime free credit cards. 100% free eligibility check across 10+ partner banks.",
    url: "https://www.grofi.in/credit-cards",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
};

// Revalidate once per hour or fetch dynamically
export const revalidate = 3600;

async function getCreditCards(): Promise<CardStructure[]> {
  try {
    const rawData = await prisma.creditCard.findMany({
      orderBy: [
        { popularRank: "asc" },
        { createdAt: "desc" },
      ],
    });

    return JSON.parse(JSON.stringify(rawData)) as CardStructure[];
  } catch (error) {
    console.error("Error fetching credit cards from database:", error);
    return [];
  }
}

export default async function CreditCardsPage() {
  const cards = await getCreditCards();

  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <CreditCardExplorer initialCards={cards} />
      <AllBanksFeaturesExplorer />
      <Footer />
    </main>
  );
}