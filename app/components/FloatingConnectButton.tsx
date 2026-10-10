"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Headphones,
  CreditCard,
  Coins,
  Home,
  TrendingUp,
  Check,
  Lock,
  Clock,
  ChevronRight,
} from "lucide-react";

type ServiceOption = "credit-cards" | "personal-loans" | "home-loans";

interface ServiceItem {
  id: ServiceOption;
  label: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICE_OPTIONS: ServiceItem[] = [
  {
    id: "credit-cards",
    label: "Credit Cards",
    tagline: "Rewards, Lounge & Cashback",
    icon: CreditCard,
  },
  {
    id: "personal-loans",
    label: "Personal Loans",
    tagline: "Instant Cash & Low Rates",
    icon: Coins,
  },
  {
    id: "home-loans",
    label: "Home Loans",
    tagline: "Lowest EMI & Transfer",
    icon: Home,
  },
];

const CIBIL_PRESETS = [
  { label: "750+ (Excellent)", value: "750+" },
  { label: "700 - 749 (Good)", value: "720" },
  { label: "650 - 699 (Fair)", value: "675" },
  { label: "< 650 (Poor)", value: "620" },
  { label: "Don't Know", value: "Don't Know" },
];

export default function FloatingConnectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cibilScore, setCibilScore] = useState("");
  const [service, setService] = useState<ServiceOption>("credit-cards");

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    cibilScore?: string;
    service?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setName("");
      setPhone("");
      setCibilScore("");
      setService("credit-cards");
      setErrors({});
    }, 250);
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      phone?: string;
      cibilScore?: string;
      service?: string;
    } = {};

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

    if (!cibilScore.trim()) {
      newErrors.cibilScore = "Please enter or select your CIBIL score";
    } else if (
      cibilScore !== "Don't Know" &&
      cibilScore !== "750+" &&
      !isNaN(Number(cibilScore))
    ) {
      const num = Number(cibilScore);
      if (num < 300 || num > 900) {
        newErrors.cibilScore = "CIBIL score should be between 300 and 900";
      }
    }

    if (!service) {
      newErrors.service = "Please select an option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          cibilScore: cibilScore.trim(),
          service,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit request. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Connect request error:", err);
      setErrors((prev) => ({
        ...prev,
        phone: err instanceof Error ? err.message : "Failed to submit request. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceLabel = (val: ServiceOption) => {
    const item = SERVICE_OPTIONS.find((s) => s.id === val);
    return item ? item.label : val;
  };

  const getCibilBadge = () => {
    const num = Number(cibilScore);
    if (cibilScore === "750+" || (!isNaN(num) && num >= 750)) {
      return { text: "Excellent", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    }
    if (!isNaN(num) && num >= 700) {
      return { text: "Good", color: "text-blue-700 bg-blue-50 border-blue-200" };
    }
    if (!isNaN(num) && num >= 650) {
      return { text: "Average", color: "text-amber-700 bg-amber-50 border-amber-200" };
    }
    if (cibilScore === "Don't Know") {
      return { text: "Free Check Included", color: "text-purple-700 bg-purple-50 border-purple-200" };
    }
    if (!isNaN(num) && num > 0) {
      return { text: "Needs Attention", color: "text-rose-700 bg-rose-50 border-rose-200" };
    }
    return null;
  };

  const cibilBadge = getCibilBadge();

  return (
    <>
      {/* ── Floating Button Anchored at Right Center (Rotated 90°) ── */}
      <aside
        aria-label="Connect with us floating action"
        className="fixed right-0 top-1/2 z-40 select-none"
        style={{
          transform: "rotate(90deg) translate(50%, 0)",
          transformOrigin: "top right",
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Click to connect with us"
          title="Click to connect with us"
          className="group flex items-center gap-1.5 sm:gap-2.5 bg-linear-to-r from-[#02474D] via-[#02373C] to-[#035259] text-white hover:text-[#DDE3C1] px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-b-2xl border-b-2 border-l-2 border-r-2 border-t-0 border-[#B69226]/80 hover:border-[#B69226] shadow-2xl shadow-[#02474D]/40 hover:shadow-[#02474D]/60 hover:translate-y-1 transition-all duration-300 cursor-pointer"
        >
          {/* Pulsing Live Advisor indicator */}
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-400" />
          </span>

          {/* Headphones Icon Bubble */}
          <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white/10 group-hover:bg-[#B69226]/20 border border-white/10 group-hover:border-[#B69226]/40 flex items-center justify-center transition-all duration-300 shrink-0">
            <Headphones className="w-3 h-3 sm:w-4 sm:h-4 text-[#DDE3C1] group-hover:text-white transition-colors" />
          </div>

          {/* Text block: exact requirement "click to connect with us" */}
          <span className="font-montserrat font-bold text-[11px] sm:text-[13px] text-white whitespace-nowrap leading-tight tracking-wide group-hover:text-[#DDE3C1] transition-colors">
            Click to connect with us
          </span>

          {/* Subtle chevron */}
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#DDE3C1] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </aside>

      {/* ── Modal Dialog ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-modal-title"
          className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn"
        >
          {/* Backdrop dismiss */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative border border-gray-100 z-10 animate-scaleUp max-h-[92vh] overflow-y-auto scrollbar-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Background decorative glows */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-linear-to-br from-primary/10 to-[#B69226]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-linear-to-tr from-primary/10 to-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer z-10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Header */}
                <div className="mb-4 pr-8">
                  <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-[#02474D] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#02474D]/15 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B69226]" />
                    Instant Callback & Best Offers
                  </div>

                  <h2
                    id="connect-modal-title"
                    className="font-bricolage font-bold text-2xl sm:text-[1.65rem] text-gray-900 leading-tight"
                  >
                    Connect With <span className="text-[#02474D]">Our Advisors</span>
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-500 font-montserrat mt-1 leading-relaxed">
                    Share your requirements to get verified offers, custom eligibility checks, and 1-on-1 assistance from Grofi.
                  </p>
                </div>

                {/* Connect Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  {/* Service Selection: "credit-cards", "personal-loans", "home-loans" */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-montserrat">
                      Select Requirement <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {SERVICE_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = service === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setService(opt.id);
                              if (errors.service) {
                                setErrors((prev) => ({ ...prev, service: undefined }));
                              }
                            }}
                            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                              isSelected
                                ? "bg-linear-to-b from-[#02474D]/10 to-[#02474D]/5 border-[#02474D] ring-2 ring-[#02474D]/20 shadow-sm"
                                : "bg-gray-50/80 hover:bg-gray-100/80 border-gray-200"
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#02474D] text-white flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                                isSelected
                                  ? "bg-[#02474D] text-[#DDE3C1]"
                                  : "bg-white text-gray-500 border border-gray-200"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div
                                className={`text-xs font-bold font-montserrat leading-tight ${
                                  isSelected ? "text-[#02474D]" : "text-gray-800"
                                }`}
                              >
                                {opt.label}
                              </div>
                              <div className="text-[10px] text-gray-500 font-montserrat mt-0.5 line-clamp-1">
                                {opt.tagline}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.service && (
                      <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                        {errors.service}
                      </p>
                    )}
                  </div>

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
                        placeholder="Enter your full name"
                        className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all font-montserrat ${
                          errors.name
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-[#02474D] focus:ring-2 focus:ring-[#02474D]/10"
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
                      <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5 select-none font-montserrat">
                        <Phone className="w-3.5 h-3.5 text-[#02474D]" />
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
                            : "border-gray-200 focus:border-[#02474D] focus:ring-2 focus:ring-[#02474D]/10"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* CIBIL Score */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider font-montserrat">
                        CIBIL / Credit Score <span className="text-red-500">*</span>
                      </label>
                      {cibilBadge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cibilBadge.color} font-montserrat`}
                        >
                          {cibilBadge.text}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <TrendingUp className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={cibilScore}
                        onChange={(e) => {
                          setCibilScore(e.target.value);
                          if (errors.cibilScore) {
                            setErrors((prev) => ({ ...prev, cibilScore: undefined }));
                          }
                        }}
                        placeholder="Enter score (e.g. 750) or pick below"
                        className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all font-montserrat ${
                          errors.cibilScore
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-[#02474D] focus:ring-2 focus:ring-[#02474D]/10"
                        }`}
                      />
                    </div>

                    {/* Quick CIBIL score pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {CIBIL_PRESETS.map((preset) => {
                        const isPresetActive = cibilScore === preset.value;
                        return (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => {
                              setCibilScore(preset.value);
                              if (errors.cibilScore) {
                                setErrors((prev) => ({ ...prev, cibilScore: undefined }));
                              }
                            }}
                            className={`text-[11px] font-montserrat font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                              isPresetActive
                                ? "bg-[#02474D] text-white border-[#02474D]"
                                : "bg-gray-100 hover:bg-gray-200/80 text-gray-600 border-gray-200"
                            }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>

                    {errors.cibilScore && (
                      <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                        {errors.cibilScore}
                      </p>
                    )}
                  </div>

                  {/* Trust Badge Note */}
                  <div className="bg-[#EBF4ED]/60 border border-[#02474D]/10 rounded-xl p-2.5 sm:p-3 flex items-start gap-2.5 text-[11px] text-gray-600 font-montserrat leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      100% Free consultation & confidentiality guaranteed. No impact on your existing CIBIL credit score.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#02474D] hover:bg-[#035961] text-white font-montserrat font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#02474D]/25 transition-all duration-200 cursor-pointer disabled:opacity-75 group mt-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting with Expert...</span>
                      </>
                    ) : (
                      <>
                        <span>Click to Connect with Us</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* ── Celebratory Confirmation View ── */
              <div className="text-center py-3 animate-fadeIn relative">
                <div className="relative flex items-center justify-center my-3">
                  <div className="absolute w-16 h-16 rounded-full bg-emerald-500/20 animate-ping duration-1000 pointer-events-none" />
                  <div className="relative w-16 h-16 rounded-full bg-linear-to-tr from-emerald-500 via-teal-400 to-[#B69226] p-0.5 shadow-xl flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
                      <div className="w-full h-full bg-linear-to-br from-[#02474D] to-[#035259] rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 className="w-7 h-7 text-emerald-300 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-[#02474D] px-3.5 py-1.5 rounded-full text-[11px] font-bold font-montserrat mt-2 border border-[#02474D]/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Connection Request Received
                </div>

                <h3 className="font-bricolage font-bold text-2xl text-gray-900 leading-tight mt-3">
                  Thank You, <span className="text-[#02474D]">{name || "Friend"}</span>!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-1 max-w-sm mx-auto">
                  Our dedicated specialist for <strong className="text-gray-900">{getServiceLabel(service)}</strong> will call you shortly.
                </p>

                {/* Callback Time Box */}
                <div className="bg-linear-to-r from-[#EBF4ED] via-emerald-50 to-[#EBF4ED] border border-emerald-300/80 rounded-2xl p-3 my-4 flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#02474D] to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat font-bold text-emerald-950 text-xs sm:text-sm leading-tight">
                      Express Advisor Callback
                    </p>
                    <p className="text-[11px] text-emerald-800/90 font-montserrat mt-0.5 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Estimated call time: <strong className="font-bold text-emerald-950">Under 15 minutes</strong>
                    </p>
                  </div>
                </div>

                {/* Summary details */}
                <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3 my-3 text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 font-montserrat">
                    Request Summary
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                      <span className="text-[10px] text-gray-400 font-medium block font-montserrat">Requirement</span>
                      <span className="text-xs font-bold text-gray-900 block mt-0.5 truncate font-montserrat">
                        {getServiceLabel(service)}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                      <span className="text-[10px] text-gray-400 font-medium block font-montserrat">Mobile</span>
                      <span className="text-xs font-bold text-gray-900 block mt-0.5 font-mono">
                        +91 {phone}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                      <span className="text-[10px] text-gray-400 font-medium block font-montserrat">CIBIL</span>
                      <span className="text-xs font-bold text-emerald-600 block mt-0.5 font-montserrat">
                        {cibilScore || "Checked"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust guarantee */}
                <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 font-montserrat my-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Consultation</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-1 text-gray-600">
                    <Lock className="w-3.5 h-3.5 text-[#02474D]" />
                    <span>Privacy Protected</span>
                  </div>
                </div>

                {/* Done Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full bg-[#02474D] hover:bg-[#035961] text-white font-montserrat font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer mt-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
