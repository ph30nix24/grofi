"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Sparkles,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

export default function SalesPositioningAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"faq" | "pitch" | "objections">("faq");

  const faqs = [
    {
      q: "Doesn't RBI already provide zero liability for unauthorized transactions?",
      a: "RBI guidelines do establish zero customer liability, but ONLY under strict conditions: you must report within 3 days, provide proof of zero negligence, and banks frequently reject claims if they suspect OTP involvement. Bank internal investigations take 60–90+ days. CyberShield provides independent insurance indemnity plus hands-on dispute filing so you aren't fighting the bank alone.",
    },
    {
      q: "Why is the hero plan limit set at ₹1,00,000 instead of ₹10 Lakhs or ₹1 Crore?",
      a: "Data from the National Cyber Crime Reporting Portal (1930) indicates that over 94% of retail digital fraud in India involves amounts below ₹1 Lakh (average ticket size is ₹20,000 to ₹75,000). Setting ₹1 Lakh as the Hero Plan keeps the annual premium ultra-affordable (₹1,499/year or ~₹125/month) without charging you for enterprise riders you'll never use.",
    },
    {
      q: "Who is the risk carrier underwriter for CyberShield?",
      a: "Underwriting and claim settlements are backed by our IRDAI-regulated General Insurance partner. Grofi provides the technology front-end, digital onboarding, 24/7 Golden Hour emergency response, and claims assistance desk.",
    },
    {
      q: "What happens if I accidentally shared my OTP with a caller?",
      a: "Sharing OTPs or UPI PINs falls under gross customer negligence under standard policy terms. However, our Golden Hour response team will still help you immediately freeze your bank account, lodge a 1930 cybercell ticket, and attempt beneficiary account blocking to recover whatever funds are salvageable.",
    },
    {
      q: "How fast is the claim process?",
      a: "Immediate initial assistance is provided within 15 minutes of reporting on Grofi. Once you submit the bank dispute token, cybercell FIR acknowledgement, and account statement, the insurer surveyor audits the claim with an SLA of 7–14 business days.",
    },
    {
      q: "Can I protect multiple bank accounts and UPI IDs?",
      a: "Yes! CyberShield covers all personal savings bank accounts, debit/credit cards, and UPI IDs officially registered in your legal name.",
    },
  ];

  const objectionHandling = [
    {
      objection: "“My bank already protects my money.”",
      response:
        "“Banks only protect you if the flaw is 100% on their system. In phishing or spoofing, banks routinely deny liability claiming third-party app involvement. CyberShield covers the gap between bank rules and cybercrime reality.”",
    },
    {
      objection: "“I am educated, I never fall for scams or share OTPs.”",
      response:
        "“Modern attacks don't need your OTP. SIM swaps, malicious background QR codes, credential stuffing, and session hijacks on public networks drain funds invisibly. Protection is about systemic defense, not just vigilance.”",
    },
    {
      objection: "“₹1,499 per year seems expensive for insurance.”",
      response:
        "“That's less than ₹4 per day — the price of half a cup of tea. If even ₹30,000 is stolen from your account tomorrow, you'll spend more than ₹5,000 just running between police stations and bank branches. CyberShield covers both the money and the legwork.”",
    },
  ];

  const whatNotToSay = [
    { text: "Never promise an automatic 100% guaranteed payout without surveyor audit.", rule: "Always say: 'Subject to admissible loss & policy conditions.'" },
    { text: "Never state that Grofi is the risk underwriter.", rule: "Always disclose that an IRDAI-regulated general insurer underwrites the policy." },
    { text: "Never tell customers that investment schemes, betting, or crypto task scams are covered.", rule: "Voluntary transfers to high-yield scams are strictly excluded." },
    { text: "Never ask for customer passwords, PINs, or OTPs.", rule: "Zero-Trust absolute security rule." },
  ];

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            <span>Sections 9–13 • Sales Positioning &amp; Clarity</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Knowledge Base &amp; Sales Blueprint
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Everything consumers and distribution teams need to know to evaluate Grofi CyberShield.
          </p>

          {/* Toggle navigation */}
          <div className="mt-6 inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "faq"
                  ? "bg-white text-gray-900 shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Consumer FAQs
            </button>
            <button
              onClick={() => setActiveTab("objections")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "objections"
                  ? "bg-white text-gray-900 shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Objection Handling (Telecalling)
            </button>
            <button
              onClick={() => setActiveTab("pitch")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "pitch"
                  ? "bg-white text-gray-900 shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Compliance: What NOT to Say
            </button>
          </div>
        </div>

        {/* Content based on tab */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bricolage font-bold text-sm sm:text-base text-gray-900 hover:bg-gray-50/70 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-gold" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "objections" && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {objectionHandling.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-3xl p-6 border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-gold" />
                    Objection #{idx + 1}
                  </div>
                  <h4 className="font-bricolage font-bold text-gray-900 text-sm mb-3">
                    {item.objection}
                  </h4>
                  <div className="p-3 bg-white rounded-xl border border-gray-200/80 text-xs text-gray-700 leading-relaxed italic">
                    {item.response}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Validated Telecalling Rebuttal</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "pitch" && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-900">
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
              <span>
                <strong>Zero Tolerance Representation Mandate:</strong> Agents, call reps, and digital creatives must strictly adhere to these compliance boundaries to prevent mis-selling.
              </span>
            </div>

            <div className="space-y-3">
              {whatNotToSay.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-200 bg-white flex items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 font-medium pl-6">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{item.rule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
