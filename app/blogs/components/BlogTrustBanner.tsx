import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, RefreshCw, CreditCard, Banknote, Home } from "lucide-react";

export default function BlogTrustBanner() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Zero Promotional Bias",
      description:
        "Our editorial assessments and product comparisons are 100% independent. No bank or NBFC can sponsor or influence our rankings.",
    },
    {
      icon: Scale,
      title: "Real Net Return Math",
      description:
        "We audit hidden fees, GST, point expiration rules, and compounding intervals so you know exactly what you save or spend.",
    },
    {
      icon: RefreshCw,
      title: "Regularly Audited",
      description:
        "Every guide is checked regularly against RBI notifications, repo rate adjustments, and bank fee schedule updates.",
    },
  ];

  return (
    <section className="bg-[#F4F2EC] border-t border-gray-200/80 py-10 sm:py-14 lg:py-16 font-montserrat w-full min-w-0 max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Section title */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold text-gold uppercase tracking-wider block mb-2 font-montserrat">
            Editorial Integrity &amp; Standards
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-3 wrap-break-word">
            Why Readers Trust Grofi Financial Insights
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed wrap-break-word">
            Financial decisions shape your livelihood. That&apos;s why our researchers adhere to strict editorial independence guidelines.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12 w-full min-w-0">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 border border-gray-200/80 shadow-2xs hover:shadow-md transition-shadow w-full min-w-0"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold font-bricolage text-[#02282C] mb-2 wrap-break-word">
                  {pillar.title}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed wrap-break-word">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA explore products bar */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left w-full min-w-0">
          <div className="min-w-0">
            <h3 className="font-bold font-bricolage text-base sm:text-lg md:text-xl text-[#02282C] wrap-break-word">
              Looking to compare financial products right now?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 wrap-break-word">
              Browse 200+ credit cards, compare personal loan interest rates, or calculate your home loan EMI.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 shrink-0 w-full md:w-auto">
            <Link
              href="/credit-cards"
              className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-primary border border-gray-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors min-h-11 touch-manipulation cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-gold shrink-0" />
              <span>Credit Cards</span>
            </Link>
            <Link
              href="/personal-loans"
              className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-primary border border-gray-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors min-h-11 touch-manipulation cursor-pointer"
            >
              <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Personal Loans</span>
            </Link>
            <Link
              href="/home-loans"
              className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-primary border border-gray-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors min-h-11 touch-manipulation cursor-pointer"
            >
              <Home className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Home Loans</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
