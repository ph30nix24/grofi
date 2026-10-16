"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { banksImgs, imageUrls } from "../utils";
import { useApplyModal } from "../context/ApplyModalContext";
import SearchBox from "./SearchBox";
import Link from "next/link";


const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    value: "50+",
    label: "Banks & NBFC",
    sub: "Partners",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    value: "100%",
    label: "Safe & Secure",
    sub: "Your Data is Protected",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    value: "2L+",
    label: "Happy Customers",
    sub: "Trust Grofi",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    value: "24/7",
    label: "Customer Support",
    sub: "We're Here to Help",
  },
];



function getPartnerBankName(src: string): string {
  const s = src.toLowerCase();
  if (s.includes("hdfc")) return "HDFC Bank";
  if (s.includes("axis")) return "Axis Bank";
  if (s.includes("bob") || s.includes("baroda")) return "Bank of Baroda";
  if (s.includes("yes")) return "YES BANK";
  if (s.includes("idfc")) return "IDFC FIRST Bank";
  if (s.includes("lic")) return "LIC Housing Finance";
  if (s.includes("sbi")) return "State Bank of India";
  if (s.includes("icici")) return "ICICI Bank";
  return "Partner Bank";
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Hero2() {
  const { openApplyModal } = useApplyModal();

  return (
    <div className="flex flex-col font-montserrat bg-linear-to-br from-[#F3F0DF] via-[#ECE9CF] to-[#DDE3C1] relative overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex-1">

        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large green blob top-center */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/4 w-96 sm:w-140 xl:w-175 h-96 sm:h-140 xl:h-175 rounded-full bg-[#B6CC9A]/25 blur-3xl" />
          {/* Gold arc bottom-left */}
          <div
            className="absolute -bottom-10 -left-15 w-44 sm:w-56 h-44 sm:h-56 rounded-full border-14 sm:border-20 border-[#C9AA3C]/15"
          />
        </div>

        {/* Main layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap xl:flex-nowrap items-center gap-8 xl:gap-4 pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 relative">

          {/* ── Column 1: left text ──────────────────────────────────────── */}
          <div className="w-full xl:w-[38%] shrink-0 flex flex-col gap-3.5 sm:gap-4 pb-2 sm:pb-8 z-30 relative items-start">

            <div className="w-fit text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-primary bg-[#b0cca65a] rounded-full px-3.5 sm:px-5 py-1 sm:py-1.5 border border-[#a5c490]/30 shadow-2xs">
              Your Financial Growth Partner
            </div>

            <h1 className="font-bricolage font-bold text-3xl sm:text-4xl md:text-5xl xl:text-[3.1rem] leading-[1.12] sm:leading-[1.08] text-primary tracking-tight">
              Smart choices <br className="hidden sm:inline" />today,{" "}
              <span className="text-gold">stronger <br className="hidden sm:inline" />tomorrow.</span>
              <span className="sr-only"> - Compare Credit Cards, Personal Loans, Home Loans &amp; Business Loans in India</span>
            </h1>

            <div className="w-12 sm:w-14 h-0.75 bg-gold rounded-full" />

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md xl:max-w-75">
              Explore the best credit cards, loans and financial products tailored to your needs.
              Compare, apply and grow with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center w-full sm:w-auto">
              <a
                href="#products"
                className="bg-primary text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-primary/90 shadow-md active:scale-95 transition-all cursor-pointer min-h-11"
              >
                <span>Explore Products</span> <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <button
                type="button"
                onClick={() => openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.")}
                className="border-2 border-gold text-gold text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-gold/10 active:scale-95 transition-all cursor-pointer min-h-11"
              >
                <span>Check Eligibility</span> <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Avatars */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-1">
              <div
                className="relative flex items-center shrink-0"
                style={{ width: `${imageUrls.length * 20 + 26}px`, height: 36 }}
              >
                {imageUrls.map((src, i) => (
                  <div
                    key={i}
                    className="absolute top-0 rounded-full border-2 border-[#F3F0DF] overflow-hidden shadow-xs"
                    style={{ left: i * 20, width: 36, height: 36, zIndex: i + 1 }}
                  >
                    <Image src={src} alt={`Grofi verified customer ${i + 1}`} width={36} height={36} className="w-full h-full object-cover object-top" />
                  </div>
                ))}
                <div
                  className="absolute flex items-center justify-center rounded-full bg-emerald-500 border-2 border-[#F3F0DF] shadow-xs"
                  style={{ left: imageUrls.length * 20 + 4, top: 9, width: 18, height: 18, zIndex: imageUrls.length + 2 }}
                >
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-700 font-medium">
                Trusted by <span className="text-primary font-bold text-sm">2L+</span> happy customers
              </p>
            </div>

            {/* Search */}
            <SearchBox
              placeholder="Search HDFC, SBI, Axis or card..."
              className="w-full max-w-md sm:max-w-lg mt-0.5"
            />
          </div>

          {/* ── Column 2: big hero image + ALL floating illustrations with arrows ─── */}
          <div className="w-full xl:w-[62%] shrink-0 relative flex items-center justify-center z-10 min-h-85 xs:min-h-[380px] sm:min-h-115 md:min-h-155 xl:min-h-160 my-2 sm:my-0">

            {/* Glow circle behind image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-60 xs:size-72 sm:size-100 md:size-115 xl:size-130 rounded-full bg-primary/[0.07]" />

            {/* ── Hero image ── */}
            <div className="relative z-20 size-48 xs:size-56 sm:size-80 md:size-105 xl:size-136 max-w-full">
              <Image
                src="/hero.png"
                alt="Grofi - India's Premier Financial Product Comparison Platform"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 420px, 544px"
                className="object-contain"
                priority
              />
            </div>

            {/* ════ Floating Illustrations with Directional Arrows ════ */}

            {/* TOP-LEFT illustration: Top Credit Cards */}
            <div className="absolute top-0 left-0 sm:top-2 sm:left-1 md:top-4 md:-left-4 xl:-left-8 z-30">
              <div className="relative animate-hero-float">
                <Link href={`/credit-cards`}
                  className="group relative block w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 cursor-pointer transition-all duration-300 hover:scale-108 hover:-translate-y-2 active:scale-95 filter drop-shadow-md hover:drop-shadow-2xl focus:outline-none rounded-2xl"
                  aria-label="Apply for Top Credit Cards"
                >
                  <Image
                    src="/hero/images/credit-cards-illustration.webp"
                    alt="Top Credit Cards"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1280px) 160px, 192px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>
                {/* arrow SVG pointing right+down toward hero image */}
                <svg
                  viewBox="0 0 100 50"
                  fill="none"
                  className="hidden md:block absolute left-[80%] top-[45%] w-24 h-12 md:w-28 md:h-14 xl:w-32 xl:h-16 pointer-events-none opacity-75"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="hero-arrow-tl"
                      viewBox="0 0 12 12"
                      refX="9"
                      refY="6"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto"
                    >
                      <path d="M 1 2 L 10 6 L 1 10 z" fill="#02474D" />
                    </marker>
                  </defs>
                  <path
                    d="M 6 12 Q 55 10 88 38"
                    stroke="#02474D"
                    strokeWidth="2.2"
                    strokeDasharray="5 3.5"
                    strokeLinecap="round"
                    markerEnd="url(#hero-arrow-tl)"
                  />
                </svg>
              </div>
            </div>

            {/* BOTTOM-LEFT illustration: Personal Loan */}
            <div className="absolute bottom-0 left-0 sm:bottom-3 sm:left-1 md:bottom-5 md:-left-4 xl:-left-6 z-30">
              <div className="relative animate-hero-float-delayed">
                <Link href={`/personal-loans`}
                  className="group relative block w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 cursor-pointer transition-all duration-300 hover:scale-108 hover:-translate-y-2 active:scale-95 filter drop-shadow-md hover:drop-shadow-2xl focus:outline-none rounded-2xl"
                  aria-label="Apply for Personal Loan"
                >
                  <Image
                    src="/hero/images/personal-loan-illustration.webp"
                    alt="Personal Loan"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1280px) 160px, 192px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>
                {/* arrow SVG pointing right+up toward hero image */}
                <svg
                  viewBox="0 0 100 50"
                  fill="none"
                  className="hidden md:block absolute left-[80%] top-[10%] w-24 h-12 md:w-28 md:h-14 xl:w-32 xl:h-16 pointer-events-none opacity-75"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="hero-arrow-bl"
                      viewBox="0 0 12 12"
                      refX="9"
                      refY="6"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto"
                    >
                      <path d="M 1 2 L 10 6 L 1 10 z" fill="#02474D" />
                    </marker>
                  </defs>
                  <path
                    d="M 6 38 Q 55 40 88 12"
                    stroke="#02474D"
                    strokeWidth="2.2"
                    strokeDasharray="5 3.5"
                    strokeLinecap="round"
                    markerEnd="url(#hero-arrow-bl)"
                  />
                </svg>
              </div>
            </div>

            {/* TOP-RIGHT illustration: Home Loan */}
            <div className="absolute top-0 right-0 sm:top-2 sm:right-1 md:top-4 md:-right-4 xl:-right-8 z-30">
              <div className="relative animate-hero-float-delayed">
                <Link href={`/home-loans`}
                  className="group relative block w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 cursor-pointer transition-all duration-300 hover:scale-108 hover:-translate-y-2 active:scale-95 filter drop-shadow-md hover:drop-shadow-2xl focus:outline-none rounded-2xl"
                  aria-label="Apply for Home Loan"
                >
                  <Image
                    src="/hero/images/home-illustration.webp"
                    alt="Home Loan"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1280px) 160px, 192px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>
                {/* arrow SVG pointing left+down toward hero image */}
                <svg
                  viewBox="0 0 100 50"
                  fill="none"
                  className="hidden md:block absolute right-[80%] top-[45%] w-24 h-12 md:w-28 md:h-14 xl:w-32 xl:h-16 pointer-events-none opacity-75"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="hero-arrow-tr"
                      viewBox="0 0 12 12"
                      refX="9"
                      refY="6"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto"
                    >
                      <path d="M 1 2 L 10 6 L 1 10 z" fill="#02474D" />
                    </marker>
                  </defs>
                  <path
                    d="M 94 12 Q 45 10 12 38"
                    stroke="#02474D"
                    strokeWidth="2.2"
                    strokeDasharray="5 3.5"
                    strokeLinecap="round"
                    markerEnd="url(#hero-arrow-tr)"
                  />
                </svg>
              </div>
            </div>

            {/* BOTTOM-RIGHT illustration: Business Loan */}
            <div className="absolute bottom-0 right-0 sm:bottom-3 sm:right-1 md:bottom-5 md:-right-4 xl:-right-6 z-30">
              <div className="relative animate-hero-float">
                <Link href={`/business-loans`}
                  className="group relative block w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 cursor-pointer transition-all duration-300 hover:scale-108 hover:-translate-y-2 active:scale-95 filter drop-shadow-md hover:drop-shadow-2xl focus:outline-none rounded-2xl"
                  aria-label="Apply for Business Loan"
                >
                  <Image
                    src="/hero/images/business-loan-illustration.webp"
                    alt="Business Loan"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1280px) 160px, 192px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>
                {/* arrow pointing left+up toward hero image */}
                <svg
                  viewBox="0 0 100 50"
                  fill="none"
                  className="hidden md:block absolute right-[80%] top-[10%] w-24 h-12 md:w-28 md:h-14 xl:w-32 xl:h-16 pointer-events-none opacity-75"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="hero-arrow-br"
                      viewBox="0 0 12 12"
                      refX="9"
                      refY="6"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto"
                    >
                      <path d="M 1 2 L 10 6 L 1 10 z" fill="#02474D" />
                    </marker>
                  </defs>
                  <path
                    d="M 94 38 Q 45 40 12 12"
                    stroke="#02474D"
                    strokeWidth="2.2"
                    strokeDasharray="5 3.5"
                    strokeLinecap="round"
                    markerEnd="url(#hero-arrow-br)"
                  />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6 relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-white/90 p-4 sm:p-5 md:px-8 md:py-5 grid grid-cols-2 md:flex md:flex-nowrap gap-3.5 sm:gap-4 md:gap-6">
            {stats.map((s) => (
              <div key={s.value} className="flex items-start gap-2.5 sm:gap-3.5 md:flex-1 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#EBF4ED] rounded-xl flex items-center justify-center shrink-0 text-primary">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    {s.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bricolage font-bold text-xl sm:text-2xl text-primary leading-tight">{s.value}</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-tight mt-0.5 truncate">{s.label}</p>
                  <p className="text-[9.5px] sm:text-[10px] text-gray-500 leading-tight truncate">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted Banking Partners ───────────────────────────────────── */}
      <div className="relative bg-primary/6 border-t border-primary/10 overflow-hidden py-4 sm:py-5">

        {/* Section label */}
        <p className="text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-primary/70 mb-3 sm:mb-4">
          Trusted Banking Partners
        </p>

        {/* Marquee track */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-8 sm:w-16 md:w-24 bg-linear-to-r from-[#D7DEC0] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-8 sm:w-16 md:w-24 bg-linear-to-l from-[#D7DEC0] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max items-center animate-marquee">
            {/* Set 1 */}
            <div className="flex items-center gap-3 sm:gap-5 pr-3 sm:pr-5 shrink-0">
              {[...banksImgs, ...banksImgs].map((src, i) => (
                <div
                  key={`b1-${i}`}
                  className="shrink-0 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xs sm:shadow-sm px-3.5 sm:px-5 py-2 sm:py-3 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  style={{ minWidth: 120, height: 50 }}
                >
                  <div className="relative w-full h-full">
                    <Image src={src} alt={`${getPartnerBankName(src)} partner logo`} fill className="object-contain" sizes="120px" />
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless loop) */}
            <div className="flex items-center gap-3 sm:gap-5 pr-3 sm:pr-5 shrink-0">
              {[...banksImgs, ...banksImgs].map((src, i) => (
                <div
                  key={`b2-${i}`}
                  className="shrink-0 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xs sm:shadow-sm px-3.5 sm:px-5 py-2 sm:py-3 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  style={{ minWidth: 120, height: 50 }}
                >
                  <div className="relative w-full h-full">
                    <Image src={src} alt={`${getPartnerBankName(src)} partner logo`} fill className="object-contain" sizes="120px" />
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
