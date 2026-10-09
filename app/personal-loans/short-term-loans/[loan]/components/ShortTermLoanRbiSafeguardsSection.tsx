"use client";

import React from "react";
import {
  ShieldCheck,
  EyeOff,
  FileText,
  Clock,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Headphones,
  Lock,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";

interface ShortTermLoanRbiSafeguardsSectionProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanRbiSafeguardsSection({
  lender,
}: ShortTermLoanRbiSafeguardsSectionProps) {
  const safeguards = [
    {
      title: "Mandatory Cooling-Off / Look-Up Window",
      badge: lender.coolingOffPeriod,
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: Clock,
      desc: `Under RBI Digital Lending Directives, ${lender.name} gives you a mandatory ${lender.coolingOffPeriod} cooling-off period. If you change your mind, you can exit the loan with zero prepayment penalties by repaying only the principal and proportionate APR.`,
    },
    {
      title: "Transparent Key Fact Statement (KFS)",
      badge: lender.kfsProvided ? "Mandatory & Enforced" : "Standardized",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: FileText,
      desc: "Before executing any digital loan contract, you receive a standardized 1-page Key Fact Statement. This itemizes the all-inclusive Annual Percentage Rate (APR), processing fees, bounce charges, and net disbursed funds with zero hidden markups.",
    },
    {
      title: "Strict No Contact or Gallery Scraping",
      badge: "User Data Privacy",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: EyeOff,
      desc: "Unlike illegal Chinese lending apps, RBI-regulated entities are strictly forbidden from demanding phonebook contacts, call logs, or media gallery access. Your personal circle remains 100% private.",
    },
    {
      title: "Direct Bank-to-Bank IMPS Settlement",
      badge: "Zero Wallet Middlemen",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Building2,
      desc: "Disbursements and repayments occur strictly between the regulated entity bank account and your verified bank account via automated IMPS and e-NACH/UPI Autopay rails. No shady third-party prepaid wallets.",
    },
  ];

  return (
    <section id="rbi-safeguards" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>REGULATORY OVERSIGHT &amp; BORROWER RIGHTS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          RBI Digital Lending Safeguards for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Grofi exclusively features verified RBI-regulated Scheduled Commercial Banks and registered NBFCs that strictly uphold digital lending directives.
        </p>
      </div>

      {/* Regulated Entity Transparency Card */}
      <div className="bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/80 border border-emerald-200 rounded-3xl p-6 sm:p-7 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Digital Lending Regulated Entity (DLRE)
              </span>
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-0.5">
                {lender.rbiRegulatedEntity}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Operating under the Master Direction on Digital Lending issued by the Reserve Bank of India (RBI/2022-23/111).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-emerald-800 border border-emerald-300 shadow-2xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Regulated Originator
            </span>
          </div>
        </div>
      </div>

      {/* 4 Safeguard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {safeguards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redressal & Fair Recovery Guarantee Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Headphones className="w-4 h-4" />
            <span>Grievance Redressal</span>
          </div>
          <h5 className="font-bricolage font-bold text-sm text-gray-900">
            Dedicated Nodal Officer
          </h5>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            All customer grievances must be resolved within 30 days as mandated by RBI. Failure leads to automatic escalation to the RBI Ombudsman.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Data Localization</span>
          </div>
          <h5 className="font-bricolage font-bold text-sm text-gray-900">
            Sovereign Server Hosting
          </h5>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Borrower financial records and KYC records are stored exclusively on servers located in India, encrypted with bank-grade 256-bit protocols.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Fair Recovery Code</span>
          </div>
          <h5 className="font-bricolage font-bold text-sm text-gray-900">
            Zero Harassment Policy
          </h5>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Strict adherence to RBI recovery norms: no calls before 8 AM or after 7 PM, no physical visits without prior notice, and zero abusive language.
          </p>
        </div>
      </div>
    </section>
  );
}
