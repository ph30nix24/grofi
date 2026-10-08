"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Zap,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Building2,
  Percent,
} from "lucide-react";
import { InstantLoanLender } from "./type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface InstantLoanCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenders: InstantLoanLender[];
  onRemove: (id: string) => void;
}

export default function InstantLoanCompareModal({
  isOpen,
  onClose,
  lenders,
  onRemove,
}: InstantLoanCompareModalProps) {
  const { openApplyModal } = useApplyModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || lenders.length === 0) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn font-montserrat">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-gray-200 z-10 animate-scaleUp overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 via-white to-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-gold flex items-center justify-center border border-amber-200/60">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900">
                Instant Personal Loan Comparison
              </h2>
              <p className="text-xs text-gray-500">
                Evaluating {lenders.length} instant lender{lenders.length > 1 ? "s" : ""} on speed, rate, and eligibility
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable comparison matrix */}
        <div className="overflow-auto flex-1 p-4 sm:p-6">
          <div className="min-w-[620px]">
            {/* Top Lender Cards Header */}
            <div className="grid grid-cols-12 gap-3 pb-6 border-b border-gray-200">
              <div className="col-span-3 font-bricolage font-bold text-sm text-gray-500 flex items-end pb-2">
                Parameters
              </div>

              {lenders.map((lender) => (
                <div
                  key={lender.id}
                  className={`${
                    lenders.length === 2 ? "col-span-4" : "col-span-3"
                  } bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200 text-center relative flex flex-col justify-between`}
                >
                  <button
                    onClick={() => onRemove(lender.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 rounded-full cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-12 h-12 bg-white rounded-xl p-1.5 mx-auto border border-gray-200 flex items-center justify-center mb-2">
                    <Image
                      src={lender.logo}
                      alt={lender.name}
                      width={44}
                      height={44}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <h3 className="font-bricolage font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                    {lender.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{lender.tagline}</p>

                  <button
                    onClick={() => openApplyModal(lender.name, `Instant loan with ${lender.disbursalTime} disbursal`)}
                    className="mt-3 w-full bg-primary hover:bg-[#02383d] text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3 h-3 text-gold" />
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-gray-100 text-xs">
              {/* Turnaround Speed */}
              <div className="grid grid-cols-12 gap-3 py-3.5 items-center bg-amber-50/40 px-2 rounded-xl">
                <div className="col-span-3 font-bold text-gray-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Disbursal Speed</span>
                </div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center font-bold text-amber-800 flex items-center justify-center gap-1`}
                  >
                    <Zap className="w-3.5 h-3.5 text-gold" />
                    <span>{l.disbursalTime}</span>
                  </div>
                ))}
              </div>

              {/* Interest Rate */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Interest Rate</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center font-bold text-emerald-700`}
                  >
                    {l.interestRate.text}
                  </div>
                ))}
              </div>

              {/* Starting EMI / Lakh */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Starting EMI / Lakh</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center font-bold text-gray-900`}
                  >
                    ₹{l.startingEmiPerLakh.toLocaleString("en-IN")}/mo
                  </div>
                ))}
              </div>

              {/* Max Sanction */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Maximum Limit</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center font-bold text-primary`}
                  >
                    {l.maxAmount}
                  </div>
                ))}
              </div>

              {/* Min Credit Score */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Min CIBIL Score</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center font-semibold ${
                      l.minCreditScore <= 650 ? "text-amber-700" : "text-gray-800"
                    }`}
                  >
                    {l.minCreditScore}+ {l.minCreditScore <= 650 ? "(App Friendly)" : ""}
                  </div>
                ))}
              </div>

              {/* Min Income */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Minimum Income</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center text-gray-700`}
                  >
                    {l.minIncome}
                  </div>
                ))}
              </div>

              {/* Processing Fee */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Processing Fee</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center text-gray-600 text-[11px]`}
                  >
                    {l.processingFee}
                  </div>
                ))}
              </div>

              {/* Tenure Range */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Tenure Range</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center text-gray-700 font-medium`}
                  >
                    {l.tenure}
                  </div>
                ))}
              </div>

              {/* Documentation */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Documentation Mode</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center text-gray-700 font-medium flex items-center justify-center gap-1`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{l.documentation}</span>
                  </div>
                ))}
              </div>

              {/* RBI Status */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">RBI Regulated</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center text-emerald-700 font-bold flex items-center justify-center gap-1`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% RBI Regulated</span>
                  </div>
                ))}
              </div>

              {/* User Ratings & Downloads */}
              <div className="grid grid-cols-12 gap-3 py-3 items-center px-2">
                <div className="col-span-3 font-semibold text-gray-600">Ratings & Trust</div>
                {lenders.map((l) => (
                  <div
                    key={l.id}
                    className={`${
                      lenders.length === 2 ? "col-span-4" : "col-span-3"
                    } text-center text-gray-700`}
                  >
                    <div className="flex items-center justify-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{l.rating.toFixed(1)}/5</span>
                    </div>
                    <span className="text-[10px] text-gray-500 block">
                      {l.appDownloads ? `${l.appDownloads} App Downloads` : `${l.reviewCount} reviews`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            All loans are credited directly into your verified bank account via IMPS/NEFT.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
