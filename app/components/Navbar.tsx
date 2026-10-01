"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Coins,
  Briefcase,
  Home,
  FileText,
  Users,
  Sparkles,
  ShieldCheck,
  Plane,
  Tag,
  Gift,
  Zap,
} from "lucide-react";
import { useApplyModal } from "../context/ApplyModalContext";
import { navLinks } from "../utils";

// Bank logo helper mapping
function getBankLogo(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("hdfc")) return "/partners-logos/hdfc-logo.webp";
  if (l.includes("icici")) return "/partners-logos/icici-logo.webp";
  if (l.includes("sbi")) return "/partners-logos/sbi-logo.webp";
  if (l.includes("axis")) return "/partners-logos/axis-logo.webp";
  if (l.includes("bob") || l.includes("baroda")) return "/partners-logos/bob-logo.webp";
  if (l.includes("au")) return "/partners-logos/au-logo.webp";
  if (l.includes("indusind")) return "/partners-logos/indusind-logo.webp";
  if (l.includes("federal")) return "/partners-logos/federal-logo.webp";
  if (l.includes("idfc")) return "/partners-logos/idfc-logo.webp";
  if (l.includes("yes")) return "/partners-logos/yes-bank-logo.webp";
  if (l.includes("lic")) return "/partners-logos/lic-logo.webp";
  return "/partners-logos/hdfc-logo.webp";
}

// Bank display name formatter
function formatBankDisplayName(label: string): string {
  const clean = label.replace(/\s*Credit Card\s*/i, "").trim();
  if (clean.toLowerCase() === "bobcard") return "Bank of Baroda";
  if (!clean.toLowerCase().includes("bank")) return `${clean} Bank`;
  return clean;
}

// Icon helper for top-level nav links
function getNavLinkIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("card")) return CreditCard;
  if (l.includes("personal")) return Coins;
  if (l.includes("business")) return Briefcase;
  if (l.includes("home")) return Home;
  if (l.includes("blog")) return FileText;
  if (l.includes("career")) return Users;
  return Sparkles;
}

