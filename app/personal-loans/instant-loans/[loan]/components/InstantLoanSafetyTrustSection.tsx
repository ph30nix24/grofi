"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  Star,
  Download,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";

interface InstantLoanSafetyTrustSectionProps {
  lender: InstantLoanLender;
}

export default function InstantLoanSafetyTrustSection({
  lender,
}: InstantLoanSafetyTrustSectionProps) {
  const safetyRules = [
    {
      title: "Strict No Phone Contact or Gallery Access",
      desc: "In accordance with RBI Digital Lending Directives, the app is strictly prohibited from accessing your phonebook contacts, call logs, or media gallery.",
      icon: EyeOff,
      badge: "RBI Digital Lending Norms",
    },
    {
      title: "Direct Account Disbursal & Repayment",
      desc: "All loan disbursements and monthly EMI repayments flow strictly between the regulated entity bank account and the borrower, eliminating shady intermediary pass-throughs.",
      icon: Building2,
      badge: "Direct IMPS Rails",
    },
    {
      title: "Transparent Key Fact Statement (KFS)",
      desc: "Before agreement execution, you receive a full KFS disclosing the comprehensive Annual Percentage Rate (APR), processing fee, and penal charges upfront.",
      icon: FileText,
      badge: "Full Transparency",
    },
    {
      title: "Cooling-Off / Look-Up Exit Period",
      desc: "Borrowers are entitled to a mandatory cooling-off look-up period during which they can exit the loan without prepayment penalties by repaying principal and proportionate APR.",
      icon: Clock,
      badge: "Borrower Right",
    },
  ];

  return (
    <section id="safety-trust" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9AA3C]" />
          <span>BORROWER PROTECTION &amp; COMPLIANCE</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Safety &amp; RBI Compliance for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Grofi exclusively features verified RBI-regulated Scheduled Commercial Banks and registered NBFCs that uphold user data privacy.
        </p>
      </div>

      {/* Main Grid: Compliance Cards & App Trust Metric */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 RBI Compliance Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {safetyRules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                    {item.badge}
                  </span>
                  <h3 className="font-bricolage font-bold text-sm sm:text-base text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified RBI Compliant</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: App Ratings & Trust Guarantees (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-white via-[#FDFBF7] to-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Lender Verification
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                100% RBI Regulated
              </span>
            </div>

            <div>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900">
                Bank-Grade Data Security
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Your loan application, Aadhaar e-KYC, and banking data are processed via 256-bit SSL encrypted channels directly with the regulated lender. Grofi does not sell or store sensitive financial credentials.
              </p>
            </div>

            {/* Ratings summary bar */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs text-center">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bricolage font-bold text-base text-gray-900">
                    {lender.rating || 4.8}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 block">
                  {lender.reviewCount} Reviews
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs text-center">
                <div className="flex items-center justify-center gap-1 text-purple-600 mb-0.5">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span className="font-bricolage font-bold text-base text-gray-900">
                    {lender.appDownloads || "10M+"}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 block">
                  Digital Active Users
                </span>
              </div>
            </div>

            {/* Warning callout against fraud loan apps */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <strong className="text-amber-900 font-bold block mb-0.5">
                  Beware of Illegal Loan Apps:
                </strong>
                Never borrow from unverified APKs on social media that demand access to your phone contacts. Always check the official RBI list of approved digital lending apps.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
