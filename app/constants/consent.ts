/**
 * Versioned consent configuration for compliance with DPDP & RBI Digital Lending Guidelines.
 */

export const CURRENT_CONSENT_VERSION = "v1.0";

export const CONSENT_TEXT =
  "I authorize Grofi and its partner financial institutions to contact me via Call, SMS, or WhatsApp regarding this inquiry, and I agree to the Privacy Policy.";

export const CAREERS_CONSENT_TEXT =
  "I authorize Grofi to process my application details for employment purposes, and I agree to the Privacy Policy.";

export const NEWSLETTER_CONSENT_TEXT =
  "I authorize Grofi to send me financial updates, market rates, and alerts, and I agree to the Privacy Policy.";

/**
 * Validates and resolves consent on the server.
 * Never trusts client timestamps or arbitrary date strings.
 * If consentGiven is true, generates a fresh server-side Date().
 * If consentGiven is false or missing, returns null for timestamp and version.
 */
export function resolveServerConsent(rawGiven: unknown, rawVersion?: unknown): {
  consentGiven: boolean;
  consentVersion: string | null;
  consentTimestamp: Date | null;
} {
  const isGiven =
    rawGiven === true ||
    rawGiven === "true" ||
    rawGiven === 1 ||
    rawGiven === "1";

  if (!isGiven) {
    return {
      consentGiven: false,
      consentVersion: null,
      consentTimestamp: null,
    };
  }

  const version =
    typeof rawVersion === "string" && rawVersion.trim().length > 0
      ? rawVersion.trim()
      : CURRENT_CONSENT_VERSION;

  return {
    consentGiven: true,
    consentVersion: version,
    consentTimestamp: new Date(), // Always generated on server, never from client
  };
}
