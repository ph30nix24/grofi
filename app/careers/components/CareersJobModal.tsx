"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { JobOpening } from "../types";

interface CareersJobModalProps {
  job: JobOpening | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "details" | "apply";
}

export default function CareersJobModal({
  job,
  isOpen,
  onClose,
  initialTab = "details",
}: CareersJobModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "apply">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    noticePeriod: "30 Days",
    linkedin: "",
    portfolio: "",
    resumeLink: "",
    coverNote: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsSubmitted(false);
      setFormErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialTab]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Valid email address is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = "Valid 10-digit phone number is required";
    }
    if (!formData.experience) errors.experience = "Please select your experience";
    if (!formData.resumeLink.trim()) {
      errors.resumeLink = "Please provide your resume link or portfolio";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate swift server submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-[#FDFBF7] to-white flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4ED] text-primary border border-primary/20">
                {job.department}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {job.locationType} • {job.location}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                {job.type}
              </span>
            </div>
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#02282C] font-bricolage leading-snug"
            >
              {job.title}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mt-1 font-montserrat">
              <span className="text-primary font-bold">{job.salaryRange}</span>
              <span>•</span>
              <span>Exp: {job.experience}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (if not yet submitted) */}
        {!isSubmitted && (
          <div className="flex border-b border-gray-200 bg-[#FDFBF7] px-6 text-sm font-semibold font-montserrat">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${
                activeTab === "details"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Role Details &amp; Expectations
            </button>
            <button
              onClick={() => setActiveTab("apply")}
              className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "apply"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>Quick Apply</span>
              <span className="w-2 h-2 rounded-full bg-gold" />
            </button>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 font-montserrat">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="py-12 px-4 text-center max-w-md mx-auto animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#02282C] font-bricolage mb-2">
                Application Received!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-montserrat">
                Thank you for applying for the{" "}
                <strong className="text-gray-900">{job.title}</strong> role at Grofi.
                Our team will review your profile and respond to{" "}
                <strong className="text-primary">{formData.email}</strong> within 48 business hours.
              </p>
              <div className="bg-[#EBF4ED] p-4 rounded-xl text-xs text-primary font-medium border border-primary/20 mb-8 text-left flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>
                  All candidate information is kept strictly confidential. We do not spam or share your data with 3rd
                  party recruiters.
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-primary hover:bg-[#01353a] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Done &amp; Close Window
              </button>
            </div>
          ) : activeTab === "details" ? (
            /* Role Details Tab */
            <div className="space-y-6">
              {/* Mission Summary */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                  The Mission
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {job.summary}
                </p>
              </div>

              {/* Stack / Tags */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                  Primary Tech &amp; Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                  What You&apos;ll Do
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                  What We&apos;re Looking For
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  {job.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to have */}
              {job.niceToHave.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                    Bonus Points (Nice to Have)
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    {job.niceToHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* First 90 Days */}
              <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200/90">
                <h4 className="text-sm font-bold text-[#02282C] font-bricolage mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Your First 90 Days at Grofi
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  {job.first90Days.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Application Form Tab */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                      formErrors.fullName
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@domain.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                      formErrors.email
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                      formErrors.phone
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Bengaluru, Mumbai, Pune"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Total Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors bg-white ${
                      formErrors.experience
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary"
                    }`}
                  >
                    <option value="">Select Experience</option>
                    <option value="1-3 years">1–3 Years</option>
                    <option value="3-5 years">3–5 Years</option>
                    <option value="5-8 years">5–8 Years</option>
                    <option value="8+ years">8+ Years</option>
                  </select>
                  {formErrors.experience && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.experience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Notice Period
                  </label>
                  <select
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary bg-white"
                  >
                    <option value="Immediate">Immediate Joiner</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60+ Days">60+ Days (Negotiable)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    GitHub / Portfolio / Website URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username or portfolio link"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Resume / CV Link (Google Drive / Dropbox / PDF link) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="resumeLink"
                    value={formData.resumeLink}
                    onChange={handleInputChange}
                    placeholder="Paste link to Google Drive, Dropbox, or public resume URL"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                      formErrors.resumeLink
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary"
                    }`}
                  />
                </div>
                {formErrors.resumeLink && (
                  <p className="text-[11px] text-red-500 mt-1">{formErrors.resumeLink}</p>
                )}
                <p className="text-[11px] text-gray-500 mt-1">
                  Ensure link permissions are set to &apos;Anyone with the link can view&apos;.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Why are you excited to build at Grofi? (Optional)
                </label>
                <textarea
                  name="coverNote"
                  rows={3}
                  value={formData.coverNote}
                  onChange={handleInputChange}
                  placeholder="Tell us what problem in Indian personal finance excites you most..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-[#01353a] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-sm">
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
                      Submitting Application...
                    </span>
                  ) : (
                    <>
                      <span>Submit Application for {job.title}</span>
                      <Send className="w-4 h-4 text-gold" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Action (if on Details tab) */}
        {!isSubmitted && activeTab === "details" && (
          <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between gap-4">
            <div className="text-xs text-gray-500 hidden sm:block">
              Takes less than 2 minutes to apply • Direct review by founders &amp; hiring team
            </div>
            <button
              onClick={() => setActiveTab("apply")}
              className="ml-auto bg-primary hover:bg-[#01353a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
