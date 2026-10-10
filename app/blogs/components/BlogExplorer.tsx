"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Tag,
  Mail,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
} from "lucide-react";
import { BlogItem } from "./type";
import BlogCard from "./BlogCard";
import BlogImage from "./BlogImage";

interface BlogExplorerProps {
  initialBlogs: BlogItem[];
}

function parseReadTimeNumber(readTime?: string): number {
  if (!readTime) return 5;
  const match = readTime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Recently Updated";
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Recently Updated";
  }
}

export default function BlogExplorer({ initialBlogs }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "readTime" | "title">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Extract unique categories dynamically from DB blogs
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    initialBlogs.forEach((blog) => {
      const cat = blog.category?.trim();
      if (cat) {
        map.set(cat, (map.get(cat) || 0) + 1);
      }
    });

    return [
      { id: "all", label: "All Insights", count: initialBlogs.length },
      ...Array.from(map.entries()).map(([cat, count]) => ({
        id: cat.toLowerCase(),
        rawCategory: cat,
        label: cat,
        count,
      })),
    ];
  }, [initialBlogs]);

  // Extract unique tags dynamically from DB blogs
  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialBlogs.forEach((blog) => {
      if (Array.isArray(blog.tags)) {
        blog.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [initialBlogs]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let result = [...initialBlogs];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (b) => b.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter((b) =>
        b.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((b) => {
        const titleMatch = b.title?.toLowerCase().includes(q);
        const excerptMatch = b.excerpt?.toLowerCase().includes(q);
        const authorMatch = b.author?.toLowerCase().includes(q);
        const categoryMatch = b.category?.toLowerCase().includes(q);
        const tagsMatch = b.tags?.some((t) => t.toLowerCase().includes(q));
        return titleMatch || excerptMatch || authorMatch || categoryMatch || tagsMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "readTime") {
        return parseReadTimeNumber(a.readTime) - parseReadTimeNumber(b.readTime);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [initialBlogs, selectedCategory, selectedTag, searchQuery, sortBy]);

  // Spotlight featured blog (the most recent article when not searching)
  const isDefaultView = !searchQuery.trim() && !selectedTag && selectedCategory === "all";
  const featuredBlog = isDefaultView && filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = isDefaultView && filteredBlogs.length > 0 ? filteredBlogs.slice(1) : filteredBlogs;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag(null);
    setSortBy("newest");
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    const emailToSend = newsletterEmail.trim();
    setNewsletterSubmitting(true);
    setNewsletterError("");

    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Grofi Money Brief Subscription",
          formTitle: `Blog Newsletter Subscription: ${emailToSend}`,
          email: emailToSend,
          replyTo: emailToSend,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setNewsletterSubmitted(true);
      setTimeout(() => setNewsletterSubmitted(false), 5000);
      setNewsletterEmail("");
    } catch (err) {
      console.warn("Failed to submit newsletter subscription to server:", err);
      setNewsletterError(
        err instanceof Error ? err.message : "Failed to subscribe. Please try again."
      );
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  if (initialBlogs.length === 0) {
    return (
      <section className="py-20 px-4 max-w-4xl mx-auto text-center font-montserrat">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-gold mx-auto flex items-center justify-center mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-bricolage text-gray-900 mb-2">
          New Financial Guides in Production
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm">
          Our financial analysts are assembling verified credit card strategies, interest rate guides, and credit score optimization blueprints.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-[#03363b] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
        >
          Explore Grofi Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-montserrat">
      {/* Featured Blog Spotlight (When in default unfiltered view) */}
      {featuredBlog && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 font-montserrat">
              Featured Editorial Spotlight
            </h2>
          </div>

          <div className="group relative bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Header / Graphic (5 cols) */}
            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto min-h-[260px] lg:min-h-[360px] block overflow-hidden"
            >
              <BlogImage
                src={featuredBlog.image}
                alt={featuredBlog.title}
                category={featuredBlog.category}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm"
                  style={{
                    backgroundColor: featuredBlog.categoryBg || "#EFF6FF",
                    color: featuredBlog.categoryColor || "#1D4ED8",
                  }}
                >
                  {featuredBlog.category}
                </span>
              </div>
            </Link>

            {/* Content Details (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{featuredBlog.readTime || "5 min read"}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{formatDate(featuredBlog.createdAt)}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                    Verified Research
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-[#02282C] group-hover:text-primary transition-colors leading-tight mb-4">
                  <Link href={`/blogs/${featuredBlog.slug}`}>
                    {featuredBlog.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                {/* Tags */}
                {featuredBlog.tags && featuredBlog.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {featuredBlog.tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTag(t)}
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium bg-[#F4F2EC] hover:bg-[#eae6db] text-gray-700 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <Tag className="w-3 h-3 text-gold" />
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Author and Action CTA */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm font-bricolage shadow-xs">
                    {featuredBlog.author ? featuredBlog.author.charAt(0) : "G"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {featuredBlog.author || "Money Mittra Team"}
                    </p>
                    {featuredBlog.authorRole && (
                      <p className="text-xs text-gray-500 leading-tight">
                        {featuredBlog.authorRole}
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  href={`/blogs/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-[#03363b] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-2xs hover:shadow-md group-hover:translate-x-0.5"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Toolbar */}
      <div id="articles-list-section" className="scroll-mt-24 space-y-4 mb-8">
        {/* Row 1: Search, Sort, View mode */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or author..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/80 focus:bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-hidden transition-all text-gray-900 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right controls: Sort and View mode */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "newest" | "oldest" | "readTime" | "title"
                  )
                }
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="newest">Latest Published</option>
                <option value="oldest">Oldest First</option>
                <option value="readTime">Shortest Read</option>
                <option value="title">Title (A - Z)</option>
              </select>
            </div>

            {/* Grid vs List toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                title="List view"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Dynamic Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-white shadow-sm ring-2 ring-primary/20"
                    : "bg-white hover:bg-[#F4F2EC] text-gray-700 border border-gray-200/90"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Quick Tag Pills from Database Blogs */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
            <span className="text-gray-400 font-medium text-[11px] mr-1">Popular Topics:</span>
            {allTags.map((t) => {
              const isTagActive = selectedTag?.toLowerCase() === t.toLowerCase();
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTag(isTagActive ? null : t)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                    isTagActive
                      ? "bg-gold text-[#02282C] border-gold font-bold shadow-2xs"
                      : "bg-white hover:bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  #{t}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Tag filter indicator */}
        {selectedTag && (
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="text-gray-500">Filtered by topic:</span>
            <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-900 border border-gold/30 px-2.5 py-1 rounded-lg font-bold">
              <Tag className="w-3 h-3 text-gold" />
              {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="hover:text-red-700 ml-0.5 cursor-pointer"
                title="Remove tag filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs text-primary underline hover:text-[#03363b] ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Articles Grid / List */}
      {remainingBlogs.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
              : "space-y-6 mb-16"
          }
        >
          {remainingBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              viewMode={viewMode}
              onSelectTag={(tag) => setSelectedTag(tag)}
            />
          ))}
        </div>
      ) : (
        /* Empty results state */
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center max-w-lg mx-auto mb-16">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-bricolage text-gray-900 mb-1">
            No Articles Found
          </h3>
          <p className="text-gray-500 text-sm mb-5">
            We couldn&apos;t find any articles matching your search query or filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 bg-primary hover:bg-[#03363b] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Newsletter & Knowledge Brief Subscription Callout */}
      <section className="bg-gradient-to-br from-[#02282C] via-[#02474D] to-[#0A5C63] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg mb-8">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grofi Money Brief</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-bricolage tracking-tight mb-2">
            Stay Ahead of Credit Card & Loan Changes
          </h3>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-montserrat">
            Get concise, data-backed breakdowns of credit card reward devaluations, bank repo rate adjustments, and CIBIL score algorithms delivered every week. Zero spam.
          </p>

          {newsletterSubmitted ? (
            <div className="flex items-center gap-2.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-4 py-3 rounded-xl text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span>Thank you! You are now subscribed to the Grofi Financial Briefing.</span>
            </div>
          ) : (
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    disabled={newsletterSubmitting}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white text-gray-900 rounded-xl outline-hidden focus:ring-2 focus:ring-gold disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="bg-gold hover:bg-[#c9a52f] text-[#02282C] px-6 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer shrink-0 shadow-sm disabled:opacity-60"
                >
                  {newsletterSubmitting ? "Subscribing..." : "Subscribe Free"}
                </button>
              </form>
              {newsletterError && (
                <p className="text-red-300 text-xs mt-2 font-medium">{newsletterError}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
