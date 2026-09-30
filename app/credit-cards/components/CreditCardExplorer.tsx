"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Plane,
  CreditCard as CreditCardIcon,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  Crown,
  Percent,
  Gift,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  Tag,
  Briefcase,
  Utensils,
  Layers,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Info,
  Scale,
  ExternalLink,
  HelpCircle,
  TrendingUp,
  Award,
  AlertCircle,
  Building2,
  CheckCheck,
} from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";



// Fee parser for sorting and filtering
function parseFeeNumber(feeStr?: string): number {
  if (!feeStr) return 0;
  if (/nil|free|₹0|zero/i.test(feeStr)) return 0;
  const match = feeStr.replace(/,/g, "").match(/₹?\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Categories list
const CATEGORY_TABS = [
  { id: "all", label: "All Cards", icon: CreditCardIcon },
  { id: "popular", label: "Popular & Top Rated", icon: Crown },
  { id: "cashback", label: "Cashback & Shopping", icon: Percent },
  { id: "travel", label: "Travel & Airport Lounge", icon: Plane },
  { id: "dining", label: "Dining & Food", icon: Utensils },
  { id: "lifestyle", label: "Lifestyle & Luxury", icon: Gift },
  { id: "upi", label: "UPI & RuPay", icon: Zap },
  { id: "entry-level", label: "Lifetime Free & Entry", icon: Tag },
  { id: "business", label: "Business & Corporate", icon: Briefcase },
];

// Fee filter options
const FEE_FILTERS = [
  { id: "all", label: "All Annual Fees" },
  { id: "free", label: "Lifetime Free (₹0)" },
  { id: "under1k", label: "Under ₹1,000" },
  { id: "mid", label: "₹1,000 - ₹5,000" },
  { id: "premium", label: "₹5,000+" },
];

// Network filter options
const NETWORK_FILTERS = [
  { id: "all", label: "All Networks" },
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "rupay", label: "RuPay" },
  { id: "diners", label: "Diners Club" },
];




export default function CreditCardExplorer({ initialCards }: { initialCards: CardStructure[] }) {
  const { openApplyModal } = useApplyModal();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBank, setSelectedBank] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [sortBy, setSortBy] = useState<"popular" | "fee-asc" | "fee-desc" | "name-asc">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Pagination / Load more
  const [visibleCount, setVisibleCount] = useState(12);

  // Modals & Comparison
  const [selectedCardForModal, setSelectedCardForModal] = useState<CardStructure | null>(null);
  const [compareList, setCompareList] = useState<CardStructure[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Extract unique issuers from cards
  const uniqueBanks = useMemo(() => {
    const map = new Map<string, number>();
    initialCards.forEach((c) => {
      const issuer = c.issuer || "Other";
      map.set(issuer, (map.get(issuer) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [initialCards]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialCards.length };
    CATEGORY_TABS.forEach((cat) => {
      if (cat.id === "all") return;
      counts[cat.id] = initialCards.filter((card) => {
        if (cat.id === "entry-level") {
          return (
            (card.category || []).includes("entry-level") ||
            parseFeeNumber(card.annualFee) === 0 ||
            /nil|free|₹0/i.test(card.joiningFee)
          );
        }
        return (card.category || []).includes(cat.id);
      }).length;
    });
    return counts;
  }, [initialCards]);

  // Filter cards
  const filteredCards = useMemo(() => {
    return initialCards.filter((card) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = card.name.toLowerCase().includes(q);
        const matchesIssuer = card.issuer.toLowerCase().includes(q);
        const matchesBadge = (card.badge || "").toLowerCase().includes(q);
        const matchesDesc = (card.description || "").toLowerCase().includes(q);
        const matchesPerks = (card.keyHighlights || []).some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesIssuer && !matchesBadge && !matchesDesc && !matchesPerks) {
          return false;
        }
      }

      // 2. Category Tab
      if (selectedCategory !== "all") {
        if (selectedCategory === "entry-level") {
          const isEntry =
            (card.category || []).includes("entry-level") ||
            parseFeeNumber(card.annualFee) === 0 ||
            /nil|free|₹0/i.test(card.joiningFee);
          if (!isEntry) return false;
        } else if (!(card.category || []).includes(selectedCategory)) {
          return false;
        }
      }

      // 3. Bank / Issuer Filter
      if (selectedBank !== "all" && card.issuer !== selectedBank) {
        return false;
      }

      // 4. Annual Fee Filter
      if (selectedFee !== "all") {
        const fee = parseFeeNumber(card.annualFee);
        if (selectedFee === "free" && fee > 0) return false;
        if (selectedFee === "under1k" && (fee === 0 || fee >= 1000)) return false;
        if (selectedFee === "mid" && (fee < 1000 || fee > 5000)) return false;
        if (selectedFee === "premium" && fee <= 5000) return false;
      }

      // 5. Network Filter
      if (selectedNetwork !== "all") {
        const net = (card.network || "").toLowerCase();
        if (!net.includes(selectedNetwork)) return false;
      }

      return true;
    });
  }, [initialCards, searchQuery, selectedCategory, selectedBank, selectedFee, selectedNetwork]);

  // Sort cards
  const sortedCards = useMemo(() => {
    return [...filteredCards].sort((a, b) => {
      if (sortBy === "popular") {
        const rankA = a.popularRank ?? 999;
        const rankB = b.popularRank ?? 999;
        return rankA - rankB;
      }
      if (sortBy === "fee-asc") {
        return parseFeeNumber(a.annualFee) - parseFeeNumber(b.annualFee);
      }
      if (sortBy === "fee-desc") {
        return parseFeeNumber(b.annualFee) - parseFeeNumber(a.annualFee);
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filteredCards, sortBy]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCategory, selectedBank, selectedFee, selectedNetwork, sortBy]);

  // Visible cards slice
  const visibleCards = sortedCards.slice(0, visibleCount);

  // Comparison toggle
  const toggleCompare = (card: CardStructure) => {
    if (compareList.some((c) => c.id === card.id)) {
      setCompareList((prev) => prev.filter((c) => c.id !== card.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 cards at once. Remove one card to add another.");
        return;
      }
      setCompareList((prev) => [...prev, card]);
    }
  };

  const isFiltersActive =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedBank !== "all" ||
    selectedFee !== "all" ||
    selectedNetwork !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBank("all");
    setSelectedFee("all");
    setSelectedNetwork("all");
    setSortBy("popular");
  };

  return (
    <div className="w-full">
      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 md:px-8 bg-linear-to-b from-[#F3F0DF]/70 via-[#F3F0DF]/30 to-white overflow-hidden border-b border-[#DDE3C1]/60">

        {/* Ambient subtle glow lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">

          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 mb-5 font-montserrat">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-primary font-bold">Credit Cards</span>
          </nav>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>India&apos;s Most Comprehensive Credit Card Hub</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-bricolage font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-tight max-w-4xl mx-auto">
            Find the Best{" "}
            <span className="text-gold relative inline-block">
              Credit Cards
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-gold/25 rounded-full" />
            </span>{" "}
            in India ({initialCards.length}+ Cards)
          </h1>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-linear-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Compare annual fees, SmartBuy rewards, airport lounge access, UPI RuPay perks, and welcome benefits across 10+ major partner banks. 100% transparent and free.
          </p>

          {/* Quick stats pill strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mt-8">
            <div className="bg-white/80 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-[#DDE3C1] shadow-2xs">
              <span className="font-bricolage font-bold text-xl sm:text-2xl text-primary block">
                {initialCards.length}+
              </span>
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                Verified Cards
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-[#DDE3C1] shadow-2xs">
              <span className="font-bricolage font-bold text-xl sm:text-2xl text-gold block">
                10+
              </span>
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                Top Partner Banks
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-[#DDE3C1] shadow-2xs">
              <span className="font-bricolage font-bold text-xl sm:text-2xl text-emerald-700 block">
                33.3%
              </span>
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                Max Reward Rate
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-[#DDE3C1] shadow-2xs">
              <span className="font-bricolage font-bold text-xl sm:text-2xl text-primary block">
                ₹0
              </span>
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                Customer Fees
              </span>
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative flex items-center bg-white rounded-2xl shadow-md border border-gray-200/90 p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by card name, bank (e.g. HDFC, SBI, Axis), or perk (e.g. lounge, cashback)..."
                className="w-full px-3 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-montserrat"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── FILTER & EXPLORER SECTION ─────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">

        {/* ── Category Filter Tabs ───────────────────────────────────── */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 scrollbar-hidden">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            const count = categoryCounts[tab.id] ?? 0;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-montserrat text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 shadow-2xs ${isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-200"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Secondary Filters & Controls Bar ───────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mt-6 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

          {/* Dropdown Filters Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">

            {/* Bank Filter */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 font-montserrat">
                Issuing Bank
              </label>
              <div className="relative">
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat"
                >
                  <option value="all">All Banks ({initialCards.length})</option>
                  {uniqueBanks.map(([issuer, count]) => (
                    <option key={issuer} value={issuer}>
                      {issuer} ({count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Annual Fee Filter */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 font-montserrat">
                Annual Fee Range
              </label>
              <div className="relative">
                <select
                  value={selectedFee}
                  onChange={(e) => setSelectedFee(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat"
                >
                  {FEE_FILTERS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Network Filter */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 font-montserrat">
                Card Network
              </label>
              <div className="relative">
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat"
                >
                  {NETWORK_FILTERS.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Right Controls: Sort & View Mode & Reset */}
          <div className="flex items-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">

            {/* Sort Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 font-montserrat">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat"
                >
                  <option value="popular">Most Popular</option>
                  <option value="fee-asc">Annual Fee: Low to High</option>
                  <option value="fee-desc">Annual Fee: High to Low</option>
                  <option value="name-asc">Card Name (A-Z)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                  }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                  }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters Button */}
            {isFiltersActive && (
              <button
                onClick={clearAllFilters}
                className="py-2.5 px-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors flex items-center gap-1 font-montserrat cursor-pointer whitespace-nowrap"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

          </div>

        </div>

        {/* ── Results Count & Active Filter Tags ─────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-gray-600 font-montserrat">
          <p className="font-medium">
            Showing <strong className="text-gray-900 font-bold">{Math.min(visibleCards.length, sortedCards.length)}</strong> of{" "}
            <strong className="text-gray-900 font-bold">{sortedCards.length}</strong> matching cards
            {sortedCards.length < initialCards.length && ` (filtered from ${initialCards.length} total)`}
          </p>

          {/* Quick Clear Indicator if no results */}
          {sortedCards.length === 0 && (
            <div className="w-full py-16 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-300 mt-6">
              <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bricolage font-bold text-xl text-gray-800">No credit cards found</h3>
              <p className="text-xs text-gray-500 font-montserrat mt-1 max-w-md mx-auto">
                No cards match your current search or filter criteria. Try adjusting your filters or search keywords.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all cursor-pointer font-montserrat"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* ── CARDS DISPLAY: GRID VIEW ───────────────────────────────── */}
        {viewMode === "grid" && sortedCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {visibleCards.map((card, idx) => {
              const isCompared = compareList.some((c) => c.id === card.id);

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
                >
                  {/* Top Graphic Section */}
                  <div className="p-5 pb-3">

                    {/* Bank Row & Compare Checkbox */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-auto relative">
                          <Image
                            src={card.logo}
                            alt={card.issuer}
                            width={80}
                            height={24}
                            className="h-6 w-auto object-contain"
                          />
                        </div>
                      </div>

                      {/* Compare toggle */}
                      <button
                        onClick={() => toggleCompare(card)}
                        className={`text-[11px] font-bold font-montserrat px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${isCompared
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                          }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isCompared ? "Compared" : "Compare"}</span>
                      </button>
                    </div>

                    {/* Card Graphic Mockup */}
                    <div className={`relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden drop-shadow-lg drop-shadow-gray-100`}>
                      <Image
                        src={card.cardImage || ""}
                        alt={card.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>

                    {/* Badge & Title */}
                    <div className="mt-4">
                      {card.badge && (
                        <div className="inline-block text-[10px] font-bold text-primary bg-[#EBF4ED] px-2.5 py-0.5 rounded-full border border-primary/15 mb-2 truncate max-w-full">
                          {card.badge}
                        </div>
                      )}
                      <h3 className="font-bricolage font-bold text-lg text-gray-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {card.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-montserrat mt-0.5 truncate">
                        {card.categoryLabel || card.issuer} • {card.network}
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-gray-100">
                      <div className="bg-gray-50/90 rounded-xl p-2.5 border border-gray-100">
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                          Annual Fee
                        </span>
                        <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
                          {card.annualFee || "Nil"}
                        </span>
                      </div>
                      <div className="bg-gray-50/90 rounded-xl p-2.5 border border-gray-100">
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                          Reward Rate
                        </span>
                        <span className="text-xs font-bold text-emerald-700 font-montserrat block mt-0.5 truncate">
                          {card.rewardRate?.headline ? card.rewardRate.headline.slice(0, 26) : "Up to 5% Rewards"}
                        </span>
                      </div>
                    </div>

                    {/* Top Perk Highlights */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <ul className="space-y-1.5">
                        {(card.keyHighlights && card.keyHighlights.length > 0
                          ? card.keyHighlights.slice(0, 2)
                          : [card.description?.slice(0, 60) || "Reward points on all spends"]
                        ).map((perk, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 font-montserrat">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1 text-[11px] leading-tight">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCardForModal(card)}
                      className="flex-1 text-xs font-bold text-primary bg-white hover:bg-primary/5 py-2.5 px-3 rounded-xl border border-primary/20 transition-all text-center cursor-pointer font-montserrat shadow-2xs"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        openApplyModal(card.name, `${card.issuer} • ${card.badge || card.categoryLabel || "Credit Card"}`)
                      }
                      className="flex-1 text-xs font-bold text-white bg-primary hover:bg-primary/90 py-2.5 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1 group/btn cursor-pointer font-montserrat"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* ── CARDS DISPLAY: LIST VIEW ───────────────────────────────── */}
        {viewMode === "list" && sortedCards.length > 0 && (
          <div className="flex flex-col gap-4 mt-6">
            {visibleCards.map((card) => {
              const isCompared = compareList.some((c) => c.id === card.id);

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                >
                  {/* Left: Card Thumbnail & Bank Info */}
                  <div className="flex items-center gap-4 w-full md:w-1/3">
                    <div className="w-24 sm:w-28 shrink-0">
                      <div className={`relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gray-100`}>
                        <Image
                          src={card.cardImage || ''}
                          alt={card.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain transition-transform duration-500 hover:scale-[1.03]"

                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      {card.badge && (
                        <span className="inline-block text-[10px] font-bold text-primary bg-[#EBF4ED] px-2 py-0.5 rounded-full border border-primary/15 mb-1 truncate max-w-full">
                          {card.badge}
                        </span>
                      )}
                      <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors truncate">
                        {card.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-montserrat truncate">
                        {card.issuer} • {card.network}
                      </p>
                    </div>
                  </div>

                  {/* Center: Key Perks & Fee Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-5/12 text-left border-y md:border-y-0 md:border-x border-gray-100 py-3 md:py-0 md:px-4">
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                        Annual Fee
                      </span>
                      <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
                        {card.annualFee || "Nil"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                        Joining Fee
                      </span>
                      <span className="text-xs font-bold text-gray-900 font-montserrat block mt-0.5 truncate">
                        {card.joiningFee || "Nil"}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                        Reward Headline
                      </span>
                      <span className="text-xs font-bold text-emerald-700 font-montserrat block mt-0.5 truncate">
                        {card.rewardRate?.headline ? card.rewardRate.headline.slice(0, 20) : "Reward Points"}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => toggleCompare(card)}
                      className={`text-xs font-bold font-montserrat px-3 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${isCompared
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:text-primary"
                        }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{isCompared ? "Compared" : "Compare"}</span>
                    </button>
                    <button
                      onClick={() => setSelectedCardForModal(card)}
                      className="text-xs font-bold text-primary bg-white hover:bg-primary/5 py-2.5 px-3.5 rounded-xl border border-primary/20 transition-all font-montserrat cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        openApplyModal(card.name, `${card.issuer} • ${card.badge || "Credit Card"}`)
                      }
                      className="text-xs font-bold text-white bg-primary hover:bg-primary/90 py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center gap-1 font-montserrat cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* ── Load More Button ────────────────────────────────────────── */}
        {visibleCount < sortedCards.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="bg-white hover:bg-gray-50 text-primary border border-primary/30 font-bold font-montserrat text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Load More Credit Cards ({sortedCards.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── PRE-APPROVED VALUE BANNER ───────────────────────────────── */}
        <div className="mt-16 bg-linear-to-r from-primary via-[#04363a] to-primary rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-[#B6CC9A] mb-3">
              <ShieldCheck className="w-4 h-4 text-gold" />
              100% Free • No Impact on Credit Score
            </div>
            <h3 className="font-bricolage font-bold text-2xl sm:text-3xl text-white">
              Not sure which card is right for you?
            </h3>
            <p className="text-white/70 text-sm font-montserrat mt-2 leading-relaxed">
              Check your pre-approved credit card offers across 10+ partner banks instantly based on your income and spending preferences with zero paperwork.
            </p>
          </div>

          <div className="relative z-10 flex sm:flex-row flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() =>
                openApplyModal(
                  "Credit Card Pre-Approved Offers",
                  "Check pre-approved luxury, travel, and cashback credit cards tailored for you."
                )
              }
              className="bg-gold hover:bg-gold/90 text-white text-sm font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap font-montserrat"
            >
              Check Pre-Approved Offers
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── CREDIT CARD GUIDE & FAQ SECTION ──────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-bricolage font-bold text-2xl sm:text-3xl text-primary">
              Frequently Asked Questions About Credit Cards
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-2">
              Everything you need to know before applying for a credit card in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
              <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                What minimum credit score is needed for credit card approval?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-montserrat leading-relaxed">
                Most top banks prefer a CIBIL score of 720 or higher for standard and entry-level cards, while super-premium metal cards typically require 750+. However, if you are new to credit (score &lt; 0), you can start with a fixed-deposit backed credit card.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
              <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                What does &quot;Lifetime Free&quot; (LTF) credit card mean?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-montserrat leading-relaxed">
                A Lifetime Free credit card has ₹0 joining fee and ₹0 annual maintenance fee forever, with no spend conditions attached. You only pay for what you purchase or if you carry forward a balance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
              <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                How does RuPay UPI credit card integration work?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-montserrat leading-relaxed">
                RuPay credit cards can be linked directly to your favorite UPI apps (GPay, PhonePe, Paytm). You can scan any merchant QR code to pay using credit with up to 50 days of interest-free credit and earn reward points on merchant spends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
              <h4 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                Does checking eligibility on Grofi affect my credit score?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-montserrat leading-relaxed">
                No. Grofi performs a soft inquiry which has zero impact on your CIBIL score. A hard inquiry is only initiated when you officially proceed with a formal application through the partner bank.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ── FLOATING COMPARISON TRAY ─────────────────────────────────── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl border border-primary/20 flex items-center gap-3 sm:gap-4 max-w-lg w-[92%] animate-scaleUp">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Scale className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-900 font-montserrat">
                Compare Cards ({compareList.length}/3)
              </p>
              <p className="text-[10px] text-gray-500 font-montserrat truncate">
                {compareList.map((c) => c.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all font-montserrat cursor-pointer"
            >
              Compare Now
            </button>
            <button
              onClick={() => setCompareList([])}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── CARD DETAILS DEEP-DIVE MODAL ─────────────────────────────── */}
      {selectedCardForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedCardForModal(null)}
          />
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10">

            {/* Close Button */}
            <button
              onClick={() => setSelectedCardForModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-28 sm:w-36 shrink-0">
                <div className={`relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gray-100`}>
                  <Image
                    src={selectedCardForModal.cardImage || ''}
                    alt={selectedCardForModal.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/15 inline-block mb-2 font-montserrat">
                  {selectedCardForModal.issuer}
                </span>
                <h3 className="font-bricolage font-bold text-2xl text-gray-900 leading-tight">
                  {selectedCardForModal.name}
                </h3>
                <p className="text-xs text-gray-500 font-montserrat mt-1">
                  {selectedCardForModal.badge || selectedCardForModal.categoryLabel} • {selectedCardForModal.network}
                </p>
              </div>
            </div>

            {/* Welcome Benefit Callout */}
            {selectedCardForModal.welcomeBenefits && selectedCardForModal.welcomeBenefits.length > 0 && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider font-montserrat">
                  <Gift className="w-4 h-4 text-amber-600" />
                  Welcome Benefit
                </div>
                <p className="text-xs font-semibold text-amber-950 mt-1 font-montserrat leading-relaxed">
                  {selectedCardForModal.welcomeBenefits.join(" • ")}
                </p>
              </div>
            )}

            {/* Fee & Charges Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Joining Fee
                </span>
                <span className="text-xs font-bold text-gray-900 block mt-0.5 font-montserrat">
                  {selectedCardForModal.joiningFee}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Annual Fee
                </span>
                <span className="text-xs font-bold text-gray-900 block mt-0.5 font-montserrat">
                  {selectedCardForModal.annualFee}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Fee Waiver
                </span>
                <span className="text-xs font-bold text-gray-900 block mt-0.5 font-montserrat truncate" title={selectedCardForModal.feeWaiver || "None"}>
                  {selectedCardForModal.feeWaiver || "Not applicable"}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat">
                  Forex Markup
                </span>
                <span className="text-xs font-bold text-primary block mt-0.5 font-montserrat">
                  {selectedCardForModal.forexMarkup || "3.5% + GST"}
                </span>
              </div>
            </div>

            {/* Reward System Breakdown */}
            {selectedCardForModal.rewardRate && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider font-montserrat flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Reward Structure &amp; Redemption
                </h4>
                <div className="space-y-2 text-xs font-montserrat text-emerald-900">
                  {selectedCardForModal.rewardRate.headline && (
                    <p className="font-semibold text-emerald-950">
                      • {selectedCardForModal.rewardRate.headline}
                    </p>
                  )}
                  {selectedCardForModal.rewardRate.base && (
                    <p>
                      <strong>Base Rewards:</strong> {selectedCardForModal.rewardRate.base}
                    </p>
                  )}
                  {selectedCardForModal.rewardRate.accelerated && (
                    <p>
                      <strong>Accelerated Spends:</strong> {selectedCardForModal.rewardRate.accelerated}
                    </p>
                  )}
                  {selectedCardForModal.rewardRate.pointValue && (
                    <p>
                      <strong>Point Cash Value:</strong> {selectedCardForModal.rewardRate.pointValue} ({selectedCardForModal.rewardRate.rewardCurrency || "Reward Points"})
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Airport Lounge Privileges */}
            {selectedCardForModal.loungeAccess && (
              <div className="mb-6 p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80">
                <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wider font-montserrat flex items-center gap-1.5 mb-2">
                  <Plane className="w-4 h-4 text-sky-600" />
                  Airport Lounge Privileges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-montserrat text-sky-900">
                  <div>
                    <span className="font-bold block text-sky-950">Domestic Lounges:</span>
                    <p className="mt-0.5">{selectedCardForModal.loungeAccess.domestic || "Not available"}</p>
                  </div>
                  <div>
                    <span className="font-bold block text-sky-950">International Lounges:</span>
                    <p className="mt-0.5">{selectedCardForModal.loungeAccess.international || "Not available"}</p>
                  </div>
                  {selectedCardForModal.loungeAccess.spendCondition && (
                    <div className="col-span-1 sm:col-span-2 text-[11px] text-sky-700 bg-white/70 p-2 rounded-lg">
                      <strong>Spend Condition:</strong> {selectedCardForModal.loungeAccess.spendCondition}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key Highlights */}
            {selectedCardForModal.keyHighlights && selectedCardForModal.keyHighlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-montserrat">
                  Key Features &amp; Perks
                </h4>
                <ul className="space-y-2">
                  {selectedCardForModal.keyHighlights.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-montserrat">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pros & Cons */}
            {((selectedCardForModal.pros && selectedCardForModal.pros.length > 0) ||
              (selectedCardForModal.cons && selectedCardForModal.cons.length > 0)) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {selectedCardForModal.pros && selectedCardForModal.pros.length > 0 && (
                    <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-200">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-2 font-montserrat">
                        Pros
                      </span>
                      <ul className="space-y-1.5 text-xs text-emerald-900 font-montserrat">
                        {selectedCardForModal.pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedCardForModal.cons && selectedCardForModal.cons.length > 0 && (
                    <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-200">
                      <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-2 font-montserrat">
                        Cons &amp; Limitations
                      </span>
                      <ul className="space-y-1.5 text-xs text-rose-900 font-montserrat">
                        {selectedCardForModal.cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            {/* Editorial Verdict */}
            {selectedCardForModal.editorialVerdict && (
              <div className="mb-6 p-4 rounded-2xl bg-[#EBF4ED] border border-primary/20">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block font-montserrat">
                  Grofi Editorial Verdict
                </span>
                <p className="text-xs text-gray-800 font-montserrat mt-1 leading-relaxed">
                  {selectedCardForModal.editorialVerdict}
                </p>
                {selectedCardForModal.bestFor && (
                  <p className="text-[11px] text-gray-600 font-montserrat mt-2 font-semibold">
                    Best For: <span className="text-primary font-bold">{selectedCardForModal.bestFor}</span>
                  </p>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedCardForModal(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer font-montserrat"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const card = selectedCardForModal;
                  setSelectedCardForModal(null);
                  openApplyModal(card.name, `${card.issuer} • ${card.badge || "Credit Card"}`);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-3.5 rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-montserrat"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── SIDE-BY-SIDE COMPARISON MODAL ────────────────────────────── */}
      {isCompareModalOpen && compareList.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setIsCompareModalOpen(false)}
          />
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-scaleUp z-10">

            {/* Close */}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
                <Scale className="w-3.5 h-3.5 text-gold" />
                Side-by-Side Comparison
              </div>
              <h3 className="font-bricolage font-bold text-2xl text-gray-900">
                Compare Selected Cards ({compareList.length})
              </h3>
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-montserrat text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-3 font-bold text-gray-400 uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    {compareList.map((c) => (
                      <th key={c.id} className="py-3 px-3 font-bricolage font-bold text-sm text-gray-900 w-1/3">
                        <div className="w-24 mb-2">
                          <div className={`relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gray-100`}>
                            <Image
                              src={c.cardImage || ''}
                              alt={c.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain transition-transform duration-500 hover:scale-[1.03]"
                            />
                          </div>
                        </div>
                        {c.name}
                        <span className="block text-[11px] font-normal text-gray-500 font-montserrat">
                          {c.issuer}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Annual Fee</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 font-bold text-gray-900">
                        {c.annualFee}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Joining Fee</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 text-gray-800">
                        {c.joiningFee}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Fee Waiver</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 text-gray-700">
                        {c.feeWaiver || "None"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Reward Rate</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 font-bold text-emerald-700">
                        {c.rewardRate?.headline || "Standard rewards"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Domestic Lounge</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 text-gray-700">
                        {c.loungeAccess?.domestic || "None"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">International Lounge</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 text-gray-700">
                        {c.loungeAccess?.international || "None"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Forex Markup</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3 text-gray-800">
                        {c.forexMarkup || "3.5% + GST"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-gray-500">Action</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-3">
                        <button
                          onClick={() => {
                            setIsCompareModalOpen(false);
                            openApplyModal(c.name, `${c.issuer} • ${c.badge || "Credit Card"}`);
                          }}
                          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-all cursor-pointer font-montserrat whitespace-nowrap"
                        >
                          Apply Now
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 px-6 rounded-xl font-montserrat cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
