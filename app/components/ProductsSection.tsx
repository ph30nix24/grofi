"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard,
  Wallet,
  Coins,
  Briefcase,
  Home,
  TrendingUp,
  Clock,
  Building2,
  RefreshCw,
  HeartPulse,
  ArrowRight,
  Landmark,
  Sparkles,
  Check,
  CheckCircle2,
  ShieldCheck,
  Search,
  X,
  Percent,
  IndianRupee,
  FileText,
  UserCheck,
  Zap,
  Info,
  ChevronRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";

type ProductCategory = "all" | "personal" | "home" | "business" | "cards-insurance";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: "personal" | "home" | "business" | "cards-insurance";
  description: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  glowColor: string;
  metrics: {
    rate: string;
    rateLabel: string;
    maxAmount: string;
    amountLabel: string;
    speed: string;
    speedLabel: string;
  };
  keyPerks: string[];
  partnerBanks: string[];
  eligibility: {
    minAge: string;
    minIncome: string;
    minCibil: string;
    employmentType: string;
  };
  requiredDocs: string[];
  featuresList: string[];
  applyHref: string;
}

const categoryTabs: { id: ProductCategory; label: string; count: number }[] = [
  { id: "all", label: "All Solutions", count: 10 },
  { id: "personal", label: "Personal & Quick Loans", count: 3 },
  { id: "home", label: "Home & Property", count: 3 },
  { id: "business", label: "Business & Assets", count: 2 },
  { id: "cards-insurance", label: "Cards & Insurance", count: 2 },
];

