"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  CreditCard,
  Wallet,
  Briefcase,
  Home,
  MessageSquareHeart,
  BadgeCheck,
} from "lucide-react";

type TestimonialCategory = "all" | "personal" | "credit-card" | "business" | "home";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  product: string;
  category: "personal" | "credit-card" | "business" | "home";
  bankPartner: string;
  disbursalTime?: string;
  title: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Rahul Sharma",
    role: "Senior Tech Lead",
    city: "Bengaluru",
    avatar: "/customer/customer1.png",
    rating: 5,
    product: "Personal Loan (₹12 Lakhs)",
    category: "personal",
    bankPartner: "HDFC Bank",
    disbursalTime: "Disbursed in 14 Hours",
    title: "100% Paperless & Zero Branch Visits",
    quote:
      "I needed urgent funds for home renovation and medical backup. Grofi compared rates across 4 banks and got me an unbeatable 10.49% rate from HDFC. The entire e-KYC took under 5 minutes and money was in my account the same day!",
  },
  {
    id: "t-2",
    name: "Priya Nair",
    role: "Founder, D2C Apparel",
    city: "Mumbai",
    avatar: "/customer/customer3.jpg",
    rating: 5,
    product: "Business Working Capital (₹35 Lakhs)",
    category: "business",
    bankPartner: "Axis Bank",
    disbursalTime: "Disbursed in 24 Hours",
    title: "Fuelled Our Festive Inventory Surge",
    quote:
      "Traditional banks asked for extensive physical audit reports and collateral. Grofi's relationship manager guided me to a collateral-free business loan through Axis Bank with flexible overdraft. Absolutely seamless experience.",
  },
  {
    id: "t-3",
    name: "Vikram Malhotra",
    role: "Chartered Accountant",
    city: "New Delhi",
    avatar: "/customer/customer2.jpg",
    rating: 5,
    product: "HDFC Infinia & SBI Cashback Cards",
    category: "credit-card",
    bankPartner: "HDFC & SBI",
    disbursalTime: "Approved Instantly",
    title: "Best Credit Card Advisory in India",
    quote:
      "As a CA, I analyze reward rates meticulously. Grofi accurately matched me with HDFC Infinia and SBI Cashback for my monthly spends. I've already earned over ₹45,000 in cashback and flight points in just 4 months!",
  },
  {
    id: "t-4",
    name: "Ananya Deshmukh",
    role: "Architect & Interior Designer",
    city: "Pune",
    avatar: "/customer/customer6.jpg",
    rating: 5,
    product: "Home Loan Balance Transfer (₹75 Lakhs)",
    category: "home",
    bankPartner: "ICICI Bank",
    disbursalTime: "Saved ₹4.2 Lakhs on Interest",
    title: "Reduced My Monthly EMI by ₹6,800",
    quote:
      "Grofi helped me transfer my high-interest home loan from my previous lender to ICICI at 8.40%. The doorstep document assistance and legal verification support was remarkable. Transparent and completely stress-free.",
  },
  {
    id: "t-5",
    name: "Siddharth Roy",
    role: "Marketing Director",
    city: "Hyderabad",
    avatar: "/customer/customer4.png",
    rating: 5,
    product: "Axis Bank Atlas Travel Card",
    category: "credit-card",
    bankPartner: "Axis Bank",
    disbursalTime: "Delivered in 3 Days",
    title: "Effortless International Lounge Access",
    quote:
      "I travel twice a month for client pitches. Grofi's recommendation of the Atlas card was spot on. Seamless airport lounge access and 1:2 miles conversion saved me thousands on international flights.",
  },
  {
    id: "t-6",
    name: "Kavita Patel",
    role: "Management Consultant",
    city: "Ahmedabad",
    avatar: "/customer/customer5.jpg",
    rating: 5,
    product: "Short Term Personal Loan (₹4 Lakhs)",
    category: "personal",
    bankPartner: "Kotak Mahindra Bank",
    disbursalTime: "Approved in 20 Mins",
    title: "Lightning Fast Emergency Disbursal",
    quote:
      "Had an emergency while traveling abroad. Applied through Grofi's mobile site and the pre-approved offer was approved instantly with zero physical paperwork. Their customer support team is available 24/7!",
  },
];

