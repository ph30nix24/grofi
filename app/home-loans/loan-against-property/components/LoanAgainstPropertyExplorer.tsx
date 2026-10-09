"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Sparkles,
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
  Star,
  Layers,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import LoanAgainstPropertyCompareDock from "./LoanAgainstPropertyCompareDock";
import LoanAgainstPropertyCompareModal from "./LoanAgainstPropertyCompareModal";
import LoanAgainstPropertyDetailModal from "./LoanAgainstPropertyDetailModal";
import Link from "next/link";

interface LoanAgainstPropertyExplorerProps {
  initialLenders: LoanAgainstPropertyLender[];
}

export default function LoanAgainstPropertyExplorer({
  initialLenders,
}: LoanAgainstPropertyExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch = searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBankType, setSelectedBankType] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [selectedOverdraftOnly, setSelectedOverdraftOnly] = useState<boolean>(false);
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "rate-asc" | "emi15-asc" | "emi20-asc" | "amount-desc" | "ltv-desc" | "rating-desc"
  >("rate-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<LoanAgainstPropertyLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] = useState<LoanAgainstPropertyLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All LAP Lenders", icon: Building2 },
    { id: "low-rate", label: "Lowest Rates (< 9.5%)", icon: TrendingDown },
    { id: "psu", label: "PSU Banks", icon: Home },
    { id: "private", label: "Private Banks", icon: Sparkles },
    { id: "nbfc", label: "NBFCs / HFCs", icon: Percent },
    { id: "overdraft", label: "Overdraft Facility", icon: RefreshCw },
    { id: "high-ltv", label: "High LTV (≥ 70%)", icon: CheckCircle2 },
  ];

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category check
      if (selectedCategory !== "all") {
        if (selectedCategory === "low-rate") {
          const minRate = lender.interestRate?.min ?? 99;
          if (minRate > 9.5 && !lender.category?.includes("low-rate")) return false;
        } else if (selectedCategory === "psu") {
          if (lender.bankType.toLowerCase() !== "psu" && !lender.category?.includes("psu")) return false;
        } else if (selectedCategory === "private") {
          if (lender.bankType.toLowerCase() !== "private" && !lender.category?.includes("private")) return false;
        } else if (selectedCategory === "nbfc") {
          const bt = lender.bankType.toLowerCase();
          if (bt !== "nbfc" && bt !== "hfc" && !lender.category?.includes("nbfc") && !lender.category?.includes("hfc")) return false;
        } else if (selectedCategory === "overdraft") {
          if (!lender.overdraftAvailable && !lender.category?.includes("overdraft")) return false;
        } else if (selectedCategory === "high-ltv") {
          if (lender.maxLtvPercent < 70 && !lender.category?.includes("high-ltv")) return false;
        }
      }

      // Bank Type check
      if (selectedBankType !== "all") {
        if (lender.bankType?.toLowerCase() !== selectedBankType.toLowerCase()) {
          return false;
        }
      }

      // Overdraft toggle
      if (selectedOverdraftOnly && !lender.overdraftAvailable) {
        return false;
      }

      // Property type filter
      if (selectedPropertyFilter !== "all") {
        const matchesProp = lender.propertyTypesAccepted.some((p) =>
          p.toLowerCase().includes(selectedPropertyFilter.toLowerCase())
        );
        if (!matchesProp) return false;
      }

      // Min CIBIL Score Filter
      if (selectedMinCibil !== "all") {
        const target = parseInt(selectedMinCibil, 10);
        if (lender.minCreditScore > target) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = lender.name.toLowerCase().includes(q);
        const inTagline = lender.tagline.toLowerCase().includes(q);
        const inProps = lender.propertyTypesAccepted.some((p) => p.toLowerCase().includes(q));
        const inOd = lender.overdraftScheme?.toLowerCase().includes(q) ?? false;
        const inFeatures = lender.features.some((f) => f.toLowerCase().includes(q));
        if (!inName && !inTagline && !inProps && !inOd && !inFeatures) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "rate-asc") {
        return (a.interestRate?.min ?? 99) - (b.interestRate?.min ?? 99);
      }
      if (sortBy === "emi15-asc") {
        return a.startingEmiPerLakh15Yr - b.startingEmiPerLakh15Yr;
      }
      if (sortBy === "emi20-asc") {
        return a.startingEmiPerLakh20Yr - b.startingEmiPerLakh20Yr;
      }
      if (sortBy === "amount-desc") {
        return b.maxAmountNum - a.maxAmountNum;
      }
      if (sortBy === "ltv-desc") {
        return b.maxLtvPercent - a.maxLtvPercent;
      }
      if (sortBy === "rating-desc") {
        return b.rating - a.rating;
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
    selectedPropertyFilter,
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

  // Comparison toggle
  const toggleCompare = (lender: LoanAgainstPropertyLender) => {
    if (compareList.some((item) => item.id === lender.id)) {
      setCompareList(compareList.filter((item) => item.id !== lender.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 lenders at a time.");
        return;
      }
      setCompareList([...compareList, lender]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBankType("all");
    setSelectedMinCibil("all");
    setSelectedOverdraftOnly(false);
    setSelectedPropertyFilter("all");
    setSortBy("rate-asc");
    setCurrentPage(1);
  };

  return (
    <section id="lenders-list-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Layers className="w-3.5 h-3.5 text-gold" />
            Verified Mortgage Rates & LTVs
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Compare Top Loan Against Property <span className="text-primary">Lenders in India</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Compare interest rates, starting EMI per lakh, permissible LTV ratios, overdraft schemes, and processing fees across leading PSU banks, private banks, and NBFCs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hidden">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-gold" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input (4 cols) */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search bank name, overdraft, feature..."
                className="w-full bg-gray-50 text-gray-800 text-xs pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bank Type Dropdown (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedBankType}
                onChange={(e) => {
                  setSelectedBankType(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Bank Type"
                className="w-full bg-gray-50 text-gray-800 text-xs py-2.5 px-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-primary font-medium cursor-pointer"
              >
                <option value="all">All Bank Types</option>
                <option value="psu">PSU Banks (SBI, BoB, PNB)</option>
                <option value="private">Private Banks (HDFC, ICICI, Axis)</option>
                <option value="nbfc">NBFCs & HFCs (Bajaj, Tata)</option>
              </select>
            </div>

            {/* Property Filter Dropdown (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedPropertyFilter}
                onChange={(e) => {
                  setSelectedPropertyFilter(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Collateral Type"
                className="w-full bg-gray-50 text-gray-800 text-xs py-2.5 px-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-primary font-medium cursor-pointer"
              >
                <option value="all">All Collateral Types</option>
                <option value="residential">Residential Flats/Plots</option>
                <option value="commercial">Commercial Offices/Shops</option>
                <option value="industrial">Industrial Properties</option>
              </select>
            </div>

            {/* Sort Dropdown (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "rate-asc"
                      | "emi15-asc"
                      | "emi20-asc"
                      | "amount-desc"
                      | "ltv-desc"
                      | "rating-desc"
                  )
                }
                aria-label="Sort LAP Offers"
                className="w-full bg-gray-50 text-gray-800 text-xs py-2.5 px-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-primary font-medium cursor-pointer"
              >
                <option value="rate-asc">Lowest Rate First</option>
                <option value="emi15-asc">Lowest EMI (15 Yr)</option>
                <option value="emi20-asc">Lowest EMI (20 Yr)</option>
                <option value="ltv-desc">Highest LTV First</option>
                <option value="amount-desc">Highest Max Loan</option>
                <option value="rating-desc">Highest Customer Rating</option>
              </select>
            </div>

            {/* View Mode & Reset (2 cols) */}
            <div className="lg:col-span-2 flex items-center justify-between sm:justify-end gap-2">
              <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-white text-primary shadow-xs" : "text-gray-400 hover:text-gray-700"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-white text-primary shadow-xs" : "text-gray-400 hover:text-gray-700"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {(selectedCategory !== "all" ||
                selectedBankType !== "all" ||
                selectedPropertyFilter !== "all" ||
                searchQuery !== "") && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter & Active Criteria */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-600">
          <div>
            Showing <strong className="text-gray-900 font-bold">{paginatedLenders.length}</strong> of{" "}
            <strong className="text-gray-900 font-bold">{totalItems}</strong> Loan Against Property offers
          </div>
          <div className="text-xs text-gray-500 hidden sm:block">
            Prepayment charges: <strong className="text-emerald-700 font-bold">0% on floating rate loans</strong>
          </div>
        </div>

        {/* No Results Fallback */}
        {filteredAndSortedLenders.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-bricolage font-bold text-xl text-gray-900 mb-2">
              No matching loan offers found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Try adjusting your search criteria, clearing filters, or exploring all 10 lenders.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="bg-primary hover:bg-[#023337] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Cards Display Grid / List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((item) => item.id === lender.id);

              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/90 hover:border-primary/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <Link href={`/home-loans/loan-against-property/${lender.id}`}>
                    {/* Top Card Section */}
                    <div className="p-5 sm:p-6 pb-4">
                      {/* Header: Logo, Bank Type & Rating */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-13 h-13 rounded-2xl bg-white border border-gray-200/80 p-2 flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                            <Image
                              src={lender.logo}
                              alt={lender.name}
                              width={48}
                              height={48}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                {lender.bankType.toUpperCase()}
                              </span>
                              {lender.overdraftAvailable && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  OD Available
                                </span>
                              )}
                            </div>
                            <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-tight">
                              {lender.name}
                            </h3>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-xl shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span className="font-bricolage font-bold text-xs text-amber-900">
                            {lender.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Badge */}
                      {lender.badge && (
                        <div className="mb-3.5">
                          <span
                            className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
                              lender.badgeColor || "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {lender.badge}
                          </span>
                        </div>
                      )}

                      {/* Tagline */}
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                        {lender.tagline}
                      </p>

                      {/* 4-Metric Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-[#FDFBF7] p-3 rounded-2xl border border-gray-100 mb-4">
                        {/* Metric 1: Rate */}
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            Interest Rate
                          </span>
                          <div className="font-bricolage font-bold text-sm text-gray-900">
                            {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                          </div>
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            From {lender.interestRate?.min}% p.a.
                          </span>
                        </div>

                        {/* Metric 2: EMI */}
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            EMI / ₹1 Lakh (15Y)
                          </span>
                          <div className="font-bricolage font-bold text-sm text-primary">
                            ₹{lender.startingEmiPerLakh15Yr}
                            <span className="text-[10px] font-normal text-gray-500">/mo</span>
                          </div>
                          <span className="text-[10px] text-gray-500">
                            20Y: ₹{lender.startingEmiPerLakh20Yr}/mo
                          </span>
                        </div>

                        {/* Metric 3: Max Loan */}
                        <div className="pt-2 border-t border-gray-200/50">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            Max Funding
                          </span>
                          <div className="font-bricolage font-bold text-xs sm:text-sm text-gray-900 truncate">
                            {lender.maxAmount}
                          </div>
                        </div>

                        {/* Metric 4: Max LTV */}
                        <div className="pt-2 border-t border-gray-200/50">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            Max LTV Ratio
                          </span>
                          <div className="font-bricolage font-bold text-sm text-emerald-800">
                            Up to {lender.maxLtvPercent}%
                          </div>
                        </div>
                      </div>

                      {/* Accepted Collateral Pills */}
                      <div className="mb-3.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Accepted Properties
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {lender.propertyTypesAccepted.slice(0, 2).map((prop, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-lg font-medium truncate max-w-[170px]"
                            >
                              {prop}
                            </span>
                          ))}
                          {lender.propertyTypesAccepted.length > 2 && (
                            <span className="text-[10px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded-lg">
                              +{lender.propertyTypesAccepted.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Processing Fee & Overdraft Pill */}
                      <div className="text-[11px] text-gray-600 space-y-1 mb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Processing Fee:</span>
                          <span className="font-semibold text-gray-800 truncate max-w-[180px]">
                            {lender.processingFeeCap || lender.processingFee}
                          </span>
                        </div>
                        {lender.overdraftScheme && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">OD Scheme:</span>
                            <span className="font-semibold text-emerald-700 truncate max-w-[180px]">
                              {lender.overdraftScheme}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Card Bottom / Actions */}
                  <div className="p-5 pt-3 border-t border-gray-100 bg-gray-50/70">
                    {/* Compare Checkbox */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => toggleCompare(lender)}
                          className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                        />
                        <span className="text-gray-600 font-medium">Add to Compare</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="text-primary hover:text-[#023337] font-bold text-xs underline decoration-primary/30 hover:decoration-primary cursor-pointer"
                      >
                        View Full Specs
                      </button>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={() => openApplyModal(lender.name, "Loan Against Property")}
                      className="w-full bg-primary hover:bg-[#023337] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-md"
                    >
                      <span>Check Pre-Approved Offer</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              const isCompared = compareList.some((item) => item.id === lender.id);

              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/90 hover:border-primary/40 shadow-xs hover:shadow-lg transition-all p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <Link href={`/home-loans/loan-against-property/${lender.id}`}>
                    {/* Left: Bank Info */}
                    <div className="flex items-start gap-4 min-w-65 max-w-sm">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shadow-2xs shrink-0">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={48}
                          height={48}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            {lender.bankType.toUpperCase()}
                          </span>
                          {lender.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                lender.badgeColor || "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {lender.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 leading-snug">
                          {lender.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {lender.tagline}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Middle: 4 Key Columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto flex-1">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        Interest Rate
                      </span>
                      <div className="font-bricolage font-bold text-sm text-gray-900">
                        {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        From {lender.interestRate?.min}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        EMI / ₹1 Lakh (15Y)
                      </span>
                      <div className="font-bricolage font-bold text-sm text-primary">
                        ₹{lender.startingEmiPerLakh15Yr} / mo
                      </div>
                      <span className="text-[10px] text-gray-500">
                        20Y: ₹{lender.startingEmiPerLakh20Yr}/mo
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        Max LTV Ratio
                      </span>
                      <div className="font-bricolage font-bold text-sm text-emerald-800">
                        Up to {lender.maxLtvPercent}% LTV
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {lender.tenureYears} Yrs max
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        Overdraft Scheme
                      </span>
                      <div className="text-xs font-semibold text-gray-800">
                        {lender.overdraftAvailable ? (
                          <span className="text-emerald-700 font-bold">
                            {lender.overdraftScheme ? "Available (OD)" : "Available"}
                          </span>
                        ) : (
                          <span className="text-gray-400">Term Loan</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        CIBIL {lender.minCreditScore}+
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-3 shrink-0">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-600 font-medium select-none">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => toggleCompare(lender)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                      />
                      <span>Compare</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Specs
                      </button>
                      <button
                        type="button"
                        onClick={() => openApplyModal(lender.name, "Loan Against Property")}
                        className="bg-primary hover:bg-[#023337] text-white font-bold text-xs sm:text-sm py-2 px-4 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
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

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage(safeCurrentPage - 1)}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    safeCurrentPage === pageNumber
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage(safeCurrentPage + 1)}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Compare Dock */}
      <LoanAgainstPropertyCompareDock
        compareList={compareList}
        onRemove={(id) => setCompareList(compareList.filter((c) => c.id !== id))}
        onClear={() => setCompareList([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Side-by-Side Compare Modal */}
      <LoanAgainstPropertyCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        lenders={compareList}
      />

      {/* Full Details Modal */}
      <LoanAgainstPropertyDetailModal
        lender={selectedLenderForDetail}
        onClose={() => setSelectedLenderForDetail(null)}
      />
    </section>
  );
}
