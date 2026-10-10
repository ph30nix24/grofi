"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  User,
  Phone,
  Building2,
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
import { BusinessLoanLender } from "../../components/type";

interface BusinessLoanHeroFormProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanHeroForm({ lender }: BusinessLoanHeroFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [entityType, setEntityType] = useState<"proprietorship" | "partnership" | "llp" | "pvtLtd">("proprietorship");
  const [annualTurnover, setAnnualTurnover] = useState("₹50 Lakhs - ₹1 Crore");
  const [vintage, setVintage] = useState("2 - 5 Years");
  const [loanAmount, setLoanAmount] = useState<number>(1000000);

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const maxAmount = lender.maxAmountNum || 10000000;
  const minRate = lender.interestRate?.min ?? 10.75;

  // Preset chips bounded by maxAmount
  const presets = useMemo(() => {
    const list = [
      { label: "₹5L", value: 500000 },
      { label: "₹10L", value: 1000000 },
      { label: "₹25L", value: 2500000 },
      { label: "₹50L", value: 5000000 },
      { label: "₹1 Cr", value: 10000000 },
    ];
    return list.filter((p) => p.value <= maxAmount);
  }, [maxAmount]);

  // Format currency
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Estimated monthly EMI based on lender's min rate for 4 years (48 mos)
  const estimatedEmi = useMemo(() => {
    const p = loanAmount;
    const r = minRate / 12 / 100;
    const n = Math.min(lender.tenureMonths || 48, 48);
    if (r === 0) return Math.round(p / n);
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, minRate, lender.tenureMonths]);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter promoter/business owner name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter mobile number";
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
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: `Business Loan - ${lender.name}`,
          formTitle: `Business Loan Application (${lender.name}): ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          lender: lender.name,
          loanAmount: `₹${formatINR(loanAmount)}`,
          entityType,
          annualTurnover,
          vintage,
          estimatedEmi: `₹${formatINR(estimatedEmi)}/mo`,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          consentTimestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setErrors((prev) => ({ ...prev, phone: err instanceof Error ? err.message : "Submission failed. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    setLoanAmount(Math.min(1000000, maxAmount));
    setEntityType("proprietorship");
    setAnnualTurnover("₹50 Lakhs - ₹1 Crore");
    setVintage("2 - 5 Years");
    setErrors({});
  };

  return (
    <div
      id="hero-apply-form"
      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200/90 relative overflow-hidden text-left font-montserrat"
    >
      {/* Background subtle ambient glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {!isSubmitted ? (
        <div>
          {/* Form Header */}
          <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-primary/15 mb-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Instant MSME Sanction</span>
              </div>
              <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                Apply for <span className="text-primary">{lender.name}</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Disbursal in {lender.disbursalTime} • 0 CIBIL or CMR score hit.
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
            {/* Promoter / Business Owner Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Promoter / Owner Name <span className="text-red-500">*</span>
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
                  placeholder="Enter business owner or director name"
                  className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
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
                Registered Mobile Number <span className="text-red-500">*</span>
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

            {/* Entity Constitution Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Business Constitution
              </label>
              <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-center">
                {(
                  [
                    { key: "proprietorship", label: "Proprietor" },
                    { key: "partnership", label: "Partnership" },
                    { key: "llp", label: "LLP" },
                    { key: "pvtLtd", label: "Pvt Ltd" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setEntityType(t.key)}
                    className={`py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer truncate ${
                      entityType === t.key
                        ? "bg-white text-primary shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Turnover & Business Vintage */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span>Annual Turnover</span>
                </label>
                <select
                  value={annualTurnover}
                  onChange={(e) => setAnnualTurnover(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                  <option value="₹25 Lakhs - ₹50 Lakhs">₹25L - ₹50 Lakhs</option>
                  <option value="₹50 Lakhs - ₹1 Crore">₹50L - ₹1 Crore</option>
                  <option value="₹1 Crore - ₹5 Crores">₹1 Cr - ₹5 Crores</option>
                  <option value="Above ₹5 Crores">₹5 Crores+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-primary" />
                  <span>Business Vintage</span>
                </label>
                <select
                  value={vintage}
                  onChange={(e) => setVintage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Under 1 Year">&lt; 1 Year</option>
                  <option value="1 - 2 Years">1 - 2 Years</option>
                  <option value="2 - 5 Years">2 - 5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
            </div>

            {/* Required Loan Amount & Chips */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Required Loan Quantum
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
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer text-center ${
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

            {/* Dynamic Live EMI Estimate Banner */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-[#EBF4ED] to-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <span className="text-emerald-900 font-medium">Est. Monthly EMI (48 Mo):</span>
              <span className="font-bricolage font-extrabold text-sm text-primary">
                ₹{formatINR(estimatedEmi)}/mo
              </span>
            </div>

            {/* Trust note */}
            <div className="bg-[#EBF4ED]/50 border border-primary/10 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-gray-600 leading-snug">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                100% confidential. Checking pre-approved business credit has zero impact on promoter CIBIL or commercial CMR score.
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
                  <span>Evaluating MSME Pre-Approval...</span>
                </>
              ) : (
                <>
                  <span>Check Pre-Approved Business Offer</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-gray-400">
              🔒 256-bit SSL encrypted. Direct verification via official commercial banking desks.
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
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-[#C9AA3C] p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
                <div className="w-full h-full bg-gradient-to-br from-primary to-[#035259] rounded-full flex items-center justify-center text-white shadow-inner">
                  <CheckCircle2 className="w-7 h-7 text-emerald-300 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary px-3 py-1 rounded-full text-[11px] font-bold mt-2 border border-primary/15 shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            MSME Application Fast-Tracked
          </div>

          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
            Application Received, <span className="text-primary">{name || "Partner"}</span>!
          </h3>

          <div className="bg-gradient-to-r from-[#EBF4ED] via-emerald-50 to-[#EBF4ED] border border-emerald-300/80 rounded-2xl p-3.5 my-3.5 shadow-xs flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-emerald-950 text-xs sm:text-sm leading-tight">
                Our {lender.name} commercial loan manager will connect with you.
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
              <span className="text-gray-400 font-medium">Business Turnover:</span>
              <span className="font-bold text-gray-800">{annualTurnover}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Registered Phone:</span>
              <span className="font-mono font-bold text-gray-800">+91 {phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 my-3">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free Consultation</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>Bank-Grade Encryption</span>
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
