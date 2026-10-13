import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CreditCard, Landmark, Home, Briefcase, ArrowRight, Home as HomeIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Grofi",
  description:
    "The financial product or page you are looking for could not be found. Explore credit cards, personal loans, home loans, and business loans on Grofi.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: "Credit Cards",
      description: "Compare reward rates, lounge access, and lifetime free cards",
      href: "/credit-cards",
      icon: CreditCard,
    },
    {
      title: "Personal Loans",
      description: "Lowest interest rates with paperless instant approval",
      href: "/personal-loans",
      icon: Landmark,
    },
    {
      title: "Home Loans",
      description: "Compare prime mortgage rates and balance transfers",
      href: "/home-loans",
      icon: Home,
    },
    {
      title: "Business Loans",
      description: "Collateral-free commercial funding for MSMEs & enterprises",
      href: "/business-loans",
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
            404 Error
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            The financial product or page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors shadow-sm"
            >
              <HomeIcon className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/credit-cards"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="border-t border-gray-200/80 pt-10 text-left">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
              Popular Financial Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-4 rounded-xl bg-white border border-gray-200/80 hover:border-gray-400/80 hover:shadow-md transition-all group flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                      <Icon className="w-4 h-4 text-gray-700 group-hover:text-amber-800" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1">
                        {link.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
