"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  X,
  CreditCard,
  Sparkles,
  TrendingUp,
  Tag,
  Plane,
  Percent,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface SearchCardItem {
  id: string;
  name: string;
  issuer: string;
  bankSlug: string;
  cardImage?: string | null;
  logo: string;
  annualFee: string;
  joiningFee: string;
  badge?: string;
  categoryLabel?: string;
  network?: string;
  url: string;
}

interface MatchedBank {
  name: string;
  slug: string;
  logo: string;
  tag?: string;
  url: string;
}

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  inputClassName?: string;
  autoFocus?: boolean;
}

const POPULAR_BANKS = [
  { name: "HDFC Bank", query: "HDFC" },
  { name: "SBI Card", query: "SBI" },
  { name: "ICICI Bank", query: "ICICI" },
  { name: "Axis Bank", query: "Axis" },
  { name: "IndusInd", query: "IndusInd" },
];

const POPULAR_PERKS = [
  { label: "Lifetime Free", query: "Lifetime Free", icon: Tag },
  { label: "Lounge Access", query: "Lounge", icon: Plane },
  { label: "5% Cashback", query: "Cashback", icon: Percent },
  { label: "RuPay UPI", query: "RuPay", icon: Sparkles },
];

export default function SearchBox({
  className = "",
  placeholder = "Hdfc, SBI, Axis or card name...",
  inputClassName = "",
  autoFocus = false,
}: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<SearchCardItem[]>([]);
  const [matchedBanks, setMatchedBanks] = useState<MatchedBank[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cacheRef = useRef<Map<string, { cards: SearchCardItem[]; matchedBanks: MatchedBank[]; total: number }>>(
    new Map()
  );

  // Perform API search
  const performSearch = useCallback(async (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      setCards([]);
      setMatchedBanks([]);
      setTotalCount(0);
      setIsLoading(false);
      return;
    }

    // Check cache first
    const cached = cacheRef.current.get(trimmed.toLowerCase());
    if (cached) {
      setCards(cached.cards);
      setMatchedBanks(cached.matchedBanks);
      setTotalCount(cached.total);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/credit-cards/search?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        const cardsList = data.cards || [];
        const banksList = data.matchedBanks || [];
        const count = data.total || 0;

        cacheRef.current.set(trimmed.toLowerCase(), {
          cards: cardsList,
          matchedBanks: banksList,
          total: count,
        });

        setCards(cardsList);
        setMatchedBanks(banksList);
        setTotalCount(count);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!val.trim()) {
      setCards([]);
      setMatchedBanks([]);
      setTotalCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(() => {
      performSearch(val);
    }, 200);
  };

  // Submit search and navigate
  const handleSubmit = (overrideQuery?: string) => {
    const q = (overrideQuery ?? query).trim();
    setIsOpen(false);
    if (q) {
      router.push(`/credit-cards?search=${encodeURIComponent(q)}`);
    } else {
      router.push("/credit-cards");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Quick chips search
  const handleChipClick = (q: string) => {
    setQuery(q);
    setIsOpen(true);
    performSearch(q);
    inputRef.current?.focus();
  };

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full z-50 ${className}`}>
      {/* ── Main Input Pill ── */}
      <div
        className={`flex items-center gap-2.5 bg-white border rounded-full px-4 py-2 sm:py-2.5 shadow-sm transition-all duration-200 ${
          isOpen
            ? "border-primary/60 shadow-md ring-2 ring-primary/10"
            : "border-gray-200 hover:border-gray-300 hover:shadow"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={`flex-1 text-xs sm:text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none font-montserrat min-w-0 ${inputClassName}`}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCards([]);
              setMatchedBanks([]);
              setTotalCount(0);
              inputRef.current?.focus();
            }}
            className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
        )}

        {/* Submit Arrow Button */}
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="w-8 h-8 rounded-full bg-primary hover:bg-gold flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95 group/btn"
          aria-label="Search credit cards"
        >
          <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </div>

      {/* ── Dropdown Suggestions / Live Results ── */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full sm:w-[500px] md:w-[540px] max-w-[94vw] bg-white border border-gray-200/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] z-50 overflow-hidden max-h-[440px] flex flex-col animate-fadeIn ring-1 ring-black/5">

          {/* STATE 1: Empty Query - Quick Filters & Popular Banks */}
          {!query.trim() && (
            <div className="p-4 space-y-3.5 bg-white">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-montserrat">
                  <TrendingUp className="w-3.5 h-3.5 text-gold" />
                  Popular Banks
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_BANKS.map((b) => (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => handleChipClick(b.query)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-50 hover:bg-[#EBF4ED] text-gray-700 hover:text-primary border border-gray-200/70 transition-all cursor-pointer font-montserrat flex items-center gap-1"
                    >
                      <CreditCard className="w-3 h-3 opacity-60" />
                      <span>{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-montserrat">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  Top Categories
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_PERKS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handleChipClick(p.query)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-50 hover:bg-gold/10 text-gray-700 hover:text-gold border border-gray-200/70 transition-all cursor-pointer font-montserrat flex items-center gap-1"
                      >
                        <Icon className="w-3 h-3 opacity-70" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-montserrat">
                <span>Looking for specific benefits?</span>
                <Link
                  href="/credit-cards"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-primary hover:text-gold inline-flex items-center gap-1"
                >
                  Explore All Cards <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* STATE 2: Query Present - Live Results */}
          {query.trim().length > 0 && (
            <div className="flex flex-col flex-1 min-h-0 bg-white">

              {/* Matched Bank Highlights (if any) */}
              {matchedBanks.length > 0 && (
                <div className="p-2.5 bg-[#EBF4ED]/70 border-b border-[#DDE3C1]/60 shrink-0">
                  <div className="flex flex-col gap-1.5">
                    {matchedBanks.slice(0, 2).map((bank) => (
                      <Link
                        key={bank.slug}
                        href={bank.url}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-primary/15 hover:border-primary/40 hover:shadow-xs transition-all group/bank"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 p-1 flex items-center justify-center shrink-0">
                            <Image
                              src={bank.logo}
                              alt={bank.name}
                              width={24}
                              height={24}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 group-hover/bank:text-primary transition-colors truncate">
                              {bank.name} Credit Cards Hub
                            </p>
                            {bank.tag && (
                              <p className="text-[10px] text-gray-500 truncate">{bank.tag}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-primary group-hover/bank:translate-x-0.5 transition-transform shrink-0 pl-2">
                          <span>View Bank Hub</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Header Label */}
              {cards.length > 0 && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50/80 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-500 font-montserrat shrink-0">
                  <span>Matching Cards ({totalCount})</span>
                  <span>Fee / Highlights</span>
                </div>
              )}

              {/* Scrollable Cards List */}
              {cards.length > 0 && (
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100 min-h-0 bg-white">
                  {cards.map((card) => (
                    <Link
                      key={card.id}
                      href={card.url}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between gap-3 p-2.5 sm:p-3 hover:bg-[#EBF4ED]/60 transition-colors group/item"
                    >
                      {/* Left: Card visual + Titles */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-12 h-8 rounded-md bg-gray-100 border border-gray-200 overflow-hidden relative shrink-0 shadow-2xs">
                          {card.cardImage ? (
                            <Image
                              src={card.cardImage}
                              alt={card.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                              <CreditCard className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover/item:text-primary truncate font-montserrat leading-tight">
                            {card.name}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate font-montserrat mt-0.5">
                            <span className="font-semibold text-gray-700">{card.issuer}</span>
                            {card.network ? ` • ${card.network}` : ""}
                            {" • "}
                            <span>{card.annualFee || card.joiningFee || "Lifetime Free"}</span>
                          </p>
                        </div>
                      </div>

                      {/* Right: Badge / Details */}
                      <div className="flex flex-col items-end gap-1 shrink-0 pl-2">
                        {card.badge && (
                          <span className="inline-block text-[10px] font-semibold text-primary bg-[#EBF4ED] px-2 py-0.5 rounded-full border border-primary/20 max-w-[140px] truncate">
                            {card.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-primary font-bold inline-flex items-center gap-0.5 group-hover/item:text-gold transition-colors">
                          Details <ChevronRight className="w-3 h-3 group-hover/item:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* No results state */}
              {!isLoading && cards.length === 0 && matchedBanks.length === 0 && (
                <div className="py-8 px-4 text-center space-y-2 bg-white flex-1">
                  <CreditCard className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="text-xs font-bold text-gray-700 font-montserrat">
                    No credit cards found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[11px] text-gray-400 font-montserrat max-w-xs mx-auto">
                    Try searching by bank name (HDFC, SBI), card name (Millennia, Cashback), or feature (Lounge, LTF).
                  </p>
                  <div className="pt-2 flex justify-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleChipClick("HDFC")}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                    >
                      HDFC
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("SBI")}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                    >
                      SBI
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("Cashback")}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                    >
                      Cashback
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action: Always visible footer */}
              <div className="p-2.5 bg-gray-50 border-t border-gray-200 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="w-full text-center py-2 px-3 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold font-montserrat flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>
                    View all {totalCount > 0 ? `${totalCount} ` : ""}results in Credit Card Explorer
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}