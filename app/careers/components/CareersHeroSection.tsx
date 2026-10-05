import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ChevronRight, Briefcase, Zap, TrendingUp } from "lucide-react";

interface CareersHeroSectionProps {
  onApplyClick: () => void;
  onRolesClick: () => void;
}

export default function CareersHeroSection({
  onApplyClick,
  onRolesClick,
}: CareersHeroSectionProps) {
  return (
    <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-[#F2EFE9] via-[#FDFBF7] to-[#FDFBF7] border-b border-gray-200/70 overflow-hidden font-montserrat">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
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

        {/* 2-Column Hero: Left Pitch & Right 3D Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-xs mb-5 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <span>We are Hiring • 18 Openings • Delhi (WFO)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#02282C] font-bricolage tracking-tight leading-[1.15] mb-5">
              Build India&apos;s Smartest{" "}
              <span className="text-primary underline decoration-gold/60 decoration-wavy decoration-2">
                Financial Growth
              </span>{" "}
              Ecosystem
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed mb-8 max-w-2xl">
              We are actively hiring for our <strong>Delhi office (Work From Office - WFO)</strong> across business
              development, creative media, and human resources. Join a high-velocity, rewarding workplace with direct founder
              mentorship, fast-track promotions, and industry-leading incentives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onRolesClick}
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#01353a] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Briefcase className="w-4 h-4 text-gold" />
                <span>Explore 4 Active Openings</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onApplyClick}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#02282C] border border-gray-300 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-xs hover:border-primary/50 transition-all duration-200 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-primary" />
                <span>Fast-Track Application Form</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200/80">
              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-gray-200/90 shadow-2xs">
                <div className="text-2xl font-extrabold text-[#02282C] font-bricolage mb-0.5 text-primary">
                  18
                </div>
                <div className="text-xs font-bold text-gray-800">Total Openings</div>
                <div className="text-[10px] text-gray-500">Delhi • WFO</div>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-gray-200/90 shadow-2xs">
                <div className="text-2xl font-extrabold text-[#02282C] font-bricolage mb-0.5 text-primary">
                  48 Hrs
                </div>
                <div className="text-xs font-bold text-gray-800">Turnaround</div>
                <div className="text-[10px] text-gray-500">Fast review call</div>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-gray-200/90 shadow-2xs">
                <div className="text-2xl font-extrabold text-[#02282C] font-bricolage mb-0.5 text-primary">
                  Uncapped
                </div>
                <div className="text-xs font-bold text-gray-800">Incentives</div>
                <div className="text-[10px] text-gray-500">High performance</div>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-gray-200/90 shadow-2xs">
                <div className="text-2xl font-extrabold text-[#02282C] font-bricolage mb-0.5 text-primary">
                  4.9 / 5
                </div>
                <div className="text-xs font-bold text-gray-800">Team Culture</div>
                <div className="text-[10px] text-gray-500">Friendly peers</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero 3D Illustration */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[460px] sm:max-w-[480px]">
              {/* Soft background ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-gold/15 to-emerald-400/10 rounded-full blur-3xl transform scale-90 pointer-events-none" />

              {/* Floating Illustration */}
              <div className="relative z-10 animate-hero-float">
                <Image
                  src="/careers-hero.webp"
                  alt="Grofi Careers - Professional Climbing towards Financial Growth"
                  width={560}
                  height={512}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(2,71,77,0.25)] select-none"
                />

                {/* Floating pill badge: Top Right */}
                <div className="absolute -top-2 right-2 sm:right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-gray-200/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#02282C]">Delhi Office • WFO</span>
                </div>

                {/* Floating pill badge: Bottom Left */}
                <div className="absolute -bottom-3 left-2 sm:left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-primary/20 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center font-extrabold text-sm shadow-2xs">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#02282C] font-bricolage leading-none">
                      High Growth &amp; Incentives
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium leading-none mt-1">
                      Grow with India&apos;s Fintech Star
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
