"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Building2,
  FileCheck2,
  PhoneOff,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

export default function ShortTermLoanTrustSection() {
  const pillars = [
    {
      icon: Building2,
      title: "100% RBI-Regulated Lenders",
      description:
        "We only partner with Scheduled Commercial Banks and RBI-registered NBFCs. Absolutely zero unverified Chinese apps or predatory lending platforms.",
    },
    {
      icon: FileCheck2,
      title: "Mandatory Key Fact Statement (KFS)",
      description:
        "Every single fee, Annual Percentage Rate (APR), and monthly installment is disclosed transparently before you digitally e-Sign your agreement.",
    },
    {
      icon: ShieldCheck,
      title: "Cooling-Off / Look-Up Window",
      description:
        "Enjoy a legally protected look-up period of 1 to 3 days to exit your loan with zero foreclosure penalties by repaying only the principal and proportionate APR.",
    },
    {
      icon: Lock,
      title: "256-Bit SSL Bank Grade Security",
      description:
        "Your data is processed through Sahamati Account Aggregator rails and encrypted with AES 256-bit protocol. We never store or sell your financial data.",
    },
    {
      icon: PhoneOff,
      title: "Strict Zero-Spam Commitment",
      description:
        "No unsolicited sales calls, no continuous bot dials, and no harassment. We only connect you with the specific lender you choose.",
    },
    {
      icon: UserCheck,
      title: "Fair Practices Code & Redressal",
      description:
        "Direct access to Principal Nodal Officers and the RBI Integrated Ombudsman scheme for total peace of mind and ethical recovery practices.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            Grofi Trust & Protection Framework
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Safe, Transparent & <span className="text-primary">100% Consumer-First Credit</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Our strict due diligence standards ensure you get fast short-term liquidity without predatory hidden traps or high-pressure tactics.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-[#FDFBF7] p-6 rounded-3xl border border-gray-200/80 shadow-2xs hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Compliance Certification Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#EBF4ED]/60 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-950">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>
              <strong>100% RBI Digital Lending Compliant:</strong> Zero contact book scraping • Zero hidden fees • Mandatory Key Fact Statement (KFS) provided before loan disbursement.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-bold text-[11px] text-emerald-800 uppercase tracking-wider">
            <span>Verified 2026 Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
