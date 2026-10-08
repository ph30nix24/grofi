"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  ShieldAlert,
  Building2,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  FileText,
  PhoneCall,
  Scale,
} from "lucide-react";
import { PlanDetails } from "./EnrollmentModal";

interface CyberHeroProps {
  onOpenEnrollment: (plan: PlanDetails) => void;
  onOpenEmergency: () => void;
}

export default function CyberHero({
  onOpenEnrollment,
  onOpenEmergency,
}: CyberHeroProps) {
  const [selectedSum, setSelectedSum] = useState<"50k" | "100k" | "500k">("100k");

  const plansMap = {
    "50k": {
      id: "essential" as const,
      name: "CyberShield Essential",
      price: 999,
      maxCover: "₹50,000",
      tagline: "Mass-Market Entry Plan",
      monthly: 83,
    },
    "100k": {
      id: "plus" as const,
      name: "CyberShield Plus (Hero)",
      price: 1499,
      maxCover: "₹1,00,000",
      tagline: "Primary Product / Hero Telecalling",
      monthly: 125,
    },
    "500k": {
      id: "premium" as const,
      name: "CyberShield Premium",
      price: 2499,
      maxCover: "₹2,00,000 - ₹5,00,000",
      tagline: "Executive / Family Coverage",
      monthly: 208,
    },
  };

  const currentPlan = plansMap[selectedSum];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/60 overflow-hidden font-montserrat">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Regulatory Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-xs border border-primary/15 rounded-full px-3.5 py-1.5 text-xs text-gray-700 shadow-2xs">
          <span className="flex items-center gap-1 font-bold text-primary">
            <Building2 className="w-3.5 h-3.5 text-gold" />
            IRDAI Compliant Architecture
          </span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="text-gray-600 text-[11px] sm:text-xs">
            Risk carried by an IRDAI-regulated general insurer. Grofi manages CX, technology &amp; claims assistance.
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (7 cols): Hero Pitch & Strategic Framing */}
          <div className="lg:col-span-7 text-left">
            {/* Blueprint Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>CyberShield Launch Blueprint • Digital + Telecalling</span>
            </div>

            {/* Main Title */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-gray-900 tracking-tight leading-[1.12]">
              ₹1 Lakh Personal <br />
              <span className="text-primary relative inline-block">
                Cyber-Fraud Protection
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-gold/25 -z-10 rounded" />
              </span>
            </h1>

            {/* The Product — One Line Definition from blueprint */}
            <div className="mt-4 p-4 rounded-xl bg-white/90 border-l-4 border-primary shadow-xs">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed italic">
                &ldquo;Pay an annual premium for personal cyber protection against defined unauthorized digital-fraud losses, with protection up to ₹1,00,000, plus incident/claim assistance — subject to final insurer-approved policy.&rdquo;
              </p>
              <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>
                  <strong>Strategic Clarity:</strong> The phrase &ldquo;up to ₹1 lakh&rdquo; avoids promising an automatic payout. You are protected for admissible loss subject to policy conditions.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnrollment(currentPlan)}
                className="bg-primary hover:bg-[#013539] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Activate ₹1 Lakh Hero Plan (₹1,499/yr)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEmergency}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                <span>One-Tap Report Fraud Demo</span>
              </button>

              <button
                onClick={() => scrollTo("claim-simulator-section")}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold text-xs sm:text-sm px-4 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-primary" />
                <span>See How Payouts Work</span>
              </button>
            </div>

            {/* 4 Stat Cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/90 p-3 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Hero Cover
                </div>
                <div className="text-xl sm:text-2xl font-black font-bricolage text-primary mt-0.5">
                  ₹1,00,000
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">UPI &amp; NetBanking</div>
              </div>

              <div className="bg-white/90 p-3 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  From Just
                </div>
                <div className="text-xl sm:text-2xl font-black font-bricolage text-gray-900 mt-0.5">
                  ₹83 <span className="text-xs font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">₹999 Annual Plan</div>
              </div>

              <div className="bg-white/90 p-3 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Golden Hour
                </div>
                <div className="text-xl sm:text-2xl font-black font-bricolage text-emerald-700 mt-0.5">
                  &lt; 15 Mins
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">First-response SLA</div>
              </div>

              <div className="bg-white/90 p-3 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Support
                </div>
                <div className="text-xl sm:text-2xl font-black font-bricolage text-gold mt-0.5">
                  1930 + FIR
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">Nodal Assistance</div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive Plan Selector Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-gray-200/90 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-gold text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl border-l border-b border-gold/30">
                Primary Telecalling Hero
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bricolage font-bold text-gray-900 text-lg leading-tight">
                    Instant Cover Estimator
                  </h3>
                  <p className="text-[11px] text-gray-500">Choose your digital risk tier</p>
                </div>
              </div>

              {/* Tier Toggle Switch */}
              <div className="bg-gray-100 p-1 rounded-xl grid grid-cols-3 gap-1 mb-5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedSum("50k")}
                  className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                    selectedSum === "50k"
                      ? "bg-white text-gray-900 shadow-xs font-bold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  ₹50,000
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSum("100k")}
                  className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                    selectedSum === "100k"
                      ? "bg-primary text-white shadow-xs font-bold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  ★ ₹1 Lakh (Hero)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSum("500k")}
                  className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                    selectedSum === "500k"
                      ? "bg-white text-gray-900 shadow-xs font-bold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  ₹2L – ₹5L
                </button>
              </div>

              {/* Dynamic Tier Summary Card */}
              <div className="bg-linear-to-br from-[#02474D]/5 to-[#B69226]/10 rounded-2xl p-4 border border-primary/15 mb-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-700">{currentPlan.name}</span>
                    <div className="text-[11px] text-gray-500">{currentPlan.tagline}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bricolage font-black text-2xl text-primary">
                      ₹{currentPlan.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-500"> / year</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200/60 text-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Unauthorized UPI &amp; QR Loss
                    </span>
                    <span className="font-bold text-gray-900">Covered</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      NetBanking / SIM Swap Hijack
                    </span>
                    <span className="font-bold text-gray-900">Covered</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Golden Hour Claim Assistance
                    </span>
                    <span className="font-bold text-gray-900">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      National 1930 Portal Filing
                    </span>
                    <span className="font-bold text-gray-900">Assisted</span>
                  </div>
                </div>
              </div>

              {/* Primary Call To Action */}
              <button
                onClick={() => onOpenEnrollment(currentPlan)}
                className="w-full bg-primary hover:bg-[#013539] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Protect With {currentPlan.name}</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              {/* Micro-guarantees */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  Zero OTP / Password Asking
                </span>
                <span>Paperless 1-Min Activation</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
