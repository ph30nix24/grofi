"use client";

import React from "react";
import { ShieldCheck, Lock, CheckCircle2, PhoneOff } from "lucide-react";

export default function HomeLoanTrustSection() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "RBI-Regulated Lenders Only",
      desc: "All housing partners on Grofi are licensed Scheduled Commercial Banks or NHB/RBI-governed Housing Finance Companies.",
    },
    {
      icon: Lock,
      title: "256-Bit Bank-Grade Security",
      desc: "Your data is encrypted end-to-end and shared solely with your selected lender via RBI Account Aggregator protocol.",
    },
    {
      icon: CheckCircle2,
      title: "100% Free to Borrowers",
      desc: "Zero markups, zero hidden advisory fees, and zero impact on your CIBIL score during pre-qualification.",
    },
    {
      icon: PhoneOff,
      title: "Strict No-Spam Policy",
      desc: "We never sell your contact details to telemarketers. Only verified bank sanctioned loan officers will contact you.",
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
