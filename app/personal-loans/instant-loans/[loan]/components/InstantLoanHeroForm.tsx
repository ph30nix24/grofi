"use client";

import React, { useState, useMemo } from "react";
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
  Zap,
} from "lucide-react";
import { InstantLoanLender } from "../../components/type";

interface InstantLoanHeroFormProps {
  lender: InstantLoanLender;
}

export default function InstantLoanHeroForm({ lender }: InstantLoanHeroFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const minAmt = lender.minAmountNum || 10000;
  const maxAmt = lender.maxAmountNum || 4000000;
  const initialAmt = Math.min(Math.max(200000, minAmt), maxAmt);

  const [loanAmount, setLoanAmount] = useState<number>(initialAmt);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState("₹25,000 - ₹50,000");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const minRate = lender.interestRate?.min ?? 9.99;

  // Preset chips bounded by lender limits
  const presets = useMemo(() => {
    const list = [
      { label: "₹50K", value: 50000 },
      { label: "₹1L", value: 100000 },
      { label: "₹2L", value: 200000 },
      { label: "₹5L", value: 500000 },
      { label: "₹10L", value: 1000000 },
    ];
    const filtered = list.filter((p) => p.value >= minAmt && p.value <= maxAmt);
    if (filtered.length < 3) {
      return [
        { label: lender.minAmount, value: minAmt },
        { label: "₹2L", value: Math.min(200000, maxAmt) },
        { label: lender.maxAmount, value: maxAmt },
      ];
    }
    return filtered;
  }, [minAmt, maxAmt, lender.minAmount, lender.maxAmount]);

  // Format currency
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Estimated monthly EMI based on lender minRate for 24-36 months
  const estimatedEmi = useMemo(() => {
    const p = loanAmount;
    const r = minRate / 12 / 100;
    const n = Math.min(36, lender.tenureMonths || 36);
    if (r === 0) return Math.round(p / n);
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, minRate, lender.tenureMonths]);

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
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: `Instant Loan - ${lender.name}`,
          formTitle: `Instant Loan Application (${lender.name}): ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          selectedProduct: `Instant Loan (${lender.name})`,
          loanAmount: `₹${formatINR(loanAmount)}`,
          employmentType,
          monthlyIncome,
          disbursalSpeed: lender.disbursalTime,
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

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-gray-200/90 relative overflow-hidden font-montserrat">
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-[#B69226]" />

      {!isSubmitted ? (
        <div>
          {/* Form Header */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span>Instant Pre-Approval • In {lender.disbursalTime}</span>
            </div>
            <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
              Check Pre-Approved Offer
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Soft eligibility inquiry with <strong className="text-gray-700">zero CIBIL score impact</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required Loan Amount Slider */}
            <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-gray-600 uppercase tracking-wider text-[11px]">
                  Desired Loan Amount
                </span>
                <span className="font-bricolage font-extrabold text-base text-primary">
                  ₹{formatINR(loanAmount)}
                </span>
              </div>

              <input
                type="range"
                min={minAmt}
                max={maxAmt}
                step={maxAmt > 500000 ? 10000 : 5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              {/* Preset quick chips */}
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setLoanAmount(p.value)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      loanAmount === p.value
                        ? "bg-primary text-white shadow-2xs"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Live EMI calculation callout */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-200/70 text-[11px]">
                <span className="text-gray-500">
                  Est. EMI (@ {minRate}% p.a.):
                </span>
                <span className="font-bold text-gray-900">
                  ≈ ₹{formatINR(estimatedEmi)} / mo
                </span>
              </div>
            </div>

            {/* Employment Type Pills */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Employment Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEmploymentType("salaried")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    employmentType === "salaried"
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Salaried</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEmploymentType("selfEmployed")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    employmentType === "selfEmployed"
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Self-Employed</span>
                </button>
              </div>
            </div>

            {/* Monthly Income Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Monthly Net In-Hand Income
              </label>
              <select
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
              >
                <option value="Below ₹25,000">Below ₹25,000</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                <option value="Above ₹2,00,000">Above ₹2,00,000</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="As per PAN card"
                  className={`w-full bg-gray-50 border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex">
                <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-2.5 py-2.5 text-xs font-bold text-gray-600 flex items-center gap-1 select-none">
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
                  className={`flex-1 bg-gray-50 border rounded-r-xl px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all tracking-wider ${
                    errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Trust Pill */}
            <div className="bg-[#EBF4ED]/60 border border-primary/10 rounded-xl p-2.5 flex items-center gap-2 text-[10px] text-gray-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                100% Paperless • Zero CIBIL Score Impact • Bank-Grade Security
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-[#035259] active:scale-[0.99] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking Offers...</span>
                </>
              ) : (
                <>
                  <span>Check Instant Pre-Approval</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Confirmation screen */
        <div className="text-center py-4 animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-block bg-[#EBF4ED] text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Pre-Approval Initiated
          </span>

          <h4 className="font-bricolage font-extrabold text-xl text-gray-900">
            Great news, {name}!
          </h4>

          <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto leading-relaxed">
            Your instant eligibility request for <strong>{lender.name}</strong> (₹{formatINR(loanAmount)}) has been received.
          </p>

          <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-3 my-4 text-left flex items-start gap-3">
            <Headphones className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">
                Disbursal Assistance Ready
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Our loan coordinator will assist you with paperless Aadhaar e-KYC within <strong>15 minutes</strong>.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5 mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit encrypted data guarantee</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setName("");
              setPhone("");
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Check Another Amount</span>
          </button>
        </div>
      )}
    </div>
  );
}