const products: Product[] = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    subtitle: "Collateral-free instant cash for any emergency or milestone",
    category: "personal",
    description: "Get quick funds for your personal needs with flexible tenure and low EMI options.",
    badge: "⚡ Instant 24h Disbursal",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    icon: <Coins className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-200/70",
    iconColor: "text-amber-800",
    glowColor: "group-hover:shadow-amber-500/10",
    metrics: {
      rate: "10.49% p.a.",
      rateLabel: "Interest from",
      maxAmount: "Up to ₹50 Lakhs",
      amountLabel: "Max Amount",
      speed: "24h Disbursal",
      speedLabel: "Speed",
    },
    keyPerks: [
      "Zero collateral or guarantor required",
      "100% digital paperless e-KYC process",
      "Flexible repayment tenure from 1 to 5 years",
    ],
    partnerBanks: ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Bank", "IDFC First"],
    eligibility: {
      minAge: "21 – 58 Years",
      minIncome: "₹25,000 / month",
      minCibil: "650+ Score",
      employmentType: "Salaried & Self-Employed",
    },
    requiredDocs: [
      "PAN Card & Aadhaar Card",
      "Last 3 Months Salary Slips or ITR",
      "Last 6 Months Bank Statement",
      "Current Residence Address Proof",
    ],
    featuresList: [
      "Direct disbursement into your bank account within 24 hours of approval",
      "No end-use restriction — use for travel, medical, weddings, or debt consolidation",
      "Prepayment and part-payment options available across top partner banks",
    ],
    applyHref: "#eligibility",
  },
  {
    id: "credit-card",
    title: "Credit Card",
    subtitle: "Curated premium cards with cashback, lounge & reward points",
    category: "cards-insurance",
    description: "Choose from a wide range of lifetime-free and luxury cards with unmatched perks.",
    badge: "🎁 Lifetime Free Options",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-800",
    badgeBorder: "border-purple-200",
    icon: <CreditCard className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-purple-100 to-purple-200/70",
    iconColor: "text-purple-800",
    glowColor: "group-hover:shadow-purple-500/10",
    metrics: {
      rate: "Up to 33.3% Rewards",
      rateLabel: "Reward Rate",
      maxAmount: "Up to ₹15 Lakhs",
      amountLabel: "Credit Limit",
      speed: "Instant e-Approval",
      speedLabel: "Approval",
    },
    keyPerks: [
      "Complimentary domestic & global airport lounges",
      "Up to 5% direct cashback on Amazon & Flipkart",
      "Exclusive welcome vouchers worth up to ₹10,000",
    ],
    partnerBanks: ["HDFC Bank", "Axis Bank", "SBI Card", "ICICI Bank", "American Express", "Yes Bank"],
    eligibility: {
      minAge: "21 – 65 Years",
      minIncome: "₹20,000 / month",
      minCibil: "700+ Score",
      employmentType: "Salaried & Self-Employed",
    },
    requiredDocs: [
      "PAN Card & Aadhaar Card",
      "Latest Form 16 / Salary Slips",
      "Last 3 Months Bank Statement",
    ],
    featuresList: [
      "Up to 50 days interest-free credit period on all retail purchases",
      "Instant digital card generated for immediate online transactions",
      "Annual fee waiver on achieving milestone spends",
    ],
    applyHref: "#credit-cards",
  },
  {
    id: "gold-loan",
    title: "Gold Loan",
    subtitle: "Instant liquidity against gold jewelry with door-to-door vault safety",
    category: "personal",
    description: "Unlock the instant value of your idle gold with lowest interest and minimal papers.",
    badge: "💰 Lowest ROI from 0.75%/mo",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-800",
    badgeBorder: "border-yellow-200",
    icon: <Wallet className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-yellow-100 to-amber-200/70",
    iconColor: "text-yellow-800",
    glowColor: "group-hover:shadow-yellow-500/10",
    metrics: {
      rate: "From 0.75% / mo",
      rateLabel: "Monthly Rate",
      maxAmount: "Up to 75% Value",
      amountLabel: "LTV Ratio",
      speed: "30-Min Disbursal",
      speedLabel: "Fastest Speed",
    },
    keyPerks: [
      "Doorstep gold valuation & instant transfer",
      "Insured bank vault safety with zero storage fee",
      "No CIBIL score or formal income proof required",
    ],
    partnerBanks: ["Muthoot Finance", "SBI", "HDFC Bank", "Manappuram", "ICICI Bank"],
    eligibility: {
      minAge: "18 – 70 Years",
      minIncome: "No minimum income required",
      minCibil: "No CIBIL restriction",
      employmentType: "Anyone owning 18k–24k Gold",
    },
    requiredDocs: [
      "PAN Card & Aadhaar Card",
      "Passport Size Photo",
      "Gold Ornaments for on-spot valuation",
    ],
    featuresList: [
      "Pay interest only during the tenure and principal upon completion (Bullet repayment)",
      "100% safe custody in bank-grade vaults insured against loss or damage",
      "Part-release of jewelry allowed whenever needed",
    ],
    applyHref: "#eligibility",
  },
  {
    id: "business-loan",
    title: "Business Loan",
    subtitle: "Fuel enterprise expansion, new inventory & working capital needs",
    category: "business",
    description: "Customized term loans and flexible overdraft facilities for MSMEs and enterprises.",
    badge: "📈 Up to ₹2 Cr Unsecured",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    icon: <Briefcase className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-[#EBF4ED] to-emerald-200/70",
    iconColor: "text-primary",
    glowColor: "group-hover:shadow-emerald-500/10",
    metrics: {
      rate: "From 11.25% p.a.",
      rateLabel: "Interest from",
      maxAmount: "Up to ₹2 Crores",
      amountLabel: "Max Funding",
      speed: "48h Approval",
      speedLabel: "Turnaround",
    },
    keyPerks: [
      "Collateral-free funding up to ₹75 Lakhs",
      "Overdraft & machinery loan facilities",
      "Tax deductible interest expense benefits",
    ],
    partnerBanks: ["Axis Bank", "HDFC Bank", "Kotak Bank", "IDFC First", "Bajaj Finserv"],
    eligibility: {
      minAge: "24 – 65 Years",
      minIncome: "₹40 Lakhs Annual Turnover",
      minCibil: "680+ Score",
      employmentType: "Business Vintage 2+ Years",
    },
    requiredDocs: [
      "GST Registration & Business PAN",
      "Last 2 Years Audited ITR & Balance Sheet",
      "Last 12 Months Current Account Statement",
      "KYC of Proprietor / Partners / Directors",
    ],
    featuresList: [
      "Flexible revolving credit lines tailored for seasonal business cashflows",
      "Zero requirement of commercial property pledge for loans up to ₹75L",
      "Dedicated SME relationship manager for doorstep service",
    ],
    applyHref: "#eligibility",
  },
  {
    id: "home-loan",
    title: "Home Loan",
    subtitle: "Turn your dream home into reality with India’s lowest interest rates",
    category: "home",
    description: "Affordable housing loans with lowest EMIs and long tenure up to 30 years.",
    badge: "🏡 Lowest Rates from 8.40%",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800",
    badgeBorder: "border-teal-200",
    icon: <Home className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-teal-100 to-emerald-200/70",
    iconColor: "text-teal-800",
    glowColor: "group-hover:shadow-teal-500/10",
    metrics: {
      rate: "From 8.40% p.a.",
      rateLabel: "Lowest Interest",
      maxAmount: "Up to ₹5 Crores",
      amountLabel: "Max Sanction",
      speed: "Up to 30 Years",
      speedLabel: "Max Tenure",
    },
    keyPerks: [
      "Lowest monthly EMI with up to 30 years tenure",
      "Tax savings up to ₹3.5 Lakhs under Sec 80C & 24b",
      "Pre-approved projects from top trusted builders",
    ],
    partnerBanks: ["SBI", "HDFC Bank", "LIC HFL", "ICICI Bank", "Bank of Baroda", "Kotak Bank"],
    eligibility: {
      minAge: "21 – 65 Years",
      minIncome: "₹30,000 / month",
      minCibil: "720+ Score",
      employmentType: "Salaried & Self-Employed",
    },
    requiredDocs: [
      "Identity & Residence Proof (Aadhaar & PAN)",
      "Property Chain of Title Deeds & Blueprint",
      "Last 6 Months Bank Statement & Salary Slips / ITR",
      "Allotment Letter / Agreement to Sale",
    ],
    featuresList: [
      "High sanction value up to 85% of property market value",
      "Home loan overdraft (MaxGain) option to park surplus funds and reduce interest",
      "Special subsidized interest concessions for women co-applicants",
    ],
    applyHref: "#emi-calculator",
  },
  {
    id: "loan-against-mutual-fund",
    title: "Loan Against Mutual Fund",
    subtitle: "Get instant credit against your equity/debt units without selling",
    category: "business",
    description: "Instant digital overdraft against your mutual funds while your portfolio stays intact.",
    badge: "📊 0% Asset Liquidation",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    icon: <TrendingUp className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-blue-100 to-indigo-200/70",
    iconColor: "text-blue-800",
    glowColor: "group-hover:shadow-blue-500/10",
    metrics: {
      rate: "From 9.00% p.a.",
      rateLabel: "Starting Rate",
      maxAmount: "Up to ₹1 Crore",
      amountLabel: "Credit Limit",
      speed: "15-Min Credit",
      speedLabel: "Disbursal",
    },
    keyPerks: [
      "Keep earning compounding returns & dividends",
      "Pay interest only on the amount you withdraw",
      "100% online digital lien marking via CAMS / KFin",
    ],
    partnerBanks: ["Mirae Asset", "HDFC Bank", "ICICI Bank", "Tata Capital", "Axis Bank"],
    eligibility: {
      minAge: "18 – 65 Years",
      minIncome: "Mutual Fund Value ₹50k+",
      minCibil: "650+ Score",
      employmentType: "Any Mutual Fund Investor",
    },
    requiredDocs: [
      "PAN Card & Aadhaar Linked Mobile (OTP)",
      "CAMS / KFintech Registered Email / Folio",
    ],
    featuresList: [
      "Zero foreclosure penalties — borrow and repay anytime freely",
      "High LTV: up to 50% for equity funds and up to 80% for debt funds",
      "Instant money credit to your registered bank account in 15 minutes",
    ],
    applyHref: "#eligibility",
  },
  {
    id: "short-term-personal-loan",
    title: "Short Term Personal Loan",
    subtitle: "Instant micro-loans and salary advance for emergency month-end needs",
    category: "personal",
    description: "Hassle-free micro credit disbursed in 5 minutes directly to your account.",
    badge: "⏱️ 5-Min Paperless Micro Loan",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800",
    badgeBorder: "border-teal-200",
    icon: <Clock className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-teal-100 to-cyan-200/70",
    iconColor: "text-teal-800",
    glowColor: "group-hover:shadow-teal-500/10",
    metrics: {
      rate: "From 1.25% / mo",
      rateLabel: "Monthly Rate",
      maxAmount: "₹10k – ₹2 Lakhs",
      amountLabel: "Micro Loan",
      speed: "5-Min Transfer",
      speedLabel: "Instant Payout",
    },
    keyPerks: [
      "Instant account credit in 5 minutes flat",
      "100% paperless smartphone application",
      "Flexible repayment in 3 to 12 monthly EMIs",
    ],
    partnerBanks: ["KreditBee", "MoneyView", "CASHe", "Bajaj Finserv", "EarlySalary / Fibe"],
    eligibility: {
      minAge: "21 – 50 Years",
      minIncome: "₹15,000 / month",
      minCibil: "600+ Score",
      employmentType: "Salaried Employees",
    },
    requiredDocs: [
      "Aadhaar Card (OTP Verification)",
      "PAN Card",
      "Net Banking Statement (Last 3 Months)",
    ],
    featuresList: [
      "Ideal for month-end cash crunches, urgent medical bills, or gadget buys",
      "Zero physical inspection or branch visit required",
      "Automated easy repayment setup via e-NACH auto-debit",
    ],
    applyHref: "#eligibility",
  },
  {
    id: "loan-against-property",
    title: "Loan Against Property",
    subtitle: "Unlock substantial funding by pledging residential or commercial property",
    category: "home",
    description: "High loan amounts with low interest rates against your freehold property.",
    badge: "🏢 Up to ₹15 Cr High Value",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    badgeBorder: "border-slate-300",
    icon: <Building2 className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-slate-100 to-gray-200/80",
    iconColor: "text-slate-800",
    glowColor: "group-hover:shadow-slate-500/10",
    metrics: {
      rate: "From 8.95% p.a.",
      rateLabel: "Interest from",
      maxAmount: "Up to ₹15 Crores",
      amountLabel: "High Sanction",
      speed: "Up to 20 Years",
      speedLabel: "Tenure",
    },
    keyPerks: [
      "Substantially lower EMI than unsecured business loans",
      "Accepted for residential, commercial & industrial units",
      "Retain full possession and normal usage of property",
    ],
    partnerBanks: ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "PNB Housing", "Tata Capital"],
    eligibility: {
      minAge: "25 – 68 Years",
      minIncome: "₹40,000 / mo (Salaried) | ₹5L p.a. (Self-Employed)",
      minCibil: "700+ Score",
      employmentType: "Property Owners (Freehold / Registered)",
    },
    requiredDocs: [
      "KYC: PAN & Aadhaar Card",
      "Title Deeds, Sale Deed & Encumbrance Certificate",
      "Last 3 Years ITR / 6 Months Salary Slips",
      "Approved Property Layout & Latest Tax Receipts",
    ],
    featuresList: [
      "High loan-to-value (LTV) up to 70% of current market valuation",
      "Ideal for business expansion, child's overseas education, or major medical needs",
      "Drop-line overdraft facility to reduce interest payout significantly",
    ],
    applyHref: "#eligibility",
  },
  {
    id: "home-loan-balance-transfer",
    title: "Home Loan Balance Transfer",
    subtitle: "Switch your existing high-EMI home loan to lower interest rates & save lakhs",
    category: "home",
    description: "Transfer your existing high-cost home loan effortlessly and get a massive top-up.",
    badge: "📉 Save up to ₹5L in Interest",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-800",
    badgeBorder: "border-indigo-200",
    icon: <RefreshCw className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200/70",
    iconColor: "text-indigo-800",
    glowColor: "group-hover:shadow-indigo-500/10",
    metrics: {
      rate: "From 8.35% p.a.",
      rateLabel: "Reduced Rate",
      maxAmount: "Full Loan + Top-Up",
      amountLabel: "Transfer Amount",
      speed: "Up to 30 Years",
      speedLabel: "New Tenure",
    },
    keyPerks: [
      "Immediate reduction in monthly EMI up to 25%",
      "Attractive high-value top-up loan at home loan rates",
      "Zero foreclosure penalty on floating rate transfers",
    ],
    partnerBanks: ["SBI", "HDFC Bank", "Kotak Bank", "ICICI Bank", "Bank of Baroda"],
    eligibility: {
      minAge: "21 – 65 Years",
      minIncome: "Existing Home Loan Active for 12+ Months",
      minCibil: "720+ Score",
      employmentType: "Clean EMI Repayment Track Record",
    },
    requiredDocs: [
      "List of Documents (LOD) from current lender",
      "Foreclosure Letter & Outstanding Loan Statement",
      "Latest 6 Months Bank Statement with EMI debits",
      "Latest Income Proof (ITR / Salary Slips)",
    ],
    featuresList: [
      "Save significant interest outflow over the remaining loan term",
      "Get up to ₹50 Lakhs additional top-up loan for home renovation",
      "End-to-end documentation & transfer handling by Grofi specialists",
    ],
    applyHref: "#emi-calculator",
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    subtitle: "Comprehensive cashless hospitalization protection for your entire family",
    category: "cards-insurance",
    description: "Complete medical security with 10,000+ network hospitals and rapid claims.",
    badge: "🛡️ 10,000+ Cashless Hospitals",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    icon: <HeartPulse className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-rose-100 to-rose-200/70",
    iconColor: "text-rose-800",
    glowColor: "group-hover:shadow-rose-500/10",
    metrics: {
      rate: "From ₹450 / mo",
      rateLabel: "Starting Premium",
      maxAmount: "₹5L – ₹1 Cr Cover",
      amountLabel: "Sum Insured",
      speed: "Instant Policy",
      speedLabel: "Issuance",
    },
    keyPerks: [
      "100% cashless claims settlement in 30 minutes",
      "Zero medical checkup required up to age 50",
      "Tax exemption under Section 80D up to ₹75,000",
    ],
    partnerBanks: ["Star Health", "HDFC ERGO", "Care Health", "Niva Bupa", "ICICI Lombard"],
    eligibility: {
      minAge: "18 – 65 Years (Kids from 90 days)",
      minIncome: "Open to all Indian residents",
      minCibil: "No CIBIL required",
      employmentType: "Individual & Family Floater Plans",
    },
    requiredDocs: [
      "PAN Card & Aadhaar Card",
      "Health History Declaration",
      "Nominee Details",
    ],
    featuresList: [
      "Comprehensive cover for pre & post hospitalization, ICU, and daycare procedures",
      "Cumulative No-Claim Bonus (NCB) up to 100% additional sum insured",
      "Unlimited automatic restoration of sum insured upon exhaustion",
    ],
    applyHref: "#eligibility",
  },
];

