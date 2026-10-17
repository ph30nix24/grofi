import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Loader2, ArrowLeft, ChevronRight } from "lucide-react";

export default function BlogPostLoading() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7] font-montserrat overflow-x-clip">
      <Navbar />

      {/* Article Header & Breadcrumbs Skeleton */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10 bg-linear-to-b from-[#F2EFE9] to-[#FDFBF7] border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb nav skeleton */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-5 sm:mb-6 animate-pulse">
            <span className="h-4 w-12 bg-gray-200 rounded" />
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            <span className="h-4 w-12 bg-gray-200 rounded" />
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            <span className="h-4 w-32 bg-gray-200 rounded" />
          </div>

          {/* Back link skeleton */}
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
            <span className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Active Fetching Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Fetching financial guide...</span>
          </div>

          {/* Category badge & metadata skeleton */}
          <div className="flex flex-wrap items-center gap-3 mb-4 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <span className="text-gray-300">•</span>
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>

          {/* Article Title skeleton */}
          <div className="space-y-3 mb-6 animate-pulse">
            <div className="h-9 sm:h-12 bg-gray-300/90 rounded-lg w-11/12" />
            <div className="h-9 sm:h-12 bg-gray-300/80 rounded-lg w-4/5" />
          </div>

          {/* Excerpt skeleton */}
          <div className="space-y-2 mb-6 animate-pulse">
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-full" />
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Author attribution skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/70 gap-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-8 w-32 bg-emerald-100/70 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Featured visual banner skeleton */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-8 w-full">
        <div className="rounded-2xl overflow-hidden aspect-video bg-gray-200/80 shadow-md border border-gray-200 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
          <span className="text-xs sm:text-sm font-medium text-gray-500">Loading guide media...</span>
        </div>
      </section>

      {/* Article body skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full flex-1">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 p-6 sm:p-10 lg:p-12 shadow-2xs space-y-6 animate-pulse">
          <div className="h-7 bg-gray-300/80 rounded w-1/3" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>

          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          <div className="h-20 bg-[#F4F2EC] rounded-xl border-l-4 border-primary/30 p-4" />

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
