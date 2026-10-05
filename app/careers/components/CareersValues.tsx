import React from "react";
import { ShieldCheck, Zap, HeartHandshake, Compass, Sparkles, Flame } from "lucide-react";
import { coreValues } from "../data/careersData";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
  Zap: <Zap className="w-6 h-6 text-amber-600" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-primary" />,
  Compass: <Compass className="w-6 h-6 text-blue-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-gold" />,
  Flame: <Flame className="w-6 h-6 text-rose-600" />,
};

const bgMap: Record<string, string> = {
  ShieldCheck: "bg-emerald-50 border-emerald-200/60",
  Zap: "bg-amber-50 border-amber-200/60",
  HeartHandshake: "bg-[#EBF4ED] border-primary/20",
  Compass: "bg-blue-50 border-blue-200/60",
  Sparkles: "bg-amber-50/70 border-gold/30",
  Flame: "bg-rose-50 border-rose-200/60",
};

export default function CareersValues() {
  return (
    <section id="culture-and-values" className="py-16 sm:py-24 bg-white border-b border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            Our Operating Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            Culture That Prizes <span className="text-primary">Agency</span> &amp;{" "}
            <span className="text-gold">Craft</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We don’t treat values as empty corporate slogans on a wall. These six principles guide how we make product
            decisions, conduct code reviews, reward high performers, and treat our customers every single day.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((val) => (
            <div
              key={val.id}
              className="group relative bg-[#FDFBF7] rounded-2xl p-7 border border-gray-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 left-7 right-7 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      bgMap[val.iconName] || "bg-gray-100 border-gray-200"
                    } shadow-2xs group-hover:scale-105 transition-transform duration-200`}
                  >
                    {iconMap[val.iconName] || <Sparkles className="w-6 h-6 text-primary" />}
                  </div>
                  <span className="text-xs font-semibold text-gray-400 font-mono">0{coreValues.indexOf(val) + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-[#02282C] font-bricolage mb-1.5 group-hover:text-primary transition-colors">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-primary/80 mb-3 font-montserrat">
                  {val.tagline}
                </p>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-montserrat">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
