"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Filter,
  ArrowUpDown,
  Sparkles,
  Zap,
  Building2,
  TrendingDown,
  Percent,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  Scale,
} from "lucide-react";
import { PersonalLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import PersonalLoanCompareDock from "./PersonalLoanCompareDock";
import PersonalLoanCompareModal from "./PersonalLoanCompareModal";
import PersonalLoanDetailModal from "./PersonalLoanDetailModal";
import Link from "next/link";

interface PersonalLoanExplorerProps {
  initialLenders: PersonalLoanLender[];
}

export default function PersonalLoanExplorer({ initialLenders }: PersonalLoanExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch = searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBankType, setSelectedBankType] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [selectedLoanAmount, setSelectedLoanAmount] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rate-asc" | "amount-desc" | "emi-asc" | "speed-asc" | "rating-desc">("rate-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<PersonalLoanLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] = useState<PersonalLoanLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Lenders", icon: Building2 },
    { id: "lowest-rate", label: "Lowest Rates (< 10.5%)", icon: TrendingDown },
    { id: "instant", label: "Instant Disbursals", icon: Zap },
    { id: "salaried", label: "Salaried Professionals", icon: Sparkles },
    { id: "psu", label: "PSU Banks", icon: Building2 },
    { id: "nbfc", label: "Top NBFCs", icon: Percent },
  ];

  // Disbursal speed priority helper for sorting
  const getDisbursalRank = (timeStr?: string): number => {
    if (!timeStr) return 99;
    const l = timeStr.toLowerCase();
    if (l.includes("10 sec") || l.includes("3 sec") || l.includes("second") || l.includes("instant")) return 1;
    if (l.includes("minute") || l.includes("20 min")) return 2;
    if (l.includes("1 hour") || l.includes("4 hour") || l.includes("under")) return 3;
    if (l.includes("same day") || l.includes("24 hr")) return 4;
    return 5;
  };

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category check
      if (selectedCategory !== "all") {
        if (selectedCategory === "lowest-rate") {
          const minRate = lender.interestRate?.min ?? 99;
          if (minRate > 10.5 && !lender.category.includes("lowest-rate")) return false;
        } else if (selectedCategory === "instant") {
          if (!lender.category.includes("instant")) return false;
        } else if (selectedCategory === "salaried") {
          if (!lender.category.includes("salaried")) return false;
        } else if (selectedCategory === "psu") {
          if (lender.bankType !== "psu" && !lender.category.includes("psu")) return false;
        } else if (selectedCategory === "nbfc") {
          if (lender.bankType !== "nbfc" && !lender.category.includes("nbfc")) return false;
        }
      }

      // Bank Type check
      if (selectedBankType !== "all") {
        if (lender.bankType?.toLowerCase() !== selectedBankType.toLowerCase()) {
          return false;
        }
      }

      // Min CIBIL check
      if (selectedMinCibil !== "all") {
        const threshold = parseInt(selectedMinCibil, 10);
        if (lender.minCreditScore > threshold) return false;
      }

      // Max Loan Amount check
      if (selectedLoanAmount !== "all") {
        const minLakhs = parseInt(selectedLoanAmount, 10);
        const amountNum = lender.maxAmountNum || 0;
        if (amountNum < minLakhs * 100000) return false;
      }

      // Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = lender.name.toLowerCase().includes(q);
        const matchesTagline = lender.tagline.toLowerCase().includes(q);
        const matchesType = (lender.bankType || "").toLowerCase().includes(q);
        const matchesFeatures = lender.features.some((f) => f.toLowerCase().includes(q));
        const matchesAliases = lender.aliases?.some((a) => a.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesType && !matchesFeatures && !matchesAliases) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "rate-asc") {
        const rateA = a.interestRate?.min ?? 99;
        const rateB = b.interestRate?.min ?? 99;
        return rateA - rateB;
      }
      if (sortBy === "amount-desc") {
        return (b.maxAmountNum || 0) - (a.maxAmountNum || 0);
      }
      if (sortBy === "emi-asc") {
        return a.startingEmiPerLakh - b.startingEmiPerLakh;
      }
      if (sortBy === "speed-asc") {
        return getDisbursalRank(a.disbursalTime) - getDisbursalRank(b.disbursalTime);
      }
      if (sortBy === "rating-desc") {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
      return 0;
    });

    return list;
  }, [
    initialLenders,
    selectedCategory,
    selectedBankType,
    selectedMinCibil,
    selectedLoanAmount,
    searchQuery,
    sortBy,
  ]);

  // Pagination calculations (6 items per page)
  const totalItems = filteredAndSortedLenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = useMemo(() => {
    return filteredAndSortedLenders.slice(startIndex, endIndex);
  }, [filteredAndSortedLenders, startIndex, endIndex]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("lenders-list-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Comparison toggle
  const toggleCompare = (lender: PersonalLoanLender) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === lender.id);
      if (exists) {
        return prev.filter((item) => item.id !== lender.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 lenders at a time.");
        return prev;
      }
      return [...prev, lender];
    });
  };

  const isCompared = (id: string) => compareList.some((item) => item.id === id);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBankType("all");
    setSelectedMinCibil("all");
    setSelectedLoanAmount("all");
    setSortBy("rate-asc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedBankType !== "all" ||
    selectedMinCibil !== "all" ||
    selectedLoanAmount !== "all";

  return (
    <section id="lenders-list-section" className="py-8 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Verified Lender Marketplace</span>
            </div>
            <h2 className="font-bricolage font-bold text-xl sm:text-4xl text-gray-900 tracking-tight">
              Compare &amp; Apply for <span className="text-primary">Personal Loans</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Showing {totalItems > 0 ? `${startIndex + 1}–${endIndex} of ${totalItems}` : "0"} partner lenders
              {totalPages > 1 && ` • Page ${safeCurrentPage} of ${totalPages}`}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-bold text-gray-600 mr-1 hidden sm:inline">View:</span>
            <div className="bg-gray-100 p-0.5 sm:p-1 rounded-lg sm:rounded-xl flex items-center gap-1 border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md sm:rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-primary shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="2-Column Grid (Default)"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md sm:rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-primary shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="List View"
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex gap-1.5 sm:gap-2 pb-2 overflow-x-auto scrollbar-hidden mb-4 sm:mb-6 -mx-2.5 px-2.5 sm:mx-0 sm:px-0">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 min-h-8.5 sm:min-h-10 rounded-lg sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar: 2x2 grid on mobile, 12 cols on desktop */}
        <div className="bg-white rounded-xl sm:rounded-3xl p-3 sm:p-5 border border-gray-200/90 shadow-sm mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 items-center">
            
            {/* Search Input */}
            <div className="col-span-2 lg:col-span-4 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search bank name, NBFC, or features..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-8 sm:pr-9 py-2 sm:py-2.5 min-h-9.5 sm:min-h-10 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-montserrat"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bank Type Dropdown */}
            <div className="col-span-1 lg:col-span-2 relative">
              <select
                value={selectedBankType}
                onChange={(e) => {
                  setSelectedBankType(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Bank Type"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer pr-7 sm:pr-8"
              >
                <option value="all">All Bank Types</option>
                <option value="private">Private Banks</option>
                <option value="psu">PSU Banks</option>
                <option value="nbfc">NBFCs</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Min Loan Limit */}
            <div className="col-span-1 lg:col-span-2 relative">
              <select
                value={selectedLoanAmount}
                onChange={(e) => {
                  setSelectedLoanAmount(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Loan Amount"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer pr-7 sm:pr-8"
              >
                <option value="all">Any Loan Amount</option>
                <option value="30">Min ₹30L Limit</option>
                <option value="40">Min ₹40L Limit</option>
                <option value="50">Min ₹50L Limit</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Min CIBIL */}
            <div className="col-span-1 lg:col-span-2 relative">
              <select
                value={selectedMinCibil}
                onChange={(e) => {
                  setSelectedMinCibil(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by CIBIL Score"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer pr-7 sm:pr-8"
              >
                <option value="all">Any CIBIL Score</option>
                <option value="650">CIBIL 650+</option>
                <option value="700">CIBIL 700+</option>
                <option value="720">CIBIL 720+</option>
                <option value="750">CIBIL 750+</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="col-span-1 lg:col-span-2 relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(
                    e.target.value as
                      | "rate-asc"
                      | "amount-desc"
                      | "emi-asc"
                      | "speed-asc"
                      | "rating-desc"
                  );
                  setCurrentPage(1);
                }}
                aria-label="Sort Lenders"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-9 sm:min-h-10 text-[11px] sm:text-xs font-bold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer pr-7 sm:pr-8"
              >
                <option value="rate-asc">Lowest Rate</option>
                <option value="amount-desc">Highest Limit</option>
                <option value="emi-asc">Lowest EMI</option>
                <option value="speed-asc">Fastest Disbursal</option>
                <option value="rating-desc">Highest Rating</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>

          {/* Active filter count & reset */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <div className="flex flex-wrap items-center gap-1.5">
                <span>Active filters:</span>
                {selectedCategory !== "all" && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[11px]">
                    {categoryTabs.find((t) => t.id === selectedCategory)?.label}
                  </span>
                )}
                {selectedBankType !== "all" && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[11px] uppercase">
                    {selectedBankType}
                  </span>
                )}
                {selectedLoanAmount !== "all" && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[11px]">
                    ≥ ₹{selectedLoanAmount}L
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[11px]">
                    &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>

              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1 text-primary hover:underline font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all</span>
              </button>
            </div>
          )}
        </div>

        {/* LENDERS LIST / GRID */}
        {filteredAndSortedLenders.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              /* ── GRID CARD VIEW (2 AT A TIME ON MOBILE) ── */
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
                {paginatedLenders.map((lender) => {
                const checked = isCompared(lender.id);

                return (
                  <div
                    key={lender.id}
                    className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative hover:-translate-y-1"
                  >
                    {/* Top Accent Strip */}
                    <div className="h-1 sm:h-1.5 w-full bg-linear-to-r from-primary via-emerald-600 to-[#B69226]" />

                    <div className="p-2.5 sm:p-5 flex-1 flex flex-col">
                      
                      {/* Card Header: Logo, Badges, Compare Button */}
                      <div className="flex items-start justify-between gap-1 sm:gap-2 mb-2 sm:mb-3.5">
                        <Link
                          href={`/personal-loans/${lender.id}`}
                          className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white border border-gray-200 p-1 sm:p-2 flex items-center justify-center shrink-0 shadow-2xs hover:border-primary transition-colors"
                        >
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={52}
                            height={52}
                            className="max-h-full max-w-full object-contain"
                          />
                        </Link>

                        <div className="flex flex-col items-end gap-1">
                          {/* Compare toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompare(lender);
                            }}
                            className={`text-[10px] sm:text-[11px] font-bold font-montserrat px-1.5 sm:px-2.5 py-0.5 sm:py-1 min-h-6.5 sm:min-h-8 rounded-md sm:rounded-lg border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                              checked
                                ? "bg-primary text-white border-primary shadow-xs"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                            }`}
                            title={checked ? "Remove from comparison" : "Add to comparison"}
                            aria-label={`${checked ? "Remove" : "Add"} ${lender.name} ${checked ? "from" : "to"} comparison`}
                          >
                            <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                            <span className="hidden min-[420px]:inline">{checked ? "Compared" : "Compare"}</span>
                            <span className="inline min-[420px]:hidden">{checked ? "✓" : "+"}</span>
                          </button>

                          {/* Badge */}
                          {lender.badge && (
                            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 truncate max-w-20 sm:max-w-none">
                              {lender.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bank Name & Rating */}
                      <div className="mb-2 sm:mb-3 flex-1">
                        <Link href={`/personal-loans/${lender.id}`} className="block group/title">
                          <h3 className="font-bricolage font-bold text-xs sm:text-lg text-gray-900 group-hover/title:text-primary transition-colors leading-snug line-clamp-2 min-h-[2.4em] sm:min-h-[2.6em]">
                            {lender.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1 flex-wrap">
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700">
                            {lender.bankType || "Bank"}
                          </span>
                          {lender.rating && (
                            <span className="flex items-center gap-0.5 text-[10px] sm:text-xs font-bold text-gray-700 bg-amber-50/70 px-1.5 py-0.5 rounded-md">
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                              <span>{lender.rating}</span>
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed hidden xs:block sm:block">
                          {lender.tagline}
                        </p>
                      </div>

                      {/* Key Financial Metrics Matrix (2x2 grid) */}
                      <Link href={`/personal-loans/${lender.id}`} className="block">
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 bg-[#FDFBF7] p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-gray-200/70 mb-2 sm:mb-3 hover:border-primary/30 transition-colors">
                          <div className="p-0.5 sm:p-1 min-w-0">
                            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-400 block truncate">
                              Rate
                            </span>
                            <span className="font-bricolage font-extrabold text-[11px] sm:text-base text-primary block mt-0.5 truncate">
                              {typeof lender.interestRate?.min === "number" ? `${lender.interestRate.min}%${lender.interestRate.max ? ` - ${lender.interestRate.max}%` : ''}` : "Competitive"}
                            </span>
                          </div>

                          <div className="p-0.5 sm:p-1 min-w-0">
                            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-400 block truncate">
                              Starting EMI
                            </span>
                            <span className="font-semibold text-[10px] sm:text-sm text-emerald-800 block mt-0.5 truncate">
                              ₹{lender.startingEmiPerLakh}/L
                            </span>
                          </div>

                          <div className="p-0.5 sm:p-1 border-t border-gray-200/60 pt-1 sm:pt-2 min-w-0">
                            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-400 block truncate">
                              Max Limit
                            </span>
                            <span className="font-bricolage font-bold text-[10px] sm:text-xs text-gray-900 block mt-0.5 truncate">
                              {lender.maxAmount}
                            </span>
                          </div>

                          <div className="p-0.5 sm:p-1 border-t border-gray-200/60 pt-1 sm:pt-2 min-w-0">
                            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-400 block truncate">
                              Disbursal
                            </span>
                            <span className="font-bold text-[10px] sm:text-xs text-amber-800 block mt-0.5 truncate">
                              {lender.disbursalTime}
                            </span>
                          </div>
                        </div>

                        {/* Top Highlights (1 on mobile, 2 on desktop) */}
                        <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                          {lender.features.slice(0, 2).map((feat, idx) => (
                            <div
                              key={idx}
                              className={`items-start gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600 leading-tight ${
                                idx > 0 ? "hidden sm:flex" : "flex"
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Eligibility Pill */}
                        <div className="bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-gray-100 flex items-center justify-between text-[9px] sm:text-[11px] text-gray-500">
                          <span className="truncate">CIBIL: <strong className="text-gray-800 font-bold">{lender.minCreditScore}+</strong></span>
                          <span className="truncate ml-1">Salary: <strong className="text-gray-800 font-bold">{lender.minIncome.split("(")[0]}</strong></span>
                        </div>
                      </Link>

                    </div>

                    {/* Card Actions Footer: Stacked on mobile, side-by-side on sm: */}
                    <div className="p-2 sm:p-3 sm:pb-3.5 bg-gray-50/80 border-t border-gray-100 flex flex-col gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => openApplyModal(lender.name, lender.tagline)}
                        className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-[11px] sm:text-xs min-h-8.5 sm:min-h-10 py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer group/btn active:scale-[0.98]"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="w-full text-[10px] sm:text-xs font-semibold text-gray-700 hover:text-primary py-1 sm:py-1.5 px-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-center cursor-pointer min-h-6.5 sm:min-h-8 shadow-2xs"
                      >
                        View Details
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* ── HORIZONTAL LIST VIEW ── */
            <div className="space-y-4">
              {paginatedLenders.map((lender) => {
                const checked = isCompared(lender.id);

                return (
                  <div
                    key={lender.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    {/* Bank Info */}
                    <div className="flex items-start gap-4 w-full lg:w-auto lg:min-w-70 max-w-sm">
                      <Link
                        href={`/personal-loans/${lender.id}`}
                        className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs hover:border-primary transition-colors"
                      >
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={52}
                          height={52}
                          className="max-h-full max-w-full object-contain"
                        />
                      </Link>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                            {lender.bankType || "Bank"}
                          </span>
                          {lender.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              {lender.badge}
                            </span>
                          )}
                        </div>
                        <Link href={`/personal-loans/${lender.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-tight">
                            {lender.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lender.tagline}</p>
                      </div>
                    </div>

                    {/* Financial Metrics Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-400 block">Interest Rate</span>
                        <span className="font-bricolage font-extrabold text-sm sm:text-base text-primary">
                          {typeof lender.interestRate?.min === "number" ? `${lender.interestRate.min}%${lender.interestRate.max ? ` - ${lender.interestRate.max}%` : ''}` : "Competitive"}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-400 block">Starting EMI</span>
                        <span className="font-semibold text-emerald-800 text-xs sm:text-sm">
                          ₹{lender.startingEmiPerLakh} / Lakh
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-400 block">Max Limit</span>
                        <span className="font-bricolage font-bold text-gray-900 text-xs sm:text-sm">
                          {lender.maxAmount}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-400 block">Disbursal</span>
                        <span className="font-bold text-amber-800 text-xs">
                          {lender.disbursalTime}
                        </span>
                      </div>
                    </div>

                    {/* Actions & Compare */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2.5 w-full lg:w-auto shrink-0 justify-between lg:justify-center pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 cursor-pointer select-none hover:text-primary"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCompare(lender)}
                          className="w-3.5 h-3.5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                        />
                        <span>Compare</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLenderForDetail(lender)}
                          className="text-xs font-bold text-gray-700 hover:text-primary py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                        >
                          Details
                        </button>

                        <button
                          type="button"
                          onClick={() => openApplyModal(lender.name, lender.tagline)}
                          className="bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* ── Pagination Controls ── */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/80 font-montserrat">
              <div className="text-xs text-gray-500 font-medium">
                Showing <span className="font-bold text-gray-900">{startIndex + 1}</span>–<span className="font-bold text-gray-900">{endIndex}</span> of{" "}
                <span className="font-bold text-gray-900">{totalItems}</span> lenders
              </div>

              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:hover:bg-white disabled:hover:border-gray-200 shadow-2xs"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === safeCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-white shadow-xs scale-105"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-2xs"
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:hover:bg-white disabled:hover:border-gray-200 shadow-2xs"
                  aria-label="Next page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF4ED] text-primary flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-1">
              No matching lenders found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find any loan partners matching your specific filter criteria. Try resetting filters or choosing broader options.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Floating Comparison Dock */}
      <PersonalLoanCompareDock
        compareList={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((item) => item.id !== id))}
        onClear={() => setCompareList([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Side-by-Side Comparison Modal */}
      <PersonalLoanCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        lenders={compareList}
      />

      {/* Comprehensive Lender Detail Modal */}
      <PersonalLoanDetailModal
        lender={selectedLenderForDetail}
        onClose={() => setSelectedLenderForDetail(null)}
      />

    </section>
  );
}
