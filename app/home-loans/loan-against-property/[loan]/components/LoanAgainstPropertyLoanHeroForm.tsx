"use client";

import React, { useState, useMemo } from "react";
import {
  User,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Headphones,
  RotateCcw,
  TrendingDown,
  Home,
  Briefcase,
  Layers,
} from "lucide-react";
import { LoanAgainstPropertyLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface LoanAgainstPropertyLoanHeroFormProps {
  lender: LoanAgainstPropertyLender;
}

export default function LoanAgainstPropertyLoanHeroForm({
  lender,
}: LoanAgainstPropertyLoanHeroFormProps) {
  const { openApplyModal } = useApplyModal();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState<
    "residential" | "commercial" | "industrial" | "plot"
  >("residential");
  const [propertyValue, setPropertyValue] = useState<number>(15000000); // ₹1.5 Crore default
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("selfEmployed");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const floorRate = lender.interestRate?.min ?? 9.25;
  const ltvRatio =
    propertyType === "residential"
      ? (lender.maxLtvPercent || 65) / 100
      : propertyType === "commercial"
      ? Math.min((lender.maxLtvPercent || 65) - 10, 55) / 100
      : 0.5;

  const maxEligibleLoan = useMemo(() => {
    const rawVal = propertyValue * ltvRatio;
    return Math.min(rawVal, lender.maxAmountNum || 100000000);
  }, [propertyValue, ltvRatio, lender.maxAmountNum]);

  const [requestedLoan, setRequestedLoan] = useState<number>(10000000); // ₹1 Crore default

  // Synchronize requested loan if it exceeds maxEligibleLoan
  const effectiveLoan = Math.min(requestedLoan, maxEligibleLoan);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const formatAmountText = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
    }
    return `₹${formatINR(val)}`;
  };

  // Calculations for 15-year tenure
  const tenureMonths = 15 * 12;
  const r = floorRate / 12 / 100;
  const factor = Math.pow(1 + r, tenureMonths);
  const estimatedEmi = Math.round((effectiveLoan * r * factor) / (factor - 1));

  // Property value presets
  const propertyPresets = [
    { label: "₹75L", value: 7500000 },
    { label: "₹1.5 Cr", value: 15000000 },
    { label: "₹3 Cr", value: 30000000 },
    { label: "₹5 Cr", value: 50000000 },
    { label: "₹10 Cr", value: 100000000 },
  ];

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Enter your full name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Enter your 10-digit mobile number";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Mobile number must be 10 digits";
    } else if (!/^[6-9]/.test(cleanPhone)) {
      newErrors.phone = "Must start with 6, 7, 8, or 9";
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
          formType: `Loan Against Property - ${lender.name}`,
          formTitle: `LAP Application (${lender.name}): ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          lender: lender.name,
          propertyType,
          propertyValue: `₹${formatINR(propertyValue)}`,
          requestedLoan: `₹${formatINR(effectiveLoan)}`,
          estimatedEmi: `₹${formatINR(estimatedEmi)}/mo`,
          floorRate: `${floorRate}%`,
          employmentType,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
    } catch (err) {
      console.warn("Failed to submit LAP hero form:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    setPropertyValue(15000000);
    setRequestedLoan(10000000);
    setEmploymentType("selfEmployed");
    setPropertyType("residential");
    setErrors({});
  };

  return (
    <div
      id="hero-apply-form"
      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200/90 relative overflow-hidden text-left font-montserrat"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-linear-to-br from-primary/10 to-gold/15 rounded-full blur-2xl pointer-events-none" />

      {!isSubmitted ? (
        <div>
          {/* Form Header */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Instant Mortgage Valuation</span>
            </div>

            <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
              Unlock Equity with <span className="text-primary">{lender.name}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Sanctions up to <strong className="text-primary font-bold">{lender.maxAmount}</strong> at floor rate of{" "}
              <strong className="text-primary font-bold">{floorRate}% p.a.</strong>
            </p>
          </div>

          {/* Live Loan Eligibility & EMI Highlight Pill */}
          <div className="bg-linear-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-200/80 rounded-2xl p-3 mb-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Est. Starting EMI (15 Yrs):</span>
              </div>
              <span className="font-bricolage font-extrabold text-sm sm:text-base text-emerald-700">
                ~₹{formatINR(estimatedEmi)} / mo
              </span>
            </div>
            <div className="mt-1 pt-1 border-t border-emerald-100 flex items-center justify-between text-[11px] text-gray-600">
              <span>Max Eligible Sanction:</span>
              <span className="font-bold text-gray-900">{formatAmountText(maxEligibleLoan)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Property Type Radio */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Property Collateral Type
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "residential", label: "Residential", icon: Home },
                  { id: "commercial", label: "Commercial", icon: Briefcase },
                  { id: "industrial", label: "Industrial/Plot", icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setPropertyType(
                          item.id as "residential" | "commercial" | "industrial" | "plot"
                        )
                      }
                      className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Market Value Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Fair Market Value of Property</span>
                <span className="font-bricolage font-extrabold text-primary text-sm">
                  {formatAmountText(propertyValue)}
                </span>
              </div>

              {/* Presets */}
              <div className="flex gap-1.5 mb-2 overflow-x-auto no-scrollbar">
                {propertyPresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPropertyValue(p.value)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all shrink-0 ${
                      propertyValue === p.value
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={2000000}
                max={200000000}
                step={500000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Desired Loan Amount */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Desired Loan Amount</span>
                <span className="font-bricolage font-extrabold text-gray-900 text-sm">
                  {formatAmountText(effectiveLoan)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={maxEligibleLoan}
                step={500000}
                value={effectiveLoan}
                onChange={(e) => setRequestedLoan(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>Min ₹10 Lakhs</span>
                <span>Max Sanction: {formatAmountText(maxEligibleLoan)}</span>
              </div>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Employment Profile
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "selfEmployed", label: "Business Owner / Self-Employed" },
                  { id: "salaried", label: "Salaried Professional" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setEmploymentType(item.id as "salaried" | "selfEmployed")
                    }
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      employmentType === item.id
                        ? "bg-primary/10 border-primary text-primary font-bold"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-hidden transition-all ${
                      errors.name
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 pointer-events-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ""));
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full pl-11 pr-3 py-2 text-xs rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-hidden transition-all ${
                      errors.phone
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Evaluating Valuation Norms...</span>
                </>
              ) : (
                <>
                  <span>Check In-Principle Sanction with {lender.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Trust Assurances */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Zero Impact on CIBIL
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Free Legal Title Check
              </span>
            </div>
          </form>
        </div>
      ) : (
        /* Submission Success Confirmation State */
        <div className="py-6 text-center space-y-4 animate-fadeIn">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="font-bricolage font-bold text-xl text-gray-900">
              Mortgage Application Registered!
            </h4>
            <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
              Thank you, <strong className="text-gray-900">{name}</strong>. Your loan valuation for{" "}
              <strong className="text-primary">{formatAmountText(effectiveLoan)}</strong> under{" "}
              {lender.name} has been submitted for fast in-principle appraisal.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs text-left space-y-2 max-w-sm mx-auto">
            <div className="flex justify-between">
              <span className="text-gray-500">Property Valuation:</span>
              <span className="font-bold text-gray-900">{formatAmountText(propertyValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Indicative Floor Rate:</span>
              <span className="font-bold text-primary">{floorRate}% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Monthly EMI:</span>
              <span className="font-bold text-emerald-700">~₹{formatINR(estimatedEmi)}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Senior Credit Desk:</span>
              <span className="font-bold text-gray-900">Dedicated Expert Assigned</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => openApplyModal(lender.name, "Loan Against Property")}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Connect with Mortgage Desk Now</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-700 py-1.5 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Recalculate with different property value</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
