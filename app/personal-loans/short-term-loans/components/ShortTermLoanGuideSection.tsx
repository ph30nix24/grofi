"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  TrendingDown,
  CheckCircle2,
  XCircle,
  FileCheck2,
  AlertTriangle,
  Lightbulb,
  CreditCard,
  Building,
  Calendar,
  Layers,
} from "lucide-react";

export default function ShortTermLoanGuideSection() {
  const [activeTab, setActiveTab] = useState<"math" | "rbi">("math");

  return (
    <section id="short-term-guide-section" className="py-14 sm:py-20 bg-white border-t border-gray-200/60 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Lightbulb className="w-3.5 h-3.5 text-gold" />
            Financial Guide & Borrower Protection
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Short-Term Borrowing Guide: <span className="text-primary">Cost Math & RBI Safeguards</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Understand how short tenures save you thousands in total interest, and verify RBI digital lending protections before signing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setActiveTab("math")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "math"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>Cost Math: Short Loan vs Long Loan vs Credit Card</span>
            </button>

            <button
              onClick={() => setActiveTab("rbi")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "rbi"
                  ? "bg-primary text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>RBI Safeguards: Mandatory KFS & Cooling-Off Period</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Cost Math Comparison */}
        {activeTab === "math" && (
          <div className="space-y-8 animate-fadeIn">
            {/* 3-Column Comparative Cost Scenario for ₹1,00,000 Borrowing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Short-Term Loan (Winner) */}
              <div className="bg-[#EBF4ED]/60 rounded-3xl p-6 border-2 border-primary/30 shadow-md relative flex flex-col justify-between">
                <div className="absolute -top-3 right-5 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Lowest Total Interest
                </div>

                <div>
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span className="font-bricolage font-bold text-lg">
                      Short-Term Loan (6 Months)
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-4">
                    Borrow ₹1 Lakh for 6 months at 16.0% p.a. and repay quickly without long-term commitment.
                  </p>

                  <div className="space-y-2.5 text-xs bg-white/90 p-4 rounded-2xl border border-emerald-200/80 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly EMI:</span>
                      <span className="font-bold text-gray-900">₹17,454/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tenure:</span>
                      <span className="font-bold text-gray-900">6 Months</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-gray-100">
                      <span className="text-emerald-900 font-bold">Total Interest Paid:</span>
                      <span className="font-bricolage font-extrabold text-base text-emerald-700">₹4,728</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Outgo:</span>
                      <span className="font-bold text-gray-900">₹1,04,728</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-800 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Saves ₹18,000+ compared to 3-year multi-year loans!</span>
                </div>
              </div>

              {/* Option 2: Standard 3-Year Personal Loan */}
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gray-900 mb-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="font-bricolage font-bold text-lg">
                      Long-Term Loan (36 Months)
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-4">
                    Borrow ₹1 Lakh for 3 years at 13.5% p.a. Lower monthly EMI, but massive interest compounding.
                  </p>

                  <div className="space-y-2.5 text-xs bg-white p-4 rounded-2xl border border-gray-200 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly EMI:</span>
                      <span className="font-bold text-gray-900">₹3,394/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tenure:</span>
                      <span className="font-bold text-gray-900">36 Months</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-gray-100">
                      <span className="text-gray-700 font-bold">Total Interest Paid:</span>
                      <span className="font-bricolage font-extrabold text-base text-amber-700">₹22,184</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Outgo:</span>
                      <span className="font-bold text-gray-900">₹1,22,184</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-amber-800 flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>You pay 4.7x more in total interest charges over 3 years.</span>
                </div>
              </div>

              {/* Option 3: Credit Card Revolving Minimum Due */}
              <div className="bg-red-50/40 rounded-3xl p-6 border border-red-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-950 mb-3">
                    <CreditCard className="w-5 h-5 text-red-600" />
                    <span className="font-bricolage font-bold text-lg">
                      Credit Card Min Due Trap
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-4">
                    Revolving ₹1 Lakh balance paying minimum due (3.5%/month = 42% APR) creates an endless debt trap.
                  </p>

                  <div className="space-y-2.5 text-xs bg-white p-4 rounded-2xl border border-red-200 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Finance:</span>
                      <span className="font-bold text-red-700">3.5% / month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Annual APR:</span>
                      <span className="font-bold text-red-700">42.0% p.a. + GST</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-gray-100">
                      <span className="text-red-900 font-bold">Total Interest Paid:</span>
                      <span className="font-bricolage font-extrabold text-base text-red-700">₹45,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Debt Spiral Risk:</span>
                      <span className="font-bold text-red-700">Extreme</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-red-800 flex items-center gap-1.5 font-semibold">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Never revolve credit card balances; take a short loan instead.</span>
                </div>
              </div>
            </div>

            {/* When to Choose Short-Term Loans Matrix */}
            <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-gray-200">
              <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-4">
                When is a Short-Term Personal Loan the Smartest Choice?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold mb-1">
                      Bridge Financing / Delay in Invoices or Bonus
                    </strong>
                    <span>When you know a salary bonus, client payment, or harvest income is arriving in 3 to 6 months, a short-term loan bridges the cash gap without burdening you with a 5-year liability.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold mb-1">
                      Sudden Medical or Outpatient Emergency
                    </strong>
                    <span>Small medical bills between ₹20,000 and ₹1,50,000 not fully covered by health insurance can be disbursed within 10 minutes and settled in 3 to 6 months.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold mb-1">
                      Building or Rebuilding CIBIL Score
                    </strong>
                    <span>Taking a small ₹10,000 to ₹25,000 micro loan for 6 months and making 6 consecutive on-time EMI repayments is the fastest way to raise your CIBIL score from 600 to 750+.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold mb-1">
                      Clear Exit & Zero Foreclosure Charges
                    </strong>
                    <span>Most RBI-regulated short-term lenders (Navi, KreditBee, banks) do not penalize you for foreclosing early once your liquidity returns.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: RBI Safeguards */}
        {activeTab === "rbi" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch animate-fadeIn">
            {/* Green Box: Mandatory RBI Requirements */}
            <div className="bg-[#EBF4ED]/60 rounded-3xl p-6 sm:p-8 border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-950 font-bricolage font-bold text-lg mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Mandatory RBI Protections on Grofi</span>
                </div>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  Every lending partner displayed on Grofi is an RBI-registered NBFC or Scheduled Commercial Bank strictly adhering to the 2026 RBI Digital Lending Guidelines.
                </p>

                <div className="space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-emerald-100">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Key Fact Statement (KFS)</strong>
                      <span>Lenders must provide a standardized KFS prior to agreement signing clearly detailing Annual Percentage Rate (APR), processing fee, net disbursement amount, and monthly amortization.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Cooling-Off / Look-Up Period (1 to 3 Days)</strong>
                      <span>Borrowers have a legal right to exit the loan during the cooling-off window by paying the principal and proportionate APR with ZERO foreclosure penalty.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">No Access to Contacts or Device Storage</strong>
                      <span>Strictly forbidden by RBI: Regulated apps are prohibited from accessing smartphone contact lists, galleries, or location trackers for debt recovery.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Box: Warning Signs of Illegal Apps */}
            <div className="bg-red-50/40 rounded-3xl p-6 sm:p-8 border border-red-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-950 font-bricolage font-bold text-lg mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                  <span>Red Flags: Beware of Illegal 7-Day Loan Apps</span>
                </div>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  Never download unverified APKs or lend from apps not registered with the RBI. Here is how to identify predatory apps:
                </p>

                <div className="space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Ultra-Short 7-Day or 15-Day Tenures</strong>
                      <span>Predatory apps promise quick money but demand repayment in 7 days with 50% upfront deduction. Legitimate RBI loans offer minimum 60 to 90-day tenures.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">No Regulated NBFC Partner Disclosed</strong>
                      <span>If an app cannot name its registered NBFC or provide its RBI Registration Certificate Number (CoR), do not enter your PAN or Aadhaar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-red-100">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 font-bold block">Demanding Contact Book Permissions</strong>
                      <span>Any app requesting permission to access your phone contacts before sanction is violating RBI directives and should be reported to the cyber crime portal.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
