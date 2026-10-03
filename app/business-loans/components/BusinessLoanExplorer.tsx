"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Building2,
  TrendingDown,
  Percent,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  Briefcase,
  IndianRupee,
} from "lucide-react";
import { BusinessLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import BusinessLoanCompareDock from "./BusinessLoanCompareDock";
import BusinessLoanCompareModal from "./BusinessLoanCompareModal";
import BusinessLoanDetailModal from "./BusinessLoanDetailModal";

interface BusinessLoanExplorerProps {
  initialLenders: BusinessLoanLender[];
}

export default function BusinessLoanExplorer({ initialLenders }: BusinessLoanExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch = searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBankType, setSelectedBankType] = useState<string>("all");
  const [selectedCollateral, setSelectedCollateral] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [selectedLoanAmount, setSelectedLoanAmount] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rate-asc" | "amount-desc" | "emi-asc" | "speed-asc" | "rating-desc">("rate-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<BusinessLoanLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] = useState<BusinessLoanLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Lenders", icon: Building2 },
    { id: "collateral-free", label: "Collateral-Free (Unsecured)", icon: ShieldCheck },
    { id: "lowest-rate", label: "Lowest Rates (< 10%)", icon: TrendingDown },
    { id: "high-quantum", label: "High Quantum (₹75L - ₹2 Cr)", icon: IndianRupee },
    { id: "fast-disbursal", label: "Fast Disbursal (48-72h)", icon: Zap },
    { id: "psu", label: "PSU Banks", icon: Building2 },
    { id: "private", label: "Private Banks", icon: Briefcase },
    { id: "nbfc", label: "Top NBFCs", icon: Percent },
  ];

  // Disbursal speed priority helper for sorting
  const getDisbursalRank = (timeStr?: string): number => {
    if (!timeStr) return 99;
    const l = timeStr.toLowerCase();
    if (l.includes("24") || l.includes("same day")) return 1;
    if (l.includes("48")) return 2;
    if (l.includes("72")) return 3;
    if (l.includes("4 to 7") || l.includes("5 to 7")) return 4;
    return 5;
  };

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category check
      if (selectedCategory !== "all") {
        if (selectedCategory === "lowest-rate") {
          const minRate = lender.interestRate?.min ?? 99;
          if (minRate > 10.0) return false;
        } else if (selectedCategory === "collateral-free") {
          const isUnsecured =
            lender.collateralType.toLowerCase().includes("free") ||
            lender.collateralType.toLowerCase().includes("unsecured");
          if (!isUnsecured && !lender.category.includes("collateral-free")) return false;
        } else if (selectedCategory === "high-quantum") {
          const maxNum = lender.maxAmountNum || 0;
          if (maxNum < 7500000 && !lender.category.includes("high-quantum")) return false;
        } else if (selectedCategory === "fast-disbursal") {
          if (!lender.category.includes("fast-disbursal")) return false;
        } else if (selectedCategory === "psu") {
          if (lender.bankType !== "psu" && !lender.category.includes("psu")) return false;
        } else if (selectedCategory === "private") {
          if (lender.bankType !== "private" && !lender.category.includes("private")) return false;
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

      // Collateral Type check
      if (selectedCollateral !== "all") {
        if (selectedCollateral === "unsecured") {
          const isFree =
            lender.collateralType.toLowerCase().includes("free") ||
            lender.collateralType.toLowerCase().includes("unsecured");
          if (!isFree) return false;
        } else if (selectedCollateral === "secured") {
          const isSecured = lender.collateralType.toLowerCase().includes("secured");
          if (!isSecured) return false;
        }
      }

      // Min CIBIL check
      if (selectedMinCibil !== "all") {
        const threshold = parseInt(selectedMinCibil, 10);
        if (lender.minCibilScore > threshold) return false;
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
        const matchesCollateral = lender.collateralType.toLowerCase().includes(q);
        const matchesTurnover = lender.minTurnover.toLowerCase().includes(q);
        const matchesFeatures = lender.features.some((f) => f.toLowerCase().includes(q));
        if (
          !matchesName &&
          !matchesTagline &&
          !matchesType &&
          !matchesCollateral &&
          !matchesTurnover &&
          !matchesFeatures
        ) {
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
    selectedCollateral,
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
  const toggleCompare = (lender: BusinessLoanLender) => {
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
    setSelectedCollateral("all");
    setSelectedMinCibil("all");
    setSelectedLoanAmount("all");
    setSortBy("rate-asc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedBankType !== "all" ||
    selectedCollateral !== "all" ||
    selectedMinCibil !== "all" ||
    selectedLoanAmount !== "all";

  return (
    <section id="lenders-list-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              Verified MSME Marketplace
            </div>
            <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
              Compare & Apply for <span className="text-primary">Business Loans</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Showing {totalItems > 0 ? `${startIndex + 1}–${endIndex} of ${totalItems}` : "0"} partner lenders
              {totalPages > 1 && ` • Page ${safeCurrentPage} of ${totalPages}`}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-bold text-gray-600 mr-1 hidden sm:inline">View:</span>
            <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-primary shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="Grid Card View"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-primary shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="List View"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hidden mb-6">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/90 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input (4 Cols) */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search bank name, collateral, or features..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bank Type Dropdown (2 Cols) */}
            <div className="lg:col-span-2 relative">
              <select
                value={selectedBankType}
                onChange={(e) => {
                  setSelectedBankType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Bank Types</option>
                <option value="psu">PSU Banks (Govt)</option>
                <option value="private">Private Banks</option>
                <option value="nbfc">MSME NBFCs</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Collateral Type Dropdown (2 Cols) */}
            <div className="lg:col-span-2 relative">
              <select
                value={selectedCollateral}
                onChange={(e) => {
                  setSelectedCollateral(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Collateral Types</option>
                <option value="unsecured">Collateral-Free (Unsecured)</option>
                <option value="secured">Secured / Hybrid</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Min Loan Limit (2 Cols) */}
            <div className="lg:col-span-2 relative">
              <select
                value={selectedLoanAmount}
                onChange={(e) => {
                  setSelectedLoanAmount(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="all">Any Loan Limit</option>
                <option value="50">Min ₹50 Lakhs</option>
                <option value="75">Min ₹75 Lakhs</option>
                <option value="100">Min ₹1 Crore+</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown (2 Cols) */}
            <div className="lg:col-span-2 relative">
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
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="rate-asc">Lowest Interest Rate</option>
                <option value="amount-desc">Highest Loan Limit</option>
                <option value="emi-asc">Lowest Starting EMI</option>
                <option value="speed-asc">Fastest Disbursal</option>
                <option value="rating-desc">Highest User Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Active filter count & reset */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2 flex-wrap">
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
                {selectedCollateral !== "all" && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[11px]">
                    {selectedCollateral === "unsecured" ? "Collateral-Free" : "Secured"}
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
                className="flex items-center gap-1 text-primary hover:underline font-bold cursor-pointer shrink-0"
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
              /* ── GRID CARD VIEW ── */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedLenders.map((lender) => {
                  const checked = isCompared(lender.id);

                  return (
                    <div
                      key={lender.id}
                      className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
                    >
                      {/* Top Accent Strip */}
                      <div className="h-1.5 w-full bg-linear-to-r from-primary via-emerald-600 to-[#B69226]" />

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Card Header: Logo, Badges, Compare Checkbox */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                              <Image
                                src={lender.logo}
                                alt={lender.name}
                                width={52}
                                height={52}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            <div className="flex flex-col items-end gap-1.5">
                              {/* Compare Checkbox */}
                              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 cursor-pointer select-none hover:text-primary">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleCompare(lender)}
                                  className="w-3.5 h-3.5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                                />
                                <span>Compare</span>
                              </label>

                              {/* Badge */}
                              {lender.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                  {lender.badge}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bank Name & Rating */}
                          <div className="mb-4">
                            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 group-hover:text-primary transition-colors leading-snug">
                              {lender.name}
                            </h3>

                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                                {lender.bankType}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                                {lender.collateralType.split("(")[0].trim()}
                              </span>
                              {lender.rating && (
                                <span className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-amber-50/70 px-2 py-0.5 rounded-md">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span>{lender.rating}</span>
                                  {lender.reviewCount && (
                                    <span className="text-gray-400 font-normal">({lender.reviewCount})</span>
                                  )}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                              {lender.tagline}
                            </p>
                          </div>

                          {/* Key Financial Metrics Matrix */}
                          <div className="grid grid-cols-2 gap-2 bg-[#FDFBF7] p-3 rounded-2xl border border-gray-200/70 mb-4">
                            <div className="p-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                                Interest Rate
                              </span>
                              <span className="font-bricolage font-extrabold text-sm sm:text-base text-primary block mt-0.5">
                                {lender.interestRate?.min}% - {lender.interestRate?.max}%
                              </span>
                            </div>

                            <div className="p-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                                Starting EMI
                              </span>
                              <span className="font-semibold text-xs sm:text-sm text-emerald-800 block mt-0.5">
                                ₹{lender.startingEmiPerLakh} / Lakh
                              </span>
                            </div>

                            <div className="p-1 border-t border-gray-200/60 pt-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                                Max Sanction Limit
                              </span>
                              <span className="font-bricolage font-bold text-xs sm:text-sm text-gray-900 block mt-0.5">
                                {lender.maxAmount}
                              </span>
                            </div>

                            <div className="p-1 border-t border-gray-200/60 pt-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                                Disbursal Time
                              </span>
                              <span className="font-bold text-xs text-amber-800 block mt-0.5">
                                {lender.disbursalTime}
                              </span>
                            </div>
                          </div>

                          {/* Top Highlights */}
                          <div className="space-y-1.5 mb-4">
                            {lender.features.slice(0, 2).map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-tight">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Eligibility Pill */}
                        <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex items-center justify-between text-[11px] text-gray-500 mb-2">
                          <span>Min Turnover: <strong className="text-gray-800 font-bold">{lender.minTurnover}</strong></span>
                          <span>Vintage: <strong className="text-gray-800 font-bold">{lender.minVintage}</strong></span>
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLenderForDetail(lender)}
                          className="flex-1 text-xs font-bold text-gray-700 hover:text-primary py-2.5 px-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center cursor-pointer"
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={() => openApplyModal(lender.name, lender.tagline)}
                          className="flex-1 bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
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
                      <div className="flex items-start gap-4 min-w-[280px] max-w-sm">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={52}
                            height={52}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                              {lender.bankType}
                            </span>
                            {lender.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                {lender.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-tight">
                            {lender.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lender.tagline}</p>
                          <span className="inline-block mt-1 text-[11px] font-medium text-emerald-800">
                            {lender.collateralType}
                          </span>
                        </div>
                      </div>

                      {/* Metrics Columns */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 w-full lg:w-auto">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                            Interest Rate
                          </span>
                          <span className="font-bricolage font-extrabold text-sm sm:text-base text-primary block mt-0.5">
                            {lender.interestRate?.min}% - {lender.interestRate?.max}%
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                            Starting EMI
                          </span>
                          <span className="font-semibold text-xs sm:text-sm text-emerald-800 block mt-0.5">
                            ₹{lender.startingEmiPerLakh} / Lakh
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                            Max Sanction
                          </span>
                          <span className="font-bricolage font-bold text-xs sm:text-sm text-gray-900 block mt-0.5">
                            {lender.maxAmount}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                            Disbursal Time
                          </span>
                          <span className="font-bold text-xs text-amber-800 block mt-0.5">
                            {lender.disbursalTime}
                          </span>
                        </div>
                      </div>

                      {/* Actions & Compare */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2.5 w-full lg:w-auto shrink-0">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 cursor-pointer select-none hover:text-primary mb-1">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCompare(lender)}
                            className="w-3.5 h-3.5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                          />
                          <span>Compare</span>
                        </label>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setSelectedLenderForDetail(lender)}
                            className="text-xs font-bold text-gray-700 hover:text-primary py-2.5 px-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            type="button"
                            onClick={() => openApplyModal(lender.name, lender.tagline)}
                            className="bg-primary hover:bg-[#035259] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        safeCurrentPage === page
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 shadow-sm max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bricolage font-bold text-lg text-gray-900">
              No matching business loan lenders found
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Try adjusting your search criteria, collateral type, or turnover filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-primary hover:bg-[#035259] text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Comparison Dock */}
      <BusinessLoanCompareDock
        compareList={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((item) => item.id !== id))}
        onClear={() => setCompareList([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Side-by-Side Comparison Modal */}
      <BusinessLoanCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        lenders={compareList}
      />

      {/* In-Depth Lender Detail Modal */}
      <BusinessLoanDetailModal
        lender={selectedLenderForDetail}
        onClose={() => setSelectedLenderForDetail(null)}
      />
    </section>
  );
}