// Curated categories for the right column of the mega-menu
const CURATED_CATEGORIES = [
  {
    title: "Airport Lounge Access",
    desc: "Complimentary domestic & global lounge visits",
    icon: Plane,
    href: "/credit-cards",
    badge: "Travel",
  },
  {
    title: "Lifetime Free Cards",
    desc: "Zero joining & annual maintenance charges",
    icon: Tag,
    href: "/credit-cards",
    badge: "Zero Fee",
  },
  {
    title: "High Cashback & Rewards",
    desc: "Up to 5% direct cashback on shopping & bills",
    icon: Gift,
    href: "/credit-cards",
    badge: "Cashback",
  },
  {
    title: "RuPay UPI Credit Cards",
    desc: "Link to UPI & earn rewards on QR merchant payments",
    icon: Zap,
    href: "/credit-cards",
    badge: "UPI",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openApplyModal } = useApplyModal();

  // Scroll detection for dynamic elevation styling
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop mega menu states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedBankIdx, setSelectedBankIdx] = useState<number>(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Mobile menu drawer states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileNav, setExpandedMobileNav] = useState<string | null>("Credit Cards");
  const [expandedMobileBank, setExpandedMobileBank] = useState<string | null>(null);

  // Listen to window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dropdown mouse enter with cancellation of any pending close
  const handleMouseEnterDropdown = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  // Handle dropdown mouse leave with a comfortable grace period to prevent abrupt closing
  const handleMouseLeaveDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 450);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scrolling when mobile drawer is open
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

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      ref={dropdownRef}
      className={`sticky top-0 z-50 transition-all duration-300 font-montserrat ${isScrolled
          ? "bg-[#F3F0DF]/95 backdrop-blur-xl border-b border-[#DDE3C1] shadow-[0_4px_25px_-5px_rgba(2,71,77,0.08)] py-2 sm:py-2.5"
          : "bg-[#F3F0DF]/90 backdrop-blur-md border-b border-[#DDE3C1]/80 py-2.5 sm:py-3"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-14 sm:h-16 relative">

        {/* ── 1. Brand Logo ────────────────────────────────────────────── */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Grofi Home"
          >
            <Image
              src="/Grofi.png"
              width={160}
              height={52}
              className="w-28 sm:w-32 md:w-36 lg:w-38 xl:w-42 h-auto object-contain transition-all"
              alt="Grofi - Smart Financial Growth Partner"
              priority
            />
          </Link>
        </div>

        {/* ── 2. Desktop Navigation Links (with Mega Menu support) ─────── */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
          {navLinks.map((link) => {
            const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
            const isDropdownOpen = activeDropdown === link.label;
            const isActivePath =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            if (hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="static shrink-0"
                  onMouseEnter={() => handleMouseEnterDropdown(link.label)}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <Link
                    href={link.href}
                    onClick={() => setActiveDropdown(null)}
                    className={`inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-2 rounded-xl text-[13px] xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                      isDropdownOpen || isActivePath
                        ? "text-primary bg-white/80 shadow-2xs font-bold"
                        : "text-gray-700 hover:text-primary hover:bg-white/50"
                    }`}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="whitespace-nowrap">{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </Link>

                    {/* ── Desktop Mega Menu Dropdown ───────────────────────── */}
                    {isDropdownOpen && link.dropdown && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-full max-w-5xl z-50 animate-slideDown before:absolute before:-top-6 before:left-0 before:w-full before:h-8 before:content-['']"
                        onMouseEnter={() => handleMouseEnterDropdown(link.label)}
                        onMouseLeave={handleMouseLeaveDropdown}
                      >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#DDE3C1] shadow-2xl shadow-primary/15 p-6 overflow-hidden">

                          {/* Mega Menu Top Highlight Bar */}
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-[#EBF4ED] flex items-center justify-center text-primary">
                                <CreditCard className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bricolage font-bold text-gray-900 text-sm">
                                  Explore India&apos;s Best Credit Cards
                                </h4>
                                <p className="text-[11px] text-gray-500">
                                  80+ curated credit cards across 10 top partner banks
                                </p>
                              </div>
                            </div>

                            <Link
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-gold transition-colors group/all"
                            >
                              <span>Browse All Cards</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/all:translate-x-1" />
                            </Link>
                          </div>

                          {/* Mega Menu 3-Column Content Layout */}
                          <div className="grid grid-cols-12 gap-5">

                            {/* Column 1: Bank Selector List (4 cols) */}
                            <div className="col-span-4 bg-gray-50/70 rounded-2xl p-2 border border-gray-100 max-h-[380px] overflow-y-auto scrollbar-hidden space-y-1">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">
                                Partner Banks ({link.dropdown.length})
                              </p>
                              {link.dropdown.map((bank, idx) => {
                                const isSelected = selectedBankIdx === idx;
                                const logo = getBankLogo(bank.label);
                                const displayName = formatBankDisplayName(bank.label);
                                const subCount = bank.subItems?.length || 0;

                                return (
                                  <div
                                    key={bank.label}
                                    onMouseEnter={() => setSelectedBankIdx(idx)}
                                    className={`group/bank flex items-center justify-between p-2 rounded-xl transition-all duration-150 cursor-pointer ${isSelected
                                        ? "bg-white text-primary shadow-sm border border-[#DDE3C1]"
                                        : "hover:bg-white/60 text-gray-700"
                                      }`}
                                  >
                                    <Link
                                      href={bank.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center gap-2.5 flex-1 min-w-0"
                                    >
                                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1 shrink-0 shadow-2xs">
                                        <Image
                                          src={logo}
                                          alt={displayName}
                                          width={24}
                                          height={24}
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                      <div className="truncate">
                                        <p className="text-xs font-bold truncate group-hover/bank:text-primary">
                                          {displayName}
                                        </p>
                                        <span className="text-[10px] text-gray-400">
                                          {subCount} Popular Cards
                                        </span>
                                      </div>
                                    </Link>
                                    <ChevronRight
                                      className={`w-3.5 h-3.5 transition-transform shrink-0 ${isSelected ? "text-primary translate-x-0.5" : "text-gray-300"
                                        }`}
                                    />
                                  </div>
                                );
                              })}
                            </div>

                            {/* Column 2: Cards for Selected Bank (5 cols) */}
                            <div className="col-span-5 flex flex-col justify-between p-1">
                              <div>
                                {(() => {
                                  const currentBank = link.dropdown[selectedBankIdx] || link.dropdown[0];
                                  const currentDisplayName = formatBankDisplayName(currentBank.label);
                                  const cards = currentBank.subItems || [];

                                  return (
                                    <>
                                      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-md bg-white border border-gray-100 flex items-center justify-center p-0.5">
                                            <Image
                                              src={getBankLogo(currentBank.label)}
                                              alt={currentDisplayName}
                                              width={20}
                                              height={20}
                                              className="w-full h-full object-contain"
                                            />
                                          </div>
                                          <p className="font-bricolage font-bold text-sm text-gray-900">
                                            {currentDisplayName} Cards
                                          </p>
                                        </div>
                                        <Link
                                          href={currentBank.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="text-[11px] font-bold text-primary hover:text-gold transition-colors inline-flex items-center gap-1"
                                        >
                                          <span>View all</span>
                                          <ChevronRight className="w-3 h-3" />
                                        </Link>
                                      </div>

                                      {/* Sub-items grid */}
                                      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto scrollbar-hidden pr-1">
                                        {cards.length > 0 ? (
                                          cards.map((card) => (
                                            <Link
                                              key={card.label}
                                              href={card.href}
                                              onClick={() => setActiveDropdown(null)}
                                              className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#EBF4ED]/60 hover:border-primary/20 hover:shadow-2xs transition-all duration-150 flex flex-col gap-1 group/card"
                                            >
                                              <div className="flex items-center justify-between">
                                                <CreditCard className="w-3.5 h-3.5 text-gray-400 group-hover/card:text-primary transition-colors" />
                                                <ChevronRight className="w-3 h-3 text-gray-300 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all" />
                                              </div>
                                              <p className="text-xs font-semibold text-gray-800 group-hover/card:text-primary truncate">
                                                {card.label}
                                              </p>
                                            </Link>
                                          ))
                                        ) : (
                                          <div className="col-span-2 text-center py-8 text-gray-400 text-xs">
                                            No cards listed for this bank.
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>

                            {/* Column 3: Curated Categories & Pre-Approved Promo Box (3 cols) */}
                            <div className="col-span-3 flex flex-col justify-between gap-3 border-l border-gray-100 pl-4">
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                  Curated Categories
                                </p>
                                <div className="space-y-1.5">
                                  {CURATED_CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                      <Link
                                        key={cat.title}
                                        href={cat.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors group/cat"
                                      >
                                        <div className="w-6 h-6 rounded-lg bg-[#EBF4ED] flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover/cat:bg-primary group-hover/cat:text-white transition-colors">
                                          <Icon className="w-3 h-3" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs font-bold text-gray-800 group-hover/cat:text-primary truncate">
                                            {cat.title}
                                          </p>
                                          <p className="text-[10px] text-gray-400 truncate">
                                            {cat.desc}
                                          </p>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Mini Pre-approved Promo Card */}
                              <div className="bg-linear-to-br from-[#02474D] via-[#03363b] to-[#012f33] rounded-2xl p-3.5 text-white shadow-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gold/15 rounded-full blur-xl pointer-events-none" />
                                <div className="relative z-10">
                                  <div className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[9px] font-bold text-[#B6CC9A] mb-1.5">
                                    <Sparkles className="w-2.5 h-2.5 text-gold" />
                                    Zero CIBIL Impact
                                  </div>
                                  <h5 className="font-bricolage font-bold text-xs text-white leading-tight">
                                    Pre-Approved Card Offers
                                  </h5>
                                  <p className="text-[10px] text-white/70 mt-0.5 leading-snug">
                                    Instant eligibility check across 10+ partner banks.
                                  </p>
                                  <button
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      openApplyModal(
                                        "Credit Card",
                                        "Instant pre-approved credit card offers across top partner banks."
                                      );
                                    }}
                                    className="w-full mt-2.5 bg-gold hover:bg-gold/90 text-white font-bold text-[11px] py-1.5 px-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <span>Check Now</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    )}
                  </div>
              );
            }

            // Direct Navigation Links (No dropdown)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-[13px] xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${isActivePath
                    ? "text-primary bg-white/80 shadow-2xs font-bold"
                    : "text-gray-700 hover:text-primary hover:bg-white/50"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── 3. Right-Side Actions: CTA & Hamburger Toggle ─────────────── */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">

          {/* Primary CTA: Check Eligibility Button */}
          <button
            onClick={() =>
              openApplyModal(
                "General Pre-Approved Offers",
                "Instant eligibility check across 50+ partner banks."
              )
            }
            className="group/cta bg-primary hover:bg-primary/95 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-pointer whitespace-nowrap border border-[#C9AA3C]/30 hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold group-hover/cta:rotate-12 transition-transform duration-300" />
            <span>Check Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/cta:translate-x-0.5 transition-transform" />
          </button>

          {/* Hamburger Menu Toggle (< lg) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-primary flex items-center justify-center border border-[#DDE3C1] shadow-2xs transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ── 4. Mobile & Tablet Drawer Menu (< lg) ────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">

          {/* Dark frosted backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fadeIn transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in Drawer Container */}
          <div className="fixed top-0 right-0 w-full max-w-xs sm:max-w-sm h-full bg-[#F3F0DF] shadow-2xl z-100 flex flex-col border-l border-[#DDE3C1] animate-slideInRight font-montserrat">

            {/* Drawer Header */}
            <div className="p-5 flex items-center justify-between border-b border-[#DDE3C1] bg-white/40">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/Grofi.png"
                  width={130}
                  height={42}
                  className="w-28 h-auto object-contain"
                  alt="Grofi Logo"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center border border-[#DDE3C1] shadow-2xs transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">

              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Menu Navigation
              </div>

              {navLinks.map((link) => {
                const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
                const isNavExpanded = expandedMobileNav === link.label;
                const Icon = getNavLinkIcon(link.label);

                if (hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="rounded-2xl bg-white/70 border border-[#DDE3C1] overflow-hidden transition-all"
                    >
                      {/* Top accordion trigger */}
                      <button
                        onClick={() =>
                          setExpandedMobileNav(isNavExpanded ? null : link.label)
                        }
                        className="w-full flex items-center justify-between p-3.5 text-left text-gray-800 hover:text-primary font-bold text-sm cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#EBF4ED] flex items-center justify-center text-primary">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{link.label}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isNavExpanded ? "rotate-180 text-primary" : ""
                            }`}
                        />
                      </button>

                      {/* Expanded Banks List */}
                      {isNavExpanded && link.dropdown && (
                        <div className="px-3 pb-3 pt-1 border-t border-gray-100/80 space-y-1.5 animate-fadeIn">

                          {/* Quick link: All Cards */}
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl bg-primary/5 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-gold" />
                              Browse All Credit Cards
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {/* List of Partner Banks */}
                          {link.dropdown.map((bank) => {
                            const isBankExpanded = expandedMobileBank === bank.label;
                            const displayName = formatBankDisplayName(bank.label);
                            const logo = getBankLogo(bank.label);
                            const hasSubItems = Boolean(bank.subItems && bank.subItems.length > 0);

                            return (
                              <div
                                key={bank.label}
                                className="rounded-xl border border-gray-100 bg-white/90 overflow-hidden"
                              >
                                <div className="flex items-center justify-between p-2.5">
                                  <Link
                                    href={bank.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 flex-1 min-w-0"
                                  >
                                    <div className="w-6 h-6 rounded-md bg-white border border-gray-100 flex items-center justify-center p-0.5 shrink-0">
                                      <Image
                                        src={logo}
                                        alt={displayName}
                                        width={20}
                                        height={20}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <span className="text-xs font-bold text-gray-800 truncate">
                                      {displayName}
                                    </span>
                                  </Link>

                                  {hasSubItems && (
                                    <button
                                      onClick={() =>
                                        setExpandedMobileBank(isBankExpanded ? null : bank.label)
                                      }
                                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
                                      aria-label={`Toggle ${displayName} cards`}
                                    >
                                      <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform ${isBankExpanded ? "rotate-180 text-primary" : ""
                                          }`}
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* Bank Cards List */}
                                {isBankExpanded && bank.subItems && (
                                  <div className="px-3 pb-2.5 pt-1 border-t border-gray-50 bg-gray-50/50 space-y-1">
                                    {bank.subItems.map((sub) => (
                                      <Link
                                        key={sub.label}
                                        href={sub.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between py-1.5 px-2 rounded-lg text-[11px] font-medium text-gray-600 hover:text-primary hover:bg-white transition-colors"
                                      >
                                        <span className="truncate">{sub.label}</span>
                                        <ChevronRight className="w-3 h-3 text-gray-300" />
                                      </Link>
                                    ))}
                                    <Link
                                      href={bank.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block text-center py-1 text-[11px] font-bold text-primary hover:text-gold"
                                    >
                                      View All {displayName} Cards →
                                    </Link>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Direct nav link in mobile drawer
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/70 hover:bg-white text-gray-800 hover:text-primary font-bold text-sm border border-[#DDE3C1] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#EBF4ED] flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}

            </div>

            {/* Drawer Bottom Action & Trust Section */}
            <div className="p-5 border-t border-[#DDE3C1] bg-white/60 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openApplyModal(
                    "General Pre-Approved Offers",
                    "Instant eligibility check across 50+ partner banks."
                  );
                }}
                className="w-full bg-primary hover:bg-primary/95 text-white font-montserrat font-bold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Check Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free • Soft Inquiry • RBI Regulated Partners</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}