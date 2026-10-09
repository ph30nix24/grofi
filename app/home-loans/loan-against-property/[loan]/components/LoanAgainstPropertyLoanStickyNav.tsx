"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanStickyNavProps {
  lender: LoanAgainstPropertyLender;
}

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "lap-calculator", label: "EMI & LTV" },
  { id: "fees-charges", label: "Fees & Charges" },
  { id: "ltv-property-types", label: "Property & LTV" },
  { id: "overdraft-facility", label: "Overdraft" },
  { id: "eligibility-docs", label: "Eligibility & Docs" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "disbursal-steps", label: "Disbursal Journey" },
  { id: "faqs", label: "FAQs" },
  { id: "similar-lenders", label: "Alternatives" },
];

export default function LoanAgainstPropertyLoanStickyNav({
  lender,
}: LoanAgainstPropertyLoanStickyNavProps) {
  const { openApplyModal } = useApplyModal();
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky nav height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 font-montserrat ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between gap-4 h-14 sm:h-16">
          {/* Left mini-brand info (visible after scroll) */}
          <div
            className={`flex items-center gap-2.5 shrink-0 transition-opacity duration-300 ${
              isScrolled ? "opacity-100 max-w-[200px] sm:max-w-xs" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
              <Image
                src={lender.logo}
                alt={lender.name}
                width={28}
                height={28}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="truncate">
              <div className="font-bricolage font-bold text-xs text-gray-900 truncate">
                {lender.name}
              </div>
              <div className="text-[10px] text-primary font-bold">
                From {lender.interestRate?.min ?? 9.25}% p.a.
              </div>
            </div>
          </div>

          {/* Navigation Links Scrollable Strip */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 grow">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Apply CTA Button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-2 px-3.5 sm:px-5 rounded-full text-xs shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="hidden sm:inline">Apply for {lender.name}</span>
              <span className="sm:hidden">Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
