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
  RotateCcw,
  Calendar,
  Percent,
} from "lucide-react";
import { ShortTermLoanLender } from "../../components/type";

interface ShortTermLoanHeroFormProps {
  lender: ShortTermLoanLender;
}

export default function ShortTermLoanHeroForm({ lender }: ShortTermLoanHeroFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const minAmt = lender.minAmountNum || 5000;
  const maxAmt = lender.maxAmountNum || 500000;
  const defaultAmt = Math.min(Math.max(50000, minAmt), maxAmt);

  const [loanAmount, setLoanAmount] = useState<number>(defaultAmt);
  const [employmentType, setEmploymentType] = useState<"salaried" | "selfEmployed">("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState("₹25,000 - ₹50,000");

  // Parse tenure options or default to 3/6/12 months
  const availableTenures = useMemo(() => {
    if (lender.shortTenureOptions && lender.shortTenureOptions.length > 0) {
      return lender.shortTenureOptions;
    }
    return ["3 Months", "6 Months", "12 Months"];
  }, [lender.shortTenureOptions]);

  const [selectedTenure, setSelectedTenure] = useState<string>(
    availableTenures[Math.min(1, availableTenures.length - 1)]
  );

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const minRate = lender.interestRate?.min ?? 12.0;

  // Preset chips bounded by lender limits
  const presets = useMemo(() => {
    const list = [
      { label: "₹10K", value: 10000 },
      { label: "₹25K", value: 25000 },
      { label: "₹50K", value: 50000 },
      { label: "₹1L", value: 100000 },
      { label: "₹2L", value: 200000 },
      { label: "₹5L", value: 500000 },
    ];
    const filtered = list.filter((p) => p.value >= minAmt && p.value <= maxAmt);
    if (filtered.length < 3) {
      return [
        { label: lender.minAmount, value: minAmt },
        { label: "₹50K", value: Math.min(50000, maxAmt) },
        { label: lender.maxAmount, value: maxAmt },
      ];
    }
    return filtered;
  }, [minAmt, maxAmt, lender.minAmount, lender.maxAmount]);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  // Convert tenure string like "3 Months", "60 Days" to months for EMI calc
  const tenureMonthsCount = useMemo(() => {
    const match = selectedTenure.match(/(\d+)\s*(month|m|days|day|yr|year)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      if (unit.startsWith("day")) {
        return Math.max(1, Math.round(num / 30));
      }
      if (unit.startsWith("yr") || unit.startsWith("year")) {
        return num * 12;
      }
      return num;
    }
    return 6;
  }, [selectedTenure]);

  // Estimated short-term EMI calculation
  const estimatedEmi = useMemo(() => {
    const p = loanAmount;
    const r = minRate / 12 / 100;
    const n = Math.max(1, tenureMonthsCount);

    if (r === 0) return Math.round(p / n);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [loanAmount, minRate, tenureMonthsCount]);

  const totalInterestOutgo = useMemo(() => {
    return Math.max(0, Math.round(estimatedEmi * tenureMonthsCount - loanAmount));
  }, [estimatedEmi, tenureMonthsCount, loanAmount]);

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) errs.name = "Full name is required";
    else if (name.trim().length < 3) errs.name = "Name must be at least 3 letters";

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) errs.phone = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(cleanPhone))
      errs.phone = "Enter valid 10-digit Indian mobile number";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-lg relative overflow-hidden font-montserrat">
      {/* Top subtle highlight banner */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-bricolage font-extrabold text-base sm:text-lg text-gray-900 leading-tight">
              Pre-Approved Eligibility Check
            </h3>
            <p className="text-[11px] text-gray-500">
              Disbursal in <strong className="text-emerald-700">{lender.disbursalTime}</strong> via 24x7 IMPS
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          Zero CIBIL Impact
        </span>
      </div>

      {isSubmitted ? (
        <div className="py-8 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bricolage font-bold text-xl text-gray-900">
              Soft Sanction Initiated!
            </h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-gray-900">{name}</strong>. Our automated system has pre-screened your request for{" "}
              <strong className="text-primary font-bold">₹{formatINR(loanAmount)}</strong> from{" "}
              <strong>{lender.name}</strong> over {selectedTenure}.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-left space-y-2 text-xs text-emerald-950 max-w-sm mx-auto">
            <div className="flex justify-between">
              <span className="text-gray-600">Disbursal Window:</span>
              <strong className="text-emerald-800">{lender.disbursalTime}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Monthly EMI:</span>
              <strong className="text-emerald-800">₹{formatINR(estimatedEmi)}/mo</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">RBI Regulated NBFC:</span>
              <strong className="text-emerald-800 truncate max-w-[180px]">{lender.rbiRegulatedEntity}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setName("");
              setPhone("");
            }}
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer pt-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Check another amount</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Slider & Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="hero-loan-amount" className="font-bold text-gray-700">Required Short-Term Amount</label>
              <span className="font-bricolage font-extrabold text-base text-primary">
                ₹{formatINR(loanAmount)}
              </span>
            </div>

            <input
              id="hero-loan-amount"
              aria-label="Required Short-Term Amount"
              type="range"
              min={minAmt}
              max={maxAmt}
              step={maxAmt > 100000 ? 5000 : 1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex flex-wrap gap-1.5 pt-1">
              {presets.map((p) => (
                <button
                  type="button"
                  key={p.value}
                  onClick={() => setLoanAmount(p.value)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    loanAmount === p.value
                      ? "bg-primary text-white border-primary shadow-2xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Short Tenure Selector Chips */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Repayment Tenure
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {selectedTenure}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              {availableTenures.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setSelectedTenure(opt)}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-xl border transition-all text-center cursor-pointer truncate ${
                    selectedTenure === opt
                      ? "bg-[#035259] text-white border-[#035259] shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Dynamic Calculation Box */}
          <div className="p-3 bg-linear-to-r from-emerald-50/70 to-emerald-50/40 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                Est. Monthly EMI
              </span>
              <span className="font-bricolage font-extrabold text-base text-emerald-800">
                ₹{formatINR(estimatedEmi)}
              </span>
              <span className="text-[10px] text-gray-500 block">
                Total interest: ₹{formatINR(totalInterestOutgo)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                Effective Rate
              </span>
              <span className="font-bricolage font-bold text-xs text-gray-900 block">
                {lender.interestRate?.monthlyRateText || `${minRate}% p.a.`}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                ⚡ Disbursal: {lender.disbursalTime}
              </span>
            </div>
          </div>

          {/* Employment Type Toggle */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-gray-700 block">Employment Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEmploymentType("salaried")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  employmentType === "selfEmployed"
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Self-Employed / Gig</span>
              </button>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="space-y-1">
            <label htmlFor="hero-name" className="text-xs font-bold text-gray-700 block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="hero-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="As per PAN Card"
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-primary/20 focus:border-primary"
                }`}
              />
            </div>
            {errors.name && <p className="text-[10px] text-red-600 font-medium">{errors.name}</p>}
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1">
            <label htmlFor="hero-phone" className="text-xs font-bold text-gray-700 block">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="text-xs text-gray-500 font-bold absolute left-3 top-1/2 -translate-y-1/2">
                +91
              </span>
              <input
                id="hero-phone"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="Linked with Aadhaar"
                className={`w-full pl-11 pr-3 py-2 text-xs rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-primary/20 focus:border-primary"
                }`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-red-600 font-medium">{errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-primary hover:bg-[#02383d] active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Soft Eligibility...</span>
              </>
            ) : (
              <>
                <span>Check Instant Sanction</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>

          {/* Disclaimer & Privacy Guarantee */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 pt-1">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              Soft Inquiry Only
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-600">
              <Lock className="w-3 h-3 text-primary" />
              256-bit SSL Privacy
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
