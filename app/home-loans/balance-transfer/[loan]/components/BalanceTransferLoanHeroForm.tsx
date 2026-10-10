"use client";

import React, { useState, useMemo } from "react";
import {
  User,
  Phone,
  Building2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Headphones,
  RotateCcw,
  TrendingDown,
} from "lucide-react";
import ConsentCheckbox from "@/app/components/ConsentCheckbox";
import { CURRENT_CONSENT_VERSION } from "@/app/constants/consent";
import { BalanceTransferLender } from "../../components/type";

interface BalanceTransferLoanHeroFormProps {
  lender: BalanceTransferLender;
}

export default function BalanceTransferLoanHeroForm({
  lender,
}: BalanceTransferLoanHeroFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentBank, setCurrentBank] = useState("HDFC Bank");
  const [outstandingLoan, setOutstandingLoan] = useState<number>(5000000); // ₹50 Lakhs
  const [currentRate, setCurrentRate] = useState<number>(9.25);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");

  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const targetRate = lender.interestRate?.min ?? 7.25;
  const maxAmount = lender.maxAmountNum || 100000000;

  // Presets for quick loan selection
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

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Savings calculations based on 18 remaining years
  const remainingYears = 18;
  const n = remainingYears * 12;
  const rOld = currentRate / 12 / 100;
  const rNew = targetRate / 12 / 100;

  const emiOld = Math.round(
    (outstandingLoan * rOld * Math.pow(1 + rOld, n)) /
      (Math.pow(1 + rOld, n) - 1)
  );
  const emiNew = Math.round(
    (outstandingLoan * rNew * Math.pow(1 + rNew, n)) /
      (Math.pow(1 + rNew, n) - 1)
  );
  const monthlySavings = Math.max(0, emiOld - emiNew);
  const totalSavingsLakhs = Math.max(
    0,
    (monthlySavings * n - 18000) / 100000
  ).toFixed(1);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; consent?: string } = {};

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
          formType: `Home Loan Balance Transfer - ${lender.name}`,
          formTitle: `Balance Transfer Application (${lender.name}): ${name.trim()}`,
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          lender: lender.name,
          currentBank,
          loanAmount: `₹${formatINR(outstandingLoan)}`,
          currentRate: `${currentRate}%`,
          newRate: `${targetRate}%`,
          monthlySavings: `₹${formatINR(monthlySavings)}/mo`,
          employmentType,
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
      setErrors((prev) => ({ ...prev, phone: err instanceof Error ? err.message : "Submission failed. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    setOutstandingLoan(Math.min(5000000, maxAmount));
    setCurrentRate(9.25);
    setEmploymentType("salaried");
    setConsentGiven(false);
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
              <span>Fast In-Principle Sanction</span>
            </div>

            <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
              Switch to <span className="text-primary">{lender.name}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Transfer at <strong className="text-primary font-bold">{targetRate}% p.a.</strong> and cut your monthly EMI immediately.
            </p>
          </div>

          {/* Instant Savings Highlight Pill */}
          <div className="bg-linear-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-200/80 rounded-2xl p-3 mb-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Est. Monthly Savings:</span>
              </div>
              <span className="font-bricolage font-extrabold text-sm sm:text-base text-emerald-700">
                ~₹{formatINR(monthlySavings)} / mo
              </span>
            </div>
            <div className="mt-1 pt-1 border-t border-emerald-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>Lifetime Interest Saved:</span>
              <span className="font-bold text-gray-800">
                ₹{totalSavingsLakhs} Lakhs
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Current Existing Bank */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                Existing Bank / HFC
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={currentBank}
                  onChange={(e) => setCurrentBank(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-primary transition-all cursor-pointer"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="PNB">Punjab National Bank</option>
                  <option value="Bajaj Housing Finance">Bajaj Housing Finance</option>
                  <option value="LIC Housing Finance">LIC Housing Finance</option>
                  <option value="Other Bank / NBFC">Other Bank / NBFC</option>
                </select>
              </div>
            </div>

            {/* Outstanding Loan Amount */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Outstanding Balance
                </label>
                <span className="font-bricolage font-extrabold text-sm text-primary">
                  ₹{formatINR(outstandingLoan)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={Math.min(20000000, maxAmount)}
                step={200000}
                value={outstandingLoan}
                onChange={(e) => setOutstandingLoan(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setOutstandingLoan(p.value)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 transition-colors ${
                      outstandingLoan === p.value
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Current Interest Rate
                </label>
                <span className="font-bricolage font-extrabold text-sm text-amber-700">
                  {currentRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={8.0}
                max={12.0}
                step={0.05}
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Employment Type */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEmploymentType("salaried")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  employmentType === "salaried"
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Salaried
              </button>
              <button
                type="button"
                onClick={() => setEmploymentType("selfEmployed")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  employmentType === "selfEmployed"
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Self-Employed
              </button>
            </div>

            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Your Full Name"
                  className={`w-full bg-gray-50 border rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
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
                  placeholder="10-digit mobile number"
                  className={`flex-1 bg-gray-50 border rounded-r-xl px-3 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all tracking-wider ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Versioned Consent Checkbox */}
            <ConsentCheckbox
              id="bt-lender-consent"
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
              className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking Offer...</span>
                </>
              ) : (
                <>
                  <span>Claim {targetRate}% Takeover Rate</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Celebratory confirmation */
        <div className="text-center py-4 animate-fadeIn">
          <div className="relative flex items-center justify-center my-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Takeover Request Logged</span>
          </div>

          <h3 className="font-bricolage font-extrabold text-xl text-gray-900 leading-tight">
            Thank You, {name || "Borrower"}!
          </h3>

          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Your balance transfer request for <strong className="text-primary font-bold">{lender.name}</strong> at <strong className="text-gray-900 font-bold">{targetRate}% p.a.</strong> has been routed to our dedicated housing loan desk.
          </p>

          <div className="bg-[#EBF4ED] border border-primary/20 rounded-2xl p-3 my-3.5 text-left flex items-center gap-2.5">
            <Headphones className="w-5 h-5 text-primary shrink-0" />
            <div className="text-[11px]">
              <p className="font-bold text-primary">Senior Takeover Specialist Assigned</p>
              <p className="text-gray-600">You will receive a call within 15 minutes to review your existing loan LOD.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Calculate for another amount</span>
          </button>
        </div>
      )}
    </div>
  );
}
