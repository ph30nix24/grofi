"use client";

import React from "react";
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Building2,
  Info,
  ArrowRight,
} from "lucide-react";

export default function CompetitorBenchmark() {
  const benchmarkRows = [
    {
      feature: "₹1 Lakh Cover Proposition",
      traditional: "Buried inside complex ₹1 Lakh to ₹1 Crore enterprise matrices with dozens of sliders.",
      grofiPosition: "Make ₹1 Lakh the simple, transparent Hero Plan that everyday consumers instantly understand.",
      advantage: "Clarity over complexity",
    },
    {
      feature: "Breadth of Coverage",
      traditional: "Broad, overwhelming menu of 15+ optional add-ons, malware clauses, and corporate riders.",
      grofiPosition: "Focused directly on where Indians lose money: UPI, NetBanking, Card Cloning & Phishing.",
      advantage: "Tailored for digital banking",
    },
    {
      feature: "Price & Value Proposition",
      traditional: "Advertises low teaser rates (e.g. ₹50k from ₹365/yr excl. taxes) with high deductibles & add-on costs.",
      grofiPosition: "Do not compete solely on price — bundle dedicated 24/7 Golden Hour emergency claims assistance.",
      advantage: "Human assistance included",
    },
    {
      feature: "Deductibles & Sub-limits",
      traditional: "Vague marketing claims; rigid policy wordings often impose fine-print deductibles during claims.",
      grofiPosition: "Strict upfront disclosure before checkout. Zero hidden traps or uncommunicated deductible clauses.",
      advantage: "100% transparent terms",
    },
    {
      feature: "Claims & First-Response",
      traditional: "Standard insurer email ticketing queue; customer left alone to coordinate with police and bank.",
      grofiPosition: "One-Tap Report Fraud journey with direct 1930 Cybercell and Bank dispute dossier generation.",
      advantage: "Guided first response",
    },
  ];

  return (
    <section id="benchmark-section" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <Scale className="w-3.5 h-3.5 text-gold" />
            <span>Sections 5 &amp; 6 • Competitive Benchmark</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Market Benchmark &amp; Strategic Positioning
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Evaluating traditional offerings (Bajaj Allianz General &amp; ICICI Lombard) to deliver a radically superior, simpler customer experience.
          </p>
        </div>

        {/* Mandatory Representation Rule Callout Box */}
        <div className="mb-10 p-5 rounded-2xl bg-amber-50/90 border border-amber-300 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bricolage font-bold text-amber-950 text-sm sm:text-base">
                Compliance Mandate &amp; Representation Rule (Verbatim Blueprint Guideline)
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-amber-900 leading-relaxed">
                Do <strong>NOT</strong> say <em>&ldquo;same as ICICI Lombard or Bajaj Allianz&rdquo;</em> unless a documented, insurer-approved comparison exists.
              </p>
              <div className="mt-3 p-3 bg-white/80 rounded-xl border border-amber-200 text-xs font-medium text-gray-800 italic">
                &ldquo;Our proposed plan addresses the same broad consumer need — protection against defined cyber risks — with a simple ₹1 lakh proposition and guided support.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-xs">
                  <th className="py-4 px-5 font-bold text-gray-700 w-1/4">Key Dimension</th>
                  <th className="py-4 px-5 font-bold text-gray-500 w-1/3">Traditional Market Position (Bajaj / ICICI)</th>
                  <th className="py-4 px-5 font-bold text-primary bg-[#EBF4ED]/50 w-5/12">
                    <span className="flex items-center gap-1.5 font-bricolage font-extrabold text-sm text-primary">
                      <ShieldCheck className="w-4 h-4 text-gold" />
                      Grofi CyberShield Positioning
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {benchmarkRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-gray-900 align-top">
                      {row.feature}
                      <span className="block mt-1 text-[11px] font-normal text-emerald-700 font-mono">
                        {row.advantage}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-600 align-top leading-relaxed text-xs">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-5 text-gray-900 bg-[#EBF4ED]/30 align-top leading-relaxed font-medium text-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.grofiPosition}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Takeaway Badges */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
            <div className="font-bricolage font-bold text-sm text-gray-900 mb-1">
              1. Hero Clarity Wins
            </div>
            <p className="text-gray-600 leading-relaxed">
              Instead of 10 complex sum-insured brackets, ₹1 Lakh covers 94% of typical retail UPI/NetBanking fraud incidents in India.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
            <div className="font-bricolage font-bold text-sm text-gray-900 mb-1">
              2. Service Over Raw Price
            </div>
            <p className="text-gray-600 leading-relaxed">
              A cheaper ₹365 policy that leaves you stranded with a PDF is useless when your account is wiped at 2 AM. Grofi provides live guidance.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
            <div className="font-bricolage font-bold text-sm text-gray-900 mb-1">
              3. Regulated Underwriter
            </div>
            <p className="text-gray-600 leading-relaxed">
              Full peace of mind: Grofi is the technology and customer service front-end, with balance sheet claims backed by an IRDAI general insurer.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
