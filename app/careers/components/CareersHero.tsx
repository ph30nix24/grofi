import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronRight, Briefcase } from "lucide-react";
import { careersHeroStats } from "../data/careersData";

export default function CareersHero() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 bg-gradient-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/70 overflow-hidden font-montserrat">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Careers at Grofi</span>
        </nav>

        {/* Hero Pitch */}
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-xs mb-5 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-gold shrink-0" />
            <span>Join Our Mission • 10+ High-Impact Roles Open</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#02282C] font-bricolage tracking-tight leading-[1.15] mb-5">
            Build the{" "}
            <span className="text-primary underline decoration-gold/60 decoration-wavy decoration-2">
              Financial Nervous System
            </span>{" "}
            for 100M+ Indians
          </h1>

          <p className="text-base sm:text-xl text-gray-600 font-montserrat leading-relaxed mb-8 max-w-3xl">
            We are replacing predatory fine print, branch bureaucracy, and opaque algorithms with India’s most
            transparent borrowing and credit ecosystem. Join an ambitious, high-trust team where engineers, designers,
            and operators hold real agency and equity.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#open-roles"
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#01353a] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Briefcase className="w-4 h-4 text-gold" />
              <span>Explore Open Roles</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#culture-and-values"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-xs hover:border-gray-300 transition-all duration-200"
            >
              <span>Why Build at Grofi</span>
            </a>

            <a
              href="#open-roles"
              className="inline-flex items-center gap-2 text-primary hover:text-[#01353a] font-semibold text-sm sm:text-base underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors cursor-pointer px-2 py-3"
            >
              <span>Can’t find your role? Join Talent Community →</span>
            </a>
          </div>

          {/* Quick trust metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-gray-200/80">
            {careersHeroStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-gray-200/90 shadow-2xs hover:border-primary/30 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#02282C] font-bricolage mb-1 text-primary">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-800 font-montserrat">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-montserrat mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
