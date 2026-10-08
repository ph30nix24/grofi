"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Zap,
  Clock,
  Building2,
  Percent,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { InstantLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";
import InstantLoanCompareDock from "./InstantLoanCompareDock";
import InstantLoanCompareModal from "./InstantLoanCompareModal";
import InstantLoanDetailModal from "./InstantLoanDetailModal";
import Link from "next/link";

interface InstantLoanExplorerProps {
  initialLenders: InstantLoanLender[];
}

export default function InstantLoanExplorer({ initialLenders }: InstantLoanExplorerProps) {
  const { openApplyModal } = useApplyModal();
  const searchParams = useSearchParams();

  // Search & Filter state
  const initialSearch = searchParams?.get("search") || searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpeed, setSelectedSpeed] = useState<string>("all");
  const [selectedLenderType, setSelectedLenderType] = useState<string>("all");
  const [selectedMinCibil, setSelectedMinCibil] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"speed-asc" | "rate-asc" | "amount-desc" | "emi-asc" | "rating-desc">("speed-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Comparison & Detail Modal states
  const [compareList, setCompareList] = useState<InstantLoanLender[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedLenderForDetail, setSelectedLenderForDetail] = useState<InstantLoanLender | null>(null);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Instant Lenders", icon: Building2 },
    { id: "fast-apps", label: "Fast Apps (Navi, KreditBee, etc.)", icon: Zap },
    { id: "pre-approved-banks", label: "Pre-Approved Bank Cash", icon: Building2 },
    { id: "flexi", label: "Flexi Overdrafts", icon: Percent },
    { id: "low-cibil", label: "CIBIL 600+ Friendly", icon: Sparkles },
    { id: "first-time", label: "First-Time Borrowers", icon: CheckCircle2 },
  ];

  // Speed filter pills
  const speedFilters = [
    { id: "all", label: "All Speeds" },
    { id: "under-10-seconds", label: "⚡ < 10 Seconds" },
    { id: "under-15-mins", label: "⏱️ < 15 Mins" },
    { id: "under-2-hours", label: "🕒 < 2 Hours" },
    { id: "same-day", label: "📅 Same Day" },
  ];

  // Speed rank helper for sorting
  const getDisbursalRank = (speedCat: string, timeStr?: string): number => {
    if (speedCat === "under-10-seconds") return 1;
    if (speedCat === "under-15-mins") return 2;
    if (speedCat === "under-2-hours") return 3;
    if (speedCat === "same-day") return 4;
    const l = (timeStr || "").toLowerCase();
    if (l.includes("sec")) return 1;
    if (l.includes("min")) return 2;
    if (l.includes("hour")) return 3;
    return 5;
  };

  // Filter & Sort Logic
  const filteredAndSortedLenders = useMemo(() => {
    const list = initialLenders.filter((lender) => {
      // Category tab
      if (selectedCategory !== "all") {
        if (!lender.categories.includes(selectedCategory)) {
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

      // CIBIL Score requirement
      if (selectedMinCibil !== "all") {
        const reqScore = Number(selectedMinCibil);
        if (lender.minCreditScore > reqScore) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = lender.name.toLowerCase().includes(query);
        const matchTagline = lender.tagline.toLowerCase().includes(query);
        const matchRec = lender.recommendedFor.toLowerCase().includes(query);
        const matchSpeed = lender.disbursalTime.toLowerCase().includes(query);
        const matchFeatures = lender.features.some((f) => f.toLowerCase().includes(query));

        if (!matchName && !matchTagline && !matchRec && !matchSpeed && !matchFeatures) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "speed-asc") {
        const rankA = getDisbursalRank(a.disbursalSpeedCategory, a.disbursalTime);
        const rankB = getDisbursalRank(b.disbursalSpeedCategory, b.disbursalTime);
        if (rankA !== rankB) return rankA - rankB;
        return a.startingEmiPerLakh - b.startingEmiPerLakh;
      }
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
      if (sortBy === "rating-desc") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

    return list;
  }, [
    initialLenders,
    selectedCategory,
    selectedSpeed,
    selectedLenderType,
    selectedMinCibil,
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

  // Comparison handlers
  const toggleCompare = (lender: InstantLoanLender) => {
    if (compareList.some((c) => c.id === lender.id)) {
      setCompareList(compareList.filter((c) => c.id !== lender.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 instant lenders at once.");
        return;
      }
      setCompareList([...compareList, lender]);
    }
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSpeed("all");
    setSelectedLenderType("all");
    setSelectedMinCibil("all");
    setSortBy("speed-asc");
    setCurrentPage(1);
  };

  const getSpeedBadgeColor = (speedCat: string) => {
    switch (speedCat) {
      case "under-10-seconds":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "under-15-mins":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "under-2-hours":
        return "bg-blue-100 text-blue-900 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <section id="lenders-list-section" className="py-12 sm:py-16 bg-[#FDFBF7] font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-gold" />
              16 Verified Instant Loan Lenders
            </div>
            <h2 className="font-bricolage font-bold text-2xl sm:text-4xl text-gray-900 tracking-tight">
              Compare & Pick Your <span className="text-primary">Instant Cash Partner</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl">
              100% RBI regulated. Filter by disbursal speed, minimum salary, or credit score to find instant bank account credit.
            </p>
          </div>

          {/* View Mode Toggle & Results Count */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold text-gray-500">
              Showing <span className="text-gray-900 font-bold">{filteredAndSortedLenders.length}</span> of {initialLenders.length} Lenders
            </span>

            <div className="bg-white p-1 rounded-xl border border-gray-200 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-900"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs mb-8 space-y-3">
          {/* Top Row: Search + Disbursal Speed Filter Chips */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search lenders (e.g. HDFC, Navi, 10s, low cibil)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Speed Category Quick Filter Chips */}
            <div className="lg:col-span-7 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 mr-1 hidden sm:inline">Speed:</span>
              {speedFilters.map((sf) => (
                <button
                  key={sf.id}
                  onClick={() => {
                    setSelectedSpeed(sf.id);
                    setCurrentPage(1);
                  }}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer border ${
                    selectedSpeed === sf.id
                      ? "bg-amber-50 text-amber-900 border-amber-300 font-bold"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {sf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Dropdowns (Lender Type, Min CIBIL, Sort By, Clear) */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-3 text-xs">
            {/* Lender Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">Institution:</span>
              <select
                value={selectedLenderType}
                onChange={(e) => {
                  setSelectedLenderType(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 font-semibold focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">All Lenders</option>
                <option value="bank">Banks Only</option>
                <option value="fintech">Fintech Apps</option>
                <option value="nbfc">NBFCs</option>
              </select>
            </div>

            {/* Min CIBIL */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">Min CIBIL:</span>
              <select
                value={selectedMinCibil}
                onChange={(e) => {
                  setSelectedMinCibil(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 font-semibold focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">Any Score</option>
                <option value="600">600+ (App Friendly)</option>
                <option value="650">650+ (Fair)</option>
                <option value="700">700+ (Good)</option>
                <option value="720">720+ (Prime)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 sm:ml-auto">
              <span className="text-gray-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 font-semibold focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="speed-asc">⚡ Fastest Disbursal First</option>
                <option value="rate-asc">📉 Lowest Interest Rate</option>
                <option value="amount-desc">💰 Highest Loan Limit</option>
                <option value="emi-asc">🏷️ Lowest Starting EMI</option>
                <option value="rating-desc">⭐ Highest Rating</option>
              </select>
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedCategory !== "all" || selectedSpeed !== "all" || selectedLenderType !== "all" || selectedMinCibil !== "all" || sortBy !== "speed-asc") && (
              <button
                onClick={resetAllFilters}
                className="text-gray-500 hover:text-red-500 font-semibold flex items-center gap-1 transition-colors cursor-pointer ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedLenders.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Zap className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-bricolage font-bold text-xl text-gray-900">
              No Matching Instant Lenders Found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Try adjusting your search query, speed filter, or credit score criteria.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-5 bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs hover:bg-[#02383d] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && filteredAndSortedLenders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((c) => c.id === lender.id);

              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-primary/30"
                >

                  <Link href={`/personal-loans/instant-loans/${lender.id}`}>
                    {/* Card Header */}
                    <div className="p-5 pb-4 border-b border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-13 h-13 rounded-2xl bg-white border border-gray-200 p-1.5 shadow-2xs flex items-center justify-center shrink-0">
                            <Image
                              src={lender.logo}
                              alt={lender.name}
                              width={46}
                              height={46}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                {lender.name}
                              </h3>
                            </div>
                            <span className="text-[11px] text-gray-500 font-medium block line-clamp-1 mt-0.5">
                              {lender.tagline}
                            </span>
                          </div>
                        </div>

                        {/* Disbursal Speed Pill */}
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 flex items-center gap-1 ${getSpeedBadgeColor(lender.disbursalSpeedCategory)}`}>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{lender.disbursalTime}</span>
                        </span>
                      </div>

                      {/* Badge & App Rating row */}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        {lender.badge ? (
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${lender.badgeColor || "bg-amber-50 text-amber-800 border-amber-200"}`}>
                            {lender.badge}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            RBI Regulated
                          </span>
                        )}

                        <div className="flex items-center gap-1 text-[11px] text-gray-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-gray-900">{lender.rating.toFixed(1)}</span>
                          <span className="text-gray-400">
                            ({lender.appDownloads ? lender.appDownloads : lender.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Card Body: Rate & Terms Matrix */}
                    <div className="p-5 py-4 space-y-3.5 flex-1 bg-linear-to-b from-white to-[#FDFBF7]/40">
                      {/* Rate & Starting EMI Highlight */}
                      <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50/80 rounded-2xl border border-gray-100">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Interest Rate
                          </span>
                          <span className="font-bricolage font-bold text-sm sm:text-base text-emerald-700 block">
                            {lender.interestRate.text}
                          </span>
                          <span className="text-[10px] text-gray-500">Monthly Reducing</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Starting EMI
                          </span>
                          <span className="font-bricolage font-bold text-sm sm:text-base text-gray-900 block">
                            ₹{lender.startingEmiPerLakh.toLocaleString("en-IN")}/mo
                          </span>
                          <span className="text-[10px] text-gray-500">Per ₹1 Lakh</span>
                        </div>
                      </div>

                      {/* Limit, Min Income, Min CIBIL */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between items-center py-1 border-b border-gray-100">
                          <span className="text-gray-500">Max Loan Limit:</span>
                          <span className="font-bold text-primary">{lender.maxAmount}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-100">
                          <span className="text-gray-500">Min CIBIL Needed:</span>
                          <span className="font-bold text-gray-800">{lender.minCreditScore}+</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-100">
                          <span className="text-gray-500">Processing Fee:</span>
                          <span className="font-medium text-gray-700 truncate max-w-42.5" title={lender.processingFee}>
                            {lender.processingFee}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-gray-500">Documentation:</span>
                          <span className="font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {lender.documentation}
                          </span>
                        </div>
                      </div>

                      {/* Features list (top 2 bullets) */}
                      <div className="pt-1 space-y-1.5 text-[11px] text-gray-600">
                        {lender.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>


                  {/* Card Footer: Compare Checkbox, Details, Apply Now */}
                  <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      {/* Compare toggle */}
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => toggleCompare(lender)}
                          className="w-3.5 h-3.5 rounded text-primary accent-primary cursor-pointer"
                        />
                        <span>Compare</span>
                      </label>

                      {/* View details */}
                      <button
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="text-xs text-primary hover:text-primary/80 font-bold hover:underline cursor-pointer"
                      >
                        View Details & FAQs
                      </button>
                    </div>

                    {/* Apply Now CTA */}
                    <button
                      onClick={() => openApplyModal(lender.name, `Instant loan with ${lender.disbursalTime} disbursal`)}
                      className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-gold" />
                      <span>Get Instant Cash</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === "list" && filteredAndSortedLenders.length > 0 && (
          <div className="space-y-4">
            {paginatedLenders.map((lender) => {
              const isCompared = compareList.some((c) => c.id === lender.id);

              return (
                <div
                  key={lender.id}
                  className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 group hover:border-primary/30"
                >
                  <Link href={`/personal-loans/instant-loans/${lender.id}`}>
                    {/* Left: Logo, Name, Badge, Turnaround */}
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 shadow-2xs flex items-center justify-center shrink-0">
                        <Image
                          src={lender.logo}
                          alt={lender.name}
                          width={50}
                          height={50}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bricolage font-bold text-base text-gray-900 group-hover:text-primary transition-colors">
                            {lender.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${getSpeedBadgeColor(lender.disbursalSpeedCategory)}`}>
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>{lender.disbursalTime}</span>
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{lender.tagline}</p>

                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1 text-amber-600 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{lender.rating.toFixed(1)}</span>
                            <span className="text-gray-400 font-normal">
                              ({lender.appDownloads || lender.reviewCount})
                            </span>
                          </div>
                          <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> RBI Regulated
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Middle: Metrics Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-1/2 text-xs border-y lg:border-y-0 lg:border-x border-gray-100 py-3 lg:py-0 lg:px-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Interest Rate</span>
                      <span className="font-bricolage font-bold text-sm text-emerald-700 block mt-0.5">
                        {lender.interestRate.text}
                      </span>
                      <span className="text-[10px] text-gray-400">Reducing</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Starting EMI</span>
                      <span className="font-bricolage font-bold text-sm text-gray-900 block mt-0.5">
                        ₹{lender.startingEmiPerLakh.toLocaleString("en-IN")}/mo
                      </span>
                      <span className="text-[10px] text-gray-400">Per ₹1 Lakh</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Max Amount</span>
                      <span className="font-bricolage font-bold text-sm text-primary block mt-0.5">
                        {lender.maxAmount}
                      </span>
                      <span className="text-[10px] text-gray-400">{lender.tenure}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Min CIBIL / KYC</span>
                      <span className="font-bold text-gray-800 block mt-0.5">
                        {lender.minCreditScore}+
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium truncate block">
                        {lender.documentation}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2 lg:w-1/5 shrink-0">
                    <button
                      onClick={() => openApplyModal(lender.name, `Instant loan with ${lender.disbursalTime} disbursal`)}
                      className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-gold" />
                      <span>Instant Cash</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => toggleCompare(lender)}
                          className="w-3.5 h-3.5 rounded text-primary accent-primary cursor-pointer"
                        />
                        <span>Compare</span>
                      </label>

                      <button
                        onClick={() => setSelectedLenderForDetail(lender)}
                        className="text-xs text-gray-500 hover:text-primary font-semibold underline cursor-pointer"
                      >
                        Details
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
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <span className="text-xs text-gray-500 font-medium">
              Showing lenders {startIndex + 1} to {endIndex} of {totalItems}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  document.getElementById("lenders-list-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                disabled={safeCurrentPage === 1}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      document.getElementById("lenders-list-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      safeCurrentPage === pageNum
                        ? "bg-primary text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  document.getElementById("lenders-list-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                disabled={safeCurrentPage === totalPages}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Compare Dock */}
      <InstantLoanCompareDock
        compareList={compareList}
        onRemove={(id) => setCompareList(compareList.filter((c) => c.id !== id))}
        onClear={() => setCompareList([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Side-by-Side Compare Modal */}
      <InstantLoanCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        lenders={compareList}
        onRemove={(id) => setCompareList(compareList.filter((c) => c.id !== id))}
      />

      {/* Detailed Lender Modal */}
      <InstantLoanDetailModal
        lender={selectedLenderForDetail}
        onClose={() => setSelectedLenderForDetail(null)}
      />
    </section>
  );
}
