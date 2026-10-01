import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ComingSoon from "@/app/components/ComingSoon";
import { Briefcase, TrendingUp, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Loans & MSME Finance | Fuel Your Enterprise - Grofi",
  description:
    "Compare business loans and working capital credit lines up to ₹2 Crore from top banks and NBFCs. Collateral-free options, MUDRA scheme support, and instant approvals on Grofi.",
};

export default async function BusinessLoan() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="flex-1">
        <ComingSoon
          badge="MSME & Enterprise Funding"
          title="Business Loans & Capital"
          highlightedWord="Launching Soon"
          description="Supercharge your business with flexible working capital, equipment finance, and collateral-free MSME loans from India's most trusted commercial banks and NBFCs."
          eta="Coming Soon • Q2 2026"
          perks={[
            "Collateral-free business credit lines up to ₹50 Lakhs",
            "Term loans & working capital up to ₹2 Crore with custom repayment terms",
            "Assistance with government MSME schemes including CGTMSE and MUDRA",
            "Fast-track processing with minimal GST and balance sheet documentation",
          ]}
          features={[
            {
              title: "Tailored Working Capital",
              description:
                "Flexible credit lines that expand and adapt as your inventory and customer orders scale.",
              icon: <Briefcase className="w-5 h-5 text-[#B69226]" />,
            },
            {
              title: "Competitive Commercial Rates",
              description:
                "Benchmarked rates starting from 11.99% p.a. to keep your borrowing costs low and margins healthy.",
              icon: <TrendingUp className="w-5 h-5 text-[#02474D]" />,
            },
            {
              title: "50+ Financial Partners",
              description:
                "Multiple institutional lenders competing to offer your enterprise the highest sanction amount.",
              icon: <Building2 className="w-5 h-5 text-[#B69226]" />,
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}