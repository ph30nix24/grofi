/**
 * Centralized spam protection, rate limiting, and input validation utilities
 * for Grofi public form endpoints.
 */

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory IP tracking map with auto-cleanup
const rateLimitMap = new Map<string, RateLimitEntry>();
let lastCleanup = Date.now();

function cleanupOldEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < 60000) return; // Clean up at most once per minute
  lastCleanup = now;

  for (const [ip, entry] of rateLimitMap.entries()) {
    const valid = entry.timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      entry.timestamps = valid;
    }
  }
}

/**
 * Extracts client IP from standard reverse proxy headers
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

/**
 * Enforces sliding window rate limit per client IP
 * @param ip Client IP
 * @param maxRequests Maximum submissions allowed in the window (default 10)
 * @param windowMs Time window in milliseconds (default 60,000 ms = 1 minute)
 */
export function checkRateLimit(
  ip: string,
  maxRequests = 10,
  windowMs = 60000
): { allowed: boolean; remaining: number } {
  cleanupOldEntries(windowMs);

  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { timestamps: [] };

  // Filter timestamps within current window
  const recentTimestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (recentTimestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: recentTimestamps });

  return {
    allowed: true,
    remaining: maxRequests - recentTimestamps.length,
  };
}

/**
 * Resets rate limit map (useful for test isolation)
 */
export function resetRateLimits(): void {
  rateLimitMap.clear();
}

/**
 * Checks for hidden honeypot fields populated by automated spam bots.
 */
export function isHoneypotTriggered(
  payload: Record<string, unknown> | FormData
): boolean {
  const honeypotKeys = [
    "_hp",
    "honeypot",
    "hp_field",
    "website_hp",
    "_gotcha",
    "bot_field",
    "fax_number",
  ];

  for (const key of honeypotKeys) {
    let val: unknown;
    if (payload instanceof FormData) {
      val = payload.get(key);
    } else if (payload && typeof payload === "object") {
      val = (payload as Record<string, unknown>)[key];
    }

    if (val && typeof val === "string" && val.trim().length > 0) {
      return true;
    }
  }

  return false;
}

/**
 * Validates a 10-digit Indian mobile number starting with 6, 7, 8, or 9
 */
export function isValidIndianPhone(phone: unknown): boolean {
  if (!phone) return false;
  let clean = String(phone).replace(/\D/g, "");
  if (clean.length === 12 && clean.startsWith("91")) {
    clean = clean.slice(2);
  } else if (clean.length === 11 && clean.startsWith("0")) {
    clean = clean.slice(1);
  }
  return clean.length === 10 && /^[6-9]/.test(clean);
}

/**
 * Validates standard email address format
 */
export function isValidEmail(email: unknown): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  // Standard RFC 5322 simplified email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

/**
 * Allowed form type prefixes and explicit names for /api/forms/submit
 */
const ALLOWED_FORM_PREFIXES = [
  "Business Loan",
  "Home Loan",
  "Personal Loan",
  "Instant Loan",
  "Short-Term Loan",
  "Loan Against Property",
  "Credit Card",
  "Job Application",
  "General Talent Application",
  "Grofi Money Brief",
  "Newsletter",
  "Coming Soon",
  "Instant Product Application",
  "CyberShield Protection",
  "Connect With Our Advisors",
];

export function isValidFormType(formType: unknown): boolean {
  if (!formType || typeof formType !== "string") return false;
  const trimmed = formType.trim();
  if (trimmed.length < 3 || trimmed.length > 100) return false;

  return ALLOWED_FORM_PREFIXES.some((prefix) =>
    trimmed.toLowerCase().startsWith(prefix.toLowerCase())
  );
}