export default function ProductsSection() {
  const { openApplyModal } = useApplyModal();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filter products based on selected tab and search term
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.partnerBanks.some((b) => b.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-22 px-6 relative bg-gradient-to-b from-[#F3F0DF]/40 via-white to-[#F3F0DF]/30 overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-br from-[#B6CC9A]/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Comprehensive Financial Suite
          </div>

          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Explore India&apos;s Best{" "}
            <span className="text-gold relative inline-block">
              Financial Products
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/25 rounded-full" />
            </span>{" "}
            <br className="hidden sm:inline" />
            from 50+ Top Partner Lenders
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Compare pre-approved loan offers, credit cards, and insurance plans. Enjoy 100% digital approvals, transparent interest rates, and zero hidden charges.
          </p>
        </div>

        {/* ── Filter Controls: Category Tabs & Search Bar ──────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-1.5 max-w-full overflow-x-auto w-full md:w-auto">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-montserrat text-xs font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search loans, cards, insurance..."
              className="w-full bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-montserrat"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Products Grid ────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm my-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bricolage font-bold text-xl text-gray-800 mb-1">No products found</h3>
            <p className="text-xs text-gray-500 font-montserrat mb-4">
              We couldn&apos;t find any financial product matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-primary bg-[#EBF4ED] hover:bg-primary/15 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-gray-200/70 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Ambient hover gradient glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-primary/[0.04] to-gold/[0.04] rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-40" />

                {/* Top Section */}
                <div>
                  
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                    <div
                      className={`w-13 h-13 rounded-2xl ${p.iconBg} ${p.iconColor} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0`}
                    >
                      {p.icon}
                    </div>

                    <div
                      className={`text-[11px] font-bold tracking-tight px-3 py-1 rounded-full border ${p.badgeBg} ${p.badgeText} ${p.badgeBorder} shadow-2xs whitespace-nowrap`}
                    >
                      {p.badge}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="font-bricolage font-bold text-xl text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-montserrat mt-1 leading-relaxed line-clamp-2">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Key Financial Metrics Grid (Dual Tiles) */}
                  <div className="grid grid-cols-2 gap-2.5 my-4">
                    <div className="bg-[#EBF4ED]/60 rounded-2xl p-3 border border-primary/10">
                      <span className="text-[10px] font-bold text-primary/70 uppercase tracking-wider block">
                        {p.metrics.rateLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-primary font-montserrat block mt-0.5 truncate">
                        {p.metrics.rate}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {p.metrics.amountLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat block mt-0.5 truncate">
                        {p.metrics.maxAmount}
                      </span>
                    </div>
                  </div>

                  {/* Key Bullet Perks Checklist */}
                  <div className="my-4 pt-3 border-t border-gray-100">
                    <ul className="flex flex-col gap-2">
                      {p.keyPerks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-montserrat leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Top Partners Snippet */}
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 font-montserrat pt-1 pb-2">
                    <Landmark className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                    <span className="truncate">
                      Partners: {p.partnerBanks.slice(0, 3).join(", ")} +{p.partnerBanks.length - 3} more
                    </span>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveModalProduct(p)}
                    className="flex-1 text-xs font-bold text-primary bg-[#EBF4ED] hover:bg-primary hover:text-white py-2.5 px-3 rounded-xl transition-all duration-200 text-center cursor-pointer font-montserrat"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => openApplyModal(p.title, p.subtitle)}
                    className="flex-1 text-xs font-bold text-white bg-primary hover:bg-primary/90 py-2.5 px-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer font-montserrat"
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ── Bottom Value & Trust Banner ──────────────────────────────── */}
        <div className="bg-gradient-to-r from-primary via-[#03363b] to-primary rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-[#B6CC9A] mb-3">
              <ShieldCheck className="w-4 h-4 text-gold" />
              100% Free • Soft Inquiry • No Impact on CIBIL Score
            </div>
            <h3 className="font-bricolage font-bold text-2xl sm:text-3xl text-white">
              Need personalized recommendations for your profile?
            </h3>
            <p className="text-white/75 text-xs sm:text-sm font-montserrat mt-2 leading-relaxed">
              Check multiple pre-approved loans and credit cards side-by-side. Calculate exact EMIs, compare interest rates, and get assisted disbursal.
            </p>
          </div>

          <div className="relative z-10 flex sm:flex-row flex-col gap-3 w-full lg:w-auto shrink-0">
            <a
              href="#emi-calculator"
              className="border-2 border-white/40 hover:bg-white/10 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap font-montserrat"
            >
              Calculate EMI
            </a>
            <button
              onClick={() => openApplyModal("General Pre-Approved Offers", "Check customized pre-approved loan & card offers across 50+ partner banks.")}
              className="bg-gold hover:bg-gold/90 text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap font-montserrat"
            >
              Check Pre-Approved Offers
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ── Product Details Modal ──────────────────────────────────────── */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              <div
                className={`w-14 h-14 rounded-2xl ${activeModalProduct.iconBg} ${activeModalProduct.iconColor} flex items-center justify-center shadow-sm shrink-0`}
              >
                {activeModalProduct.icon}
              </div>
              <div>
                <div
                  className={`inline-block text-[11px] font-bold tracking-tight px-3 py-0.5 rounded-full border ${activeModalProduct.badgeBg} ${activeModalProduct.badgeText} ${activeModalProduct.badgeBorder} mb-1.5`}
                >
                  {activeModalProduct.badge}
                </div>
                <h3 className="font-bricolage font-bold text-2xl text-gray-900 leading-snug">
                  {activeModalProduct.title}
                </h3>
                <p className="text-xs text-gray-500 font-montserrat mt-0.5">
                  {activeModalProduct.subtitle}
                </p>
              </div>
            </div>

            {/* Key Metrics Strip (4 metrics) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-gray-50/80 border border-gray-100 rounded-2xl p-3.5 mb-6">
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
                  {activeModalProduct.metrics.maxAmount}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {activeModalProduct.metrics.speedLabel}
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700 font-montserrat block mt-0.5">
                  {activeModalProduct.metrics.speed}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Lenders
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat block mt-0.5">
                  {activeModalProduct.partnerBanks.length}+ Top Banks
                </span>
              </div>
            </div>

            {/* Eligibility Requirements */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-primary" />
                Eligibility Criteria
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-[#EBF4ED]/40 p-3 rounded-xl border border-primary/10">
                  <span className="text-[10px] text-gray-500 block font-medium">Age Group</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5">
                    {activeModalProduct.eligibility.minAge}
                  </span>
                </div>
                <div className="bg-[#EBF4ED]/40 p-3 rounded-xl border border-primary/10">
                  <span className="text-[10px] text-gray-500 block font-medium">Min Income</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5">
                    {activeModalProduct.eligibility.minIncome}
                  </span>
                </div>
                <div className="bg-[#EBF4ED]/40 p-3 rounded-xl border border-primary/10">
                  <span className="text-[10px] text-gray-500 block font-medium">Credit Score</span>
                  <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                    {activeModalProduct.eligibility.minCibil}
                  </span>
                </div>
                <div className="bg-[#EBF4ED]/40 p-3 rounded-xl border border-primary/10">
                  <span className="text-[10px] text-gray-500 block font-medium">Profile</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5 truncate">
                    {activeModalProduct.eligibility.employmentType}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents Required */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                Required Documents (100% Digital)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalProduct.requiredDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-xs text-gray-700 font-montserrat">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Advantages */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-gold" />
                Key Product Advantages
              </h4>
              <ul className="space-y-2">
                {activeModalProduct.featuresList.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-montserrat leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner Lenders */}
            <div className="mb-7">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-primary" />
                Available from Top Lenders
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProduct.partnerBanks.map((bank, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200/60 font-montserrat"
                  >
                    {bank}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer font-montserrat"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const prod = activeModalProduct;
                  setActiveModalProduct(null);
                  openApplyModal(prod.title, prod.subtitle);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-3.5 rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-montserrat"
              >
                Apply Online <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

