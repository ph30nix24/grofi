"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Landmark,
  CreditCard,
  MailWarning,
  UserX,
  FileBadge,
  Headphones,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function CoveragePillars() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      code: "UPI",
      title: "Unauthorized UPI & QR Payment Loss",
      icon: Smartphone,
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Direct protection against unauthorized funds wiped via UPI IDs, compromised payment handles, or malicious QR codes.",
      blueprintNote: "Final wording must expressly cover the peril.",
      evidenceReq: "Bank UTR number, UPI transaction ID screenshot, and time-stamped complaint token.",
      examples: [
        "Unauthorized auto-debit requests triggered by disguised malware apps",
        "Cloned payment handles routing funds away from intended merchant",
        "Malicious QR code triggering unauthorized fund debit without authorization token",
      ],
    },
    {
      code: "BANK",
      title: "Unauthorized Internet & Mobile Banking",
      icon: Landmark,
      accent: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Losses from unauthorized NetBanking logins, session hijacking, rogue fund transfers (IMPS, NEFT, RTGS).",
      blueprintNote: "Require transaction and formal complaint evidence.",
      evidenceReq: "Bank account statement showing debited amount, formal dispute acknowledgment letter from branch.",
      examples: [
        "Session hijacking while using public or compromised Wi-Fi networks",
        "Unauthorized beneficiary addition followed by instant IMPS transfer",
        "Keylogger software capturing NetBanking login credentials",
      ],
    },
    {
      code: "CARD",
      title: "Unauthorized Card & Digital Wallet Fraud",
      icon: CreditCard,
      accent: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Protection covering card skimming, cloned debit/credit card swipes, and unauthorized digital wallet deductions.",
      blueprintNote: "Include only if insurer-approved.",
      evidenceReq: "Card hotlisting SMS/email proof, chargeback filing status, and bank police FIR token.",
      examples: [
        "Card cloned via compromised POS terminal or skimming device",
        "Unauthorized international transaction bypassing localized SMS notifications",
        "Unauthorized withdrawal from pre-funded wallet without owner authorization",
      ],
    },
    {
      code: "PHIS",
      title: "Phishing & Email / SMS Spoofing",
      icon: MailWarning,
      accent: "bg-purple-50 text-purple-700 border-purple-200",
      description: "Financial losses resulting from deceptive emails, forged bank domains, or fraudulent SMS spoofing masquerading as legitimate institutions.",
      blueprintNote: "Define covered event precisely.",
      evidenceReq: "Phishing SMS/email headers, screenshots of fake landing page URL, police incident docket.",
      examples: [
        "Fake electricity bill or KYC update SMS leading to disguised payment gateway",
        "Spoofed bank executive email directing to counterfeit netbanking portal",
        "Rogue APK link downloading spyware that manipulates incoming notifications",
      ],
    },
    {
      code: "TAKE",
      title: "Account Takeover & SIM Swap Attack",
      icon: UserX,
      accent: "bg-rose-50 text-rose-700 border-rose-200",
      description: "Protection when a cybercriminal illegitimately takes control of your primary mobile number or digital banking ecosystem.",
      blueprintNote: "Evidence and security conditions apply.",
      evidenceReq: "Telecom provider SIM replacement verification certificate and bank debit logs.",
      examples: [
        "Fraudster executing unauthorized SIM replacement at telecom store to divert SMS OTPs",
        "Unauthorized change of registered mobile number or email ID on bank profile",
        "Remote device takeover via rogue remote desktop utility (AnyDesk/TeamViewer spoof)",
      ],
    },
    {
      code: "ID",
      title: "Identity-Theft Legal & Restoration Expenses",
      icon: FileBadge,
      accent: "bg-indigo-50 text-indigo-700 border-indigo-200",
      description: "Reimbursement of out-of-pocket expenses incurred in re-issuing stolen PAN/Aadhaar/Passports and legal counsel fees.",
      blueprintNote: "Prefer a separate sub-limit (e.g. up to ₹15,000 within the ₹1 Lakh aggregate).",
      evidenceReq: "Government receipt fees for re-issue, advocate billing invoices for legal notices.",
      examples: [
        "Expenses for re-issuing forged identification documents used to open bogus loans",
        "Fees paid to credit rating agency (CIBIL/Experian) to dispute fraudulent loan inquiries",
        "Legal consultation fees for responding to unwarranted legal demands from spoofed lenders",
      ],
    },
    {
      code: "HELP",
      title: "Cyber Incident, Reporting & Claims Assistance",
      icon: Headphones,
      accent: "bg-teal-50 text-teal-700 border-teal-200",
      description: "Dedicated case officer assistance for filing the 1930 National Cybercrime Portal complaint, bank dispute letters, and insurance dossier.",
      blueprintNote: "Service benefit, not a cash guarantee.",
      evidenceReq: "Provided as an ongoing customer service benefit to all active policyholders.",
      examples: [
        "Golden Hour step-by-step guidance to freeze outward account movement",
        "Drafting legally compliant dispute representation letters under RBI Ombudsman scheme",
        "End-to-end follow up with insurer claims desk until settlement disbursement",
      ],
    },
  ];

  return (
    <section id="coverage-pillars-section" className="py-16 sm:py-24 bg-[#FAF9F5] border-y border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Section 3 • What the ₹1 Lakh Plan Secures</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Comprehensive Digital Risk Protection
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Engineered specifically to shield Indian consumers against the fastest-growing financial cyber threats.
          </p>
        </div>

        {/* Desktop Interactive Layout (Left Menu, Right Deep-Dive Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 7 Pillar Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === index;
              return (
                <button
                  key={pillar.code}
                  onClick={() => setActivePillar(index)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-white border-primary shadow-md ring-2 ring-primary/10"
                      : "bg-white/70 border-gray-200 hover:bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${pillar.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-gray-400">
                          [{pillar.code}]
                        </span>
                        <h4 className="font-bricolage font-bold text-sm text-gray-900 leading-snug">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-primary translate-x-1" : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Inspector Card (7 cols) */}
          <div className="lg:col-span-7">
            {(() => {
              const current = pillars[activePillar];
              const Icon = current.icon;
              return (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl relative overflow-hidden">
                  <div className="flex items-start justify-between border-b border-gray-100 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${current.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            PERIL: {current.code}
                          </span>
                          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Included in Hero Plan
                          </span>
                        </div>
                        <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 mt-1">
                          {current.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm text-gray-700 leading-relaxed">
                    {current.description}
                  </p>

                  {/* Blueprint Regulatory Specification Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Blueprint Guideline:</strong> {current.blueprintNote}
                    </div>
                  </div>

                  {/* Real-World Covered Scenarios */}
                  <div className="mt-6">
                    <h5 className="font-bricolage font-bold text-sm text-gray-900 mb-2.5">
                      Typical Trigger Scenarios Covered:
                    </h5>
                    <div className="space-y-2">
                      {current.examples.map((ex, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Requirement Box */}
                  <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-gray-600">
                    <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                      <span>Admissibility &amp; Documentation Evidence:</span>
                    </div>
                    <p className="bg-[#FAF9F5] p-3 rounded-xl border border-gray-200 font-mono text-[11px] text-gray-700">
                      {current.evidenceReq}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
}
