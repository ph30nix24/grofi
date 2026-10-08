"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Briefcase,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Clock,
  RotateCcw,
  Building,
  Calendar,
  Percent,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

const CIBIL_RANGES = [
  { label: "750+ (Prime - Lowest APR)", value: "750+" },
  { label: "700–749 (Good)", value: "700-749" },
  { label: "600–699 (NBFC Friendly)", value: "600-699" },
  { label: "New to Credit / No Score", value: "New" },
];

const AMOUNT_PRESETS = [
  { label: "₹10K", value: 10000 },
  { label: "₹25K", value: 25000 },
  { label: "₹50K", value: 50000 },
  { label: "₹1L", value: 100000 },
  { label: "₹2L", value: 200000 },
  { label: "₹5L", value: 500000 },
];

const TENURE_PRESETS = [
  { label: "3 Mos", value: 3 },
  { label: "6 Mos", value: 6 },
  { label: "9 Mos", value: 9 },
  { label: "12 Mos", value: 12 },
];

const PURPOSE_PRESETS = [
  { label: "⚡ Urgent Bridge / Salary Advance", value: "salary-advance" },
  { label: "🏥 Medical / Emergency Bill", value: "medical" },
  { label: "🛍️ Appliance / Home Expense", value: "shopping" },
  { label: "💼 Short Working Capital", value: "business" },
];

