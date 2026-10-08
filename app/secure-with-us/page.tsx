import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SecureWithUsClient from "./components/SecureWithUsClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "CyberShield ₹1 Lakh Personal Cyber-Fraud Protection | Grofi",
  description:
    "Pay an annual premium for personal cyber protection against defined unauthorized digital-fraud losses, with protection up to ₹1,00,000, plus instant incident/claim assistance. Underwritten by an IRDAI-regulated general insurer.",
  alternates: { canonical: "/secure-with-us" },
  keywords: [
    "CyberShield",
    "personal cyber insurance",
    "₹1 lakh cyber fraud protection",
    "UPI fraud insurance",
    "online banking fraud protection",
    "cyber fraud compensation",
    "SIM swap fraud protection",
    "Grofi CyberShield",
    "phishing insurance India",
    "1930 cyber crime assistance",
  ],
  openGraph: {
    title: "CyberShield ₹1 Lakh Personal Cyber-Fraud Protection | Grofi",
    description:
      "Protect your UPI, NetBanking, and cards against unauthorized digital fraud up to ₹1,00,000 with 15-minute Golden Hour emergency response.",
    url: "https://www.grofi.in/secure-with-us",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberShield ₹1 Lakh Personal Cyber-Fraud Protection - Grofi",
    description:
      "Protection up to ₹1,00,000 against unauthorized digital-fraud losses plus claims assistance. From ₹83/month.",
  },
};

export default function SecureWithUsPage() {
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
            item: "https://www.grofi.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Secure With Us (CyberShield)",
            item: "https://www.grofi.in/secure-with-us",
          },
        ],
      },
      {
        "@type": "Product",
        name: "Grofi CyberShield ₹1 Lakh Protection",
        description:
          "Personal cyber protection against defined unauthorized digital-fraud losses up to ₹1,00,000, plus 24/7 Golden Hour claim assistance.",
        brand: {
          "@type": "Brand",
          name: "Grofi",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "1499",
          availability: "https://schema.org/InStock",
          url: "https://www.grofi.in/secure-with-us",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex flex-col min-h-screen overflow-x-clip bg-white">
        <SecureWithUsClient />
      </main>
      <Footer />
    </>
  );
}
