"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PersonalLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanStickyNavProps {
  lender: PersonalLoanLender;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview & Verdict" },
  { id: "emi-calculator", label: "EMI Calculator" },
  { id: "fees-charges", label: "Fees & Charges" },
  { id: "eligibility", label: "Eligibility" },
  { id: "documents", label: "Documents" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "disbursal-steps", label: "How It Works" },
  { id: "faqs", label: "FAQs" },
  { id: "similar-loans", label: "Similar Loans" },
];

export default function LoanStickyNav({ lender }: LoanStickyNavProps) {
  const { openApplyModal } = useApplyModal();
  const [activeSection, setActiveSection] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact lender dock when scrolled past hero
      setIsScrolled(window.scrollY > 400);

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
      const navOffset = 140;
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
    <div className="sticky top-[72px] sm:top-[84px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-2xs transition-all duration-300 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        
        {/* Horizontal Scrollable Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hidden py-3 text-xs font-semibold">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-2xs font-bold"
                    : "text-gray-600 hover:text-gray-950 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right side: Compact Mini CTA Dock */}
        <div
          className={`hidden md:flex items-center gap-3 shrink-0 py-2 transition-all duration-300 ${
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
              <Image
                src={lender.logo}
                alt={lender.name}
                width={28}
                height={28}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="text-right">
              <span className="block text-xs font-bricolage font-bold text-gray-900 truncate max-w-[160px]">
                {lender.name}
              </span>
              <span className="block text-[10px] text-primary font-bold">
                From {lender.interestRate?.min ?? 9.99}% p.a.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                lender.name,
                `Instant Loan Application • From ${lender.interestRate?.min ?? 9.99}% p.a.`
              )
            }
            className="bg-primary hover:bg-[#035259] text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
