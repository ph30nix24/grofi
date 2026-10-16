import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, BookOpen, ChevronRight, Award } from "lucide-react";

interface BlogHeroProps {
  totalBlogs: number;
}

export default function BlogHero({ totalBlogs }: BlogHeroProps) {
  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 bg-linear-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/70 overflow-hidden font-montserrat">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 font-medium"
        >
          <Link href="/" className="hover:text-primary transition-colors py-0.5">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-primary font-semibold py-0.5">Blogs &amp; Financial Insights</span>
        </nav>

        {/* Hero Pitch & Badges */}
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold shadow-xs mb-3.5 sm:mb-4 animate-fadeIn max-w-full">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
            <span className="truncate">Grofi Financial Research &amp; Knowledge Hub</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#02282C] font-bricolage tracking-tight leading-tight mb-3 sm:mb-4 wrap-break-word">
            Master Your Money With{" "}
            <span className="text-primary underline decoration-gold/60 decoration-wavy decoration-2">
              Data-Backed
            </span>{" "}
            Financial Insights
          </h1>

          <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 font-montserrat leading-relaxed mb-6">
            In-depth guides, reward optimization blueprints, CIBIL score mastery, and transparent loan comparisons
            curated by Grofi’s financial research team.
          </p>

          {/* Quick trust metrics */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 font-medium">
            <div className="flex items-center gap-1.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Sponsored Bias</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span>Fact-Checked Editorial</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <span>{totalBlogs} In-Depth {totalBlogs === 1 ? "Guide" : "Guides"} Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
