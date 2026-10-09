"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BalanceTransferLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BalanceTransferLoanStickyNavProps {
  lender: BalanceTransferLender;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview & Verdict" },
  { id: "savings-calculator", label: "Savings Calculator" },
  { id: "fees-charges", label: "Fees & Charges" },
  { id: "topup-overdraft", label: "Top-Up & Overdraft" },
  { id: "eligibility-docs", label: "Eligibility & LOD" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "takeover-journey", label: "Takeover Journey" },
  { id: "faqs", label: "FAQs" },
  { id: "similar-transfers", label: "Similar Lenders" },
];

export default function BalanceTransferLoanStickyNav({
  lender,
}: BalanceTransferLoanStickyNavProps) {
  const { openApplyModal } = useApplyModal();
  const [activeSection, setActiveSection] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 420);

      const scrollPos = window.scrollY + 160;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 130;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-200 font-montserrat shadow-xs ${
        isScrolled ? "py-2.5" : "py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Horizontal Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === item.id
                  ? "bg-primary text-white shadow-2xs"
                  : "text-gray-600 hover:text-primary hover:bg-gray-100/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Compact Right Quick Dock (visible on scroll) */}
        <div
          className={`hidden md:flex items-center gap-3 shrink-0 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
              <Image
                src={lender.logo}
                alt={lender.name}
                width={24}
                height={24}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="text-right leading-none">
              <span className="block text-[11px] font-bold text-gray-900 truncate max-w-[140px]">
                {lender.name}
              </span>
              <span className="text-[10px] text-primary font-bold">
                From {lender.interestRate?.min ?? 7.25}% p.a.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                lender.name,
                `Balance Transfer Application • Rates from ${lender.interestRate?.min ?? 7.25}% p.a.`
              )
            }
            className="bg-primary hover:bg-[#035259] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
