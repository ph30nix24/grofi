import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ComingSoon from "@/app/components/ComingSoon";
import { Zap, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Instant Personal Loans | Pre-Approved Cash in Minutes - Grofi",
  description:
    "Get instant personal loans up to ₹5,00,000 in under 30 minutes. 100% digital KYC, minimal documentation, and instant bank account credit on Grofi.",
};

export default async function PersonalInstantLoan() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="flex-1">
        <ComingSoon
          badge="Instant Cash in Minutes"
          title="Instant Personal Loans"
          highlightedWord="Launching Soon"
          description="Emergency funding made effortless. Our instant loan engine enables pre-approved paperless credit lines credited directly to your bank account in under 30 minutes."
          eta="Launching Soon • Q2 2026"
          perks={[
            "Instant disbursal into your bank account in 15–30 minutes",
            "100% digital verification with Aadhaar OTP & Video KYC",
            "Loan amounts starting from ₹10,000 up to ₹5,00,000",
            "No collateral or physical paperwork required",
          ]}
          features={[
            {
              title: "Rapid 15-Minute Decisioning",
              description:
                "Automated underwriting provides instant loan approvals without waiting days for manual reviews.",
              icon: <Clock className="w-5 h-5 text-[#B69226]" />,
            },
            {
              title: "Paperless Digital Journey",
              description:
                "Complete your application with e-KYC, digital agreement signing, and automated bank mandate setup.",
              icon: <Zap className="w-5 h-5 text-[#02474D]" />,
            },
            {
              title: "Trusted RBI-Regulated NBFCs",
              description:
                "All loans are facilitated strictly through RBI-licensed NBFCs and scheduled commercial banks.",
              icon: <ShieldCheck className="w-5 h-5 text-[#B69226]" />,
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}