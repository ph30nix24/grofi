"use client"
import { useEffect, useState } from "react";
import { useApplyModal } from "../context/ApplyModalContext";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { label: "Credit Cards", href: "#credit-cards" },
    { label: "Loans", href: "#products" },
    { label: "EMI Calculator", href: "#emi-calculator" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Reviews", href: "#testimonials" },
];

export default function Navbar() {
    const { openApplyModal } = useApplyModal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent scrolling when mobile drawer is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);


    return (
        <nav>
            {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 bg-[#F3F0DF]/95 backdrop-blur-md border-b border-[#DDE3C1] py-2.5 sm:py-3 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">

                    {/* Dynamic Responsive Logo */}
                    <a href="#" className="flex items-center shrink-0">
                        <Image
                            src="/Grofi.png"
                            width={160}
                            height={52}
                            className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 h-auto object-contain transition-all"
                            alt="Grofi - Smart Financial Growth Partner"
                            priority
                        />
                    </a>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-semibold text-gray-700">
                        {navLinks.map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className="flex items-center gap-1 hover:text-primary transition-colors duration-150 py-1"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right-Side Desktop & Tablet Actions */}
                    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                        {/* CTA Button (Visible on Tablet & Desktop, styled responsively) */}
                        <button
                            onClick={() => openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.")}
                            className="hidden sm:inline-flex bg-primary text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl items-center gap-1.5 sm:gap-2 hover:bg-primary/90 transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap"
                        >
                            <span>Check Eligibility</span>
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {/* Hamburger Button (Visible on Tablet & Mobile: < lg) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-primary flex items-center justify-center border border-[#DDE3C1] shadow-2xs transition-colors cursor-pointer"
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </nav>
            {/* ── Minimalist Mobile & Tablet Drawer Menu (< lg) ── */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-99 lg:hidden">
                    {/* Subtle backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-fadeIn transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Clean Minimalist Slide-in Drawer */}
                    <div className="fixed top-0 right-0 w-full max-w-72.5 sm:max-w-xs h-full bg-[#F3F0DF] shadow-2xl z-100 flex flex-col p-6 overflow-y-auto border-l border-[#DDE3C1] animate-slideInRight font-montserrat">

                        {/* Minimal Header */}
                        <div className="flex items-center justify-between pb-5 border-b border-[#DDE3C1]">
                            <Image
                                src="/Grofi.png"
                                width={120}
                                height={40}
                                className="w-28 h-auto object-contain"
                                alt="Grofi logo"
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center border border-[#DDE3C1] shadow-2xs transition-colors cursor-pointer"
                                aria-label="Close navigation menu"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Clean Minimalist Nav Links */}
                        <nav className="py-6 flex-1 flex flex-col gap-1.5">
                            {navLinks.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/80 text-gray-800 hover:text-primary font-semibold text-sm transition-all group cursor-pointer"
                                >
                                    <span>{l.label}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </a>
                            ))}
                        </nav>

                        {/* Minimal Bottom Action */}
                        <div className="pt-4 border-t border-[#DDE3C1] space-y-3">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    openApplyModal("General Pre-Approved Offers", "Instant eligibility check across 50+ partner banks.");
                                }}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                            >
                                <span>Check Eligibility</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="text-center text-[11px] text-gray-500 font-medium">
                                100% Free • Soft Bureau Inquiry
                            </p>
                        </div>

                    </div>
                </div>
            )}
        </nav>
    )
}