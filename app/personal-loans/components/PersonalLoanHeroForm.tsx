"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Briefcase,
  Sparkles,
  ArrowRight,
  Loader2,
  Building,
} from "lucide-react";
import ConsentCheckbox from "@/app/components/ConsentCheckbox";
import { CURRENT_CONSENT_VERSION } from "@/app/constants/consent";
import { formatINR } from "@/libs/calculators/emi";
import LeadFormSuccess from "@/app/components/forms/LeadFormSuccess";

const CIBIL_RANGES = [
  { label: "750+ (Prime)", value: "750+" },
  { label: "700–749 (Good)", value: "700-749" },
  { label: "650–699 (Fair)", value: "650-699" },
  { label: "New to Credit", value: "New" },
];

const AMOUNT_PRESETS = [
  { label: "₹2L", value: 200000 },
  { label: "₹5L", value: 500000 },
  { label: "₹10L", value: 1000000 },
  { label: "₹25L", value: 2500000 },
];

export default function PersonalLoanHeroForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState("₹50,000 - ₹1,00,000");
  const [cibilScore, setCibilScore] = useState("750+");
  const [consentGiven, setConsentGiven] = useState(false);
  
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; consent?: string; general?: string } = {};

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

    if (!consentGiven) {
      newErrors.consent = "Please agree to the privacy policy & consent to continue";
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
          formType: "Personal Loan Hero Form",
          formTitle: `Personal Loan Request: ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          loanAmount: `₹${formatINR(loanAmount)}`,
          employmentType,
          monthlyIncome,
          cibilScore,
          estimatedEmi: `₹${formatINR(estimatedEmi)}/mo`,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          consentGiven: true,
          consentVersion: CURRENT_CONSENT_VERSION,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err instanceof Error ? err.message : "Submission failed. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    setLoanAmount(500000);
    setEmploymentType("salaried");
    setMonthlyIncome("₹50,000 - ₹1,00,000");
    setCibilScore("750+");
    setConsentGiven(false);
    setErrors({});
  };

  // Estimated monthly EMI based on 9.99% for 5 years
  const estimatedEmi = Math.round(
    (loanAmount * (9.99 / 12 / 100) * Math.pow(1 + 9.99 / 12 / 100, 60)) /
      (Math.pow(1 + 9.99 / 12 / 100, 60) - 1)
  );

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-7 shadow-2xl border border-gray-200/90 relative overflow-hidden text-left font-montserrat">
      {/* Background subtle ambient glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Instant Eligibility Check</span>
            </div>
            <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
              Check Pre-Approved <span className="text-primary">Loan Offers</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Zero physical paperwork • Soft inquiry with 0 CIBIL score hit.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* General Submission Error Banner */}
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium animate-fadeIn">
                {errors.general}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="personal-loan-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="personal-loan-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
                  }}
                  placeholder="Enter your full name"
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
              <label htmlFor="personal-loan-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex">
                <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-gray-600 flex items-center gap-1.5 select-none">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>+91</span>
                </div>
                <input
                  id="personal-loan-phone"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
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
                  Required Loan Amount
                </label>
                <span className="font-bricolage font-bold text-xs sm:text-sm text-primary">
                  ₹{formatINR(loanAmount)}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                {AMOUNT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setLoanAmount(preset.value)}
                    className={`min-h-9 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center flex items-center justify-center ${
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

            {/* Employment Type Toggle */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Employment Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setEmploymentType("salaried")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    employmentType === "salaried"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Salaried</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEmploymentType("selfEmployed")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    employmentType === "selfEmployed"
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Self-Employed</span>
                </button>
              </div>
            </div>

            {/* Monthly Income & CIBIL Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Monthly Income
                </label>
                <select
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Under ₹25,000">Under ₹25k</option>
                  <option value="₹25,000 - ₹50,000">₹25k - ₹50k</option>
                  <option value="₹50,000 - ₹1,00,000">₹50k - ₹1L</option>
                  <option value="₹1,00,000+">₹1 Lakh+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Credit Score
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
            </div>

            {/* Versioned Consent Checkbox */}
            <ConsentCheckbox
              id="personal-loan-hero-consent"
              checked={consentGiven}
              onChange={(val) => {
                setConsentGiven(val);
                if (errors.consent) {
                  setErrors((prev) => ({ ...prev, consent: undefined }));
                }
              }}
              error={errors.consent}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-75 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Matching 10+ Lenders...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Check Pre-Approved Offers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

          </form>
        </>
      ) : (
        <LeadFormSuccess
          applicantName={name.trim() || "Applicant"}
          requestedAmount={loanAmount}
          startingRateText="From 9.99% p.a."
          estimatedEmi={estimatedEmi}
          scrollTargetId="lenders-list-section"
          scrollButtonText="Compare Matching Banks Below"
          onReset={handleReset}
        />
      )}

    </div>
  );
}
