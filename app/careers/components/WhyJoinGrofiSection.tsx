import React from "react";
import {
  TrendingUp,
  Clapperboard,
  ShieldCheck,
  Award,
  Zap,
  Coffee,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Mail,
  HeartHandshake,
} from "lucide-react";

const whyJoinPillars = [
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200",
    badge: "For BD Executives",
    title: "Uncapped Monthly Incentives",
    description:
      "We believe high sales performance should translate into extraordinary personal wealth. Enjoy competitive base salaries paired with lucrative, uncapped commissions on every loan and credit card disbursed.",
  },
  {
    icon: <Clapperboard className="w-6 h-6 text-purple-600" />,
    iconBg: "bg-purple-50 border-purple-200",
    badge: "For Creators & Editors",
    title: "Dedicated 4K Studio & Apple M-Series Rigs",
    description:
      "No struggling with underpowered laptops or noisy environments. Creators and editors get access to our acoustic sound booth, Sony 4K cameras, teleprompters, and top-of-the-line Apple editing machines.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-primary" />,
    iconBg: "bg-[#EBF4ED] border-primary/20",
    badge: "For HR Executives",
    title: "Founder-Level People Agency",
    description:
      "Influence culture and recruitment strategy directly. No corporate red tape—build high-performance teams, design innovative wellness policies, and be a core pillar of Grofi's hypergrowth.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-gold" />,
    iconBg: "bg-amber-50 border-gold/30",
    badge: "For All Grofiers",
    title: "Full Health Coverage & Team Culture",
    description:
      "₹10 Lakh comprehensive cashless health insurance, wholesome catered lunches, gourmet pour-over coffee, regular team celebration dinners, and annual offsites across India.",
  },
];

const hiringRoadmap = [
  {
    step: "01",
    title: "Quick Resume Screen",
    duration: "Under 48 Hours",
    desc: "Our HR team reviews every PDF resume directly. If your experience aligns, expect a call within 2 business days.",
  },
  {
    step: "02",
    title: "Discovery Chat",
    duration: "15–20 Mins",
    desc: "A brief phone or Google Meet call to discuss your ambitions, notice period, and compensation expectations.",
  },
  {
    step: "03",
    title: "Practical Craft Round",
    duration: "45–60 Mins",
    desc: "A practical role exercise (mock customer call for BD, sample edit test for Video, or script review for Creators).",
  },
  {
    step: "04",
    title: "Founder Meet & Offer",
    duration: "Same Week",
    desc: "A warm culture conversation with our leadership followed by a transparent, competitive offer letter.",
  },
];

export default function WhyJoinGrofiSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            Culture &amp; Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            Why Build Your Career at <span className="text-primary">Grofi</span>?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We offer more than just a job. We provide high agency, modern creative tooling, transparent appraisals, and
            an electric environment where high-performing talent thrives.
          </p>
        </div>

        {/* 4 Core Pillars tailored to the hiring roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {whyJoinPillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-gray-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${pillar.iconBg} shadow-2xs`}
                  >
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-gray-700 border border-gray-200">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#02282C] font-bricolage mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Corporate Red Tape</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Transparent Hiring Roadmap */}
        <div className="bg-[#FDFBF7] rounded-3xl p-8 sm:p-12 border border-gray-200 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#EBF4ED] px-3 py-1 rounded-full border border-primary/20">
              Clear &amp; Predictable
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#02282C] font-bricolage mt-3 mb-2">
              Our 4-Step Hiring Process
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              No endless rounds or ghosting. We value your commitment and keep turnaround fast and respectful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringRoadmap.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-extrabold font-bricolage text-primary">
                      {item.step}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                      <Clock className="w-3 h-3 text-gold" />
                      {item.duration}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#02282C] font-bricolage mb-1.5">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations & Direct Talent Contact */}
        <div className="bg-gradient-to-r from-[#02474D] to-[#01353A] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold text-xs font-bold px-3 py-1 rounded-full mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              Direct HR Desk
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-bricolage tracking-tight mb-2">
              Have a question before applying?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Reach out to our People Operations team directly. We are happy to discuss roles, referral programs, or
              walk you through what day-to-day life at Grofi looks like.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:careers@grofi.in"
              className="inline-flex items-center gap-2 bg-gold hover:bg-[#c9a52f] text-gray-950 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>careers@grofi.in</span>
            </a>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-4 py-3.5 rounded-xl text-xs sm:text-sm border border-white/15">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Delhi Office • WFO (In-Office)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
