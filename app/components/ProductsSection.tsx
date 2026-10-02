"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Sparkles,
  Search,
  X,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  Coins,
  Layers,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";

interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  illustration: string;
  badge: string;
  badgeTone: "amber" | "emerald" | "purple" | "teal" | "gold";
  metrics: {
    rate: string;
    rateLabel: string;
    amount: string;
    amountLabel: string;
    speed: string;
  };
  visualTags: string[];
  partnerLogos: { name: string; logo: string }[];
  partnerCount: string;
  eligibility: {
    minAge: string;
    minIncome: string;
    minCibil: string;
    employmentType: string;
  };
  requiredDocs: string[];
  featuresList: string[];
}

const products: Product[] = [
  {
    id: "personal-loans",
    slug: "/personal-loans",
    title: "Personal Loan",
    tagline: "Instant Cash for Any Need",
    category: "personal",
    illustration: "/products/personal-loan.webp",
    badge: "⚡ 24h Disbursal",
    badgeTone: "amber",
    metrics: {
      rate: "10.49%",
      rateLabel: "Interest From",
      amount: "Up to ₹50 Lakhs",
      amountLabel: "Max Amount",
      speed: "24h Payout",
    },
    visualTags: ["🛡️ Zero Collateral", "⚡ 100% Paperless", "📅 1–5 Yrs Tenure"],
    partnerLogos: [
      { name: "HDFC Bank", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "SBI", logo: "/partners-logos/sbi-logo.webp" },
      { name: "ICICI Bank", logo: "/partners-logos/icici-logo.webp" },
      { name: "Axis Bank", logo: "/partners-logos/axis-logo.webp" },
      { name: "IDFC First", logo: "/partners-logos/idfc-logo.webp" },
    ],
    partnerCount: "50+ Lenders",
    eligibility: {
      minAge: "21 – 58 Years",
      minIncome: "₹25,000 / month",
      minCibil: "650+ Score",
      employmentType: "Salaried & Self-Employed",
    },
    requiredDocs: ["PAN & Aadhaar Card", "3 Months Salary Slips / ITR", "6 Months Bank Statement"],
    featuresList: [
      "Direct disbursement within 24 hours of digital approval",
      "Zero collateral or guarantor needed",
      "No restrictions on end-use of funds",
    ],
  },
  {
    id: "credit-cards",
    slug: "/credit-cards",
    title: "Credit Cards",
    tagline: "Cashback, Lounges & Perks",
    category: "cards-insurance",
    illustration: "/products/credit-cards.webp",
    badge: "🎁 Lifetime Free Options",
    badgeTone: "purple",
    metrics: {
      rate: "Up to 33%",
      rateLabel: "Rewards & Cashback",
      amount: "Up to ₹15 Lakhs",
      amountLabel: "Credit Limit",
      speed: "Instant Approval",
    },
    visualTags: ["✈️ Airport Lounges", "🛍️ 5% Direct Cashback", "🎁 ₹0 Annual Fee"],
    partnerLogos: [
      { name: "HDFC Bank", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "Axis Bank", logo: "/partners-logos/axis-logo.webp" },
      { name: "SBI Card", logo: "/partners-logos/sbi-logo.webp" },
      { name: "ICICI Bank", logo: "/partners-logos/icici-logo.webp" },
      { name: "AU Bank", logo: "/partners-logos/au-logo.webp" },
    ],
    partnerCount: "35+ Banks",
    eligibility: {
      minAge: "21 – 65 Years",
      minIncome: "₹20,000 / month",
      minCibil: "700+ Score",
      employmentType: "Salaried & Self-Employed",
    },
    requiredDocs: ["PAN & Aadhaar Card", "Latest Salary Slip / Form 16", "3 Months Bank Statement"],
    featuresList: [
      "Complimentary domestic & global airport lounge visits",
      "Up to 50 days interest-free credit period",
      "Instant digital virtual card for immediate purchases",
    ],
  },
  {
    id: "business-loans",
    slug: "/business-loans",
    title: "Business Loan",
    tagline: "Fuel Growth & Working Capital",
    category: "business",
    illustration: "/products/business-loan.webp",
    badge: "📈 Up to ₹2 Cr Unsecured",
    badgeTone: "emerald",
    metrics: {
      rate: "From 11.25%",
      rateLabel: "Interest From",
      amount: "Up to ₹2 Crores",
      amountLabel: "Max Sanction",
      speed: "48h Approval",
    },
    visualTags: ["🚀 No Collateral to ₹75L", "🔄 Overdraft Facility", "📉 Tax Deductible"],
    partnerLogos: [
      { name: "Axis Bank", logo: "/partners-logos/axis-logo.webp" },
      { name: "HDFC Bank", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "Kotak Bank", logo: "/partners-logos/kotak-logo.webp" },
      { name: "Bajaj Finserv", logo: "/partners-logos/bajaj-logo.webp" },
      { name: "IDFC First", logo: "/partners-logos/idfc-logo.webp" },
    ],
    partnerCount: "40+ Lenders",
    eligibility: {
      minAge: "24 – 65 Years",
      minIncome: "₹40L Annual Turnover",
      minCibil: "680+ Score",
      employmentType: "Business Vintage 2+ Years",
    },
    requiredDocs: ["GST Certificate & Business PAN", "2 Years Audited ITR & P&L", "12 Months Current Bank Account"],
    featuresList: [
      "Collateral-free funding up to ₹75 Lakhs",
      "Flexible revolving credit lines tailored for seasonal cashflows",
      "Dedicated SME relationship manager with doorstep service",
    ],
  },
  {
    id: "home-loans",
    slug: "/home-loans",
    title: "Home Loan",
    tagline: "Lowest EMIs for Dream Homes",
    category: "home",
    illustration: "/products/home-loan.webp",
    badge: "🏡 Rates from 8.40%",
    badgeTone: "teal",
    metrics: {
      rate: "From 8.40%",
      rateLabel: "Lowest Interest",
      amount: "Up to ₹5 Crores",
      amountLabel: "Max Sanction",
      speed: "Up to 30 Yrs",
    },
    visualTags: ["🏡 85% Sanction Value", "💰 Sec 80C Tax Relief", "👩 Concessions for Women"],
    partnerLogos: [
      { name: "SBI", logo: "/partners-logos/sbi-logo.webp" },
      { name: "HDFC Bank", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "LIC Housing", logo: "/partners-logos/lic-logo.webp" },
      { name: "ICICI Bank", logo: "/partners-logos/icici-logo.webp" },
      { name: "Bank of Baroda", logo: "/partners-logos/bob-logo.webp" },
    ],
    partnerCount: "30+ Lenders",
    eligibility: {
      minAge: "21 – 65 Years",
      minIncome: "₹30,000 / month",
      minCibil: "720+ Score",
      employmentType: "Salaried & Self-Employed",
    },
    requiredDocs: ["PAN & Aadhaar Card", "Property Title Deeds & Layout", "6 Months Bank Statement & Salary / ITR"],
    featuresList: [
      "Lowest monthly EMI with long tenure up to 30 years",
      "Tax deduction benefits up to ₹3.5 Lakhs under Sec 80C & 24b",
      "Pre-approved projects from top trusted builders",
    ],
  },
  {
    id: "instant-loans",
    slug: "/personal-loans/instant-loans",
    title: "Instant Micro Loan",
    tagline: "5-Minute Emergency Cash",
    category: "personal",
    illustration: "/products/instant-loan.jpg",
    badge: "⏱️ 5-Min Paperless Transfer",
    badgeTone: "gold",
    metrics: {
      rate: "1.25% / mo",
      rateLabel: "Monthly Rate",
      amount: "₹10k – ₹2 Lakhs",
      amountLabel: "Quick Amount",
      speed: "5-Min Payout",
    },
    visualTags: ["⏱️ Direct Bank Transfer", "📱 100% Smartphone", "💳 3–12m Easy EMIs"],
    partnerLogos: [
      { name: "Bajaj Finserv", logo: "/partners-logos/bajaj-logo.webp" },
      { name: "IDFC First", logo: "/partners-logos/idfc-logo.webp" },
      { name: "Axis Bank", logo: "/partners-logos/axis-logo.webp" },
      { name: "Yes Bank", logo: "/partners-logos/yes-bank-logo.webp" },
    ],
    partnerCount: "20+ NBFCs",
    eligibility: {
      minAge: "21 – 50 Years",
      minIncome: "₹15,000 / month",
      minCibil: "600+ Score",
      employmentType: "Salaried Individuals",
    },
    requiredDocs: ["Aadhaar Card (OTP)", "PAN Card", "3 Months Net Banking Statement"],
    featuresList: [
      "Instant account credit in 5 minutes flat",
      "Zero branch visits or physical document submission",
      "Auto-debit setup with convenient monthly repayment",
    ],
  },
  {
    id: "loan-against-property",
    slug: "/home-loans",
    title: "Loan Against Property",
    tagline: "High-Value Mortgage Funding",
    category: "home",
    illustration: "/products/loan-against-property.jpg",
    badge: "🏢 Up to ₹15 Cr High Value",
    badgeTone: "teal",
    metrics: {
      rate: "From 8.95%",
      rateLabel: "Low Mortgage Rate",
      amount: "Up to ₹15 Crores",
      amountLabel: "High Sanction",
      speed: "Up to 20 Yrs",
    },
    visualTags: ["🏢 Residential & Commercial", "📉 Lowest EMIs", "🔑 Retain Full Use"],
    partnerLogos: [
      { name: "SBI", logo: "/partners-logos/sbi-logo.webp" },
      { name: "HDFC Bank", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "ICICI Bank", logo: "/partners-logos/icici-logo.webp" },
      { name: "Tata Capital", logo: "/partners-logos/tata-logo.webp" },
    ],
    partnerCount: "25+ Banks",
    eligibility: {
      minAge: "25 – 68 Years",
      minIncome: "₹40k / mo or ₹5L p.a.",
      minCibil: "700+ Score",
      employmentType: "Property Owners (Freehold)",
    },
    requiredDocs: ["Identity KYC (PAN & Aadhaar)", "Property Registered Title & Deeds", "Latest 3 Years ITR / Salary"],
    featuresList: [
      "High LTV up to 70% of current market valuation",
      "Substantially lower interest rates compared to unsecured loans",
      "Continue using and staying in your property undisturbed",
    ],
  },
  {
    id: "home-loan-balance-transfer",
    slug: "/home-loans",
    title: "Balance Transfer",
    tagline: "Cut Expensive Existing EMIs",
    category: "home",
    illustration: "/products/balance-transfer.jpg",
    badge: "📉 Save Up to ₹5L Interest",
    badgeTone: "emerald",
    metrics: {
      rate: "From 8.35%",
      rateLabel: "Reduced Rate",
      amount: "Full + ₹50L",
      amountLabel: "With Top-Up",
      speed: "Zero Foreclosure",
    },
    visualTags: ["📉 Cut EMI by 25%", "💵 ₹50L Top-Up Cash", "🔄 100% Digital Transfer"],
    partnerLogos: [
      { name: "SBI", logo: "/partners-logos/sbi-logo.webp" },
      { name: "HDFC Bank", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "Kotak Bank", logo: "/partners-logos/kotak-logo.webp" },
      { name: "Bank of Baroda", logo: "/partners-logos/bob-logo.webp" },
    ],
    partnerCount: "25+ Lenders",
    eligibility: {
      minAge: "21 – 65 Years",
      minIncome: "Active Loan 12+ Months",
      minCibil: "720+ Score",
      employmentType: "Clean Repayment Track Record",
    },
    requiredDocs: ["Current Loan Foreclosure Letter", "List of Documents (LOD)", "6 Months EMI Bank Statement"],
    featuresList: [
      "Immediate savings on monthly EMI payout",
      "High-value top-up loan at affordable home loan interest rates",
      "Full assistance from Grofi specialists for seamless migration",
    ],
  },
  {
    id: "health-insurance",
    slug: "/health-insurance",
    title: "Health Insurance",
    tagline: "Cashless Medical Protection",
    category: "cards-insurance",
    illustration: "/products/health-insurance.jpg",
    badge: "🛡️ 10,000+ Cashless Hospitals",
    badgeTone: "purple",
    metrics: {
      rate: "From ₹450 / mo",
      rateLabel: "Starting Premium",
      amount: "₹5L – ₹1 Cr",
      amountLabel: "Sum Insured",
      speed: "30-Min Claims",
    },
    visualTags: ["🏥 10,000+ Hospitals", "🩺 No Checkup to 50", "🧾 ₹75k Sec 80D Saving"],
    partnerLogos: [
      { name: "HDFC ERGO", logo: "/partners-logos/hdfc-logo.webp" },
      { name: "ICICI Lombard", logo: "/partners-logos/icici-logo.webp" },
      { name: "Tata AIG", logo: "/partners-logos/tata-logo.webp" },
      { name: "Bajaj Allianz", logo: "/partners-logos/bajaj-logo.webp" },
    ],
    partnerCount: "15+ Insurers",
    eligibility: {
      minAge: "18 – 65 Years (Kids from 90d)",
      minIncome: "All Indian Citizens",
      minCibil: "No Score Needed",
      employmentType: "Individual & Family Floater",
    },
    requiredDocs: ["PAN & Aadhaar Card", "Health History Self-Declaration", "Nominee Information"],
    featuresList: [
      "100% cashless hospital claims settled in 30 minutes",
      "Coverage for pre & post hospitalization, ICU, and daycare procedures",
      "Cumulative bonus up to 100% extra cover on claim-free years",
    ],
  },
];

