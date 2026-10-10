"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  Building,
  User,
  Phone,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import ConsentCheckbox from "@/app/components/ConsentCheckbox";
import { CURRENT_CONSENT_VERSION } from "@/app/constants/consent";

interface CareersApplicationFormProps {
  selectedRoleTitle?: string;
}

export default function CareersApplicationForm({
  selectedRoleTitle = "Business and Development Executive",
}: CareersApplicationFormProps) {
  // Form State
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState(selectedRoleTitle);
  const [city, setCity] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState<"yes" | "no">("yes");
  const [currentSalary, setCurrentSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Status & Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync selected role when changed externally from role cards
  useEffect(() => {
    if (selectedRoleTitle) {
      setRole(selectedRoleTitle);
    }
  }, [selectedRoleTitle]);

  // Handle PDF file selection with strict validation
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const isPdfType = file.type === "application/pdf";
    const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType && !hasPdfExtension) {
      setErrors((prev) => ({
        ...prev,
        resume: "Only PDF format (.pdf) is accepted. Please upload a PDF file.",
      }));
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size exceeds 15MB limit. Please upload a smaller PDF.",
      }));
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setResumeFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Please enter your full name (at least 2 characters)";
    }

    const cleanNum = number.replace(/\D/g, "");
    if (cleanNum.length !== 10 || !/^[6-9]/.test(cleanNum)) {
      errs.number = "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
    }

    if (!city.trim() || city.trim().length < 2) {
      errs.city = "Please enter your current city";
    }

    if (currentlyWorking === "yes" && !currentSalary.trim()) {
      errs.currentSalary = "Please enter your current salary / CTC";
    }

    if (!resumeFile) {
      errs.resume = "Please upload your resume in PDF format";
    }

    if (!consentGiven) {
      errs.consent = "Please agree to the privacy policy & consent to continue";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("number", number.trim());
      formData.append("role", role);
      formData.append("city", city.trim());
      formData.append("currentlyWorking", currentlyWorking);
      formData.append("currentSalary", currentSalary.trim());
      formData.append("noticePeriod", noticePeriod);
      formData.append("consentGiven", "true");
      formData.append("consentVersion", CURRENT_CONSENT_VERSION);
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setSubmitError(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName("");
    setNumber("");
    setCity("");
    setCurrentlyWorking("yes");
    setCurrentSalary("");
    setNoticePeriod("Immediate");
    setResumeFile(null);
    setConsentGiven(false);
    setSubmitSuccess(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="application-form" className="py-16 sm:py-24 bg-[#FDFBF7] font-montserrat relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            Fast-Track Application
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-3">
            Apply in Under 2 Minutes
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Fill in your details, select your preferred role, attach your PDF resume, and our HR team will review your
            application directly within 48 business hours.
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-lg relative overflow-hidden">
          {submitSuccess ? (
            /* Success View */
            <div className="py-12 px-4 text-center max-w-lg mx-auto animate-scaleUp">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="inline-block bg-[#EBF4ED] text-primary font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-primary/20 mb-3">
                Application Received
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#02282C] font-bricolage mb-3">
                Thank You, {name}!
              </h3>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                Your application for the position of{" "}
                <strong className="text-primary font-bold">{role}</strong> has been successfully submitted along
                with your resume.
              </p>

              {/* Submitted Details Review Card */}
              <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200/90 text-left text-xs sm:text-sm space-y-2 mb-8">
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Applicant:</span>
                  <span className="font-bold text-gray-800">{name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Mobile Phone:</span>
                  <span className="font-bold text-gray-800">+91 {number}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Role:</span>
                  <span className="font-bold text-primary">{role}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">City:</span>
                  <span className="font-bold text-gray-800">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Notice Period:</span>
                  <span className="font-bold text-gray-800">{noticePeriod}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 font-semibold mb-8">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Our recruitment team will review and contact you within 48 business hours.</span>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="bg-primary hover:bg-[#01353a] text-white font-bold py-3.5 px-8 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            /* Main Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* 1. Name and Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) {
                          setErrors((prev) => {
                            const n = { ...prev };
                            delete n.name;
                            return n;
                          });
                        }
                      }}
                      placeholder="e.g. Aryan Sharma"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                        errors.name
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="text-xs font-bold text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 border-r border-gray-200 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
                        if (errors.number) {
                          setErrors((prev) => {
                            const n = { ...prev };
                            delete n.number;
                            return n;
                          });
                        }
                      }}
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`w-full pl-14 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                        errors.number
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      }`}
                    />
                  </div>
                  {errors.number && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.number}</p>
                  )}
                </div>
              </div>

              {/* 2. Position Applying For & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Role Applying For <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-primary bg-white cursor-pointer"
                    >
                      <option value="Business and Development Executive">
                        Business and Development Executive (10 Openings) • Delhi WFO
                      </option>
                      <option value="Content Creator">
                        Content Creator (5 Openings) • Delhi WFO
                      </option>
                      <option value="Video Editor">
                        Video Editor (1 Opening) • Delhi WFO
                      </option>
                      <option value="HR Executive">
                        HR Executive (2 Openings) • Delhi WFO
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Current City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) {
                          setErrors((prev) => {
                            const n = { ...prev };
                            delete n.city;
                            return n;
                          });
                        }
                      }}
                      placeholder="e.g. Delhi NCR, New Delhi, Noida, Gurugram"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                        errors.city
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* 3. Currently Working? & Current Salary? */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Currently Working? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentlyWorking("yes")}
                      className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        currentlyWorking === "yes"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <span>Yes, Employed</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentlyWorking("no")}
                      className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        currentlyWorking === "no"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <span>No, Looking for Job</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Current Salary / CTC{" "}
                    {currentlyWorking === "yes" ? (
                      <span className="text-red-500">*</span>
                    ) : (
                      <span className="text-gray-400 font-normal lowercase">(optional)</span>
                    )}
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={currentSalary}
                      onChange={(e) => {
                        setCurrentSalary(e.target.value);
                        if (errors.currentSalary) {
                          setErrors((prev) => {
                            const n = { ...prev };
                            delete n.currentSalary;
                            return n;
                          });
                        }
                      }}
                      placeholder={
                        currentlyWorking === "yes"
                          ? "e.g. ₹4.5 LPA or ₹35,000/month"
                          : "Last drawn or expected CTC"
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                        errors.currentSalary
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      }`}
                    />
                  </div>
                  {errors.currentSalary && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">
                      {errors.currentSalary}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Notice Period */}
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Notice Period? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: "Immediate", sub: "Join in 0–7 days" },
                    { label: "15 Days", sub: "Standard notice" },
                    { label: "30 Days", sub: "1 month notice" },
                    { label: "45–60 Days", sub: "Serving notice" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setNoticePeriod(opt.label)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        noticePeriod === opt.label
                          ? "bg-[#EBF4ED] border-primary text-primary ring-1 ring-primary/20"
                          : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Resume Upload (Strictly PDF Only) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Resume Upload (PDF Only) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-primary bg-[#EBF4ED] px-2 py-0.5 rounded-md border border-primary/20">
                    PDF Only (.pdf)
                  </span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  id="resume-upload-input"
                />

                {!resumeFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? "border-primary bg-[#EBF4ED]/40"
                        : errors.resume
                        ? "border-red-400 bg-red-50/10 hover:border-red-500"
                        : "border-gray-300 hover:border-primary hover:bg-gray-50/60"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-sm font-bold text-[#02282C] mb-1">
                      Click to upload or drag &amp; drop your Resume
                    </div>
                    <p className="text-xs text-gray-500">
                      Strictly PDF files only (<code className="font-mono text-primary font-bold">.pdf</code>) up
                      to 15MB
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#EBF4ED]/60 rounded-2xl p-4 border border-primary/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <FileText className="w-5 h-5 text-gold" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-bold text-[#02282C] truncate">
                          {resumeFile.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document Verified
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="hidden sm:inline">Ready</span>
                      </span>
                      <button
                        type="button"
                        onClick={removeResume}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {errors.resume && (
                  <p className="text-[11px] text-red-500 mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.resume}</span>
                  </p>
                )}
              </div>

              <ConsentCheckbox
                id="careers-application-form-consent"
                checked={consentGiven}
                onChange={(checked) => {
                  setConsentGiven(checked);
                  if (checked && errors.consent) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.consent;
                      return next;
                    });
                  }
                }}
                error={errors.consent}
              />

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-[#01353a] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2.5 text-sm">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Uploading Resume &amp; Submitting...
                    </span>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">Submit Application for {role}</span>
                      <Send className="w-4 h-4 text-gold" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-500 mt-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Confidential • Direct review by Grofi leadership &amp; HR</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
