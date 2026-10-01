import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ComingSoon from "@/app/components/ComingSoon";
import { CalendarRange, Percent, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Short Term Personal Loans | Flexible Short-Tenure Credit - Grofi",
  description:
    "Explore short-term personal loans with flexible 3 to 12 month tenures, zero foreclosure penalties, and low processing fees on Grofi.",
};

export default async function ShortTermPersonalLoan() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="flex-1">
        <ComingSoon
          badge="Short-Term Credit"
          title="Short Term Personal Loans"
          highlightedWord="Arriving Soon"
          description="Flexible short-term liquidity designed for urgent bridge financing, medical needs, or seasonal expenses with minimal commitment and early payoff benefits."
          eta="Coming Soon • Q2 2026"
          perks={[
            "Flexible tenures from 3 to 12 months with customized repayment schedules",
            "Zero foreclosure penalties after the minimum initial cooling period",
            "Transparent EMIs with no hidden charges or surprise deductions",
            "Rapid approval and instant transfer to verified bank accounts",
          ]}
          features={[
            {
              title: "Short & Flexible Tenures",
              description:
                "Borrow what you need and pay back quickly without locking into long multi-year liabilities.",
              icon: <CalendarRange className="w-5 h-5 text-[#B69226]" />,
            },
            {
              title: "Zero Foreclosure Penalties",
              description:
                "Close your loan early without punitive charges whenever your cash flow improves.",
              icon: <Percent className="w-5 h-5 text-[#02474D]" />,
            },
            {
              title: "Transparent & Safe",
              description:
                "Fair interest calculations, instant digitally generated repayment schedules, and clear terms.",
              icon: <ShieldCheck className="w-5 h-5 text-[#B69226]" />,
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}