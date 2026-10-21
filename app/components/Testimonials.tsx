"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  Sparkles,
  ArrowRight,
  CreditCard,
  Wallet,
  Briefcase,
  Home,
  MessageSquareHeart,
  CheckCircle2,
  MapPin,
  Laptop,
  Calculator,
  Building2,
  TrendingUp,
  Compass,
  ThumbsUp,
  ShieldCheck,
  Zap,
  Award,
  Coins,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";

export type TestimonialCategory = "all" | "personal" | "credit-card" | "business" | "home";

export type AvatarTheme = "emerald" | "amber" | "violet" | "blue" | "rose" | "teal";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  initials: string;
  avatarTheme: AvatarTheme;
  rating: number;
  product: string;
  category: "personal" | "credit-card" | "business" | "home";
  bankPartner: string;
  bankLogo: string;
  disbursalTime?: string;
  savingsOrOutcome?: string;
  title: string;
  quote: string;
  verifiedTag: string;
  helpfulCount: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Rahul Sharma",
    role: "Senior Tech Lead",
    city: "Bengaluru",
    initials: "RS",
    avatarTheme: "emerald",
    rating: 5,
    product: "Personal Loan (₹12 Lakhs)",
    category: "personal",
    bankPartner: "HDFC Bank",
    bankLogo: "/partners-logos/hdfc-logo.webp",
    disbursalTime: "Disbursed in 14 Hours",
    savingsOrOutcome: "10.49% Best Market APR",
    title: "100% Paperless & Zero Branch Visits",
    quote:
      "I needed urgent funds for home renovation and medical backup. Grofi compared rates across 4 banks and got me an unbeatable 10.49% rate from HDFC. The entire e-KYC took under 5 minutes and money was in my account the same day!",
    verifiedTag: "Verified Borrower",
    helpfulCount: 48,
  },
  {
    id: "t-2",
    name: "Priya Nair",
    role: "Founder, D2C Apparel",
    city: "Mumbai",
    initials: "PN",
    avatarTheme: "violet",
    rating: 5,
    product: "Business Working Capital (₹35 Lakhs)",
    category: "business",
    bankPartner: "Axis Bank",
    bankLogo: "/partners-logos/axis-logo.webp",
    disbursalTime: "Disbursed in 24 Hours",
    savingsOrOutcome: "Collateral-Free Overdraft",
    title: "Fuelled Our Festive Inventory Surge",
    quote:
      "Traditional banks asked for extensive physical audit reports and collateral. Grofi's relationship manager guided me to a collateral-free business loan through Axis Bank with flexible overdraft. Absolutely seamless experience.",
    verifiedTag: "Verified Business Owner",
    helpfulCount: 63,
  },
  {
    id: "t-3",
    name: "Vikram Malhotra",
    role: "Chartered Accountant",
    city: "New Delhi",
    initials: "VM",
    avatarTheme: "amber",
    rating: 5,
    product: "HDFC Infinia & SBI Cashback Cards",
    category: "credit-card",
    bankPartner: "HDFC Bank & SBI",
    bankLogo: "/partners-logos/hdfc-logo.webp",
    disbursalTime: "Approved Instantly",
    savingsOrOutcome: "Earned ₹45,000+ Cashback",
    title: "Best Credit Card Advisory in India",
    quote:
      "As a CA, I analyze reward rates meticulously. Grofi accurately matched me with HDFC Infinia and SBI Cashback for my monthly spends. I've already earned over ₹45,000 in cashback and flight points in just 4 months!",
    verifiedTag: "Verified Cardholder",
    helpfulCount: 52,
  },
  {
    id: "t-4",
    name: "Ananya Deshmukh",
    role: "Architect & Interior Designer",
    city: "Pune",
    initials: "AD",
    avatarTheme: "rose",
    rating: 5,
    product: "Home Loan Balance Transfer (₹75 Lakhs)",
    category: "home",
    bankPartner: "ICICI Bank",
    bankLogo: "/partners-logos/icici-logo.webp",
    disbursalTime: "Completed in 5 Days",
    savingsOrOutcome: "Saved ₹4.2 Lakhs on Interest",
    title: "Reduced My Monthly EMI by ₹6,800",
    quote:
      "Grofi helped me transfer my high-interest home loan from my previous lender to ICICI at 8.40%. The doorstep document assistance and legal verification support was remarkable. Transparent and completely stress-free.",
    verifiedTag: "Verified Home Owner",
    helpfulCount: 71,
  },
  {
    id: "t-5",
    name: "Siddharth Roy",
    role: "Marketing Director",
    city: "Hyderabad",
    initials: "SR",
    avatarTheme: "blue",
    rating: 5,
    product: "Axis Bank Atlas Travel Card",
    category: "credit-card",
    bankPartner: "Axis Bank",
    bankLogo: "/partners-logos/axis-logo.webp",
    disbursalTime: "Delivered in 3 Days",
    savingsOrOutcome: "1:2 Miles Airport Lounge Tier",
    title: "Effortless International Lounge Access",
    quote:
      "I travel twice a month for client pitches. Grofi's recommendation of the Atlas card was spot on. Seamless airport lounge access and 1:2 miles conversion saved me thousands on international flights.",
    verifiedTag: "Verified Cardholder",
    helpfulCount: 39,
  },
  {
    id: "t-6",
    name: "Kavita Patel",
    role: "Management Consultant",
    city: "Ahmedabad",
    initials: "KP",
    avatarTheme: "teal",
    rating: 5,
    product: "Short Term Personal Loan (₹4 Lakhs)",
    category: "personal",
    bankPartner: "Kotak Mahindra Bank",
    bankLogo: "/partners-logos/kotak-logo.webp",
    disbursalTime: "Approved in 20 Mins",
    savingsOrOutcome: "Zero Paperwork Pre-Approval",
    title: "Lightning Fast Emergency Disbursal",
    quote:
      "Had an emergency while traveling abroad. Applied through Grofi's mobile site and the pre-approved offer was approved instantly with zero physical paperwork. Their customer support team is available 24/7!",
    verifiedTag: "Verified Borrower",
    helpfulCount: 45,
  },
];

