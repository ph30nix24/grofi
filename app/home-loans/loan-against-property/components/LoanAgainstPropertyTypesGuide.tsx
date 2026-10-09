"use client";

import React from "react";
import {
  Home,
  Building2,
  Factory,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function LoanAgainstPropertyTypesGuide() {
  const { openApplyModal } = useApplyModal();

  const propertyTypes = [
    {
      title: "Residential Property",
      icon: Home,
      ltv: "Up to 70% – 75% LTV",
      color: "border-primary/20 bg-[#FDFBF7]",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      description:
        "The most widely accepted and highest-funded property collateral across Indian scheduled banks and HFCs.",
      examples: [
        "Self-occupied apartments & multi-storey flats",
        "Independent freehold houses & bungalows",
        "Vacant or rented residential flats in approved societies",
        "Residential builder floors with individual sub-meters",
      ],
      valuationTips:
        "Higher valuation given to clear carpet area, OC/CC availability, and approved municipal development plans.",
    },
    {
      title: "Commercial Property",
      icon: Building2,
      ltv: "Up to 60% – 65% LTV",
      color: "border-gold/30 bg-[#FDFBF7]",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
      description:
        "Ideal for business owners, doctors, lawyers, and retailers looking to monetize registered commercial real estate.",
      examples: [
        "Office spaces in Grade A/B IT and business parks",
        "Retail shopping outlets, high-street retail stores",
        "Rented commercial showrooms with corporate tenants (LRD option)",
        "Clinics, diagnostic centers, and coaching hubs",
      ],
      valuationTips:
        "Valued based on rental yield, locational footfall, commercial zoning certificates, and trade license compliance.",
    },
    {
      title: "Industrial & Warehouse Units",
      icon: Factory,
      ltv: "Up to 50% – 55% LTV",
      color: "border-emerald-200 bg-[#FDFBF7]",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      description:
        "Sanctioned by select private banks and NBFCs (Bajaj, ICICI, Axis, Tata Capital) for active MSME manufacturing units.",
      examples: [
        "Approved industrial sheds in designated industrial estates (RIICO, MIDC, GIDC, KIADB)",
        "Logistics godowns and approved storage warehouses",
        "Operational factory buildings with pollution board clearance",
      ],
      valuationTips:
        "Requires industrial lease deed, state industrial development clearance, and zero hazardous environmental liabilities.",
    },
  ];

  const titleChecklist = [
    {
      title: "30-Year Chain of Title Deeds",
      description:
        "Every prior registered sale deed, gift deed, or partition deed tracing original allotment to the current owner.",
    },
    {
      title: "Encumbrance Certificate (EC Form 15)",
      description:
        "Government sub-registrar certification proving no prior mortgages, court attachments, or liens exist.",
    },
    {
      title: "Sanctioned Layout Plan & OC",
      description:
        "Town planning approval ensuring construction strictly complies with sanctioned FAR/FSI and building bylaws.",
    },
    {
      title: "Khata / Patta & Mutation Extract",
      description:
        "Revenue department municipal record reflecting current owner's legal registration for property tax billing.",
    },
    {
      title: "Latest Property Tax Paid Receipts",
      description:
        "Evidence of up-to-date municipal tax payments for the current and immediately preceding financial years.",
    },
    {
      title: "Society NOC & Share Certificate",
      description:
        "For co-operative housing societies or apartment complexes, original share certificate and No-Dues clearance.",
    },
  ];

  return (
    <section id="property-types-section" className="py-12 sm:py-16 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Layers className="w-3.5 h-3.5 text-gold" />
            Collateral & Valuation Guidelines
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Accepted Property Types & <span className="text-primary">Legal Valuation Norms</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Learn what property categories Indian banks fund, their maximum permissible LTV ratios, and the mandatory legal documents required for an equitable mortgage.
          </p>
        </div>

        {/* 3 Property Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {propertyTypes.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl border p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow ${prop.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${prop.badgeColor}`}>
                      {prop.ltv}
                    </span>
                  </div>

                  <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    {prop.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Accepted Sub-Categories
                    </span>
                    {prop.examples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/70 text-[11px] text-gray-500 italic">
                  💡 {prop.valuationTips}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Section: Legal Title Checklist & Red Flags */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 6-Point Title Deed Checklist (7 cols) */}
          <div className="lg:col-span-7 bg-[#FDFBF7] rounded-3xl border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                Mandatory Legal Title Verification Checklist
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-6">
              Bank empanelled advocates perform a rigorous search to verify the property is free of dispute, unauthorized construction, or tax arrears before disbursal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {titleChecklist.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Property Red Flags & Ineligibility (5 cols) */}
          <div className="lg:col-span-5 bg-amber-50/50 rounded-3xl border border-amber-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-amber-950">
                Properties Lenders Commonly Reject
              </h3>
            </div>
            <p className="text-xs text-amber-900/80 mb-5">
              Banks and housing finance institutions strictly prohibit lending against the following real estate assets:
            </p>

            <ul className="space-y-3 text-xs text-amber-900">
              <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Agricultural / Farmland:</strong> RBI norms prohibit mortgage loans against un-converted agricultural lands.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Unauthorized Construction:</strong> Floors built without municipal approval or deviating from sanctioned maps.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Disputed Ancestral Property:</strong> Undivided co-owned properties where all legal heirs have not given written consent.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Negative Area Zones:</strong> Properties located in notified flood plains, red-zoned environmental belts, or unauthorized colonies.
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => openApplyModal("Loan Against Property", "Property Valuation Evaluation")}
                className="w-full bg-primary hover:bg-[#023337] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Your Property Feasibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
