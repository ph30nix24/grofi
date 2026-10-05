"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  User,
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
  Building,
  Home,
  Check,
} from "lucide-react";
import { HomeLoanLender } from "../../components/type";

interface HomeLoanHeroFormProps {
  lender: HomeLoanLender;
}

export default function HomeLoanHeroForm({ lender }: HomeLoanHeroFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");
  const [propertyStage, setPropertyStage] = useState("Ready to Move");
  const [tenureYears, setTenureYears] = useState<number>(20);

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const maxAmount = lender.maxAmountNum || 100000000;
  const minRate = lender.interestRate?.min ?? 7.15;

  // Preset loan amounts (₹30L, ₹50L, ₹75L, ₹1 Cr, ₹1.5 Cr)
  const presets = useMemo(() => {
    const list = [
      { label: "₹30L", value: 3000000 },
      { label: "₹50L", value: 5000000 },
      { label: "₹75L", value: 7500000 },
      { label: "₹1 Cr", value: 10000000 },
      { label: "₹1.5 Cr", value: 15000000 },
    ];
    return list.filter((p) => p.value <= maxAmount);
  }, [maxAmount]);

  // Format currency in Indian numbering
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Estimated monthly EMI based on lender's min rate and chosen tenure
  const estimatedEmi = useMemo(() => {
    const p = loanAmount;
    const r = minRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return Math.round(p / n);
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, minRate, tenureYears]);

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
          formType: `Home Loan - ${lender.name}`,
          formTitle: `Home Loan Application (${lender.name}): ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          lender: lender.name,
          loanAmount: `₹${formatINR(loanAmount)}`,
          tenureYears: `${tenureYears} Years`,
          employmentType,
          propertyStage,
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
    setLoanAmount(Math.min(5000000, maxAmount));
    setEmploymentType("salaried");
    setPropertyStage("Ready to Move");
    setTenureYears(20);
    setErrors({});
  };

  return (
    <div
      id="hero-apply-form"
      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200/90 relative overflow-hidden text-left font-montserrat"
    >
      {/* Background subtle ambient glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

      {!isSubmitted ? (
        <div>
          {/* Form Header */}
          <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-primary/15 mb-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Instant Pre-Approval</span>
              </div>
              <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                Apply for <span className="text-primary">{lender.name}</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Rates starting from {minRate}% p.a. • Zero CIBIL score hit.
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
              <Image
                src={lender.logo}
                alt={lender.name}
                width={38}
                height={38}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Enter your full name"
                  className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:bg-white transition-all ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">{errors.name}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-red-500">*</span>
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
                  className={`flex-1 bg-gray-50 border rounded-r-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:bg-white transition-all tracking-wider ${
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

            {/* Required Loan Amount & Chips */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Required Loan Amount
                </label>
                <span className="font-bricolage font-bold text-xs sm:text-sm text-primary">
                  ₹{formatINR(loanAmount)}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 mb-1">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setLoanAmount(preset.value)}
                    className={`py-1.5 px-1 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
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

            {/* Employment Type & Property Stage */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Employment
                </label>
                <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setEmploymentType("salaried")}
                    className={`py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      employmentType === "salaried"
                        ? "bg-white text-primary shadow-xs"
                        : "text-gray-600"
                    }`}
                  >
                    <Briefcase className="w-3 h-3" />
                    <span>Salaried</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmploymentType("selfEmployed")}
                    className={`py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      employmentType === "selfEmployed"
                        ? "bg-white text-primary shadow-xs"
                        : "text-gray-600"
                    }`}
                  >
                    <Building className="w-3 h-3" />
                    <span>Self-Emp</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Property Stage
                </label>
                <select
                  value={propertyStage}
                  onChange={(e) => setPropertyStage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Resale Property">Resale Property</option>
                  <option value="Plot + Construction">Plot + Construction</option>
                  <option value="Balance Transfer">Balance Transfer</option>
                </select>
              </div>
            </div>

            {/* Tenure Selection (20Y vs 30Y) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Preferred Tenure
                </label>
                <span className="text-xs font-semibold text-gray-500">
                  {tenureYears} Years ({tenureYears * 12} Mos)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[15, 20, 25, 30].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                      tenureYears === yr
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Live EMI Estimate Banner */}
            <div className="p-2.5 rounded-xl bg-linear-to-r from-emerald-50 via-[#EBF4ED] to-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-950 font-medium">
                <Home className="w-3.5 h-3.5 text-emerald-700" />
                <span>Est. Monthly EMI ({tenureYears}Y):</span>
              </div>
              <span className="font-bricolage font-extrabold text-sm sm:text-base text-primary">
                ₹{formatINR(estimatedEmi)}/mo
              </span>
            </div>

            {/* Trust Note */}
            <div className="bg-[#EBF4ED]/50 border border-primary/10 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-gray-600 leading-snug">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                100% confidential. Checking pre-approved housing loan offers does not affect your credit score.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-75 group active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking Pre-Approval...</span>
                </>
              ) : (
                <>
                  <span>Check Pre-Approved Offer</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-gray-400">
              🔒 256-bit SSL encrypted. Direct official banking partner verification.
            </p>
          </form>
        </div>
      ) : (
        /* Celebratory Confirmation Screen */
        <div className="text-center py-4 animate-fadeIn relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

          {/* Success Check Badge */}
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

          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary px-3 py-1 rounded-full text-[11px] font-bold mt-2 border border-primary/15 shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Home Loan Pre-Approval Initiated
          </div>

          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
            You&apos;re All Set, <span className="text-primary">{name || "Applicant"}</span>!
          </h3>

          <div className="bg-linear-to-r from-[#EBF4ED] via-emerald-50 to-[#EBF4ED] border border-emerald-300/80 rounded-2xl p-3.5 my-3.5 shadow-xs flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-emerald-950 text-xs sm:text-sm leading-tight">
                Our {lender.name} housing loan specialist will contact you shortly.
              </p>
              <p className="text-[11px] text-emerald-800/85 mt-0.5 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Response time: <strong className="font-bold text-emerald-950">Under 15 minutes</strong>
              </p>
            </div>
          </div>

          {/* Application Summary Box */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 my-3 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Selected Lender:</span>
              <span className="font-bold text-gray-900">{lender.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Requested Amount:</span>
              <span className="font-bold text-primary">₹{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Property Stage:</span>
              <span className="font-bold text-gray-800">{propertyStage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Est. Monthly EMI:</span>
              <span className="font-bold text-emerald-700">₹{formatINR(estimatedEmi)}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Registered Phone:</span>
              <span className="font-mono font-bold text-gray-800">+91 {phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 my-3">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free Doorstep Support</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Apply for Another Amount</span>
          </button>
        </div>
      )}
    </div>
  );
}
