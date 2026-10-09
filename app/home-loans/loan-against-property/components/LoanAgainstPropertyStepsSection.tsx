"use client";

import React from "react";
import {
  Search,
  Home,
  FileCheck2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function LoanAgainstPropertyStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Digital Application & Instant Pre-Sanction",
      description:
        "Select your preferred lender from 10+ options. Fill out your property specs & income profile to receive an indicative sanction letter in 10 minutes.",
      badge: "Zero CIBIL Hit",
      timeline: "Day 1 (10 mins)",
    },
    {
      step: "02",
      icon: Home,
      title: "Doorstep Property Technical Valuation",
      description:
        "Bank-empanelled civil engineers perform an on-site physical visit to assess carpet area, structural stability, and prevailing circle & market rates.",
      badge: "Doorstep Visit",
      timeline: "Day 2",
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "30-Year Legal Title Search",
      description:
        "Bank advocates review the chain of title deeds, verify non-encumbrance at the sub-registrar office, and issue the Legal Scrutiny Report (LSR).",
      badge: "100% Secure Title",
      timeline: "Day 3–4",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Formal Sanction & MODT Execution",
      description:
        "Receive your binding sanction letter outlining interest rates and overdraft limits. Sign the loan agreement and Memorandum of Deposit of Title Deeds.",
      badge: "Rate Locked",
      timeline: "Day 4–5",
    },
    {
      step: "05",
      icon: Zap,
      title: "Original Title Deed Deposit & Disbursal",
      description:
        "Deposit original title deeds in the bank's secure fireproof vault. Funds are credited directly to your bank account via RTGS/NEFT.",
      badge: "Funds Disbursed",
      timeline: "Day 5–7",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Clock className="w-3.5 h-3.5 text-gold" />
            Simple 5-Step Process
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How to Get a <span className="text-primary">Loan Against Property</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            From initial digital pre-qualification to property valuation, legal clearance, and direct bank account disbursal in 5 to 7 working days.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
              >
                <div>
                  {/* Top Step Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-300 group-hover:text-gold transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Timeline Tag */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{item.timeline}</span>
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-linear-to-r from-primary via-[#023b40] to-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl mb-1">
              Ready to Monetize Your Real Estate Equity?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
              Check your eligibility across SBI, HDFC, ICICI, Axis & Bajaj with zero upfront fees and doorstep legal assistance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openApplyModal("Loan Against Property", "Fast Disbursal Application")}
            className="w-full sm:w-auto bg-gold hover:bg-[#c9a52f] text-gray-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Start Fast Pre-Approval</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
