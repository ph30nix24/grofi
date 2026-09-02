"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  Landmark,
  CheckCircle2,
  Sparkles,
  Send,
} from "lucide-react";

const loanLinks = [
  { label: "Personal Loan", href: "#products" },
  { label: "Business Loan", href: "#products" },
  { label: "Home Loan", href: "#products" },
  { label: "Loan Against Property", href: "#products" },
  { label: "Loan Against Mutual Funds", href: "#products" },
  { label: "Short Term Personal Loan", href: "#products" },
];

const cardLinks = [
  { label: "HDFC Infinia Metal", href: "#credit-cards" },
  { label: "Axis Bank Magnus", href: "#credit-cards" },
  { label: "Amex Platinum Metal", href: "#credit-cards" },
  { label: "SBI Cashback Card", href: "#credit-cards" },
  { label: "Axis Atlas Travel Card", href: "#credit-cards" },
  { label: "Tata Neu RuPay Card", href: "#credit-cards" },
  { label: "Yes Bank Marquée", href: "#credit-cards" },
];

const toolLinks = [
  { label: "Loan EMI Calculator", href: "#emi-calculator" },
  { label: "Home Loan EMI Calculator", href: "#emi-calculator" },
  { label: "Personal Loan Eligibility", href: "#eligibility" },
  { label: "Credit Card Comparison", href: "#credit-cards" },
];

const companyLinks = [
  { label: "Why Choose Grofi", href: "#why-choose-us" },
  { label: "Our Banking Partners", href: "#products" },
  { label: "Verified Reviews", href: "#testimonials" },
  // { label: "Careers", href: "#" },
  // { label: "Press & Media", href: "#" },
  // { label: "Partner with Us", href: "#" },
  // { label: "Contact Us", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#012f33] text-white pt-16 pb-8 border-t border-primary/30 relative overflow-hidden font-montserrat">
      
      {/* Decorative ambient background lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        
        {/* ── Top Newsletter / Rate Alert Bar ──────────────────────────── */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 reveal-scale">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#B6CC9A]/15 text-[#B6CC9A] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#B6CC9A]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Stay Ahead Financially
            </div>
            <h3 className="font-bricolage font-bold text-2xl sm:text-3xl text-white">
              Get Rate Cut Alerts &amp; Exclusive Offers
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Subscribe to Grofi&apos;s weekly digest for zero-spam interest rate updates, credit card reward hacks, and pre-approved offers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl px-6 py-4 flex items-center gap-3 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! You&apos;re now subscribed to Grofi financial alerts.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 p-2 rounded-2xl border border-white/15">
                <div className="relative flex-1 flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ── Main Footer Columns ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10 reveal-on-scroll delay-100">
          
          {/* Column 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a href="#" className="inline-block">
              <Image
                src="/Grofi.png"
                alt="Grofi Logo"
                width={140}
                height={50}
                className="w-36 h-auto brightness-0 invert"
              />
            </a>
            
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Grofi is India&apos;s premier digital financial marketplace, empowering over 2,00,000+ borrowers and cardholders with transparent comparisons from 50+ leading banks &amp; NBFCs.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 text-xs text-white/80">
              

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#B6CC9A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-semibold">Customer Support</p>
                  <p className="font-bold text-white text-xs sm:text-sm">support@grofi.in</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#B6CC9A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-semibold">Corporate Office</p>
                  <p className="text-white/80 text-xs">B - 113 Ganesh Nagar, Tilak Nage Near Janakpuri East Metro, Delhi India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gold text-white/80 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/grofi_"
                aria-label="Instagram"
                target="_blank"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gold text-white/80 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/GROFI/61585844205496/"
                aria-label="Facebook"
                target="_blank"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gold text-white/80 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Grofinance"
                aria-label="YouTube"
                target="_blank"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gold text-white/80 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Lending Products (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bricolage font-bold text-base text-white mb-5 uppercase tracking-wider text-xs">
              Loans &amp; Credit
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              {loanLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-gold transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Credit Cards (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bricolage font-bold text-base text-white mb-5 uppercase tracking-wider text-xs">
              Credit Cards
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              {cardLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-gold transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Calculators & Tools (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bricolage font-bold text-base text-white mb-5 uppercase tracking-wider text-xs">
              Financial Tools
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              {toolLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-gold transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company & Support (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bricolage font-bold text-base text-white mb-5 uppercase tracking-wider text-xs">
              Grofi Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-gold transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Trust, Security & Regulatory Badges Strip ────────────────── */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-white/10 text-xs text-white/70 reveal-on-scroll delay-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B6CC9A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">ISO 27001 Certified</p>
              <p className="text-[11px] text-white/50">Information security standard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B6CC9A] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">256-Bit SSL Encryption</p>
              <p className="text-[11px] text-white/50">Bank-grade data protection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B6CC9A] shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">RBI Regulated Partners</p>
              <p className="text-[11px] text-white/50">50+ Scheduled Banks &amp; NBFCs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B6CC9A] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">Zero Customer Fees</p>
              <p className="text-[11px] text-white/50">100% Free digital marketplace</p>
            </div>
          </div>
        </div>

        {/* ── Regulatory Disclaimer ────────────────────────────────────── */}
        <div className="py-6 text-[11px] text-white/50 leading-relaxed reveal-fade delay-300">
          <p>
            <strong>Disclaimer:</strong> Grofi (Grofi Financial Technologies Pvt. Ltd.) operates as a digital aggregator and marketing partner for RBI-regulated commercial banks, NBFCs, and financial institutions. Grofi does not directly lend money or issue credit cards. Loan approval, credit limits, interest rates, and disbursal timelines are determined solely at the discretion of the lending partner based on their respective credit underwriting policies. Grofi does not charge any upfront application or advisory fees from customers.
          </p>
        </div>

        {/* ── Bottom Copyright Bar ─────────────────────────────────────── */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; {new Date().getFullYear()} Grofi Financial Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Security Disclosures</a>
            <a href="#" className="hover:text-gold transition-colors">Grievance Officer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
