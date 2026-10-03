"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Briefcase,
  CheckCircle2,
  FileCheck2,
  Lightbulb,
  Building,
  TrendingUp,
  Percent,
} from "lucide-react";

export default function BusinessLoanEligibilityGuide() {
  const [entityType, setEntityType] = useState<"proprietorship" | "partnership" | "pvtLtd">("proprietorship");

  const entityData = {
    proprietorship: {
      title: "Sole Proprietorship Enterprises",
      desc: "Traders, retailers, distributors, small manufacturers, and individual business proprietors.",
      turnover: "Minimum ₹20 Lakhs to ₹40 Lakhs annual GST turnover",
      vintage: "Minimum 2 to 3 years in business with active commercial banking track record",
      cibil: "Individual promoter CIBIL score of 675+ (720+ for lowest 8.85%–10% brackets)",
      age: "21 to 65 years at time of loan maturity",
      docs: [
        "PAN Card and Aadhaar Card of Sole Proprietor",
        "GST Registration Certificate & Udyam MSME Registration Certificate",
        "Shop & Establishment Certificate or Trade License",
        "Last 2 years Income Tax Returns (ITR-4 / ITR-3) with CA-certified computation",
        "Latest 12 months Current Account bank statements (via Account Aggregator)",
      ],
    },
    partnership: {
      title: "Partnership Firms & LLPs",
      desc: "Registered partnerships, trading firms, and Limited Liability Partnerships with multiple partners.",
      turnover: "Minimum ₹30 Lakhs to ₹50 Lakhs annual turnover",
      vintage: "Minimum 2 years of continuous business operations under registered deed",
      cibil: "Commercial CMR Rank (1 to 5) or Managing Partners' personal CIBIL of 700+",
      age: "21 to 65 years for managing partners",
      docs: [
        "PAN Card of the Partnership Firm / LLP",
        "PAN & Aadhaar Cards of all Partners / Designated Partners",
        "Certified Copy of Partnership Deed or LLP Agreement",
        "Certificate of Incorporation (for LLPs) from Ministry of Corporate Affairs (MCA)",
        "Last 2-3 years Audited Financials (Balance Sheet & Profit & Loss Statement)",
        "Latest 12 months Current Account bank statements",
      ],
    },
    pvtLtd: {
      title: "Private Limited & Public Limited Companies",
      desc: "Incorporated private limited companies, mid-market corporates, and growth-stage enterprises.",
      turnover: "Minimum ₹50 Lakhs to ₹1 Crore+ annual turnover",
      vintage: "Minimum 3 years incorporated with MCA filing track record",
      cibil: "Company Commercial Bureau (CMR 1-4) & Director CIBIL scores of 700+",
      age: "21 to 70 years for Promoter Directors",
      docs: [
        "PAN Card of the Private Limited Company",
        "Certificate of Incorporation, Memorandum (MOA) and Articles of Association (AOA)",
        "PAN & Aadhaar Cards with DIN of all Directors & major shareholders (>10% equity)",
        "Board Resolution authorizing directors to borrow loan funds",
        "Last 3 years Audited Financials with Auditor's Report and Tax Audit Report (3CD)",
        "Past 12 months GSTR-3B & GSTR-1 returns and 12 months Current Account statements",
      ],
    },
  };

  const current = entityData[entityType];

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <UserCheck className="w-3.5 h-3.5 text-gold" />
            Underwriting & Document Criteria
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Business Loan <span className="text-primary">Eligibility & Documents</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Check the exact turnover thresholds, operating age, and documentation checklists required for fast-track credit sanctions.
          </p>
        </div>

        {/* Entity Switcher Pills */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200 flex-wrap justify-center">
            <button
              onClick={() => setEntityType("proprietorship")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                entityType === "proprietorship"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Sole Proprietorship</span>
            </button>

            <button
              onClick={() => setEntityType("partnership")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                entityType === "partnership"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Partnership / LLP</span>
            </button>

            <button
              onClick={() => setEntityType("pvtLtd")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                entityType === "pvtLtd"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Pvt Ltd Company</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{current.desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Criteria Grid (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="font-bricolage font-bold text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-gold" />
                <span>Standard Underwriting Criteria</span>
              </h4>

              <div className="space-y-3">
                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Annual Turnover Requirement
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900 block mt-0.5">
                    {current.turnover}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Business Operating Vintage
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900 block mt-0.5">
                    {current.vintage}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Minimum Credit Score
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-emerald-800 block mt-0.5">
                    {current.cibil}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Promoter Age Eligibility
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900 block mt-0.5">
                    {current.age}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Required Documents Checklist (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="font-bricolage font-bold text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-gold" />
                <span>Mandatory Document Checklist</span>
              </h4>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                {current.docs.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>

              {/* Pro Tip Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <strong className="font-bold block mb-0.5">Grofi Underwriter Pro-Tip:</strong>
                  Ensure that total banking debits and credits in your primary Current Account consistently match your GSTR-3B turnover. Lenders penalize discrepancies between GST filings and bank credit inflows.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
