"use client";

import React from "react";
import { formatINR } from "@/libs/calculators/emi";

interface EmiDonutChartProps {
  amount: number;
  totalInterest: number;
  principalPercent: number;
  interestPercent: number;
  radius?: number;
}

export default function EmiDonutChart({
  amount,
  totalInterest,
  principalPercent,
  interestPercent,
  radius = 64,
}: EmiDonutChartProps) {
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-full">
      {/* SVG Donut Ring with Gradients */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 160 160"
          role="img"
          aria-label={`Principal: ${principalPercent}%, Total Interest: ${interestPercent}%`}
        >
          <defs>
            <linearGradient id="emiPrincipalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="emiInterestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Track background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="16"
            fill="transparent"
          />

          {/* Principal Segment */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#emiPrincipalGrad)"
            strokeWidth="16"
            strokeDasharray={`${principalStroke} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />

          {/* Interest Segment */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#emiInterestGrad)"
            strokeWidth="16"
            strokeDasharray={`${interestStroke} ${circumference}`}
            strokeDashoffset={-principalStroke}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold font-montserrat">
            PRINCIPAL
          </span>
          <span className="text-xl sm:text-3xl font-extrabold font-bricolage text-white tracking-tight">
            {principalPercent}%
          </span>
        </div>
      </div>

      {/* Adjacent Legend & Stat Cards */}
      <div className="w-full flex-1 flex flex-col gap-2 sm:gap-2.5 max-w-full">
        {/* Principal Stat */}
        <div className="bg-[#044D45]/70 hover:bg-[#044D45]/90 border border-[#086359]/60 rounded-xl p-2.5 sm:p-3 transition-colors max-w-full">
          <div className="flex items-center justify-between mb-0.5 sm:mb-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 font-montserrat font-medium truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-2xs" />
              <span className="truncate">Principal ({principalPercent}%)</span>
            </div>
          </div>
          <p className="font-bricolage font-extrabold text-white text-sm sm:text-lg truncate">
            ₹ {formatINR(amount)}
          </p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-1 sm:mt-1.5 overflow-hidden">
            <div
              style={{ width: `${principalPercent}%` }}
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Interest Stat */}
        <div className="bg-[#044D45]/70 hover:bg-[#044D45]/90 border border-[#086359]/60 rounded-xl p-2.5 sm:p-3 transition-colors max-w-full">
          <div className="flex items-center justify-between mb-0.5 sm:mb-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-montserrat font-medium truncate">
              <span className="w-2 h-2 rounded-full bg-gold shrink-0 shadow-2xs" />
              <span className="truncate">Interest ({interestPercent}%)</span>
            </div>
          </div>
          <p className="font-bricolage font-extrabold text-gold text-sm sm:text-lg truncate">
            ₹ {formatINR(totalInterest)}
          </p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-1 sm:mt-1.5 overflow-hidden">
            <div
              style={{ width: `${interestPercent}%` }}
              className="h-full bg-gold rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
