"use client";

import React, { useState } from "react";
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
  RotateCcw,
  Building,
  Home,
  RefreshCw,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

const AMOUNT_PRESETS = [
  { label: "₹30L", value: 3000000 },
  { label: "₹50L", value: 5000000 },
  { label: "₹75L", value: 7500000 },
  { label: "₹1 Cr", value: 10000000 },
  { label: "₹2 Cr", value: 20000000 },
];

const TENURE_PRESETS = [
  { label: "15 Yrs", value: 15 },
  { label: "20 Yrs", value: 20 },
  { label: "25 Yrs", value: 25 },
  { label: "30 Yrs", value: 30 },
];

export default function HomeLoanHeroForm() {
  const { openApplyModal } = useApplyModal();
  const [loanType, setLoanType] = useState<"new" | "transfer">("new");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs default
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");
  const [hasWomanApplicant, setHasWomanApplicant] = useState<boolean>(true);

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formatting helper
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Base interest rate: 7.15% - 0.05% concession if woman applicant
  const effectiveRate = hasWomanApplicant ? 7.10 : 7.15;
  const monthlyRate = effectiveRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const estimatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
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
          formType: "Home Loan Hero Form",
          formTitle: `Home Loan Request: ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          loanAmount: `₹${formatINR(loanAmount)}`,
          tenureYears: `${tenureYears} Years`,
          employmentType,
          hasWomanApplicant: hasWomanApplicant ? "Yes (0.05% discount)" : "No",
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
    setLoanAmount(5000000);
    setTenureYears(20);
    setEmploymentType("salaried");
    setHasWomanApplicant(true);
    setErrors({});
  };

  const handleProceed = (bankName: string) => {
    openApplyModal(
      bankName,
      `${loanType === "new" ? "New Home Loan" : "Balance Transfer"} - ₹${formatINR(loanAmount)}`
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-gray-200/90 relative overflow-hidden font-montserrat">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center border border-primary/20">
            <Home className="w-4 h-4 text-gold" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block leading-tight">
              Pre-Approved Eligibility
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Free • Zero CIBIL Hit
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/10 text-[#8c6e18] border border-gold/30">
          From {effectiveRate}% p.a.
        </span>
      </div>

      {isSubmitted ? (
        <div className="py-4 text-center animate-fadeIn">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mb-1">
            Matches Found for {name.split(" ")[0]}!
          </h3>
          <p className="text-xs text-gray-600 max-w-sm mx-auto mb-4">
            Based on your ₹{formatINR(loanAmount)} profile, you qualify for prime sovereign rates starting at{" "}
            <strong className="text-primary font-bold">{effectiveRate}% p.a.</strong>
          </p>

          <div className="bg-[#FDFBF7] border border-gray-200/80 rounded-2xl p-3.5 mb-4 text-left">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-500 font-medium">Estimated Monthly EMI:</span>
              <span className="font-bricolage font-bold text-primary text-base">
                ₹{formatINR(estimatedEmi)} / mo
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>Tenure: {tenureYears} Years</span>
              <span>LTV: Up to 90% Funded</span>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Recommended Lenders:
            </p>
            {[
              { name: "SBI Home Loan", rate: "7.25%", tag: "Lowest PSU Rate" },
              { name: "HDFC Bank Home Loan", rate: "7.30%", tag: "Instant Sanction" },
              { name: "Bank of Baroda", rate: "7.20%", tag: "Maxgain Overdraft" },
            ].map((bank) => (
              <div
                key={bank.name}
                className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
              >
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{bank.name}</span>
                  <span className="text-[10px] text-gray-500">{bank.tag} • from {bank.rate}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleProceed(bank.name)}
                  className="bg-primary hover:bg-[#035259] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-500 hover:text-gray-800 font-medium flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Check Another Amount</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Purpose Tabs: New vs Balance Transfer */}
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setLoanType("new")}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loanType === "new"
                  ? "bg-white text-primary shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>New Home Loan</span>
            </button>
            <button
              type="button"
              onClick={() => setLoanType("transfer")}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loanType === "transfer"
                  ? "bg-white text-primary shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold" />
              <span>Balance Transfer</span>
            </button>
          </div>

          {/* Loan Amount Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-gray-700">
                {loanType === "new" ? "Required Loan Amount" : "Existing Loan Balance"}
              </label>
              <span className="font-bricolage font-extrabold text-sm sm:text-base text-primary">
                ₹{formatINR(loanAmount)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {AMOUNT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setLoanAmount(preset.value)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                    loanAmount === preset.value
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desired Tenure */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-gray-700">Repayment Tenure</label>
              <span className="text-xs font-bold text-gray-900">{tenureYears} Years ({totalMonths} mos)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {TENURE_PRESETS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTenureYears(t.value)}
                  className={`text-[11px] font-bold py-1 rounded-lg border transition-all text-center cursor-pointer ${
                    tenureYears === t.value
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Employment Type & Woman Co-Applicant */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">Employment</label>
              <div className="grid grid-cols-2 gap-1 bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setEmploymentType("salaried")}
                  className={`py-1 rounded flex items-center justify-center gap-0.5 cursor-pointer ${
                    employmentType === "salaried"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  <Briefcase className="w-2.5 h-2.5" />
                  Salaried
                </button>
                <button
                  type="button"
                  onClick={() => setEmploymentType("selfEmployed")}
                  className={`py-1 rounded flex items-center justify-center gap-0.5 cursor-pointer ${
                    employmentType === "selfEmployed"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  <Building className="w-2.5 h-2.5" />
                  Business
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Woman Applicant
              </label>
              <button
                type="button"
                onClick={() => setHasWomanApplicant(!hasWomanApplicant)}
                className={`w-full py-1 px-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-between cursor-pointer ${
                  hasWomanApplicant
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-gray-50 text-gray-500 border-gray-200"
                }`}
              >
                <span>5 bps Discount</span>
                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${
                  hasWomanApplicant ? "bg-emerald-600 text-white" : "border border-gray-300"
                }`}>
                  {hasWomanApplicant ? "✓" : ""}
                </span>
              </button>
            </div>
          </div>

          {/* Real-time EMI Preview Box */}
          <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-primary block">
                Estimated Monthly EMI
              </span>
              <span className="text-[10px] text-gray-600">
                At {effectiveRate}% p.a. • Up to 90% LTV
              </span>
            </div>
            <div className="text-right">
              <span className="font-bricolage font-extrabold text-base sm:text-lg text-primary block leading-tight">
                ₹{formatINR(estimatedEmi)}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">
                ₹{formatINR(Math.round(estimatedEmi / (loanAmount / 100000)))} / Lakh
              </span>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="space-y-2 pt-1">
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Full Name (as per PAN)"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    errors.name
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 mt-0.5 ml-1">{errors.name}</p>}
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-semibold text-gray-500">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`w-full pl-16 pr-3 py-2 text-xs rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    errors.phone
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-primary/10"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 mt-0.5 ml-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Matching 13+ Lenders...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Check Pre-Approved Rates</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* Privacy Guarantee */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              256-Bit Encrypted
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Zero CIBIL Deduction
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              Instant Offers
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
