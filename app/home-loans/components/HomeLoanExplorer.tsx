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
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  Home,
  RefreshCw,
  Scale,
} from "lucide-react";
import { HomeLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import HomeLoanCompareDock from "./HomeLoanCompareDock";
import HomeLoanCompareModal from "./HomeLoanCompareModal";
import HomeLoanDetailModal from "./HomeLoanDetailModal";

interface HomeLoanExplorerProps {
  initialLenders: HomeLoanLender[];
}

export default function HomeLoanExplorer({ initialLenders }: HomeLoanExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch = searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBankType, setSelectedBankType] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [selectedOverdraftOnly, setSelectedOverdraftOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"rate-asc" | "emi20-asc" | "emi30-asc" | "amount-desc" | "rating-desc">("rate-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<HomeLoanLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] = useState<HomeLoanLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Home Loans", icon: Building2 },
    { id: "lowest-rate", label: "Lowest Rates (< 7.30%)", icon: TrendingDown },
    { id: "psu", label: "PSU Banks", icon: Home },
    { id: "private", label: "Private Banks", icon: Sparkles },
    { id: "hfc", label: "Housing Finance NBFCs", icon: Percent },
    { id: "overdraft", label: "Overdraft / Maxgain", icon: RefreshCw },
    { id: "women-special", label: "Women Special (5 bps)", icon: Zap },
    { id: "balance-transfer", label: "Balance Transfer", icon: RefreshCw },
  ];

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category check
      if (selectedCategory !== "all") {
        if (selectedCategory === "lowest-rate") {
          const minRate = lender.interestRate?.min ?? 99;
          if (minRate > 7.30 && !lender.category.includes("lowest-rate")) return false;
        } else if (selectedCategory === "psu") {
          if (lender.bankType.toLowerCase() !== "psu" && !lender.category.includes("psu")) return false;
        } else if (selectedCategory === "private") {
          if (lender.bankType.toLowerCase() !== "private" && !lender.category.includes("private")) return false;
        } else if (selectedCategory === "hfc") {
          if (lender.bankType.toLowerCase() !== "hfc" && !lender.category.includes("hfc")) return false;
        } else if (selectedCategory === "overdraft") {
          if (!lender.overdraftScheme && !lender.category.includes("overdraft")) return false;
        } else if (selectedCategory === "women-special") {
          if (!lender.category.includes("women-special")) return false;
        } else if (selectedCategory === "balance-transfer") {
          if (!lender.category.includes("balance-transfer")) return false;
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

      // Overdraft only check
      if (selectedOverdraftOnly && !lender.overdraftScheme) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = lender.name.toLowerCase().includes(q);
        const matchesTagline = lender.tagline.toLowerCase().includes(q);
        const matchesType = (lender.bankType || "").toLowerCase().includes(q);
        const matchesOverdraft = (lender.overdraftScheme || "").toLowerCase().includes(q);
        const matchesFeatures = lender.features.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesType && !matchesOverdraft && !matchesFeatures) {
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
      if (sortBy === "emi20-asc") {
        return a.startingEmiPerLakh20Yr - b.startingEmiPerLakh20Yr;
      }
      if (sortBy === "emi30-asc") {
        return a.startingEmiPerLakh30Yr - b.startingEmiPerLakh30Yr;
      }
      if (sortBy === "amount-desc") {
        return (b.maxAmountNum || 0) - (a.maxAmountNum || 0);
      }
      if (sortBy === "rating-desc") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

    return list;
  }, [
    initialLenders,
    selectedCategory,
    selectedBankType,
    selectedMinCibil,
    selectedOverdraftOnly,
    searchQuery,
    sortBy,
  ]);

  // Pagination calculation
  const totalItems = filteredAndSortedLenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedLenders = filteredAndSortedLenders.slice(startIndex, endIndex);

  // Compare Dock helpers
  const handleToggleCompare = (lender: HomeLoanLender) => {
    if (compareList.some((item) => item.id === lender.id)) {
      setCompareList(compareList.filter((item) => item.id !== lender.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 home loan lenders at a time.");
        return;
      }
      setCompareList([...compareList, lender]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBankType("all");
    setSelectedMinCibil("all");
    setSelectedOverdraftOnly(false);
    setSortBy("rate-asc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedBankType !== "all" ||
    selectedMinCibil !== "all" ||
    selectedOverdraftOnly ||
    sortBy !== "rate-asc";

  return (
    <section id="lenders-list-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Home className="w-3.5 h-3.5 text-gold" />
            Home Loan Directory 2026
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Explore <span className="text-primary">{initialLenders.length}+ Leading Home Loan Providers</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Compare verified interest rates, EMI per lakh, maximum LTV funding, and overdraft benefits across PSU, Private Banks, and Housing Finance NBFCs.
          </p>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-sm border border-primary"
                    : "bg-white text-gray-700 border border-gray-200/90 hover:border-gray-300 hover:bg-gray-50/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Filter Controls & Sort Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/80 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Search Input (5 cols) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by bank name, Maxgain overdraft, or features..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-hidden transition-all bg-gray-50/50 focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filters (4 cols) */}
            <div className="md:col-span-4 flex items-center gap-2">
              {/* Bank Type */}
              <div className="relative flex-1">
                <select
                  value={selectedBankType}
                  onChange={(e) => {
                    setSelectedBankType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none pl-3 pr-8 py-2.5 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Bank Type: All</option>
                  <option value="psu">PSU Banks</option>
                  <option value="private">Private Banks</option>
                  <option value="hfc">Housing Finance (HFC)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Min CIBIL */}
              <div className="relative flex-1">
                <select
                  value={selectedMinCibil}
                  onChange={(e) => {
                    setSelectedMinCibil(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none pl-3 pr-8 py-2.5 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Min CIBIL: All</option>
                  <option value="700">CIBIL 700+</option>
                  <option value="720">CIBIL 720+</option>
                  <option value="750">CIBIL 750+</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Sort & View Mode (3 cols) */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2">
              <div className="relative flex-1 sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "rate-asc" | "emi20-asc" | "emi30-asc" | "amount-desc" | "rating-desc")}
                  className="w-full appearance-none pl-3 pr-8 py-2.5 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:outline-hidden cursor-pointer"
                >
                  <option value="rate-asc">Lowest Rate First</option>
                  <option value="emi20-asc">Lowest 20Y EMI</option>
                  <option value="emi30-asc">Lowest 30Y EMI</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="amount-desc">Max Sanction Limit</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-white text-primary shadow-2xs" : "text-gray-500 hover:text-gray-900"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-white text-primary shadow-2xs" : "text-gray-500 hover:text-gray-900"
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Chips & Overdraft Toggle */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 text-[11px] font-medium">
                Showing <strong className="text-gray-900">{totalItems}</strong> lenders
              </span>

              {/* Overdraft Only Toggle */}
              <button
                type="button"
                onClick={() => setSelectedOverdraftOnly(!selectedOverdraftOnly)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  selectedOverdraftOnly
                    ? "bg-purple-50 text-purple-800 border-purple-300"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                <RefreshCw className="w-3 h-3 text-purple-600" />
                <span>Overdraft / Maxgain Only</span>
                {selectedOverdraftOnly && <span className="text-[10px]">✓</span>}
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            <div className="text-[11px] text-gray-500 hidden sm:block">
              Repo Rate Linked • 0% Prepayment Penalty on Floating Rates
            </div>
          </div>
        </div>

        {/* Results Grid / List */}
        {filteredAndSortedLenders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto my-8">
            <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 mb-1">
              No Lenders Found
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              We couldn&apos;t find any lenders matching your active search and filter criteria.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-primary hover:bg-[#035259] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((c) => c.id === lender.id);
              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-primary/30 relative"
                >
                  {/* Top Header Card */}
                  <div className="p-5">
                    {/* Top Badges Row */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {lender.bankType.toUpperCase()}
                        </span>
                        {lender.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            {lender.badge}
                          </span>
                        )}
                      </div>

                      {/* Compare Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleToggleCompare(lender)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                          isCompared
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isCompared ? "Compared" : "Compare"}</span>
                      </button>
                    </div>

                    {/* Bank Info */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={44}
                          height={44}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors leading-snug">
                          {lender.name}
                        </h3>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {lender.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Interest Rate & EMI Box */}
                    <div className="bg-[#FDFBF7] rounded-2xl p-3 border border-gray-200/90 mb-3.5">
                      <div className="flex items-end justify-between mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                            Interest Rate
                          </span>
                          <span className="font-bricolage font-extrabold text-xl text-primary block leading-tight">
                            {lender.interestRate?.text}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 block">
                            EBLR Linked
                          </span>
                        </div>
                      </div>

                      {/* Starting EMI / Lakh display */}
                      <div className="pt-2 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-left">
                        <div>
                          <span className="text-[10px] text-gray-500 block">EMI / Lakh (20 Yr)</span>
                          <span className="font-bricolage font-bold text-xs text-gray-900">
                            ₹{lender.startingEmiPerLakh20Yr} <span className="text-[10px] text-gray-500 font-normal">/mo</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 block">EMI / Lakh (30 Yr)</span>
                          <span className="font-bricolage font-bold text-xs text-emerald-700">
                            ₹{lender.startingEmiPerLakh30Yr} <span className="text-[10px] text-gray-500 font-normal">/mo</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Attributes Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                        {lender.maxLtv} Funding
                      </span>
                      {lender.overdraftScheme && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                          {lender.overdraftScheme}
                        </span>
                      )}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        0.05% Women Rebate
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-1.5 text-xs text-gray-600 mb-2">
                      {lender.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedLenderForDetail(lender)}
                      className="flex-1 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold text-xs py-2.5 rounded-xl shadow-2xs transition-all text-center cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => openApplyModal(lender.name, `Home Loan - ${lender.interestRate?.text}`)}
                      className="flex-1 bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer group/btn"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((c) => c.id === lender.id);
              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 group"
                >
                  {/* Left: Bank logo & title */}
                  <div className="flex items-start gap-3.5 w-full lg:w-1/3">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                      <Image
                        src={lender.logo}
                        alt={lender.name}
                        width={48}
                        height={48}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {lender.bankType.toUpperCase()}
                        </span>
                        {lender.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            {lender.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors">
                        {lender.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{lender.tagline}</p>
                    </div>
                  </div>

                  {/* Center: Rates & EMI */}
                  <div className="grid grid-cols-3 gap-3 w-full lg:w-5/12 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
                    <div>
                      <span className="text-[10px] font-semibold text-gray-500 block uppercase">Rate Range</span>
                      <span className="font-bricolage font-bold text-sm text-primary">
                        {lender.interestRate?.text}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gray-500 block uppercase">EMI / Lakh (20Y)</span>
                      <span className="font-bricolage font-bold text-sm text-gray-900">
                        ₹{lender.startingEmiPerLakh20Yr} <span className="text-[10px] font-normal text-gray-500">/mo</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gray-500 block uppercase">Max Funding</span>
                      <span className="font-bricolage font-bold text-sm text-blue-700">
                        {lender.maxLtv}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleToggleCompare(lender)}
                      className={`text-xs font-bold px-3 py-2.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
                        isCompared
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{isCompared ? "Compared" : "Compare"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedLenderForDetail(lender)}
                      className="text-xs font-bold px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => openApplyModal(lender.name, `Home Loan - ${lender.interestRate?.text}`)}
                      className="bg-primary hover:bg-[#035259] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              Showing <strong className="text-gray-900">{startIndex + 1}</strong> to{" "}
              <strong className="text-gray-900">{endIndex}</strong> of{" "}
              <strong className="text-gray-900">{totalItems}</strong> lenders
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    safeCurrentPage === page
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Persistent Compare Dock (Sticky at bottom when lenders selected) */}
      <HomeLoanCompareDock
        compareList={compareList}
        onRemove={(id) => setCompareList(compareList.filter((c) => c.id !== id))}
        onClear={() => setCompareList([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Compare Modal */}
      <HomeLoanCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        lenders={compareList}
      />

      {/* Lender Detail Modal */}
      <HomeLoanDetailModal
        lender={selectedLenderForDetail}
        onClose={() => setSelectedLenderForDetail(null)}
      />
    </section>
  );
}
