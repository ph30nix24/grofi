"use client";

import React from "react";
import { ShieldCheck, Lock, CheckCircle2, PhoneOff } from "lucide-react";

export default function BusinessLoanTrustSection() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "RBI-Regulated Lenders Only",
      desc: "Every lender on Grofi is an RBI-governed Scheduled Commercial Bank or licensed systemic NBFC.",
    },
    {
      icon: Lock,
      title: "256-Bit Bank-Grade Encryption",
      desc: "GST and banking statements are processed securely via RBI's certified Account Aggregator ecosystem.",
    },
    {
      icon: CheckCircle2,
      title: "100% Free & Transparent",
      desc: "Zero platform broker fees, zero markup, and zero impact on your CIBIL during pre-approval checks.",
    },
    {
      icon: PhoneOff,
      title: "Strict No-Spam Policy",
      desc: "We strictly never sell your enterprise phone number to telemarketers. Only verified sanctions are shared.",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FDFBF7] border border-gray-200/70"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center shrink-0 border border-primary/10">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
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