export const categoryTabs: { id: TestimonialCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Reviews", icon: <MessageSquareHeart className="w-4 h-4" /> },
  { id: "personal", label: "Personal Loans", icon: <Wallet className="w-4 h-4" /> },
  { id: "credit-card", label: "Credit Cards", icon: <CreditCard className="w-4 h-4" /> },
  { id: "business", label: "Business Loans", icon: <Briefcase className="w-4 h-4" /> },
  { id: "home", label: "Home Loans", icon: <Home className="w-4 h-4" /> },
];

export const trustStats = [
  {
    value: "4.9 / 5.0",
    label: "Google & Trustpilot Score",
    detail: "15,000+ verified ratings",
    icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
  },
  {
    value: "₹1,200+ Cr",
    label: "Disbursal Facilitated",
    detail: "Pan-India borrowers served",
    icon: <Coins className="w-4 h-4 text-emerald-600" />,
  },
  {
    value: "50+ Banks",
    label: "RBI Regulated Partners",
    detail: "Direct institutional tie-ups",
    icon: <Building2 className="w-4 h-4 text-[#02474D]" />,
  },
  {
    value: "100% Free",
    label: "Zero Agent Surcharge",
    detail: "Transparent comparison",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
  },
];

// Map customer role to an appropriate user icon
function getRoleIcon(role: string) {
  const lower = role.toLowerCase();
  if (lower.includes("tech") || lower.includes("engineer") || lower.includes("developer")) {
    return <Laptop className="w-3.5 h-3.5" />;
  }
  if (lower.includes("founder") || lower.includes("ceo") || lower.includes("business")) {
    return <Briefcase className="w-3.5 h-3.5" />;
  }
  if (lower.includes("accountant") || lower.includes("ca") || lower.includes("finance")) {
    return <Calculator className="w-3.5 h-3.5" />;
  }
  if (lower.includes("architect") || lower.includes("interior") || lower.includes("designer")) {
    return <Building2 className="w-3.5 h-3.5" />;
  }
  if (lower.includes("marketing") || lower.includes("growth")) {
    return <TrendingUp className="w-3.5 h-3.5" />;
  }
  return <Compass className="w-3.5 h-3.5" />;
}

