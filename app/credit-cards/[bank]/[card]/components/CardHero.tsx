"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Share2,
  Bookmark,
  Plane,
  Percent,
  CreditCard as CreditCardIcon,
  Zap,
  Globe,
  Star,
  Check,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardHeroProps {
  card: CardStructure;
  bankSlug: string;
}

export default function CardHero({ card, bankSlug }: CardHeroProps) {
  const { openApplyModal } = useApplyModal();
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const isFree =
    card.annualFee?.toLowerCase().includes("free") ||
    card.annualFee?.includes("₹0") ||
    card.annualFee?.toLowerCase().includes("nil");

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 bg-linear-to-b from-[#F3EFE6]/60 via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/80">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none -ml-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* ── Breadcrumb Navigation ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 font-montserrat mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors hover:underline"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link
            href="/credit-cards"
            className="hover:text-primary transition-colors hover:underline"
          >
            Credit Cards
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link
            href={`/credit-cards/${bankSlug}`}
            className="hover:text-primary transition-colors hover:underline font-medium text-gray-700"
          >
            {card.issuer}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-primary font-bold truncate max-w-[220px] sm:max-w-none">
            {card.name}
          </span>
        </nav>

        {/* ── Main Hero Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Physical Card Graphic Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[1.586/1] group transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Dynamic Luxury Ambient Glow */}
              <div className="absolute -inset-2 bg-linear-to-r from-primary/20 via-gold/25 to-primary/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Physical Card Representation */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-linear-to-br from-[#0c2226] via-[#02474D] to-[#011d20] flex flex-col justify-between p-5 sm:p-6 text-white select-none">
                
                {card.cardImage ? (
                  <Image
                    src={card.cardImage}
                    alt={card.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                    className="object-contain p-1 drop-shadow-xl"
                  />
                ) : (
                  <>
                    {/* Top Row: Issuer Logo & Contactless */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        {card.logo ? (
                          <div className="h-6 w-20 relative bg-white/95 rounded-md px-1.5 py-0.5 shadow-xs">
                            <Image
                              src={card.logo}
                              alt={card.issuer}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="font-bricolage font-bold text-sm tracking-wide text-white">
                            {card.issuer}
                          </span>
                        )}
                      </div>

                      {/* Contactless waves symbol */}
                      <div className="flex items-center gap-1.5 text-white/80">
                        <Zap className="w-4 h-4 text-gold rotate-90" />
                        <span className="text-[10px] uppercase tracking-widest font-mono text-white/70">
                          NFC
                        </span>
                      </div>
                    </div>

                    {/* Middle: EMV Chip & Holographic texture */}
                    <div className="my-auto relative z-10 flex items-center justify-between">
                      {/* EMV Metallic Chip Graphic */}
                      <div className="w-11 h-8 rounded-md bg-linear-to-tr from-amber-300 via-yellow-400 to-amber-500 border border-amber-200/60 shadow-inner flex items-center justify-around px-1">
                        <div className="w-2.5 h-full border-r border-amber-700/30" />
                        <div className="w-2.5 h-full border-r border-amber-700/30" />
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-gold/90 font-montserrat font-bold">
                          {card.categoryLabel || "Grofi Preferred"}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Card Name, Number, and Network */}
                    <div className="relative z-10 pt-2 border-t border-white/10">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="font-mono text-xs sm:text-sm tracking-widest text-white/90 font-semibold">
                            •••• •••• •••• 8892
                          </p>
                          <p className="font-bricolage font-bold text-sm sm:text-base text-white tracking-wide mt-1 truncate max-w-[220px]">
                            {card.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase italic">
                            {card.network}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Action Buttons (Share / Bookmark / Verified) */}
            <div className="w-full max-w-[380px] sm:max-w-[420px] flex items-center justify-between gap-3 mt-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-montserrat font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified by Grofi • 2026</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-white hover:bg-gray-100 text-gray-600 hover:text-primary transition-all border border-gray-200 shadow-2xs cursor-pointer flex items-center gap-1 text-xs font-montserrat"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-xl transition-all border shadow-2xs cursor-pointer flex items-center gap-1 text-xs font-montserrat ${
                    bookmarked
                      ? "bg-primary text-white border-primary"
                      : "bg-white hover:bg-gray-100 text-gray-600 hover:text-primary border-gray-200"
                  }`}
                  title="Save card"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-white" : ""}`} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details, Ratings, Metrics & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Badges & Issuer Line */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {card.badge && (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/20 font-montserrat">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{card.badge}</span>
                </div>
              )}

              <span className="text-xs font-semibold text-gray-500 font-montserrat px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                {card.network} Network
              </span>

              <span className="text-xs font-semibold text-gray-500 font-montserrat">
                Issued by <strong className="text-gray-900 font-bold">{card.issuer}</strong>
              </span>
            </div>

            {/* Card Main Title */}
            <h1 className="font-bricolage font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
              {card.name}
            </h1>

            {/* Short Tagline / Description */}
            <p className="text-sm sm:text-base text-gray-600 font-montserrat mt-3 leading-relaxed max-w-2xl">
              {card.description ||
                `Enjoy unmatched rewards, airport lounge access, and exclusive milestone benefits with the ${card.name} from ${card.issuer}.`}
            </p>

            {/* Social Proof & Rating Strip */}
            <div className="flex flex-wrap items-center gap-4 mt-4 py-2 text-xs font-montserrat text-gray-600">
              <div className="flex items-center gap-1 bg-[#FEF6E4] px-2.5 py-1 rounded-lg border border-amber-200 text-amber-900 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.8 / 5.0</span>
                <span className="font-normal text-amber-800 ml-1">Grofi Rating</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>2,800+ Checked This Month</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Zero Hard Inquiry</span>
              </div>
            </div>

            {/* ── Key Metrics Highlights Strip ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-6">
              
              {/* Annual Fee */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Annual Fee
                </span>
                <span
                  className={`text-sm sm:text-base font-bold font-montserrat block mt-0.5 truncate ${
                    isFree ? "text-emerald-700" : "text-gray-900"
                  }`}
                >
                  {card.annualFee || "Nil"}
                </span>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5" title={card.feeWaiver}>
                  {card.feeWaiver ? "Waiver available" : "+ 18% GST"}
                </span>
              </div>

              {/* Joining Fee */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Joining Fee
                </span>
                <span className="text-sm sm:text-base font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
                  {card.joiningFee || "Nil"}
                </span>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
                  One-time fee
                </span>
              </div>

              {/* Reward Headline */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-emerald-200/90 bg-emerald-50/20 shadow-2xs">
                <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block font-montserrat">
                  Reward Value
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-950 font-montserrat block mt-0.5 truncate" title={card.rewardRate?.headline}>
                  {card.rewardRate?.headline
                    ? card.rewardRate.headline.replace(/up to/i, "").trim()
                    : "Up to 5%"}
                </span>
                <span className="text-[10px] text-emerald-700 font-montserrat block truncate mt-0.5">
                  {card.rewardRate?.rewardCurrency || "Reward Points"}
                </span>
              </div>

              {/* Lounge Access */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Lounge Access
                </span>
                <span className="text-sm sm:text-base font-bold text-gray-900 font-montserrat block mt-0.5 truncate" title={card.loungeAccess?.domestic}>
                  {card.loungeAccess?.domestic
                    ? card.loungeAccess.domestic.split("&")[0].trim()
                    : "Domestic"}
                </span>
                <span className="text-[10px] text-gray-500 font-montserrat block truncate mt-0.5">
                  Airport Privileges
                </span>
              </div>
            </div>

            {/* ── Primary CTA Action Row ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-7">
              <button
                type="button"
                onClick={() =>
                  openApplyModal(
                    card.name,
                    `${card.issuer} • ${card.badge || "Credit Card"}`
                  )
                }
                className="bg-primary hover:bg-[#035259] active:scale-[0.99] text-white font-montserrat font-bold text-sm sm:text-base py-4 px-8 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl shadow-primary/20 transition-all duration-200 cursor-pointer group"
              >
                <span>Apply Online Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("rewards-calculator");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    openApplyModal(card.name, "Check Pre-Approved Eligibility");
                  }
                }}
                className="bg-white hover:bg-gray-50 text-gray-800 font-montserrat font-bold text-xs sm:text-sm py-4 px-6 rounded-2xl border border-gray-200/90 hover:border-primary/40 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Percent className="w-4 h-4 text-gold" />
                <span>Calculate Your Savings</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-[11px] text-gray-500 font-montserrat">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                100% Paperless Digital Application
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                No Hidden Processing Fees
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Quick V-KYC within 5 Minutes
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
