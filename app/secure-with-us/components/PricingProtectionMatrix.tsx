"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  Sparkles,
  Shield,
  HelpCircle,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { PlanDetails } from "./EnrollmentModal";

interface PricingProtectionMatrixProps {
  onSelectPlan: (plan: PlanDetails) => void;
}

export default function PricingProtectionMatrix({
  onSelectPlan,
}: PricingProtectionMatrixProps) {
  const [billingPeriod, setBillingPeriod] = useState<"annual" | "monthly">("annual");

  const plans = [
    {
      id: "essential" as const,
      name: "CyberShield Essential",
      tier: "Essential",
      subtitle: "Mass-Market Entry Plan",
      badge: "Mass-Market",
      annualPrice: 999,
      monthlyEquiv: 83,
      maxProtection: "₹50,000",
      bestUse: "Mass-market entry plan for everyday UPI spenders",
      isPopular: false,
      features: [
        { name: "Unauthorized UPI & QR Payment Loss", included: true },
        { name: "Digital Wallet Debits (Paytm, etc.)", included: true },
        { name: "Internet / Mobile Banking Protection", included: "₹25,000 Sub-limit" },
        { name: "Phishing / Email Spoofing Loss", included: false },
        { name: "Account Takeover / SIM Swap Cover", included: false },
        { name: "Identity Theft Legal Expenses", included: false },
        { name: "1930 Cybercell Complaint Guidance", included: true },
        { name: "Incident Claims Assistance Desk", included: true },
      ],
    },
    {
      id: "plus" as const,
      name: "CyberShield Plus",
      tier: "Plus (Hero)",
      subtitle: "Primary Product / Telecalling Hero",
      badge: "★ Recommended Hero Plan",
      annualPrice: 1499,
      monthlyEquiv: 125,
      maxProtection: "₹1,00,000",
      bestUse: "Primary product for comprehensive digital banking & UPI defense",
      isPopular: true,
      features: [
        { name: "Unauthorized UPI & QR Payment Loss", included: true },
        { name: "Digital Wallet Debits (Paytm, etc.)", included: true },
        { name: "Internet / Mobile Banking Protection", included: true },
        { name: "Phishing / Email Spoofing Loss", included: true },
        { name: "Account Takeover / SIM Swap Cover", included: true },
        { name: "Identity Theft Legal Expenses", included: "₹15,000 Sub-limit" },
        { name: "1930 Cybercell Complaint Guidance", included: true },
        { name: "Incident Claims Assistance Desk", included: true },
      ],
    },
    {
      id: "premium" as const,
      name: "CyberShield Premium",
      tier: "Premium",
      subtitle: "Higher-Value Customers & Families",
      badge: "High Net-Worth / Family",
      annualPrice: 2499,
      monthlyEquiv: 208,
      maxProtection: "₹2,00,000 – ₹5,00,000",
      bestUse: "Higher-value customers, executives & multi-account holders",
      isPopular: false,
      features: [
        { name: "Unauthorized UPI & QR Payment Loss", included: true },
        { name: "Digital Wallet Debits (Paytm, etc.)", included: true },
        { name: "Internet / Mobile Banking Protection", included: true },
        { name: "Phishing / Email Spoofing Loss", included: true },
        { name: "Account Takeover / SIM Swap Cover", included: true },
        { name: "Identity Theft Legal Expenses", included: "₹50,000 Sub-limit" },
        { name: "1930 Cybercell Complaint Guidance", included: true },
        { name: "Dedicated 1-on-1 Forensics Case Manager", included: true },
      ],
    },
  ];

  return (
    <section id="pricing-matrix-section" className="py-16 sm:py-24 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span>Section 2 • Price &amp; Protection Matrix</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Transparent Pricing Built for Every Indian Digital User
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Choose the right sum insured for your monthly online transaction volume. No hidden processing surcharges.
          </p>

          {/* Pricing Toggle */}
          <div className="mt-6 inline-flex items-center gap-2 p-1 bg-gray-100 rounded-full border border-gray-200 text-xs font-semibold">
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                billingPeriod === "annual"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual Billing (Standard)
            </button>
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                billingPeriod === "monthly"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly Equivalent (~₹83/mo)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? "bg-linear-to-b from-[#FDFBF7] to-white border-2 border-primary shadow-xl ring-4 ring-primary/5 -translate-y-2"
                  : "bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-gray-300"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-gold text-xs font-extrabold px-4 py-1 rounded-full shadow-md border border-gold/30 tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {plan.tier}
                  </span>
                  {!plan.isPopular && (
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bricolage font-bold text-2xl text-gray-900 mt-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.subtitle}</p>

                {/* Price Display */}
                <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bricolage font-black text-3xl sm:text-4xl text-gray-900">
                      ₹
                      {billingPeriod === "annual"
                        ? plan.annualPrice.toLocaleString("en-IN")
                        : plan.monthlyEquiv}
                    </span>
                    <span className="text-xs text-gray-500">
                      {billingPeriod === "annual" ? "/ year" : "/ month equiv."}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-primary flex items-center justify-between">
                    <span>Sum Insured:</span>
                    <span className="font-bricolage text-base text-gray-900">
                      {plan.maxProtection}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50 text-[11px] text-amber-900 leading-snug">
                  <strong>Best Use:</strong> {plan.bestUse}
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-2.5 text-xs">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Coverage Breakdown
                  </div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      {typeof feat.included === "string" ? (
                        <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          •
                        </div>
                      ) : feat.included ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`${
                          feat.included === false
                            ? "text-gray-400 line-through"
                            : "text-gray-700 font-medium"
                        }`}
                      >
                        {feat.name}
                        {typeof feat.included === "string" && (
                          <span className="ml-1 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {feat.included}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <button
                  onClick={() =>
                    onSelectPlan({
                      id: plan.id,
                      name: plan.name,
                      price: plan.annualPrice,
                      maxCover: plan.maxProtection,
                      tagline: plan.subtitle,
                    })
                  }
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? "bg-primary hover:bg-[#013539] text-white shadow-md hover:shadow-lg"
                      : "bg-gray-900 hover:bg-black text-white"
                  }`}
                >
                  <span>Select {plan.tier}</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verbatim Blueprint Disclaimer Footnote */}
        <div className="mt-10 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-start gap-3 text-xs text-gray-600">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-gray-800">* Commercial hypotheses only.</strong> Final pricing, applicable tax (GST), distributor commission, eligibility criteria, deductibles, sub-limits, and policy coverage parameters must be approved by the designated IRDAI-registered insurance partner and appointed actuary.
          </p>
        </div>

      </div>
    </section>
  );
}