export default function ShortTermLoanHeroForm() {
  const { openApplyModal } = useApplyModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [tenureMonths, setTenureMonths] = useState<number>(6);
  const [purpose, setPurpose] = useState<string>("salary-advance");
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState("₹20,000 - ₹50,000");
  const [cibilScore, setCibilScore] = useState("750+");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Approximate short-term monthly EMI calculation (~14% rate baseline)
  const approxMonthlyEmi = Math.round(
    ((loanAmount * (0.14 / 12) * Math.pow(1 + 0.14 / 12, tenureMonths)) /
      (Math.pow(1 + 0.14 / 12, tenureMonths) - 1)) || (loanAmount / tenureMonths)
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
      await new Promise((resolve) => setTimeout(resolve, 750));
      setIsSubmitted(true);
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-xl relative overflow-hidden font-montserrat">
      {/* Top golden-primary gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-gold to-emerald-500" />

      {isSubmitted ? (
        <div className="py-6 sm:py-8 text-center animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <Zap className="w-3.5 h-3.5 text-gold" />
            100% Pre-Approved Short-Term Matches Found
          </span>

          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
            Congratulations, {name.split(" ")[0]}!
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            Based on your ₹{formatINR(loanAmount)} requirement for {tenureMonths} months, you qualify for instant disbursal with verified RBI-registered partners.
          </p>

          <div className="mt-5 p-4 rounded-2xl bg-[#FDFBF7] border border-gray-200/70 text-left space-y-2 text-xs text-gray-700">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500">Requested Amount:</span>
              <span className="font-bold text-gray-900">₹{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500">Chosen Tenure:</span>
              <span className="font-bold text-gray-900">{tenureMonths} Months</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500">Estimated Monthly EMI:</span>
              <span className="font-bold text-emerald-700">₹{formatINR(approxMonthlyEmi)}/mo</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500">Estimated Turnaround:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Under 15 Minutes
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">RBI Protected Safeguard:</span>
              <span className="font-bold text-primary">Mandatory KFS + 3-Day Cooling Off</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={() =>
                openApplyModal(
                  "Short-Term Personal Loan",
                  `Pre-approved ₹${formatINR(loanAmount)} for ${tenureMonths}M (${name})`
                )
              }
              className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>Proceed to Instant Paperless KYC</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>

            <button
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center gap-1 py-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Modify Loan Parameters</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            Zero hard CIBIL pull • No spam calls • 256-bit SSL encrypted
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Instant Qualification
              </span>
              <h3 className="font-bricolage font-bold text-lg text-gray-900">
                Check Short-Term Loan Offers
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>100% Paperless</span>
            </div>
          </div>

          {/* Loan Amount Selector */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Required Loan Amount
              </label>
              <span className="font-bricolage font-bold text-base text-primary">
                ₹{formatINR(loanAmount)}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-2">
              {AMOUNT_PRESETS.map((p) => (
                <button
                  type="button"
                  key={p.value}
                  onClick={() => setLoanAmount(p.value)}
                  className={`py-1 px-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    loanAmount === p.value
                      ? "bg-primary text-white border-primary shadow-2xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <input
              type="range"
              min={1000}
              max={500000}
              step={1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
              <span>₹1,000 (Micro)</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>

          {/* Short Tenure Selector */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Select Short Tenure
              </label>
              <span className="text-xs font-bold text-gray-900">
                {tenureMonths} Months
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {TENURE_PRESETS.map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setTenureMonths(t.value)}
                  className={`py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    tenureMonths === t.value
                      ? "bg-primary text-white border-primary shadow-2xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Borrowing Purpose */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
              Borrowing Purpose
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {PURPOSE_PRESETS.map((p) => (
                <button
                  type="button"
                  key={p.value}
                  onClick={() => setPurpose(p.value)}
                  className={`text-left p-2 rounded-xl text-[11px] font-medium border transition-all cursor-pointer ${
                    purpose === p.value
                      ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Employment Type */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
              Employment Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEmploymentType("salaried")}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  employmentType === "salaried"
                    ? "bg-primary text-white border-primary shadow-2xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Salaried</span>
              </button>

              <button
                type="button"
                onClick={() => setEmploymentType("selfEmployed")}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  employmentType === "selfEmployed"
                    ? "bg-primary text-white border-primary shadow-2xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Self-Employed / Gig</span>
              </button>
            </div>
          </div>

          {/* Income & CIBIL Dropdowns */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Monthly Inflow
              </label>
              <select
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-gray-800 font-medium focus:outline-hidden focus:border-primary cursor-pointer"
              >
                <option value="₹10,000 - ₹20,000">₹10K - ₹20K</option>
                <option value="₹20,000 - ₹50,000">₹20K - ₹50K</option>
                <option value="₹50,000 - ₹1,00,000">₹50K - ₹1 Lakh</option>
                <option value="₹1,00,000+">₹1 Lakh+</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Credit Score
              </label>
              <select
                value={cibilScore}
                onChange={(e) => setCibilScore(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-gray-800 font-medium focus:outline-hidden focus:border-primary cursor-pointer"
              >
                {CIBIL_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 pt-1 border-t border-gray-100">
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Your Full Name (as per PAN)"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border rounded-xl font-medium focus:outline-hidden focus:border-primary ${
                    errors.name ? "border-red-400 bg-red-50/30" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.name && (
                <span className="text-[10px] text-red-500 font-medium block mt-0.5 ml-1">
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <div className="relative">
                <span className="text-xs font-bold text-gray-500 absolute left-3 top-2.5">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit Mobile Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ""));
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className={`w-full pl-11 pr-3 py-2 text-xs bg-gray-50 border rounded-xl font-medium focus:outline-hidden focus:border-primary ${
                    errors.phone ? "border-red-400 bg-red-50/30" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.phone && (
                <span className="text-[10px] text-red-500 font-medium block mt-0.5 ml-1">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          {/* Estimated EMI quick summary line */}
          <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-primary" /> Est. Monthly EMI:
            </span>
            <span className="font-bricolage font-bold text-primary text-sm">
              ₹{formatINR(approxMonthlyEmi)}/mo
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
                <span>Checking Pre-Approved Matches...</span>
              </>
            ) : (
              <>
                <span>View Instant Sanction Options</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </>
            )}
          </button>

          {/* Privacy Guarantee */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Zero impact on CIBIL • 100% RBI regulated NBFCs & Banks</span>
          </div>
        </form>
      )}
    </div>
  );
}
