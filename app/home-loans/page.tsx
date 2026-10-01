import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ComingSoon from "@/app/components/ComingSoon";
import { Home, Percent, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Loans & Balance Transfer | Lowest Interest Rates - Grofi",
  description:
    "Find the lowest home loan interest rates starting from 8.35% p.a. Compare home loan balance transfers, maximum property value funding, and doorstep legal verification on Grofi.",
};

export default async function HomeLoan() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="flex-1">
        <ComingSoon
          badge="Housing Finance"
          title="Home Loans & Balance Transfers"
          highlightedWord="Coming Soon"
          description="Make your dream home a reality with India's lowest home loan interest rates, seamless balance transfers to reduce existing EMIs, and end-to-end doorstep legal support."
          eta="Coming Soon • Q2 2026"
          perks={[
            "Lowest home loan interest rates starting from 8.35% p.a.",
            "Long repayment tenures up to 30 years to minimize monthly EMI outflow",
            "Home loan balance transfer with high top-up facilities at identical home loan rates",
            "Doorstep legal assistance and property valuation support included",
          ]}
          features={[
            {
              title: "Lowest Market Rates",
              description:
                "Direct tie-ups with SBI, HDFC Bank, LIC Housing, and Axis Bank for prime borrower rates.",
              icon: <Percent className="w-5 h-5 text-[#B69226]" />,
            },
            {
              title: "Up to 90% Property Funding",
              description:
                "Maximize your loan eligibility with co-applicant options and flexible income assessment.",
              icon: <Home className="w-5 h-5 text-[#02474D]" />,
            },
            {
              title: "Hassle-Free Balance Transfer",
              description:
                "Transfer high-interest loans effortlessly and save lakhs of rupees in interest over your loan tenure.",
              icon: <ShieldCheck className="w-5 h-5 text-[#B69226]" />,
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}