const badgeColors = {
  amber: "bg-amber-50 text-amber-800 border-amber-200/80 shadow-amber-500/10",
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-emerald-500/10",
  purple: "bg-purple-50 text-purple-800 border-purple-200/80 shadow-purple-500/10",
  teal: "bg-teal-50 text-teal-800 border-teal-200/80 shadow-teal-500/10",
  gold: "bg-[#F3F0DF] text-[#7A6115] border-[#B69226]/30 shadow-gold/10",
};

export default function ProductsSection() {
  const { openApplyModal } = useApplyModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.visualTags.some((tag) => tag.toLowerCase().includes(q)) ||
        p.partnerLogos.some((l) => l.name.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Display top 4 first unless expanded or searching
  const displayedProducts = useMemo(() => {
    if (searchQuery.trim() || isExpanded) {
      return filteredProducts;
    }
    return filteredProducts.slice(0, 4);
  }, [filteredProducts, isExpanded, searchQuery]);

  return (
    <section id="products" className="py-20 px-4 sm:px-6 relative bg-linear-to-b from-[#F3F0DF]/40 via-white to-[#F3F0DF]/30 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-200 h-120 bg-linear-to-br from-[#B6CC9A]/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Pictorial Product Suite
          </div>

          <h2 className="font-bricolage font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
            Explore India&apos;s Best{" "}
            <span className="text-gold relative inline-block">
              Financial Solutions
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/25 rounded-full" />
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-black/60 font-montserrat mt-2 max-w-xl mx-auto">
            Visual comparison, zero jargon. Tap any product to view pre-approved offers with instant digital disbursal.
          </p>
        </div>

        {/* ── Pictorial Infographic 3-Step Process Strip ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 max-w-4xl mx-auto reveal-on-scroll delay-75">
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-900/10 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bricolage font-bold text-sm">
              01
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 font-bricolage">Choose Your Solution</p>
              <p className="text-[11px] text-gray-500 font-montserrat">Loans, Cards or Health Cover</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-900/10 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 font-bricolage font-bold text-sm">
              02
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 font-bricolage">Soft Eligibility Match</p>
              <p className="text-[11px] text-gray-500 font-montserrat">Zero impact on CIBIL score</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-900/10 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0 font-bricolage font-bold text-sm">
              03
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 font-bricolage">Instant 24h Disbursal</p>
              <p className="text-[11px] text-gray-500 font-montserrat">Direct credit to your bank account</p>
            </div>
          </div>
        </div>

        {/* ── Sub-header Bar: Count & Instant Search Bar (Category Tabs Removed) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 reveal-on-scroll delay-100">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 font-montserrat">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Featured Solutions</span>
            <span className="text-[11px] font-semibold text-gray-400">
              ({displayedProducts.length} of {products.length})
            </span>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search loans, cards, insurance..."
              className="w-full bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-montserrat shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Products Pictorial Grid (4 Flagship First) ─────────────── */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm my-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bricolage font-bold text-xl text-gray-800 mb-1">No products found</h3>
            <p className="text-xs text-gray-500 font-montserrat mb-4">
              We couldn&apos;t find any financial product matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-primary bg-[#EBF4ED] hover:bg-primary/15 px-4 py-2 rounded-xl transition-colors cursor-pointer font-montserrat"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {displayedProducts.map((p, idx) => (
              <div
                key={p.id}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-5 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden reveal-on-scroll ${
                  idx % 4 === 1 ? "delay-75" : idx % 4 === 2 ? "delay-150" : idx % 4 === 3 ? "delay-200" : ""
                }`}
              >
                {/* Ambient hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-gold/10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-30" />

                <div>
                  {/* Card Top: Floating Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                    <span
                      className={`text-[10px] font-bold tracking-tight px-2.5 py-1 rounded-full border shadow-2xs ${
                        badgeColors[p.badgeTone]
                      }`}
                    >
                      {p.badge}
                    </span>

                    <span className="text-[10px] font-semibold text-gray-400 font-montserrat flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {p.metrics.speed}
                    </span>
                  </div>

                  {/* ── Visual 3D Illustration Pod (The Centerpiece) ── */}
                  <div className="relative w-full aspect-square max-h-48 sm:max-h-52 bg-linear-to-b from-[#F3F0DF]/40 via-[#EBF4ED]/30 to-white rounded-2xl p-2.5 mb-3 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-all">
                    {/* Radial aura behind illustration */}
                    <div className="absolute inset-0 bg-radial from-[#B6CC9A]/20 via-transparent to-transparent opacity-80 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

                    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-106">
                      <Image
                        src={p.illustration}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all"
                        priority={idx < 4}
                      />
                    </div>
                  </div>

                  {/* Title & Micro-Tagline */}
                  <div className="mb-3">
                    <h3 className="font-bricolage font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-montserrat font-medium mt-0.5 truncate">
                      {p.tagline}
                    </p>
                  </div>

                  {/* ── Pictorial Financial Data Chips (Dual Metrics) ── */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-[#EBF4ED]/70 rounded-xl p-2.5 border border-primary/10 flex flex-col justify-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary/70 flex items-center gap-0.5">
                        <TrendingDown className="w-2.5 h-2.5 text-emerald-600" />
                        {p.metrics.rateLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-primary font-montserrat mt-0.5 truncate">
                        {p.metrics.rate}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 flex flex-col justify-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-0.5">
                        <Coins className="w-2.5 h-2.5 text-gold" />
                        {p.metrics.amountLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat mt-0.5 truncate">
                        {p.metrics.amount}
                      </span>
                    </div>
                  </div>

                  
                  {/* ── Pictorial Partner Logos Avatar Stack ── */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 mb-2">
                    <div className="flex items-center -space-x-1.5 overflow-hidden">
                      {p.partnerLogos.slice(0, 4).map((l, lIdx) => (
                        <div
                          key={lIdx}
                          title={l.name}
                          className="relative w-6 h-6 rounded-full bg-white border border-gray-200 shadow-2xs overflow-hidden shrink-0"
                        >
                          <Image
                            src={l.logo}
                            alt={l.name}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 font-montserrat">
                      {p.partnerCount}
                    </span>
                  </div>
                </div>

                {/* ── Dual Actions: Quick Specs & Apply ── */}
                <div className="flex items-center gap-2 pt-2 relative z-10">
                  <button
                    onClick={() => setActiveModalProduct(p)}
                    className="flex-1 text-[11px] font-semibold text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 hover:text-primary py-2 px-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer font-montserrat"
                  >
                    Specs
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </button>

                  <button
                    onClick={() => openApplyModal(p.title, `Fast-track pre-approved application for ${p.title}`)}
                    className="flex-1 text-[11px] font-bold text-white bg-primary hover:bg-primary/90 py-2 px-2.5 rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-1 group/btn cursor-pointer font-montserrat"
                  >
                    Apply
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ── Explore Products Button ─────────────────────────────────── */}
        {!searchQuery && filteredProducts.length > 4 && (
          <div className="flex justify-center mb-12 reveal-on-scroll">
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="group inline-flex items-center gap-3 bg-white hover:bg-[#EBF4ED] text-primary border-2 border-primary/25 hover:border-primary text-sm font-bold font-montserrat px-8 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <span>Explore Products</span>
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-extrabold group-hover:bg-primary group-hover:text-white transition-colors">
                  +{filteredProducts.length - 4}
                </span>
                <ChevronDown className="w-4 h-4 text-gold transition-transform group-hover:translate-y-0.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold font-montserrat px-6 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <span>Show Less</span>
                <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* ── Bottom Pictorial Trust & Recommendation Banner ─────────── */}
        <div className="bg-linear-to-r from-primary via-[#03363b] to-primary rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden reveal-scale delay-150">
          <div className="absolute right-0 top-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#B6CC9A] mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              100% Free • Soft Match • No Impact on CIBIL Score
            </div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-white">
              Not sure which product matches your profile?
            </h3>
            <p className="text-white/75 text-xs font-montserrat mt-1.5 leading-relaxed">
              Compare 50+ lenders side-by-side with our intelligent algorithm and zero physical paperwork.
            </p>
          </div>

          <div className="relative z-10 flex sm:flex-row flex-col gap-2.5 w-full lg:w-auto shrink-0">
            <a
              href="#emi-calculator"
              className="border-2 border-white/40 hover:bg-white/10 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap font-montserrat"
            >
              Calculate EMI
            </a>
            <button
              onClick={() => openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.")}
              className="bg-gold hover:bg-gold/90 text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap font-montserrat"
            >
              Check Pre-Approved Offers
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ── Pictorial Specification Modal ────────────────────────────── */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative border border-gray-100 animate-scaleUp">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer z-10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header with 3D Illustration */}
            <div className="flex items-center gap-4 mb-5 pr-8">
              <div className="relative w-16 h-16 rounded-2xl bg-linear-to-b from-[#F3F0DF] to-white p-1 border border-gray-200/80 shadow-xs shrink-0 overflow-hidden">
                <Image
                  src={activeModalProduct.illustration}
                  alt={activeModalProduct.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span
                  className={`inline-block text-[10px] font-bold tracking-tight px-2.5 py-0.5 rounded-full border mb-1 ${
                    badgeColors[activeModalProduct.badgeTone]
                  }`}
                >
                  {activeModalProduct.badge}
                </span>
                <h3 className="font-bricolage font-bold text-xl text-gray-900 leading-tight">
                  {activeModalProduct.title}
                </h3>
                <p className="text-xs text-gray-500 font-montserrat">
                  {activeModalProduct.tagline}
                </p>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 bg-[#EBF4ED]/40 border border-primary/10 rounded-2xl p-3 mb-5">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {activeModalProduct.metrics.rateLabel}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-primary font-montserrat block mt-0.5">
                  {activeModalProduct.metrics.rate}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {activeModalProduct.metrics.amountLabel}
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat block mt-0.5">
                  {activeModalProduct.metrics.amount}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Turnaround
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700 font-montserrat block mt-0.5">
                  {activeModalProduct.metrics.speed}
                </span>
              </div>
            </div>

            {/* Eligibility Pictorial Grid */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-montserrat">
                <UserCheck className="w-3.5 h-3.5 text-primary" />
                Eligibility Criteria
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-medium">Age</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5">
                    {activeModalProduct.eligibility.minAge}
                  </span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-medium">Income</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5">
                    {activeModalProduct.eligibility.minIncome}
                  </span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-medium">CIBIL</span>
                  <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                    {activeModalProduct.eligibility.minCibil}
                  </span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-medium">Employment</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5 truncate">
                    {activeModalProduct.eligibility.employmentType}
                  </span>
                </div>
              </div>
            </div>

            {/* Required Docs */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-montserrat">
                <FileText className="w-3.5 h-3.5 text-primary" />
                Paperless Documents Required
              </h4>
              <div className="space-y-1.5">
                {activeModalProduct.requiredDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 text-xs text-gray-700 font-montserrat">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Advantages */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-montserrat">
                <Layers className="w-3.5 h-3.5 text-gold" />
                Key Highlights
              </h4>
              <ul className="space-y-1.5">
                {activeModalProduct.featuresList.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-montserrat">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner Lenders */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-montserrat">
                Top Partner Lenders
              </h4>
              <div className="flex flex-wrap gap-2 items-center">
                {activeModalProduct.partnerLogos.map((bank, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-200/80 shadow-2xs"
                  >
                    <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                      <Image src={bank.logo} alt={bank.name} fill className="object-contain" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 font-montserrat">{bank.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2.5 pt-3 border-t border-gray-100">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer font-montserrat"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const prod = activeModalProduct;
                  setActiveModalProduct(null);
                  openApplyModal(prod.title, prod.tagline);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-3 rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-montserrat"
              >
                Apply Online <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
