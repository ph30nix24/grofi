import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ComingSoon from "@/app/components/ComingSoon";
import { BookOpen, Sparkles, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Grofi Financial Insights & Blogs | Credit Cards, Loans & Wealth - Grofi",
  description:
    "Expert articles, credit card reward hacks, CIBIL score optimization strategies, and smart personal finance guides curated by Grofi financial researchers.",
};

export default async function Blog() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="flex-1">
        <ComingSoon
          badge="Knowledge Hub"
          title="Financial Insights & Expert Blogs"
          highlightedWord="Publishing Soon"
          description="We're assembling comprehensive guides, credit card maximization strategies, debt-reduction blueprints, and smart money habits to help you build financial freedom."
          eta="Launching Weekly • Q2 2026"
          perks={[
            "In-depth credit card comparison analyses, lounge access hacks & reward rate breakdowns",
            "Actionable step-by-step blueprints to boost your CIBIL score past 750+",
            "Loan balance transfer guides to save lakhs in interest payments",
            "Unbiased, data-backed financial wisdom with zero promotional bias",
          ]}
          features={[
            {
              title: "Credit Card Hacks & Guides",
              description:
                "Detailed walkthroughs to extract maximum travel points, free lounge visits, and cashback from your wallet.",
              icon: <Sparkles className="w-5 h-5 text-[#B69226]" />,
            },
            {
              title: "Credit Score Mastery",
              description:
                "Proven strategies on credit utilization, dispute resolution, and building an unshakeable financial profile.",
              icon: <TrendingUp className="w-5 h-5 text-[#02474D]" />,
            },
            {
              title: "Transparent Financial Research",
              description:
                "Data-backed product evaluations with full fee transparency, pros & cons, and hidden clause explanations.",
              icon: <BookOpen className="w-5 h-5 text-[#B69226]" />,
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}