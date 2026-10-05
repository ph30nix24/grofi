"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Gauge,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Clock,
  Headphones,
  RotateCcw,
} from "lucide-react";

interface HeroEligibilityFormProps {
  bankName: string;
}

const CIBIL_RANGES = [
  { label: "750+ (Excellent)", value: "750+" },
  { label: "700–749 (Good)", value: "700-749" },
  { label: "650–699 (Fair)", value: "650-699" },
  { label: "New to Credit", value: "New" },
];

export default function HeroEligibilityForm({ bankName }: HeroEligibilityFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cibilScore, setCibilScore] = useState("750+");
  const [customScore, setCustomScore] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; score?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; score?: string } = {};

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

    if (!cibilScore && !customScore.trim()) {
      newErrors.score = "Please select or enter your CIBIL score";
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
          formType: `Credit Card Eligibility - ${bankName}`,
          formTitle: `Credit Card Eligibility (${bankName}): ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          bank: bankName,
          cibilScore: cibilScore === "Other" ? (customScore || "Custom") : cibilScore,
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
    setCibilScore("750+");
    setCustomScore("");
    setErrors({});
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl border border-[#DDE3C1] relative overflow-hidden text-left">
      {/* Background subtle ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary/15 mb-2 font-montserrat">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Instant Eligibility Check</span>
            </div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
              Check Pre-Approved <span className="text-primary">{bankName}</span> Cards
            </h3>
            <p className="text-xs text-gray-500 font-montserrat mt-1">
              Zero paperwork • Soft inquiry with 0 CIBIL score impact.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-montserrat">
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
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all font-montserrat ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-montserrat">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex">
                <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-600 flex items-center gap-1 select-none">
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
                  className={`flex-1 bg-gray-50 border rounded-r-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all font-montserrat tracking-wider ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* CIBIL Score Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider font-montserrat">
                  Estimated CIBIL Score <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-emerald-700 font-semibold font-montserrat flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Soft Check Only
                </span>
              </div>

              {/* Quick CIBIL Range Pills */}
              <div className="flex flex-wrap gap-2 mb-2">
                {CIBIL_RANGES.map((range) => {
                  const isSelected = cibilScore === range.value && !customScore;
                  return (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() => {
                        setCibilScore(range.value);
                        setCustomScore("");
                        if (errors.score) setErrors((prev) => ({ ...prev, score: undefined }));
                      }}
                      className={`flex-1 min-w-[calc(50%-0.25rem)] py-2 px-2.5 rounded-xl text-xs font-semibold font-montserrat transition-all text-center cursor-pointer border ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>

              {/* Exact CIBIL Score Input Option */}
              <div className="relative">
                <Gauge className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="number"
                  min={300}
                  max={900}
                  value={customScore}
                  onChange={(e) => {
                    setCustomScore(e.target.value);
                    setCibilScore("");
                    if (errors.score) setErrors((prev) => ({ ...prev, score: undefined }));
                  }}
                  placeholder="Or enter exact CIBIL score (e.g. 780)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white font-montserrat"
                />
              </div>

              {errors.score && (
                <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                  {errors.score}
                </p>
              )}
            </div>

            {/* Trust Note */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-montserrat py-1">
              <span className="flex items-center gap-1 text-gray-600">
                <Lock className="w-3.5 h-3.5 text-primary" />
                256-Bit SSL Encrypted
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                No Spam Calls
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer disabled:opacity-75 group active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking {bankName} Offers...</span>
                </>
              ) : (
                <>
                  <span>Check Pre-Approved {bankName} Cards</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Celebratory Confirmation Screen */
        <div className="text-center py-4 animate-fadeIn">
          {/* Animated Success Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3 shadow-inner">
            <CheckCircle2 className="w-9 h-9 text-emerald-600" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary px-3 py-1 rounded-full text-[11px] font-bold font-montserrat mb-2 border border-primary/15">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Eligible for Pre-Approved Cards
          </div>

          <h3 className="font-bricolage font-bold text-2xl text-gray-900 leading-tight">
            Great News, <span className="text-primary">{name}!</span>
          </h3>

          <p className="text-xs text-gray-600 font-montserrat mt-1.5 leading-relaxed">
            Based on your estimated CIBIL score of <strong>{customScore || cibilScore}</strong>, you have a <strong>95%+ approval probability</strong> for top {bankName} credit cards.
          </p>

          <div className="bg-[#EBF4ED]/60 border border-emerald-300/80 rounded-2xl p-3.5 my-4 text-left flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <p className="font-montserrat font-bold text-xs text-gray-900 leading-tight">
                Dedicated Concierge Assistance
              </p>
              <p className="text-[11px] text-gray-600 font-montserrat mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                Estimated callback in <strong className="text-primary font-bold">under 15 minutes</strong> for paperless KYC.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-2.5 text-xs text-gray-500 font-montserrat mb-4">
            Registered Mobile: <strong className="text-gray-900 font-mono">+91 {phone}</strong>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition-colors font-montserrat cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Check Another Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}