const categoryTabs: { id: TestimonialCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Reviews", icon: <MessageSquareHeart className="w-4 h-4" /> },
  { id: "personal", label: "Personal Loans", icon: <Wallet className="w-4 h-4" /> },
  { id: "credit-card", label: "Credit Cards", icon: <CreditCard className="w-4 h-4" /> },
  { id: "business", label: "Business Loans", icon: <Briefcase className="w-4 h-4" /> },
  { id: "home", label: "Home Loans", icon: <Home className="w-4 h-4" /> },
];

export default function Testimonials() {
  const [selectedTab, setSelectedTab] = useState<TestimonialCategory>("all");

  const filteredTestimonials = testimonials.filter((t) => {
    if (selectedTab === "all") return true;
    return t.category === selectedTab;
  });

  return (
    <section id="testimonials" className="py-22 px-6 relative bg-gradient-to-b from-[#F3F0DF]/40 via-white to-[#F3F0DF]/30 overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-br from-[#B6CC9A]/15 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Verified Customer Stories
          </div>

          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Loved by Customers,{" "}
            <span className="text-gold relative inline-block">
              Trusted by 2L+
              <span className="absolute bottom-1 left-0 w-full h-1 bg-gold/20 rounded-full" />
            </span>{" "}
            Indians
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Discover how Grofi empowers working professionals, business owners, and families with transparent financial choices and instant approvals.
          </p>
        </div>

        {/* ── Overall Rating & Trust Summary Badge ─────────────────────── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto reveal-scale delay-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex flex-col items-center justify-center font-bricolage font-bold text-2xl shadow-md">
              4.9
              <span className="text-[10px] font-sans font-normal opacity-80">/ 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 font-montserrat mt-1">
                Outstanding Rating across 15,000+ Reviews
              </p>
              <p className="text-xs text-gray-400 font-montserrat">
                Verified Customer Feedback from 50+ Cities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200/60">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Genuine Borrower Reviews</span>
            </div>
          </div>
        </div>

        {/* ── Category Filter Tabs ─────────────────────────────────────── */}
        <div className="flex justify-center mb-12 reveal-on-scroll delay-150">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-2 max-w-full overflow-x-auto">
            {categoryTabs.map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-montserrat text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Testimonials Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative reveal-on-scroll ${
                idx % 3 === 1 ? "delay-100" : idx % 3 === 2 ? "delay-200" : ""
              }`}
            >
              {/* Top Quote Icon Accent */}
              <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* Product & Bank Pill */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="text-[11px] font-bold text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15">
                    {t.product}
                  </span>
                  {t.disbursalTime && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {t.disbursalTime}
                    </span>
                  )}
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Review Headline */}
                <h3 className="font-bricolage font-bold text-lg text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                  &ldquo;{t.title}&rdquo;
                </h3>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-gray-600 font-montserrat leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 shadow-xs">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-montserrat font-bold text-sm text-gray-900 truncate">
                      {t.name}
                    </p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-[11px] text-gray-500 font-montserrat truncate">
                    {t.role} • {t.city}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Trust Verification Banner ─────────────────────────────────── */}
        <div className="mt-16 bg-white/80 backdrop-blur border border-primary/15 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left reveal-scale delay-150">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] flex items-center justify-center text-primary shrink-0">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bricolage font-bold text-lg text-gray-900">
                Have you applied with Grofi?
              </h4>
              <p className="text-xs text-gray-500 font-montserrat mt-0.5">
                Share your journey and help millions of Indians choose the right financial path.
              </p>
            </div>
          </div>

          <a
            href="#eligibility"
            className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Check Your Eligibility <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
