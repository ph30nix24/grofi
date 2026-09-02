
import React from "react";
import {
  CreditCard,
  Wallet,
  Coins,
  Briefcase,
  Home,
  TrendingUp,
  Clock,
  Building2,
  RefreshCw,
  HeartPulse,
  ArrowRight,
  Landmark,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  arrowColor: string;
  href: string;
}

const products: Product[] = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    description: "Get quick funds for your personal needs with flexible tenure.",
    icon: <Coins className="w-5 h-5" />,
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-700",
    arrowColor: "group-hover:bg-amber-500 group-hover:border-amber-500",
    href: "#personal-loan",
  },
  {
    id: "credit-card",
    title: "Credit Card",
    description: "Choose from a wide range of cards with exclusive cashback & benefits.",
    icon: <CreditCard className="w-5 h-5" />,
    iconBg: "bg-purple-100/80",
    iconColor: "text-purple-700",
    arrowColor: "group-hover:bg-purple-600 group-hover:border-purple-600",
    href: "#credit-card",
  },
  {
    id: "gold-loan",
    title: "Gold Loan",
    description: "Unlock the instant value of your gold with minimum documentation.",
    icon: <Wallet className="w-5 h-5" />,
    iconBg: "bg-yellow-100/80",
    iconColor: "text-yellow-700",
    arrowColor: "group-hover:bg-amber-500 group-hover:border-amber-500",
    href: "#gold-loan",
  },
  {
    id: "business-loan",
    title: "Business Loan",
    description: "Fuel your business expansion and working capital with custom loans.",
    icon: <Briefcase className="w-5 h-5" />,
    iconBg: "bg-[#EBF4ED]",
    iconColor: "text-primary",
    arrowColor: "group-hover:bg-primary group-hover:border-primary",
    href: "#business-loan",
  },
  {
    id: "home-loan",
    title: "Home Loan",
    description: "Make your dream home a reality with attractive low interest rates.",
    icon: <Home className="w-5 h-5" />,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-700",
    arrowColor: "group-hover:bg-emerald-600 group-hover:border-emerald-600",
    href: "#home-loan",
  },
  {
    id: "loan-against-mutual-fund",
    title: "Loan Against Mutual Fund",
    description: "Get instant credit against your mutual fund investments without selling.",
    icon: <TrendingUp className="w-5 h-5" />,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-700",
    arrowColor: "group-hover:bg-emerald-600 group-hover:border-emerald-600",
    href: "#loan-against-mutual-fund",
  },
  {
    id: "short-term-personal-loan",
    title: "Short Term Personal Loan",
    description: "Quick and hassle-free micro loans for your immediate urgent needs.",
    icon: <Clock className="w-5 h-5" />,
    iconBg: "bg-teal-100/80",
    iconColor: "text-teal-700",
    arrowColor: "group-hover:bg-teal-600 group-hover:border-teal-600",
    href: "#short-term-personal-loan",
  },
  {
    id: "loan-against-property",
    title: "Loan Against Property",
    description: "Higher loan amounts against residential or commercial property.",
    icon: <Building2 className="w-5 h-5" />,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-700",
    arrowColor: "group-hover:bg-emerald-600 group-hover:border-emerald-600",
    href: "#loan-against-property",
  },
  {
    id: "home-loan-balance-transfer",
    title: "Home Loan Balance Transfer",
    description: "Transfer your existing high-EMI home loan and save significantly.",
    icon: <RefreshCw className="w-5 h-5" />,
    iconBg: "bg-indigo-100/80",
    iconColor: "text-indigo-700",
    arrowColor: "group-hover:bg-indigo-600 group-hover:border-indigo-600",
    href: "#home-loan-balance-transfer",
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    description: "Comprehensive medical protection for you and your loved ones.",
    icon: <HeartPulse className="w-5 h-5" />,
    iconBg: "bg-rose-100/80",
    iconColor: "text-rose-700",
    arrowColor: "group-hover:bg-rose-500 group-hover:border-rose-500",
    href: "#health-insurance",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 px-6 relative bg-gradient-to-b from-[#F3F0DF]/50 via-white to-[#F3F0DF]/30">
      <div className="max-w-[1280px] mx-auto">
        
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl xl:text-5xl text-primary leading-tight">
            Bringing you the{" "}
            <span className="text-emerald-600 relative inline-block">
              Best Products
              <span className="absolute bottom-1 left-0 w-full h-1 bg-emerald-500/20 rounded-full" />
            </span>{" "}
            <br className="hidden sm:inline" />
            from Top Banks & Financial Institutions
          </h2>

          {/* Decorative diamond line */}
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-xs" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-montserrat max-w-2xl mx-auto">
            Explore a wide range of financial solutions curated from India’s leading
            banks and trusted institutions — all in one place.
          </p>
        </div>

        {/* ── Products Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {products.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Icon badge */}
                <div
                  className={`w-12 h-12 rounded-2xl ${p.iconBg} ${p.iconColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  {p.icon}
                </div>

                {/* Title */}
                <h3 className="font-montserrat font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed font-montserrat">
                  {p.description}
                </p>
              </div>

              {/* Bottom arrow button */}
              <div className="mt-6 flex justify-end">
                <div
                  className={`w-8 h-8 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center transition-all duration-300 ${p.arrowColor} group-hover:text-white shadow-xs`}
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── Bottom Banner ────────────────────────────────────────────── */}
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur border border-primary/15 rounded-full px-7 py-3.5 shadow-md flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <div className="w-8 h-8 rounded-full bg-[#EBF4ED] flex items-center justify-center shrink-0">
              <Landmark className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 font-montserrat">
              All products from trusted banks &amp; NBFCs
            </span>
            <a
              href="#all-products"
              className="text-xs sm:text-sm font-bold text-primary hover:text-gold transition-colors inline-flex items-center gap-1.5 font-montserrat"
            >
              View all products
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
