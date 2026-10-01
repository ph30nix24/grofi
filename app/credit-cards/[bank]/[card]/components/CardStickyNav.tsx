"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CardStructure } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface CardStickyNavProps {
  card: CardStructure;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "rewards-calculator", label: "Rewards & Calculator" },
  { id: "fees-charges", label: "Fees & Charges" },
  { id: "lounge-travel", label: "Airport Lounge" },
  { id: "highlights", label: "Key Highlights" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "eligibility", label: "Eligibility" },
  { id: "faqs", label: "FAQs" },
  { id: "similar-cards", label: "Similar Cards" },
];

export default function CardStickyNav({ card }: CardStickyNavProps) {
  const { openApplyModal } = useApplyModal();
  const [activeSection, setActiveSection] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact card apply header when scrolled past hero
      setIsScrolled(window.scrollY > 450);

      // Highlight active section based on scroll position
      const scrollPos = window.scrollY + 140;
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
      const navOffset = 90;
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
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        
        {/* Horizontal Scrollable Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hidden py-3 text-xs font-montserrat font-semibold">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-2xs font-bold"
                    : "text-gray-600 hover:text-gray-950 hover:bg-gray-100/80"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right side: Mini CTA Dock (visible on scroll) */}
        <div
          className={`hidden md:flex items-center gap-3 shrink-0 py-2 transition-all duration-300 ${
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"
          }`}
        >
          <div className="text-right">
            <span className="block text-xs font-bricolage font-bold text-gray-900 truncate max-w-[180px]">
              {card.name}
            </span>
            <span className="block text-[11px] text-gray-500 font-montserrat">
              Annual Fee: <strong className="text-gray-900">{card.annualFee || "Nil"}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              openApplyModal(
                card.name,
                `${card.issuer} • ${card.badge || "Credit Card"}`
              )
            }
            className="bg-primary hover:bg-[#035259] text-white text-xs font-bold font-montserrat px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
