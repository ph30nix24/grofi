"use client";

import React, { useState } from "react";
import CyberHero from "./CyberHero";
import PricingProtectionMatrix from "./PricingProtectionMatrix";
import CoveragePillars from "./CoveragePillars";
import ClaimSimulator from "./ClaimSimulator";
import CompetitorBenchmark from "./CompetitorBenchmark";
import BestDifferentiators from "./BestDifferentiators";
import LoopholesAndExclusions from "./LoopholesAndExclusions";
import SalesPositioningAndFAQ from "./SalesPositioningAndFAQ";
import EmergencyReportModal from "./EmergencyReportModal";
import EnrollmentModal, { PlanDetails } from "./EnrollmentModal";
import { ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";

export default function SecureWithUsClient() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<PlanDetails>({
    id: "plus",
    name: "CyberShield Plus (Hero)",
    price: 1499,
    maxCover: "₹1,00,000",
    tagline: "Primary Product / Hero Telecalling",
  });

  const handleOpenEnrollment = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setIsEnrollmentModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <CyberHero
        onOpenEnrollment={handleOpenEnrollment}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Section 2: Recommended Price & Protection Matrix */}
      <PricingProtectionMatrix onSelectPlan={handleOpenEnrollment} />

      {/* Section 3: What the ₹1 Lakh Plan Should Secure */}
      <CoveragePillars />

      {/* Section 4: How the ₹1 Lakh Actually Works (Interactive Claim Simulator) */}
      <ClaimSimulator />

      {/* Sections 5 & 6: Bajaj Allianz & ICICI Lombard Competitive Benchmark */}
      <CompetitorBenchmark />

      {/* Section 7: 6 Best Differentiators */}
      <BestDifferentiators onOpenEmergency={() => setIsEmergencyModalOpen(true)} />

      {/* Section 8: The Loopholes You Must Close (Transparent Exclusions) */}
      <LoopholesAndExclusions />

      {/* Sections 9–13: Telecalling Script, Objection Handling & FAQs */}
      <SalesPositioningAndFAQ />

      {/* Final Pre-Footer Call-to-Action Banner */}
      <section className="py-16 bg-linear-to-br from-[#02474D] via-[#023b40] to-[#01272B] text-white font-montserrat relative overflow-hidden border-t border-gold/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-gold mb-4">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Protect Your Digital Life Today</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-3xl sm:text-5xl text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Don&apos;t Wait for an Unauthorized Debit to Take Action
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Activate ₹1,00,000 personal cyber protection for less than ₹4 per day. Paperless 60-second onboarding with dedicated Golden Hour emergency assistance.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenEnrollment(selectedPlan)}
              className="bg-gold hover:bg-[#a3821f] text-gray-900 font-extrabold text-sm sm:text-base px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-gray-900" />
              <span>Get ₹1 Lakh Protection Now (₹1,499/yr)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-300 animate-pulse" />
              <span>Emergency 1-Tap Report Demo</span>
            </button>
          </div>

          <div className="mt-6 text-xs text-white/60">
            * Commercial hypothesis under blueprint. Claims underwritten by IRDAI-regulated general insurer.
          </div>
        </div>
      </section>

      {/* Floating Sticky Mobile Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 sm:hidden shadow-2xl flex items-center justify-between gap-3 font-montserrat">
        <div className="leading-tight">
          <div className="text-[10px] uppercase font-bold text-gray-500">CyberShield Hero</div>
          <div className="font-bricolage font-bold text-gray-900 text-sm">₹1 Lakh @ ₹1,499/yr</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shrink-0"
            aria-label="Emergency Report"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenEnrollment(selectedPlan)}
            className="bg-primary text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <span>Activate Cover</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <EmergencyReportModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
        selectedPlan={selectedPlan}
        onSelectPlan={(plan) => setSelectedPlan(plan)}
      />
    </>
  );
}
