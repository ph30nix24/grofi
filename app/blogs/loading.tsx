import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Loader2 } from "lucide-react";

export default function BlogsIndexLoading() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7] font-montserrat overflow-x-clip">
      <Navbar />

      {/* Hero section skeleton */}
      <section className="pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Fetching financial insights...</span>
          </div>

          <div className="space-y-3 mb-6 animate-pulse max-w-3xl">
            <div className="h-9 sm:h-12 bg-gray-300/80 rounded-lg w-4/5" />
            <div className="h-9 sm:h-12 bg-gray-300/80 rounded-lg w-2/3" />
            <div className="h-5 bg-gray-200 rounded-lg w-full mt-4" />
          </div>

          {/* Metric badges skeleton */}
          <div className="flex flex-wrap items-center gap-3 animate-pulse">
            <div className="h-8 w-36 bg-white rounded-lg border border-gray-200" />
            <div className="h-8 w-40 bg-white rounded-lg border border-gray-200" />
            <div className="h-8 w-36 bg-white rounded-lg border border-gray-200" />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full flex-1">
        {/* Category bar skeleton */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none animate-pulse">
          {[80, 100, 90, 110, 85].map((w, idx) => (
            <div
              key={idx}
              className="h-9 bg-gray-200/80 rounded-full shrink-0"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col animate-pulse"
            >
              <div className="aspect-video bg-gray-200/90 w-full" />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-20 bg-gray-200 rounded-full" />
                    <span className="text-gray-300">•</span>
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="h-6 w-11/12 bg-gray-300/80 rounded" />
                  <div className="h-4 w-full bg-gray-200/80 rounded" />
                  <div className="h-4 w-4/5 bg-gray-200/80 rounded" />
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
