"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Building2,
  Award,
} from "lucide-react";

export default function BalanceTransferTrustSection() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "100% Free Advisory Service",
      description:
        "Grofi does not charge borrowers any consultation, processing, or application service fees. Our advisory and doorstep document collection are completely free.",
    },
    {
      icon: Building2,
      title: "Direct Bank Disbursals",
      description:
        "Your takeover loan is disbursed directly by the new bank in favor of your existing bank account via official banker's cheque or RTGS. No third-party wallet pooling.",
    },
    {
      icon: Award,
      title: "RBI Regulated Lenders",
      description:
        "We partner strictly with Scheduled Commercial Banks and RBI/NHB registered Housing Finance Companies adhering to statutory interest rate benchmark guidelines.",
    },
    {
      icon: Lock,
      title: "Bank-Grade 256-Bit Security",
      description:
        "Your financial records, bank statements, and identity documents are encrypted end-to-end with 256-bit SSL protocols. Zero data selling or spam calls.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F0] border-t border-gray-200/70 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold shadow-2xs mb-3">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Borrower Security & Trust</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Why Switch Your Home Loan With Grofi?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Transparent rate comparisons, legal guidance on List of Documents (LOD), and institutional safeguards from day one.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="font-bricolage font-bold text-base text-gray-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
