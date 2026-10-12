"use client";

import React from "react";
import {
  CheckCircle2,
  Headphones,
  Clock,
  ArrowRight,
  RotateCcw,
  Lock,
} from "lucide-react";
import { formatINR } from "@/libs/calculators/emi";

interface LeadFormSuccessProps {
  applicantName?: string;
  requestedAmount: number;
  startingRateText?: string;
  estimatedEmi?: number;
  scrollTargetId?: string;
  scrollButtonText?: string;
  onReset: () => void;
}

export default function LeadFormSuccess({
  applicantName = "Applicant",
  requestedAmount,
  startingRateText = "From 9.99% p.a.",
  estimatedEmi,
  scrollTargetId = "lenders-list-section",
  scrollButtonText = "Compare Matching Banks Below",
  onReset,
}: LeadFormSuccessProps) {
  const handleScroll = () => {
    if (scrollTargetId && typeof document !== "undefined") {
      const el = document.getElementById(scrollTargetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="text-center py-4 sm:py-6 animate-scaleUp">
      <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary px-3 py-1 rounded-full text-[11px] font-bold mt-1 border border-primary/15 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Pre-Approval Verified
      </div>

      <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
        You&apos;re Eligible, <span className="text-primary">{applicantName}</span>!
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        Based on your profile, you qualify for instant digital disbursal.
      </p>

      {/* Pre-Approved Sanction Card */}
      <div className="bg-[#FDFBF7] border border-gray-200 rounded-2xl p-4 my-4 text-left space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Requested Amount:</span>
          <span className="font-bold text-gray-900 font-bricolage text-base">
            ₹{formatINR(requestedAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Starting Interest Rate:</span>
          <span className="font-bold text-emerald-700 font-bricolage text-base">
            {startingRateText}
          </span>
        </div>
        {estimatedEmi !== undefined && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
            <span className="text-primary font-bold">Estimated EMI:</span>
            <span className="font-bricolage font-extrabold text-primary text-base">
              ₹{formatINR(estimatedEmi)}/mo
            </span>
          </div>
        )}
      </div>

      {/* Callback note */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 my-3 text-left flex items-center gap-2.5 text-xs text-emerald-950">
        <Headphones className="w-4 h-4 text-emerald-700 shrink-0" />
        <div>
          <p className="font-bold leading-tight">Our loan advisor will contact you shortly.</p>
          <p className="text-[11px] text-emerald-800 mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Response time: <strong>Under 15 minutes</strong>
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pt-2">
        {scrollTargetId && (
          <button
            onClick={handleScroll}
            className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{scrollButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onReset}
          className="w-full text-xs font-semibold text-gray-500 hover:text-gray-800 py-1.5 flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Check another loan amount</span>
        </button>
      </div>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-3">
        <Lock className="w-3 h-3 text-emerald-600" />
        <span>256-Bit SSL Encrypted & RBI Regulated</span>
      </div>
    </div>
  );
}
