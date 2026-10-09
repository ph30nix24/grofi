"use client";

import React from "react";
import { Lock, PhoneOff, Landmark, Award } from "lucide-react";

export default function LoanAgainstPropertyTrustSection() {
  const trustPillars = [
    {
      icon: Landmark,
      title: "RBI-Regulated Lenders Only",
      desc: "All mortgage partners on Grofi are licensed Scheduled Commercial Banks or RBI/NHB-governed Housing Finance Companies.",
    },
    {
      icon: Lock,
      title: "256-Bit Bank-Grade Security",
      desc: "Your data and property documents are encrypted end-to-end and transmitted solely to your chosen lender under strict confidentiality.",
    },
    {
      icon: Award,
      title: "100% Free to Borrowers",
      desc: "Zero broker commission, zero hidden platform markups, and zero hard CIBIL score inquiries during in-principle pre-qualification.",
    },
    {
      icon: PhoneOff,
      title: "Strict Zero-Spam Policy",
      desc: "We never distribute or sell your contact information to third-party telemarketers. Only verified mortgage officers reach out.",
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
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FDFBF7] border border-gray-200/70 shadow-2xs hover:shadow-xs transition-shadow"
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
