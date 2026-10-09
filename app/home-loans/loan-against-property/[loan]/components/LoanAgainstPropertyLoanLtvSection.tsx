"use client";

import React from "react";
import {
  Home,
  Building2,
  Layers,
  CheckCircle2,
  FileSearch,
  Scale,
  MapPin,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";

interface LoanAgainstPropertyLoanLtvSectionProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanLtvSection({
  lender,
}: LoanAgainstPropertyLoanLtvSectionProps) {
  const maxLtv = lender.maxLtvPercent || 65;

  const propertyTiers = [
    {
      type: "Self-Occupied Residential Property",
      icon: Home,
      ltv: `Up to ${maxLtv}%`,
      description: "Apartments, individual villas, builder floors, and row houses where the applicant resides.",
      advantages: ["Highest sanction LTV ratio", "Lowest interest rate margin", "Fastest technical approval"],
      badge: "HIGHEST LTV",
      highlight: true,
    },
    {
      type: "Commercial Office / Retail Shop",
      icon: Building2,
      ltv: `Up to ${Math.max(maxLtv - 10, 55)}%`,
      description: "Standard commercial units in registered malls, office complexes, and designated high-street markets.",
      advantages: ["High multi-crore ticket sizes", "Accepted for working capital", "Lease rental discounting option"],
      badge: "BUSINESS FAVORITE",
      highlight: false,
    },
    {
      type: "Rented Residential / Industrial Asset",
      icon: Layers,
      ltv: `Up to ${Math.max(maxLtv - 15, 50)}%`,
      description: "Tenanted residential properties, factory units, or approved industrial sheds with clear industrial zoning.",
      advantages: ["Rental cash flow accounted for eligibility", "Tenure up to 10-15 years", "Replaced costly unsecured debt"],
      badge: "EXPANDABLE",
      highlight: false,
    },
  ];

  const valuationFactors = [
    {
      title: "Municipal Approval & Sanction Plan",
      description: "Property must have approved layout drawings from municipal corporation or urban development authority. Properties with severe unauthorized deviations face valuation cuts.",
      icon: FileSearch,
    },
    {
      title: "30-Year Chain Title Documents",
      description: "Empaneled advocates review the unbroken chain of registered title deeds dating back 30 years to verify unencumbered freehold ownership.",
      icon: Scale,
    },
    {
      title: "Residual Age of Structure",
      description: "The building should have an estimated economic residual life of at least 25 to 30 years. Banks inspect structural condition and quality of construction.",
      icon: Home,
    },
    {
      title: "Location & Access Road Width",
      description: "Properties situated on approved motorable roads (minimum 20-30 feet wide) receive higher valuation multipliers compared to congested or narrow alleyways.",
      icon: MapPin,
    },
  ];

  return (
    <section
      id="ltv-property-types"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Home className="w-3.5 h-3.5 text-gold" />
          <span>LTV &amp; COLLATERAL ELIGIBILITY</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Property Types Accepted &amp; <span className="text-primary">{lender.name}</span> LTV Limits
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Understand how much funding you can unlock based on your property&apos;s fair market valuation, classification, and zoning approvals.
        </p>
      </div>

      {/* Accepted Property Types Pill Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-bricolage font-bold text-base text-gray-900">
              Accepted Property Collateral Checklist
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Verified assets eligible for mortgage sanction under {lender.name}
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Max LTV: {lender.maxLtv}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-4">
          {lender.propertyTypesAccepted?.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 bg-[#FDFBF7] border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-800 shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Property LTV Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {propertyTiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                tier.highlight
                  ? "bg-white border-primary/30 shadow-md ring-1 ring-primary/10"
                  : "bg-white border-gray-200 shadow-2xs hover:shadow-sm"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {tier.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bricolage font-bold text-base text-gray-900 leading-snug">
                    {tier.type}
                  </h3>
                  <div className="font-bricolage font-extrabold text-2xl text-primary mt-1">
                    {tier.ltv}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Of Fair Market Valuation</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{tier.description}</p>

                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Key Features
                  </div>
                  {tier.advantages.map((adv, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The 4 Key Valuation Drivers */}
      <div className="bg-[#F8F6F0] rounded-3xl p-6 sm:p-8 border border-gray-200/80">
        <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-2">
          What Determines Your Final Property Valuation?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-6">
          Bank-empaneled technical surveyors inspect these critical metrics when finalizing your mortgage limit:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {valuationFactors.map((fact, idx) => {
            const Icon = fact.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bricolage font-bold text-sm text-gray-900 leading-snug">
                  {fact.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">{fact.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
