"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  FileText,
  HelpCircle,
  Building,
  UserCheck,
} from "lucide-react";

export default function InstantLoanSafetyGuide() {
  const [activeTab, setActiveTab] = useState<"safety" | "criteria">("safety");

  return (
    <section id="safety-guide-section" className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            Borrower Protection & Trust Guide
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Safe Instant Borrowing: <span className="text-primary">RBI Compliance & Criteria</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Learn how to differentiate legitimate RBI-regulated lending apps from illegal predators, and review eligibility requirements.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setActiveTab("safety")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "safety"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>RBI Guidelines: Safe vs Fraud Apps</span>
            </button>

            <button
              onClick={() => setActiveTab("criteria")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "criteria"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Salaried vs Self-Employed Criteria</span>
            </button>
          </div>
        </div>

        {/* Tab 1: RBI Safety Checklist */}
        {activeTab === "safety" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Green Box: Safe Grofi Partners */}
            <div className="bg-[#EBF4ED]/50 rounded-3xl p-6 sm:p-8 border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 font-bricolage font-bold text-lg mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Green Flags: RBI-Regulated Lenders on Grofi</span>
                </div>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  Every lending partner displayed on Grofi is strictly licensed as a Scheduled Commercial Bank or RBI-registered Non-Banking Financial Company (NBFC).
                </p>

                <div className="space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Key Fact Statement (KFS) Provided</strong>
                      <span>All interest rates, processing fees, and full Annual Percentage Rate (APR) disclosed upfront before signing.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">No Access to Contacts or Photo Gallery</strong>
                      <span>Compliant with RBI digital lending directives prohibiting intrusive smartphone device permissions.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Cooling-Off / Look-Up Period</strong>
                      <span>Borrowers have an explicit cooling-off window (typically 3 to 7 days) to exit the loan without penalty.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Zero Upfront Cash or Advance Fee</strong>
                      <span>Processing fees are solely deducted from the disbursed sanction, never asked beforehand via UPI transfer.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Box: Fraud Loan Apps Warning */}
            <div className="bg-red-50/40 rounded-3xl p-6 sm:p-8 border border-red-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-800 font-bricolage font-bold text-lg mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                  <span>Red Flags: Unregulated & Illegal Loan Apps</span>
                </div>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  Never download APK files from unknown links or social media advertisements. Illegal predatory apps employ deceptive tactics.
                </p>

                <div className="space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Demands Access to Phone Contacts & Photos</strong>
                      <span>Illegal apps use contact lists for coercive harassment and extortion. Legitimate lenders never ask for contacts.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">7-Day Tenure Trap with 50% Deductions</strong>
                      <span>Unregistered apps promise 90 days but disburse ₹3,000 for a ₹5,000 loan and demand repayment within 6 days.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Requests Advance Fees or Insurance Deposit</strong>
                      <span>Never pay money to unlock a loan. No genuine financial institution collects 'file charges' via personal UPI IDs.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">No Regulated NBFC Partner Listed</strong>
                      <span>If the app cannot show an RBI NBFC registration number on the RBI website, do not register your details.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Salaried vs Self-Employed Criteria */}
        {activeTab === "criteria" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Salaried */}
            <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-gray-200">
              <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Salaried Professionals (Speed: 10s - 15 Mins)
              </h3>
              <p className="text-xs text-gray-600 mb-5">
                Eligible for the fastest disbursal times, highest sanctions (up to ₹50 Lakhs), and lowest interest brackets.
              </p>

              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Minimum Monthly Salary:</span>
                  <span className="font-bold text-gray-900">₹15,000 - ₹25,000 / month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Preferred CIBIL Score:</span>
                  <span className="font-bold text-emerald-700">700+ (600+ on Fintech apps)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Salary Crediting Mode:</span>
                  <span className="font-bold text-gray-900">Direct Bank Transfer (NEFT/IMPS)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 font-medium">Paperless Documents:</span>
                  <span className="font-bold text-primary">Aadhaar OTP + Account Aggregator</span>
                </div>
              </div>
            </div>

            {/* Self-Employed / Gig Workers */}
            <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-gray-200">
              <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Self-Employed & Freelancers (Speed: 15 Mins - 2 Hrs)
              </h3>
              <p className="text-xs text-gray-600 mb-5">
                Underwritten via digital banking statements, UPI transaction volumes, and ITR verification.
              </p>

              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Minimum Annual Turnover/Income:</span>
                  <span className="font-bold text-gray-900">₹2.5 Lakhs per year</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Preferred CIBIL Score:</span>
                  <span className="font-bold text-emerald-700">650+ (Navi & KreditBee friendly)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Business Vintage:</span>
                  <span className="font-bold text-gray-900">Minimum 6 to 12 months</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 font-medium">Paperless Documents:</span>
                  <span className="font-bold text-primary">PAN, Aadhaar e-KYC, 6M Bank Statement</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
