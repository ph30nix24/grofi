"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Bell,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Home,
  Check,
  Calendar,
  Building2,
  TrendingUp,
  Zap,
} from "lucide-react";

export interface ComingSoonFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ComingSoonProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
  description: string;
  eta?: string;
  perks?: string[];
  features?: ComingSoonFeature[];
}

export default function ComingSoon({
  badge = "Feature Coming Soon",
  title = "Something Extraordinary",
  highlightedWord = "Is Underway",
  description = "We are putting the final touches on this feature to give you the most transparent, fast, and rewarding financial experience. Stay tuned!",
  eta = "Coming Soon • Q2 2026",
  perks = [
    "100% Paperless & Transparent Process",
    "Compare Rates Across 50+ Partner Banks",
    "Instant Pre-Approval with Zero Impact on Credit Score",
  ],
  features = [
    {
      title: "Instant Digital Approvals",
      description: "Fast-track verification with seamless e-KYC and lightning-quick eligibility checks.",
      icon: <Zap className="w-5 h-5 text-[#B69226]" />,
    },
    {
      title: "Lowest Rate Guarantee",
      description: "Direct algorithmic comparisons to lock in the lowest interest rates and best terms.",
      icon: <TrendingUp className="w-5 h-5 text-[#02474D]" />,
    },
    {
      title: "Bank-Grade 256-Bit Security",
      description: "Your financial data is encrypted and strictly safeguarded with RBI-grade compliance.",
      icon: <ShieldCheck className="w-5 h-5 text-[#B69226]" />,
    },
  ],
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");

    try {
      await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Coming Soon Early Access",
          formTitle: `Early Access Request: ${title}`,
          feature: title,
          badge,
          email: email.trim(),
          replyTo: email.trim(),
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
    } catch (err) {
      console.warn("Failed to submit form to server:", err);
    } finally {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F7F4EB] to-[#ECE7D6] font-montserrat">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#02474D]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#B69226]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-[#02474D]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#02474D] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-[#02474D] font-bold">{title}</span>
        </div>

        {/* Hero Row: Left Details + Right Generated Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Perks, Form & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#02474D]/10 text-[#02474D] border border-[#02474D]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#B69226]" />
                {badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#B69226]/15 text-[#8f7118] border border-[#B69226]/30">
                <Calendar className="w-3.5 h-3.5 text-[#B69226]" />
                {eta}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-bricolage text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#02474D] leading-[1.12] tracking-tight">
              {title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B69226] via-[#d4ab33] to-[#997718]">
                {highlightedWord}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl font-normal">
              {description}
            </p>

            {/* Perks / Benefits list */}
            {perks && perks.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-1">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-gray-800">
                    <span className="p-0.5 rounded-full bg-[#02474D]/10 text-[#02474D] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Early Access / Notify Me Box */}
            <div className="mt-2 p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-[#02474D]/15 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-[#B69226]" />
                <h2 className="text-sm font-bold text-[#02474D] tracking-wide uppercase">
                  Get Notified When It Goes Live
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Be the first to access exclusive pre-launch benefits, lower introductory interest rates, and priority processing.
              </p>

              {isSubmitted ? (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#02474D]/10 border border-[#02474D]/25 text-[#02474D]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-sm">
                    <span className="font-bold">You are on the VIP early-access list!</span>
                    <p className="text-xs text-gray-600">We will notify you at <strong className="text-[#02474D]">{email}</strong> as soon as we launch.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02474D] focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    />
                    {error && (
                      <p className="text-xs text-red-600 mt-1 absolute -bottom-5 left-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#02474D] hover:bg-[#035961] active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Live Product CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/credit-cards"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B69226] to-[#a3801a] hover:from-[#c49e2e] hover:to-[#b38d21] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <CreditCard className="w-4 h-4" />
                <span>Explore 200+ Credit Cards</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm transition-all shadow-xs"
              >
                <Home className="w-4 h-4 text-gray-500" />
                <span>Return to Homepage</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Illustration & Feature Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Soft decorative halo behind the illustration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#02474D]/20 via-[#B69226]/20 to-transparent rounded-3xl blur-2xl transform -rotate-3 scale-95 pointer-events-none" />

            {/* Illustration Frame */}
            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl p-3 sm:p-4 bg-white/70 backdrop-blur-xl border border-white/80 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(2,71,77,0.15)]">
              
              {/* Illustration Image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#eef2f3]">
                <Image
                  src="/coming-soon.jpg"
                  alt="Feature Coming Soon illustration"
                  fill
                  priority
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>

              {/* Floating feature pills on illustration */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 px-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Safe & Secure</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-4 h-4 text-[#02474D]" />
                  <span>50+ Partner Banks</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Feature Preview Cards Section */}
        {features && features.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#02474D]/10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B69226]">
                What to Expect
              </span>
              <h2 className="font-bricolage text-2xl sm:text-3xl font-bold text-[#02474D] mt-1">
                Built with precision for your financial success
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#02474D]/10 shadow-xs hover:shadow-md transition-shadow hover:border-[#02474D]/25 flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#02474D]/5 border border-[#02474D]/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-bricolage text-lg font-bold text-[#02474D]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
