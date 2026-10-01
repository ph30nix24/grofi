import Hero2 from "./components/hero2";
import ProductsSection from "./components/ProductsSection";
import CreditCardShowcase from "./components/CreditCardShowcase";
import EmiCalculator from "./components/EmiCalculator";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Metadata } from "next";
import { CardStructure } from "./utils";
import prisma from "@/libs/db";


async function fetchCards(): Promise<CardStructure[] | null> {
  try {
    const rawData = await prisma.creditCard.findMany({
      distinct: ["issuer"],
      where: { joiningFee: { not: "Lifetime Free (₹0)" } },
      orderBy: { joiningFee: "asc" },
      take: 9,
    });

    return JSON.parse(JSON.stringify(rawData)) as CardStructure[]
  } catch (error) {
    console.warn("Error While fetching Card Information: ", error)
    return null
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Grofi - Smart Financial Growth Partner",
  description: "Grofi helps you compare & apply for the best personal loans, credit cards, business loans, & home loans with a hassle-free process and fast approval.",
  alternates: { canonical: "/" },
  keywords: [
    "credit cards",
    "personal loans",
    "home loans",
    "instant loans",
    "credit card offers",
    "loan offers",
    "compare credit cards",
    "compare loans",
    "online loan application",
    "credit card eligibility",
    "loan eligibility",
    "Gorfi",
    "Grofi",
    "Money Mitra",
    "Money Mitra the reward club",
  ],
  openGraph: {
    title: "Grofi - Smart Financial Growth Partner",
    description: "Compare & apply for the best credit cards and loans.",
    url: "https://www.grofi.in",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  authors: [{ name: "Grofi" }],
  creator: "Grofi",
  publisher: "Grofi",
};

export default async function Home() {

  const featuredCreditCards = await fetchCards()
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero2 />
      <ProductsSection />
      <CreditCardShowcase creditCards={featuredCreditCards} />
      <EmiCalculator />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}





