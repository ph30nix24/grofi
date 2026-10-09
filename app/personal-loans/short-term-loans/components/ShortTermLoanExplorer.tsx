"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Zap,
  Building2,
  Percent,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Calendar,
  Scale,
} from "lucide-react";
import { ShortTermLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import ShortTermLoanCompareDock from "./ShortTermLoanCompareDock";
import ShortTermLoanCompareModal from "./ShortTermLoanCompareModal";
import ShortTermLoanDetailModal from "./ShortTermLoanDetailModal";
import Link from "next/link";

interface ShortTermLoanExplorerProps {
  initialLenders: ShortTermLoanLender[];
}

export default function ShortTermLoanExplorer({ initialLenders }: ShortTermLoanExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch = searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpeed, setSelectedSpeed] = useState<string>("all");
  const [selectedLenderType, setSelectedLenderType] = useState<string>("all");
  const [selectedTenure, setSelectedTenure] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "emi-asc" | "rate-asc" | "speed-asc" | "min-amount-asc" | "rating-desc"
  >("emi-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<ShortTermLoanLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] = useState<ShortTermLoanLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Short-Term Lenders", icon: Building2 },
    { id: "under-15-mins", label: "⏱️ Under 15 Mins", icon: Zap },
    { id: "micro-loans", label: "₹1K Micro Loans", icon: Sparkles },
    { id: "bank-short-loans", label: "Bank Short Credit", icon: Building2 },
    { id: "flexi-credit-line", label: "Flexi Credit Lines", icon: Percent },
    { id: "first-time", label: "First-Time / CIBIL 600+", icon: CheckCircle2 },
  ];

  // Disbursal speed ranks for sorting
  const getDisbursalRank = (speedCat: string, timeStr?: string): number => {
    if (speedCat === "under-5-mins") return 1;
    if (speedCat === "under-15-mins") return 2;
    if (speedCat === "under-2-hours") return 3;
    const l = (timeStr || "").toLowerCase();
    if (l.includes("sec") || l.includes("5 min") || l.includes("click")) return 1;
    if (l.includes("10 min") || l.includes("15 min")) return 2;
    if (l.includes("30 min") || l.includes("hour")) return 3;
    return 4;
  };

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category tab
      if (selectedCategory !== "all") {
        if (!lender.categories?.includes(selectedCategory)) {
          return false;
        }
      }

      // Disbursal Speed category
      if (selectedSpeed !== "all") {
        if (lender.disbursalSpeedCategory !== selectedSpeed) {
          return false;
        }
      }

      // Lender Type
      if (selectedLenderType !== "all") {
        if (lender.lenderType.toLowerCase() !== selectedLenderType.toLowerCase()) {
          return false;
        }
      }

      // Short Tenure Filter
      if (selectedTenure !== "all") {
        const matchesTenure = lender.shortTenureOptions?.some((t) =>
          t.toLowerCase().includes(selectedTenure.toLowerCase())
        );
        if (!matchesTenure) {
          return false;
        }
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
        const inEntity = lender.rbiRegulatedEntity.toLowerCase().includes(q);
        const inRecommended = lender.recommendedFor.toLowerCase().includes(q);
        const inFeatures = lender.features.some((f) => f.toLowerCase().includes(q));
        if (!inName && !inTagline && !inEntity && !inRecommended && !inFeatures) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case "emi-asc":
          return a.startingEmiPerLakh - b.startingEmiPerLakh;
        case "rate-asc":
          return (a.interestRate?.min ?? 99) - (b.interestRate?.min ?? 99);
        case "speed-asc":
          return (
            getDisbursalRank(a.disbursalSpeedCategory, a.disbursalTime) -
            getDisbursalRank(b.disbursalSpeedCategory, b.disbursalTime)
          );
        case "min-amount-asc":
          return a.minAmountNum - b.minAmountNum;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return list;
  }, [
    initialLenders,
    selectedCategory,
    selectedSpeed,
    selectedLenderType,
    selectedTenure,
    selectedMinCibil,
    searchQuery,
    sortBy,
  ]);

  // Pagination calculation
  const totalItems = filteredAndSortedLenders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedLenders = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedLenders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedLenders, safeCurrentPage]);

  // Compare management
  const handleToggleCompare = (lender: ShortTermLoanLender) => {
    if (compareList.some((item) => item.id === lender.id)) {
      setCompareList(compareList.filter((item) => item.id !== lender.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 lenders simultaneously.");
        return;
      }
      setCompareList([...compareList, lender]);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList(compareList.filter((item) => item.id !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSpeed("all");
    setSelectedLenderType("all");
    setSelectedTenure("all");
    setSelectedMinCibil("all");
    setSortBy("emi-asc");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("short-term-lenders-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  return (
    <section id="short-term-lenders-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtext */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Verified Short-Term Credit Marketplace
          </div>
          <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Compare Top <span className="text-primary">Short-Term Personal Loans</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Real-time interest rates, short tenure options (3 to 12 months), and RBI regulatory safeguards across all {initialLenders.length} verified partner institutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200/80 no-scrollbar">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200/90 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by lender, NBFC name, features, or keywords..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-9 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Short Tenure Filter */}
              <select
                value={selectedTenure}
                onChange={(e) => {
                  setSelectedTenure(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-semibold focus:outline-hidden focus:border-primary cursor-pointer"
              >
                <option value="all">All Tenures</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
                <option value="12">12 Months</option>
              </select>

              {/* Disbursal Speed Filter */}
              <select
                value={selectedSpeed}
                onChange={(e) => {
                  setSelectedSpeed(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-semibold focus:outline-hidden focus:border-primary cursor-pointer"
              >
                <option value="all">All Speeds</option>
                <option value="under-5-mins">⚡ Under 5 Mins</option>
                <option value="under-15-mins">⏱️ Under 15 Mins</option>
                <option value="under-2-hours">🕒 Under 2 Hours</option>
              </select>

              {/* Lender Type Filter */}
              <select
                value={selectedLenderType}
                onChange={(e) => {
                  setSelectedLenderType(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-semibold focus:outline-hidden focus:border-primary cursor-pointer"
              >
                <option value="all">All Institution Types</option>
                <option value="bank">Scheduled Banks</option>
                <option value="nbfc">RBI NBFCs</option>
                <option value="fintech">Fintech Platforms</option>
              </select>

              {/* Min CIBIL Score Filter */}
              <select
                value={selectedMinCibil}
                onChange={(e) => {
                  setSelectedMinCibil(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-semibold focus:outline-hidden focus:border-primary cursor-pointer"
              >
                <option value="all">Any Credit Score</option>
                <option value="600">CIBIL 600+</option>
                <option value="650">CIBIL 650+</option>
                <option value="700">CIBIL 700+</option>
                <option value="750">CIBIL 750+ (Prime)</option>
              </select>
            </div>
          </div>

          {/* Bottom Bar: Sort & View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold text-gray-900">
                {filteredAndSortedLenders.length}
              </span>
              <span>lenders matching your criteria</span>
              {(searchQuery ||
                selectedCategory !== "all" ||
                selectedSpeed !== "all" ||
                selectedLenderType !== "all" ||
                selectedTenure !== "all" ||
                selectedMinCibil !== "all") && (
                <button
                  onClick={handleResetFilters}
                  className="text-primary hover:underline font-bold flex items-center gap-1 ml-2 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-800 font-bold focus:outline-hidden focus:border-primary cursor-pointer"
                >
                  <option value="emi-asc">Lowest EMI per Lakh</option>
                  <option value="rate-asc">Lowest Interest Rate</option>
                  <option value="speed-asc">Fastest Disbursal</option>
                  <option value="min-amount-asc">Lowest Min Borrowing (Micro)</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-white text-primary shadow-2xs" : "text-gray-400"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-white text-primary shadow-2xs" : "text-gray-400"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lenders List / Grid */}
        {paginatedLenders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-xl mx-auto shadow-xs">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bricolage font-bold text-lg text-gray-900">
              No matching short-term lenders found
            </h4>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Try loosening your filters or clearing your search term to see more lenders.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-primary hover:bg-[#02383d] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((item) => item.id === lender.id);

              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/90 hover:border-primary/40 p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <Link href={`/personal-loans/short-term-loans/${lender.id}`}>
                    {/* Top Row: Logo, Badges, Compare Checkbox */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-[#FDFBF7] border border-gray-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                            <Image
                              src={lender.logo}
                              alt={lender.name}
                              width={48}
                              height={48}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div>
                            <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors leading-tight">
                              {lender.name}
                            </h3>
                            <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                              {lender.rbiRegulatedEntity}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleCompare(lender)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                            isCompared
                              ? "bg-primary text-white border-primary"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                          title="Add to comparison"
                        >
                          <Scale className="w-3 h-3" />
                          <span>{isCompared ? "Compared" : "Compare"}</span>
                        </button>
                      </div>

                      {/* Badge & Disbursal Speed Tag */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {lender.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"}`}>
                            {lender.badge}
                          </span>
                        )}

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-gold" />
                          <span>{lender.disbursalTime}</span>
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-blue-600" />
                          <span>{lender.coolingOffPeriod} Look-Up</span>
                        </span>
                      </div>

                      {/* Rate & Starting EMI Matrix */}
                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#FDFBF7] border border-gray-200/70 mb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Interest Rate
                          </span>
                          <div className="font-bricolage font-extrabold text-base text-primary">
                            {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                          </div>
                          {lender.interestRate?.monthlyRateText && (
                            <span className="text-[10px] text-amber-700 font-medium block">
                              {lender.interestRate.monthlyRateText}
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Starting EMI (12M)
                          </span>
                          <div className="font-bricolage font-extrabold text-base text-gray-900">
                            ₹{formatINR(lender.startingEmiPerLakh)}
                          </div>
                          <span className="text-[10px] text-gray-500 block">per ₹1 Lakh</span>
                        </div>
                      </div>

                      {/* Short Tenure Chips */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          Short Tenure Options:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lender.shortTenureOptions?.map((opt) => (
                            <span
                              key={opt}
                              className="px-2 py-0.5 rounded-lg bg-amber-50/70 text-amber-900 border border-amber-200/80 text-[10px] font-bold"
                            >
                              {opt}
                            </span>
                          )) || (
                            <span className="text-xs font-semibold text-gray-700">{lender.tenure}</span>
                          )}
                        </div>
                      </div>

                      {/* Loan Limits & Key Metrics */}
                      <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-400 text-[11px]">Loan Amount:</span>
                          <span className="font-bold text-gray-900">
                            {lender.minAmount} - {lender.maxAmount}
                          </span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-400 text-[11px]">Processing Fee:</span>
                          <span className="font-semibold text-gray-800 text-[11px]">
                            {lender.processingFee}
                          </span>
                        </div>

                        <div className="flex justify-between py-1">
                          <span className="text-gray-400 text-[11px]">Min Eligibility:</span>
                          <span className="font-semibold text-gray-800 text-[11px]">
                            {lender.minCreditScore}+ CIBIL • {lender.minIncome}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Actions: View Details & Apply */}
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedLenderForDetail(lender)}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-2.5 px-3 rounded-xl border border-gray-200 text-xs transition-colors cursor-pointer text-center"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        openApplyModal(
                          lender.name,
                          `Short-Term Loan application for ${lender.name}`
                        )
                      }
                      className="flex-1 bg-primary hover:bg-[#02383d] text-white font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
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
                  className="bg-white rounded-3xl border border-gray-200/90 hover:border-primary/40 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 group"
                >
                  <Link href={`/personal-loans/short-term-loans/${lender.id}`}>
                    {/* Left: Lender Info */}
                    <div className="flex items-start gap-4 max-w-sm">
                      <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] border border-gray-200/80 p-2 flex items-center justify-center shrink-0">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={52}
                          height={52}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors">
                            {lender.name}
                          </h3>
                          {lender.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"}`}>
                              {lender.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-gray-500 line-clamp-1 mb-1.5">
                          {lender.rbiRegulatedEntity}
                        </p>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-gold" />
                            {lender.disbursalTime}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            {lender.coolingOffPeriod} Look-Up
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Middle: Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                        Interest Rate
                      </span>
                      <span className="font-bricolage font-bold text-primary text-sm block">
                        {lender.interestRate?.text || `${lender.interestRate?.min}% p.a.`}
                      </span>
                      {lender.interestRate?.monthlyRateText && (
                        <span className="text-[10px] text-amber-700 font-medium block">
                          {lender.interestRate.monthlyRateText}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                        EMI / ₹1 Lakh
                      </span>
                      <span className="font-bricolage font-bold text-gray-900 text-sm block">
                        ₹{formatINR(lender.startingEmiPerLakh)}
                      </span>
                      <span className="text-[10px] text-gray-500">12 Months</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                        Loan Limits
                      </span>
                      <span className="font-bold text-gray-900 text-xs block">
                        {lender.minAmount} - {lender.maxAmount}
                      </span>
                      <span className="text-[10px] text-gray-500">{lender.shortTenureOptions?.[0]} min</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                        Eligibility
                      </span>
                      <span className="font-bold text-gray-900 text-xs block">
                        {lender.minCreditScore}+ CIBIL
                      </span>
                      <span className="text-[10px] text-gray-500">{lender.minIncome}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex sm:flex-col items-center gap-2 w-full lg:w-40 shrink-0">
                    <button
                      onClick={() =>
                        openApplyModal(
                          lender.name,
                          `Short-Term Loan application for ${lender.name}`
                        )
                      }
                      className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </button>

                    <div className="flex items-center gap-1 w-full">
                      <button
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-1.5 px-2 rounded-lg border border-gray-200 text-[11px] transition-colors cursor-pointer text-center"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleToggleCompare(lender)}
                        className={`px-2 py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          isCompared
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                        title="Compare"
                      >
                        <Scale className="w-3 h-3" />
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
          <div className="mt-10 flex items-center justify-center gap-2 font-montserrat">
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  safeCurrentPage === page
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Comparison Dock (when items selected) */}
        <ShortTermLoanCompareDock
          compareList={compareList}
          onRemove={handleRemoveCompare}
          onClear={handleClearCompare}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
        />

        {/* Side-by-Side Compare Modal */}
        <ShortTermLoanCompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          compareList={compareList}
          onRemove={handleRemoveCompare}
        />

        {/* Lender Detail Modal */}
        <ShortTermLoanDetailModal
          lender={selectedLenderForDetail}
          onClose={() => setSelectedLenderForDetail(null)}
        />
      </div>
    </section>
  );
}
