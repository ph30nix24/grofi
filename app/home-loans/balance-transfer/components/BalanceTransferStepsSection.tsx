"use client";

import React from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Clock,
  Sparkles,
  FolderLock,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function BalanceTransferStepsSection() {
  const { openApplyModal } = useApplyModal();

  const steps = [
    {
      number: "01",
      title: "Compare & Choose Your Lender",
      description:
        "Select the lowest interest rate and optimal overdraft scheme among 14 verified lenders on Grofi. A dedicated home loan specialist evaluates your savings potential.",
      badge: "Instant on Grofi",
      icon: Search,
    },
    {
      number: "02",
      title: "Request Foreclosure Letter & LOD",
      description:
        "Request a formal Foreclosure Statement and List of Documents (LOD) from your existing lender. This certifies the exact balance to payoff and confirms original property title deeds in custody.",
      badge: "2 - 4 Working Days",
      icon: FileText,
    },
    {
      number: "03",
      title: "Submit Fast-Track Application & KYC",
      description:
        "Upload your KYC, 3-6 months bank statements, latest salary slips/ITRs, and the LOD. Grofi assists with legal scrutiny and fast-tracks internal bank sanction.",
      badge: "24 - 48 Hours",
      icon: CheckCircle2,
    },
    {
      number: "04",
      title: "Sanction & Payoff Cheque Disbursed",
      description:
        "Your new bank sanctions the loan and issues a payoff Demand Draft / RTGS directly in favor of your existing bank account to clear the old debt in full.",
      badge: "Disbursal Day",
      icon: Building2,
    },
    {
      number: "05",
      title: "Original Title Deeds Handover",
      description:
        "Your old bank closes the loan and hands over original title deeds to your new lender within the statutory 30-day RBI turnaround limit. Your EMI schedule restarts at the new lower rate.",
      badge: "RBI 30-Day Mandate",
      icon: FolderLock,
    },
  ];

  const documents = [
    {
      category: "KYC & Identity",
      items: ["Aadhaar Card (front & back)", "PAN Card", "Passport size photograph"],
    },
    {
      category: "Income Verification",
      items: [
        "Last 3 months salary slips",
        "Form 16 / Latest 2 years ITR",
        "Last 6 months salary bank account statement",
      ],
    },
    {
      category: "Existing Loan Papers",
      items: [
        "Foreclosure Outstanding Letter (Current Bank)",
        "List of Documents (LOD) certificate",
        "Last 12-18 months loan repayment bank statement",
      ],
    },
    {
      category: "Property Documents",
      items: [
        "Copy of registered Sale Deed / Conveyance Deed",
        "Copy of Allotment Letter & Builder NOC",
        "Latest property tax receipts",
      ],
    },
  ];

  return (
    <section id="steps-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold shadow-2xs mb-3">
            <Clock className="w-4 h-4 text-gold" />
            <span>Smooth 5-Step Process</span>
          </div>

          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            How Home Loan Balance Transfer Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Zero hassle, doorstep legal paperwork, and direct bank payoff ensure you switch lenders seamlessly without paying off out of pocket.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs flex flex-col justify-between relative group hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bricolage font-extrabold text-2xl sm:text-3xl text-primary/30 group-hover:text-primary transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="font-bricolage font-bold text-base text-gray-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Documents Checklist Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Paperwork Made Simple
              </span>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900">
                Documents Required for Takeover & Top-Up
              </h3>
            </div>
            <button
              type="button"
              onClick={() => openApplyModal("Home Loan Balance Transfer", "Assisted Doorstep Document Collection")}
              className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Request Free Document Assistance</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bricolage font-bold text-sm text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {doc.category}
                </h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  {doc.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* RBI Directive Callout Note */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-start gap-3 bg-[#EBF4ED]/50 rounded-2xl p-4 border border-primary/10 text-xs text-gray-700 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 font-bold block mb-0.5">
                RBI Statutory Consumer Protection Directive (2023):
              </strong>
              Per RBI regulations, regulated lending institutions (banks and HFCs) are strictly mandated to release all original movable/immovable property documents and remove registry charges within <strong>30 calendar days</strong> of full loan payoff. Failure attracts a statutory compensation penalty of ₹5,000 per day payable to the borrower.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
