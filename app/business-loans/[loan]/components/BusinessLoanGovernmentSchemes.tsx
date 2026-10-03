"use client";

import React from "react";
import {
  Landmark,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { BusinessLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanGovernmentSchemesProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanGovernmentSchemes({ lender }: BusinessLoanGovernmentSchemesProps) {
  const { openApplyModal } = useApplyModal();

  const schemes = [
    {
      name: "CGTMSE Collateral-Free Scheme",
      ceiling: "Up to ₹5 Crores",
      guarantee: "75% - 85% Sovereign Guarantee",
      desc: "Administered by SIDBI and Ministry of MSME. Provides credit guarantee coverage so micro and small businesses can secure substantial credit lines without pledging collateral property.",
      badge: "HIGHEST QUANTUM",
      color: "border-primary/30 bg-emerald-50/30",
    },
    {
      name: "Pradhan Mantri MUDRA Yojana (PMMY)",
      ceiling: "Up to ₹20 Lakhs",
      guarantee: "Tarun & Tarun Plus Categories",
      desc: "Specially formulated for micro-enterprises, artisans, and small traders. Features zero processing charges for lower tiers and subsidized commercial interest rates.",
      badge: "NO PROCESSING FEE",
      color: "border-amber-200 bg-amber-50/30",
    },
    {
      name: "Stand-Up India Scheme",
      ceiling: "₹10 Lakhs to ₹1 Crore",
      guarantee: "Women & SC/ST Enterprises",
      desc: "A flagship initiative supporting greenfield trading, manufacturing, and services businesses founded by women entrepreneurs and SC/ST promoters.",
      badge: "WOMEN / SC / ST",
      color: "border-blue-200 bg-blue-50/30",
    },
    {
      name: "PMEGP Credit Linked Subsidy",
      ceiling: "Up to ₹50 Lakhs Project Cost",
      guarantee: "15% - 35% Govt Capital Subsidy",
      desc: "Capital subsidy support by Khadi & Village Industries Commission (KVIC) where the government directly deposits margin subsidy into the entrepreneur's account.",
      badge: "UP TO 35% SUBSIDY",
      color: "border-purple-200 bg-purple-50/30",
    },
  ];

  return (
    <section id="gov-schemes" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Landmark className="w-3.5 h-3.5 text-gold" />
          <span>CENTRAL GOVERNMENT INITIATIVES</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          MSME Schemes &amp; Subsidies Compatible with <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Unlock sovereign credit guarantees and government interest subsidies for your business borrowing.
        </p>
      </div>

      {/* Grid of Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between ${scheme.color}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full tracking-wide">
                  {scheme.badge}
                </span>
                <span className="text-xs font-bold text-gray-700">
                  Limit: <strong className="text-primary font-bricolage">{scheme.ceiling}</strong>
                </span>
              </div>

              <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-1.5">
                {scheme.name}
              </h3>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{scheme.guarantee}</span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {scheme.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-medium">
                Udyam Registration Required
              </span>
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    `${scheme.name} - ${lender.name}`,
                    `Apply for Government MSME Scheme with ${lender.name}`
                  )
                }
                className="text-xs font-bold text-primary hover:text-[#035259] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
