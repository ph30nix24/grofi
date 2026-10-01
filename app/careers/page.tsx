import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ComingSoon from "@/app/components/ComingSoon";
import { Users, Rocket, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers at Grofi | Build the Future of Financial Growth",
  description:
    "Join the Grofi team and help build India's smartest financial growth platform. Explore upcoming career opportunities in engineering, design, data, and growth.",
};

export default async function Careers() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="flex-1">
        <ComingSoon
          badge="Join Our Mission"
          title="Careers at Grofi"
          highlightedWord="Hiring Soon"
          description="We are building India's most transparent, borrower-friendly financial growth ecosystem. High-impact roles in engineering, product design, credit risk, and growth marketing are opening shortly."
          eta="Openings Going Live • Q2 2026"
          perks={[
            "Work on mission-critical fintech architecture handling millions of queries",
            "High-trust culture with substantial autonomy and career acceleration",
            "Top-tier compensation packages with comprehensive health coverage and equity",
            "Flexible hybrid work environment centered around outcomes and innovation",
          ]}
          features={[
            {
              title: "Engineering & Architecture",
              description:
                "Build ultra-fast Next.js apps, distributed matching engines, and secure fintech APIs.",
              icon: <Rocket className="w-5 h-5 text-[#B69226]" />,
            },
            {
              title: "Product & UX Design",
              description:
                "Craft delightful, frictionless financial experiences that demystify banking for everyday consumers.",
              icon: <Users className="w-5 h-5 text-[#02474D]" />,
            },
            {
              title: "Culture of Empathy & Ownership",
              description:
                "A diverse, ambitious, and supportive team committed to solving complex financial challenges.",
              icon: <HeartHandshake className="w-5 h-5 text-[#B69226]" />,
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}