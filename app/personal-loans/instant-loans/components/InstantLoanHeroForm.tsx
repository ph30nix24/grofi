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
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

const CIBIL_RANGES = [
  { label: "750+ (Prime - 10s Disbursal)", value: "750+" },
  { label: "700–749 (Good)", value: "700-749" },
  { label: "600–699 (App Friendly)", value: "600-699" },
  { label: "New to Credit / No Score", value: "New" },
];

const AMOUNT_PRESETS = [
  { label: "₹25K", value: 25000 },
  { label: "₹50K", value: 50000 },
  { label: "₹1L", value: 100000 },
  { label: "₹3L", value: 300000 },
  { label: "₹5L", value: 500000 },
];

const URGENCY_PRESETS = [
  { label: "⚡ < 10 Mins", value: "urgent" },
  { label: "⏱️ Under 2 Hrs", value: "today" },
  { label: "📅 Flexible", value: "flexible" },
];

export default function InstantLoanHeroForm() {
  const { openApplyModal } = useApplyModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [urgency, setUrgency] = useState<string>("urgent");
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed" | "gig">("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState("₹25,000 - ₹50,000");
  const [cibilScore, setCibilScore] = useState("750+");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

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
      await new Promise((resolve) => setTimeout(resolve, 800));
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
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-gold to-emerald-500" />

      {isSubmitted ? (
        <div className="py-6 sm:py-8 text-center animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <Zap className="w-3.5 h-3.5 text-gold" />
            100% Pre-Approved Instant Matches Found
          </span>

          <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
            Congratulations, {name.split(" ")[0]}!
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            Based on your ₹{formatINR(loanAmount)} requirement and profile, you qualify for instant disbursal with top RBI-registered partners.
          </p>

          <div className="mt-5 p-4 rounded-2xl bg-[#FDFBF7] border border-gray-200/70 text-left space-y-2 text-xs text-gray-700">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500">Requested Amount:</span>
              <span className="font-bold text-gray-900">₹{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500">Estimated Turnaround:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Under 15 Minutes
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Fastest Partner:</span>
              <span className="font-bold text-primary">HDFC Bank / KreditBee</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={() => openApplyModal("Instant Personal Loan", `Pre-approved ₹${formatINR(loanAmount)} for ${name}`)}
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
              <span>Modify Loan Details</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF4ED] text-primary border border-primary/10">
                <Sparkles className="w-3 h-3 text-gold" />
                Soft Inquiry • Zero CIBIL Hit
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> In 60 Seconds
              </span>
            </div>

            <h3 className="font-bricolage font-bold text-lg sm:text-xl text-gray-900 mt-2">
              Check Instant Loan Eligibility
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Get matched to instant pre-approved cash offers from RBI-regulated lenders.
            </p>
          </div>

          {/* Amount selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-gray-700">Instant Cash Needed</label>
              <span className="font-bold text-primary text-sm font-bricolage">
                ₹{formatINR(loanAmount)}
              </span>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min={10000}
              max={2500000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {AMOUNT_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setLoanAmount(p.value)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    loanAmount === p.value
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speed / Urgency Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">
              When do you need the money?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {URGENCY_PRESETS.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => setUrgency(u.value)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                    urgency === u.value
                      ? "bg-amber-50/80 text-amber-900 border-amber-300 font-bold"
                      : "bg-gray-50/60 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Employment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Employment Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setEmploymentType("salaried")}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  employmentType === "salaried"
                    ? "bg-primary/10 text-primary border-primary/30 font-bold"
                    : "bg-gray-50/60 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Salaried</span>
              </button>

              <button
                type="button"
                onClick={() => setEmploymentType("selfEmployed")}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  employmentType === "selfEmployed"
                    ? "bg-primary/10 text-primary border-primary/30 font-bold"
                    : "bg-gray-50/60 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Business</span>
              </button>

              <button
                type="button"
                onClick={() => setEmploymentType("gig")}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  employmentType === "gig"
                    ? "bg-primary/10 text-primary border-primary/30 font-bold"
                    : "bg-gray-50/60 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-gold" />
                <span>Freelance</span>
              </button>
            </div>
          </div>

          {/* 2-Column: Monthly Income & CIBIL Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Monthly Income</label>
              <select
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="Below ₹15,000">Below ₹15,000</option>
                <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000+">₹1,00,000+</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">CIBIL Score</label>
              <select
                value={cibilScore}
                onChange={(e) => setCibilScore(e.target.value)}
                className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:border-primary cursor-pointer"
              >
                {CIBIL_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Info: Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full text-xs font-medium bg-gray-50 border rounded-xl pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-primary ${
                    errors.name ? "border-red-400 bg-red-50/30" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Mobile Number</label>
              <div className="relative">
                <span className="text-xs font-semibold text-gray-500 absolute left-3 top-2.5">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className={`w-full text-xs font-medium bg-gray-50 border rounded-xl pl-11 pr-3 py-2 text-gray-800 focus:outline-none focus:border-primary ${
                    errors.phone ? "border-red-400 bg-red-50/30" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-[#02383d] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span>Checking 16+ RBI Lenders...</span>
                </>
              ) : (
                <>
                  <span>Unlock Instant Pre-Approved Offers</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </>
              )}
            </button>

            {/* Privacy footnote */}
            <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] text-gray-500">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>256-Bit SSL Encrypted • No telemarketer spam • Instant e-KYC</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
