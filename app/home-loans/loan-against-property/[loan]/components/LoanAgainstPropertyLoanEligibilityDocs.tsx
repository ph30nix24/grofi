"use client";

import React, { useState } from "react";
import {
  FileCheck,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  Clock,
  Sparkles,
  CreditCard,
  Home,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";

interface LoanAgainstPropertyLoanEligibilityDocsProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanEligibilityDocs({
  lender,
}: LoanAgainstPropertyLoanEligibilityDocsProps) {
  const [docCategory, setDocCategory] = useState<"salaried" | "selfEmployed">("selfEmployed");

  const eligibilityCriteria = [
    {
      title: "Minimum CIBIL / Credit Score",
      value: `${lender.minCreditScore}+ Score`,
      description: "Clean repayment history with zero 90+ DPD write-offs in past 24 months.",
      icon: CreditCard,
    },
    {
      title: "Minimum Monthly / Annual Income",
      value: lender.minIncome,
      description: "Proven regular income through bank salary credits or audited business financials.",
      icon: Briefcase,
    },
    {
      title: "Eligible Age Bracket",
      value: "21 to 65 Years",
      description: "Applicant age at application min 21 years; max 65-70 years at loan maturity.",
      icon: Clock,
    },
    {
      title: "Property Ownership Norms",
      value: "Freehold / Registered",
      description: "Clear unencumbered property. All registered co-owners must join as co-applicants.",
      icon: Home,
    },
  ];

  const commonPropertyDocs = [
    "Original Registered Sale Deed / Gift Deed / Conveyance Deed",
    "Prior 30-Year Chain of Title Documents establishing clear ownership lineage",
    "Sanctioned Building Plan & Layout approval from local Municipal Body / Gram Panchayat",
    "Latest Paid Property Tax Receipts and Assessment Register Extract",
    "Non-Encumbrance Certificate (Form 15 & 16 / Nil Encumbrance Certificate)",
    "NOC from Registered Cooperative Housing Society or Resident Welfare Association (RWA)",
    "Mutation Extract / Patta / Khata Certificate in borrower's name",
  ];

  const salariedDocs = [
    "Last 6 months salary slips stamped by employer",
    "Form 16 (Part A & B) for the latest 2 assessment years",
    "Last 12 months salary credit bank account statements",
    "PAN Card & Aadhaar Card (mandatory KYC)",
    "Valid Passport size photographs of all applicants",
  ];

  const selfEmployedDocs = [
    "ITR with Computation of Income for past 3 assessment years",
    "Audited Balance Sheets and Profit & Loss Accounts with CA audit report & Tax Audit (3CA/3CB)",
    "Last 12 months primary operative bank account statements (Current and Savings)",
    "GST Registration Certificate & 12 months filed GSTR-3B summaries",
    "Business Vintage Proof (Shop & Establishment license, Incorporation certificate, or MSME Udyam)",
    "PAN Card & Aadhaar Card of promoters / partners / proprietors",
  ];

  return (
    <section
      id="eligibility-docs"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <FileCheck className="w-3.5 h-3.5 text-gold" />
          <span>UNDERWRITING REQUIREMENTS</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Eligibility Criteria &amp; Documents for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Verify borrower eligibility parameters and the mandatory list of KYC, income, and 30-year property title records.
        </p>
      </div>

      {/* ── 4 Core Eligibility Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {eligibilityCriteria.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-gray-200 shadow-2xs space-y-2.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {item.title}
              </div>
              <div className="font-bricolage font-extrabold text-base text-gray-900 leading-snug">
                {item.value}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* ── Document Checklist Grid (Property Docs + Applicant Docs) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Property Title Deeds (Mandatory for All) (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                Core Collateral Dossier
              </span>
              <h3 className="font-bricolage font-bold text-lg text-gray-900 mt-2">
                Mandatory Property Title Documents
              </h3>
            </div>
            <Home className="w-6 h-6 text-primary shrink-0" />
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Required by bank-empaneled legal advocates to ensure clear, marketable, and non-encumbered freehold title.
          </p>

          <ul className="space-y-3">
            {commonPropertyDocs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{doc}</span>
              </li>
            ))}
          </ul>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Doorstep Legal Assistance:</strong> Grofi provides doorstep collection and pre-vetting of property deeds to avoid rejection delays at the bank desk.
            </span>
          </div>
        </div>

        {/* Right Column: Applicant Income & Financial Records (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          {/* Category Toggle */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Applicant Financials
              </span>
              <h3 className="font-bricolage font-bold text-lg text-gray-900 mt-2">
                Income &amp; KYC Verification Dossier
              </h3>
            </div>

            <div className="flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDocCategory("selfEmployed")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  docCategory === "selfEmployed"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Self-Employed
              </button>
              <button
                type="button"
                onClick={() => setDocCategory("salaried")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  docCategory === "salaried"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Salaried
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            {docCategory === "selfEmployed"
              ? "Financial statements and tax computations required for business proprietors, partners, and directors."
              : "Salary slips, Form 16s, and banking proof required for corporate and government employees."}
          </p>

          <ul className="space-y-3">
            {(docCategory === "selfEmployed" ? selfEmployedDocs : salariedDocs).map(
              (doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-snug">{doc}</span>
                </li>
              )
            )}
          </ul>

          <div className="p-3.5 bg-[#EBF4ED] border border-primary/20 rounded-2xl text-[11px] text-primary flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              <strong>Co-Applicant Income Boost:</strong> Adding a earning spouse, parent, or business partner as co-applicant can increase your maximum sanctioned mortgage eligibility by up to 40%.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
