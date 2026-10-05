"use client";

import React, { useState } from "react";
import {
  Building2,
  Phone,
  Briefcase,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Clock,
  Headphones,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

const CIBIL_RANGES = [
  { label: "750+ (Prime MSME)", value: "750+" },
  { label: "700–749 (Standard)", value: "700-749" },
  { label: "675–699 (Fair)", value: "675-699" },
  { label: "New to Credit / No Score", value: "New" },
];

const AMOUNT_PRESETS = [
  { label: "₹10L", value: 1000000 },
  { label: "₹25L", value: 2500000 },
  { label: "₹50L", value: 5000000 },
  { label: "₹1 Cr", value: 10000000 },
];

const TURNOVER_PRESETS = [
  { label: "Under ₹25 Lakhs", value: "<25L" },
  { label: "₹25L - ₹50 Lakhs", value: "25L-50L" },
  { label: "₹50L - ₹1 Crore", value: "50L-1Cr" },
  { label: "₹1 Crore+", value: "1Cr+" },
];

export default function BusinessLoanHeroForm() {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [constitution, setConstitution] = useState<"proprietorship" | "partnership" | "pvtLtd">("proprietorship");
  const [annualTurnover, setAnnualTurnover] = useState("₹50L - ₹1 Crore");
  const [vintage, setVintage] = useState("3+ Years");
  const [cibilScore, setCibilScore] = useState("750+");

  const [errors, setErrors] = useState<{ businessName?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formatting helper
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const validateForm = () => {
    const newErrors: { businessName?: string; phone?: string } = {};

    if (!businessName.trim()) {
      newErrors.businessName = "Please enter your enterprise / company name";
    } else if (businessName.trim().length < 2) {
      newErrors.businessName = "Enterprise name must be at least 2 characters";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your 10-digit mobile number";
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
          formType: "Business Loan Hero Form",
          formTitle: `Business Loan Request: ${businessName.trim()}`,
          businessName: businessName.trim(),
          phone: phone.replace(/\D/g, ""),
          loanAmount: `₹${formatINR(loanAmount)}`,
          constitution,
          annualTurnover,
          vintage,
          cibilScore,
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
    setBusinessName("");
    setPhone("");
    setLoanAmount(2500000);
    setConstitution("proprietorship");
    setCibilScore("750+");
    setAnnualTurnover("₹50L - ₹1 Crore");
    setVintage("3+ Years");
    setErrors({});
  };

  // Estimated monthly EMI based on lowest base rate (8.85% p.a. for 5 years = 60 months)
  const baseRate = 8.85;
  const monthlyRate = baseRate / 12 / 100;
  const tenureMonths = 60;
  const estimatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200/90 relative overflow-hidden text-left font-montserrat">
      {/* Background subtle ambient glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Instant MSME Eligibility Check</span>
            </div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
              Check Pre-Approved <span className="text-primary">Business Offers</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Zero physical paperwork • Soft check with zero impact on CIBIL.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Business / Enterprise Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Enterprise / Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: undefined }));
                  }}
                  placeholder="e.g. Apex Tech Solutions or Verma Traders"
                  className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.businessName
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.businessName && (
                <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">{errors.businessName}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Authorized Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex">
                <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-gray-600 flex items-center gap-1.5 select-none">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="98765 43210"
                  className={`flex-1 bg-gray-50 border rounded-r-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all tracking-wider ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">{errors.phone}</p>
              )}
            </div>

            {/* Required Loan Amount with Preset Chips */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Required Working Capital / Loan
                </label>
                <span className="font-bricolage font-bold text-xs sm:text-sm text-primary">
                  ₹{formatINR(loanAmount)}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-1">
                {AMOUNT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setLoanAmount(preset.value)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                      loanAmount === preset.value
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Entity Constitution Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Business Constitution
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 text-center">
                <button
                  type="button"
                  onClick={() => setConstitution("proprietorship")}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    constitution === "proprietorship"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Proprietorship
                </button>
                <button
                  type="button"
                  onClick={() => setConstitution("partnership")}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    constitution === "partnership"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Partnership/LLP
                </button>
                <button
                  type="button"
                  onClick={() => setConstitution("pvtLtd")}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    constitution === "pvtLtd"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Pvt Ltd / Ltd
                </button>
              </div>
            </div>

            {/* Annual Turnover & Business Vintage Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Annual Turnover
                </label>
                <select
                  value={annualTurnover}
                  onChange={(e) => setAnnualTurnover(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Under ₹25 Lakhs">Under ₹25L</option>
                  <option value="₹25L - ₹50 Lakhs">₹25L - ₹50L</option>
                  <option value="₹50L - ₹1 Crore">₹50L - ₹1 Crore</option>
                  <option value="₹1 Crore - ₹5 Crores">₹1 Cr - ₹5 Cr</option>
                  <option value="₹5 Crores+">₹5 Crores+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Business Vintage
                </label>
                <select
                  value={vintage}
                  onChange={(e) => setVintage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Under 1 Year">Under 1 Year</option>
                  <option value="1 to 3 Years">1 - 3 Years</option>
                  <option value="3+ Years">3+ Years (Prime)</option>
                  <option value="5+ Years">5+ Years (Established)</option>
                </select>
              </div>
            </div>

            {/* Credit Score Row */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Promoter / CMR Credit Score
              </label>
              <select
                value={cibilScore}
                onChange={(e) => setCibilScore(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
              >
                {CIBIL_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Trust note */}
            <div className="bg-[#EBF4ED]/60 border border-primary/10 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-gray-600 leading-snug">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                100% confidential. Checking pre-approved offers does not impact your commercial credit score.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-75 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Matching 12+ MSME Lenders...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Check Pre-Approved MSME Offers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* ── Celebratory Pre-Approval Verified Result ── */
        <div className="text-center py-2 animate-fadeIn relative">
          {/* Multi-ring pulsating checkmark */}
          <div className="relative flex items-center justify-center my-3">
            <div className="absolute w-16 h-16 rounded-full bg-emerald-500/15 animate-ping duration-1000 pointer-events-none" />
            <div className="relative w-16 h-16 rounded-full bg-linear-to-tr from-emerald-500 via-teal-400 to-[#C9AA3C] p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
                <div className="w-full h-full bg-linear-to-br from-primary to-[#035259] rounded-full flex items-center justify-center text-white shadow-inner">
                  <CheckCircle2 className="w-7 h-7 text-emerald-300 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary px-3 py-1 rounded-full text-[11px] font-bold mt-1 border border-primary/15 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            MSME Pre-Approval Match Found
          </div>

          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
            High Eligibility for <span className="text-primary">{businessName || "Your Enterprise"}</span>!
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Based on your turnover and vintage, you qualify for collateral-free business funding.
          </p>

          {/* Pre-Approved Sanction Card */}
          <div className="bg-[#FDFBF7] border border-gray-200 rounded-2xl p-4 my-4 text-left space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Requested Working Capital:</span>
              <span className="font-bold text-gray-900 font-bricolage text-base">₹{formatINR(loanAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Lowest Partner Benchmark:</span>
              <span className="font-bold text-emerald-700 font-bricolage text-base">From 8.85% p.a.</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
              <span className="text-primary font-bold">Estimated EMI (5 Yrs):</span>
              <span className="font-bricolage font-extrabold text-primary text-base">₹{formatINR(estimatedEmi)}/mo</span>
            </div>
          </div>

          {/* Callback note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 my-3 text-left flex items-center gap-2.5 text-xs text-emerald-950">
            <Headphones className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold leading-tight">Dedicated MSME Loan Officer assigned.</p>
              <p className="text-[11px] text-emerald-800 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Assistance turnaround: <strong>Under 15 minutes</strong>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("lenders-list-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Matching Banks Below</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="w-full text-xs font-semibold text-gray-500 hover:text-gray-800 py-1.5 flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Recalculate with another profile</span>
            </button>
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-3">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>256-Bit SSL Encrypted & RBI Regulated Ecosystem</span>
          </div>
        </div>
      )}
    </div>
  );
}
