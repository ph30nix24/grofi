import React from "react";
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  GraduationCap,
  Laptop,
  Coffee,
  Award,
  Rocket,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { perksAndBenefits } from "../data/careersData";

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-primary" />,
  Building2: <Building2 className="w-5 h-5 text-blue-600" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-gold" />,
  Laptop: <Laptop className="w-5 h-5 text-purple-600" />,
  Coffee: <Coffee className="w-5 h-5 text-amber-600" />,
  Award: <Award className="w-5 h-5 text-rose-600" />,
  Rocket: <Rocket className="w-5 h-5 text-teal-600" />,
};

export default function CareersPerks() {
  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            Benefits &amp; Rewards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            Invested in Your <span className="text-primary">Wealth</span>,{" "}
            <span className="text-gold">Health</span> &amp; Growth
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We compensate in top percentiles, grant real equity, and take complete care of your well-being so you can focus
            on creating generational impact.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perksAndBenefits.map((perk) => (
            <div
              key={perk.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center">
                    {iconMap[perk.iconName] || <Sparkles className="w-5 h-5 text-primary" />}
                  </div>
                  {perk.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EBF4ED] text-primary border border-primary/10">
                      {perk.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#02282C] font-bricolage mb-2">
                  {perk.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {perk.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{perk.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-primary/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF4ED] border border-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#02282C] font-bricolage">
                Transparent Compensation Promise
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                We believe in equal pay for equal craft. All roles have clear, pre-defined salary bands and transparent ESOP formulas.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Lowballing
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 4-Year ESOP Vesting
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Annual Appraisals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
