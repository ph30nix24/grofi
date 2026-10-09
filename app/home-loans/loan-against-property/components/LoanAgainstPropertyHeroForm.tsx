"use client";

import React, { useState } from "react";
import {
  User,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

const PROPERTY_VALUE_PRESETS = [
  { label: "₹50L", value: 5000000 },
  { label: "₹1 Cr", value: 10000000 },
  { label: "₹2 Cr", value: 20000000 },
  { label: "₹5 Cr", value: 50000000 },
  { label: "₹10 Cr", value: 100000000 },
];

const TENURE_PRESETS = [
  { label: "5 Yrs", value: 5 },
  { label: "10 Yrs", value: 10 },
  { label: "15 Yrs", value: 15 },
  { label: "20 Yrs", value: 20 },
];

export default function LoanAgainstPropertyHeroForm() {
  const { openApplyModal } = useApplyModal();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyValue, setPropertyValue] = useState<number>(10000000); // ₹1 Crore default
  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "industrial">("residential");
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("selfEmployed");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formatting helpers
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const formatShortINR = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
    }
    return `₹${formatINR(val)}`;
  };

  // Max LTV based on property type
  const ltvPercent = propertyType === "residential" ? 70 : propertyType === "commercial" ? 60 : 50;
  const maxLoanEligible = Math.round(propertyValue * (ltvPercent / 100));

  // Base interest rate estimate: ~9.25% p.a.
  const interestRate = 9.25;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const estimatedEmi = Math.round(
    (maxLoanEligible * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your mobile number";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    } else if (!/^[6-9]/.test(cleanPhone)) {
      newErrors.phone = "Mobile number must start with 6, 7, 8, or 9";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Loan Against Property Hero Form",
          formTitle: `LAP Request: ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          propertyValue: `₹${formatINR(propertyValue)}`,
          propertyType,
          maxLoanEligible: `₹${formatINR(maxLoanEligible)} (${ltvPercent}% LTV)`,
          tenureYears: `${tenureYears} Years`,
          employmentType,
          estimatedEmi: `₹${formatINR(estimatedEmi)}/mo`,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
    } catch (err) {
      console.warn("Failed to submit form to server:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    setPropertyValue(10000000);
    setTenureYears(15);
    setPropertyType("residential");
    setEmploymentType("selfEmployed");
    setErrors({});
  };

  const handleProceed = (bankName: string) => {
    openApplyModal(bankName, "Loan Against Property");
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-primary/15 shadow-xl p-5 sm:p-7 relative font-montserrat">
      {/* Decorative accent top gradient */}
      <div className="absolute top-0 left-6 right-6 h-1 bg-linear-to-r from-primary via-gold to-primary rounded-t-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Instant Valuation & Quote</span>
          </div>
          <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-0.5">
            Check Your LAP Eligibility
          </h3>
        </div>
        <div className="bg-[#EBF4ED] text-primary border border-primary/20 px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0">
          Up to 75% LTV
        </div>
      </div>

      {isSubmitted ? (
        /* Post-submission Success State */
        <div className="py-6 text-center animate-fadeIn">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-bricolage font-bold text-xl text-gray-900 mb-1">
            Eligibility Request Sent!
          </h4>
          <p className="text-xs text-gray-600 max-w-sm mx-auto mb-4">
            Thank you, <strong className="text-gray-900">{name}</strong>. You are pre-qualified for up to{" "}
            <strong className="text-primary font-bold">{formatShortINR(maxLoanEligible)}</strong> against your {propertyType} property.
          </p>

          {/* Quick Summary Pill */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 mb-5 text-left text-xs space-y-1.5">
            <div className="flex justify-between text-gray-600">
              <span>Estimated Property Value:</span>
              <span className="font-bold text-gray-900">{formatShortINR(propertyValue)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Max Funding ({ltvPercent}% LTV):</span>
              <span className="font-bold text-emerald-700">{formatShortINR(maxLoanEligible)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Indicative EMI @ 9.25%:</span>
              <span className="font-bold text-primary">₹{formatINR(estimatedEmi)}/mo</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleProceed("SBI Loan Against Property")}
              className="w-full bg-primary hover:bg-[#023337] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Compare Top 3 LAP Lenders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Calculate with another property</span>
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Input Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property Type Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Property Collateral Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "residential", label: "Residential", ltv: "70% LTV" },
                  { id: "commercial", label: "Commercial", ltv: "60% LTV" },
                  { id: "industrial", label: "Industrial", ltv: "50% LTV" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPropertyType(t.id)}
                  className={`py-2 px-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                    propertyType === t.id
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="truncate">{t.label}</div>
                  <div className={`text-[10px] ${propertyType === t.id ? "text-gold" : "text-gray-400"}`}>
                    {t.ltv}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Property Market Value Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Estimated Property Value
              </label>
              <span className="font-bricolage font-bold text-primary text-base">
                {formatShortINR(propertyValue)}
              </span>
            </div>
            <input
              type="range"
              min={2500000}
              max={150000000}
              step={500000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
            />
            {/* Quick value presets */}
            <div className="flex items-center justify-between gap-1 mt-1.5">
              {PROPERTY_VALUE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPropertyValue(p.value)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border cursor-pointer transition-colors ${
                    propertyValue === p.value
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Calculated Eligibility Banner */}
          <div className="bg-linear-to-br from-[#FDFBF7] to-[#EBF4ED] border border-primary/20 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Max Eligible Loan ({ltvPercent}% LTV)
              </div>
              <div className="font-bricolage font-extrabold text-emerald-800 text-lg sm:text-xl">
                {formatShortINR(maxLoanEligible)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Est. EMI @ 9.25%
              </div>
              <div className="font-bricolage font-bold text-primary text-sm sm:text-base">
                ₹{formatINR(estimatedEmi)}
                <span className="text-[10px] font-normal text-gray-500">/mo</span>
              </div>
            </div>
          </div>

          {/* Tenure & Employment Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Tenure */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Loan Tenure
              </label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                aria-label="Loan Tenure in Years"
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs font-bold rounded-xl py-2 px-2.5 focus:outline-hidden focus:border-primary cursor-pointer"
              >
                {TENURE_PRESETS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label} ({t.value * 12} Mos)
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Employment
              </label>
              <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setEmploymentType("salaried")}
                  className={`py-1 text-[11px] font-bold rounded-lg cursor-pointer transition-all ${
                    employmentType === "salaried"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Salaried
                </button>
                <button
                  type="button"
                  onClick={() => setEmploymentType("selfEmployed")}
                  className={`py-1 text-[11px] font-bold rounded-lg cursor-pointer transition-all ${
                    employmentType === "selfEmployed"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Business
                </button>
              </div>
            </div>
          </div>

          {/* Contact Fields: Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Name */}
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full bg-gray-50 text-gray-800 text-xs pl-9 pr-3 py-2.5 rounded-xl border focus:outline-hidden focus:border-primary transition-colors ${
                    errors.name ? "border-red-500 bg-red-50/20" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Mobile */}
            <div>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-xs font-bold text-gray-400">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit Mobile"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`w-full bg-gray-50 text-gray-800 text-xs pl-11 pr-3 py-2.5 rounded-xl border focus:outline-hidden focus:border-primary transition-colors ${
                    errors.phone ? "border-red-500 bg-red-50/20" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-[#023337] active:scale-[0.99] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Bank Offers...</span>
              </>
            ) : (
              <>
                <span>Unlock Mortgage Offers & Pre-Approval</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Trust Guarantees Footer */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-primary" />
              Zero Spam Guarantee
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold" />
              Fast In-Principle Sanction
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