// Styling variants for Customer User Icon Avatar
const themeStyles: Record<
  AvatarTheme,
  {
    gradient: string;
    text: string;
    ring: string;
    glow: string;
    tagBg: string;
    tagText: string;
  }
> = {
  emerald: {
    gradient: "from-[#02474D] via-[#03626A] to-[#047782]",
    text: "text-white",
    ring: "ring-[#02474D]/25",
    glow: "shadow-emerald-950/20",
    tagBg: "bg-emerald-50 border-emerald-200/80",
    tagText: "text-emerald-800",
  },
  amber: {
    gradient: "from-[#8C6D15] via-[#B69226] to-[#D4AA30]",
    text: "text-white",
    ring: "ring-amber-500/25",
    glow: "shadow-amber-900/20",
    tagBg: "bg-amber-50 border-amber-200/80",
    tagText: "text-amber-900",
  },
  violet: {
    gradient: "from-purple-900 via-indigo-800 to-indigo-600",
    text: "text-white",
    ring: "ring-indigo-500/25",
    glow: "shadow-indigo-950/20",
    tagBg: "bg-purple-50 border-purple-200/80",
    tagText: "text-purple-900",
  },
  blue: {
    gradient: "from-sky-900 via-blue-800 to-indigo-700",
    text: "text-white",
    ring: "ring-blue-500/25",
    glow: "shadow-blue-950/20",
    tagBg: "bg-blue-50 border-blue-200/80",
    tagText: "text-blue-900",
  },
  rose: {
    gradient: "from-rose-900 via-rose-700 to-pink-600",
    text: "text-white",
    ring: "ring-rose-500/25",
    glow: "shadow-rose-950/20",
    tagBg: "bg-rose-50 border-rose-200/80",
    tagText: "text-rose-900",
  },
  teal: {
    gradient: "from-teal-900 via-teal-700 to-emerald-600",
    text: "text-white",
    ring: "ring-teal-500/25",
    glow: "shadow-teal-950/20",
    tagBg: "bg-teal-50 border-teal-200/80",
    tagText: "text-teal-900",
  },
};

/**
 * Reimagined Customer Avatar Component with Stylized User Icons and Monograms
 * Compact on mobile, richly detailed on tablet and desktop
 */
