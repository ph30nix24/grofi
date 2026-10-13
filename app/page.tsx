import Hero2 from "./components/hero2";
import ProductsSection from "./components/ProductsSection";
// import CreditCardShowcase from "./components/CreditCardShowcase";
import EmiCalculator from "./components/EmiCalculator";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import InstagramGallery from "./components/InstagramGallery";
import { getReels } from "@/libs/instagram";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import JsonLd from "./components/JsonLd";
import { Metadata } from "next";
// import { CardStructure } from "./utils";
// import prisma from "@/libs/db";


// async function fetchCards(): Promise<CardStructure[] | null> {
//   try {
//     const rawData = await prisma.creditCard.findMany({
//       distinct: ["issuer"],
//       where: { joiningFee: { not: "Lifetime Free (₹0)" } },
//       orderBy: { joiningFee: "asc" },
//       take: 9,
//     });

//     return JSON.parse(JSON.stringify(rawData)) as CardStructure[]
//   } catch (error) {
//     console.warn("Error While fetching Card Information: ", error)
//     return null
//   }
// }

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.grofi.in/#org",
        name: "Grofi",
        url: "https://www.grofi.in",
        logo: "https://www.grofi.in/icon.png",
        description:
          "India's premier financial product comparison and discovery platform. Compare credit cards, personal loans, instant loans, home loans, and business loans with zero CIBIL impact soft checks.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "privacy@grofi.in",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        sameAs: [
          "https://www.instagram.com/grofi.in",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.grofi.in/#website",
        url: "https://www.grofi.in",
        name: "Grofi",
        description: "Compare Credit Cards, Personal Loans, Home Loans & Business Loans in India",
        publisher: { "@id": "https://www.grofi.in/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.grofi.in/credit-cards?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  // const featuredCreditCards = await fetchCards()
  const instagramReels = await getReels(12);

  return (
    <>
      <JsonLd schema={jsonLd} />
      <Navbar />
      <main className="flex flex-col min-h-screen overflow-x-clip">
        <Hero2 />
        <ProductsSection />
        <Testimonials />
        <InstagramGallery reels={instagramReels} />
        {/* <CreditCardShowcase creditCards={featuredCreditCards} /> */}
        <EmiCalculator />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  );
}