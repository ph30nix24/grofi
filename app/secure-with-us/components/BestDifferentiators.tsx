"use client";

import React from "react";
import {
  Zap,
  Compass,
  FileCheck2,
  Clock,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface BestDifferentiatorsProps {
  onOpenEmergency: () => void;
}

export default function BestDifferentiators({
  onOpenEmergency,
}: BestDifferentiatorsProps) {
  const differentiators = [
    {
      code: "FAST",
      badge: "Response SLA",
      title: "One-Tap Report Fraud",
      icon: Zap,
      accent: "bg-amber-100 text-amber-800 border-amber-200",
      description: "Immediate guided first-response workflow initiated within 15 minutes of an incident. Helps freeze beneficiary accounts in the golden hour.",
      actionText: "Try Live Emergency Demo",
      hasAction: true,
    },
    {
      code: "GUID",
      badge: "Procedural Handholding",
      title: "Bank + Cybercrime Complaint Guidance",
      icon: Compass,
      accent: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description: "Direct assistance with filing National Cybercrime Portal (1930) tickets, FIR copies, and RBI Zero-Liability representation letters. Help with process, not false guarantees.",
      actionText: null,
      hasAction: false,
    },
    {
      code: "CLEA",
      badge: "Radical Transparency",
      title: "Coverage + Exclusions Upfront",
      icon: FileCheck2,
      accent: "bg-blue-100 text-blue-800 border-blue-200",
      description: "We show all coverage terms, deductible clauses, and exclusions BEFORE you pay ₹1. No ambiguous 40-page fine print surprises later.",
      actionText: null,
      hasAction: false,
    },
    {
      code: "TRAC",
      badge: "Realistic SLAs",
      title: "Real-Time Claim Status & Support",
      icon: Clock,
      accent: "bg-purple-100 text-purple-800 border-purple-200",
      description: "Live dashboard tracking every stage of your claim from document audit to insurer surveyor sign-off. We promise realistic, contractual SLAs.",
      actionText: null,
      hasAction: false,
    },
    {
      code: "SAFE",
      badge: "Core Trust Rule",
      title: "Never Ask for OTP / PIN / Password",
      icon: Lock,
      accent: "bg-rose-100 text-rose-800 border-rose-200",
      description: "Grofi will NEVER ask for your UPI PIN, card CVV, NetBanking passwords, or SMS OTPs. A zero-trust security architecture protecting your credentials.",
      actionText: null,
      hasAction: false,
    },
    {
      code: "TRUS",
      badge: "IRDAI Regulated",
      title: "Visible Insurer Identity & Policy Wording",
      icon: Building2,
      accent: "bg-teal-100 text-teal-800 border-teal-200",
      description: "No hidden risk-carrier identity. The underwriter's IRDAI registration number, claim settlement ratio (CSR), and master policy document are accessible upfront.",
      actionText: null,
      hasAction: false,
    },
  ];

  return (
    <section id="differentiators-section" className="py-16 sm:py-24 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Section 7 • The Grofi Difference</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            6 Core Differentiators Built on Absolute Trust
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Why customers and telecalling agents choose Grofi CyberShield over legacy insurer forms.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.code}
                className="rounded-3xl p-6 sm:p-7 border border-gray-200/80 bg-linear-to-b from-gray-50/50 to-white shadow-2xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      [{diff.code}]
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${diff.accent}`}>
                      {diff.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bricolage font-bold text-lg text-gray-900 leading-snug">
                      {diff.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                    {diff.description}
                  </p>
                </div>

                {diff.hasAction && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={onOpenEmergency}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                      <span>{diff.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Golden Hour Banner */}
        <div className="mt-12 bg-linear-to-r from-amber-500/10 via-primary/5 to-amber-500/10 rounded-3xl p-6 sm:p-8 border border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bricolage font-black text-xl">
              15m
            </div>
            <div>
              <h4 className="font-bricolage font-bold text-base sm:text-lg text-gray-900">
                The Golden Hour Guarantee
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Every minute counts after an unauthorized debit. Our automated workflow connects you immediately with your bank&apos;s fraud nodal officer.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenEmergency}
            className="w-full sm:w-auto shrink-0 bg-primary hover:bg-[#013539] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Emergency Workflow</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>

      </div>
    </section>
  );
}
