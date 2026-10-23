"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  CreditCard as CreditCardIcon,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  List,
  Scale,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { CardStructure } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import CardDetailsModal from "./CardDetailsModal";
import ComparisonModal from "./ComparisonModal";
import ComparisonDock from "./ComparisonDock";
import {
  CARDS_PER_PAGE,
  CATEGORY_TABS,
  FEE_FILTERS,
  NETWORK_FILTERS,
  parseFeeNumber,
  getPageNumbers,
  getBankLogoUrl,
  isFreeCard,
} from "./constants";
import Link from "next/link";

interface BankCardExplorerProps {
  initialCards: CardStructure[];
  bankName: string;
  bankSlug: string;
}

export default function BankCardExplorer({
  initialCards,
  bankName,
  bankSlug,
}: BankCardExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const cardsTopRef = useRef<HTMLDivElement>(null);

  // Search, Filter & Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [sortBy, setSortBy] = useState<"popular" | "fee-asc" | "fee-desc" | "name-asc">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals & Comparison state
  const [selectedCardForModal, setSelectedCardForModal] = useState<CardStructure | null>(null);
  const [compareList, setCompareList] = useState<CardStructure[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const bankLogoUrl = getBankLogoUrl(bankSlug, bankName, initialCards[0]?.logo);

  // Compute category counts for this bank
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
        const matchesIssuer = (card.issuer || "").toLowerCase().includes(q);
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

      // 3. Annual Fee Filter
      if (selectedFee !== "all") {
        const fee = parseFeeNumber(card.annualFee);
        if (selectedFee === "free" && fee > 0) return false;
        if (selectedFee === "under1k" && (fee === 0 || fee >= 1000)) return false;
        if (selectedFee === "mid" && (fee < 1000 || fee > 5000)) return false;
        if (selectedFee === "premium" && fee <= 5000) return false;
      }

      // 4. Network Filter
      if (selectedNetwork !== "all") {
        const net = (card.network || "").toLowerCase();
        if (!net.includes(selectedNetwork)) return false;
      }

      return true;
    });
  }, [initialCards, searchQuery, selectedCategory, selectedFee, selectedNetwork]);

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

  // Pagination calculations (6 cards per page)
  const totalPages = Math.max(1, Math.ceil(sortedCards.length / CARDS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * CARDS_PER_PAGE;
  const paginatedCards = sortedCards.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const boundedPage = Math.min(Math.max(1, newPage), totalPages);
    setCurrentPage(boundedPage);
    if (cardsTopRef.current) {
      cardsTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Compare toggling
  const toggleCompare = (card: CardStructure) => {
    if (compareList.some((c) => c.id === card.id)) {
      setCompareList((prev) => prev.filter((c) => c.id !== card.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 cards simultaneously. Remove one card to add another.");
        return;
      }
      setCompareList((prev) => [...prev, card]);
    }
  };

  const isFiltersActive =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedFee !== "all" ||
    selectedNetwork !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedFee("all");
    setSelectedNetwork("all");
    setSortBy("popular");
    setCurrentPage(1);
  };

  return (
    <section className="py-6 sm:py-12 md:py-16 px-2.5 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0 overflow-hidden">
      {/* ── Category Filter Tabs ───────────────────────────────────── */}
      <div className="w-full min-w-0 overflow-x-auto pb-2.5 scrollbar-hidden -mx-2.5 px-2.5 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 sm:gap-2 w-max sm:w-auto sm:justify-center">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            const count = categoryCounts[tab.id] ?? 0;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 min-h-8.5 sm:min-h-10.5 rounded-lg sm:rounded-xl font-montserrat text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 shadow-2xs active:scale-95 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-gold" : "text-gray-500"} shrink-0`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search, Filters & Controls Bar ─────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-2.5 sm:p-4 mt-4 sm:mt-6 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-4 w-full min-w-0">
        {/* Search input inside toolbar */}
        <div className="relative flex-1 min-w-0 sm:min-w-60">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Search ${bankName} cards by name or perk...`}
            className="w-full bg-gray-50 border border-gray-200 pl-9 sm:pl-10 pr-8 sm:pr-9 py-2 sm:py-2.5 min-h-9.5 sm:min-h-10 rounded-lg sm:rounded-xl text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white font-montserrat"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
              title="Clear search"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters Group (Mobile: 2 columns for Fee + Network, Sort full width) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full lg:flex-2">
          {/* Annual Fee Filter */}
          <div className="relative w-full col-span-1">
            <select
              value={selectedFee}
              onChange={(e) => {
                setSelectedFee(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by Annual Fee"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat pr-7 sm:pr-8"
            >
              {FEE_FILTERS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Network Filter */}
          <div className="relative w-full col-span-1">
            <select
              value={selectedNetwork}
              onChange={(e) => {
                setSelectedNetwork(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by Network"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat pr-7 sm:pr-8"
            >
              {NETWORK_FILTERS.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full col-span-2 sm:col-span-1">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "popular" | "fee-asc" | "fee-desc" | "name-asc");
                setCurrentPage(1);
              }}
              aria-label="Sort Cards"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white appearance-none cursor-pointer font-montserrat pr-7 sm:pr-8"
            >
              <option value="popular">Popularity &amp; Rank</option>
              <option value="fee-asc">Annual Fee: Low to High</option>
              <option value="fee-desc">Annual Fee: High to Low</option>
              <option value="name-asc">Card Name (A - Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right Toolbar: View Toggle & Clear Filters */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
          <div className="flex items-center bg-gray-100 p-0.5 sm:p-1 rounded-lg sm:rounded-xl shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 sm:p-2 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 flex items-center justify-center rounded-md sm:rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-primary shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="2-Column Grid (Default)"
              aria-label="2-Column Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 sm:p-2 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 flex items-center justify-center rounded-md sm:rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-primary shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {isFiltersActive && (
            <button
              onClick={clearAllFilters}
              className="py-1.5 sm:py-2 px-2.5 sm:px-3 min-h-8 sm:min-h-9 text-[11px] sm:text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl border border-red-200 transition-colors flex items-center gap-1 font-montserrat cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Quick Filter Pills for Instant Mobile/Desktop Scanning ── */}
      <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 overflow-x-auto pb-1 scrollbar-hidden">
        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 font-montserrat uppercase tracking-wider shrink-0 flex items-center gap-1">
          Quick:
        </span>
        <button
          onClick={() => {
            setSelectedFee(selectedFee === "free" ? "all" : "free");
            setCurrentPage(1);
          }}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold font-montserrat transition-all shrink-0 cursor-pointer ${
            selectedFee === "free"
              ? "bg-emerald-700 text-white shadow-2xs font-bold"
              : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60"
          }`}
        >
          Lifetime Free (₹0)
        </button>
        <button
          onClick={() => {
            setSelectedNetwork(selectedNetwork === "rupay" ? "all" : "rupay");
            setCurrentPage(1);
          }}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold font-montserrat transition-all shrink-0 cursor-pointer ${
            selectedNetwork === "rupay"
              ? "bg-primary text-white shadow-2xs font-bold"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          RuPay / UPI
        </button>
        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === "cashback" ? "all" : "cashback");
            setCurrentPage(1);
          }}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold font-montserrat transition-all shrink-0 cursor-pointer ${
            selectedCategory === "cashback"
              ? "bg-primary text-white shadow-2xs font-bold"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          Cashback
        </button>
        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === "travel" ? "all" : "travel");
            setCurrentPage(1);
          }}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold font-montserrat transition-all shrink-0 cursor-pointer ${
            selectedCategory === "travel"
              ? "bg-primary text-white shadow-2xs font-bold"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          Airport Lounge
        </button>
        {isFiltersActive && (
          <button
            onClick={clearAllFilters}
            className="text-[11px] text-red-600 hover:text-red-700 underline font-semibold font-montserrat shrink-0 ml-1 cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Results Count & Feedback ───────────────────────────────── */}
      <div ref={cardsTopRef} className="scroll-mt-6" />
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-xs text-gray-600 font-montserrat">
        <p className="font-medium text-[11px] sm:text-xs">
          Showing{" "}
          <strong className="text-gray-900 font-bold">
            {sortedCards.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + CARDS_PER_PAGE, sortedCards.length)}
          </strong>{" "}
          of <strong className="text-gray-900 font-bold">{sortedCards.length}</strong> {bankName} cards
          {sortedCards.length < initialCards.length && ` (filtered)`}
          {totalPages > 1 && ` • Page ${safePage} of ${totalPages}`}
        </p>

        {sortedCards.length === 0 && (
          <div className="w-full py-12 sm:py-16 px-4 text-center bg-white rounded-2xl sm:rounded-3xl border border-dashed border-gray-300 mt-6 shadow-xs">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bricolage font-bold text-xl text-gray-800">
              No {bankName} cards match your criteria
            </h3>
            <p className="text-xs text-gray-500 font-montserrat mt-1 max-w-md mx-auto">
              No cards match your current search or filter criteria. Try adjusting your filters or search keywords.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all cursor-pointer font-montserrat inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* ── CARDS DISPLAY: GRID VIEW (2 AT A TIME ON MOBILE) ────────────── */}
      {viewMode === "grid" && sortedCards.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6 mt-4 sm:mt-6">
          {paginatedCards.map((card) => {
            const isCompared = compareList.some((c) => c.id === card.id);
            const isFree = isFreeCard(card);

            return (
              <div
                key={card.id}
                className="w-full bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative hover:-translate-y-1"
              >
                {/* Top Section */}
                <div className="p-2 sm:p-4 sm:pb-3 flex-1 flex flex-col">
                  {/* Header: Bank Logo + Compare Action */}
                  <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <div className="h-4 sm:h-6 w-auto max-w-12 sm:max-w-20 relative shrink-0">
                      <Image
                        src={card.logo || bankLogoUrl}
                        alt={card.issuer}
                        width={80}
                        height={24}
                        className="h-4 sm:h-6 w-auto object-contain"
                      />
                    </div>

                    <button
                      onClick={() => toggleCompare(card)}
                      className={`text-[10px] sm:text-[11px] font-bold font-montserrat px-1.5 sm:px-3 py-1 sm:py-1.5 min-h-7 sm:min-h-9 rounded-md sm:rounded-lg border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                        isCompared
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                      }`}
                      title={isCompared ? "Remove from comparison" : "Add to comparison"}
                      aria-label={`${isCompared ? "Remove" : "Add"} ${card.name} ${isCompared ? "from" : "to"} comparison`}
                    >
                      <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="hidden min-[420px]:inline">{isCompared ? "Compared" : "Compare"}</span>
                      <span className="inline min-[420px]:hidden">{isCompared ? "✓" : "+"}</span>
                    </button>
                  </div>

                  {/* Card Graphic Mockup */}
                  <div className="relative w-full aspect-[1.586/1] rounded-lg sm:rounded-xl overflow-hidden drop-shadow-xs sm:drop-shadow-md bg-linear-to-b from-gray-50 to-gray-100">
                    {card.cardImage ? (
                      <Link
                        href={`/credit-cards/${bankSlug}/${card.id}`}
                        className="block relative w-full h-full"
                        title={card.name}
                      >
                        <Image
                          src={card.cardImage}
                          alt={card.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`/credit-cards/${bankSlug}/${card.id}`}
                        className="block relative w-full h-full"
                        title={card.name}
                      >
                        <div className="w-full h-full bg-linear-to-tr from-primary to-[#035259] flex items-center justify-center p-2.5 sm:p-4 text-white text-center">
                          <div>
                            <CreditCardIcon className="w-6 h-6 sm:w-9 sm:h-9 mx-auto text-gold mb-1 sm:mb-2" />
                            <p className="font-bricolage font-bold text-[10px] sm:text-xs leading-tight line-clamp-2">
                              {card.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* Badge & Title */}
                  <div className="mt-2 sm:mt-3 min-w-0 flex-1">
                    {card.badge && (
                      <div className="inline-block text-[9px] sm:text-[10px] font-bold text-primary bg-[#EBF4ED] px-1.5 sm:px-2 py-0.5 rounded-md border border-primary/15 mb-1 sm:mb-1.5 truncate max-w-full">
                        {card.badge}
                      </div>
                    )}
                    <Link href={`/credit-cards/${bankSlug}/${card.id}`} className="block group/title">
                      <h3 className="font-bricolage font-bold text-xs sm:text-base lg:text-lg text-gray-900 leading-snug line-clamp-2 min-h-[2.4em] sm:min-h-[2.8em] group-hover/title:text-primary transition-colors">
                        {card.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-montserrat mt-0.5 truncate">
                      {card.network} {card.categoryLabel ? `• ${card.categoryLabel}` : ""}
                    </p>
                  </div>

                  {/* Key Metrics Grid: Annual Fee & Reward Rate */}
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-gray-100">
                    <div className="bg-gray-50/90 rounded-md sm:rounded-xl p-1 sm:p-2 sm:px-2.5 border border-gray-100 min-w-0">
                      <span className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat truncate">
                        Fee
                      </span>
                      <span
                        className={`text-[11px] sm:text-xs font-bold font-montserrat block mt-0.5 truncate ${
                          isFree ? "text-emerald-700 font-extrabold" : "text-gray-900"
                        }`}
                      >
                        {card.annualFee || "Nil"}
                      </span>
                    </div>
                    <div className="bg-gray-50/90 rounded-md sm:rounded-xl p-1 sm:p-2 sm:px-2.5 border border-gray-100 min-w-0">
                      <span className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat truncate">
                        Rewards
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-emerald-700 font-montserrat block mt-0.5 truncate">
                        {card.rewardRate?.headline
                          ? card.rewardRate.headline.slice(0, 18)
                          : "Up to 5% Rewards"}
                      </span>
                    </div>
                  </div>

                  {/* Top Highlights (1 on mobile, 2 on tablet/desktop) */}
                  <div className="mt-2 sm:mt-2.5 pt-2 border-t border-gray-100">
                    <ul className="space-y-1 sm:space-y-1.5">
                      {(card.keyHighlights && card.keyHighlights.length > 0
                        ? card.keyHighlights.slice(0, 2)
                        : [card.description?.slice(0, 50) || "Top privileges on all card spends"]
                      ).map((perk, i) => (
                        <li
                          key={i}
                          className={`items-start gap-1 sm:gap-1.5 text-gray-600 font-montserrat ${
                            i > 0 ? "hidden sm:flex" : "flex"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 text-[10px] sm:text-[11px] leading-tight min-w-0 flex-1">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-2 sm:p-3 sm:pb-3.5 bg-gray-50/80 border-t border-gray-100 flex flex-col gap-1.5 sm:gap-2">
                  <button
                    onClick={() =>
                      openApplyModal(
                        card.name,
                        `${card.issuer} • ${card.badge || card.categoryLabel || "Credit Card"}`
                      )
                    }
                    className="w-full min-h-8.5 sm:min-h-10 text-[11px] sm:text-xs font-bold text-white bg-primary hover:bg-primary/90 py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 group/btn cursor-pointer font-montserrat active:scale-[0.98]"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>

                  <button
                    onClick={() => setSelectedCardForModal(card)}
                    className="w-full min-h-6.5 sm:min-h-8 text-[10px] sm:text-xs font-semibold text-primary bg-white hover:bg-primary/5 py-1 px-2 rounded-lg sm:rounded-xl border border-primary/20 transition-all text-center cursor-pointer font-montserrat shadow-2xs"
                  >
                    Card Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CARDS DISPLAY: LIST VIEW ───────────────────────────────── */}
      {viewMode === "list" && sortedCards.length > 0 && (
        <div className="flex flex-col gap-3.5 sm:gap-4 mt-5 sm:mt-6">
          {paginatedCards.map((card) => {
            const isCompared = compareList.some((c) => c.id === card.id);
            const isFree = isFreeCard(card);

            return (
              <div
                key={card.id}
                className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-lg transition-all p-3 sm:p-5 lg:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-6"
              >
                {/* Left: Thumbnail */}
                <div className="w-full sm:w-44 md:w-56 shrink-0">
                  <div className="relative w-full aspect-[1.586/1] rounded-lg sm:rounded-xl overflow-hidden drop-shadow-xs bg-linear-to-b from-gray-50 to-gray-100">
                    {card.cardImage ? (
                      <Link
                        href={`/credit-cards/${bankSlug}/${card.id}`}
                        className="block relative w-full h-full"
                        title={card.name}
                      >
                        <Image
                          src={card.cardImage}
                          alt={card.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 240px"
                          className="object-contain"
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`/credit-cards/${bankSlug}/${card.id}`}
                        className="block relative w-full h-full"
                        title={card.name}
                      >
                        <div className="w-full h-full bg-linear-to-tr from-primary to-[#035259] flex items-center justify-center text-white p-3 text-center">
                          <p className="font-bricolage font-bold text-xs">{card.name}</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-montserrat">
                      {card.network}
                    </span>
                    {card.badge && (
                      <span className="text-[10px] font-bold text-primary bg-[#EBF4ED] px-2.5 py-0.5 rounded-full border border-primary/15 font-montserrat truncate max-w-full">
                        {card.badge}
                      </span>
                    )}
                    {card.categoryLabel && (
                      <span className="text-[10px] font-medium text-gray-500 font-montserrat">
                        • {card.categoryLabel}
                      </span>
                    )}
                  </div>

                  <Link href={`/credit-cards/${bankSlug}/${card.id}`} className="block group/title">
                    <h3 className="font-bricolage font-bold text-base sm:text-xl text-gray-900 leading-snug group-hover/title:text-primary transition-colors">
                      {card.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-600 font-montserrat mt-1 line-clamp-2 leading-relaxed">
                    {card.description ||
                      "Earn accelerated rewards, milestone privileges, and fuel surcharge waivers on all card transactions."}
                  </p>

                  <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {(card.keyHighlights || []).slice(0, 3).map((perk, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-700 bg-gray-50 border border-gray-100 px-2 sm:px-2.5 py-1 rounded-lg font-montserrat max-w-full"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-40 sm:max-w-60">{perk}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Fees & Action Buttons */}
                <div className="w-full md:w-60 shrink-0 flex flex-col justify-between pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-5">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="min-w-0">
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat truncate">
                        Annual Fee
                      </span>
                      <span
                        className={`text-xs font-bold font-montserrat block mt-0.5 truncate ${
                          isFree ? "text-emerald-700 font-extrabold" : "text-gray-900"
                        }`}
                      >
                        {card.annualFee || "Nil"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block font-montserrat truncate">
                        Reward Rate
                      </span>
                      <span className="text-xs font-bold text-emerald-700 font-montserrat block mt-0.5 truncate">
                        {card.rewardRate?.headline?.slice(0, 18) || "Top Rewards"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <button
                      onClick={() =>
                        openApplyModal(
                          card.name,
                          `${card.issuer} • ${card.badge || "Credit Card"}`
                        )
                      }
                      className="w-full min-h-9 sm:min-h-10 text-xs font-bold text-white bg-primary hover:bg-primary/90 py-2 sm:py-2.5 px-3 rounded-lg sm:rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer font-montserrat active:scale-[0.98]"
                    >
                      <span>Apply Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCardForModal(card)}
                        className="flex-1 min-h-8 sm:min-h-9 text-xs font-bold text-primary bg-white hover:bg-gray-50 py-1.5 px-2.5 rounded-lg sm:rounded-xl border border-gray-200 transition-colors font-montserrat text-center cursor-pointer shadow-2xs"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => toggleCompare(card)}
                        className={`min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-colors cursor-pointer shrink-0 flex items-center justify-center ${
                          isCompared
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-white text-gray-500 border-gray-200 hover:text-primary"
                        }`}
                        title={isCompared ? "Remove from comparison" : "Compare"}
                        aria-label="Compare"
                      >
                        <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── PAGINATION CONTROLS (6 cards per page) ─────────────────── */}
      {totalPages > 1 && (
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="text-xs text-gray-500 font-montserrat text-center sm:text-left">
            Showing{" "}
            <strong className="text-gray-900 font-bold">
              {startIndex + 1}–{Math.min(startIndex + CARDS_PER_PAGE, sortedCards.length)}
            </strong>{" "}
            of <strong className="text-gray-900 font-bold">{sortedCards.length}</strong> {bankName} cards
            {" "}(Page {safePage} of {totalPages})
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage <= 1}
              className={`flex items-center gap-1 min-h-9.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold font-montserrat transition-all ${
                safePage <= 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-200 shadow-2xs cursor-pointer active:scale-[0.98]"
              }`}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1">
              {getPageNumbers(safePage, totalPages).map((pageNum, idx) => {
                if (typeof pageNum === "string") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-1.5 sm:px-2 py-1 text-xs text-gray-400 font-montserrat select-none"
                    >
                      ...
                    </span>
                  );
                }

                const isActive = pageNum === safePage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-9 h-9 sm:min-w-10 sm:h-10 min-h-9 px-1.5 sm:px-2 rounded-lg sm:rounded-xl text-xs font-bold font-montserrat transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary"
                        : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-200 shadow-2xs"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              className={`flex items-center gap-1 min-h-9.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold font-montserrat transition-all ${
                safePage >= totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-200 shadow-2xs cursor-pointer active:scale-[0.98]"
              }`}
              aria-label="Next Page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      )}

      {/* ── Comparison Floating Dock ── */}
      <ComparisonDock
        compareList={compareList}
        onRemove={toggleCompare}
        onClear={() => setCompareList([])}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* ── Modals ── */}
      <CardDetailsModal
        card={selectedCardForModal}
        onClose={() => setSelectedCardForModal(null)}
      />

      <ComparisonModal
        isOpen={isCompareModalOpen}
        cards={compareList}
        bankName={bankName}
        onClose={() => setIsCompareModalOpen(false)}
      />
    </section>
  );
}
