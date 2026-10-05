import React from "react";
import { CheckCircle2, Clock, Sparkles, Lightbulb } from "lucide-react";
import { hiringProcess } from "../data/careersData";

export default function CareersHiringProcess() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            Predictable &amp; Respectful
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            Our 4-Step <span className="text-primary">Hiring Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We value your time. We keep our interview loops focused, transparent, and grounded in real-world problem
            solving—not academic trivia.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {hiringProcess.map((step) => (
            <div
              key={step.step}
              className="bg-[#FDFBF7] rounded-2xl p-6 border border-gray-200/90 relative flex flex-col justify-between hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div>
                {/* Step badge & duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white font-extrabold font-bricolage text-base flex items-center justify-center shadow-xs">
                    0{step.step}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                    <Clock className="w-3 h-3 text-gold" />
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#02282C] font-bricolage mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Tip Box */}
              <div className="pt-3 border-t border-gray-200/60 bg-white/70 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-600 leading-normal">
                  <strong className="text-gray-800">Pro-tip:</strong> {step.tips}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment footnote */}
        <div className="mt-12 text-center text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Average turnaround time: 7 to 14 business days from first chat to written offer.</span>
        </div>
      </div>
    </section>
  );
}
