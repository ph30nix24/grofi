"use client";

import React from "react";
import Link from "next/link";

interface ConsentCheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  className?: string;
  text?: React.ReactNode;
  privacyHref?: string;
  disabled?: boolean;
}

export default function ConsentCheckbox({
  id = "consent-checkbox",
  checked,
  onChange,
  error,
  className = "",
  text,
  privacyHref = "/privacy-policy",
  disabled = false,
}: ConsentCheckboxProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="flex items-start gap-2.5 cursor-pointer text-left select-none group"
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="w-4 h-4 rounded border-gray-300 text-[#02474D] focus:ring-[#02474D] focus:ring-offset-0 transition-colors cursor-pointer accent-[#02474D]"
          />
        </div>
        <span className="text-[11px] sm:text-xs text-gray-600 leading-snug">
          {text ? (
            text
          ) : (
            <>
              I authorize Grofi and its partner financial institutions to contact me via Call, SMS, or WhatsApp regarding this inquiry, and I agree to the{" "}
              <Link
                href={privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#02474D] font-semibold underline underline-offset-2 hover:text-[#035259] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </>
          )}
        </span>
      </label>
      {error && (
        <p className="text-[11px] text-red-500 font-medium font-montserrat pl-6.5">
          {error}
        </p>
      )}
    </div>
  );
}
