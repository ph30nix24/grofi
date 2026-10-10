"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle2, Send } from "lucide-react";
import ConsentCheckbox from "@/app/components/ConsentCheckbox";
import { CURRENT_CONSENT_VERSION } from "@/app/constants/consent";

interface CareersGeneralApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CareersGeneralApplyModal({
  isOpen,
  onClose,
}: CareersGeneralApplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    domain: "Engineering",
    experience: "3-5 years",
    linkedin: "",
    portfolio: "",
    resumeLink: "",
    pitch: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setConsentGiven(false);
      setFormErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      errors.email = "Valid email is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = "Valid 10-digit phone number is required";
    }
    if (!formData.resumeLink.trim()) {
      errors.resumeLink = "Please provide your resume link";
    }
    if (!consentGiven) {
      errors.consent = "Please agree to the privacy policy & consent to continue";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
          formType: "General Talent Application (Pitch to Grofi)",
          formTitle: `Talent Pitch: ${formData.fullName.trim()} (${formData.domain})`,
          replyTo: formData.email.trim(),
          ...formData,
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
      setFormErrors((prev) => ({
        ...prev,
        phone: err instanceof Error ? err.message : "Submission failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-[#FDFBF7] to-white flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>General Talent Network</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#02282C] font-bricolage">
              Pitch Yourself to Grofi
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-montserrat mt-0.5">
              Don’t see an exact title match? We create roles for exceptional builders and minds.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 font-montserrat">
          {isSubmitted ? (
            <div className="py-12 text-center max-w-md mx-auto animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#02282C] font-bricolage mb-2">
                Profile Received!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-montserrat">
                Thank you, <strong className="text-gray-900">{formData.fullName}</strong>. We have added your details
                to our core talent roster. When relevant leadership or specialist opportunities open up in{" "}
                <strong className="text-primary">{formData.domain}</strong>, our founders and leads reach out directly.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-primary hover:bg-[#01353a] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
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
                    placeholder="e.g. Priya Nair"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                      formErrors.fullName
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary"
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
                    placeholder="priya@domain.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                      formErrors.email
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200 focus:border-primary"
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
                    Primary Domain / Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary bg-white"
                  >
                    <option value="Engineering">Software Engineering &amp; Architecture</option>
                    <option value="Product & Design">Product Management &amp; UI/UX</option>
                    <option value="Data & Risk">Credit Risk &amp; Data Science</option>
                    <option value="Growth & Marketing">Growth, Performance &amp; Content</option>
                    <option value="Partnerships & Ops">Bank Partnerships &amp; Operations</option>
                    <option value="Founder's Office">Founder&apos;s Office / Chief of Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
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
                        : "border-gray-200 focus:border-primary"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    LinkedIn URL
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
                    Portfolio / GitHub / Work Sample
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username or personal site"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Resume Link (Google Drive / Dropbox / Cloud link) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleInputChange}
                  placeholder="Paste public link to your resume or CV"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-colors ${
                    formErrors.resumeLink
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
                {formErrors.resumeLink && (
                  <p className="text-[11px] text-red-500 mt-1">{formErrors.resumeLink}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tell us what you do best and how you can accelerate Grofi
                </label>
                <textarea
                  name="pitch"
                  rows={3}
                  value={formData.pitch}
                  onChange={handleInputChange}
                  placeholder="Tell us about your superpower, projects you loved building, or what kind of impact you want to create..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary resize-none"
                />
              </div>

              <ConsentCheckbox
                id="careers-general-modal-consent"
                checked={consentGiven}
                onChange={(checked) => {
                  setConsentGiven(checked);
                  if (checked && formErrors.consent) {
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      delete next.consent;
                      return next;
                    });
                  }
                }}
                error={formErrors.consent}
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-[#01353a] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Submitting Profile...</span>
                  ) : (
                    <>
                      <span>Submit to Grofi Talent Network</span>
                      <Send className="w-4 h-4 text-gold" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
