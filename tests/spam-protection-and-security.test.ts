import "dotenv/config";
import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  checkRateLimit,
  resetRateLimits,
  isHoneypotTriggered,
  isValidIndianPhone,
  isValidEmail,
  isValidFormType,
} from "../libs/spamProtection";
import { escapeHtml, sendFormNotification } from "../libs/resend";
import { POST as submitForm } from "../app/api/forms/submit/route";
import { POST as connectForm } from "../app/api/connect/route";

describe("Spam Protection, Security & DPDP Compliance", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  test("Rate limiting allows up to threshold and blocks excess requests", () => {
    const testIp = "192.168.1.100";
    for (let i = 0; i < 10; i++) {
      const res = checkRateLimit(testIp, 10, 60000);
      assert.equal(res.allowed, true, `Request ${i + 1} should be allowed`);
    }

    const blocked = checkRateLimit(testIp, 10, 60000);
    assert.equal(blocked.allowed, false, "11th request must be rate limited");
  });

  test("Honeypot detection catches automated bot fields", () => {
    assert.equal(isHoneypotTriggered({ name: "John", _hp: "bot-fill" }), true);
    assert.equal(isHoneypotTriggered({ name: "John", honeypot: "spam" }), true);
    assert.equal(isHoneypotTriggered({ name: "John", hp_field: "1" }), true);
    assert.equal(isHoneypotTriggered({ name: "John", website_hp: "http://bot.com" }), true);
    assert.equal(isHoneypotTriggered({ name: "John", _gotcha: "spam" }), true);

    // Legitimate user payload with empty or missing honeypots
    assert.equal(isHoneypotTriggered({ name: "John", phone: "9876543210" }), false);
    assert.equal(isHoneypotTriggered({ name: "John", _hp: "" }), false);
  });

  test("Phone number validation correctly filters Indian mobile numbers", () => {
    assert.equal(isValidIndianPhone("9876543210"), true);
    assert.equal(isValidIndianPhone("+91 98765 43210"), true);
    assert.equal(isValidIndianPhone("8123456789"), true);
    assert.equal(isValidIndianPhone("7000011111"), true);
    assert.equal(isValidIndianPhone("6999988888"), true);

    // Invalid numbers
    assert.equal(isValidIndianPhone("1234567890"), false); // Starts with 1
    assert.equal(isValidIndianPhone("5555555555"), false); // Starts with 5
    assert.equal(isValidIndianPhone("98765"), false); // Too short
    assert.equal(isValidIndianPhone(""), false);
    assert.equal(isValidIndianPhone(null), false);
  });

  test("Email validation strictly validates email addresses", () => {
    assert.equal(isValidEmail("user@example.com"), true);
    assert.equal(isValidEmail("test.finance@grofi.in"), true);
    assert.equal(isValidEmail("invalid-email"), false);
    assert.equal(isValidEmail("@no-user.com"), false);
    assert.equal(isValidEmail("user@.com"), false);
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail(null), false);
  });

  test("Form type validation enforces permitted categories and rejects arbitrary junk", () => {
    assert.equal(isValidFormType("Personal Loan - HDFC Bank"), true);
    assert.equal(isValidFormType("Business Loan Hero Form"), true);
    assert.equal(isValidFormType("Home Loan Balance Transfer - SBI"), true);
    assert.equal(isValidFormType("Grofi Money Brief Subscription"), true);
    assert.equal(isValidFormType("Coming Soon Early Access"), true);
    assert.equal(isValidFormType("Connect With Our Advisors"), true);

    // Unrecognized or malicious form types
    assert.equal(isValidFormType("Arbitrary Hacker Form"), false);
    assert.equal(isValidFormType("DROP TABLE users;--"), false);
    assert.equal(isValidFormType(""), false);
    assert.equal(isValidFormType(null), false);
  });

  test("HTML escaping in resend.ts neutralizes XSS and phishing payloads", () => {
    const rawXss = '<script>alert("pwned")</script>';
    const escaped = escapeHtml(rawXss);
    assert.equal(escaped.includes("<script>"), false);
    assert.equal(escaped, "&lt;script&gt;alert(&quot;pwned&quot;)&lt;/script&gt;");

    const linkPayload = '<a href="https://evil-phishing.com">Click to login</a>';
    const escapedLink = escapeHtml(linkPayload);
    assert.equal(escapedLink.includes("<a href"), false);
    assert.equal(
      escapedLink,
      "&lt;a href=&quot;https://evil-phishing.com&quot;&gt;Click to login&lt;/a&gt;"
    );
  });

  test("/api/forms/submit rejects honeypot bots with 400", async () => {
    const req = new Request("https://www.grofi.in/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "Personal Loan Hero Form",
        phone: "9876543210",
        consentGiven: true,
        _hp: "bot-auto-fill",
      }),
    });

    const res = await submitForm(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error?.includes("Submission could not be processed"));
  });

  test("/api/forms/submit rejects submissions without consent", async () => {
    const req = new Request("https://www.grofi.in/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "Personal Loan Hero Form",
        phone: "9876543210",
        consentGiven: false,
      }),
    });

    const res = await submitForm(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error?.includes("Consent is required"));
  });

  test("/api/forms/submit rejects unrecognized formType", async () => {
    const req = new Request("https://www.grofi.in/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "Arbitrary Hacker Form",
        phone: "9876543210",
        consentGiven: true,
      }),
    });

    const res = await submitForm(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error?.includes("Invalid or unrecognized form type"));
  });

  test("/api/connect rejects honeypot bots with 400", async () => {
    const req = new Request("https://www.grofi.in/api/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Bot",
        phone: "9876543210",
        service: "personal-loans",
        consentGiven: true,
        _hp: "bot-token",
      }),
    });

    const res = await connectForm(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error?.includes("Submission could not be processed"));
  });
});
