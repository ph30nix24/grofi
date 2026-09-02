"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  Home,
  Car,
  Briefcase,
  CreditCard,
  Wallet,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { banksImgs, imageUrls } from "../utils";
import { useApplyModal } from "../context/ApplyModalContext";


const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    value: "50+",
    label: "Banks & NBFC",
    sub: "Partners",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    value: "100%",
    label: "Safe & Secure",
    sub: "Your Data is Protected",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    value: "2L+",
    label: "Happy Customers",
    sub: "Trust Grofi",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    value: "24/7",
    label: "Customer Support",
    sub: "We're Here to Help",
  },
];

const navLinks = [
  { label: "Credit Cards", href: "#credit-cards" },
  { label: "Loans", href: "#products" },
  { label: "EMI Calculator", href: "#emi-calculator" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Reviews", href: "#testimonials" },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Hero2() {
  const { openApplyModal } = useApplyModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen font-montserrat bg-gradient-to-br from-[#F3F0DF] via-[#ECE9CF] to-[#DDE3C1]">

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#F3F0DF]/95 backdrop-blur-md border-b border-[#DDE3C1] py-2.5 sm:py-3 transition-all">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Dynamic Responsive Logo */}
          <a href="#" className="flex items-center shrink-0">
            <Image 
              src="/Grofi.png"
              width={160}
              height={52}
              className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 h-auto object-contain transition-all"
              alt="Grofi - Smart Financial Growth Partner"
              priority
            />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-semibold text-gray-700">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="flex items-center gap-1 hover:text-primary transition-colors duration-150 py-1"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right-Side Desktop & Tablet Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* CTA Button (Visible on Tablet & Desktop, styled responsively) */}
            <button
              onClick={() => openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.")}
              className="hidden sm:inline-flex bg-primary text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl items-center gap-1.5 sm:gap-2 hover:bg-primary/90 transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Hamburger Button (Visible on Tablet & Mobile: < lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-primary flex items-center justify-center border border-[#DDE3C1] shadow-2xs transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── Minimalist Mobile & Tablet Drawer Menu (< lg) ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden">
          {/* Subtle backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-fadeIn transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Clean Minimalist Slide-in Drawer */}
          <div className="fixed top-0 right-0 w-full max-w-[290px] sm:max-w-xs h-full bg-[#F3F0DF] shadow-2xl z-[100] flex flex-col p-6 overflow-y-auto border-l border-[#DDE3C1] animate-slideInRight font-montserrat">
            
            {/* Minimal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#DDE3C1]">
              <Image 
                src="/Grofi.png"
                width={120}
                height={40}
                className="w-28 h-auto object-contain"
                alt="Grofi logo"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center border border-[#DDE3C1] shadow-2xs transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clean Minimalist Nav Links */}
            <nav className="py-6 flex-1 flex flex-col gap-1.5">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/80 text-gray-800 hover:text-primary font-semibold text-sm transition-all group cursor-pointer"
                >
                  <span>{l.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>

            {/* Minimal Bottom Action */}
            <div className="pt-4 border-t border-[#DDE3C1] space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.");
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-center text-[11px] text-gray-500 font-medium">
                100% Free • Soft Bureau Inquiry
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex-1 overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large green blob top-center */}
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/4 w-[700px] h-[700px] rounded-full bg-[#B6CC9A]/25 blur-3xl" />
          {/* Gold arc bottom-left */}
          <div
            className="absolute bottom-[-40px] left-[-60px] w-56 h-56 rounded-full border-[20px] border-[#C9AA3C]/15"
          />
        </div>

        {/* Main layout */}
        <div className="max-w-[1280px] mx-auto px-8 flex flex-wrap xl:flex-nowrap items-center gap-4 pt-8 pb-0 relative">

          {/* ── Column 1: left text ──────────────────────────────────────── */}
          <div className="w-full xl:w-[38%] shrink-0 flex flex-col gap-4 pb-8 z-10 reveal-slide-left">

            <div className="w-fit text-[10px] font-bold uppercase tracking-widest text-primary bg-[#b0cca65a] rounded-full px-5 py-1.5 border border-[#a5c490]/30">
              Your Financial Growth Partner
            </div>

            <h1 className="font-bricolage font-bold text-[3.1rem] leading-[1.08] text-primary">
              Smart choices <br />today,{" "}
              <span className="text-gold">stronger <br />tomorrow.</span>
            </h1>

            <div className="w-14 h-[3px] bg-gold rounded-full" />

            <p className="text-sm text-black/60 leading-relaxed max-w-[300px]">
              Explore the best credit cards, loans and financial products tailored to your needs.
              Compare, apply and grow with confidence.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#products"
                className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:bg-primary/90 shadow-md transition-all cursor-pointer"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.")}
                className="border-2 border-gold text-gold text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:bg-gold/10 transition-all cursor-pointer"
              >
                Check Eligibility <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Avatars */}
            <div className="flex items-center gap-3 mt-1">
              <div
                className="relative flex items-center"
                style={{ width: `${imageUrls.length * 22 + 26}px`, height: 38 }}
              >
                {imageUrls.map((src, i) => (
                  <div
                    key={i}
                    className="absolute top-0 rounded-full border-[2.5px] border-[#F3F0DF] overflow-hidden shadow"
                    style={{ left: i * 22, width: 38, height: 38, zIndex: i + 1 }}
                  >
                    <Image src={src} alt="avatar" width={38} height={38} className="w-full h-full object-cover object-top" />
                  </div>
                ))}
                <div
                  className="absolute flex items-center justify-center rounded-full bg-green-500 border-[2.5px] border-[#F3F0DF] shadow"
                  style={{ left: imageUrls.length * 22 + 4, top: 10, width: 20, height: 20, zIndex: imageUrls.length + 2 }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-black/60 font-medium">
                Trusted by <span className="text-primary font-bold text-sm">2L+</span> happy customers
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow max-w-xs">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for cards, loans and more..."
                className="flex-1 text-xs text-gray-500 placeholder-gray-400 bg-transparent outline-none"
              />
              <button className="w-7 h-7 bg-primary hover:bg-gold rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 cursor-pointer">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* ── Column 2: big hero image + ALL floating cards ─────────────── */}
          <div className="w-full xl:w-[62%] shrink-0 relative flex items-center justify-center z-10 reveal-scale delay-100" style={{ minHeight: 640 }}>

            {/* Glow circle behind image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-primary/[0.07]" />

            {/* ── Hero image ── */}
            <div className="relative z-20" style={{ width: 560, height: 560 }}>
              <Image src="/hero.png" alt="Grofi hero" fill className="object-contain" priority />
            </div>

            {/* ════ Floating cards ════ */}

            {/* TOP-LEFT card */}
            <div className="absolute top-8 left-0 z-30 flex flex-col items-end gap-1 reveal-scale delay-150">
              <div 
                onClick={() => openApplyModal("Credit Card", "Exclusive offers on top credit cards with airport lounge and cashback.")}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 group cursor-pointer hover:shadow-xl transition-all duration-200 w-52 hover:-translate-y-1"
              >
                <div className="w-9 h-9 bg-[#EBF4ED] rounded-xl flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">Top Credit Cards</p>
                  <p className="text-[10px] text-gray-500 leading-snug mt-0.5">Exclusive offers on top cards</p>
                </div>
              </div>
              {/* arrow SVG pointing right+down toward image */}
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="mr-4 opacity-50">
                <path d="M10 8 Q60 8 72 52" stroke="#02474D" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" fill="none"/>
                <polygon points="68,58 76,48 64,48" fill="#02474D"/>
              </svg>
            </div>

            {/* BOTTOM-LEFT card */}
            <div className="absolute bottom-16 left-0 z-30 flex flex-col items-end gap-1 reveal-scale delay-200">
              {/* arrow SVG pointing right+up toward image */}
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="mr-4 opacity-50">
                <path d="M10 52 Q60 52 72 8" stroke="#02474D" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" fill="none"/>
                <polygon points="68,2 76,12 64,12" fill="#02474D"/>
              </svg>
              <div 
                onClick={() => openApplyModal("Personal Loan", "Instant funds up to ₹50L from 10.49% p.a.")}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 group cursor-pointer hover:shadow-xl transition-all duration-200 w-52 hover:-translate-y-1"
              >
                <div className="w-9 h-9 bg-[#EBF4ED] rounded-xl flex items-center justify-center shrink-0">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">Personal Loan</p>
                  <p className="text-[10px] text-gray-500 leading-snug mt-0.5">Up to ₹50L · From 10.49% p.a.</p>
                </div>
              </div>
            </div>

            {/* TOP-RIGHT card */}
            <div className="absolute top-6 right-0 z-30 flex flex-col items-start gap-1 reveal-scale delay-150">
              <div 
                onClick={() => openApplyModal("Home Loan", "Lowest rates starting from 8.40% p.a. up to ₹5Cr.")}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 group cursor-pointer hover:shadow-xl transition-all duration-200 w-52 hover:-translate-y-1"
              >
                <div className="w-9 h-9 bg-[#EBF4ED] rounded-xl flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">Home Loan</p>
                  <p className="text-[10px] text-gray-500 leading-snug mt-0.5">Up to ₹5Cr · From 8.40% p.a.</p>
                </div>
              </div>
              {/* arrow SVG pointing left+down toward image */}
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="ml-4 opacity-50">
                <path d="M70 8 Q20 8 8 52" stroke="#02474D" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" fill="none"/>
                <polygon points="12,58 4,48 16,48" fill="#02474D"/>
              </svg>
            </div>

            {/* MID-RIGHT card */}
            

            {/* BOTTOM-RIGHT card */}
            <div className="absolute bottom-12 right-0 z-30 flex flex-col items-start gap-1 reveal-scale delay-250">
              {/* arrow pointing left+up toward image */}
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="ml-4 opacity-50">
                <path d="M70 52 Q20 52 8 8" stroke="#02474D" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" fill="none"/>
                <polygon points="12,2 4,12 16,12" fill="#02474D"/>
              </svg>
              <div 
                onClick={() => openApplyModal("Business Loan", "Unsecured business loan up to ₹2Cr from 11.25% p.a.")}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 group cursor-pointer hover:shadow-xl transition-all duration-200 w-52 hover:-translate-y-1"
              >
                <div className="w-9 h-9 bg-[#EBF4ED] rounded-xl flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">Business Loan</p>
                  <p className="text-[10px] text-gray-500 leading-snug mt-0.5">Up to ₹2Cr · From 11.25% p.a.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-8 pb-5 relative z-10 reveal-on-scroll delay-150">
          <div className="bg-white/75 backdrop-blur rounded-2xl shadow-md border border-white/90 px-8 py-5 flex flex-wrap md:flex-nowrap gap-6">
            {stats.map((s, idx) => (
              <div key={s.value} className={`flex items-start gap-3.5 w-[calc(50%-12px)] md:flex-1 reveal-on-scroll delay-${(idx + 1) * 100}`}>
                <div className="w-11 h-11 bg-[#EBF4ED] rounded-xl flex items-center justify-center shrink-0">{s.icon}</div>
                <div>
                  <p className="font-bricolage font-bold text-2xl text-primary leading-none">{s.value}</p>
                  <p className="text-[11px] font-semibold text-gray-700 mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-gray-400">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted Banking Partners ───────────────────────────────────── */}
      <div className="relative bg-primary/[0.06] border-t border-primary/10 overflow-hidden py-5 reveal-on-scroll delay-100">

        {/* Section label */}
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-primary/40 mb-4">
          Trusted Banking Partners
        </p>

        {/* Marquee track */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#eef5f5] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#eef5f5] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max items-center animate-marquee">
            {/* Set 1 */}
            <div className="flex items-center gap-5 pr-5 shrink-0">
              {[...banksImgs, ...banksImgs].map((src, i) => (
                <div
                  key={`b1-${i}`}
                  className="shrink-0 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  style={{ minWidth: 140, height: 60 }}
                >
                  <div className="relative w-full h-full">
                    <Image src={src} alt="bank logo" fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless loop) */}
            <div className="flex items-center gap-5 pr-5 shrink-0">
              {[...banksImgs, ...banksImgs].map((src, i) => (
                <div
                  key={`b2-${i}`}
                  className="shrink-0 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  style={{ minWidth: 140, height: 60 }}
                >
                  <div className="relative w-full h-full">
                    <Image src={src} alt="bank logo" fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
