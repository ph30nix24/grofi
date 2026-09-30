import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, CheckCircle2, Zap } from "lucide-react";
import HeroEligibilityForm from "./HeroEligibilityForm";
import { getBankLogoUrl, parseFeeNumber } from "./constants";
import { CardStructure } from "../../components/type";

interface BankHeroProps {
  bankName: string;
  bankSlug: string;
  cards: CardStructure[];
}

export default function BankHero({ bankName, bankSlug, cards }: BankHeroProps) {
  const bankLogoUrl = getBankLogoUrl(bankSlug, bankName, cards[0]?.logo);
  const totalCards = cards.length;
  const freeCardsCount = cards.filter(
    (c) =>
      parseFeeNumber(c.annualFee) === 0 ||
      /nil|free|₹0/i.test(c.annualFee || "") ||
      /lifetime free/i.test(c.badge || "")
  ).length;

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 md:px-8 bg-linear-to-b from-[#F3F0DF]/80 via-[#F3F0DF]/35 to-white overflow-hidden border-b border-[#DDE3C1]/60">
      {/* Ambient subtle glow lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <nav className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6 font-montserrat">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/credit-cards" className="hover:text-primary transition-colors">
            Credit Cards
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-bold">{bankName}</span>
        </nav>

        {/* Two-Column Hero: Left = Copy & Metrics, Right = Eligibility Form */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Bank Specs */}
          <div className="w-full lg:w-7/12 text-left">
            {/* Bank Partner Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-full border border-primary/20 shadow-xs mb-4">
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src={bankLogoUrl}
                  alt={bankName}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-primary font-montserrat tracking-wide">
                Verified {bankName} Partner Cards
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Heading */}
            <h1 className="font-bricolage font-bold text-3xl sm:text-4xl md:text-5xl text-primary leading-tight">
              Best{" "}
              <span className="text-gold relative inline-block">
                {bankName} Credit Cards
                <span className="absolute bottom-1 left-0 w-full h-1.5 bg-gold/25 rounded-full" />
              </span>{" "}
              in India ({totalCards} Cards)
            </h1>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-montserrat mt-4 max-w-xl">
              Compare annual fees, lounge access, reward rates, RuPay UPI features, and welcome benefits across {bankName}&apos;s official card lineup. Apply online with instant eligibility check and zero impact on your CIBIL score.
            </p>

            {/* Key stats pill strip */}
            <div className="flex flex-wrap gap-3 max-w-xl mt-7">
              <div className="flex-1 min-w-[120px] bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-[#DDE3C1] shadow-2xs">
                <span className="font-bricolage font-bold text-xl sm:text-2xl text-primary block">
                  {totalCards}+
                </span>
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                  Verified Cards
                </span>
              </div>

              <div className="flex-1 min-w-[120px] bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-[#DDE3C1] shadow-2xs">
                <span className="font-bricolage font-bold text-xl sm:text-2xl text-gold block">
                  {freeCardsCount}
                </span>
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                  Lifetime Free
                </span>
              </div>

              <div className="flex-1 min-w-[120px] bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-[#DDE3C1] shadow-2xs">
                <span className="font-bricolage font-bold text-xl sm:text-2xl text-emerald-700 block">
                  Up to 33%
                </span>
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                  Reward Value
                </span>
              </div>

              <div className="flex-1 min-w-[120px] bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-[#DDE3C1] shadow-2xs">
                <span className="font-bricolage font-bold text-xl sm:text-2xl text-primary block">
                  ₹0 Fee
                </span>
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider block font-montserrat mt-0.5">
                  Soft Inquiry
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-600 font-montserrat">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero CIBIL Impact</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>100% Free Advisory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Video KYC</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Lead Form */}
          <div className="w-full lg:w-5/12">
            <HeroEligibilityForm bankName={bankName} />
          </div>
        </div>
      </div>
    </section>
  );
}
