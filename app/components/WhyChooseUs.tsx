"use client";

import React from "react";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Headphones,
  Sparkles,
  ArrowRight,
  Landmark,
  FileCheck2,
  TrendingDown,
  Award,
  Users2,
  Layers,
} from "lucide-react";

interface BenefitCard {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  badge?: string;
}

const benefits: BenefitCard[] = [
  {
    id: "multi-bank-choice",
    icon: <Landmark className="w-6 h-6" />,
    iconBg: "bg-[#EBF4ED]",
    iconColor: "text-primary",
    badge: "50+ Lenders",
    title: "50+ Top Bank & NBFC Partners",
    description:
      "Access exclusive loan and credit card offers from India's premier banks including HDFC, SBI, ICICI, Axis, Kotak, and IndusInd all under one roof.",
  },
  {
    id: "paperless-speed",
    icon: <Zap className="w-6 h-6" />,
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-700",
    badge: "Under 3 Mins",
    title: "100% Digital & Instant Disbursal",
    description:
      "Say goodbye to branch queues and endless paperwork. Enjoy instant e-KYC, paperless documentation, and direct bank account disbursal within 24 hours.",
  },
  {
    id: "zero-hidden-charges",
    icon: <TrendingDown className="w-6 h-6" />,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-700",
    badge: "100% Transparent",
    title: "Zero Hidden Charges & Best Rates",
    description:
      "Complete transparency with clear interest rate comparisons, zero upfront consultation fees, and no surprise processing charges.",
  },
  {
    id: "bank-grade-security",
    icon: <Lock className="w-6 h-6" />,
    iconBg: "bg-blue-100/80",
    iconColor: "text-blue-700",
    badge: "256-Bit SSL",
    title: "Bank-Grade 256-Bit Data Security",
    description:
      "Your privacy is our utmost priority. We use military-grade encryption and ISO-compliant protocols to ensure your sensitive financial data remains 100% confidential.",
  },
  {
    id: "smart-matching",
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: "bg-purple-100/80",
    iconColor: "text-purple-700",
    badge: "AI Powered",
    title: "Personalized Financial Matching",
    description:
      "Our intelligent recommendation engine analyzes your credit profile to match you with products that have the highest pre-approval probability.",
  },
  {
    id: "dedicated-support",
    icon: <Headphones className="w-6 h-6" />,
    iconBg: "bg-rose-100/80",
    iconColor: "text-rose-700",
    badge: "24/7 Assistance",
    title: "Dedicated Relationship Experts",
    description:
      "Get end-to-end guidance from licensed financial advisors to help you choose the right product, track approvals, and answer every question.",
  },
];

const stats = [
  { value: "2L+", label: "Happy Customers", icon: <Users2 className="w-5 h-5 text-gold" /> },
  { value: "₹5,000+ Cr", label: "Loans Facilitated", icon: <Award className="w-5 h-5 text-gold" /> },
  { value: "50+", label: "Bank & NBFC Partners", icon: <Layers className="w-5 h-5 text-gold" /> },
  { value: "99.2%", label: "Approval Satisfaction", icon: <ShieldCheck className="w-5 h-5 text-gold" /> },
];

const comparisonPoints = [
  { feature: "Application Process", traditional: "Multiple bank visits & physical files", grofi: "100% Paperless online in 3 mins" },
  { feature: "Offer Comparison", traditional: "Locked to a single bank's rates", grofi: "Compare 50+ lenders simultaneously" },
  { feature: "Disbursal Speed", traditional: "Takes 5 to 15 business days", grofi: "Instant to within 24 hours" },
  { feature: "Credit Score Impact", traditional: "Hard inquiries by multiple lenders", grofi: "Soft check with zero credit score impact" },
  { feature: "Hidden Charges", traditional: "Surprise fine-print fees", grofi: "100% Transparent, zero advisory fees" },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-22 px-6 relative bg-gradient-to-b from-[#F3F0DF]/30 via-white to-[#F3F0DF]/40 overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-[#B6CC9A]/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            The Grofi Advantage
          </div>

          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Why Millions Trust{" "}
            <span className="text-gold relative inline-block">
              Grofi
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/20 rounded-full" />
            </span>{" "}
            for Financial Growth
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            We simplify finance with unbiased comparisons, transparent interest rates, and seamless paperless approvals from India&apos;s leading financial institutions.
          </p>
        </div>

        {/* ── 6 Core Benefits Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-2xl hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Subtle card corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] rounded-bl-full pointer-events-none transition-colors group-hover:bg-primary/[0.05]" />

              <div>
                {/* Top bar with icon & badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${b.iconBg} ${b.iconColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                  >
                    {b.icon}
                  </div>
                  {b.badge && (
                    <span className="text-[11px] font-bold tracking-wider text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15">
                      {b.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                  {b.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 font-montserrat leading-relaxed">
                  {b.description}
                </p>
              </div>

              {/* Bottom check pill */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified by Grofi Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Stats Strip ──────────────────────────────────────────────── */}
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  {s.icon}
                </div>
                <p className="font-bricolage font-bold text-3xl sm:text-4xl text-white tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-white/70 font-medium font-montserrat mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Comparison: Traditional Banks vs Grofi ───────────────────── */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-bricolage font-bold text-2xl sm:text-3xl text-primary">
              How Grofi Compares
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-1">
              See why borrowing and saving through Grofi is simpler, faster, and smarter.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-montserrat">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-4 font-bold">Feature</th>
                  <th className="pb-4 font-bold text-gray-500">Traditional Banks</th>
                  <th className="pb-4 font-bold text-primary bg-[#EBF4ED]/50 px-4 rounded-t-xl">
                    With Grofi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {comparisonPoints.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-gray-800">{row.feature}</td>
                    <td className="py-4 text-gray-500 flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span> {row.traditional}
                    </td>
                    <td className="py-4 font-semibold text-primary bg-[#EBF4ED]/30 px-4">
                      <span className="inline-flex items-center gap-2 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        {row.grofi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Bottom Call To Action ────────────────────────────────────── */}
        <div className="text-center bg-gradient-to-r from-[#F3F0DF] via-[#ECE9CF] to-[#DDE3C1] rounded-3xl p-8 sm:p-12 border border-[#a5c490]/40 shadow-md">
          <h3 className="font-bricolage font-bold text-2xl sm:text-3xl xl:text-4xl text-primary">
            Ready to Find Your Ideal Financial Product?
          </h3>
          <p className="text-xs sm:text-sm text-black/60 font-montserrat mt-2 max-w-xl mx-auto">
            Join over 200,000+ satisfied borrowers and credit card holders across India. Check your pre-approved offers in seconds.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <a
              href="#products"
              className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-8 py-3.5 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#emi-calculator"
              className="border-2 border-primary text-primary hover:bg-primary/10 text-sm font-bold px-8 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              Calculate Loan EMI
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
