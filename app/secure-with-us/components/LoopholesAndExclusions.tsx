"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldX,
  XCircle,
  HelpCircle,
  CheckCircle2,
  FileWarning,
  Eye,
  Info,
} from "lucide-react";

export default function LoopholesAndExclusions() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const loopholes = [
    {
      title: "1. Voluntary Payments & Authorizations",
      tag: "Voluntary Transfer",
      rule: "Customer knowingly authorizes the fund transfer; not automatically an unauthorized-fraud claim.",
      details:
        "If a customer willingly approves a UPI PIN payment to purchase a product from an online merchant or social media seller that subsequently fails to deliver goods, this is considered a commercial contract dispute, not unauthorized cyber fraud.",
      rationale:
        "Cyber insurance protects against unauthorized breaches, malware, and credential theft, not disputed e-commerce purchases or buyer remorse.",
      verdict: "Excluded (Handled via Consumer Court or Payment Gateway Chargeback)",
    },
    {
      title: "2. Investment, Crypto & Telegram Scams",
      tag: "High-Yield Scam",
      rule: "Exclude unless separately and explicitly insured under a specialized rider.",
      details:
        "Fraud involving Ponzi schemes, fake stock market investment apps, Telegram 'part-time rating tasks', and illicit cryptocurrency transfers are excluded under retail unauthorized cyber policies.",
      rationale:
        "Such transactions are initiated voluntarily by the user in pursuit of illegal or unregulated returns.",
      verdict: "Excluded under core retail policy terms",
    },
    {
      title: "3. OTP, UPI PIN & CVV Direct Sharing",
      tag: "Customer Conduct",
      rule: "Never promise blanket coverage; final eligibility follows policy conditions & customer conduct.",
      details:
        "If the customer directly reads out an OTP or types their secret UPI PIN over a voice call despite explicit RBI safety warnings on SMS, the claim will be evaluated under the policy's gross negligence and customer conduct guidelines.",
      rationale:
        "Insurance operates on the legal doctrine of 'Utmost Good Faith' (Uberrima Fides) and reasonable care.",
      verdict: "Evaluated under Policy Gross Negligence clauses",
    },
    {
      title: "4. Pre-Existing Incidents & Waiting Periods",
      tag: "Inception Rule",
      rule: "Exclude incidents occurring before policy inception or during initial waiting period.",
      details:
        "Cyber breaches, compromised accounts, or fraudulent debits that transpired prior to the purchase timestamp of the policy cannot be claimed retrospectively.",
      rationale:
        "Insurance cannot cover losses that have already occurred or are actively underway at the time of purchase.",
      verdict: "Strict Inception Exclusion",
    },
    {
      title: "5. Duplicate Recovery & Bank Chargeback Offsets",
      tag: "Indemnity Rule",
      rule: "Bank/payment-provider recovery & other insurance must be addressed in claim calculation.",
      details:
        "Under the core insurance Principle of Indemnity, an insured cannot profit from a loss. If your bank or UPI app retrieves ₹30,000 via RBI Zero-Liability reversal, CyberShield covers the remaining ₹70,000 unrecovered loss.",
      rationale:
        "Prevents double-dipping and ensures accurate loss settlement across multiple recovery channels.",
      verdict: "Net Offset Applied to Final Settlement",
    },
    {
      title: "6. Altered Evidence & Fraudulent Claims",
      tag: "Legal Compliance",
      rule: "False or altered documents trigger immediate investigation and legal consequences.",
      details:
        "Submission of forged bank account statements, fabricated cybercell FIR tokens, or staged unauthorized transactions results in immediate claim rejection, policy termination, and reporting under IPC / BNS fraud provisions.",
      rationale:
        "Rigorous verification protects the honest risk pool and maintains affordable premiums for all customers.",
      verdict: "Claim Rejected + Legal Action Initiated",
    },
    {
      title: "7. Bank Server Downtimes & System Glitches",
      tag: "Technical Issue",
      rule: "App or network failure is not automatically a cyber-fraud claim.",
      details:
        "If a UPI transfer is pending, debited but not credited due to inter-bank network timeouts, or your banking app is temporarily down for maintenance, this is an operational clearing issue, not cyber fraud.",
      rationale:
        "NPCI auto-reverses pending failed UPI transactions within T+1 to T+5 days directly to the originating bank.",
      verdict: "Non-Cyber Peril (Resolved via Bank TAT)",
    },
  ];

  return (
    <section id="exclusions-section" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Section 8 • Boundaries &amp; Integrity</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            The Loopholes You Must Close
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Plain-English policy boundaries. We believe honest clarity before purchase is the foundation of genuine trust.
          </p>
        </div>

        {/* 7 Tab Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Accordion list (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {loopholes.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === idx
                    ? "bg-white border-amber-600 shadow-md ring-2 ring-amber-500/10"
                    : "bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-bricolage font-bold text-sm text-gray-900 leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    activeTab === idx ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {idx + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detailed Deep Dive Card (7 cols) */}
          <div className="lg:col-span-7">
            {(() => {
              const current = loopholes[activeTab];
              return (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                    <div>
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        Boundary #{activeTab + 1}
                      </span>
                      <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 mt-0.5">
                        {current.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                      <ShieldX className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Core Blueprint Rule */}
                  <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 font-semibold mb-5 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Core Blueprint Rule:</strong> {current.rule}
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <div>
                      <h5 className="font-bricolage font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider">
                        Explanation &amp; Scenario:
                      </h5>
                      <p className="text-gray-600">{current.details}</p>
                    </div>

                    <div>
                      <h5 className="font-bricolage font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider">
                        Why This Boundary Exists:
                      </h5>
                      <p className="text-gray-600">{current.rationale}</p>
                    </div>
                  </div>

                  {/* Claim Status Badge */}
                  <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-gray-500 font-medium">Claim Disposition:</span>
                    <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
                      {current.verdict}
                    </span>
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