function CustomerAvatar({ testimonial }: { testimonial: Testimonial }) {
  const theme = themeStyles[testimonial.avatarTheme] || themeStyles.emerald;

  return (
    <div className="relative shrink-0">
      {/* Outer ambient glow & avatar container */}
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-xl sm:rounded-2xl bg-linear-to-br ${theme.gradient} p-0.5 shadow-xs md:shadow-md ${theme.glow} flex items-center justify-center`}
      >
        <div className="w-full h-full rounded-[10px] sm:rounded-[12px] md:rounded-[14px] bg-black/10 backdrop-blur-xs flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle geometric pattern accent inside avatar */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/25 via-transparent to-black/30 pointer-events-none" />

          {/* User Monogram Initials */}
          <span className="font-bricolage font-black text-xs sm:text-sm md:text-base tracking-wider text-white select-none z-10 drop-shadow-xs">
            {testimonial.initials}
          </span>

          {/* Micro role badge glyph at bottom edge */}
          <div className="absolute -bottom-1 text-white/50 z-0 scale-75 sm:scale-90 md:scale-100">
            {getRoleIcon(testimonial.role)}
          </div>
        </div>
      </div>

      {/* Verified Customer Checkmark Pin */}
      <div
        className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white shadow-xs"
        title="Verified Grofi Borrower"
        aria-label="Verified Customer"
      >
        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 stroke-[3]" />
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { openApplyModal } = useApplyModal();
  const [selectedTab, setSelectedTab] = useState<TestimonialCategory>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>(() =>
    testimonials.reduce((acc, t) => {
      acc[t.id] = t.helpfulCount;
      return acc;
    }, {} as Record<string, number>)
  );
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const handleToggleHelpful = (id: string) => {
    setUserVoted((prev) => {
      const alreadyVoted = !!prev[id];
      setHelpfulVotes((h) => ({
        ...h,
        [id]: (h[id] || 0) + (alreadyVoted ? -1 : 1),
      }));
      return { ...prev, [id]: !alreadyVoted };
    });
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (selectedTab === "all") return true;
    return t.category === selectedTab;
  });

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    // approximate card width + gap on mobile
    const cardStep = (container.offsetWidth * 0.84) + 14;
    const index = Math.round(scrollLeft / cardStep);
    setActiveCardIndex(Math.min(Math.max(0, index), filteredTestimonials.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardStep = (container.offsetWidth * 0.84) + 14;
    container.scrollTo({
      left: index * cardStep,
      behavior: "smooth",
    });
    setActiveCardIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 relative bg-linear-to-b from-[#F3F0DF]/35 via-white to-[#F3F0DF]/25 overflow-hidden"
    >
      {/* Decorative background glow & subtle grid pattern */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-225 h-135 bg-linear-to-br from-[#B6CC9A]/15 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-primary/20 mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Verified Customer Stories & Disbursals
          </div>

          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl lg:text-5xl text-primary leading-tight">
            Loved by Borrowers,{" "}
            <span className="text-gold relative inline-block">
              Trusted by 2L+
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-gold/20 rounded-full" />
            </span>{" "}
            Indians
          </h2>

          {/* Decorative diamond divider */}
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-12 sm:w-16 h-px bg-linear-to-r from-transparent to-primary/30" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-12 sm:w-16 h-px bg-linear-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-xs sm:text-sm md:text-base text-black/65 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Real experiences from working professionals, business leaders, and homeowners who saved money, reduced paperwork, and secured fast bank approvals with Grofi.
          </p>
        </div>

        {/* ── Quantifiable Trust Summary Ribbon ─────────────────────────── */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xs border border-gray-200/80 mb-8 sm:mb-12 max-w-5xl mx-auto reveal-scale">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {trustStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx > 0 ? "pt-3 sm:pt-0 sm:pl-5 lg:pl-6" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-[#EBF4ED] text-primary shrink-0">
                    {stat.icon}
                  </div>
                  <span className="font-bricolage font-extrabold text-lg sm:text-xl lg:text-2xl text-gray-900 tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <p className="font-montserrat font-bold text-[11px] sm:text-xs lg:text-sm text-gray-800">
                  {stat.label}
                </p>
                <p className="font-montserrat text-[10px] sm:text-[11px] text-gray-400 mt-0.5 hidden xs:block">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Interactive Category Filter Tabs ─────────────────────────── */}
        <div className="flex justify-center mb-6 sm:mb-10 reveal-on-scroll delay-100">
          <div
            role="tablist"
            aria-label="Testimonial Categories"
            className="bg-white/90 backdrop-blur-sm p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-xs border border-gray-200/90 inline-flex gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-hidden"
          >
            {categoryTabs.map((tab) => {
              const isActive = selectedTab === tab.id;
              const count =
                tab.id === "all"
                  ? testimonials.length
                  : testimonials.filter((t) => t.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 min-h-10 sm:min-h-11 rounded-lg sm:rounded-xl font-montserrat text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer touch-manipulation ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`ml-0.5 sm:ml-1 text-[10px] sm:text-[11px] px-1.5 py-0.2 sm:py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Testimonials Container: Mobile Horizontal Scroll / Desktop Grid ── */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6 lg:gap-7 items-stretch overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-3 pt-1 touch-pan-x"
        >
          {filteredTestimonials.map((t, idx) => {
            const isVoted = !!userVoted[t.id];
            const currentHelpful = helpfulVotes[t.id] ?? t.helpfulCount;

            return (
              <article
                key={t.id}
                className={`w-[84vw] xs:w-[320px] sm:w-[350px] md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-150 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(2,71,77,0.09)] hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group md:hover:-translate-y-1.5 relative reveal-on-scroll ${
                  idx % 3 === 1 ? "delay-100" : idx % 3 === 2 ? "delay-200" : ""
                }`}
              >
                {/* Background decorative corner quotes */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 text-primary/8 group-hover:text-primary/15 transition-colors pointer-events-none">
                  <Quote className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12" />
                </div>

                <div>
                  {/* 1. Header: Customer Profile with Stylized User Icons */}
                  <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <CustomerAvatar testimonial={t} />

                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h3 className="font-montserrat font-bold text-xs sm:text-sm md:text-base text-gray-900 truncate">
                            {t.name}
                          </h3>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-gray-500 font-montserrat truncate flex items-center gap-1">
                          <span>{t.role}</span>
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-montserrat flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 shrink-0" />
                          <span>{t.city}</span>
                        </p>
                      </div>
                    </div>

                    {/* Bank Partner Branding Pill */}
                    <div
                      className="bg-gray-50/90 border border-gray-200/70 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-2xs"
                      title={`Processed via ${t.bankPartner}`}
                    >
                      <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs overflow-hidden shrink-0">
                        <Image
                          src={t.bankLogo}
                          alt={t.bankPartner}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-gray-700 font-montserrat whitespace-nowrap">
                        {t.bankPartner.split("&")[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* 2. Key Outcome / Tangible Financial Win Badge */}
                  <div className="bg-[#F8FAF8] border border-emerald-100 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 mb-2.5 sm:mb-3.5 md:mb-4 flex items-center justify-between gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-900 truncate font-montserrat">
                        {t.disbursalTime}
                      </span>
                    </div>

                    {t.savingsOrOutcome && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 sm:px-2 rounded-md whitespace-nowrap">
                        {t.savingsOrOutcome}
                      </span>
                    )}
                  </div>

                  {/* 3. Star Rating & Score */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 md:mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-800 font-montserrat">
                      5.0
                    </span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 sm:px-2 rounded-full border border-emerald-200/50">
                      {t.verifiedTag}
                    </span>
                  </div>

                  {/* 4. Review Headline */}
                  <h4 className="font-bricolage font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 mb-1.5 sm:mb-2 leading-snug group-hover:text-primary transition-colors">
                    &ldquo;{t.title}&rdquo;
                  </h4>

                  {/* 5. Review Quote Body */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 font-montserrat leading-relaxed">
                    {t.quote}
                  </p>
                </div>

                {/* 6. Card Footer: Product category & Interactive helpful feedback */}
                <div className="mt-3.5 sm:mt-4 md:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <span className="inline-block text-[9px] sm:text-[10px] md:text-[11px] font-bold text-primary bg-[#EBF4ED] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border border-primary/15 truncate max-w-36 sm:max-w-44 md:max-w-48">
                      {t.product}
                    </span>
                  </div>

                  {/* Interactive 'Helpful' Upvote Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(t.id)}
                    aria-label={`Mark review from ${t.name} as helpful`}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-montserrat font-medium transition-all cursor-pointer ${
                      isVoted
                        ? "bg-emerald-100 text-emerald-800 font-bold"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform ${
                        isVoted ? "scale-110 text-emerald-700 fill-emerald-700" : ""
                      }`}
                    />
                    <span className="text-[10px] sm:text-[11px]">{currentHelpful}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Mobile Carousel Indicators & Swipe Prompt (hidden on md and above) ── */}
        <div className="flex md:hidden items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {filteredTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === i ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500 font-montserrat">
            <span>Swipe for more</span>
            <ArrowRight className="w-3 h-3 text-primary animate-pulse" />
          </div>
        </div>

        {/* ── High-Converting Pre-Approval CTA Banner ──────────────────── */}
        <div className="mt-10 sm:mt-14 lg:mt-16 bg-white/95 backdrop-blur-md border border-primary/20 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-md flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 text-center lg:text-left reveal-scale">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#EBF4ED] border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-xs">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 mb-1 sm:mb-1.5">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                <span>100% Free & No Impact on CIBIL Score</span>
              </div>
              <h3 className="font-bricolage font-bold text-lg sm:text-xl lg:text-2xl text-gray-900">
                Ready to find your lowest rate with Grofi?
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 font-montserrat mt-1 max-w-xl">
                Join over 2,00,000 satisfied borrowers. Check pre-approved offers across 50+ banks in under 2 minutes with zero paperwork.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() =>
                openApplyModal(
                  "General Pre-Approved Offers",
                  "Instant eligibility check across 50+ partner banks."
                )
              }
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all whitespace-nowrap cursor-pointer touch-manipulation min-h-11 sm:min-h-12 hover:-translate-y-0.5"
            >
              <span>Check Pre-Approved Offers</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
