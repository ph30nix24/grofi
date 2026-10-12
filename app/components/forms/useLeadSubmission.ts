"use client";

import { useState } from "react";
import { CURRENT_CONSENT_VERSION } from "@/app/constants/consent";

export interface UseLeadSubmissionOptions {
  formType: string;
  defaultAmount?: number;
}

export function useLeadSubmission({ formType, defaultAmount = 500000 }: UseLeadSubmissionOptions) {
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState<number>(defaultAmount);
  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cleanPhone = phone.replace(/\D/g, "");

  const validateBaseFields = (extraErrors: { [key: string]: string | undefined } = {}) => {
    const newErrors: { [key: string]: string | undefined } = { ...extraErrors };

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
    return Object.keys(newErrors).filter((k) => !!newErrors[k]).length === 0;
  };

  const submitLead = async (payload: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          phone: cleanPhone,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          consentGiven: true,
          consentVersion: CURRENT_CONSENT_VERSION,
          ...payload,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
      return true;
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        phone: err instanceof Error ? err.message : "Submission failed. Please try again.",
      }));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetLead = () => {
    setIsSubmitted(false);
    setPhone("");
    setLoanAmount(defaultAmount);
    setConsentGiven(false);
    setErrors({});
  };

  return {
    phone,
    setPhone,
    loanAmount,
    setLoanAmount,
    consentGiven,
    setConsentGiven,
    errors,
    setErrors,
    isSubmitting,
    isSubmitted,
    validateBaseFields,
    submitLead,
    resetLead,
  };
}
