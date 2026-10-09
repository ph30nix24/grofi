"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  ArrowUpDown,
  Sparkles,
  Zap,
  Building2,
  TrendingDown,
  Percent,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  Home,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { BalanceTransferLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import BalanceTransferCompareDock from "./BalanceTransferCompareDock";
import BalanceTransferCompareModal from "./BalanceTransferCompareModal";
import BalanceTransferDetailModal from "./BalanceTransferDetailModal";
import Link from "next/link";

interface BalanceTransferExplorerProps {
  initialLenders: BalanceTransferLender[];
}

export default function BalanceTransferExplorer({
  initialLenders,
}: BalanceTransferExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch =
    searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBankType, setSelectedBankType] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [selectedOverdraftOnly, setSelectedOverdraftOnly] =
    useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    "rate-asc" | "emi20-asc" | "emi30-asc" | "topup-desc" | "rating-desc"
  >("rate-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<BalanceTransferLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] =
    useState<BalanceTransferLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Lenders", icon: Building2 },
    { id: "lowest-rate", label: "Lowest Rates (< 7.25%)", icon: TrendingDown },
    { id: "psu", label: "PSU Banks", icon: Home },
    { id: "private", label: "Private Banks", icon: Sparkles },
    { id: "hfc", label: "Housing NBFCs", icon: Percent },
    { id: "overdraft", label: "Overdraft / Maxgain", icon: RefreshCw },
    { id: "high-topup", label: "High Top-Up (₹1+ Cr)", icon: Zap },
    { id: "low-fee", label: "Capped Fees", icon: ShieldCheck },
  ];

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category check
      if (selectedCategory !== "all") {
        if (selectedCategory === "lowest-rate") {
          const minRate = lender.interestRate?.min ?? 99;
          if (minRate > 7.25 && !lender.category.includes("lowest-rate")) {
            return false;
          }
        } else if (selectedCategory === "psu") {
          if (
            lender.bankType.toLowerCase() !== "psu" &&
            !lender.category.includes("psu")
          ) {
            return false;
          }
        } else if (selectedCategory === "private") {
          if (
            lender.bankType.toLowerCase() !== "private" &&
            !lender.category.includes("private")
          ) {
            return false;
          }
        } else if (selectedCategory === "hfc") {
          if (
            lender.bankType.toLowerCase() !== "hfc" &&
            !lender.category.includes("hfc")
          ) {
            return false;
          }
        } else if (selectedCategory === "overdraft") {
          if (
            !lender.overdraftScheme &&
            !lender.category.includes("overdraft")
          ) {
            return false;
          }
        } else if (selectedCategory === "high-topup") {
          if (!lender.category.includes("high-topup")) {
            return false;
          }
        } else if (selectedCategory === "low-fee") {
          if (!lender.category.includes("low-fee")) {
            return false;
          }
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
        const matchesOverdraft = (lender.overdraftScheme || "")
          .toLowerCase()
          .includes(q);
        const matchesFeatures = lender.features.some((f) =>
          f.toLowerCase().includes(q)
        );
        if (
          !matchesName &&
          !matchesTagline &&
          !matchesType &&
          !matchesOverdraft &&
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
      if (sortBy === "emi20-asc") {
        return a.startingEmiPerLakh20Yr - b.startingEmiPerLakh20Yr;
      }
      if (sortBy === "emi30-asc") {
        return a.startingEmiPerLakh30Yr - b.startingEmiPerLakh30Yr;
      }
      if (sortBy === "topup-desc") {
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

  // Pagination slicing
  const totalPages = Math.ceil(
    filteredAndSortedLenders.length / ITEMS_PER_PAGE
  );
  const paginatedLenders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedLenders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedLenders, currentPage]);

  // Handlers
  const handleToggleCompare = (lender: BalanceTransferLender) => {
    if (compareList.some((item) => item.id === lender.id)) {
      setCompareList(compareList.filter((item) => item.id !== lender.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 balance transfer lenders at a time.");
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

  return (
    <section id="lenders-list" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold mb-3">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              <span>Verified Indian Banks & HFCs</span>
            </div>
            <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
              Compare Home Loan Balance Transfer Offers
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">
              Switch to lower interest rates from 7.10% p.a. Filter by overdraft compatibility, capped switch fees, and top-up headroom.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-bold text-gray-900">{filteredAndSortedLenders.length}</span>{" "}
            lenders available from database
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryTabs.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-gold" : "text-gray-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by bank, Maxgain OD, top-up..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bank Type Dropdown */}
            <div className="sm:col-span-2">
              <select
                value={selectedBankType}
                onChange={(e) => {
                  setSelectedBankType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
              >
                <option value="all">Bank Type: All</option>
                <option value="psu">PSU Banks</option>
                <option value="private">Private Banks</option>
                <option value="hfc">Housing NBFCs</option>
              </select>
            </div>

            {/* Min CIBIL Dropdown */}
            <div className="sm:col-span-2">
              <select
                value={selectedMinCibil}
                onChange={(e) => {
                  setSelectedMinCibil(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
              >
                <option value="all">Min CIBIL: Any</option>
                <option value="700">700 & Below</option>
                <option value="720">720 & Below</option>
                <option value="750">750 & Below</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "rate-asc"
                        | "emi20-asc"
                        | "emi30-asc"
                        | "topup-desc"
                        | "rating-desc"
                    )
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="rate-asc">Sort: Lowest Rate First</option>
                  <option value="emi20-asc">Sort: Lowest 20-Yr EMI</option>
                  <option value="emi30-asc">Sort: Lowest 30-Yr EMI</option>
                  <option value="topup-desc">Sort: Highest Top-Up</option>
                  <option value="rating-desc">Sort: Highest Rating</option>
                </select>
              </div>
            </div>

          </div>

          {/* Quick toggle chips row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedOverdraftOnly}
                  onChange={(e) => {
                    setSelectedOverdraftOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-primary focus:ring-primary h-4 w-4 accent-primary"
                />
                <span className="font-semibold text-gray-700">
                  Overdraft / Maxgain Only
                </span>
              </label>

              {(searchQuery ||
                selectedCategory !== "all" ||
                selectedBankType !== "all" ||
                selectedMinCibil !== "all" ||
                selectedOverdraftOnly) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1 font-bold ml-2 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lenders List / Grid */}
        {filteredAndSortedLenders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-2">
              No matching lenders found
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
              Try adjusting your search criteria or resetting filters to see all 14 available balance transfer partners.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((c) => c.id === lender.id);
              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <Link href={`/home-loans/balance-transfer/${lender.id}`}>
                    {/* Card Header */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Image
                            src={lender.logo}
                            alt={lender.name}
                            width={52}
                            height={52}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          {lender.badge && (
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                lender.badgeColor ||
                                "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {lender.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            {lender.bankType.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bricolage font-bold text-lg text-gray-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {lender.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {lender.tagline}
                      </p>

                      {/* Rate & EMI Highlight Box */}
                      <div className="mt-4 p-3.5 rounded-2xl bg-linear-to-br from-[#FDFBF7] to-[#F2EFE9]/60 border border-gray-200/70">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            Takeover Rate
                          </span>
                          <span className="text-xl font-extrabold text-primary font-bricolage">
                            {lender.interestRate.min}% <span className="text-xs font-semibold text-gray-500">p.a.</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60 text-xs">
                          <div>
                            <span className="text-[10px] text-gray-400 block">Starting 20-Yr EMI</span>
                            <span className="font-bold text-gray-900 font-mono">
                              ₹{lender.startingEmiPerLakh20Yr}/Lakh
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block">Starting 30-Yr EMI</span>
                            <span className="font-bold text-gray-900 font-mono">
                              ₹{lender.startingEmiPerLakh30Yr}/Lakh
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Parameters grid */}
                      <div className="mt-3.5 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-gray-600">
                          <span className="text-gray-400">Processing Fee:</span>
                          <span className="font-semibold text-gray-900 text-right truncate max-w-[170px]" title={lender.processingFee}>
                            {lender.processingFeeCap || lender.processingFee}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-gray-600">
                          <span className="text-gray-400">Max Top-Up Limit:</span>
                          <span className="font-bold text-emerald-700 truncate max-w-[170px]">
                            {lender.maxTopUpAmount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-gray-600">
                          <span className="text-gray-400">Turnaround Time:</span>
                          <span className="font-semibold text-gray-800">
                            {lender.turnaroundTime}
                          </span>
                        </div>

                        {lender.overdraftScheme && (
                          <div className="pt-1">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {lender.overdraftScheme}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features Snippet */}
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                        {lender.features.slice(0, 2).map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-1.5 text-[11px] text-gray-600 leading-tight"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* Card Bottom Actions */}
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => handleToggleCompare(lender)}
                          className="rounded text-primary h-3.5 w-3.5 accent-primary"
                        />
                        <span className="font-medium">Compare</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openApplyModal(
                          lender.name,
                          `Home Loan Balance Transfer starting at ${lender.interestRate.min}% p.a. • ${lender.processingFeeCap || lender.processingFee}`
                        )
                      }
                      className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>Switch to {lender.name.replace(/Home Loan|Balance Transfer/i, "").trim()}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-4">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((c) => c.id === lender.id);
              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
                >
                  <Link href={`/home-loans/balance-transfer/${lender.id}`}>
                    <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={60}
                          height={60}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            {lender.bankType.toUpperCase()}
                          </span>
                          {lender.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                lender.badgeColor ||
                                "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {lender.badge}
                            </span>
                          )}
                          {lender.overdraftScheme && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              Overdraft OD
                            </span>
                          )}
                        </div>

                        <h3 className="font-bricolage font-bold text-lg text-gray-900 leading-snug">
                          {lender.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {lender.tagline}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Middle metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 w-full lg:w-auto text-xs py-2 lg:py-0 border-y lg:border-y-0 border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Takeover Rate</span>
                      <span className="text-base font-extrabold text-primary font-bricolage block">
                        {lender.interestRate.min}% <span className="text-xs font-semibold text-gray-500">p.a.</span>
                      </span>
                      <span className="text-[10px] text-gray-500">
                        20-Yr: ₹{lender.startingEmiPerLakh20Yr}/L
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 block">Processing Fee Cap</span>
                      <span className="font-bold text-gray-900 block truncate max-w-[130px]">
                        {lender.processingFeeCap || lender.processingFee}
                      </span>
                      <span className="text-[10px] text-emerald-600">
                        {lender.turnaroundTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 block">Top-Up Available</span>
                      <span className="font-bold text-emerald-700 block truncate max-w-[130px]">
                        {lender.maxTopUpAmount}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        CIBIL {lender.minCreditScore}+
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end shrink-0">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => handleToggleCompare(lender)}
                        className="rounded text-primary h-3.5 w-3.5 accent-primary"
                      />
                      <span className="hidden sm:inline font-medium">Compare</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setSelectedLenderForDetail(lender)}
                      className="text-xs font-bold text-gray-700 hover:text-primary px-3 py-2 rounded-xl border border-gray-200 hover:border-gray-300 cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openApplyModal(
                          lender.name,
                          `Home Loan Balance Transfer starting at ${lender.interestRate.min}% p.a.`
                        )
                      }
                      className="bg-primary hover:bg-[#035259] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
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
          <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-8">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Comparison Dock (Fixed Bottom) */}
        <BalanceTransferCompareDock
          compareList={compareList}
          onRemove={(id) => setCompareList(compareList.filter((l) => l.id !== id))}
          onClear={() => setCompareList([])}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
        />

        {/* Side-by-Side Compare Modal */}
        <BalanceTransferCompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          lenders={compareList}
        />

        {/* Comprehensive Lender Detail Modal */}
        <BalanceTransferDetailModal
          lender={selectedLenderForDetail}
          onClose={() => setSelectedLenderForDetail(null)}
        />

      </div>
    </section>
  );
}
